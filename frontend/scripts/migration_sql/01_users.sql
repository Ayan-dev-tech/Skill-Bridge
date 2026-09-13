INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('admin-system-account-id', 'admin@gmail.com', 'System Administrator', 'student', '7676aaafb027c825bd9abab78b234070e702752f625b752e55e55b48e607e358', TRUE, TRUE, '2026-09-05T17:58:53.549Z'::timestamptz, '2026-09-05T17:58:53.549Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('2e1e1e0b-de7f-4a1d-aa15-138bb5182dfc', 'test_student_1788629331716@university.edu', 'Alex Rivera', 'student', 'b926e929192ee30e047ab90fc9d1e0d811a4ccc5f0411da2047abfccc8cd8f60', FALSE, TRUE, '2026-09-05T17:28:55.389Z'::timestamptz, '2026-09-05T17:28:55.389Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('11b3532a-57d5-4dad-9dff-637ad64ea73a', 'flood_1788629336542_0@test.com', 'Burst User 0', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-05T17:28:56.621Z'::timestamptz, '2026-09-05T17:28:56.621Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('9ad2244e-6b8a-428b-a163-ad10e5e5cb36', 'flood_1788629336643_1@test.com', 'Burst User 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-05T17:28:56.737Z'::timestamptz, '2026-09-05T17:28:56.737Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('f76b079d-7ccb-421d-a03a-8ea4ec79d6ce', 'flood_1788629336764_2@test.com', 'Burst User 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-05T17:28:56.848Z'::timestamptz, '2026-09-05T17:28:56.848Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('02113d58-64de-4f3a-b00d-33564eaa32c4', 'flood_1788629336870_3@test.com', 'Burst User 3', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-05T17:28:56.960Z'::timestamptz, '2026-09-05T17:28:56.960Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('0402ec2d-30e3-4e4f-beb5-c71bb64679b9', 'flood_1788629336985_4@test.com', 'Burst User 4', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-05T17:28:57.125Z'::timestamptz, '2026-09-05T17:28:57.125Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'ayanparmar54@gmail.com', 'Ayan Parmar', 'student', 'pbkdf2:efdab69aca2937ab1e4daf65850a0245:b77ec685e0b7e2f6c11c2c7977d9e63c82a7648fca92b1234074c723d02842304f83f22a22da4633a107a18ecfe1dce3289313a1a7c13479faa07731c33fa874', FALSE, TRUE, '2026-09-05T17:30:25.145Z'::timestamptz, '2026-09-05T17:30:25.145Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('cb380b28-3221-4e32-a232-47452d0e6eaf', 'multi_role_1788629974479@university.edu', 'Jordan Lee', 'student', '9c20dbb208b419399a5558798693795445b93e21a5d494bb2de7b43919fadb22', FALSE, TRUE, '2026-09-05T17:39:36.283Z'::timestamptz, '2026-09-05T17:39:36.283Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('9f777fbc-fc93-49cc-8e9c-cb9aa8953e4f', 'multi_role_1788629974479@university.edu', 'Professor Jordan Lee', 'faculty', 'b09c1785c0d1bff3e38152f4ab4c029891548b6cfcd5fec6eae0fc5442609697', FALSE, TRUE, '2026-09-05T17:39:37.091Z'::timestamptz, '2026-09-05T17:39:37.091Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('e93a2f49-3cc2-4f48-be9f-63f53dedae96', 'ayanparmar54@gmail.com', 'Ayan Parmar', 'industry', 'e6c770e886175ed0de041e1af778a4953cc635a9f48b7eac16dac76a558787f1', FALSE, TRUE, '2026-09-05T17:40:58.796Z'::timestamptz, '2026-09-05T17:40:58.796Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('7facd4ab-e160-47f0-909b-68388b9f4109', 'auth_test_1788630279102@university.edu', 'Morgan Taylor', 'student', '51f8518985ee0afa9e37c88a40df6ff41fb7c0691b740ea43a5dea89e6a13b84', FALSE, TRUE, '2026-09-05T17:44:40.293Z'::timestamptz, '2026-09-05T17:44:40.293Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('864c1f98-d1f6-47a1-b587-ffd9c944b8c8', 'student_tester_1788634149344@university.edu', 'Alex Rivera', 'student', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', FALSE, FALSE, '2026-09-05T18:49:11.159Z'::timestamptz, '2026-09-05T18:49:11.159Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('f0c745e2-4519-4aeb-9b05-08bdb2bb5dc3', 'student_tester_1788634184724@university.edu', 'Alex Rivera', 'student', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', FALSE, TRUE, '2026-09-05T18:49:45.257Z'::timestamptz, '2026-09-05T18:49:45.257Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('7e612090-1a8d-44bb-aed1-6f5c1aac02d8', 'student_tester_1788635119088@university.edu', 'Alex Rivera', 'student', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', FALSE, TRUE, '2026-09-05T19:05:20.125Z'::timestamptz, '2026-09-05T19:05:20.125Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('61fc49ae-2554-4e20-89bf-f042efff1c70', 'student_tester_1788636383399@university.edu', 'Alex Rivera', 'student', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', FALSE, TRUE, '2026-09-05T19:26:24.436Z'::timestamptz, '2026-09-05T19:26:24.436Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('940f2d64-e9f4-419e-82fb-db243ddcbf9d', 'student_tester_1788636404740@university.edu', 'Alex Rivera', 'student', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', FALSE, TRUE, '2026-09-05T19:26:45.141Z'::timestamptz, '2026-09-05T19:26:45.141Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('4b8cbdf6-f1d6-44a6-843a-da4a91dd5f29', 'student_tester_1788636538476@university.edu', 'Alex Rivera', 'student', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', FALSE, TRUE, '2026-09-05T19:28:59.239Z'::timestamptz, '2026-09-05T19:28:59.239Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('d1f7040d-4717-4c9f-bdbb-e30ee01be258', 'test_stu_1788693250391@university.edu', 'Jane Doe', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T11:14:11.613Z'::timestamptz, '2026-09-06T11:14:11.613Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('74830361-2f5c-41e1-8015-32e619f7dd19', 'test_stu_1788693283577@university.edu', 'Jane Doe', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T11:14:43.971Z'::timestamptz, '2026-09-06T11:14:43.971Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('9cba0a7d-dac0-4a2f-a178-6701ae6223df', 'test_stu_1788693300427@university.edu', 'Jane Doe', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T11:15:00.609Z'::timestamptz, '2026-09-06T11:15:00.609Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('2f311123-9b7e-44cb-b301-84db1348c583', 'test_stu_1788693375734@university.edu', 'Jane Doe', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T11:16:16.049Z'::timestamptz, '2026-09-06T11:16:16.049Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'test_stu_1788693412943@university.edu', 'Jane Doe', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T11:16:53.188Z'::timestamptz, '2026-09-06T11:16:53.188Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('6eadef1a-74b9-46c9-9df0-75da89fc0d2e', 'test_stu_1788693539025@university.edu', 'Jane Doe', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T11:18:59.619Z'::timestamptz, '2026-09-06T11:18:59.619Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('650ace9b-e92f-444f-8171-1b374d4b9cb3', 'test_stu_1788693754536@university.edu', 'Jane Doe', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T11:22:34.894Z'::timestamptz, '2026-09-06T11:22:34.894Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('3a119ac7-8677-4de4-804f-9ffe2ecc3c99', 'stu_sub_1788718939479@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T18:22:19.870Z'::timestamptz, '2026-09-06T18:22:19.870Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('3ae769d8-3e5c-4fbc-b5ca-7dc671e48ea8', 'stu_sub_1788718958996@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T18:22:39.250Z'::timestamptz, '2026-09-06T18:22:39.250Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('b1b345d6-b049-453b-8c37-3966f24cee64', 'stu_sub_1788718973751@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T18:22:54.019Z'::timestamptz, '2026-09-06T18:22:54.019Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('813abdd7-6fec-45aa-ba13-969be09c5540', 'stu_sub_1788719016724@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:23:40.933Z'::timestamptz, '2026-09-06T18:23:40.933Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('6b9225d4-9b3b-4370-9526-88036dbe664c', 'stu_sub_1788719058802@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:24:19.070Z'::timestamptz, '2026-09-06T18:24:19.070Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('6d7e3a9c-8734-40df-8966-8e342ccda220', 'stu_sub_1788719128130@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:25:28.448Z'::timestamptz, '2026-09-06T18:25:28.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('44e38fbf-5828-42e3-b9c2-e27fbcadbe1c', 'stu_sub_1788719142316@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:25:42.594Z'::timestamptz, '2026-09-06T18:25:42.594Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('a8091b49-aaf2-4913-b9eb-d4113aba9d13', 'stu_sub_1788719168637@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:26:08.838Z'::timestamptz, '2026-09-06T18:26:08.838Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'stu_sub_1788719226214@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:27:06.470Z'::timestamptz, '2026-09-06T18:27:06.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'stu_sub_1788719254716@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:27:34.977Z'::timestamptz, '2026-09-06T18:27:34.977Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'stu_sub_1788719287785@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:28:08.077Z'::timestamptz, '2026-09-06T18:28:08.077Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('9801387f-5d25-4809-bb25-1c6a416bacc9', 'stu_sub_1788719292952_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:28:13.074Z'::timestamptz, '2026-09-06T18:28:13.074Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('07394e2d-be14-4577-a227-0eb7dd580217', 'stu_sub_1788719324207@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:28:44.388Z'::timestamptz, '2026-09-06T18:28:44.388Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('a9d1f9d2-3fda-4491-89bc-32c384eca475', 'stu_sub_1788719329234_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:28:49.334Z'::timestamptz, '2026-09-06T18:28:49.334Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('1a66021b-09f4-42f8-bf36-f347c6753c5d', 'stu_sub_1788719351345@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:29:11.541Z'::timestamptz, '2026-09-06T18:29:11.541Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('f0a85291-3e4b-46c0-bac8-11cd83b8b8a7', 'stu_sub_1788719355031_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:29:15.093Z'::timestamptz, '2026-09-06T18:29:15.093Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('cef1cd12-aca7-42a7-9d42-b108f505bb40', 'stu_sub_1788719386168@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:29:46.435Z'::timestamptz, '2026-09-06T18:29:46.435Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('a7f31518-10a9-49ca-9d04-98a615ab09d1', 'stu_sub_1788719389699_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:29:49.782Z'::timestamptz, '2026-09-06T18:29:49.782Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('b033464d-4ae2-4c3c-a60a-c750f8d8a360', 'auth_test_1788719410838@university.edu', 'Morgan Taylor', 'student', '51f8518985ee0afa9e37c88a40df6ff41fb7c0691b740ea43a5dea89e6a13b84', FALSE, TRUE, '2026-09-06T18:30:11.151Z'::timestamptz, '2026-09-06T18:30:11.151Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('7997db7c-cb68-4bd0-9c76-20265c74c400', 'student_tester_1788719418136@university.edu', 'Alex Rivera', 'student', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', FALSE, TRUE, '2026-09-06T18:30:18.372Z'::timestamptz, '2026-09-06T18:30:18.372Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'stu_sub_1788719446586@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:30:46.989Z'::timestamptz, '2026-09-06T18:30:46.989Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('582b9bf3-b005-4cb2-aa41-67039b31ab39', 'stu_sub_1788719452697_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:30:52.842Z'::timestamptz, '2026-09-06T18:30:52.842Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'stu_sub_1788720465597@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:47:46.241Z'::timestamptz, '2026-09-06T18:47:46.241Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('8661e4c3-63e3-4b94-a633-fbc69e8c6f6b', 'stu_sub_1788720476623_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:47:56.821Z'::timestamptz, '2026-09-06T18:47:56.821Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'stu_sub_1788720553251@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:49:13.807Z'::timestamptz, '2026-09-06T18:49:13.807Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('9d999600-861d-400a-881f-56047f070c2d', 'stu_sub_1788720560509_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T18:49:20.591Z'::timestamptz, '2026-09-06T18:49:20.591Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('0a0468cf-782f-4a7f-a074-bcb30953034f', 'stu_sub_1788721337219@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T19:02:18.042Z'::timestamptz, '2026-09-06T19:02:18.042Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('d678f559-25d4-4deb-a326-becd40b625cd', 'stu_sub_1788721353952_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T19:02:34.117Z'::timestamptz, '2026-09-06T19:02:34.117Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('e8c4e8db-589f-4779-8030-19278dd9604f', 'stu_sg_new_1788723328647@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:35:31.055Z'::timestamptz, '2026-09-06T19:35:31.055Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('ea7f3d3d-9c54-4e4f-8344-a53e30cc3733', 'stu_sg_docs_1788723336532@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:35:37.800Z'::timestamptz, '2026-09-06T19:35:37.800Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('e494b72d-5cc3-4529-b7c1-325bdde8d3b9', 'stu_sg_new_1788723439785@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:37:20.566Z'::timestamptz, '2026-09-06T19:37:20.566Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('140cd76f-b211-4440-890b-842bb920f09a', 'stu_sg_docs_1788723440919@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:37:21.013Z'::timestamptz, '2026-09-06T19:37:21.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('8c43cac4-30d2-49b2-9255-5bacfb4addfe', 'stu_sg_new_1788723505732@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:38:28.168Z'::timestamptz, '2026-09-06T19:38:28.168Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('8b3b5657-84e6-4d60-bf0c-600ada05a8fa', 'stu_sg_docs_1788723509830@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:38:30.376Z'::timestamptz, '2026-09-06T19:38:30.376Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('b665a750-86dc-42c3-a82d-bfd9713504ae', 'stu_sg_new_1788723600968@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:40:03.083Z'::timestamptz, '2026-09-06T19:40:03.083Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('d22bea3c-6824-4e33-8fc0-af5202b8f232', 'stu_sg_docs_1788723603750@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:40:03.915Z'::timestamptz, '2026-09-06T19:40:03.915Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'stu_sub_1788723649102@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T19:40:49.959Z'::timestamptz, '2026-09-06T19:40:49.959Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('4819192d-f052-4b49-b59f-382c641bea40', 'stu_sub_1788723672154_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T19:41:12.393Z'::timestamptz, '2026-09-06T19:41:12.393Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('92e4d50f-4507-4553-b0c5-80cc1248c565', 'stu_sg_new_1788723900365@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:45:01.118Z'::timestamptz, '2026-09-06T19:45:01.118Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('4859802f-6450-4312-8cee-e924b09d25d9', 'stu_sg_docs_1788723904291@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-06T19:45:05.269Z'::timestamptz, '2026-09-06T19:45:05.269Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('93a31505-b421-4f59-8a4d-0643583ac876', 'stu_sub_1788723966626@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T19:46:07.063Z'::timestamptz, '2026-09-06T19:46:07.063Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('1cc02495-f0bd-4607-baae-7d6e33937436', 'stu_sub_1788723992187_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-06T19:46:32.448Z'::timestamptz, '2026-09-06T19:46:32.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('b55e113d-cbbb-45b1-8a43-91bb65b153c6', 'stu_learn_new_1788776603998@skillbridge.edu', 'Alex Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T10:23:25.797Z'::timestamptz, '2026-09-07T10:23:25.797Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('fd80a280-5090-4a6e-8aa2-00a3539f576a', 'stu_learn_docs_1788776611830@skillbridge.edu', 'Casey Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T10:23:32.179Z'::timestamptz, '2026-09-07T10:23:32.179Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('12227163-4d90-4444-b622-a48e9aeb4814', 'stu_learn_new_1788776664715@skillbridge.edu', 'Alex Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T10:24:24.931Z'::timestamptz, '2026-09-07T10:24:24.931Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'stu_learn_docs_1788776665450@skillbridge.edu', 'Casey Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T10:24:25.500Z'::timestamptz, '2026-09-07T10:24:25.500Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('851d6691-2b0e-43b7-9987-8d105c8030b0', 'stu_sg_new_1788776686942@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-07T10:24:47.300Z'::timestamptz, '2026-09-07T10:24:47.300Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('816aa5be-4222-4106-854f-93fe0d91d672', 'stu_sg_docs_1788776687636@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-07T10:24:47.765Z'::timestamptz, '2026-09-07T10:24:47.765Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('73d76d6b-6353-4260-a8be-605ca72c9b12', 'stu_sub_1788776703682@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-07T10:25:03.927Z'::timestamptz, '2026-09-07T10:25:03.927Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('642e8d4a-02c6-4ef1-9305-71f5ab337fdf', 'stu_learn_new_1788777971594@skillbridge.edu', 'Alex Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T10:46:12.174Z'::timestamptz, '2026-09-07T10:46:12.174Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('17752966-0044-48e3-b3aa-d1fe9caa76b3', 'stu_learn_docs_1788777972960@skillbridge.edu', 'Casey Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T10:46:13.026Z'::timestamptz, '2026-09-07T10:46:13.026Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('bceb63af-15b9-4170-9f05-e5557b0455d7', 'stu_live_yt_1788778036017@skillbridge.edu', 'Live Test Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-07T10:47:16.311Z'::timestamptz, '2026-09-07T10:47:16.311Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('b796fd6a-3bbe-4774-81e2-3188c08cc199', 'stu_learn_new_1788778073598@skillbridge.edu', 'Alex Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T10:47:53.939Z'::timestamptz, '2026-09-07T10:47:53.939Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'stu_learn_docs_1788778074706@skillbridge.edu', 'Casey Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T10:47:54.798Z'::timestamptz, '2026-09-07T10:47:54.798Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('97e4bc43-4edc-42b5-a4c6-ffed46e62ad5', 'stu_sg_new_1788778105603@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-07T10:48:25.920Z'::timestamptz, '2026-09-07T10:48:25.920Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('aef429b8-8a1e-48c8-95e8-fb0f60f4dd64', 'stu_sg_docs_1788778106464@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-07T10:48:26.564Z'::timestamptz, '2026-09-07T10:48:26.564Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'stu_sub_1788778124240@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-07T10:48:44.474Z'::timestamptz, '2026-09-07T10:48:44.474Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('2253d9cb-c0f9-444d-9168-f6944613153d', 'auth_test_1788779554065@university.edu', 'Morgan Taylor', 'student', '51f8518985ee0afa9e37c88a40df6ff41fb7c0691b740ea43a5dea89e6a13b84', FALSE, TRUE, '2026-09-07T11:12:34.377Z'::timestamptz, '2026-09-07T11:12:34.377Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('f07d3169-0d40-4abf-9a20-f9c8c9410147', 'stu_learn_new_1788779559125@skillbridge.edu', 'Alex Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T11:12:39.291Z'::timestamptz, '2026-09-07T11:12:39.291Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('43a69d7a-8521-41eb-ade3-8659f17099e2', 'stu_learn_docs_1788779559847@skillbridge.edu', 'Casey Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T11:12:40.004Z'::timestamptz, '2026-09-07T11:12:40.004Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('38d2becc-d560-4147-ba0c-4f383151e6b5', 'stu_sg_new_1788779587894@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-07T11:13:08.140Z'::timestamptz, '2026-09-07T11:13:08.140Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('8380562e-d947-4e94-b4d1-ec1098116374', 'stu_sg_docs_1788779588560@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-07T11:13:08.693Z'::timestamptz, '2026-09-07T11:13:08.693Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'stu_sub_1788779634033@skillbridge.edu', 'Alex Student', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-07T11:13:54.264Z'::timestamptz, '2026-09-07T11:13:54.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('4a2d163a-a0c5-4340-bd0c-3d4739b84b0d', 'stu_sub_1788779644841_attacker@skillbridge.edu', 'Bob Stranger', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-07T11:14:05.177Z'::timestamptz, '2026-09-07T11:14:05.177Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_new_1788782306568', 'test_student_new_1788782306568@test.edu', 'New Student', 'student', 'h', FALSE, TRUE, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_adv_1788782306568', 'test_student_adv_1788782306568@test.edu', 'Advanced Student', 'student', 'h', FALSE, TRUE, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_learn_1788782306568', 'test_student_learn_1788782306568@test.edu', 'Learning Student', 'student', 'h', FALSE, TRUE, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_b_1788782306568', 'test_student_b_1788782306568@test.edu', 'Student B', 'student', 'h', FALSE, TRUE, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_14_1788782327573', 'test_student_14_1788782327573@test.edu', 'Student 14', 'student', 'h', FALSE, TRUE, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_unverified_1788782329542', 'test_unverified_1788782329542@test.edu', 'Unverified', 'student', 'h', FALSE, FALSE, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('72cc913b-0056-41e0-b720-7f51a7a4d1cf', 'stu_learn_new_1788782345062@skillbridge.edu', 'Alex Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T11:59:05.748Z'::timestamptz, '2026-09-07T11:59:05.748Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('fbc5a09c-460f-44d9-afd1-9b409492ea36', 'stu_learn_docs_1788782347912@skillbridge.edu', 'Casey Learner', 'student', 'ff7bd97b1a7789ddd2775122fd6817f3173672da9f802ceec57f284325bf589f', FALSE, TRUE, '2026-09-07T11:59:08.020Z'::timestamptz, '2026-09-07T11:59:08.020Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('828ee046-631a-4e46-8275-ff169db029a5', 'stu_sg_new_1788782376226@skillbridge.edu', 'Alice Student 1', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-07T11:59:36.410Z'::timestamptz, '2026-09-07T11:59:36.410Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('c99a6d29-97eb-4b09-9651-fef8df5e9df4', 'stu_sg_docs_1788782376852@skillbridge.edu', 'Bob Student 2', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, FALSE, '2026-09-07T11:59:36.944Z'::timestamptz, '2026-09-07T11:59:36.944Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_new_1788782599801', 'test_student_new_1788782599801@test.edu', 'New Student', 'student', 'h', FALSE, TRUE, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_adv_1788782599801', 'test_student_adv_1788782599801@test.edu', 'Advanced Student', 'student', 'h', FALSE, TRUE, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_learn_1788782599801', 'test_student_learn_1788782599801@test.edu', 'Learning Student', 'student', 'h', FALSE, TRUE, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_b_1788782599801', 'test_student_b_1788782599801@test.edu', 'Student B', 'student', 'h', FALSE, TRUE, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_14_1788782607685', 'test_student_14_1788782607685@test.edu', 'Student 14', 'student', 'h', FALSE, TRUE, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_unverified_1788782609452', 'test_unverified_1788782609452@test.edu', 'Unverified', 'student', 'h', FALSE, FALSE, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784103103', 'stu_34_new_1788784103103@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784103103', 'stu_34_adv_1788784103103@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784103103', 'stu_34_lrn_1788784103103@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784103103', 'stu_34_other_1788784103103@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784129009', 'stu_34_new_1788784129009@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784129009', 'stu_34_adv_1788784129009@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784129009', 'stu_34_lrn_1788784129009@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784129009', 'stu_34_other_1788784129009@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784159011', 'stu_34_new_1788784159011@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784159011', 'stu_34_adv_1788784159011@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784159011', 'stu_34_lrn_1788784159011@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784159011', 'stu_34_other_1788784159011@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784192714', 'stu_34_new_1788784192714@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784192714', 'stu_34_adv_1788784192714@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784192714', 'stu_34_lrn_1788784192714@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784192714', 'stu_34_other_1788784192714@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784312511', 'stu_34_new_1788784312511@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784312511', 'stu_34_adv_1788784312511@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784312511', 'stu_34_lrn_1788784312511@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784312511', 'stu_34_other_1788784312511@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784335671', 'stu_34_new_1788784335671@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784335671', 'stu_34_adv_1788784335671@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784335671', 'stu_34_lrn_1788784335671@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784335671', 'stu_34_other_1788784335671@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784438121', 'stu_34_new_1788784438121@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784438121', 'stu_34_adv_1788784438121@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784438121', 'stu_34_lrn_1788784438121@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784438121', 'stu_34_other_1788784438121@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784460729', 'stu_34_new_1788784460729@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784460729', 'stu_34_adv_1788784460729@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784460729', 'stu_34_lrn_1788784460729@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784460729', 'stu_34_other_1788784460729@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784485808', 'stu_34_new_1788784485808@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784485808', 'stu_34_adv_1788784485808@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784485808', 'stu_34_lrn_1788784485808@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784485808', 'stu_34_other_1788784485808@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784515470', 'stu_34_new_1788784515470@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784515470', 'stu_34_adv_1788784515470@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784515470', 'stu_34_lrn_1788784515470@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784515470', 'stu_34_other_1788784515470@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784556639', 'stu_34_new_1788784556639@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784556639', 'stu_34_adv_1788784556639@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784556639', 'stu_34_other_1788784556639@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784583072', 'stu_34_new_1788784583072@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784583072', 'stu_34_adv_1788784583072@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784583072', 'stu_34_other_1788784583072@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784626397', 'stu_34_new_1788784626397@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784626397', 'stu_34_adv_1788784626397@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784626397', 'stu_34_other_1788784626397@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('bc5536f5-6bb5-4725-a9a5-3107e5cf7747', 'test_stu_1788784779050@university.edu', 'Jane Doe', 'student', 'a109e36947ad56de1dca1cc49f0ef8ac9ad9a7b1aa0df41fb3c4cb73c1ff01ea', FALSE, TRUE, '2026-09-07T12:39:40.465Z'::timestamptz, '2026-09-07T12:39:40.465Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_new_1788784801588', 'test_student_new_1788784801588@test.edu', 'New Student', 'student', 'h', FALSE, TRUE, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_adv_1788784801588', 'test_student_adv_1788784801588@test.edu', 'Advanced Student', 'student', 'h', FALSE, TRUE, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_learn_1788784801588', 'test_student_learn_1788784801588@test.edu', 'Learning Student', 'student', 'h', FALSE, TRUE, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('test_student_b_1788784801588', 'test_student_b_1788784801588@test.edu', 'Student B', 'student', 'h', FALSE, TRUE, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788784864571', 'stu_34_new_1788784864571@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788784864571', 'stu_34_adv_1788784864571@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788784864571', 'stu_34_other_1788784864571@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788787784013', 'stu_34_new_1788787784013@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788787784013', 'stu_34_adv_1788787784013@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788787784013', 'stu_34_other_1788787784013@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788787810448', 'stu_34_new_1788787810448@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788787810448', 'stu_34_adv_1788787810448@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788787810448', 'stu_34_other_1788787810448@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788806285059', 'stu_34_new_1788806285059@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788806285059', 'stu_34_adv_1788806285059@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788806285059', 'stu_34_other_1788806285059@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788806594421', 'stu_34_new_1788806594421@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788806594421', 'stu_34_adv_1788806594421@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788806594421', 'stu_34_other_1788806594421@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788808155355', 'stu_34_new_1788808155355@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788808155355', 'stu_34_adv_1788808155355@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788808155355', 'stu_34_other_1788808155355@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('1f80e367-38a7-43d0-9573-fb3d9215d64a', 'industry@gmail.com', 'Industry', 'industry', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', FALSE, TRUE, '2026-09-07T19:11:47.250Z'::timestamptz, '2026-09-07T19:11:47.250Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_new_1788809444883', 'stu_34_new_1788809444883@test.edu', 'New Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_adv_1788809444883', 'stu_34_adv_1788809444883@test.edu', 'Advanced Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883@test.edu', 'Learning Student 34', 'student', 'h', FALSE, TRUE, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('stu_34_other_1788809444883', 'stu_34_other_1788809444883@test.edu', 'Student B 34', 'student', 'h', FALSE, TRUE, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('1ff7662b-94c3-4c76-ac2d-039c6116499b', 'stud@edu.in', 'Student', 'student', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', FALSE, TRUE, '2026-09-08T11:47:54.784Z'::timestamptz, '2026-09-08T11:47:54.784Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('campus-user-1', 'placement@dtu.ac.in', 'DTU Placement Cell', 'campus', '097dc25b1d80d89da676d563806e42e61c8525a34dbcfb0c014f496ce02ceb28', FALSE, TRUE, '2026-09-08T18:39:00.508Z'::timestamptz, '2026-09-08T18:39:00.508Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('campus-user-2', 'placement@nit.edu', 'NIT Trichy Placement Cell', 'campus', '097dc25b1d80d89da676d563806e42e61c8525a34dbcfb0c014f496ce02ceb28', FALSE, TRUE, '2026-09-08T18:39:00.508Z'::timestamptz, '2026-09-08T18:39:00.508Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('bb3787c8-0320-43f1-8299-34723baa625e', 'bcahod@christcollegerajkot.edu.in', 'Dr. Shailendra sinh Jadeja', 'campus', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', FALSE, TRUE, '2026-09-09T11:00:39.264Z'::timestamptz, '2026-09-09T11:00:39.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('a6c59093-ddc8-40a9-97e2-ab63f3c4d37b', 'riddhi@christcollegerajkot.edu.in', 'Dr. Riddhi Tanna', 'faculty', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', FALSE, TRUE, '2026-09-09T17:53:09.111Z'::timestamptz, '2026-09-09T17:53:09.111Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES ('cadd3584-dcb6-46ec-b943-5a045c349ca3', 'stud1@gmail.com', 'stud1', 'student', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', FALSE, TRUE, '2026-09-12T18:02:15.776Z'::timestamptz, '2026-09-12T18:02:15.776Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;