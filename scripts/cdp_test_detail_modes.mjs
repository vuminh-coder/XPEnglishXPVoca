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
    console.log(`[Screenshot] Saved: ${filename} (${buffer.length} bytes)`);
    return fullPath;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runDetailAudit() {
  const targetsRes = await fetch("http://127.0.0.1:9222/json");
  const targets = await targetsRes.json();
  const pageTarget = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));

  const cdp = new ChromeCDP(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  console.log("-> 1. Điều hướng trực tiếp tới /vocabulary/t_basic_greetings");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary/t_basic_greetings" });
  await new Promise((r) => setTimeout(r, 2000));

  // 1. Chụp màn hình mặt trước Flashcard
  await cdp.screenshot("vocab_detail_1_card_front.png");

  // 2. Click lật mặt sau Flashcard
  console.log("-> 2. Click lật thẻ xem nghĩa tiếng Việt & ví dụ");
  await cdp.eval(`(() => {
    // Press Space or click flashcard
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
  })()`);
  await new Promise((r) => setTimeout(r, 800));
  await cdp.screenshot("vocab_detail_2_card_back.png");

  // 3. Chuyển sang Tab "Danh Sách"
  console.log("-> 3. Chuyển sang Tab 'Danh Sách'");
  await cdp.eval(`(() => {
    const listBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Danh Sách');
    if (listBtn) listBtn.click();
  })()`);
  await new Promise((r) => setTimeout(r, 1000));
  await cdp.screenshot("vocab_detail_3_tab_list.png");

  // 4. Chuyển sang Tab "Kiểm Tra" (Quiz)
  console.log("-> 4. Chuyển sang Tab 'Kiểm Tra' (Quiz)");
  await cdp.eval(`(() => {
    const quizBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Kiểm Tra');
    if (quizBtn) quizBtn.click();
  })()`);
  await new Promise((r) => setTimeout(r, 1000));
  await cdp.screenshot("vocab_detail_4_tab_quiz.png");

  // 5. Thử trả lời 1 câu hỏi quiz
  console.log("-> 5. Thử chọn 1 đáp án trong Quiz");
  const answeredInfo = await cdp.eval(`(() => {
    const optBtn = Array.from(document.querySelectorAll('button')).find(b => 
      b.className.includes('border') && b.innerText.length > 2 && !b.innerText.includes('Trang chủ') && !b.innerText.includes('Luyện Ngay')
    );
    if (optBtn) {
      const text = optBtn.innerText;
      optBtn.click();
      return { clickedOption: text };
    }
    return { clickedOption: null };
  })()`);
  console.log("Đã chọn đáp án:", answeredInfo);
  await new Promise((r) => setTimeout(r, 800));
  await cdp.screenshot("vocab_detail_5_quiz_answered.png");

  // 6. Chuyển sang Tab "AI Coach"
  console.log("-> 6. Chuyển sang Tab 'AI Coach'");
  await cdp.eval(`(() => {
    const aiBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'AI Coach');
    if (aiBtn) aiBtn.click();
  })()`);
  await new Promise((r) => setTimeout(r, 1000));
  await cdp.screenshot("vocab_detail_6_tab_ai_coach.png");

  cdp.close();
  console.log("🎉 Hoàn tất kiểm thử tất cả các mode của Theme Detail!");
}

runDetailAudit().catch(console.error);
