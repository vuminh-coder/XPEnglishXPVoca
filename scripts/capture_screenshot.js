const { spawnSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');
const target = path.resolve(__dirname, '../public/dictation_ted_100_verbatim.png');

const args = [
  '--headless',
  '--disable-gpu',
  '--virtual-time-budget=6000',
  `--screenshot=${target}`,
  '--window-size=1440,900',
  'http://localhost:3000/study/dictation/video?id=vid_ted_bilingual_brain'
];

const res = spawnSync(chromePath, args, { stdio: 'inherit' });
console.log('Capture exited with status:', res.status);
