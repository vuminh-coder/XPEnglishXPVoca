async function getDurations() {
  const ids = ['5MuIMqhT8DM', 'SlTrn13aez4', '64R2MYUt394', 'ml8HHHgDxiE', '4ld9EP5yAX4', 'DOgVUMfcb7U'];
  for (const id of ids) {
    try {
      const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const html = await res.text();
      const match = html.match(/"approxDurationMs":\s*"(\d+)"/);
      const sec = match ? Math.round(parseInt(match[1]) / 1000) : 'unknown';
      console.log(`Video ${id}: duration = ${sec}s (${Math.floor(sec/60)}:${(sec%60).toString().padStart(2, '0')})`);
    } catch (e) {
      console.log(`Video ${id}: error ${e.message}`);
    }
  }
}

getDurations();
