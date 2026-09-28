import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock Prisma & safeDbExecute
const { mockPrisma } = vi.hoisted(() => ({
  mockPrisma: {
    exam: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
      upsert: vi.fn(),
    },
    examType: {
      upsert: vi.fn(),
      findFirst: vi.fn(),
    },
    examSection: {
      upsert: vi.fn(),
    },
    question: {
      createMany: vi.fn(),
    },
    $disconnect: vi.fn(),
  },
}));

vi.mock("@/infrastructure/database/prisma", () => ({
  prisma: mockPrisma,
  safeDbExecute: async <T>(fn: () => Promise<T>) => await fn(),
  handlePrismaError: (e: any) => ({ error: e.message, status: 500 }),
}));

import { GET as getExams } from "@/app/api/exams/route";
import { GET as getExamById } from "@/app/api/exams/[id]/route";
import { seedExamsData } from "@/prisma/seedExamsData";
import { MOCK_EXAM_PAPERS } from "@/features/exam-prep/data/exam-papers";

describe("Exam API & Database Seeding Standards Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("1. GET /api/exams Listing & Performance Standards", () => {
    it("should return paginated exams from verified question bank when DB has no records", async () => {
      mockPrisma.exam.findMany.mockResolvedValueOnce([]);
      mockPrisma.exam.count.mockResolvedValueOnce(0);

      const req = new Request("http://localhost:3000/api/exams?limit=10&page=1");
      const res = await getExams(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.exams.length).toBe(10);
      expect(json.total).toBe(39);
      expect(json.totalPages).toBe(4);
      expect(res.headers.get("X-Total-Count")).toBe("39");
      expect(json.exams[0].title).toBeDefined();
      expect(json.exams[0].durationMinutes).toBeGreaterThan(0);
    });

    it("should filter exams by type=IELTS", async () => {
      mockPrisma.exam.findMany.mockResolvedValueOnce([]);
      mockPrisma.exam.count.mockResolvedValueOnce(0);

      const req = new Request("http://localhost:3000/api/exams?type=IELTS&limit=50");
      const res = await getExams(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      json.exams.forEach((ex: any) => {
        expect(ex.examType).toBe("IELTS");
      });
      expect(json.exams.length).toBeGreaterThanOrEqual(15);
    });

    it("should filter exams by search keyword", async () => {
      mockPrisma.exam.findMany.mockResolvedValueOnce([]);
      mockPrisma.exam.count.mockResolvedValueOnce(0);

      const req = new Request("http://localhost:3000/api/exams?search=2026");
      const res = await getExams(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.exams.length).toBeGreaterThan(0);
      json.exams.forEach((ex: any) => {
        const matches =
          ex.title.toLowerCase().includes("2026") ||
          ex.description.toLowerCase().includes("2026") ||
          ex.tags.some((t: string) => t.toLowerCase().includes("2026"));
        expect(matches).toBe(true);
      });
    });

    it("should use in-memory cache on repeated identical queries", async () => {
      const queryUrl = "http://localhost:3000/api/exams?search=quantum_cache_test&limit=5";

      mockPrisma.exam.findMany.mockResolvedValueOnce([]);
      mockPrisma.exam.count.mockResolvedValueOnce(0);

      const res1 = await getExams(new Request(queryUrl));
      expect(res1.headers.get("X-Cache")).toBe("MISS");

      const res2 = await getExams(new Request(queryUrl));
      expect(res2.headers.get("X-Cache")).toBe("HIT");
      expect(mockPrisma.exam.findMany).toHaveBeenCalledTimes(1); // Didn't call DB second time
    });
  });

  describe("2. GET /api/exams/[id] Detailed Retrieval", () => {
    it("should retrieve a single exam paper by ID with all questions and sections", async () => {
      mockPrisma.exam.findUnique.mockResolvedValueOnce(null); // Fallback to bank

      const req = new Request("http://localhost:3000/api/exams/toeic_lr_2026_05");
      const res = await getExamById(req, {
        params: Promise.resolve({ id: "toeic_lr_2026_05" }),
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.exam.id).toBe("toeic_lr_2026_05");
      expect(json.exam.totalQuestions).toBe(200);
      expect(json.exam.questions).toHaveLength(200);
      expect(json.exam.timeLimitMinutes).toBe(120);
    });

    it("should retrieve newly added IELTS Academic 07 paper", async () => {
      mockPrisma.exam.findUnique.mockResolvedValueOnce(null);

      const req = new Request("http://localhost:3000/api/exams/ielts_academic_4k_07");
      const res = await getExamById(req, {
        params: Promise.resolve({ id: "ielts_academic_4k_07" }),
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.exam.id).toBe("ielts_academic_4k_07");
      expect(json.exam.totalQuestions).toBe(85);
      expect(json.exam.questions).toHaveLength(85);
    });

    it("should return 404 for non-existent exam ID", async () => {
      mockPrisma.exam.findUnique.mockResolvedValueOnce(null);

      const req = new Request("http://localhost:3000/api/exams/non_existent_paper_id");
      const res = await getExamById(req, {
        params: Promise.resolve({ id: "non_existent_paper_id" }),
      });
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.error).toMatch(/Không tìm thấy/);
    });
  });

  describe("3. Database Seeding Logic (seedExamsData)", () => {
    it("should upsert exam types, exams, sections, and questions in bulk with skipDuplicates", async () => {
      mockPrisma.examType.upsert.mockResolvedValue({ id: "mock_type_id" });
      mockPrisma.exam.upsert.mockResolvedValue({ id: "mock_exam_id" });
      mockPrisma.examSection.upsert.mockResolvedValue({ id: "mock_section_id" });
      mockPrisma.question.createMany.mockResolvedValue({ count: 10 });

      await seedExamsData(mockPrisma as any);

      // Verify ExamType upserts
      expect(mockPrisma.examType.upsert).toHaveBeenCalledTimes(2);

      // Verify Exam upserts for all 39 papers
      expect(mockPrisma.exam.upsert).toHaveBeenCalledTimes(39);

      // Verify questions were seeded
      expect(mockPrisma.question.createMany).toHaveBeenCalled();
      expect(mockPrisma.question.createMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skipDuplicates: true,
        })
      );
    });
  });
});
