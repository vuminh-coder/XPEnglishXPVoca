const { spawnSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');

const targetDesktop = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_ziczac_desktop.png';
const targetMobile = 'C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\75160da0-6646-41c9-817c-8e932ebd6caa\\roadmap_ziczac_mobile.png';

// Desktop
console.log('Capturing desktop screenshot...');
spawnSync(chromePath, [
  '--headless',
  '--disable-gpu',
  '--virtual-time-budget=8000',
  `--screenshot=${targetDesktop}`,
  '--window-size=1440,1050',
  'http://localhost:3000/roadmap'
], { stdio: 'inherit' });

// Mobile
console.log('Capturing mobile screenshot...');
spawnSync(chromePath, [
  '--headless',
  '--disable-gpu',
  '--virtual-time-budget=8000',
  `--screenshot=${targetMobile}`,
  '--window-size=390,844',
  'http://localhost:3000/roadmap'
], { stdio: 'inherit' });

console.log('Finished capturing screenshots!');
