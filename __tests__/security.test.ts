import { describe, it, expect, beforeEach, vi } from "vitest";
import { memoryRateLimiter } from "@/infrastructure/security/rateLimiter";
import { sanitizeInput, isValidEmail, isPayloadTooLarge } from "@/infrastructure/security/validation";
import { signAuthToken, verifyAuthToken } from "@/infrastructure/auth/jwt";
import { hashPassword, comparePassword } from "@/infrastructure/auth/password";
import { getAuthenticatedUserId } from "@/infrastructure/auth/auth";

const { mockCookieStore } = vi.hoisted(() => ({
  mockCookieStore: { data: {} as Record<string, string> }
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => {
      const val = mockCookieStore.data[name];
      return val ? { value: val } : undefined;
    },
    set: (name: string, value: string) => {
      mockCookieStore.data[name] = value;
    },
  }),
}));

describe("Security Modules Deep Audit & Unit Tests", () => {
  describe("1. Rate Limiter (infrastructure/security/rateLimiter.ts)", () => {
    const testKey = "test_ip_192.168.1.100";

    beforeEach(() => {
      vi.useRealTimers();
    });

    it("should allow requests under the specified limit", () => {
      const limit = 3;
      const windowMs = 60000;
      const key = `${testKey}_under_limit_${Date.now()}`;

      const res1 = memoryRateLimiter.check(key, limit, windowMs);
      expect(res1.allowed).toBe(true);
      expect(res1.remaining).toBe(2);

      const res2 = memoryRateLimiter.check(key, limit, windowMs);
      expect(res2.allowed).toBe(true);
      expect(res2.remaining).toBe(1);

      const res3 = memoryRateLimiter.check(key, limit, windowMs);
      expect(res3.allowed).toBe(true);
      expect(res3.remaining).toBe(0);
    });

    it("should block requests exceeding the limit", () => {
      const limit = 2;
      const windowMs = 60000;
      const key = `${testKey}_exceed_${Date.now()}`;

      memoryRateLimiter.check(key, limit, windowMs); // 1
      memoryRateLimiter.check(key, limit, windowMs); // 2

      const blockedRes = memoryRateLimiter.check(key, limit, windowMs); // 3
      expect(blockedRes.allowed).toBe(false);
      expect(blockedRes.remaining).toBe(0);
      expect(blockedRes.resetSeconds).toBeGreaterThan(0);
    });

    it("should reset rate limit after window expiration", () => {
      vi.useFakeTimers();
      const limit = 1;
      const windowMs = 5000; // 5s
      const key = `${testKey}_timer_${Date.now()}`;

      const res1 = memoryRateLimiter.check(key, limit, windowMs);
      expect(res1.allowed).toBe(true);

      const res2 = memoryRateLimiter.check(key, limit, windowMs);
      expect(res2.allowed).toBe(false);

      // Advance time beyond window
      vi.advanceTimersByTime(5001);

      const res3 = memoryRateLimiter.check(key, limit, windowMs);
      expect(res3.allowed).toBe(true);
      expect(res3.remaining).toBe(0);

      vi.useRealTimers();
    });

    it("should isolate limits for different keys", () => {
      const limit = 1;
      const windowMs = 60000;
      const keyA = `user_A_${Date.now()}`;
      const keyB = `user_B_${Date.now()}`;

      expect(memoryRateLimiter.check(keyA, limit, windowMs).allowed).toBe(true);
      expect(memoryRateLimiter.check(keyA, limit, windowMs).allowed).toBe(false);

      expect(memoryRateLimiter.check(keyB, limit, windowMs).allowed).toBe(true);
    });
  });

  describe("2. Input Validation & Sanitization (infrastructure/security/validation.ts)", () => {
    describe("sanitizeInput", () => {
      it("should sanitize dangerous HTML tags and XSS attack patterns", () => {
        const xssPayload = '<script>alert("XSS")</script>';
        const sanitized = sanitizeInput(xssPayload);
        expect(sanitized).not.toContain("<script>");
        expect(sanitized).toContain("&lt;script&gt;");
      });

      it("should sanitize inline event handlers and javascript: URIs", () => {
        const handlerPayload = '<img src="x" onerror="alert(1)" />';
        const jsUriPayload = '<a href="javascript:alert(1)">Click</a>';

        expect(sanitizeInput(handlerPayload)).not.toContain("onerror=");
        expect(sanitizeInput(jsUriPayload)).not.toContain("javascript:");
      });

      it("should safely handle non-string or falsy input", () => {
        // @ts-expect-error testing invalid type
        expect(sanitizeInput(null)).toBeNull();
        // @ts-expect-error testing invalid type
        expect(sanitizeInput(undefined)).toBeUndefined();
        expect(sanitizeInput("")).toBe("");
      });
    });

    describe("isValidEmail", () => {
      it("should return true for valid RFC 5322 email formats", () => {
        expect(isValidEmail("user@example.com")).toBe(true);
        expect(isValidEmail("john.doe+test@domain.co.uk")).toBe(true);
        expect(isValidEmail("   admin@xpenglish.com   ")).toBe(true);
      });

      it("should return false for invalid email formats", () => {
        expect(isValidEmail("invalid-email")).toBe(false);
        expect(isValidEmail("@domain.com")).toBe(false);
        expect(isValidEmail("user@domain")).toBe(false);
        expect(isValidEmail("user@.com")).toBe(false);
        expect(isValidEmail("")).toBe(false);
        // @ts-expect-error testing invalid type
        expect(isValidEmail(null)).toBe(false);
      });
    });

    describe("isPayloadTooLarge", () => {
      it("should detect payloads exceeding the byte limit", () => {
        const limit = 1024 * 1024; // 1MB
        expect(isPayloadTooLarge("2097152", limit)).toBe(true); // 2MB
        expect(isPayloadTooLarge("524288", limit)).toBe(false); // 512KB
      });

      it("should handle missing or invalid Content-Length headers safely", () => {
        const limit = 1024 * 1024;
        expect(isPayloadTooLarge(null, limit)).toBe(false);
        expect(isPayloadTooLarge("invalid-number", limit)).toBe(false);
      });
    });
  });

  describe("3. JWT Authentication (infrastructure/auth/jwt.ts)", () => {
    it("should sign and verify valid JWT tokens", () => {
      const payload = { userId: "user-123", email: "test@example.com", username: "testuser" };
      const token = signAuthToken(payload);

      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3);

      const decoded = verifyAuthToken(token);
      expect(decoded).not.toBeNull();
      expect(decoded?.userId).toBe("user-123");
      expect(decoded?.email).toBe("test@example.com");
      expect(decoded?.username).toBe("testuser");
    });

    it("should reject tampered JWT tokens", () => {
      const token = signAuthToken({ userId: "user-123" });
      const parts = token.split(".");

      // Modify payload
      const tamperedPayload = Buffer.from(JSON.stringify({ userId: "hacker-999" })).toString("base64url");
      const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;

      expect(verifyAuthToken(tamperedToken)).toBeNull();
    });

    it("should reject expired tokens", () => {
      vi.useFakeTimers();
      const token = signAuthToken({ userId: "user-123" }, 1); // 1 day exp

      // Fast-forward 2 days
      vi.advanceTimersByTime(2 * 24 * 60 * 60 * 1000);

      expect(verifyAuthToken(token)).toBeNull();

      vi.useRealTimers();
    });

    it("should handle malformed or null tokens gracefully without crashing", () => {
      expect(verifyAuthToken("")).toBeNull();
      expect(verifyAuthToken("invalid.token")).toBeNull();
      expect(verifyAuthToken("part1.part2.part3.part4")).toBeNull();
      // @ts-expect-error testing invalid type
      expect(verifyAuthToken(null)).toBeNull();
    });
  });

  describe("4. Password Hashing (infrastructure/auth/password.ts)", () => {
    it("should hash password with PBKDF2 format", () => {
      const rawPassword = "SecurePassword123!";
      const hash = hashPassword(rawPassword);

      expect(hash).toMatch(/^pbkdf2:[a-f0-9]{128}$/);
    });

    it("should verify correct password against PBKDF2 hash", () => {
      const rawPassword = "MySecretPassword2026!";
      const hash = hashPassword(rawPassword);

      expect(comparePassword(rawPassword, hash)).toBe(true);
      expect(comparePassword("WrongPassword!", hash)).toBe(false);
    });

    it("should fallback to compare legacy SHA256 hashes", () => {
      // Create legacy sha256 hash using default salt fallback
      const legacyPassword = "LegacyUserPass123";
      const crypto = require("crypto");
      const legacySalt = process.env.PASSWORD_SALT_KEY || "xp_voca_salt_2026";
      const legacyHash = crypto.createHash("sha256").update(legacyPassword + legacySalt).digest("hex");

      expect(comparePassword(legacyPassword, legacyHash)).toBe(true);
      expect(comparePassword("WrongLegacyPass", legacyHash)).toBe(false);
    });

    it("should return false for empty or missing stored hash", () => {
      expect(comparePassword("Password123", "")).toBe(false);
      // @ts-expect-error testing invalid type
      expect(comparePassword("Password123", null)).toBe(false);
    });
  });

  describe("5. Authentication Session Hardening (infrastructure/auth/auth.ts)", () => {
    beforeEach(() => {
      mockCookieStore.data = {};
    });

    it("should successfully authenticate valid JWT session token in cookies", async () => {
      const token = signAuthToken({ userId: "auth_user_456" });
      mockCookieStore.data["xp_voca_session"] = token;

      const userId = await getAuthenticatedUserId();
      expect(userId).toBe("auth_user_456");
    });

    it("should authenticate valid Bearer Authorization header in request", async () => {
      const token = signAuthToken({ userId: "bearer_user_789" });
      const req = new Request("https://api.xpvoca.com/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userId = await getAuthenticatedUserId(req);
      expect(userId).toBe("bearer_user_789");
    });

    it("should REJECT unauthenticated client attempts to spoof x-user-id header", async () => {
      const fakeReq = new Request("https://api.xpvoca.com/api/user/profile", {
        headers: {
          "x-user-id": "hacker_target_victim_id",
        },
      });

      const userId = await getAuthenticatedUserId(fakeReq);
      expect(userId).toBeNull();
    });

    it("should return null when session cookie contains invalid or tampered token", async () => {
      mockCookieStore.data["xp_voca_session"] = "invalid.tampered.token";

      const userId = await getAuthenticatedUserId();
      expect(userId).toBeNull();
    });

    it("should return null for completely unauthenticated guest requests", async () => {
      const userId = await getAuthenticatedUserId();
      expect(userId).toBeNull();
    });
  });
});
