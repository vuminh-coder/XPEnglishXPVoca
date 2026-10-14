const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'e1Mno2A2N5E';
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

  // Expand description
  const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
  if (expandBtn) await expandBtn.click();
  await new Promise(r => setTimeout(r, 1500));

  // Click Show transcript
  const buttons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('chép lời')) {
      console.log('Clicking transcript button:', text.trim());
      await btn.click();
      await new Promise(r => setTimeout(r, 3000));
      break;
    }
  }

  // Inspect transcript elements
  const info = await page.evaluate(() => {
    const models = document.querySelectorAll('transcript-segment-view-model');
    const legacy = document.querySelectorAll('ytd-transcript-segment-renderer');
    const panel = document.querySelector('ytd-transcript-renderer, #segments-container, ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]');
    
    return {
      modelCount: models.length,
      legacyCount: legacy.length,
      panelFound: !!panel,
      panelTag: panel ? panel.tagName : null,
      panelClasses: panel ? panel.className : null,
      containerHtmlSnippet: panel ? panel.innerHTML.substring(0, 500) : null
    };
  });

  console.log('Transcript Info:', info);
  await browser.close();
})();
