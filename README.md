# Skill-Bridge
Sih Problem Statement 26044 


## Smart Skill Development, Assessment and Industry Connect Platform


SkillBridge is an integrated digital platform designed to bridge the gap between students, faculty, educational institutions, and industry through skill assessment, skill-gap identification, personalized learning, resume development, and employment opportunities.

The platform creates a unified ecosystem where students can understand and improve their skills, faculty can mentor students, campuses can monitor skill and placement outcomes, and industries can discover candidates based on verified skills and requirements.

---

## Problem Statement

There is often a disconnect between:

* Students and the skills demanded by industry
* Faculty and student skill development
* Campuses and placement intelligence
* Industry and qualified candidates

Students may not clearly understand which skills they lack for their desired career paths, while companies may struggle to identify candidates whose actual skills match their requirements.

SkillBridge addresses this gap by creating a single ecosystem for skill discovery, assessment, development, verification, and employment.

---

## Solution

SkillBridge connects four major stakeholders through a single role-based platform:

```text
                         SkillBridge
                              |
          +-------------------+-------------------+
          |                   |                   |
       Student             Faculty             Campus
          |                   |                   |
          +-------------------+-------------------+
                              |
                           Industry
```

Each stakeholder receives dedicated functionality while sharing a common platform, database, authentication system, and intelligence layer.

---

# Platform Roles

## Student

Students can:

* Create and manage their profile
* Discover career interests
* Take knowledge and skill assessments
* Determine their current skill level
* Identify skill gaps
* Receive personalized learning recommendations
* Build ATS-friendly resumes
* Upload and manage certificates and documents
* Discover internships and jobs
* Check job compatibility
* Apply for opportunities
* Track applications
* Monitor skill development

### Student Flow

```text
Profile
   |
Interest Discovery
   |
Knowledge / Skill Assessment
   |
Skill Profile
   |
Skill Gap Analysis
   |
Personalized Learning
   |
Resume Builder
   |
Job / Internship Matching
   |
Application
   |
Application Tracking
```

---

## Faculty

Faculty members can:

* Monitor student skill development
* View assessment performance
* Identify common skill gaps
* Track learning progress
* Recommend learning resources
* Mentor students
* Monitor placement readiness
* Analyze student performance

Faculty can use aggregated student insights to identify areas where additional training, mentoring, or curriculum improvements are required.

---

## Campus

Campus administrators can:

* Manage students and faculty
* Manage institutional data
* Monitor student skill levels
* Track placement readiness
* Analyze skill-gap trends
* Manage industry connections
* Monitor internships and placements
* View institutional performance analytics

The campus dashboard provides a centralized view of the institution's skill-development and placement ecosystem.

---

## Industry

Industry users can:

* Register their organization
* Complete organization verification
* Create job and internship opportunities
* Define required skills
* Specify eligibility criteria
* Discover suitable candidates
* View candidate skill profiles
* Shortlist candidates
* Manage applications
* Track recruitment stages

### Industry Flow

```text
Company Registration
        |
Organization Verification
        |
Create Job / Internship
        |
Define Requirements
        |
Candidate Matching
        |
Shortlisting
        |
Interview
        |
Hiring
```

---

# AI-Powered Intelligence

SkillBridge uses AI along with deterministic rule-based systems to provide personalized insights and recommendations.

## Skill Gap Analysis

The system compares a student's current skills with the skills required for their desired career or target job.

```text
Student's Current Skills
          +
Desired Career / Target Job
          +
Required Skills
          |
          v
    Skill Gap Engine
          |
          v
Missing / Weak Skills
          |
          v
Personalized Recommendations
```

AI can help explain:

* Which skills are missing
* Which skills need improvement
* Why a skill is important
* What the student should learn next
* Which opportunities match the student's current profile

---

# Intelligent Job Matching

The matching engine evaluates candidates against job requirements using multiple factors:

* Skills
* Assessment scores
* Education
* Certifications
* Experience
* Job requirements

A weighted scoring system can be used to calculate compatibility.

Example:

```text
Skills            45%
Education         20%
Assessment Score  15%
Experience        10%
Certifications    10%
```

The system can also explain the match.

Example:

```text
Compatibility: 87%

Strong Matches:
- Python
- SQL
- Problem Solving

Skill Gaps:
- Docker
- Linux
- Networking
```

---

# Knowledge and Skill Assessment

The assessment system evaluates students based on their current knowledge and skills.

Multiple difficulty levels can be supported:

```text
Beginner
   |
Intermediate
   |
Advanced
```

Assessment results contribute to the student's skill profile and can be used to identify areas requiring improvement.

The system can dynamically update a student's knowledge level based on assessment performance.

---

# Document Verification

Students can upload relevant documents such as:

* Academic marksheets
* Student identification
* Certifications
* Skill certificates
* Resume
* Other supporting documents

The verification pipeline can process uploaded documents through:

```text
Document Upload
      |
File Validation
      |
OCR / Text Extraction
      |
Information Extraction
      |
Profile Cross-Check
      |
Verification Status
```

Possible verification states:

```text
Verified
Needs Review
Rejected
```

Where official verification APIs are available, they can be integrated in future versions.

---

# Resume Builder and ATS Analysis

Students can create structured, ATS-friendly resumes using their profile information.

The resume system can analyze:

* Skills
* Education
* Projects
* Certifications
* Experience
* Keywords
* Job-description compatibility

### ATS Workflow

```text
Resume
  +
Job Description
       |
Text Extraction
       |
Skill / Keyword Analysis
       |
Compatibility Analysis
       |
ATS Score
       |
Missing Skills and Improvements
```

---

# Recommendation Engine

SkillBridge generates recommendations based on:

* Career interests
* Assessment performance
* Current skills
* Skill gaps
* Resume
* Target jobs
* Learning progress

Recommendations can include:

* Courses
* Skills to learn
* Projects
* Certifications
* Practice resources
* Internship opportunities
* Job opportunities

---

# Authentication and Security

The platform uses role-based access control.

```text
                    Authentication
                         |
          +--------------+--------------+
          |              |              |
       Student         Faculty        Campus
                                        |
                                     Industry
```

Each role receives access only to the features and data relevant to that role.

Security mechanisms include:

* Authentication
* Role-Based Access Control
* Row Level Security
* Secure file storage
* Input validation
* Protected APIs
* Server-side authorization

---

# System Architecture

```text
                         +----------------------+
                         |       Next.js        |
                         | Frontend + UI + API  |
                         +----------+-----------+
                                    |
                   +----------------+----------------+
                   |                |                |
                   v                v                v
              Supabase          Storage            Auth
                   |
                   v
              PostgreSQL
                   |
                pgvector
                   |
                   v
             Matching Engine
                   |
                   v
             +-------------+
             |   FastAPI   |
             | Python AI   |
             +------+------+
                    |
                    v
              AI / ML Models
```

---

# Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

## Backend

* Next.js API Routes
* Python
* FastAPI

## Database

* PostgreSQL
* Supabase
* pgvector

## Authentication and Storage

* Supabase Auth
* Supabase Storage
* Row Level Security

## AI and Intelligence

* Python
* Rule-Based Engine
* Ollama
* Open-Source LLMs
* Embeddings
* pgvector

## Search and Matching

* PostgreSQL Full-Text Search
* pgvector
* Weighted Matching Algorithm

## Document and Resume Processing

* PDF/Text Extraction
* OCR
* ATS Analysis Engine

## Deployment

* Vercel
* Supabase
* GitHub

## Development

* Git
* GitHub
* Antigravity Pro

---

# Zero-Cost Development Strategy

The project is designed around a zero-cost development strategy.

The architecture prioritizes:

* Free-tier infrastructure
* Open-source software
* Local AI models where practical
* Free database services
* Free hosting options
* Open-source libraries

### Target Cost

```text
Development Cost:  ₹0
Software Cost:     ₹0
Infrastructure:    Free Tier
AI:                Open Source / Local
```

Free-tier limitations may apply depending on usage.

---

# Core Modules

| Module                | Purpose                                    |
| --------------------- | ------------------------------------------ |
| Student Management    | Student profiles and career data           |
| Skill Assessment      | Evaluate student knowledge                 |
| Skill Gap Analysis    | Identify missing skills                    |
| AI Recommendations    | Personalized development paths             |
| Learning              | Recommended learning resources             |
| Resume Builder        | Create structured resumes                  |
| ATS Analyzer          | Analyze resume-job compatibility           |
| Job Portal            | Jobs and internships                       |
| Matching Engine       | Match students with opportunities          |
| Document Verification | Manage and verify documents                |
| Faculty Dashboard     | Monitor student development                |
| Campus Dashboard      | Institutional analytics                    |
| Industry Portal       | Recruitment and hiring                     |
| Analytics             | Skills, performance and placement insights |

---

# Key Features

* Unified Student-Faculty-Campus-Industry ecosystem
* Skill-based student profiling
* Adaptive knowledge assessment
* AI-powered skill-gap analysis
* Personalized learning recommendations
* Intelligent job matching
* ATS-friendly resume generation
* Resume-job compatibility analysis
* Document management and verification
* Role-based dashboards
* Application tracking
* Industry recruitment portal
* Institutional skill analytics
* Secure authentication and data access

---

# End-to-End Ecosystem

```text
                  STUDENT
                     |
                     v
              Skill Assessment
                     |
                     v
               Skill Profile
                     |
                     v
              Skill Gap Analysis
                     |
              +------+------+
              |             |
              v             v
        Learning Path    Job Matching
              |             |
              v             v
       Skill Improvement  Applications
              |             |
              +------+------+
                     |
                     v
                Resume / ATS
                     |
                     v
                  INDUSTRY
                     |
                     v
                Recruitment
                     |
                     v
                   HIRING
```

Faculty and campus stakeholders support and monitor the ecosystem through mentoring, analytics, and institutional insights.

---

# Expected Impact

SkillBridge aims to:

* Reduce the gap between education and industry requirements
* Help students understand their actual skill levels
* Provide personalized skill-development paths
* Improve student employability
* Make recruitment more skill-oriented
* Help institutions identify training requirements
* Give faculty actionable student insights
* Help companies discover better-matched candidates
* Improve transparency throughout the recruitment process

---

# Future Scope

The platform can be extended with:

* Government and academic verification APIs
* College ERP integrations
* Industry certification integrations
* Advanced AI career guidance
* Interview preparation
* AI-powered mock interviews
* Industry-specific assessments
* Placement prediction
* Advanced institutional analytics
* Multilingual support
* Mobile applications

---

# Target Users

| User     | Primary Objective                   |
| -------- | ----------------------------------- |
| Student  | Learn, improve skills and get hired |
| Faculty  | Mentor and monitor students         |
| Campus   | Manage skills and placements        |
| Industry | Discover and hire suitable talent   |

---

# Vision

> Learn → Improve → Get Matched → Get Hired

SkillBridge aims to create a connected ecosystem where education, skills, institutions, and industry work together to make students more career-ready and recruitment more skill-driven.

---

## SIH Project Information

**Problem Statement:** PS 044
**Project Name:** SkillBridge
**Domain:** Education / Skill Development / Employability
**Platform:** Web-based Integrated Ecosystem

---

## Project Status

This project is being developed as a Smart India Hackathon solution with a focus on building a functional, scalable, and zero-cost prototype using open-source technologies and free-tier infrastructure.
