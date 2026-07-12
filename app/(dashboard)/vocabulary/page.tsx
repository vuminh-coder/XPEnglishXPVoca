import { prisma } from "@/lib/prisma";
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

    formattedThemes = themes.map((theme) => ({
      id: theme.id,
      name: theme.nameVn,
      nameEn: theme.name,
      icon: theme.icon || "🏠",
      totalVocabs: theme._count.vocabularies,
      difficulty: (theme.orderIndex % 3) + 1,
    }));
  } catch (error) {
    console.error("prisma:error", error);
    // Fallback: render the page with an empty theme list
    // The client component will show a "no themes" state
  }

  return <VocabularyThemesClientList initialThemes={formattedThemes} />;
}
