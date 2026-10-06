import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const src = readFileSync(join(process.cwd(), "app/api/ai/sessions/route.ts"), "utf8");

describe("AI sessions API - guest privacy isolation", () => {
  it("does not fall back to a shared 'guest_ai_user' bucket", () => {
    expect(src).not.toContain('|| "guest_ai_user"');
  });

  it("GET returns empty history for unauthenticated users", () => {
    expect(src).toMatch(/if \(!authUserId\) \{\s*return NextResponse\.json\(\{ success: true, sessions: \[\], activeSession: null \}\);/);
  });

  it("POST acknowledges guests without persisting to DB or memory store", () => {
    const post = src.slice(src.indexOf("export async function POST"), src.indexOf("export async function DELETE"));
    const guestBranch = post.indexOf("if (!authUserId)");
    const firstPersist = post.indexOf("sessionMemoryStore[userId]");
    expect(guestBranch).toBeGreaterThan(-1);
    expect(guestBranch).toBeLessThan(firstPersist);
  });
});
