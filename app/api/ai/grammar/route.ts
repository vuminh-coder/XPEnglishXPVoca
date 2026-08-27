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
    const lesson = getGrammarLesson(topic);

    // ── Mode: "lesson" → Return static lesson content ──
    if (mode === "lesson") {
      if (!lesson) {
        return NextResponse.json(
          { error: "Lesson not found for this topic" },
          { status: 404 }
        );
      }
      return NextResponse.json({ lesson });
    }

    // ── Mode: "exercise" (default) → Generate AI exercises ──
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

Generate exactly 5 fill-in-the-blank grammar exercises about "${lesson?.titleEn || topic}" for a ${userLevel}-level student.

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
      "explanation": "Dùng 'goes' vì chủ ngữ là ngôi thứ 3 số ít (she) và diễn tả thói quen lặp đi lặp lại.",
      "difficulty": "easy"
    }
  ]
}

Rules:
- Generate exactly 5 exercises
- Each exercise must have exactly 4 options
- The correctAnswer must be one of the options
- The explanation must reference the specific grammar rule and be clear for Vietnamese learners in Vietnamese
- Include 2 easy, 2 medium, and 1 hard question
- Each difficulty field must be "easy", "medium", or "hard"
- Focus on the common mistakes Vietnamese learners make (listed above)
- Use real-world IELTS/TOEIC-style sentences when possible
- Return ONLY the JSON, no markdown, no code fences`;

    let parsed = null;

    if (GEMINI_API_KEY) {
      const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];

      for (const modelName of modelsToTry) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
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

          if (res.ok) {
            const data = await res.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              parsed = JSON.parse(jsonMatch[0]);
              if (parsed?.exercises && parsed.exercises.length > 0) {
                break; // Successfully generated via AI
              }
            }
          }
        } catch (mErr) {
          console.warn(`Model ${modelName} call failed, trying next fallback:`, mErr);
        }
      }
    }

    // Fallback dynamic generator if AI API key is missing or calls failed
    if (!parsed || !parsed.exercises || parsed.exercises.length === 0) {
      console.log("Generating high-quality dynamic fallback exercises for topic:", topic);
      const itemsToUse: Array<{ en: string; vi: string; highlight: string }> = [];

      if (lesson?.examples && lesson.examples.length > 0) {
        itemsToUse.push(...lesson.examples);
      }
      if (lesson?.usages && lesson.usages.length > 0) {
        lesson.usages.forEach((u) => {
          const firstWord = u.example.split(" ")[2] || u.example.split(" ")[0];
          itemsToUse.push({ en: u.example, vi: `Ứng dụng trong ${u.context}`, highlight: firstWord });
        });
      }
      if (lesson?.commonMistakes && lesson.commonMistakes.length > 0) {
        lesson.commonMistakes.forEach((m) => {
          const word = m.correct.split(" ")[1] || m.correct.split(" ")[0];
          itemsToUse.push({ en: m.correct, vi: `Sửa bẫy: ${m.explanation}`, highlight: word });
        });
      }

      if (itemsToUse.length === 0) {
        itemsToUse.push({ en: "We analyze global economic market trends.", vi: "Chúng tôi phân tích các xu hướng thị trường kinh tế toàn cầu.", highlight: "analyze" });
      }

      const fallbackExercises = itemsToUse.slice(0, 5).map((ex, idx) => {
        const sentencePattern = new RegExp(`\\b${ex.highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "i");
        const blankSentence = ex.en.replace(sentencePattern, "___");

        const root = ex.highlight.replace(/(?:ing|ed|s|es|ly|tion|ment)$/i, "") || ex.highlight;
        const potentialDistractors = [
          root,
          root + "s",
          root + "es",
          root + "ed",
          root + "ing",
          root + "ly",
          root + "tion",
          "to " + root,
          "is " + root,
          "has " + root + "ed",
        ].filter((d) => d.toLowerCase() !== ex.highlight.toLowerCase() && d.length > 2);

        const optionsSet = new Set<string>([ex.highlight]);
        for (const d of potentialDistractors) {
          if (optionsSet.size >= 4) break;
          optionsSet.add(d);
        }

        // Guaranteed fallback distractor words if root derivation is short
        const fallbackWords = ["being", "having", "done", "will be", "to have", "which"];
        for (const fw of fallbackWords) {
          if (optionsSet.size >= 4) break;
          if (fw.toLowerCase() !== ex.highlight.toLowerCase()) {
            optionsSet.add(fw);
          }
        }

        const options = Array.from(optionsSet).slice(0, 4);
        options.sort(() => 0.5 - Math.random());

        return {
          id: idx + 1,
          sentence: blankSentence !== ex.en ? `${blankSentence} (${ex.vi})` : `${ex.en} (Chọn đáp án đúng)`,
          blank: "___",
          correctAnswer: ex.highlight,
          options: options,
          explanation: `Đáp án chuẩn là "${ex.highlight}". Giải thích ngữ cảnh: ${ex.vi}`,
          difficulty: idx < 2 ? "easy" : idx < 4 ? "medium" : "hard",
        };
      });

      parsed = {
        topic: topic,
        exercises: fallbackExercises,
      };
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Grammar API error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
