const https = require('https');

async function getCaptions(videoId) {
  const url = 'https://www.youtube.com/watch?v=' + videoId;
  const html = await new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });

  const m = html.match(/"captionTracks":\s*(\[.*?\])/);
  if (!m) {
    console.log('No captionTracks found in HTML for', videoId);
    return;
  }
  const tracks = JSON.parse(m[1]);
  console.log('Available tracks:', tracks.map(t => ({ lang: t.languageCode, name: t.name?.simpleText })));
  
  const enTrack = tracks.find(t => t.languageCode === 'en') || tracks[0];
  if (enTrack) {
    const timedTextUrl = enTrack.baseUrl + '&fmt=json3';
    console.log('Fetching timedTextUrl:', timedTextUrl.slice(0, 100));
    const jsonStr = await new Promise((resolve, reject) => {
      https.get(timedTextUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log('Status code:', res.statusCode, 'Data length:', data.length);
          resolve(data);
        });
        res.on('error', reject);
      });
    });
    console.log('Data preview:', jsonStr.slice(0, 300));
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      console.log('JSON parse error. Raw data:', jsonStr);
      return;
    }
    console.log('Total events in caption track:', parsed.events?.length);
    const textLines = parsed.events.filter(e => e.segs).map(e => ({
      t: e.tStartMs / 1000,
      d: e.dDurationMs / 1000,
      text: e.segs.map(s => s.utf8).join('').replace(/\n/g, ' ')
    }));
    console.log('First 20 lines:\n', JSON.stringify(textLines.slice(0, 20), null, 2));
    if (textLines.length > 20) {
      console.log('Next lines:\n', JSON.stringify(textLines.slice(20, 40), null, 2));
    }
  }
}

getCaptions(process.argv[2] || 'lpLFjQ-bRv8');
