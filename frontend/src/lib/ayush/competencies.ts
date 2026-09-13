/**
 * Skill-Bridge — AYUSH Competency Foundation & Target Roles
 * Standardized competencies and role mappings for AYUSH healthcare & clinical research.
 * Strictly scoped to the 5 canonical AYUSH systems.
 */

import { AyushCompetency, AyushTargetRole } from "./types";

/**
 * Target Competencies for the "AYUSH Clinical Research" role.
 * Calibrated across Good Clinical Practice (GCP), trial methodology,
 * pharmacovigilance, and classical epistemological validation.
 */
export const AYUSH_CLINICAL_RESEARCH_COMPETENCIES: AyushCompetency[] = [
  {
    id: "comp-ayush-gcp",
    name: "AYUSH Good Clinical Practice (GCP) & Ethical Compliance",
    title: "AYUSH Good Clinical Practice (GCP) & Ethical Compliance",
    category: "Regulatory & Ethics",
    domain: "Ayurveda & Integrative Healthcare",
    targetLevel: 4,
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
    description: "Correlating classical Aptopadesha, Pratyaksha, and Anumana epistemological evidence models with modern hierarchy of clinical evidence.",
    demonstratedAt: null,
    verifiedBy: "Academic Council of Samhita & Siddhanta",
  },
];

/**
 * Canonical Target Role: "AYUSH Clinical Research"
 * Maps directly to the 9 competencies above with target mastery tiers.
 */
export const AYUSH_CLINICAL_RESEARCH_ROLE: AyushTargetRole = {
  id: "ayush-clinical-research",
  name: "AYUSH Clinical Research",
  ayushSystem: "ayurveda",
  category: "Clinical Research & Evidence",
  description: "Specialized clinical research role designing, managing, and auditing GCP-compliant clinical trials, safety registries, and translational research across AYUSH systems.",
  competencies: [
    { competencyId: "comp-ayush-gcp", targetLevel: 4, importance: "essential" },
    { competencyId: "comp-ayush-trial-design", targetLevel: 4, importance: "essential" },
    { competencyId: "comp-ayush-pvpi", targetLevel: 3, importance: "essential" },
    { competencyId: "comp-ayush-herb-drug", targetLevel: 4, importance: "essential" },
    { competencyId: "comp-ayush-bioethics", targetLevel: 3, importance: "preferred" },
    { competencyId: "comp-ayush-data-mgmt", targetLevel: 3, importance: "preferred" },
    { competencyId: "comp-ayush-standardization", targetLevel: 4, importance: "essential" },
    { competencyId: "comp-ayush-biostats", targetLevel: 3, importance: "preferred" },
    { competencyId: "comp-ayush-samhita-epistemology", targetLevel: 4, importance: "essential" },
  ],
};

export const AYUSH_TARGET_ROLES: Record<string, AyushTargetRole> = {
  "ayush-clinical-research": AYUSH_CLINICAL_RESEARCH_ROLE,
};

/**
 * Retrieve a target role by its identifier
 */
export function getAyushTargetRole(roleId: string): AyushTargetRole | null {
  return AYUSH_TARGET_ROLES[roleId] || null;
}

/**
 * Retrieve detailed competencies mapped to a given target role
 */
export function getAyushRoleCompetencies(roleId: string): (AyushCompetency & { targetLevel: number; importance: "essential" | "preferred" })[] {
  const role = getAyushTargetRole(roleId);
  if (!role) return [];

  const compMap = new Map(AYUSH_CLINICAL_RESEARCH_COMPETENCIES.map((c) => [c.id, c]));

  return role.competencies
    .map((mapping) => {
      const comp = compMap.get(mapping.competencyId);
      if (!comp) return null;
      return {
        ...comp,
        targetLevel: mapping.targetLevel,
        importance: mapping.importance,
      };
    })
    .filter(Boolean) as (AyushCompetency & { targetLevel: number; importance: "essential" | "preferred" })[];
}
