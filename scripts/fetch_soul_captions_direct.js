const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'e1Mno2A2N5E';
  console.log(`Fetching 100% full English captions track via Puppeteer page.evaluate(fetch)...`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });

  const trackUrl = await page.evaluate(() => {
    const pr = window.ytInitialPlayerResponse;
    const tracks = pr?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
    if (!tracks.length) return null;
    const track = tracks.find(t => t.languageCode === 'en' && t.kind !== 'asr') || tracks[0];
    return track.baseUrl;
  });

  console.log('Track URL:', trackUrl);
  if (trackUrl) {
    const capPage = await browser.newPage();
    await capPage.goto(trackUrl + '&fmt=json3', { waitUntil: 'domcontentloaded' });
    const content = await capPage.evaluate(() => document.body.innerText || document.body.textContent);
    console.log(`Fetched ${content.length} characters from page body!`);
    fs.writeFileSync('scripts/soul_raw_captions_fetch.json', content, 'utf-8');
    console.log('Saved to scripts/soul_raw_captions_fetch.json');
  }

  await browser.close();
})();
