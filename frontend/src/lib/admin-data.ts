/**
 * Skill-Bridge Production Admin Panel Data Store
 * Structured data types and realistic mock store for all 16 administrative views.
 */

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  course: string;
  semester: number;
  rollNumber: string;
  status: "active" | "inactive" | "pending";
  skills: { name: string; proficiency: "Beginner" | "Intermediate" | "Advanced" }[];
  skillGaps: { skill: string; requiredLevel: string; currentLevel: string; priority: "High" | "Medium" | "Low" }[];
  certifications: { title: string; issuer: string; date: string; verified: boolean }[];
  projects: { title: string; tech: string; description: string }[];
  careerInterests: string[];
  applications: { role: string; company: string; status: "Applied" | "Shortlisted" | "Offered" | "Rejected"; date: string }[];
  joinedDate: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  subjects: string[];
  coursesHandled: number;
  assessmentsCreated: number;
  status: "verified" | "pending" | "deactivated";
  joinedDate: string;
}

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

export interface SkillItem {
  id: string;
  name: string;
  category:
    | "Programming"
    | "Web Development"
    | "Mobile Development"
    | "Cloud"
    | "Cybersecurity"
    | "Data Science"
    | "AI / ML"
    | "DevOps"
    | "Database"
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
  industryDemand: "Very High" | "High" | "Medium" | "Low";
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
  status: "Success" | "Flagged" | "Rejected";
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "College Admin" | "Placement Admin" | "Faculty Coordinator" | "Industry Coordinator";
  status: "active" | "suspended";
  lastLogin: string;
}

// Initial Realistic Dataset
export const initialStudents: StudentProfile[] = [
  {
    id: "stu-1",
    name: "Alex Rivera",
    email: "alex.rivera@nit.edu",
    department: "Computer Science",
    course: "B.Tech CSE",
    semester: 6,
    rollNumber: "NIT-CSE-2022-042",
    status: "active",
    skills: [
      { name: "Python", proficiency: "Advanced" },
      { name: "React", proficiency: "Intermediate" },
      { name: "SQL", proficiency: "Intermediate" },
      { name: "Docker", proficiency: "Beginner" },
    ],
    skillGaps: [
      { skill: "DevOps & CI/CD", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "High" },
      { skill: "Cloud Architecture (AWS)", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "High" },
    ],
    certifications: [
      { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2024-03-15", verified: true },
      { title: "Meta Front-End Developer", issuer: "Coursera", date: "2023-11-20", verified: true },
    ],
    projects: [
      { title: "Distributed Job Scheduler", tech: "Python, Redis, Docker", description: "Asynchronous task queue with real-time worker monitoring" },
      { title: "Campus Skill Matrix", tech: "Next.js, Tailwind, PostgreSQL", description: "Role-based student competency evaluation tool" },
    ],
    careerInterests: ["Cloud Solutions Architect", "Full Stack Systems Engineer"],
    applications: [
      { role: "Junior Cloud Engineer", company: "Apex Dynamics", status: "Offered", date: "2024-08-10" },
      { role: "Backend Developer Intern", company: "Infosys", status: "Shortlisted", date: "2024-08-01" },
    ],
    joinedDate: "2022-08-15",
  },
  {
    id: "stu-2",
    name: "Priya Sharma",
    email: "priya.sharma@dtu.ac.in",
    department: "Information Technology",
    course: "B.Tech IT",
    semester: 5,
    rollNumber: "DTU-IT-2023-109",
    status: "active",
    skills: [
      { name: "Python", proficiency: "Intermediate" },
      { name: "PostgreSQL", proficiency: "Intermediate" },
      { name: "Pandas/NumPy", proficiency: "Advanced" },
    ],
    skillGaps: [
      { skill: "Cybersecurity Basics", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "Medium" },
      { skill: "Kubernetes", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "High" },
    ],
    certifications: [
      { title: "DeepLearning.AI Machine Learning Specialization", issuer: "DeepLearning.AI", date: "2024-05-12", verified: true },
    ],
    projects: [
      { title: "Predictive Placement Analytics", tech: "Python, Scikit-Learn, Streamlit", description: "ML model predicting internship offer conversion" },
    ],
    careerInterests: ["Data Scientist", "ML Operations Engineer"],
    applications: [
      { role: "Data Science Intern", company: "Zenith Solutions", status: "Applied", date: "2024-08-20" },
    ],
    joinedDate: "2023-08-10",
  },
  {
    id: "stu-3",
    name: "Ayan Parmar",
    email: "ayanparmar54@gmail.com",
    department: "Computer Applications",
    course: "BCA",
    semester: 4,
    rollNumber: "CC-BCA-2024-019",
    status: "active",
    skills: [
      { name: "JavaScript", proficiency: "Intermediate" },
      { name: "HTML/CSS", proficiency: "Advanced" },
      { name: "Node.js", proficiency: "Beginner" },
    ],
    skillGaps: [
      { skill: "System Design", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "High" },
      { skill: "Automated Testing", requiredLevel: "Intermediate", currentLevel: "Beginner", priority: "Medium" },
    ],
    certifications: [
      { title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", date: "2024-02-18", verified: true },
    ],
    projects: [
      { title: "Real-time Chat Portal", tech: "React, Socket.io, Node.js", description: "Multi-room chat app with message persistence" },
    ],
    careerInterests: ["Frontend Engineer", "Full Stack Developer"],
    applications: [
      { role: "Web Developer Intern", company: "TCS iON", status: "Applied", date: "2024-08-25" },
    ],
    joinedDate: "2024-01-12",
  },
  {
    id: "stu-4",
    name: "Rohan Verma",
    email: "rohan.verma@bits.edu",
    department: "Computer Science",
    course: "B.Tech CSE",
    semester: 7,
    rollNumber: "BITS-CSE-2021-088",
    status: "active",
    skills: [
      { name: "C++", proficiency: "Advanced" },
      { name: "Linux Systems", proficiency: "Advanced" },
      { name: "Networking", proficiency: "Intermediate" },
    ],
    skillGaps: [
      { skill: "Cloud Native Deployments", requiredLevel: "Advanced", currentLevel: "Intermediate", priority: "Low" },
    ],
    certifications: [
      { title: "Certified Kubernetes Administrator (CKA)", issuer: "Linux Foundation", date: "2024-04-10", verified: true },
    ],
    projects: [
      { title: "Custom Memory Allocator", tech: "C++, Valgrind", description: "High-performance slab allocator for game loops" },
    ],
    careerInterests: ["Systems Engineer", "Infrastructure Architect"],
    applications: [
      { role: "Core Systems Engineer", company: "Microsoft", status: "Shortlisted", date: "2024-08-14" },
    ],
    joinedDate: "2021-08-20",
  },
];

export const initialFaculty: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. K. S. Raghavan",
    email: "raghavan.ks@nit.edu",
    department: "Computer Science",
    designation: "Professor & HOD",
    subjects: ["Distributed Systems", "Cloud Computing", "Advanced Operating Systems"],
    coursesHandled: 4,
    assessmentsCreated: 12,
    status: "verified",
    joinedDate: "2018-06-15",
  },
  {
    id: "fac-2",
    name: "Dr. Ananya Sen",
    email: "ananya.sen@dtu.ac.in",
    department: "Information Technology",
    designation: "Associate Professor",
    subjects: ["Database Systems", "Big Data Analytics", "Data Mining"],
    coursesHandled: 3,
    assessmentsCreated: 8,
    status: "verified",
    joinedDate: "2020-02-10",
  },
  {
    id: "fac-3",
    name: "Prof. Vikram Malhotra",
    email: "v.malhotra@bits.edu",
    department: "Computer Science",
    designation: "Assistant Professor",
    subjects: ["Computer Networks", "Cybersecurity", "Cryptography"],
    coursesHandled: 2,
    assessmentsCreated: 6,
    status: "verified",
    joinedDate: "2021-07-01",
  },
  {
    id: "fac-4",
    name: "Dr. Meenakshi Joshi",
    email: "m.joshi@iitb.ac.in",
    department: "Artificial Intelligence",
    designation: "Research Director",
    subjects: ["Neural Networks", "Natural Language Processing", "Reinforcement Learning"],
    coursesHandled: 3,
    assessmentsCreated: 9,
    status: "pending",
    joinedDate: "2024-07-20",
  },
];

export const initialIndustry: IndustryPartner[] = [
  {
    id: "ind-1",
    companyName: "Infosys Technologies",
    industry: "IT & Enterprise Consulting",
    contactPerson: "Rajesh Kumar",
    contactEmail: "rajesh.k@infosys.com",
    website: "https://www.infosys.com",
    demandedSkills: ["Java", "Spring Boot", "Cloud Migration", "PostgreSQL"],
    openJobs: 45,
    activeInternships: 80,
    status: "verified",
    isFrozen: false,
    joinedDate: "2023-01-10",
  },
  {
    id: "ind-2",
    companyName: "Apex Dynamics Corp",
    industry: "AI & Autonomous Systems",
    contactPerson: "Elena Vance",
    contactEmail: "evance@apexdynamics.ai",
    website: "https://apexdynamics.ai",
    demandedSkills: ["Python", "PyTorch", "CUDA", "Linux", "Docker"],
    openJobs: 8,
    activeInternships: 15,
    status: "verified",
    isFrozen: false,
    joinedDate: "2023-09-18",
  },
  {
    id: "ind-3",
    companyName: "Zenith Financial Solutions",
    industry: "FinTech & Banking Infrastructure",
    contactPerson: "Arjun Nambiar",
    contactEmail: "a.nambiar@zenithfin.in",
    website: "https://zenithfin.in",
    demandedSkills: ["Go", "Kafka", "PostgreSQL", "Cybersecurity", "Kubernetes"],
    openJobs: 12,
    activeInternships: 20,
    status: "verified",
    isFrozen: false,
    joinedDate: "2023-11-05",
  },
  {
    id: "ind-4",
    companyName: "NovaCloud Networks",
    industry: "Cloud Infrastructure",
    contactPerson: "Siddharth Roy",
    contactEmail: "s.roy@novacloud.io",
    website: "https://novacloud.io",
    demandedSkills: ["Terraform", "AWS", "DevOps", "Prometheus"],
    openJobs: 6,
    activeInternships: 10,
    status: "pending",
    isFrozen: false,
    joinedDate: "2024-06-15",
  },
];

export const initialSkills: SkillItem[] = [
  {
    id: "sk-1",
    name: "Python",
    category: "Programming",
    description: "Core general-purpose language used extensively in data science, automation, backend APIs, and machine learning.",
    proficiencyLevels: ["Basic Syntax & OOP", "Data Structures & Libraries", "Async Architectures & Frameworks"],
    industryDemand: "Very High",
    relatedCourses: ["Advanced Python for Systems", "Python Data Analytics"],
  },
  {
    id: "sk-2",
    name: "Cloud Computing (AWS / Azure)",
    category: "Cloud",
    description: "Designing, provisioning, and securing multi-tier cloud infrastructure, VPC networking, and managed databases.",
    proficiencyLevels: ["Cloud Foundations", "Architecting Scalable Services", "Enterprise DevOps Infrastructure"],
    industryDemand: "Very High",
    relatedCourses: ["AWS Solutions Architecture Mastery", "Cloud Fundamentals"],
  },
  {
    id: "sk-3",
    name: "Docker & Kubernetes",
    category: "DevOps",
    description: "Containerization, pod lifecycle management, declarative ingress controllers, and automated continuous delivery.",
    proficiencyLevels: ["Containerization Basics", "Compose & Service Mesh", "Production Cluster Management"],
    industryDemand: "Very High",
    relatedCourses: ["Production Kubernetes Engineering"],
  },
  {
    id: "sk-4",
    name: "Cybersecurity & Network Defense",
    category: "Cybersecurity",
    description: "Threat vector modeling, IAM least-privilege enforcement, penetration vulnerability assessment, and cryptosystems.",
    proficiencyLevels: ["Security Fundamentals", "Defensive Engineering", "Ethical Pen-Testing & Auditing"],
    industryDemand: "High",
    relatedCourses: ["Applied Cyber Defense", "Web Security Foundations"],
  },
  {
    id: "sk-5",
    name: "React & Next.js",
    category: "Web Development",
    description: "Component architecture, Server-Side Rendering, State Management, and high-performance frontend interfaces.",
    proficiencyLevels: ["Component Building", "Full-Stack Next.js SSR", "Large Scale State & Microfrontends"],
    industryDemand: "High",
    relatedCourses: ["Modern Next.js Production Applications"],
  },
  {
    id: "sk-6",
    name: "PostgreSQL & Vector Search",
    category: "Database",
    description: "Relational modeling, indexing strategies, query execution plans, and pgvector embeddings for semantic discovery.",
    proficiencyLevels: ["SQL Queries & Relational Design", "Performance Indexing", "Vector Search & Distributed Clusters"],
    industryDemand: "High",
    relatedCourses: ["Database Engineering at Scale"],
  },
  {
    id: "sk-7",
    name: "Machine Learning & PyTorch",
    category: "AI / ML",
    description: "Supervised and unsupervised learning, deep neural representations, PyTorch model training and deployment.",
    proficiencyLevels: ["Statistical Foundations", "Model Building with PyTorch", "LLM Fine-tuning & Production Serving"],
    industryDemand: "Very High",
    relatedCourses: ["Deep Learning Systems"],
  },
  {
    id: "sk-8",
    name: "Flutter & React Native",
    category: "Mobile Development",
    description: "Cross-platform mobile application development with native bridge integration and offline caching.",
    proficiencyLevels: ["UI Widgets & State", "Native Hardware Integrations", "Cross-Platform Optimization"],
    industryDemand: "Medium",
    relatedCourses: ["Modern Mobile Engineering"],
  },
  {
    id: "sk-9",
    name: "Technical Communication & Team Leadership",
    category: "Soft Skills",
    description: "Writing clear technical documentation, sprint retrospectives, presentation of engineering tradeoffs, and cross-functional leadership.",
    proficiencyLevels: ["Engineering Documentation", "Cross-Functional Collaboration", "Team Mentorship"],
    industryDemand: "High",
    relatedCourses: ["Executive Engineering Communication"],
  },
];

export const initialSkillGaps: SkillGapMetric[] = [
  {
    skill: "Cloud Computing (AWS / Azure)",
    category: "Cloud",
    industryDemand: "Very High",
    studentProficiency: "Low",
    affectedStudents: 218,
    departments: ["Computer Science", "Information Technology", "Computer Applications"],
    recommendedAction: "Organize 4-week AWS Solutions Architecture Hands-on Boot Camp with subsidized certification vouchers.",
  },
  {
    skill: "DevOps & CI/CD (Docker, Kubernetes)",
    category: "DevOps",
    industryDemand: "Very High",
    studentProficiency: "Beginner",
    affectedStudents: 184,
    departments: ["Computer Science", "Information Technology"],
    recommendedAction: "Integrate containerization lab modules into 5th semester Distributed Systems curriculum.",
  },
  {
    skill: "Cybersecurity Defense & Pen-testing",
    category: "Cybersecurity",
    industryDemand: "High",
    studentProficiency: "Low",
    affectedStudents: 142,
    departments: ["Information Technology", "Computer Applications"],
    recommendedAction: "Host collegiate Capture-The-Flag (CTF) tournament and initiate defensive security workshops.",
  },
  {
    skill: "PostgreSQL Optimization & Vector Indexing",
    category: "Database",
    industryDemand: "High",
    studentProficiency: "Intermediate",
    affectedStudents: 96,
    departments: ["Computer Science", "Data Science"],
    recommendedAction: "Conduct query tuning masterclass and pgvector semantic retrieval workshop.",
  },
  {
    skill: "Production Machine Learning (MLOps)",
    category: "AI / ML",
    industryDemand: "Very High",
    studentProficiency: "Beginner",
    affectedStudents: 165,
    departments: ["Computer Science", "Artificial Intelligence"],
    recommendedAction: "Collaborate with Apex Dynamics for 6-week industry-mentored ML pipeline project.",
  },
];

export const initialJobs: JobListing[] = [
  {
    id: "job-1",
    company: "Infosys Technologies",
    position: "Systems Engineer (Fresher 2025/2026)",
    requiredSkills: ["Java", "SQL", "Problem Solving", "Cloud Basics"],
    eligibility: "B.Tech / MCA (Min. 6.5 CGPA)",
    location: "Bengaluru / Pune (Hybrid)",
    salary: "₹4.5 - ₹6.5 LPA",
    deadline: "2024-10-15",
    applicationsCount: 142,
    status: "active",
  },
  {
    id: "job-2",
    company: "Apex Dynamics Corp",
    position: "Junior Machine Learning Engineer",
    requiredSkills: ["Python", "PyTorch", "Docker", "Linux"],
    eligibility: "B.Tech CSE / IT / AI (Min. 7.5 CGPA)",
    location: "Hyderabad (On-site)",
    salary: "₹10.0 - ₹14.0 LPA",
    deadline: "2024-09-30",
    applicationsCount: 48,
    status: "active",
  },
  {
    id: "job-3",
    company: "Zenith Financial Solutions",
    position: "Backend Infrastructure Developer",
    requiredSkills: ["Go", "PostgreSQL", "Kafka", "Kubernetes"],
    eligibility: "B.Tech / M.Tech (Min. 7.0 CGPA)",
    location: "Mumbai (Hybrid)",
    salary: "₹8.0 - ₹12.0 LPA",
    deadline: "2024-10-05",
    applicationsCount: 65,
    status: "active",
  },
];

export const initialInternships: InternshipListing[] = [
  {
    id: "intern-1",
    company: "Apex Dynamics Corp",
    role: "Computer Vision & AI Intern",
    duration: "6 Months",
    requiredSkills: ["Python", "OpenCV", "PyTorch"],
    stipend: "₹35,000 / month",
    deadline: "2024-09-20",
    applicationsCount: 78,
    status: "active",
  },
  {
    id: "intern-2",
    company: "Infosys Springboard",
    role: "Full Stack Cloud Intern",
    duration: "3 Months",
    requiredSkills: ["React", "Node.js", "Docker"],
    stipend: "₹20,000 / month",
    deadline: "2024-10-01",
    applicationsCount: 195,
    status: "active",
  },
  {
    id: "intern-3",
    company: "Zenith Financial Solutions",
    role: "FinTech Security Intern",
    duration: "6 Months",
    requiredSkills: ["Network Security", "Python", "Linux"],
    stipend: "₹30,000 / month",
    deadline: "2024-09-28",
    applicationsCount: 36,
    status: "active",
  },
];

export const initialCourses: CourseData[] = [
  {
    id: "crs-1",
    courseName: "Cloud Infrastructure Architecture",
    description: "Master multi-tier VPC networking, compute clusters, IAM access controls, and automated deployments.",
    skillsTaught: ["Cloud Computing", "AWS", "Networking", "IAM Security"],
    difficulty: "Intermediate",
    duration: "8 Weeks",
    instructor: "Dr. K. S. Raghavan",
    enrolledStudents: 240,
    certification: true,
  },
  {
    id: "crs-2",
    courseName: "Containerization & Microservices with Docker",
    description: "Hands-on container packaging, multi-stage builds, orchestration fundamentals, and local testing.",
    skillsTaught: ["Docker", "Linux Systems", "DevOps Basics"],
    difficulty: "Beginner",
    duration: "4 Weeks",
    instructor: "Prof. Vikram Malhotra",
    enrolledStudents: 310,
    certification: true,
  },
  {
    id: "crs-3",
    courseName: "Database Engineering at Scale",
    description: "Deep dive into relational storage engines, WAL logs, index selection, and pgvector semantic embeddings.",
    skillsTaught: ["PostgreSQL", "Query Optimization", "Vector Search"],
    difficulty: "Advanced",
    duration: "6 Weeks",
    instructor: "Dr. Ananya Sen",
    enrolledStudents: 185,
    certification: true,
  },
];

export const initialAssessments: AssessmentData[] = [
  {
    id: "asm-1",
    title: "AWS Foundations & Cloud Architecture Diagnostic",
    type: "MCQ",
    mappedSkills: ["Cloud Computing", "Networking", "Security"],
    durationMinutes: 45,
    totalAttempts: 184,
    averageScore: 71.4,
    status: "published",
  },
  {
    id: "asm-2",
    title: "Advanced Data Structures & Algorithmic Problem Solving",
    type: "Coding",
    mappedSkills: ["Python", "C++", "Algorithms"],
    durationMinutes: 90,
    totalAttempts: 240,
    averageScore: 64.2,
    status: "published",
  },
  {
    id: "asm-3",
    title: "Linux Kernel & System Administration Practicum",
    type: "Technical",
    mappedSkills: ["Linux Systems", "DevOps", "Shell Scripting"],
    durationMinutes: 60,
    totalAttempts: 122,
    averageScore: 78.5,
    status: "published",
  },
];

export const initialCertifications: CertificationRecord[] = [
  {
    id: "cert-1",
    studentName: "Alex Rivera",
    department: "Computer Science",
    certificationName: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    dateEarned: "2024-03-15",
    skills: ["Cloud Computing", "AWS", "IAM"],
    verified: true,
  },
  {
    id: "cert-2",
    studentName: "Rohan Verma",
    department: "Computer Science",
    certificationName: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    dateEarned: "2024-04-10",
    skills: ["Docker", "Kubernetes", "DevOps"],
    verified: true,
  },
  {
    id: "cert-3",
    studentName: "Priya Sharma",
    department: "Information Technology",
    certificationName: "TensorFlow Developer Certificate",
    issuer: "Google",
    dateEarned: "2024-06-01",
    skills: ["Python", "TensorFlow", "Deep Learning"],
    verified: false,
  },
];

export const initialApprovals: ApprovalQueueItem[] = [
  {
    id: "appr-1",
    type: "Industry Partner",
    title: "NovaCloud Networks Partner Verification",
    submittedBy: "Siddharth Roy (s.roy@novacloud.io)",
    submissionDate: "2024-08-28",
    details: "New cloud consultancy requesting campus placement partnership and intern recruitment rights.",
    status: "pending",
  },
  {
    id: "appr-2",
    type: "Job",
    title: "Backend Infrastructure Developer (Zenith Solutions)",
    submittedBy: "Arjun Nambiar",
    submissionDate: "2024-08-29",
    details: "Posting 12 openings for fresh graduates with Go and Kafka background (₹8.0 - ₹12.0 LPA).",
    status: "pending",
  },
  {
    id: "appr-3",
    type: "Faculty",
    title: "Dr. Meenakshi Joshi Institutional Account Verification",
    submittedBy: "m.joshi@iitb.ac.in",
    submissionDate: "2024-08-27",
    details: "New faculty onboarding in Artificial Intelligence department.",
    status: "pending",
  },
  {
    id: "appr-4",
    type: "Course",
    title: "Modern Next.js Production Applications",
    submittedBy: "Dr. K. S. Raghavan",
    submissionDate: "2024-08-26",
    details: "Proposed elective module for 6th semester Web Engineering curriculum.",
    status: "pending",
  },
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: "log-1",
    actor: "Admin (admin@gmail.com)",
    action: "Company Hiring Frozen",
    resource: "Infosys Technologies (ID: hire-req-1)",
    timestamp: "2024-09-05 23:29:05",
    status: "Flagged",
  },
  {
    id: "log-2",
    actor: "Admin (admin@gmail.com)",
    action: "Campus Activities Suspended",
    resource: "Delhi Technological University (ID: campus-req-1)",
    timestamp: "2024-09-05 23:29:10",
    status: "Flagged",
  },
  {
    id: "log-3",
    actor: "Admin (admin@gmail.com)",
    action: "Approved Student Registration",
    resource: "Jordan Lee (multi_role_1788629974479@university.edu)",
    timestamp: "2024-09-05 22:58:30",
    status: "Success",
  },
  {
    id: "log-4",
    actor: "Admin (admin@gmail.com)",
    action: "Published Diagnostic Assessment",
    resource: "AWS Foundations Assessment (ID: asm-1)",
    timestamp: "2024-09-04 14:15:00",
    status: "Success",
  },
];

export const initialAdmins: AdminUser[] = [
  {
    id: "adm-1",
    name: "System Administrator",
    email: "admin@gmail.com",
    role: "Super Admin",
    status: "active",
    lastLogin: "Active Now",
  },
  {
    id: "adm-2",
    name: "Dr. Ramesh Nair",
    email: "ramesh.nair@campus.edu",
    role: "College Admin",
    status: "active",
    lastLogin: "2 hours ago",
  },
  {
    id: "adm-3",
    name: "Sunita Deshmukh",
    email: "sunita.d@placement.org",
    role: "Placement Admin",
    status: "active",
    lastLogin: "Yesterday",
  },
];
