class ChromeCDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.pending = new Map();
    this.logs = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === "Runtime.consoleAPICalled" || msg.method === "Runtime.exceptionThrown") {
          this.logs.push(msg);
        }
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

async function debugClick() {
  const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
  const page = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
  const cdp = new ChromeCDP(page.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  console.log("Navigating to /vocabulary/t_basic_greetings...");
  await cdp.send("Page.navigate", { url: "http://localhost:3000/vocabulary/t_basic_greetings" });
  await new Promise((r) => setTimeout(r, 2000));

  const check = await cdp.eval(`(() => {
    const allBtns = Array.from(document.querySelectorAll('button')).map(b => ({
      title: b.title,
      text: b.innerText.trim()
    }));

    const btn = Array.from(document.querySelectorAll('button')).find(b => b.title === 'Danh Sách' || b.innerText.includes('Danh Sách'));
    if (!btn) return { error: 'Button not found', allBtns };
    
    btn.click();
    return {
      clicked: true,
      btnTitle: btn.title,
      btnText: btn.innerText
    };
  })()`);

  console.log("Check after click:", JSON.stringify(check, null, 2));

  // Wait 1.5s and check what is displayed
  await new Promise((r) => setTimeout(r, 1500));

  const domAfter = await cdp.eval(`(() => {
    const h1 = document.querySelector('h1')?.innerText || '';
    const h2 = document.querySelector('h2')?.innerText || '';
    const h3 = Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
    const activePill = document.querySelector('.font-bold.text-slate-900, .bg-white.rounded-lg')?.innerText || '';
    const hasSearch = Boolean(document.querySelector('input[placeholder*=\"tìm từ\" i]'));
    const rows = document.querySelectorAll('div[class*=\"border-slate\"]').length;
    return { h1, h2, h3, activePill, hasSearch, rows };
  })()`);

  console.log("DOM After 1.5s:", JSON.stringify(domAfter, null, 2));

  cdp.close();
}

debugClick().catch(console.error);
