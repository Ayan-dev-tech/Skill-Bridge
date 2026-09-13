-- Skill-Bridge Core Supabase Database Schema
-- Baseline Normalized PostgreSQL Schema for Skill-Bridge
-- Run in Supabase SQL Editor or applied via migration

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Users Table
-- Supports multiple roles per email, but prevents duplicate accounts within the same role.
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'faculty', 'campus', 'industry', 'ministry')),
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_email_per_role UNIQUE (email, role)
);

-- 3. Profiles Table (Role-specific attributes)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. OTP Verifications Table
CREATE TABLE IF NOT EXISTS public.otp_verifications (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'faculty', 'campus', 'industry', 'ministry')),
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    attempts INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Student Verifications Table (Onboarding Identity & Document Authentication)
-- Status aligned to active TypeScript model (Zero OCR, Document Submission)
CREATE TABLE IF NOT EXISTS public.student_verifications (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    verification_status TEXT NOT NULL DEFAULT 'NOT_STARTED' CHECK (
        verification_status IN ('NOT_STARTED', 'DOCUMENTS_PENDING', 'VERIFIED', 'REJECTED')
    ),
    professional_profiles JSONB DEFAULT '{}'::jsonb,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMPTZ,
    CONSTRAINT unique_verification_per_student UNIQUE (student_id)
);

-- 6. Verification Documents Table (Document Submission Records)
CREATE TABLE IF NOT EXISTS public.verification_documents (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    verification_id TEXT REFERENCES public.student_verifications(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    group_id TEXT,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    upload_status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Interest Sessions Table (Stage 2 Dynamic Interactive Session)
CREATE TABLE IF NOT EXISTS public.interest_sessions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    session_id TEXT NOT NULL UNIQUE,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    phase INT NOT NULL CHECK (phase IN (1, 2)),
    broad_domain TEXT,
    answers JSONB NOT NULL DEFAULT '[]'::jsonb,
    signal_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    domain_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'intro',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Interest Profiles Table (Stage 2 Confirmed Direction)
CREATE TABLE IF NOT EXISTS public.interest_profiles (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    confirmed_main_domain TEXT NOT NULL,
    confirmed_main_domain_id TEXT NOT NULL,
    confirmed_specific_interest TEXT NOT NULL,
    explanation TEXT NOT NULL,
    confidence NUMERIC NOT NULL DEFAULT 0,
    interest_signals JSONB NOT NULL DEFAULT '{}'::jsonb,
    candidate_domain_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    phase1_answer_count INT NOT NULL DEFAULT 0,
    phase2_answer_count INT NOT NULL DEFAULT 0,
    confirmed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Knowledge Test Sessions Table (Stage 3 Active Test Session)
CREATE TABLE IF NOT EXISTS public.knowledge_test_sessions (
    session_id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    domain_id TEXT NOT NULL,
    domain_name TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    current_question_index INT NOT NULL DEFAULT 0,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    time_remaining_seconds INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'in_progress',
    started_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- 10. Knowledge Test Results Table (Stage 3 Completed Test Result)
CREATE TABLE IF NOT EXISTS public.knowledge_test_results (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    session_id TEXT NOT NULL,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    domain_id TEXT NOT NULL,
    domain_name TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    score NUMERIC NOT NULL DEFAULT 0,
    max_score NUMERIC NOT NULL DEFAULT 0,
    score_percent NUMERIC NOT NULL DEFAULT 0,
    knowledge_level TEXT NOT NULL,
    strengths TEXT[] NOT NULL DEFAULT '{}',
    weaknesses TEXT[] NOT NULL DEFAULT '{}',
    answers JSONB NOT NULL DEFAULT '[]'::jsonb,
    time_taken_seconds INT NOT NULL DEFAULT 0,
    completed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Educators Catalog Table
CREATE TABLE IF NOT EXISTS public.educators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    description TEXT NOT NULL,
    website TEXT NOT NULL,
    verified_status TEXT NOT NULL DEFAULT 'sample_provider',
    status_label TEXT NOT NULL DEFAULT 'Sample Learning Provider',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Education Programs Catalog Table
CREATE TABLE IF NOT EXISTS public.education_programs (
    id TEXT PRIMARY KEY,
    educator_id TEXT REFERENCES public.educators(id) ON DELETE CASCADE,
    educator_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    program_url TEXT NOT NULL,
    domains TEXT[] NOT NULL DEFAULT '{}',
    niches TEXT[] NOT NULL DEFAULT '{}',
    skill_ids TEXT[] NOT NULL DEFAULT '{}',
    difficulty TEXT NOT NULL DEFAULT 'all_levels',
    delivery_type TEXT NOT NULL,
    duration TEXT NOT NULL,
    certification TEXT NOT NULL,
    verified_status TEXT NOT NULL DEFAULT 'sample_provider',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Persisted Skill Gap Analyses Table (Stage 4 Synthesis)
CREATE TABLE IF NOT EXISTS public.skill_gap_analyses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    interest_profile_id TEXT REFERENCES public.interest_profiles(id) ON DELETE SET NULL,
    knowledge_test_result_id TEXT REFERENCES public.knowledge_test_results(id) ON DELETE SET NULL,
    domain_id TEXT NOT NULL,
    domain_name TEXT NOT NULL,
    niche_id TEXT NOT NULL,
    niche_title TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    test_score NUMERIC NOT NULL DEFAULT 0,
    test_max_score NUMERIC NOT NULL DEFAULT 0,
    test_score_percent NUMERIC NOT NULL DEFAULT 0,
    knowledge_level TEXT NOT NULL,
    skill_profile_version TEXT NOT NULL DEFAULT '1.0',
    executive_summary TEXT NOT NULL,
    skill_gaps JSONB NOT NULL DEFAULT '[]'::jsonb,
    recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
    ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
    is_stale BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. Learning Resources Table (Stage 5 Curated Video & Learning Cache)
CREATE TABLE IF NOT EXISTS public.learning_resources (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    analysis_id TEXT REFERENCES public.skill_gap_analyses(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL DEFAULT 'youtube_video',
    resources JSONB NOT NULL DEFAULT '[]'::jsonb,
    cached_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. Resume Analyses Table (Stage 6 ATS Resume Checker)
CREATE TABLE IF NOT EXISTS public.resume_analyses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    resume_file_name TEXT,
    job_title TEXT,
    target_role TEXT,
    has_job_description BOOLEAN NOT NULL DEFAULT FALSE,
    overall_score NUMERIC NOT NULL DEFAULT 0,
    job_match_score NUMERIC,
    strength_tier TEXT NOT NULL DEFAULT 'Needs Improvement',
    summary TEXT NOT NULL,
    category_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    matched_keywords TEXT[] NOT NULL DEFAULT '{}',
    missing_keywords TEXT[] NOT NULL DEFAULT '{}',
    detected_sections TEXT[] NOT NULL DEFAULT '{}',
    missing_sections TEXT[] NOT NULL DEFAULT '{}',
    issues JSONB NOT NULL DEFAULT '[]'::jsonb,
    recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
    analyzed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    disclaimer TEXT
);

-- 16. Hiring Requests Table (Admin Oversight & Compliance)
CREATE TABLE IF NOT EXISTS public.hiring_requests (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    company_name TEXT NOT NULL,
    industry_domain TEXT NOT NULL,
    job_title TEXT NOT NULL,
    positions INT NOT NULL DEFAULT 1,
    applicants INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    is_frozen BOOLEAN NOT NULL DEFAULT FALSE,
    freeze_reason TEXT,
    contact_email TEXT,
    contact_person TEXT,
    rejection_reason TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. Campus Requests Table (Admin Institutional Oversight & Drives)
CREATE TABLE IF NOT EXISTS public.campus_requests (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    campus_name TEXT NOT NULL,
    code TEXT NOT NULL,
    request_type TEXT NOT NULL,
    students_enrolled INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    is_frozen BOOLEAN NOT NULL DEFAULT FALSE,
    freeze_reason TEXT,
    domain TEXT,
    location TEXT,
    contact_email TEXT,
    contact_person TEXT,
    rejection_reason TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 18. Industry Questions Table (Recruiter Question Bank)
CREATE TABLE IF NOT EXISTS public.industry_questions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    industry_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL DEFAULT 'mcq',
    options JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_option_id TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'intermediate',
    complexity TEXT NOT NULL DEFAULT 'application',
    domain_id TEXT NOT NULL,
    concept_tag TEXT NOT NULL,
    marks INT NOT NULL DEFAULT 1,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 19. Industry Hiring Posts Table (Stage 7 Jobs & Internships)
CREATE TABLE IF NOT EXISTS public.industry_hiring_posts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    industry_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    hiring_type TEXT NOT NULL DEFAULT 'Full-time',
    industry_domain TEXT NOT NULL,
    location TEXT NOT NULL,
    work_mode TEXT NOT NULL DEFAULT 'Hybrid',
    salary_range TEXT,
    experience_requirement TEXT,
    openings INT NOT NULL DEFAULT 1,
    deadline TIMESTAMPTZ NOT NULL,
    description TEXT NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    required_skills TEXT[] NOT NULL DEFAULT '{}',
    preferred_skills TEXT[] NOT NULL DEFAULT '{}',
    required_qualifications TEXT[] NOT NULL DEFAULT '{}',
    preferred_qualifications TEXT[] NOT NULL DEFAULT '{}',
    required_document_types TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft',
    knowledge_test_config JSONB,
    interview_config JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMPTZ
);

-- 20. Job Applications Table (Stage 7 ATS Application Tracking Funnel)
CREATE TABLE IF NOT EXISTS public.job_applications (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    job_id TEXT,
    company_name TEXT NOT NULL,
    role_title TEXT,
    position TEXT,
    location TEXT,
    type TEXT,
    employment_type TEXT,
    salary_range TEXT,
    status TEXT NOT NULL DEFAULT 'applied',
    applied_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    status_updated_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    match_score_at_application NUMERIC,
    timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
    applicant_full_name TEXT,
    applicant_email TEXT,
    applicant_phone TEXT,
    resume_file_name TEXT,
    submitted_document_types TEXT[] NOT NULL DEFAULT '{}',
    cover_letter TEXT,
    portfolio_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    screening_status TEXT NOT NULL DEFAULT 'pending',
    screening_notes TEXT,
    document_validation_results JSONB,
    eligibility_status TEXT,
    knowledge_test_score NUMERIC,
    knowledge_test_passed BOOLEAN,
    interview_status TEXT NOT NULL DEFAULT 'not_scheduled',
    interview_rounds JSONB NOT NULL DEFAULT '[]'::jsonb,
    interview_feedback TEXT,
    final_status TEXT NOT NULL DEFAULT 'pending',
    final_decision_date TIMESTAMPTZ,
    offer_details JSONB
);

-- ============================================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_users_email_role ON public.users(email, role);
CREATE INDEX IF NOT EXISTS idx_otp_email_role ON public.otp_verifications(email, role);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_verifications_student_id ON public.student_verifications(student_id);
CREATE INDEX IF NOT EXISTS idx_verification_docs_student ON public.verification_documents(student_id);
CREATE INDEX IF NOT EXISTS idx_verification_docs_ver_id ON public.verification_documents(verification_id);
CREATE INDEX IF NOT EXISTS idx_interest_sessions_student ON public.interest_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_interest_profiles_student ON public.interest_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_ktest_sessions_student ON public.knowledge_test_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_ktest_results_student ON public.knowledge_test_results(student_id);
CREATE INDEX IF NOT EXISTS idx_educators_slug ON public.educators(slug);
CREATE INDEX IF NOT EXISTS idx_edu_programs_educator ON public.education_programs(educator_id);
CREATE INDEX IF NOT EXISTS idx_skill_gap_student_id ON public.skill_gap_analyses(student_id);
CREATE INDEX IF NOT EXISTS idx_skill_gap_stale ON public.skill_gap_analyses(student_id, is_stale);
CREATE INDEX IF NOT EXISTS idx_learning_resources_student ON public.learning_resources(student_id);
CREATE INDEX IF NOT EXISTS idx_resume_analyses_student ON public.resume_analyses(student_id);
CREATE INDEX IF NOT EXISTS idx_ind_questions_industry ON public.industry_questions(industry_id);
CREATE INDEX IF NOT EXISTS idx_hiring_posts_industry ON public.industry_hiring_posts(industry_id);
CREATE INDEX IF NOT EXISTS idx_hiring_posts_status ON public.industry_hiring_posts(status);
CREATE INDEX IF NOT EXISTS idx_job_apps_student ON public.job_applications(student_id);
CREATE INDEX IF NOT EXISTS idx_job_apps_job ON public.job_applications(job_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interest_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interest_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_gap_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hiring_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_hiring_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- 1. Users & Profiles Policies
CREATE POLICY "Public registration access" ON public.users
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read their own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can read their profile metadata" ON public.profiles
    FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can update their profile metadata" ON public.profiles
    FOR ALL USING (auth.uid()::text = user_id);

-- 2. Student Verification & Documents Policies
CREATE POLICY "Students can view own verification" ON public.student_verifications
    FOR SELECT USING (auth.uid()::text = student_id);
CREATE POLICY "Students can update own verification" ON public.student_verifications
    FOR ALL USING (auth.uid()::text = student_id);
CREATE POLICY "Students can view own verification documents" ON public.verification_documents
    FOR SELECT USING (auth.uid()::text = student_id);
CREATE POLICY "Students can manage own verification documents" ON public.verification_documents
    FOR ALL USING (auth.uid()::text = student_id);

-- 3. Student Assessment & Gap Analyses Policies
CREATE POLICY "Students can access own interest sessions" ON public.interest_sessions
    FOR ALL USING (auth.uid()::text = student_id);
CREATE POLICY "Students can access own interest profiles" ON public.interest_profiles
    FOR ALL USING (auth.uid()::text = student_id);
CREATE POLICY "Students can access own knowledge test sessions" ON public.knowledge_test_sessions
    FOR ALL USING (auth.uid()::text = student_id);
CREATE POLICY "Students can access own knowledge test results" ON public.knowledge_test_results
    FOR ALL USING (auth.uid()::text = student_id);
CREATE POLICY "Students can access own skill gap analyses" ON public.skill_gap_analyses
    FOR ALL USING (auth.uid()::text = student_id);
CREATE POLICY "Students can access own learning resources" ON public.learning_resources
    FOR ALL USING (auth.uid()::text = student_id);
CREATE POLICY "Students can access own resume analyses" ON public.resume_analyses
    FOR ALL USING (auth.uid()::text = student_id);
CREATE POLICY "Students can access own job applications" ON public.job_applications
    FOR ALL USING (auth.uid()::text = student_id);

-- 4. Catalogs & Public/Authenticated View
CREATE POLICY "Anyone can view active educators" ON public.educators
    FOR SELECT TO authenticated USING (active = TRUE);
CREATE POLICY "Anyone can view active education programs" ON public.education_programs
    FOR SELECT TO authenticated USING (active = TRUE);
CREATE POLICY "Anyone can view published hiring posts" ON public.industry_hiring_posts
    FOR SELECT TO authenticated USING (status = 'published');

-- 5. Industry Recruiter Policies
CREATE POLICY "Industry can manage own hiring posts" ON public.industry_hiring_posts
    FOR ALL USING (auth.uid()::text = industry_id);
CREATE POLICY "Industry can manage own questions" ON public.industry_questions
    FOR ALL USING (auth.uid()::text = industry_id);
CREATE POLICY "Industry can view applications to their jobs" ON public.job_applications
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.industry_hiring_posts p
            WHERE p.id = job_applications.job_id AND p.industry_id = auth.uid()::text
        )
    );

-- ============================================================================
-- SECURE SUPABASE STORAGE BUCKET & POLICIES
-- Bucket: 'verification-documents' (Private, not public)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'verification-documents',
    'verification-documents',
    FALSE,
    5242880, -- 5 MB max per document
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = FALSE,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

-- Storage RLS: Scoped strictly to authenticated student path: student/{studentId}/...
CREATE POLICY "Students can upload their own verification documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'verification-documents'
    AND (storage.foldername(name))[1] = 'student'
    AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Students can read their own verification documents"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'verification-documents'
    AND (storage.foldername(name))[1] = 'student'
    AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Students can delete their own verification documents"
ON storage.objects FOR DELETE TO authenticated
USING (
    bucket_id = 'verification-documents'
    AND (storage.foldername(name))[1] = 'student'
    AND (storage.foldername(name))[2] = auth.uid()::text
);
