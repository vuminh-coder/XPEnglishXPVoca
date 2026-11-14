import { test, expect } from "@playwright/test";

test.describe("XP English E2E Smoke & Regression Checks", () => {
  test("Landing page (/) renders without uncaught errors or 401/500 loops", async ({ page }) => {
    const pageErrors: string[] = [];
    const failedApiCalls: string[] = [];

    page.on("pageerror", (err) => pageErrors.push(err.message));
    page.on("response", (res) => {
      if (res.url().includes("/api/") && (res.status() === 401 || res.status() >= 500)) {
        failedApiCalls.push(`${res.status()} ${res.url()}`);
      }
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);

    await expect(page).toHaveTitle(/XP English|XP Voca/i);
    expect(pageErrors).toEqual([]);
    expect(failedApiCalls).toEqual([]);
  });

  test("Consolidated routes permanently redirect to canonical destinations", async ({ page }) => {
    await page.goto("/study/listening", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/study\/dictation/);

    await page.goto("/study/plan", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/analytics/);

    await page.goto("/study/dictation/video/lesson-1/comprehension", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/study\/dictation\/video\/comprehension\/lesson-1/);
  });

  test("Unknown route renders branded 404 page (app/not-found.tsx)", async ({ page }) => {
    const response = await page.goto("/non-existent-route-audit-check", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/Lỗi 404/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Về Bảng Điều Khiển/i })).toHaveAttribute(
      "href",
      "/dashboard"
    );
  });

  test("Protected routes redirect unauthenticated users to /login", async ({ page }) => {
    for (const protectedPath of ["/admin", "/settings", "/profile", "/onboarding"]) {
      await page.goto(protectedPath, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(/\/login/);
    }
  });

  test("Login page renders clean UI without server/console crashes", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    await page.goto("/login", { waitUntil: "domcontentloaded" });
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /Đăng nhập/i }).first()).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
});
