import zlib from "zlib";

export function extractTextFromPdfBuffer(buffer) {
  const content = buffer.toString("binary");
  let fullText = "";

  // 1. Search for stream ... endstream blocks
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match;
  while ((match = streamRegex.exec(content)) !== null) {
    const rawStream = Buffer.from(match[1], "binary");
    let decompressed;
    try {
      decompressed = zlib.inflateSync(rawStream);
    } catch {
      try {
        decompressed = zlib.inflateRawSync(rawStream);
      } catch {
        // Might be uncompressed plain text stream
        decompressed = rawStream;
      }
    }

    if (decompressed) {
      const streamText = decompressed.toString("utf-8");
      // Extract text from (text) Tj and [(text) (more)] TJ operators
      // Tj: (Hello World) Tj
      const tjRegex = /\(([^)]+)\)\s*Tj/g;
      let tjMatch;
      while ((tjMatch = tjRegex.exec(streamText)) !== null) {
        fullText += tjMatch[1].replace(/\\([()\\])/g, "$1") + " ";
      }

      // TJ: [(Hello) 20 (World)] TJ
      const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
      let tjArrMatch;
      while ((tjArrMatch = tjArrayRegex.exec(streamText)) !== null) {
        const inner = tjArrMatch[1];
        const innerStrRegex = /\(([^)]*)\)/g;
        let strMatch;
        while ((strMatch = innerStrRegex.exec(inner)) !== null) {
          fullText += strMatch[1].replace(/\\([()\\])/g, "$1");
        }
        fullText += " ";
      }

      // Also handle plain text inside stream if simple layout
      // e.g. BT /F1 12 Tf ... ET
      if (!fullText) {
        const btEtRegex = /BT([\s\S]*?)ET/g;
        let btMatch;
        while ((btMatch = btEtRegex.exec(streamText)) !== null) {
          const btContent = btMatch[1];
          const words = btContent.match(/\((.*?)\)/g);
          if (words) {
            fullText += words.map(w => w.slice(1, -1).replace(/\\([()\\])/g, "$1")).join(" ") + " ";
          }
        }
      }
    }
  }

  // Fallback: If no stream extracted text, check raw content for text outside compressed streams
  if (!fullText.trim()) {
    const fallbackTj = /\(([^)]+)\)\s*Tj/g;
    let fbMatch;
    while ((fbMatch = fallbackTj.exec(content)) !== null) {
      fullText += fbMatch[1].replace(/\\([()\\])/g, "$1") + " ";
    }
  }

  return fullText.replace(/\s+/g, " ").trim();
}

const streamContent = Buffer.from("BT /F1 12 Tf (John Smith Cybersecurity Analyst Resume Education Skills Experience) Tj ET");
const compressedStream = zlib.deflateSync(streamContent);

const testPdfCompressed = Buffer.concat([
  Buffer.from(`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << >> >>
endobj
4 0 obj
<< /Length ${compressedStream.length} /Filter /FlateDecode >>
stream
`),
  compressedStream,
  Buffer.from(`
endstream
endobj
xref
trailer
<< /Root 1 0 R >>
%%EOF
`)
]);

const extractedCompressed = extractTextFromPdfBuffer(testPdfCompressed);
console.log("Extracted compressed text:", extractedCompressed);
if (extractedCompressed.includes("Cybersecurity Analyst Resume")) {
  console.log("SUCCESS: Compressed PDF text extraction verified!");
} else {
  console.error("FAIL: Compressed text does not match");
  process.exit(1);
}

