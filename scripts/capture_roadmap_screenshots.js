const path = require('path');
const puppeteer = require(path.join(process.cwd(), 'node_modules', 'puppeteer-core'));

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetDesktop = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_ziczac_desktop.png';
const targetMobile = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_ziczac_mobile.png';
const targetGuidebook = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_guidebook_modal.png';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Desktop
  console.log('Capturing desktop screenshot...');
  await page.setViewport({ width: 1440, height: 1050 });
  await page.goto('http://localhost:3000/roadmap', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: targetDesktop });

  // Desktop Popover on Step 1 Hover
  console.log('Capturing Step 1 Hover Popover screenshot...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Hover over the first node to trigger hover preview speech bubble
  const firstNode = await page.$('a[aria-label*="Chặng 1"]');
  if (firstNode) {
    await firstNode.hover();
  }
  await new Promise(r => setTimeout(r, 1000));
  const targetHoverPopover = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_hover_popover.png';
  await page.screenshot({ path: targetHoverPopover });

  // Direct Click Navigation on Step 1
  console.log('Testing direct 1-click navigation into lesson...');
  if (firstNode) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      firstNode.click()
    ]);
  }
  await new Promise(r => setTimeout(r, 2000));
  const targetDirectNav = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_direct_nav_lesson.png';
  await page.screenshot({ path: targetDirectNav });

  // Mobile
  console.log('Capturing mobile screenshot...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/roadmap', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: targetMobile });

  // Mobile scrolled to Unit 2 (Steps 9, 10, 11, 12)
  console.log('Capturing Unit 2 S-curve screenshot...');
  await page.evaluate(() => {
    // Scroll down to where Step 9 / Unit 2 is located
    window.scrollTo({ top: 1200, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  const targetUnit2 = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_unit2_ziczac_fixed.png';
  await page.screenshot({ path: targetUnit2 });

  await browser.close();
  console.log('Finished capturing screenshots!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
