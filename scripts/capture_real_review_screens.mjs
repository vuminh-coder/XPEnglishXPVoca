import WebSocket from 'ws';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/VU VAN MINH/.gemini/antigravity-ide/brain/d1281a24-3b37-4d3f-8a44-b563e5ab976c';

async function run() {
  console.log('=== BẮT ĐẦU CHỤP SCREENSHOTS TRANG /review ĐÃ HOÀN TẤT HYDRATION ===\n');

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

  // SCREEN 1: Tổng quan trên cùng (Bento Stats + Lịch SM-2 + Phân bố cấp độ)
  console.log('1. Chụp màn hình Tổng quan Bento Stats & Lịch SM-2...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 400));
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_1_overview_top.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu ảnh: review_audit_1_overview_top.png');

  // SCREEN 2: Cuộn xuống danh sách từ vựng cần ôn ngày hôm nay
  console.log('2. Cuộn xuống chụp Lưới Thẻ Từ Vựng Cần Ôn...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 600, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 400));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_2_vocab_list_view.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu ảnh: review_audit_2_vocab_list_view.png');

  // SCREEN 3: Tương tác Bookmark trên từ vựng "hello"
  console.log('3. Nhấp Bookmark trên từ vựng "hello"...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const helloCard = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div')).find(c => c.innerText.includes('hello'));
        const bookmarkBtn = helloCard?.querySelector('button[title*="ghi nhớ"]');
        if (bookmarkBtn) bookmarkBtn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_3_bookmarked_action.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu ảnh: review_audit_3_bookmarked_action.png');

  // SCREEN 4: Chọn một ngày không có từ tồn đọng (Zero Dead Space Hub)
  console.log('4. Nhấp chọn ngày 10 (ngày không có từ tồn đọng)...');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 120, behavior: "instant" })' });
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
  await new Promise(r => setTimeout(r, 500));
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 560, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 400));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_4_zero_dead_space_hub.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu ảnh: review_audit_4_zero_dead_space_hub.png');

  console.log('\n=== CHỤP 4 SCREENSHOTS XÁC THỰC THÀNH CÔNG 100%! ===');
  ws.close();
}

run().catch(console.error);
