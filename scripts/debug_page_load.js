const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/study/dictation/video?id=vid_oxford_food_cooking', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 4000));
  
  const info = await page.evaluate(() => {
    return {
      title: document.title,
      pulseCount: document.querySelectorAll('.animate-pulse').length,
      allText: document.body.innerText,
      elements: Array.from(document.querySelectorAll('h1, h2, h3, button, span, p'))
        .map(el => el.innerText ? el.innerText.trim() : '')
        .filter(t => t.length > 0 && t.length < 80)
        .slice(0, 30)
    };
  });
  console.log('INFO:', JSON.stringify(info, null, 2));
  await page.screenshot({ path: 'public/dictation_oxford_food_100_verbatim.png', fullPage: true });
  await browser.close();
})();
