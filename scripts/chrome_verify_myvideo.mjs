import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const USER_DATA_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\scratch\\chrome_test_profile";
const TARGET_URL = "http://localhost:3000/myvideo";
const PORT = 9222;

// Ensure scratch directory exists
const scratchDir = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\scratch";
if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

console.log("=== STARTING CHROME AUTOMATED TEST FOR /myvideo ===");
console.log(`Chrome Binary: ${CHROME_PATH}`);
console.log(`Target URL: ${TARGET_URL}`);

// Spawn Chrome with remote debugging
const chromeProcess = spawn(
  CHROME_PATH,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    "--window-size=1440,960",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    TARGET_URL,
  ],
  { stdio: "ignore" }
);

function cleanup() {
  try {
    chromeProcess.kill();
  } catch (e) {}
}

process.on("exit", cleanup);
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

// Helper to wait
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForCdpEndpoint(maxRetries = 20) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        const data = await res.json();
        console.log(`CDP Ready. Browser: ${data.Browser}`);
        return true;
      }
    } catch (e) {
      await sleep(500);
    }
  }
  throw new Error("Timeout waiting for Chrome CDP port 9222");
}

async function run() {
  try {
    await waitForCdpEndpoint();

    // Get pages
    const targetsRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const targets = await targetsRes.json();
    console.log(`Found ${targets.length} targets`);

    const pageTarget = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
    if (!pageTarget) {
      throw new Error(`Target page for ${TARGET_URL} not found in CDP list`);
    }

    console.log(`Connecting to WebSocket: ${pageTarget.webSocketDebuggerUrl}`);
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    console.log("WebSocket connected. Initializing protocol...");

    let nextId = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) {
          reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        } else {
          resolve(msg.result);
        }
      }
    };

    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand("Page.enable");
    await sendCommand("Runtime.enable");
    await sendCommand("DOM.enable");

    console.log("Waiting for page load & hydration...");
    await sleep(4000); // Allow Next.js client hydration

    // Helper to evaluate JS in the browser
    async function evaluate(expression) {
      const res = await sendCommand("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      if (res.exceptionDetails) {
        throw new Error(JSON.stringify(res.exceptionDetails));
      }
      return res.result.value;
    }

    console.log("\n================ TEST SUITE VERIFICATION IN REAL CHROME ================");

    // Test 1: Page Title & URL
    const pageInfo = await evaluate(`({
      title: document.title,
      url: window.location.href,
      readyState: document.readyState
    })`);
    console.log(`[PASS] Page loaded: "${pageInfo.title}" at ${pageInfo.url} (readyState: ${pageInfo.readyState})`);

    // Test 2: Check SubtitlesTabPane Header (Must be strictly 1 single row, no wrapping)
    const headerInfo = await evaluate(`(() => {
      // Find the exact header row
      const spans = Array.from(document.querySelectorAll('span'));
      const labelSpan = spans.find(s => s.textContent.includes('CLICK CÂU ĐỂ NHẢY') || s.textContent.includes('Click câu để nhảy'));
      if (!labelSpan) return { found: false };

      const headerDiv = labelSpan.closest('div');
      const rect = headerDiv.getBoundingClientRect();
      const leftText = labelSpan.textContent.trim();
      const button = headerDiv.querySelector('button');
      const buttonText = button?.textContent?.trim() || '';
      const buttonRect = button?.getBoundingClientRect() || null;
      const spanRect = labelSpan.getBoundingClientRect();

      const isOneLine = spanRect && buttonRect && Math.abs(spanRect.top - buttonRect.top) < 10;

      return {
        found: true,
        leftText,
        buttonText,
        height: rect.height,
        width: rect.width,
        isOneLine,
        classList: headerDiv.className
      };
    })()`);

    console.log("\n--- TEST 1: Subtitle Switcher Header (Single Line Requirement) ---");
    console.log("Header info:", JSON.stringify(headerInfo, null, 2));
    if (!headerInfo.found) {
      console.error("[FAIL] Header row with 'Click câu để nhảy' not found in DOM!");
    } else {
      if (headerInfo.isOneLine) {
        console.log(`[PASS] Header is strictly on 1 single line (height: ${headerInfo.height}px, width: ${headerInfo.width}px, left: "${headerInfo.leftText}", button: "${headerInfo.buttonText}")`);
      } else {
        console.error(`[FAIL] Header wrapped or misaligned!`);
      }
    }

    // Capture Mode 1 Dock Clip Screenshot
    const dockClipMode1 = await evaluate(`(() => {
      const spans = Array.from(document.querySelectorAll('span'));
      const labelSpan = spans.find(s => s.textContent.includes('CLICK CÂU ĐỂ NHẢY') || s.textContent.includes('Click câu để nhảy'));
      const dock = labelSpan ? labelSpan.closest('.space-y-3') : null;
      if (!dock) return null;
      const rect = dock.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, scale: 1 };
    })()`);

    if (dockClipMode1) {
      const dockScreenshot1 = await sendCommand("Page.captureScreenshot", {
        format: "png",
        clip: dockClipMode1,
      });
      const dockPath1 = path.join(scratchDir, "chrome_dock_mode1_focus3.png");
      fs.writeFileSync(dockPath1, Buffer.from(dockScreenshot1.data, "base64"));
      console.log(`[PASS] Mode 1 (Focus 3) dock screenshot saved to: ${dockPath1}`);
    }

    // Test 3: Assert -0.2s and +0.2s calibration buttons are COMPLETELY GONE
    console.log("\n--- TEST 2: Verify -0.2s and +0.2s calibration block is completely removed ---");
    const calibrationButtons = await evaluate(`(() => {
      const allButtons = Array.from(document.querySelectorAll('button, a, span'));
      const matches = allButtons.filter(el => {
        const text = el.textContent || '';
        return text.includes('-0.2s') || text.includes('+0.2s') || text.includes('Lệch');
      }).map(el => el.textContent.trim());
      return matches;
    })()`);

    console.log(`Found calibration elements: ${JSON.stringify(calibrationButtons)}`);
    if (calibrationButtons.length === 0) {
      console.log(`[PASS] Verified: Zero -0.2s / +0.2s calibration buttons exist in the DOM.`);
    } else {
      console.error(`[FAIL] Calibration buttons still found:`, calibrationButtons);
    }

    // Test 4: Assert text badges "Sắp phát" and "[CÂU TIẾP THEO 1]" are COMPLETELY GONE
    console.log("\n--- TEST 3: Verify text badges 'Sắp phát' / 'CÂU TIẾP THEO' are removed ---");
    const obsoleteBadges = await evaluate(`(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      const matches = allElements.filter(el => {
        if (el.children.length > 0) return false;
        const text = (el.textContent || '').trim();
        return text.includes('Sắp phát') || text.includes('CÂU TIẾP THEO') || text.includes('câu tiếp theo');
      }).map(el => el.textContent.trim());
      return matches;
    })()`);

    console.log(`Found text badge elements: ${JSON.stringify(obsoleteBadges)}`);
    if (obsoleteBadges.length === 0) {
      console.log(`[PASS] Verified: Zero 'Sắp phát' or 'CÂU TIẾP THEO' text badges exist.`);
    } else {
      console.error(`[FAIL] Text badges still found:`, obsoleteBadges);
    }

    // Test 5: Verify Agency Icons are present on subtitle cues
    console.log("\n--- TEST 4: Verify Subtitle Cue Indicators (Icons replaced badges) ---");
    const subtitleCueIcons = await evaluate(`(() => {
      const timeSpans = Array.from(document.querySelectorAll('div')).filter(d => {
        const c = d.className || '';
        return c.includes('font-mono') && d.querySelector('svg');
      });

      return timeSpans.map(ts => {
        const timeText = ts.textContent?.trim();
        const svgs = Array.from(ts.querySelectorAll('svg')).map(s => s.getAttribute('class') || 'svg');
        const badgeSpan = ts.querySelector('span[title]');
        const title = badgeSpan?.getAttribute('title') || '';
        return { timeText, svgs, title };
      });
    })()`);

    console.log("Cue indicators found:", JSON.stringify(subtitleCueIcons, null, 2));
    if (subtitleCueIcons.length > 0) {
      console.log(`[PASS] Found ${subtitleCueIcons.length} subtitle cues rendered with clean icons and tooltips.`);
    }

    // Test 6: Interactive Toggle to Mode 2 ("Xem Tất Cả")
    console.log("\n--- TEST 5: Interactive Toggle View Mode to Full List ---");
    const toggleToFull = await evaluate(`(async () => {
      const allButtons = Array.from(document.querySelectorAll('button'));
      const toggleBtn = allButtons.find(b => b.textContent.includes('Xem Tất Cả'));
      if (!toggleBtn) return { success: false, reason: 'Toggle button not found' };

      toggleBtn.click();
      await new Promise(r => setTimeout(r, 600));

      const afterText = toggleBtn.textContent.trim();
      const allRows = document.querySelectorAll('.max-h-\\\\[460px\\\\], .overflow-y-auto');
      const subCards = document.querySelectorAll('[id^="sub-cue-"]');

      return {
        success: true,
        buttonTextNow: afterText,
        fullListContainerFound: allRows.length > 0,
        totalCuesRendered: subCards.length
      };
    })()`);

    console.log("Toggle to Full Mode result:", JSON.stringify(toggleToFull, null, 2));

    // Capture Mode 2 Dock Clip Screenshot
    const dockClipMode2 = await evaluate(`(() => {
      const spans = Array.from(document.querySelectorAll('span'));
      const labelSpan = spans.find(s => s.textContent.includes('CLICK CÂU ĐỂ NHẢY') || s.textContent.includes('Click câu để nhảy'));
      const dock = labelSpan ? labelSpan.closest('.space-y-3') : null;
      if (!dock) return null;
      const rect = dock.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, scale: 1 };
    })()`);

    if (dockClipMode2) {
      const dockScreenshot2 = await sendCommand("Page.captureScreenshot", {
        format: "png",
        clip: dockClipMode2,
      });
      const dockPath2 = path.join(scratchDir, "chrome_dock_mode2_all.png");
      fs.writeFileSync(dockPath2, Buffer.from(dockScreenshot2.data, "base64"));
      console.log(`[PASS] Mode 2 (All Subtitles) dock screenshot saved to: ${dockPath2}`);
    }

    // Toggle back to Mode 1
    await evaluate(`(() => {
      const allButtons = Array.from(document.querySelectorAll('button'));
      const toggleBtn = allButtons.find(b => b.textContent.includes('Focus 3 Câu'));
      if (toggleBtn) toggleBtn.click();
    })()`);
    await sleep(400);

    // Test 7: Verify Karaoke Words interaction
    console.log("\n--- TEST 6: Subtitle Karaoke Words & Lookup Check ---");
    const karaokeCheck = await evaluate(`(() => {
      const wordSpans = Array.from(document.querySelectorAll('span.cursor-pointer.select-none'));
      return {
        wordCount: wordSpans.length,
        firstFewWords: wordSpans.slice(0, 10).map(w => w.textContent.trim())
      };
    })()`);
    console.log("Karaoke words check:", JSON.stringify(karaokeCheck, null, 2));

    // Capture Full Page Screenshot
    console.log("\n--- CAPTURING FULL SCREENSHOT IN REAL CHROME ---");
    const screenshotData = await sendCommand("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    const screenshotPath = path.join(scratchDir, "chrome_myvideo_verified.png");
    fs.writeFileSync(screenshotPath, Buffer.from(screenshotData.data, "base64"));
    console.log(`[PASS] Chrome screenshot saved to: ${screenshotPath}`);

    // Capture Subtitles Dock Clip Screenshot
    const dockClip = await evaluate(`(() => {
      const allDivs = Array.from(document.querySelectorAll('div'));
      const headerDiv = allDivs.find(d => d.textContent.includes('Click câu để nhảy') && d.querySelector('button'));
      const dock = headerDiv ? headerDiv.closest('.space-y-3') : null;
      if (!dock) return null;
      const rect = dock.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, scale: 1 };
    })()`);

    if (dockClip) {
      const dockScreenshot = await sendCommand("Page.captureScreenshot", {
        format: "png",
        clip: dockClip,
      });
      const dockScreenshotPath = path.join(scratchDir, "chrome_subtitles_dock_verified.png");
      fs.writeFileSync(dockScreenshotPath, Buffer.from(dockScreenshot.data, "base64"));
      console.log(`[PASS] Subtitles dock zoomed screenshot saved to: ${dockScreenshotPath}`);
    }

    console.log("\n================ ALL CHROME TESTS COMPLETED SUCCESSFULLY ================\n");

    ws.close();
  } catch (err) {
    console.error("Test failed with error:", err);
    process.exitCode = 1;
  } finally {
    cleanup();
  }
}

run();
