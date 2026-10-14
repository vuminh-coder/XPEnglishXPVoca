const fs = require('fs');
const https = require('https');

const transcriptData = JSON.parse(fs.readFileSync('scripts/coco_transcript_full.json', 'utf8'));
const track = transcriptData.captionTracks[0];

if (!track || !track.baseUrl) {
  console.error('No caption track found');
  process.exit(1);
}

const url = track.baseUrl + '&fmt=json3';
console.log('Fetching captions from:', url);

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Successfully fetched json3 captions! Events count:', json.events ? json.events.length : 0);
      fs.writeFileSync('scripts/coco_captions_json3.json', JSON.stringify(json, null, 2), 'utf8');
      console.log('Saved to scripts/coco_captions_json3.json');
    } catch (e) {
      console.log('XML or other format. Raw length:', data.length);
      fs.writeFileSync('scripts/coco_captions_raw.txt', data, 'utf8');
    }
  });
}).on('error', err => console.error(err));
