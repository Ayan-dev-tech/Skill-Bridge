-- =============================================================================
-- Skill-Bridge — Step 12 Patch: Industry Role Skill Demands
-- Child table under industry_skill_demands for employer-calibrated role requirements
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.industry_role_skill_demands (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    industry_demand_id TEXT NOT NULL REFERENCES public.industry_skill_demands(id) ON DELETE CASCADE,
    role_id TEXT NOT NULL,
    competency_id TEXT NOT NULL,
    required_rating NUMERIC(3, 1) NOT NULL,
    weight NUMERIC(4, 3) NOT NULL,
    is_critical BOOLEAN NOT NULL DEFAULT FALSE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_role_skill_demands_industry_role ON public.industry_role_skill_demands(industry_demand_id, role_id);
CREATE INDEX IF NOT EXISTS idx_role_skill_demands_role_id ON public.industry_role_skill_demands(role_id);
CREATE INDEX IF NOT EXISTS idx_role_skill_demands_comp_id ON public.industry_role_skill_demands(competency_id);

-- Enable RLS
ALTER TABLE public.industry_role_skill_demands ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'industry_role_skill_demands' AND policyname = 'Public select for industry_role_skill_demands'
    ) THEN
        CREATE POLICY "Public select for industry_role_skill_demands"
            ON public.industry_role_skill_demands FOR SELECT
            TO public
            USING (TRUE);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'industry_role_skill_demands' AND policyname = 'Public all for industry_role_skill_demands'
    ) THEN
        CREATE POLICY "Public all for industry_role_skill_demands"
            ON public.industry_role_skill_demands FOR ALL
            TO public
            USING (TRUE);
    END IF;
END $$;
