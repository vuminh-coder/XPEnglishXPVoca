export {};
import { prisma } from '../infrastructure/database/prisma';

async function main() {
  const ll = await prisma.listeningLesson.findFirst({
    where: {
      OR: [
        { id: 'vid_careervidz_interview' },
        { audioUrl: { contains: 'ml8HHHgDxiE' } }
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
