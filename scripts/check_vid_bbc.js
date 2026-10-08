const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const vid = await prisma.videoLesson.findFirst({
    where: {
      OR: [
        { id: 'vid_bbc_why_we_laugh' },
        { externalId: 'Fez57g8jMNM' },
        { externalId: 'V74l_zS1x8E' },
        { slug: { contains: 'laugh' } }
      ]
    }
  });
  console.log('Result:', vid);
}

main().finally(() => prisma.$disconnect());
