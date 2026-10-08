import { prisma } from '../infrastructure/database/prisma';

async function main() {
  const vl = await prisma.videoLesson.findUnique({
    where: { id: 'vid_oxford_food_cooking' },
    include: { segments: { orderBy: { orderIndex: 'asc' } } }
  });

  console.log('VideoLesson DB ID:', vl?.id);
  console.log('VideoLesson DB Title:', vl?.title);
  console.log('VideoLesson DB Segments Count:', vl?.segments?.length);

  vl?.segments?.forEach(s => {
    console.log(`[Order ${s.orderIndex}] ${s.startTime}s - ${s.endTime}s: "${s.text}"`);
  });

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
