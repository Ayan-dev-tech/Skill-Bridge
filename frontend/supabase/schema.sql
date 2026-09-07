-- Skill-Bridge Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up tables and Row Level Security (RLS)

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Users Table
-- Supports multiple roles per email, but prevents duplicate accounts within the same role.
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'faculty', 'campus', 'industry')),
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_email_per_role UNIQUE (email, role)
);

-- 3. Profiles Table (Role-specific attributes)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. OTP Verifications Table
CREATE TABLE IF NOT EXISTS public.otp_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'faculty', 'campus', 'industry')),
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    attempts INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_users_email_role ON public.users(email, role);
CREATE INDEX IF NOT EXISTS idx_otp_email_role ON public.otp_verifications(email, role);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- 7. Basic Policies
CREATE POLICY "Public registration access" ON public.users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- 8. Student Verifications Table (Onboarding Identity & Document Authentication)
CREATE TABLE IF NOT EXISTS public.student_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    verification_status TEXT NOT NULL DEFAULT 'NOT_STARTED' CHECK (
        verification_status IN (
            'NOT_STARTED',
            'DOCUMENTS_PENDING',
            'DOCUMENT_PROCESSING',
            'FACE_PENDING',
            'FACE_PROCESSING',
            'VERIFICATION_PROCESSING',
            'VERIFIED',
            'FAILED',
            'RETRY_REQUIRED'
        )
    ),
    professional_profiles JSONB DEFAULT '{}'::jsonb,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_verification_per_student UNIQUE (student_id)
);

-- 9. Verification Documents Table (Document Submission)
CREATE TABLE IF NOT EXISTS public.verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    verification_id UUID NOT NULL REFERENCES public.student_verifications(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    group_id TEXT,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('image/png', 'image/jpeg', 'image/jpg', 'application/pdf')),
    file_size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    upload_status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Verification Indexes
CREATE INDEX IF NOT EXISTS idx_verifications_student_id ON public.student_verifications(student_id);
CREATE INDEX IF NOT EXISTS idx_verification_docs_student ON public.verification_documents(student_id);
CREATE INDEX IF NOT EXISTS idx_verification_docs_ver_id ON public.verification_documents(verification_id);

-- 11. Enable RLS on Verification Tables
ALTER TABLE public.student_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;

-- 12. Row Level Security Policies (Students can only view and manage their own verification)
CREATE POLICY "Students can view own verification" ON public.student_verifications
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can update own verification" ON public.student_verifications
    FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Students can view own verification documents" ON public.verification_documents
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can manage own verification documents" ON public.verification_documents
    FOR ALL USING (auth.uid() = student_id);

-- 13. Secure Supabase Storage Bucket & Policies
-- Bucket: 'verification-documents' (Private, not public)
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

-- 14. Educators Catalog
CREATE TABLE IF NOT EXISTS educators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    description TEXT NOT NULL,
    website TEXT NOT NULL,
    verified_status TEXT NOT NULL DEFAULT 'sample_provider',
    status_label TEXT NOT NULL DEFAULT 'Sample Learning Provider',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Education Programs Catalog
CREATE TABLE IF NOT EXISTS education_programs (
    id TEXT PRIMARY KEY,
    educator_id TEXT REFERENCES educators(id) ON DELETE CASCADE,
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Persisted Skill Gap Analyses
CREATE TABLE IF NOT EXISTS skill_gap_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interest_profile_id UUID REFERENCES interest_profiles(id) ON DELETE SET NULL,
    knowledge_test_result_id UUID REFERENCES knowledge_test_results(id) ON DELETE SET NULL,
    domain_id TEXT NOT NULL,
    domain_name TEXT NOT NULL,
    niche_id TEXT NOT NULL,
    niche_title TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    test_score NUMERIC NOT NULL,
    test_max_score NUMERIC NOT NULL,
    test_score_percent NUMERIC NOT NULL,
    knowledge_level TEXT NOT NULL,
    skill_profile_version TEXT NOT NULL DEFAULT '1.0',
    executive_summary TEXT NOT NULL,
    skill_gaps JSONB NOT NULL DEFAULT '[]',
    recommendations JSONB NOT NULL DEFAULT '[]',
    ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
    is_stale BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skill_gap_student_id ON skill_gap_analyses(student_id);
CREATE INDEX IF NOT EXISTS idx_skill_gap_stale ON skill_gap_analyses(student_id, is_stale);

ALTER TABLE educators ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_gap_analyses ENABLE ROW LEVEL SECURITY;

-- Read-only access for authenticated users to active educators & programs
CREATE POLICY "Anyone can view active educators" ON educators
    FOR SELECT TO authenticated USING (active = TRUE);

CREATE POLICY "Anyone can view active education programs" ON education_programs
    FOR SELECT TO authenticated USING (active = TRUE);

-- Students can only access and modify their own skill gap analyses
CREATE POLICY "Students can access their own skill gap analyses" ON skill_gap_analyses
    FOR ALL USING (auth.uid() = student_id);

-- 12. Learning Resources (Curated YouTube video references & educational resources)
CREATE TABLE IF NOT EXISTS learning_resources (
    id TEXT PRIMARY KEY,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    analysis_id UUID REFERENCES skill_gap_analyses(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL DEFAULT 'youtube_video',
    resources JSONB NOT NULL DEFAULT '[]',
    cached_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_learning_resources_student ON learning_resources(student_id);
CREATE INDEX IF NOT EXISTS idx_learning_resources_analysis ON learning_resources(student_id, analysis_id);

ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can access their own learning resources" ON learning_resources
    FOR ALL USING (auth.uid() = student_id);


