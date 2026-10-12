const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  await page.goto('https://www.youtube.com/watch?v=uQ2rJKiiRiU', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.evaluate(() => window.scrollBy(0, 450));
  await new Promise(r => setTimeout(r, 1500));

  // Try to click expand
  const expandEl = await page.$('#expand');
  if (expandEl) {
    try {
      await expandEl.click();
      console.log('Clicked #expand');
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.log('Expand click err:', e.message);
    }
  }

  // Find buttons in the page that have transcript
  const transcriptButtons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  let clicked = false;
  for (const b of transcriptButtons) {
    const text = await page.evaluate(el => (el.innerText || '') + ' ' + (el.getAttribute('aria-label') || ''), b);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('bản chép lời') || text.toLowerCase().includes('chép lời')) {
      console.log('Found transcript button:', text.trim());
      await b.click();
      clicked = true;
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }

  // Take screenshot
  await page.screenshot({ path: 'scripts/tangled_debug_screenshot.png' });
  console.log('Saved screenshot to scripts/tangled_debug_screenshot.png');

  // Check segments
  const segments = await page.evaluate(() => {
    const models = document.querySelectorAll('transcript-segment-view-model, ytd-transcript-segment-renderer');
    return models.length;
  });
  console.log('Segments found:', segments);

  await browser.close();
})();
