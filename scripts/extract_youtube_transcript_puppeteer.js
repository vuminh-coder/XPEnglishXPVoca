const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to YouTube video 1qlLS47uBD4...');
  await page.goto('https://www.youtube.com/watch?v=1qlLS47uBD4', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

  // Check title
  const videoTitle = await page.title();
  console.log('Page Title:', videoTitle);

  // Try to click "...more" / "...thêm" to expand description
  try {
    const expandBtn = await page.$('#expand');
    if (expandBtn) {
      await expandBtn.click();
      console.log('Clicked expand description button');
      await new Promise(r => setTimeout(r, 1500));
    }
  } catch (e) {
    console.log('Expand error:', e.message);
  }

  // Look for "Show transcript" button
  let transcriptExtracted = [];
  try {
    const buttons = await page.$$('button, ytd-button-renderer');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
      if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('chép lời')) {
        console.log('Found transcript button:', text.trim());
        await btn.click();
        await new Promise(r => setTimeout(r, 3000));
        break;
      }
    }

    // Extract segments from ytd-transcript-segment-renderer
    const segments = await page.$$eval('ytd-transcript-segment-renderer', els => {
      return els.map(el => {
        const timeEl = el.querySelector('.segment-timestamp');
        const textEl = el.querySelector('.segment-text');
        return {
          timestamp: timeEl ? timeEl.innerText.trim() : '',
          text: textEl ? textEl.innerText.trim() : ''
        };
      });
    });

    if (segments.length > 0) {
      console.log(`Successfully extracted ${segments.length} transcript segments from YouTube DOM!`);
      transcriptExtracted = segments;
    } else {
      console.log('No ytd-transcript-segment-renderer found via button click.');
    }
  } catch (e) {
    console.log('Transcript extraction error:', e.message);
  }

  // Also extract player response from window.ytInitialPlayerResponse
  const playerResponse = await page.evaluate(() => {
    return window.ytInitialPlayerResponse || null;
  });

  const output = {
    videoTitle,
    transcriptSegments: transcriptExtracted,
    hasPlayerResponse: !!playerResponse,
    captionsData: playerResponse?.captions || null
  };

  fs.writeFileSync('scripts/youtube_actual_data.json', JSON.stringify(output, null, 2), 'utf-8');
  console.log('Saved data to scripts/youtube_actual_data.json');

  await browser.close();
})();
