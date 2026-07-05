import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { topic, level } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Missing topic" }, { status: 400 });
    }

    const userLevel = level || "intermediate";

    const prompt = `You are an English grammar teacher. Generate exactly 5 fill-in-the-blank grammar exercises about "${topic}" for a ${userLevel}-level student.

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
      "explanation": "We use 'goes' because the subject is third person singular (she) and the sentence describes a habitual action (every day), which requires the Present Simple tense."
    }
  ]
}

Rules:
- Each exercise must have exactly 4 options
- The correctAnswer must be one of the options
- The explanation must reference the specific grammar rule
- Vary difficulty across the 5 questions
- Return ONLY the JSON, no markdown`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({ error: "AI service unavailable" }, { status: 502 });
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Grammar API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
