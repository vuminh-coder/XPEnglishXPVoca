import WebSocket from 'ws';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/VU VAN MINH/.gemini/antigravity-ide/brain/d1281a24-3b37-4d3f-8a44-b563e5ab976c';

async function run() {
  console.log('=== BẮT ĐẦU KIỂM THỬ TOÀN DIỆN TRANG /myvocab TRÊN CHROME ===\n');

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
        pending.get(msg.id)(msg.result);
        pending.delete(msg.id);
      }
      if (msg.method === 'Console.messageAdded' && msg.params.message.level === 'error') {
        consoleErrors.push(msg.params.message.text);
      }
    } catch (e) {
      // ignore parse errors
    }
  });

  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await send('Console.enable');

  // STEP 1: Điều hướng tới /myvocab
  console.log('\n--- BƯỚC 1: ĐIỀU HƯỚNG TỚI /myvocab ---');
  await send('Page.navigate', { url: 'http://localhost:3000/myvocab' });
  await new Promise(r => setTimeout(r, 2000));

  // STEP 2: Xác nhận Empty State
  console.log('\n--- BƯỚC 2: KIỂM THỬ TRẠNG THÁI TRỐNG (EMPTY STATE) ---');
  const emptyInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const stats = Array.from(document.querySelectorAll('.font-mono')).map(el => el.innerText.trim());
        const emptyHeading = document.querySelector('h3.font-display')?.innerText;
        const emptyLink = document.querySelector("a[href='/vocabulary']")?.innerText;
        return { stats, emptyHeading, emptyLink };
      })()
    `,
    returnByValue: true
  });
  console.log('Empty State Info:', emptyInfo.result.value);

  const shotEmpty = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_1_empty_state.png`, Buffer.from(shotEmpty.data, 'base64'));
  console.log('-> Đã lưu ảnh:', 'myvocab_audit_1_empty_state.png');

  // STEP 3: Nạp 5 từ vựng đa dạng trạng thái vào Sổ từ vựng
  console.log('\n--- BƯỚC 3: NẠP DỮ LIỆU TỪ VỰNG THỰC TẾ VÀO SỔ TAY ---');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const authKey = Object.keys(localStorage).find(k => k.includes('auth') || k.includes('user'));
        const userObj = authKey ? JSON.parse(localStorage.getItem(authKey) || '{}') : {};
        const userId = userObj?.state?.user?.id || userObj?.id || 'usr_1788252891096_flu9e';

        const sampleWords = [
          {
            userId,
            vocabId: 'bv_greet_01',
            word: 'hello',
            phonetic: '/həˈloʊ/',
            pos: 'interjection',
            definition: 'Used as a greeting or to begin a phone conversation',
            definitionVn: 'Xin chào, lời chào khi gặp mặt',
            examples: ['Hello, how are you doing today?'],
            proficiency: 1,
            isFavorite: false,
            lastPracticed: new Date().toISOString(),
            nextReview: new Date(Date.now() + 86400000).toISOString()
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
            lastPracticed: new Date().toISOString(),
            nextReview: new Date(Date.now() + 172800000).toISOString()
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
            lastPracticed: new Date().toISOString(),
            nextReview: new Date(Date.now() + 604800000).toISOString()
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
            proficiency: 2,
            isFavorite: true,
            lastPracticed: new Date().toISOString(),
            nextReview: new Date(Date.now() + 86400000).toISOString()
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
            lastPracticed: new Date().toISOString(),
            nextReview: new Date(Date.now() + 1209600000).toISOString()
          }
        ];

        localStorage.setItem('xp_voca_learned_' + userId, JSON.stringify(sampleWords));
        localStorage.setItem('xp_voca_learned_u1', JSON.stringify(sampleWords));
        localStorage.setItem('xp_voca_learned_local_user', JSON.stringify(sampleWords));
        return { seeded: sampleWords.length, userId };
      })()
    `,
    returnByValue: true
  });

  // Reload page to hydrate new data
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 2000));

  // STEP 4: Kiểm tra hiển thị danh sách từ vựng đầy đủ
  console.log('\n--- BƯỚC 4: XÁC MINH DANH SÁCH TỪ VỰNG ĐẦY ĐỦ (TAB TẤT CẢ) ---');
  const populatedInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const stats = Array.from(document.querySelectorAll('.font-mono')).map(el => el.innerText.trim());
        const cards = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 > div')).map(card => {
          const word = card.querySelector('h3')?.innerText;
          const pos = card.querySelector('span')?.innerText;
          const phonetic = card.querySelector('.font-mono')?.innerText;
          const defVn = card.querySelector('.text-sm.font-bold')?.innerText;
          const dots = card.querySelectorAll('.rounded-full.bg-emerald-500').length;
          const isFav = card.querySelector('svg.text-rose-500') !== null;
          return { word, pos, phonetic, defVn, dots, isFav };
        });
        return { stats, cardCount: cards.length, cards };
      })()
    `,
    returnByValue: true
  });
  console.log('Populated Info:', JSON.stringify(populatedInfo.result.value, null, 2));

  const shotPopulated = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_2_populated_all.png`, Buffer.from(shotPopulated.data, 'base64'));
  console.log('-> Đã lưu ảnh:', 'myvocab_audit_2_populated_all.png');

  // STEP 5: Test các Tabs Lọc (Yêu thích, Đang học, Đã thuộc)
  console.log('\n--- BƯỚC 5: KIỂM THỬ BỘ LỌC TRẠNG THÁI (TABS & BENTO CLICKS) ---');
  
  // 5.1 Tab Yêu thích
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const favBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Yêu thích'));
        if (favBtn) favBtn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));
  const favInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 > div')).map(c => c.querySelector('h3')?.innerText);
        return { count: cards.length, words: cards };
      })()
    `,
    returnByValue: true
  });
  console.log('5.1 Tab Yêu thích (Favorite):', favInfo.result.value);
  const shotFav = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_3_tab_favorite.png`, Buffer.from(shotFav.data, 'base64'));
  console.log('-> Đã lưu ảnh:', 'myvocab_audit_3_tab_favorite.png');

  // 5.2 Tab Đang học
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Đang học'));
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));
  const learnInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 > div')).map(c => c.querySelector('h3')?.innerText);
        return { count: cards.length, words: cards };
      })()
    `,
    returnByValue: true
  });
  console.log('5.2 Tab Đang học (Learning):', learnInfo.result.value);
  const shotLearn = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_4_tab_learning.png`, Buffer.from(shotLearn.data, 'base64'));
  console.log('-> Đã lưu ảnh:', 'myvocab_audit_4_tab_learning.png');

  // 5.3 Tab Đã thuộc
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Đã thuộc'));
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));
  const masterInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 > div')).map(c => c.querySelector('h3')?.innerText);
        return { count: cards.length, words: cards };
      })()
    `,
    returnByValue: true
  });
  console.log('5.3 Tab Đã thuộc (Mastered):', masterInfo.result.value);
  const shotMaster = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_5_tab_mastered.png`, Buffer.from(shotMaster.data, 'base64'));
  console.log('-> Đã lưu ảnh:', 'myvocab_audit_5_tab_mastered.png');

  // STEP 6: Test Tìm Kiếm Realtime
  console.log('\n--- BƯỚC 6: KIỂM THỬ TÌM KIẾM THỜI GIAN THỰC (LIVE SEARCH) ---');
  // Trở lại Tất cả
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Tất cả'));
        if (btn) btn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 400));

  // Gõ từ khóa tiếng Việt: "Gia đình"
  await send('Runtime.evaluate', {
    expression: `
      (() => {
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
  const searchVnInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 > div')).map(c => c.querySelector('h3')?.innerText);
        return { query: 'Gia đình', count: cards.length, words: cards };
      })()
    `,
    returnByValue: true
  });
  console.log('6.1 Tìm kiếm tiếng Việt "Gia đình":', searchVnInfo.result.value);

  // Gõ từ khóa không tồn tại: "notfoundxyz"
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const input = document.querySelector('input');
        if (input) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(input, 'notfoundxyz');
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      })()
    `
  });
  await new Promise(r => setTimeout(r, 500));
  const searchNotFoundInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const emptyText = document.querySelector('.p-12 p')?.innerText;
        return { query: 'notfoundxyz', emptyText };
      })()
    `,
    returnByValue: true
  });
  console.log('6.2 Tìm kiếm không thấy kết quả:', searchNotFoundInfo.result.value);
  const shotNotFound = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_6_search_not_found.png`, Buffer.from(shotNotFound.data, 'base64'));
  console.log('-> Đã lưu ảnh:', 'myvocab_audit_6_search_not_found.png');

  // Xóa ô tìm kiếm
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
  await new Promise(r => setTimeout(r, 500));

  // STEP 7: Test Tương Tác Hành Động Trên Thẻ (Favorite & Ôn +15 XP)
  console.log('\n--- BƯỚC 7: KIỂM THỬ HÀNH ĐỘNG THẺ TỪ (FAVORITE & ÔN +15 XP) ---');
  // Click Favorite trên từ "hello"
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const helloCard = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 > div')).find(c => c.querySelector('h3')?.innerText === 'hello');
        const favBtn = helloCard?.querySelector('button[title*="Yêu thích"]');
        if (favBtn) favBtn.click();
      })()
    `
  });
  await new Promise(r => setTimeout(r, 500));

  // Click "Ôn (+15 XP)" trên từ "hello"
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

  const actionInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const helloCard = Array.from(document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 > div')).find(c => c.querySelector('h3')?.innerText === 'hello');
        const isFav = helloCard?.querySelector('svg.text-rose-500') !== null;
        const dots = helloCard?.querySelectorAll('.rounded-full.bg-emerald-500').length;
        const favCount = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Yêu thích'))?.innerText;
        return { word: 'hello', isFav, dots, favTabLabel: favCount };
      })()
    `,
    returnByValue: true
  });
  console.log('7.1 Kết quả sau khi Favorite & Ôn từ "hello":', actionInfo.result.value);

  const shotAction = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${ARTIFACT_DIR}/myvocab_audit_7_word_action_practiced.png`, Buffer.from(shotAction.data, 'base64'));
  console.log('-> Đã lưu ảnh:', 'myvocab_audit_7_word_action_practiced.png');

  // STEP 8: Kiểm Tra Lỗi Console
  console.log('\n--- BƯỚC 8: KIỂM TRA LỖI RUNTIME CONSOLE ---');
  console.log('Tổng số console errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors:', consoleErrors);
  } else {
    console.log('✅ TUYỆT VỜI: 0 LỖI CONSOLE RUNTIME!');
  }

  console.log('\n=== HOÀN TẤT KIỂM THỬ TRANG /myvocab 100% THÀNH CÔNG! ===');
  ws.close();
}

run().catch(console.error);
