const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const lessonId = '88c4fc17-4445-46f4-82d4-c51fbb56e859';
  const segments = JSON.parse(fs.readFileSync('scripts/kurzgesagt_21_calibrated.json', 'utf8'));

  console.log(`Starting database update for Kurzgesagt lesson: ${lessonId}...`);

  // 1. Update VideoLesson metadata
  const updatedLesson = await prisma.videoLesson.update({
    where: { id: lessonId },
    data: {
      title: 'Kurzgesagt: How to Win an Interstellar War',
      description: 'Khám phá cuộc chiến vũ trụ đầy kịch tính cùng Kurzgesagt – In a Nutshell: Liệu người ngoài hành tinh có thể hủy diệt Trái Đất từ khoảng cách hàng năm ánh sáng? Học từ vựng khoa học viễn tưởng, vật lý thiên văn và tư duy logic.',
      durationSeconds: 93,
      durationFormatted: '01:33',
      cefrLevel: 'B2',
      accent: 'en-US',
      wpmSpeed: 140,
    },
  });
  console.log(`Updated VideoLesson metadata: ${updatedLesson.title} (${updatedLesson.durationFormatted})`);

  // 2. Delete old segments
  const deleteResult = await prisma.lessonSegment.deleteMany({
    where: { lessonId },
  });
  console.log(`Deleted ${deleteResult.count} old segments.`);

  // 3. Insert new 21 calibrated segments
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
  console.log(`Verified DB Segment Count for Kurzgesagt: ${count}`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error('Error applying Kurzgesagt update:', e);
  process.exit(1);
});
