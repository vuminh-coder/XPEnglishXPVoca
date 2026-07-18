import { test, expect } from "@playwright/test";

test.describe("Kênh Thoại Nhóm Realtime (Voice Channel 5.0) - Automated Verification", () => {
  test("Verify Microphone Permission Grant and Active Speaking UI State", async ({ page, context }) => {
    // 1. Grant simulated microphone permissions to context
    await context.grantPermissions(["microphone"]);

    // 2. Navigate to Group Study Rooms page
    await page.goto("http://localhost:3000/study/rooms");
    await page.waitForLoadState("networkidle");

    // 3. Select first room card and click join
    const joinRoomBtn = page.locator('button:has-text("Tham gia phòng")').first();
    await expect(joinRoomBtn).toBeVisible();
    await joinRoomBtn.click();

    // 4. Verify Voice Channel Button is present in room header
    const voiceChannelBtn = page.locator('button:has-text("Vào Kênh Thoại")');
    await expect(voiceChannelBtn).toBeVisible();

    // 5. Click to connect voice channel
    await voiceChannelBtn.click();

    // 6. Verify toast notification appears confirming voice connection
    const toast = page.locator('text="Đã bật Kênh Thoại Nhóm 🎙️"');
    await expect(toast).toBeVisible();

    // 7. Verify control buttons (Muted / Active / Settings) are rendered
    const muteToggle = page.locator('button:has-text("Muted"), button:has-text("Đã vào Kênh Thoại")');
    await expect(muteToggle).toBeVisible();
  });

  test("Verify Mute/Unmute Shortcut (Ctrl + Shift + M)", async ({ page, context }) => {
    await context.grantPermissions(["microphone"]);
    await page.goto("http://localhost:3000/study/rooms");
    await page.waitForLoadState("networkidle");

    const joinRoomBtn = page.locator('button:has-text("Tham gia phòng")').first();
    await joinRoomBtn.click();

    const voiceChannelBtn = page.locator('button:has-text("Vào Kênh Thoại")');
    await voiceChannelBtn.click();

    // Trigger hotkey Ctrl+Shift+M to toggle Mute
    await page.keyboard.press("Control+Shift+KeyM");

    // Check mute state reflected on UI
    const mutedBadge = page.locator('text="🔇 Muted"');
    await expect(mutedBadge).toBeVisible();
  });
});
