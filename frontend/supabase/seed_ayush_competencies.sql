-- =============================================================================
-- Skill-Bridge — AYUSH Competency Foundation Seed (AYUSH Clinical Research)
-- Idempotent seed for the "AYUSH Clinical Research" role and 9 core competencies
-- =============================================================================

-- 1. Idempotent Upsert into industry_skill_demands for the AYUSH Clinical Research target role
INSERT INTO public.industry_skill_demands (
    id,
    industry_id,
    company_name,
    ayush_systems,
    job_roles,
    internship_roles,
    research_requirements,
    required_skill_ids,
    preferred_skill_ids,
    emerging_skill_ids,
    experience_requirement_years,
    updated_at
)
VALUES (
    'demand-ayush-clinical-research',
    '1f80e367-38a7-43d0-9573-fb3d9215d64a',
    'All India Institute of Ayurveda (AIIA) - Clinical Research Directorate',
    ARRAY['ayurveda']::text[],
    ARRAY['AYUSH Clinical Research', 'Clinical Research Associate (AYUSH)', 'Principal Investigator - AYUSH Trials']::text[],
    ARRAY['Clinical Research Intern (GCP)', 'Pharmacovigilance Fellow']::text[],
    ARRAY['Whole-system RCT protocols', 'Safety & tolerability registries', 'Ayush Grid EHR integration']::text[],
    ARRAY[
        'comp-ayush-gcp',
        'comp-ayush-trial-design',
        'comp-ayush-pvpi',
        'comp-ayush-herb-drug',
        'comp-ayush-standardization',
        'comp-ayush-samhita-epistemology'
    ]::text[],
    ARRAY[
        'comp-ayush-bioethics',
        'comp-ayush-data-mgmt',
        'comp-ayush-biostats'
    ]::text[],
    ARRAY[
        'abdm-digital-health',
        'biomarker-validation'
    ]::text[],
    1,
    timezone('utc'::text, now())
)
ON CONFLICT (industry_id) DO UPDATE SET
    company_name = EXCLUDED.company_name,
    ayush_systems = EXCLUDED.ayush_systems,
    job_roles = EXCLUDED.job_roles,
    internship_roles = EXCLUDED.internship_roles,
    research_requirements = EXCLUDED.research_requirements,
    required_skill_ids = EXCLUDED.required_skill_ids,
    preferred_skill_ids = EXCLUDED.preferred_skill_ids,
    emerging_skill_ids = EXCLUDED.emerging_skill_ids,
    experience_requirement_years = EXCLUDED.experience_requirement_years,
    updated_at = timezone('utc'::text, now());

-- 2. Update existing ayush_skill_passports with standard AYUSH Clinical Research competencies
UPDATE public.ayush_skill_passports
SET competencies = jsonb_build_array(
    jsonb_build_object(
        'id', 'comp-ayush-gcp',
        'name', 'AYUSH Good Clinical Practice (GCP) & Ethical Compliance',
        'title', 'AYUSH Good Clinical Practice (GCP) & Ethical Compliance',
        'category', 'Regulatory & Ethics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'description', 'Applying ICMR-AYUSH ethical guidelines, CTRI trial registration, informed consent protocols, and GCP auditing in human clinical research.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Central Ethics Committee for AYUSH'
    ),
    jsonb_build_object(
        'id', 'comp-ayush-trial-design',
        'name', 'Holistic & Adaptive Clinical Trial Design',
        'title', 'Holistic & Adaptive Clinical Trial Design',
        'category', 'Research Methodology',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'description', 'Protocol design adapting classical whole-system AYUSH interventions to pragmatic and randomized clinical trial (RCT) designs.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Clinical Research Directorate'
    ),
    jsonb_build_object(
        'id', 'comp-ayush-pvpi',
        'name', 'Pharmacovigilance & Adverse Drug Reaction (ADR) Surveillance',
        'title', 'Pharmacovigilance & Adverse Drug Reaction (ADR) Surveillance',
        'category', 'Pharmacovigilance',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'description', 'Identifying, documenting, causality-assessing, and reporting adverse drug reactions under the National Pharmacovigilance Programme for ASU&H Drugs.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Pharmacovigilance Intermediary Centre'
    ),
    jsonb_build_object(
        'id', 'comp-ayush-herb-drug',
        'name', 'Herb-Drug Interaction & Safety Profiling',
        'title', 'Herb-Drug Interaction & Safety Profiling',
        'category', 'Pharmacology & Safety',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'description', 'Evaluating cytochrome P450 interactions, metabolic clearance pathways, and contraindications between classical formulations and conventional drugs.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Drug Safety & Toxicology Board'
    ),
    jsonb_build_object(
        'id', 'comp-ayush-bioethics',
        'name', 'Institutional Ethics Committee (IEC) Dossier Preparation',
        'title', 'Institutional Ethics Committee (IEC) Dossier Preparation',
        'category', 'Regulatory & Ethics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'description', 'Drafting patient information sheets, investigator brochures, vulnerability safeguards, and regulatory submissions for institutional review boards.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Institutional Ethics Committee'
    ),
    jsonb_build_object(
        'id', 'comp-ayush-data-mgmt',
        'name', 'Electronic Data Capture & Clinical Data Management (CDM)',
        'title', 'Electronic Data Capture & Clinical Data Management (CDM)',
        'category', 'Data Science & Informatics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'description', 'Designing electronic Case Report Forms (eCRFs), conducting source data verification, and managing clinical databases aligned with Ayush Grid standards.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Ayush Grid Health Informatics Cell'
    ),
    jsonb_build_object(
        'id', 'comp-ayush-standardization',
        'name', 'Investigational Formulation Standardization & Monograph Verification',
        'title', 'Investigational Formulation Standardization & Monograph Verification',
        'category', 'Pharmacopoeia & Standardization',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'description', 'Verifying botanical authentication, phytochemical marker assay (HPTLC/HPLC), and heavy metal/microbial limits per Ayurvedic Pharmacopoeia of India (API) standards.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Pharmacopoeia Commission for Indian Medicine & Homoeopathy'
    ),
    jsonb_build_object(
        'id', 'comp-ayush-biostats',
        'name', 'Biostatistical Analysis & Evidence Synthesis',
        'title', 'Biostatistical Analysis & Evidence Synthesis',
        'category', 'Biostatistics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'description', 'Performing parametric/non-parametric medical statistics, sample size calculation, meta-analyses, and systematic Cochrane-style reviews for AYUSH evidence.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Epidemiology & Biostatistics Department'
    ),
    jsonb_build_object(
        'id', 'comp-ayush-samhita-epistemology',
        'name', 'Classical Epistemological Correlation (Pramana Vijnana)',
        'title', 'Classical Epistemological Correlation (Pramana Vijnana)',
        'category', 'Classical Theory',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'description', 'Correlating classical Aptopadesha, Pratyaksha, and Anumana epistemological evidence models with modern hierarchy of clinical evidence.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Academic Council of Samhita & Siddhanta'
    )
),
updated_at = timezone('utc'::text, now());
