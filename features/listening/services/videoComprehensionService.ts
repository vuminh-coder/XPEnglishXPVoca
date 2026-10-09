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
  // Bilingual extensions
  questionEn?: string;
  questionVi?: string;
  optionsEn?: string[];
  optionsVi?: string[];
  explanationEn?: string;
  explanationVi?: string;
  targetedConceptEn?: string;
  targetedConceptVi?: string;
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
 * with full bilingual (English & Vietnamese) support.
 */
export function generateContextualFallbackQuiz(
  lessonId: string,
  lessonTitle: string,
  segments: Array<{ orderIndex: number; text: string; translationVi: string; properNouns?: string[]; keywords?: string[] }>
): VideoQuizData {
  const questions: VideoQuizQuestion[] = [];

  // Tailored high-yield questions for Julian Treasure's TED talk
  if (lessonId === "vid_julian_treasure_speak" || lessonId.includes("julian_treasure")) {
    return {
      lessonId,
      lessonTitle,
      totalQuestions: 3,
      xpReward: 25,
      questions: [
        {
          id: `q_${lessonId}_1`,
          question: "According to Julian Treasure, what metaphor does he use to describe the human voice?",
          questionEn: "According to Julian Treasure, what metaphor does he use to describe the human voice?",
          questionVi: "Theo Julian Treasure, ông sử dụng phép ẩn dụ nào để miêu tả giọng nói của con người?",
          options: [
            "The instrument that we all play",
            "A digital signal transmitter",
            "A fragile biological echo",
            "An uncontrollable emotional reaction",
          ],
          optionsEn: [
            "The instrument that we all play",
            "A digital signal transmitter",
            "A fragile biological echo",
            "An uncontrollable emotional reaction",
          ],
          optionsVi: [
            "Một loại nhạc cụ mà tất cả chúng ta đều chơi",
            "Một bộ phát tín hiệu kỹ thuật số",
            "Một tiếng vọng sinh học mong manh",
            "Một phản ứng cảm xúc không thể kiểm soát",
          ],
          correctAnswer: 0,
          explanation: 'Julian Treasure opens with: "The human voice: It\'s the instrument we all play. It\'s the most powerful sound in the world, probably."',
          explanationEn: 'Julian Treasure opens with: "The human voice: It\'s the instrument we all play. It\'s the most powerful sound in the world, probably."',
          explanationVi: 'Julian Treasure mở đầu: "The human voice: It\'s the instrument we all play. It\'s the most powerful sound in the world, probably." (Giọng nói con người: Đó là thứ nhạc cụ mà tất cả chúng ta đều chơi).',
          referenceSegmentIndex: 0,
          targetedConcept: "Ý chính toàn bài (Main Idea)",
          targetedConceptEn: "Main Idea & Metaphor",
          targetedConceptVi: "Ý chính toàn bài & Ẩn dụ",
        },
        {
          id: `q_${lessonId}_2`,
          question: "What does the speaker identify as the first of the seven deadly sins of speaking?",
          questionEn: "What does the speaker identify as the first of the seven deadly sins of speaking?",
          questionVi: "Diễn giả xác định điều gì là thói xấu đầu tiên trong 7 thói xấu chết người khi giao tiếp?",
          options: [
            "Dogmatism and refusing new ideas",
            "Gossip — speaking ill of someone not present",
            "Constant exaggeration and hyperbole",
            "Complaining about unfavorable weather",
          ],
          optionsEn: [
            "Dogmatism and refusing new ideas",
            "Gossip — speaking ill of someone not present",
            "Constant exaggeration and hyperbole",
            "Complaining about unfavorable weather",
          ],
          optionsVi: [
            "Tính giáo điều và từ chối lắng nghe",
            "Ngồi lê đôi mách (Gossip) — nói xấu người vắng mặt",
            "Liên tục nói quá và phóng đại sự thật",
            "Phàn nàn về thời tiết bất lợi",
          ],
          correctAnswer: 1,
          explanation: 'In segment 7, he explicitly points out: "First, gossip. Speaking ill of somebody who\'s not present. Not a nice habit..."',
          explanationEn: 'In segment 7, he explicitly points out: "First, gossip. Speaking ill of somebody who\'s not present. Not a nice habit..."',
          explanationVi: 'Trong câu số 7, diễn giả chỉ rõ: "First, gossip. Speaking ill of somebody who\'s not present." (Thứ nhất, ngồi lê đôi mách. Nói xấu người không có mặt).',
          referenceSegmentIndex: 7,
          targetedConcept: "Thông tin chi tiết (Detailed Fact)",
          targetedConceptEn: "Detailed Fact",
          targetedConceptVi: "Thông tin chi tiết",
        },
        {
          id: `q_${lessonId}_3`,
          question: "Why is 'judging' considered a major barrier to communication according to Julian?",
          questionEn: "Why is 'judging' considered a major barrier to communication according to Julian?",
          questionVi: "Tại sao 'sự phán xét' (judging) lại bị xem là rào cản lớn trong giao tiếp theo chia sẻ của Julian?",
          options: [
            "It causes people to forget complex English vocabulary",
            "It forces the speaker to speak at an unnatural rhythm",
            "Listeners find it hard to listen if they feel judged and found wanting",
            "It transforms casual conversations into rigid formal lectures",
          ],
          optionsEn: [
            "It causes people to forget complex English vocabulary",
            "It forces the speaker to speak at an unnatural rhythm",
            "Listeners find it hard to listen if they feel judged and found wanting",
            "It transforms casual conversations into rigid formal lectures",
          ],
          optionsVi: [
            "Nó khiến người nghe quên mất các từ vựng phức tạp",
            "Nó ép buộc người nói phải điều chỉnh nhịp điệu bất thường",
            "Người nghe khó có thể tiếp thu nếu cảm thấy mình đang bị phán xét và chê bai",
            "Nó biến các cuộc trò chuyện thường ngày thành những bài giảng cứng nhắc",
          ],
          correctAnswer: 2,
          explanation: 'Julian states: "it\'s very hard to listen to somebody if you know that you\'re being judged and found wanting at the same time."',
          explanationEn: 'Julian states: "it\'s very hard to listen to somebody if you know that you\'re being judged and found wanting at the same time."',
          explanationVi: 'Julian giải thích: "Thật khó để lắng nghe một ai đó nếu bạn biết rằng mình đang bị soi xét và chê bai cùng một lúc" (judged and found wanting at the same time).',
          referenceSegmentIndex: 9,
          targetedConcept: "Ý nghĩa suy luận & Kết luận (Inference & Conclusion)",
          targetedConceptEn: "Inference & Cause-Effect",
          targetedConceptVi: "Ý nghĩa suy luận & Nguyên nhân",
        },
      ],
      generatedBy: "CONTEXTUAL_FALLBACK",
    };
  }

  // General fallback for all lessons
  // Question 1: Main Idea / Central Theme
  if (segments.length > 0) {
    const firstSeg = segments[0];

    const qEn = `According to the opening part of "${lessonTitle}", what core message or theme is introduced?`;
    const qVi = `Theo nội dung mở đầu bài học "${lessonTitle}", thông điệp hoặc chủ đề trọng tâm được đề cập là gì?`;

    const optsEn = [
      firstSeg.text || "An overview of the core concepts and central ideas of the talk.",
      "An announcement regarding transit schedules and project completion deadlines.",
      "Step-by-step guidance on setting up and calibrating hardware equipment.",
      "A formal complaint about technical difficulties encountered in the workplace.",
    ];

    const optsVi = [
      firstSeg.translationVi || "Khái quát nội dung và ý tưởng cốt lõi của bài chia sẻ.",
      "Thông báo lịch trình di chuyển và thời gian hoàn thành dự án.",
      "Hướng dẫn chi tiết các bước cài đặt thiết bị phần cứng.",
      "Lời phàn nàn về các vấn đề kỹ thuật phát sinh trong công việc.",
    ];

    const expEn = `Based on the opening segment: "${firstSeg.text}", the speaker establishes the central topic.`;
    const expVi = `Dựa vào đoạn mở đầu: "${firstSeg.text}" (${firstSeg.translationVi}), người nói định hình trọng tâm chính của bài.`;

    questions.push({
      id: `q_${lessonId}_1`,
      question: qEn,
      questionEn: qEn,
      questionVi: qVi,
      options: optsEn,
      optionsEn: optsEn,
      optionsVi: optsVi,
      correctAnswer: 0,
      explanation: expEn,
      explanationEn: expEn,
      explanationVi: expVi,
      referenceSegmentIndex: 0,
      targetedConcept: "Ý chính toàn bài (Main Idea)",
      targetedConceptEn: "Main Idea",
      targetedConceptVi: "Ý chính toàn bài",
    });
  }

  // Question 2: Detail Question / Keywords focus
  if (segments.length >= 2) {
    const targetSeg = segments[Math.min(1, segments.length - 1)];

    const qEn = "In the following segment, which key detail does the speaker emphasize?";
    const qVi = "Trong đoạn tiếp theo, diễn giả nhấn mạnh điều gì đáng chú ý?";

    const optsEn = [
      "All ongoing plans must be postponed until an official consensus is reached.",
      targetSeg.text || "Key facts and crucial observations highlighting how we communicate.",
      "One should only trust conventions that have been proven historically.",
      "Paying attention to nuance and tone in daily interaction is unnecessary.",
    ];

    const optsVi = [
      "Cần tạm dừng mọi kế hoạch để chờ quyết định chính thức.",
      targetSeg.translationVi || "Các số liệu và thông tin thực tế được làm sáng tỏ.",
      "Chỉ nên tin tưởng vào những điều đã được chứng minh trong quá khứ.",
      "Không cần thiết phải chú ý đến các chi tiết nhỏ trong giao tiếp.",
    ];

    const expEn = `This detail is directly referenced from the subtitle: "${targetSeg.text}".`;
    const expVi = `Chi tiết được trích dẫn trực tiếp từ phụ đề: "${targetSeg.text}".`;

    questions.push({
      id: `q_${lessonId}_2`,
      question: qEn,
      questionEn: qEn,
      questionVi: qVi,
      options: optsEn,
      optionsEn: optsEn,
      optionsVi: optsVi,
      correctAnswer: 1,
      explanation: expEn,
      explanationEn: expEn,
      explanationVi: expVi,
      referenceSegmentIndex: targetSeg.orderIndex,
      targetedConcept: "Thông tin chi tiết (Detailed Fact)",
      targetedConceptEn: "Detailed Fact",
      targetedConceptVi: "Thông tin chi tiết",
    });
  }

  // Question 3: Vocabulary in Context / Conclusion
  if (segments.length >= 3) {
    const lastSeg = segments[segments.length - 1];

    const qEn = "What concluding takeaway or practical advice is highlighted toward the end?";
    const qVi = "Lời kết luận hoặc lời khuyên cuối cùng được đưa ra trong bài học là gì?";

    const optsEn = [
      "Giving up immediately whenever encountering initial career obstacles.",
      "Remaining overly cautious and strictly resisting any unforeseen changes.",
      lastSeg.text || "Encouraging mindful awareness and constructive communication habits.",
      "Delegating complete responsibility and personal decisions to others.",
    ];

    const optsVi = [
      "Hãy từ bỏ nếu gặp phải trở ngại đầu tiên trong sự nghiệp.",
      "Cần thận trọng và tránh mọi sự thay đổi không báo trước.",
      lastSeg.translationVi || "Khích lệ sự kiên trì, đam mê và nỗ lực bền bỉ để đạt được mục tiêu.",
      "Nên chuyển giao toàn bộ trách nhiệm cho người khác.",
    ];

    const expEn = `The closing passage emphasizes: "${lastSeg.text}".`;
    const expVi = `Đoạn kết thúc nhấn mạnh: "${lastSeg.text}" - ${lastSeg.translationVi}.`;

    questions.push({
      id: `q_${lessonId}_3`,
      question: qEn,
      questionEn: qEn,
      questionVi: qVi,
      options: optsEn,
      optionsEn: optsEn,
      optionsVi: optsVi,
      correctAnswer: 2,
      explanation: expEn,
      explanationEn: expEn,
      explanationVi: expVi,
      referenceSegmentIndex: lastSeg.orderIndex,
      targetedConcept: "Ý nghĩa suy luận & Kết luận (Inference & Conclusion)",
      targetedConceptEn: "Inference & Conclusion",
      targetedConceptVi: "Ý nghĩa suy luận & Kết luận",
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
  const cacheKey = `video_quiz_v2:${lessonId}`;
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

  // 2. Try generating via Gemini Flash with bilingual output
  try {
    const transcriptText = lesson.segments
      .map((s: any) => `[Segment ${s.orderIndex + 1}]: ${s.text} (Vietnamese: ${s.translationVi})`)
      .join("\n");

    const systemPrompt = `You are an expert CEFR & TOEIC/IELTS test developer at XP English.
Your task is to analyze the video transcript below and create 3-4 BILINGUAL (English & Vietnamese) reading/listening comprehension questions.
For every question, provide:
1. questionEn (English) and questionVi (Vietnamese): Clear, objective question stem.
2. optionsEn (English) and optionsVi (Vietnamese): Array of 4 answer options (no A/B/C/D prefixes).
3. correctAnswer: The index of the correct answer (0, 1, 2, or 3) — identical for both languages.
4. explanationEn (English) and explanationVi (Vietnamese): Detailed explanation citing the specific English transcript segment.
5. referenceSegmentIndex: 0-based sentence index in the transcript.
6. targetedConceptEn & targetedConceptVi: Tested skill (Main Idea / Ý chính, Detailed Fact / Thông tin chi tiết, Vocabulary in Context / Từ vựng ngữ cảnh, Inference & Conclusion / Suy luận).

Strict JSON format:
{
  "questions": [
    {
      "id": "q1",
      "questionEn": "...",
      "questionVi": "...",
      "optionsEn": ["...", "...", "...", "..."],
      "optionsVi": ["...", "...", "...", "..."],
      "correctAnswer": 0,
      "explanationEn": "...",
      "explanationVi": "...",
      "referenceSegmentIndex": 0,
      "targetedConceptEn": "...",
      "targetedConceptVi": "..."
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
              contents: [{ role: "user", parts: [{ text: `Lesson title: ${lesson.title}\n\nTranscript:\n${transcriptText}` }] }],
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
                questions: parsed.questions.map((q: any, idx: number) => {
                  const qEn = q.questionEn || q.question || "Comprehension question";
                  const qVi = q.questionVi || q.question || "Câu hỏi đọc hiểu";
                  const optsEn = Array.isArray(q.optionsEn) && q.optionsEn.length === 4 ? q.optionsEn : (q.options || []);
                  const optsVi = Array.isArray(q.optionsVi) && q.optionsVi.length === 4 ? q.optionsVi : (q.options || []);
                  const expEn = q.explanationEn || q.explanation || "Explanation based on video transcript.";
                  const expVi = q.explanationVi || q.explanation || "Giải thích dựa trên nội dung video.";
                  const concEn = q.targetedConceptEn || "Reading Comprehension";
                  const concVi = q.targetedConceptVi || "Đọc hiểu";

                  return {
                    id: q.id || `q_${lesson.id}_${idx + 1}`,
                    question: qEn,
                    questionEn: qEn,
                    questionVi: qVi,
                    options: optsEn,
                    optionsEn: optsEn,
                    optionsVi: optsVi,
                    correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
                    explanation: expEn,
                    explanationEn: expEn,
                    explanationVi: expVi,
                    referenceSegmentIndex: q.referenceSegmentIndex,
                    targetedConcept: `${concVi} (${concEn})`,
                    targetedConceptEn: concEn,
                    targetedConceptVi: concVi,
                  };
                }),
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
