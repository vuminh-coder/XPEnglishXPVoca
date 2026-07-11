import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { messages, mode, topicId } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";
    
    // Fallback response if API Key is not set yet
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        reply: "That's wonderful! Let's continue speaking.",
        vietnameseTranslation: "Thật tuyệt vời! Chúng ta hãy tiếp tục nói nhé.",
        wordAnalysis: [
          { word: "hobby", stress: "HOB-by", tips: "Nhấn trọng âm vào âm tiết đầu tiên." }
        ],
        pronunciationTips: ["Hãy chú ý phát âm âm đuôi '/i/' rõ ràng trong từ 'hobby'."]
      });
    }

    // System instruction for Gemini English Tutor
    const systemPrompt = `You are a supportive, expert native English Speech Coach named "AI Voice Tutor".
The student is practicing speaking English. You will listen (via their text transcript) and respond.
Your response MUST be in JSON format matching the schema below.

Mode: "${mode || 'Free Talk'}".
Scenario Topic: "${topicId || 'General'}".

Analyze the student's LATEST message. Produce pronunciation and phonetics guidance tailored to Vietnamese learners (who often drop final consonants, misplace word stress, or mispronounce silent letters).

Your JSON response MUST contain exactly these fields:
{
  "reply": "Conversational reply in English (1-2 sentences max). Keep it short so they can speak back.",
  "vietnameseTranslation": "Polite Vietnamese translation of the reply.",
  "wordAnalysis": [
    {
      "word": "The word from the user's latest text that needs attention",
      "stress": "Stress pattern guide (e.g., 'pho-TO-gra-phy')",
      "tips": "Brief instruction in Vietnamese on how to pronounce it, warning about common mistakes."
    }
  ],
  "pronunciationTips": [
    "Array of 1-2 practical tips in Vietnamese for reading the user's latest sentence (e.g. liaison, linking words, word reductions, or silent consonants)."
  ]
}

Return ONLY the raw JSON block. No markdown backticks, no comments, no extra characters. Ensure valid JSON parsing.`;

    let contents = messages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    // Ensure it starts with user role
    if (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    if (contents.length === 0) {
      return NextResponse.json({
        success: true,
        reply: "Hello! I am your voice tutor. Please speak to me to start.",
        vietnameseTranslation: "Xin chào! Tôi là gia sư giọng nói của bạn. Hãy nói chuyện với tôi để bắt đầu.",
        wordAnalysis: [],
        pronunciationTips: []
      });
    }

    let parsedData;
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: contents,
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
              responseMimeType: "application/json"
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error status: ${response.status}`);
      }

      const data = await response.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) {
        throw new Error("Failed to get content from Gemini");
      }

      parsedData = JSON.parse(candidateText.trim());
    } catch (apiError) {
      console.warn("AI Tutor fetch failed, using fallback simulated response:", apiError);
      
      const lastUserText = messages[messages.length - 1]?.text || "";
      
      parsedData = {
        reply: `That's interesting! You said: "${lastUserText}". Let's keep practicing.`,
        vietnameseTranslation: `Thật thú vị! Bạn vừa nói: "${lastUserText}". Hãy tiếp tục luyện tập nhé.`,
        wordAnalysis: [
          { word: "practice", stress: "PRAC-tice", tips: "Nhấn trọng âm vào âm tiết đầu tiên." }
        ],
        pronunciationTips: [
          "Chú ý phát âm rõ phụ âm cuối '/s/' trong từ 'practice'.",
          "Hãy cố gắng ngắt nghỉ tự nhiên sau mỗi mệnh đề."
        ]
      };
    }

    return NextResponse.json({ success: true, ...parsedData });
  } catch (error: any) {
    console.error("POST /api/ai/tutor error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
