async function testTimedText() {
  const videoId = "lpLFjQ-bRv8";
  const watchRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    }
  });
  const html = await watchRes.text();
  const m = html.match(/"captionTracks":(\[.*?\])/);
  if (!m) {
    console.log("No captionTracks in HTML");
    return;
  }
  const tracks = JSON.parse(m[1].replace(/\\u0026/g, "&"));
  console.log("Tracks found:", tracks.map(t => ({ lang: t.languageCode, vssId: t.vssId, kind: t.kind, name: t.name?.simpleText })));

  const enTrack = tracks.find(t => t.languageCode?.startsWith("en")) || tracks[0];
  console.log("Fetching track from:", enTrack.baseUrl);
  const trackRes = await fetch(enTrack.baseUrl);
  console.log("Track res status:", trackRes.status);
  const text = await trackRes.text();
  console.log("Track text length:", text.length, "Preview:", text.slice(0, 300));
}

testTimedText().catch(console.error);
