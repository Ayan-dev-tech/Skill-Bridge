// Aggregation and Import Script for Prompt 3
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { AIAPGET_QUESTIONS } from "./aiapget-data-part1.mjs";
import { AIAPGET_QUESTIONS_PART2 } from "./aiapget-data-part2.mjs";
import { NEET_UG_QUESTIONS_PART1 } from "./neet-data-part1.mjs";
import { NEET_UG_QUESTIONS_PART2 } from "./neet-data-part2.mjs";
import { NEET_UG_QUESTIONS_PART3 } from "./neet-data-part3.mjs";
import { validateAssessmentQuestion } from "./validator-helper.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, "../data/skill_bridge.json");

async function main() {
  console.log("==================================================");
  console.log("PROMPT 3: Importing PYQ Question Bank Content");
  console.log("==================================================");

  const allRaw = [
    ...AIAPGET_QUESTIONS,
    ...AIAPGET_QUESTIONS_PART2,
    ...NEET_UG_QUESTIONS_PART1,
    ...NEET_UG_QUESTIONS_PART2,
    ...NEET_UG_QUESTIONS_PART3,
  ];

  console.log(`Total candidate questions gathered: ${allRaw.length}`);

  let validQuestions = [];
  let rejectedCount = 0;
  let duplicateCount = 0;

  const seenIds = new Set();
  const seenTexts = new Set();
  const seenConceptTags = new Set();

  for (const q of allRaw) {
    const valResult = validateAssessmentQuestion(q);
    if (!valResult.valid) {
      console.warn(`[REJECTED] Question ${q.id}:`, valResult.errors.join(", "));
      rejectedCount++;
      continue;
    }

    // Duplicate detection
    if (seenIds.has(q.id)) {
      console.warn(`[DUPLICATE ID] Question ${q.id}`);
      duplicateCount++;
      continue;
    }

    const normText = q.questionText.trim().toLowerCase().replace(/\s+/g, " ");
    if (seenTexts.has(normText)) {
      console.warn(`[DUPLICATE TEXT] Question ${q.id}`);
      duplicateCount++;
      continue;
    }

    const normTag = q.conceptTag.trim().toLowerCase();
    if (seenConceptTags.has(normTag)) {
      console.warn(`[DUPLICATE TAG] Question ${q.id} with tag ${normTag}`);
      duplicateCount++;
      continue;
    }

    seenIds.add(q.id);
    seenTexts.add(normText);
    seenConceptTags.add(normTag);
    validQuestions.push(q);
  }

  const aiapgetCount = validQuestions.filter((q) => q.examType === "AIAPGET_PG").length;
  const neetCount = validQuestions.filter((q) => q.examType === "NEET_UG").length;

  console.log(`\nImport Summary:`);
  console.log(`- AIAPGET PG Questions Validated: ${aiapgetCount}`);
  console.log(`- NEET UG Questions Validated: ${neetCount}`);
  console.log(`- Total Valid Imported: ${validQuestions.length}`);
  console.log(`- Rejected Count: ${rejectedCount}`);
  console.log(`- Duplicate Count: ${duplicateCount}`);

  // Load existing database
  const dbData = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  if (!Array.isArray(dbData.assessmentQuestions)) {
    dbData.assessmentQuestions = [];
  }

  // Deduplicate against anything already in DB
  const existingIdSet = new Set(dbData.assessmentQuestions.map((q) => q.id));
  let addedCount = 0;
  for (const vq of validQuestions) {
    if (!existingIdSet.has(vq.id)) {
      dbData.assessmentQuestions.push(vq);
      existingIdSet.add(vq.id);
      addedCount++;
    }
  }

  // Also configure standard assessment configs if empty
  if (!Array.isArray(dbData.assessmentConfigs)) {
    dbData.assessmentConfigs = [];
  }

  if (dbData.assessmentConfigs.length === 0) {
    const nowIso = new Date().toISOString();
    const configs = [
      {
        id: "cfg_aiapget_ayurveda_practice",
        name: "AIAPGET Ayurveda PG Practice Assessment",
        description: "Official past question bank practice test covering Samhita, Rachana/Kriya, Dravyaguna, Panchakarma, Shalya and Shalakya.",
        examType: "AIAPGET_PG",
        mode: "Practice",
        ayushSystem: "ayurveda",
        subjectFilters: [],
        topicFilters: [],
        ayushSkillFilters: ["ayush-clinical-principles"],
        difficulty: null,
        questionCount: 15,
        timeLimitMinutes: 30,
        passingScorePercent: 50,
        isActive: true,
        createdAt: nowIso,
        updatedAt: nowIso,
      },
      {
        id: "cfg_neet_ug_premedical_practice",
        name: "NEET UG Pre-Medical AYUSH Foundation Practice",
        description: "Standard NEET UG foundation questions across Physics, Chemistry, Botany, and Zoology for AYUSH aspirants.",
        examType: "NEET_UG",
        mode: "Practice",
        ayushSystem: null,
        subjectFilters: [],
        topicFilters: [],
        ayushSkillFilters: ["ayush-scientific-validation"],
        difficulty: null,
        questionCount: 15,
        timeLimitMinutes: 30,
        passingScorePercent: 50,
        isActive: true,
        createdAt: nowIso,
        updatedAt: nowIso,
      }
    ];
    dbData.assessmentConfigs.push(...configs);
    console.log(`- Seeded ${configs.length} AssessmentConfigs into skill_bridge.json`);
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), "utf-8");
  console.log(`\nSuccessfully saved ${addedCount} questions into ${DB_PATH}`);
}

main().catch((err) => {
  console.error("Import error:", err);
  process.exit(1);
});
