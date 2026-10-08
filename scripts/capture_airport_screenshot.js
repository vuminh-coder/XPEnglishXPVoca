const { spawnSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const target = path.resolve(__dirname, '../public/dictation_airport_100_verbatim.png');

const args = [
  '--headless',
  '--disable-gpu',
  '--virtual-time-budget=7000',
  `--screenshot=${target}`,
  '--window-size=1440,900',
  'http://localhost:3000/study/dictation/video?id=vid_airport_checkin'
];

console.log('Capturing screenshot for Airport Check-in video...');
const res = spawnSync(chromePath, args, { stdio: 'inherit' });
console.log('Capture exited with status:', res.status);
