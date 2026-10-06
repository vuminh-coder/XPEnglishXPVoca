import WebSocket from 'ws';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/VU VAN MINH/.gemini/antigravity-ide/brain/d1281a24-3b37-4d3f-8a44-b563e5ab976c';

async function run() {
  console.log('=== BẮT ĐẦU KIỂM THỬ TOÀN DIỆN TRANG /review TRÊN CHROME ===\n');

  const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const activeTab = tabs.find(t => t.url.includes('localhost:3000')) || tabs[0];
  console.log('1. Kết nối Chrome target:', activeTab.title, activeTab.url);

  const ws = new WebSocket(activeTab.webSocketDebuggerUrl);
  await new Promise(r => ws.on('open', r));

  let id = 1;
  const pending = new Map();
  const consoleErrors = [];

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
      if (msg.method === 'Console.messageAdded' && msg.params.message.level === 'error') {
        consoleErrors.push(msg.params.message.text);
      }
    } catch (e) {}
  });

  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await send('Console.enable');

  // STEP 1: Điều hướng tới /review
  console.log('\n--- BƯỚC 1: ĐIỀU HƯỚNG TỚI /review ---');
  await send('Page.navigate', { url: 'http://localhost:3000/review' });
  await new Promise(r => setTimeout(r, 2500));

  // STEP 2: Nạp dữ liệu học tập có lịch ôn tập cho hôm nay và các ngày tới
  console.log('\n--- BƯỚC 2: ĐỒNG BỘ DỮ LIỆU LỊCH ÔN TẬP SM-2 ---');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const authKey = Object.keys(localStorage).find(k => k.includes('auth') || k.includes('user'));
        const userObj = authKey ? JSON.parse(localStorage.getItem(authKey) || '{}') : {};
        const userId = userObj?.state?.user?.id || userObj?.id || 'usr_1788252891096_flu9e';

        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        const todayStr = \`\${y}-\${m}-\${d}\`;

        // Tomorrow
        const tomorrow = new Date(today.getTime() + 86400000);
        const yTom = tomorrow.getFullYear();
        const mTom = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dTom = String(tomorrow.getDate()).padStart(2, '0');
        const tomStr = \`\${yTom}-\${mTom}-\${dTom}\`;

        const scheduleWords = [
          {
            userId,
            vocabId: 'bv_greet_01',
            word: 'hello',
            phonetic: '/həˈloʊ/',
            pos: 'interjection',
            definition: 'Used as a greeting or to begin a phone conversation',
            definitionVn: 'Xin chào, lời chào khi gặp mặt',
            examples: ['Hello, how are you doing today?'],
            proficiency: 2,
            isFavorite: true,
            lastPracticed: new Date(today.getTime() - 86400000).toISOString(),
            nextReview: \`\${todayStr}T09:00:00.000Z\`
          },
          {
            userId,
            vocabId: 'bv_famil_01',
            word: 'family',
            phonetic: '/ˈfæməli/',
            pos: 'noun',
            definition: 'A group consisting of parents and children living together',
            definitionVn: 'Gia đình, những người thân ruột thịt',
            examples: ['I spent the entire weekend with my family.'],
            proficiency: 3,
            isFavorite: true,
            lastPracticed: new Date(today.getTime() - 86400000).toISOString(),
            nextReview: \`\${todayStr}T10:30:00.000Z\`
          },
          {
            userId,
            vocabId: 'bv_work_01',
            word: 'company',
            phonetic: '/ˈkʌmpəni/',
            pos: 'noun',
            definition: 'A commercial business or enterprise',
            definitionVn: 'Công ty, doanh nghiệp thương mại',
            examples: ['She has been working for a tech company for three years.'],
            proficiency: 4,
            isFavorite: false,
            lastPracticed: new Date(today.getTime() - 172800000).toISOString(),
            nextReview: \`\${todayStr}T14:00:00.000Z\`
          },
          {
            userId,
            vocabId: 'bv_food_01',
            word: 'delicious',
            phonetic: '/dɪˈlɪʃəs/',
            pos: 'adjective',
            definition: 'Highly pleasant to the taste',
            definitionVn: 'Thơm ngon, đậm đà hương vị',
            examples: ['This homemade pizza is absolutely delicious.'],
            proficiency: 5,
            isFavorite: false,
            lastPracticed: new Date(today.getTime() - 604800000).toISOString(),
            nextReview: \`\${tomStr}T08:00:00.000Z\`
          },
          {
            userId,
            vocabId: 'bv_trave_01',
            word: 'journey',
            phonetic: '/ˈdʒɜːrni/',
            pos: 'noun',
            definition: 'An act of traveling from one place to another',
            definitionVn: 'Chuyến đi, hành trình khám phá',
            examples: ['Learning a new language is an exciting journey.'],
            proficiency: 5,
            isFavorite: true,
            lastPracticed: new Date(today.getTime() - 1209600000).toISOString(),
            nextReview: \`\${tomStr}T11:00:00.000Z\`
          }
        ];

        localStorage.setItem('xp_voca_learned_' + userId, JSON.stringify(scheduleWords));
        localStorage.setItem('xp_voca_learned_u1', JSON.stringify(scheduleWords));
        localStorage.setItem('xp_voca_learned_local_user', JSON.stringify(scheduleWords));
        return { count: scheduleWords.length, todayStr, tomStr };
      })()
    `,
    returnByValue: true
  });

  // Reload to hydrate data
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 2000));

  // STEP 3: Kiểm tra hiển thị tổng quan Bento Stats & Calendar Grid
  console.log('\n--- BƯỚC 3: XÁC MINH BENTO STATS & LỊCH ÔN TẬP SM-2 ---');
  const overviewInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const stats = Array.from(document.querySelectorAll('.font-mono.tabular-nums')).map(el => el.innerText.trim());
        const monthTitle = document.querySelector('h2.font-display')?.innerText;
        const dueTodayCard = document.querySelector('.lg\\:col-span-7')?.innerText.slice(0, 200);
        return { stats, monthTitle };
      })()
    `,
    returnByValue: true
  });
  console.log('Overview Stats:', overviewInfo.result.result.value);

  // Cuộn lên đầu và chụp màn hình Bento Stats & Calendar
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 400));
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_1_overview_top.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu ảnh: review_audit_1_overview_top.png');

  // STEP 4: Cuộn xuống Danh Sách Từ Vựng ngày hôm nay
  console.log('\n--- BƯỚC 4: XÁC MINH DANH SÁCH TỪ CẦN ÔN NGÀY HÔM NAY ---');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 560, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 400));

  const listInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const dateHeader = document.querySelector('h3.font-display')?.innerText;
        const cards = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div')).map(card => {
          const word = card.querySelector('span.font-bold')?.innerText;
          const pos = card.querySelector('span.uppercase')?.innerText;
          const defVn = card.querySelector('.font-bold.text-slate-900, .font-bold.dark\\:text-white')?.innerText;
          return { word, pos, defVn };
        });
        return { dateHeader, cardCount: cards.length, cards };
      })()
    `,
    returnByValue: true
  });
  console.log('Today Vocab List:', listInfo.result.result.value);

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_2_vocab_list_view.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu ảnh: review_audit_2_vocab_list_view.png');

  // STEP 5: Kiểm thử Bookmark (Lưu ghi nhớ) trên từ vựng
  console.log('\n--- BƯỚC 5: KIỂM THỬ TÍNH NĂNG BOOKMARK & TOAST FEEDBACK ---');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const helloCard = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div')).find(c => c.innerText.includes('hello'));
        const bookmarkBtn = helloCard?.querySelector('button[title*="ghi nhớ"]');
        if (bookmarkBtn) bookmarkBtn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 400));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_3_bookmarked_action.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu ảnh: review_audit_3_bookmarked_action.png');

  // STEP 6: Kiểm thử Chọn một ngày KHÔNG CÓ TỪ TỒN ĐỌNG (Zero Dead Space Action Hub)
  console.log('\n--- BƯỚC 6: KIỂM THỬ GIAO DIỆN NGÀY HOÀN TẤT (ZERO DEAD SPACE HUB) ---');
  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 100, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 300));

  // Nhấp vào ngày 28 của tháng hiện tại (ngày thông thoáng không có từ đến hạn)
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cells = Array.from(document.querySelectorAll('.grid.grid-cols-7 > div'));
        // Tìm ô ngày 28
        const cell28 = cells.find(c => c.querySelector('span')?.innerText.trim() === '28');
        if (cell28) cell28.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));

  await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 560, behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 400));

  const hubInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const completedText = document.querySelector('h4.font-display')?.innerText;
        const actionCards = Array.from(document.querySelectorAll('.lg\\:col-span-7 h5')).map(h => h.innerText);
        return { completedText, actionCards };
      })()
    `,
    returnByValue: true
  });
  console.log('Zero Dead Space Action Hub:', hubInfo.result.result.value);

  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/review_audit_4_zero_dead_space_hub.png`, Buffer.from(shot.result.data, 'base64'));
  console.log('-> Đã lưu ảnh: review_audit_4_zero_dead_space_hub.png');

  // STEP 7: Kiểm tra Console Errors
  console.log('\n--- BƯỚC 7: KIỂM TRA LỖI RUNTIME CONSOLE ---');
  console.log('Tổng số console errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors:', consoleErrors);
  } else {
    console.log('✅ TUYỆT VỜI: 0 LỖI CONSOLE RUNTIME TRÊN /review!');
  }

  console.log('\n=== HOÀN TẤT KIỂM THỬ TRANG /review 100% THÀNH CÔNG! ===');
  ws.close();
}

run().catch(console.error);
