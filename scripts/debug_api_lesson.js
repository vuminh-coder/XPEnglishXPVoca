const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const id = 'vid_bbc_why_we_laugh';
  const videoLesson = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id },
        { slug: id },
        { externalId: id },
      ],
    },
    include: {
      category: true,
      segments: {
        orderBy: { orderIndex: 'asc' },
      },
    },
  });

  console.log('VideoLesson found:', videoLesson ? {
    id: videoLesson.id,
    title: videoLesson.title,
    externalId: videoLesson.externalId,
    segmentsLength: videoLesson.segments.length,
    firstSeg: videoLesson.segments[0]
  } : null);
}

main().finally(() => prisma.$disconnect());
