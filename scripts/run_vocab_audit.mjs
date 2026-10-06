import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity-ide\\brain\\d1281a24-3b37-4d3f-8a44-b563e5ab976c";

class ChromeCDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.pending = new Map();
    this.consoleLogs = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === "Runtime.consoleAPICalled") {
          this.consoleLogs.push({
            type: msg.params.type,
            text: msg.params.args?.map((a) => a.value || JSON.stringify(a)).join(" "),
          });
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

async function runAudit() {
  console.log("===============================================================================");
  console.log("🚀 BẮT ĐẦU KIỂM THỬ TOÀN DIỆN TRANG /vocabulary TRÊN TRÌNH DUYỆT CHROME");
  console.log("===============================================================================");

  // 1. Get targets from Chrome CDP
  const targetsRes = await fetch("http://127.0.0.1:9222/json");
  const targets = await targetsRes.json();
  const pageTarget = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));

  if (!pageTarget) {
    throw new Error("Không tìm thấy trang Chrome localhost:3000 đang mở");
  }

  console.log(`[CDP] Kết nối tới Chrome Target: ${pageTarget.title}`);
  const cdp = new ChromeCDP(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();

  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  // Step 1: Navigate to /vocabulary
  console.log("\n--- BƯỚC 1: ĐIỀU HƯỚNG TỚI http://localhost:3000/vocabulary ---");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary" });
  await new Promise((r) => setTimeout(r, 2000));

  // Check initial render
  const initial = await cdp.eval(`(() => {
    const h1 = document.querySelector('h1')?.innerText || '';
    const searchPlaceholder = document.querySelector('input[type="text"]')?.placeholder || '';
    const cards = Array.from(document.querySelectorAll("a[href^='/vocabulary/']")).map(a => ({
      title: a.querySelector('h3')?.innerText || '',
      subtitle: a.querySelector('p')?.innerText || '',
      href: a.getAttribute('href') || ''
    }));
    return { h1, searchPlaceholder, count: cards.length, firstFour: cards.slice(0, 4) };
  })()`);

  console.log("1.1. Tiêu đề H1:", initial.h1);
  console.log("1.2. Placeholder tìm kiếm:", initial.searchPlaceholder);
  console.log("1.3. Số lượng chủ đề cơ bản đang render:", initial.count);
  console.log("1.4. Bốn chủ đề đầu tiên:", JSON.stringify(initial.firstFour, null, 2));
  await cdp.screenshot("vocab_audit_1_basic_overview.png");

  // Step 2: Switch to "155 Nâng Cao"
  console.log("\n--- BƯỚC 2: CHUYỂN ĐỔI CHẾ ĐỘ '155 NÂNG CAO' ---");
  const switchResult = await cdp.eval(`(() => {
    const advBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('155 Nâng Cao'));
    if (!advBtn) return { success: false, reason: 'Button 155 Nâng Cao not found' };
    advBtn.click();
    return { success: true };
  })()`);
  console.log("2.1. Đã click nút 155 Nâng Cao:", switchResult);
  await new Promise((r) => setTimeout(r, 1000));

  const advancedData = await cdp.eval(`(() => {
    const placeholder = document.querySelector('input[type="text"]')?.placeholder || '';
    const cards = Array.from(document.querySelectorAll("a[href^='/vocabulary/']")).map(a => ({
      title: a.querySelector('h3')?.innerText || '',
      subtitle: a.querySelector('p')?.innerText || '',
      href: a.getAttribute('href') || ''
    }));
    return { placeholder, count: cards.length, firstFour: cards.slice(0, 4) };
  })()`);
  console.log("2.2. Placeholder sau khi chuyển:", advancedData.placeholder);
  console.log("2.3. Số lượng chủ đề nâng cao đang render:", advancedData.count);
  console.log("2.4. Bốn chủ đề nâng cao đầu tiên:", JSON.stringify(advancedData.firstFour, null, 2));
  await cdp.screenshot("vocab_audit_2_advanced_overview.png");

  // Step 3: Test Realtime Search with React-compatible dispatch
  console.log("\n--- BƯỚC 3: KIỂM THỬ TÌM KIẾM REALTIME ---");
  // Click back to basic
  await cdp.eval(`(() => {
    const basicBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('60 Cơ Bản'));
    if (basicBtn) basicBtn.click();
  })()`);
  await new Promise((r) => setTimeout(r, 800));

  const searchResult = await cdp.eval(`(() => {
    const input = document.querySelector('input[type="text"]');
    if (!input) return { error: 'Input not found' };

    // React 16+ native setter pattern to trigger onChange
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeSetter.call(input, 'Gia đình');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    const cards = Array.from(document.querySelectorAll("a[href^='/vocabulary/']")).map(a => ({
      title: a.querySelector('h3')?.innerText || '',
      subtitle: a.querySelector('p')?.innerText || '',
      href: a.getAttribute('href') || ''
    }));
    return { inputVal: input.value, count: cards.length, cards };
  })()`);
  console.log("3.1. Kết quả gõ 'Gia đình':", JSON.stringify(searchResult, null, 2));
  await cdp.screenshot("vocab_audit_3_search_filtered.png");

  // Test Search Clear button
  console.log("3.2. Kiểm tra nút Xóa (X) tìm kiếm...");
  await cdp.eval(`(() => {
    const clearBtn = document.querySelector('button svg.lucide-x')?.closest('button');
    if (clearBtn) clearBtn.click();
    else {
      const input = document.querySelector('input[type="text"]');
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeSetter.call(input, '');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  })()`);
  await new Promise((r) => setTimeout(r, 800));

  const clearedCount = await cdp.eval(`document.querySelectorAll("a[href^='/vocabulary/']").length`);
  console.log("3.3. Số lượng chủ đề sau khi xóa tìm kiếm:", clearedCount);

  // Step 4: Click into Theme Detail
  console.log("\n--- BƯỚC 4: ĐIỀU HƯỚNG VÀO CHI TIẾT CHỦ ĐỀ: /vocabulary/t_basic_greetings ---");
  await cdp.eval(`(() => {
    const firstCard = document.querySelector("a[href='/vocabulary/t_basic_greetings']") || document.querySelector("a[href^='/vocabulary/']");
    if (firstCard) firstCard.click();
  })()`);
  await new Promise((r) => setTimeout(r, 2000));

  const detailInfo = await cdp.eval(`(() => {
    const title = document.querySelector('h1')?.innerText || document.querySelector('h2')?.innerText || '';
    const progress = document.querySelector('span.font-mono')?.innerText || '';
    const tabs = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(t => 
      t.includes('Thẻ Flashcard') || t.includes('Danh Sách Từ') || t.includes('Đấu Trường Quiz') || t.includes('Trợ Lý AI')
    );
    const cardWord = document.querySelector('h3, [data-testid="flashcard-word"], .font-display')?.innerText || '';
    return { title, progress, tabs, cardWord, currentUrl: window.location.href };
  })()`);
  console.log("4.1. Chi tiết chủ đề đã nạp:", JSON.stringify(detailInfo, null, 2));
  await cdp.screenshot("vocab_audit_4_theme_detail_flashcard.png");

  // Step 5: Test Flashcard Flip & Audio
  console.log("\n--- BƯỚC 5: KIỂM THỬ LẬT THẺ FLASHCARD & ÂM THANH PHÁT ÂM ---");
  const flipResult = await cdp.eval(`(() => {
    // Click flashcard to flip
    const cardEl = document.querySelector('.perspective-1000, .cursor-pointer[style*=\"rotate\"], div[class*=\"transform\"]') || 
                   document.querySelector('main div.cursor-pointer');
    if (cardEl) {
      cardEl.click();
      return { clickedCard: true };
    }
    return { clickedCard: false };
  })()`);
  console.log("5.1. Tương tác lật thẻ:", flipResult);
  await new Promise((r) => setTimeout(r, 800));
  await cdp.screenshot("vocab_audit_5_flashcard_flipped.png");

  // Step 6: Test Tab 'Danh Sách Từ'
  console.log("\n--- BƯỚC 6: KIỂM THỬ TAB 'DANH SÁCH TỪ' ---");
  await cdp.eval(`(() => {
    const listTab = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Danh Sách Từ'));
    if (listTab) listTab.click();
  })()`);
  await new Promise((r) => setTimeout(r, 1200));

  const listTabInfo = await cdp.eval(`(() => {
    const wordRows = Array.from(document.querySelectorAll('div[class*=\"border-slate\"], tr')).map(row => {
      const word = row.querySelector('.font-bold, .font-display')?.innerText || '';
      const mean = row.querySelector('p, .text-slate-500, .text-slate-600')?.innerText || '';
      return { word, mean };
    }).filter(r => r.word && r.word.length > 1 && !r.word.includes('XP'));
    return { count: wordRows.length, sample: wordRows.slice(0, 5) };
  })()`);
  console.log("6.1. Dữ liệu Tab Danh Sách Từ:", JSON.stringify(listTabInfo, null, 2));
  await cdp.screenshot("vocab_audit_6_tab_word_list.png");

  // Step 7: Test Tab 'Đấu Trường Quiz'
  console.log("\n--- BƯỚC 7: KIỂM THỬ TAB 'ĐẤU TRƯỜNG QUIZ' ---");
  await cdp.eval(`(() => {
    const quizTab = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Đấu Trường Quiz'));
    if (quizTab) quizTab.click();
  })()`);
  await new Promise((r) => setTimeout(r, 1200));

  const quizTabInfo = await cdp.eval(`(() => {
    const question = document.querySelector('h2, h3, h4')?.innerText || '';
    const options = Array.from(document.querySelectorAll('button')).filter(b => 
      b.className.includes('border') && (b.innerText.length > 2) && !b.innerText.includes('Trang chủ')
    ).map(b => b.innerText.trim()).slice(0, 4);
    return { question, options };
  })()`);
  console.log("7.1. Dữ liệu Tab Đấu Trường Quiz:", JSON.stringify(quizTabInfo, null, 2));
  await cdp.screenshot("vocab_audit_7_tab_quiz.png");

  // Step 8: Database & API Backend Verification
  console.log("\n--- BƯỚC 8: KIỂM THỬ BACKEND API & DATABASE ---");
  const apiRes1 = await fetch("http://localhost:3000/api/vocabulary?themeId=t_basic_greetings");
  const apiData1 = await apiRes1.json();
  console.log("8.1. GET /api/vocabulary?themeId=t_basic_greetings -> HTTP", apiRes1.status);
  console.log("     Success:", apiData1.success, "| Total words:", apiData1.total, "| Source:", apiData1.source);
  console.log("     Sample word:", apiData1.data?.[0]?.word, "| IPA:", apiData1.data?.[0]?.phonetic, "| Nghĩa:", apiData1.data?.[0]?.definitionVn);

  const apiRes2 = await fetch("http://localhost:3000/api/vocabulary?level=advanced&limit=5");
  const apiData2 = await apiRes2.json();
  console.log("8.2. GET /api/vocabulary?level=advanced&limit=5 -> HTTP", apiRes2.status);
  console.log("     Success:", apiData2.success, "| Total words:", apiData2.total, "| Source:", apiData2.source);

  // Check console errors
  console.log("\n--- BƯỚC 9: KIỂM TRA CONSOLE LOGS & RUNTIME EXCEPTION ---");
  const errors = cdp.consoleLogs.filter(l => l.type === 'error');
  if (errors.length === 0) {
    console.log("✅ Không phát hiện bất kỳ lỗi Console Error nào trên Chrome!");
  } else {
    console.warn(`⚠️ Phát hiện ${errors.length} console error:`, errors);
  }

  cdp.close();
  console.log("\n===============================================================================");
  console.log("🎉 HOÀN THÀNH 100% KIỂM THỬ TRANG /vocabulary TRÊN CHROME!");
  console.log("===============================================================================");
}

runAudit().catch((err) => {
  console.error("FATAL ERROR IN AUDIT:", err);
  process.exit(1);
});
