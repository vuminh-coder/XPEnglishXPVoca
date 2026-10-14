const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/watch?v=EQ9RFbIHrFw', { waitUntil: 'networkidle2' });

  const transcriptData = JSON.parse(fs.readFileSync('scripts/coco_transcript_full.json', 'utf8'));
  const track = transcriptData.captionTracks[0];

  if (track && track.baseUrl) {
    console.log('Fetching captions inside browser session...');
    const result = await page.evaluate(async (url) => {
      try {
        const res = await fetch(url + '&fmt=json3');
        return await res.text();
      } catch (e) {
        return 'Error: ' + e.message;
      }
    }, track.baseUrl);

    console.log('Result length:', result.length);
    fs.writeFileSync('scripts/coco_captions_browser.json', result, 'utf8');
    console.log('Saved to scripts/coco_captions_browser.json');
  }

  await browser.close();
})();
