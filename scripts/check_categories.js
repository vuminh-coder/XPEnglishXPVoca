const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.videoCategory.findMany();
  console.log('Categories in DB:');
  cats.forEach(c => console.log(`- ${c.id} | ${c.slug} | ${c.nameVi}`));
}

main().finally(() => prisma.$disconnect());
