import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { topic, essay } = body;

    if (!topic || !essay) {
      return NextResponse.json({ error: "Missing topic or essay content" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";

    // 1. Fallback Mock response if GEMINI_API_KEY is not set
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        data: {
          bandScore: 6.5,
          taScore: 7.0,
          ccScore: 6.5,
          lrScore: 6.0,
          graScore: 6.0,
          generalFeedback: "Bài viết có cấu trúc tốt và tập trung vào chủ đề. Tuy nhiên, bạn cần đa dạng hóa các cấu trúc câu phức và sử dụng các cụm từ học thuật hơn để nâng band điểm Lexical Resource.",
          corrections: [
            { original: "decided to postpone", correction: "decided to postpone", reason: "Chính xác, cụm từ tốt." },
            { original: "more quickly than expected", correction: "more quickly than expected", reason: "Cấu trúc so sánh hơn đúng." },
          ],
          vocabUpgrades: [
            { original: "decide", upgrade: "make a firm decision", reason: "Giúp bài viết trang trọng hơn." },
            { original: "because of", upgrade: "owing to / on account of", reason: "Nâng band điểm liên từ học thuật." },
          ]
        }
      });
    }

    // 2. Prepare Gemini Prompt
    const systemPrompt = `You are an expert IELTS Writing Examiner. You must evaluate the student's essay based on the topic. 
    Score the essay on the standard 4 IELTS criteria (0-9 scale): Task Achievement (TA), Coherence and Cohesion (CC), Lexical Resource (LR), and Grammatical Range and Accuracy (GRA).
    You MUST respond with a single, valid JSON object ONLY. Do not include markdown code block formatting (like \`\`\`json) or any extra conversational text.
    The JSON structure must match exactly:
    {
      "bandScore": 6.5,
      "taScore": 7.0,
      "ccScore": 6.5,
      "lrScore": 6.0,
      "graScore": 6.0,
      "generalFeedback": "Short paragraphs summarizing overall strengths and weaknesses in Vietnamese.",
      "corrections": [
        { "original": "user incorrect text snippet", "correction": "corrected text snippet", "reason": "brief grammatical explanation in Vietnamese" }
      ],
      "vocabUpgrades": [
        { "original": "basic word", "upgrade": "band 8.0 synonym", "reason": "why this synonym is better for academic style in Vietnamese" }
      ]
    }`;

    const userPrompt = `Topic: "${topic}"\n\nEssay:\n"${essay}"`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userPrompt }]
            }
          ],
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
            responseMimeType: "application/json"
          }
        })
      }
    );

    const data = await response.json();
    let candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      console.error("Gemini API error response:", data);
      throw new Error("Failed to get writing assessment from Gemini");
    }

    // Clean JSON response if block quotes exist
    candidateText = candidateText.trim().replace(/^```json/, "").replace(/```$/, "");
    const parsedData = JSON.parse(candidateText);

    return NextResponse.json({
      success: true,
      data: parsedData
    });
  } catch (error: any) {
    console.error("POST /api/ai/writing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
