INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('e704b3b8-e603-44b1-92e2-45321b2dcfda', 'test_student_1788629331716@university.edu', '555519', 'student', 1, TRUE, '2026-09-05T17:38:55.410Z'::timestamptz, '2026-09-05T17:28:55.410Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('0f6748e3-d55a-4787-8d3c-bf65431d3cbe', 'flood_1788629336542_0@test.com', '441445', 'student', 0, FALSE, '2026-09-05T17:38:56.628Z'::timestamptz, '2026-09-05T17:28:56.628Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('113685e0-c26d-42ae-b28a-e4a0056ce538', 'flood_1788629336643_1@test.com', '407475', 'student', 0, FALSE, '2026-09-05T17:38:56.745Z'::timestamptz, '2026-09-05T17:28:56.745Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('99b08282-8d6e-4095-82e0-7b3c347d82e1', 'flood_1788629336764_2@test.com', '347674', 'student', 0, FALSE, '2026-09-05T17:38:56.855Z'::timestamptz, '2026-09-05T17:28:56.855Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('5e696fff-a4e5-415a-888a-333f67c99b3b', 'flood_1788629336870_3@test.com', '821599', 'student', 0, FALSE, '2026-09-05T17:38:56.974Z'::timestamptz, '2026-09-05T17:28:56.974Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('7066f772-169b-4f7d-b693-a09c09666f4a', 'flood_1788629336985_4@test.com', '573311', 'student', 0, FALSE, '2026-09-05T17:38:57.137Z'::timestamptz, '2026-09-05T17:28:57.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('a8c1034b-853d-4a50-a2d0-97b0c9201340', 'ayanparmar54@gmail.com', '987199', 'industry', 0, TRUE, '2026-09-05T17:40:25.153Z'::timestamptz, '2026-09-05T17:30:25.153Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('7fcb7df9-3905-4822-b63f-a8f66e95905f', 'multi_role_1788629974479@university.edu', '576298', 'student', 0, TRUE, '2026-09-05T17:49:36.310Z'::timestamptz, '2026-09-05T17:39:36.310Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('c69c60a1-5627-444a-a88f-abf3e9d4f538', 'multi_role_1788629974479@university.edu', '752126', 'faculty', 0, TRUE, '2026-09-05T17:49:37.103Z'::timestamptz, '2026-09-05T17:39:37.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('0502522e-1947-4535-a0a2-f1c354654f69', 'ayanparmar54@gmail.com', '852173', 'industry', 0, TRUE, '2026-09-05T17:50:58.837Z'::timestamptz, '2026-09-05T17:40:58.837Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('60615a86-6a4f-498f-8fbe-fdfcbcc61b8c', 'auth_test_1788630279102@university.edu', '415119', 'student', 0, TRUE, '2026-09-05T17:54:40.316Z'::timestamptz, '2026-09-05T17:44:40.316Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('939e559f-431b-4454-afe2-0ff3d23c5124', 'student_tester_1788634149344@university.edu', '127258', 'student', 0, FALSE, '2026-09-05T18:59:11.179Z'::timestamptz, '2026-09-05T18:49:11.179Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('c2d5c5ad-55df-4bcf-8f37-0a0eda26d8d8', 'student_tester_1788634184724@university.edu', '811792', 'student', 0, TRUE, '2026-09-05T18:59:45.267Z'::timestamptz, '2026-09-05T18:49:45.267Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('554ce87b-f710-47aa-8d81-74dc41d9d1e1', 'student_tester_1788635119088@university.edu', '898647', 'student', 0, TRUE, '2026-09-05T19:15:20.131Z'::timestamptz, '2026-09-05T19:05:20.131Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('3c4619fe-7e44-4da3-a388-9615fecf5a0b', 'student_tester_1788636383399@university.edu', '679267', 'student', 0, TRUE, '2026-09-05T19:36:24.455Z'::timestamptz, '2026-09-05T19:26:24.455Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('8af02d07-9aa8-482c-9c04-e1f3a8ae4688', 'student_tester_1788636404740@university.edu', '702948', 'student', 0, TRUE, '2026-09-05T19:36:45.164Z'::timestamptz, '2026-09-05T19:26:45.164Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('07b8a26c-acc2-463c-b809-2b122a2f3ef3', 'student_tester_1788636538476@university.edu', '596918', 'student', 0, TRUE, '2026-09-05T19:38:59.258Z'::timestamptz, '2026-09-05T19:28:59.258Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('32b4c1bb-4866-4230-a673-cac252c4dad5', 'test_stu_1788693250391@university.edu', '860435', 'student', 1, FALSE, '2026-09-06T11:24:11.684Z'::timestamptz, '2026-09-06T11:14:11.684Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('94477c0a-2d3c-4d60-99d9-91b6c435229a', 'test_stu_1788693283577@university.edu', '375703', 'student', 0, TRUE, '2026-09-06T11:24:43.984Z'::timestamptz, '2026-09-06T11:14:43.984Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('897e0a6f-474e-48a5-9fa6-2d5282c9ad1b', 'test_stu_1788693300427@university.edu', '155584', 'student', 0, TRUE, '2026-09-06T11:25:00.618Z'::timestamptz, '2026-09-06T11:15:00.618Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('e2e296a7-a4f7-488a-af8b-93bf8b0dc7e5', 'test_stu_1788693375734@university.edu', '229989', 'student', 0, TRUE, '2026-09-06T11:26:16.060Z'::timestamptz, '2026-09-06T11:16:16.060Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('fb1166b8-9bb2-4c82-a989-8021b542e840', 'test_stu_1788693412943@university.edu', '684362', 'student', 0, TRUE, '2026-09-06T11:26:53.197Z'::timestamptz, '2026-09-06T11:16:53.197Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('f0d5a348-01b9-4000-87d5-080449020157', 'test_stu_1788693539025@university.edu', '589839', 'student', 0, TRUE, '2026-09-06T11:28:59.666Z'::timestamptz, '2026-09-06T11:18:59.666Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('94ffdf22-0363-4370-a671-b6e52140910d', 'test_stu_1788693754536@university.edu', '336327', 'student', 0, TRUE, '2026-09-06T11:32:34.916Z'::timestamptz, '2026-09-06T11:22:34.916Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('8b549618-afa2-4b2e-a8cb-c6ae14451858', 'stu_sub_1788718939479@skillbridge.edu', '152186', 'student', 0, FALSE, '2026-09-06T18:32:19.910Z'::timestamptz, '2026-09-06T18:22:19.910Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('ea033aec-2b57-4420-bf55-25cf9a13b185', 'stu_sub_1788718958996@skillbridge.edu', '605994', 'student', 0, FALSE, '2026-09-06T18:32:39.267Z'::timestamptz, '2026-09-06T18:22:39.267Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('02b1bb87-d59c-4d41-86f4-7d0d884da785', 'stu_sub_1788718973751@skillbridge.edu', '949740', 'student', 0, FALSE, '2026-09-06T18:32:54.048Z'::timestamptz, '2026-09-06T18:22:54.048Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('a3546bb7-d7b1-476d-a1bc-e93ab6fab82f', 'stu_sub_1788719016724@skillbridge.edu', '572672', 'student', 0, TRUE, '2026-09-06T18:33:41.003Z'::timestamptz, '2026-09-06T18:23:41.003Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('c95629d3-cc25-43de-94f1-d853e002eae3', 'stu_sub_1788719058802@skillbridge.edu', '555441', 'student', 0, TRUE, '2026-09-06T18:34:19.090Z'::timestamptz, '2026-09-06T18:24:19.090Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('817c6a54-d3b7-448b-bd7e-5a9f28280192', 'stu_sub_1788719128130@skillbridge.edu', '244842', 'student', 0, TRUE, '2026-09-06T18:35:28.474Z'::timestamptz, '2026-09-06T18:25:28.474Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('e0aec865-43e3-4397-bba8-31897401b52e', 'stu_sub_1788719142316@skillbridge.edu', '715361', 'student', 0, TRUE, '2026-09-06T18:35:42.611Z'::timestamptz, '2026-09-06T18:25:42.611Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('aab60b70-866f-45ab-be85-c0a4de5fb4b9', 'stu_sub_1788719168637@skillbridge.edu', '823593', 'student', 0, TRUE, '2026-09-06T18:36:08.855Z'::timestamptz, '2026-09-06T18:26:08.855Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('7df66cca-b19b-4e68-a5a0-5eac3b0e2339', 'stu_sub_1788719226214@skillbridge.edu', '820206', 'student', 0, TRUE, '2026-09-06T18:37:06.487Z'::timestamptz, '2026-09-06T18:27:06.487Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('c69b09ee-fd58-4318-b7ec-615ea1625705', 'stu_sub_1788719254716@skillbridge.edu', '263506', 'student', 0, TRUE, '2026-09-06T18:37:34.996Z'::timestamptz, '2026-09-06T18:27:34.996Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('7894cbf7-7be6-495d-99a6-5785912421fe', 'stu_sub_1788719287785@skillbridge.edu', '823189', 'student', 0, TRUE, '2026-09-06T18:38:08.097Z'::timestamptz, '2026-09-06T18:28:08.097Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('83aa8c5d-9797-46fa-9722-9290d8c7c37c', 'stu_sub_1788719292952_attacker@skillbridge.edu', '389269', 'student', 0, TRUE, '2026-09-06T18:38:13.114Z'::timestamptz, '2026-09-06T18:28:13.114Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('82c27a0f-f245-4325-87c7-1dda7633b57a', 'stu_sub_1788719324207@skillbridge.edu', '550295', 'student', 0, TRUE, '2026-09-06T18:38:44.409Z'::timestamptz, '2026-09-06T18:28:44.409Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('82049fb5-7c33-40fe-8a34-7af93ea6990c', 'stu_sub_1788719329234_attacker@skillbridge.edu', '742765', 'student', 0, TRUE, '2026-09-06T18:38:49.351Z'::timestamptz, '2026-09-06T18:28:49.351Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('9d3e6423-6ecd-41f3-96c4-2c0fec43ba98', 'stu_sub_1788719351345@skillbridge.edu', '477182', 'student', 0, TRUE, '2026-09-06T18:39:11.559Z'::timestamptz, '2026-09-06T18:29:11.559Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('10b187d3-b6f6-4cbb-a2ec-b58dbc6c29b3', 'stu_sub_1788719355031_attacker@skillbridge.edu', '804132', 'student', 0, TRUE, '2026-09-06T18:39:15.119Z'::timestamptz, '2026-09-06T18:29:15.119Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('329fed41-2bcd-4bfa-a29b-538aaf888fe1', 'stu_sub_1788719386168@skillbridge.edu', '245214', 'student', 0, TRUE, '2026-09-06T18:39:46.451Z'::timestamptz, '2026-09-06T18:29:46.451Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('f1333a19-d55c-4fb1-befa-38254a1a2886', 'stu_sub_1788719389699_attacker@skillbridge.edu', '963682', 'student', 0, TRUE, '2026-09-06T18:39:49.805Z'::timestamptz, '2026-09-06T18:29:49.805Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('9540bd6e-7c74-4e1e-b20c-8e537a8b26e8', 'auth_test_1788719410838@university.edu', '318491', 'student', 0, TRUE, '2026-09-06T18:40:11.171Z'::timestamptz, '2026-09-06T18:30:11.171Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('a8254ff6-becc-4a57-b206-a24b0ce1b898', 'student_tester_1788719418136@university.edu', '257742', 'student', 0, TRUE, '2026-09-06T18:40:18.397Z'::timestamptz, '2026-09-06T18:30:18.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('fca569f7-ba48-4191-b1ae-e92ce51dde5a', 'stu_sub_1788719446586@skillbridge.edu', '474275', 'student', 0, TRUE, '2026-09-06T18:40:47.005Z'::timestamptz, '2026-09-06T18:30:47.005Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('7dced048-17b9-4f96-8c70-cffcd5a448b9', 'stu_sub_1788719452697_attacker@skillbridge.edu', '733506', 'student', 0, TRUE, '2026-09-06T18:40:52.866Z'::timestamptz, '2026-09-06T18:30:52.866Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('0d4a7161-6664-47ed-af9f-fab7868aa527', 'stu_sub_1788720465597@skillbridge.edu', '293334', 'student', 0, TRUE, '2026-09-06T18:57:46.260Z'::timestamptz, '2026-09-06T18:47:46.260Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('f17cfbcd-5e77-4e31-acb7-4c910f8c1bbb', 'stu_sub_1788720476623_attacker@skillbridge.edu', '721729', 'student', 0, TRUE, '2026-09-06T18:57:56.976Z'::timestamptz, '2026-09-06T18:47:56.976Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('d9fb9b09-590b-4fff-9a44-2bb3acd74449', 'stu_sub_1788720553251@skillbridge.edu', '396494', 'student', 0, TRUE, '2026-09-06T18:59:13.915Z'::timestamptz, '2026-09-06T18:49:13.915Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('8ad34951-15ff-453b-bdaf-eb84e2fccdf7', 'stu_sub_1788720560509_attacker@skillbridge.edu', '227084', 'student', 0, TRUE, '2026-09-06T18:59:20.612Z'::timestamptz, '2026-09-06T18:49:20.612Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('6ae7b75e-555b-4518-8448-8f142deaffb5', 'stu_sub_1788721337219@skillbridge.edu', '497282', 'student', 0, TRUE, '2026-09-06T19:12:18.085Z'::timestamptz, '2026-09-06T19:02:18.085Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('0c8a834f-e78c-49ad-be8f-c5d06436789c', 'stu_sub_1788721353952_attacker@skillbridge.edu', '923587', 'student', 0, TRUE, '2026-09-06T19:12:34.152Z'::timestamptz, '2026-09-06T19:02:34.152Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('8977db05-0e77-493f-a414-19102da65da1', 'stu_sg_new_1788723328647@skillbridge.edu', '822725', 'student', 0, FALSE, '2026-09-06T19:45:31.160Z'::timestamptz, '2026-09-06T19:35:31.160Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('bbdb7d5a-e4d4-4ef5-830d-3e5a1f967c88', 'stu_sg_docs_1788723336532@skillbridge.edu', '390977', 'student', 0, FALSE, '2026-09-06T19:45:37.863Z'::timestamptz, '2026-09-06T19:35:37.863Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('4640c733-25aa-44ca-8eb4-15da8f3f6b09', 'stu_sg_new_1788723439785@skillbridge.edu', '839689', 'student', 0, FALSE, '2026-09-06T19:47:20.588Z'::timestamptz, '2026-09-06T19:37:20.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('9b25c7a4-635d-4d2e-a073-c0c9ebab0bab', 'stu_sg_docs_1788723440919@skillbridge.edu', '540189', 'student', 0, FALSE, '2026-09-06T19:47:21.053Z'::timestamptz, '2026-09-06T19:37:21.053Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('2ca0ed1a-58af-4573-9d3e-5ff9d3305eee', 'stu_sg_new_1788723505732@skillbridge.edu', '681372', 'student', 0, FALSE, '2026-09-06T19:48:28.260Z'::timestamptz, '2026-09-06T19:38:28.260Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('fe603b49-3636-4cbe-b5d4-e2342511030c', 'stu_sg_docs_1788723509830@skillbridge.edu', '369878', 'student', 0, FALSE, '2026-09-06T19:48:30.419Z'::timestamptz, '2026-09-06T19:38:30.419Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('eba342f5-b1dd-442e-8a11-7140fdffa02d', 'stu_sg_new_1788723600968@skillbridge.edu', '390702', 'student', 0, FALSE, '2026-09-06T19:50:03.140Z'::timestamptz, '2026-09-06T19:40:03.140Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('e2bb2212-a800-407a-aced-bb38a93ea034', 'stu_sg_docs_1788723603750@skillbridge.edu', '719574', 'student', 0, FALSE, '2026-09-06T19:50:03.999Z'::timestamptz, '2026-09-06T19:40:03.999Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('d3e38738-a1ac-434a-a3ff-be091f0895c9', 'stu_sub_1788723649102@skillbridge.edu', '209471', 'student', 0, TRUE, '2026-09-06T19:50:50.194Z'::timestamptz, '2026-09-06T19:40:50.194Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('f59d2d3a-e45c-4a8a-ad57-846bf3f1e9dd', 'stu_sub_1788723672154_attacker@skillbridge.edu', '468272', 'student', 0, TRUE, '2026-09-06T19:51:12.469Z'::timestamptz, '2026-09-06T19:41:12.469Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('b10dd1a5-b1f8-44c1-8416-53a239a6a4fd', 'stu_sg_new_1788723900365@skillbridge.edu', '919763', 'student', 0, FALSE, '2026-09-06T19:55:01.177Z'::timestamptz, '2026-09-06T19:45:01.177Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('3797b814-3ff6-4756-8fc6-9a0e06a2597c', 'stu_sg_docs_1788723904291@skillbridge.edu', '147844', 'student', 0, FALSE, '2026-09-06T19:55:05.383Z'::timestamptz, '2026-09-06T19:45:05.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('6b7b8c7b-266f-456f-9411-52fd6c980d86', 'stu_sub_1788723966626@skillbridge.edu', '777476', 'student', 0, TRUE, '2026-09-06T19:56:07.114Z'::timestamptz, '2026-09-06T19:46:07.114Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('e8bbed90-ba7c-41bf-a2fb-d77e7fb971bd', 'stu_sub_1788723992187_attacker@skillbridge.edu', '859931', 'student', 0, TRUE, '2026-09-06T19:56:32.534Z'::timestamptz, '2026-09-06T19:46:32.534Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('628a1663-e9a0-4c58-a87d-f71cf1d5f5b9', 'stu_learn_new_1788776603998@skillbridge.edu', '878845', 'student', 0, TRUE, '2026-09-07T10:33:25.867Z'::timestamptz, '2026-09-07T10:23:25.867Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('3d98684b-3051-4428-935e-719b9ff90d51', 'stu_learn_docs_1788776611830@skillbridge.edu', '472521', 'student', 0, TRUE, '2026-09-07T10:33:32.533Z'::timestamptz, '2026-09-07T10:23:32.533Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('df263fcf-cc37-4439-8076-e9d60de4767b', 'stu_learn_new_1788776664715@skillbridge.edu', '725213', 'student', 0, TRUE, '2026-09-07T10:34:24.952Z'::timestamptz, '2026-09-07T10:24:24.952Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('d8033581-a4af-4283-a675-e02c4b027c4f', 'stu_learn_docs_1788776665450@skillbridge.edu', '368254', 'student', 0, TRUE, '2026-09-07T10:34:25.528Z'::timestamptz, '2026-09-07T10:24:25.528Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('897097fd-5f3d-4acc-a126-c276f41ce3e2', 'stu_sg_new_1788776686942@skillbridge.edu', '832298', 'student', 0, FALSE, '2026-09-07T10:34:47.348Z'::timestamptz, '2026-09-07T10:24:47.348Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('73aeaf25-0e3d-4ab5-889e-95422e9fca3f', 'stu_sg_docs_1788776687636@skillbridge.edu', '292740', 'student', 0, FALSE, '2026-09-07T10:34:47.822Z'::timestamptz, '2026-09-07T10:24:47.822Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('d7f3044e-49ea-40fe-a5b0-836c83857d60', 'stu_sub_1788776703682@skillbridge.edu', '754424', 'student', 0, TRUE, '2026-09-07T10:35:03.960Z'::timestamptz, '2026-09-07T10:25:03.960Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('b46f4fb6-474c-45d6-b392-856020bd1223', 'stu_learn_new_1788777971594@skillbridge.edu', '202362', 'student', 0, TRUE, '2026-09-07T10:56:12.232Z'::timestamptz, '2026-09-07T10:46:12.232Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('8efcf71d-a225-451d-93bc-c5d5be5cc91e', 'stu_learn_docs_1788777972960@skillbridge.edu', '388023', 'student', 0, TRUE, '2026-09-07T10:56:13.051Z'::timestamptz, '2026-09-07T10:46:13.051Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('25c6180e-78bc-467e-9265-ad46e25a2e95', 'stu_live_yt_1788778036017@skillbridge.edu', '311013', 'student', 0, TRUE, '2026-09-07T10:57:16.346Z'::timestamptz, '2026-09-07T10:47:16.346Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('e49de857-bd3b-48c0-9ec3-e07623bf95d4', 'stu_learn_new_1788778073598@skillbridge.edu', '858156', 'student', 0, TRUE, '2026-09-07T10:57:53.979Z'::timestamptz, '2026-09-07T10:47:53.979Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('1806899c-86e7-4305-be1f-0a4945ee4c43', 'stu_learn_docs_1788778074706@skillbridge.edu', '917305', 'student', 0, TRUE, '2026-09-07T10:57:54.834Z'::timestamptz, '2026-09-07T10:47:54.834Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('d5061666-46e1-4f6f-a574-9759bf9c6aa9', 'stu_sg_new_1788778105603@skillbridge.edu', '563535', 'student', 0, FALSE, '2026-09-07T10:58:26.078Z'::timestamptz, '2026-09-07T10:48:26.078Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('cbfbb1d5-b463-4636-87d8-58e06d049770', 'stu_sg_docs_1788778106464@skillbridge.edu', '624314', 'student', 0, FALSE, '2026-09-07T10:58:26.620Z'::timestamptz, '2026-09-07T10:48:26.620Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('00c073f5-1157-406a-97dc-1ff8a8d92e14', 'stu_sub_1788778124240@skillbridge.edu', '390562', 'student', 0, TRUE, '2026-09-07T10:58:44.522Z'::timestamptz, '2026-09-07T10:48:44.522Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('14b9b14b-8b9d-45dc-82ec-25e1d0d31332', 'auth_test_1788779554065@university.edu', '732758', 'student', 0, TRUE, '2026-09-07T11:22:34.405Z'::timestamptz, '2026-09-07T11:12:34.405Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('524ae310-ff5c-4ab2-9380-57a3655aee07', 'stu_learn_new_1788779559125@skillbridge.edu', '105801', 'student', 0, TRUE, '2026-09-07T11:22:39.336Z'::timestamptz, '2026-09-07T11:12:39.336Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('79e7c14e-7b31-4b20-81fe-3aff3b73f13b', 'stu_learn_docs_1788779559847@skillbridge.edu', '879622', 'student', 0, TRUE, '2026-09-07T11:22:40.039Z'::timestamptz, '2026-09-07T11:12:40.039Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('a1b79ecc-87a4-4afe-89b4-088837011fa1', 'stu_sg_new_1788779587894@skillbridge.edu', '473795', 'student', 0, FALSE, '2026-09-07T11:23:08.176Z'::timestamptz, '2026-09-07T11:13:08.176Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('05766fef-15cd-4f2a-a59f-38888a79eec5', 'stu_sg_docs_1788779588560@skillbridge.edu', '247974', 'student', 0, FALSE, '2026-09-07T11:23:08.752Z'::timestamptz, '2026-09-07T11:13:08.752Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('365a6b2e-f93a-47bf-a3e3-22f646543faa', 'stu_sub_1788779634033@skillbridge.edu', '135422', 'student', 0, TRUE, '2026-09-07T11:23:54.332Z'::timestamptz, '2026-09-07T11:13:54.332Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('39f81a21-695c-4b2e-98c5-78e06d9cb5b3', 'stu_sub_1788779644841_attacker@skillbridge.edu', '523203', 'student', 0, TRUE, '2026-09-07T11:24:05.328Z'::timestamptz, '2026-09-07T11:14:05.328Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('323582fb-ede7-4d05-b874-f482cf6ca9fc', 'stu_learn_new_1788782345062@skillbridge.edu', '688573', 'student', 0, TRUE, '2026-09-07T12:09:05.819Z'::timestamptz, '2026-09-07T11:59:05.819Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('0c56deee-ef2e-4e49-b1df-3aab21e7427b', 'stu_learn_docs_1788782347912@skillbridge.edu', '185520', 'student', 0, TRUE, '2026-09-07T12:09:08.092Z'::timestamptz, '2026-09-07T11:59:08.092Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('05fa95de-33ab-4533-96ec-3bb111d94e20', 'stu_sg_new_1788782376226@skillbridge.edu', '109095', 'student', 0, FALSE, '2026-09-07T12:09:36.446Z'::timestamptz, '2026-09-07T11:59:36.446Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('55074ec0-4805-467d-9276-c526bd10c60c', 'stu_sg_docs_1788782376852@skillbridge.edu', '854905', 'student', 0, FALSE, '2026-09-07T12:09:36.997Z'::timestamptz, '2026-09-07T11:59:36.997Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('63b934a4-5b8b-4cf2-8188-c8badf913db2', 'test_stu_1788784779050@university.edu', '587636', 'student', 0, TRUE, '2026-09-07T12:49:40.581Z'::timestamptz, '2026-09-07T12:39:40.581Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('7e47fda2-3dda-4490-8f19-0ef729c59d29', 'industry@gmail.com', '159944', 'industry', 0, TRUE, '2026-09-07T19:21:47.391Z'::timestamptz, '2026-09-07T19:11:47.391Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('052b7070-416d-4ab7-92f8-477e9196a5f4', 'stud@edu.in', '568597', 'student', 0, TRUE, '2026-09-08T11:57:55.809Z'::timestamptz, '2026-09-08T11:47:55.809Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('a7750675-a37a-420f-8ac3-323d868b60cc', 'bcahod@christcollegerajkot.edu.in', '934240', 'campus', 0, TRUE, '2026-09-09T11:10:39.339Z'::timestamptz, '2026-09-09T11:00:39.339Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('5de85c68-1c03-422e-b1c4-18e68e55d943', 'riddhi@christcollegerajkot.edu.in', '147225', 'faculty', 0, TRUE, '2026-09-09T18:03:09.206Z'::timestamptz, '2026-09-09T17:53:09.206Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;
INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES ('607d0ec0-d2a2-4302-8f1d-09508057870b', 'stud1@gmail.com', '754732', 'student', 0, TRUE, '2026-09-12T18:12:16.198Z'::timestamptz, '2026-09-12T18:02:16.198Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;