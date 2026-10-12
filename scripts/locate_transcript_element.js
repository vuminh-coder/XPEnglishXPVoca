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

  await page.goto('https://www.youtube.com/watch?v=iUB-sCiZIUw', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

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
      await btn.click();
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }

  // Find elements containing "mothership"
  const info = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const results = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.includes('mothership')) {
        let curr = node.parentElement;
        const ancestry = [];
        while (curr && curr !== document.body) {
          ancestry.push({
            tag: curr.tagName,
            className: curr.className,
            id: curr.id
          });
          curr = curr.parentElement;
        }
        results.push({
          text: node.nodeValue.trim(),
          ancestry
        });
      }
    }
    return results;
  });

  console.log('Found "mothership" nodes:', info.length);
  fs.writeFileSync('scripts/mothership_dom.json', JSON.stringify(info, null, 2));

  await browser.close();
})();
