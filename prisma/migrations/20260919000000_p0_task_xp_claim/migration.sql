-- A task can grant its XP once only. Existing completed tasks were already
-- rewardable before this migration, so mark them as claimed during backfill.
ALTER TABLE "daily_tasks"
ADD COLUMN IF NOT EXISTS "xp_claimed" BOOLEAN NOT NULL DEFAULT false;

UPDATE "daily_tasks"
SET "xp_claimed" = true
WHERE "is_completed" = true;
