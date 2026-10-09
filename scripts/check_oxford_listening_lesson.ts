export {};
import { prisma } from '../infrastructure/database/prisma';

async function main() {
  const llById = await prisma.listeningLesson.findUnique({
    where: { id: 'vid_oxford_food_cooking' }
  });

  console.log('ListeningLesson by ID:', llById?.id, llById?.title);
  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
