const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const videoId = 'AS47hWRO0bw';
  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 1000));

  const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
  if (expandBtn) {
    await expandBtn.click();
    await new Promise(r => setTimeout(r, 1500));
  }

  const buttons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('bản chép lời') || text.toLowerCase().includes('chép lời')) {
      console.log('Clicking transcript button:', text.trim());
      await btn.click();
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }

  await page.screenshot({ path: 'scripts/summer_transcript_screen.png' });
  console.log('Saved screenshot to scripts/summer_transcript_screen.png');

  // Let's dump all text in the right sidebar panels
  const panelTexts = await page.evaluate(() => {
    const panels = document.querySelectorAll('ytd-engagement-panel-section-list-renderer');
    return Array.from(panels).map(p => ({
      id: p.id,
      targetId: p.getAttribute('target-id'),
      visibility: p.getAttribute('visibility'),
      textSnippet: p.innerText ? p.innerText.substring(0, 300) : ''
    }));
  });

  console.log('Panel info:', JSON.stringify(panelTexts, null, 2));

  await browser.close();
})();
