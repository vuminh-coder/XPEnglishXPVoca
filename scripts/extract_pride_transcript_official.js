const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'baGBRtR53TA';
  console.log(`Starting Puppeteer Chrome to inspect official transcript and ending of video: ${videoId}`);
  
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  const pageTitle = await page.title();
  console.log('Video Title:', pageTitle);

  // Extract initial player response
  const playerResponse = await page.evaluate(() => {
    return window.ytInitialPlayerResponse || null;
  });

  let captionTracks = [];
  if (playerResponse && playerResponse.captions && playerResponse.captions.playerCaptionsTracklistRenderer) {
    captionTracks = playerResponse.captions.playerCaptionsTracklistRenderer.captionTracks || [];
  }
  console.log(`Found ${captionTracks.length} caption tracks in ytInitialPlayerResponse`);

  if (captionTracks.length > 0) {
    for (const track of captionTracks) {
      console.log(`Track: ${track.languageCode} - ${track.name?.simpleText} - vssId: ${track.vssId}`);
      try {
        const rawCaptions = await page.evaluate(async (url) => {
          const resp = await fetch(url);
          return await resp.text();
        }, track.baseUrl);
        fs.writeFileSync(`scripts/pride_${track.languageCode}_captions.xml`, rawCaptions, 'utf-8');
        console.log(`Saved scripts/pride_${track.languageCode}_captions.xml (${rawCaptions.length} chars)`);
      } catch (e) {
        console.log('Error fetching track:', e.message);
      }
    }
  }

  // Check ending by seeking video to 09:35 and taking screenshot
  try {
    await page.evaluate(() => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = 575; // 09:35
        v.pause();
      }
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scripts/pride_frame_0935.png' });
    console.log('Saved screenshot scripts/pride_frame_0935.png');

    await page.evaluate(() => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = 585; // 09:45
      }
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scripts/pride_frame_0945.png' });
    console.log('Saved screenshot scripts/pride_frame_0945.png');

    await page.evaluate(() => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = 598; // 09:58
      }
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scripts/pride_frame_0958.png' });
    console.log('Saved screenshot scripts/pride_frame_0958.png');
  } catch (err) {
    console.log('Error during seeking/screenshot:', err.message);
  }

  await browser.close();
  console.log('Puppeteer finished inspection.');
})();
