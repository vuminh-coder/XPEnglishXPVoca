const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const segments = JSON.parse(fs.readFileSync('scripts/airport_checkin_16_calibrated.json', 'utf8'));
  const LESSON_ID = 'vid_airport_checkin';
  const YOUTUBE_ID = 'bIz2Gzu3DKE';

  console.log(`Applying 16 verbatim segments for Airport Check-in (${LESSON_ID})...`);

  // 1. Get or confirm category & playlist
  const dailyCat = await prisma.videoCategory.findFirst({
    where: { OR: [{ slug: 'daily-conversations' }, { id: '1feb1223-1d96-43e0-80e8-d1081d68dda1' }] },
  });

  const dailyPl = await prisma.videoPlaylist.findFirst({
    where: { OR: [{ slug: 'daily-city-life' }, { id: '8c319fc4-2ca1-45f6-b984-867894a82e5a' }] },
  });

  const categoryId = dailyCat ? dailyCat.id : null;
  const playlistId = dailyPl ? dailyPl.id : null;

  // 2. Upsert VideoLesson
  const lesson = await prisma.videoLesson.upsert({
    where: { id: LESSON_ID },
    update: {
      slug: 'daily-english-airport-check-in',
      title: 'English for Travel: Checking in at the Airport',
      description: 'Học các mẫu câu giao tiếp tiếng Anh thực tế nhất khi làm thủ tục check-in tại sân bay: xuất trình hộ chiếu, cân hành lý, chọn ghế ngồi cửa sổ và tìm cửa khởi hành cùng Pocket Passport.',
      sourceType: 'YOUTUBE',
      externalId: YOUTUBE_ID,
      thumbnailUrl: `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
      durationSeconds: 60,
      durationFormatted: '01:00',
      cefrLevel: 'A2',
      supportedTypes: 'BOTH',
      categoryId: categoryId,
      playlistId: playlistId,
      accent: 'en-US',
      wpmSpeed: 115,
      viewCount: 5200,
      studyCount: 2100,
    },
    create: {
      id: LESSON_ID,
      slug: 'daily-english-airport-check-in',
      title: 'English for Travel: Checking in at the Airport',
      description: 'Học các mẫu câu giao tiếp tiếng Anh thực tế nhất khi làm thủ tục check-in tại sân bay: xuất trình hộ chiếu, cân hành lý, chọn ghế ngồi cửa sổ và tìm cửa khởi hành cùng Pocket Passport.',
      sourceType: 'YOUTUBE',
      externalId: YOUTUBE_ID,
      thumbnailUrl: `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`,
      durationSeconds: 60,
      durationFormatted: '01:00',
      cefrLevel: 'A2',
      supportedTypes: 'BOTH',
      categoryId: categoryId,
      playlistId: playlistId,
      accent: 'en-US',
      wpmSpeed: 115,
      viewCount: 5200,
      studyCount: 2100,
    },
  });

  console.log('Upserted lesson:', lesson.id, lesson.title);

  // 3. Remove old segments
  const deleted = await prisma.lessonSegment.deleteMany({
    where: { lessonId: LESSON_ID },
  });
  console.log(`Deleted ${deleted.count} old segments.`);

  // 4. Insert 16 calibrated segments
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
