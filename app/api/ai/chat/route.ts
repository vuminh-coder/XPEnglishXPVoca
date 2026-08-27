import { getAuthenticatedUserId } from "@/lib/auth";
import { isRateLimited } from "@/lib/rateLimit";
import { NextResponse } from "next/server";

// Fallback topic suggestion banks
const TOPIC_SUGGESTION_BANKS: Record<string, {
  words: Array<{ word: string; ipa: string; meaning: string }>;
  phrases: string[];
}> = {
  at1: {
    words: [
      { word: "beverage", ipa: "/ˈbev.ɚ.ɪdʒ/", meaning: "đồ uống" },
      { word: "recommend", ipa: "/ˌrek.əˈmend/", meaning: "gợi ý, tiến cử" },
      { word: "delicious", ipa: "/dɪˈlɪʃ.əs/", meaning: "ngon miệng" }
    ],
    phrases: [
      "I'd like to order a fresh salad, please.",
      "What beverages do you have today?"
    ]
  },
  at2: {
    words: [
      { word: "achievement", ipa: "/əˈtʃiːv.mənt/", meaning: "thành tựu" },
      { word: "strengths", ipa: "/streŋkθs/", meaning: "điểm mạnh" },
      { word: "contribute", ipa: "/kənˈtrɪb.juːt/", meaning: "đóng góp" }
    ],
    phrases: [
      "My strongest skill is problem solving.",
      "I have three years of experience in this field."
    ]
  },
  at3: {
    words: [
      { word: "reservation", ipa: "/ˌrez.ɚˈveɪ.ʃən/", meaning: "đặt chỗ" },
      { word: "itinerary", ipa: "/aɪˈtɪn.ə.rer.i/", meaning: "lịch trình" },
      { word: "sightseeing", ipa: "/ˈsaɪtˌsiː.ɪŋ/", meaning: "ngắm cảnh" }
    ],
    phrases: [
      "I have a reservation under my name.",
      "Could you recommend the best sightseeing spot?"
    ]
  },
  at4: {
    words: [
      { word: "artificial", ipa: "/ˌɑːr.t̬əˈfɪʃ.əl/", meaning: "nhân tạo" },
      { word: "automation", ipa: "/ˌɑː.t̬əˈmeɪ.ʃən/", meaning: "tự động hóa" },
      { word: "breakthrough", ipa: "/ˈbreɪk.θruː/", meaning: "đột phá" }
    ],
    phrases: [
      "AI helps me write code and learn faster.",
      "In my opinion, technology creates new opportunities."
    ]
  },
  at5: {
    words: [
      { word: "discount", ipa: "/ˈdɪs.kaʊnt/", meaning: "giảm giá" },
      { word: "fitting room", ipa: "/ˈfɪt.ɪŋ ˌruːm/", meaning: "phòng thử đồ" },
      { word: "affordable", ipa: "/əˈfɔːr.də.bəl/", meaning: "vừa túi tiền" }
    ],
    phrases: [
      "Do you have this in medium size?",
      "Is there any special discount on this item?"
    ]
  },
  at6: {
    words: [
      { word: "boarding pass", ipa: "/ˈbɔːr.dɪŋ ˌpæs/", meaning: "thẻ lên máy bay" },
      { word: "luggage", ipa: "/ˈlʌɡ.ɪdʒ/", meaning: "hành lý" },
      { word: "departure", ipa: "/dɪˈpɑːr.tʃɚ/", meaning: "khởi hành" }
    ],
    phrases: [
      "Here is my passport and booking reference.",
      "Can I request a window seat, please?"
    ]
  }
};

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate Limit: Max 25 requests per minute
    if (isRateLimited(userId, 25, 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const body = await request.json();
    const { messages, topicId } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";
    const fallbackBank = TOPIC_SUGGESTION_BANKS[topicId] || TOPIC_SUGGESTION_BANKS.at1;

    // Fallback response if API Key is not set yet
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        reply: "That's very interesting! Could you share more about it?",
        vietnameseTranslation: "Điều đó thật thú vị! Bạn có thể chia sẻ thêm về nó không?",
        grammarCorrection: undefined,
        betterPhrasing: "I'd really love to share more about that with you.",
        suggestedWords: fallbackBank.words.slice(0, 3),
        suggestedPhrases: fallbackBank.phrases.slice(0, 2),
        goalsCompleted: []
      });
    }

    // System instruction for Gemini English Conversation Partner
    const systemPrompt = `You are a supportive, high-end native English conversation tutor named "Companion AI".
The user is practicing conversational spoken English in a specific scenario.

Current scenario topic ID: "${topicId || 'at1'}".
Scenario Goal IDs to detect (if the user achieved them in their speech):
- Topic "at1" (Restaurant & Ordering): "at1_greeting", "at1_ordering", "at1_paying"
- Topic "at2" (Job Interview): "at2_intro", "at2_strength", "at2_why"
- Topic "at3" (Travel & Hotel): "at3_directions", "at3_hotel", "at3_price"
- Topic "at4" (Tech Discussion): "at4_explain_ai", "at4_opinion", "at4_future"
- Topic "at5" (Shopping & Bargaining): "at5_size", "at5_discount", "at5_pay"
- Topic "at6" (Airport Check-in): "at6_ticket", "at6_seat", "at6_baggage"

Your JSON response MUST follow this exact schema:
{
  "reply": "Short natural English reply (1-2 sentences). Respond warmly and ask a follow-up question.",
  "vietnameseTranslation": "Bản dịch Tiếng Việt tự nhiên, lịch sự của câu reply.",
  "grammarCorrection": {
    "hasError": true/false,
    "original": "cụm từ sai của học viên",
    "corrected": "cụm từ sửa đúng",
    "explanation": "Giải thích ngắn gọn bằng Tiếng Việt lý do sai."
  },
  "betterPhrasing": "Pure natural native English sentence representing the user's intent. Output ONLY the English sentence itself without conversational prefixes like 'A more natural way...' or quotation marks.",
  "suggestedWords": [
    { "word": "word1", "ipa": "/ipa1/", "meaning": "nghĩa tiếng Việt 1" },
    { "word": "word2", "ipa": "/ipa2/", "meaning": "nghĩa tiếng Việt 2" },
    { "word": "word3", "ipa": "/ipa3/", "meaning": "nghĩa tiếng Việt 3" }
  ],
  "suggestedPhrases": [
    "Sentence starter 1 to answer your question...",
    "Sentence starter 2 to answer your question..."
  ],
  "goalsCompleted": ["Array of goal IDs achieved by the user in this turn or so far."]
}

CRITICAL RULES:
1. "suggestedWords" MUST contain EXACTLY 3 high-value English words directly relevant to the current topic and your question.
2. "suggestedPhrases" MUST contain EXACTLY 2 natural sentence starter phrases that the student can easily say aloud to answer your question.
3. Return ONLY raw JSON format. No markdown fences. Ensure valid JSON parsing.`;

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
        reply: "Hello! Welcome to our session. What would you like to practice today?",
        vietnameseTranslation: "Xin chào! Chào mừng tới buổi luyện nói. Bạn muốn luyện tập nội dung gì hôm nay?",
        suggestedWords: fallbackBank.words.slice(0, 3),
        suggestedPhrases: fallbackBank.phrases.slice(0, 2),
        goalsCompleted: []
      });
    }

    let parsedData: any = null;
    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];

    for (const modelName of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
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

        if (response.ok) {
          const data = await response.json();
          let candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            candidateText = candidateText.trim().replace(/^```json/i, "").replace(/^```/i, "").replace(/```$/i, "").trim();
            const jsonMatch = candidateText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              parsedData = JSON.parse(jsonMatch[0]);
              if (parsedData && parsedData.reply) {
                break; // Success
              }
            }
          }
        }
      } catch (mErr) {
        console.warn(`Gemini model ${modelName} call failed, trying next fallback:`, mErr);
      }
    }

    // Fallback if all API model calls failed
    if (!parsedData || !parsedData.reply) {
      const lastUserMsg = messages[messages.length - 1]?.text || "hello";
      parsedData = {
        reply: `That sounds great! Regarding "${lastUserMsg}", what else would you like to add?`,
        vietnameseTranslation: `Nghe thật tuyệt! Về "${lastUserMsg}", bạn muốn bổ sung thêm điều gì?`,
        grammarCorrection: undefined,
        betterPhrasing: "I'd also like to mention that...",
        suggestedWords: fallbackBank.words.slice(0, 3),
        suggestedPhrases: fallbackBank.phrases.slice(0, 2),
        goalsCompleted: []
      };
    }

    // Ensure suggestedWords has 3 items and suggestedPhrases has 2 items
    if (!parsedData.suggestedWords || parsedData.suggestedWords.length < 3) {
      parsedData.suggestedWords = fallbackBank.words.slice(0, 3);
    } else {
      parsedData.suggestedWords = parsedData.suggestedWords.slice(0, 3);
    }

    if (!parsedData.suggestedPhrases || parsedData.suggestedPhrases.length < 2) {
      parsedData.suggestedPhrases = fallbackBank.phrases.slice(0, 2);
    } else {
      parsedData.suggestedPhrases = parsedData.suggestedPhrases.slice(0, 2);
    }

    if (parsedData.grammarCorrection && typeof parsedData.grammarCorrection.explanation === "string") {
      parsedData.grammarCorrection.explanation = parsedData.grammarCorrection.explanation
        .replace(/^\((.*)\)$/, "$1")
        .trim();
    }

    if (parsedData.betterPhrasing && typeof parsedData.betterPhrasing === "string") {
      parsedData.betterPhrasing = parsedData.betterPhrasing
        .replace(/^["']|["']$/g, "")
        .replace(/^(A more natural way to say that (would be|is)|You can say|You could say|A better phrasing is|Try saying),?\s*/i, "")
        .replace(/^["']|["']$/g, "")
        .trim();
    }

    return NextResponse.json({ success: true, ...parsedData });
  } catch (error: any) {
    console.error("POST /api/ai/chat error:", error);
    const fallbackBank = TOPIC_SUGGESTION_BANKS.at1;
    return NextResponse.json({
      success: true,
      reply: "I am ready to help you practice English! Tell me more.",
      vietnameseTranslation: "Tôi sẵn sàng giúp bạn luyện tiếng Anh! Hãy nói thêm cho tôi nghe.",
      suggestedWords: fallbackBank.words.slice(0, 3),
      suggestedPhrases: fallbackBank.phrases.slice(0, 2),
      goalsCompleted: []
    });
  }
}