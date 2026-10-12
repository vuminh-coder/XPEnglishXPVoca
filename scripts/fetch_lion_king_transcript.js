const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'HeQTJE99OXo';
  console.log(`Loading Lion King video (${videoId}) and intercepting captions / transcript...`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  let capturedTimedText = null;

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/api/timedtext')) {
      console.log('Intercepted timedtext URL:', url.slice(0, 120));
      try {
        const text = await response.text();
        console.log(`Captured timedtext (${text.length} bytes)`);
        if (text.length > 500 && !text.includes('automated queries')) {
          capturedTimedText = text;
          fs.writeFileSync('scripts/lionking_intercepted_timedtext.txt', text, 'utf-8');
        }
      } catch (e) {
        console.log('Error reading response body:', e.message);
      }
    }
  });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

  // Try to enable subtitles on player if not enabled
  await page.evaluate(() => {
    const ccBtn = document.querySelector('.ytp-subtitles-button');
    if (ccBtn && ccBtn.getAttribute('aria-pressed') !== 'true') {
      ccBtn.click();
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  // Scroll down
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 1000));

  // Click expand on description
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

  // Look for "Show transcript" button
  const transcriptButtons = await page.$$('button, ytd-button-renderer');
  for (const btn of transcriptButtons) {
    const text = await page.evaluate(el => el.innerText, btn);
    if (text && (text.includes('Show transcript') || text.includes('bản ghi chép') || text.includes('Transcript'))) {
      console.log('Found transcript button:', text);
      try {
        await btn.click();
        console.log('Clicked transcript button!');
        await new Promise(r => setTimeout(r, 3000));
        break;
      } catch (e) {
        console.log('Error clicking transcript button:', e.message);
      }
    }
  }

  // Extract transcript segments if present
  const segments = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('ytd-transcript-segment-renderer, ytd-transcript-search-panel-renderer ytd-transcript-segment-renderer'));
    return items.map(item => {
      const time = item.querySelector('.segment-timestamp, #timestamp')?.innerText?.trim() || '';
      const text = item.querySelector('.segment-text, #segment-text')?.innerText?.trim() || '';
      return { time, text };
    });
  });

  console.log(`Found ${segments.length} DOM transcript segments`);
  if (segments.length > 0) {
    fs.writeFileSync('scripts/lionking_dom_transcript.json', JSON.stringify(segments, null, 2), 'utf-8');
    console.log('Saved to scripts/lionking_dom_transcript.json');
  }

  await page.screenshot({ path: 'scripts/lionking_debug_screen.png' });
  await browser.close();
})();
