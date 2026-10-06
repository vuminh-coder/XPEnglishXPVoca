import WebSocket from 'ws';
import fs from 'fs';

async function run() {
  const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const activeTab = tabs.find(t => t.url.includes('localhost:3000')) || tabs[0];
  console.log('Connecting to:', activeTab.title, activeTab.url);
  const ws = new WebSocket(activeTab.webSocketDebuggerUrl);
  await new Promise(r => ws.on('open', r));

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    const handler = (data) => {
      const msg = JSON.parse(data);
      if (msg.id === msgId) {
        ws.off('message', handler);
        resolve(msg.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  // Enable Console to catch any runtime errors
  await send('Console.enable');
  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    if (msg.method === 'Console.messageAdded') {
      console.log('[Browser Console]', msg.params.message.level, msg.params.message.text);
    }
  });

  // Check what elements are on the page
  const domInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const h3s = Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
        const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean);
        const inputs = Array.from(document.querySelectorAll('input')).map(i => ({ placeholder: i.placeholder, val: i.value }));
        const cards = Array.from(document.querySelectorAll('.group')).map(c => {
          const word = c.querySelector('h3')?.innerText;
          const pos = c.querySelector('span')?.innerText;
          const def = c.querySelector('.text-sm')?.innerText;
          return { word, pos, def };
        });
        return {
          h3s,
          buttons,
          inputs,
          cards,
          scrollHeight: document.documentElement.scrollHeight,
          clientHeight: document.documentElement.clientHeight,
          scrollTop: document.documentElement.scrollTop
        };
      })()
    `,
    returnByValue: true
  });

  console.log('DOM Info:', JSON.stringify(domInfo.result.value, null, 2));

  // Scroll down to show cards in viewport
  await send('Runtime.evaluate', {
    expression: 'window.scrollTo({ top: 300, behavior: "instant" })'
  });
  await new Promise(r => setTimeout(r, 600));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/VU VAN MINH/.gemini/antigravity-ide/brain/d1281a24-3b37-4d3f-8a44-b563e5ab976c/myvocab_step3_scrolled.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved myvocab_step3_scrolled.png');

  ws.close();
}

run().catch(console.error);
