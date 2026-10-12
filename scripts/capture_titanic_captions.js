const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,1000', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  const videoId = 'OSqS2ESN_ys';
  console.log(`Navigating to YouTube video ${videoId}...`);

  // Intercept network requests to see if timedtext is requested
  const timedTextUrls = [];
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('timedtext')) {
      console.log('Intercepted timedtext URL:', url);
      timedTextUrls.push(url);
      try {
        const text = await res.text();
        fs.writeFileSync('scripts/titanic_intercepted_timedtext.json', text, 'utf-8');
        console.log('Saved intercepted timedtext, length:', text.length);
      } catch (e) {
        console.log('Could not read timedtext text:', e.message);
      }
    }
  });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2000));

  // Click play and click CC button
  await page.evaluate(async () => {
    const video = document.querySelector('video');
    if (video) {
      video.muted = true;
      video.play();
    }
    const ccBtn = document.querySelector('.ytp-subtitles-button');
    if (ccBtn && ccBtn.getAttribute('aria-pressed') !== 'true') {
      ccBtn.click();
    }
  });

  await new Promise(r => setTimeout(r, 4000));

  // Check if timedtext was intercepted
  if (timedTextUrls.length === 0) {
    console.log('No timedtext intercepted yet, seeking video to 50s...');
    await page.evaluate(() => {
      const video = document.querySelector('video');
      if (video) video.currentTime = 55;
    });
    await new Promise(r => setTimeout(r, 4000));
  }

  // Check caption container
  const captionText = await page.evaluate(() => {
    const container = document.querySelector('.ytp-caption-window-bottom, .caption-window');
    return container ? container.innerText : 'NO_CAPTION_ON_SCREEN';
  });

  console.log('Caption on screen at 55s:', captionText);

  await browser.close();
})();
