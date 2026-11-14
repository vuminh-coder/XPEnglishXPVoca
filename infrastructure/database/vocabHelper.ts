import { prisma } from "@/infrastructure/database/prisma";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";

export interface VocabSeedPayload {
  word?: string;
  phonetic?: string | null;
  definition?: string;
  definitionVn?: string;
  pos?: string;
  themeId?: string;
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
}

/**
 * Ensures a Vocabulary (and its parent VocabularyTheme) exists in PostgreSQL
 * before writing UserVocabulary progress rows, preventing silent FK dropouts
 * when reviewing words from client-side decks.
 */
export async function ensureVocabularyExists(
  vocabId: string,
  fallbackPayload: VocabSeedPayload = {}
): Promise<{ id: string } | null> {
  const byId = await prisma.vocabulary.findUnique({
    where: { id: vocabId },
    select: { id: true },
  });
  if (byId) return byId;

  const byWord = await prisma.vocabulary.findFirst({
    where: { word: { equals: vocabId, mode: "insensitive" } },
    select: { id: true },
  });
  if (byWord) return byWord;

  const matched = BASIC_VOCABULARIES.find(
    (v) => v.id === vocabId || v.word.toLowerCase() === vocabId.toLowerCase()
  );

  // Only auto-create when it matches a curated deck entry OR caller supplies a real word/meaning
  if (!matched && !fallbackPayload.word) {
    return null;
  }

  const targetThemeId = matched?.themeId || fallbackPayload.themeId || "t_basic_greetings";

  const existingTheme = await prisma.vocabularyTheme.findUnique({
    where: { id: targetThemeId },
    select: { id: true },
  });

  if (!existingTheme) {
    await prisma.vocabularyTheme.upsert({
      where: { id: targetThemeId },
      update: {},
      create: {
        id: targetThemeId,
        name: matched?.themeNameEn || "General English",
        nameVn: matched?.themeNameVn || "Tiếng Anh Tổng Quát",
        icon: "📚",
        orderIndex: 999,
      },
    });
  }

  const createdVocab = await prisma.vocabulary.upsert({
    where: { id: matched?.id || vocabId },
    update: {},
    create: {
      id: matched?.id || vocabId,
      word: matched?.word || fallbackPayload.word || vocabId,
      phonetic: matched?.phonetic || fallbackPayload.phonetic || null,
      definition: matched?.definition || fallbackPayload.definition || "Standard vocabulary term",
      definitionVn: matched?.definitionVn || fallbackPayload.definitionVn || "Thuật ngữ từ vựng",
      pos: matched?.pos || fallbackPayload.pos || "noun",
      difficulty: matched?.difficulty || 1,
      frequency: matched?.frequency || 1,
      themeId: targetThemeId,
      examples: matched?.examples || (Array.isArray(fallbackPayload.examples) ? fallbackPayload.examples : []),
      synonyms: matched?.synonyms || (Array.isArray(fallbackPayload.synonyms) ? fallbackPayload.synonyms : []),
      antonyms: matched?.antonyms || (Array.isArray(fallbackPayload.antonyms) ? fallbackPayload.antonyms : []),
    },
    select: { id: true },
  });

  return { id: createdVocab.id };
}
