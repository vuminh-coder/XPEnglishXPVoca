const http = require('http');

http.get('http://localhost:3000/study/dictation/video?id=vid_psychology_of_money', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Data length:', data.length);
    console.log('Data snippet:', data.slice(0, 1000));
  });
}).on('error', err => {
  console.error('Fetch error:', err.message);
});
