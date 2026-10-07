const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/study/dictation?id=0678a126-f94d-4930-81ce-ebe1e6731e7e', { waitUntil: 'networkidle2' });
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log('Body text (first 500 chars):');
  console.log(text.slice(0, 500));
  
  const url = page.url();
  console.log('Current URL:', url);

  await browser.close();
})();
