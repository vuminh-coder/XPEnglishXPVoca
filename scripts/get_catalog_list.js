const http = require('http');

http.get('http://localhost:3000/api/video-catalog/lessons', res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const j = JSON.parse(data);
    console.log('Total lessons:', j.total);
    j.lessons.forEach((l, i) => {
      console.log(`[${i + 1}] ID: ${l.id} | ExternalId: ${l.externalId} | Level: ${l.cefrLevel} | Title: ${l.title} | Segments: ${l.totalSentences}`);
    });
  });
});
