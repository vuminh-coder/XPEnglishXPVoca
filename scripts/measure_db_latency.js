require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function measure() {
  console.log('=== MEASURING DATABASE & QUERY LATENCY ===');
  const t0 = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  const t1 = Date.now();
  console.log(`1st Query (Connection + Ping): ${t1 - t0}ms`);

  const t2 = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  const t3 = Date.now();
  console.log(`2nd Query (Warm Ping): ${t3 - t2}ms`);

  const t4 = Date.now();
  const count = await prisma.profile.count();
  const t5 = Date.now();
  console.log(`Profile count query: ${t5 - t4}ms (Count: ${count})`);

  const t6 = Date.now();
  const dailyCount = await prisma.dailySkillPractice.count();
  const t7 = Date.now();
  console.log(`DailySkillPractice count query: ${t7 - t6}ms (Count: ${dailyCount})`);

  const t8 = Date.now();
  const userVocabCount = await prisma.userVocabulary.count();
  const t9 = Date.now();
  console.log(`UserVocabulary count query: ${t9 - t8}ms (Count: ${userVocabCount})`);
}

measure().catch(console.error).finally(() => prisma.$disconnect());
