const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const segments = JSON.parse(fs.readFileSync('scripts/ted_bilingual_18_calibrated.json', 'utf8'));
  const LESSON_ID = 'vid_ted_bilingual_brain';
  const YOUTUBE_ID = 'MMmOLN5zBLY';

  console.log(`Applying 18 verbatim segments for TED-Ed (${LESSON_ID})...`);

  // 1. Get or confirm TED-Ed category
  let tedCategory = await prisma.videoCategory.findFirst({
    where: { OR: [{ slug: 'ted-ed' }, { id: 'cat_ted_ed' }] },
  });

  const categoryId = tedCategory ? tedCategory.id : null;

  // 2. Upsert VideoLesson
  const lesson = await prisma.videoLesson.upsert({
    where: { id: LESSON_ID },
    update: {
      slug: 'ted-ed-benefits-of-a-bilingual-brain',
      title: 'TED-Ed: The Benefits of a Bilingual Brain',
      description: 'Khám phá cách não bộ xử lý đa ngôn ngữ giúp cải thiện trí nhớ, tăng khả năng tập trung và làm chậm quá trình lão hóa nhận thức.',
      sourceType: 'YOUTUBE',
      externalId: YOUTUBE_ID,
      thumbnailUrl: `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
      durationSeconds: 126,
      durationFormatted: '02:05',
      cefrLevel: 'B1',
      supportedTypes: 'BOTH',
      categoryId: categoryId,
      accent: 'en-US',
      wpmSpeed: 138,
      viewCount: 4520,
      studyCount: 1680,
    },
    create: {
      id: LESSON_ID,
      slug: 'ted-ed-benefits-of-a-bilingual-brain',
      title: 'TED-Ed: The Benefits of a Bilingual Brain',
      description: 'Khám phá cách não bộ xử lý đa ngôn ngữ giúp cải thiện trí nhớ, tăng khả năng tập trung và làm chậm quá trình lão hóa nhận thức.',
      sourceType: 'YOUTUBE',
      externalId: YOUTUBE_ID,
      thumbnailUrl: `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
      durationSeconds: 126,
      durationFormatted: '02:05',
      cefrLevel: 'B1',
      supportedTypes: 'BOTH',
      categoryId: categoryId,
      accent: 'en-US',
      wpmSpeed: 138,
      viewCount: 4520,
      studyCount: 1680,
    },
  });

  console.log('Upserted lesson:', lesson.id, lesson.title);

  // 3. Remove old segments
  const deleted = await prisma.lessonSegment.deleteMany({
    where: { lessonId: LESSON_ID },
  });
  console.log(`Deleted ${deleted.count} old segments.`);

  // 4. Insert 18 calibrated segments
  const created = [];
  for (const seg of segments) {
    const rawWords = seg.text.trim().split(/\s+/);
    const tokenCount = rawWords.length;
    const normalizedText = seg.text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').trim();

    const record = await prisma.lessonSegment.create({
      data: {
        lessonId: LESSON_ID,
        orderIndex: seg.orderIndex,
        startTime: seg.startTime,
        endTime: seg.endTime,
        text: seg.text,
        normalizedText,
        ipaUs: seg.ipaUs,
        translationVi: seg.translationVi,
        explanationAi: seg.explanation,
        properNouns: seg.properNouns || [],
        keywords: seg.keywords || [],
        tokenCount,
      },
    });
    created.push(record);
  }

  console.log(`Successfully inserted ${created.length} verbatim segments in database!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
