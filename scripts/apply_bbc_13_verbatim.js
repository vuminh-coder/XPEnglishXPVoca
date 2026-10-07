const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const lessonId = 'e4476093-9f0c-4620-a7f3-345d0e6b64db';
  const segments = JSON.parse(fs.readFileSync('scripts/bbc_13_calibrated.json', 'utf8'));

  console.log(`Starting update for BBC lesson: ${lessonId}...`);

  // 1. Update VideoLesson metadata
  const updatedLesson = await prisma.videoLesson.update({
    where: { id: lessonId },
    data: {
      title: 'BBC Learning English: First Treasure Recovered from $20 Billion Sunken Ship',
      description: 'Bản tin thời sự đặc sắc từ BBC Learning English về việc trục vớt kho báu huyền thoại trị giá 20 tỷ USD từ con tàu đắm San Jose năm 1708, học từ vựng tin tức và phát âm Anh-Anh chuẩn.',
      durationSeconds: 90,
      durationFormatted: '01:30',
      cefrLevel: 'B1',
      accent: 'en-GB',
      wpmSpeed: 135,
    },
  });
  console.log(`Updated VideoLesson metadata: ${updatedLesson.title} (${updatedLesson.durationFormatted})`);

  // 2. Delete old segments
  const deleteResult = await prisma.lessonSegment.deleteMany({
    where: { lessonId },
  });
  console.log(`Deleted ${deleteResult.count} old segments.`);

  // 3. Insert new 13 verbatim segments
  let insertedCount = 0;
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
    insertedCount++;
  }

  console.log(`Successfully inserted ${insertedCount} calibrated verbatim segments for BBC lesson!`);
}

main()
  .catch((err) => {
    console.error('Error applying BBC updates:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
