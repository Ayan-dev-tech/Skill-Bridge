INSERT INTO public.assessment_configs (id, name, description, exam_type, mode, ayush_system, subject_filters, topic_filters, difficulty, question_count, time_limit_minutes, passing_score_percent, is_active, created_at, updated_at)
VALUES ('cfg_aiapget_ayurveda_practice', 'AIAPGET Ayurveda PG Practice Assessment', 'Official past question bank practice test covering Samhita, Rachana/Kriya, Dravyaguna, Panchakarma, Shalya and Shalakya.', 'AIAPGET_PG', 'Practice', 'ayurveda', ARRAY[]::text[], ARRAY[]::text[], NULL, 15, 30, 50, TRUE, '2026-09-12T17:03:04.471Z'::timestamptz, '2026-09-12T17:03:04.471Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  question_count = EXCLUDED.question_count;
INSERT INTO public.assessment_configs (id, name, description, exam_type, mode, ayush_system, subject_filters, topic_filters, difficulty, question_count, time_limit_minutes, passing_score_percent, is_active, created_at, updated_at)
VALUES ('cfg_neet_ug_premedical_practice', 'NEET UG Pre-Medical AYUSH Foundation Practice', 'Standard NEET UG foundation questions across Physics, Chemistry, Botany, and Zoology for AYUSH aspirants.', 'NEET_UG', 'Practice', 'ayurveda', ARRAY[]::text[], ARRAY[]::text[], NULL, 15, 30, 50, TRUE, '2026-09-12T17:03:04.471Z'::timestamptz, '2026-09-12T17:03:04.471Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  question_count = EXCLUDED.question_count;
INSERT INTO public.assessment_configs (id, name, description, exam_type, mode, ayush_system, subject_filters, topic_filters, difficulty, question_count, time_limit_minutes, passing_score_percent, is_active, created_at, updated_at)
VALUES ('cfg_practical_scenarios_clinical', 'Clinical Scenarios & Practical Prioritization', 'Evidence-based scenarios evaluating clinical recognition, emergency escalation, herb-drug safety, ABDM integration, and pharmacopoeial quality.', 'PRACTICAL_SCENARIO', 'Practice', 'ayurveda', ARRAY[]::text[], ARRAY[]::text[], NULL, 6, 15, 60, TRUE, '2026-09-12T17:48:48.144Z'::timestamptz, '2026-09-12T17:48:48.144Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  question_count = EXCLUDED.question_count;