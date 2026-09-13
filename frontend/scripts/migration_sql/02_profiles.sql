INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_admin-system-account-id', 'admin-system-account-id', 'student', '{"institution":"Skill-Bridge Central Administration","degree":"Executive Administration","graduationYear":"Permanent"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_2e1e1e0b-de7f-4a1d-aa15-138bb5182dfc', '2e1e1e0b-de7f-4a1d-aa15-138bb5182dfc', 'student', '{"institution":"National Institute of Technology","degree":"B.Tech Computer Science","graduationYear":"2026"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_11b3532a-57d5-4dad-9dff-637ad64ea73a', '11b3532a-57d5-4dad-9dff-637ad64ea73a', 'student', '{"institution":"Test Inst"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_9ad2244e-6b8a-428b-a163-ad10e5e5cb36', '9ad2244e-6b8a-428b-a163-ad10e5e5cb36', 'student', '{"institution":"Test Inst"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_f76b079d-7ccb-421d-a03a-8ea4ec79d6ce', 'f76b079d-7ccb-421d-a03a-8ea4ec79d6ce', 'student', '{"institution":"Test Inst"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_02113d58-64de-4f3a-b00d-33564eaa32c4', '02113d58-64de-4f3a-b00d-33564eaa32c4', 'student', '{"institution":"Test Inst"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_0402ec2d-30e3-4e4f-beb5-c71bb64679b9', '0402ec2d-30e3-4e4f-beb5-c71bb64679b9', 'student', '{"institution":"Test Inst"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_47fc1671-0e5d-4f66-af79-ca34f5e10ec5', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'student', '{"institution":"Christ College, Rajkot","degree":"BCA","graduationYear":"2028"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_cb380b28-3221-4e32-a232-47452d0e6eaf', 'cb380b28-3221-4e32-a232-47452d0e6eaf', 'student', '{"institution":"MIT","degree":"B.S. CS","graduationYear":"2026"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_9f777fbc-fc93-49cc-8e9c-cb9aa8953e4f', '9f777fbc-fc93-49cc-8e9c-cb9aa8953e4f', 'faculty', '{"institution":"MIT","department":"Computer Science","designation":"Prof"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_e93a2f49-3cc2-4f48-be9f-63f53dedae96', 'e93a2f49-3cc2-4f48-be9f-63f53dedae96', 'industry', '{"companyName":"tcs","industryDomain":"IT AND CONCULTANCY","workTitle":"CEO","description":"Leading technology and engineering solutions provider.","website":"https://www.tcs.com","location":"Tech Park, Bengaluru, Karnataka, India","demandedSkills":["TypeScript","Next.js","Cloud Infrastructure"],"updatedAt":"2026-09-07T19:30:24.476Z"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_7facd4ab-e160-47f0-909b-68388b9f4109', '7facd4ab-e160-47f0-909b-68388b9f4109', 'student', '{"institution":"Stanford","degree":"CS","graduationYear":"2025"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_864c1f98-d1f6-47a1-b587-ffd9c944b8c8', '864c1f98-d1f6-47a1-b587-ffd9c944b8c8', 'student', '{"department":"Computer Science & Engineering","course":"B.Tech CSE","semester":6,"rollNumber":"NIT-CSE-2022-042"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_f0c745e2-4519-4aeb-9b05-08bdb2bb5dc3', 'f0c745e2-4519-4aeb-9b05-08bdb2bb5dc3', 'student', '{"department":"Computer Science & Engineering","course":"B.Tech CSE","semester":6,"rollNumber":"NIT-CSE-2022-042"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_7e612090-1a8d-44bb-aed1-6f5c1aac02d8', '7e612090-1a8d-44bb-aed1-6f5c1aac02d8', 'student', '{"department":"Computer Science & Engineering","course":"B.Tech CSE","semester":6,"rollNumber":"NIT-CSE-2022-042"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_61fc49ae-2554-4e20-89bf-f042efff1c70', '61fc49ae-2554-4e20-89bf-f042efff1c70', 'student', '{"department":"Computer Science & Engineering","course":"B.Tech CSE","semester":6,"rollNumber":"NIT-CSE-2022-042"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_940f2d64-e9f4-419e-82fb-db243ddcbf9d', '940f2d64-e9f4-419e-82fb-db243ddcbf9d', 'student', '{"department":"Computer Science & Engineering","course":"B.Tech CSE","semester":6,"rollNumber":"NIT-CSE-2022-042"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_4b8cbdf6-f1d6-44a6-843a-da4a91dd5f29', '4b8cbdf6-f1d6-44a6-843a-da4a91dd5f29', 'student', '{"department":"Computer Science & Engineering","course":"B.Tech CSE","semester":6,"rollNumber":"NIT-CSE-2022-042"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_d1f7040d-4717-4c9f-bdbb-e30ee01be258', 'd1f7040d-4717-4c9f-bdbb-e30ee01be258', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_74830361-2f5c-41e1-8015-32e619f7dd19', '74830361-2f5c-41e1-8015-32e619f7dd19', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_9cba0a7d-dac0-4a2f-a178-6701ae6223df', '9cba0a7d-dac0-4a2f-a178-6701ae6223df', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_2f311123-9b7e-44cb-b301-84db1348c583', '2f311123-9b7e-44cb-b301-84db1348c583', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_6eadef1a-74b9-46c9-9df0-75da89fc0d2e', '6eadef1a-74b9-46c9-9df0-75da89fc0d2e', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_650ace9b-e92f-444f-8171-1b374d4b9cb3', '650ace9b-e92f-444f-8171-1b374d4b9cb3', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_3a119ac7-8677-4de4-804f-9ffe2ecc3c99', '3a119ac7-8677-4de4-804f-9ffe2ecc3c99', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_3ae769d8-3e5c-4fbc-b5ca-7dc671e48ea8', '3ae769d8-3e5c-4fbc-b5ca-7dc671e48ea8', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_b1b345d6-b049-453b-8c37-3966f24cee64', 'b1b345d6-b049-453b-8c37-3966f24cee64', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_813abdd7-6fec-45aa-ba13-969be09c5540', '813abdd7-6fec-45aa-ba13-969be09c5540', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_6b9225d4-9b3b-4370-9526-88036dbe664c', '6b9225d4-9b3b-4370-9526-88036dbe664c', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_6d7e3a9c-8734-40df-8966-8e342ccda220', '6d7e3a9c-8734-40df-8966-8e342ccda220', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_44e38fbf-5828-42e3-b9c2-e27fbcadbe1c', '44e38fbf-5828-42e3-b9c2-e27fbcadbe1c', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_a8091b49-aaf2-4913-b9eb-d4113aba9d13', 'a8091b49-aaf2-4913-b9eb-d4113aba9d13', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'd07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_9801387f-5d25-4809-bb25-1c6a416bacc9', '9801387f-5d25-4809-bb25-1c6a416bacc9', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_a9d1f9d2-3fda-4491-89bc-32c384eca475', 'a9d1f9d2-3fda-4491-89bc-32c384eca475', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_f0a85291-3e4b-46c0-bac8-11cd83b8b8a7', 'f0a85291-3e4b-46c0-bac8-11cd83b8b8a7', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_a7f31518-10a9-49ca-9d04-98a615ab09d1', 'a7f31518-10a9-49ca-9d04-98a615ab09d1', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_b033464d-4ae2-4c3c-a60a-c750f8d8a360', 'b033464d-4ae2-4c3c-a60a-c750f8d8a360', 'student', '{"institution":"Stanford","degree":"CS","graduationYear":"2025"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_7997db7c-cb68-4bd0-9c76-20265c74c400', '7997db7c-cb68-4bd0-9c76-20265c74c400', 'student', '{"department":"Computer Science & Engineering","course":"B.Tech CSE","semester":6,"rollNumber":"NIT-CSE-2022-042"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_582b9bf3-b005-4cb2-aa41-67039b31ab39', '582b9bf3-b005-4cb2-aa41-67039b31ab39', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_8661e4c3-63e3-4b94-a633-fbc69e8c6f6b', '8661e4c3-63e3-4b94-a633-fbc69e8c6f6b', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_9d999600-861d-400a-881f-56047f070c2d', '9d999600-861d-400a-881f-56047f070c2d', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_d678f559-25d4-4deb-a326-becd40b625cd', 'd678f559-25d4-4deb-a326-becd40b625cd', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_e8c4e8db-589f-4779-8030-19278dd9604f', 'e8c4e8db-589f-4779-8030-19278dd9604f', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_ea7f3d3d-9c54-4e4f-8344-a53e30cc3733', 'ea7f3d3d-9c54-4e4f-8344-a53e30cc3733', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_e494b72d-5cc3-4529-b7c1-325bdde8d3b9', 'e494b72d-5cc3-4529-b7c1-325bdde8d3b9', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_140cd76f-b211-4440-890b-842bb920f09a', '140cd76f-b211-4440-890b-842bb920f09a', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_8c43cac4-30d2-49b2-9255-5bacfb4addfe', '8c43cac4-30d2-49b2-9255-5bacfb4addfe', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_8b3b5657-84e6-4d60-bf0c-600ada05a8fa', '8b3b5657-84e6-4d60-bf0c-600ada05a8fa', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_b665a750-86dc-42c3-a82d-bfd9713504ae', 'b665a750-86dc-42c3-a82d-bfd9713504ae', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_d22bea3c-6824-4e33-8fc0-af5202b8f232', 'd22bea3c-6824-4e33-8fc0-af5202b8f232', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_4819192d-f052-4b49-b59f-382c641bea40', '4819192d-f052-4b49-b59f-382c641bea40', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_92e4d50f-4507-4553-b0c5-80cc1248c565', '92e4d50f-4507-4553-b0c5-80cc1248c565', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_4859802f-6450-4312-8cee-e924b09d25d9', '4859802f-6450-4312-8cee-e924b09d25d9', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_1cc02495-f0bd-4607-baae-7d6e33937436', '1cc02495-f0bd-4607-baae-7d6e33937436', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_b55e113d-cbbb-45b1-8a43-91bb65b153c6', 'b55e113d-cbbb-45b1-8a43-91bb65b153c6', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_fd80a280-5090-4a6e-8aa2-00a3539f576a', 'fd80a280-5090-4a6e-8aa2-00a3539f576a', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_12227163-4d90-4444-b622-a48e9aeb4814', '12227163-4d90-4444-b622-a48e9aeb4814', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_851d6691-2b0e-43b7-9987-8d105c8030b0', '851d6691-2b0e-43b7-9987-8d105c8030b0', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_816aa5be-4222-4106-854f-93fe0d91d672', '816aa5be-4222-4106-854f-93fe0d91d672', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_642e8d4a-02c6-4ef1-9305-71f5ab337fdf', '642e8d4a-02c6-4ef1-9305-71f5ab337fdf', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_17752966-0044-48e3-b3aa-d1fe9caa76b3', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_bceb63af-15b9-4170-9f05-e5557b0455d7', 'bceb63af-15b9-4170-9f05-e5557b0455d7', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_b796fd6a-3bbe-4774-81e2-3188c08cc199', 'b796fd6a-3bbe-4774-81e2-3188c08cc199', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_97e4bc43-4edc-42b5-a4c6-ffed46e62ad5', '97e4bc43-4edc-42b5-a4c6-ffed46e62ad5', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_aef429b8-8a1e-48c8-95e8-fb0f60f4dd64', 'aef429b8-8a1e-48c8-95e8-fb0f60f4dd64', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_2253d9cb-c0f9-444d-9168-f6944613153d', '2253d9cb-c0f9-444d-9168-f6944613153d', 'student', '{"institution":"Stanford","degree":"CS","graduationYear":"2025"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_f07d3169-0d40-4abf-9a20-f9c8c9410147', 'f07d3169-0d40-4abf-9a20-f9c8c9410147', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_43a69d7a-8521-41eb-ade3-8659f17099e2', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_38d2becc-d560-4147-ba0c-4f383151e6b5', '38d2becc-d560-4147-ba0c-4f383151e6b5', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_8380562e-d947-4e94-b4d1-ec1098116374', '8380562e-d947-4e94-b4d1-ec1098116374', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_4a2d163a-a0c5-4340-bd0c-3d4739b84b0d', '4a2d163a-a0c5-4340-bd0c-3d4739b84b0d', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_72cc913b-0056-41e0-b720-7f51a7a4d1cf', '72cc913b-0056-41e0-b720-7f51a7a4d1cf', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_fbc5a09c-460f-44d9-afd1-9b409492ea36', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_828ee046-631a-4e46-8275-ff169db029a5', '828ee046-631a-4e46-8275-ff169db029a5', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_c99a6d29-97eb-4b09-9651-fef8df5e9df4', 'c99a6d29-97eb-4b09-9651-fef8df5e9df4', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784103103', 'stu_34_new_1788784103103', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784103103', 'stu_34_adv_1788784103103', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784103103', 'stu_34_lrn_1788784103103', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784103103', 'stu_34_other_1788784103103', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784129009', 'stu_34_new_1788784129009', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784129009', 'stu_34_adv_1788784129009', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784129009', 'stu_34_lrn_1788784129009', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784129009', 'stu_34_other_1788784129009', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784159011', 'stu_34_new_1788784159011', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784159011', 'stu_34_adv_1788784159011', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784159011', 'stu_34_lrn_1788784159011', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784159011', 'stu_34_other_1788784159011', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784192714', 'stu_34_new_1788784192714', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784192714', 'stu_34_adv_1788784192714', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784192714', 'stu_34_lrn_1788784192714', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784192714', 'stu_34_other_1788784192714', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784312511', 'stu_34_new_1788784312511', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784312511', 'stu_34_adv_1788784312511', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784312511', 'stu_34_lrn_1788784312511', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784312511', 'stu_34_other_1788784312511', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784335671', 'stu_34_new_1788784335671', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784335671', 'stu_34_adv_1788784335671', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784335671', 'stu_34_lrn_1788784335671', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784335671', 'stu_34_other_1788784335671', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784438121', 'stu_34_new_1788784438121', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784438121', 'stu_34_adv_1788784438121', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784438121', 'stu_34_lrn_1788784438121', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784438121', 'stu_34_other_1788784438121', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784460729', 'stu_34_new_1788784460729', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784460729', 'stu_34_adv_1788784460729', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784460729', 'stu_34_lrn_1788784460729', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784460729', 'stu_34_other_1788784460729', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784485808', 'stu_34_new_1788784485808', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784485808', 'stu_34_adv_1788784485808', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784485808', 'stu_34_lrn_1788784485808', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784485808', 'stu_34_other_1788784485808', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784515470', 'stu_34_new_1788784515470', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784515470', 'stu_34_adv_1788784515470', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784515470', 'stu_34_lrn_1788784515470', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784515470', 'stu_34_other_1788784515470', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784556639', 'stu_34_new_1788784556639', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784556639', 'stu_34_adv_1788784556639', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784556639', 'stu_34_other_1788784556639', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784583072', 'stu_34_new_1788784583072', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784583072', 'stu_34_adv_1788784583072', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784583072', 'stu_34_other_1788784583072', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784626397', 'stu_34_new_1788784626397', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784626397', 'stu_34_adv_1788784626397', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784626397', 'stu_34_other_1788784626397', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_bc5536f5-6bb5-4725-a9a5-3107e5cf7747', 'bc5536f5-6bb5-4725-a9a5-3107e5cf7747', 'student', '{}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788784864571', 'stu_34_new_1788784864571', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788784864571', 'stu_34_adv_1788784864571', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788784864571', 'stu_34_other_1788784864571', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788787784013', 'stu_34_new_1788787784013', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788787784013', 'stu_34_adv_1788787784013', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788787784013', 'stu_34_other_1788787784013', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788787810448', 'stu_34_new_1788787810448', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788787810448', 'stu_34_adv_1788787810448', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788787810448', 'stu_34_other_1788787810448', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788806285059', 'stu_34_new_1788806285059', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788806285059', 'stu_34_adv_1788806285059', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788806285059', 'stu_34_other_1788806285059', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788806594421', 'stu_34_new_1788806594421', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788806594421', 'stu_34_adv_1788806594421', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788806594421', 'stu_34_other_1788806594421', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788808155355', 'stu_34_new_1788808155355', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788808155355', 'stu_34_adv_1788808155355', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788808155355', 'stu_34_other_1788808155355', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_1f80e367-38a7-43d0-9573-fb3d9215d64a', '1f80e367-38a7-43d0-9573-fb3d9215d64a', 'industry', '{"companyName":"Industry","industryDomain":"IT AND CONCULTANCY","workTitle":"Talent Finder Officer","description":"We are Charlie Kirk","website":"http://localhost:3000/industry?view=profile","contactEmail":"industry@gmail.com","contactPhone":"1234567890","location":"51, Munjka, Rajkot(360005)","contactPerson":"Mr. Tuff","demandedSkills":["Python","Ai Automation","Penetration Tester","DevOps","Full-Stack","Frontend","Backend","UI/UX"],"companySize":"50-250 Employees","foundedYear":"","updatedAt":"2026-09-07T19:17:16.098Z"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_new_1788809444883', 'stu_34_new_1788809444883', 'student', '{"phone":"+1-555-010-0001","fullName":"New Student 34"}'::jsonb, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_adv_1788809444883', 'stu_34_adv_1788809444883', 'student', '{"phone":"+1-555-010-0002","fullName":"Advanced Student 34"}'::jsonb, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883', 'student', '{"phone":"+1-555-010-0003","fullName":"Learning Student 34"}'::jsonb, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_stu_34_other_1788809444883', 'stu_34_other_1788809444883', 'student', '{"phone":"+1-555-010-0004","fullName":"Student B 34"}'::jsonb, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_1ff7662b-94c3-4c76-ac2d-039c6116499b', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 'student', '{"institution":"Stud","degree":"BCA","graduationYear":"2028"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_campus-user-1', 'campus-user-1', 'campus', '{"institutionName":"Delhi Technological University","institutionCode":"DTU-001","type":"University","address":"Campus Road","city":"Delhi","state":"Delhi","country":"India","website":"https://dtu.ac.in","contactEmail":"placement@dtu.ac.in","contactPhone":"+91-11-12345678","establishedYear":"1941","accreditation":["AICTE","NBA","NAAC A+"],"departments":["Computer Science","Information Technology","Electronics","Mechanical","Civil"],"approvedIntake":1200}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_campus-user-2', 'campus-user-2', 'campus', '{"institutionName":"National Institute of Technology, Trichy","institutionCode":"NIT-001","type":"University","address":"Campus Road","city":"Trichy","state":"Tamil Nadu","country":"India","website":"https://nitt.edu","contactEmail":"placement@nit.edu","contactPhone":"+91-11-12345678","establishedYear":"1941","accreditation":["AICTE","NBA","NAAC A+"],"departments":["Computer Science","Information Technology","Electronics","Mechanical","Civil"],"approvedIntake":1200}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_bb3787c8-0320-43f1-8299-34723baa625e', 'bb3787c8-0320-43f1-8299-34723baa625e', 'campus', '{"institution":"Christ College, Rajkot","campusCode":"C-906","officialTitle":"HOD"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_a6c59093-ddc8-40a9-97e2-ab63f3c4d37b', 'a6c59093-ddc8-40a9-97e2-ab63f3c4d37b', 'faculty', '{"institution":"Christ College, Rajkot","department":"BCA","designation":"C-906","phone":"+91 1234567890","officeLocation":"Christ College, Rajkot","bio":"Faculty mentor focusing on algorithms, distributed computing, and student career readiness.","updatedAt":"2026-09-09T17:55:56.274Z"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES ('prof_cadd3584-dcb6-46ec-b943-5a045c349ca3', 'cadd3584-dcb6-46ec-b943-5a045c349ca3', 'student', '{"institution":"Christ College, Rajkot","degree":"BAHM","graduationYear":"2028"}'::jsonb, '2026-09-01T00:00:00.000Z'::timestamptz, '2026-09-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;