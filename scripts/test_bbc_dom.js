const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('response', res => {
    if (res.url().includes('/api/listening/lessons/')) {
      console.log('API RESPONSE:', res.status(), res.url());
    }
  });

  console.log('Navigating to BBC Dictation page...');
  await page.goto('http://localhost:3000/study/dictation?id=e4476093-9f0c-4620-a7f3-345d0e6b64db', { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'public/dictation_bbc_debug.png', fullPage: true });
  console.log('Saved public/dictation_bbc_debug.png');

  const text = await page.evaluate(() => document.body.innerText.slice(0, 400));
  console.log('Body text:\n', text);

  const items = await page.$$eval('[data-sentence-index]', els => els.length);
  console.log('data-sentence-index count:', items);

  await browser.close();
})();
