async function searchYouTube(query) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();
  const videoIds = [];
  const regex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (!videoIds.includes(match[1])) {
      videoIds.push(match[1]);
    }
  }
  return videoIds;
}

async function run() {
  const queries = [
    'Talk About Food and Cooking in English Oxford Online English',
    'CareerVidz TELL ME ABOUT YOURSELF SEAT METHOD',
    'David Attenborough A Life On Our Planet official trailer',
    'Anton Ego review Ratatouille scene',
    'Warren Buffett The Psychology of Money'
  ];

  for (const q of queries) {
    const ids = await searchYouTube(q);
    console.log(`Query "${q}":`, ids.slice(0, 3));
  }
}

run();
