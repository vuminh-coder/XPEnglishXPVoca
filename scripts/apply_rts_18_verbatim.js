const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const lessonId = 'ff4c64b7-ea82-4963-a4f6-1ff808d929e6';
  const segments = JSON.parse(fs.readFileSync('scripts/rewrite_the_stars_18_calibrated.json', 'utf8'));

  console.log(`Starting database update for Rewrite The Stars lesson: ${lessonId}...`);

  // 1. Update VideoLesson metadata
  const updatedLesson = await prisma.videoLesson.update({
    where: { id: lessonId },
    data: {
      title: 'Anne-Marie & James Arthur: Rewrite The Stars (The Greatest Showman)',
      description: 'Luyện nghe và chép chính tả qua ca khúc nhạc phim kinh điển "Rewrite The Stars" (The Greatest Showman: Reimagined) qua giọng ca đầy nội lực của James Arthur và Anne-Marie. Học cách nối âm tự nhiên, thành ngữ tình yêu và cấu trúc giả định.',
      durationSeconds: 105,
      durationFormatted: '01:45',
      cefrLevel: 'B1',
      accent: 'en-US',
      wpmSpeed: 120,
    },
  });
  console.log(`Updated VideoLesson metadata: ${updatedLesson.title} (${updatedLesson.durationFormatted})`);

  // 2. Delete old segments
  const deleteResult = await prisma.lessonSegment.deleteMany({
    where: { lessonId },
  });
  console.log(`Deleted ${deleteResult.count} old segments.`);

  // 3. Insert new 18 calibrated segments
  for (const seg of segments) {
    await prisma.lessonSegment.create({
      data: {
        lessonId,
        orderIndex: seg.orderIndex,
        startTime: seg.startTime,
        endTime: seg.endTime,
        text: seg.text,
        normalizedText: seg.normalizedText,
        ipaUs: seg.ipaUs,
        translationVi: seg.translationVi,
        explanationAi: seg.explanationAi,
        properNouns: seg.properNouns || [],
        keywords: seg.keywords || [],
        tokenCount: seg.tokenCount,
      },
    });
  }
  console.log(`Successfully created ${segments.length} calibrated segments in PostgreSQL database!`);

  // 4. Verify count in DB
  const count = await prisma.lessonSegment.count({ where: { lessonId } });
  console.log(`Verified DB Segment Count for Rewrite The Stars: ${count}`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error('Error applying Rewrite The Stars update:', e);
  process.exit(1);
});
