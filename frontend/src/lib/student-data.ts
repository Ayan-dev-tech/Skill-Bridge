/**
 * Skill Bridge — Student Data Architecture & Workflow Definitions
 * Clean TypeScript interfaces and realistic institutional defaults for the Student experience.
 */

export interface StudentProfileData {
  id: string;
  fullName: string;
  email: string;
  rollNumber: string;
  department: string;
  course: string;
  semester: number;
  batchYear: string;
  institution: string;
  currentWorkflowStage: number; // 1 to 7
  photoUrl?: string;
}

export type WorkflowStageStatus =
  | "completed"
  | "in_progress"
  | "available"
  | "locked"
  | "not_started";

export interface WorkflowStage {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  status: "current" | "completed" | "upcoming" | WorkflowStageStatus;
  route: string;
}

export interface DashboardCurrentFocus {
  stage: number;
  title: string;
  subtitle: string;
  actionText: string;
  actionHref: string;
  status: WorkflowStageStatus;
}

export interface DashboardSectionItem {
  id: string;
  stage: number;
  name: string;
  description: string;
  href: string;
  status: WorkflowStageStatus;
  lockReason: string | null;
}


export interface InterestDomain {
  id: string;
  name: string;
  tagline: string;
  description: string;
  subDisciplines: string[];
  keyQuestionsExamined: string[];
}

// 8-Stage Complete Student Workflow Journey — AYUSH Healthcare & Classical Systems
export const studentWorkflowStages: WorkflowStage[] = [
  {
    id: 1,
    slug: "document-verification",
    name: "Document Submission",
    shortDescription: "Upload required academic and identity documents to complete your student profile",
    status: "current",
    route: "/student/document-verification",
  },
  {
    id: 2,
    slug: "interest-finder",
    name: "AYUSH Assessment Center",
    shortDescription: "Benchmark competencies across NEET UG, AIAPGET PG, and Practical Scenarios",
    status: "upcoming",
    route: "/student/knowledge-testing",
  },
  {
    id: 3,
    slug: "knowledge-testing",
    name: "AYUSH Benchmarking",
    shortDescription: "Evaluate performance across authentic AYUSH PYQs and clinical scenarios",
    status: "upcoming",
    route: "/student/knowledge-testing",
  },
  {
    id: 4,
    slug: "skill-gap",
    name: "AYUSH Skill Gap & Matrix",
    shortDescription: "Identify clinical and taxonomy gaps vs. healthcare and industry criteria",
    status: "upcoming",
    route: "/student/skill-gap",
  },
  {
    id: 5,
    slug: "learning",
    name: "Learning / Mentoring",
    shortDescription: "Access curated AYUSH curriculum tracks and faculty mentorship",
    status: "upcoming",
    route: "/student/learning",
  },
  {
    id: 6,
    slug: "resume",
    name: "Resume Checker",
    shortDescription: "Analyze your medical/clinical profile with diagnostics and verification",
    status: "available",
    route: "/student/resume-checker",
  },
  {
    id: 7,
    slug: "opportunities",
    name: "Jobs & Internships",
    shortDescription: "Explore verified institutional hospital postings, clinical trials, and internships",
    status: "upcoming",
    route: "/student/opportunities",
  },
  {
    id: 8,
    slug: "applications",
    name: "Track Applications",
    shortDescription: "Monitor interview schedules, hospital shortlists, and placement status",
    status: "upcoming",
    route: "/student/applications",
  },
];

// The 5 Canonical AYUSH Systems for Interest Finder Entry
export const interestDomains: InterestDomain[] = [
  {
    id: "ayurveda",
    name: "Ayurveda",
    tagline: "Tridosha theory, Dravyaguna, Panchakarma, and holistic healing",
    description:
      "Explores ancient Indian medical science based on fundamental principles of Vata, Pitta, and Kapha, herbal-mineral pharmacology, and classical clinical detoxification.",
    subDisciplines: [
      "Kayachikitsa (Internal Medicine)",
      "Panchakarma (Detoxification & Cleansing)",
      "Dravyaguna Vigyan (Pharmacology & Materia Medica)",
      "Rasa Shastra & Bhaishajya Kalpana (Formulation Science)",
    ],
    keyQuestionsExamined: [
      "Do you prefer clinical bedside diagnosis or botanical/classical formulation research?",
      "Are you more drawn to constitutional Prakriti assessment or Panchakarma therapeutic protocols?",
    ],
  },
  {
    id: "yoga-naturopathy",
    name: "Yoga & Naturopathy",
    tagline: "Drugless therapies, physiological balance, and mind-body harmony",
    description:
      "Focuses on self-healing mechanisms through nature cure, Shatkriyas, therapeutic Asana/Pranayama, hydrotherapy, and metabolic lifestyle interventions.",
    subDisciplines: [
      "Clinical Yoga Therapy & Stress Physiology",
      "Hydrotherapy & Mud Therapy",
      "Dietetics & Fasting Therapy",
      "Acupuncture & Reflexology",
    ],
    keyQuestionsExamined: [
      "Do you enjoy designing personalized yogic rehabilitation protocols or metabolic fasting regimens?",
      "Are you interested in autonomic nervous system balance or natural physical modalities?",
    ],
  },
  {
    id: "unani",
    name: "Unani Medicine",
    tagline: "Humoral theory, Mizaj, Ilaj-bit-Tadbeer, and natural therapeutics",
    description:
      "Based on the Hippocratic-Galenic doctrine of four humors (Dam, Balgham, Safra, Sauda), pulse examination (Nabz), and restorative regimenal therapies.",
    subDisciplines: [
      "Moalajat (General Medicine & Therapeutics)",
      "Ilaj-bit-Tadbeer (Regimenal Therapy: Cupping, Leeching)",
      "Ilaj-bil-Advia (Pharmacotherapy & Single Drugs)",
      "Kulliyat (Basic Principles & Temperamental Diagnosis)",
    ],
    keyQuestionsExamined: [
      "Are you more fascinated by temperament (Mizaj) differentiation or regimenal intervention techniques?",
      "Do you prefer pulse diagnostics (Nabz) or classical botanical compound formulation?",
    ],
  },
  {
    id: "siddha",
    name: "Siddha Medicine",
    tagline: "Tridosha balance, Varmam science, and mineral-herbal alchemy",
    description:
      "Ancient traditional Dravidian system emphasizing longevity (Kayakalpam), 108 vital energy points (Varmam), and standardized Parpam/Chendooram preparations.",
    subDisciplines: [
      "Maruthuvam (General Medicine)",
      "Varmam & Thokkanam (Vital Energy & Physical Manipulation)",
      "Gunapadam (Siddha Pharmacology & Materia Medica)",
      "Sirappu Maruthuvam (Specialized Therapeutics)",
    ],
    keyQuestionsExamined: [
      "Are you drawn to Varmam point manipulation or specialized mineral-herbal alchemical processing?",
      "Do you prefer classical diagnostic methods (Envagai Thervu) or preventive Kayakalpa therapy?",
    ],
  },
  {
    id: "homoeopathy",
    name: "Homoeopathy",
    tagline: "Similia Similibus Curentur, vital force, and individualized repertorization",
    description:
      "Grounded in the Law of Similars, potentized micro-doses, holistic case taking, and matching complete symptom profiles through repertorization.",
    subDisciplines: [
      "Organon of Medicine & Philosophy",
      "Homoeopathic Materia Medica",
      "Repertory & Case Taking",
      "Homoeopathic Pharmacy & Potentization",
    ],
    keyQuestionsExamined: [
      "Do you enjoy meticulous case-taking and mental constitutional analysis or Materia Medica drug provings?",
      "Are you excited by repertorization software logic or miasmatic chronic disease mapping?",
    ],
  },
];

// Realistic Institutional Default Student Record
export const defaultStudentProfile: StudentProfileData = {
  id: "stu-ayush-2024-042",
  fullName: "Ananya Sharma",
  email: "ananya.sharma@aiia.ac.in",
  rollNumber: "AIIA-BAMS-2022-042",
  department: "Department of Kayachikitsa & Panchakarma",
  course: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
  semester: 6,
  batchYear: "2022–2026",
  institution: "All India Institute of Ayurveda, New Delhi",
  currentWorkflowStage: 1,
};
