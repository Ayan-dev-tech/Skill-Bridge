import { FALLBACK_QUESTION_BANK } from "../src/lib/knowledge-test/ai-question-generator.ts";

const domains = ["security", "ai-ml", "cloud", "web", "software"];
const tiers = ["beginner", "intermediate", "advanced"];

let totalQuestions = 0;
let lengthDiscrepancies = 0;
const problematicQuestions = [];

for (const d of domains) {
  for (const t of tiers) {
    const list = FALLBACK_QUESTION_BANK[d]?.[t] || [];
    for (const q of list) {
      totalQuestions++;
      const optLengths = q.options.map(o => o.text.length);
      const minLen = Math.min(...optLengths);
      const maxLen = Math.max(...optLengths);
      const correctOpt = q.options.find(o => o.id === q.correctOptionId);
      const distractors = q.options.filter(o => o.id !== q.correctOptionId);
      const avgDistractorLen = distractors.reduce((acc, o) => acc + o.text.length, 0) / distractors.length;
      
      const correctLenRatio = correctOpt ? correctOpt.text.length / avgDistractorLen : 1;
      const spreadRatio = maxLen / Math.max(minLen, 1);

      if (spreadRatio > 2.2 || correctLenRatio > 1.7) {
        lengthDiscrepancies++;
        problematicQuestions.push({
          id: q.id,
          question: q.questionText,
          spreadRatio: spreadRatio.toFixed(2),
          correctLenRatio: correctLenRatio.toFixed(2),
          correctOpt: correctOpt?.text,
          options: q.options.map(o => `${o.label}: (${o.text.length} chars) ${o.text}`)
        });
      }
    }
  }
}

console.log(`Total questions audited: ${totalQuestions}`);
console.log(`Questions with length/distractor discrepancies: ${lengthDiscrepancies}`);
if (problematicQuestions.length > 0) {
  console.log("\nTop 5 problematic questions:");
  problematicQuestions.slice(0, 5).forEach(p => {
    console.log(`\nID: ${p.id} (Spread: ${p.spreadRatio}x, Correct vs Distractors: ${p.correctLenRatio}x)`);
    console.log(`Q: ${p.question}`);
    p.options.forEach(o => console.log(`  ${o}`));
  });
}
