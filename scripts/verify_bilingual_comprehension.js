const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('PAGE CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  const targetUrl = 'http://localhost:3000/study/dictation/video/comprehension/vid_julian_treasure_speak';
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('Waiting for question card to mount...');
  await page.waitForFunction(() => {
    const h3 = document.querySelector('h3');
    return h3 && h3.innerText.length > 5;
  }, { timeout: 30000 });

  console.log('Question card mounted successfully!');

  // 1. Screenshot in English mode
  const enPath = path.join(__dirname, '..', 'public', 'comprehension_english_mode.png');
  await page.screenshot({ path: enPath });
  console.log(`Saved English mode screenshot: ${enPath}`);

  // Extract Question text in English
  const qTextEn = await page.evaluate(() => {
    return document.querySelector('h3')?.innerText;
  });
  const optsEn = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button'))
      .filter(b => b.innerText.startsWith('A\n') || b.innerText.startsWith('A ') || b.innerText.startsWith('A'))
      .map(b => b.innerText.slice(0, 80));
  });
  console.log('English Question:', qTextEn);
  console.log('English Options sample:', optsEn[0]);

  // 2. Click VI button (Language toggle)
  console.log('Toggling to Vietnamese mode...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const viBtn = buttons.find(b => b.innerText.includes('Tiếng Việt') || b.innerText.trim() === 'VI');
    if (viBtn) {
      viBtn.click();
      console.log('Clicked VI button!');
    }
  });
  await new Promise(r => setTimeout(r, 1200));

  const viPath = path.join(__dirname, '..', 'public', 'comprehension_vietnamese_mode.png');
  await page.screenshot({ path: viPath });
  console.log(`Saved Vietnamese mode screenshot: ${viPath}`);

  // Extract Question text in Vietnamese
  const qTextVi = await page.evaluate(() => {
    return document.querySelector('h3')?.innerText;
  });
  const optsVi = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button'))
      .filter(b => b.innerText.startsWith('A\n') || b.innerText.startsWith('A ') || b.innerText.startsWith('A'))
      .map(b => b.innerText.slice(0, 80));
  });
  console.log('Vietnamese Question:', qTextVi);
  console.log('Vietnamese Options sample:', optsVi[0]);

  // 3. Select Option 0 and submit answer
  console.log('Selecting option 0 and checking answer...');
  await page.evaluate(() => {
    const options = Array.from(document.querySelectorAll('button')).filter(b => {
      return b.innerText.startsWith('A') || b.innerText.startsWith('B') || b.innerText.startsWith('C') || b.innerText.startsWith('D');
    });
    if (options[0]) options[0].click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Click Check Answer button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const checkBtn = buttons.find(b => b.innerText.includes('Kiểm tra') || b.innerText.includes('Check'));
    if (checkBtn) checkBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const viExpPath = path.join(__dirname, '..', 'public', 'comprehension_explanation_vi.png');
  await page.screenshot({ path: viExpPath });
  console.log(`Saved Vietnamese explanation screenshot: ${viExpPath}`);

  // 4. Toggle back to English to verify dynamic explanation translation
  console.log('Toggling back to English to verify bilingual explanation...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const enBtn = buttons.find(b => b.innerText.includes('EN') || b.innerText.includes('English'));
    if (enBtn) enBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const enExpPath = path.join(__dirname, '..', 'public', 'comprehension_explanation_en.png');
  await page.screenshot({ path: enExpPath });
  console.log(`Saved English explanation screenshot: ${enExpPath}`);

  const expTextEn = await page.evaluate(() => {
    return document.querySelector('.border-emerald-300, .border-emerald-800\\/60')?.innerText;
  });
  console.log('English Explanation block text:', expTextEn);

  await browser.close();
  console.log('Verification finished successfully!');
})();
