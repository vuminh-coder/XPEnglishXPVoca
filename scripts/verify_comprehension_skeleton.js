const puppeteer = require('puppeteer-core');
const path = require('path');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  console.log('Launching browser to test Video Comprehension Skeleton...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('PAGE CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  // Navigate to non-existent or fresh id to inspect skeleton, or evaluate skeleton component
  const targetUrl = 'http://localhost:3000/study/dictation/video/comprehension/vid_julian_treasure_speak';
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

  await page.waitForFunction(() => {
    return document.querySelector('h3') !== null || document.querySelector('[class*="VideoComprehension"]') !== null;
  }, { timeout: 20000 });

  const shotPath = path.join(__dirname, '..', 'public', 'comprehension_view_loaded.png');
  await page.screenshot({ path: shotPath });
  console.log(`Saved screenshot: ${shotPath}`);

  await browser.close();
  console.log('Skeleton & View test completed successfully!');
})();
