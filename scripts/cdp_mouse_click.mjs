import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity-ide\\brain\\d1281a24-3b37-4d3f-8a44-b563e5ab976c";

class ChromeCDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.pending = new Map();
    this.logs = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === "Runtime.consoleAPICalled") {
          const text = msg.params.args?.map(a => a.value || JSON.stringify(a)).join(" ");
          this.logs.push(`[${msg.params.type}] ${text}`);
        }
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

  close() {
    if (this.ws) this.ws.close();
  }
}

async function mouseClick() {
  const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
  const page = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
  const cdp = new ChromeCDP(page.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  console.log("Navigating to /vocabulary/t_basic_greetings...");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary/t_basic_greetings" });
  await new Promise((r) => setTimeout(r, 2000));

  // Get precise bounding box of 'Danh Sách'
  const coords = await cdp.eval(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.title === 'Danh Sách' || b.innerText.includes('Danh Sách'));
    if (!btn) return null;
    const r = btn.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, title: btn.title, outer: btn.outerHTML };
  })()`);

  console.log("Button coords & outer:", coords);
  if (coords) {
    await cdp.send("Input.dispatchMouseEvent", {
      type: "mousePressed",
      x: Math.round(coords.x),
      y: Math.round(coords.y),
      button: "left",
      clickCount: 1,
    });
    await new Promise(r => setTimeout(r, 50));
    await cdp.send("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x: Math.round(coords.x),
      y: Math.round(coords.y),
      button: "left",
      clickCount: 1,
    });
    console.log("Native mouse click sent to coords:", coords.x, coords.y);
  }

  await new Promise(r => setTimeout(r, 2000));

  console.log("Console Logs Captured:", cdp.logs);

  const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(ARTIFACT_DIR, "vocab_native_click_list.png"), Buffer.from(shot.data, "base64"));
  console.log("Saved vocab_native_click_list.png");

  cdp.close();
}

mouseClick().catch(console.error);
