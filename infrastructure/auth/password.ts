import crypto from "crypto";

const PBKDF2_V2_ITERATIONS = 100_000;
const PBKDF2_LEGACY_ITERATIONS = 10_000;

function getLegacySaltKey(): string {
  const envKey = process.env.PASSWORD_SALT_KEY?.trim();
  if (envKey) return envKey;
  if (process.env.NODE_ENV === "production") {
    throw new Error("CRITICAL SECURITY ERROR: PASSWORD_SALT_KEY is required in production for legacy hash verification.");
  }
  return "xp_voca_secret_salt_2026_dev_only";
}

function getAncientShaSalt(): string {
  const envKey = process.env.PASSWORD_SALT_KEY?.trim();
  if (envKey) return envKey;
  if (process.env.NODE_ENV === "production") {
    throw new Error("CRITICAL SECURITY ERROR: PASSWORD_SALT_KEY is required in production.");
  }
  return "xp_voca_salt_2026";
}

/**
 * Hash password securely using PBKDF2 (100,000 SHA-512 iterations) with a random 16-byte salt.
 * Format: pbkdf2v2:<salt>:<hash>
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, PBKDF2_V2_ITERATIONS, 64, "sha512").toString("hex");
  return `pbkdf2v2:${salt}:${hash}`;
}

/**
 * Returns true if the stored hash uses a legacy iteration count or algorithm and should be
 * transparently upgraded on next successful login.
 */
export function needsPasswordRehash(storedHash: string): boolean {
  return !storedHash.startsWith("pbkdf2v2:");
}

/**
 * Compare plain password against stored hash with constant-time comparison.
 * Supports:
 * 1. V2 dynamic salt format (100k iterations): pbkdf2v2:<salt>:<hash>
 * 2. V1 dynamic salt format (10k iterations legacy): pbkdf2:<salt>:<hash>
 * 3. Legacy static salt format: pbkdf2:<hash>
 * 4. Ancient sha256 fallback format: <hex_sha256>
 */
export function comparePassword(password: string, storedHash: string): boolean {
  if (!storedHash || typeof storedHash !== "string") return false;

  if (storedHash.startsWith("pbkdf2v2:") || storedHash.startsWith("pbkdf2:")) {
    const parts = storedHash.split(":");
    const iterations = storedHash.startsWith("pbkdf2v2:") ? PBKDF2_V2_ITERATIONS : PBKDF2_LEGACY_ITERATIONS;

    if (parts.length === 3) {
      const [, salt, expectedHash] = parts;
      if (!salt || !expectedHash) return false;
      const computedHash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");

      const bufExpected = Buffer.from(expectedHash, "hex");
      const bufComputed = Buffer.from(computedHash, "hex");
      if (bufExpected.length !== bufComputed.length) return false;
      return crypto.timingSafeEqual(bufExpected, bufComputed);
    }

    if (parts.length === 2 && storedHash.startsWith("pbkdf2:")) {
      const legacySalt = crypto.createHash("sha256").update(getLegacySaltKey()).digest("hex").substring(0, 16);
      const computedHash = crypto.pbkdf2Sync(password, legacySalt, PBKDF2_LEGACY_ITERATIONS, 64, "sha512").toString("hex");
      const expectedHash = parts[1];

      const bufExpected = Buffer.from(expectedHash, "hex");
      const bufComputed = Buffer.from(computedHash, "hex");
      if (bufExpected.length !== bufComputed.length) return false;
      return crypto.timingSafeEqual(bufExpected, bufComputed);
    }

    return false;
  }

  // Legacy SHA256 check fallback
  const legacyHash = crypto.createHash("sha256").update(password + getAncientShaSalt()).digest("hex");
  const bufExpected = Buffer.from(storedHash, "utf8");
  const bufComputed = Buffer.from(legacyHash, "utf8");
  if (bufExpected.length !== bufComputed.length) return false;
  return crypto.timingSafeEqual(bufExpected, bufComputed);
}

