/**
 * Skill-Bridge — AYUSH Domain Constants
 * Single source of truth for AYUSH system identifiers, taxonomy categories,
 * and role definitions. Import from here instead of hard-coding strings.
 */

// ============================================================================
// AYUSH SYSTEMS
// ============================================================================

export const AYUSH_SYSTEMS = [
  "Ayurveda",
  "Yoga & Naturopathy",
  "Unani",
  "Siddha",
  "Homoeopathy",
] as const;

export type AyushSystem = (typeof AYUSH_SYSTEMS)[number];

export const AYUSH_SYSTEM_IDS = {
  AYURVEDA: "ayurveda",
  YOGA_NATUROPATHY: "yoga-naturopathy",
  UNANI: "unani",
  SIDDHA: "siddha",
  HOMOEOPATHY: "homoeopathy",
} as const;

export type AyushSystemId = (typeof AYUSH_SYSTEM_IDS)[keyof typeof AYUSH_SYSTEM_IDS];

export interface AyushSystemMeta {
  id: AyushSystemId;
  name: AyushSystem;
  abbreviation: string;
  description: string;
  regulatoryBody: string;
}

export const AYUSH_SYSTEM_CATALOG: AyushSystemMeta[] = [
  {
    id: "ayurveda",
    name: "Ayurveda",
    abbreviation: "AY",
    description: "Traditional Indian system of medicine based on natural and holistic healing.",
    regulatoryBody: "Central Council of Indian Medicine (CCIM)",
  },
  {
    id: "yoga-naturopathy",
    name: "Yoga & Naturopathy",
    abbreviation: "YN",
    description: "Mind-body healing through Yoga disciplines and drugless naturopathic therapies.",
    regulatoryBody: "Central Council of Indian Medicine (CCIM)",
  },
  {
    id: "unani",
    name: "Unani",
    abbreviation: "UN",
    description: "Greco-Arabic system of medicine founded on the four-humour theory.",
    regulatoryBody: "Central Council of Indian Medicine (CCIM)",
  },
  {
    id: "siddha",
    name: "Siddha",
    abbreviation: "SI",
    description: "Ancient Tamil system of medicine based on five elements and pulse diagnosis.",
    regulatoryBody: "Central Council of Indian Medicine (CCIM)",
  },
  {
    id: "homoeopathy",
    name: "Homoeopathy",
    abbreviation: "HO",
    description: "System based on the principle of 'like cures like' using highly diluted preparations.",
    regulatoryBody: "Central Council of Homoeopathy (CCH)",
  },
];

// ============================================================================
// ACADEMIC LEVELS
// ============================================================================

export const AYUSH_ACADEMIC_LEVELS = ["UG", "PG", "PhD", "Diploma"] as const;
export type AyushAcademicLevel = (typeof AYUSH_ACADEMIC_LEVELS)[number];

// ============================================================================
// PLATFORM ROLES (Four-Role Model)
// ============================================================================

export const PLATFORM_ROLES = ["student", "institution", "industry", "ministry"] as const;
export type PlatformRole = (typeof PLATFORM_ROLES)[number];

/**
 * Maps legacy DB role values to the four-role model.
 * `faculty` and `campus` remain valid internally for existing auth flows.
 * `campus` maps to `institution` in the new model.
 */
export const ROLE_DISPLAY_NAMES: Record<string, string> = {
  student: "Student",
  faculty: "Faculty",
  campus: "Institution",
  industry: "Industry",
  ministry: "Ministry",
};

// ============================================================================
// AYUSH SKILL TAXONOMY CATEGORIES
// ============================================================================

export const AYUSH_SKILL_CATEGORIES = [
  "Clinical Knowledge",
  "Clinical Reasoning",
  "Diagnostics",
  "Emergency/Triage Awareness",
  "AYUSH Core Practice",
  "Research & Evidence",
  "Research Methodology",
  "Biostatistics",
  "Pharmacovigilance",
  "Herb-Drug Interaction Awareness",
  "Digital Health",
  "EHR/ABDM Awareness",
  "Communication",
  "Patient Counselling",
  "Regulatory Awareness",
  "Healthcare Administration",
  "Scientific Validation",
  "Documentation",
  "Entrepreneurship",
  "Industry Skills",
] as const;

export type AyushSkillCategory = (typeof AYUSH_SKILL_CATEGORIES)[number];
