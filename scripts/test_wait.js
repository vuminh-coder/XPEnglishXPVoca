const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('[BROWSER LOG]', msg.text()));
  page.on('response', res => {
    if (res.url().includes('api/listening')) {
      console.log('[API RESPONSE]', res.status(), res.url());
    }
  });

  console.log('Navigating to dictation page...');
  await page.goto('http://localhost:3000/study/dictation?id=1481dc60-fe8a-4fa9-830b-9a227ede9b6e', {
    waitUntil: 'domcontentloaded'
  });

  console.log('Waiting for input field or workspace...');
  try {
    await page.waitForSelector('input[placeholder*="Điền câu"]', { timeout: 15000 });
    console.log('>>> SUCCESS: Found dictation input field!');
  } catch (err) {
    console.log('>>> TIMEOUT waiting for input field:', err.message);
  }

  const details = await page.evaluate(() => {
    const ws = document.querySelector('#active-listening-workspace');
    const input = document.querySelector('input[placeholder*="Điền câu"]');
    const sentences = Array.from(document.querySelectorAll('div, p'))
      .filter(el => el.innerText && el.innerText.includes('Elon'))
      .map(el => el.innerText.slice(0, 100));
    return {
      hasWorkspace: !!ws,
      hasInput: !!input,
      inputValue: input ? input.value : null,
      elonSentences: sentences.slice(0, 3)
    };
  });

  console.log('Page details:', details);
  await page.screenshot({ path: 'dictation_live_loaded.png' });
  console.log('Saved dictation_live_loaded.png');

  await browser.close();
})();
