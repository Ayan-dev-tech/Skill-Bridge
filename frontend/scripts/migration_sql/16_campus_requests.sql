INSERT INTO public.campus_requests (id, campus_name, code, request_type, students_enrolled, status, is_frozen, freeze_reason, updated_at)
VALUES ('campus-req-1', 'Delhi Technological University (DTU)', 'C-18492', 'Placement Drive', 850, 'frozen', TRUE, 'Unverified accreditation documentation submitted', '2026-09-05T18:11:55.611Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  is_frozen = EXCLUDED.is_frozen,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.campus_requests (id, campus_name, code, request_type, students_enrolled, status, is_frozen, freeze_reason, updated_at)
VALUES ('campus-req-2', 'National Institute of Technology, Trichy', 'C-29381', 'Curriculum Verification', 640, 'active', FALSE, NULL, '2026-09-05T18:00:31.543Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  is_frozen = EXCLUDED.is_frozen,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.campus_requests (id, campus_name, code, request_type, students_enrolled, status, is_frozen, freeze_reason, updated_at)
VALUES ('campus-req-3', 'Birla Institute of Technology and Science', 'C-30114', 'Student Batch Upload', 490, 'active', FALSE, NULL, '2026-09-05T17:58:53.550Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  is_frozen = EXCLUDED.is_frozen,
  updated_at = EXCLUDED.updated_at;