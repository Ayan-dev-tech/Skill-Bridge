-- =============================================================================
-- Skill-Bridge — Step 13: AYUSH Discovered Opportunities Table
-- Stores normalized opportunities discovered from Tavily / authoritative AYUSH sources
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.ayush_discovered_opportunities (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    opportunity_type TEXT NOT NULL, -- Job, Internship, Fellowship, Research Project, Program
    description TEXT NOT NULL DEFAULT '',
    ayush_system TEXT NOT NULL DEFAULT 'ayurveda',
    role_id TEXT,
    competency_ids TEXT[] NOT NULL DEFAULT '{}',
    location TEXT NOT NULL DEFAULT 'India',
    application_url TEXT NOT NULL,
    source_url TEXT NOT NULL UNIQUE,
    source_domain TEXT NOT NULL,
    posted_date TIMESTAMPTZ,
    deadline TIMESTAMPTZ,
    source_status TEXT NOT NULL DEFAULT 'WEB_DISCOVERED', -- OFFICIAL, VERIFIED_SOURCE, WEB_DISCOVERED, UNVERIFIED
    discovered_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_discovered_opp_role_id ON public.ayush_discovered_opportunities(role_id);
CREATE INDEX IF NOT EXISTS idx_discovered_opp_source_domain ON public.ayush_discovered_opportunities(source_domain);
CREATE INDEX IF NOT EXISTS idx_discovered_opp_active ON public.ayush_discovered_opportunities(active);

ALTER TABLE public.ayush_discovered_opportunities ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ayush_discovered_opportunities' AND policyname = 'Public select for ayush_discovered_opportunities'
    ) THEN
        CREATE POLICY "Public select for ayush_discovered_opportunities"
            ON public.ayush_discovered_opportunities FOR SELECT
            TO public
            USING (TRUE);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ayush_discovered_opportunities' AND policyname = 'Public all for ayush_discovered_opportunities'
    ) THEN
        CREATE POLICY "Public all for ayush_discovered_opportunities"
            ON public.ayush_discovered_opportunities FOR ALL
            TO public
            USING (TRUE);
    END IF;
END $$;
