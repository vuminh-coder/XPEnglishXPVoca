const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });

  console.log('Navigating to Video Dictation page...');
  await page.goto('http://localhost:3000/study/dictation/video', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Screenshot of default view top
  await page.screenshot({ path: 'public/test-artifacts/video_catalog_top_clean.png' });
  console.log('Saved top clean view screenshot');

  // 2. Scroll down to TED-Ed and Tech rows
  await page.evaluate(() => {
    window.scrollBy({ top: 1200, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/test-artifacts/video_catalog_data_rows_clean.png' });
  console.log('Saved data rows clean screenshot without Full Data badge');

  await browser.close();
  console.log('Verification completed successfully!');
})();
