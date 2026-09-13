-- =============================================================================
-- Skill-Bridge — AYUSH Competency Foundation & Multi-Role Seed
-- Idempotent seed for 5 AYUSH Career Roles and 17 Core Competencies
-- With explicit maturity levels: Foundation -> Applied -> Advanced
-- =============================================================================

-- 1. Idempotent Upsert for Primary Industry Partner (AIIA Clinical Research Directorate)
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
    ARRAY['ayurveda', 'unani', 'siddha', 'homoeopathy']::text[],
    ARRAY[
        'AYUSH Clinical Research',
        'AYUSH Clinical Practice (Medical Officer)',
        'AYUSH Clinical Research Assistant',
        'AYUSH Quality Control & Regulatory Associate',
        'AYUSH Wellness & Therapeutic Yoga Specialist'
    ]::text[],
    ARRAY[
        'Clinical Research Intern (GCP)',
        'Clinical Panchakarma Intern',
        'Pharmacovigilance Fellow',
        'Phytochemical Standardization Intern',
        'Therapeutic Yoga Intern'
    ]::text[],
    ARRAY[
        'Whole-system RCT protocols',
        'Safety & tolerability registries',
        'Ayush Grid EHR integration',
        'Schedule T GMP batch validations',
        'Autonomic HRV stabilization trials'
    ]::text[],
    ARRAY[
        'comp-ayush-gcp',
        'comp-ayush-trial-design',
        'comp-ayush-pvpi',
        'comp-ayush-herb-drug',
        'comp-ayush-standardization',
        'comp-ayush-samhita-epistemology',
        'comp-ayush-bedside-diagnostics',
        'comp-ayush-panchakarma-chikitsa',
        'comp-ayush-gmp-schedulet',
        'comp-ayush-yoga-chikitsa'
    ]::text[],
    ARRAY[
        'comp-ayush-bioethics',
        'comp-ayush-data-mgmt',
        'comp-ayush-biostats',
        'comp-ayush-chronic-case-mgmt',
        'comp-ayush-literature-evidence',
        'comp-ayush-regulatory-filing',
        'comp-ayush-stress-autonomic-regulation'
    ]::text[],
    ARRAY[
        'abdm-digital-health',
        'biomarker-validation',
        'ai-ayush-repertorization'
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

-- 2. Idempotent Upsert for Second Industry Partner (Dabur AYUSH Healthcare & Research Foundation)
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
    'demand-dabur-ayush-research',
    'e93a2f49-3cc2-4f48-be9f-63f53dedae96',
    'Dabur AYUSH Healthcare & Research Foundation',
    ARRAY['ayurveda', 'yoga-naturopathy']::text[],
    ARRAY[
        'AYUSH Quality Control & Regulatory Associate',
        'AYUSH Clinical Practice (Medical Officer)',
        'AYUSH Wellness & Therapeutic Yoga Specialist'
    ]::text[],
    ARRAY[
        'Quality Assurance Trainee',
        'Ayurvedic House Physician Intern',
        'Integrative Wellness Resident'
    ]::text[],
    ARRAY[
        'Standardized Polyherbal Formulations',
        'HPTLC Chromatographic Fingerprinting',
        'Post-market ADR Telemetry'
    ]::text[],
    ARRAY[
        'comp-ayush-standardization',
        'comp-ayush-gmp-schedulet',
        'comp-ayush-regulatory-filing',
        'comp-ayush-bedside-diagnostics',
        'comp-ayush-yoga-chikitsa'
    ]::text[],
    ARRAY[
        'comp-ayush-herb-drug',
        'comp-ayush-pvpi',
        'comp-ayush-data-mgmt',
        'comp-ayush-stress-autonomic-regulation'
    ]::text[],
    ARRAY[
        'abdm-digital-health',
        'botanical-metabolomics'
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

-- 3. Update existing ayush_skill_passports with 17 calibrated competencies and maturity progression
UPDATE public.ayush_skill_passports
SET competencies = jsonb_build_array(
    -- 1. GCP & Ethics (Advanced)
    jsonb_build_object(
        'id', 'comp-ayush-gcp',
        'name', 'AYUSH Good Clinical Practice (GCP) & Ethical Compliance',
        'title', 'AYUSH Good Clinical Practice (GCP) & Ethical Compliance',
        'category', 'Regulatory & Ethics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'maturityLevel', 'Advanced',
        'description', 'Applying ICMR-AYUSH ethical guidelines, CTRI trial registration, informed consent protocols, and GCP auditing in human clinical research.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Central Ethics Committee for AYUSH'
    ),
    -- 2. Trial Design (Advanced)
    jsonb_build_object(
        'id', 'comp-ayush-trial-design',
        'name', 'Holistic & Adaptive Clinical Trial Design',
        'title', 'Holistic & Adaptive Clinical Trial Design',
        'category', 'Research Methodology',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'maturityLevel', 'Advanced',
        'description', 'Protocol design adapting classical whole-system AYUSH interventions to pragmatic and randomized clinical trial (RCT) designs.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Clinical Research Directorate'
    ),
    -- 3. Pharmacovigilance (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-pvpi',
        'name', 'Pharmacovigilance & Adverse Drug Reaction (ADR) Surveillance',
        'title', 'Pharmacovigilance & Adverse Drug Reaction (ADR) Surveillance',
        'category', 'Pharmacovigilance',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Identifying, documenting, causality-assessing, and reporting adverse drug reactions under the National Pharmacovigilance Programme for ASU&H Drugs.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Pharmacovigilance Intermediary Centre'
    ),
    -- 4. Herb-Drug Interactions (Advanced)
    jsonb_build_object(
        'id', 'comp-ayush-herb-drug',
        'name', 'Herb-Drug Interaction & Safety Profiling',
        'title', 'Herb-Drug Interaction & Safety Profiling',
        'category', 'Pharmacology & Safety',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'maturityLevel', 'Advanced',
        'description', 'Evaluating cytochrome P450 interactions, metabolic clearance pathways, and contraindications between classical formulations and conventional drugs.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Drug Safety & Toxicology Board'
    ),
    -- 5. IEC Dossier (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-bioethics',
        'name', 'Institutional Ethics Committee (IEC) Dossier Preparation',
        'title', 'Institutional Ethics Committee (IEC) Dossier Preparation',
        'category', 'Regulatory & Ethics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Drafting patient information sheets, investigator brochures, vulnerability safeguards, and regulatory submissions for institutional review boards.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Institutional Ethics Committee'
    ),
    -- 6. CDM & EDC (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-data-mgmt',
        'name', 'Electronic Data Capture & Clinical Data Management (CDM)',
        'title', 'Electronic Data Capture & Clinical Data Management (CDM)',
        'category', 'Data Science & Informatics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Designing electronic Case Report Forms (eCRFs), conducting source data verification, and managing clinical databases aligned with Ayush Grid standards.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Ayush Grid Health Informatics Cell'
    ),
    -- 7. Formulation Standardization (Advanced)
    jsonb_build_object(
        'id', 'comp-ayush-standardization',
        'name', 'Investigational Formulation Standardization & Monograph Verification',
        'title', 'Investigational Formulation Standardization & Monograph Verification',
        'category', 'Pharmacopoeia & Standardization',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'maturityLevel', 'Advanced',
        'description', 'Verifying botanical authentication, phytochemical marker assay (HPTLC/HPLC), and heavy metal/microbial limits per Ayurvedic Pharmacopoeia of India (API) standards.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Pharmacopoeia Commission for Indian Medicine & Homoeopathy'
    ),
    -- 8. Biostatistics (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-biostats',
        'name', 'Biostatistical Analysis & Evidence Synthesis',
        'title', 'Biostatistical Analysis & Evidence Synthesis',
        'category', 'Biostatistics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Performing parametric/non-parametric medical statistics, sample size calculation, meta-analyses, and systematic Cochrane-style reviews for AYUSH evidence.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Epidemiology & Biostatistics Department'
    ),
    -- 9. Classical Epistemology (Advanced)
    jsonb_build_object(
        'id', 'comp-ayush-samhita-epistemology',
        'name', 'Classical Epistemological Correlation (Pramana Vijnana)',
        'title', 'Classical Epistemological Correlation (Pramana Vijnana)',
        'category', 'Classical Theory',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'maturityLevel', 'Advanced',
        'description', 'Correlating classical Aptopadesha, Pratyaksha, and Anumana epistemological evidence models with modern hierarchy of clinical evidence.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Academic Council of Samhita & Siddhanta'
    ),
    -- 10. Bedside Examination & Nadi Pariksha (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-bedside-diagnostics',
        'name', 'Bedside Clinical Examination & Nadi Pariksha',
        'title', 'Bedside Clinical Examination & Nadi Pariksha',
        'category', 'Clinical Diagnostics',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Systematic Rogi-Roga Pariksha, eight-fold clinical pulse palpation (Ashtavidha Pariksha), and doshic differential diagnosis.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Clinical Medicine Examination Board'
    ),
    -- 11. Panchakarma & Shamana (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-panchakarma-chikitsa',
        'name', 'Panchakarma & Shamana Therapeutic Management',
        'title', 'Panchakarma & Shamana Therapeutic Management',
        'category', 'Clinical Practice',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Administering classical Panchakarma procedures, Snehana-Swedana preparatory lines, and Samsarjana Krama dietary recovery.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Department of Panchakarma'
    ),
    -- 12. Chronic Case Management (Advanced)
    jsonb_build_object(
        'id', 'comp-ayush-chronic-case-mgmt',
        'name', 'Chronic Disease & Integrative Clinical Protocols',
        'title', 'Chronic Disease & Integrative Clinical Protocols',
        'category', 'Clinical Practice',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'maturityLevel', 'Advanced',
        'description', 'Managing complex lifestyle, autoimmune, and non-communicable disorders through integrative AYUSH care guidelines.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Tertiary Hospital Clinical Board'
    ),
    -- 13. Literature & DHARA (Foundation)
    jsonb_build_object(
        'id', 'comp-ayush-literature-evidence',
        'name', 'AYUSH Scientific Literature & DHARA Indexing',
        'title', 'AYUSH Scientific Literature & DHARA Indexing',
        'category', 'Research Methodology',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 2,
        'maturityLevel', 'Foundation',
        'description', 'Structured literature retrieval from DHARA, PubMed, and AYUSH Research Portal with critical appraisal of evidence quality.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Health Informatics & Library Resource Cell'
    ),
    -- 14. GMP Schedule T (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-gmp-schedulet',
        'name', 'Schedule T Good Manufacturing Practice (GMP) Compliance',
        'title', 'Schedule T Good Manufacturing Practice (GMP) Compliance',
        'category', 'Quality Control & Manufacturing',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Authoring and verifying Batch Manufacturing Records (BMR), in-process QA controls, and Schedule T plant hygiene compliance.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'ASU&H Manufacturing Quality Audit Committee'
    ),
    -- 15. Regulatory Filing (Advanced)
    jsonb_build_object(
        'id', 'comp-ayush-regulatory-filing',
        'name', 'AYUSH Drug Licensing, CoPP & Export Regulatory Dossiers',
        'title', 'AYUSH Drug Licensing, CoPP & Export Regulatory Dossiers',
        'category', 'Regulatory & Quality',
        'domain', 'Ayurveda & Integrative Healthcare',
        'targetLevel', 4,
        'maturityLevel', 'Advanced',
        'description', 'Preparing AYUSH Form 25/26D licensing dossiers, Certificate of Pharmaceutical Product (CoPP) documentation, and export submissions.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'State Licensing Authority & Export Promotion Council'
    ),
    -- 16. Yoga Chikitsa (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-yoga-chikitsa',
        'name', 'Therapeutic Yoga Chikitsa & Biomechanics',
        'title', 'Therapeutic Yoga Chikitsa & Biomechanics',
        'category', 'Wellness & Yoga Therapy',
        'domain', 'Yoga & Naturopathy',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Prescribing disease-specific therapeutic asana alignments, breath-sound modulation, and therapeutic pranayama protocols aligned with YCB guidelines.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Yoga Certification Board (YCB)'
    ),
    -- 17. Stress Stabilization (Applied)
    jsonb_build_object(
        'id', 'comp-ayush-stress-autonomic-regulation',
        'name', 'Stress Autonomic Stabilization & Shatkarma',
        'title', 'Stress Autonomic Stabilization & Shatkarma',
        'category', 'Wellness & Yoga Therapy',
        'domain', 'Yoga & Naturopathy',
        'targetLevel', 3,
        'maturityLevel', 'Applied',
        'description', 'Guiding clinical relaxation (Yoga Nidra), Heart Rate Variability (HRV) stabilization, and classical Shatkarma visceral cleansing.',
        'demonstratedAt', timezone('utc'::text, now())::text,
        'verifiedBy', 'Clinical Naturopathy & Yoga Therapy Directorate'
    )
),
updated_at = timezone('utc'::text, now());
