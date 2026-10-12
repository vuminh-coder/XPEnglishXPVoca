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

  const videoId = 'OSqS2ESN_ys';
  console.log(`Navigating to YouTube video ${videoId}...`);
  await page.goto(`https://www.youtube.com/watch?v=${videoId}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 2000));

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
      console.log('Clicking transcript button:', text.trim());
      await btn.click();
      await new Promise(r => setTimeout(r, 4000));
      break;
    }
  }

  const result = await page.evaluate(() => {
    const panels = document.querySelectorAll('ytd-engagement-panel-section-list-renderer');
    let expandedPanel = null;
    panels.forEach(p => {
      if (p.getAttribute('visibility') === 'ENGAGEMENT_PANEL_VISIBILITY_EXPANDED' && (p.innerText.includes('Search transcript') || p.innerText.includes('Tìm kiếm trong bản chép lời') || p.innerText.includes('Transcript'))) {
        expandedPanel = p;
      }
    });

    if (!expandedPanel) {
      panels.forEach(p => {
        if (p.innerText && (p.innerText.includes('Search transcript') || p.innerText.includes('Tìm kiếm trong bản chép lời') || p.innerText.includes('Transcript'))) {
          expandedPanel = p;
        }
      });
    }

    if (!expandedPanel) return { error: 'Expanded transcript panel not found', allPanels: Array.from(panels).map(p => p.innerText.slice(0, 100)) };

    const fullText = expandedPanel.innerText;
    return {
      textLength: fullText.length,
      fullText: fullText
    };
  });

  if (result.fullText) {
    fs.writeFileSync('scripts/titanic_panel_raw_text.txt', result.fullText, 'utf-8');
    console.log(`SUCCESS: Dumped ${result.fullText.length} characters of transcript text to scripts/titanic_panel_raw_text.txt`);
  } else {
    console.log('Error:', result.error, result.allPanels);
  }

  await browser.close();
})();
