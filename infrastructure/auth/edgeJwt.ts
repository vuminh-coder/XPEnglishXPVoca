/**
 * Edge & Node Runtime compatible HS256 JWT verifier using Web Crypto API.
 * Never imports Node-only modules so proxy.ts can execute on Vercel Edge Runtime.
 */

export interface EdgeSessionPayload {
  userId: string;
  email?: string | null;
  username?: string | null;
  role?: "USER" | "ADMIN" | string;
  iat?: number;
  exp?: number;
}

declare global {
  var __xpVocaDevJwtSecret: string | undefined;
}

function getEdgeJwtSecret(): string | null {
  const envSecret = process.env.JWT_SECRET?.trim();
  if (envSecret) return envSecret;
  if (process.env.NODE_ENV === "production") return null;

  if (!globalThis.__xpVocaDevJwtSecret) {
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(32));
    globalThis.__xpVocaDevJwtSecret = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  return globalThis.__xpVocaDevJwtSecret;
}

function base64UrlToUint8Array(base64Url: string): Uint8Array {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function decodeBase64UrlJson<T>(base64Url: string): T {
  const bytes = base64UrlToUint8Array(base64Url);
  const jsonStr = new TextDecoder().decode(bytes);
  return JSON.parse(jsonStr) as T;
}

/**
 * Cryptographically verifies HS256 JWT token signature and expiration using Web Crypto API.
 */
export async function verifyEdgeAuthToken(token: string): Promise<EdgeSessionPayload | null> {
  try {
    if (!token || typeof token !== "string") return null;

    const secret = getEdgeJwtSecret();
    if (!secret) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = decodeBase64UrlJson<{ alg?: string; typ?: string }>(encodedHeader);
    if (header.alg !== "HS256") return null;

    const encoder = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signatureBytes = base64UrlToUint8Array(encodedSignature);
    const dataBytes = encoder.encode(`${encodedHeader}.${encodedPayload}`);
    const sigBuffer = signatureBytes.buffer.slice(
      signatureBytes.byteOffset,
      signatureBytes.byteOffset + signatureBytes.byteLength
    ) as ArrayBuffer;
    const dataBuffer = dataBytes.buffer.slice(
      dataBytes.byteOffset,
      dataBytes.byteOffset + dataBytes.byteLength
    ) as ArrayBuffer;

    const isValid = await globalThis.crypto.subtle.verify(
      "HMAC",
      key,
      sigBuffer,
      dataBuffer
    );

    if (!isValid) return null;

    const payload = decodeBase64UrlJson<EdgeSessionPayload>(encodedPayload);
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
