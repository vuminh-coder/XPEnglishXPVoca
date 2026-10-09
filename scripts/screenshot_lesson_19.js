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

    console.log('Navigating to Julian Treasure dictation page...');
    await page.goto('http://localhost:3000/study/dictation/video?id=vid_julian_treasure_speak', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log('Waiting for dictation interface to fully hydrate...');
    await page.waitForFunction(
      () => {
        const text = document.body.innerText;
        return (
          (text.includes('Julian Treasure') || text.includes('human voice') || text.includes('How to Speak')) &&
          (text.includes('Điền câu đã nghe') || text.includes('0/10')) &&
          !document.querySelector('.animate-pulse')
        );
      },
      { timeout: 45000, polling: 500 }
    );

    await new Promise(r => setTimeout(r, 2500));

    // Remove any transient toast notification element if present so screenshot is pristine
    await page.evaluate(() => {
      const toasts = document.querySelectorAll('[role="status"], [role="alert"], [class*="toast"], [class*="Toast"]');
      toasts.forEach(t => t.remove());
    });

    await page.screenshot({
      path: 'public/dictation_lesson_19_deep_audit.png',
      fullPage: true
    });
    console.log('Successfully saved public/dictation_lesson_19_deep_audit.png!');
  } catch (err) {
    console.error('Screenshot error:', err);
    if (browser) {
      const pages = await browser.pages();
      if (pages.length > 0) {
        await pages[0].screenshot({ path: 'public/dictation_lesson_19_deep_audit.png', fullPage: true });
        console.log('Saved fallback screenshot on timeout');
      }
    }
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
