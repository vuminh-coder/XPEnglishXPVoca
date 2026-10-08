const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to Matt Walker dictation page...');
    await page.goto('http://localhost:3000/study/dictation/video?id=vid_matt_walker_sleep', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('Waiting 6s for render and API reconciliation...');
    await new Promise(r => setTimeout(r, 6000));
    await page.screenshot({ path: 'public/dictation_matt_walker_100_verbatim.png', fullPage: true });
    console.log('Saved public/dictation_matt_walker_100_verbatim.png successfully!');
    await browser.close();
  } catch (err) {
    console.error('Screenshot error:', err);
    process.exit(1);
  }
})();
