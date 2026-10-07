const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const LESSON_ID = '0678a126-f94d-4930-81ce-ebe1e6731e7e';

function normalizeText(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const SEGMENTS = JSON.parse(fs.readFileSync('scripts/steve_jobs_18_perfect.json', 'utf8'));

(async () => {
  console.log(`=== UPDATING DATABASE WITH 18 PERFECT VERBATIM SEGMENTS ===`);
  
  // 1. Delete old segments
  const del = await prisma.lessonSegment.deleteMany({
    where: { lessonId: LESSON_ID }
  });
  console.log(`Deleted ${del.count} old segments from DB.`);

  // 2. Insert 18 new segments
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
      title: "Steve Jobs: How to Live Before You Die (Stanford Commencement Address)",
      description: "Bài diễn thuyết kinh điển của Steve Jobs tại Đại học Stanford năm 2005 về việc bỏ học, khởi nghiệp, theo đuổi đam mê và nghệ thuật kết nối những dấu mốc cuộc đời.",
      durationSeconds: 173,
      durationFormatted: "02:53",
      cefrLevel: 'B2',
      wpmSpeed: 145
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
  console.log('Done database update for Steve Jobs!');
})();
