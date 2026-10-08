async function testCaptions() {
  const videoId = '5MuIMqhT8DM';
  const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  const captionMatch = html.match(/"captionTracks":\s*(\[[^\]]+\])/);
  if (!captionMatch) return console.log('no captions');
  const tracks = JSON.parse(captionMatch[1]);
  const enTrack = tracks.find(t => t.vssId === '.en' || t.languageCode === 'en');
  console.log('Selected track:', enTrack.vssId, enTrack.baseUrl);

  // fetch text (XML or JSON)
  const subRes = await fetch(enTrack.baseUrl);
  const text = await subRes.text();
  console.log('Response length:', text.length);
  console.log('Response snippet:', text.substring(0, 500));
}

testCaptions();
