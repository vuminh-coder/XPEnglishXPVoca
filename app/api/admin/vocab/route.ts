import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/infrastructure/auth/auth";
import { prisma, handlePrismaError } from "@/infrastructure/database/prisma";
import { sanitizeInput } from "@/infrastructure/security/validation";
import { MOCK_THEMES } from "@/features/vocabulary/data/mockThemes";

const ALLOWED_POS = new Set(["noun", "verb", "adjective", "adverb", "phrase", "preposition"]);

/**
 * GET /api/admin/vocab
 * Returns database-persisted vocabulary records for admin management.
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdminUser(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const vocabs = await prisma.vocabulary.findMany({
      orderBy: { frequency: "desc" },
      take: 100,
      select: {
        id: true,
        word: true,
        phonetic: true,
        definition: true,
        definitionVn: true,
        pos: true,
        difficulty: true,
        frequency: true,
        themeId: true,
        examples: true,
      },
    });

    return NextResponse.json({ success: true, data: vocabs });
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    if (prismaErr) {
      return NextResponse.json({ error: prismaErr.error }, { status: prismaErr.status });
    }
    return NextResponse.json({ error: "Lỗi truy vấn kho từ vựng" }, { status: 500 });
  }
}

/**
 * POST /api/admin/vocab
 * Creates a real PostgreSQL Vocabulary entry after validating & ensuring its theme exists.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdminUser(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const body = await request.json().catch(() => ({}));
    const rawWord = typeof body.word === "string" ? sanitizeInput(body.word).trim() : "";
    const rawPhonetic = typeof body.phonetic === "string" ? sanitizeInput(body.phonetic).trim() : "";
    const rawPos = typeof body.pos === "string" ? body.pos.trim().toLowerCase() : "noun";
    const rawDefVn = typeof body.definitionVn === "string" ? sanitizeInput(body.definitionVn).trim() : "";
    const rawDefEn = typeof body.definition === "string" ? sanitizeInput(body.definition).trim() : "";
    const rawExample = typeof body.example === "string" ? sanitizeInput(body.example).trim() : "";
    const rawThemeId = typeof body.themeId === "string" ? body.themeId.trim() : "";
    const rawDifficulty = Math.min(5, Math.max(1, Math.round(Number(body.difficulty) || 3)));

    if (!rawWord || !rawDefVn || !rawDefEn || !rawExample || !rawThemeId) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ từ, nghĩa tiếng Việt, định nghĩa tiếng Anh, ví dụ và chủ đề." },
        { status: 400 }
      );
    }

    if (rawWord.length > 100 || rawDefVn.length > 500 || rawDefEn.length > 1000 || rawExample.length > 500) {
      return NextResponse.json({ error: "Độ dài nội dung vượt quá giới hạn cho phép." }, { status: 400 });
    }

    const pos = ALLOWED_POS.has(rawPos) ? rawPos : "noun";
    const themeMeta = MOCK_THEMES.find((t) => t.id === rawThemeId);

    if (!themeMeta) {
      return NextResponse.json({ error: "Chủ đề từ vựng không hợp lệ." }, { status: 400 });
    }

    const existing = await prisma.vocabulary.findFirst({
      where: { word: { equals: rawWord, mode: "insensitive" } },
      select: { id: true, word: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Từ "${existing.word}" đã tồn tại trong cơ sở dữ liệu.` },
        { status: 409 }
      );
    }

    // Ensure VocabularyTheme row exists in PostgreSQL before inserting FK child
    await prisma.vocabularyTheme.upsert({
      where: { id: themeMeta.id },
      update: {},
      create: {
        id: themeMeta.id,
        name: themeMeta.nameEn || themeMeta.name,
        nameVn: themeMeta.name,
        icon: themeMeta.icon || "📚",
        orderIndex: MOCK_THEMES.findIndex((t) => t.id === themeMeta.id) + 1,
      },
    });

    const created = await prisma.vocabulary.create({
      data: {
        id: `v_${crypto.randomUUID().slice(0, 12)}`,
        word: rawWord,
        phonetic: rawPhonetic || null,
        definition: rawDefEn,
        definitionVn: rawDefVn,
        pos,
        difficulty: rawDifficulty,
        frequency: 5,
        themeId: themeMeta.id,
        examples: [rawExample],
        synonyms: [],
        antonyms: [],
      },
      select: {
        id: true,
        word: true,
        phonetic: true,
        definition: true,
        definitionVn: true,
        pos: true,
        difficulty: true,
        frequency: true,
        themeId: true,
        examples: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Đã thêm từ "${created.word}" vào cơ sở dữ liệu.`,
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    const prismaErr = handlePrismaError(error);
    if (prismaErr) {
      return NextResponse.json({ error: prismaErr.error }, { status: prismaErr.status });
    }
    return NextResponse.json({ error: "Không thể lưu từ vựng mới" }, { status: 500 });
  }
}
