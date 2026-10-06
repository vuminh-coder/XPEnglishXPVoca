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

async function verifyListAlone() {
  const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
  const page = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
  const cdp = new ChromeCDP(page.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  console.log("Navigating to /vocabulary/t_basic_greetings...");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary/t_basic_greetings" });
  await new Promise((r) => setTimeout(r, 2000));

  // Find the button with text 'Danh Sách'
  console.log("Finding button 'Danh Sách'...");
  const clickRes = await cdp.eval(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.title === 'Danh Sách' || b.innerText.includes('Danh Sách'));
    if (btn) {
      btn.click();
      return { clicked: true, text: btn.innerText };
    }
    return { clicked: false };
  })()`);
  console.log("Click result:", clickRes);
  await new Promise((r) => setTimeout(r, 1500));

  const listData = await cdp.eval(`(() => {
    const searchInput = document.querySelector('input[placeholder*=\"tìm từ\" i]');
    const filterButtons = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('Tất cả') || b.innerText.includes('Chưa thuộc') || b.innerText.includes('Đã thuộc'));
    const cards = Array.from(document.querySelectorAll('h3, .font-display')).map(el => el.innerText.trim()).filter(Boolean);
    return {
      hasSearchInput: Boolean(searchInput),
      placeholder: searchInput?.placeholder,
      filterTabs: filterButtons.map(b => b.innerText.trim()),
      sampleWords: cards.slice(0, 8)
    };
  })()`);
  console.log("List mode data:", JSON.stringify(listData, null, 2));

  await cdp.screenshot("vocab_real_view_list_mode_clean.png");
  cdp.close();
}

verifyListAlone().catch(console.error);
