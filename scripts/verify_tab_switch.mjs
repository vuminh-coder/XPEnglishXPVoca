import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/myvideo";

async function verifyTabSwitch() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2000));

  // Press key '3' or click the 3rd button
  console.log("Pressing key '3'...");
  await page.keyboard.press("3");
  await new Promise((r) => setTimeout(r, 1500));

  let shot = path.join(ARTIFACTS_DIR, "tab_switch_key3.png");
  await page.screenshot({ path: shot });
  console.log("Screenshot after key 3:", shot);

  // Also try clicking the exact 3rd button in the grid
  console.log("Clicking grid button 3...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 3) {
      btns[2].click();
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  shot = path.join(ARTIFACTS_DIR, "tab_switch_click3.png");
  await page.screenshot({ path: shot });
  console.log("Screenshot after click button 3:", shot);

  await browser.close();
}

verifyTabSwitch().catch(console.error);
