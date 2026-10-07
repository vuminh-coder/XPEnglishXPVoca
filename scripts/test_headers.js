async function testWithHeaders() {
  const videoId = "lpLFjQ-bRv8";
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const watchRes = await fetch(watchUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    }
  });
  const cookieHeader = watchRes.headers.get("set-cookie") || "";
  const html = await watchRes.text();
  const m = html.match(/"captionTracks":(\[.*?\])/);
  if (!m) return console.log("No caption tracks");
  const tracks = JSON.parse(m[1].replace(/\\u0026/g, "&"));
  const enTrack = tracks[0];

  const trackRes = await fetch(enTrack.baseUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "Referer": watchUrl,
      "Origin": "https://www.youtube.com",
      ...(cookieHeader ? { "Cookie": cookieHeader } : {})
    }
  });
  console.log("Status:", trackRes.status);
  const text = await trackRes.text();
  console.log("Length with headers:", text.length);
  if (text.length > 0) {
    console.log("Preview:", text.slice(0, 300));
  }
}

testWithHeaders().catch(console.error);
