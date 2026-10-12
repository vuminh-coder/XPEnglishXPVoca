const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const tracks = JSON.parse(fs.readFileSync('scripts/lionking_captions.json', 'utf-8'));
  const track = tracks[0];
  if (!track || !track.baseUrl) {
    console.error('No caption track found!');
    return;
  }

  console.log('Downloading timedtext from:', track.baseUrl);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Navigate to timedtext URL with fmt=json3
  const jsonUrl = track.baseUrl + '&fmt=json3';
  await page.goto(jsonUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  
  const content = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('scripts/lionking_timedtext.json', content, 'utf-8');
  console.log(`Saved timedtext to scripts/lionking_timedtext.json (${content.length} bytes)`);

  // Also download default XML format
  await page.goto(track.baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  const xmlContent = await page.evaluate(() => document.body.innerText || document.documentElement.outerHTML);
  fs.writeFileSync('scripts/lionking_timedtext.xml', xmlContent, 'utf-8');
  console.log(`Saved XML to scripts/lionking_timedtext.xml (${xmlContent.length} bytes)`);

  await browser.close();
})();
