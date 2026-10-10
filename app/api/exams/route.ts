import { NextResponse } from "next/server";
import { prisma, safeDbExecute } from "@/infrastructure/database/prisma";
import { MOCK_EXAM_PAPERS } from "@/features/exam-prep/data/exam-papers";

// In-Memory Cache for fast responses (60s TTL)
interface CachedExamList {
  timestamp: number;
  data: any;
}
const examListCache = new Map<string, CachedExamList>();
const CACHE_TTL_MS = 60 * 1000;
const MAX_CACHE_ENTRIES = 100;

export async function GET(request: Request) {
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);

  const type = (searchParams.get("type") || "ALL").toUpperCase();
  const skill = (searchParams.get("skill") || "").toUpperCase();
  const difficulty = searchParams.get("difficulty") ? parseInt(searchParams.get("difficulty")!, 10) : null;
  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const skip = (page - 1) * limit;

  const cacheKey = `exams:${type}:${skill}:${difficulty}:${search}:${page}:${limit}`;

  // 1. Check in-memory cache
  const cached = examListCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, {
      status: 200,
      headers: {
        "X-Cache": "HIT",
        "X-Response-Time": `${Date.now() - startTime}ms`,
        "X-Total-Count": String(cached.data.total),
      },
    });
  }

  try {
    // 2. Query database with selective projection and bounded limit
    const whereClause: any = {};

    if (type !== "ALL") {
      whereClause.examType = {
        name: { equals: type, mode: "insensitive" },
      };
    }

    if (difficulty && !isNaN(difficulty)) {
      whereClause.difficulty = difficulty;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const dbResult = await safeDbExecute(async () => {
      return await Promise.all([
        prisma.exam.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            totalQuestions: true,
            difficulty: true,
            isFullTest: true,
            createdAt: true,
            examType: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        prisma.exam.count({ where: whereClause }),
      ]);
    });

    const dbExams = dbResult ? dbResult[0] : null;
    const totalCount = dbResult ? dbResult[1] : 0;

    let resultPayload: any;

    // Merge DB records and MOCK_EXAM_PAPERS so all 39 papers are always available
    const combinedMap = new Map<string, any>();

    // 1. Seed with all standardized mock papers
    MOCK_EXAM_PAPERS.forEach((p) => {
      combinedMap.set(p.id, {
        id: p.id,
        title: p.title,
        description: p.description,
        type: p.type,
        timeLimitMinutes: p.timeLimitMinutes,
        durationMinutes: p.timeLimitMinutes,
        totalQuestions: p.totalQuestions,
        difficulty: p.level === "Advanced" ? 4 : p.level === "Intermediate" ? 3 : 2,
        isFullTest: p.type.includes("FULL") || p.type.includes("LR"),
        examType: p.type.includes("IELTS") ? "IELTS" : "TOEIC",
        categoryBadge: p.categoryBadge,
        tags: p.tags,
        supportedSkills: p.supportedSkills,
      });
    });

    // 2. Overlay any DB records
    if (dbExams && dbExams.length > 0) {
      dbExams.forEach((exam: any) => {
        const existing = combinedMap.get(exam.id);
        if (existing) {
          combinedMap.set(exam.id, {
            ...existing,
            title: exam.title || existing.title,
            description: exam.description || existing.description,
            durationMinutes: exam.duration || existing.durationMinutes,
            totalQuestions: exam.totalQuestions || existing.totalQuestions,
            difficulty: exam.difficulty ?? existing.difficulty,
          });
        }
      });
    }

    let filtered = Array.from(combinedMap.values());

    if (type !== "ALL") {
      filtered = filtered.filter(
        (p) =>
          p.type?.toUpperCase().includes(type) ||
          p.examType?.toUpperCase().includes(type)
      );
    }

    if (skill) {
      filtered = filtered.filter((p) => p.supportedSkills?.includes(skill as any));
    }

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search) ||
          p.tags?.some((t: string) => t.toLowerCase().includes(search))
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice(skip, skip + limit);

    resultPayload = {
      success: true,
      source: "combined_bank",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      exams: paginated,
    };

    // Cache the result
    if (examListCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = examListCache.keys().next().value;
      if (oldestKey) examListCache.delete(oldestKey);
    }
    examListCache.set(cacheKey, { timestamp: Date.now(), data: resultPayload });

    return NextResponse.json(resultPayload, {
      status: 200,
      headers: {
        "X-Cache": "MISS",
        "X-Response-Time": `${Date.now() - startTime}ms`,
        "X-Total-Count": String(resultPayload.total),
      },
    });
  } catch (error: any) {
    console.error("GET /api/exams Error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi khi tải danh sách bài thi." },
      { status: 500 }
    );
  }
}
