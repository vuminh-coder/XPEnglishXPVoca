const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('BROWSER UNCAUGHT ERROR:', err.message));

    console.log('Navigating to Psychology of Money...');
    const res = await page.goto('http://localhost:3000/study/dictation/video?id=vid_psychology_of_money', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    console.log('Response status:', res ? res.status() : 'null');

    await new Promise(r => setTimeout(r, 4000));

    const title = await page.title();
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('Page Title:', title);
    console.log('Body text length:', bodyText.length);
    console.log('Body text sample:', bodyText.slice(0, 300));

    await page.screenshot({ path: 'public/dictation_money_100_verbatim.png', fullPage: true });
    console.log('Captured screenshot!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
