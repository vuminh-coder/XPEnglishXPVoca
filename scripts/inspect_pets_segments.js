const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const lesson = await prisma.videoLesson.findUnique({
    where: { id: '575d216f-b275-468e-8a41-c3b26c0ac1ea' },
    include: { segments: { orderBy: { orderIndex: 'asc' } } }
  });
  console.log('Title:', lesson.title);
  console.log('Duration:', lesson.durationFormatted, `(${lesson.durationSeconds}s)`);
  console.log('Segments count:', lesson.segments.length);
  lesson.segments.forEach(s => {
    console.log(`[${s.orderIndex}] ${s.startTime}s - ${s.endTime}s: "${s.text}"`);
  });
  await prisma.$disconnect();
})();
