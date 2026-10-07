const fs = require('fs');

let mock = fs.readFileSync('features/listening/data/videoCatalogMockData.ts', 'utf8');
const id = '88c4fc17-4445-46f4-82d4-c51fbb56e859';
const firstIdx = mock.indexOf(id);
const secondIdx = mock.indexOf(id, firstIdx + 1);

if (secondIdx !== -1) {
  // find start and end of second object
  const objStart = mock.lastIndexOf('{', secondIdx);
  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < mock.length; i++) {
    if (mock[i] === '{') depth++;
    else if (mock[i] === '}') {
      depth--;
      if (depth === 0) {
        objEnd = i;
        if (mock[objEnd + 1] === ',') objEnd++;
        break;
      }
    }
  }
  mock = mock.substring(0, objStart) + mock.substring(objEnd + 1);
  fs.writeFileSync('features/listening/data/videoCatalogMockData.ts', mock, 'utf8');
  console.log('Successfully removed duplicate Kurzgesagt from videoCatalogMockData.ts');
} else {
  console.log('No duplicate found');
}
