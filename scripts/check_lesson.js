const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const targetId = '1481dc60-fe8a-4fa9-830b-9a227ede9b6e';
  const v = await prisma.videoLesson.findUnique({
    where: { id: targetId },
    include: { segments: { orderBy: { orderIndex: 'asc' } } }
  });
  console.log('VideoLesson:', v ? {
    id: v.id,
    title: v.title,
    externalId: v.externalId,
    sourceType: v.sourceType,
    segmentsCount: v.segments.length,
    first3Segments: v.segments.slice(0, 3)
  } : 'NOT FOUND');

  const l = await prisma.listeningLesson.findUnique({
    where: { id: targetId }
  });
  console.log('ListeningLesson:', l ? {
    id: l.id,
    title: l.title,
    audioUrl: l.audioUrl,
    transcriptLength: Array.isArray(l.transcript) ? l.transcript.length : typeof l.transcript
  } : 'NOT FOUND');

  // Let's also check if there are other VideoLessons in the database
  const allVideos = await prisma.videoLesson.findMany({
    select: { id: true, title: true, externalId: true, _count: { select: { segments: true } } },
    take: 10
  });
  console.log('All VideoLessons in DB:', allVideos);
}

main().catch(console.error).finally(() => prisma.$disconnect());
