-- =============================================================================
-- Skill-Bridge — AYUSH Foundation Migration
-- Run AFTER base schema.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. AYUSH Skill Passport Table
--    Extends student profile — one longitudinal record per student
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ayush_skill_passports (
    id                      TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id              TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    ayush_system            TEXT NOT NULL,
    course                  TEXT NOT NULL,
    academic_level          TEXT NOT NULL CHECK (academic_level IN ('UG', 'PG', 'PhD', 'Diploma')),
    institution             TEXT NOT NULL,
    batch_year              TEXT,
    -- skills, competencies, etc. stored as JSONB for extensibility
    skills                  JSONB NOT NULL DEFAULT '{}'::jsonb,
    competencies            JSONB NOT NULL DEFAULT '[]'::jsonb,
    assessment_results      JSONB NOT NULL DEFAULT '[]'::jsonb,
    skill_gaps              JSONB NOT NULL DEFAULT '[]'::jsonb,
    certifications          JSONB NOT NULL DEFAULT '[]'::jsonb,
    internship_ids          TEXT[] NOT NULL DEFAULT '{}',
    verified_experiences    JSONB NOT NULL DEFAULT '[]'::jsonb,
    research_interests      TEXT[] NOT NULL DEFAULT '{}',
    industry_readiness_score NUMERIC,
    industry_readiness_band TEXT CHECK (industry_readiness_band IN (
        'Not Assessed', 'Developing', 'Emerging', 'Industry Ready'
    )),
    created_at              TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at              TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_passport_per_student UNIQUE (student_id)
);

CREATE INDEX IF NOT EXISTS idx_ayush_passport_student ON public.ayush_skill_passports(student_id);
CREATE INDEX IF NOT EXISTS idx_ayush_passport_system  ON public.ayush_skill_passports(ayush_system);

ALTER TABLE public.ayush_skill_passports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can manage their own skill passport"
    ON public.ayush_skill_passports FOR ALL USING (auth.uid()::text = student_id);

-- ---------------------------------------------------------------------------
-- 2. Industry Skill Demand Table
--    One record per industry profile; JSONB arrays for skill lists
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.industry_skill_demands (
    id                          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    industry_id                 TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    company_name                TEXT NOT NULL,
    ayush_systems               TEXT[] NOT NULL DEFAULT '{}',
    required_skill_ids          TEXT[] NOT NULL DEFAULT '{}',
    preferred_skill_ids         TEXT[] NOT NULL DEFAULT '{}',
    job_roles                   TEXT[] NOT NULL DEFAULT '{}',
    internship_roles            TEXT[] NOT NULL DEFAULT '{}',
    research_requirements       TEXT[] NOT NULL DEFAULT '{}',
    emerging_skill_ids          TEXT[] NOT NULL DEFAULT '{}',
    experience_requirement_years INT NOT NULL DEFAULT 0,
    updated_at                  TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_demand_per_industry UNIQUE (industry_id)
);

CREATE INDEX IF NOT EXISTS idx_industry_skill_demand_industry ON public.industry_skill_demands(industry_id);

ALTER TABLE public.industry_skill_demands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Industry can manage own skill demand"
    ON public.industry_skill_demands FOR ALL
    USING (auth.uid()::text = industry_id);
CREATE POLICY "Authenticated users can read industry skill demands"
    ON public.industry_skill_demands FOR SELECT TO authenticated USING (TRUE);

-- ---------------------------------------------------------------------------
-- 3. AYUSH Internship Extensions Table
--    Extends existing postings (industry_hiring_posts) with AYUSH verification data
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ayush_internship_extensions (
    id                      TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    internship_posting_id   TEXT NOT NULL,   -- references industry_hiring_posts.id or legacy posting
    ayush_system            TEXT,
    required_skill_ids      TEXT[] NOT NULL DEFAULT '{}',
    eligibility_criteria    TEXT,
    duration_weeks          INT,
    city                    TEXT,
    state                   TEXT,
    verification_status     TEXT NOT NULL DEFAULT 'unverified'
        CHECK (verification_status IN ('unverified', 'institution_verified', 'ministry_verified')),
    completion_status       TEXT NOT NULL DEFAULT 'not_started'
        CHECK (completion_status IN ('not_started', 'ongoing', 'completed', 'withdrawn')),
    certificate_ref         TEXT,
    verification_doc_ref    TEXT,
    created_at              TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at              TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ayush_internship_posting ON public.ayush_internship_extensions(internship_posting_id);

ALTER TABLE public.ayush_internship_extensions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read internship extensions"
    ON public.ayush_internship_extensions FOR SELECT TO authenticated USING (TRUE);

-- ---------------------------------------------------------------------------
-- 4. R&D Problem Statements Table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.rd_problem_statements (
    id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    industry_id         TEXT REFERENCES public.users(id) ON DELETE SET NULL,
    company_name        TEXT NOT NULL,
    title               TEXT NOT NULL,
    description         TEXT NOT NULL,
    research_domain     TEXT NOT NULL,
    required_skill_ids  TEXT[] NOT NULL DEFAULT '{}',
    requirements        TEXT[] NOT NULL DEFAULT '{}',
    expected_outcome    TEXT,
    ayush_systems       TEXT[] NOT NULL DEFAULT '{}',
    status              TEXT NOT NULL DEFAULT 'open'
        CHECK (status IN ('open', 'in_progress', 'completed', 'archived')),
    created_at          TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at          TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rd_problem_industry  ON public.rd_problem_statements(industry_id);
CREATE INDEX IF NOT EXISTS idx_rd_problem_status    ON public.rd_problem_statements(status);

ALTER TABLE public.rd_problem_statements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read open R&D problems"
    ON public.rd_problem_statements FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Industry can manage own R&D problems"
    ON public.rd_problem_statements FOR ALL
    USING (auth.uid()::text = industry_id);

-- ---------------------------------------------------------------------------
-- 5. IP Assets Table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ip_assets (
    id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    type                TEXT NOT NULL CHECK (type IN (
        'patent', 'research_output', 'technology', 'licensing_opportunity'
    )),
    title               TEXT NOT NULL,
    description         TEXT NOT NULL,
    originator_id       TEXT REFERENCES public.users(id) ON DELETE SET NULL,
    originator_type     TEXT NOT NULL CHECK (originator_type IN ('institution', 'industry')),
    ayush_systems       TEXT[] NOT NULL DEFAULT '{}',
    status              TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'filed', 'published', 'granted', 'abandoned')),
    filing_date         DATE,
    publication_date    DATE,
    reference_number    TEXT,
    created_at          TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at          TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ip_assets_originator ON public.ip_assets(originator_id);
CREATE INDEX IF NOT EXISTS idx_ip_assets_status     ON public.ip_assets(status);

ALTER TABLE public.ip_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read published IP assets"
    ON public.ip_assets FOR SELECT TO authenticated
    USING (status IN ('published', 'granted'));
CREATE POLICY "Originators can manage their IP assets"
    ON public.ip_assets FOR ALL USING (auth.uid()::text = originator_id);

-- ---------------------------------------------------------------------------
-- 6. Academia-Industry Collaborations Table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academia_industry_collaborations (
    id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    type            TEXT NOT NULL CHECK (type IN (
        'joint_research', 'technology_transfer', 'licensing', 'sponsored_research'
    )),
    title           TEXT NOT NULL,
    description     TEXT,
    institution_id  TEXT REFERENCES public.users(id) ON DELETE SET NULL,
    industry_id     TEXT REFERENCES public.users(id) ON DELETE SET NULL,
    ip_asset_ids    TEXT[] NOT NULL DEFAULT '{}',
    rd_problem_ids  TEXT[] NOT NULL DEFAULT '{}',
    ayush_systems   TEXT[] NOT NULL DEFAULT '{}',
    status          TEXT NOT NULL DEFAULT 'proposed'
        CHECK (status IN ('proposed', 'active', 'completed', 'terminated')),
    start_date      DATE,
    end_date        DATE,
    created_at      TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at      TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_collab_institution ON public.academia_industry_collaborations(institution_id);
CREATE INDEX IF NOT EXISTS idx_collab_industry    ON public.academia_industry_collaborations(industry_id);

ALTER TABLE public.academia_industry_collaborations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read active collaborations"
    ON public.academia_industry_collaborations FOR SELECT TO authenticated
    USING (status IN ('active', 'completed'));

-- ---------------------------------------------------------------------------
-- 7. Ministry Intelligence Snapshots Table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ministry_intelligence_snapshots (
    id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    snapshot_at         TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    totals              JSONB NOT NULL DEFAULT '{}'::jsonb,
    by_ayush_system     JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at          TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.ministry_intelligence_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read intelligence snapshots"
    ON public.ministry_intelligence_snapshots FOR SELECT TO authenticated
    USING (TRUE);
