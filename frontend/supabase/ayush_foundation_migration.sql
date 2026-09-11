-- =============================================================================
-- Skill-Bridge — AYUSH Foundation Migration
-- Run AFTER the base schema.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Extend users table: add `ministry` to the allowed roles
-- ---------------------------------------------------------------------------
ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE public.users
  ADD CONSTRAINT users_role_check
  CHECK (role IN (''student'', ''faculty'', ''campus'', ''industry'', ''ministry''));

ALTER TABLE public.otp_verifications
  DROP CONSTRAINT IF EXISTS otp_verifications_role_check;

ALTER TABLE public.otp_verifications
  ADD CONSTRAINT otp_verifications_role_check
  CHECK (role IN (''student'', ''faculty'', ''campus'', ''industry'', ''ministry''));

-- ---------------------------------------------------------------------------
-- 2. AYUSH Skill Passport
--    Extends student profile — one record per student
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ayush_skill_passports (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id              UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    ayush_system            TEXT NOT NULL,
    course                  TEXT NOT NULL,
    academic_level          TEXT NOT NULL CHECK (academic_level IN (''UG'', ''PG'', ''PhD'', ''Diploma'')),
    institution             TEXT NOT NULL,
    batch_year              TEXT,
    -- skills, competencies, etc. stored as JSONB for extensibility
    skills                  JSONB NOT NULL DEFAULT ''{}'',
    competencies            JSONB NOT NULL DEFAULT ''[]'',
    assessment_results      JSONB NOT NULL DEFAULT ''[]'',
    skill_gaps              JSONB NOT NULL DEFAULT ''[]'',
    certifications          JSONB NOT NULL DEFAULT ''[]'',
    internship_ids          TEXT[] NOT NULL DEFAULT ''{}'',
    verified_experiences    JSONB NOT NULL DEFAULT ''[]'',
    research_interests      TEXT[] NOT NULL DEFAULT ''{}'',
    industry_readiness_score NUMERIC,
    industry_readiness_band TEXT CHECK (industry_readiness_band IN (
        ''Not Assessed'', ''Developing'', ''Emerging'', ''Industry Ready''
    )),
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_passport_per_student UNIQUE (student_id)
);

CREATE INDEX IF NOT EXISTS idx_ayush_passport_student ON public.ayush_skill_passports(student_id);
CREATE INDEX IF NOT EXISTS idx_ayush_passport_system  ON public.ayush_skill_passports(ayush_system);

ALTER TABLE public.ayush_skill_passports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can manage their own skill passport"
    ON public.ayush_skill_passports FOR ALL USING (auth.uid() = student_id);

-- ---------------------------------------------------------------------------
-- 3. Industry Skill Demand
--    One record per industry profile; JSONB arrays for skill lists
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.industry_skill_demands (
    id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    industry_id                 UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    company_name                TEXT NOT NULL,
    ayush_systems               TEXT[] NOT NULL DEFAULT ''{}'',
    required_skill_ids          TEXT[] NOT NULL DEFAULT ''{}'',
    preferred_skill_ids         TEXT[] NOT NULL DEFAULT ''{}'',
    job_roles                   TEXT[] NOT NULL DEFAULT ''{}'',
    internship_roles            TEXT[] NOT NULL DEFAULT ''{}'',
    research_requirements       TEXT[] NOT NULL DEFAULT ''{}'',
    emerging_skill_ids          TEXT[] NOT NULL DEFAULT ''{}'',
    experience_requirement_years INTEGER NOT NULL DEFAULT 0,
    updated_at                  TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_demand_per_industry UNIQUE (industry_id)
);

CREATE INDEX IF NOT EXISTS idx_industry_skill_demand_industry ON public.industry_skill_demands(industry_id);

ALTER TABLE public.industry_skill_demands ENABLE ROW LEVEL SECURITY;
-- Industry users manage their own demand record
CREATE POLICY "Industry can manage own skill demand"
    ON public.industry_skill_demands FOR ALL
    USING (auth.uid() = industry_id);
-- Authenticated users can read demand records (for matching)
CREATE POLICY "Authenticated users can read industry skill demands"
    ON public.industry_skill_demands FOR SELECT TO authenticated USING (TRUE);

-- ---------------------------------------------------------------------------
-- 4. AYUSH Internship Extensions
--    Extends existing postings (industry_hiring_posts or local InternshipPosting)
--    with AYUSH-specific verification and domain data
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ayush_internship_extensions (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    internship_posting_id   TEXT NOT NULL,   -- references InternshipPosting.id or hiring_posts.id
    ayush_system            TEXT,
    required_skill_ids      TEXT[] NOT NULL DEFAULT ''{}'',
    eligibility_criteria    TEXT,
    duration_weeks          INTEGER,
    city                    TEXT,
    state                   TEXT,
    verification_status     TEXT NOT NULL DEFAULT ''unverified''
        CHECK (verification_status IN (''unverified'', ''institution_verified'', ''ministry_verified'')),
    completion_status       TEXT NOT NULL DEFAULT ''not_started''
        CHECK (completion_status IN (''not_started'', ''ongoing'', ''completed'', ''withdrawn'')),
    certificate_ref         TEXT,
    verification_doc_ref    TEXT,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ayush_internship_posting ON public.ayush_internship_extensions(internship_posting_id);

ALTER TABLE public.ayush_internship_extensions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read internship extensions"
    ON public.ayush_internship_extensions FOR SELECT TO authenticated USING (TRUE);

-- ---------------------------------------------------------------------------
-- 5. R&D Problem Statements
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.rd_problem_statements (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    industry_id         UUID REFERENCES public.users(id) ON DELETE SET NULL,
    company_name        TEXT NOT NULL,
    title               TEXT NOT NULL,
    description         TEXT NOT NULL,
    research_domain     TEXT NOT NULL,
    required_skill_ids  TEXT[] NOT NULL DEFAULT ''{}'',
    requirements        TEXT[] NOT NULL DEFAULT ''{}'',
    expected_outcome    TEXT,
    ayush_systems       TEXT[] NOT NULL DEFAULT ''{}'',
    status              TEXT NOT NULL DEFAULT ''open''
        CHECK (status IN (''open'', ''in_progress'', ''completed'', ''archived'')),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rd_problem_industry  ON public.rd_problem_statements(industry_id);
CREATE INDEX IF NOT EXISTS idx_rd_problem_status    ON public.rd_problem_statements(status);

ALTER TABLE public.rd_problem_statements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read open R&D problems"
    ON public.rd_problem_statements FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Industry can manage own R&D problems"
    ON public.rd_problem_statements FOR ALL
    USING (auth.uid() = industry_id);

-- ---------------------------------------------------------------------------
-- 6. IP Assets
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ip_assets (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type                TEXT NOT NULL CHECK (type IN (
        ''patent'', ''research_output'', ''technology'', ''licensing_opportunity''
    )),
    title               TEXT NOT NULL,
    description         TEXT NOT NULL,
    originator_id       UUID REFERENCES public.users(id) ON DELETE SET NULL,
    originator_type     TEXT NOT NULL CHECK (originator_type IN (''institution'', ''industry'')),
    ayush_systems       TEXT[] NOT NULL DEFAULT ''{}'',
    status              TEXT NOT NULL DEFAULT ''draft''
        CHECK (status IN (''draft'', ''filed'', ''published'', ''granted'', ''abandoned'')),
    filing_date         DATE,
    publication_date    DATE,
    reference_number    TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ip_assets_originator ON public.ip_assets(originator_id);
CREATE INDEX IF NOT EXISTS idx_ip_assets_status     ON public.ip_assets(status);

ALTER TABLE public.ip_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read published IP assets"
    ON public.ip_assets FOR SELECT TO authenticated
    USING (status IN (''published'', ''granted''));
CREATE POLICY "Originators can manage their IP assets"
    ON public.ip_assets FOR ALL USING (auth.uid() = originator_id);

-- ---------------------------------------------------------------------------
-- 7. Academia-Industry Collaborations
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academia_industry_collaborations (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type            TEXT NOT NULL CHECK (type IN (
        ''joint_research'', ''technology_transfer'', ''licensing'', ''sponsored_research''
    )),
    title           TEXT NOT NULL,
    description     TEXT,
    institution_id  UUID REFERENCES public.users(id) ON DELETE SET NULL,
    industry_id     UUID REFERENCES public.users(id) ON DELETE SET NULL,
    ip_asset_ids    TEXT[] NOT NULL DEFAULT ''{}'',
    rd_problem_ids  TEXT[] NOT NULL DEFAULT ''{}'',
    ayush_systems   TEXT[] NOT NULL DEFAULT ''{}'',
    status          TEXT NOT NULL DEFAULT ''proposed''
        CHECK (status IN (''proposed'', ''active'', ''completed'', ''terminated'')),
    start_date      DATE,
    end_date        DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_collab_institution ON public.academia_industry_collaborations(institution_id);
CREATE INDEX IF NOT EXISTS idx_collab_industry    ON public.academia_industry_collaborations(industry_id);

ALTER TABLE public.academia_industry_collaborations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read active collaborations"
    ON public.academia_industry_collaborations FOR SELECT TO authenticated
    USING (status IN (''active'', ''completed''));

-- ---------------------------------------------------------------------------
-- 8. Ministry Intelligence Snapshots (read-only aggregation cache)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ministry_intelligence_snapshots (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snapshot_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- aggregated JSON blob computed server-side
    totals              JSONB NOT NULL DEFAULT ''{}'',
    by_ayush_system     JSONB NOT NULL DEFAULT ''{}'',
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ministry_intelligence_snapshots ENABLE ROW LEVEL SECURITY;
-- Only ministry role users can read intelligence snapshots
-- (Service-role backend writes snapshots; no RLS UPDATE/INSERT needed for clients)
CREATE POLICY "Ministry users can read intelligence snapshots"
    ON public.ministry_intelligence_snapshots FOR SELECT TO authenticated
    USING (TRUE);  -- enforce role check in application layer / backend
