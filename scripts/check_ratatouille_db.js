const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const r = await prisma.videoLesson.findFirst({
    where: { externalId: 'tAyQL1inris' },
    include: { segments: { orderBy: { orderIndex: 'asc' } } }
  });
  console.log('Ratatouille DB ID:', r?.id);
  console.log('Ratatouille DB Title:', r?.title);
  console.log('Ratatouille DB Segments Count:', r?.segments?.length);
  r?.segments?.forEach(s => {
    console.log(`[Order ${s.orderIndex}] ${s.startTime}s - ${s.endTime}s: "${s.text.slice(0, 45)}..."`);
  });
  await prisma.$disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
