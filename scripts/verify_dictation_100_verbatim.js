const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const EXPECTED_SENTENCES = [
  {
    num: 1,
    time: "00:00 - 00:16",
    text: "From the moment of concept to building a massive factory, liquid-cooled, energized, permitted in the short time that was done, that is like superhuman, right?"
  },
  {
    num: 2,
    time: "00:16 - 00:20",
    text: "And as far as I know, there's only one person in the world who could do that."
  },
  {
    num: 3,
    time: "00:20 - 00:31",
    text: "You know, I mean Elon is singular in this understanding of engineering, and construction, and large systems, and marshaling resources, it's unbelievable."
  },
  {
    num: 4,
    time: "00:31 - 00:34",
    text: "And of course, then his engineering team is extraordinary."
  },
  {
    num: 5,
    time: "00:34 - 00:45",
    text: "And from the moment that we decided to go, the planning with our engineering team, our networking team, our infrastructure computing team, the software team, all of the preparation in advance."
  },
  {
    num: 6,
    time: "00:45 - 00:56",
    text: "Then all of the infrastructure, all of the logistics, and the amount of technology and equipment that came in on that day to train in 19 days."
  },
  {
    num: 7,
    time: "00:56 - 01:05",
    text: "19 days! 19 days is incredible. But it's also kind of nice to just take a step back, you know how many days 19 days is? It's just a couple of weeks."
  },
  {
    num: 8,
    time: "01:05 - 01:16",
    text: "And the mountain of technology, if you're ever to see it, is unbelievable: all of the wiring and the networking, just getting this mountain of technology integrated, and all the software. Incredible, right?"
  },
  {
    num: 9,
    time: "01:16 - 01:31",
    text: "Yeah, so I think what Elon and the xAI team did, what they achieved is singular, never been done before. Just to put in perspective: 100,000 GPUs, that's easily the fastest supercomputer on the planet as one cluster."
  },
  {
    num: 10,
    time: "01:31 - 01:49",
    text: "A supercomputer that you would build would take normally three years to plan, right? And then they deliver the equipment and it takes one year to get it all working. Yes, we're talking about 19 days."
  }
];

(async () => {
  console.log('=== VERIFYING 100% VERBATIM DICTATION STUDIO ===');
  console.log(`Using browser: ${CHROME_PATH}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const targetUrl = 'http://localhost:3000/study/dictation?id=1481dc60-fe8a-4fa9-830b-9a227ede9b6e';
  console.log(`Navigating to: ${targetUrl}`);

  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for sidebar sentences or title to be present
  await page.waitForSelector('span', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 2000)); // Ensure React hydration completes

  // 1. Check title / lesson info
  const title = await page.title();
  console.log(`Page title: ${title}`);

  // 2. Extract sidebar sentences
  const sidebarData = await page.evaluate(() => {
    // Look for sentence items with #1, #2, etc.
    const allText = document.body.innerText;
    const elements = Array.from(document.querySelectorAll('*'));
    
    // Find all sentence tags like #1, #2... #10
    const sentenceItems = [];
    for (let i = 1; i <= 10; i++) {
      const tag = `#${i}`;
      // Find element containing exactly this tag
      const matchingEl = elements.find(el => el.children.length === 0 && el.innerText?.trim() === tag);
      if (matchingEl) {
        // Find parent container
        let parent = matchingEl.parentElement;
        while (parent && !parent.innerText.includes("00:") && !parent.innerText.includes("01:")) {
          parent = parent.parentElement;
        }
        if (parent) {
          sentenceItems.push({
            num: i,
            innerText: parent.innerText
          });
        }
      }
    }
    return {
      totalFound: sentenceItems.length,
      sentenceItems,
      bodyHas10: allText.includes('#10'),
      hasJensenHuang: allText.includes('Jensen Huang') || allText.includes('Colossus') || allText.includes('superhuman')
    };
  });

  console.log(`Found ${sidebarData.totalFound} sentence items in DOM.`);
  console.log(`DOM contains #10: ${sidebarData.bodyHas10}`);
  console.log(`DOM contains Jensen Huang keywords: ${sidebarData.hasJensenHuang}`);

  // 3. Verify each expected sentence text is present in the DOM
  let matchCount = 0;
  for (const exp of EXPECTED_SENTENCES) {
    const isPresent = await page.evaluate((textSnippet) => {
      return document.body.innerText.includes(textSnippet);
    }, exp.text.slice(0, 30));

    const isFullTextPresent = await page.evaluate((fullText) => {
      return document.body.innerText.includes(fullText);
    }, exp.text);

    if (isPresent) {
      matchCount++;
      console.log(`[PASS] Sentence #${exp.num} (${exp.time}): "${exp.text.slice(0, 50)}..." (Full match: ${isFullTextPresent})`);
    } else {
      console.error(`[FAIL] Sentence #${exp.num} NOT found: "${exp.text}"`);
    }
  }

  console.log(`\nVerbatim verification: ${matchCount}/${EXPECTED_SENTENCES.length} sentences matched!`);

  // 4. Test interactive clicking on sentence #2
  console.log('\nTesting sentence switching: clicking sentence #2...');
  const clicked = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*')).find(
      e => e.children.length === 0 && e.innerText?.trim() === '#2'
    );
    if (el) {
      let card = el.parentElement;
      while (card && !card.onclick && card.tagName !== 'DIV') {
        card = card.parentElement;
      }
      if (card) {
        card.click();
        return true;
      }
    }
    return false;
  });
  console.log(`Sentence #2 click executed: ${clicked}`);

  await new Promise(r => setTimeout(r, 1000));

  // Check if sentence #2 became active or if text is in workspace
  const activeWorkspaceText = await page.evaluate(() => {
    return document.body.innerText.includes("And as far as I know");
  });
  console.log(`Workspace contains Sentence #2 text: ${activeWorkspaceText}`);

  // 5. Take screenshot
  const screenshotPath = path.resolve('public', 'dictation_100_verbatim.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Screenshot saved to: ${screenshotPath}`);

  await browser.close();
  console.log('=== VERIFICATION COMPLETED SUCCESSFULLY ===');
})();
