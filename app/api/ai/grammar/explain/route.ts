import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/auth";
import { getGrammarLesson } from "@/lib/data/grammarContent";
import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topicId, level, mode, messages } = await req.json();

    if (!topicId) {
      return NextResponse.json({ error: "Missing topicId" }, { status: 400 });
    }

    const lesson = getGrammarLesson(topicId);
    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const cacheDir = path.join(process.cwd(), "lib", "data", "grammar_cache");
    const cacheKey = `${topicId}_${level || "intermediate"}.md`;
    const cachePath = path.join(cacheDir, cacheKey);

    // ── CASE 1: GENERATE DETAILED GUIDE ──
    if (mode === "generate_guide") {
      if (fs.existsSync(cachePath)) {
        try {
          const cachedGuide = fs.readFileSync(cachePath, "utf-8");
          return NextResponse.json({ guide: cachedGuide });
        } catch (readErr) {
          console.warn("Failed to read grammar cache file:", readErr);
        }
      }
      if (!GEMINI_API_KEY) {
        // Fallback mockup guide if API key is not present
        return NextResponse.json({
          guide: `## Hướng dẫn chuyên sâu: ${lesson.title}\n\nĐây là bài học phân tích chuyên sâu về **${lesson.titleEn}**.\n\n### 1. Phân tích Bản chất & Cách sử dụng\n- Cấu trúc này dùng để diễn đạt hoặc diễn tả các hành động mang tính chất cốt lõi.\n- Hãy chú ý phân biệt với các cấu trúc tương đồng.\n\n### 2. Bảng tổng hợp cấu trúc\n| Thể | Cấu trúc | Ví dụ |\n|---|---|---|\n| Khẳng định | ${lesson.formulas[0] || ""} | ${lesson.examples[0]?.en || ""} |\n| Phủ định | ${lesson.formulas[1] || ""} | ${lesson.examples[1]?.en || ""} |\n\n### 3. Chiến thuật làm bài\n- Xác định các từ chỉ thị tần suất hoặc dấu hiệu nhận biết.\n- Chú ý chia động từ phù hợp với ngôi chủ ngữ số ít hay số nhiều.\n\n*Lưu ý: Bạn hãy thiết lập GEMINI_API_KEY trong file .env để xem giáo án chuyên sâu sinh bởi AI.*`
        });
      }

      const prompt = `You are a high-end, expert English grammar professor. 
Create an extremely comprehensive, deeply analytical, and detailed grammar lecture guide for Vietnamese students studying for IELTS and TOEIC exams.

The topic is: "${lesson.titleEn} (${lesson.title})" for level "${level || 'intermediate'}".

Here is the static core summary context for this topic:
- Formulas: ${lesson.formulas.join(" | ")}
- Signal Words: ${lesson.signalWords.join(", ")}
- Memory Tip: ${lesson.memoryTip}
- Extra Rules: ${lesson.extraRules?.join(" | ") || ""}

Requirements for the generated guide:
1. Write the guide in Vietnamese, but keep English terminology and example sentences in English.
2. Structure the guide with beautiful Markdown headers, bold highlights, lists, and tables.
3. Include these detailed sections:
   - **Phân tích Bản chất (Conceptual Deep-Dive)**: Explain the core logic of the grammar structure. Why does English use it? What is the mindset behind it?
   - **Bảng so sánh đối chiếu (Comparison Matrix)**: Compare this structure with a closely related one (e.g. Present Simple vs Present Continuous) to clarify when NOT to use it.
   - **Quy tắc chia động từ & Ngoại lệ (Conjugation & Exceptions)**: Detail spelling rules, irregular changes, and Stative verbs constraints.
   - **Chiến thuật phòng thi (Exam Strategy)**: Give step-by-step techniques to spot this grammar point in TOEIC Part 5/6 (e.g. key signal words positioning) and how to boost Band scores in IELTS Writing/Speaking.
   - **Bộ ví dụ mở rộng (Advanced Example Sentences)**: Provide 4-5 high-band advanced example sentences with translations and detailed breakdowns.

Make it look like a chapter from a premium English grammar textbook. Do not use generic placeholders.
Return ONLY the raw markdown text. No JSON wrapper, no metadata.`;

      let guideText = "";
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 3000,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Gemini API error");
        }

        const data = await response.json();
        guideText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Save to cache on success
        if (guideText && GEMINI_API_KEY) {
          try {
            if (!fs.existsSync(cacheDir)) {
              fs.mkdirSync(cacheDir, { recursive: true });
            }
            fs.writeFileSync(cachePath, guideText, "utf-8");
          } catch (writeErr) {
            console.warn("Failed to write grammar cache file:", writeErr);
          }
        }
      } catch (err) {
        console.warn("Failed to generate AI guide, using static details fallback:", err);
        guideText = `## Hướng dẫn Chuyên sâu: ${lesson.title}\n\nĐây là bài học phân tích chi tiết về cấu trúc **${lesson.titleEn}**.\n\n### 1. Công thức cốt lõi\n${lesson.formulas.map(f => `- ${f}`).join("\n")}\n\n### 2. Mẹo học tập & Ghi nhớ\n> [LƯU Ý]\n> ${lesson.memoryTip}\n\n### 3. Ví dụ tiêu biểu\n${lesson.examples.map(ex => `- **${ex.en}**\n  *Ý nghĩa:* ${ex.vi}`).join("\n\n")}\n\n### 4. Lỗi sai cần tránh\n${lesson.commonMistakes.map(m => `- **Sai:** *${m.wrong}* → **Đúng:** *${m.correct}*\n  *Giải thích:* ${m.explanation}`).join("\n\n")}`;
      }

      return NextResponse.json({ guide: guideText });
    }

    // ── CASE 2: LIVE CHAT Q&A COMPANION ──
    if (mode === "chat") {
      if (!messages || !Array.isArray(messages)) {
        return NextResponse.json({ error: "Missing messages" }, { status: 400 });
      }

      const lastUserMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";

      if (!GEMINI_API_KEY) {
        return NextResponse.json({
          reply: `Cảm ơn bạn đã hỏi về ${lesson.title}. Hiện tại AI Tutor đang hoạt động ở chế độ mô phỏng. Hãy cấu hình GEMINI_API_KEY để trò chuyện trực tiếp nhé!`
        });
      }

      const systemPrompt = `You are a supportive, high-end native English grammar tutor named "Grammar AI Companion".
The user is a Vietnamese student studying the grammar topic: "${lesson.titleEn} (${lesson.title})" at level "${level || 'intermediate'}".

Context of the current topic:
- Key formulas: ${lesson.formulas.join("\n")}
- Memory tips: ${lesson.memoryTip}
- Mistakes to watch out for: ${lesson.commonMistakes.map(m => `${m.wrong} -> ${m.correct}`).join("; ")}

Your goal is to answer the student's questions regarding this grammar topic.
Instructions:
1. Keep replies concise, clear, and encouraging.
2. Respond primarily in Vietnamese, but write all English example sentences in English.
3. Help the student understand the logic, write example sentences, or translate clauses if they ask.
4. Correct the user politely if they make a grammar mistake in their message.
5. Formatting: Use structured Markdown syntax (bold highlights, bullet lists, blockquotes with '> [LƯU Ý]' or '> [CHÚ Ý]' for warnings) to make explanations look highly professional and clear.`;

      let replyText = "";
      try {
        const contents = messages.map((m: any) => ({
          role: m.role === "ai" ? "model" : "user",
          parts: [{ text: m.text }]
        }));

        if (contents.length > 0 && contents[0].role === "model") {
          contents.shift();
        }

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Gemini API error");
        }

        const data = await response.json();
        replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } catch (chatError) {
        console.warn("Gemini Chat failed, using simulated response:", chatError);
        if (lastUserMsg.includes("ví dụ") || lastUserMsg.includes("example")) {
          replyText = `Dưới đây là một số ví dụ tiêu biểu cho cấu trúc **${lesson.titleEn}** để bạn tham khảo:\n\n${lesson.examples.map(ex => `- **${ex.en}**\n  *Dịch:* ${ex.vi}`).join("\n")}`;
        } else if (lastUserMsg.includes("công thức") || lastUserMsg.includes("formula")) {
          replyText = `Công thức cấu trúc **${lesson.titleEn}** gồm:\n\n${lesson.formulas.map(f => `- \`${f}\``).join("\n")}`;
        } else if (lastUserMsg.includes("lỗi") || lastUserMsg.includes("mistake")) {
          replyText = `Các lỗi phổ biến học viên Việt Nam thường gặp đối với chủ đề này:\n\n${lesson.commonMistakes.map(m => `> [CHÚ Ý]\n> Không viết: *${m.wrong}*\n> Viết đúng: **${m.correct}**\n> *Lý do:* ${m.explanation}`).join("\n\n")}`;
        } else {
          replyText = `Chào bạn! Kết nối AI đang bận hoặc khóa API không khả dụng. Đối với chủ đề **${lesson.title}**, bạn có thể:\n\n1. Xem lại **Tóm tắt cốt lõi** để nắm vững công thức.\n2. Tra cứu phần **Cẩm nang chuyên sâu** để đọc phân tích.\n3. Đặt câu hỏi cụ thể hơn như *'cho ví dụ'* hoặc *'lưu ý'* để trợ lý mô phỏng phản hồi nhanh giúp bạn!`;
        }
      }

      return NextResponse.json({ reply: replyText });
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (error: any) {
    console.error("API error in grammar explain:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
