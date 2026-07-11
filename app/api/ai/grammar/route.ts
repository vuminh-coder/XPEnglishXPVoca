import { NextRequest, NextResponse } from "next/server";
import { getGrammarLesson } from "@/lib/data/grammarContent";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { topic, level, mode } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Missing topic" }, { status: 400 });
    }

    const userLevel = level || "intermediate";

    // ── Mode: "lesson" → Return static lesson content ──
    if (mode === "lesson") {
      const lesson = getGrammarLesson(topic);
      if (!lesson) {
        return NextResponse.json(
          { error: "Lesson not found for this topic" },
          { status: 404 }
        );
      }
      return NextResponse.json({ lesson });
    }

    // ── Mode: "exercise" (default) → Generate AI exercises ──
    // Enrich the prompt with lesson context if available
    const lesson = getGrammarLesson(topic);

    let contextBlock = "";
    if (lesson) {
      const formulasText = lesson.formulas.join("\n");
      const mistakesText = lesson.commonMistakes
        .map((m) => `Wrong: "${m.wrong}" → Correct: "${m.correct}" (${m.explanation})`)
        .join("\n");
      const signalText = lesson.signalWords.join(", ");

      contextBlock = `
=== GRAMMAR TOPIC CONTEXT ===
Topic: ${lesson.titleEn} (${lesson.title})
Key Formulas:
${formulasText}

Common Mistakes Vietnamese Learners Make:
${mistakesText}

Signal Words: ${signalText}
=== END CONTEXT ===
`;
    }

    const prompt = `You are an expert English grammar teacher preparing exercises for Vietnamese learners studying for IELTS and TOEIC exams.

${contextBlock}

Generate exactly 8 fill-in-the-blank grammar exercises about "${lesson?.titleEn || topic}" for a ${userLevel}-level student.

Return ONLY valid JSON in this exact format:
{
  "topic": "${topic}",
  "exercises": [
    {
      "id": 1,
      "sentence": "She ___ (go) to school every day.",
      "blank": "___",
      "correctAnswer": "goes",
      "options": ["go", "goes", "going", "went"],
      "explanation": "We use 'goes' because the subject is third person singular (she) and the sentence describes a habitual action (every day), which requires the Present Simple tense.",
      "difficulty": "easy"
    }
  ]
}

Rules:
- Generate exactly 8 exercises
- Each exercise must have exactly 4 options
- The correctAnswer must be one of the options
- The explanation must reference the specific grammar rule and be clear for Vietnamese learners
- Include 3 easy, 3 medium, and 2 hard questions
- Each difficulty field must be "easy", "medium", or "hard"
- Focus on the common mistakes Vietnamese learners make (listed above)
- Use real-world IELTS/TOEIC-style sentences when possible
- Return ONLY the JSON, no markdown, no code fences`;

    let parsed;
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 4096,
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Gemini API responded with status ${res.status}`);
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.warn("Gemini API or parsing failed, generating fallbacks from static lessons:", parseError);
      const lesson = getGrammarLesson(topic);
      const fallbackExercises = (lesson?.examples || [
        { en: "She works hard every single day.", vi: "Cô ấy làm việc chăm chỉ mỗi ngày.", highlight: "works" }
      ]).map((ex, idx) => {
        const sentencePattern = new RegExp(`\\b${ex.highlight}\\b`, "i");
        const blankSentence = ex.en.replace(sentencePattern, "___");
        
        const distractors = [
          ex.highlight + "ing",
          ex.highlight + "ed",
          "to " + ex.highlight,
          ex.highlight + "s"
        ].filter(d => d.toLowerCase() !== ex.highlight.toLowerCase());
        
        const options = Array.from(new Set([ex.highlight, ...distractors])).slice(0, 4);
        while (options.length < 4) {
          options.push(ex.highlight + "_" + options.length);
        }
        options.sort(() => 0.5 - Math.random());
        
        return {
          id: idx + 1,
          sentence: `${blankSentence} (${ex.vi})`,
          blank: "___",
          correctAnswer: ex.highlight,
          options: options,
          explanation: `Đáp án là "${ex.highlight}". Ví dụ mẫu: "${ex.en}" (Dịch nghĩa: ${ex.vi}).`,
          difficulty: idx < 2 ? "easy" : idx < 5 ? "medium" : "hard"
        };
      });
      parsed = {
        topic: topic,
        exercises: fallbackExercises.slice(0, 8)
      };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Grammar API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
