import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/ai/conversation";

async function runAiConversationWalkthrough() {
  console.log("================================================================================");
  console.log("🤖 STARTING FULL CHROMIUM WALKTHROUGH FOR /ai/conversation");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  // Listen to network requests to verify /api/ai/chat and /api/ai/sessions
  const apiCalls = [];
  page.on("request", (req) => {
    const url = req.url();
    if (url.includes("/api/ai/")) {
      apiCalls.push({ url, method: req.method() });
    }
  });

  console.log("1. Navigating to /ai/conversation...");
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("body");
  await new Promise((r) => setTimeout(r, 4000));

  // --- STAGE 1: SWITCH PERSONA & DIFFICULTY ---
  console.log("2. Inspecting and switching AI Persona to 'David (Gia sư kiên nhẫn)'...");
  await page.evaluate(() => {
    // Look for persona button (Alex, Eleanor, David, Victor)
    const personaBtns = Array.from(document.querySelectorAll("button")).filter(b => 
      b.textContent.includes("David") || b.textContent.includes("Gia sư") || b.textContent.includes("Eleanor")
    );
    if (personaBtns.length > 0) {
      personaBtns[0].click();
    }
  });
  await new Promise((r) => setTimeout(r, 1000));

  console.log("3. Switching Difficulty to 'Intermediate (B1-B2)'...");
  await page.evaluate(() => {
    const diffBtns = Array.from(document.querySelectorAll("button")).filter(b => 
      b.textContent.includes("B1-B2") || b.textContent.includes("Trung cấp") || b.textContent.includes("Intermediate")
    );
    if (diffBtns.length > 0) {
      diffBtns[0].click();
    }
  });
  await new Promise((r) => setTimeout(r, 1000));

  const shot1 = path.join(ARTIFACTS_DIR, "ai_01_topbar_personas.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 (Personas & Difficulty): ${shot1}`);

  // --- STAGE 2: INSERT SUGGESTED WORD & SEND USER MESSAGE ---
  console.log("\n4. Clicking suggested word to append into input...");
  await page.evaluate(() => {
    // Click first suggestion pill
    const suggestionPills = Array.from(document.querySelectorAll("button")).filter(b =>
      b.className.includes("border-indigo") || b.className.includes("border-sky") || b.textContent.includes("cappuccino") || b.textContent.includes("order") || b.textContent.includes("coffee")
    );
    if (suggestionPills.length > 0) {
      suggestionPills[0].click();
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  console.log("5. Typing user message: 'I am go to the cafe and I love cappuccino.'...");
  const textarea = await page.$("textarea, input[type='text']");
  if (textarea) {
    await textarea.type(" I am go to the cafe and I love cappuccino.");
  }
  await new Promise((r) => setTimeout(r, 800));

  console.log("6. Clicking Send message button...");
  await page.evaluate(() => {
    const sendBtn = Array.from(document.querySelectorAll("button")).find(b => 
      b.textContent.includes("Gửi") || b.title?.includes("Gửi") || b.querySelector("svg.lucide-send")
    );
    if (sendBtn) sendBtn.click();
  });

  console.log("7. Waiting 10s for Gemini AI response and grammar coach...");
  await new Promise((r) => setTimeout(r, 10000));

  const shot2 = path.join(ARTIFACTS_DIR, "ai_02_chat_interactive.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 (Interactive Chat & Coach): ${shot2}`);

  // --- STAGE 3: FINISH SESSION & VIEW SCORECARD ---
  console.log("\n8. Clicking 'Chấm điểm' button to finalize conversation session...");
  await page.evaluate(() => {
    const finishBtn = Array.from(document.querySelectorAll("button")).find(b => 
      b.textContent.includes("Chấm điểm") || b.textContent.includes("Kết thúc")
    );
    if (finishBtn) finishBtn.click();
  });
  await new Promise((r) => setTimeout(r, 2500));

  const shot3 = path.join(ARTIFACTS_DIR, "ai_03_scorecard_overview.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 (AI ScoreCard Overview): ${shot3}`);

  // --- STAGE 4: SWITCH SCORECARD TAB TO DIALOGUE TAB ---
  console.log("\n9. Switching ScoreCard tab to 'Toàn Văn Đối Thoại'...");
  await page.evaluate(() => {
    const dialogueTab = Array.from(document.querySelectorAll("button")).find(b => 
      b.textContent.includes("Toàn Văn Đối Thoại") || b.textContent.includes("Đối Thoại")
    );
    if (dialogueTab) dialogueTab.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shot4 = path.join(ARTIFACTS_DIR, "ai_04_scorecard_dialogue_tab.png");
  await page.screenshot({ path: shot4 });
  console.log(`  📸 Screenshot 4 (ScoreCard Dialogue Tab): ${shot4}`);

  // --- STAGE 5: OPEN SHARE MODAL ---
  console.log("\n10. Clicking 'Chia Sẻ Thẻ Điểm' to open Share Modal...");
  await page.evaluate(() => {
    const shareBtn = Array.from(document.querySelectorAll("button")).find(b => 
      b.textContent.includes("Chia Sẻ") || b.textContent.includes("Chia sẻ")
    );
    if (shareBtn) shareBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot5 = path.join(ARTIFACTS_DIR, "ai_05_share_modal.png");
  await page.screenshot({ path: shot5 });
  console.log(`  📸 Screenshot 5 (Share Modal): ${shot5}`);

  // Inspect storage and state
  const storageSummary = await page.evaluate(() => {
    return {
      localStorageKeys: Object.keys(localStorage).filter(k => k.includes("ai") || k.includes("xp") || k.includes("voca")),
      hasActiveSession: !!localStorage.getItem("xp_voca_active_ai_conv_session"),
      hasSavedScore: !!document.querySelector("div[class*='ScoreCard'], div[class*='score']"),
    };
  });

  console.log("\n================================================================================");
  console.log("📊 SUMMARY OF /ai/conversation TEST RESULTS:");
  console.log(`- API Calls Tracked: ${JSON.stringify(apiCalls)}`);
  console.log(`- Storage & DOM State: ${JSON.stringify(storageSummary)}`);
  console.log("================================================================================");

  await browser.close();
}

runAiConversationWalkthrough().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
