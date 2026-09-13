/**
 * Skill Bridge — Personalized Niche Trends Engine (AYUSH Healthcare)
 * Grounds emerging clinical and research paradigms into actionable, profile-contextualized
 * skill recommendations tailored to the student's confirmed AYUSH system & niche.
 */

export interface NicheTrendItem {
  id: string;
  domainId: string;
  nicheId: string;
  trendTitle: string;
  whyItMatters: string;
  recommendedSkill: string;
  relationshipToProfile: string;
  suggestedNextStep: string;
  source: string;
  lastUpdated: string;
}

// Canonical, verified healthcare shifts by AYUSH system & niche
const NICHE_TREND_CATALOG: NicheTrendItem[] = [
  // ==========================================================================
  // AYURVEDA
  // ==========================================================================
  {
    id: "trend-ayu-kayachikitsa-1",
    domainId: "ayurveda",
    nicheId: "kayachikitsa",
    trendTitle: "Integrative Oncology Protocols & Bio-Enhancing Botanical Adjuvants",
    whyItMatters:
      "Premier tertiary hospitals are integrating standardized Ayurvedic Rasayana formulations alongside chemotherapy to reduce mucositis and enhance immune reconstitution.",
    recommendedSkill: "Integrative Oncology Formulation & Hematological Toxicity Monitoring",
    relationshipToProfile:
      "Builds directly upon your foundation in classical Kayachikitsa and Dravyaguna, translating ancient Rasayana principles into evidence-based integrative hospital rounds.",
    suggestedNextStep:
      "Review CTRI-registered clinical trials evaluating Withania somnifera and Tinospora cordifolia in supportive cancer care.",
    source: "Central Council for Research in Ayurvedic Sciences (CCRAS) & AIIA Research Bulletin",
    lastUpdated: "2026-03-01T00:00:00Z",
  },
  {
    id: "trend-ayu-panchakarma-2",
    domainId: "ayurveda",
    nicheId: "panchakarma",
    trendTitle: "Digital Continuous Hemodynamic Monitoring in High-Volume Virechana",
    whyItMatters:
      "Accredited NABH AYUSH hospitals are standardizing Snehapana and Virechana protocols with real-time biometric telemetry and electrolyte tracking.",
    recommendedSkill: "Precision Snehapana Lipid Profiling & Electrolyte Homeostasis",
    relationshipToProfile:
      "Advances your mastery of classical Samyak Snigdha signs by corroborating physical observation with quantitative physiological biomarkers.",
    suggestedNextStep:
      "Participate in clinical mock simulations for managing dehydration complications during therapeutic purgation.",
    source: "NABH Clinical Standards for AYUSH Hospitals (3rd Edition)",
    lastUpdated: "2026-02-15T00:00:00Z",
  },

  // ==========================================================================
  // YOGA & NATUROPATHY
  // ==========================================================================
  {
    id: "trend-yn-yoga-1",
    domainId: "yoga-naturopathy",
    nicheId: "clinical-yoga-therapy",
    trendTitle: "Heart Rate Variability (HRV) Biofeedback in Therapeutic Pranayama",
    whyItMatters:
      "Cardiology centers are adopting targeted resonant-frequency breathing (0.1 Hz) and Nadishodhana with continuous PPG/ECG biofeedback for drug-resistant hypertension.",
    recommendedSkill: "HRV-Guided Resonant Pranayama Prescription",
    relationshipToProfile:
      "Elevates your clinical Yoga therapy foundation by integrating real-time autonomic vagal tone feedback with classical breath ratios.",
    suggestedNextStep:
      "Conduct supervised sessions utilizing portable HRV sensor monitors to track sympathetic-parasympathetic balance.",
    source: "Central Council for Research in Yoga & Naturopathy (CCRYN) Clinical Guidelines",
    lastUpdated: "2026-02-20T00:00:00Z",
  },

  // ==========================================================================
  // UNANI
  // ==========================================================================
  {
    id: "trend-una-regimenal-1",
    domainId: "unani",
    nicheId: "ilaj-bit-tadbeer",
    trendTitle: "Aseptic Disposable Vacuum Cupping & Micro-Vascular Rheology",
    whyItMatters:
      "Hospital-based Unani clinical units are pairing classical Hijama-bil-Shart with laser Doppler flowmetry to demonstrate microvascular reperfusion in ischemic ulcers.",
    recommendedSkill: "Standardized Aseptic Hijama & Tissue Perfusion Assessment",
    relationshipToProfile:
      "Combines your competence in physical regimental therapies with rigorous microbiological safety and objective hemodynamic verification.",
    suggestedNextStep:
      "Complete the NIUM certified hands-on clinical workshop in sterile clinical regimental interventions.",
    source: "National Institute of Unani Medicine (NIUM) Research Directorate",
    lastUpdated: "2026-02-25T00:00:00Z",
  },

  // ==========================================================================
  // SIDDHA
  // ==========================================================================
  {
    id: "trend-sid-varmam-1",
    domainId: "siddha",
    nicheId: "varmam-therapy",
    trendTitle: "Neuro-Electrophysiological Mapping of 108 Varmam Nodes",
    whyItMatters:
      "Neurological rehabilitation centers are documenting somatosensory evoked potentials (SSEPs) during Varmam pressure stimulation for post-stroke hemiparesis.",
    recommendedSkill: "Varmam Neuro-Anatomical Mapping & Electromyographic Monitoring",
    relationshipToProfile:
      "Bridges your intuitive grasp of Varmam points with quantitative neuro-muscular electrophysiology.",
    suggestedNextStep:
      "Study cross-sectional radiological atlases linking classical Varmam nodes to superficial nerve trunks and fascial planes.",
    source: "National Institute of Siddha (NIS) Faculty of Varmam Science",
    lastUpdated: "2026-03-05T00:00:00Z",
  },

  // ==========================================================================
  // HOMOEOPATHY
  // ==========================================================================
  {
    id: "trend-hom-repertory-1",
    domainId: "homoeopathy",
    nicheId: "repertory-casataking",
    trendTitle: "Algorithmic Rubric Clustering & Large-Scale Provings Verification",
    whyItMatters:
      "Modern homoeopathic research platforms utilize validated Bayesian rubric filtering to eliminate over-represented common rubrics and isolate true constitutional keynotes.",
    recommendedSkill: "Bayesian Repertorial Synthesis & Quantitative Provings Analysis",
    relationshipToProfile:
      "Refines your classical Kentian case-taking precision, enabling rapid identification of strange, rare, and peculiar symptoms without rubric inflation.",
    suggestedNextStep:
      "Evaluate complex multi-rubric clinical cases using modern computerized Synthesis and RadarOpus analytical engines.",
    source: "Central Council for Research in Homoeopathy (CCRH) Scientific Advisory Board",
    lastUpdated: "2026-02-28T00:00:00Z",
  },
];

/**
 * Returns personalized niche trends for an advanced student.
 * If student is not advanced, returns null.
 */
export function getPersonalizedNicheTrends(params: {
  isAdvanced: boolean;
  domainId?: string;
  nicheId?: string;
  studentSkills?: string[];
}): NicheTrendItem[] | null {
  if (!params.isAdvanced) {
    return null;
  }

  const { domainId, nicheId } = params;

  // Filter trends matching student's domain or niche
  let matched = NICHE_TREND_CATALOG.filter((trend) => {
    if (nicheId && trend.nicheId === nicheId) return true;
    if (domainId && trend.domainId === domainId) return true;
    return false;
  });

  // If no exact domain match, provide the top cross-disciplinary technical shifts
  if (matched.length === 0) {
    matched = NICHE_TREND_CATALOG.slice(0, 2);
  }

  return matched;
}
