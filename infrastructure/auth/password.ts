import crypto from "crypto";

const ENV_SALT_KEY = process.env.PASSWORD_SALT_KEY;

if (!ENV_SALT_KEY && process.env.NODE_ENV === "production") {
  console.error("CRITICAL SECURITY ERROR: PASSWORD_SALT_KEY environment variable is not defined in production!");
}

const SALT_KEY = ENV_SALT_KEY || "xp_voca_secret_salt_2026_dev_only";

/**
 * Hash password securely using PBKDF2 with cryptographically random salt (OWASP recommended)
 * Format: pbkdf2:<salt>:<hash>
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `pbkdf2:${salt}:${hash}`;
}

/**
 * Compare plain password against stored hash with timing attack prevention.
 * Supports:
 * 1. New dynamic salt format: pbkdf2:<salt>:<hash>
 * 2. Legacy static salt format: pbkdf2:<hash>
 * 3. Ancient sha256 fallback format: <hex_sha256>
 */
export function comparePassword(password: string, storedHash: string): boolean {
  if (!storedHash || typeof storedHash !== "string") return false;

  // PBKDF2 verification
  if (storedHash.startsWith("pbkdf2:")) {
    const parts = storedHash.split(":");
    if (parts.length === 3) {
      // New format: pbkdf2:<salt>:<hash>
      const [, salt, expectedHash] = parts;
      if (!salt || !expectedHash) return false;
      const computedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

      const bufExpected = Buffer.from(expectedHash, "hex");
      const bufComputed = Buffer.from(computedHash, "hex");
      if (bufExpected.length !== bufComputed.length) return false;
      return crypto.timingSafeEqual(bufExpected, bufComputed);
    }

    if (parts.length === 2) {
      // Legacy format: pbkdf2:<hash> (static salt)
      const legacySalt = crypto.createHash("sha256").update(SALT_KEY).digest("hex").substring(0, 16);
      const computedHash = crypto.pbkdf2Sync(password, legacySalt, 10000, 64, "sha512").toString("hex");
      const expectedHash = parts[1];

      const bufExpected = Buffer.from(expectedHash, "hex");
      const bufComputed = Buffer.from(computedHash, "hex");
      if (bufExpected.length !== bufComputed.length) return false;
      return crypto.timingSafeEqual(bufExpected, bufComputed);
    }

    return false;
  }

  // Legacy SHA256 check fallback
  const legacyHash = crypto.createHash("sha256").update(password + (ENV_SALT_KEY || "xp_voca_salt_2026")).digest("hex");
  const bufExpected = Buffer.from(storedHash, "utf8");
  const bufComputed = Buffer.from(legacyHash, "utf8");
  if (bufExpected.length !== bufComputed.length) return false;
  return crypto.timingSafeEqual(bufExpected, bufComputed);
}

