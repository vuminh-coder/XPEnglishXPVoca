/**
 * Safe Admin Bootstrap CLI Utility
 * Promotes existing user account(s) in PostgreSQL to role = "ADMIN".
 * Usage:
 *   npx tsx scripts/promote-admin.ts --email admin@example.com
 *   ADMIN_EMAILS="admin1@example.com,admin2@example.com" npx tsx scripts/promote-admin.ts
 */
import "dotenv/config";
import { prisma } from "../infrastructure/database/prisma";

async function main() {
  const emailFlag = process.argv.find((arg) => arg.startsWith("--email="));
  const cliEmail = emailFlag ? emailFlag.slice("--email=".length).trim() : "";
  const envEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const targets = Array.from(new Set([cliEmail, ...envEmails].filter(Boolean).map((e) => e.toLowerCase())));

  if (targets.length === 0) {
    console.error("Usage: npx tsx scripts/promote-admin.ts --email=user@example.com (or set ADMIN_EMAILS)");
    process.exit(1);
  }

  for (const email of targets) {
    const existing = await prisma.profile.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { id: true, email: true, role: true },
    });

    if (!existing) {
      console.warn(`[Skip] No profile found for email: ${email}`);
      continue;
    }

    await prisma.profile.update({
      where: { id: existing.id },
      data: { role: "ADMIN" },
    });
    console.log(`[Promoted] ${existing.email} (${existing.id}) -> ADMIN`);
  }
}

main()
  .catch((err) => {
    console.error("[Promote Admin Error]:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
