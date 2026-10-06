import WebSocket from 'ws';

async function run() {
  const tabs = await fetch('http://127.0.0.1:9222/json').then(r => r.json());
  const activeTab = tabs.find(t => t.url.includes('localhost:3000')) || tabs[0];
  const ws = new WebSocket(activeTab.webSocketDebuggerUrl);
  await new Promise(r => ws.on('open', r));

  let id = 1;
  const pending = new Map();
  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });

  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const portal = document.querySelector('nextjs-portal');
        const main = document.querySelector('main');
        const bodyText = document.body.innerText;
        return {
          hasPortal: Boolean(portal),
          portalHtml: portal ? portal.shadowRoot?.innerHTML || portal.innerHTML : null,
          mainHtml: main ? main.innerHTML.slice(0, 1000) : null,
          bodyTextSample: bodyText.slice(0, 500)
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Browser DOM state:', JSON.stringify(res?.result?.value || res, null, 2));
  ws.close();
}

run().catch(console.error);
