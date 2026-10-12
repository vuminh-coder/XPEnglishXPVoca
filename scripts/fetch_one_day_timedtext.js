const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'ESI7jRy2yAk';
  console.log(`Extracting timedtext cues for ${videoId}...`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  let timedtextUrl = null;

  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('timedtext') && !timedtextUrl) {
      console.log('Found timedtext URL:', url);
      timedtextUrl = url;
      try {
        const text = await res.text();
        fs.writeFileSync('scripts/one_day_timedtext.xml', text);
        console.log('Saved timedtext XML!');
      } catch (e) {
        console.error('Error reading timedtext:', e.message);
      }
    }
  });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // Turn on CC if not on
  try {
    const ccBtn = await page.$('.ytp-subtitles-button');
    if (ccBtn) {
      await ccBtn.click();
      console.log('Clicked CC button');
    }
  } catch (e) {}

  await new Promise(r => setTimeout(r, 4000));
  await browser.close();
  console.log('Done.');
})();
