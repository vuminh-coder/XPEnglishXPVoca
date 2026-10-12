const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to Friends v1xXlxDHWPU...');
  await page.goto('https://www.youtube.com/watch?v=v1xXlxDHWPU', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  // Expand description
  try {
    const expandBtn = await page.$('#expand');
    if (expandBtn) {
      await expandBtn.click();
      console.log('Clicked #expand');
      await new Promise(r => setTimeout(r, 2000));
    }
  } catch(e) {
    console.log('Expand error:', e.message);
  }

  // Find Transcript button
  const buttons = await page.$$('button, ytd-button-renderer');
  let clicked = false;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('chép lời')) {
      console.log('Clicking transcript button:', text.trim());
      await btn.click();
      clicked = true;
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }

  // Extract transcript items
  const transcriptData = await page.evaluate(() => {
    const segments = [];
    const items = document.querySelectorAll('ytd-transcript-segment-renderer');
    items.forEach(item => {
      const timeEl = item.querySelector('.segment-timestamp');
      const textEl = item.querySelector('.segment-text');
      if (timeEl && textEl) {
        segments.push({
          timeStr: timeEl.innerText.trim(),
          text: textEl.innerText.trim()
        });
      }
    });
    return {
      count: segments.length,
      segments: segments
    };
  });

  console.log('Transcript extracted:', transcriptData.count, 'segments');
  fs.writeFileSync('scripts/friends_transcript_raw.json', JSON.stringify(transcriptData, null, 2));

  // Also check if we can fetch timedtext within page
  if (transcriptData.count === 0) {
    console.log('Trying in-page fetch of timedtext...');
    const timedtextUrl = await page.evaluate(() => {
      // Find player response
      try {
        const pr = window.ytInitialPlayerResponse;
        const tracks = pr.captions.playerCaptionsTracklistRenderer.captionTracks;
        return tracks.map(t => ({ lang: t.languageCode, url: t.baseUrl }));
      } catch(e) {
        return [];
      }
    });
    console.log('Tracks in page:', timedtextUrl);
    if (timedtextUrl && timedtextUrl.length > 0) {
      const subUrl = timedtextUrl[0].url;
      const subContent = await page.evaluate(async (u) => {
        const resp = await fetch(u);
        return await resp.text();
      }, subUrl);
      fs.writeFileSync('scripts/subs/v1xXlxDHWPU.timedtext.xml', subContent);
      console.log('Saved timedtext XML, length:', subContent.length);
    }
  }

  await browser.close();
})();
