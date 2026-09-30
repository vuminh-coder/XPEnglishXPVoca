import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const USER_DATA_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\scratch\\chrome_premium_profile";
const TARGET_URL = "http://localhost:3000/premium";
const PORT = 9223;

const scratchDir = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\scratch";
if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

const chromeProcess = spawn(
  CHROME_PATH,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    "--window-size=1440,2400",
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForCdpEndpoint(maxRetries = 20) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return true;
    } catch (e) {
      await sleep(500);
    }
  }
  throw new Error("Timeout waiting for Chrome CDP");
}

async function run() {
  try {
    await waitForCdpEndpoint();
    const targetsRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const targets = await targetsRes.json();
    const pageTarget = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
    if (!pageTarget) throw new Error("Target page not found");

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let nextId = 1;
    const pending = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
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
    await sendCommand("DOM.enable");
    await sleep(4000); // Wait for animations & hydration

    const screenshotData = await sendCommand("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
    });

    const screenshotPath = path.join(scratchDir, "premium_full_page.png");
    fs.writeFileSync(screenshotPath, Buffer.from(screenshotData.data, "base64"));
    console.log("Screenshot saved to:", screenshotPath);

    ws.close();
  } catch (err) {
    console.error("Error:", err);
  } finally {
    cleanup();
  }
}

run();
