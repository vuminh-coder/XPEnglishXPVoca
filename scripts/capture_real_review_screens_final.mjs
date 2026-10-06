import WebSocket from 'ws';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/VU VAN MINH/.gemini/antigravity-ide/brain/d1281a24-3b37-4d3f-8a44-b563e5ab976c';

async function run() {
  const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const activeTab = tabs.find(t => t.url.includes('localhost:3000')) || tabs[0];
  const ws = new WebSocket(activeTab.webSocketDebuggerUrl);
  await new Promise(r => ws.on('open', r));

  let id = 1;
  const pending = new Map();
  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    } catch (e) {}
  });

  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  // 1. Top view
  console.log('1. Chụp review_audit_1_overview_top.png...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await new Promise(r => setTimeout(r, 600));
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_1_overview_top.png`, Buffer.from(shot.result.data, 'base64'));

  // 2. List view
  console.log('2. Chụp review_audit_2_vocab_list_view.png...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 480)' });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_2_vocab_list_view.png`, Buffer.from(shot.result.data, 'base64'));

  // 3. Click bookmark on hello
  console.log('3. Chụp review_audit_3_bookmarked_action.png...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const helloCard = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div')).find(c => c.innerText.includes('hello'));
        const btn = helloCard?.querySelector('button[title*="ghi nhớ"]');
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_3_bookmarked_action.png`, Buffer.from(shot.result.data, 'base64'));

  // 4. Click day 10 for Zero Dead Space Hub
  console.log('4. Chụp review_audit_4_zero_dead_space_hub.png...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 100)' });
  await new Promise(r => setTimeout(r, 300));
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cells = Array.from(document.querySelectorAll('.grid.grid-cols-7 > div'));
        const cell10 = cells.find(c => c.querySelector('span')?.innerText.trim() === '10');
        if (cell10) cell10.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 520)' });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_4_zero_dead_space_hub.png`, Buffer.from(shot.result.data, 'base64'));

  console.log('=== TẤT CẢ 4 SCREENSHOTS ĐÃ LƯU THÀNH CÔNG! ===');
  ws.close();
}

run().catch(console.error);
