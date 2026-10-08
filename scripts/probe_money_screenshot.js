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

    console.log('Navigating to Psychology of Money...');
    await page.goto('http://localhost:3000/study/dictation/video?id=vid_psychology_of_money', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    for (let i = 0; i < 20; i++) {
      const text = await page.evaluate(() => document.body.innerText);
      const isSkeleton = await page.evaluate(() => !!document.querySelector('.animate-pulse'));
      console.log(`[T+${i}s] textLen=${text.length}, isSkeleton=${isSkeleton}, preview="${text.slice(0, 60).replace(/\n/g, ' ')}"`);
      if (text.includes('0/9') || text.includes('Điền câu đã nghe')) {
        console.log('Dictation UI is READY!');
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: 'public/dictation_money_100_verbatim.png', fullPage: true });
        console.log('Captured public/dictation_money_100_verbatim.png successfully!');
        break;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
