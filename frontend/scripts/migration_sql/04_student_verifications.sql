INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_47fc1671-0e5d-4f66-af79-ca34f5e10ec5', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'VERIFIED', '{"linkedIn":"","gitHub":"","portfolio":"","other":"","updatedAt":"2026-09-06T19:12:49.865Z"}'::jsonb, NULL, '2026-09-06T10:41:35.103Z'::timestamptz, '2026-09-06T19:49:51.151Z'::timestamptz, '2026-09-06T11:25:10.755Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_74830361-2f5c-41e1-8015-32e619f7dd19', '74830361-2f5c-41e1-8015-32e619f7dd19', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T11:14:44.264Z'::timestamptz, '2026-09-06T11:14:44.264Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_9cba0a7d-dac0-4a2f-a178-6701ae6223df', '9cba0a7d-dac0-4a2f-a178-6701ae6223df', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T11:15:00.815Z'::timestamptz, '2026-09-06T11:15:00.815Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_2f311123-9b7e-44cb-b301-84db1348c583', '2f311123-9b7e-44cb-b301-84db1348c583', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-06T11:16:16.273Z'::timestamptz, '2026-09-09T18:19:08.827Z'::timestamptz, '2026-09-09T18:19:08.832Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-06T11:16:53.392Z'::timestamptz, '2026-09-09T18:19:14.037Z'::timestamptz, '2026-09-09T18:19:14.037Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_6eadef1a-74b9-46c9-9df0-75da89fc0d2e', '6eadef1a-74b9-46c9-9df0-75da89fc0d2e', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-06T11:19:00.247Z'::timestamptz, '2026-09-06T11:19:23.367Z'::timestamptz, '2026-09-06T11:19:23.367Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_650ace9b-e92f-444f-8171-1b374d4b9cb3', '650ace9b-e92f-444f-8171-1b374d4b9cb3', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-06T11:22:35.483Z'::timestamptz, '2026-09-06T11:22:49.113Z'::timestamptz, '2026-09-06T11:22:49.113Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_6b9225d4-9b3b-4370-9526-88036dbe664c', '6b9225d4-9b3b-4370-9526-88036dbe664c', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:24:19.306Z'::timestamptz, '2026-09-06T18:24:19.306Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_6d7e3a9c-8734-40df-8966-8e342ccda220', '6d7e3a9c-8734-40df-8966-8e342ccda220', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:25:29.114Z'::timestamptz, '2026-09-06T18:25:29.114Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_44e38fbf-5828-42e3-b9c2-e27fbcadbe1c', '44e38fbf-5828-42e3-b9c2-e27fbcadbe1c', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:25:42.802Z'::timestamptz, '2026-09-06T18:25:42.802Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_a8091b49-aaf2-4913-b9eb-d4113aba9d13', 'a8091b49-aaf2-4913-b9eb-d4113aba9d13', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-06T18:26:09.088Z'::timestamptz, '2026-09-09T18:19:12.801Z'::timestamptz, '2026-09-09T18:19:12.802Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'd07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-06T18:27:06.660Z'::timestamptz, '2026-09-09T18:19:15.236Z'::timestamptz, '2026-09-09T18:19:15.236Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T18:27:42.692Z"}'::jsonb, NULL, '2026-09-06T18:27:35.263Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T18:28:12.455Z"}'::jsonb, NULL, '2026-09-06T18:28:08.295Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz, '2026-09-09T18:19:14.413Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_9801387f-5d25-4809-bb25-1c6a416bacc9', '9801387f-5d25-4809-bb25-1c6a416bacc9', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:28:13.343Z'::timestamptz, '2026-09-06T18:28:13.343Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T18:28:48.606Z"}'::jsonb, NULL, '2026-09-06T18:28:44.641Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_a9d1f9d2-3fda-4491-89bc-32c384eca475', 'a9d1f9d2-3fda-4491-89bc-32c384eca475', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:28:50.343Z'::timestamptz, '2026-09-06T18:28:50.344Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T18:29:14.669Z"}'::jsonb, NULL, '2026-09-06T18:29:11.735Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_f0a85291-3e4b-46c0-bac8-11cd83b8b8a7', 'f0a85291-3e4b-46c0-bac8-11cd83b8b8a7', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:29:15.308Z'::timestamptz, '2026-09-06T18:29:15.308Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T18:29:49.319Z"}'::jsonb, NULL, '2026-09-06T18:29:46.630Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_a7f31518-10a9-49ca-9d04-98a615ab09d1', 'a7f31518-10a9-49ca-9d04-98a615ab09d1', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:29:50.106Z'::timestamptz, '2026-09-06T18:29:50.106Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_b033464d-4ae2-4c3c-a60a-c750f8d8a360', 'b033464d-4ae2-4c3c-a60a-c750f8d8a360', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:30:11.457Z'::timestamptz, '2026-09-06T18:30:11.457Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_7997db7c-cb68-4bd0-9c76-20265c74c400', '7997db7c-cb68-4bd0-9c76-20265c74c400', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:30:18.598Z'::timestamptz, '2026-09-06T18:30:18.598Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T18:30:51.968Z"}'::jsonb, NULL, '2026-09-06T18:30:47.182Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_582b9bf3-b005-4cb2-aa41-67039b31ab39', '582b9bf3-b005-4cb2-aa41-67039b31ab39', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:30:53.135Z'::timestamptz, '2026-09-06T18:30:53.136Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T18:47:55.713Z"}'::jsonb, NULL, '2026-09-06T18:47:46.893Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz, '2026-09-06T18:47:53.868Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_8661e4c3-63e3-4b94-a633-fbc69e8c6f6b', '8661e4c3-63e3-4b94-a633-fbc69e8c6f6b', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:47:57.851Z'::timestamptz, '2026-09-06T18:47:57.851Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T18:49:19.828Z"}'::jsonb, NULL, '2026-09-06T18:49:14.437Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz, '2026-09-06T18:49:18.421Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_9d999600-861d-400a-881f-56047f070c2d', '9d999600-861d-400a-881f-56047f070c2d', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T18:49:20.960Z'::timestamptz, '2026-09-06T18:49:20.960Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T19:02:31.770Z"}'::jsonb, NULL, '2026-09-06T19:02:19.052Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz, '2026-09-06T19:02:26.678Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_d678f559-25d4-4deb-a326-becd40b625cd', 'd678f559-25d4-4deb-a326-becd40b625cd', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T19:02:34.884Z'::timestamptz, '2026-09-06T19:02:34.884Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T19:41:09.117Z"}'::jsonb, NULL, '2026-09-06T19:40:51.700Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz, '2026-09-06T19:41:02.430Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_4819192d-f052-4b49-b59f-382c641bea40', '4819192d-f052-4b49-b59f-382c641bea40', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T19:41:13.467Z'::timestamptz, '2026-09-06T19:41:13.467Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-06T19:46:30.196Z"}'::jsonb, NULL, '2026-09-06T19:46:07.682Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz, '2026-09-06T19:46:28.109Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_1cc02495-f0bd-4607-baae-7d6e33937436', '1cc02495-f0bd-4607-baae-7d6e33937436', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-06T19:46:33.896Z'::timestamptz, '2026-09-06T19:46:33.897Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_b55e113d-cbbb-45b1-8a43-91bb65b153c6', 'b55e113d-cbbb-45b1-8a43-91bb65b153c6', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T10:23:27.353Z'::timestamptz, '2026-09-07T10:23:27.353Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_fd80a280-5090-4a6e-8aa2-00a3539f576a', 'fd80a280-5090-4a6e-8aa2-00a3539f576a', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T10:23:33.463Z'::timestamptz, '2026-09-07T10:23:35.571Z'::timestamptz, '2026-09-07T10:23:34.985Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_12227163-4d90-4444-b622-a48e9aeb4814', '12227163-4d90-4444-b622-a48e9aeb4814', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T10:24:25.220Z'::timestamptz, '2026-09-07T10:24:25.220Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T10:24:25.719Z'::timestamptz, '2026-09-07T10:24:26.219Z'::timestamptz, '2026-09-07T10:24:26.132Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-07T10:25:11.520Z"}'::jsonb, NULL, '2026-09-07T10:25:04.341Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz, '2026-09-07T10:25:10.218Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_642e8d4a-02c6-4ef1-9305-71f5ab337fdf', '642e8d4a-02c6-4ef1-9305-71f5ab337fdf', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T10:46:12.695Z'::timestamptz, '2026-09-07T10:46:12.695Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_17752966-0044-48e3-b3aa-d1fe9caa76b3', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T10:46:13.247Z'::timestamptz, '2026-09-07T10:46:14.066Z'::timestamptz, '2026-09-07T10:46:13.935Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_bceb63af-15b9-4170-9f05-e5557b0455d7', 'bceb63af-15b9-4170-9f05-e5557b0455d7', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T10:47:17.028Z'::timestamptz, '2026-09-07T10:47:17.029Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_b796fd6a-3bbe-4774-81e2-3188c08cc199', 'b796fd6a-3bbe-4774-81e2-3188c08cc199', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T10:47:54.424Z'::timestamptz, '2026-09-07T10:47:54.424Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T10:47:55.040Z'::timestamptz, '2026-09-07T10:47:55.730Z'::timestamptz, '2026-09-07T10:47:55.612Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-07T10:48:52.419Z"}'::jsonb, NULL, '2026-09-07T10:48:45.025Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz, '2026-09-07T10:48:51.119Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_2253d9cb-c0f9-444d-9168-f6944613153d', '2253d9cb-c0f9-444d-9168-f6944613153d', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T11:12:35.000Z'::timestamptz, '2026-09-07T11:12:35.000Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_f07d3169-0d40-4abf-9a20-f9c8c9410147', 'f07d3169-0d40-4abf-9a20-f9c8c9410147', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T11:12:39.603Z'::timestamptz, '2026-09-07T11:12:39.603Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_43a69d7a-8521-41eb-ade3-8659f17099e2', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T11:12:40.317Z'::timestamptz, '2026-09-07T11:12:41.113Z'::timestamptz, '2026-09-07T11:12:40.912Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'VERIFIED', '{"linkedIn":"https://linkedin.com/in/alex-student","gitHub":"https://github.com/alex-student","portfolio":"https://alex-student.dev","other":"https://dribbble.com/alex-student","updatedAt":"2026-09-07T11:14:03.639Z"}'::jsonb, NULL, '2026-09-07T11:13:54.896Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz, '2026-09-07T11:14:01.792Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_4a2d163a-a0c5-4340-bd0c-3d4739b84b0d', '4a2d163a-a0c5-4340-bd0c-3d4739b84b0d', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T11:14:05.991Z'::timestamptz, '2026-09-07T11:14:05.991Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_new_1788782306568', 'test_student_new_1788782306568', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_adv_1788782306568', 'test_student_adv_1788782306568', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_learn_1788782306568', 'test_student_learn_1788782306568', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_b_1788782306568', 'test_student_b_1788782306568', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_14_1788782327573', 'test_student_14_1788782327573', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_unverified_1788782329542', 'test_unverified_1788782329542', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T11:58:49.728Z'::timestamptz, '2026-09-07T11:58:49.728Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_72cc913b-0056-41e0-b720-7f51a7a4d1cf', '72cc913b-0056-41e0-b720-7f51a7a4d1cf', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T11:59:07.309Z'::timestamptz, '2026-09-07T11:59:07.309Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_fbc5a09c-460f-44d9-afd1-9b409492ea36', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T11:59:08.551Z'::timestamptz, '2026-09-07T11:59:10.743Z'::timestamptz, '2026-09-07T11:59:10.194Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_new_1788782599801', 'test_student_new_1788782599801', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_adv_1788782599801', 'test_student_adv_1788782599801', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_learn_1788782599801', 'test_student_learn_1788782599801', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_b_1788782599801', 'test_student_b_1788782599801', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_14_1788782607685', 'test_student_14_1788782607685', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_unverified_1788782609452', 'test_unverified_1788782609452', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T12:03:29.646Z'::timestamptz, '2026-09-07T12:03:29.646Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784103103', 'stu_34_new_1788784103103', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784103103', 'stu_34_adv_1788784103103', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784103103', 'stu_34_lrn_1788784103103', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784103103', 'stu_34_other_1788784103103', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784129009', 'stu_34_new_1788784129009', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784129009', 'stu_34_adv_1788784129009', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784129009', 'stu_34_lrn_1788784129009', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784129009', 'stu_34_other_1788784129009', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784159011', 'stu_34_new_1788784159011', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784159011', 'stu_34_adv_1788784159011', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784159011', 'stu_34_lrn_1788784159011', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784159011', 'stu_34_other_1788784159011', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784192714', 'stu_34_new_1788784192714', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784192714', 'stu_34_adv_1788784192714', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784192714', 'stu_34_lrn_1788784192714', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784192714', 'stu_34_other_1788784192714', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784312511', 'stu_34_new_1788784312511', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784312511', 'stu_34_adv_1788784312511', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784312511', 'stu_34_lrn_1788784312511', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784312511', 'stu_34_other_1788784312511', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784335671', 'stu_34_new_1788784335671', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784335671', 'stu_34_adv_1788784335671', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-09T18:19:15.920Z'::timestamptz, '2026-09-09T18:19:15.920Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784335671', 'stu_34_lrn_1788784335671', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784335671', 'stu_34_other_1788784335671', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784438121', 'stu_34_new_1788784438121', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784438121', 'stu_34_adv_1788784438121', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-09T18:19:19.492Z'::timestamptz, '2026-09-09T18:19:19.492Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784438121', 'stu_34_lrn_1788784438121', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784438121', 'stu_34_other_1788784438121', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784460729', 'stu_34_new_1788784460729', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784460729', 'stu_34_adv_1788784460729', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-09T18:19:18.088Z'::timestamptz, '2026-09-09T18:19:18.089Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784460729', 'stu_34_lrn_1788784460729', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784460729', 'stu_34_other_1788784460729', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784485808', 'stu_34_new_1788784485808', 'DOCUMENTS_PENDING', '{}'::jsonb, NULL, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:50.983Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784485808', 'stu_34_adv_1788784485808', 'DOCUMENTS_PENDING', '{}'::jsonb, NULL, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:49.081Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784485808', 'stu_34_lrn_1788784485808', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784485808', 'stu_34_other_1788784485808', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784515470', 'stu_34_new_1788784515470', 'DOCUMENTS_PENDING', '{}'::jsonb, NULL, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:19.378Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784515470', 'stu_34_adv_1788784515470', 'DOCUMENTS_PENDING', '{}'::jsonb, NULL, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:17.806Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784515470', 'stu_34_lrn_1788784515470', 'DOCUMENTS_PENDING', '{}'::jsonb, NULL, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:19.759Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784515470', 'stu_34_other_1788784515470', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784556639', 'stu_34_new_1788784556639', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784556639', 'stu_34_adv_1788784556639', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784556639', 'stu_34_other_1788784556639', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784583072', 'stu_34_new_1788784583072', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784583072', 'stu_34_adv_1788784583072', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784583072', 'stu_34_other_1788784583072', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784626397', 'stu_34_new_1788784626397', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784626397', 'stu_34_adv_1788784626397', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784626397', 'stu_34_other_1788784626397', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_bc5536f5-6bb5-4725-a9a5-3107e5cf7747', 'bc5536f5-6bb5-4725-a9a5-3107e5cf7747', 'DOCUMENTS_PENDING', '{}'::jsonb, NULL, '2026-09-07T12:39:41.960Z'::timestamptz, '2026-09-07T12:39:45.409Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_new_1788784801588', 'test_student_new_1788784801588', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_adv_1788784801588', 'test_student_adv_1788784801588', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_learn_1788784801588', 'test_student_learn_1788784801588', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_test_student_b_1788784801588', 'test_student_b_1788784801588', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788784864571', 'stu_34_new_1788784864571', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788784864571', 'stu_34_adv_1788784864571', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788784864571', 'stu_34_other_1788784864571', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788787784013', 'stu_34_new_1788787784013', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788787784013', 'stu_34_adv_1788787784013', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788787784013', 'stu_34_other_1788787784013', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788787810448', 'stu_34_new_1788787810448', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788787810448', 'stu_34_adv_1788787810448', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788787810448', 'stu_34_other_1788787810448', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788806285059', 'stu_34_new_1788806285059', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788806285059', 'stu_34_adv_1788806285059', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788806285059', 'stu_34_other_1788806285059', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788806594421', 'stu_34_new_1788806594421', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788806594421', 'stu_34_adv_1788806594421', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788806594421', 'stu_34_other_1788806594421', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788808155355', 'stu_34_new_1788808155355', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788808155355', 'stu_34_adv_1788808155355', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788808155355', 'stu_34_other_1788808155355', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_new_1788809444883', 'stu_34_new_1788809444883', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_adv_1788809444883', 'stu_34_adv_1788809444883', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_stu_34_other_1788809444883', 'stu_34_other_1788809444883', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_admin-system-account-id', 'admin-system-account-id', 'NOT_STARTED', '{}'::jsonb, NULL, '2026-09-07T19:38:52.738Z'::timestamptz, '2026-09-07T19:38:52.739Z'::timestamptz, NULL)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_1ff7662b-94c3-4c76-ac2d-039c6116499b', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 'VERIFIED', '{"linkedIn":"","gitHub":"","portfolio":"","other":"","updatedAt":"2026-09-08T11:49:12.432Z"}'::jsonb, NULL, '2026-09-08T11:48:15.874Z'::timestamptz, '2026-09-09T12:25:19.192Z'::timestamptz, '2026-09-08T11:49:10.517Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES ('sv_cadd3584-dcb6-46ec-b943-5a045c349ca3', 'cadd3584-dcb6-46ec-b943-5a045c349ca3', 'VERIFIED', '{}'::jsonb, NULL, '2026-09-12T18:02:42.050Z'::timestamptz, '2026-09-12T18:03:43.404Z'::timestamptz, '2026-09-12T18:03:28.626Z'::timestamptz)
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;