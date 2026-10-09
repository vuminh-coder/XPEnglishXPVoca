export {};
import fs from "fs";

async function getCaptions(videoId: string) {
  const clients = [
    { clientName: "IOS", clientVersion: "19.29.1", userAgent: "com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X; en_US)" },
    { clientName: "ANDROID", clientVersion: "19.29.35", userAgent: "com.google.android.youtube/19.29.35 (Linux; U; Android 14; US) gzip" },
    { clientName: "WEB", clientVersion: "2.20240901.00.00", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
  ];

  for (const c of clients) {
    try {
      const res = await fetch("https://www.youtube.com/youtubei/v1/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": c.userAgent,
        },
        body: JSON.stringify({
          videoId,
          context: {
            client: {
              clientName: c.clientName,
              clientVersion: c.clientVersion,
              hl: "en",
              gl: "US",
            },
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        console.log(`[${videoId}] Client ${c.clientName} returned tracks:`, tracks?.map((t: any) => ({ lang: t.languageCode, vssId: t.vssId })));
        if (tracks && tracks.length > 0) {
          const enTrack = tracks.find((t: any) => t.languageCode === 'en' || t.vssId?.includes('.en'));
          if (enTrack) {
            console.log(`Success! BaseUrl: ${enTrack.baseUrl}`);
            const subRes = await fetch(enTrack.baseUrl + '&fmt=json3', {
              headers: { 'User-Agent': c.userAgent }
            });
            const subText = await subRes.text();
            if (subText.startsWith('{')) {
              return JSON.parse(subText);
            }
          }
        }
      }
    } catch (err: any) {
      console.log(`Client ${c.clientName} failed for ${videoId}:`, err.message);
    }
  }
  return null;
}

async function run() {
  const vid = "lpLFjQ-bRv8";
  console.log(`Fetching subs for Jensen Huang video ${vid}...`);
  const subs = await getCaptions(vid);
  if (subs && subs.events) {
    console.log(`>>> GOT SUBS FOR Jensen Huang! Events count: ${subs.events.length}`);
    fs.writeFileSync(`scripts/jensen_huang.en.json3`, JSON.stringify(subs, null, 2));
    console.log(`Saved scripts/jensen_huang.en.json3 successfully!`);
  } else {
    console.log("No subs returned from InnerTube.");
  }
}

run();
