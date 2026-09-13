import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('C:/Users/agzhe/.gemini/antigravity-ide/brain/3251fc4d-b1b7-476d-954d-1b0c0fed93d7/.system_generated/steps/384/output.txt', 'utf8'));
const text = raw.result;
const startIdx = text.indexOf('[');
const endIdx = text.lastIndexOf(']');
const jsonStr = text.substring(startIdx, endIdx + 1);
const tables = JSON.parse(jsonStr);
console.log('Tables found:', tables.length);
tables.forEach(t => {
  console.log(`\nTable: ${t.table_name}`);
  t.cols.forEach(c => console.log(`  - ${c.column} (${c.type}, nullable: ${c.nullable}, default: ${c.default})`));
});
fs.writeFileSync('frontend/scripts/supabase-tables.json', JSON.stringify(tables, null, 2));
