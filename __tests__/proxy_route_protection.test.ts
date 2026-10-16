import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

describe("Next.js 16 Edge Route Protection Proxy (proxy.ts)", () => {
  const createRequest = (urlStr: string, cookieToken?: string) => {
    const req = new NextRequest(new URL(urlStr, "https://xpenglish.com"));
    if (cookieToken) {
      req.cookies.set("xp_voca_session", cookieToken);
    }
    return req;
  };

  it("should redirect unauthenticated users accessing /settings to /login with redirect query param", () => {
    const req = createRequest("https://xpenglish.com/settings");
    const res = proxy(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/login?redirect=%2Fsettings");
  });

  it("should preserve query string when redirecting unauthenticated users to /login", () => {
    const req = createRequest("https://xpenglish.com/settings?tab=account&section=security");
    const res = proxy(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/login?redirect=%2Fsettings%3Ftab%3Daccount%26section%3Dsecurity");
  });

  it("should redirect unauthenticated users accessing /admin to /login", () => {
    const req = createRequest("https://xpenglish.com/admin/users");
    const res = proxy(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/login?redirect=%2Fadmin%2Fusers");
  });

  it("should allow authenticated users to access /settings", () => {
    const req = createRequest("https://xpenglish.com/settings", "valid-jwt-session-token");
    const res = proxy(req);

    // NextResponse.next() has no redirect header and is status 200 by default
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("should redirect authenticated user from /login to /dashboard by default", () => {
    const req = createRequest("https://xpenglish.com/login", "valid-jwt-session-token");
    const res = proxy(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://xpenglish.com/dashboard");
  });

  it("should redirect authenticated user from /login to redirectTarget if valid local path", () => {
    const req = createRequest(
      "https://xpenglish.com/login?redirect=%2Fsettings%2Fprofile",
      "valid-jwt-session-token"
    );
    const res = proxy(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://xpenglish.com/settings/profile");
  });

  it("should block open redirect attacks and fallback to /dashboard for authenticated users", () => {
    const maliciousUrls = [
      "https://xpenglish.com/login?redirect=https://evil.com",
      "https://xpenglish.com/login?redirect=//evil.com",
    ];

    for (const url of maliciousUrls) {
      const req = createRequest(url, "valid-jwt-session-token");
      const res = proxy(req);

      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("https://xpenglish.com/dashboard");
    }
  });

  it("should pass through unauthenticated access to public learner pages without redirecting", () => {
    const publicPages = [
      "https://xpenglish.com/",
      "https://xpenglish.com/dashboard",
      "https://xpenglish.com/vocabulary",
      "https://xpenglish.com/study/exam-prep",
      "https://xpenglish.com/dictation",
      "https://xpenglish.com/shadowing",
    ];

    for (const page of publicPages) {
      const req = createRequest(page);
      const res = proxy(req);

      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    }
  });
});
