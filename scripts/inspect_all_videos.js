const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function list() {
  const allDb = await prisma.videoLesson.findMany({
    select: { id: true, title: true, externalId: true, categoryId: true, durationFormatted: true },
    orderBy: { createdAt: 'asc' }
  });
  console.log('Total in VideoLesson DB:', allDb.length);
  allDb.forEach((v, i) => console.log(`${i + 1}. [${v.id}] ${v.title} (${v.externalId}, ${v.durationFormatted})`));

  const allListening = await prisma.listeningLesson.findMany({
    select: { id: true, title: true, category: true }
  });
  console.log('\nTotal in ListeningLesson DB:', allListening.length);

  const categories = await prisma.videoCategory.findMany({
    include: { _count: { select: { lessons: true } } }
  });
  console.log('\nCategories in DB:');
  categories.forEach(c => console.log(`- ${c.name} (${c.slug}): ${c._count.lessons} bài học`));
}

list().finally(() => prisma.$disconnect());
