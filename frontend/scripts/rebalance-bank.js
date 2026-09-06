const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../src/lib/knowledge-test/ai-question-generator.ts');
let content = fs.readFileSync(targetFile, 'utf-8');

// Regex to match each question block
// Starts with {\n        id: "..." and ends before the next question or ];
const qRegex = /\{\s*id:\s*"([a-z0-9-]+)",\s*questionText:\s*"([\s\S]*?)",\s*options:\s*\[([\s\S]*?)\]\s*,\s*correctOptionId:\s*"([a-z0-9-]+)",\s*difficulty:\s*"([a-z]+)",\s*complexity:\s*"([a-z]+)",\s*conceptTag:\s*"([a-z0-9-]+)",\s*explanationAfterAnswer:\s*"([\s\S]*?)",\s*\}/g;

let count = 0;
const newContent = content.replace(qRegex, (match, id, qText, optionsText, correctOptionId, diff, comp, concept, explanation) => {
  count++;
  // Parse options
  const optRegex = /\{\s*id:\s*"([a-z0-9-]+)",\s*label:\s*"([A-D])",\s*text:\s*"([\s\S]*?)"\s*\}/g;
  const options = [];
  let optMatch;
  while ((optMatch = optRegex.exec(optionsText)) !== null) {
    options.push({
      oldId: optMatch[1],
      oldLabel: optMatch[2],
      text: optMatch[3],
    });
  }

  if (options.length !== 4) {
    console.warn(`Question ${id} has ${options.length} options, skipping`);
    return match;
  }

  // Find which option was currently correct
  const correctIdx = options.findIndex(o => o.oldId === correctOptionId);
  if (correctIdx === -1) {
    console.warn(`Question ${id}: correctOptionId ${correctOptionId} not found in options`);
    return match;
  }

  // Target index in a cycle: 0 -> A, 1 -> B, 2 -> C, 3 -> D
  // Let's use (count - 1) % 4
  const targetIdx = (count - 1) % 4;
  const labels = ['A', 'B', 'C', 'D'];
  const suffixes = ['a', 'b', 'c', 'd'];

  // Swap correct option with option at targetIdx
  const correctOpt = options[correctIdx];
  options.splice(correctIdx, 1);
  options.splice(targetIdx, 0, correctOpt);

  // Now assign new IDs and labels
  const newOptions = options.map((opt, i) => {
    return `          { id: "${id}-${suffixes[i]}", label: "${labels[i]}", text: "${opt.text}" }`;
  });

  const newCorrectOptionId = `${id}-${suffixes[targetIdx]}`;

  return `{
        id: "${id}",
        questionText: "${qText}",
        options: [
${newOptions.join(',\n')}
        ],
        correctOptionId: "${newCorrectOptionId}",
        difficulty: "${diff}",
        complexity: "${comp}",
        conceptTag: "${concept}",
        explanationAfterAnswer: "${explanation}",
      }`;
});

console.log(`Rebalanced ${count} questions!`);
fs.writeFileSync(targetFile, newContent, 'utf-8');
console.log('Wrote updated ai-question-generator.ts');
