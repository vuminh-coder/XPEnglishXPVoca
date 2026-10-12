const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const checkVideo = async (id, title) => {
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/watch?v=${id}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    const data = await page.evaluate(() => {
      const resp = window.ytInitialPlayerResponse;
      const tracks = resp?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
      return {
        title: resp?.videoDetails?.title || '',
        lengthSeconds: resp?.videoDetails?.lengthSeconds || 0,
        hasCaptions: tracks.length > 0,
        tracks: tracks.map(t => ({ lang: t.languageCode, name: t.name?.simpleText, kind: t.kind }))
      };
    });
    console.log(`[${title} - ${id}] Title: ${data.title} | Duration: ${data.lengthSeconds}s | Captions: ${data.hasCaptions}`);
    console.log('Tracks:', JSON.stringify(data.tracks));
    await page.close();
  };

  await checkVideo('2Q1gTWxZcj0', 'Finding Dory (#9)');
  await checkVideo('SAY6Mptrj5s', 'Kung Fu Panda (#1)');

  await browser.close();
})();
