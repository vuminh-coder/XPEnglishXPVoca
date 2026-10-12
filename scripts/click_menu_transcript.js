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

  // Find the 3-dots button next to Download/Share
  console.log('Finding 3-dots menu button...');
  const clickedMenu = await page.evaluate(() => {
    // It's the button inside #top-level-buttons-computed or sibling
    const menuRenderer = document.querySelector('ytd-menu-renderer');
    if (!menuRenderer) return false;
    const btn = menuRenderer.querySelector('button[aria-label*="More"], button[aria-label*="thêm"], yt-icon-button button');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  console.log('Clicked menu:', clickedMenu);
  await new Promise(r => setTimeout(r, 2000));

  // Find "Show transcript" or "Bản chép lời" in tp-yt-iron-dropdown or ytd-popup-container
  const clickedTranscript = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('ytd-menu-service-item-renderer, tp-yt-paper-item, #items ytd-menu-service-item-renderer'));
    for (const item of items) {
      const text = item.innerText || '';
      console.log('Menu item:', text);
      if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('chép lời')) {
        item.click();
        return { success: true, text };
      }
    }
    return { success: false, itemsFound: items.map(i => i.innerText.trim()) };
  });

  console.log('Transcript click:', JSON.stringify(clickedTranscript));
  await new Promise(r => setTimeout(r, 4000));

  // Also check if transcript button is inside description under chapters
  if (!clickedTranscript.success) {
    console.log('Searching further down in page for transcript section...');
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(r => setTimeout(r, 2000));

    const transcriptSectionBtn = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      for (const b of btns) {
        if ((b.innerText || '').toLowerCase().includes('transcript') || (b.innerText || '').toLowerCase().includes('chép lời')) {
          b.click();
          return b.innerText;
        }
      }
      return null;
    });
    console.log('Transcript section button clicked:', transcriptSectionBtn);
  }

  await new Promise(r => setTimeout(r, 3000));

  // Check segments
  const segments = await page.evaluate(() => {
    const models = document.querySelectorAll('transcript-segment-view-model, ytd-transcript-segment-renderer');
    return models.length;
  });
  console.log('Segments count:', segments);

  await page.screenshot({ path: 'scripts/tangled_after_menu_click.png' });
  console.log('Saved screenshot to scripts/tangled_after_menu_click.png');

  await browser.close();
})();
