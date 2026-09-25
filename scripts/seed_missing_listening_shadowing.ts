import { PrismaClient } from "@prisma/client";
import { MOCK_LESSONS_DATA } from "../features/listening/data/listeningMockData";
import { EXTENDED_SHADOWING_LESSONS } from "../features/shadowing/data/extendedShadowingData";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking and seeding missing lessons...");
  
  // 1. Get existing DB lesson IDs
  const existingLessons = await prisma.listeningLesson.findMany({
    select: { id: true, orderIndex: true },
    orderBy: { orderIndex: "desc" },
  });
  const existingIdSet = new Set(existingLessons.map((l) => l.id));
  let maxOrder = existingLessons[0]?.orderIndex || 0;

  console.log(`Current DB lessons count: ${existingLessons.length}, max orderIndex: ${maxOrder}`);

  // 2. Identify missing mock lessons
  const missingMocks = MOCK_LESSONS_DATA.filter((l) => !existingIdSet.has(l.id));
  console.log(`Missing mock lessons: ${missingMocks.length}`);

  // 3. Identify missing shadowing lessons
  const missingShadow = EXTENDED_SHADOWING_LESSONS.filter((l) => !existingIdSet.has(l.id));
  console.log(`Missing extended shadowing lessons: ${missingShadow.length}`);

  const toInsert = [...missingMocks];
  for (const s of missingShadow) {
    if (!toInsert.some((x) => x.id === s.id)) {
      toInsert.push({
        id: s.id,
        title: s.title,
        category: s.category || "Shadowing & Speaking",
        level: s.level || "Intermediate",
        duration: s.duration || "02:45",
        accent: "en-US",
        audioUrl: s.audio_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
        transcript: s.transcript as any,
        vocabList: s.vocabularyList as any,
        grammarNotes: [],
      } as any);
    }
  }

  console.log(`Total unique lessons to insert: ${toInsert.length}`);

  let insertedCount = 0;
  for (const item of toInsert) {
    maxOrder++;
    try {
      await prisma.listeningLesson.create({
        data: {
          id: item.id,
          title: item.title,
          category: item.category || "General",
          level: item.level || "Beginner",
          duration: item.duration || "03:00",
          accent: item.accent || "en-US",
          audioUrl: item.audioUrl || item.audio_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          transcript: (item.transcript || []) as any,
          vocabList: (item.vocabList || item.vocabularyList || []) as any,
          orderIndex: maxOrder,
        },
      });
      insertedCount++;
      existingIdSet.add(item.id);
    } catch (e: any) {
      console.error(`Failed to insert lesson ${item.id}:`, e.message);
    }
  }

  console.log(`Successfully seeded ${insertedCount} missing lessons!`);
  const finalCount = await prisma.listeningLesson.count();
  console.log(`New total listening lessons in database: ${finalCount}`);
}

main()
  .catch((err) => {
    console.error("Fatal error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
