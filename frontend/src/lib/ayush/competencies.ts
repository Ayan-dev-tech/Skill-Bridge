/**
 * Skill-Bridge — AYUSH Competency Foundation & Target Roles
 * Standardized competencies and role mappings for AYUSH healthcare & clinical research.
 * Strictly scoped to the 5 canonical AYUSH systems.
 */

import { AyushCompetency, AyushTargetRole, CompetencyMaturityLevel, getMaturityFromLevel } from "./types";

/**
 * Core Catalog of AYUSH Competencies.
 * Includes the 9 foundation competencies from Step 7A plus clinical, pharma QC,
 * research assistant, and wellness competencies with explicit maturity tiers:
 * - Foundation: Understands concepts and can execute guided tasks.
 * - Applied: Independently performs clinical, laboratory, or operational tasks.
 * - Advanced: Leads complex trials, specialized therapeutics, or regulatory filings.
 */
export const ALL_AYUSH_COMPETENCIES: AyushCompetency[] = [
  // --- 9 Standard Competencies from Step 7A ---
  {
    id: "comp-ayush-gcp",
    name: "AYUSH Good Clinical Practice (GCP) & Ethical Compliance",
    title: "AYUSH Good Clinical Practice (GCP) & Ethical Compliance",
    category: "Regulatory & Ethics",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 4,
    maturityLevel: "Advanced",
    description: "Applying ICMR-AYUSH ethical guidelines, CTRI trial registration, informed consent protocols, and GCP auditing in human clinical research.",
    demonstratedAt: null,
    verifiedBy: "Central Ethics Committee for AYUSH",
  },
  {
    id: "comp-ayush-trial-design",
    name: "Holistic & Adaptive Clinical Trial Design",
    title: "Holistic & Adaptive Clinical Trial Design",
    category: "Research Methodology",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 4,
    maturityLevel: "Advanced",
    description: "Protocol design adapting classical whole-system AYUSH interventions to pragmatic and randomized clinical trial (RCT) designs.",
    demonstratedAt: null,
    verifiedBy: "Clinical Research Directorate",
  },
  {
    id: "comp-ayush-pvpi",
    name: "Pharmacovigilance & Adverse Drug Reaction (ADR) Surveillance",
    title: "Pharmacovigilance & Adverse Drug Reaction (ADR) Surveillance",
    category: "Pharmacovigilance",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Identifying, documenting, causality-assessing, and reporting adverse drug reactions under the National Pharmacovigilance Programme for ASU&H Drugs.",
    demonstratedAt: null,
    verifiedBy: "Pharmacovigilance Intermediary Centre",
  },
  {
    id: "comp-ayush-herb-drug",
    name: "Herb-Drug Interaction & Safety Profiling",
    title: "Herb-Drug Interaction & Safety Profiling",
    category: "Pharmacology & Safety",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 4,
    maturityLevel: "Advanced",
    description: "Evaluating cytochrome P450 interactions, metabolic clearance pathways, and contraindications between classical formulations and conventional drugs.",
    demonstratedAt: null,
    verifiedBy: "Drug Safety & Toxicology Board",
  },
  {
    id: "comp-ayush-bioethics",
    name: "Institutional Ethics Committee (IEC) Dossier Preparation",
    title: "Institutional Ethics Committee (IEC) Dossier Preparation",
    category: "Regulatory & Ethics",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Drafting patient information sheets, investigator brochures, vulnerability safeguards, and regulatory submissions for institutional review boards.",
    demonstratedAt: null,
    verifiedBy: "Institutional Ethics Committee",
  },
  {
    id: "comp-ayush-data-mgmt",
    name: "Electronic Data Capture & Clinical Data Management (CDM)",
    title: "Electronic Data Capture & Clinical Data Management (CDM)",
    category: "Data Science & Informatics",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Designing electronic Case Report Forms (eCRFs), conducting source data verification, and managing clinical databases aligned with Ayush Grid standards.",
    demonstratedAt: null,
    verifiedBy: "Ayush Grid Health Informatics Cell",
  },
  {
    id: "comp-ayush-standardization",
    name: "Investigational Formulation Standardization & Monograph Verification",
    title: "Investigational Formulation Standardization & Monograph Verification",
    category: "Pharmacopoeia & Standardization",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 4,
    maturityLevel: "Advanced",
    description: "Verifying botanical authentication, phytochemical marker assay (HPTLC/HPLC), and heavy metal/microbial limits per Ayurvedic Pharmacopoeia of India (API) standards.",
    demonstratedAt: null,
    verifiedBy: "Pharmacopoeia Commission for Indian Medicine & Homoeopathy",
  },
  {
    id: "comp-ayush-biostats",
    name: "Biostatistical Analysis & Evidence Synthesis",
    title: "Biostatistical Analysis & Evidence Synthesis",
    category: "Biostatistics",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Performing parametric/non-parametric medical statistics, sample size calculation, meta-analyses, and systematic Cochrane-style reviews for AYUSH evidence.",
    demonstratedAt: null,
    verifiedBy: "Epidemiology & Biostatistics Department",
  },
  {
    id: "comp-ayush-samhita-epistemology",
    name: "Classical Epistemological Correlation (Pramana Vijnana)",
    title: "Classical Epistemological Correlation (Pramana Vijnana)",
    category: "Classical Theory",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 4,
    maturityLevel: "Advanced",
    description: "Correlating classical Aptopadesha, Pratyaksha, and Anumana epistemological evidence models with modern hierarchy of clinical evidence.",
    demonstratedAt: null,
    verifiedBy: "Academic Council of Samhita & Siddhanta",
  },

  // --- Broader Clinical & Healthcare Competencies ---
  {
    id: "comp-ayush-bedside-diagnostics",
    name: "Bedside Clinical Examination & Nadi Pariksha",
    title: "Bedside Clinical Examination & Nadi Pariksha",
    category: "Clinical Diagnostics",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Systematic Rogi-Roga Pariksha, eight-fold clinical pulse palpation (Ashtavidha Pariksha), and doshic differential diagnosis.",
    demonstratedAt: null,
    verifiedBy: "Clinical Medicine Examination Board",
  },
  {
    id: "comp-ayush-panchakarma-chikitsa",
    name: "Panchakarma & Shamana Therapeutic Management",
    title: "Panchakarma & Shamana Therapeutic Management",
    category: "Clinical Practice",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Administering classical Panchakarma procedures, Snehana-Swedana preparatory lines, and Samsarjana Krama dietary recovery.",
    demonstratedAt: null,
    verifiedBy: "Department of Panchakarma",
  },
  {
    id: "comp-ayush-chronic-case-mgmt",
    name: "Chronic Disease & Integrative Clinical Protocols",
    title: "Chronic Disease & Integrative Clinical Protocols",
    category: "Clinical Practice",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 4,
    maturityLevel: "Advanced",
    description: "Managing complex lifestyle, autoimmune, and non-communicable disorders through integrative AYUSH care guidelines.",
    demonstratedAt: null,
    verifiedBy: "Tertiary Hospital Clinical Board",
  },

  // --- Research Assistance & Evidence Synthesis ---
  {
    id: "comp-ayush-literature-evidence",
    name: "AYUSH Scientific Literature & DHARA Indexing",
    title: "AYUSH Scientific Literature & DHARA Indexing",
    category: "Research Methodology",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 2,
    maturityLevel: "Foundation",
    description: "Structured literature retrieval from DHARA, PubMed, and AYUSH Research Portal with critical appraisal of evidence quality.",
    demonstratedAt: null,
    verifiedBy: "Health Informatics & Library Resource Cell",
  },

  // --- Quality Control, GMP & Regulatory ---
  {
    id: "comp-ayush-gmp-schedulet",
    name: "Schedule T Good Manufacturing Practice (GMP) Compliance",
    title: "Schedule T Good Manufacturing Practice (GMP) Compliance",
    category: "Quality Control & Manufacturing",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Authoring and verifying Batch Manufacturing Records (BMR), in-process QA controls, and Schedule T plant hygiene compliance.",
    demonstratedAt: null,
    verifiedBy: "ASU&H Manufacturing Quality Audit Committee",
  },
  {
    id: "comp-ayush-regulatory-filing",
    name: "AYUSH Drug Licensing, CoPP & Export Regulatory Dossiers",
    title: "AYUSH Drug Licensing, CoPP & Export Regulatory Dossiers",
    category: "Regulatory & Quality",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 4,
    maturityLevel: "Advanced",
    description: "Preparing AYUSH Form 25/26D licensing dossiers, Certificate of Pharmaceutical Product (CoPP) documentation, and export submissions.",
    demonstratedAt: null,
    verifiedBy: "State Licensing Authority & Export Promotion Council",
  },

  // --- Wellness & Yoga Therapy ---
  {
    id: "comp-ayush-yoga-chikitsa",
    name: "Therapeutic Yoga Chikitsa & Biomechanics",
    title: "Therapeutic Yoga Chikitsa & Biomechanics",
    category: "Wellness & Yoga Therapy",
    domain: "Yoga & Naturopathy",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Prescribing disease-specific therapeutic asana alignments, breath-sound modulation, and therapeutic pranayama protocols aligned with YCB guidelines.",
    demonstratedAt: null,
    verifiedBy: "Yoga Certification Board (YCB)",
  },
  {
    id: "comp-ayush-stress-autonomic-regulation",
    name: "Stress Autonomic Stabilization & Shatkarma",
    title: "Stress Autonomic Stabilization & Shatkarma",
    category: "Wellness & Yoga Therapy",
    domain: "Yoga & Naturopathy",
    targetLevel: 3,
    maturityLevel: "Applied",
    description: "Guiding clinical relaxation (Yoga Nidra), Heart Rate Variability (HRV) stabilization, and classical Shatkarma visceral cleansing.",
    demonstratedAt: null,
    verifiedBy: "Clinical Naturopathy & Yoga Therapy Directorate",
  },
];

export const AYUSH_CLINICAL_RESEARCH_COMPETENCIES: AyushCompetency[] = ALL_AYUSH_COMPETENCIES.slice(0, 9);

/**
 * 5 Canonical AYUSH Target Roles with Maturity Tiers:
 * 1. AYUSH Clinical Research (Advanced Tier)
 * 2. AYUSH Clinical Practice (Applied Tier - Medical Officer)
 * 3. AYUSH Clinical Research Assistant (Foundation Tier - Entry Research)
 * 4. AYUSH Pharma Quality & Regulatory Associate (Applied Tier - QC/QA)
 * 5. AYUSH Wellness & Yoga Therapy Specialist (Applied Tier - Mind-Body Health)
 */
export const AYUSH_TARGET_ROLES: Record<string, AyushTargetRole> = {
  "ayush-clinical-research": {
    id: "ayush-clinical-research",
    name: "AYUSH Clinical Research",
    ayushSystem: "ayurveda",
    category: "Clinical Research & Evidence",
    targetMaturity: "Advanced",
    description: "Specialized clinical research role designing, managing, and auditing GCP-compliant clinical trials, safety registries, and translational research across AYUSH systems.",
    competencies: [
      { competencyId: "comp-ayush-gcp", targetLevel: 4, maturityLevel: "Advanced", importance: "essential" },
      { competencyId: "comp-ayush-trial-design", targetLevel: 4, maturityLevel: "Advanced", importance: "essential" },
      { competencyId: "comp-ayush-pvpi", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
      { competencyId: "comp-ayush-herb-drug", targetLevel: 4, maturityLevel: "Advanced", importance: "essential" },
      { competencyId: "comp-ayush-bioethics", targetLevel: 3, maturityLevel: "Applied", importance: "preferred" },
      { competencyId: "comp-ayush-data-mgmt", targetLevel: 3, maturityLevel: "Applied", importance: "preferred" },
      { competencyId: "comp-ayush-standardization", targetLevel: 4, maturityLevel: "Advanced", importance: "essential" },
      { competencyId: "comp-ayush-biostats", targetLevel: 3, maturityLevel: "Applied", importance: "preferred" },
      { competencyId: "comp-ayush-samhita-epistemology", targetLevel: 4, maturityLevel: "Advanced", importance: "essential" },
    ],
  },

  "ayush-clinical-practice": {
    id: "ayush-clinical-practice",
    name: "AYUSH Clinical Practice (Medical Officer)",
    ayushSystem: "ayurveda",
    category: "Clinical Practice & Therapeutics",
    targetMaturity: "Applied",
    description: "Primary bedside patient care, comprehensive diagnostic examination (Nadi Pariksha), authentic Panchakarma administration, and chronic disease protocolization.",
    competencies: [
      { competencyId: "comp-ayush-bedside-diagnostics", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
      { competencyId: "comp-ayush-panchakarma-chikitsa", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
      { competencyId: "comp-ayush-chronic-case-mgmt", targetLevel: 4, maturityLevel: "Advanced", importance: "essential" },
      { competencyId: "comp-ayush-herb-drug", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
      { competencyId: "comp-ayush-data-mgmt", targetLevel: 2, maturityLevel: "Foundation", importance: "preferred" },
      { competencyId: "comp-ayush-pvpi", targetLevel: 2, maturityLevel: "Foundation", importance: "preferred" },
      { competencyId: "comp-ayush-samhita-epistemology", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
    ],
  },

  "ayush-research-assistant": {
    id: "ayush-research-assistant",
    name: "AYUSH Clinical Research Assistant",
    ayushSystem: "ayurveda",
    category: "Clinical Research & Data",
    targetMaturity: "Foundation",
    description: "Entry-level research support for clinical trials, participant screening, electronic Case Report Form (eCRF) logging, and scientific literature curation.",
    competencies: [
      { competencyId: "comp-ayush-gcp", targetLevel: 2, maturityLevel: "Foundation", importance: "essential" },
      { competencyId: "comp-ayush-data-mgmt", targetLevel: 2, maturityLevel: "Foundation", importance: "essential" },
      { competencyId: "comp-ayush-literature-evidence", targetLevel: 2, maturityLevel: "Foundation", importance: "essential" },
      { competencyId: "comp-ayush-bioethics", targetLevel: 2, maturityLevel: "Foundation", importance: "preferred" },
      { competencyId: "comp-ayush-biostats", targetLevel: 2, maturityLevel: "Foundation", importance: "preferred" },
      { competencyId: "comp-ayush-pvpi", targetLevel: 2, maturityLevel: "Foundation", importance: "preferred" },
    ],
  },

  "ayush-pharma-quality-regulatory": {
    id: "ayush-pharma-quality-regulatory",
    name: "AYUSH Quality Control & Regulatory Associate",
    ayushSystem: "ayurveda",
    category: "Pharma Quality & Compliance",
    targetMaturity: "Applied",
    description: "ASU&H formulation quality verification, HPTLC phytochemical fingerprinting, Schedule T GMP batch inspection, and statutory drug regulatory filings.",
    competencies: [
      { competencyId: "comp-ayush-standardization", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
      { competencyId: "comp-ayush-gmp-schedulet", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
      { competencyId: "comp-ayush-regulatory-filing", targetLevel: 4, maturityLevel: "Advanced", importance: "essential" },
      { competencyId: "comp-ayush-herb-drug", targetLevel: 3, maturityLevel: "Applied", importance: "preferred" },
      { competencyId: "comp-ayush-pvpi", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
    ],
  },

  "ayush-wellness-yoga-therapy": {
    id: "ayush-wellness-yoga-therapy",
    name: "AYUSH Wellness & Therapeutic Yoga Specialist",
    ayushSystem: "yoga-naturopathy",
    category: "Wellness & Integrative Health",
    targetMaturity: "Applied",
    description: "Designing personalized therapeutic Yoga interventions, autonomic stress recovery protocols, and lifestyle counseling for preventive healthcare.",
    competencies: [
      { competencyId: "comp-ayush-yoga-chikitsa", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
      { competencyId: "comp-ayush-stress-autonomic-regulation", targetLevel: 3, maturityLevel: "Applied", importance: "essential" },
      { competencyId: "comp-ayush-bedside-diagnostics", targetLevel: 2, maturityLevel: "Foundation", importance: "preferred" },
      { competencyId: "comp-ayush-data-mgmt", targetLevel: 2, maturityLevel: "Foundation", importance: "preferred" },
      { competencyId: "comp-ayush-samhita-epistemology", targetLevel: 3, maturityLevel: "Applied", importance: "preferred" },
    ],
  },
};

export const AYUSH_CLINICAL_RESEARCH_ROLE = AYUSH_TARGET_ROLES["ayush-clinical-research"];

/**
 * Retrieve a target role by its identifier
 */
export function getAyushTargetRole(roleId: string): AyushTargetRole | null {
  return AYUSH_TARGET_ROLES[roleId] || null;
}

/**
 * Retrieve all registered AYUSH target roles
 */
export function getAllAyushTargetRoles(): AyushTargetRole[] {
  return Object.values(AYUSH_TARGET_ROLES);
}

/**
 * Retrieve detailed competencies mapped to a given target role
 */
export function getAyushRoleCompetencies(roleId: string): (AyushCompetency & { targetLevel: number; maturityLevel: CompetencyMaturityLevel; importance: "essential" | "preferred" })[] {
  const role = getAyushTargetRole(roleId);
  if (!role) return [];

  const compMap = new Map(ALL_AYUSH_COMPETENCIES.map((c) => [c.id, c]));

  return role.competencies
    .map((mapping) => {
      const comp = compMap.get(mapping.competencyId);
      if (!comp) return null;
      const targetLevel = mapping.targetLevel;
      const maturityLevel = mapping.maturityLevel || getMaturityFromLevel(targetLevel);
      return {
        ...comp,
        targetLevel,
        maturityLevel,
        importance: mapping.importance,
      };
    })
    .filter(Boolean) as (AyushCompetency & { targetLevel: number; maturityLevel: CompetencyMaturityLevel; importance: "essential" | "preferred" })[];
}

/**
 * Filter competencies by maturity level
 */
export function getCompetenciesByMaturity(maturity: CompetencyMaturityLevel): AyushCompetency[] {
  return ALL_AYUSH_COMPETENCIES.filter((c) => c.maturityLevel === maturity);
}
