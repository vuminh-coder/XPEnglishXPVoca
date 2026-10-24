const path = require('path');
const puppeteer = require(path.join(process.cwd(), 'node_modules', 'puppeteer-core'));

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetFront = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\flashcard_front_desktop.png';
const targetBack = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\flashcard_back_desktop.png';
const targetMobile = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\flashcard_front_mobile.png';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/study/practice?mode=flashcard', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Front desktop
  await page.screenshot({ path: targetFront });
  console.log('Saved flashcard front desktop screenshot');

  // Flip card
  await page.evaluate(() => {
    const card = document.querySelector('[class*="perspective"] > div');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: targetBack });
  console.log('Saved flashcard back desktop screenshot');

  // Mobile Front
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:3000/study/practice?mode=flashcard', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await mobilePage.screenshot({ path: targetMobile });
  console.log('Saved flashcard mobile screenshot');

  // Mobile Back
  const targetMobileBack = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\flashcard_back_mobile.png';
  await mobilePage.evaluate(() => {
    const card = document.querySelector('[class*="perspective"] > div');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await mobilePage.screenshot({ path: targetMobileBack });
  console.log('Saved flashcard mobile back screenshot');

  await browser.close();
  console.log('All flashcard screenshots captured!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
