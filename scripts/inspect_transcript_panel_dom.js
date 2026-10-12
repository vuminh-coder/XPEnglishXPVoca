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

  await page.goto('https://www.youtube.com/watch?v=iUB-sCiZIUw', { waitUntil: 'networkidle2', timeout: 45000 });
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
      await btn.click();
      await new Promise(r => setTimeout(r, 3000));
      break;
    }
  }

  // Find all elements that contain timestamp-like text, or inspect the transcript panel
  const dump = await page.evaluate(() => {
    // Traverse all elements inside engagement panel
    const panels = document.querySelectorAll('ytd-engagement-panel-section-list-renderer');
    let transcriptPanel = null;
    panels.forEach(p => {
      if (p.innerText && (p.innerText.includes('Transcript') || p.innerText.includes('Bản chép lời'))) {
        transcriptPanel = p;
      }
    });

    if (!transcriptPanel) return { error: 'Transcript panel not found' };

    // Find all segment blocks
    // In newer YouTube, it's often ytd-transcript-segment-renderer or div or span with formatting
    const allTextNodes = [];
    // Let's find elements with class or tag containing transcript
    const items = transcriptPanel.querySelectorAll('*');
    const segments = [];
    
    // Check if there are elements with timestamp format (e.g. \d+:\d+)
    const timeRegex = /^\d+:\d{2}$/;
    
    // Look for segment containers
    // Often it has a timestamp button and a text container
    const segmentEls = transcriptPanel.querySelectorAll('ytd-transcript-segment-renderer, ytd-transcript-section-header-renderer, [class*="segment"]');
    
    // Also try simple tree walking: finding every timestamp element
    const allEls = transcriptPanel.querySelectorAll('div, span, button, p');
    let currentTs = '';
    const collected = [];

    allEls.forEach(el => {
      const txt = el.innerText ? el.innerText.trim() : '';
      if (timeRegex.test(txt) && el.children.length === 0) {
        // Find adjacent text
        // Usually the text is in the parent or next sibling
        const parent = el.parentElement;
        const grandParent = parent ? parent.parentElement : null;
        const segmentText = (grandParent ? grandParent.innerText : parent.innerText) || '';
        collected.push({
          tag: el.tagName,
          timestamp: txt,
          snippet: segmentText.replace(txt, '').trim().split('\n')[0]
        });
      }
    });

    return {
      panelHtmlLength: transcriptPanel.innerHTML.length,
      samplePanelHtml: transcriptPanel.innerHTML.substring(0, 1000),
      collectedCount: collected.length,
      collected: collected
    };
  });

  fs.writeFileSync('scripts/about_time_transcript_full_dump.json', JSON.stringify(dump, null, 2));
  console.log('Collected count:', dump.collectedCount);
  if (dump.collectedCount > 0) {
    console.log('Sample collected:', dump.collected.slice(0, 5));
  } else {
    console.log('Sample panel HTML:', dump.samplePanelHtml);
  }

  await browser.close();
})();
