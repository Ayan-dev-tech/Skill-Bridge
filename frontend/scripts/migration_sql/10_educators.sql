INSERT INTO public.educators (id, name, slug, description, website, logo_url, active, status_label, verified_status, created_at, updated_at)
VALUES ('edu-openssf', 'Open Source Security Foundation (OpenSSF)', 'openssf', 'Cross-industry foundation dedicated to securing open source software, software supply chains, and developer security education.', 'https://openssf.org', NULL, TRUE, 'External Learning Opportunity', 'external_opportunity', '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  active = EXCLUDED.active;
INSERT INTO public.educators (id, name, slug, description, website, logo_url, active, status_label, verified_status, created_at, updated_at)
VALUES ('edu-owasp', 'OWASP Foundation Educational Resources', 'owasp', 'Global nonprofit organization focused on improving the security of software applications, API security standards, and threat modeling.', 'https://owasp.org', NULL, TRUE, 'External Learning Opportunity', 'external_opportunity', '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  active = EXCLUDED.active;
INSERT INTO public.educators (id, name, slug, description, website, logo_url, active, status_label, verified_status, created_at, updated_at)
VALUES ('edu-cncf', 'Cloud Native Computing Foundation (CNCF)', 'cncf', 'Hub for open source cloud-native technology education, Kubernetes ecosystem architectures, and microservices observability.', 'https://www.cncf.io/training', NULL, TRUE, 'External Learning Opportunity', 'external_opportunity', '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  active = EXCLUDED.active;
INSERT INTO public.educators (id, name, slug, description, website, logo_url, active, status_label, verified_status, created_at, updated_at)
VALUES ('edu-linux-foundation', 'Linux Foundation Training & Education', 'linux-foundation', 'World-class vendor-neutral open technology curricula covering systems development, cloud infrastructure, and DevOps practices.', 'https://training.linuxfoundation.org', NULL, TRUE, 'External Learning Opportunity', 'external_opportunity', '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  active = EXCLUDED.active;
INSERT INTO public.educators (id, name, slug, description, website, logo_url, active, status_label, verified_status, created_at, updated_at)
VALUES ('edu-deeplearning', 'Open Machine Learning & Deep Learning Initiative', 'deeplearning-open', 'Curated open educational pathway for foundational machine learning, large language models, and practical AI system evaluation.', 'https://www.deeplearning.ai', NULL, TRUE, 'External Learning Opportunity', 'external_opportunity', '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  active = EXCLUDED.active;
INSERT INTO public.educators (id, name, slug, description, website, logo_url, active, status_label, verified_status, created_at, updated_at)
VALUES ('edu-skillbridge-labs', 'Skill Bridge Open Labs (Sample Provider)', 'skillbridge-labs', 'Internal development lab providing practical interactive coding exercises and mock challenge scenarios for student evaluation.', 'https://github.com/skillbridge', NULL, TRUE, 'Sample Learning Provider', 'sample_provider', '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  active = EXCLUDED.active;