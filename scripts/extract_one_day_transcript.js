const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'ESI7jRy2yAk';
  console.log(`Starting Puppeteer Chrome to extract 100% transcript for One Day video: ${videoId}`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  const pageTitle = await page.title();
  console.log('Video Title:', pageTitle);

  // Scroll down to description
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 1500));

  // Expand description
  try {
    const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
    if (expandBtn) {
      await expandBtn.click();
      await new Promise(r => setTimeout(r, 1500));
    }
  } catch (e) {
    console.log('Expand error:', e.message);
  }

  // Look for "Show transcript" button
  const buttons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  let clicked = false;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('bản chép lời') || text.toLowerCase().includes('chép lời')) {
      console.log('Clicking transcript button...');
      await btn.click();
      clicked = true;
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }

  if (!clicked) {
    console.log('Transcript button not found via standard selectors, looking for more actions menu...');
    // Sometimes transcript button is in the 3 dots menu
    const moreBtn = await page.$('button[aria-label="More actions"], button[aria-label="Thao tác khác"]');
    if (moreBtn) {
      await moreBtn.click();
      await new Promise(r => setTimeout(r, 1500));
      const menuItems = await page.$$('ytd-menu-service-item-renderer, tp-yt-paper-item');
      for (const item of menuItems) {
        const itemText = await page.evaluate(el => el.innerText || '', item);
        if (itemText.toLowerCase().includes('transcript') || itemText.toLowerCase().includes('bản chép lời') || itemText.toLowerCase().includes('chép lời')) {
          console.log('Clicking transcript in menu...');
          await item.click();
          await new Promise(r => setTimeout(r, 4000));
          break;
        }
      }
    }
  }

  // Scroll transcript panel to load all segments (video is 10:04 so we scroll enough times)
  console.log('Scrolling transcript panel to load all segments...');
  await page.evaluate(async () => {
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
      for (let i = 0; i < 40; i++) {
        scrollable.scrollTop = scrollable.scrollHeight;
        await new Promise(r => setTimeout(r, 300));
      }
    }
  });

  await new Promise(r => setTimeout(r, 2000));

  // Extract all segments from transcript-segment-view-model
  const segments = await page.evaluate(() => {
    const items = document.querySelectorAll('transcript-segment-view-model');
    const result = [];
    items.forEach((item, index) => {
      const allTexts = Array.from(item.querySelectorAll('span, div')).map(el => el.innerText.trim()).filter(Boolean);
      const tsRegex = /^\d+:\d{2}$/;
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
  fs.writeFileSync('scripts/one_day_official_full_transcript.json', JSON.stringify(segments, null, 2));

  await browser.close();
})();
