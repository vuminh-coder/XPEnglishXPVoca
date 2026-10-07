const http = require('http');

http.get('http://localhost:3000/api/listening/lessons', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const j = JSON.parse(d);
    const yt = (j.data || []).filter(l => l.videoMetadata?.externalId || (l.audioUrl && l.audioUrl.includes('youtube')));
    console.log('Total YouTube lessons in listening API:', yt.length);
    yt.forEach((l, i) => {
      console.log(`[${i + 1}] ID: ${l.id} | Ext: ${l.videoMetadata?.externalId} | Level: ${l.level || l.cefrLevel} | Title: ${l.title}`);
    });
  });
});
