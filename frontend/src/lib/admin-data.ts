/**
 * Skill Bridge — Admin Console Data Architecture (AYUSH Healthcare)
 * Static demo data and system state models for Admin dashboard testing.
 * Strictly scoped to the 5 canonical AYUSH systems:
 * Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homoeopathy.
 */

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  course: string;
  semester: number;
  rollNumber: string;
  status: "active" | "placed" | "internship" | "inactive";
  skills: { name: string; proficiency: "Beginner" | "Intermediate" | "Advanced" }[];
  skillGaps: { skill: string; requiredLevel: string; currentLevel: string; priority: "High" | "Medium" | "Low" }[];
  certifications: { title: string; issuer: string; date: string; verified: boolean }[];
  projects: { title: string; tech: string; description: string }[];
  careerInterests: string[];
  applications: { role: string; company: string; status: "Applied" | "Shortlisted" | "Interviewing" | "Offered" | "Rejected"; date: string }[];
  joinedDate: string;
}
export type StudentRecord = StudentProfile;

export interface FacultyMember {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  subjects: string[];
  coursesHandled: number;
  assessmentsCreated: number;
  status: "verified" | "pending" | "suspended" | "deactivated";
  joinedDate: string;
}
export type FacultyRecord = FacultyMember;

export interface IndustryPartner {
  id: string;
  companyName: string;
  industry: string;
  contactPerson: string;
  contactEmail: string;
  website: string;
  demandedSkills: string[];
  openJobs: number;
  activeInternships: number;
  status: "verified" | "pending" | "rejected";
  isFrozen: boolean;
  freezeReason?: string;
  joinedDate: string;
}

export interface InstitutionRecord {
  id: string;
  name: string;
  type: "Autonomous Apex Institute" | "National Institute" | "Government Medical College" | "Deemed University";
  location: string;
  dean: string;
  contactEmail: string;
  totalStudents: number;
  totalFaculty: number;
  placementRate: number;
  status: "verified" | "pending" | "suspended";
  isSuspended: boolean;
  joinedDate: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category:
    | "Ayurveda"
    | "Yoga & Naturopathy"
    | "Unani"
    | "Siddha"
    | "Homoeopathy"
    | "Clinical Diagnostics"
    | "Classical Formulations"
    | "Pharmacopoeia & Standardization"
    | "Digital Health & ABDM"
    | "Integrative Medicine"
    | "Soft Skills"
    | "Other";
  description: string;
  proficiencyLevels: string[];
  industryDemand: "Very High" | "High" | "Medium" | "Moderate";
  relatedCourses: string[];
}

export interface SkillGapMetric {
  skill: string;
  category: string;
  industryDemand: "Very High" | "High" | "Medium";
  studentProficiency: "Advanced" | "Intermediate" | "Low" | "Beginner";
  affectedStudents: number;
  departments: string[];
  recommendedAction: string;
}

export interface JobListing {
  id: string;
  company: string;
  position: string;
  requiredSkills: string[];
  eligibility: string;
  location: string;
  salary: string;
  deadline: string;
  applicationsCount: number;
  status: "active" | "pending" | "frozen";
}

export interface InternshipListing {
  id: string;
  company: string;
  role: string;
  duration: string;
  requiredSkills: string[];
  stipend: string;
  deadline: string;
  applicationsCount: number;
  status: "active" | "pending" | "frozen";
}

export interface CourseData {
  id: string;
  courseName: string;
  description: string;
  skillsTaught: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  instructor: string;
  enrolledStudents: number;
  certification: boolean;
}

export interface AssessmentData {
  id: string;
  title: string;
  type: "MCQ" | "Coding" | "Aptitude" | "Technical" | "Industry Assessment";
  mappedSkills: string[];
  durationMinutes: number;
  totalAttempts: number;
  averageScore: number;
  status: "published" | "draft" | "archived";
}

export interface CertificationRecord {
  id: string;
  studentName: string;
  department: string;
  certificationName: string;
  issuer: string;
  dateEarned: string;
  skills: string[];
  verified: boolean;
}

export interface ApprovalQueueItem {
  id: string;
  type: "Student" | "Faculty" | "Industry Partner" | "Job" | "Internship" | "Course";
  title: string;
  submittedBy: string;
  submissionDate: string;
  details: string;
  status: "pending" | "approved" | "rejected";
}

export interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  resource: string;
  timestamp: string;
  status: "Success" | "Flagged" | "Blocked";
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "College Admin" | "Placement Admin";
  status: "active" | "suspended";
  lastLogin: string;
}

export const initialStudents: StudentRecord[] = [
  {
    id: "stu-1",
    name: "Ananya Sharma",
    email: "ananya.sharma@aiia.ac.in",
    department: "Department of Kayachikitsa & Panchakarma",
    course: "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
    semester: 6,
    rollNumber: "AIIA-BAMS-2022-042",
    status: "active",
    skills: [
      { name: "Nadi Pariksha Diagnostics", proficiency: "Advanced" },
      { name: "Classical Panchakarma Protocols", proficiency: "Intermediate" },
      { name: "Dravyaguna Pharmacology", proficiency: "Advanced" },
    ],
    skillGaps: [
      { skill: "Schedule T & WHO-GMP Standards", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "High" },
      { skill: "Ayush Grid EHR Documentation", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "Medium" },
    ],
    certifications: [
      { title: "Clinical Fellowship in Panchakarma", issuer: "AIIA New Delhi", date: "2024-03-15", verified: true },
    ],
    projects: [
      { title: "Standardized Herbal Management in Metabolic Syndrome", tech: "Ayurvedic Clinical Trials, CTRI", description: "Evaluated clinical outcomes in 50 patients using classical formulations" },
    ],
    careerInterests: ["Ayurvedic Medical Officer", "Clinical Research Scientist"],
    applications: [
      { role: "Ayurvedic Medical Officer", company: "All India Institute of Ayurveda", status: "Offered", date: "2024-08-10" },
      { role: "Clinical Research Intern", company: "Dabur Research Foundation", status: "Shortlisted", date: "2024-08-01" },
    ],
    joinedDate: "2022-08-15",
  },
  {
    id: "stu-2",
    name: "Priya Nair",
    email: "priya.nair@ninpune.edu",
    department: "Department of Clinical Naturopathy & Yoga Therapy",
    course: "BNYS (Bachelor of Naturopathy & Yogic Sciences)",
    semester: 5,
    rollNumber: "NIN-BNYS-2023-109",
    status: "active",
    skills: [
      { name: "Clinical Yoga Therapy", proficiency: "Advanced" },
      { name: "Hydrotherapy & Balneotherapy", proficiency: "Intermediate" },
      { name: "Therapeutic Dietetics & Fasting", proficiency: "Advanced" },
    ],
    skillGaps: [
      { skill: "Heart Rate Variability (HRV) Biofeedback", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "High" },
      { skill: "Acupuncture Meridian Balancing", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "Medium" },
    ],
    certifications: [
      { title: "Post Graduate Diploma in Yoga Therapy", issuer: "MDNIY New Delhi", date: "2024-05-12", verified: true },
    ],
    projects: [
      { title: "Vagal Nerve Stimulation via Resonant Pranayama", tech: "HRV Telemetry, Clinical Protocol", description: "Demonstrated blood pressure lowering in mild essential hypertension" },
    ],
    careerInterests: ["Senior Naturopathic Physician", "Integrative Wellness Director"],
    applications: [
      { role: "Yoga & Naturopathy Consultant", company: "National Institute of Naturopathy", status: "Applied", date: "2024-08-20" },
    ],
    joinedDate: "2023-08-10",
  },
  {
    id: "stu-3",
    name: "Mohammed Zaid",
    email: "zaid.m@nium.ac.in",
    department: "Department of Moalajat & Ilaj-bit-Tadbeer",
    course: "BUMS (Bachelor of Unani Medicine & Surgery)",
    semester: 6,
    rollNumber: "NIUM-BUMS-2022-019",
    status: "active",
    skills: [
      { name: "Ajnas-e-Nabz Pulse Palpation", proficiency: "Advanced" },
      { name: "Sterile Hijama (Cupping) Technique", proficiency: "Advanced" },
      { name: "Mufradat Single Drug Temperament", proficiency: "Intermediate" },
    ],
    skillGaps: [
      { skill: "Laser Doppler Perfusion Imaging in Hijama", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "High" },
      { skill: "Murakkabat Industrial Formulation", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "Medium" },
    ],
    certifications: [
      { title: "Advanced Regimenal Fellowship", issuer: "NIUM Bengaluru", date: "2024-02-18", verified: true },
    ],
    projects: [
      { title: "Clinical Efficacy of Taleeq in Ischemic Micro-angiopathy", tech: "Leech Therapy, Clinical Trials", description: "Documented acceleration in venous ulcer granulation tissue" },
    ],
    careerInterests: ["Unani Medical Consultant", "Regimenal Surgical Specialist"],
    applications: [
      { role: "Unani Clinical Officer", company: "National Institute of Unani Medicine", status: "Interviewing", date: "2024-08-15" },
    ],
    joinedDate: "2022-08-10",
  },
];

export const initialFaculty: FacultyRecord[] = [
  {
    id: "fac-1",
    name: "Prof. Dr. Rajeshwari Varma",
    email: "r.varma@aiia.gov.in",
    department: "Kayachikitsa & Panchakarma",
    designation: "Head of Department",
    subjects: ["Kayachikitsa", "Panchakarma", "Samhita Siddhanta"],
    coursesHandled: 4,
    assessmentsCreated: 12,
    status: "verified",
    joinedDate: "2018-06-15",
  },
  {
    id: "fac-2",
    name: "Dr. K. S. Raghavan",
    email: "ks.raghavan@nischennai.org",
    department: "Varmam Science & Maruthuvam",
    designation: "Associate Professor",
    subjects: ["Varmam Science", "Gunapadam", "Envagai Thervu"],
    coursesHandled: 3,
    assessmentsCreated: 8,
    status: "verified",
    joinedDate: "2020-02-10",
  },
  {
    id: "fac-3",
    name: "Dr. Hakim Arshad Siddiqui",
    email: "a.siddiqui@nium.in",
    department: "Moalajat & Regimenal Therapies",
    designation: "Professor & Hospital Director",
    subjects: ["Moalajat", "Ilaj-bit-Tadbeer", "Kulliyat"],
    coursesHandled: 3,
    assessmentsCreated: 10,
    status: "verified",
    joinedDate: "2019-07-01",
  },
  {
    id: "fac-4",
    name: "Dr. Suman Sengupta",
    email: "s.sengupta@nih.nic.in",
    department: "Organon of Medicine & Repertory",
    designation: "Senior Research Director",
    subjects: ["Organon of Medicine", "Repertory", "Chronic Miasms"],
    coursesHandled: 4,
    assessmentsCreated: 14,
    status: "verified",
    joinedDate: "2021-07-20",
  },
];

export const initialIndustry: IndustryPartner[] = [
  {
    id: "ind-1",
    companyName: "Dabur Research Foundation",
    industry: "Ayurvedic Pharmaceuticals & Clinical Trials",
    contactPerson: "Dr. Ashok Sharma",
    contactEmail: "ashok.s@dabur.com",
    website: "https://www.dabur.com",
    demandedSkills: ["Dravyaguna Pharmacology", "HPTLC Assay", "Pharmacovigilance", "Schedule T GMP"],
    openJobs: 25,
    activeInternships: 40,
    status: "verified",
    isFrozen: false,
    joinedDate: "2023-01-10",
  },
  {
    id: "ind-2",
    companyName: "Patanjali Research Institute",
    industry: "Integrative Medicine & Classical Herbals",
    contactPerson: "Dr. Anurag Varshney",
    contactEmail: "anurag.v@patanjali.org",
    website: "https://patanjali.org",
    demandedSkills: ["Clinical Research", "Classical Formulations", "Toxicity Assays", "Ayush Grid"],
    openJobs: 18,
    activeInternships: 30,
    status: "verified",
    isFrozen: false,
    joinedDate: "2023-09-18",
  },
  {
    id: "ind-3",
    companyName: "Kottakkal Arya Vaidya Sala",
    industry: "Classical Panchakarma & Hospital Healthcare",
    contactPerson: "Dr. K. Muraleedharan",
    contactEmail: "muraleedharan@aryavaidyasala.com",
    website: "https://aryavaidyasala.com",
    demandedSkills: ["Panchakarma Protocols", "Snehana-Swedana", "Nadi Pariksha", "NABH Standards"],
    openJobs: 12,
    activeInternships: 25,
    status: "verified",
    isFrozen: false,
    joinedDate: "2023-11-05",
  },
  {
    id: "ind-4",
    companyName: "Himalaya Wellness Company",
    industry: "Phyto-Pharmaceuticals & Herbal Healthcare",
    contactPerson: "Dr. Priya Sundaram",
    contactEmail: "priya.s@himalayawellness.com",
    website: "https://himalayawellness.com",
    demandedSkills: ["Botanical Pharmacognosy", "WHO-GMP", "Clinical Documentation", "Quality Control"],
    openJobs: 15,
    activeInternships: 20,
    status: "verified",
    isFrozen: false,
    joinedDate: "2024-02-15",
  },
];

export const initialInstitutions: InstitutionRecord[] = [
  {
    id: "inst-1",
    name: "All India Institute of Ayurveda (AIIA), New Delhi",
    type: "Autonomous Apex Institute",
    location: "New Delhi, Delhi",
    dean: "Prof. Dr. Tanuja Nesari",
    contactEmail: "director@aiia.gov.in",
    totalStudents: 680,
    totalFaculty: 85,
    placementRate: 94.2,
    status: "verified",
    isSuspended: false,
    joinedDate: "2022-01-15",
  },
  {
    id: "inst-2",
    name: "National Institute of Naturopathy (NIN), Pune",
    type: "National Institute",
    location: "Pune, Maharashtra",
    dean: "Prof. Dr. Satya Lakshmi",
    contactEmail: "director@punenin.org",
    totalStudents: 420,
    totalFaculty: 45,
    placementRate: 88.5,
    status: "verified",
    isSuspended: false,
    joinedDate: "2022-03-20",
  },
  {
    id: "inst-3",
    name: "National Institute of Unani Medicine (NIUM), Bengaluru",
    type: "National Institute",
    location: "Bengaluru, Karnataka",
    dean: "Prof. Dr. Abdul Wadud",
    contactEmail: "director@nium.in",
    totalStudents: 380,
    totalFaculty: 50,
    placementRate: 91.0,
    status: "verified",
    isSuspended: false,
    joinedDate: "2022-05-10",
  },
  {
    id: "inst-4",
    name: "National Institute of Siddha (NIS), Chennai",
    type: "National Institute",
    location: "Chennai, Tamil Nadu",
    dean: "Prof. Dr. R. Meenakumari",
    contactEmail: "director@nischennai.org",
    totalStudents: 350,
    totalFaculty: 40,
    placementRate: 89.4,
    status: "verified",
    isSuspended: false,
    joinedDate: "2022-06-12",
  },
];

export const initialSkills: SkillItem[] = [
  {
    id: "sk-1",
    name: "Nadi Pariksha (Pulse Diagnostics)",
    category: "Clinical Diagnostics",
    description: "Classical evaluation of pulse gati (swan, frog, serpent), rhythm, volume, and doshic predominance.",
    proficiencyLevels: ["Fundamental Gati Recognition", "Sthanika Dosha Localization", "Advanced Multi-Layer Palpation"],
    industryDemand: "Very High",
    relatedCourses: ["Advanced Classical Diagnostic Methods", "Nadi Pariksha Mastery"],
  },
  {
    id: "sk-2",
    name: "Clinical Panchakarma Protocols",
    category: "Ayurveda",
    description: "Execution of Snehapana dosage escalation, Snehana, Swedana, Vamana, Virechana, and Basti therapy.",
    proficiencyLevels: ["Purvakarma Management", "Vega Monitoring in Pradhana Karma", "Paschatkarma Samsarjana Krama"],
    industryDemand: "Very High",
    relatedCourses: ["Clinical Fellowship in Advanced Panchakarma"],
  },
  {
    id: "sk-3",
    name: "Clinical Yoga Therapy & Autonomic Regulation",
    category: "Yoga & Naturopathy",
    description: "Prescribing targeted restorative asanas, resonant pranayama, and Yoga Nidra for psychosomatic illness.",
    proficiencyLevels: ["Therapeutic Postural Prescription", "Autonomic HRV Monitoring", "Clinical Yoga Rehabilitation"],
    industryDemand: "Very High",
    relatedCourses: ["Clinical Yoga Therapy for Psychosomatic Disorders"],
  },
  {
    id: "sk-4",
    name: "Ilaj-bit-Tadbeer (Regimenal Therapies & Hijama)",
    category: "Unani",
    description: "Aseptic operative execution of dry/wet cupping (Hijama), leech therapy (Taleeq), and venesection.",
    proficiencyLevels: ["Aseptic Landmarking & Suction", "Hijama-bil-Shart Scarification", "Clinical Microvascular Rheology"],
    industryDemand: "High",
    relatedCourses: ["Regimenal Therapy Clinical Fellowship"],
  },
  {
    id: "sk-5",
    name: "Varmam Science & Musculoskeletal Traumatology",
    category: "Siddha",
    description: "Locating and stimulating 108 vital energy points, Adangal emergency retrieval, and Thokkanam manipulation.",
    proficiencyLevels: ["Varmam Point Identification", "Adangal Counter-Manipulation", "Trauma Emergency Resuscitation"],
    industryDemand: "High",
    relatedCourses: ["Varmam Science & Adangal Resuscitation"],
  },
  {
    id: "sk-6",
    name: "Homoeopathic Repertorization & Miasmatic Analysis",
    category: "Homoeopathy",
    description: "Hahnemannian case taking (Organon §83–104), Kentian rubric hierarchy, and chronic miasmatic diagnosis.",
    proficiencyLevels: ["Rubric Extraction & Totality", "Comparative Materia Medica", "Miasmatic Obstacle Resolution"],
    industryDemand: "Very High",
    relatedCourses: ["Advanced Case Taking, Repertorization & Miasmatic Analysis"],
  },
  {
    id: "sk-7",
    name: "Schedule T / WHO-GMP Formulation Standards",
    category: "Pharmacopoeia & Standardization",
    description: "Ayurvedic, Siddha, and Unani Pharmacopoeia compliance, heavy metal testing, and batch manufacturing records.",
    proficiencyLevels: ["Pharmacopoeial Monograph Verification", "Heavy Metal & Aflatoxin Assay", "Schedule T Auditing"],
    industryDemand: "High",
    relatedCourses: ["Ayurvedic Pharmacopoeia Standards & HPTLC Assay"],
  },
  {
    id: "sk-8",
    name: "Ayush Grid & ABDM Digital Health Records",
    category: "Digital Health & ABDM",
    description: "Integration of AYUSH clinical documentation with Ayush Grid, NAMASTE portal, and FHIR standard EHR.",
    proficiencyLevels: ["NAMASTE Terminology Mapping", "Ayush Hospital EHR Entry", "FHIR Tele-Consultation Systems"],
    industryDemand: "Very High",
    relatedCourses: ["Digital Health & Ayush Grid Integration"],
  },
];

export const initialSkillGaps: SkillGapMetric[] = [
  {
    skill: "Nadi Pariksha & Pulse Diagnostics",
    category: "Clinical Diagnostics",
    industryDemand: "Very High",
    studentProficiency: "Beginner",
    affectedStudents: 210,
    departments: ["Kayachikitsa & Panchakarma", "Swasthavritta"],
    recommendedAction: "Host 4-week bedside Nadi Pariksha clinical workshops with senior Vaidyas.",
  },
  {
    skill: "Clinical Panchakarma Protocols",
    category: "Ayurveda",
    industryDemand: "Very High",
    studentProficiency: "Intermediate",
    affectedStudents: 184,
    departments: ["Kayachikitsa & Panchakarma"],
    recommendedAction: "Integrate high-volume Snehapana and Virechana inpatient clinical rotations.",
  },
  {
    skill: "Sterile Hijama & Regimenal Therapies",
    category: "Unani",
    industryDemand: "High",
    studentProficiency: "Beginner",
    affectedStudents: 142,
    departments: ["Moalajat & Ilaj-bit-Tadbeer"],
    recommendedAction: "Establish hospital operative sterile cupping theater training modules.",
  },
  {
    skill: "Schedule T / WHO-GMP Quality Standards",
    category: "Pharmacopoeia & Standardization",
    industryDemand: "High",
    studentProficiency: "Intermediate",
    affectedStudents: 96,
    departments: ["Dravyaguna", "Rasa Shastra"],
    recommendedAction: "Conduct HPLC botanical assay masterclass and Schedule T GMP audit certifications.",
  },
  {
    skill: "Ayush Grid & ABDM Digital Documentation",
    category: "Digital Health & ABDM",
    industryDemand: "Very High",
    studentProficiency: "Beginner",
    affectedStudents: 165,
    departments: ["All AYUSH Departments"],
    recommendedAction: "Deploy sandbox training for Ayush Hospital Management Information System (A-HMIS).",
  },
];

export const initialJobs: JobListing[] = [
  {
    id: "job-1",
    company: "All India Institute of Ayurveda (AIIA)",
    position: "Ayurvedic Medical Officer (Clinical Inpatient Services)",
    requiredSkills: ["Nadi Pariksha", "Panchakarma", "Clinical Kayachikitsa", "ABDM"],
    eligibility: "BAMS (Min. 60% aggregate, Completed Internship)",
    location: "New Delhi (On-site)",
    salary: "₹9.5 - ₹13.0 LPA",
    deadline: "2024-10-15",
    applicationsCount: 142,
    status: "active",
  },
  {
    id: "job-2",
    company: "Dabur Research Foundation",
    position: "Clinical Pharmacovigilance & Formulations Associate",
    requiredSkills: ["Dravyaguna Pharmacology", "HPTLC", "WHO-GMP", "Clinical Documentation"],
    eligibility: "BAMS / M.D. Dravyaguna or Rasa Shastra",
    location: "Ghaziabad / Delhi NCR (Hybrid)",
    salary: "₹8.0 - ₹11.5 LPA",
    deadline: "2024-09-30",
    applicationsCount: 48,
    status: "active",
  },
  {
    id: "job-3",
    company: "Kottakkal Arya Vaidya Sala",
    position: "Panchakarma Resident Physician",
    requiredSkills: ["Panchakarma Protocols", "Snehana-Swedana", "Basti Administration"],
    eligibility: "BAMS (Completed Clinical Internship)",
    location: "Kottakkal, Kerala (On-site)",
    salary: "₹7.5 - ₹10.5 LPA",
    deadline: "2024-10-05",
    applicationsCount: 65,
    status: "active",
  },
  {
    id: "job-4",
    company: "National Institute of Naturopathy",
    position: "Clinical Naturopath & Yoga Consultant",
    requiredSkills: ["Clinical Yoga Therapy", "Hydrotherapy", "Fasting Supervision"],
    eligibility: "BNYS (Registered Practitioner)",
    location: "Pune, Maharashtra (On-site)",
    salary: "₹8.5 - ₹12.0 LPA",
    deadline: "2024-10-20",
    applicationsCount: 52,
    status: "active",
  },
];

export const initialInternships: InternshipListing[] = [
  {
    id: "intern-1",
    company: "All India Institute of Ayurveda (AIIA)",
    role: "Clinical Panchakarma & Kayachikitsa Intern",
    duration: "6 Months",
    requiredSkills: ["Snehana-Swedana", "Vega Monitoring", "Samsarjana Krama"],
    stipend: "₹35,000 / month",
    deadline: "2024-09-20",
    applicationsCount: 78,
    status: "active",
  },
  {
    id: "intern-2",
    company: "Dabur Research Foundation",
    role: "Ayurvedic Phytochemistry & HPTLC Intern",
    duration: "6 Months",
    requiredSkills: ["Botanical Authentication", "TLC Fingerprinting", "Laboratory Protocols"],
    stipend: "₹28,000 / month",
    deadline: "2024-10-01",
    applicationsCount: 95,
    status: "active",
  },
  {
    id: "intern-3",
    company: "National Institute of Siddha",
    role: "Varmam Science & Traumatology Intern",
    duration: "6 Months",
    requiredSkills: ["Varmam Points", "Adangal Retrieval", "Thokkanam"],
    stipend: "₹30,000 / month",
    deadline: "2024-09-28",
    applicationsCount: 42,
    status: "active",
  },
];

export const initialCourses: CourseData[] = [
  {
    id: "crs-1",
    courseName: "Clinical Fellowship in Advanced Panchakarma Protocols",
    description: "Comprehensive inpatient hospital training covering Snehapana escalation, Basti compounding, and Samsarjana Krama.",
    skillsTaught: ["Panchakarma Protocols", "Snehana-Swedana", "Basti Administration", "Samsarjana Krama"],
    difficulty: "Advanced",
    duration: "12 Weeks",
    instructor: "Prof. Dr. Rajeshwari Varma",
    enrolledStudents: 240,
    certification: true,
  },
  {
    id: "crs-2",
    courseName: "Ayurvedic Pharmacopoeia Standards & HPTLC Botanical Assay",
    description: "Laboratory training on raw drug authentication, Ayurvedic Pharmacopoeia monograph testing, and chemical markers.",
    skillsTaught: ["Botanical Authentication", "HPTLC Assay", "Schedule T Standards"],
    difficulty: "Intermediate",
    duration: "8 Weeks",
    instructor: "Dr. Ashok Sharma",
    enrolledStudents: 310,
    certification: true,
  },
  {
    id: "crs-3",
    courseName: "Clinical Yoga Therapy for Psychosomatic & Metabolic Disorders",
    description: "Evidence-based therapeutic yoga prescriptions for hypertension, diabetes, and autonomic nervous dysfunction.",
    skillsTaught: ["Clinical Yoga Therapy", "Autonomic HRV Monitoring", "Restorative Asana"],
    difficulty: "Intermediate",
    duration: "10 Weeks",
    instructor: "Dr. K. S. Raghavan",
    enrolledStudents: 185,
    certification: true,
  },
];

export const initialAssessments: AssessmentData[] = [
  {
    id: "asm-1",
    title: "AIAPGET Ayurveda Clinical Diagnostics & Samhita Benchmark",
    type: "MCQ",
    mappedSkills: ["Nadi Pariksha", "Clinical Kayachikitsa", "Panchakarma"],
    durationMinutes: 60,
    totalAttempts: 184,
    averageScore: 74.2,
    status: "published",
  },
  {
    id: "asm-2",
    title: "AYUSH NABH Hospital Standards & Clinical Protocol Evaluation",
    type: "Technical",
    mappedSkills: ["Schedule T Standards", "NABH AYUSH", "ABDM Digital Documentation"],
    durationMinutes: 45,
    totalAttempts: 240,
    averageScore: 68.5,
    status: "published",
  },
  {
    id: "asm-3",
    title: "Classical Homoeopathic Repertorization & Miasmatic Analysis",
    type: "MCQ",
    mappedSkills: ["Repertorization", "Materia Medica", "Miasmatic Diagnosis"],
    durationMinutes: 60,
    totalAttempts: 122,
    averageScore: 76.8,
    status: "published",
  },
];

export const initialCertifications: CertificationRecord[] = [
  {
    id: "cert-1",
    studentName: "Ananya Sharma",
    department: "Department of Kayachikitsa & Panchakarma",
    certificationName: "Fellowship in Clinical Panchakarma",
    issuer: "All India Institute of Ayurveda",
    dateEarned: "2024-03-15",
    skills: ["Panchakarma Protocols", "Snehana-Swedana", "Nadi Pariksha"],
    verified: true,
  },
  {
    id: "cert-2",
    studentName: "Priya Nair",
    department: "Clinical Naturopathy & Yoga Therapy",
    certificationName: "Certified Clinical Yoga Therapy Practitioner",
    issuer: "Morarji Desai National Institute of Yoga",
    dateEarned: "2024-04-10",
    skills: ["Clinical Yoga Therapy", "Autonomic Regulation", "Restorative Postures"],
    verified: true,
  },
  {
    id: "cert-3",
    studentName: "Mohammed Zaid",
    department: "Moalajat & Ilaj-bit-Tadbeer",
    certificationName: "Certified Sterile Regimenal Specialist",
    issuer: "National Institute of Unani Medicine",
    dateEarned: "2024-06-01",
    skills: ["Sterile Hijama", "Taleeq Leech Therapy", "Baul Examination"],
    verified: true,
  },
];

export const initialApprovals: ApprovalQueueItem[] = [
  {
    id: "appr-1",
    type: "Industry Partner",
    title: "Baidyanath Research & Manufacturing Partner Verification",
    submittedBy: "Dr. Alok Nath (a.nath@baidyanath.co.in)",
    submissionDate: "2024-08-28",
    details: "Ayurvedic formulation manufacturer requesting campus placement and clinical intern recruitment accreditation.",
    status: "pending",
  },
  {
    id: "appr-2",
    type: "Job",
    title: "Ayurvedic Medical Officer (AIIA New Delhi)",
    submittedBy: "Dr. Rajeshwari Varma",
    submissionDate: "2024-08-29",
    details: "Posting 15 openings for BAMS graduates with Panchakarma experience (₹9.5 - ₹13.0 LPA).",
    status: "pending",
  },
  {
    id: "appr-3",
    type: "Faculty",
    title: "Dr. Suman Sengupta Institutional Account Verification",
    submittedBy: "s.sengupta@nih.nic.in",
    submissionDate: "2024-08-27",
    details: "New faculty onboarding in Organon of Medicine & Repertory department.",
    status: "pending",
  },
  {
    id: "appr-4",
    type: "Course",
    title: "Classical Ayush Grid & ABDM Electronic Health Records",
    submittedBy: "Dr. K. S. Raghavan",
    submissionDate: "2024-08-26",
    details: "Proposed clinical elective module for 6th semester BAMS/BHMS curriculum.",
    status: "pending",
  },
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: "log-1",
    actor: "Admin (admin@gmail.com)",
    action: "Company Hiring Frozen",
    resource: "Unverified Herbal Exporter (ID: hire-req-1)",
    timestamp: "2024-09-05 23:29:05",
    status: "Flagged",
  },
  {
    id: "log-2",
    actor: "Admin (admin@gmail.com)",
    action: "Campus Activities Suspended",
    resource: "Unaccredited Private College (ID: campus-req-1)",
    timestamp: "2024-09-05 23:29:10",
    status: "Flagged",
  },
  {
    id: "log-3",
    actor: "Admin (admin@gmail.com)",
    action: "Approved Student Registration",
    resource: "Ananya Sharma (ananya.sharma@aiia.ac.in)",
    timestamp: "2024-09-05 22:58:30",
    status: "Success",
  },
  {
    id: "log-4",
    actor: "Admin (admin@gmail.com)",
    action: "Published Diagnostic Assessment",
    resource: "AIAPGET Ayurveda Benchmark (ID: asm-1)",
    timestamp: "2024-09-04 14:15:00",
    status: "Success",
  },
];

export const initialAdmins: AdminUser[] = [
  {
    id: "adm-1",
    name: "Ayush System Administrator",
    email: "admin@gmail.com",
    role: "Super Admin",
    status: "active",
    lastLogin: "Active Now",
  },
  {
    id: "adm-2",
    name: "Dr. Ramesh Nair",
    email: "ramesh.nair@aiia.ac.in",
    role: "College Admin",
    status: "active",
    lastLogin: "2 hours ago",
  },
  {
    id: "adm-3",
    name: "Sunita Deshmukh",
    email: "sunita.d@ayushplacement.org",
    role: "Placement Admin",
    status: "active",
    lastLogin: "Yesterday",
  },
];
