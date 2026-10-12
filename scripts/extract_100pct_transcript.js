const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'iUB-sCiZIUw';
  console.log(`Extracting 100% full transcript for video ${videoId} via Chrome Puppeteer...`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 1000));

  const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
  if (expandBtn) {
    await expandBtn.click();
    await new Promise(r => setTimeout(r, 1500));
  }

  const buttons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('bản chép lời') || text.toLowerCase().includes('chép lời')) {
      console.log('Clicking transcript button...');
      await btn.click();
      await new Promise(r => setTimeout(r, 3000));
      break;
    }
  }

  // Scroll the transcript panel container down multiple times to ensure all lazy-loaded segments are rendered
  console.log('Scrolling transcript container to load all segments...');
  await page.evaluate(async () => {
    // Find the scrollable container of the transcript
    const panel = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-transcript"], #panels');
    // Or find any scrollable container containing transcript-segment-view-model
    const sample = document.querySelector('transcript-segment-view-model');
    if (!sample) return;

    let parent = sample.parentElement;
    let scrollable = null;
    while (parent && parent !== document.body) {
      const style = window.getComputedStyle(parent);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        scrollable = parent;
        break;
      }
      parent = parent.parentElement;
    }

    if (scrollable) {
      for (let i = 0; i < 20; i++) {
        scrollable.scrollTop = scrollable.scrollHeight;
        await new Promise(r => setTimeout(r, 400));
      }
    }
  });

  await new Promise(r => setTimeout(r, 2000));

  // Extract all segments from transcript-segment-view-model
  const segments = await page.evaluate(() => {
    const items = document.querySelectorAll('transcript-segment-view-model');
    const result = [];
    items.forEach((item, index) => {
      // Find timestamp
      const allTexts = Array.from(item.querySelectorAll('span, div')).map(el => el.innerText.trim()).filter(Boolean);
      // Look for timestamp (e.g. "0:00", "1:23")
      const tsRegex = /^\d+:\d{2}$/;
      let timestamp = '';
      const textParts = [];

      for (const t of allTexts) {
        if (tsRegex.test(t) && !timestamp) {
          timestamp = t;
        } else if (!tsRegex.test(t)) {
          // Avoid duplicate texts
          if (!textParts.includes(t)) {
            textParts.push(t);
          }
        }
      }

      // Also get entire innerText
      const rawText = item.innerText.replace(/\n+/g, ' ').trim();

      result.push({
        index,
        timestamp,
        textParts,
        rawText
      });
    });
    return result;
  });

  console.log(`Successfully extracted ${segments.length} transcript segments from video ${videoId}!`);
  fs.writeFileSync('scripts/about_time_official_full_transcript.json', JSON.stringify(segments, null, 2));

  await browser.close();
})();
