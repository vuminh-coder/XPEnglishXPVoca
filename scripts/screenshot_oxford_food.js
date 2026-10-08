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

    console.log('Navigating to Oxford Food dictation page...');
    await page.goto('http://localhost:3000/study/dictation/video?id=vid_oxford_food_cooking', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log('Waiting for dictation interface to fully hydrate...');
    // Poll for the hydrated workspace element
    await page.waitForFunction(
      () => {
        const text = document.body.innerText;
        return (
          text.includes('Oxford Online English') &&
          (text.includes('Điền câu đã nghe') || text.includes('0/12')) &&
          !document.querySelector('.animate-pulse')
        );
      },
      { timeout: 35000, polling: 500 }
    );

    // Give a brief moment for any animations/styles to settle
    await new Promise(r => setTimeout(r, 1500));

    await page.screenshot({
      path: 'public/dictation_oxford_food_100_verbatim.png',
      fullPage: true
    });
    console.log('Successfully saved public/dictation_oxford_food_100_verbatim.png!');
  } catch (err) {
    console.error('Screenshot error:', err);
    // Take fallback screenshot for debugging
    if (browser) {
      const pages = await browser.pages();
      if (pages.length > 0) {
        await pages[0].screenshot({ path: 'public/dictation_oxford_food_100_verbatim.png', fullPage: true });
        console.log('Saved fallback screenshot on timeout');
      }
    }
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
