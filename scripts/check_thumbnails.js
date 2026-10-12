const https = require('https');
const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getFiles(fullPath, files);
    } else if (item.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

const allTs = getFiles('features/listening/data');
const lessons = [];

for (const file of allTs) {
  const content = fs.readFileSync(file, 'utf8');
  const externalIdMatches = Array.from(content.matchAll(/externalId:\s*["']([^"']+)["']/g));
  const titleMatches = Array.from(content.matchAll(/title:\s*["']([^"']+)["']/g));
  const thumbMatches = Array.from(content.matchAll(/thumbnailUrl:\s*["']([^"']+)["']/g));

  if (externalIdMatches.length > 0) {
    for (let i = 0; i < externalIdMatches.length; i++) {
      lessons.push({
        file: path.relative(process.cwd(), file),
        id: externalIdMatches[i][1],
        title: titleMatches[i] ? titleMatches[i][1] : 'Unknown',
        thumbnailUrl: thumbMatches[i] ? thumbMatches[i][1] : null,
      });
    }
  }
}

console.log('Total lessons found in data files:', lessons.length);

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve({
          statusCode: res.statusCode,
          length: buffer.length,
          contentType: res.headers['content-type']
        });
      });
    }).on('error', (err) => {
      resolve({ error: err.message, statusCode: 500, length: 0 });
    });
  });
}

(async () => {
  const badLessons = [];
  for (const l of lessons) {
    const thumbUrl = l.thumbnailUrl || ('https://img.youtube.com/vi/' + l.id + '/hqdefault.jpg');
    const res = await checkUrl(thumbUrl);
    // YouTube placeholder image is ~1097 bytes, 120x90, status 404 or length < 1500
    const isPlaceholder = res.statusCode === 404 || res.length <= 1500;
    if (isPlaceholder) {
      badLessons.push({ ...l, res });
      console.log(`❌ BAD [${res.statusCode} len=${res.length}]: "${l.title}" (ID: ${l.id}) in ${l.file}`);
    } else {
      console.log(`✅ OK [len=${res.length}]: "${l.title}" (ID: ${l.id})`);
    }
  }
  console.log('\n================ SUMMARY ================');
  console.log(`Found ${badLessons.length} bad lessons out of ${lessons.length}:`);
  badLessons.forEach((b, idx) => {
    console.log(`${idx + 1}. [${b.file}] ${b.title} -> id: "${b.id}" (status: ${b.res.statusCode}, len: ${b.res.length})`);
  });
})();
