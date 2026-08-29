import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { isRateLimited } from "@/infrastructure/security/rateLimit";
import { NextResponse } from "next/server";

// Fallback topic suggestion banks for Voice Tutor
const TUTOR_TOPIC_BANKS: Record<string, {
  reply: string;
  vietnameseTranslation: string;
  words: Array<{ word: string; ipa: string; meaning: string }>;
  phrases: string[];
}> = {
  movies: {
    reply: "Movies are a fantastic way to learn English! What genre do you enjoy the most — action, sci-fi, or comedy?",
    vietnameseTranslation: "Phim ảnh là cách tuyệt vời để học tiếng Anh! Bạn thích thể loại nào nhất — hành động, viễn tưởng hay hài kịch?",
    words: [
      { word: "cinematography", ipa: "/ˌsɪn.ə.məˈtɑː.ɡrə.fi/", meaning: "nghệ thuật quay phim" },
      { word: "soundtrack", ipa: "/ˈsaʊnd.træk/", meaning: "nhạc phim" },
      { word: "blockbuster", ipa: "/ˈblɑːkˌbʌs.tər/", meaning: "phim bom tấn" }
    ],
    phrases: [
      "I'm a big fan of sci-fi films because...",
      "The storyline was absolutely gripping because..."
    ]
  },
  food: {
    reply: "Talking about food always makes me hungry! Do you prefer cooking at home or dining out with friends?",
    vietnameseTranslation: "Nói về đồ ăn luôn làm tôi thấy thèm! Bạn thích tự nấu ở nhà hay đi ăn ngoài với bạn bè hơn?",
    words: [
      { word: "ingredient", ipa: "/ɪnˈɡriː.di.ənt/", meaning: "nguyên liệu" },
      { word: "flavorful", ipa: "/ˈfleɪ.vər.fəl/", meaning: "đậm đà hương vị" },
      { word: "homemade", ipa: "/ˌhoʊmˈmeɪd/", meaning: "tự làm tại nhà" }
    ],
    phrases: [
      "My go-to comfort food is...",
      "Nothing beats a homemade meal like..."
    ]
  },
  travel: {
    reply: "Traveling is the best way to broaden your horizons! Have you visited any memorable places recently?",
    vietnameseTranslation: "Du lịch là cách tuyệt vời nhất để mở rộng tầm nhìn! Gần đây bạn có ghé thăm nơi nào đáng nhớ không?",
    words: [
      { word: "destination", ipa: "/ˌdes.təˈneɪ.ʃən/", meaning: "điểm đến" },
      { word: "scenery", ipa: "/ˈsiː.nər.i/", meaning: "phong cảnh" },
      { word: "breathtaking", ipa: "/ˈbreθˌteɪ.kɪŋ/", meaning: "đẹp ngột ngạt" }
    ],
    phrases: [
      "One of my dream destinations is...",
      "The scenery there was absolutely breathtaking because..."
    ]
  },
  tech: {
    reply: "Technology is evolving so rapidly! What is your favorite tech gadget or AI app you use daily?",
    vietnameseTranslation: "Công nghệ đang phát triển rất nhanh! Thiết bị công nghệ hoặc ứng dụng AI bạn dùng hàng ngày là gì?",
    words: [
      { word: "automation", ipa: "/ˌɑː.t̬əˈmeɪ.ʃən/", meaning: "tự động hóa" },
      { word: "artificial", ipa: "/ˌɑːr.t̬əˈfɪʃ.əl/", meaning: "nhân tạo" },
      { word: "efficiency", ipa: "/ɪˈfɪʃ.ən.si/", meaning: "hiệu suất" }
    ],
    phrases: [
      "I use AI every day to help me...",
      "Technology has significantly improved my productivity by..."
    ]
  },
  work: {
    reply: "Balancing work and personal life is essential. What does a typical productive day look like for you?",
    vietnameseTranslation: "Cân bằng công việc và cuộc sống rất quan trọng. Một ngày làm việc hiệu quả của bạn diễn ra thế nào?",
    words: [
      { word: "productivity", ipa: "/ˌproʊ.dʌkˈtɪv.ə.t̬i/", meaning: "năng suất" },
      { word: "deadline", ipa: "/ˈded.laɪn/", meaning: "hạn chót" },
      { word: "collaboration", ipa: "/kəˌlæb.əˈreɪ.ʃən/", meaning: "hợp tác" }
    ],
    phrases: [
      "I prioritize my tasks each morning by...",
      "Effective teamwork helps us achieve..."
    ]
  },
  general: {
    reply: "That is a very interesting thought! Could you elaborate a bit more on why you think so?",
    vietnameseTranslation: "Đó là một ý nghĩ rất thú vị! Bạn có thể chia sẻ thêm một chút về lý do bạn nghĩ như vậy không?",
    words: [
      { word: "perspective", ipa: "/pərˈspek.tɪv/", meaning: "góc nhìn, quan điểm" },
      { word: "fascinating", ipa: "/ˈfæs.ən.eɪ.tɪŋ/", meaning: "hấp dẫn, lôi cuốn" },
      { word: "specifically", ipa: "/spəˈsɪf.ɪ.kli/", meaning: "cụ thể là" }
    ],
    phrases: [
      "From my point of view, ...",
      "The primary reason is that..."
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
    const { messages, persona, speed } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";

    // Persona setup
    const personaStyle = persona === "alex"
      ? "Alex: American friendly English coach, modern and conversational"
      : persona === "chloe"
      ? "Chloe: Australian patient English tutor, warm and easy to understand"
      : "Emma: British polite and articulate IELTS speech coach";

    // System instruction for Open-ended FreeTalk Voice Tutor
    const systemPrompt = `You are an expert native English Speech Coach & Conversation Partner named "${personaStyle}".
The student is practicing spoken English in an open-ended conversation on ANY topic they choose.
Your job is to:
1. Provide a short, engaging, natural response in English (1-2 sentences max) that keeps the conversation flowing and invites them to speak.
2. Analyze the student's latest message: detect any grammar/vocabulary mistakes, give a clear Vietnamese explanation, and offer a natural native-speaker phrasing.
3. Dynamically generate turn-by-turn vocabulary and phrase suggestions related to the CURRENT topic/context of the conversation so the student never runs out of words.

Your output MUST be a valid JSON object matching this exact schema:
{
  "reply": "Short natural English reply (1-2 sentences).",
  "vietnameseTranslation": "Bản dịch Tiếng Việt lịch sự, tự nhiên.",
  "grammarCorrection": {
    "hasError": false,
    "original": "original phrase",
    "corrected": "corrected phrase",
    "explanation": "Giải thích ngắn gọn bằng Tiếng Việt lý do sai và cách dùng đúng."
  },
  "betterPhrasing": "Pure natural native English sentence representing the user's intent. Output ONLY the English sentence itself without conversational prefixes like 'A more natural way...' or quotation marks.",
  "suggestedWords": [
    { "word": "word1", "ipa": "/ipa1/", "meaning": "nghĩa tiếng Việt 1" },
    { "word": "word2", "ipa": "/ipa2/", "meaning": "nghĩa tiếng Việt 2" },
    { "word": "word3", "ipa": "/ipa3/", "meaning": "nghĩa tiếng Việt 3" }
  ],
  "suggestedPhrases": [
    "Useful sentence starter or collocation 1",
    "Useful sentence starter or collocation 2"
  ]
}

CRITICAL RULES:
1. "suggestedWords" MUST contain EXACTLY 3 high-value English words relevant to what the student should say next.
2. "suggestedPhrases" MUST contain EXACTLY 2 natural sentence starter phrases that the student can say aloud to answer your question.
3. Return ONLY raw JSON format. No markdown fences. Ensure valid JSON parsing.`;

    let contents = messages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    // Ensure it starts with user role
    if (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    const defaultFallback = TUTOR_TOPIC_BANKS.general;

    if (contents.length === 0) {
      return NextResponse.json({
        success: true,
        reply: "Hello! I am your AI Voice Tutor. What would you like to talk about today?",
        vietnameseTranslation: "Xin chào! Tôi là Gia sư Giọng nói AI. Hôm nay bạn muốn trò chuyện về chủ đề gì nào?",
        suggestedWords: [
          { word: "hobby", ipa: "/ˈhɑː.bi/", meaning: "sở thích" },
          { word: "favorite", ipa: "/ˈfeɪ.vər.ɪt/", meaning: "yêu thích" },
          { word: "routine", ipa: "/ruːˈtiːn/", meaning: "thói quen hàng ngày" }
        ],
        suggestedPhrases: [
          "I'd love to talk about...",
          "Recently, I've been really into..."
        ]
      });
    }

    let parsedData: any = null;
    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];

    if (apiKey) {
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
          console.warn(`AI Tutor model ${modelName} call failed, trying next fallback:`, mErr);
        }
      }
    }

    // Fallback if all API model calls failed or no API key
    if (!parsedData || !parsedData.reply) {
      const lastUserText = messages[messages.length - 1]?.text || "";
      const lower = lastUserText.toLowerCase();

      let matchedBank = TUTOR_TOPIC_BANKS.general;
      if (lower.includes("movie") || lower.includes("film") || lower.includes("watch")) {
        matchedBank = TUTOR_TOPIC_BANKS.movies;
      } else if (lower.includes("food") || lower.includes("eat") || lower.includes("restaurant") || lower.includes("cook")) {
        matchedBank = TUTOR_TOPIC_BANKS.food;
      } else if (lower.includes("travel") || lower.includes("trip") || lower.includes("visit") || lower.includes("hotel")) {
        matchedBank = TUTOR_TOPIC_BANKS.travel;
      } else if (lower.includes("tech") || lower.includes("ai") || lower.includes("code") || lower.includes("app")) {
        matchedBank = TUTOR_TOPIC_BANKS.tech;
      } else if (lower.includes("work") || lower.includes("job") || lower.includes("company") || lower.includes("career")) {
        matchedBank = TUTOR_TOPIC_BANKS.work;
      }

      parsedData = {
        reply: matchedBank.reply,
        vietnameseTranslation: matchedBank.vietnameseTranslation,
        grammarCorrection: undefined,
        betterPhrasing: "I'd really love to share more about that.",
        suggestedWords: matchedBank.words,
        suggestedPhrases: matchedBank.phrases
      };
    }

    // Ensure suggestedWords has exactly 3 items and suggestedPhrases has exactly 2 items
    if (!parsedData.suggestedWords || parsedData.suggestedWords.length < 3) {
      parsedData.suggestedWords = defaultFallback.words.slice(0, 3);
    } else {
      parsedData.suggestedWords = parsedData.suggestedWords.slice(0, 3);
    }

    if (!parsedData.suggestedPhrases || parsedData.suggestedPhrases.length < 2) {
      parsedData.suggestedPhrases = defaultFallback.phrases.slice(0, 2);
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
    console.error("POST /api/ai/tutor error:", error);
    const fallbackBank = TUTOR_TOPIC_BANKS.general;
    return NextResponse.json({
      success: true,
      reply: "Hello! I am your AI Voice Tutor. Please speak or type to begin our conversation.",
      vietnameseTranslation: "Xin chào! Tôi là Gia sư Giọng nói AI. Hãy nói hoặc nhập tin nhắn để bắt đầu cuộc trò chuyện nhé.",
      suggestedWords: fallbackBank.words.slice(0, 3),
      suggestedPhrases: fallbackBank.phrases.slice(0, 2)
    });
  }
}
