const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'FikAJxtVgOY';
  console.log(`Extracting 100% full transcript for Zootopia (${videoId}) via Chrome Puppeteer...`);

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

        const cleanText = textParts.filter(t => !tsRegex.test(t)).join(' ').trim();
        if (cleanText) {
          result.push({
            index,
            timestamp,
            text: cleanText
          });
        }
      });
      return result;
    }

    const legacy = document.querySelectorAll('ytd-transcript-segment-renderer');
    if (legacy.length > 0) {
      return Array.from(legacy).map((item, index) => {
        const ts = item.querySelector('.segment-timestamp')?.innerText?.trim() || '';
        const txt = item.querySelector('.segment-text')?.innerText?.trim() || '';
        return { index, timestamp: ts, text: txt };
      });
    }

    return [];
  });

  console.log(`Extracted ${segments.length} raw segments from YouTube transcript DOM!`);

  // Parse timestamps to seconds
  const parsed = segments.map((s, idx) => {
    const parts = s.timestamp.split(':').map(Number);
    let startSec = 0;
    if (parts.length === 2) {
      startSec = parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      startSec = parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return {
      orderIndex: idx,
      timestamp: s.timestamp,
      startTime: startSec,
      text: s.text
    };
  });

  for (let i = 0; i < parsed.length; i++) {
    if (i < parsed.length - 1) {
      parsed[i].endTime = parsed[i + 1].startTime;
      if (parsed[i].endTime <= parsed[i].startTime) {
        parsed[i].endTime = parsed[i].startTime + 3.0;
      }
    } else {
      parsed[i].endTime = parsed[i].startTime + 5.0;
    }
  }

  fs.writeFileSync('scripts/zootopia_transcript_full.json', JSON.stringify(parsed, null, 2), 'utf-8');
  console.log('Saved scripts/zootopia_transcript_full.json successfully!');

  await browser.close();
})();
