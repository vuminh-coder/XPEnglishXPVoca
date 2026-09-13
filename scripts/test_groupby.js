const { prisma, safeDbExecute } = require('./infrastructure/database/prisma');

async function testLeaderboard() {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 7);
  const startDateStr = startDate.toISOString().slice(0, 10);
  const todayStr = today.toISOString().slice(0, 10);

  const res = await safeDbExecute(async () => {
    const [practiceAggregations, profiles] = await Promise.all([
      prisma.dailySkillPractice.groupBy({
        by: ['userId'],
        where: {
          date: {
            gte: startDateStr,
            lte: todayStr,
          },
        },
        _sum: {
          xpEarned: true,
          minutes: true,
        },
      }),
      prisma.profile.findMany({
        select: {
          id: true,
          fullName: true,
          username: true,
          level: true,
          title: true,
          totalXp: true,
          avatarEmoji: true,
          avatarUrl: true,
          minutesStudied: true,
        },
        take: 100,
      }),
    ]);
    return { aggCount: practiceAggregations.length, profCount: profiles.length };
  }, "Test Query");

  console.log('Result:', res);
}

testLeaderboard().catch(console.error).finally(() => process.exit(0));
