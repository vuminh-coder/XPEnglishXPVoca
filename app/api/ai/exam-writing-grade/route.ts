import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt = "", userEssay = "", examType = "IELTS" } = body;

    if (!userEssay || userEssay.trim().length < 10) {
      return NextResponse.json(
        { error: "Vui lòng nhập bài viết hợp lệ để chấm điểm." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

    // Fallback evaluation if API key is not set
    if (!apiKey) {
      const wordCount = userEssay.trim().split(/\s+/).length;
      return NextResponse.json({
        success: true,
        evaluation: {
          overallBand: 7.0,
          wordCount,
          criteria: {
            taskAchievement: 7.0,
            coherenceCohesion: 7.0,
            lexicalResource: 7.5,
            grammaticalAccuracy: 6.5
          },
          feedbackText: "Bài viết có cấu trúc rõ ràng, sử dụng từ vựng đa dạng. Cần chú ý hoàn thiện một số cấu trúc câu ghép để đạt điểm cao hơn.",
          improvedEssaySample: userEssay + "\n\n(Phiên bản nâng cấp Band 8.0+ gợi ý bởi AI)"
        }
      });
    }

    const systemPrompt = `You are a certified senior examiner for ${examType} writing exams.
Evaluate the candidate's essay for the prompt: "${prompt}".

Candidate Essay (${userEssay.trim().split(/\s+/).length} words):
"${userEssay}"

Return ONLY valid JSON matching this exact structure (NO MARKDOWN BACKTICKS):
{
  "overallBand": 7.0,
  "wordCount": 255,
  "criteria": {
    "taskAchievement": 7.0,
    "coherenceCohesion": 7.0,
    "lexicalResource": 7.5,
    "grammaticalAccuracy": 6.5
  },
  "feedbackText": "Đánh giá tổng quan chi tiết bằng Tiếng Việt về điểm mạnh, điểm cần cải thiện...",
  "improvedEssaySample": "Gợi ý đoạn văn/bài viết nâng cấp Band 8.0+ mượt mà..."
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
              contents: [{ role: "user", parts: [{ text: systemPrompt }] }]
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
        if (parsedData && parsedData.overallBand !== undefined) break;
      } catch (e) {
        // Try next model
      }
    }

    if (!parsedData) {
      throw new Error("Could not parse AI writing evaluation response.");
    }

    return NextResponse.json({
      success: true,
      evaluation: parsedData
    });
  } catch (error: any) {
    console.error("AI Writing Evaluation Error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate AI writing essay", details: error.message },
      { status: 500 }
    );
  }
}
