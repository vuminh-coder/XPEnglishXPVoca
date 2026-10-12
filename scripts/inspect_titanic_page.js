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

  const videoId = 'OSqS2ESN_ys';
  console.log(`Navigating to YouTube video ${videoId}...`);
  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

  // Screenshot initial page
  await page.screenshot({ path: 'scripts/titanic_page.png' });

  // Expand description
  const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
  if (expandBtn) {
    console.log('Found expand button, clicking...');
    await expandBtn.click();
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scripts/titanic_description_expanded.png' });
  }

  // Get description text and buttons inside description
  const descInfo = await page.evaluate(() => {
    const desc = document.querySelector('#description-inner, #description');
    return desc ? desc.innerText : 'NO_DESC';
  });
  console.log('Description text:\n', descInfo);

  await browser.close();
})();
