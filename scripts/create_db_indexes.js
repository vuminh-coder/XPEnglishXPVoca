require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createIndexes() {
  console.log('=== APPLYING DATABASE INDEXES TO NEON POSTGRESQL ===');
  
  try {
    console.log('1. Creating index on daily_skill_practice(date)...');
    await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS "idx_daily_skill_practice_date" ON "daily_skill_practice"("date");');
    console.log('   ✅ Index idx_daily_skill_practice_date active');

    console.log('2. Creating composite index on user_vocabulary(user_id, is_favorite)...');
    await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS "idx_user_vocabulary_favorite" ON "user_vocabulary"("user_id", "is_favorite");');
    console.log('   ✅ Index idx_user_vocabulary_favorite active');

    console.log('3. Creating composite index on user_vocabulary(user_id, next_review)...');
    await prisma.$executeRawUnsafe('CREATE INDEX IF NOT EXISTS "idx_user_vocabulary_next_review" ON "user_vocabulary"("user_id", "next_review");');
    console.log('   ✅ Index idx_user_vocabulary_next_review active');

    console.log('\n🎉 ALL HIGH-SPEED DATABASE INDEXES SUCCESSFULLY CREATED ON NEON!');
  } catch (err) {
    console.error('Error applying indexes:', err);
  }
}

createIndexes().catch(console.error).finally(() => prisma.$disconnect());
