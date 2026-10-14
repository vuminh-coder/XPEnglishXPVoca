const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = '0zbPeoZzcPg';
  console.log(`Extracting 100% full transcript for UP (${videoId}) via Chrome Puppeteer...`);

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

  // Find and click transcript button
  const buttons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('bản chép lời') || text.toLowerCase().includes('chép lời')) {
      console.log('Found transcript button:', text.trim());
      try {
        await btn.click();
        await new Promise(r => setTimeout(r, 4000));
      } catch (e) {
        console.log('Click error:', e.message);
      }
      break;
    }
  }

  // Scroll the transcript container to load all segments
  console.log('Scrolling transcript container to ensure all segments are loaded...');
  await page.evaluate(async () => {
    const sample = document.querySelector('transcript-segment-view-model, ytd-transcript-segment-renderer');
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
      for (let i = 0; i < 60; i++) {
        scrollable.scrollTop = scrollable.scrollHeight;
        await new Promise(r => setTimeout(r, 200));
      }
    }
  });

  await new Promise(r => setTimeout(r, 2000));

  // Extract all segments
  const segments = await page.evaluate(() => {
    const models = document.querySelectorAll('transcript-segment-view-model');
    if (models.length > 0) {
      const result = [];
      models.forEach((item, index) => {
        const allTexts = Array.from(item.querySelectorAll('span, div')).map(el => el.innerText.trim()).filter(Boolean);
        const tsRegex = /^\d+(:\d{2})+$/;
        let timestamp = '';
        const textParts = [];

        for (const t of allTexts) {
          if (tsRegex.test(t) && !timestamp) {
            timestamp = t;
          } else if (!tsRegex.test(t)) {
            if (!textParts.includes(t)) {
              textParts.push(t);
            }
          }
        }
        result.push({
          index,
          timestamp,
          text: textParts.join(' ').trim(),
          rawText: item.innerText.replace(/\n+/g, ' ').trim()
        });
      });
      return result;
    }

    const legacy = document.querySelectorAll('ytd-transcript-segment-renderer');
    if (legacy.length > 0) {
      return Array.from(legacy).map((el, index) => {
        const timeEl = el.querySelector('.segment-timestamp');
        const textEl = el.querySelector('.segment-text');
        return {
          index,
          timestamp: timeEl ? timeEl.innerText.trim() : '',
          text: textEl ? textEl.innerText.trim() : '',
          rawText: el.innerText.replace(/\n+/g, ' ').trim()
        };
      });
    }

    return [];
  });

  console.log(`Extracted ${segments.length} transcript segments.`);

  const output = {
    videoId,
    pageTitle,
    totalSegments: segments.length,
    segments
  };

  fs.writeFileSync('scripts/up_transcript_full.json', JSON.stringify(output, null, 2), 'utf-8');
  console.log('Saved to scripts/up_transcript_full.json');

  await browser.close();
})();
