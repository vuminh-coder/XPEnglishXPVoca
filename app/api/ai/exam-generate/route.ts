import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic = "Business & International Travel", targetScore = "700+", questionCount = 20, examType = "TOEIC" } = body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

    // Fallback response if API Key is not set
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        data: {
          title: `AI Generated ${examType} Test - ${topic}`,
          questions: Array.from({ length: Math.min(questionCount, 20) }).map((_, idx) => ({
            id: `ai_q${idx + 1}`,
            partNumber: 5,
            partTitle: "Part 5: Incomplete Sentences",
            section: "READING",
            questionText: `Question ${idx + 1}: The management team will review the proposal for ${topic} before final approval.`,
            options: [
              { key: "A", text: "prior to" },
              { key: "B", text: "instead" },
              { key: "C", text: "ahead" },
              { key: "D", text: "because" }
            ],
            correctAnswer: "A",
            explanation: "Cụm giới từ 'prior to' + V-ing/N mang nghĩa 'trước khi'. Cấu trúc phù hợp với ngữ cảnh câu hỏi."
          }))
        }
      });
    }

    const prompt = `You are a professional test developer for ${examType} English exams.
Generate a structured JSON containing ${questionCount} authentic multiple-choice exam questions for topic "${topic}", target score "${targetScore}".

Return ONLY valid JSON matching this exact structure (NO MARKDOWN BACKTICKS):
{
  "title": "AI Generated ${examType} Test - ${topic}",
  "questions": [
    {
      "id": "q1",
      "partNumber": 5,
      "partTitle": "Part 5: Incomplete Sentences",
      "section": "READING",
      "questionText": "The management team will review the proposal...",
      "options": [
        { "key": "A", "text": "prior to" },
        { "key": "B", "text": "instead" },
        { "key": "C", "text": "ahead" },
        { "key": "D", "text": "because" }
      ],
      "correctAnswer": "A",
      "explanation": "Lời giải thích chi tiết bằng tiếng Việt..."
    }
  ]
}`;

    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];
    let parsedData = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }]
            })
          }
        );

        if (!response.ok) continue;

        const resData = await response.json();
        const textResponse = resData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textResponse) continue;

        const cleanJsonText = textResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        parsedData = JSON.parse(cleanJsonText);
        if (parsedData && parsedData.questions) break;
      } catch (e) {
        // Try next model
      }
    }

    if (!parsedData) {
      throw new Error("Could not parse AI generated exam response.");
    }

    return NextResponse.json({
      success: true,
      data: parsedData
    });
  } catch (error: any) {
    console.error("AI Exam Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI exam questions", details: error.message },
      { status: 500 }
    );
  }
}
