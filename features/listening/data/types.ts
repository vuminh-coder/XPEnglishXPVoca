export interface MockVideoSegment {
  orderIndex: number;
  startTime: number;
  endTime: number;
  text: string;
  normalizedText?: string;
  translationVi: string;
  ipaUs?: string;
  explanationAi?: string;
  properNouns?: string[];
  keywords?: string[];
  tokenCount?: number;
}

export interface MockVideoCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  orderIndex: number;
  lessonsCount?: number;
}

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

export interface MockVideoLesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  sourceType: string;
  externalId: string; // YouTube Video ID
  thumbnailUrl: string;
  durationSeconds: number;
  durationFormatted: string;
  cefrLevel: string; // A1, A2, B1, B2, C1, C2
  supportedTypes: string; // DICTATION, SHADOWING, BOTH
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  accent: string;
  wpmSpeed: number;
  viewCount: number;
  studyCount: number;
  segments: MockVideoSegment[];
  quiz?: VideoQuizData;
}

