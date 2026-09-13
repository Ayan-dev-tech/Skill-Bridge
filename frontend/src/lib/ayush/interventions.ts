/**
 * AYUSH Development Interventions Engine (Step 8)
 * Connects identified competency gaps to concrete, measurable improvement actions.
 */

import {
  AyushDevelopmentIntervention,
  AyushSkillPassport,
  AyushStudentDevelopmentPlan,
  CompetencyMaturityLevel,
  DevelopmentPlanStatus,
  getMaturityFromLevel,
} from "./types";
import { getAyushTargetRole } from "./competencies";

// ============================================================================
// CURATED AYUSH DEVELOPMENT INTERVENTIONS CATALOG
// ============================================================================

export const AYUSH_DEVELOPMENT_INTERVENTIONS: AyushDevelopmentIntervention[] = [
  {
    id: "int-gcp-workshop",
    title: "ICMR-CDSCO Good Clinical Practice (GCP) for AYUSH Investigators",
    description:
      "Comprehensive interactive workshop covering ICMR ethical guidelines, CDSCO clinical trial rules, investigator responsibilities, informed consent, and adverse event reporting tailored for AYUSH clinical interventions.",
    type: "Workshop",
    competencyId: "comp-ayush-gcp",
    targetMaturity: "Advanced",
    estimatedDuration: "3 Days (18 Hours)",
    difficulty: "Advanced",
    provider: "All India Institute of Ayurveda (AIIA) & ICMR Clinical Cell",
    evidenceRequired: "GCP Investigator Certification and Simulated Ethics Protocol Submission",
    supportingResources: [
      {
        title: "ICMR Ethical Guidelines 2017",
        url: "https://ethics.ncdirindia.org",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-trial-design-challenge",
    title: "Whole-System AYUSH Randomized Controlled Trial Protocol Design",
    description:
      "Research design challenge adapting whole-system Ayurvedic/Siddha multimodal interventions to pragmatic RCT and adaptive trial designs without compromising classical treatment integrity.",
    type: "Research Challenge",
    competencyId: "comp-ayush-trial-design",
    targetMaturity: "Advanced",
    estimatedDuration: "2 Weeks",
    difficulty: "Advanced",
    provider: "CCRAS Central Research Directorate",
    evidenceRequired: "Complete SPIRIT-AYUSH compliant Protocol Document & Randomization Plan",
    supportingResources: [
      {
        title: "SPIRIT Guidelines Extension for Traditional Medicine",
        url: "https://www.spirit-statement.org",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-crf-edc-practical",
    title: "Electronic Data Capture (EDC) & e-CRF Workflows in AYUSH Trials",
    description:
      "Hands-on practical workstation for case report form design, GCP-compliant source data verification, and query resolution in multi-center clinical trials.",
    type: "Practical Task",
    competencyId: "comp-ayush-crf-edc",
    targetMaturity: "Foundation",
    estimatedDuration: "1 Week (10 Hours)",
    difficulty: "Beginner",
    provider: "SkillBridge Clinical Informatics Lab",
    evidenceRequired: "Validated RedCap/e-CRF Entry Audit Log & Query Resolution Verification",
    supportingResources: [
      {
        title: "CDISC Clinical Data Standards Overview",
        url: "https://www.cdisc.org",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-literature-evidence-course",
    title: "Classical Literature Retrieval & PRISMA Systematic Evidence Synthesis",
    description:
      "Guided module on extracting Samhita evidence, Sanskrit technical terminology translation, and mapping traditional indications to modern MeSH headings for systematic reviews.",
    type: "Course",
    competencyId: "comp-ayush-literature-evidence",
    targetMaturity: "Foundation",
    estimatedDuration: "10 Days",
    difficulty: "Beginner",
    provider: "National Institute of Ayurveda (NIA) Evidence Cell",
    evidenceRequired: "PRISMA-AYUSH Systematic Literature Matrix & Evidence Summary",
    supportingResources: [
      {
        title: "DHARA Digital Helpline for Ayurveda Research Articles",
        url: "https://www.dharaonline.org",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-ethics-icmr-mentor",
    title: "Institutional Ethics Committee (IEC) Dossier Preparation & Defense",
    description:
      "One-on-one and small cohort mentor sessions reviewing informed consent documentation in local vernacular, vulnerable participant safeguards, and risk-benefit justification.",
    type: "Mentor Session",
    competencyId: "comp-ayush-ethics-icmr",
    targetMaturity: "Applied",
    estimatedDuration: "4 Sessions (8 Hours)",
    difficulty: "Intermediate",
    provider: "Apex AYUSH Bioethics Mentorship Forum",
    evidenceRequired: "IEC Submission Package with Participant Informed Consent in Vernacular",
    supportingResources: [
      {
        title: "ICMR Guidelines for Biomedical Research in Children and Vulnerable Groups",
        url: "https://main.icmr.nic.in",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-pvpi-adr-assessment",
    title: "Pharmacovigilance for ASU Drugs & Causality Assessment",
    description:
      "Standardized practical assessment evaluating candidate competency in suspected adverse reaction triage, blue form submission, and WHO-UMC causality classification.",
    type: "Assessment",
    competencyId: "comp-ayush-pharmacovigilance",
    targetMaturity: "Applied",
    estimatedDuration: "1 Week",
    difficulty: "Intermediate",
    provider: "National Pharmacovigilance Centre for AYUSH (NPvC)",
    evidenceRequired: "WHO-UMC Causality Assessment of 3 Standardized Herbal ADR Case Reports",
    supportingResources: [
      {
        title: "PvPI Blue Form and AYUSH Guidelines",
        url: "https://ipc.gov.in",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-bedside-diagnostics-task",
    title: "Clinical Nadi Pariksha & Rogi-Roga Assessment at Bedside",
    description:
      "Supervised bedside diagnostic task recording pulse patterns (Gati, Vega, Tala), tongue signs (Jihva Pariksha), and Prakriti-Vikriti discordance in real patients.",
    type: "Practical Task",
    competencyId: "comp-ayush-bedside-diagnostics",
    targetMaturity: "Applied",
    estimatedDuration: "2 Weeks",
    difficulty: "Intermediate",
    provider: "Department of Kayachikitsa, AIIA",
    evidenceRequired: "Clinical Case Diary of 5 Verified Comprehensive Ashta-vidha Pariksha Logsheets",
    supportingResources: [
      {
        title: "Clinical Methods in Ayurvedic Medicine",
        url: "https://aiia.gov.in",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-panchakarma-workshop",
    title: "Standardized Purvakarma & Paschatkarma Clinical Supervision",
    description:
      "Hands-on clinical workshop covering Snehana-Swedana titration, Vamana/Virechana administration protocols, and complication management in clinical setups.",
    type: "Workshop",
    competencyId: "comp-ayush-panchakarma-chikitsa",
    targetMaturity: "Applied",
    estimatedDuration: "5 Days (30 Hours)",
    difficulty: "Intermediate",
    provider: "National Ayurveda Research Institute for Panchakarma (NARIP)",
    evidenceRequired: "Clinical Procedure Log and Emergency Protocol Sign-off",
    supportingResources: [
      {
        title: "Standard Treatment Guidelines for Panchakarma",
        url: "https://ccras.nic.in",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-chronic-mgmt-project",
    title: "Integrative Metabolic Syndrome & Chronic Care Management Project",
    description:
      "Multi-week clinical project assessing longitudinal outcomes, dietetics (Pathya-Apathya), and herbal adjuvant therapies in type-2 diabetes and dyslipidemia.",
    type: "Industry Project",
    competencyId: "comp-ayush-chronic-case-mgmt",
    targetMaturity: "Advanced",
    estimatedDuration: "4 Weeks",
    difficulty: "Advanced",
    provider: "Dabur AYUSH Healthcare & Research Foundation",
    evidenceRequired: "Longitudinal Clinical Outcome Assessment of 3 Chronic Metabolic Cases",
    supportingResources: [
      {
        title: "Integrative Protocols for Non-Communicable Diseases",
        url: "https://ayush.gov.in",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-gmp-schedulet-course",
    title: "Schedule T GMP Compliance, In-Process QC & ASU Manufacturing",
    description:
      "Industrial certification course covering raw material authentication, microbial limits, heavy metal analysis, and Schedule T regulatory documentation for ASU drugs.",
    type: "Course",
    competencyId: "comp-ayush-gmp-schedulet",
    targetMaturity: "Applied",
    estimatedDuration: "3 Weeks",
    difficulty: "Intermediate",
    provider: "ASU Pharma Quality Cell & Dabur Research Foundation",
    evidenceRequired: "Batch Manufacturing Record (BMR) Audit and Heavy Metal Lab Report Review",
    supportingResources: [
      {
        title: "Drugs and Cosmetics Act Schedule T Overview",
        url: "https://ayush.gov.in",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-regulatory-filing-challenge",
    title: "AYUSH Export Dossier & Rule 158-B Regulatory Filing Simulation",
    description:
      "Hands-on regulatory challenge simulating filing of Form 24-D licenses, safety documentation for proprietary ASU formulations, and WHO-GMP export certificates.",
    type: "Research Challenge",
    competencyId: "comp-ayush-regulatory-filing",
    targetMaturity: "Advanced",
    estimatedDuration: "2 Weeks",
    difficulty: "Advanced",
    provider: "AYUSH Regulatory Council & Industry Cell",
    evidenceRequired: "Complete Technical Dossier for Herbal Formulation License Approval",
    supportingResources: [
      {
        title: "Ayurvedic Pharmacopoeia of India Formulations",
        url: "https://pcimconline.nic.in",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-yoga-chikitsa-workshop",
    title: "Therapeutic Yoga Protocol Prescription for Musculoskeletal & Metabolic Disorders",
    description:
      "Intensive workshop detailing biomechanical adaptations, Shatkriyas, and Pranayama sequences customized for spondylosis, hypertension, and stress-induced disorders.",
    type: "Workshop",
    competencyId: "comp-ayush-yoga-chikitsa",
    targetMaturity: "Applied",
    estimatedDuration: "1 Week (20 Hours)",
    difficulty: "Intermediate",
    provider: "Morarji Desai National Institute of Yoga (MDNIY)",
    evidenceRequired: "Individualized Therapeutic Yoga Session Plan with Contraindications",
    supportingResources: [
      {
        title: "WHO Benchmarks for Training in Yoga",
        url: "https://www.who.int",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-stress-autonomic-task",
    title: "Heart Rate Variability (HRV) & Autonomic Biofeedback Modulation",
    description:
      "Laboratory workstation testing autonomic nervous system tone modulation via Yoga Nidra and slow Pranayama using ECG-derived HRV metrics.",
    type: "Practical Task",
    competencyId: "comp-ayush-stress-autonomic-regulation",
    targetMaturity: "Applied",
    estimatedDuration: "10 Days",
    difficulty: "Intermediate",
    provider: "MDNIY Autonomic Research Laboratory",
    evidenceRequired: "Pre/Post Biofeedback HRV Modulation Dataset Analysis and Clinical Summary",
    supportingResources: [
      {
        title: "Autonomic Nervous System & Yogic Breathing Literature",
        url: "https://pubmed.ncbi.nlm.nih.gov",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-biostat-epidem-course",
    title: "Biostatistics & Epidemiological Sampling for AYUSH Clinical Trials",
    description:
      "Applied biostatistics curriculum covering power calculation, survival analysis, intention-to-treat (ITT) protocol, and statistical reporting in traditional medicine journals.",
    type: "Course",
    competencyId: "comp-ayush-biostat-epidemiology",
    targetMaturity: "Applied",
    estimatedDuration: "2 Weeks",
    difficulty: "Intermediate",
    provider: "Indian Institute of Public Health & CCRAS",
    evidenceRequired: "Sample Size Calculation & Statistical Analysis Plan (SAP) for AYUSH Trial",
    supportingResources: [
      {
        title: "CONSORT Extension for Herbal Medicine",
        url: "https://www.consort-statement.org",
        type: "document",
      },
    ],
    active: true,
  },
  {
    id: "int-phytopharma-project",
    title: "Ayurvedic Phytopharmacology & Herb-Drug Interaction Matrix",
    description:
      "Laboratory project analyzing bioactive markers, fingerprinting (HPTLC/HPLC), and cytochrome P450 inhibition profiles of classical compound formulations.",
    type: "Industry Project",
    competencyId: "comp-ayush-phytopharmacology",
    targetMaturity: "Applied",
    estimatedDuration: "3 Weeks",
    difficulty: "Intermediate",
    provider: "Dabur R&D Phytochemistry Division",
    evidenceRequired: "HPTLC Fingerprinting Interpretation & CYP3A4 Interaction Assessment",
    supportingResources: [
      {
        title: "Ayurvedic Pharmacopoeia Quality Standards",
        url: "https://pcimconline.nic.in",
        type: "document",
      },
    ],
    active: true,
  },
];

// ============================================================================
// INTERVENTION RECOMMENDATION ENGINE
// ============================================================================

export interface RecommendedInterventionItem {
  competencyId: string;
  competencyName: string;
  baselineLevel: number;
  targetLevel: number;
  gapSize: number;
  importance: "essential" | "preferred";
  priority: "high" | "medium" | "low";
  intervention: AyushDevelopmentIntervention;
  rationale: string;
}

/**
 * Generates prioritized development interventions for a student aiming for a specific AYUSH role.
 *
 * Prioritization logic:
 * 1. student current level < role target level (gap exists).
 * 2. Larger gap = higher priority.
 * 3. Essential competencies ranked above preferred.
 * 4. Foundation gaps recommend Foundation interventions first; Applied/Advanced recommend progressively harder.
 */
export const COMPETENCY_ALIASES: Record<string, string[]> = {
  "comp-ayush-gcp": ["comp-ayush-gcp"],
  "comp-ayush-trial-design": ["comp-ayush-trial-design"],
  "comp-ayush-pvpi": ["comp-ayush-pvpi", "comp-ayush-pharmacovigilance"],
  "comp-ayush-pharmacovigilance": ["comp-ayush-pharmacovigilance", "comp-ayush-pvpi"],
  "comp-ayush-herb-drug": ["comp-ayush-herb-drug", "comp-ayush-phytopharmacology"],
  "comp-ayush-phytopharmacology": ["comp-ayush-phytopharmacology", "comp-ayush-herb-drug"],
  "comp-ayush-bioethics": ["comp-ayush-bioethics", "comp-ayush-ethics-icmr"],
  "comp-ayush-ethics-icmr": ["comp-ayush-ethics-icmr", "comp-ayush-bioethics"],
  "comp-ayush-data-mgmt": ["comp-ayush-data-mgmt", "comp-ayush-crf-edc"],
  "comp-ayush-crf-edc": ["comp-ayush-crf-edc", "comp-ayush-data-mgmt"],
  "comp-ayush-standardization": ["comp-ayush-standardization", "comp-ayush-gmp-schedulet"],
  "comp-ayush-gmp-schedulet": ["comp-ayush-gmp-schedulet", "comp-ayush-standardization"],
  "comp-ayush-biostats": ["comp-ayush-biostats", "comp-ayush-biostat-epidemiology"],
  "comp-ayush-biostat-epidemiology": ["comp-ayush-biostat-epidemiology", "comp-ayush-biostats"],
  "comp-ayush-samhita-epistemology": ["comp-ayush-samhita-epistemology", "comp-ayush-literature-evidence"],
  "comp-ayush-literature-evidence": ["comp-ayush-literature-evidence", "comp-ayush-samhita-epistemology"],
  "comp-ayush-bedside-diagnostics": ["comp-ayush-bedside-diagnostics"],
  "comp-ayush-panchakarma-chikitsa": ["comp-ayush-panchakarma-chikitsa"],
  "comp-ayush-chronic-case-mgmt": ["comp-ayush-chronic-case-mgmt"],
  "comp-ayush-regulatory-filing": ["comp-ayush-regulatory-filing"],
  "comp-ayush-yoga-chikitsa": ["comp-ayush-yoga-chikitsa"],
  "comp-ayush-stress-autonomic-regulation": ["comp-ayush-stress-autonomic-regulation"],
};

export function recommendInterventionsForRole(
  studentId: string,
  roleId: string,
  passport: AyushSkillPassport | null,
  availableInterventions: AyushDevelopmentIntervention[] = AYUSH_DEVELOPMENT_INTERVENTIONS
): RecommendedInterventionItem[] {
  const role = getAyushTargetRole(roleId);
  if (!role) return [];

  // Build current student competency level lookup
  const studentLevels = new Map<string, number>();
  if (passport?.competencies && Array.isArray(passport.competencies)) {
    for (const comp of passport.competencies) {
      if (comp.id) {
        // If currentLevel is explicit, use it; otherwise, unverified student competencies default to baseline (1 or 2)
        const demonstrated = (comp as any).currentLevel ?? (comp.verifiedBy && comp.demonstratedAt ? 2 : 1);
        studentLevels.set(comp.id, demonstrated);
        const aliases = COMPETENCY_ALIASES[comp.id] || [];
        for (const alias of aliases) {
          if (!studentLevels.has(alias)) {
            studentLevels.set(alias, demonstrated);
          }
        }
      }
    }
  }

  // Calculate gaps
  const gapItems: Array<{
    competencyId: string;
    targetLevel: number;
    baselineLevel: number;
    gapSize: number;
    importance: "essential" | "preferred";
  }> = [];

  for (const mapping of role.competencies) {
    const current = studentLevels.get(mapping.competencyId) ?? 1;
    const gap = mapping.targetLevel - current;

    if (gap > 0) {
      gapItems.push({
        competencyId: mapping.competencyId,
        targetLevel: mapping.targetLevel,
        baselineLevel: current,
        gapSize: gap,
        importance: mapping.importance,
      });
    }
  }

  // Sort gaps by priority:
  // 1. Gap size descending
  // 2. Essential before preferred
  gapItems.sort((a, b) => {
    if (b.gapSize !== a.gapSize) return b.gapSize - a.gapSize;
    if (a.importance === "essential" && b.importance !== "essential") return -1;
    if (b.importance === "essential" && a.importance !== "essential") return 1;
    return 0;
  });

  const recommendations: RecommendedInterventionItem[] = [];

  for (const gap of gapItems) {
    const validIds = new Set([gap.competencyId, ...(COMPETENCY_ALIASES[gap.competencyId] || [])]);

    // Find matching interventions for this competency or its aliases
    const matching = availableInterventions.filter(
      (inv) => inv.active && validIds.has(inv.competencyId)
    );

    if (matching.length === 0) continue;

    // Pick best intervention based on student progression stage:
    // If student is at Foundation level (<= 2), pick Foundation first, then Applied.
    // If student is at Applied (3), pick Applied or Advanced.
    const baselineMaturity = getMaturityFromLevel(gap.baselineLevel);

    let selectedIntervention = matching.find((inv) => {
      if (baselineMaturity === "Foundation") return inv.targetMaturity === "Foundation";
      if (baselineMaturity === "Applied") return inv.targetMaturity === "Applied";
      return inv.targetMaturity === "Advanced";
    });

    // Fallback to the first matching intervention if exact maturity tier not present
    if (!selectedIntervention) {
      selectedIntervention = matching[0];
    }

    const priority: "high" | "medium" | "low" =
      gap.gapSize >= 3 || (gap.gapSize >= 2 && gap.importance === "essential")
        ? "high"
        : gap.gapSize >= 2
        ? "medium"
        : "low";

    recommendations.push({
      competencyId: gap.competencyId,
      competencyName: selectedIntervention.title,
      baselineLevel: gap.baselineLevel,
      targetLevel: gap.targetLevel,
      gapSize: gap.gapSize,
      importance: gap.importance,
      priority,
      intervention: selectedIntervention,
      rationale: `Targeting Level ${gap.targetLevel} requirement for ${role.name}. Current demonstrated competence is Level ${gap.baselineLevel} (${baselineMaturity}).`,
    });
  }

  return recommendations;
}

/**
 * Creates an initial student development plan payload from a recommendation.
 */
export function createDevelopmentPlanFromRecommendation(
  studentId: string,
  roleId: string,
  recommendation: RecommendedInterventionItem
): AyushStudentDevelopmentPlan {
  const now = new Date().toISOString();
  return {
    id: `plan_${studentId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12)}_${recommendation.intervention.id}`,
    studentId,
    roleId,
    competencyId: recommendation.competencyId,
    baselineLevel: recommendation.baselineLevel,
    targetLevel: recommendation.targetLevel,
    interventionId: recommendation.intervention.id,
    status: "RECOMMENDED",
    startedAt: null,
    completedAt: null,
    evidenceStatus: null,
    evidenceSubmission: null,
    intervention: recommendation.intervention,
    createdAt: now,
    updatedAt: now,
  };
}
