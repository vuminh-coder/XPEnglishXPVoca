const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = '2Q1gTWxZcj0';
  console.log(`Inspecting Finding Dory video (${videoId})...`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Scroll down
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 1000));

  // Try to click expand
  const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
  if (expandBtn) {
    try {
      await expandBtn.click();
      console.log('Clicked expand button');
      await new Promise(r => setTimeout(r, 1500));
    } catch (e) {
      console.log('Expand error:', e.message);
    }
  }

  // Get description and chapters
  const info = await page.evaluate(() => {
    const desc = document.querySelector('#description, #description-inline-expander')?.innerText || '';
    const macroMarkers = Array.from(document.querySelectorAll('ytd-macro-markers-list-item-renderer, ytd-chapter-renderer')).map(el => el.innerText.replace(/\n+/g, ' - '));
    const ytInitialPlayerResponse = window.ytInitialPlayerResponse;
    const tracks = ytInitialPlayerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

    return {
      desc,
      chapters: macroMarkers,
      duration: ytInitialPlayerResponse?.videoDetails?.lengthSeconds,
      hasCaptions: tracks.length > 0,
      tracks: tracks.map(t => ({ lang: t.languageCode, name: t.name?.simpleText, url: t.baseUrl }))
    };
  });

  console.log('Video Info:', JSON.stringify(info, null, 2));

  // Take screenshot
  await page.screenshot({ path: 'scripts/dory_debug_screen.png' });
  console.log('Saved screenshot to scripts/dory_debug_screen.png');

  await browser.close();
})();
