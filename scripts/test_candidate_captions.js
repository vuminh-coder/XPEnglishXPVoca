async function testVideo(id, title) {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    const captionMatch = html.match(/"captionTracks":\s*(\[[^\]]+\])/);
    if (!captionMatch) {
      console.log(`[${id}] ${title}: NO captionTracks`);
      return null;
    }
    const tracks = JSON.parse(captionMatch[1]);
    const enTrack = tracks.find(t => t.languageCode === 'en' || t.vssId?.includes('.en'));
    if (!enTrack) {
      console.log(`[${id}] ${title}: No EN track. Available:`, tracks.map(t => t.languageCode).join(', '));
      return null;
    }
    console.log(`[${id}] ${title}: FOUND EN TRACK ->`, enTrack.name?.simpleText, enTrack.vssId);
    
    // Fetch json3
    const subRes = await fetch(enTrack.baseUrl + '&fmt=json3');
    const json3 = await subRes.json();
    console.log(`  Events count: ${json3.events?.length}`);
    return { id, title, eventsCount: json3.events?.length, json3 };
  } catch (err) {
    console.log(`[${id}] Error: ${err.message}`);
    return null;
  }
}

async function main() {
  const vids = [
    { id: 'iG9CE55wbtY', title: 'Sir Ken Robinson: Do schools kill creativity?' },
    { id: 'eIho2S0ZahI', title: 'Julian Treasure: How to speak so that people want to listen' },
    { id: 'arj7oStGLkU', title: 'Tim Urban: Inside the mind of a master procrastinator' },
    { id: 'c0KYU2j0TM4', title: 'Susan Cain: The power of introverts' },
    { id: 'kP15q815Saw', title: 'Catharine Young: How memories form' },
  ];

  for (const v of vids) {
    await testVideo(v.id, v.title);
  }
}

main();
