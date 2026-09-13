INSERT INTO public.hiring_requests (id, company_name, industry_domain, job_title, positions, applicants, status, is_frozen, freeze_reason, updated_at)
VALUES ('hire-req-1', 'Infosys Technologies', 'Software & Cloud Services', 'Systems Engineer (Fresher 2025/2026)', 120, 128, 'frozen', TRUE, 'Suspicious fraudulent job openings detected by compliance', '2026-09-05T18:11:55.510Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  is_frozen = EXCLUDED.is_frozen,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.hiring_requests (id, company_name, industry_domain, job_title, positions, applicants, status, is_frozen, freeze_reason, updated_at)
VALUES ('hire-req-2', 'Apex Dynamics Corp', 'AI Research & Data Systems', 'Junior ML Pipeline Specialist', 8, 34, 'active', FALSE, NULL, '2026-09-05T17:59:39.896Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  is_frozen = EXCLUDED.is_frozen,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.hiring_requests (id, company_name, industry_domain, job_title, positions, applicants, status, is_frozen, freeze_reason, updated_at)
VALUES ('hire-req-3', 'Zenith Financial Solutions', 'FinTech & Payments', 'Backend Developer - Go / Python', 12, 62, 'active', FALSE, NULL, '2026-09-05T17:59:32.424Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  is_frozen = EXCLUDED.is_frozen,
  updated_at = EXCLUDED.updated_at;