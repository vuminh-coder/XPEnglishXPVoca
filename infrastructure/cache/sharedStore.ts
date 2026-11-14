import { prisma } from "@/infrastructure/database/prisma";

interface MemoryEntry {
  valueJson: string;
  expiresAt: number;
}

const memoryFallback = new Map<string, MemoryEntry>();

function getUpstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (url && token) return { url, token };
  return null;
}

function hasEphemeralTable(): boolean {
  const model = (prisma as unknown as { ephemeralState?: { findUnique?: unknown } })?.ephemeralState;
  return typeof model?.findUnique === "function";
}

async function upstashCommand<T = unknown>(args: (string | number)[]): Promise<T | null> {
  const cfg = getUpstashConfig();
  if (!cfg) return null;

  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Upstash HTTP ${res.status}`);
  }
  const payload = (await res.json()) as { result?: T };
  return payload.result ?? null;
}

function pruneMemoryExpired(key: string): MemoryEntry | null {
  const entry = memoryFallback.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    memoryFallback.delete(key);
    return null;
  }
  return entry;
}

/**
 * Serverless-safe distributed state store for cross-instance ephemeral data
 * (PvP rooms, WebRTC signals, rate cooldowns, generated guides cache).
 *
 * Uses Upstash Redis when UPSTASH_REDIS_REST_URL + TOKEN are configured,
 * falls back to PostgreSQL `ephemeral_states` in multi-instance Vercel deploys,
 * and degrades to in-memory Map only when running partial mocked unit tests.
 */
export const sharedStore = {
  async get<T>(key: string): Promise<T | null> {
    const upstash = getUpstashConfig();
    if (upstash) {
      try {
        const raw = await upstashCommand<string | null>(["GET", key]);
        if (!raw) return null;
        return JSON.parse(raw) as T;
      } catch (err) {
        console.warn("[sharedStore] Upstash GET failed, falling back to DB:", err);
      }
    }

    if (hasEphemeralTable()) {
      const record = await prisma.ephemeralState.findUnique({
        where: { key },
        select: { valueJson: true, expiresAt: true },
      });
      if (!record) return null;
      if (record.expiresAt.getTime() <= Date.now()) {
        await prisma.ephemeralState.delete({ where: { key } }).catch(() => {});
        return null;
      }
      return JSON.parse(record.valueJson) as T;
    }

    const entry = pruneMemoryExpired(key);
    return entry ? (JSON.parse(entry.valueJson) as T) : null;
  },

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const ttl = Math.max(1, Math.round(ttlSeconds));
    const serialized = JSON.stringify(value);
    const expiresAt = new Date(Date.now() + ttl * 1000);

    const upstash = getUpstashConfig();
    if (upstash) {
      try {
        await upstashCommand(["SET", key, serialized, "EX", ttl]);
        return;
      } catch (err) {
        console.warn("[sharedStore] Upstash SET failed, falling back to DB:", err);
      }
    }

    if (hasEphemeralTable()) {
      await prisma.ephemeralState.upsert({
        where: { key },
        update: { valueJson: serialized, expiresAt },
        create: { key, valueJson: serialized, expiresAt },
      });
      return;
    }

    memoryFallback.set(key, { valueJson: serialized, expiresAt: expiresAt.getTime() });
  },

  async del(key: string): Promise<void> {
    const upstash = getUpstashConfig();
    if (upstash) {
      try {
        await upstashCommand(["DEL", key]);
        return;
      } catch (err) {
        console.warn("[sharedStore] Upstash DEL failed, falling back to DB:", err);
      }
    }

    if (hasEphemeralTable()) {
      await prisma.ephemeralState.delete({ where: { key } }).catch(() => {});
      return;
    }

    memoryFallback.delete(key);
  },
};
