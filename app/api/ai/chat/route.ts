import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { messages, topicId } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";
    
    // Fallback response if API Key is not set yet
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        reply: "That's very interesting! Could you share more about it?",
        vietnameseTranslation: "Điều đó thật thú vị! Bạn có thể chia sẻ thêm về nó không?",
        corrections: ["Mẹo nhỏ: Bạn nên bắt đầu câu bằng chữ in hoa."],
        suggestions: ["Gợi ý: Dùng 'Could you tell me more' nghe tự nhiên hơn 'Tell me more'."],
        goalsCompleted: []
      });
    }

    // System instruction for Gemini English partner
    const systemPrompt = `You are a supportive, high-end native English conversation tutor named "Companion AI".
The user is an English student. You must respond in a JSON format matching the schema below.

Current scenario topic: "${topicId || 'Free Conversation'}".
Possible scenario goals to track (if matching current topic):
- Topic "at1" (Ordering Food):
  * "at1_salad" (User ordered a salad)
  * "at1_orange" (User ordered orange juice)
  * "at1_no_ice" (User asked for no ice)
- Topic "at2" (Job Interview):
  * "at2_intro" (User introduced themselves/background)
  * "at2_skills" (User stated skills/strengths/experience)
  * "at2_salary" (User mentioned expected salary range)
- Topic "at3" (Traveling):
  * "at3_directions" (User asked for directions/location)
  * "at3_hotel" (User discussed hotel room/booking)
  * "at3_price" (User asked about ticket/room price)
- Topic "at4" (Tech Discussion):
  * "at4_explain_ai" (User explained an app/tool/AI)
  * "at4_opinion" (User shared an opinion on technology/automation)
  * "at4_future" (User described future tech vision)
  
Your JSON response MUST contain exactly these fields:
{
  "reply": "Friendly response to the user's latest message (2-3 sentences max). Maintain the conversation flow, ask a follow-up question. Tone should match student's English level.",
  "vietnameseTranslation": "A natural, polite Vietnamese translation of the reply for student's reference.",
  "corrections": ["Array of concise corrections (in Vietnamese) for any grammar, spelling, or punctuation mistakes the user made in their LATEST message. Empty array if none."],
  "suggestions": ["Array of native expression alternatives or vocabulary upgrades (in Vietnamese) to help the user sound more natural. Empty array if none."],
  "goalsCompleted": ["Array of goal IDs (e.g., 'at1_salad', 'at1_no_ice') that the user completed in this turn or in the conversation history so far. Only detect matching goals for the current topic."]
}

Return ONLY the raw JSON block. No markdown backticks, no comments, no extra characters. Ensure valid JSON parsing.`;

    // Convert frontend messages to Gemini contents format
    let contents = messages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    // Gemini API requires multi-turn chat to start with a 'user' message.
    if (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    if (contents.length === 0) {
      return NextResponse.json({
        success: true,
        reply: "Hello! How can I help you today?",
        vietnameseTranslation: "Xin chào! Hôm nay tôi có thể giúp gì cho bạn?",
        corrections: [],
        suggestions: [],
        goalsCompleted: []
      });
    }

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

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      console.error("Gemini API error response:", data);
      throw new Error("Failed to get content from Gemini");
    }

    let parsedData;
    try {
      parsedData = JSON.parse(candidateText.trim());
    } catch (e) {
      parsedData = {
        reply: candidateText.trim(),
        vietnameseTranslation: "Không thể dịch phản hồi này.",
        corrections: [],
        suggestions: [],
        goalsCompleted: []
      };
    }

    return NextResponse.json({ success: true, ...parsedData });
  } catch (error: any) {
    console.error("POST /api/ai/chat error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}