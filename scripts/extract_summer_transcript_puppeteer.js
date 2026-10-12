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

  const videoId = 'AS47hWRO0bw';
  console.log(`Navigating to YouTube video ${videoId}...`);
  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

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
  let segments = [];
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

    segments = await page.$$eval('ytd-transcript-segment-renderer', els => {
      return els.map(el => {
        const timeEl = el.querySelector('.segment-timestamp');
        const textEl = el.querySelector('.segment-text');
        return {
          timestamp: timeEl ? timeEl.innerText.trim() : '',
          text: textEl ? textEl.innerText.trim() : ''
        };
      });
    });

    console.log(`Extracted ${segments.length} transcript cues from DOM!`);
  } catch (e) {
    console.log('Transcript error:', e.message);
  }

  if (segments.length === 0) {
    // Fallback: extract ytInitialData caption url and fetch inside page evaluate
    try {
      const pageCaptionData = await page.evaluate(async () => {
        const tracks = window.ytInitialPlayerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (!tracks || tracks.length === 0) return null;
        const res = await fetch(tracks[0].baseUrl);
        return await res.text();
      });

      if (pageCaptionData) {
        fs.writeFileSync('scripts/summer_timedtext_xml.xml', pageCaptionData, 'utf-8');
        console.log('Fetched caption XML directly via page context!');
      }
    } catch (e) {
      console.log('In-page fetch error:', e.message);
    }
  }

  if (segments.length > 0) {
    fs.writeFileSync('scripts/summer_transcript_cues.json', JSON.stringify(segments, null, 2), 'utf-8');
    console.log('Saved to scripts/summer_transcript_cues.json');
  }

  await browser.close();
  console.log('Done!');
})();
