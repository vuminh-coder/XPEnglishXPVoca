import WebSocket from 'ws';

async function run() {
  const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const activeTab = tabs.find(t => t.url.includes('localhost:3000')) || tabs[0];
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

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const localLearned = Object.keys(localStorage)
          .filter(k => k.includes('learned') || k.includes('vocab'))
          .map(k => ({ key: k, val: localStorage.getItem(k)?.slice(0, 300) }));
        const cardsCount = document.querySelectorAll('.grid > div').length;
        const mainText = document.querySelector('main')?.innerText || document.body.innerText;
        return {
          localLearned,
          cardsCount,
          mainTextSample: mainText.slice(0, 600)
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Result:', JSON.stringify(res.result.value, null, 2));
  ws.close();
}

run().catch(console.error);
