import fs from "fs";

const rawContent = fs.readFileSync("src/lib/knowledge-test/question-bank-data.ts", "utf-8");
const content = rawContent.replace(/\r\n/g, "\n");

const startMarker = "export const FALLBACK_QUESTION_BANK: QuestionBank = ";
const startIndex = content.indexOf(startMarker);

if (startIndex === -1) {
  console.error("Could not find start marker");
  process.exit(1);
}

const bankSubstring = content.substring(startIndex + startMarker.length);
const lastSemicolon = bankSubstring.lastIndexOf(";");
const cleanSnippet = bankSubstring.substring(0, lastSemicolon).trim();

const bank = eval(`(${cleanSnippet})`);

const flagged = [];
let total = 0;
const distribution = { A: 0, B: 0, C: 0, D: 0 };

for (const [domain, tiers] of Object.entries(bank)) {
  for (const [tier, questions] of Object.entries(tiers)) {
    for (const q of questions) {
      total++;
      const lengths = q.options.map((o) => o.text.length);
      const min = Math.min(...lengths);
      const max = Math.max(...lengths);
      const spread = max / Math.max(min, 1);
      
      const correct = q.options.find((o) => o.id === q.correctOptionId);
      if (correct) {
        distribution[correct.label]++;
      }
      const distractors = q.options.filter((o) => o.id !== q.correctOptionId);
      const avgDistractor = distractors.reduce((a, b) => a + b.text.length, 0) / distractors.length;
      const correctRatio = correct ? correct.text.length / avgDistractor : 1;

      // Strict test: spread > 2.0 or correctRatio > 1.5
      if (spread > 2.0 || correctRatio > 1.5) {
        flagged.push({
          id: q.id,
          domain,
          tier,
          spread: spread.toFixed(2),
          correctRatio: correctRatio.toFixed(2),
          question: q.questionText,
          options: q.options.map((o) => `[${o.id === q.correctOptionId ? "*" : " "} ${o.label}] (${o.text.length}ch): ${o.text}`)
        });
      }
    }
  }
}

console.log(`Total questions analyzed: ${total}`);
console.log("Answer Distribution:", distribution);
console.log(`Flagged questions with length/distractor issues: ${flagged.length}`);

if (flagged.length > 0) {
  flagged.forEach((f) => {
    console.log(`\n--- [${f.id}] (${f.domain} - ${f.tier}) Spread: ${f.spread}x, CorrectRatio: ${f.correctRatio}x ---`);
    console.log(`Q: ${f.question}`);
    f.options.forEach((o) => console.log(`   ${o}`));
  });
}
