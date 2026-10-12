const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to Notting Hill sM4rv42qyvk...');
  await page.goto('https://www.youtube.com/watch?v=sM4rv42qyvk', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 4000));

  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Expand description
  try {
    const expandBtn = await page.$('#expand');
    if (expandBtn) {
      await expandBtn.click();
      console.log('Clicked #expand');
      await new Promise(r => setTimeout(r, 2000));
    }
  } catch (e) {
    console.log('Error expanding description:', e.message);
  }

  // Look for transcript button
  try {
    const buttons = await page.$$('button, ytd-button-renderer');
    let clicked = false;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.innerText || el.getAttribute('aria-label') || '', btn);
      if (text.toLowerCase().includes('transcript') || text.toLowerCase().includes('chép lời')) {
        console.log('Clicking transcript button:', text.trim());
        await btn.click();
        clicked = true;
        await new Promise(r => setTimeout(r, 4000));
        break;
      }
    }

    // Extract from engagement panel or transcript elements
    const result = await page.evaluate(() => {
      const panels = document.querySelectorAll('ytd-engagement-panel-section-list-renderer');
      let expandedPanel = null;
      panels.forEach(p => {
        if (p.innerText && (p.innerText.includes('Search transcript') || p.innerText.includes('Tìm kiếm trong bản chép lời') || p.innerText.includes('Transcript') || p.innerText.includes('Bản chép lời'))) {
          expandedPanel = p;
        }
      });

      if (!expandedPanel) {
        return { error: 'Transcript panel not found', bodyLength: document.body.innerText.length };
      }

      return {
        fullText: expandedPanel.innerText,
        textLength: expandedPanel.innerText.length
      };
    });

    console.log('Result:', result.textLength || result.error);
    if (result.fullText) {
      fs.writeFileSync('scripts/notting_hill_panel_raw_text.txt', result.fullText, 'utf8');
      console.log(`Saved ${result.textLength} chars to scripts/notting_hill_panel_raw_text.txt`);
    }
  } catch (e) {
    console.error('Error extracting transcript:', e);
  }

  await browser.close();
})();
