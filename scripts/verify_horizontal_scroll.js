const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });

  await page.goto('http://localhost:3000/study/dictation/video', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Take screenshot of default view with horizontal topic rows
  await page.screenshot({ path: 'public/test-artifacts/horizontal_topic_rows_initial.png' });

  // Find right scroll button in the first row and click it
  const nextButtons = await page.$$('button[aria-label="Cuộn sang phải"]');
  if (nextButtons.length > 0) {
    console.log(`Found ${nextButtons.length} scroll next buttons. Clicking first one...`);
    await nextButtons[0].click();
    await new Promise(r => setTimeout(r, 1200));
  }

  // Take screenshot after first horizontal scrolling
  await page.screenshot({ path: 'public/test-artifacts/horizontal_topic_rows_scrolled.png' });

  // Click second time to see cards 9-12
  if (nextButtons.length > 0) {
    await nextButtons[0].click();
    await new Promise(r => setTimeout(r, 1200));
  }
  await page.screenshot({ path: 'public/test-artifacts/horizontal_topic_rows_end.png' });

  await browser.close();
  console.log('Horizontal scroll test completed successfully!');
})();
