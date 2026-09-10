# SkillBridge

**AYUSH Skill Mapping, Academia–Industry Collaboration, Internship & Placement Intelligence Platform**

> SIH Problem Statement 26044 — Prototype

**Problem Statement:** Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement  
**Organization:** Ministry of Ayush  
**Domain:** AYUSH · Education · Skill Development · Employability · Academia–Industry Collaboration

---

## Problem Statement

AYUSH academic institutions — covering Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy — and the pharmaceutical, wellness, and healthcare industries often operate in silos. This disconnect creates several challenges:

- **Skill mismatch** between what graduates learn and what industry requires
- **Limited visibility** into student competencies for recruiters and institutions
- **Difficulty finding suitable talent** with verified, domain-specific skills
- **Restricted access** to verified internship and placement opportunities
- **Minimal academia–industry collaboration** in research and curriculum design
- **Research and R&D collaboration gaps** between institutions and industry
- **Poor understanding** of emerging industry skill demand within academic programs
- **No centralized skill intelligence** at the institutional or national level

SkillBridge addresses these gaps by creating a unified digital ecosystem where students, institutions, industry, and the Ministry of Ayush can collaborate on skill development, assessment, internship placement, and research.

---

## Proposed Solution

SkillBridge is an integrated platform connecting four stakeholder layers:

```text
    Student
       ↕
   Institution
       ↕
    Industry
       ↕
    Ministry
```

### Core Flow

```text
ASSESS → MAP SKILLS → IDENTIFY SKILL GAPS → IMPROVE → GAIN EXPERIENCE
                                                           ↓
                                              MATCH WITH INDUSTRY
                                                           ↓
                                            INTERNSHIP / PLACEMENT
                                                           ↓
                                              R&D COLLABORATION
```

The platform creates a continuous connection between academic competency development and industry requirements — enabling skill-driven recruitment, targeted learning, and evidence-based policy decisions.

---

## Platform Roles

### Student

- AYUSH profile with discipline and specialization
- AYUSH Skill Passport (planned — see [Roadmap](#roadmap))
- Knowledge assessments with difficulty levels
- Skill-gap analysis with personalized recommendations
- Interest discovery and career path exploration
- Learning recommendations (YouTube-based educational resources)
- Resume builder and ATS compatibility analysis
- Document upload, verification, and face verification
- Jobs and internship discovery with readiness checks
- Application submission and tracking
- Workflow-based onboarding progress

### Institution (Campus / Faculty)

> Currently implemented as **Campus** and **Faculty** portals

- Student skill analytics and performance monitoring
- Assessment analytics and learning progress tracking
- Skill-gap intelligence across student cohorts
- Industry demand visibility (planned)
- Internship and placement management (planned)
- R&D collaboration (planned)

### Industry

- Organization registration and profile management
- Talent discovery with access to permitted student data
- Job and internship posting with skill requirements
- Custom question bank creation for screening
- Application screening and interview evaluation
- Hiring management pipeline (post → screen → interview → hire)
- Hiring analytics and recruitment insights
- R&D problem statements (planned)

### Admin

> Administrative oversight portal currently implemented

- Platform-wide overview and analytics
- Student, faculty, and industry management
- Skill library management
- Skill-gap monitoring across the platform
- Opportunity (jobs/internships) management
- Learning resource management
- Approval queues and audit logs
- Reports and system configuration

### Ministry (Planned)

- National AYUSH skill intelligence dashboard
- Institution performance and skill-gap intelligence
- Industry demand and placement trend visibility
- R&D collaboration and innovation/IP overview

> The Ministry role is planned. Prototype/demo data must not be represented as official government statistics.

---

## AYUSH Focus

SkillBridge is designed around the five AYUSH disciplines:

| Discipline | Abbreviation |
|---|---|
| Ayurveda | A |
| Yoga & Naturopathy | Y |
| Unani | U |
| Siddha | S |
| Homoeopathy | H |

### AYUSH Skill Taxonomy (Planned)

The platform will use an extensible skill taxonomy covering competency areas such as:

- Clinical Knowledge & Clinical Reasoning
- Diagnostics & Emergency/Triage Awareness
- Research Methodology & Biostatistics
- Pharmacovigilance & Herb-Drug Interaction Awareness
- Digital Health & EHR/ABDM Awareness
- Communication & Patient Counselling
- Regulatory Awareness & Healthcare Administration
- Scientific Validation & Documentation
- Entrepreneurship & Industry Skills

> The AYUSH-specific skill taxonomy is planned. The current implementation uses a general-purpose domain and niche system for interest discovery, knowledge testing, and skill-gap analysis. Extending this to AYUSH-specific competency areas is part of the roadmap.

---

## AYUSH Skill Passport (Planned)

The AYUSH Skill Passport will consolidate a student's verified competency profile:

- Knowledge competency (assessment results)
- Practical competency (scenario-based assessments)
- Research competency
- Digital health competency
- Pharmacovigilance competency
- Communication skills
- Industry readiness
- Skill gaps and development areas
- Internship and work experience records
- Certifications and verified credentials

> The Skill Passport is planned. Currently, students have individual skill profiles built from interest discovery, knowledge test results, and skill-gap analyses. The Passport concept will unify these into a single portable credential.

---

## Assessment System

### Currently Implemented

**Knowledge Assessment Engine**

- Multi-difficulty testing: Beginner, Intermediate, Advanced
- Question complexity tiers: Fundamental, Application, Challenging Reasoning
- AI-powered question generation (integrated with question bank)
- Question bank with 200K+ data file for domain/niche coverage
- Question validation and deduplication
- Scored results with performance tiers (Needs Foundation → Expert)
- Strengths and weakness analysis
- Detailed question-by-question breakdown with explanations
- Persisted test sessions and results

**Industry Question Bank**

- Industry partners can create custom screening questions
- Question management with metadata

### Assessment Roadmap (Planned)

**NEET UG-oriented Knowledge Assessment**

Practice and knowledge mapping aligned with undergraduate AYUSH competency areas.

> This does NOT conduct official NEET UG examinations. It provides NEET-oriented practice and knowledge assessment for competency mapping.

**AIAPGET PG-oriented Knowledge Assessment**

Practice and knowledge mapping aligned with postgraduate AYUSH competency areas.

> This does NOT conduct official AIAPGET PG examinations. It provides AIAPGET-oriented practice and knowledge assessment for competency mapping.

**Practical Scenario Lab**

Case and scenario-based assessment covering:

- Clinical reasoning and diagnostics awareness
- Triage and escalation awareness
- Research methodology
- Pharmacovigilance
- Digital health scenarios
- Communication and patient counselling
- Regulatory awareness

**Industry Skill Assessment**

Assessment of skills relevant to specific industry roles and job requirements.

---

## Question Bank Roadmap (Planned)

The platform is intended to support a large, structured question bank covering:

- NEET UG-oriented questions
- AIAPGET PG-oriented questions
- Practical scenario questions
- Industry skill questions

Question metadata architecture will support:

| Field | Purpose |
|---|---|
| Subject | Academic subject area |
| Topic | Specific topic within subject |
| Difficulty | Beginner / Intermediate / Advanced |
| Cognitive Level | Recall / Application / Analysis |
| Skill Mapping | Linked competency areas |
| Explanation | Detailed answer rationale |
| Source / Reference | Attribution |
| Exam Category | NEET UG / AIAPGET PG / Practical / Industry |

> The current question bank contains general-purpose questions organized by domain and niche. Expansion to AYUSH-specific validated question banks is planned.

---

## Industry Skill Demand Intelligence (Planned)

Industry partners will be able to define:

- Required and preferred skills for roles
- Job roles and internship roles with skill requirements
- Research requirements and emerging skills
- Experience level expectations

SkillBridge will compare:

```text
INDUSTRY DEMAND (required skills, roles, emerging needs)
        vs
STUDENT SKILL SUPPLY (assessment results, competencies, gaps)
```

to identify macro-level skill gaps and inform curriculum alignment.

> Currently, industry partners can post jobs/internships with required skills, and the matching engine evaluates student compatibility. The aggregate demand intelligence layer is planned.

---

## Verified Internships (Planned)

The planned verified AYUSH internship ecosystem includes:

- Verified organization registration and vetting
- Internship roles with eligibility and skill requirements
- Duration, stipend, and location details
- Application, selection, and completion workflows
- Completion certificates and experience verification

> Currently, internship postings with skill requirements and student applications are implemented. The full verified internship lifecycle (verification, completion tracking, certificate issuance) is planned.

---

## R&D Collaboration (Planned)

Industry partners will be able to publish:

- Research problem statements
- R&D requirements with required skills and research domains
- Expected outcomes and collaboration terms

Institutions and students can discover relevant R&D opportunities and participate in structured collaboration workflows.

---

## Innovation / IP (Planned)

The Innovation/IP layer will support:

- Research outputs and publications
- Patents and technologies
- Licensing opportunities
- Academia–industry collaboration tracking

---

## Ministry Intelligence (Planned)

### National AYUSH Skill Intelligence

The Ministry dashboard will provide aggregate indicators across:

| Indicator | Description |
|---|---|
| Student Competency | Aggregate skill levels across AYUSH disciplines |
| Skill Supply | Available competencies in the graduate pipeline |
| Industry Demand | Skills and roles required by industry partners |
| Skill Gaps | National-level gap between supply and demand |
| Internship Availability | Active verified internship positions |
| Placement Trends | Hiring outcomes and employment patterns |
| Institution Performance | Institutional skill-development effectiveness |
| R&D Activity | Ongoing research collaborations |
| Innovation/IP | Patent and technology output |

> All Ministry-level data will be aggregated and anonymized. Prototype data must not be represented as official government statistics.

---

## System Architecture

```text
                     +------------------------------+
                     |           Next.js             |
                     |   Frontend + UI + API Routes  |
                     +--------------+---------------+
                                    |
                   +----------------+----------------+
                   |                |                |
                   v                v                v
              Supabase          Storage            Auth
                   |          (Documents,       (OTP-based,
                   v           Resumes)        Role-based)
              PostgreSQL
                   |
                pgvector
                   |
                   v
             +-----------+
             |  FastAPI   |
             | Python AI  |
             +-----+-----+
                   |
          +--------+--------+
          |                 |
          v                 v
    OCR Engine        Face Verifier
    (Tesseract)      (Quality Check)
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| React 19 | UI library |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | Component library |
| Lucide React | Icon system |

### Backend

| Technology | Purpose |
|---|---|
| Next.js API Routes | Application APIs and business logic |
| Python + FastAPI | AI/ML services, OCR, and verification |

### Database & Storage

| Technology | Purpose |
|---|---|
| PostgreSQL | Primary relational database |
| Supabase | Database platform, auth, and storage |
| pgvector | Vector storage for semantic matching |
| Supabase Storage | Document and resume file storage |

### Authentication & Security

| Technology | Purpose |
|---|---|
| Custom OTP-based Auth | Email + OTP verification per role |
| Role-Based Access Control | Student, Faculty, Campus, Industry, Admin |
| Row Level Security (RLS) | Database-level data protection |
| Session-based Auth | Signed cookie sessions |

### AI & Intelligence

| Technology | Purpose |
|---|---|
| Python | AI/ML processing backend |
| Tesseract OCR | Document text extraction |
| pypdf | PDF processing |
| sentence-transformers | Embeddings for semantic matching |
| Rule-Based Engine | Scoring, matching, eligibility |
| Question Generation | AI-powered assessment questions |

### Deployment

| Technology | Purpose |
|---|---|
| Vercel | Frontend and Next.js deployment |
| Supabase Cloud | Database and storage hosting |
| GitHub | Version control and CI/CD |

---

## Current Implementation vs Roadmap

| Feature | Status |
|---|---|
| Authentication (OTP + Role-based Login) | ✅ Implemented |
| Registration (Multi-role with OTP verification) | ✅ Implemented |
| Role-Based Access Control (Student, Faculty, Campus, Industry, Admin) | ✅ Implemented |
| Student Dashboard | ✅ Implemented |
| Student Profile & Settings | ✅ Implemented |
| Interest Discovery Engine | ✅ Implemented |
| Knowledge Assessment (Multi-difficulty, AI questions) | ✅ Implemented |
| Question Bank (200K+ general-purpose data) | ✅ Implemented |
| Skill-Gap Analysis Engine | ✅ Implemented |
| Learning Recommendations (YouTube-based) | ✅ Implemented |
| Resume Builder / ATS Analyzer | ✅ Implemented |
| Document Upload & OCR Verification | ✅ Implemented |
| Face Verification (Biometric quality check) | ✅ Implemented |
| Job & Internship Listings | ✅ Implemented |
| Job Readiness Check & Matching | ✅ Implemented |
| Application Submission & Tracking | ✅ Implemented |
| Student Workflow Progress Tracking | ✅ Implemented |
| Industry Portal (Dashboard, Profile, Hiring Pipeline) | ✅ Implemented |
| Industry Question Bank | ✅ Implemented |
| Industry Student Data Access | ✅ Implemented |
| Industry Application Screening & Interview Evaluation | ✅ Implemented |
| Industry Hiring Analytics | ✅ Implemented |
| Admin Portal (Overview, Students, Faculty, Industry, Skills, Analytics) | ✅ Implemented |
| Admin Skill Library & Skill-Gap Monitoring | ✅ Implemented |
| Admin Approvals & Audit Logs | ✅ Implemented |
| Faculty Portal (Basic) | ✅ Implemented (placeholder) |
| Campus Portal (Basic) | ✅ Implemented (placeholder) |
| Educator Catalog (Sample learning providers) | ✅ Implemented |
| AYUSH Discipline Specialization | 🔄 In Progress |
| AYUSH Skill Taxonomy | 📋 Planned |
| AYUSH Skill Passport | 📋 Planned |
| NEET UG-oriented Assessment | 📋 Planned |
| AIAPGET PG-oriented Assessment | 📋 Planned |
| Practical Scenario Lab | 📋 Planned |
| Industry Skill Demand Intelligence (Aggregate) | 📋 Planned |
| Verified Internship Lifecycle | 📋 Planned |
| R&D Collaboration Hub | 📋 Planned |
| Ministry Intelligence Dashboard | 📋 Planned |
| Innovation / IP Showcase | 📋 Planned |

---

## SIH Demonstration Story

### Student Journey

```text
Student joins SkillBridge
        ↓
Creates AYUSH profile (discipline, interests)
        ↓
Completes interest discovery
        ↓
Takes knowledge assessment (difficulty-adaptive)
        ↓
Gets skill competency profile with strengths/weaknesses
        ↓
Skill gaps are identified with personalized recommendations
        ↓
Accesses curated learning resources
        ↓
Builds ATS-compatible resume
        ↓
Discovers relevant jobs and internships
        ↓
Checks readiness and applies
        ↓
Tracks applications
        ↓
Explores R&D opportunities (planned)
```

### Industry Journey

```text
Industry partner registers and creates profile
        ↓
Posts jobs and internships with skill requirements
        ↓
Creates screening question bank
        ↓
Discovers and accesses student talent
        ↓
Screens applications and evaluates candidates
        ↓
Manages hiring pipeline
        ↓
Posts R&D problem statements (planned)
```

### Institution Journey

```text
Institution monitors student competencies
        ↓
Identifies skill gaps across cohorts
        ↓
Tracks industry demand alignment
        ↓
Supports internship and placement workflows
        ↓
Collaborates on R&D (planned)
```

### Ministry View

```text
Aggregate AYUSH skill intelligence (planned)
        ↓
Skill supply vs demand visibility
        ↓
Internship and placement trends
        ↓
R&D and innovation activity
```

---

## Roadmap

| Phase | Focus | Status |
|---|---|---|
| **Phase 1** | AYUSH platform transformation — adapt existing platform for AYUSH disciplines, profiles, and domain structure | 🔄 In Progress |
| **Phase 2** | Assessment + Question Bank — NEET UG-oriented, AIAPGET PG-oriented, and practical scenario assessments with AYUSH question banks | 📋 Planned |
| **Phase 3** | Skill Gap + Skill Passport — AYUSH Skill Passport consolidating all competency data into a portable credential | 📋 Planned |
| **Phase 4** | Verified Internship + Industry Matching — full internship lifecycle with verification, completion tracking, and skill-based matching | 📋 Planned |
| **Phase 5** | R&D Collaboration — industry R&D problem marketplace, institution participation, and research workflows | 📋 Planned |
| **Phase 6** | Ministry Skill Intelligence — national-level AYUSH skill, placement, and R&D dashboards | 📋 Planned |
| **Phase 7** | Innovation / IP — research output tracking, patents, licensing, and academia–industry IP collaboration | 📋 Planned |

---

## SIH PS 26044 Alignment

| SIH Requirement | SkillBridge Solution |
|---|---|
| **Skill Mapping** | AYUSH Skill Passport + Knowledge Assessment + Skill-Gap Analysis + Interest Discovery Engine |
| **Internship Matching** | Verified AYUSH Internship Ecosystem + Readiness Checks + Skill-Based Matching |
| **Placement** | Job Discovery + ATS Resume Analysis + Application Pipeline + Hiring Management |
| **Academia–Industry Collaboration** | Industry Portal + Institution Portal + R&D Hub + Question Bank Collaboration |
| **Industry Skill Demand** | Skill Demand Intelligence (aggregate demand vs supply analysis) |
| **National Intelligence** | Ministry Dashboard (aggregate AYUSH skill, placement, and R&D indicators) |
| **Research / R&D** | R&D Problem Marketplace (industry publishes problems, institutions participate) |
| **Innovation / IP** | Innovation & IP Showcase (research outputs, patents, licensing) |

---

## Repository Structure

```text
Skill-Bridge/
├── frontend/                  # Next.js application
│   ├── src/
│   │   ├── app/               # Pages and API routes
│   │   │   ├── student/       # Student portal (15 routes)
│   │   │   ├── industry/      # Industry portal
│   │   │   ├── admin/         # Admin portal
│   │   │   ├── campus/        # Campus portal
│   │   │   ├── faculty/       # Faculty portal
│   │   │   ├── register/      # Registration
│   │   │   └── api/           # API routes (auth, student, admin, industry)
│   │   ├── components/        # UI components by role
│   │   └── lib/               # Business logic
│   │       ├── knowledge-test/ # Assessment engine
│   │       ├── skill-gap/      # Skill-gap analysis engine
│   │       ├── interest-engine/ # Interest discovery
│   │       ├── resume/         # ATS analysis
│   │       ├── learning/       # Learning recommendations
│   │       ├── verification/   # Document verification
│   │       ├── workflow/       # Student onboarding workflow
│   │       ├── applications/   # Job applications
│   │       ├── industry/       # Industry logic
│   │       └── db.ts           # Database layer
│   └── supabase/              # Database schema (schema.sql)
├── backend/                   # Python FastAPI service
│   └── app/
│       ├── main.py            # API endpoints
│       ├── ocr/               # OCR engine (Tesseract)
│       └── services/          # Face verification
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Supabase project (free tier)

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Update Supabase credentials in .env.local
npm install
npm run dev
```

### Backend (Python AI/OCR Service)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## Zero-Cost Development Strategy

The project is designed around a zero-cost development approach:

- Free-tier infrastructure (Supabase, Vercel)
- Open-source software and libraries
- Local AI models where practical
- No paid API dependencies for core functionality

Free-tier limitations may apply depending on usage.

---

## Project Status

This project is being developed as a Smart India Hackathon (SIH) prototype aligned with Problem Statement 26044. The platform currently provides a functional skill assessment, skill-gap analysis, job matching, and recruitment ecosystem. The AYUSH specialization, Skill Passport, advanced assessments, R&D collaboration, and Ministry intelligence layers are being developed as part of the roadmap.

---

## SIH Project Information

| Field | Value |
|---|---|
| Problem Statement | PS 26044 |
| Project Name | SkillBridge |
| Organization | Ministry of Ayush |
| Domain | AYUSH / Education / Skill Development / Employability |
| Platform | Web-based Integrated Ecosystem |

---

> **Learn → Assess → Map → Improve → Match → Hire → Collaborate → Innovate**
