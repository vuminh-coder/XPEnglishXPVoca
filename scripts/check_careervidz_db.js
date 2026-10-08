const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const r = await prisma.videoLesson.findFirst({
    where: { externalId: 'ml8HHHgDxiE' },
    include: { segments: { orderBy: { orderIndex: 'asc' } } }
  });
  console.log('CareerVidz DB ID:', r?.id);
  console.log('CareerVidz DB Title:', r?.title);
  console.log('CareerVidz DB Segments Count:', r?.segments?.length);
  r?.segments?.forEach(s => {
    console.log(`[Order ${s.orderIndex}] ${s.startTime}s - ${s.endTime}s: "${s.text.slice(0, 45)}..."`);
  });
  await prisma.$disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
