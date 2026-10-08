const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const segments = JSON.parse(fs.readFileSync('scripts/natgeo_25_calibrated.json', 'utf8'));
  const LESSON_ID = 'vid_ielts_environmental_sustainability';
  const YOUTUBE_ID = '1kUE0BZtTRc';

  console.log(`Applying 25 verbatim segments for National Geographic (${LESSON_ID})...`);

  // 1. Get or confirm category & playlist
  const ieltsCategory = await prisma.videoCategory.findFirst({
    where: { OR: [{ slug: 'ielts-listening' }, { id: '34f7c1a4-bd07-4cd8-9a8a-dcb6e2263ec2' }] },
  });

  const ieltsPlaylist = await prisma.videoPlaylist.findFirst({
    where: { OR: [{ slug: 'ielts-cambridge-listening' }, { id: '5c46b5cc-23eb-4fb5-92ae-0b83863bbef2' }] },
  });

  const categoryId = ieltsCategory ? ieltsCategory.id : null;
  const playlistId = ieltsPlaylist ? ieltsPlaylist.id : null;

  // 2. Upsert VideoLesson
  const lesson = await prisma.videoLesson.upsert({
    where: { id: LESSON_ID },
    update: {
      slug: 'ielts-listening-environmental-sustainability',
      title: 'National Geographic: Renewable Energy 101',
      description: 'Khám phá khoa học năng lượng tái tạo: cơ chế 5 nguồn năng lượng sạch (mặt trời, gió, thủy điện, địa nhiệt, sinh khối), lợi ích đẩy lùi biến đổi khí hậu và thách thức lưu trữ pin.',
      sourceType: 'YOUTUBE',
      externalId: YOUTUBE_ID,
      thumbnailUrl: `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
      durationSeconds: 196,
      durationFormatted: '03:16',
      cefrLevel: 'B2',
      supportedTypes: 'BOTH',
      categoryId: categoryId,
      playlistId: playlistId,
      accent: 'en-US',
      wpmSpeed: 145,
      viewCount: 3840,
      studyCount: 1450,
    },
    create: {
      id: LESSON_ID,
      slug: 'ielts-listening-environmental-sustainability',
      title: 'National Geographic: Renewable Energy 101',
      description: 'Khám phá khoa học năng lượng tái tạo: cơ chế 5 nguồn năng lượng sạch (mặt trời, gió, thủy điện, địa nhiệt, sinh khối), lợi ích đẩy lùi biến đổi khí hậu và thách thức lưu trữ pin.',
      sourceType: 'YOUTUBE',
      externalId: YOUTUBE_ID,
      thumbnailUrl: `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
      durationSeconds: 196,
      durationFormatted: '03:16',
      cefrLevel: 'B2',
      supportedTypes: 'BOTH',
      categoryId: categoryId,
      playlistId: playlistId,
      accent: 'en-US',
      wpmSpeed: 145,
      viewCount: 3840,
      studyCount: 1450,
    },
  });

  console.log('Upserted lesson:', lesson.id, lesson.title);

  // 3. Remove old segments
  const deleted = await prisma.lessonSegment.deleteMany({
    where: { lessonId: LESSON_ID },
  });
  console.log(`Deleted ${deleted.count} old segments.`);

  // 4. Insert 25 calibrated segments
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
