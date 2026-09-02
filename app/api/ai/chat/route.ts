import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { isRateLimited } from "@/infrastructure/security/rateLimit";
import { NextResponse } from "next/server";

// Helper for smart fallback responses when offline or testing
function getSmartQuickAskFallback(question: string) {
  const q = (question || "").toLowerCase();

  if (q.includes("hi") && q.includes("hello")) {
    return `Phân biệt "Hi" và "Hello" trong giao tiếp Tiếng Anh:

1. Hello (Trang trọng & Lịch sự):
- Sử dụng trong bối cảnh công việc, chào hỏi người lớn tuổi, đối tác hoặc khi bắt đầu cuộc gọi điện thoại.
- Ví dụ: "Hello Mr. Smith, nice to meet you." (Xin chào ông Smith, rất vui được gặp ông.)

2. Hi (Thân mật & Gần gũi):
- Sử dụng với bạn bè, đồng nghiệp quen thân hoặc trong giao tiếp đời thường hàng ngày.
- Ví dụ: "Hi Sarah! How is it going?" (Chào Sarah! Dạo này thế nào rồi?)

3. Mẹo ghi nhớ:
- Dùng "Hello" khi muốn thể hiện sự trang trọng, lịch sự.
- Dùng "Hi" khi muốn tạo không khí thoải mái, gần gũi.`;
  }

  if (q.includes("affect") && q.includes("effect")) {
    return `Phân biệt "Affect" và "Effect":

1. Affect (Động từ):
- Nghĩa: Tác động đến, ảnh hưởng đến điều gì đó.
- Ví dụ: "The cold weather affected our health." (Thời tiết lạnh đã ảnh hưởng đến sức khỏe của chúng tôi.)

2. Effect (Danh từ):
- Nghĩa: Kết quả, tác động, hệ quả của một hành động.
- Ví dụ: "The new policy had a positive effect on the team." (Chính sách mới đã tạo ra hiệu quả tích cực.)

3. Mẹo nhớ RAVEN:
- Remember: Affect is a Verb, Effect is a Noun.`;
  }

  if (q.includes("say") && (q.includes("tell") || q.includes("speak") || q.includes("talk"))) {
    return `Phân biệt "Say", "Tell", "Speak" và "Talk":

1. Say (Nói ra điều gì):
- Chú trọng vào nội dung câu nói, theo sau là mệnh đề hoặc "to someone".
- Ví dụ: "She said that she was tired." (Cô ấy nói rằng cô ấy mệt.)

2. Tell (Bảo/kể cho ai):
- Bắt buộc có tân ngữ chỉ người đi sau: "tell someone something".
- Ví dụ: "Please tell me the truth." (Làm ơn hãy nói cho tôi biết sự thật.)

3. Speak & Talk (Nói chuyện/Giao tiếp):
- Speak mang tính trang trọng hoặc nói một ngôn ngữ: "speak English".
- Talk mang tính trò chuyện thân mật: "talk with friends".`;
  }

  if (q.includes("listen") && q.includes("hear")) {
    return `Phân biệt "Listen" và "Hear":

1. Hear (Nghe thấy):
- Khả năng nghe thụ động của tai, âm thanh tự lọt vào tai mà không cần tập trung.
- Ví dụ: "Did you hear that noise?" (Bạn có nghe thấy tiếng động đó không?)

2. Listen (Lắng nghe):
- Hành động chủ động tập trung chú ý để hiểu âm thanh (thường đi với "to").
- Ví dụ: "I love listening to English podcasts." (Tôi rất thích lắng nghe các podcast tiếng Anh.)`;
  }

  // General structured template
  return `Giải đáp về "${question}":

1. Bản chất & Định nghĩa:
- Hãy xác định từ loại (danh từ, động từ, tính từ) và mức độ trang trọng (formal vs informal).
- Chú ý các cụm từ cố định (Collocations) thường đi kèm để sử dụng tự nhiên nhất.

2. Ví dụ minh họa:
- Ví dụ chuẩn ngữ pháp: "Practice making full sentences daily to master this concept."
- Dịch nghĩa: Hãy luyện tập đặt câu hoàn chỉnh mỗi ngày để thành thạo quy tắc này.

3. Lời khuyên học tập:
- Ghi chú từ này vào sổ tay flashcard kèm ví dụ ngữ cảnh cụ thể để nhớ lâu hơn.`;
}

// Fallback topic suggestion banks
const TOPIC_SUGGESTION_BANKS: Record<
  string,
  {
    words: Array<{ word: string; ipa: string; meaning: string }>;
    phrases: string[];
  }
> = {
  at1: {
    words: [
      { word: "beverage", ipa: "/ˈbev.ɚ.ɪdʒ/", meaning: "đồ uống" },
      { word: "recommend", ipa: "/ˌrek.əˈmend/", meaning: "gợi ý, tiến cử" },
      { word: "delicious", ipa: "/dɪˈlɪʃ.əs/", meaning: "ngon miệng" },
    ],
    phrases: [
      "I'd like to order a fresh salad, please.",
      "What beverages do you have today?",
    ],
  },
  at2: {
    words: [
      { word: "achievement", ipa: "/əˈtʃiːv.mənt/", meaning: "thành tựu" },
      { word: "strengths", ipa: "/streŋkθs/", meaning: "điểm mạnh" },
      { word: "contribute", ipa: "/kənˈtrɪb.juːt/", meaning: "đóng góp" },
    ],
    phrases: [
      "My strongest skill is problem solving.",
      "I have three years of experience in this field.",
    ],
  },
  at3: {
    words: [
      { word: "reservation", ipa: "/ˌrez.ɚˈveɪ.ʃən/", meaning: "đặt chỗ" },
      { word: "itinerary", ipa: "/aɪˈtɪn.ə.rer.i/", meaning: "lịch trình" },
      { word: "sightseeing", ipa: "/ˈsaɪtˌsiː.ɪŋ/", meaning: "ngắm cảnh" },
    ],
    phrases: [
      "I have a reservation under my name.",
      "Could you recommend the best sightseeing spot?",
    ],
  },
  at4: {
    words: [
      { word: "artificial", ipa: "/ˌɑːr.t̬əˈfɪʃ.əl/", meaning: "nhân tạo" },
      { word: "automation", ipa: "/ˌɑː.t̬əˈmeɪ.ʃən/", meaning: "tự động hóa" },
      { word: "breakthrough", ipa: "/ˈbreɪk.θruː/", meaning: "đột phá" },
    ],
    phrases: [
      "AI helps me write code and learn faster.",
      "In my opinion, technology creates new opportunities.",
    ],
  },
  at5: {
    words: [
      { word: "discount", ipa: "/ˈdɪs.kaʊnt/", meaning: "giảm giá" },
      { word: "fitting room", ipa: "/ˈfɪt.ɪŋ ˌruːm/", meaning: "phòng thử đồ" },
      { word: "affordable", ipa: "/əˈfɔːr.də.bəl/", meaning: "vừa túi tiền" },
    ],
    phrases: [
      "Do you have this in medium size?",
      "Is there any special discount on this item?",
    ],
  },
  at6: {
    words: [
      { word: "boarding pass", ipa: "/ˈbɔːr.dɪŋ ˌpæs/", meaning: "thẻ lên máy bay" },
      { word: "luggage", ipa: "/ˈlʌɡ.ɪdʒ/", meaning: "hành lý" },
      { word: "departure", ipa: "/dɪˈpɑːr.tʃɚ/", meaning: "khởi hành" },
    ],
    phrases: [
      "Here is my passport and booking reference.",
      "Can I request a window seat, please?",
    ],
  },
};

export async function POST(request: Request) {
  try {
    const userId = (await getAuthenticatedUserId(request)) || "guest_ai_user";

    // Rate Limit: Max 30 requests per minute
    if (isRateLimited(userId, 30, 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const body = await request.json();
    const { messages, topicId, stream = false, mode = "conversation" } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";
    const fallbackBank = TOPIC_SUGGESTION_BANKS[topicId] || TOPIC_SUGGESTION_BANKS.at1;

    // System instruction: Distinguish between Quick Ask (Tiếng Việt giải nghĩa) vs Speaking Conversation
    let systemPrompt = "";
    if (mode === "quick_ask" || mode === "tutor") {
      systemPrompt = `Bạn là Giảng viên Tiếng Anh AI thông minh, tận tâm của hệ thống XP English.
Nhiệm vụ của bạn: Giải thích cặn kẽ, rõ ràng, chuẩn xác bằng TIẾNG VIỆT cho mọi câu hỏi của người học về từ vựng, ngữ pháp, phát âm IPA, mẹo làm bài thi TOEIC/IELTS, hoặc dịch thuật.
Mọi câu ví dụ tiếng Anh cần có phiên âm hoặc dịch nghĩa tiếng Việt đi kèm để người học dễ tiếp thu nhất.

Định dạng trả về BẮT BUỘC là JSON hợp lệ theo schema sau:
{
  "reply": "Câu trả lời giải thích chi tiết, thân thiện bằng TIẾNG VIỆT, trình bày đẹp mắt rõ ràng với các ví dụ tiếng Anh minh họa cụ thể.",
  "vietnameseTranslation": "Tóm tắt ngắn gọn quy tắc hoặc cốt lõi câu trả lời bằng Tiếng Việt.",
  "betterPhrasing": "Câu tiếng Anh chuẩn mực liên quan (nếu có)",
  "suggestedWords": [
    { "word": "từ_1", "ipa": "/ipa1/", "meaning": "nghĩa tiếng Việt 1" },
    { "word": "từ_2", "ipa": "/ipa2/", "meaning": "nghĩa tiếng Việt 2" },
    { "word": "từ_3", "ipa": "/ipa3/", "meaning": "nghĩa tiếng Việt 3" }
  ],
  "suggestedPhrases": [
    "Cụm từ / câu mẫu 1 liên quan...",
    "Cụm từ / câu mẫu 2 liên quan..."
  ]
}

QUY TẮC QUAN TRỌNG:
1. "reply" PHẢI LÀ TIẾNG VIỆT giải thích trực tiếp câu hỏi của người dùng, không chào hỏi dài dòng, đi thẳng vào bản chất vấn đề.
2. Trả về đúng JSON nguyên bản, không bọc markdown \`\`\`json.`;
    } else {
      systemPrompt = `You are a supportive, high-end native English conversation tutor named "Companion AI".
The user is practicing conversational spoken English in a specific scenario.

Current scenario topic ID: "${topicId || "at1"}".
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
  "betterPhrasing": "Pure natural native English sentence representing the user's intent without quotation marks.",
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
2. "suggestedPhrases" MUST contain EXACTLY 2 natural sentence starter phrases.
3. Return ONLY raw JSON format. No markdown fences. Ensure valid JSON parsing.`;
    }

    let contents = messages.map((m: any) => ({
      role: m.role === "ai" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    if (contents.length > 0 && contents[0].role === "model") {
      contents.shift();
    }

    let parsedData: any = null;

    if (apiKey) {
      const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];

      for (const modelName of modelsToTry) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: contents.length > 0 ? contents : [{ role: "user", parts: [{ text: "Hello" }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 2048,
                  responseMimeType: "application/json",
                },
              }),
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
                if (parsedData && parsedData.reply) break;
              }
            }
          }
        } catch (mErr) {
          console.warn(`Gemini model ${modelName} call failed, trying fallback:`, mErr);
        }
      }
    }

    // High quality intelligent fallback if API is unavailable
    if (!parsedData || !parsedData.reply) {
      const lastUserMsg = messages[messages.length - 1]?.text || "";
      if (mode === "quick_ask" || mode === "tutor") {
        parsedData = {
          reply: getSmartQuickAskFallback(lastUserMsg),
          vietnameseTranslation: "Giải đáp ngữ pháp & từ vựng Tiếng Anh chuyên sâu.",
          grammarCorrection: undefined,
          betterPhrasing: "Can you provide more context for your question?",
          suggestedWords: fallbackBank.words.slice(0, 3),
          suggestedPhrases: fallbackBank.phrases.slice(0, 2),
          goalsCompleted: [],
        };
      } else {
        parsedData = {
          reply: `That's a fantastic point! Could you elaborate more on how that relates to your experience?`,
          vietnameseTranslation: `Đó là một ý kiến tuyệt vời! Bạn có thể chia sẻ thêm về trải nghiệm đó không?`,
          grammarCorrection: undefined,
          betterPhrasing: "I would like to elaborate further on this topic.",
          suggestedWords: fallbackBank.words.slice(0, 3),
          suggestedPhrases: fallbackBank.phrases.slice(0, 2),
          goalsCompleted: [],
        };
      }
    }

    // Normalization
    parsedData.suggestedWords = (parsedData.suggestedWords?.length === 3 ? parsedData.suggestedWords : fallbackBank.words).slice(0, 3);
    parsedData.suggestedPhrases = (parsedData.suggestedPhrases?.length === 2 ? parsedData.suggestedPhrases : fallbackBank.phrases).slice(0, 2);

    // Server-Side XP Persistence for authenticated user (+10 XP per interaction, capped at 50 XP/day)
    let xpAwarded = 0;
    if (userId && userId !== "guest_ai_user" && userId !== "guest_user" && userId !== "local_user" && !userId.startsWith("local_user")) {
      await safeDbExecute(async () => {
        const todayStr = new Date().toISOString().slice(0, 10);
        const practicesToday = await prisma.dailySkillPractice.findMany({
          where: { userId, date: todayStr, skill: "ai_ask" },
        });
        const currentAiXp = practicesToday.reduce((acc, p) => acc + (p.xpEarned || 0), 0);
        if (currentAiXp < 50) {
          xpAwarded = 10;
          await prisma.profile.update({
            where: { id: userId },
            data: { totalXp: { increment: 10 }, updatedAt: new Date() },
          });
          await prisma.dailySkillPractice.create({
            data: { userId, skill: "ai_ask", date: todayStr, minutes: 1, xpEarned: 10 },
          });
        }
      }, "AI Chat XP Persistence");
    }

    parsedData.xpAwarded = xpAwarded;

    // ─── SSE STREAMING MODE ───
    if (stream) {
      const encoder = new TextEncoder();
      const replyText = parsedData.reply as string;
      const tokens = replyText.split(" ");

      const customReadable = new ReadableStream({
        async start(controller) {
          // Stream word tokens with natural typing delay
          for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i] + (i < tokens.length - 1 ? " " : "");
            const payload = JSON.stringify({ type: "token", chunk: token });
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            await new Promise((resolve) => setTimeout(resolve, 35));
          }

          // Send final completion event with all metadata
          const donePayload = JSON.stringify({
            type: "done",
            success: true,
            ...parsedData,
          });
          controller.enqueue(encoder.encode(`data: ${donePayload}\n\n`));
          controller.close();
        },
      });

      return new Response(customReadable, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
          "X-Accel-Buffering": "no",
        },
      });
    }

    // Standard JSON Mode
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
      goalsCompleted: [],
      xpAwarded: 0,
    });
  }
}