/**
 * Skill-Bridge — Evidence Extraction & OCR Pipeline (Step 9 Patch)
 * 
 * Pipeline:
 * 1. Primary Extraction: Direct digital PDF text extraction first (no OCR when normal extraction is usable).
 * 2. Extraction Quality Check: Rigorous quality gate rejecting metadata noise, placeholders,
 *    corrupted/fragmented streams, file paths, and exam question IDs missing content.
 * 3. Fallback: Calls Python FastAPI OCR microservice only when primary extraction is unusable.
 *    Re-evaluates OCR output with the exact same quality gate.
 * 4. Scan Failure: When both primary and OCR fail/unusable, sets SCAN_FAILED, preserves PDF in
 *    Supabase storage, and allows manual faculty review without generating misleading AI ratings.
 */

import zlib from "zlib";

export type ExtractionStatusFlow =
  | "SUBMITTED"
  | "EXTRACTING"
  | "OCR_FALLBACK"
  | "READY_FOR_AI"
  | "AI_EVALUATED"
  | "SCAN_FAILED";

export interface QualityMetrics {
  totalWords: number;
  meaningfulWords: number;
  uniqueWordRatio: number;
  noiseRatio: number;
  avgWordLength: number;
  hasSentences: boolean;
  isSparseForSize: boolean;
  reasons: string[];
}

export interface ExtractionResult {
  usable: boolean;
  extractedText: string;
  wordCount: number;
  confidence: number;
  engine: string;
  isScanned: boolean;
  status: "SUCCESS" | "SCANNED_OCR" | "SCAN_FAILED";
  statusFlow: ExtractionStatusFlow[];
  qualityMetrics: QualityMetrics;
  error?: string;
}

const PYTHON_OCR_URL = process.env.OCR_SERVICE_URL || "http://127.0.0.1:8000";

export class EvidenceExtractionService {
  /**
   * Main entry point for PDF evidence extraction.
   * Gated by usability verification before proceeding to AI evaluation.
   */
  static async extractPdfEvidence(
    fileBuffer: Buffer,
    fileName: string,
    studentId: string,
    documentType = "ayush_intervention_evidence"
  ): Promise<ExtractionResult> {
    const statusFlow: ExtractionStatusFlow[] = ["SUBMITTED", "EXTRACTING"];

    // 1. Magic bytes validation: %PDF-
    if (fileBuffer.length < 5 || !fileBuffer.subarray(0, 5).toString("ascii").startsWith("%PDF-")) {
      statusFlow.push("SCAN_FAILED");
      return {
        usable: false,
        extractedText: "",
        wordCount: 0,
        confidence: 0,
        engine: "validator",
        isScanned: false,
        status: "SCAN_FAILED",
        statusFlow,
        qualityMetrics: this.emptyMetrics(["Invalid PDF file header. Expected %PDF- format."]),
        error: "Invalid PDF file header. Expected valid %PDF- format.",
      };
    }

    // 2. PRIMARY EXTRACTION: Try direct digital PDF extraction first
    let primaryText = "";
    try {
      primaryText = this.extractDigitalTextFromBuffer(fileBuffer);
    } catch (err) {
      console.warn("Direct stream extraction error:", err);
    }

    // Extraction Quality Check on primary text
    const primaryQuality = this.checkExtractionQuality(primaryText, fileBuffer.length);

    // If primary direct extraction is usable, we NEVER run OCR!
    if (primaryQuality.usable) {
      statusFlow.push("READY_FOR_AI");
      return {
        usable: true,
        extractedText: primaryText.trim(),
        wordCount: primaryQuality.metrics.totalWords,
        confidence: 0.95,
        engine: "builtin_digital_extractor",
        isScanned: false,
        status: "SUCCESS",
        statusFlow,
        qualityMetrics: primaryQuality.metrics,
      };
    }

    // 3. FALLBACK: Primary extraction was unusable. Try Python/FastAPI OCR path.
    statusFlow.push("OCR_FALLBACK");
    console.info(
      `Primary PDF extraction unusable: ${primaryQuality.reasons.join("; ") || "insufficient content"}. Attempting OCR fallback...`
    );

    let ocrResult: { text: string; confidence: number; engine: string; isScanned: boolean } | null = null;
    try {
      ocrResult = await this.callPythonOcrMicroservice(fileBuffer, fileName, studentId, documentType);
    } catch (pyErr) {
      console.warn("Python OCR microservice fallback error:", pyErr);
    }

    if (ocrResult && ocrResult.text.trim()) {
      // Re-evaluate the OCR output with the EXACT SAME usability check
      const ocrQuality = this.checkExtractionQuality(ocrResult.text, fileBuffer.length);

      if (ocrQuality.usable) {
        statusFlow.push("READY_FOR_AI");
        return {
          usable: true,
          extractedText: ocrResult.text.trim(),
          wordCount: ocrQuality.metrics.totalWords,
          confidence: Math.max(0.70, ocrResult.confidence || 0.85),
          engine: ocrResult.engine || "python_ocr_service",
          isScanned: true,
          status: "SCANNED_OCR",
          statusFlow,
          qualityMetrics: ocrQuality.metrics,
        };
      } else {
        console.warn(`OCR fallback output also unusable: ${ocrQuality.reasons.join("; ")}`);
      }
    }

    // 4. SCAN FAILURE: Both direct extraction and OCR fallback are unusable / unavailable
    statusFlow.push("SCAN_FAILED");
    const combinedReasons = [
      ...primaryQuality.reasons,
      ...(ocrResult ? ["OCR output failed usability criteria"] : ["OCR microservice unavailable or produced no text"]),
    ];

    return {
      usable: false,
      extractedText: ocrResult?.text?.trim() || primaryText.trim() || "",
      wordCount: primaryQuality.metrics.totalWords,
      confidence: 0,
      engine: "none",
      isScanned: true,
      status: "SCAN_FAILED",
      statusFlow,
      qualityMetrics: primaryQuality.metrics,
      error:
        "Document submitted successfully, but we couldn't read it automatically. Your document is still submitted and available for faculty review.",
    };
  }

  /**
   * EXTRACTION QUALITY CHECK:
   * Rejects text that is clearly:
   * - mostly metadata/header/footer noise
   * - repeated labels/placeholders
   * - extremely sparse for the PDF size/page count
   * - missing meaningful document content
   * - corrupted/fragmented
   * - dominated by source-file paths, export artifacts, or question IDs without content
   */
  static checkExtractionQuality(
    rawText: string,
    fileSizeBytes?: number
  ): { usable: boolean; reasons: string[]; metrics: QualityMetrics } {
    const text = (rawText || "").trim();
    const reasons: string[] = [];

    // 1. Extreme brevity or emptiness
    if (!text || text.length === 0) {
      reasons.push("Extracted text is empty");
      return {
        usable: false,
        reasons,
        metrics: this.emptyMetrics(reasons),
      };
    }

    const tokens = text.split(/\s+/).filter(Boolean);
    const totalWords = tokens.length;

    if (totalWords < 12) {
      reasons.push(`Extracted text is extremely sparse (${totalWords} words, minimum 12 required)`);
    }

    // 2. Meaningful vocabulary (alphabetic words with >= 3 letters)
    const meaningfulTokens = tokens.filter((t) => {
      const clean = t.replace(/[^a-zA-Z]/g, "");
      return clean.length >= 3;
    });
    const meaningfulWords = meaningfulTokens.length;

    if (meaningfulWords < 15) {
      reasons.push(`Extracted text lacks substantive vocabulary (${meaningfulWords} meaningful words found, minimum 15 required)`);
    }

    // 3. Sparsity relative to PDF file size
    // Large document files (> 40 KB) that yield < 25 words are typically unread scans
    const isSparseForSize = Boolean(fileSizeBytes && fileSizeBytes > 40 * 1024 && meaningfulWords < 25);
    if (isSparseForSize) {
      reasons.push("Document file size indicates a rich or multi-page PDF, but extracted text is extremely sparse (< 25 words)");
    }

    // 4. Repeated labels & placeholder detection
    const lowerTokens = tokens.map((t) => t.toLowerCase());
    const uniqueTokens = new Set(lowerTokens);
    const uniqueWordRatio = totalWords > 0 ? Number((uniqueTokens.size / totalWords).toFixed(2)) : 0;

    if (totalWords >= 20 && uniqueWordRatio < 0.28) {
      reasons.push(`Text is dominated by repeated placeholder words (unique word ratio ${Math.round(uniqueWordRatio * 100)}% is below 28%)`);
    }

    const placeholderRegex = /(?:lorem\s+ipsum|sample\s+text|placeholder|test\s+test|dummy\s+text|enter\s+text\s+here|candidate\s+signature\s+here|your\s+name\s+here)/gi;
    const placeholderMatches = text.match(placeholderRegex) || [];
    if (placeholderMatches.length >= 3 && placeholderMatches.length / (totalWords / 5) > 0.4) {
      reasons.push("Text is predominantly placeholder or template filler");
    }

    // 5. Corruption / Fragmentation check
    const totalCharsInWords = tokens.reduce((acc, w) => acc + w.length, 0);
    const avgWordLength = totalWords > 0 ? Number((totalCharsInWords / totalWords).toFixed(2)) : 0;

    if (avgWordLength < 2.2) {
      reasons.push("Extracted characters are fragmented into scattered 1-2 letter fragments");
    } else if (avgWordLength > 24) {
      reasons.push("Text appears to be an unsegmented or corrupted binary stream (average token length > 24)");
    }

    // Symbol / non-standard characters ratio
    const garbageCharMatches = text.match(/[^\w\s.,!?;:()'"/\\-]/g) || [];
    const garbageRatio = text.length > 0 ? garbageCharMatches.length / text.length : 0;
    if (garbageRatio > 0.35) {
      reasons.push(`High concentration of corrupted/non-alphanumeric characters (${Math.round(garbageRatio * 100)}%)`);
    }

    // 6. Source-file paths, export artifacts, and question bank noise (Requirement 6)
    const noisePatterns: RegExp[] = [
      /(?:[A-Za-z]:\\[\w.-]+|\/(?:Users|home|var|tmp|data)\/[\w.-]+|\b[\w-]+\.(?:pdf|docx|txt|log|tmp|bak)\b)/gi,
      /(?:PDF Producer|Adobe PDF|ReportLab|CreationDate|ModDate|LaTeX with hyperref|Skia\/PDF|Print to PDF|Export Job)/gi,
      // AIAPGET / Question-bank structural metadata without substantive question stem/answer
      /(?:Question\s*(?:ID|No|Number)?\s*[:#]?\s*\d+|Marks\s*[:=]\s*[-+]?\d+(?:\.\d+)?|Negative\s*Marks?|Option\s*[A-D]\b|Correct\s*Option\s*[:=]|Candidate\s*Response\s*[:=]|Question\s*Type\s*[:=]|Section\s*[:=]\s*\w+|Status\s*[:=]\s*(?:Answered|Marked|Not\s*Attempted))/gi,
      /(?:Page\s*\d+\s*(?:of|\/)\s*\d+|Confidential\s*\|\s*Draft|All\s*rights\s*reserved)/gi,
    ];

    let noiseCharCount = 0;
    let substantiveText = text;
    for (const pattern of noisePatterns) {
      const matches = text.match(pattern) || [];
      for (const m of matches) {
        noiseCharCount += m.length;
      }
      substantiveText = substantiveText.replace(pattern, " ");
    }

    const noiseRatio = text.length > 0 ? Number((Math.min(text.length, noiseCharCount) / text.length).toFixed(2)) : 0;
    
    // Count meaningful words in remaining substantive text (excluding noise)
    const substantiveTokens = substantiveText.split(/\s+/).filter(Boolean);
    const substantiveMeaningfulWords = substantiveTokens.filter((t) => {
      const clean = t.replace(/[^a-zA-Z]/g, "");
      return clean.length >= 3;
    }).length;

    // If noise ratio is > 50% OR remaining substantive meaningful words are fewer than 15
    if (noiseRatio > 0.50 && substantiveMeaningfulWords < 20) {
      reasons.push(
        `Extracted content is dominated by metadata, export paths, or question-bank structural IDs (${Math.round(noiseRatio * 100)}% noise) with insufficient substantive content (${substantiveMeaningfulWords} substantive words)`
      );
    }

    // 7. Natural language / sentence coherence
    const COMMON_SENTENCE_ANCHORS = [
      "the", "and", "for", "with", "study", "patient", "trial", "report",
      "observation", "method", "result", "protocol", "criteria", "clinical",
      "data", "was", "were", "this", "in", "of", "to", "is", "are", "by", "on",
      "ayush", "ayurveda", "case", "dose", "treatment", "assessment", "evidence"
    ];
    const hasSentences = COMMON_SENTENCE_ANCHORS.some((word) => lowerTokens.includes(word));
    if (!hasSentences && totalWords >= 15) {
      reasons.push("Extracted text lacks standard sentence structure or natural language coherence");
    }

    const usable = reasons.length === 0;

    return {
      usable,
      reasons,
      metrics: {
        totalWords,
        meaningfulWords,
        uniqueWordRatio,
        noiseRatio,
        avgWordLength,
        hasSentences,
        isSparseForSize,
        reasons,
      },
    };
  }

  /**
   * Primary digital text extractor: parses uncompressed and FlateDecode object streams directly.
   */
  private static extractDigitalTextFromBuffer(buffer: Buffer): string {
    const raw = buffer.toString("binary");
    const extractedChunks: string[] = [];

    // 1. Scan for stream ... endstream blocks and decompress FlateDecode
    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let streamMatch: RegExpExecArray | null;

    while ((streamMatch = streamRegex.exec(raw)) !== null) {
      const matchIndex = streamMatch.index;
      // Extract binary slice between stream\r?\n and \r?\nendstream
      const headerLength = streamMatch[0].startsWith("stream\r\n") ? 8 : 7;
      const streamStart = matchIndex + headerLength;
      const streamEnd = matchIndex + streamMatch[0].lastIndexOf("endstream");

      if (streamEnd > streamStart) {
        const streamSlice = buffer.subarray(streamStart, streamEnd);
        let decompressed = "";

        try {
          decompressed = zlib.inflateSync(streamSlice).toString("latin1");
        } catch {
          try {
            decompressed = zlib.inflateRawSync(streamSlice).toString("latin1");
          } catch {
            decompressed = streamSlice.toString("latin1");
          }
        }

        if (decompressed) {
          const parsed = this.parseTextOperators(decompressed);
          if (parsed) extractedChunks.push(parsed);
        }
      }
    }

    // 2. Direct parsing of uncompressed BT ... ET blocks in the main body
    const directParsed = this.parseTextOperators(raw);
    if (directParsed) {
      extractedChunks.push(directParsed);
    }

    return extractedChunks.join("\n").trim();
  }

  /**
   * Parses PDF text operators (BT...ET, Tj, TJ, ') into clean text.
   */
  private static parseTextOperators(streamContent: string): string {
    const textPieces: string[] = [];
    const btRegex = /BT[\s\S]*?ET/g;
    let match: RegExpExecArray | null;

    while ((match = btRegex.exec(streamContent)) !== null) {
      const block = match[0];

      // Match literal strings: (text) Tj or (text) ' or (text) "
      const strRegex = /\(((?:[^()\\]|\\.)*)\)\s*(?:Tj|'|")/g;
      let strMatch: RegExpExecArray | null;
      while ((strMatch = strRegex.exec(block)) !== null) {
        textPieces.push(this.unescapePdfString(strMatch[1]));
      }

      // Match array strings: [(text1) -10 (text2)] TJ
      const tjRegex = /\[([\s\S]*?)\]\s*TJ/g;
      let tjMatch: RegExpExecArray | null;
      while ((tjMatch = tjRegex.exec(block)) !== null) {
        const inner = tjMatch[1];
        const innerStrings = inner.match(/\(((?:[^()\\]|\\.)*)\)/g);
        if (innerStrings) {
          const joined = innerStrings
            .map((s) => this.unescapePdfString(s.slice(1, -1)))
            .join("");
          if (joined) textPieces.push(joined);
        }
      }

      // Match hex strings: <48656c6c6f> Tj
      const hexRegex = /<([0-9a-fA-F]+)>\s*(?:Tj|'|")/g;
      let hexMatch: RegExpExecArray | null;
      while ((hexMatch = hexRegex.exec(block)) !== null) {
        try {
          const decoded = Buffer.from(hexMatch[1], "hex").toString("latin1");
          if (decoded) textPieces.push(decoded);
        } catch {
          // ignore invalid hex
        }
      }
    }

    if (textPieces.length === 0) {
      // General textual lines fallback for simple raw streams
      const lines = streamContent.split(/[\r\n]+/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (/^[A-Za-z0-9\s.,:;()/-]{12,}$/.test(trimmed) && !trimmed.startsWith("/") && !trimmed.includes("obj")) {
          textPieces.push(trimmed);
        }
      }
    }

    return textPieces.join(" ");
  }

  /**
   * Handles PDF escape sequences: \n, \r, \t, \(, \), \\, \ddd (octal)
   */
  private static unescapePdfString(str: string): string {
    return str
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\\(/g, "(")
      .replace(/\\\)/g, ")")
      .replace(/\\\\/g, "\\")
      .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));
  }

  /**
   * Invokes the existing Python / FastAPI OCR microservice on fallback.
   */
  private static async callPythonOcrMicroservice(
    fileBuffer: Buffer,
    fileName: string,
    studentId: string,
    documentType: string
  ): Promise<{ text: string; confidence: number; engine: string; isScanned: boolean } | null> {
    const formData = new FormData();
    const blob = new Blob([new Uint8Array(fileBuffer)], { type: "application/pdf" });
    formData.append("file", blob, fileName);
    formData.append("document_type", documentType);
    formData.append("student_id", studentId);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

    try {
      const response = await fetch(`${PYTHON_OCR_URL}/api/ocr/process-document`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (response.ok) {
        const json = await response.json();
        const text = (json.extracted_text || "").trim();
        const isScanned =
          json.engine?.includes("ocr") ||
          json.engine?.includes("tesseract") ||
          json.engine?.includes("image") ||
          json.engine?.includes("windows_native");

        if (json.status === "success" && text.length > 0) {
          return {
            text,
            confidence: Number(json.confidence || 0.85),
            engine: json.engine || "python_ocr_service",
            isScanned: Boolean(isScanned),
          };
        }
      }
    } catch (err) {
      console.warn("Python OCR microservice connection failed:", err);
    } finally {
      clearTimeout(timeout);
    }

    return null;
  }

  private static emptyMetrics(reasons: string[]): QualityMetrics {
    return {
      totalWords: 0,
      meaningfulWords: 0,
      uniqueWordRatio: 0,
      noiseRatio: 0,
      avgWordLength: 0,
      hasSentences: false,
      isSparseForSize: false,
      reasons,
    };
  }
}
