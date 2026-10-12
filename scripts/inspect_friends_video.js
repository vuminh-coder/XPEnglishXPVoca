const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/watch?v=v1xXlxDHWPU', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 1000));
  const expandBtn = await page.$('#expand');
  if (expandBtn) await expandBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.innerText || '', b);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('chép lời')) {
      await b.click();
      await new Promise(r => setTimeout(r, 2000));
      break;
    }
  }
  const first15 = await page.evaluate(() => {
    const items = document.querySelectorAll('transcript-segment-view-model');
    return Array.from(items).slice(0, 20).map(it => it.innerText.replace(/\n+/g, ' ').trim());
  });
  console.log(JSON.stringify(first15, null, 2));
  await browser.close();
})();
