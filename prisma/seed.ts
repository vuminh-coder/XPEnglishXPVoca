import { PrismaClient } from "@prisma/client";
import { MOCK_THEMES } from "@/shared/constants";
import { MOCK_VOCABULARIES } from "./mock-vocabularies";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ACADEMIC_COLLOCATIONS } from "@/features/vocabulary/data/academicCollocations";
import { BUSINESS_COLLOCATIONS } from "@/features/vocabulary/data/businessCollocations";
import { ESSENTIAL_PHRASAL_VERBS } from "@/features/vocabulary/data/phrasalVerbs";
import { ESSENTIAL_IDIOMS } from "@/features/vocabulary/data/idioms";
import { seedListeningLessons } from "./seedListeningData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Clean existing vocabulary data (cascading relation safety)
  console.log("🧹 Cleaning old vocabulary data...");
  await prisma.userVocabulary.deleteMany();
  await prisma.vocabulary.deleteMany();
  await prisma.vocabularyTheme.deleteMany();
  console.log("✅ Database cleaned.");

  // 2. Seed Vocabulary Themes
  console.log(`📦 Seeding ${MOCK_THEMES.length} vocabulary themes...`);
  const themeIds = new Set(MOCK_THEMES.map((t) => t.id));
  const themeData = MOCK_THEMES.map((theme, index) => ({
    id: theme.id,
    name: theme.nameEn || theme.name,
    nameVn: theme.name,
    icon: theme.icon || "📚",
    orderIndex: index,
  }));

  await prisma.vocabularyTheme.createMany({
    data: themeData,
    skipDuplicates: true,
  });
  console.log("✅ Vocabulary themes seeded.");

  // 3. Merge & Deduplicate Vocabularies
  console.log("📝 Preparing vocabulary datasets...");
  const combinedVocabs = [
    ...BASIC_VOCABULARIES,
    ...ACADEMIC_COLLOCATIONS,
    ...BUSINESS_COLLOCATIONS,
    ...ESSENTIAL_PHRASAL_VERBS,
    ...ESSENTIAL_IDIOMS,
    ...MOCK_VOCABULARIES,
  ];
  const seenIds = new Set<string>();
  const validVocabList = [];

  for (const v of combinedVocabs) {
    if (!v.id || seenIds.has(v.id)) continue;
    seenIds.add(v.id);
    validVocabList.push({
      id: v.id,
      word: v.word,
      phonetic: v.phonetic || null,
      definition: v.definition,
      definitionVn: v.definitionVn,
      pos: v.pos || "noun",
      difficulty: typeof v.difficulty === "number" ? v.difficulty : 1,
      frequency: typeof v.frequency === "number" ? v.frequency : 1,
      themeId: themeIds.has(v.themeId) ? v.themeId : "t_basic_greetings",
      examples: v.examples || [],
      synonyms: v.synonyms || [],
      antonyms: v.antonyms || [],
    });
  }

  console.log(`📝 Seeding ${validVocabList.length} vocabulary words...`);
  const chunkSize = 1000;
  for (let i = 0; i < validVocabList.length; i += chunkSize) {
    const chunk = validVocabList.slice(i, i + chunkSize);
    await prisma.vocabulary.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    console.log(`   - Seeded words ${i + 1} to ${Math.min(i + chunkSize, validVocabList.length)}...`);
  }
  console.log("✅ Vocabularies seeded successfully.");

  // 4. Seed Listening Lessons
  console.log("🎧 Seeding Listening Lessons from seedListeningData...");
  await seedListeningLessons(prisma);
  console.log("✅ Listening Lessons seeded successfully.");

  console.log("🎉 All database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

