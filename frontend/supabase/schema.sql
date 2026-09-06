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
    face_capture_status TEXT DEFAULT 'PENDING' CHECK (face_capture_status IN ('PENDING', 'CAPTURED', 'VERIFIED', 'FAILED')),
    face_capture_storage_ref TEXT,
    face_capture_mode TEXT CHECK (face_capture_mode IN ('auto', 'manual')),
    face_confidence NUMERIC(4, 2),
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_verification_per_student UNIQUE (student_id)
);

-- 9. Verification Documents Table
CREATE TABLE IF NOT EXISTS public.verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    verification_id UUID NOT NULL REFERENCES public.student_verifications(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('image/png', 'image/jpeg', 'image/jpg', 'application/pdf')),
    file_size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    ocr_status TEXT NOT NULL DEFAULT 'pending' CHECK (ocr_status IN ('pending', 'processing', 'completed', 'failed')),
    ocr_extracted_data JSONB DEFAULT '{}'::jsonb,
    ocr_confidence NUMERIC(4, 2),
    ocr_engine TEXT,
    ocr_error TEXT,
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
