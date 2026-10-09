async function testUrl() {
  const res = await fetch(`https://www.youtube.com/watch?v=eIho2S0ZahI`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  const captionMatch = html.match(/"captionTracks":\s*(\[[^\]]+\])/);
  const tracks = JSON.parse(captionMatch[1]);
  const enTrack = tracks.find(t => t.languageCode === 'en' || t.vssId?.includes('.en'));
  console.log('Base URL:', enTrack.baseUrl);

  // Try fetching without fmt
  const r1 = await fetch(enTrack.baseUrl);
  const t1 = await r1.text();
  console.log('XML length:', t1.length, 'snippet:', t1.slice(0, 300));

  // Try fetching with fmt=json3
  const r2 = await fetch(enTrack.baseUrl + '&fmt=json3');
  const t2 = await r2.text();
  console.log('JSON3 length:', t2.length, 'snippet:', t2.slice(0, 300));
}

testUrl();
