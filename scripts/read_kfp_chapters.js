const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/watch?v=SAY6Mptrj5s', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const info = await page.evaluate(() => {
    const desc = document.querySelector('#description, #description-inline-expander')?.innerText || '';
    const macroMarkers = Array.from(document.querySelectorAll('ytd-macro-markers-list-item-renderer')).map(el => el.innerText.replace(/\n+/g, ' - '));
    return {
      desc,
      chapters: macroMarkers
    };
  });

  console.log('Chapters found:', info.chapters);
  console.log('Description:\n', info.desc);

  await browser.close();
})();
