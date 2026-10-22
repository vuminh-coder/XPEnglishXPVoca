const path = require('path');
const puppeteer = require(path.join(process.cwd(), 'node_modules', 'puppeteer-core'));

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetDesktop = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_ziczac_desktop.png';
const targetMobile = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_ziczac_mobile.png';
const targetGuidebook = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_guidebook_modal.png';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Desktop
  console.log('Capturing desktop screenshot...');
  await page.setViewport({ width: 1440, height: 1050 });
  await page.goto('http://localhost:3000/roadmap', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: targetDesktop });

  // Guidebook Modal on Desktop
  console.log('Capturing Guidebook modal screenshot...');
  // Click first button that contains HƯỚNG DẪN
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('HƯỚNG DẪN'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: targetGuidebook });

  // Close guidebook modal
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('ĐÃ HIỂU'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Mobile
  console.log('Capturing mobile screenshot...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/roadmap', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: targetMobile });

  await browser.close();
  console.log('Finished capturing screenshots!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
