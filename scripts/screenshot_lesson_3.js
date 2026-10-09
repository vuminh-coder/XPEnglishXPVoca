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

    console.log('Navigating to Lesson 3 (Daily Pets) dictation page...');
    await page.goto('http://localhost:3000/study/dictation/video?id=575d216f-b275-468e-8a41-c3b26c0ac1ea', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log('Waiting for dictation interface to hydrate...');
    await page.waitForFunction(
      () => {
        const text = document.body.innerText;
        return (
          (text.includes('Daily English') || text.includes('Pets') || text.includes('Buster')) &&
          (text.includes('Điền câu đã nghe') || text.includes('0/11')) &&
          !document.querySelector('.animate-pulse')
        );
      },
      { timeout: 45000, polling: 500 }
    );

    await new Promise(r => setTimeout(r, 1500));

    await page.screenshot({
      path: 'public/dictation_lesson_3_deep_audit.png',
      fullPage: true
    });
    console.log('Successfully saved public/dictation_lesson_3_deep_audit.png!');
  } catch (err) {
    console.error('Screenshot error:', err);
    if (browser) {
      const pages = await browser.pages();
      if (pages.length > 0) {
        await pages[0].screenshot({ path: 'public/dictation_lesson_3_deep_audit.png', fullPage: true });
        console.log('Saved fallback screenshot on timeout');
      }
    }
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
