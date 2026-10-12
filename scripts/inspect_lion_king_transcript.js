const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const videoId = 'HeQTJE99OXo';
  console.log(`Inspecting transcript elements for Lion King...`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/api/timedtext')) {
      try {
        const text = await response.text();
        console.log(`Intercepted timedtext URL: ${url.slice(0, 80)}, length: ${text.length}`);
        fs.writeFileSync(`scripts/timedtext_${Date.now()}.txt`, text, 'utf-8');
      } catch (e) {
        console.log('Error reading timedtext:', e.message);
      }
    }
  });

  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  // Expand description
  await page.evaluate(() => {
    window.scrollBy(0, 300);
    const expand = document.querySelector('#expand, tp-yt-paper-button#expand');
    if (expand) expand.click();
  });
  await new Promise(r => setTimeout(r, 2000));

  // Click Show transcript
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, ytd-button-renderer'));
    for (const b of btns) {
      if (b.innerText && (b.innerText.includes('Show transcript') || b.innerText.includes('bản ghi chép'))) {
        b.click();
        return b.innerText;
      }
    }
    return false;
  });
  console.log('Transcript button click result:', clicked);

  // Wait 5 seconds for transcript panel to fetch and populate
  await new Promise(r => setTimeout(r, 5000));

  // Inspect transcript elements
  const info = await page.evaluate(() => {
    const allTags = Array.from(document.querySelectorAll('*'))
      .map(el => el.tagName.toLowerCase())
      .filter(tag => tag.includes('transcript'));
    
    // Check various transcript segment selectors
    const segs1 = Array.from(document.querySelectorAll('ytd-transcript-segment-renderer'));
    const segs2 = Array.from(document.querySelectorAll('ytd-transcript-search-panel-renderer ytd-transcript-segment-renderer'));
    const segs3 = Array.from(document.querySelectorAll('[class*="transcript-segment"]'));
    const segs4 = Array.from(document.querySelectorAll('ytd-transcript-segment-list-renderer *'));

    const items = (segs1.length > 0 ? segs1 : (segs3.length > 0 ? segs3 : segs2)).map(item => {
      const time = item.querySelector('.segment-timestamp, #timestamp, [class*="timestamp"]')?.innerText?.trim() || '';
      const text = item.querySelector('.segment-text, #segment-text, [class*="segment-text"]')?.innerText?.trim() || item.innerText?.trim() || '';
      return { time, text };
    });

    return {
      transcriptTags: [...new Set(allTags)],
      segs1Count: segs1.length,
      segs2Count: segs2.length,
      segs3Count: segs3.length,
      segs4Count: segs4.length,
      extractedItemsCount: items.length,
      itemsSample: items.slice(0, 10),
      itemsTotal: items
    };
  });

  console.log('Info:', JSON.stringify({ ...info, itemsTotal: undefined }, null, 2));

  if (info.itemsTotal && info.itemsTotal.length > 0) {
    fs.writeFileSync('scripts/lionking_transcript_full_dom.json', JSON.stringify(info.itemsTotal, null, 2), 'utf-8');
    console.log(`Saved ${info.itemsTotal.length} segments to scripts/lionking_transcript_full_dom.json!`);
  }

  await page.screenshot({ path: 'scripts/lionking_debug_screen2.png' });
  await browser.close();
})();
