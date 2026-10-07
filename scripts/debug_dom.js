const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/study/dictation?id=0678a126-f94d-4930-81ce-ebe1e6731e7e', { waitUntil: 'networkidle2' });
  
  const count = await page.$$eval('[data-sentence-index]', els => els.length);
  console.log('data-sentence-index count:', count);

  const texts = await page.$$eval('[data-sentence-index]', els => {
    return els.map(el => el.innerText.slice(0, 50));
  });
  console.log('Sample texts:', texts.slice(0, 5));
  console.log('Total items:', texts.length);

  await browser.close();
})();
