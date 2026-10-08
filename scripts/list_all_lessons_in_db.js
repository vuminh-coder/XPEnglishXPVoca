const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  const dbLessons = await prisma.videoLesson.findMany({
    include: { segments: { select: { id: true } } },
    orderBy: { createdAt: 'asc' }
  });

  console.log('=== DATABASE VIDEO LESSONS (' + dbLessons.length + ') ===');
  dbLessons.forEach((l, i) => {
    console.log(`${i + 1}. [${l.id}] (${l.externalId}) ${l.title} - ${l.segments.length} segs (${l.durationFormatted})`);
  });

  await prisma.$disconnect();
}

main();
