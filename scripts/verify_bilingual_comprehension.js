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

  const targetUrl = 'http://localhost:3000/study/dictation/video/vid_julian_treasure_speak/comprehension';
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for the question prompt to appear
  await page.waitForSelector('h3', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Screenshot in English mode
  const enPath = path.join(__dirname, '..', 'public', 'comprehension_english_mode.png');
  await page.screenshot({ path: enPath });
  console.log(`Saved English mode screenshot: ${enPath}`);

  // Extract Question text in English
  const qTextEn = await page.evaluate(() => {
    return document.querySelector('h3')?.innerText;
  });
  console.log('English Question:', qTextEn);

  // 2. Click VI button (Language toggle)
  console.log('Toggling to Vietnamese mode...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const viBtn = buttons.find(b => b.innerText.includes('VI') || b.innerText.includes('Tiếng Việt'));
    if (viBtn) viBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const viPath = path.join(__dirname, '..', 'public', 'comprehension_vietnamese_mode.png');
  await page.screenshot({ path: viPath });
  console.log(`Saved Vietnamese mode screenshot: ${viPath}`);

  // Extract Question text in Vietnamese
  const qTextVi = await page.evaluate(() => {
    return document.querySelector('h3')?.innerText;
  });
  console.log('Vietnamese Question:', qTextVi);

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
