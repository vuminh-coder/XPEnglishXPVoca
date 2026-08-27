import { BASIC_VOCABULARY_THEMES } from "@/lib/data/basicVocabularies";
import { ADVANCED_VOCABULARY_THEMES } from "@/lib/data/advancedVocabularies";
import VocabularyThemesClientList from "./VocabularyThemesClientList";

// Render at request-time so Prisma is never invoked during `next build`
// (DATABASE_URL may be empty in the build environment)
export const dynamic = "force-dynamic";

export default async function VocabularyPage() {
  const basicThemes = BASIC_VOCABULARY_THEMES.map((t) => ({
    id: t.id,
    name: t.name,
    nameEn: t.nameEn,
    icon: t.icon,
    totalVocabs: t.totalVocabs || 20,
    difficulty: t.difficulty,
  }));

  const advancedThemes = ADVANCED_VOCABULARY_THEMES.map((t) => ({
    id: t.id,
    name: t.name,
    nameEn: t.nameEn,
    icon: t.icon,
    totalVocabs: t.totalVocabs || 35,
    difficulty: t.difficulty,
  }));

  return (
    <VocabularyThemesClientList
      initialBasicThemes={basicThemes}
      initialAdvancedThemes={advancedThemes}
    />
  );
}
