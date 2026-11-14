import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";
import { signAuthToken } from "@/infrastructure/auth/jwt";

describe("Next.js 16 Edge Route Protection Proxy (proxy.ts)", () => {
  const userToken = signAuthToken({
    userId: "user_standard_1",
    email: "learner@xpenglish.com",
    role: "USER",
  });

  const adminToken = signAuthToken({
    userId: "user_admin_1",
    email: "admin@xpenglish.com",
    role: "ADMIN",
  });

  const createRequest = (urlStr: string, cookieToken?: string) => {
    const req = new NextRequest(new URL(urlStr, "https://xpenglish.com"));
    if (cookieToken) {
      req.cookies.set("xp_voca_session", cookieToken);
    }
    return req;
  };

  it("should redirect unauthenticated users accessing /settings to /login with redirect query param", async () => {
    const req = createRequest("https://xpenglish.com/settings");
    const res = await proxy(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/login?redirect=%2Fsettings");
  });

  it("should preserve query string when redirecting unauthenticated users to /login", async () => {
    const req = createRequest("https://xpenglish.com/settings?tab=account&section=security");
    const res = await proxy(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/login?redirect=%2Fsettings%3Ftab%3Daccount%26section%3Dsecurity");
  });

  it("should reject forged or non-JWT session strings on protected routes", async () => {
    const req = createRequest("https://xpenglish.com/settings", "forged-not-a-valid-jwt");
    const res = await proxy(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/login?redirect=%2Fsettings");
  });

  it("should protect /profile and /shop for unauthenticated users", async () => {
    for (const path of ["/profile", "/shop", "/onboarding"]) {
      const req = createRequest(`https://xpenglish.com${path}`);
      const res = await proxy(req);

      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toContain(`/login?redirect=${encodeURIComponent(path)}`);
    }
  });

  it("should redirect unauthenticated users accessing /admin to /login", async () => {
    const req = createRequest("https://xpenglish.com/admin/users");
    const res = await proxy(req);

    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/login?redirect=%2Fadmin%2Fusers");
  });

  it("should block non-admin authenticated users from /admin and /api/admin", async () => {
    const pageReq = createRequest("https://xpenglish.com/admin", userToken);
    const pageRes = await proxy(pageReq);
    expect(pageRes.status).toBe(307);
    expect(pageRes.headers.get("location")).toBe("https://xpenglish.com/dashboard?error=forbidden");

    const apiReq = createRequest("https://xpenglish.com/api/admin/overview", userToken);
    const apiRes = await proxy(apiReq);
    expect(apiRes.status).toBe(403);
  });

  it("should allow ADMIN users to access /admin", async () => {
    const req = createRequest("https://xpenglish.com/admin", adminToken);
    const res = await proxy(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("should allow authenticated users with verified JWT to access /settings", async () => {
    const req = createRequest("https://xpenglish.com/settings", userToken);
    const res = await proxy(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("should redirect authenticated user from /login to /dashboard by default", async () => {
    const req = createRequest("https://xpenglish.com/login", userToken);
    const res = await proxy(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://xpenglish.com/dashboard");
  });

  it("should redirect authenticated user from /login to redirectTarget if valid local path", async () => {
    const req = createRequest(
      "https://xpenglish.com/login?redirect=%2Fsettings%2Fprofile",
      userToken
    );
    const res = await proxy(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://xpenglish.com/settings/profile");
  });

  it("should block open redirect attacks and fallback to /dashboard for authenticated users", async () => {
    const maliciousUrls = [
      "https://xpenglish.com/login?redirect=https://evil.com",
      "https://xpenglish.com/login?redirect=//evil.com",
    ];

    for (const url of maliciousUrls) {
      const req = createRequest(url, userToken);
      const res = await proxy(req);

      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("https://xpenglish.com/dashboard");
    }
  });

  it("should pass through unauthenticated access to public learner pages without redirecting", async () => {
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
      const res = await proxy(req);

      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    }
  });
});
