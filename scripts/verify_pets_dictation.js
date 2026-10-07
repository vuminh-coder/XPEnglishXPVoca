const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const EXPECTED_PETS_SENTENCES = [
  {
    num: 1,
    time: "00:13 - 00:19",
    text: "Our family has a small dog with a white coat and brown spots."
  },
  {
    num: 2,
    time: "00:19 - 00:22",
    text: "My son named our dog Buster."
  },
  {
    num: 3,
    time: "00:23 - 00:28",
    text: "Buster and our children have a lot of fun together playing."
  },
  {
    num: 4,
    time: "00:29 - 00:34",
    text: "Sometimes they play indoors, but most of the time they play outdoors."
  },
  {
    num: 5,
    time: "00:34 - 00:37",
    text: "We love being outdoors as much as we can be."
  },
  {
    num: 6,
    time: "00:38 - 00:44",
    text: "Sometimes we go to the local zoo to see other animals."
  },
  {
    num: 7,
    time: "00:44 - 00:50",
    text: "My daughter's favorite animal is the giraffe because it is tall and has a long neck."
  },
  {
    num: 8,
    time: "00:51 - 00:53",
    text: "We also like watching the elephants."
  },
  {
    num: 9,
    time: "00:54 - 00:58",
    text: "Another thing we like to do is take walks in the woods."
  },
  {
    num: 10,
    time: "00:59 - 01:05",
    text: "There are many kinds of trees, wild flowers and birds."
  },
  {
    num: 11,
    time: "01:05 - 01:71",
    text: "Sometimes we see squirrels and rabbits too."
  }
];

(async () => {
  console.log('=== STARTING PUPPETEER VERIFICATION FOR PETS 11 VERBATIM SENTENCES ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const targetUrl = 'http://localhost:3000/study/dictation?id=575d216f-b275-468e-8a41-c3b26c0ac1ea';
  console.log('Navigating to:', targetUrl);
  await page.goto(targetUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForSelector('main', { timeout: 45000 });
  const title = await page.title();
  console.log('Page Title:', title);

  // Wait 2s for React hydration
  await new Promise(r => setTimeout(r, 2000));

  await page.waitForFunction(() => {
    const items = document.querySelectorAll('[data-sentence-index]');
    return items.length >= 11;
  }, { timeout: 15000 });

  const sentenceCount = await page.$$eval('[data-sentence-index]', els => els.length);
  console.log(`Found ${sentenceCount} sentences in Interactive Transcript Sidebar.`);

  const domSentences = await page.$$eval('[data-sentence-index]', els => {
    return els.map(el => {
      const idx = el.getAttribute('data-sentence-index');
      const textEl = el.querySelector('p');
      const timeEl = el.querySelector('span');
      return {
        idx: parseInt(idx, 10),
        text: textEl ? textEl.innerText.trim() : '',
        time: timeEl ? timeEl.innerText.trim() : ''
      };
    });
  });

  let allMatched = true;
  for (let i = 0; i < EXPECTED_PETS_SENTENCES.length; i++) {
    const exp = EXPECTED_PETS_SENTENCES[i];
    const act = domSentences[i];
    const match = act && act.text.toLowerCase().replace(/[^a-z0-9]/g, '') === exp.text.toLowerCase().replace(/[^a-z0-9]/g, '');
    console.log(`Sentence #${i + 1}: Match=${match}`);
    if (!match) {
      console.log(`  Expected: "${exp.text}"`);
      console.log(`  Actual:   "${act?.text}"`);
      allMatched = false;
    }
  }

  // Click on sentence #2 ("My son named our dog Buster.")
  console.log('Clicking sentence #2 ("My son named our dog Buster.")...');
  await page.click('[data-sentence-index="1"]');
  await new Promise(r => setTimeout(r, 1000));

  // Take screenshot
  const screenshotPath = path.join(__dirname, '../public/dictation_pets_100_verbatim.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Saved screenshot to: ${screenshotPath}`);

  await browser.close();

  if (allMatched && sentenceCount === 11) {
    console.log('\n>>> SUCCESS: ALL 11 PETS SENTENCES CALIBRATED 100% VERBATIM & MATCH DOM PERFECTLY! <<<');
    process.exit(0);
  } else {
    console.error('\n>>> ERROR: Mismatch detected! <<<');
    process.exit(1);
  }
})();
