-- =============================================================================
-- Skill-Bridge — Assessment Infrastructure Migration (Prompt 2)
-- Run AFTER ayush_foundation_migration.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Assessment Questions Bank
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_questions (
    id                  TEXT PRIMARY KEY,
    question_text       TEXT NOT NULL,
    scenario_context    TEXT,                -- for PRACTICAL_SCENARIO type
    -- Options stored as JSONB array [{id,label,text}]
    options             JSONB NOT NULL,
    correct_option_id   TEXT NOT NULL,
    explanation         TEXT NOT NULL,
    exam_type           TEXT NOT NULL CHECK (exam_type IN (
        ''NEET_UG'', ''AIAPGET_PG'', ''PRACTICAL_SCENARIO'', ''INDUSTRY_SKILL''
    )),
    question_type       TEXT NOT NULL DEFAULT ''MCQ'' CHECK (question_type IN (''MCQ'', ''PRACTICAL_SCENARIO'')),
    subject             TEXT NOT NULL,
    topic               TEXT NOT NULL,
    ayush_skill_ids     TEXT[] NOT NULL DEFAULT ''{}'',
    skill_category      TEXT,
    difficulty          TEXT NOT NULL CHECK (difficulty IN (''Easy'', ''Medium'', ''Hard'')),
    cognitive_level     TEXT NOT NULL CHECK (cognitive_level IN (
        ''Knowledge'', ''Understanding'', ''Application'', ''Reasoning''
    )),
    ayush_system        TEXT,               -- NULL = applicable to all AYUSH systems
    concept_tag         TEXT NOT NULL,      -- slug for uniqueness & skill-gap engine connection
    source_ref          TEXT,
    reference_year      INTEGER,
    is_active           BOOLEAN NOT NULL DEFAULT FALSE,  -- must pass validation before activation
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_aq_exam_type     ON public.assessment_questions(exam_type);
CREATE INDEX IF NOT EXISTS idx_aq_ayush_system  ON public.assessment_questions(ayush_system);
CREATE INDEX IF NOT EXISTS idx_aq_subject       ON public.assessment_questions(subject);
CREATE INDEX IF NOT EXISTS idx_aq_difficulty    ON public.assessment_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_aq_active        ON public.assessment_questions(is_active);
CREATE INDEX IF NOT EXISTS idx_aq_concept_tag   ON public.assessment_questions(concept_tag);

ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;

-- Students can read active questions (no correct answers in this table on client — handled by API)
CREATE POLICY "Students can read active questions"
    ON public.assessment_questions FOR SELECT TO authenticated
    USING (is_active = TRUE);

-- ---------------------------------------------------------------------------
-- 2. Assessment Configurations
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_configs (
    id                      TEXT PRIMARY KEY,
    name                    TEXT NOT NULL,
    description             TEXT,
    exam_type               TEXT NOT NULL CHECK (exam_type IN (
        ''NEET_UG'', ''AIAPGET_PG'', ''PRACTICAL_SCENARIO'', ''INDUSTRY_SKILL''
    )),
    mode                    TEXT NOT NULL DEFAULT ''Practice'' CHECK (mode IN (''Practice'', ''Mock Test'')),
    ayush_system            TEXT,
    subject_filters         TEXT[] NOT NULL DEFAULT ''{}'',
    topic_filters           TEXT[] NOT NULL DEFAULT ''{}'',
    difficulty              TEXT CHECK (difficulty IN (''Easy'', ''Medium'', ''Hard'')),
    question_count          INTEGER NOT NULL DEFAULT 10,
    time_limit_minutes      INTEGER,
    passing_score_percent   NUMERIC,
    is_active               BOOLEAN NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ac_exam_type  ON public.assessment_configs(exam_type);
CREATE INDEX IF NOT EXISTS idx_ac_active     ON public.assessment_configs(is_active);

ALTER TABLE public.assessment_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read active configs"
    ON public.assessment_configs FOR SELECT TO authenticated
    USING (is_active = TRUE);

-- ---------------------------------------------------------------------------
-- 3. Assessment Attempts
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_attempts (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id          UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    config_id           TEXT NOT NULL REFERENCES public.assessment_configs(id) ON DELETE RESTRICT,
    exam_type           TEXT NOT NULL,
    ayush_system        TEXT,
    -- Ordered question IDs for this attempt
    question_ids        TEXT[] NOT NULL DEFAULT ''{}'',
    -- Per-question responses: JSONB map { questionId: {selectedOptionId, isCorrect, timeSpentMs, answeredAt} }
    responses           JSONB NOT NULL DEFAULT ''{}'',
    started_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at            TIMESTAMPTZ,
    status              TEXT NOT NULL DEFAULT ''in_progress'' CHECK (status IN (
        ''in_progress'', ''completed'', ''abandoned'', ''timed_out''
    )),
    -- Scoring (populated on completion)
    score               NUMERIC,
    max_score           NUMERIC,
    score_percent       NUMERIC,
    correct_count       INTEGER,
    incorrect_count     INTEGER,
    unattempted_count   INTEGER,
    total_questions     INTEGER NOT NULL,
    -- Skill performance breakdown (JSONB map { skillId: SkillPerformanceSummary })
    skill_performance   JSONB NOT NULL DEFAULT ''{}'',
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_aa_student_id    ON public.assessment_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_aa_config_id     ON public.assessment_attempts(config_id);
CREATE INDEX IF NOT EXISTS idx_aa_status        ON public.assessment_attempts(student_id, status);
CREATE INDEX IF NOT EXISTS idx_aa_exam_type     ON public.assessment_attempts(exam_type);

ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can access their own assessment attempts"
    ON public.assessment_attempts FOR ALL USING (auth.uid() = student_id);
