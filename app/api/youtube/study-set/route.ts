import { NextRequest, NextResponse } from "next/server";

interface SubtitleItem {
  textEn: string;
  textVn?: string;
  startTime?: number;
}

export interface GeneratedFlashcard {
  id: string;
  word: string;
  phonetic: string;
  pos: string;
  definitionVn: string;
  contextSentence: string;
  contextTranslation: string;
  memoryTip?: string;
}

export interface GeneratedQuiz {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface VideoStudySetResponse {
  summary: {
    en: string;
    vn: string;
  };
  flashcards: GeneratedFlashcard[];
  quizzes: GeneratedQuiz[];
  totalWords: number;
  sourceVideoId: string;
}

// Smart heuristic fallback generator when Gemini API is unavailable or rate limited
function generateHeuristicStudySet(
  videoId: string,
  videoTitle: string,
  subtitles: SubtitleItem[]
): VideoStudySetResponse {
  const commonStopWords = new Set([
    "the", "and", "that", "have", "for", "not", "with", "you", "this", "but", "his", "from",
    "they", "say", "her", "she", "will", "one", "all", "would", "there", "their", "what",
    "out", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time",
    "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some",
    "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its",
    "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first",
    "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
  ]);

  const candidateWordsMap = new Map<string, { sentence: string; translation: string }>();

  for (const item of subtitles) {
    const text = item.textEn || "";
    const words = text.match(/[A-Za-z]{4,}/g) || [];
    for (const w of words) {
      const lower = w.toLowerCase();
      if (!commonStopWords.has(lower) && !candidateWordsMap.has(lower)) {
        candidateWordsMap.set(lower, {
          sentence: text,
          translation: item.textVn || "Câu trích dẫn từ video",
        });
      }
      if (candidateWordsMap.size >= 12) break;
    }
    if (candidateWordsMap.size >= 12) break;
  }

  // Pre-curated academic/everyday enrichments for standard fallback words
  const enrichmentDict: Record<string, { ipa: string; pos: string; def: string; tip: string }> = {
    english: { ipa: "/ˈɪŋ.ɡlɪʃ/", pos: "noun", def: "Tiếng Anh; ngôn ngữ toàn cầu", tip: "Luyện nghe hàng ngày để ngấm ngữ điệu tự nhiên" },
    practice: { ipa: "/ˈpræk.tɪs/", pos: "verb / noun", def: "Thực hành, luyện tập thường xuyên", tip: "Practice makes perfect (Có công mài sắt có ngày nên kim)" },
    listen: { ipa: "/ˈlɪs.ən/", pos: "verb", def: "Lắng nghe một cách chủ động", tip: "Luôn đi kèm giới từ 'to': listen to podcasts" },
    conversation: { ipa: "/ˌkɒn.vəˈseɪ.ʃən/", pos: "noun", def: "Cuộc đối thoại, giao tiếp", tip: "Cụm hay gặp: carry on a conversation (tiếp nối cuộc trò chuyện)" },
    vocabulary: { ipa: "/vəˈkæb.jə.lər.i/", pos: "noun", def: "Vốn từ vựng", tip: "Học từ theo cụm ngữ cảnh thay vì học từ đơn lẻ" },
    pronunciation: { ipa: "/prəˌnʌn.siˈeɪ.ʃən/", pos: "noun", def: "Cách phát âm chuẩn", tip: "Chú ý trọng âm từ và nối âm (linking sounds)" },
    fluency: { ipa: "/ˈfluː.ən.si/", pos: "noun", def: "Sự lưu loát, trôi chảy khi nói", tip: "Nói đều đặn không sợ sai để tăng tốc độ phản xạ" },
    communicate: { ipa: "/kəˈmjuː.nɪ.keɪt/", pos: "verb", def: "Giao tiếp, truyền tải thông điệp", tip: "Communicate with someone (Giao tiếp với ai đó)" },
    important: { ipa: "/ɪmˈpɔː.tənt/", pos: "adj", def: "Quan trọng, có ý nghĩa cốt lõi", tip: "Đồng nghĩa: essential, crucial, vital" },
    understand: { ipa: "/ˌʌn.dəˈstænd/", pos: "verb", def: "Thấu hiểu, nắm bắt ý nghĩa", tip: "Make oneself understood (Làm cho người khác hiểu mình)" },
  };

  const flashcards: GeneratedFlashcard[] = [];
  let index = 1;

  for (const [word, context] of candidateWordsMap.entries()) {
    const meta = enrichmentDict[word] || {
      ipa: `/${word}/`,
      pos: "vocabulary",
      def: `Từ vựng chủ chốt xuất hiện trong bài giảng: ${word}`,
      tip: `Ghi nhớ ngữ cảnh: "${context.sentence}"`,
    };

    flashcards.push({
      id: `fc_${videoId}_${index}`,
      word: word.charAt(0).toUpperCase() + word.slice(1),
      phonetic: meta.ipa,
      pos: meta.pos,
      definitionVn: meta.def,
      contextSentence: context.sentence,
      contextTranslation: context.translation,
      memoryTip: meta.tip,
    });
    index++;
    if (flashcards.length >= 8) break;
  }

  // Fallback quizzes based on extracted words
  const quizzes: GeneratedQuiz[] = [];
  if (flashcards.length >= 4) {
    quizzes.push({
      id: `qz_${videoId}_1`,
      question: `Trong ngữ cảnh video, từ "${flashcards[0]?.word}" có nghĩa là gì?`,
      options: [
        flashcards[0]?.definitionVn || "Nghĩa A",
        "Trạng thái thư giãn sau giờ học",
        "Hành động suy đoán không có căn cứ",
        "Kế hoạch dài hạn trong tương lai",
      ],
      correctAnswerIndex: 0,
      explanation: `Từ "${flashcards[0]?.word}" được sử dụng trong video với nghĩa: "${flashcards[0]?.definitionVn}". Ngữ cảnh câu: "${flashcards[0]?.contextSentence}".`,
    });

    quizzes.push({
      id: `qz_${videoId}_2`,
      question: `Điền từ thích hợp vào chỗ trống dựa theo nội dung video: "${flashcards[1]?.contextSentence.replace(new RegExp(flashcards[1]?.word, "i"), "_____")}"`,
      options: [
        flashcards[1]?.word || "Word B",
        "yesterday",
        "impossible",
        "something",
      ],
      correctAnswerIndex: 0,
      explanation: `Từ chính xác được người nói phát âm trong video là "${flashcards[1]?.word}".`,
    });

    quizzes.push({
      id: `qz_${videoId}_3`,
      question: `Từ "${flashcards[2]?.word}" thuộc từ loại nào?`,
      options: [
        "Tính từ (Adjective)",
        flashcards[2]?.pos?.includes("noun") ? "Danh từ (Noun)" : (flashcards[2]?.pos || "Từ vựng"),
        "Giới từ (Preposition)",
        "Liên từ (Conjunction)",
      ],
      correctAnswerIndex: 1,
      explanation: `Từ "${flashcards[2]?.word}" có từ loại là: ${flashcards[2]?.pos}.`,
    });
  }

  return {
    summary: {
      en: `This video (${videoTitle || "English Lesson"}) provides practical spoken English expressions and real-world pronunciation patterns.`,
      vn: `Video bài học (${videoTitle || "Bài học Tiếng Anh"}) cung cấp các cụm từ giao tiếp thực tế và ngữ điệu tự nhiên của người bản xứ.`,
    },
    flashcards,
    quizzes,
    totalWords: flashcards.length,
    sourceVideoId: videoId,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoId, videoTitle, subtitles } = body as {
      videoId: string;
      videoTitle: string;
      subtitles: SubtitleItem[];
    };

    if (!videoId || !subtitles || !Array.isArray(subtitles) || subtitles.length === 0) {
      return NextResponse.json(
        { error: "Dữ liệu video hoặc phụ đề không hợp lệ" },
        { status: 400 }
      );
    }

    // Prepare transcript sample (up to first 50 representative subtitle lines)
    const sampledSubs = subtitles.slice(0, 60);
    const transcriptText = sampledSubs
      .map((s, idx) => `[${idx + 1}] ${s.textEn}`)
      .join("\n");

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_AI_KEY ||
      process.env.GOOGLE_API_KEY ||
      "";

    if (apiKey) {
      const systemPrompt = `You are an elite bilingual English Pedagogy and Lexicography AI Assistant.
Your task is to analyze the provided YouTube English video transcript and generate a high-impact Vocabulary Study Set (Flashcards) and Comprehension Quizzes.

INSTRUCTIONS:
1. Extract exactly 8 to 12 KEY VOCABULARY ITEMS (words, phrasal verbs, idioms, or academic collocations) that are most valuable for English learners from the transcript.
2. For each vocabulary item, provide:
   - "word": The headword or phrase (capitalized first letter).
   - "phonetic": Accurate IPA pronunciation with stress marks (e.g., "/kənˌvɜːrˈseɪʃən/").
   - "pos": Part of speech (e.g., "noun", "phrasal verb", "verb", "adjective", "idiom").
   - "definitionVn": Concise, highly accurate Vietnamese definition tailored to the video context.
   - "contextSentence": The exact or lightly polished sentence from the video transcript where this word appears.
   - "contextTranslation": Natural, fluent Vietnamese translation of the context sentence.
   - "memoryTip": A short practical tip, common collocation, or memory hook (in Vietnamese).
3. Create 3 to 5 COMPREHENSION & VOCABULARY QUIZZES based directly on the video transcript:
   - "question": A challenging but fair question in Vietnamese or English testing understanding of a video point or word meaning.
   - "options": An array of EXACTLY 4 plausible answer choices.
   - "correctAnswerIndex": The zero-based index of the correct choice (0, 1, 2, or 3).
   - "explanation": Clear Vietnamese explanation referencing the transcript.
4. Provide a 2-sentence SUMMARY of the video topic in English and Vietnamese.

STRICT JSON OUTPUT FORMAT (Return ONLY raw JSON, without markdown formatting or code fences):
{
  "summary": {
    "en": "Short English summary of the video content.",
    "vn": "Tóm tắt ngắn gọn nội dung video bằng Tiếng Việt."
  },
  "flashcards": [
    {
      "id": "fc_1",
      "word": "Word",
      "phonetic": "/.../",
      "pos": "noun",
      "definitionVn": "Nghĩa tiếng Việt",
      "contextSentence": "Sentence from video.",
      "contextTranslation": "Bản dịch câu.",
      "memoryTip": "Mẹo ghi nhớ hoặc cụm từ đi kèm."
    }
  ],
  "quizzes": [
    {
      "id": "qz_1",
      "question": "Câu hỏi trắc nghiệm?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctAnswerIndex": 0,
      "explanation": "Giải thích chi tiết tại sao đúng."
    }
  ]
}`;

      const userPrompt = `VIDEO TITLE: "${videoTitle || "English Lesson"}"
TRANSCRIPT EXCERPTS:
${transcriptText}

Generate the comprehensive study set with 8-12 flashcards and 3-5 quizzes now.`;

      const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-flash-latest",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
      ];

      for (const modelName of modelsToTry) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: {
                  temperature: 0.4,
                  maxOutputTokens: 3000,
                  responseMimeType: "application/json",
                },
              }),
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              text = text.trim().replace(/^```json/i, "").replace(/^```/i, "").replace(/```$/i, "").trim();
              const jsonMatch = text.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                if (Array.isArray(parsed.flashcards) && parsed.flashcards.length > 0) {
                  return NextResponse.json({
                    summary: parsed.summary || {
                      en: `Study set generated for "${videoTitle}".`,
                      vn: `Bộ bài học và flashcard tạo từ video "${videoTitle}".`,
                    },
                    flashcards: parsed.flashcards.map((f: any, idx: number) => ({
                      id: f.id || `fc_${videoId}_${idx + 1}`,
                      word: f.word || "Word",
                      phonetic: f.phonetic || "/.../",
                      pos: f.pos || "vocabulary",
                      definitionVn: f.definitionVn || "Nghĩa tiếng Việt",
                      contextSentence: f.contextSentence || "",
                      contextTranslation: f.contextTranslation || "",
                      memoryTip: f.memoryTip || "",
                    })),
                    quizzes: Array.isArray(parsed.quizzes) ? parsed.quizzes.map((q: any, idx: number) => ({
                      id: q.id || `qz_${videoId}_${idx + 1}`,
                      question: q.question,
                      options: q.options || ["A", "B", "C", "D"],
                      correctAnswerIndex: typeof q.correctAnswerIndex === "number" ? q.correctAnswerIndex : 0,
                      explanation: q.explanation || "",
                    })) : [],
                    totalWords: parsed.flashcards.length,
                    sourceVideoId: videoId,
                  } as VideoStudySetResponse);
                }
              }
            }
          }
        } catch (mErr) {
          console.warn(`Gemini study-set model ${modelName} failed:`, mErr);
        }
      }
    }

    // Heuristic fallback if Gemini fails or API key missing
    const fallbackSet = generateHeuristicStudySet(videoId, videoTitle, subtitles);
    return NextResponse.json(fallbackSet);
  } catch (error: any) {
    console.error("Error generating video study set:", error);
    return NextResponse.json(
      { error: "Lỗi nội bộ khi tạo bộ bài học từ video: " + (error?.message || "Unknown") },
      { status: 500 }
    );
  }
}
