const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false, // run visible or headless
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to YouTube...');
  await page.goto('https://www.youtube.com/watch?v=iUB-sCiZIUw', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

  // Scroll to description
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 1000));

  // Click "...more" / "Hiện thêm"
  try {
    const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
    if (expandBtn) {
      await expandBtn.click();
      console.log('Clicked expand description');
      await new Promise(r => setTimeout(r, 2000));
    }
  } catch (e) {
    console.log('Expand error:', e.message);
  }

  // Look for "Show transcript" button
  const buttons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('bản chép lời') || text.toLowerCase().includes('chép lời')) {
      console.log('Found transcript button:', text.trim());
      await btn.click();
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }

  // Take screenshot
  await page.screenshot({ path: 'public/test-artifacts/yt_transcript_screen.png' });
  console.log('Took screenshot to public/test-artifacts/yt_transcript_screen.png');

  // Dump selectors in transcript section
  const transcriptData = await page.evaluate(() => {
    // Check all potential elements
    const elements = document.querySelectorAll('ytd-transcript-segment-renderer, ytd-transcript-search-panel-renderer, ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-transcript"]');
    const result = {
      elementsFound: elements.length,
      segments: []
    };

    const segs = document.querySelectorAll('ytd-transcript-segment-renderer');
    segs.forEach(s => {
      const ts = s.querySelector('.segment-timestamp')?.innerText?.trim() || '';
      const tx = s.querySelector('.segment-text')?.innerText?.trim() || '';
      result.segments.push({ ts, tx });
    });

    return result;
  });

  console.log('Transcript data:', transcriptData);
  fs.writeFileSync('scripts/about_time_puppeteer_dump.json', JSON.stringify(transcriptData, null, 2));

  await browser.close();
})();
