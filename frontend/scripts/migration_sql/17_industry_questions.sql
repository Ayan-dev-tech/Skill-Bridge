INSERT INTO public.industry_questions (id, industry_id, question_text, question_type, options, correct_option_id, difficulty, complexity, domain_id, concept_tag, marks, explanation, created_at, updated_at)
VALUES ('ind_q_1788809413167_64b514', 'e93a2f49-3cc2-4f48-be9f-63f53dedae96', 'What is the primary role of an API Gateway in cloud microservices?', 'mcq', '[{"id":"opt_gw_1","label":"A","text":"Direct hardware RAID controller redundancy"},{"id":"opt_gw_2","label":"B","text":"Request routing, rate limiting, and centralized authentication"},{"id":"opt_gw_3","label":"C","text":"Client-side GPU shader rendering acceleration"},{"id":"opt_gw_4","label":"D","text":"Local browser cookie session persistence"}]'::jsonb, 'opt_gw_2', 'beginner', 'application', 'cloud-engineering', 'api-gateway', 2, 'API Gateways sit between clients and microservices to manage traffic routing, throttling, and auth verification.', '2026-09-07T19:30:13.167Z'::timestamptz, '2026-09-07T19:30:13.167Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.industry_questions (id, industry_id, question_text, question_type, options, correct_option_id, difficulty, complexity, domain_id, concept_tag, marks, explanation, created_at, updated_at)
VALUES ('ind_q_1788809412817_20f8ee', 'e93a2f49-3cc2-4f48-be9f-63f53dedae96', 'Which cryptographic algorithm provides asymmetric public-key encryption?', 'mcq', '[{"id":"opt_rsa","label":"A","text":"RSA (Rivest-Shamir-Adleman)"},{"id":"opt_aes","label":"B","text":"AES-256 (Advanced Encryption Standard)"},{"id":"opt_des","label":"C","text":"Triple DES"},{"id":"opt_rc4","label":"D","text":"RC4 Stream Cipher"}]'::jsonb, 'opt_rsa', 'intermediate', 'application', 'cybersecurity', 'public-key-crypto', 3, 'RSA is an asymmetric cipher utilizing mathematically linked public and private key pairs.', '2026-09-07T19:30:12.816Z'::timestamptz, '2026-09-07T19:30:12.816Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.industry_questions (id, industry_id, question_text, question_type, options, correct_option_id, difficulty, complexity, domain_id, concept_tag, marks, explanation, created_at, updated_at)
VALUES ('ind_q_1788809322827_6d9483', 'e93a2f49-3cc2-4f48-be9f-63f53dedae96', 'What is the primary role of an API Gateway in cloud microservices?', 'mcq', '[{"id":"opt_gw_1","label":"A","text":"Direct hardware RAID controller redundancy"},{"id":"opt_gw_2","label":"B","text":"Request routing, rate limiting, and centralized authentication"},{"id":"opt_gw_3","label":"C","text":"Client-side GPU shader rendering acceleration"},{"id":"opt_gw_4","label":"D","text":"Local browser cookie session persistence"}]'::jsonb, 'opt_gw_2', 'beginner', 'application', 'cloud-engineering', 'api-gateway', 2, 'API Gateways sit between clients and microservices to manage traffic routing, throttling, and auth verification.', '2026-09-07T19:28:42.827Z'::timestamptz, '2026-09-07T19:28:42.827Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.industry_questions (id, industry_id, question_text, question_type, options, correct_option_id, difficulty, complexity, domain_id, concept_tag, marks, explanation, created_at, updated_at)
VALUES ('ind_q_1788809322401_3e58eb', 'e93a2f49-3cc2-4f48-be9f-63f53dedae96', 'Which cryptographic algorithm provides asymmetric public-key encryption?', 'mcq', '[{"id":"opt_rsa","label":"A","text":"RSA (Rivest-Shamir-Adleman)"},{"id":"opt_aes","label":"B","text":"AES-256 (Advanced Encryption Standard)"},{"id":"opt_des","label":"C","text":"Triple DES"},{"id":"opt_rc4","label":"D","text":"RC4 Stream Cipher"}]'::jsonb, 'opt_rsa', 'intermediate', 'application', 'cybersecurity', 'public-key-crypto', 3, 'RSA is an asymmetric cipher utilizing mathematically linked public and private key pairs.', '2026-09-07T19:28:42.399Z'::timestamptz, '2026-09-07T19:28:42.399Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id,
  updated_at = EXCLUDED.updated_at;