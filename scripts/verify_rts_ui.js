const puppeteer = require('puppeteer-core');

(async () => {
  console.log('Launching headless Chrome for Rewrite The Stars UI test...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const lessonUrl = 'http://localhost:3000/study/dictation?id=ff4c64b7-ea82-4963-a4f6-1ff808d929e6';
  console.log(`Navigating to: ${lessonUrl}...`);

  await page.goto(lessonUrl, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  try {
    await page.waitForFunction(
      () => document.body.innerText.includes("You know I want you, it's not a secret I try to hide."),
      { timeout: 15000 }
    );
    console.log('Sentence 1 text successfully appeared in DOM!');
  } catch (e) {
    console.log('Timeout waiting for text in DOM, continuing...');
  }

  await new Promise(r => setTimeout(r, 2000));

  const uiInfo = await page.evaluate(() => {
    const text = document.body.innerText;
    const cards = Array.from(document.querySelectorAll('div, button'))
      .filter(el => (el.innerText || '').startsWith('#') && (el.innerText || '').length > 15)
      .map(el => el.innerText.split('\n')[0]);
    return {
      hasSentence1: text.includes("You know I want you, it's not a secret I try to hide."),
      hasRtsTitle: text.includes('Rewrite The Stars'),
      cardsCount: cards.length,
      firstCard: cards[0]
    };
  });

  console.log('UI Info:', uiInfo);

  const screenshotPath = 'public/dictation_rts_100_verbatim.png';
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
