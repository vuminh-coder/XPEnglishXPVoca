import crypto from "crypto";

declare global {
  var __xpVocaDevJwtSecret: string | undefined;
}

export function getJwtSecret(): string {
  const envSecret = process.env.JWT_SECRET?.trim();
  if (envSecret) {
    return envSecret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("CRITICAL SECURITY ERROR: JWT_SECRET environment variable must be defined in production!");
  }

  if (!globalThis.__xpVocaDevJwtSecret) {
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(32));
    globalThis.__xpVocaDevJwtSecret = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  return globalThis.__xpVocaDevJwtSecret;
}

export interface SessionPayload {
  userId: string;
  email?: string | null;
  username?: string | null;
  role?: "USER" | "ADMIN" | string;
  iat?: number;
  exp?: number;
}

/**
 * Base64URL encode string
 */
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Base64URL decode string
 */
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return Buffer.from(str, "base64").toString("utf8");
}

/**
 * Sign JWT token
 */
export function signAuthToken(payload: Omit<SessionPayload, "iat" | "exp">, expiresInDays = 30): string {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInDays * 24 * 60 * 60;

  const fullPayload: SessionPayload = {
    ...payload,
    iat: now,
    exp,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac("sha256", getJwtSecret())
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verify JWT token
 */
export function verifyAuthToken(token: string): SessionPayload | null {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", getJwtSecret())
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const sigBuffer = Buffer.from(signature, "utf8");
    const expBuffer = Buffer.from(expectedSignature, "utf8");

    if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch (error) {
    return null;
  }
}
