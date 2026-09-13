INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788809453023-sy93g', 'job-sec-01', 'stu_34_adv_1788809444883', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T19:30:53.023Z'::timestamptz, '2026-09-07T19:30:53.045Z'::timestamptz, '2026-09-07T19:30:53.023Z'::timestamptz, '[{"id":"ev-1788809453023","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T19:30:53.023Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788809444883@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788808159369-ydpl8', 'job-sec-01', 'stu_34_adv_1788808155355', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T19:09:19.369Z'::timestamptz, '2026-09-07T19:09:19.398Z'::timestamptz, '2026-09-07T19:09:19.369Z'::timestamptz, '[{"id":"ev-1788808159369","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T19:09:19.369Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788808155355@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788806598752-4zwsb', 'job-sec-01', 'stu_34_adv_1788806594421', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T18:43:18.752Z'::timestamptz, '2026-09-07T18:43:18.782Z'::timestamptz, '2026-09-07T18:43:18.752Z'::timestamptz, '[{"id":"ev-1788806598752","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T18:43:18.752Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788806594421@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788806290117-8omw9', 'job-sec-01', 'stu_34_adv_1788806285059', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T18:38:10.117Z'::timestamptz, '2026-09-07T18:38:10.144Z'::timestamptz, '2026-09-07T18:38:10.117Z'::timestamptz, '[{"id":"ev-1788806290117","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T18:38:10.117Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788806285059@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788785735223-h9qn8', 'job-sec-01', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Bengaluru, India (Hybrid)', 'Full-time', 'Full-time', '₹8,50,000 - ₹12,00,000 / year', 'applied', 'pending', 'none', 'applied', '2026-09-07T12:55:35.213Z'::timestamptz, '2026-09-07T12:55:35.363Z'::timestamptz, '2026-09-07T12:55:35.213Z'::timestamptz, '[{"id":"ev-1788785735223","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:55:35.213Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Ayan Parmar', 'ayanparmar54@gmail.com', NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784872773-tsxg4', 'job-sec-01', 'stu_34_adv_1788784864571', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:41:12.773Z'::timestamptz, '2026-09-07T12:41:12.800Z'::timestamptz, '2026-09-07T12:41:12.773Z'::timestamptz, '[{"id":"ev-1788784872773","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:41:12.773Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784864571@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784631515-jp809', 'job-sec-01', 'stu_34_adv_1788784626397', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:37:11.515Z'::timestamptz, '2026-09-07T12:37:11.533Z'::timestamptz, '2026-09-07T12:37:11.515Z'::timestamptz, '[{"id":"ev-1788784631515","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:37:11.515Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784626397@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784585404-pcnly', 'job-sec-01', 'stu_34_adv_1788784583072', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:36:25.404Z'::timestamptz, '2026-09-07T12:36:25.422Z'::timestamptz, '2026-09-07T12:36:25.404Z'::timestamptz, '[{"id":"ev-1788784585404","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:36:25.404Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784583072@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784559742-uz8vw', 'job-sec-01', 'stu_34_adv_1788784556639', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:35:59.742Z'::timestamptz, '2026-09-07T12:35:59.761Z'::timestamptz, '2026-09-07T12:35:59.742Z'::timestamptz, '[{"id":"ev-1788784559742","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:35:59.742Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784556639@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784518593-2yfaj', 'job-sec-01', 'stu_34_adv_1788784515470', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:35:18.593Z'::timestamptz, '2026-09-07T12:35:18.620Z'::timestamptz, '2026-09-07T12:35:18.593Z'::timestamptz, '[{"id":"ev-1788784518593","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:35:18.593Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784515470@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784489572-cbeit', 'job-sec-01', 'stu_34_adv_1788784485808', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:34:49.572Z'::timestamptz, '2026-09-07T12:34:49.595Z'::timestamptz, '2026-09-07T12:34:49.572Z'::timestamptz, '[{"id":"ev-1788784489572","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:34:49.572Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784485808@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784464045-lnwei', 'job_rare_docs_test', 'stu_34_adv_1788784460729', 'Partner Company', 'Engineering Role', 'Engineering Role', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:34:24.045Z'::timestamptz, '2026-09-07T12:34:24.062Z'::timestamptz, '2026-09-07T12:34:24.045Z'::timestamptz, '[{"id":"ev-1788784464045","status":"applied","title":"Application Submitted","description":"Application officially received for Engineering Role at Partner Company.","timestamp":"2026-09-07T12:34:24.045Z"}]'::jsonb, ARRAY['student_id']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784460729@test.edu', NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784463275-qheqx', 'job-sec-01', 'stu_34_adv_1788784460729', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:34:23.275Z'::timestamptz, '2026-09-07T12:34:23.303Z'::timestamptz, '2026-09-07T12:34:23.275Z'::timestamptz, '[{"id":"ev-1788784463275","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:34:23.275Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784460729@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788784441634-iuor1', 'job-sec-01', 'stu_34_adv_1788784438121', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Hybrid / Remote', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:34:01.634Z'::timestamptz, '2026-09-07T12:34:01.654Z'::timestamptz, '2026-09-07T12:34:01.634Z'::timestamptz, '[{"id":"ev-1788784441634","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:34:01.634Z"}]'::jsonb, ARRAY['student_id', 'post_graduation_marksheet']::text[], '[]'::jsonb, '{}'::jsonb, NULL, 'Advanced Student 34', 'stu_34_adv_1788784438121@test.edu', '+1-555-010-0002', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788782980072-8hska', 'job-dev-02', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'NexusScale Technologies', 'Junior Full-Stack Cloud Engineer', 'Junior Full-Stack Cloud Engineer', 'Hyderabad, India (Hybrid)', 'Full-time', 'Full-time', '₹7,00,000 - ₹10,50,000 / year', 'applied', 'pending', 'none', 'applied', '2026-09-07T12:09:40.072Z'::timestamptz, '2026-09-07T12:09:40.107Z'::timestamptz, '2026-09-07T12:09:40.072Z'::timestamptz, '[{"id":"ev-1788782980072","status":"applied","title":"Application Submitted","description":"Application officially received for Junior Full-Stack Cloud Engineer at NexusScale Technologies.","timestamp":"2026-09-07T12:09:40.072Z"}]'::jsonb, ARRAY[]::text[], '[]'::jsonb, '{}'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788782607510-1gpoz', 'job-sec-01', 'test_student_adv_1788782599801', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Bengaluru, India', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T12:03:27.510Z'::timestamptz, '2026-09-07T12:03:27.543Z'::timestamptz, '2026-09-07T12:03:27.510Z'::timestamptz, '[{"id":"ev-1788782607510","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T12:03:27.510Z"}]'::jsonb, ARRAY[]::text[], '[]'::jsonb, '{}'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES ('app-1788782327297-jsukt', 'job-sec-01', 'test_student_adv_1788782306568', 'CloudArmor Defense Labs', 'Associate Security Operations Engineer', 'Associate Security Operations Engineer', 'Bengaluru, India', 'Full-time', 'Full-time', NULL, 'applied', 'pending', 'none', 'applied', '2026-09-07T11:58:47.295Z'::timestamptz, '2026-09-07T11:58:47.332Z'::timestamptz, '2026-09-07T11:58:47.295Z'::timestamptz, '[{"id":"ev-1788782327297","status":"applied","title":"Application Submitted","description":"Application officially received for Associate Security Operations Engineer at CloudArmor Defense Labs.","timestamp":"2026-09-07T11:58:47.295Z"}]'::jsonb, ARRAY[]::text[], '[]'::jsonb, '{}'::jsonb, NULL, NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;