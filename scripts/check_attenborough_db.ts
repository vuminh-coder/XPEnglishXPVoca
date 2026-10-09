export {};
import { prisma } from '../infrastructure/database/prisma';

async function main() {
  const vl = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: 'vid_david_attenborough_planet' },
        { externalId: '64R2MYUt394' }
      ]
    },
    include: { segments: { orderBy: { orderIndex: 'asc' } }, category: true }
  });

  console.log('VideoLesson DB ID:', vl?.id);
  console.log('VideoLesson DB Title:', vl?.title);
  console.log('VideoLesson DB Segments Count:', vl?.segments?.length);
  console.log('VideoLesson Category:', vl?.category?.name);

  const ll = await prisma.listeningLesson.findFirst({
    where: {
      OR: [
        { id: 'vid_david_attenborough_planet' },
        { audioUrl: { contains: '64R2MYUt394' } }
      ]
    }
  });

  console.log('ListeningLesson DB ID:', ll?.id);
  console.log('ListeningLesson DB Title:', ll?.title);
  const transcript = Array.isArray(ll?.transcript) ? ll.transcript : [];
  console.log('ListeningLesson Transcript Segments Count:', transcript.length);

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
