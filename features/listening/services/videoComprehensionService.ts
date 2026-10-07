import { prisma } from "@/infrastructure/database/prisma";
import { memoryCache } from "@/infrastructure/cache/memoryCache";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

export interface VideoQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  referenceSegmentIndex?: number;
  targetedConcept?: string;
}

export interface VideoQuizData {
  lessonId: string;
  lessonTitle: string;
  totalQuestions: number;
  xpReward: number;
  questions: VideoQuizQuestion[];
  generatedBy: "AI_GEMINI" | "CONTEXTUAL_FALLBACK";
}

/**
 * Generates deterministic, high-quality contextual comprehension questions
 * when Gemini API key is unavailable or quota is exceeded.
 */
export function generateContextualFallbackQuiz(
  lessonId: string,
  lessonTitle: string,
  segments: Array<{ orderIndex: number; text: string; translationVi: string; properNouns?: string[]; keywords?: string[] }>
): VideoQuizData {
  const questions: VideoQuizQuestion[] = [];

  // Question 1: Main Idea / Central Theme
  if (segments.length > 0) {
    const firstSeg = segments[0];
    const properNoun = firstSeg.properNouns?.[0] || lessonTitle.split(":")[0];

    questions.push({
      id: `q_${lessonId}_1`,
      question: `Theo nội dung mở đầu bài học "${lessonTitle}", thông điệp hoặc chủ đề trọng tâm được đề cập là gì?`,
      options: [
        firstSeg.translationVi || "Khái quát nội dung và ý tưởng cốt lõi của bài chia sẻ.",
        "Thông báo lịch trình di chuyển và thời gian hoàn thành dự án.",
        "Hướng dẫn chi tiết các bước cài đặt thiết bị phần cứng.",
        "Lời phàn nàn về các vấn đề kỹ thuật phát sinh trong công việc.",
      ],
      correctAnswer: 0,
      explanation: `Dựa vào đoạn mở đầu: "${firstSeg.text}" (${firstSeg.translationVi}), người nói định hình trọng tâm chính của bài.`,
      referenceSegmentIndex: 0,
      targetedConcept: "Ý chính toàn bài (Main Idea)",
    });
  }

  // Question 2: Detail Question / Proper Noun / Keyword focus
  if (segments.length >= 2) {
    const targetSeg = segments[Math.min(1, segments.length - 1)];
    const kw = targetSeg.keywords?.[0] || "quan trọng";

    questions.push({
      id: `q_${lessonId}_2`,
      question: `Trong đoạn thứ hai, diễn giả nhấn mạnh điều gì đáng chú ý?`,
      options: [
        "Cần tạm dừng mọi kế hoạch để chờ quyết định chính thức.",
        targetSeg.translationVi || "Các số liệu và thông tin thực tế được làm sáng tỏ.",
        "Chỉ nên tin tưởng vào những điều đã được chứng minh trong quá khứ.",
        "Không cần thiết phải chú ý đến các chi tiết nhỏ trong giao tiếp.",
      ],
      correctAnswer: 1,
      explanation: `Chi tiết được trích dẫn trực tiếp từ phụ đề: "${targetSeg.text}".`,
      referenceSegmentIndex: targetSeg.orderIndex,
      targetedConcept: "Thông tin chi tiết (Detailed Fact)",
    });
  }

  // Question 3: Vocabulary in Context / Tone / Conclusion
  if (segments.length >= 3) {
    const lastSeg = segments[segments.length - 1];

    questions.push({
      id: `q_${lessonId}_3`,
      question: `Lời kết luận hoặc lời khuyên cuối cùng được đưa ra trong bài học là gì?`,
      options: [
        "Hãy từ bỏ nếu gặp phải trở ngại đầu tiên trong sự nghiệp.",
        "Cần thận trọng và tránh mọi sự thay đổi không báo trước.",
        lastSeg.translationVi || "Khích lệ sự kiên trì, đam mê và nỗ lực bền bỉ để đạt được mục tiêu.",
        "Nên chuyển giao toàn bộ trách nhiệm cho người khác.",
      ],
      correctAnswer: 2,
      explanation: `Đoạn kết thúc nhấn mạnh: "${lastSeg.text}" - ${lastSeg.translationVi}.`,
      referenceSegmentIndex: lastSeg.orderIndex,
      targetedConcept: "Ý nghĩa suy luận & Kết luận (Inference & Conclusion)",
    });
  }

  return {
    lessonId,
    lessonTitle,
    totalQuestions: questions.length,
    xpReward: 25,
    questions,
    generatedBy: "CONTEXTUAL_FALLBACK",
  };
}

/**
 * Generates an interactive reading/listening comprehension quiz for a Video Lesson
 * Uses Gemini AI with smart memory cache and fallback to deterministic templates.
 */
export async function getVideoLessonQuiz(lessonId: string): Promise<VideoQuizData> {
  const cacheKey = `video_quiz:${lessonId}`;
  const cached = memoryCache.get<VideoQuizData>(cacheKey);
  if (cached) {
    return cached;
  }

  // 1. Fetch lesson and segments from DB
  let lesson: any = null;
  try {
    lesson = await prisma.videoLesson.findFirst({
      where: {
        OR: [{ id: lessonId }, { slug: lessonId }, { externalId: lessonId }],
      },
      include: {
        segments: {
          orderBy: { orderIndex: "asc" },
          select: {
            orderIndex: true,
            text: true,
            translationVi: true,
            properNouns: true,
            keywords: true,
          },
        },
      },
    });
  } catch (dbErr) {
    console.warn("[getVideoLessonQuiz] DB lookup error:", dbErr);
  }

  if (!lesson || !lesson.segments || lesson.segments.length === 0) {
    const mock = MOCK_VIDEO_LESSONS.find(
      (m) => m.id === lessonId || m.slug === lessonId || m.externalId === lessonId
    );
    if (mock) {
      lesson = {
        id: mock.id,
        title: mock.title,
        segments: mock.segments.map((s) => ({
          orderIndex: s.orderIndex,
          text: s.text,
          translationVi: s.translationVi,
          properNouns: s.properNouns || [],
          keywords: s.keywords || [],
        })),
      };
    }
  }

  if (!lesson || !lesson.segments || lesson.segments.length === 0) {
    throw new Error(`Không tìm thấy bài học video hợp lệ với mã: "${lessonId}"`);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const fallbackQuiz = generateContextualFallbackQuiz(lesson.id, lesson.title, lesson.segments);
    memoryCache.set(cacheKey, fallbackQuiz, 3600); // 1 hour cache
    return fallbackQuiz;
  }

  // 2. Try generating via Gemini Flash
  try {
    const transcriptText = lesson.segments
      .map((s: any) => `[Câu ${s.orderIndex + 1}]: ${s.text} (Nghĩa: ${s.translationVi})`)
      .join("\n");

    const systemPrompt = `Bạn là một Chuyên gia Khảo thí Tiếng Anh chuẩn CEFR & TOEIC/IELTS của XP English.
Nhiệm vụ của bạn là đọc kịch bản bài học video dưới đây và tạo 3-4 câu hỏi TRẮC NGHIỆM ĐỌC HIỂU NGỮ CẢNH (Comprehension Questions) bằng Tiếng Việt.
Mỗi câu hỏi phải có:
1. question: Câu hỏi rõ ràng, khách quan.
2. options: Mảng 4 lựa chọn (chuỗi ngắn gọn, không đánh dấu A/B/C/D).
3. correctAnswer: Chỉ số đáp án đúng (0, 1, 2, hoặc 3).
4. explanation: Lời giải thích chi tiết vì sao đáp án đó đúng, trích dẫn câu tiếng Anh tương ứng.
5. referenceSegmentIndex: Số thứ tự câu (0-indexed) trong kịch bản.
6. targetedConcept: Kỹ năng kiểm tra (Ý chính, Chi tiết, Từ vựng theo ngữ cảnh, Suy luận).

Định dạng đầu ra BẮT BUỘC là JSON hợp lệ:
{
  "questions": [
    {
      "id": "q1",
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": 0,
      "explanation": "...",
      "referenceSegmentIndex": 0,
      "targetedConcept": "..."
    }
  ]
}`;

    const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash"];
    for (const modelName of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: `Tiêu đề bài học: ${lesson.title}\n\nKịch bản transcript:\n${transcriptText}` }] }],
              systemInstruction: { parts: [{ text: systemPrompt }] },
              generationConfig: {
                temperature: 0.3,
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
            const parsed = JSON.parse(candidateText);
            if (parsed?.questions && Array.isArray(parsed.questions) && parsed.questions.length >= 2) {
              const result: VideoQuizData = {
                lessonId: lesson.id,
                lessonTitle: lesson.title,
                totalQuestions: parsed.questions.length,
                xpReward: 25,
                questions: parsed.questions.map((q: any, idx: number) => ({
                  id: q.id || `q_${lesson.id}_${idx + 1}`,
                  question: q.question,
                  options: q.options || [],
                  correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
                  explanation: q.explanation || "Giải thích dựa trên nội dung video.",
                  referenceSegmentIndex: q.referenceSegmentIndex,
                  targetedConcept: q.targetedConcept || "Đọc hiểu",
                })),
                generatedBy: "AI_GEMINI",
              };

              memoryCache.set(cacheKey, result, 3600);
              return result;
            }
          }
        }
      } catch (err) {
        console.warn(`[VideoQuiz] Gemini ${modelName} call failed, trying next:`, err);
      }
    }
  } catch (outerErr) {
    console.warn("[VideoQuiz] Error generating quiz with Gemini:", outerErr);
  }

  // Fallback if AI call failed
  const fallbackQuiz = generateContextualFallbackQuiz(lesson.id, lesson.title, lesson.segments);
  memoryCache.set(cacheKey, fallbackQuiz, 3600);
  return fallbackQuiz;
}
