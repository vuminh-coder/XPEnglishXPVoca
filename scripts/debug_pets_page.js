const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/study/dictation?id=575d216f-b275-468e-8a41-c3b26c0ac1ea', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));
  
  await page.screenshot({ path: 'public/dictation_pets_debug.png', fullPage: true });
  console.log('Saved public/dictation_pets_debug.png');
  
  const text = await page.evaluate(() => document.body.innerText.slice(0, 300));
  console.log('Body text:', text);
  
  const items = await page.$$eval('[data-sentence-index]', els => els.length);
  console.log('data-sentence-index count:', items);

  await browser.close();
})();
