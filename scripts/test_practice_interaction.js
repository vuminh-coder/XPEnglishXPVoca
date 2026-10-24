const path = require('path');
const puppeteer = require(path.join(process.cwd(), 'node_modules', 'puppeteer-core'));

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetFeedback = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\practice_feedback_desktop.png';
const targetDrawer = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\practice_drawer_desktop.png';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/study/practice', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Click Option B (xin chào)
  console.log('Selecting option B via evaluate...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.innerText.includes('xin chào') || b.innerText.includes('B'));
    if (target) target.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: targetFeedback });
  console.log('Saved feedback screenshot!');

  // 2. Open Word Lab Drawer
  console.log('Opening Word Lab Drawer via evaluate...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.innerText.includes('Sổ tay') || b.innerText.includes('Xem ví dụ') || b.title?.includes('sổ tay'));
    if (target) target.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: targetDrawer });
  console.log('Saved drawer screenshot!');

  await browser.close();
  console.log('Interaction test completed!');
}

main().catch(err => {
  console.error('Error during interaction test:', err);
  process.exit(1);
});
