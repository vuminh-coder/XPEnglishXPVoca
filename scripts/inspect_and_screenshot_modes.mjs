import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity-ide\\brain\\d1281a24-3b37-4d3f-8a44-b563e5ab976c";

class ChromeCDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.pending = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            resolve(msg.result);
          }
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    const payload = JSON.stringify({ id, method, params });
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(payload);
    });
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || "Runtime exception");
    }
    return res.result?.value;
  }

  async screenshot(filename) {
    const res = await this.send("Page.captureScreenshot", { format: "png" });
    const buffer = Buffer.from(res.data, "base64");
    const fullPath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(fullPath, buffer);
    console.log(`[Screenshot] Saved: ${filename}`);
    return fullPath;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function inspectButtons() {
  const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
  const page = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
  const cdp = new ChromeCDP(page.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  console.log("Navigating to /vocabulary/t_basic_greetings...");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary/t_basic_greetings" });
  await new Promise((r) => setTimeout(r, 2000));

  // Inspect all interactive pill buttons in header
  const pills = await cdp.eval(`(() => {
    const items = Array.from(document.querySelectorAll('header span, header button, header a')).map((el, i) => ({
      index: i,
      tag: el.tagName,
      text: el.innerText.trim(),
      className: el.className
    })).filter(x => x.text.length > 0 && x.text.length < 25);
    return items;
  })()`);
  console.log("Header Pill Items:", JSON.stringify(pills, null, 2));

  // 1. Click Tab 'Danh Sách'
  console.log("Clicking 'Danh Sách' tab...");
  await cdp.eval(`(() => {
    const el = Array.from(document.querySelectorAll('header *')).find(e => e.innerText && e.innerText.trim() === 'Danh Sách');
    if (el) {
      el.click();
      el.closest('button')?.click();
    }
  })()`);
  await new Promise((r) => setTimeout(r, 1500));
  await cdp.screenshot("vocab_tab_danh_sach_real.png");

  // 2. Click Tab 'Kiểm Tra'
  console.log("Clicking 'Kiểm Tra' tab...");
  await cdp.eval(`(() => {
    const el = Array.from(document.querySelectorAll('header *')).find(e => e.innerText && e.innerText.trim() === 'Kiểm Tra');
    if (el) {
      el.click();
      el.closest('button')?.click();
    }
  })()`);
  await new Promise((r) => setTimeout(r, 1500));
  await cdp.screenshot("vocab_tab_kiem_tra_real.png");

  // 3. Click Tab 'AI Coach'
  console.log("Clicking 'AI Coach' tab...");
  await cdp.eval(`(() => {
    const el = Array.from(document.querySelectorAll('header *')).find(e => e.innerText && e.innerText.trim() === 'AI Coach');
    if (el) {
      el.click();
      el.closest('button')?.click();
    }
  })()`);
  await new Promise((r) => setTimeout(r, 1500));
  await cdp.screenshot("vocab_tab_ai_coach_real.png");

  cdp.close();
}

inspectButtons().catch(console.error);
