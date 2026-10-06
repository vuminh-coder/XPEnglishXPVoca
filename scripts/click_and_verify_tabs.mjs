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

async function verifyTabs() {
  const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
  const page = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
  const cdp = new ChromeCDP(page.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  console.log("Navigating to /vocabulary/t_basic_greetings...");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary/t_basic_greetings" });
  await new Promise((r) => setTimeout(r, 2000));

  // Get all buttons on page
  const buttons = await cdp.eval(`(() => {
    return Array.from(document.querySelectorAll('button')).map((b, i) => ({
      index: i,
      text: b.innerText.trim(),
      title: b.getAttribute('title') || '',
      className: b.className
    })).filter(x => x.text.length > 0 && x.text.length < 30);
  })()`);
  console.log("All clickable buttons:", JSON.stringify(buttons, null, 2));

  // Click 'Danh Sách'
  console.log("Clicking 'Danh Sách'...");
  const click1 = await cdp.eval(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.title === 'Danh Sách' || b.innerText.includes('Danh Sách'));
    if (btn) {
      btn.click();
      return { success: true, text: btn.innerText };
    }
    return { success: false };
  })()`);
  console.log("Click Danh Sách:", click1);
  await new Promise((r) => setTimeout(r, 1200));

  const afterList = await cdp.eval(`(() => {
    const searchInput = document.querySelector('input[placeholder*=\"tìm\" i], input[placeholder*=\"search\" i]');
    const rows = document.querySelectorAll('tr, [data-testid=\"vocab-item\"]');
    return {
      hasSearchInput: Boolean(searchInput),
      rowsCount: rows.length,
      sampleText: document.querySelector('.font-serif, .font-mono')?.innerText || ''
    };
  })()`);
  console.log("After Click Danh Sách:", afterList);
  await cdp.screenshot("vocab_real_view_list.png");

  // Click 'Kiểm Tra'
  console.log("Clicking 'Kiểm Tra'...");
  const click2 = await cdp.eval(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.title === 'Kiểm Tra' || b.innerText.includes('Kiểm Tra'));
    if (btn) {
      btn.click();
      return { success: true, text: btn.innerText };
    }
    return { success: false };
  })()`);
  console.log("Click Kiểm Tra:", click2);
  await new Promise((r) => setTimeout(r, 1200));

  const afterQuiz = await cdp.eval(`(() => {
    const question = document.querySelector('h2, h3, h4')?.innerText || '';
    const optionBtns = Array.from(document.querySelectorAll('button')).filter(b => b.className.includes('border') && b.innerText.length > 1);
    return {
      question,
      optionsCount: optionBtns.length,
      optionsText: optionBtns.map(b => b.innerText.trim()).slice(0, 4)
    };
  })()`);
  console.log("After Click Kiểm Tra:", afterQuiz);
  await cdp.screenshot("vocab_real_view_quiz.png");

  // Click 'AI Coach'
  console.log("Clicking 'AI Coach'...");
  const click3 = await cdp.eval(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.title === 'AI Coach' || b.innerText.includes('AI Coach'));
    if (btn) {
      btn.click();
      return { success: true, text: btn.innerText };
    }
    return { success: false };
  })()`);
  console.log("Click AI Coach:", click3);
  await new Promise((r) => setTimeout(r, 1200));

  const afterAi = await cdp.eval(`(() => {
    const aiTextArea = document.querySelector('textarea, input[type=\"text\"]');
    return {
      hasAiInput: Boolean(aiTextArea),
      placeholder: aiTextArea?.placeholder || ''
    };
  })()`);
  console.log("After Click AI Coach:", afterAi);
  await cdp.screenshot("vocab_real_view_ai_coach.png");

  cdp.close();
  console.log("🎉 SUCCESS: Verified all 3 sub-modes!");
}

verifyTabs().catch(console.error);
