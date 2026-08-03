import { prisma } from "@/lib/prisma";
import { MOCK_THEMES } from "@/lib/constants";
import VocabularyThemesClientList from "./VocabularyThemesClientList";

// Render at request-time so Prisma is never invoked during `next build`
// (DATABASE_URL may be empty in the build environment)
export const dynamic = "force-dynamic";

export default async function VocabularyPage() {
  let formattedThemes: {
    id: string;
    name: string;
    nameEn: string;
    icon: string;
    totalVocabs: number;
    difficulty: number;
  }[] = [];

  try {
    const themes = await prisma.vocabularyTheme.findMany({
      orderBy: { orderIndex: "asc" },
      include: {
        _count: {
          select: { vocabularies: true },
        },
      },
    });

    if (themes && themes.length > 0) {
      formattedThemes = themes.map((theme) => ({
        id: theme.id,
        name: theme.nameVn,
        nameEn: theme.name,
        icon: theme.icon || "🏠",
        totalVocabs: theme._count.vocabularies || 58,
        difficulty: (theme.orderIndex % 3) + 1,
      }));
    }
  } catch (error) {
    console.error("prisma:error", error);
  }

  // Fallback to full 155 MOCK_THEMES if database has no themes or fails
  if (formattedThemes.length < MOCK_THEMES.length) {
    formattedThemes = MOCK_THEMES.map((t) => ({
      id: t.id,
      name: t.name,
      nameEn: t.nameEn,
      icon: t.icon,
      totalVocabs: t.totalVocabs || 58,
      difficulty: t.difficulty,
    }));
  }

  return <VocabularyThemesClientList initialThemes={formattedThemes} />;
}
