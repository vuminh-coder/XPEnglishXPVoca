import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/study/exam-prep";

async function runExamPrepWalkthrough() {
  console.log("================================================================================");
  console.log("📝 STARTING FULL CHROMIUM WALKTHROUGH FOR /study/exam-prep");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  console.log("1. Navigating to /study/exam-prep...");
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("body");
  console.log("  Waiting for Exam Hub to hydrate...");
  await new Promise((r) => setTimeout(r, 4000));

  const shot1 = path.join(ARTIFACTS_DIR, "exam_01_hub_library.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 (Exam Hub Library): ${shot1}`);

  // --- STAGE 2: CLICK AN EXAM PAPER TO ENTER WORKSPACE ---
  console.log("2. Clicking first Exam Paper to enter Exam Workspace...");
  await page.evaluate(() => {
    const startBtns = Array.from(document.querySelectorAll("button")).filter((b) =>
      b.textContent.trim().startsWith("Bắt đầu")
    );
    if (startBtns.length > 0) {
      startBtns[0].click();
    }
  });
  console.log("  Waiting for Exam Workspace to mount...");
  await new Promise((r) => setTimeout(r, 3500));

  const shot2 = path.join(ARTIFACTS_DIR, "exam_02_workspace_question.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 (Exam Workspace Question): ${shot2}`);

  // --- STAGE 3: SELECT AN ANSWER & TRIGGER SUBMIT MODAL ---
  console.log("3. Selecting an answer choice for question 1...");
  await page.evaluate(() => {
    const radioOrOption = Array.from(document.querySelectorAll("button, label, input[type='radio']")).find((el) =>
      el.textContent.includes("A.") || el.textContent.includes("B.") || el.className.includes("option")
    );
    if (radioOrOption) radioOrOption.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  console.log("4. Clicking 'Nộp bài' to open Submit Confirm Modal...");
  await page.evaluate(() => {
    const submitBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Nộp bài") || b.textContent.includes("Hoàn tất")
    );
    if (submitBtn) submitBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot3 = path.join(ARTIFACTS_DIR, "exam_03_submit_modal.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 (Submit Modal): ${shot3}`);

  await browser.close();
}

runExamPrepWalkthrough().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
