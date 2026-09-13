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

// The 5 Broad Technical Domains for Interest Finder Entry
export const interestDomains: InterestDomain[] = [
  {
    id: "ai-ml",
    name: "AI / Machine Learning",
    tagline: "From statistical foundations to intelligent systems",
    description:
      "Explores data-driven intelligence, pattern discovery, and automation. If you like mathematics, experimentation, or intelligent software, this domain examines where you excel.",
    subDisciplines: [
      "Deep Learning & Computer Vision",
      "Natural Language Processing & LLMs",
      "Machine Learning Operations (MLOps)",
      "Data Engineering & Analytics",
    ],
    keyQuestionsExamined: [
      "Do you prefer mathematical modeling or building the data pipeline around the model?",
      "Are you more drawn to vision/audio processing or language semantics?",
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    tagline: "Scalability, distributed topology, and reliability engineering",
    description:
      "Focuses on how modern global software runs, scales, and stays resilient under heavy load. If you like systems, automation, and architecture, this domain maps your inclinations.",
    subDisciplines: [
      "Cloud Solutions Architecture (AWS/Azure)",
      "Site Reliability Engineering (SRE)",
      "DevOps & Automated CI/CD Pipelines",
      "Serverless & Edge Compute",
    ],
    keyQuestionsExamined: [
      "Do you enjoy designing high-availability architecture or automating deployments?",
      "Are you interested in infrastructure-as-code or cost/latency optimization?",
    ],
  },
  {
    id: "web",
    name: "Web & Full-Stack Systems",
    tagline: "Interactive user interfaces and high-performance backend services",
    description:
      "Spans user-facing responsiveness to scalable server-side APIs. If you enjoy building things people interact with directly or high-throughput distributed backends, discover your exact balance.",
    subDisciplines: [
      "Modern Frontend Architecture (React/Next.js)",
      "High-Throughput Backend APIs & Microservices",
      "Full-Stack Application Engineering",
      "Web Performance & Accessibility",
    ],
    keyQuestionsExamined: [
      "Do you lean toward crafting crisp interactive UIs or designing low-latency server APIs?",
      "Do you prefer state management and component UX or schema design and caching?",
    ],
  },
  {
    id: "security",
    name: "Cybersecurity & Defense",
    tagline: "Protecting systems, verifying trust, and threat mitigation",
    description:
      "Centers on defending digital infrastructure against adversarial vulnerabilities, ensuring privacy, and establishing cryptographic proof.",
    subDisciplines: [
      "Application Security & Code Auditing",
      "Network Defense & Threat Operations (SOC)",
      "Penetration Testing & Ethical Hacking",
      "Cloud & Identity Governance (IAM)",
    ],
    keyQuestionsExamined: [
      "Are you more fascinated by finding vulnerabilities or architecting defensive bastions?",
      "Do you prefer network traffic analysis or application-level security audits?",
    ],
  },
  {
    id: "software",
    name: "Software & Core Systems",
    tagline: "Algorithms, low-level engineering, and performant logic",
    description:
      "Dives into the computational engine beneath all applications: memory allocation, kernel interactions, compiler optimizations, and robust object-oriented designs.",
    subDisciplines: [
      "Systems Programming (C++, Rust, Go)",
      "Embedded Systems & IoT Firmware",
      "Distributed Database Engines",
      "Algorithmic Problem Solving & SDKs",
    ],
    keyQuestionsExamined: [
      "Do you enjoy writing performant close-to-the-metal code or designing reusable system abstractions?",
      "Are you excited by concurrency and threading or memory management and CPU efficiency?",
    ],
  },
];

// Realistic Institutional Default Student Record
export const defaultStudentProfile: StudentProfileData = {
  id: "stu-2024-042",
  fullName: "Alex Rivera",
  email: "alex.rivera@nit.edu",
  rollNumber: "NIT-CSE-2022-042",
  department: "Department of Computer Science & Engineering",
  course: "B.Tech Computer Science",
  semester: 6,
  batchYear: "2022–2026",
  institution: "National Institute of Technology",
  currentWorkflowStage: 1,
};
