const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto('https://www.youtube.com/watch?v=EQ9RFbIHrFw', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Expand description
  const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
  if (expandBtn) await expandBtn.click();
  await new Promise(r => setTimeout(r, 1000));

  // Click Show transcript
  const buttons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('bản chép lời')) {
      await btn.click();
      await new Promise(r => setTimeout(r, 3000));
      break;
    }
  }

  // Check language selector / dropdowns in transcript
  const info = await page.evaluate(() => {
    const header = document.querySelector('ytd-transcript-renderer, transcript-renderer, #transcript-scrollbox');
    const dropdowns = Array.from(document.querySelectorAll('tp-yt-paper-menu-button, tp-yt-paper-listbox, ytd-menu-renderer, #menu, .dropdown-content')).map(el => el.innerText);
    const selects = Array.from(document.querySelectorAll('select, option')).map(el => el.innerText);
    const allText = document.querySelector('ytd-transcript-renderer')?.innerText || 'No transcript renderer found';
    return { dropdowns, selects, allText: allText.slice(0, 1000) };
  });

  console.log('Transcript panel info:', JSON.stringify(info, null, 2));

  await browser.close();
})();
