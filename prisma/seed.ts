import { PrismaClient } from "@prisma/client";
import { MOCK_THEMES } from "../lib/constants";
import { MOCK_VOCABULARIES } from "./mock-vocabularies";

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
  const themeData = MOCK_THEMES.map((theme, index) => ({
    id: theme.id,
    name: theme.name,
    nameVn: theme.name, // Mapping localized name
    icon: theme.icon,
    orderIndex: index,
  }));

  await prisma.vocabularyTheme.createMany({
    data: themeData,
  });
  console.log("✅ Vocabulary themes seeded.");

  // 3. Seed Vocabularies
  console.log(`📝 Seeding ${MOCK_VOCABULARIES.length} vocabulary words...`);
  
  // Chunk vocabularies to prevent database parameter limit issues (max 32767 parameters in PostgreSQL)
  const chunkSize = 1000;
  for (let i = 0; i < MOCK_VOCABULARIES.length; i += chunkSize) {
    const chunk = MOCK_VOCABULARIES.slice(i, i + chunkSize);
    const vocabData = chunk.map((vocab) => ({
      id: vocab.id,
      word: vocab.word,
      phonetic: vocab.phonetic,
      definition: vocab.definition,
      definitionVn: vocab.definitionVn,
      pos: vocab.pos,
      difficulty: vocab.difficulty,
      frequency: vocab.frequency,
      themeId: vocab.themeId,
      examples: vocab.examples || [],
      synonyms: vocab.synonyms || [],
      antonyms: vocab.antonyms || [],
    }));

    await prisma.vocabulary.createMany({
      data: vocabData,
    });
    console.log(`   - Seeded words ${i + 1} to ${Math.min(i + chunkSize, MOCK_VOCABULARIES.length)}...`);
  }

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
