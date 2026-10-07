const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false, // Open visible browser so we can verify if needed, or headless
    args: ['--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/study/dictation?id=575d216f-b275-468e-8a41-c3b26c0ac1ea', { waitUntil: 'networkidle2' });
  console.log('Opened dictation page for pets video');
  await new Promise(r => setTimeout(r, 3000));
  await browser.close();
})();
