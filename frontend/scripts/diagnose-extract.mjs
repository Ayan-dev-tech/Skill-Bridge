import fs from "fs";
import zlib from "zlib";

const AYAN_PATH = "C:\\Users\\agzhe\\Desktop\\AYAN PARMAR RESUME.pdf";
const buf = fs.readFileSync(AYAN_PATH);
const rawContent = buf.toString("binary");

function unescapePdfString(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\" && i + 1 < str.length) {
      const next = str[i + 1];
      if (next === "n") { bytes.push(10); i++; }
      else if (next === "r") { bytes.push(13); i++; }
      else if (next === "t") { bytes.push(9); i++; }
      else if (next === "b") { bytes.push(8); i++; }
      else if (next === "f") { bytes.push(12); i++; }
      else if (next === "(") { bytes.push(40); i++; }
      else if (next === ")") { bytes.push(41); i++; }
      else if (next === "\\") { bytes.push(92); i++; }
      else if (/[0-7]/.test(next)) {
        let oct = next;
        if (i + 2 < str.length && /[0-7]/.test(str[i + 2])) {
          oct += str[i + 2];
          if (i + 3 < str.length && /[0-7]/.test(str[i + 3])) {
            oct += str[i + 3];
            i += 3;
          } else {
            i += 2;
          }
        } else {
          i += 1;
        }
        bytes.push(parseInt(oct, 8));
      } else {
        bytes.push(str.charCodeAt(i + 1));
        i++;
      }
    } else {
      bytes.push(str.charCodeAt(i));
    }
  }
  return Buffer.from(bytes);
}

// 1. CMaps
const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
let match;
const cMapObjects = new Map();

while ((match = streamRegex.exec(rawContent)) !== null) {
  let txt = null;
  try {
    txt = zlib.inflateSync(Buffer.from(match[1], "binary")).toString("utf-8");
  } catch {
    try {
      txt = zlib.inflateRawSync(Buffer.from(match[1], "binary")).toString("utf-8");
    } catch {}
  }
  if (txt && (txt.includes("beginbfchar") || txt.includes("beginbfrange"))) {
    const map = new Map();
    const bfcharRegex = /<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g;
    let bfm;
    while ((bfm = bfcharRegex.exec(txt)) !== null) {
      map.set(parseInt(bfm[1], 16), String.fromCharCode(parseInt(bfm[2], 16)));
    }
    const bfrangeRegex = /<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g;
    let rfm;
    while ((rfm = bfrangeRegex.exec(txt)) !== null) {
      const s = parseInt(rfm[1], 16);
      const e = parseInt(rfm[2], 16);
      const d = parseInt(rfm[3], 16);
      for (let i = 0; i <= e - s; i++) {
        map.set(s + i, String.fromCharCode(d + i));
      }
    }
    const before = rawContent.substring(Math.max(0, match.index - 300), match.index);
    const objMatches = [...before.matchAll(/(\d+)\s+0\s+obj/g)];
    if (objMatches.length > 0) {
      const lastObjId = parseInt(objMatches[objMatches.length - 1][1], 10);
      cMapObjects.set(lastObjId, map);
    }
  }
}

const fontCMaps = {};
const fontMatches = [...rawContent.matchAll(/(\/F\d+)\s+(\d+)\s+0\s+R/g)];
for (const fm of fontMatches) {
  const fontName = fm[1];
  const fontObjId = parseInt(fm[2], 10);
  const fontObjIdx = rawContent.indexOf(`${fontObjId} 0 obj`);
  if (fontObjIdx !== -1) {
    const fontChunk = rawContent.substring(fontObjIdx, fontObjIdx + 1000);
    const toUniMatch = fontChunk.match(/\/ToUnicode\s+(\d+)\s+0\s+R/);
    if (toUniMatch) {
      const toUniId = parseInt(toUniMatch[1], 10);
      if (cMapObjects.has(toUniId)) {
        fontCMaps[fontName] = cMapObjects.get(toUniId);
      }
    }
  }
}

// 2. Decode text
let sm;
streamRegex.lastIndex = 0;
let fullText = "";

while ((sm = streamRegex.exec(rawContent)) !== null) {
  let decomp = null;
  try {
    decomp = zlib.inflateSync(Buffer.from(sm[1], "binary"));
  } catch {
    try {
      decomp = zlib.inflateRawSync(Buffer.from(sm[1], "binary"));
    } catch {}
  }
  if (!decomp) continue;
  const str = decomp.toString("latin1");
  if (!str.includes("Tj") && !str.includes("TJ")) continue;

  let currentFont = "/F7";
  const lines = str.split("\n");
  for (const line of lines) {
    const fm = line.match(/(\/F\d+)\s+[\d.]+\s+Tf/);
    if (fm) currentFont = fm[1];
    const cmap = fontCMaps[currentFont] || new Map();

    const tokenRegex = /(<[0-9a-fA-F\s]+>|\([^)]*(?:\\.[^)]*)*\))\s*Tj|\[(.*?)\]\s*TJ/g;
    let tm;
    while ((tm = tokenRegex.exec(line)) !== null) {
      const processBytes = (rawBytes) => {
        let res = "";
        if (rawBytes.length >= 2 && rawBytes[0] === 0) {
          for (let i = 0; i < rawBytes.length; i += 2) {
            if (i + 1 < rawBytes.length) {
              const code = (rawBytes[i] << 8) | rawBytes[i + 1];
              if (cmap.has(code)) res += cmap.get(code);
              else if (code >= 32 && code <= 126) res += String.fromCharCode(code);
            }
          }
        } else {
          for (let i = 0; i < rawBytes.length; i++) {
            const code = rawBytes[i];
            if (cmap.has(code)) res += cmap.get(code);
            else res += String.fromCharCode(code);
          }
        }
        return res;
      };

      if (tm[1]) {
        const tok = tm[1];
        if (tok.startsWith("<") && tok.endsWith(">")) {
          const hex = tok.slice(1, -1).replace(/\s+/g, "");
          for (let i = 0; i < hex.length; i += 4) {
            const code = parseInt(hex.substring(i, i + 4), 16);
            if (cmap.has(code)) fullText += cmap.get(code);
            else if (code >= 32 && code <= 126) fullText += String.fromCharCode(code);
          }
        } else if (tok.startsWith("(") && tok.endsWith(")")) {
          const rawBytes = unescapePdfString(tok.slice(1, -1));
          fullText += processBytes(rawBytes);
        }
      } else if (tm[2]) {
        const arr = tm[2];
        const items = arr.match(/<[0-9a-fA-F\s]+>|\([^)]*(?:\\.[^)]*)*\)/g) || [];
        for (const it of items) {
          if (it.startsWith("<")) {
            const hex = it.slice(1, -1).replace(/\s+/g, "");
            for (let i = 0; i < hex.length; i += 4) {
              const code = parseInt(hex.substring(i, i + 4), 16);
              if (cmap.has(code)) fullText += cmap.get(code);
              else if (code >= 32 && code <= 126) fullText += String.fromCharCode(code);
            }
          } else if (it.startsWith("(")) {
            const rawBytes = unescapePdfString(it.slice(1, -1));
            fullText += processBytes(rawBytes);
          }
        }
      }
    }
    if (line.includes("ET") || line.includes("Td") || line.includes("T*")) fullText += " ";
  }
}

console.log("Decoded text sample with unescaping:\n");
console.log(fullText.substring(0, 1000));
