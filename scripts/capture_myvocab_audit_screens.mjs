import WebSocket from 'ws';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/VU VAN MINH/.gemini/antigravity-ide/brain/d1281a24-3b37-4d3f-8a44-b563e5ab976c';

async function run() {
  console.log('=== CHỤP BẰNG CHỨNG KIỂM THỬ TRANG /myvocab TRÊN CHROME ===\n');

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

  // SCREEN 1: Tổng quan trên cùng (Bento stats + search bar)
  console.log('1. Chụp màn hình Tổng quan Bento Stats Bar...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 400));
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_1_overview_top.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu: myvocab_audit_1_overview_top.png');

  // SCREEN 2: Lưới thẻ từ vựng đầy đủ
  console.log('2. Cuộn xuống chụp Lưới Thẻ Từ Vựng...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 220, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 400));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_2_cards_grid.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu: myvocab_audit_2_cards_grid.png');

  // SCREEN 3: Tab Yêu thích
  console.log('3. Chuyển sang Tab Yêu thích (Favorite)...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Yêu thích'));
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_3_tab_favorite.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu: myvocab_audit_3_tab_favorite.png');

  // SCREEN 4: Tab Đang học
  console.log('4. Chuyển sang Tab Đang học (Learning)...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Đang học'));
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_4_tab_learning.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu: myvocab_audit_4_tab_learning.png');

  // SCREEN 5: Tab Đã thuộc
  console.log('5. Chuyển sang Tab Đã thuộc (Mastered)...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Đã thuộc'));
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_5_tab_mastered.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu: myvocab_audit_5_tab_mastered.png');

  // SCREEN 6: Live Search "Gia đình"
  console.log('6. Kiểm thử Live Search "Gia đình"...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const allBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Tất cả'));
        if (allBtn) allBtn.click();
        const input = document.querySelector('input');
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(input, 'Gia đình');
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      })()
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_6_live_search.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu: myvocab_audit_6_live_search.png');

  // SCREEN 7: Tương tác Ôn (+15 XP)
  console.log('7. Xóa tìm kiếm và tương tác Ôn (+15 XP)...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const input = document.querySelector('input');
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(input, '');
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      })()
    `
  });
  await new Promise(r => setTimeout(r, 400));
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const helloCard = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 > div')).find(c => c.querySelector('h3')?.innerText === 'hello');
        const practiceBtn = Array.from(helloCard?.querySelectorAll('button') || []).find(b => b.innerText.includes('Ôn'));
        if (practiceBtn) practiceBtn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_7_word_practiced.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu: myvocab_audit_7_word_practiced.png');

  console.log('\n=== HOÀN TẤT CHỤP 7 SCREENSHOTS BẰNG CHỨNG KIỂM THỬ THÀNH CÔNG! ===');
  ws.close();
}

run().catch(console.error);
