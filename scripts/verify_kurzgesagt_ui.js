const puppeteer = require('puppeteer-core');

(async () => {
  console.log('Launching headless Chrome for Kurzgesagt UI test...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const lessonUrl = 'http://localhost:3000/study/dictation?id=88c4fc17-4445-46f4-82d4-c51fbb56e859';
  console.log(`Navigating to: ${lessonUrl}...`);

  await page.goto(lessonUrl, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Wait for the transcript sidebar or sentence to appear
  try {
    await page.waitForFunction(
      () => document.body.innerText.includes('Could aliens destroy us from light years away?'),
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
      hasSentence1: text.includes('Could aliens destroy us from light years away?'),
      hasKurzgesagtTitle: text.includes('Kurzgesagt: How to Win an Interstellar War'),
      cardsCount: cards.length,
      firstCard: cards[0]
    };
  });

  console.log('UI Info:', uiInfo);

  const screenshotPath = 'public/dictation_kurzgesagt_100_verbatim.png';
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
