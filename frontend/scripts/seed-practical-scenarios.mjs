import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "skill_bridge.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const existingIds = new Set((data.assessmentQuestions || []).map((q) => q.id));

const practicalQuestions = [
  {
    id: "PRACTICAL_AYUSH_5001",
    questionText: "A 45-year-old male with chronic osteoarthritis presents to the OPD taking tablet Diclofenac (NSAID) daily. He requests classical Guggulu formulations (Yograj Guggulu) and Shallaki. When evaluating drug interactions, what is the primary clinical safety priority?",
    scenarioContext: "An integrative clinical OPD consultation evaluating co-administration of modern anti-inflammatory analgesics and classical Ayurvedic polyherbal preparations.",
    options: [
      { id: "5001_opt_1", label: "A", text: "Advise immediate cessation of NSAID without consulting the treating physician." },
      { id: "5001_opt_2", label: "B", text: "Assess for additive gastrointestinal ulceration/bleeding risk and coordinate phased titration with treating physician." },
      { id: "5001_opt_3", label: "C", text: "Inform the patient that Ayurvedic medicines never have adverse reactions with synthetic pharmaceuticals." },
      { id: "5001_opt_4", label: "D", text: "Prescribe higher dosages of Guggulu to overcome synthetic drug resistance." }
    ],
    correctOptionId: "5001_opt_2",
    explanation: "Guggulu and Shallaki possess potent anti-inflammatory properties that can synergize with NSAIDs to elevate gastrointestinal mucosal irritation and bleeding risks. Phased titration and clinical coordination are standard pharmacovigilance practices.",
    examType: "PRACTICAL_SCENARIO",
    questionType: "MCQ",
    subject: "Kayachikitsa & Pharmacology",
    topic: "Herb-Drug Interaction & Safety",
    ayushSkillIds: ["herb-drug-interaction", "ayush-pharmacovigilance"],
    skillCategory: "Herb-Drug Interaction Awareness",
    difficulty: "Medium",
    cognitiveLevel: "Application",
    ayushSystem: "ayurveda",
    conceptTag: "herb-drug-nsaid-guggulu-interaction",
    sourceRef: "Pharmacovigilance Program for AYUSH Drugs (PvPI) Clinical Safety Manual",
    referenceYear: 2024,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "PRACTICAL_AYUSH_5002",
    questionText: "During a Shirodhara procedure in the Panchakarma theatre, a 32-year-old patient suddenly complains of severe dizziness, cold clammy extremities, and blood pressure drops to 85/55 mmHg. What is the immediate first-line clinical escalation step?",
    scenarioContext: "Panchakarma treatment complication triage during therapeutic Shirodhara oil stream administration.",
    options: [
      { id: "5002_opt_1", label: "A", text: "Continue the procedure at a higher temperature to stimulate peripheral circulation." },
      { id: "5002_opt_2", label: "B", text: "Immediately halt the procedure, wipe the head, position the patient supine with feet elevated, check vitals, and summon emergency resuscitation support." },
      { id: "5002_opt_3", label: "C", text: "Administer oral decoction (Kashaya) immediately while keeping the patient seated." },
      { id: "5002_opt_4", label: "D", text: "Instruct the patient to perform Bhastrika Pranayama to normalize hemodynamics." }
    ],
    correctOptionId: "5002_opt_2",
    explanation: "Sudden hypotension during Shirodhara may represent vasovagal syncope. The immediate clinical response is procedure cessation, Trendelenburg/supine positioning, airway-breathing-circulation stabilization, and emergency escalation.",
    examType: "PRACTICAL_SCENARIO",
    questionType: "MCQ",
    subject: "Panchakarma",
    topic: "Complication Management & Clinical Escalation",
    ayushSkillIds: ["ayush-clinical-principles", "ayush-pharmacovigilance"],
    skillCategory: "Emergency/Triage Awareness",
    difficulty: "Medium",
    cognitiveLevel: "Application",
    ayushSystem: "ayurveda",
    conceptTag: "panchakarma-emergency-escalation-shirodhara",
    sourceRef: "Standard Clinical Guidelines for Panchakarma, Ministry of AYUSH",
    referenceYear: 2024,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "PRACTICAL_AYUSH_5003",
    questionText: "A patient presents to a clinical research trial reporting yellow discoloration of sclera and severe nausea two weeks after starting an unlabelled proprietary polyherbal formulation. Under AYUSH Pharmacovigilance (PvPI) guidelines, what is the mandatory regulatory action?",
    scenarioContext: "Adverse Drug Reaction (ADR) reporting and regulatory compliance in institutional clinical practice.",
    options: [
      { id: "5003_opt_1", label: "A", text: "Discard the unlabelled medication without documentation to avoid legal consequences." },
      { id: "5003_opt_2", label: "B", text: "File a Suspected Adverse Drug Reaction (SADR) reporting form to the nearest AYUSH Intermediary Pharmacovigilance Centre and preserve sample for batch analysis." },
      { id: "5003_opt_3", label: "C", text: "Reassure the patient that jaundice indicates deep metabolic cleansing (Kostha Shodhana)." },
      { id: "5003_opt_4", label: "D", text: "Double the formulation dosage to clear the circulating toxins." }
    ],
    correctOptionId: "5003_opt_2",
    explanation: "Suspected hepatic ADRs must be reported via standard SADR format to Intermediary/National Pharmacovigilance Centres under the Ministry of AYUSH PvPI framework with batch traceability.",
    examType: "PRACTICAL_SCENARIO",
    questionType: "MCQ",
    subject: "Agadatantra & Pharmacovigilance",
    topic: "PvPI Reporting & Causality Assessment",
    ayushSkillIds: ["ayush-pharmacovigilance", "ayush-regulatory"],
    skillCategory: "Pharmacovigilance",
    difficulty: "Hard",
    cognitiveLevel: "Application",
    ayushSystem: "ayurveda",
    conceptTag: "ayush-pvpi-sadr-reporting",
    sourceRef: "Central Council for Research in Ayurvedic Sciences (CCRAS) PvPI Protocol",
    referenceYear: 2024,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "PRACTICAL_AYUSH_5004",
    questionText: "Under the Ayushman Bharat Digital Mission (ABDM) integration in an AYUSH hospital, which identification and consent workflow is legally required before retrieving a patient's longitudinal electronic health records across health facilities?",
    scenarioContext: "Digital health implementation, electronic health records (EHR), and patient consent under ABDM in clinical practice.",
    options: [
      { id: "5004_opt_1", label: "A", text: "Verification via 14-digit ABHA (Ayushman Bharat Health Account) ID and OTP/biometric consent artifact via ABDM Gateway." },
      { id: "5004_opt_2", label: "B", text: "Verbal consent documented on a plain paper OPD register only." },
      { id: "5004_opt_3", label: "C", text: "Unrestricted electronic sharing of all records among healthcare providers without patient authorization." },
      { id: "5004_opt_4", label: "D", text: "ABDM does not apply to AYUSH practitioners and institutions." }
    ],
    correctOptionId: "5004_opt_1",
    explanation: "Under National Health Authority (NHA) & ABDM guidelines for AYUSH, accessing longitudinal health records requires patient ABHA identification and explicit electronic consent artifact generation.",
    examType: "PRACTICAL_SCENARIO",
    questionType: "MCQ",
    subject: "Health Informatics & Governance",
    topic: "ABDM Protocols & Electronic Health Records",
    ayushSkillIds: ["abdm-digital-health", "ayush-regulatory"],
    skillCategory: "EHR/ABDM Awareness",
    difficulty: "Medium",
    cognitiveLevel: "Knowledge",
    ayushSystem: "ayurveda",
    conceptTag: "abdm-ayush-abha-consent-artifact",
    sourceRef: "National Health Authority (NHA) ABDM AYUSH Implementation Toolkit",
    referenceYear: 2024,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "PRACTICAL_AYUSH_5005",
    questionText: "An investigator designs a clinical trial comparing an Ayurvedic classical formulation with standard of care in primary hypertension. To conform to Good Clinical Practice (GCP) and ICMR-AYUSH ethical standards, which step is mandatory before recruiting human subjects?",
    scenarioContext: "Ethical clearances, clinical trial registration, and research methodology for traditional medicine.",
    options: [
      { id: "5005_opt_1", label: "A", text: "Formal approval from an Institutional Ethics Committee (IEC) and prospective registration in CTRI (Clinical Trials Registry - India)." },
      { id: "5005_opt_2", label: "B", text: "Publishing preliminary testimonials on social media to build sample enrollment." },
      { id: "5005_opt_3", label: "C", text: "Commencing trial recruitment without ethics review if the drug is mentioned in the Ayurvedic Pharmacopoeia." },
      { id: "5005_opt_4", label: "D", text: "Conducting testing exclusively on hospital staff members without written informed consent." }
    ],
    correctOptionId: "5005_opt_1",
    explanation: "All clinical trials involving human participants in AYUSH systems require prospective clearance from an accredited IEC and mandatory registration on the CTRI portal before first subject enrollment.",
    examType: "PRACTICAL_SCENARIO",
    questionType: "MCQ",
    subject: "Research Methodology & Medical Ethics",
    topic: "Clinical Trial Governance & CTRI Registration",
    ayushSkillIds: ["ayush-research-methodology", "ayush-scientific-validation"],
    skillCategory: "Research Methodology",
    difficulty: "Medium",
    cognitiveLevel: "Application",
    ayushSystem: "ayurveda",
    conceptTag: "ctri-iec-ayush-clinical-trial-governance",
    sourceRef: "ICMR-AYUSH National Ethical Guidelines for Biomedical Research",
    referenceYear: 2024,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "PRACTICAL_AYUSH_5006",
    questionText: "In an Ayurvedic manufacturing unit (Rasashala), a Quality Assurance executive is inspecting a newly prepared batch of Bhasma. Which classical test specifically demonstrates the complete absence of free unreacted metallic particles (subtle grainlessness)?",
    scenarioContext: "Good Manufacturing Practices (GMP) and classical quality control parameters for mineral/herbo-mineral formulations.",
    options: [
      { id: "5006_opt_1", label: "A", text: "Rekhapurnatva (enters fine skin furrows when rubbed between thumb and index finger)" },
      { id: "5006_opt_2", label: "B", text: "Varitara (floats steadily on undisturbed water surface)" },
      { id: "5006_opt_3", label: "C", text: "Apurnabhava (does not revert to metallic state upon heating with Mitra Panchaka)" },
      { id: "5006_opt_4", label: "D", text: "Niruttha (does not alloy with silver foil at high temperature)" }
    ],
    correctOptionId: "5006_opt_1",
    explanation: "Rekhapurnatva directly measures extreme fineness and micro-particle size (enters fingerprints/furrows), whereas Apurnabhava/Niruttha test irreversible metallic alteration, and Varitara tests lightness.",
    examType: "PRACTICAL_SCENARIO",
    questionType: "MCQ",
    subject: "Rasashastra & Bhaishajya Kalpana",
    topic: "Bhasma Pariksha & Pharmacopoeial Standards",
    ayushSkillIds: ["ayush-formulations", "ayush-scientific-validation"],
    skillCategory: "AYUSH Core Practice",
    difficulty: "Medium",
    cognitiveLevel: "Comprehension",
    ayushSystem: "ayurveda",
    conceptTag: "rekhapurnatva-bhasma-pariksha-gmp",
    sourceRef: "Ayurvedic Pharmacopoeia of India (API) Part II, Standards for Bhasma",
    referenceYear: 2024,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let addedQ = 0;
for (const q of practicalQuestions) {
  if (!existingIds.has(q.id)) {
    data.assessmentQuestions.push(q);
    existingIds.add(q.id);
    addedQ++;
  }
}

const configId = "cfg_practical_scenarios_clinical";
const existingConfigIdx = (data.assessmentConfigs || []).findIndex((c) => c.id === configId);
const practicalConfig = {
  id: configId,
  name: "Clinical Scenarios & Practical Prioritization",
  description: "Evidence-based scenarios evaluating clinical recognition, emergency escalation, herb-drug safety, ABDM integration, and pharmacopoeial quality.",
  examType: "PRACTICAL_SCENARIO",
  mode: "Practice",
  ayushSystem: null,
  subjectFilters: [],
  topicFilters: [],
  difficulty: null,
  questionCount: 6,
  timeLimitMinutes: 15,
  passingScorePercent: 60,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

if (existingConfigIdx >= 0) {
  data.assessmentConfigs[existingConfigIdx] = practicalConfig;
} else {
  if (!data.assessmentConfigs) data.assessmentConfigs = [];
  data.assessmentConfigs.push(practicalConfig);
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
console.log("Successfully seeded practical scenarios. Added questions:", addedQ, "Total questions:", data.assessmentQuestions.length, "Total configs:", data.assessmentConfigs.length);
