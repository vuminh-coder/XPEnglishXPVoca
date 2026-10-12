const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'gW0xteHHXrY';
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  // Scroll down to description
  await page.evaluate(() => window.scrollBy(0, 500));
  await new Promise(r => setTimeout(r, 1500));

  // Look for any button containing transcript or description
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, #expand, tp-yt-paper-button, ytd-button-renderer')).map(el => ({
      tag: el.tagName,
      id: el.id,
      text: (el.innerText || '').slice(0, 100),
      aria: el.getAttribute('aria-label'),
      className: el.className
    }));
  });

  console.log(`Found ${buttons.length} buttons on page.`);
  const matches = buttons.filter(b => 
    (b.text && /transcript|lời|expand|thêm|more/i.test(b.text)) ||
    (b.aria && /transcript|lời|expand|thêm|more/i.test(b.aria))
  );
  console.log('Matching buttons:', JSON.stringify(matches, null, 2));

  await browser.close();
})();
