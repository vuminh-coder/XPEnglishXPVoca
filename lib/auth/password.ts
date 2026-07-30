import crypto from "crypto";

const SALT_KEY = "xp_voca_secret_salt_2026";

/**
 * Hash password securely using PBKDF2 (OWASP recommended algorithm)
 */
export function hashPassword(password: string): string {
  const salt = crypto.createHash("sha256").update(SALT_KEY).digest("hex").substring(0, 16);
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `pbkdf2:${hash}`;
}

/**
 * Compare plain password against stored hash (supports legacy sha256 + pbkdf2)
 */
export function comparePassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;

  // Modern PBKDF2 hash check
  if (storedHash.startsWith("pbkdf2:")) {
    const computedHash = hashPassword(password);
    return computedHash === storedHash;
  }

  // Legacy SHA256 check fallback
  const legacyHash = crypto.createHash("sha256").update(password + "xp_voca_salt_2026").digest("hex");
  return legacyHash === storedHash;
}
