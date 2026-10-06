class ChromeCDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.pending = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            resolve(msg.result);
          }
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    const payload = JSON.stringify({ id, method, params });
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(payload);
    });
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || "Runtime exception");
    }
    return res.result?.value;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function testReactClick() {
  const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
  const page = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
  const cdp = new ChromeCDP(page.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  const info = await cdp.eval(`(() => {
    // Find HeaderPillContainer
    const pills = Array.from(document.querySelectorAll('button')).filter(b => b.title === 'Danh Sách' || b.innerText.includes('Danh Sách'));
    if (pills.length === 0) return { error: 'No pill found' };

    const pill = pills[0];
    
    // Simulate real pointer & mouse events
    const rect = pill.getBoundingClientRect();
    pill.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
    pill.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
    pill.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    return {
      title: pill.title,
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      outerHTML: pill.outerHTML
    };
  })()`);

  console.log("Pill info & clicked:", info);
  await new Promise(r => setTimeout(r, 1000));

  const after = await cdp.eval(`(() => {
    const activePill = document.querySelector('header span[title], div.w-full.h-14 span[title]')?.getAttribute('title');
    const allH3 = Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
    return { activePill, h3Count: allH3.length, allH3Sample: allH3.slice(0, 5) };
  })()`);

  console.log("After simulated click:", after);
  cdp.close();
}

testReactClick().catch(console.error);
