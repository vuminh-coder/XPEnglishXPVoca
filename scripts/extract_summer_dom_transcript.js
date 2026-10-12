const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const videoId = 'AS47hWRO0bw';
  console.log(`Navigating to YouTube video ${videoId}...`);
  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));

  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 1000));

  const expandBtn = await page.$('#expand, tp-yt-paper-button#expand');
  if (expandBtn) {
    await expandBtn.click();
    console.log('Clicked expand description button');
    await new Promise(r => setTimeout(r, 1500));
  }

  const buttons = await page.$$('button, ytd-button-renderer, tp-yt-paper-button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
    if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('bản chép lời') || text.toLowerCase().includes('chép lời')) {
      console.log('Clicking transcript button:', text.trim());
      await btn.click();
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }

  const dump = await page.evaluate(() => {
    const panels = document.querySelectorAll('ytd-engagement-panel-section-list-renderer');
    let transcriptPanel = null;
    panels.forEach(p => {
      if (p.innerText && (p.innerText.includes('Transcript') || p.innerText.includes('Bản chép lời'))) {
        transcriptPanel = p;
      }
    });

    if (!transcriptPanel) return { error: 'Transcript panel not found' };

    const timeRegex = /^\d+:\d{2}$/;
    const allEls = transcriptPanel.querySelectorAll('div, span, button, p');
    const collected = [];
    const seen = new Set();

    allEls.forEach(el => {
      const txt = el.innerText ? el.innerText.trim() : '';
      if (timeRegex.test(txt) && el.children.length === 0) {
        const parent = el.parentElement;
        const grandParent = parent ? parent.parentElement : null;
        let segmentText = (grandParent ? grandParent.innerText : parent.innerText) || '';
        // Remove timestamp from segment text
        segmentText = segmentText.replace(txt, '').trim().split('\n')[0].trim();
        const key = `${txt}__${segmentText}`;
        if (segmentText && !seen.has(key)) {
          seen.add(key);
          collected.push({
            timestamp: txt,
            text: segmentText
          });
        }
      }
    });

    return {
      collectedCount: collected.length,
      collected: collected
    };
  });

  console.log('Collected count:', dump.collectedCount);
  if (dump.collectedCount > 0) {
    fs.writeFileSync('scripts/summer_transcript_cues.json', JSON.stringify(dump.collected, null, 2), 'utf-8');
    console.log('SUCCESS: Saved all cues to scripts/summer_transcript_cues.json');
    console.log('Sample cues (first 5):', dump.collected.slice(0, 5));
    console.log('Sample cues (last 5):', dump.collected.slice(-5));
  } else {
    console.log('Dump result:', dump);
  }

  await browser.close();
})();
