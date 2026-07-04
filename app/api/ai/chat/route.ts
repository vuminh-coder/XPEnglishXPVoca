import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";
    
    // Fallback response if API Key is not set yet
    if (!apiKey) {
      const fallbackReplies = [
        "That's very interesting! Could you share more about it?",
        "Your English is great! Let's keep talking about this.",
        "Great job! Tip: you can say 'I would prefer...' to sound more native.",
        "I agree with you completely. Tell me more about your thoughts."
      ];
      const fallbackReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      return NextResponse.json({ success: true, reply: fallbackReply });
    }

    // System instruction for Gemini English partner
    const systemPrompt = "You are a friendly, encouraging English conversation partner named Companion AI. Keep your responses brief (2-3 sentences max) to keep the conversation flowing. Match the student's level. If they make a noticeable grammatical error, gently correct it in a constructive way, then ask a follow-up question. Respond only in English.";

    // Convert frontend messages to Gemini contents format
    const contents = messages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    // Prepend system prompt instructions as a system content or systemInstruction property
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
            maxOutputTokens: 200,
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

    return NextResponse.json({ success: true, reply: candidateText.trim() });
  } catch (error: any) {
    console.error("POST /api/ai/chat error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}