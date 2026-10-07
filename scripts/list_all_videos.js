const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const videos = await prisma.videoLesson.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      segments: {
        orderBy: { orderIndex: 'asc' }
      }
    }
  });
  console.log('Total videos in DB:', videos.length);
  videos.forEach((v, idx) => {
    console.log(`[${idx + 1}] ID: ${v.id} | Slug: ${v.slug} | ExternalId: ${v.externalId}`);
    console.log(`    Title: ${v.title}`);
    console.log(`    Segments: ${v.segments.length} | Duration: ${v.durationFormatted} (${v.durationSeconds}s) | Level: ${v.cefrLevel}`);
    if (v.segments.length > 0) {
      console.log(`    First seg: [${v.segments[0].startTime}s - ${v.segments[0].endTime}s] "${v.segments[0].text.slice(0, 50)}..."`);
      const last = v.segments[v.segments.length - 1];
      console.log(`    Last seg:  [${last.startTime}s - ${last.endTime}s] "${last.text.slice(0, 50)}..."`);
    }
  });
  await prisma.$disconnect();
})();
