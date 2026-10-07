const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const logs = [];
  page.on('console', msg => logs.push('[BROWSER] ' + msg.text()));
  page.on('pageerror', err => logs.push('[PAGE_ERROR] ' + err.toString()));

  console.log('1. Loading page...');
  await page.goto('http://localhost:3000/study/dictation?id=1481dc60-fe8a-4fa9-830b-9a227ede9b6e', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });
  await new Promise(r => setTimeout(r, 2500));

  // 1. Check sidebar sentences rendering
  const sidebarData = await page.evaluate(() => {
    // Collect all sentence cards in the transcript sidebar
    const allCards = Array.from(document.querySelectorAll('div')).filter(el => {
      const text = el.innerText || '';
      return text.includes('#1') && text.includes('ĐANG HỌC');
    });

    const sidebarText = document.querySelector('#active-listening-workspace')?.innerText || '';
    
    // Check all sentence elements
    const sentenceItems = Array.from(document.querySelectorAll('div, button'))
      .filter(el => (el.innerText || '').startsWith('#') && (el.innerText || '').length > 20)
      .map(el => el.innerText.split('\n').filter(Boolean).slice(0, 5));

    const inputEl = document.querySelector('input[placeholder*="Điền câu"]');
    const inputRect = inputEl ? inputEl.getBoundingClientRect() : null;

    return {
      sentenceItems: sentenceItems.slice(0, 6),
      inputVisible: !!inputEl,
      inputPlaceholder: inputEl?.placeholder,
      inputRect: inputRect ? { top: inputRect.top, bottom: inputRect.bottom, height: inputRect.height } : null,
      sidebarContainsTimestamps: sidebarText.includes('00:00') || sidebarText.includes('00:16'),
      sidebarContainsElon: sidebarText.includes('Elon') || sidebarText.includes('Musk'),
      sidebarContainsVietnamese: sidebarText.includes('Theo tôi được biết') || sidebarText.includes('Dịch'),
    };
  });

  console.log('Sidebar & Workspace Data:', JSON.stringify(sidebarData, null, 2));

  // Capture screenshot of desktop 1440x900
  await page.screenshot({ path: 'dictation_verified_desktop.png' });
  console.log('Saved dictation_verified_desktop.png');

  // 2. Test selecting sentence #2
  console.log('2. Clicking sentence #2 in the sidebar...');
  const selectResult = await page.evaluate(() => {
    const allDivs = Array.from(document.querySelectorAll('div, button'));
    const item2 = allDivs.find(el => (el.innerText || '').includes('#2') && (el.innerText || '').includes('00:16'));
    if (item2) {
      item2.click();
      return { clicked: true, text: item2.innerText.slice(0, 60) };
    }
    return { clicked: false };
  });
  console.log('Sentence #2 click result:', selectResult);

  await new Promise(r => setTimeout(r, 1500));

  const stateAfterSelect = await page.evaluate(() => {
    const inputEl = document.querySelector('input[placeholder*="Điền câu"]');
    const metaTag = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Câu 2/6'));
    return {
      activeMeta: metaTag ? metaTag.innerText : 'not found',
      inputPlaceholder: inputEl?.placeholder,
    };
  });
  console.log('State after selecting sentence #2:', stateAfterSelect);

  await page.screenshot({ path: 'dictation_sentence2_selected.png' });
  console.log('Saved dictation_sentence2_selected.png');

  await browser.close();
  console.log('Verification finished successfully!');
})();
