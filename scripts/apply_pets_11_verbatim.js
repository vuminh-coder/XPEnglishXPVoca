const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const LESSON_ID = '575d216f-b275-468e-8a41-c3b26c0ac1ea';

function normalizeText(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const SEGMENTS = JSON.parse(fs.readFileSync('scripts/pets_11_calibrated.json', 'utf8'));

(async () => {
  console.log(`=== UPDATING DATABASE WITH 11 CALIBRATED VERBATIM SEGMENTS FOR PETS LESSON ===`);
  
  // 1. Delete old segments
  const del = await prisma.lessonSegment.deleteMany({
    where: { lessonId: LESSON_ID }
  });
  console.log(`Deleted ${del.count} old segments from DB.`);

  // 2. Insert 11 new segments
  for (const seg of SEGMENTS) {
    const words = seg.text.trim().split(/\s+/);
    await prisma.lessonSegment.create({
      data: {
        lessonId: LESSON_ID,
        orderIndex: seg.orderIndex,
        startTime: seg.startTime,
        endTime: seg.endTime,
        text: seg.text,
        normalizedText: normalizeText(seg.text),
        ipaUs: seg.ipaUs,
        translationVi: seg.translationVi,
        explanationAi: seg.explanationAi,
        properNouns: seg.properNouns,
        keywords: seg.keywords,
        tokenCount: words.length
      }
    });
    console.log(`Created segment #${seg.orderIndex + 1} (${seg.startTime}s - ${seg.endTime}s): "${seg.text.slice(0, 45)}..."`);
  }

  // 3. Update videoLesson metadata
  await prisma.videoLesson.update({
    where: { id: LESSON_ID },
    data: {
      title: "Daily English: Pets, Animals & Nature Conversation",
      description: "Bài luyện nghe giao tiếp tiếng Anh thường ngày về chủ đề thú cưng, động vật sở thú và thiên nhiên cây cỏ.",
      durationSeconds: 72,
      durationFormatted: "01:12",
      cefrLevel: 'A2',
      wpmSpeed: 125
    }
  });
  console.log('Updated videoLesson record in DB.');

  // 4. Verify
  const check = await prisma.videoLesson.findUnique({
    where: { id: LESSON_ID },
    include: { segments: { orderBy: { orderIndex: 'asc' } } }
  });
  console.log(`Verified DB has ${check.segments.length} calibrated verbatim segments.`);

  await prisma.$disconnect();
  console.log('Done database update for Pets video!');
})();
