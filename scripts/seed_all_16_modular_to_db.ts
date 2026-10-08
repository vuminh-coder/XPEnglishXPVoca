import { PrismaClient } from "@prisma/client";
import { ALL_MODULAR_LESSONS } from "../features/listening/data/lessons";
import { MOCK_VIDEO_CATEGORIES } from "../features/listening/data/categories";

const prisma = new PrismaClient();

async function main() {
  console.log(`Starting Database Sync for all ${ALL_MODULAR_LESSONS.length} modular lessons...`);

  // 1. Upsert all categories
  for (const cat of MOCK_VIDEO_CATEGORIES) {
    await prisma.videoCategory.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        orderIndex: cat.orderIndex,
      },
      create: {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        orderIndex: cat.orderIndex,
        isFeatured: true,
      },
    });
    console.log(`✓ Category synced: [${cat.slug}] ${cat.name}`);
  }

  // 2. Upsert all 16 lessons and their segments
  for (let i = 0; i < ALL_MODULAR_LESSONS.length; i++) {
    const l = ALL_MODULAR_LESSONS[i];
    
    // Find category ID in DB
    const catDb = await prisma.videoCategory.findUnique({
      where: { slug: l.categorySlug },
    });

    const categoryId = catDb ? catDb.id : undefined;

    // Check if lesson exists by ID or by slug or by externalId
    const existing = await prisma.videoLesson.findFirst({
      where: {
        OR: [
          { id: l.id },
          { slug: l.slug },
          { externalId: l.externalId },
        ],
      },
    });

    let lessonRecordId = l.id;

    if (existing) {
      lessonRecordId = existing.id;
      await prisma.videoLesson.update({
        where: { id: existing.id },
        data: {
          slug: l.slug,
          title: l.title,
          description: l.description,
          externalId: l.externalId,
          thumbnailUrl: l.thumbnailUrl,
          durationSeconds: l.durationSeconds,
          durationFormatted: l.durationFormatted,
          cefrLevel: l.cefrLevel,
          supportedTypes: l.supportedTypes,
          accent: l.accent,
          wpmSpeed: l.wpmSpeed,
          viewCount: l.viewCount,
          studyCount: l.studyCount,
          categoryId: categoryId || null,
        },
      });
    } else {
      const created = await prisma.videoLesson.create({
        data: {
          id: l.id,
          slug: l.slug,
          title: l.title,
          description: l.description,
          sourceType: l.sourceType,
          externalId: l.externalId,
          thumbnailUrl: l.thumbnailUrl,
          durationSeconds: l.durationSeconds,
          durationFormatted: l.durationFormatted,
          cefrLevel: l.cefrLevel,
          supportedTypes: l.supportedTypes,
          accent: l.accent,
          wpmSpeed: l.wpmSpeed,
          viewCount: l.viewCount,
          studyCount: l.studyCount,
          categoryId: categoryId || null,
        },
      });
      lessonRecordId = created.id;
    }

    // Replace segments
    await prisma.lessonSegment.deleteMany({
      where: { lessonId: lessonRecordId },
    });

    await prisma.lessonSegment.createMany({
      data: l.segments.map((seg) => ({
        lessonId: lessonRecordId,
        orderIndex: seg.orderIndex,
        startTime: seg.startTime,
        endTime: seg.endTime,
        text: seg.text,
        normalizedText: seg.normalizedText || seg.text.toLowerCase().replace(/[^a-z0-9\s]/g, ""),
        translationVi: seg.translationVi,
        ipaUs: seg.ipaUs || null,
        explanationAi: seg.explanationAi || null,
        properNouns: seg.properNouns || [],
        keywords: seg.keywords || [],
        tokenCount: seg.tokenCount || seg.text.trim().split(/\s+/).length,
      })),
    });

    console.log(`✓ [${i + 1}/${ALL_MODULAR_LESSONS.length}] Synced to DB: ${l.title.substring(0, 40)}... (${l.segments.length} segs)`);
  }

  console.log("\n🎉 ALL 16 DIVERSE LESSONS SUCCESSFULLY SYNCED TO NEON POSTGRESQL DATABASE!");
}

main()
  .catch((e) => {
    console.error("Error during DB sync:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
