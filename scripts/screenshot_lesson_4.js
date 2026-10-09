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

    console.log('Navigating to Lesson 4 (BBC Sunken Ship) dictation page...');
    await page.goto('http://localhost:3000/study/dictation/video?id=e4476093-9f0c-4620-a7f3-345d0e6b64db', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    console.log('Waiting for dictation interface to hydrate...');
    await page.waitForFunction(
      () => {
        const text = document.body.innerText;
        return (
          (text.includes('BBC Learning English') || text.includes('Sunken Ship') || text.includes('San Jose')) &&
          (text.includes('Điền câu đã nghe') || text.includes('0/13')) &&
          !document.querySelector('.animate-pulse')
        );
      },
      { timeout: 45000, polling: 500 }
    );

    // Wait for any transient toasts to disappear or dismiss them
    await page.evaluate(() => {
      const toasts = document.querySelectorAll('[role="alert"], [role="status"]');
      toasts.forEach(t => { if (t && t.style) t.style.display = 'none'; });
    });

    await new Promise(r => setTimeout(r, 2000));

    await page.screenshot({
      path: 'public/dictation_lesson_4_deep_audit.png',
      fullPage: true
    });
    console.log('Successfully saved public/dictation_lesson_4_deep_audit.png!');
  } catch (err) {
    console.error('Screenshot error:', err);
    if (browser) {
      const pages = await browser.pages();
      if (pages.length > 0) {
        await pages[0].screenshot({ path: 'public/dictation_lesson_4_deep_audit.png', fullPage: true });
        console.log('Saved fallback screenshot on timeout');
      }
    }
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
