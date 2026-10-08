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

    page.on('console', msg => console.log('[BROWSER LOG]', msg.text()));
    page.on('pageerror', err => console.log('[BROWSER ERR]', err.message));

    console.log('Navigating to dictation page...');
    await page.goto('http://localhost:3000/study/dictation/video?id=vid_bbc_why_we_laugh', { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('Waiting 5s...');
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: 'public/dictation_bbc_laugh_100_verbatim.png', fullPage: true });
    console.log('Saved public/dictation_bbc_laugh_100_verbatim.png successfully!');
    await browser.close();
  } catch (err) {
    console.error('Screenshot error:', err);
    process.exit(1);
  }
})();
