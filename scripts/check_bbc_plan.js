const segments = [
  { orderIndex: 1, startTime: 0.20, endTime: 6.60, text: 'From BBC Learning English, this is Learning English from the News, our podcast about the news headlines.' },
  { orderIndex: 2, startTime: 7.00, endTime: 13.10, text: 'In this programme, first treasure recovered from $20 billion sunken ship.' },
  { orderIndex: 3, startTime: 16.20, endTime: 18.50, text: "Hello, I'm Georgie. And I'm Phil." },
  { orderIndex: 4, startTime: 18.80, endTime: 24.90, text: 'In this programme, we look at one big news story and the vocabulary in the headlines that will help you understand it.' },
  { orderIndex: 5, startTime: 25.20, endTime: 33.30, text: 'You can find all the vocabulary and headlines from this episode, as well as a worksheet on our website, bbclearningenglish.com.' },
  { orderIndex: 6, startTime: 33.60, endTime: 36.60, text: "OK, Phil, let's hear more about this story." },
  { orderIndex: 7, startTime: 41.70, endTime: 49.30, text: 'A cannon, three coins and a porcelain cup have been recovered from a ship that sank over 300 years ago.' },
  { orderIndex: 8, startTime: 49.60, endTime: 56.40, text: 'The ship, called the San Jose, was sunk by British ships in 1708 near Cartagena in Colombia.' },
  { orderIndex: 9, startTime: 56.70, endTime: 64.20, text: 'The ship is thought to have $20 billion worth of gold and silver coins on board, according to some estimates.' },
  { orderIndex: 10, startTime: 64.50, endTime: 72.00, text: 'Colombia, Spain, an American company and indigenous groups in Bolivia have all claimed that this treasure belongs to them.' },
  { orderIndex: 11, startTime: 72.30, endTime: 78.80, text: 'Colombian scientists located the ship in 2015 and launched an expedition to explore it last year.' },
  { orderIndex: 12, startTime: 79.10, endTime: 83.80, text: "Let's have our first headline. This one is from Fox Weather, an American broadcaster." },
  { orderIndex: 13, startTime: 84.10, endTime: 89.70, text: 'Archeologists recover treasures from the legendary 1708 San Jose, wrecked in war.' }
];

console.log('Total segments:', segments.length);
let minGap = 999;
let hasOverlap = false;

for (let i = 0; i < segments.length; i++) {
  const s = segments[i];
  const dur = (s.endTime - s.startTime).toFixed(2);
  let gapStr = '';
  if (i > 0) {
    const gap = s.startTime - segments[i-1].endTime;
    if (gap < minGap) minGap = gap;
    if (gap <= 0) hasOverlap = true;
    gapStr = ' | Gap: ' + gap.toFixed(2) + 's';
  }
  console.log(`[${s.orderIndex}] ${s.startTime.toFixed(2)}s -> ${s.endTime.toFixed(2)}s (${dur}s)${gapStr}`);
}

console.log('Min gap:', minGap.toFixed(2) + 's');
console.log('Has overlap:', hasOverlap);
