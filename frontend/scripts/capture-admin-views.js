const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9234;
const ARTIFACT_DIR = "C:\\Users\\agzhe\\.gemini\\antigravity-ide\\brain\\b020bb0c-41e7-4647-bc59-71d59d7ece28";

async function run() {
  const tmpDir = fs.mkdtempSync('C:\\Users\\agzhe\\AppData\\Local\\Temp\\chrome-admin-');
  const chrome = spawn(CHROME, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1440,900',
    `--user-data-dir=${tmpDir}`,
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch(`http://127.0.0.1:${PORT}/json`);
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page') || tabs[0];

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    let id = 1;
    const req = (method, params = {}) => new Promise((resolve, reject) => {
      const msgId = id++;
      const onMsg = (evt) => {
        const d = JSON.parse(evt.data);
        if (d.id === msgId) {
          ws.removeEventListener('message', onMsg);
          if (d.error) reject(d.error);
          else resolve(d.result);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await new Promise(res => ws.onopen = res);

    await req('Page.enable');
    await req('Runtime.enable');
    await req('Network.enable');

    const capture = async (name) => {
      const { data } = await req('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, name), Buffer.from(data, 'base64'));
      console.log(`Saved: ${name}`);
    };

    // Set admin cookie & sessionStorage on every new document
    await req('Network.setCookie', {
      name: 'sb_admin',
      value: 'true',
      url: 'http://localhost:3000',
    });

    await req('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        sessionStorage.setItem('skill_bridge_admin', 'true');
        sessionStorage.setItem('skill_bridge_user', JSON.stringify({ email: 'admin@gmail.com', role: 'admin' }));
        document.cookie = "sb_admin=true; path=/";
      `
    });

    // 1. Admin Overview
    console.log("Navigating to Admin Overview...");
    await req('Page.navigate', { url: 'http://localhost:3000/admin' });
    await new Promise(r => setTimeout(r, 4000));
    await capture('admin-live-overview.png');

    // 2. Campus View
    console.log("Navigating to Campus View...");
    await req('Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Campus'))?.click();
      `
    });
    await new Promise(r => setTimeout(r, 2000));
    await capture('admin-campus-view.png');

    // 3. Approvals View
    console.log("Navigating to Approvals View...");
    await req('Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Approvals'))?.click();
      `
    });
    await new Promise(r => setTimeout(r, 2000));
    await capture('admin-approvals-view.png');

    // 4. Audit Logs View
    console.log("Navigating to Audit Logs View...");
    await req('Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Audit Logs'))?.click();
      `
    });
    await new Promise(r => setTimeout(r, 2000));
    await capture('admin-audit-logs.png');

    ws.close();
  } finally {
    chrome.kill();
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

run().catch(console.error);
