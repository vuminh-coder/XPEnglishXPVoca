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
    console.log(`Saved screenshot: ${fullPath} (${buffer.length} bytes)`);
    return fullPath;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runAudit() {
  console.log("=== BẮT ĐẦU KIỂM THỬ TRANG /vocabulary TRÊN CHROME ===");

  // 1. Get targets from Chrome CDP
  const targetsRes = await fetch("http://127.0.0.1:9222/json");
  const targets = await targetsRes.json();
  const pageTarget = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));

  if (!pageTarget) {
    throw new Error("Không tìm thấy trang Chrome localhost:3000 đang mở");
  }

  console.log(`Connected to Chrome Target: ${pageTarget.title} (${pageTarget.id})`);
  const cdp = new ChromeCDP(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();

  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  // Step 1: Navigate to /vocabulary
  console.log("-> Bước 1: Điều hướng tới http://localhost:3000/vocabulary");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary" });
  await new Promise((r) => setTimeout(r, 2000));

  // Step 2: Inspect initial elements
  const initialData = await cdp.eval(`(() => {
    const title = document.querySelector("h1")?.innerText || "";
    const navTabs = Array.from(document.querySelectorAll("nav a, header button, header a")).map(el => el.innerText.trim()).filter(Boolean);
    const basicBtn = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("60 Cơ Bản"));
    const advBtn = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("155 Nâng Cao"));
    const searchInput = document.querySelector("input[type='text']")?.placeholder || "";
    const themeCards = Array.from(document.querySelectorAll("a[href^='/vocabulary/']")).map(card => {
      const h3 = card.querySelector("h3")?.innerText || "";
      const p = card.querySelector("p")?.innerText || "";
      const href = card.getAttribute("href") || "";
      return { h3, p, href };
    });
    return {
      title,
      navTabs,
      hasBasicBtn: Boolean(basicBtn),
      hasAdvBtn: Boolean(advBtn),
      searchInput,
      themeCardsCount: themeCards.length,
      firstThreeCards: themeCards.slice(0, 3),
    };
  })()`);

  console.log("Dữ liệu khởi tạo /vocabulary:", JSON.stringify(initialData, null, 2));
  await cdp.screenshot("vocabulary_step1_initial.png");

  // Step 3: Switch to "155 Nâng Cao"
  console.log("-> Bước 2: Kiểm tra chuyển đổi Level Mode sang '155 Nâng Cao'");
  await cdp.eval(`(() => {
    const advBtn = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("155 Nâng Cao"));
    if (advBtn) advBtn.click();
  })()`);
  await new Promise((r) => setTimeout(r, 1200));

  const advancedData = await cdp.eval(`(() => {
    const themeCards = Array.from(document.querySelectorAll("a[href^='/vocabulary/']")).map(card => {
      const h3 = card.querySelector("h3")?.innerText || "";
      const p = card.querySelector("p")?.innerText || "";
      const href = card.getAttribute("href") || "";
      return { h3, p, href };
    });
    const statsText = document.body.innerText;
    return {
      advancedCardsCount: themeCards.length,
      sampleAdvanced: themeCards.slice(0, 4),
    };
  })()`);
  console.log("Dữ liệu sau khi chuyển 155 Nâng Cao:", JSON.stringify(advancedData, null, 2));
  await cdp.screenshot("vocabulary_step2_advanced.png");

  // Step 4: Test Search functionality
  console.log("-> Bước 3: Kiểm tra chức năng Tìm kiếm Realtime (Gõ 'Gia đình')");
  // Click back to basic first
  await cdp.eval(`(() => {
    const basicBtn = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("60 Cơ Bản"));
    if (basicBtn) basicBtn.click();
  })()`);
  await new Promise((r) => setTimeout(r, 800));

  await cdp.eval(`(() => {
    const input = document.querySelector("input[type='text']");
    if (input) {
      input.focus();
      input.value = "Gia đình";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  })()`);
  await new Promise((r) => setTimeout(r, 1000));

  const searchData = await cdp.eval(`(() => {
    const matchedCards = Array.from(document.querySelectorAll("a[href^='/vocabulary/']")).map(card => ({
      h3: card.querySelector("h3")?.innerText || "",
      p: card.querySelector("p")?.innerText || "",
      href: card.getAttribute("href") || ""
    }));
    return { matchedCount: matchedCards.length, matchedCards };
  })()`);
  console.log("Kết quả tìm kiếm 'Gia đình':", JSON.stringify(searchData, null, 2));
  await cdp.screenshot("vocabulary_step3_search.png");

  // Clear search
  console.log("-> Bước 4: Xóa tìm kiếm và click vào chủ đề 'Chào hỏi & Làm quen' (greetings)");
  await cdp.eval(`(() => {
    const clearBtn = document.querySelector("button[type='button'] svg.lucide-x")?.parentElement;
    if (clearBtn) clearBtn.click();
    else {
      const input = document.querySelector("input[type='text']");
      if (input) {
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  })()`);
  await new Promise((r) => setTimeout(r, 800));

  // Step 5: Navigate to Theme Detail: greetings
  console.log("-> Bước 5: Điều hướng chi tiết chủ đề: http://localhost:3000/vocabulary/greetings");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary/greetings" });
  await new Promise((r) => setTimeout(r, 2000));

  const detailData = await cdp.eval(`(() => {
    const title = document.querySelector("h1, h2")?.innerText || "";
    const tabs = Array.from(document.querySelectorAll("button")).filter(b => 
      b.innerText.includes("Thẻ Flashcard") ||
      b.innerText.includes("Danh Sách Từ") ||
      b.innerText.includes("Đấu Trường Quiz") ||
      b.innerText.includes("Trợ Lý AI")
    ).map(b => b.innerText.trim());

    const activeCard = {
      word: document.querySelector(".font-display, [data-testid='flashcard-word'], h3")?.innerText || "",
      phonetic: document.querySelector(".font-mono")?.innerText || "",
      definition: document.querySelector("p.font-medium, p.text-slate-600")?.innerText || "",
    };

    return {
      title,
      tabs,
      activeCard,
      url: window.location.href,
    };
  })()`);
  console.log("Dữ liệu trang chi tiết chủ đề:", JSON.stringify(detailData, null, 2));
  await cdp.screenshot("vocabulary_step4_detail_flashcard.png");

  // Step 6: Test Flashcard Flip & Next
  console.log("-> Bước 6: Kiểm tra tương tác lật thẻ Flashcard 3D & chuyển thẻ");
  await cdp.eval(`(() => {
    // Click card container to flip
    const card = document.querySelector(".cursor-pointer[style*='transform'], .perspective-1000, [role='button']") || document.querySelector("main div.relative");
    if (card) card.click();
  })()`);
  await new Promise((r) => setTimeout(r, 600));
  await cdp.screenshot("vocabulary_step5_card_flipped.png");

  // Step 7: Test switch to "Danh Sách Từ" tab
  console.log("-> Bước 7: Kiểm tra Tab 'Danh Sách Từ'");
  await cdp.eval(`(() => {
    const listTab = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("Danh Sách Từ"));
    if (listTab) listTab.click();
  })()`);
  await new Promise((r) => setTimeout(r, 1000));

  const listData = await cdp.eval(`(() => {
    const items = Array.from(document.querySelectorAll("table tr, div[class*='border'] div[class*='font-bold']")).map(el => el.innerText.trim()).filter(Boolean);
    return {
      itemCountSample: items.slice(0, 5),
    };
  })()`);
  console.log("Dữ liệu Tab Danh Sách Từ:", JSON.stringify(listData, null, 2));
  await cdp.screenshot("vocabulary_step6_tab_list.png");

  // Step 8: Test switch to "Đấu Trường Quiz" tab
  console.log("-> Bước 8: Kiểm tra Tab 'Đấu Trường Quiz'");
  await cdp.eval(`(() => {
    const quizTab = Array.from(document.querySelectorAll("button")).find(b => b.innerText.includes("Đấu Trường Quiz") || b.innerText.includes("Quiz"));
    if (quizTab) quizTab.click();
  })()`);
  await new Promise((r) => setTimeout(r, 1200));

  const quizData = await cdp.eval(`(() => {
    const question = document.querySelector("h3, h4")?.innerText || "";
    const options = Array.from(document.querySelectorAll("button")).filter(b => b.querySelector("span") || b.innerText.length > 2).map(b => b.innerText.trim()).slice(0, 4);
    return { question, options };
  })()`);
  console.log("Dữ liệu Tab Quiz:", JSON.stringify(quizData, null, 2));
  await cdp.screenshot("vocabulary_step7_tab_quiz.png");

  // Step 9: Database & API verification
  console.log("-> Bước 9: Kiểm tra API Database Backend /api/vocabulary?themeId=greetings");
  const apiRes = await fetch("http://localhost:3000/api/vocabulary?themeId=greetings");
  const apiJson = await apiRes.json();
  console.log("API Status:", apiRes.status, "Success:", apiJson.success, "Total words:", apiJson.total, "Source:", apiJson.source);

  cdp.close();
  console.log("=== HOÀN TẤT KIỂM THỬ TRANG VOCABULARY TRÊN CHROME ===");
}

runAudit().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});
