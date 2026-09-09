const http = require("http");
const fs = require("fs");
const path = require("path");

function getTarget() {
  return new Promise((resolve, reject) => {
    http.get("http://localhost:9222/json", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const targets = JSON.parse(data);
          const page = targets.find((t) => t.type === "page" && !t.url.startsWith("devtools://"));
          resolve(page || targets[0]);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function sendCDP(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 100000);
    const msg = JSON.stringify({ id, method, params });
    const handler = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === id) {
        ws.removeEventListener("message", handler);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };
    ws.addEventListener("message", handler);
    ws.send(msg);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const target = await getTarget();
  console.log("Connecting to target:", target.webSocketDebuggerUrl);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve));

  await sendCDP(ws, "Page.enable");
  await sendCDP(ws, "Network.enable");

  // Inject admin session cookie and session storage
  await sendCDP(ws, "Network.setCookie", {
    name: "sb_admin",
    value: "true",
    domain: "localhost",
    path: "/",
  });

  const outDir = "C:\\Users\\agzhe\\.gemini\\antigravity-ide\\brain\\b020bb0c-41e7-4647-bc59-71d59d7ece28";

  async function snap(filename) {
    const { data } = await sendCDP(ws, "Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(outDir, filename), Buffer.from(data, "base64"));
    console.log("Captured:", filename);
  }

  // 1. Overview View
  console.log("Navigating to Admin Overview...");
  await sendCDP(ws, "Page.navigate", { url: "http://localhost:3000/admin" });
  await sleep(3500);
  await snap("admin-live-overview.png");

  // 2. Campus View
  console.log("Testing Campus View...");
  await sendCDP(ws, "Runtime.evaluate", {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button'));
      const campusBtn = buttons.find(b => b.textContent && b.textContent.includes('Campus'));
      if (campusBtn) campusBtn.click();
    `,
  });
  await sleep(1500);
  await snap("admin-campus-view.png");

  // 3. Approvals View
  console.log("Testing Approvals View...");
  await sendCDP(ws, "Runtime.evaluate", {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button'));
      const apprBtn = buttons.find(b => b.textContent && b.textContent.includes('Approvals'));
      if (apprBtn) apprBtn.click();
    `,
  });
  await sleep(1500);
  await snap("admin-approvals-view.png");

  // 4. Audit Logs View
  console.log("Testing Audit Logs View...");
  await sendCDP(ws, "Runtime.evaluate", {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button'));
      const logBtn = buttons.find(b => b.textContent && b.textContent.includes('Audit Logs'));
      if (logBtn) logBtn.click();
    `,
  });
  await sleep(1500);
  await snap("admin-audit-logs.png");

  ws.close();
  console.log("All screenshots captured successfully.");
}

main().catch(console.error);
