import { PrismaClient } from "@prisma/client";
import { LESSON_OXFORD_MEETING } from "../features/listening/data/lessons/lesson_oxford_meeting";

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Lesson 18 (Oxford Online English: Attending a Meeting) into Neon Database...");

  // 1. Find category by slug or id
  const category = await prisma.videoCategory.findFirst({
    where: {
      OR: [
        { id: LESSON_OXFORD_MEETING.categoryId },
        { slug: LESSON_OXFORD_MEETING.categorySlug }
      ]
    }
  });

  const categoryId = category ? category.id : LESSON_OXFORD_MEETING.categoryId;
  console.log(`Using Category ID: ${categoryId}`);

  // 2. Upsert VideoLesson
  const videoLesson = await prisma.videoLesson.upsert({
    where: { slug: LESSON_OXFORD_MEETING.slug },
    update: {
      id: LESSON_OXFORD_MEETING.id,
      title: LESSON_OXFORD_MEETING.title,
      description: LESSON_OXFORD_MEETING.description,
      sourceType: LESSON_OXFORD_MEETING.sourceType,
      externalId: LESSON_OXFORD_MEETING.externalId,
      thumbnailUrl: LESSON_OXFORD_MEETING.thumbnailUrl,
      durationSeconds: LESSON_OXFORD_MEETING.durationSeconds,
      durationFormatted: LESSON_OXFORD_MEETING.durationFormatted,
      cefrLevel: LESSON_OXFORD_MEETING.cefrLevel,
      supportedTypes: LESSON_OXFORD_MEETING.supportedTypes,
      categoryId,
      accent: LESSON_OXFORD_MEETING.accent,
      wpmSpeed: LESSON_OXFORD_MEETING.wpmSpeed,
      viewCount: LESSON_OXFORD_MEETING.viewCount,
      studyCount: LESSON_OXFORD_MEETING.studyCount,
    },
    create: {
      id: LESSON_OXFORD_MEETING.id,
      slug: LESSON_OXFORD_MEETING.slug,
      title: LESSON_OXFORD_MEETING.title,
      description: LESSON_OXFORD_MEETING.description,
      sourceType: LESSON_OXFORD_MEETING.sourceType,
      externalId: LESSON_OXFORD_MEETING.externalId,
      thumbnailUrl: LESSON_OXFORD_MEETING.thumbnailUrl,
      durationSeconds: LESSON_OXFORD_MEETING.durationSeconds,
      durationFormatted: LESSON_OXFORD_MEETING.durationFormatted,
      cefrLevel: LESSON_OXFORD_MEETING.cefrLevel,
      supportedTypes: LESSON_OXFORD_MEETING.supportedTypes,
      categoryId,
      accent: LESSON_OXFORD_MEETING.accent,
      wpmSpeed: LESSON_OXFORD_MEETING.wpmSpeed,
      viewCount: LESSON_OXFORD_MEETING.viewCount,
      studyCount: LESSON_OXFORD_MEETING.studyCount,
    }
  });

  console.log(`VideoLesson upserted: ${videoLesson.id} (${videoLesson.title})`);

  // 3. Clear existing segments and insert calibrated segments
  await prisma.lessonSegment.deleteMany({
    where: { lessonId: videoLesson.id }
  });

  for (const seg of LESSON_OXFORD_MEETING.segments) {
    const normalizedText = seg.text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .join(" ");

    await prisma.lessonSegment.create({
      data: {
        lessonId: videoLesson.id,
        orderIndex: seg.orderIndex,
        startTime: seg.startTime,
        endTime: seg.endTime,
        text: seg.text,
        normalizedText,
        ipaUs: seg.ipaUs,
        translationVi: seg.translationVi,
        explanationAi: seg.explanationAi,
        properNouns: seg.properNouns || [],
        keywords: seg.keywords || [],
        tokenCount: seg.tokenCount || seg.text.split(/\s+/).filter(Boolean).length,
      }
    });
  }

  console.log(`Inserted ${LESSON_OXFORD_MEETING.segments.length} calibrated segments for ${videoLesson.id}`);

  // 4. Upsert ListeningLesson table for parity
  await prisma.listeningLesson.upsert({
    where: { id: LESSON_OXFORD_MEETING.id },
    update: {
      title: LESSON_OXFORD_MEETING.title,
      category: "TOEIC",
      level: "Intermediate",
      duration: LESSON_OXFORD_MEETING.durationFormatted,
      accent: LESSON_OXFORD_MEETING.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_OXFORD_MEETING.externalId}`,
      imageUrl: LESSON_OXFORD_MEETING.thumbnailUrl,
      transcript: LESSON_OXFORD_MEETING.segments.map((s, idx) => ({
        id: `seg_${idx + 1}`,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        translation: s.translationVi,
        translationVi: s.translationVi,
        ipa: s.ipaUs,
        explanationVi: s.explanationAi,
        properNouns: s.properNouns || [],
        keywords: s.keywords || [],
      })),
    },
    create: {
      id: LESSON_OXFORD_MEETING.id,
      title: LESSON_OXFORD_MEETING.title,
      category: "TOEIC",
      level: "Intermediate",
      duration: LESSON_OXFORD_MEETING.durationFormatted,
      accent: LESSON_OXFORD_MEETING.accent || "en-GB",
      audioUrl: `https://www.youtube.com/watch?v=${LESSON_OXFORD_MEETING.externalId}`,
      imageUrl: LESSON_OXFORD_MEETING.thumbnailUrl,
      transcript: LESSON_OXFORD_MEETING.segments.map((s, idx) => ({
        id: `seg_${idx + 1}`,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        translation: s.translationVi,
        translationVi: s.translationVi,
        ipa: s.ipaUs,
        explanationVi: s.explanationAi,
        properNouns: s.properNouns || [],
        keywords: s.keywords || [],
      })),
    }
  });

  console.log(`Synced ListeningLesson: ${LESSON_OXFORD_MEETING.id}`);
  console.log("🎉 Database synchronization completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during DB sync:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
