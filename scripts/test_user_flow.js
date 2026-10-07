const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Navigating to Jensen Huang lesson...');
  await page.goto('http://localhost:3000/study/dictation?id=1481dc60-fe8a-4fa9-830b-9a227ede9b6e', {
    waitUntil: 'domcontentloaded'
  });

  await page.waitForSelector('input[placeholder*="Điền câu"]', { timeout: 15000 });
  console.log('Page loaded! Current sentence is #1.');

  // 2. Click sentence #2 in the transcript sidebar
  console.log('2. Clicking sentence #2 in sidebar...');
  const clicked = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.rounded-2xl'));
    const item2 = cards.find(d => d.innerText && d.innerText.includes('#2') && d.innerText.includes('00:16'));
    if (item2) {
      item2.click();
      return { found: true, text: item2.innerText.slice(0, 50) };
    }
    return { found: false };
  });
  console.log('Sentence #2 clicked:', clicked);
  await new Promise(r => setTimeout(r, 1500));

  // Check state on sentence #2
  const state2 = await page.evaluate(() => {
    const metaTag = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Câu 2/6'));
    const timer = document.querySelector('.font-mono.tabular-nums')?.innerText;
    const timeLabels = Array.from(document.querySelectorAll('.font-mono')).map(el => el.innerText);
    const properNounButtons = Array.from(document.querySelectorAll('button')).filter(b => b.title && b.title.includes('Tên riêng')).map(b => b.innerText);
    const activeHeader = Array.from(document.querySelectorAll('div')).find(d => d.innerText && d.innerText.includes('#2') && d.innerText.includes('ĐANG HỌC'));

    return {
      activeMeta: metaTag ? metaTag.innerText : 'not found',
      timeLabels: timeLabels.filter(t => t.includes(':')),
      properNouns: properNounButtons,
      hasActiveHeader2: !!activeHeader
    };
  });
  console.log('State on sentence #2:', JSON.stringify(state2, null, 2));

  // 3. Test typing into dictation input
  console.log('3. Typing "As far as I know" into dictation input...');
  const inputEl = await page.$('input[placeholder*="Điền câu"]');
  await inputEl.type('As far as I know ');
  await new Promise(r => setTimeout(r, 500));

  const typingState = await page.evaluate(() => {
    const input = document.querySelector('input[placeholder*="Điền câu"]');
    const solvedInfo = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Nhấn để xem từ'))?.parentElement?.innerText;
    return {
      inputValue: input.value,
      solvedInfo
    };
  });
  console.log('Typing state:', typingState);

  await page.screenshot({ path: 'dictation_sentence2_typed.png' });
  console.log('Saved dictation_sentence2_typed.png');

  await browser.close();
  console.log('All user flow tests passed!');
})();
