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

  const info = await page.evaluate(() => {
    const title = document.querySelector('h1.ytd-watch-metadata')?.innerText;
    const ccBtn = document.querySelector('.ytp-subtitles-button');
    const ccAvailable = !!ccBtn;
    const ccAria = ccBtn ? ccBtn.getAttribute('aria-pressed') : null;
    
    // Check ytInitialPlayerResponse
    const playerResponse = window.ytInitialPlayerResponse;
    const captions = playerResponse?.captions;
    const captionTracks = captions?.playerCaptionsTracklistRenderer?.captionTracks;

    return {
      title,
      ccAvailable,
      ccAria,
      captionTracks: captionTracks || []
    };
  });

  console.log('Player Info:', JSON.stringify(info, null, 2));

  await browser.close();
})();
