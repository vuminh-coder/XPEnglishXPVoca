const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const segments = JSON.parse(fs.readFileSync('scripts/bbc_laugh_18_calibrated.json', 'utf8'));
  const LESSON_ID = 'vid_bbc_why_we_laugh';
  const YOUTUBE_ID = 'Fez57g8jMNM';

  console.log(`Applying 18 verbatim segments for BBC 6 Minute English Laughter (${LESSON_ID})...`);

  // 1. Get BBC category & playlist
  const category = await prisma.videoCategory.findFirst({
    where: { slug: 'bbc-6-minute' },
  });
  const playlist = await prisma.videoPlaylist.findFirst({
    where: { slug: 'bbc-6min-lifestyle' },
  });

  const categoryId = category ? category.id : null;
  const playlistId = playlist ? playlist.id : null;

  // 2. Upsert VideoLesson
  const lesson = await prisma.videoLesson.upsert({
    where: { id: LESSON_ID },
    update: {
      slug: 'bbc-6-minute-why-laughter-is-the-best-medicine',
      title: 'BBC 6 Minute English: Why Laughter is the Best Medicine',
      description: 'Khám phá tác dụng kỳ diệu của tiếng cười đối với sức khỏe tinh thần và thể chất: từ câu đố về loài chuột, giải phóng hormone endorphin đến ngành nghiên cứu khoa học Gelotology.',
      sourceType: 'YOUTUBE',
      externalId: YOUTUBE_ID,
      thumbnailUrl: `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
      durationSeconds: 106,
      durationFormatted: '01:46',
      cefrLevel: 'B1',
      supportedTypes: 'BOTH',
      categoryId,
      playlistId,
      accent: 'en-GB',
      wpmSpeed: 140,
      viewCount: 3820,
      studyCount: 1410,
    },
    create: {
      id: LESSON_ID,
      slug: 'bbc-6-minute-why-laughter-is-the-best-medicine',
      title: 'BBC 6 Minute English: Why Laughter is the Best Medicine',
      description: 'Khám phá tác dụng kỳ diệu của tiếng cười đối với sức khỏe tinh thần và thể chất: từ câu đố về loài chuột, giải phóng hormone endorphin đến ngành nghiên cứu khoa học Gelotology.',
      sourceType: 'YOUTUBE',
      externalId: YOUTUBE_ID,
      thumbnailUrl: `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
      durationSeconds: 106,
      durationFormatted: '01:46',
      cefrLevel: 'B1',
      supportedTypes: 'BOTH',
      categoryId,
      playlistId,
      accent: 'en-GB',
      wpmSpeed: 140,
      viewCount: 3820,
      studyCount: 1410,
    },
  });

  console.log('Upserted lesson:', lesson.id, lesson.title);

  // 3. Remove old segments if any
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
  .finally(async () => {
    await prisma.$disconnect();
  });
