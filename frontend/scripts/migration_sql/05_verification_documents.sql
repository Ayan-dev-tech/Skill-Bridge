INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('7a47477b-d4e0-421a-a1f8-db0f5e7828f9', 'sv_47fc1671-0e5d-4f66-af79-ca34f5e10ec5', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'academic_transcript', NULL, '12.jpeg', 'image/jpeg', 236429, 'student/47fc1671-0e5d-4f66-af79-ca34f5e10ec5/verification/7a47477b-d4e0-421a-a1f8-db0f5e7828f9/academic_transcript_1788693864866.jpeg', 'completed', '2026-09-06T11:24:34.310Z'::timestamptz, '2026-09-06T19:49:51.151Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('e99c6143-388f-4100-9f1f-5320b70f607b', 'sv_47fc1671-0e5d-4f66-af79-ca34f5e10ec5', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'student_id', NULL, '12.jpeg', 'image/jpeg', 236429, 'student/47fc1671-0e5d-4f66-af79-ca34f5e10ec5/verification/e99c6143-388f-4100-9f1f-5320b70f607b/student_id_1788693882522.jpeg', 'completed', '2026-09-06T11:24:49.750Z'::timestamptz, '2026-09-06T19:49:51.151Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('39c83b6c-044d-43b5-831a-a6a95e67100e', 'sv_47fc1671-0e5d-4f66-af79-ca34f5e10ec5', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'passport_photo', NULL, 'Passport size photo.jpeg', 'image/jpeg', 115729, 'student/47fc1671-0e5d-4f66-af79-ca34f5e10ec5/documents/passport_photo/39c83b6c-044d-43b5-831a-a6a95e67100e/passport_photo_1788719782813.jpeg', 'completed', '2026-09-06T18:36:22.879Z'::timestamptz, '2026-09-06T19:49:51.151Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('110a3ab9-05d7-48be-a497-ac135cec44ab', 'sv_47fc1671-0e5d-4f66-af79-ca34f5e10ec5', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'post_graduation_marksheet', 'post_graduation_marksheet', '12.jpeg', 'image/jpeg', 236429, 'student/47fc1671-0e5d-4f66-af79-ca34f5e10ec5/documents/post_graduation_marksheet/110a3ab9-05d7-48be-a497-ac135cec44ab/post_graduation_marksheet_1788719826577.jpeg', 'completed', '2026-09-06T18:37:06.621Z'::timestamptz, '2026-09-06T19:49:51.151Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5abbfdb5-86fb-40c0-83f0-0ce6e176c669', 'sv_47fc1671-0e5d-4f66-af79-ca34f5e10ec5', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'abc_id', NULL, 'id card.png', 'image/png', 672388, 'student/47fc1671-0e5d-4f66-af79-ca34f5e10ec5/documents/abc_id/5abbfdb5-86fb-40c0-83f0-0ce6e176c669/abc_id_1788721952200.png', 'completed', '2026-09-06T19:12:32.232Z'::timestamptz, '2026-09-06T19:49:51.151Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('56be9889-d9fa-4f8d-80b6-6f8f2bbc94b6', 'sv_2f311123-9b7e-44cb-b301-84db1348c583', '2f311123-9b7e-44cb-b301-84db1348c583', 'student_id', NULL, 'valid_student_id.png', 'image/png', 7901, 'student/2f311123-9b7e-44cb-b301-84db1348c583/verification/56be9889-d9fa-4f8d-80b6-6f8f2bbc94b6/student_id_1788693381355.png', 'completed', '2026-09-06T11:16:25.645Z'::timestamptz, '2026-09-09T18:19:08.827Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('1e1704b8-aa63-48fc-9380-36c5a101d340', 'sv_b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'student_id', NULL, 'valid_student_id.png', 'image/png', 7901, 'student/b26413bf-4f15-4d88-945d-ff4e6d2c8b5d/verification/1e1704b8-aa63-48fc-9380-36c5a101d340/student_id_1788693420799.png', 'completed', '2026-09-06T11:17:06.692Z'::timestamptz, '2026-09-09T18:19:14.037Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5bf249be-1c1b-405b-9d19-4492537401f9', 'sv_b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'b26413bf-4f15-4d88-945d-ff4e6d2c8b5d', 'academic_transcript', NULL, 'valid_transcript.png', 'image/png', 7959, 'student/b26413bf-4f15-4d88-945d-ff4e6d2c8b5d/verification/5bf249be-1c1b-405b-9d19-4492537401f9/academic_transcript_1788693426784.png', 'completed', '2026-09-06T11:17:12.178Z'::timestamptz, '2026-09-09T18:19:14.037Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('26a9fcc9-a1c1-40c7-aeb5-e3a6fd785486', 'sv_6eadef1a-74b9-46c9-9df0-75da89fc0d2e', '6eadef1a-74b9-46c9-9df0-75da89fc0d2e', 'student_id', NULL, 'valid_student_id.png', 'image/png', 7901, 'student/6eadef1a-74b9-46c9-9df0-75da89fc0d2e/verification/26a9fcc9-a1c1-40c7-aeb5-e3a6fd785486/student_id_1788693550486.png', 'completed', '2026-09-06T11:19:16.302Z'::timestamptz, '2026-09-06T11:19:23.367Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('409e2571-1514-4564-bc0f-8c4ae030c02b', 'sv_6eadef1a-74b9-46c9-9df0-75da89fc0d2e', '6eadef1a-74b9-46c9-9df0-75da89fc0d2e', 'academic_transcript', NULL, 'valid_transcript.png', 'image/png', 7959, 'student/6eadef1a-74b9-46c9-9df0-75da89fc0d2e/verification/409e2571-1514-4564-bc0f-8c4ae030c02b/academic_transcript_1788693556432.png', 'completed', '2026-09-06T11:19:22.483Z'::timestamptz, '2026-09-06T11:19:23.367Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('fd5d6895-69b1-487a-9f57-ea43f491e0ff', 'sv_650ace9b-e92f-444f-8171-1b374d4b9cb3', '650ace9b-e92f-444f-8171-1b374d4b9cb3', 'student_id', NULL, 'valid_student_id.png', 'image/png', 7901, 'student/650ace9b-e92f-444f-8171-1b374d4b9cb3/verification/fd5d6895-69b1-487a-9f57-ea43f491e0ff/student_id_1788693761341.png', 'completed', '2026-09-06T11:22:44.893Z'::timestamptz, '2026-09-06T11:22:49.113Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b113a6aa-7707-431c-8935-0bc47c037f6c', 'sv_650ace9b-e92f-444f-8171-1b374d4b9cb3', '650ace9b-e92f-444f-8171-1b374d4b9cb3', 'academic_transcript', NULL, 'valid_transcript.png', 'image/png', 7959, 'student/650ace9b-e92f-444f-8171-1b374d4b9cb3/verification/b113a6aa-7707-431c-8935-0bc47c037f6c/academic_transcript_1788693765057.png', 'completed', '2026-09-06T11:22:48.828Z'::timestamptz, '2026-09-06T11:22:49.113Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('0cee7964-f17e-444b-b313-56fd2cbf4c6f', 'sv_a8091b49-aaf2-4913-b9eb-d4113aba9d13', 'a8091b49-aaf2-4913-b9eb-d4113aba9d13', 'academic_certifications', NULL, 'cert_4.5mb.jpg', 'image/jpeg', 4718592, 'student/a8091b49-aaf2-4913-b9eb-d4113aba9d13/documents/academic_certifications/0cee7964-f17e-444b-b313-56fd2cbf4c6f/academic_certifications_1788719170772.jpg', 'completed', '2026-09-06T18:26:10.784Z'::timestamptz, '2026-09-09T18:19:12.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('fc8f9aa1-cbed-41a1-88d7-70a298950b0f', 'sv_d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'd07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'student_id', NULL, 'student_identity_card.png', 'image/png', 409600, 'student/d07bf4b2-d802-4259-a5ac-3f9f0c6253be/documents/student_id/fc8f9aa1-cbed-41a1-88d7-70a298950b0f/student_id_1788719229837.png', 'completed', '2026-09-06T18:27:09.842Z'::timestamptz, '2026-09-09T18:19:15.236Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('97221494-8d98-46c1-a494-13e35a1ab06f', 'sv_d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'd07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/d07bf4b2-d802-4259-a5ac-3f9f0c6253be/documents/passport_photo/97221494-8d98-46c1-a494-13e35a1ab06f/passport_photo_1788719229947.jpg', 'completed', '2026-09-06T18:27:09.951Z'::timestamptz, '2026-09-09T18:19:15.236Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('bcd8b671-9c03-4c59-b22f-23253aa3031f', 'sv_d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'd07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'post_graduation_marksheet', NULL, 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/d07bf4b2-d802-4259-a5ac-3f9f0c6253be/documents/post_graduation_marksheet/bcd8b671-9c03-4c59-b22f-23253aa3031f/post_graduation_marksheet_1788719230025.pdf', 'completed', '2026-09-06T18:27:10.029Z'::timestamptz, '2026-09-09T18:19:15.236Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('2c9efaec-f293-4174-8308-3db173a9f0bb', 'sv_d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'd07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'post_graduation_marksheet', NULL, 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/d07bf4b2-d802-4259-a5ac-3f9f0c6253be/documents/post_graduation_marksheet/2c9efaec-f293-4174-8308-3db173a9f0bb/post_graduation_marksheet_1788719230103.pdf', 'completed', '2026-09-06T18:27:10.108Z'::timestamptz, '2026-09-09T18:19:15.236Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('2715502a-24d1-43ea-a51d-6fd81850cc30', 'sv_d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'd07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'post_graduation_marksheet', NULL, 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/d07bf4b2-d802-4259-a5ac-3f9f0c6253be/documents/post_graduation_marksheet/2715502a-24d1-43ea-a51d-6fd81850cc30/post_graduation_marksheet_1788719230183.pdf', 'completed', '2026-09-06T18:27:10.186Z'::timestamptz, '2026-09-09T18:19:15.236Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('0aca2397-9869-4c2f-9f97-53ec3b15dd7c', 'sv_d07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'd07bf4b2-d802-4259-a5ac-3f9f0c6253be', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/d07bf4b2-d802-4259-a5ac-3f9f0c6253be/documents/abc_id/0aca2397-9869-4c2f-9f97-53ec3b15dd7c/abc_id_1788719230261.pdf', 'completed', '2026-09-06T18:27:10.263Z'::timestamptz, '2026-09-09T18:19:15.236Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('59f5d0d7-07af-4ee5-9c37-640e9c1cc353', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/student_id/59f5d0d7-07af-4ee5-9c37-640e9c1cc353/student_id_1788719262826.jpg', 'completed', '2026-09-06T18:27:42.829Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5c49476b-134f-45ee-85c7-c24683bfd8c3', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/passport_photo/5c49476b-134f-45ee-85c7-c24683bfd8c3/passport_photo_1788719258712.jpg', 'completed', '2026-09-06T18:27:38.730Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b4ff7908-f13c-4e24-9e91-328b55e349ca', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/post_graduation_marksheet/b4ff7908-f13c-4e24-9e91-328b55e349ca/post_graduation_marksheet_1788719259243.pdf', 'completed', '2026-09-06T18:27:39.284Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('dd5fce3d-4f99-4f24-8c7f-66af57fe5672', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/post_graduation_marksheet/dd5fce3d-4f99-4f24-8c7f-66af57fe5672/post_graduation_marksheet_1788719259677.pdf', 'completed', '2026-09-06T18:27:39.700Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('0e4ff977-a36a-4227-b665-a1747b0cbce7', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/post_graduation_marksheet/0e4ff977-a36a-4227-b665-a1747b0cbce7/post_graduation_marksheet_1788719260244.pdf', 'completed', '2026-09-06T18:27:40.258Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('45041359-0ca6-4133-86be-5d30aac5a9f2', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/abc_id/45041359-0ca6-4133-86be-5d30aac5a9f2/abc_id_1788719260425.pdf', 'completed', '2026-09-06T18:27:40.430Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('040f1c63-5e4a-4b1e-939f-a4f59965e5f9', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/academic_certifications/040f1c63-5e4a-4b1e-939f-a4f59965e5f9/academic_certifications_1788719260775.pdf', 'completed', '2026-09-06T18:27:40.783Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('92a4ba9b-ed7b-48a8-a8b3-b415e964049c', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/skill_certifications/92a4ba9b-ed7b-48a8-a8b3-b415e964049c/skill_certifications_1788719261445.pdf', 'completed', '2026-09-06T18:27:41.448Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('46c46f7c-892d-4b96-917a-0cca16bb1638', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/resume/46c46f7c-892d-4b96-917a-0cca16bb1638/resume_1788719261534.pdf', 'completed', '2026-09-06T18:27:41.542Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('7989a80e-bb48-4a62-877a-6681b3af8295', 'sv_2d7e4196-441f-4c66-84b0-d6cd40dc4214', '2d7e4196-441f-4c66-84b0-d6cd40dc4214', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/2d7e4196-441f-4c66-84b0-d6cd40dc4214/documents/competitive_exam/7989a80e-bb48-4a62-877a-6681b3af8295/competitive_exam_1788719261655.pdf', 'completed', '2026-09-06T18:27:41.662Z'::timestamptz, '2026-09-09T18:19:16.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('8c553120-0214-476b-a21e-13f9bb58a1f7', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/student_id/8c553120-0214-476b-a21e-13f9bb58a1f7/student_id_1788719292625.jpg', 'completed', '2026-09-06T18:28:12.628Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d781534a-8f7c-42b6-839c-79888d39dadb', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/passport_photo/d781534a-8f7c-42b6-839c-79888d39dadb/passport_photo_1788719290500.jpg', 'completed', '2026-09-06T18:28:10.508Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('8b407f48-adb0-4283-9d43-b923c82b32c1', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/post_graduation_marksheet/8b407f48-adb0-4283-9d43-b923c82b32c1/post_graduation_marksheet_1788719290616.pdf', 'completed', '2026-09-06T18:28:10.624Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('9f9dbca2-5cd6-4539-960c-ee35f1718fe8', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/post_graduation_marksheet/9f9dbca2-5cd6-4539-960c-ee35f1718fe8/post_graduation_marksheet_1788719290751.pdf', 'completed', '2026-09-06T18:28:10.775Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('bfb977b2-c09d-4fc1-a3a9-c11bd88d9d04', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/post_graduation_marksheet/bfb977b2-c09d-4fc1-a3a9-c11bd88d9d04/post_graduation_marksheet_1788719291307.pdf', 'completed', '2026-09-06T18:28:11.313Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a756df3d-dde3-463b-8122-816bede01774', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/abc_id/a756df3d-dde3-463b-8122-816bede01774/abc_id_1788719291511.pdf', 'completed', '2026-09-06T18:28:11.515Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('ee76c8ab-e1e9-45d6-9c45-9fe1443e59b0', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/academic_certifications/ee76c8ab-e1e9-45d6-9c45-9fe1443e59b0/academic_certifications_1788719291727.pdf', 'completed', '2026-09-06T18:28:11.731Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('2ecc1daf-78e9-4a4b-a1ea-f6fdf22f0905', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/skill_certifications/2ecc1daf-78e9-4a4b-a1ea-f6fdf22f0905/skill_certifications_1788719291988.pdf', 'completed', '2026-09-06T18:28:11.993Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('68bede02-385b-4d6b-914c-a64d2e1b5d56', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/resume/68bede02-385b-4d6b-914c-a64d2e1b5d56/resume_1788719292114.pdf', 'completed', '2026-09-06T18:28:12.120Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('4174ac1b-2e0a-44e2-97a9-8bf143f9883d', 'sv_7accf3dd-3cd8-4ce9-955b-1d68070b2c61', '7accf3dd-3cd8-4ce9-955b-1d68070b2c61', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/7accf3dd-3cd8-4ce9-955b-1d68070b2c61/documents/competitive_exam/4174ac1b-2e0a-44e2-97a9-8bf143f9883d/competitive_exam_1788719292282.pdf', 'completed', '2026-09-06T18:28:12.287Z'::timestamptz, '2026-09-09T18:19:14.412Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('fd943edb-660e-4847-a961-e81b78a0dedc', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/student_id/fd943edb-660e-4847-a961-e81b78a0dedc/student_id_1788719328833.jpg', 'completed', '2026-09-06T18:28:48.836Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('84a75a8e-075b-46c9-8b01-c032f8a20022', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/passport_photo/84a75a8e-075b-46c9-8b01-c032f8a20022/passport_photo_1788719326639.jpg', 'completed', '2026-09-06T18:28:46.643Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a846537f-86b6-4d76-ad09-d6576db59567', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/post_graduation_marksheet/a846537f-86b6-4d76-ad09-d6576db59567/post_graduation_marksheet_1788719326743.pdf', 'completed', '2026-09-06T18:28:46.751Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('3fbdf7df-014d-4a18-a2d6-86d922f1ffbf', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/post_graduation_marksheet/3fbdf7df-014d-4a18-a2d6-86d922f1ffbf/post_graduation_marksheet_1788719326853.pdf', 'completed', '2026-09-06T18:28:46.858Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d5dd93f1-f58a-41c7-b866-c4a424f095ee', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/post_graduation_marksheet/d5dd93f1-f58a-41c7-b866-c4a424f095ee/post_graduation_marksheet_1788719327044.pdf', 'completed', '2026-09-06T18:28:47.051Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('18c1925f-f4d8-408a-afb3-af26bada6f67', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/abc_id/18c1925f-f4d8-408a-afb3-af26bada6f67/abc_id_1788719327158.pdf', 'completed', '2026-09-06T18:28:47.167Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('031dae4e-2a1b-4e4e-a139-9729d61ca606', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/academic_certifications/031dae4e-2a1b-4e4e-a139-9729d61ca606/academic_certifications_1788719327418.pdf', 'completed', '2026-09-06T18:28:47.425Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5f1a9309-5636-44e8-ba00-b821ca76f0ba', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/skill_certifications/5f1a9309-5636-44e8-ba00-b821ca76f0ba/skill_certifications_1788719327991.pdf', 'completed', '2026-09-06T18:28:48.000Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('8e1b4226-c472-477c-8f37-bbd381fdde8e', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/resume/8e1b4226-c472-477c-8f37-bbd381fdde8e/resume_1788719328159.pdf', 'completed', '2026-09-06T18:28:48.175Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('dee31ee5-d65e-48fa-8266-d23e744b7e64', 'sv_07394e2d-be14-4577-a227-0eb7dd580217', '07394e2d-be14-4577-a227-0eb7dd580217', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/07394e2d-be14-4577-a227-0eb7dd580217/documents/competitive_exam/dee31ee5-d65e-48fa-8266-d23e744b7e64/competitive_exam_1788719328307.pdf', 'completed', '2026-09-06T18:28:48.324Z'::timestamptz, '2026-09-06T18:28:52.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d6a0bc29-f94a-4dfd-b83c-310a9dca132d', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/student_id/d6a0bc29-f94a-4dfd-b83c-310a9dca132d/student_id_1788719354774.jpg', 'completed', '2026-09-06T18:29:14.777Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('87fb355f-796b-447c-bf36-1ccae7169f57', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/passport_photo/87fb355f-796b-447c-bf36-1ccae7169f57/passport_photo_1788719353515.jpg', 'completed', '2026-09-06T18:29:13.518Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('01518d4e-fd3e-487f-aae0-e1cf5706d37b', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/post_graduation_marksheet/01518d4e-fd3e-487f-aae0-e1cf5706d37b/post_graduation_marksheet_1788719353601.pdf', 'completed', '2026-09-06T18:29:13.608Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('265b4cff-273c-4bb3-9ec6-44c012c6eeb1', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/post_graduation_marksheet/265b4cff-273c-4bb3-9ec6-44c012c6eeb1/post_graduation_marksheet_1788719353693.pdf', 'completed', '2026-09-06T18:29:13.696Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a611e91f-1c10-47d1-871d-f65e2a93e3a9', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/post_graduation_marksheet/a611e91f-1c10-47d1-871d-f65e2a93e3a9/post_graduation_marksheet_1788719353827.pdf', 'completed', '2026-09-06T18:29:13.830Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('3e293ab4-9857-438f-a6ff-ed743fd3f792', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/abc_id/3e293ab4-9857-438f-a6ff-ed743fd3f792/abc_id_1788719353935.pdf', 'completed', '2026-09-06T18:29:13.940Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d4f24ef9-7545-4cd3-98c7-2764d184b0b6', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/academic_certifications/d4f24ef9-7545-4cd3-98c7-2764d184b0b6/academic_certifications_1788719354112.pdf', 'completed', '2026-09-06T18:29:14.117Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('c0c03833-eef3-4973-bf97-1a06034cf85c', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/skill_certifications/c0c03833-eef3-4973-bf97-1a06034cf85c/skill_certifications_1788719354329.pdf', 'completed', '2026-09-06T18:29:14.335Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b545d594-f9a4-446c-ad24-fe96495aa594', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/resume/b545d594-f9a4-446c-ad24-fe96495aa594/resume_1788719354418.pdf', 'completed', '2026-09-06T18:29:14.422Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('fcf52a46-d836-458b-b1e8-154ec18be788', 'sv_1a66021b-09f4-42f8-bf36-f347c6753c5d', '1a66021b-09f4-42f8-bf36-f347c6753c5d', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/1a66021b-09f4-42f8-bf36-f347c6753c5d/documents/competitive_exam/fcf52a46-d836-458b-b1e8-154ec18be788/competitive_exam_1788719354497.pdf', 'completed', '2026-09-06T18:29:14.502Z'::timestamptz, '2026-09-06T18:29:15.697Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('0a3caa84-e2db-46aa-97bd-f9a42d32517f', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/student_id/0a3caa84-e2db-46aa-97bd-f9a42d32517f/student_id_1788719389436.jpg', 'completed', '2026-09-06T18:29:49.444Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('c71cf32b-4287-4468-88db-a5c45ba14f43', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/passport_photo/c71cf32b-4287-4468-88db-a5c45ba14f43/passport_photo_1788719388232.jpg', 'completed', '2026-09-06T18:29:48.236Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('143f39f4-86b3-47f1-b250-dbd952284621', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/post_graduation_marksheet/143f39f4-86b3-47f1-b250-dbd952284621/post_graduation_marksheet_1788719388319.pdf', 'completed', '2026-09-06T18:29:48.323Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('e7889d48-d748-4930-b22d-eef64266266d', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/post_graduation_marksheet/e7889d48-d748-4930-b22d-eef64266266d/post_graduation_marksheet_1788719388432.pdf', 'completed', '2026-09-06T18:29:48.436Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('494fc70b-2434-451e-a43f-6545ceaa87ec', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/post_graduation_marksheet/494fc70b-2434-451e-a43f-6545ceaa87ec/post_graduation_marksheet_1788719388515.pdf', 'completed', '2026-09-06T18:29:48.519Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a11f0d54-7b15-49c5-b450-9a31ea311f47', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/abc_id/a11f0d54-7b15-49c5-b450-9a31ea311f47/abc_id_1788719388593.pdf', 'completed', '2026-09-06T18:29:48.606Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('49d37cbd-9713-4c01-b4c9-5fe5dc4c1145', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/academic_certifications/49d37cbd-9713-4c01-b4c9-5fe5dc4c1145/academic_certifications_1788719388747.pdf', 'completed', '2026-09-06T18:29:48.753Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('3314c9ad-2d85-4ddb-95e3-c5c8c0375659', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/skill_certifications/3314c9ad-2d85-4ddb-95e3-c5c8c0375659/skill_certifications_1788719388974.pdf', 'completed', '2026-09-06T18:29:48.981Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('895ed02c-12ff-4790-9392-77120a9ac5dd', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/resume/895ed02c-12ff-4790-9392-77120a9ac5dd/resume_1788719389087.pdf', 'completed', '2026-09-06T18:29:49.091Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('4989554d-edd5-4eec-8b33-25909d64782a', 'sv_cef1cd12-aca7-42a7-9d42-b108f505bb40', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/cef1cd12-aca7-42a7-9d42-b108f505bb40/documents/competitive_exam/4989554d-edd5-4eec-8b33-25909d64782a/competitive_exam_1788719389179.pdf', 'completed', '2026-09-06T18:29:49.189Z'::timestamptz, '2026-09-06T18:29:51.137Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('9772194e-d73d-4d52-ade9-24c99c501689', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/student_id/9772194e-d73d-4d52-ade9-24c99c501689/student_id_1788719452196.jpg', 'completed', '2026-09-06T18:30:52.203Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('fa807604-e37e-46cc-aa08-9af05578ee4a', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/passport_photo/fa807604-e37e-46cc-aa08-9af05578ee4a/passport_photo_1788719449798.jpg', 'completed', '2026-09-06T18:30:49.870Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d4e0c178-9de6-4421-b55c-cf79f20d7c39', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/post_graduation_marksheet/d4e0c178-9de6-4421-b55c-cf79f20d7c39/post_graduation_marksheet_1788719450553.pdf', 'completed', '2026-09-06T18:30:50.560Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('545217fc-5cae-43fb-a533-7d4056044dbd', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/post_graduation_marksheet/545217fc-5cae-43fb-a533-7d4056044dbd/post_graduation_marksheet_1788719450833.pdf', 'completed', '2026-09-06T18:30:50.840Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('fa06ab74-35f9-4edc-8d81-4a4c3297befc', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/post_graduation_marksheet/fa06ab74-35f9-4edc-8d81-4a4c3297befc/post_graduation_marksheet_1788719450985.pdf', 'completed', '2026-09-06T18:30:50.991Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('4ce0f5e9-da1d-46a8-8a4b-07c59ec30fbc', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/abc_id/4ce0f5e9-da1d-46a8-8a4b-07c59ec30fbc/abc_id_1788719451079.pdf', 'completed', '2026-09-06T18:30:51.093Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('556596f4-3399-4d3d-9546-fd844f23f308', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/academic_certifications/556596f4-3399-4d3d-9546-fd844f23f308/academic_certifications_1788719451391.pdf', 'completed', '2026-09-06T18:30:51.395Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('92f116b6-8a7d-4bf2-ad3b-0699c42c8d99', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/skill_certifications/92f116b6-8a7d-4bf2-ad3b-0699c42c8d99/skill_certifications_1788719451596.pdf', 'completed', '2026-09-06T18:30:51.600Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('6fdb6444-ae51-4a9c-9ec2-3ac72af6402f', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/resume/6fdb6444-ae51-4a9c-9ec2-3ac72af6402f/resume_1788719451704.pdf', 'completed', '2026-09-06T18:30:51.709Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('c8f4a2f4-33dd-4240-824b-d4bf8defa02a', 'sv_61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd/documents/competitive_exam/c8f4a2f4-33dd-4240-824b-d4bf8defa02a/competitive_exam_1788719451794.pdf', 'completed', '2026-09-06T18:30:51.802Z'::timestamptz, '2026-09-06T18:30:53.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('37ba1c4b-26f1-4e43-bc26-9917e7acdc5d', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/student_id/37ba1c4b-26f1-4e43-bc26-9917e7acdc5d/student_id_1788720475879.jpg', 'completed', '2026-09-06T18:47:55.886Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b542fcd0-200a-4afc-a6e9-1037f6d9c249', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/passport_photo/b542fcd0-200a-4afc-a6e9-1037f6d9c249/passport_photo_1788720472699.jpg', 'completed', '2026-09-06T18:47:52.752Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('cdfdc029-a1c6-4ad1-8dbb-4e566f5b908c', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/post_graduation_marksheet/cdfdc029-a1c6-4ad1-8dbb-4e566f5b908c/post_graduation_marksheet_1788720473042.pdf', 'completed', '2026-09-06T18:47:53.049Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('1f3f98bb-bad8-46d5-a25e-be7c09fbfbf6', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/post_graduation_marksheet/1f3f98bb-bad8-46d5-a25e-be7c09fbfbf6/post_graduation_marksheet_1788720473224.pdf', 'completed', '2026-09-06T18:47:53.229Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('7c9d9305-312b-479c-8d64-1b6e4a4a027f', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/post_graduation_marksheet/7c9d9305-312b-479c-8d64-1b6e4a4a027f/post_graduation_marksheet_1788720473671.pdf', 'completed', '2026-09-06T18:47:53.679Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('f1f6b9ee-8026-43d8-a052-2eb6817e3155', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/abc_id/f1f6b9ee-8026-43d8-a052-2eb6817e3155/abc_id_1788720473803.pdf', 'completed', '2026-09-06T18:47:53.815Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b290674f-410c-4290-b0ee-9e1fc20dca4f', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/academic_certifications/b290674f-410c-4290-b0ee-9e1fc20dca4f/academic_certifications_1788720474363.pdf', 'completed', '2026-09-06T18:47:54.384Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('80b4410d-1c86-4e3a-b0b6-10e0e13067f5', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/skill_certifications/80b4410d-1c86-4e3a-b0b6-10e0e13067f5/skill_certifications_1788720474724.pdf', 'completed', '2026-09-06T18:47:54.729Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a2e2e455-8529-4843-a1ef-71c858cae3e3', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/resume/a2e2e455-8529-4843-a1ef-71c858cae3e3/resume_1788720474875.pdf', 'completed', '2026-09-06T18:47:54.880Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('c2fb76c4-2e8e-4190-b3f5-7d3021f45b84', 'sv_eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'eb06e3f3-837c-409b-91a9-e1ad1cf56518', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/eb06e3f3-837c-409b-91a9-e1ad1cf56518/documents/competitive_exam/c2fb76c4-2e8e-4190-b3f5-7d3021f45b84/competitive_exam_1788720475255.pdf', 'completed', '2026-09-06T18:47:55.261Z'::timestamptz, '2026-09-06T18:47:56.312Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('170ee634-b90b-4378-a943-26f9d52396b0', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/student_id/170ee634-b90b-4378-a943-26f9d52396b0/student_id_1788720560061.jpg', 'completed', '2026-09-06T18:49:20.065Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('cd138787-a6cf-46a8-8d50-cad014048270', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/passport_photo/cd138787-a6cf-46a8-8d50-cad014048270/passport_photo_1788720557267.jpg', 'completed', '2026-09-06T18:49:17.270Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('9df0a08d-ed2b-4e1b-8044-21980d421d62', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/post_graduation_marksheet/9df0a08d-ed2b-4e1b-8044-21980d421d62/post_graduation_marksheet_1788720557389.pdf', 'completed', '2026-09-06T18:49:17.398Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('55e71816-af71-4f13-90dc-9a6216e8a1dd', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/post_graduation_marksheet/55e71816-af71-4f13-90dc-9a6216e8a1dd/post_graduation_marksheet_1788720557494.pdf', 'completed', '2026-09-06T18:49:17.501Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a2934ac9-284c-4191-bc40-901bdb45f03c', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/post_graduation_marksheet/a2934ac9-284c-4191-bc40-901bdb45f03c/post_graduation_marksheet_1788720557649.pdf', 'completed', '2026-09-06T18:49:17.654Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('0724710c-9e14-4212-91bb-730fe84c1b0e', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/abc_id/0724710c-9e14-4212-91bb-730fe84c1b0e/abc_id_1788720558405.pdf', 'completed', '2026-09-06T18:49:18.412Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('02fe7165-56ac-48d8-ac52-628e2076725e', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/academic_certifications/02fe7165-56ac-48d8-ac52-628e2076725e/academic_certifications_1788720558701.pdf', 'completed', '2026-09-06T18:49:18.705Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('14f305d8-c127-48fb-a8da-fcca4d6315b8', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/skill_certifications/14f305d8-c127-48fb-a8da-fcca4d6315b8/skill_certifications_1788720559137.pdf', 'completed', '2026-09-06T18:49:19.142Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('e3b934cc-8c58-4921-b7b6-6f0eaed7bd97', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/resume/e3b934cc-8c58-4921-b7b6-6f0eaed7bd97/resume_1788720559257.pdf', 'completed', '2026-09-06T18:49:19.261Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('e9f14b5d-b21e-4f59-beea-09cfa5ae43cd', 'sv_0c1c45bc-281a-440e-8373-2e59cd6b5ddc', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/0c1c45bc-281a-440e-8373-2e59cd6b5ddc/documents/competitive_exam/e9f14b5d-b21e-4f59-beea-09cfa5ae43cd/competitive_exam_1788720559509.pdf', 'completed', '2026-09-06T18:49:19.515Z'::timestamptz, '2026-09-06T18:49:21.350Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('f35f3ac3-f5f6-489a-a27f-81806441981c', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/student_id/f35f3ac3-f5f6-489a-a27f-81806441981c/student_id_1788721352047.jpg', 'completed', '2026-09-06T19:02:32.051Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('ab0af4c2-543e-4ae4-9079-42b38ec8d289', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/passport_photo/ab0af4c2-543e-4ae4-9079-42b38ec8d289/passport_photo_1788721343713.jpg', 'completed', '2026-09-06T19:02:23.724Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b71be8fc-9e03-4dc2-891d-ffd883f2e59a', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/post_graduation_marksheet/b71be8fc-9e03-4dc2-891d-ffd883f2e59a/post_graduation_marksheet_1788721343999.pdf', 'completed', '2026-09-06T19:02:24.011Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('0416e02a-6892-42e7-a56e-a09990028499', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/post_graduation_marksheet/0416e02a-6892-42e7-a56e-a09990028499/post_graduation_marksheet_1788721344712.pdf', 'completed', '2026-09-06T19:02:24.724Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('e5f7a092-9129-4de3-af87-70a19d1043f6', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/post_graduation_marksheet/e5f7a092-9129-4de3-af87-70a19d1043f6/post_graduation_marksheet_1788721345129.pdf', 'completed', '2026-09-06T19:02:25.141Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('3068aeb4-061e-432e-a4b7-68da039484b3', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/abc_id/3068aeb4-061e-432e-a4b7-68da039484b3/abc_id_1788721346583.pdf', 'completed', '2026-09-06T19:02:26.594Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('2321ba06-018f-4f4b-95d6-45ca114e8638', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/academic_certifications/2321ba06-018f-4f4b-95d6-45ca114e8638/academic_certifications_1788721348024.pdf', 'completed', '2026-09-06T19:02:28.062Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('f175028a-3360-47b4-9a57-49016df87741', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/skill_certifications/f175028a-3360-47b4-9a57-49016df87741/skill_certifications_1788721350244.pdf', 'completed', '2026-09-06T19:02:30.262Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('2928a9ee-4d12-4797-89b7-695932f5e931', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/resume/2928a9ee-4d12-4797-89b7-695932f5e931/resume_1788721351256.pdf', 'completed', '2026-09-06T19:02:31.261Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a9580e85-9559-412e-9cf8-5e935e1c6f09', 'sv_0a0468cf-782f-4a7f-a074-bcb30953034f', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/0a0468cf-782f-4a7f-a074-bcb30953034f/documents/competitive_exam/a9580e85-9559-412e-9cf8-5e935e1c6f09/competitive_exam_1788721351527.pdf', 'completed', '2026-09-06T19:02:31.538Z'::timestamptz, '2026-09-06T19:02:35.513Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('7504b957-7336-443f-9d17-82be4f854aa1', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/student_id/7504b957-7336-443f-9d17-82be4f854aa1/student_id_1788723670161.jpg', 'completed', '2026-09-06T19:41:10.164Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5bf9a395-b575-450d-9fe9-3c888f8eb05b', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/passport_photo/5bf9a395-b575-450d-9fe9-3c888f8eb05b/passport_photo_1788723659516.jpg', 'completed', '2026-09-06T19:40:59.529Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('049090c3-bdf3-4314-8ae0-82133458a0be', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/post_graduation_marksheet/049090c3-bdf3-4314-8ae0-82133458a0be/post_graduation_marksheet_1788723659766.pdf', 'completed', '2026-09-06T19:40:59.771Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('3570bdef-a7c8-4350-a691-df1184aa55ce', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/post_graduation_marksheet/3570bdef-a7c8-4350-a691-df1184aa55ce/post_graduation_marksheet_1788723660117.pdf', 'completed', '2026-09-06T19:41:00.187Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('ddb890ab-c56f-48ae-9fa1-ceb33cc98739', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/post_graduation_marksheet/ddb890ab-c56f-48ae-9fa1-ceb33cc98739/post_graduation_marksheet_1788723660601.pdf', 'completed', '2026-09-06T19:41:00.604Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('696ddda8-f710-46ef-b6fa-466b57458619', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/abc_id/696ddda8-f710-46ef-b6fa-466b57458619/abc_id_1788723662401.pdf', 'completed', '2026-09-06T19:41:02.412Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('6a8e11e6-1d4c-4a37-99fb-73dc785c75ec', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/academic_certifications/6a8e11e6-1d4c-4a37-99fb-73dc785c75ec/academic_certifications_1788723663708.pdf', 'completed', '2026-09-06T19:41:03.713Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('72dffb87-ea41-4e8d-afd1-001f6bf0fefb', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/skill_certifications/72dffb87-ea41-4e8d-afd1-001f6bf0fefb/skill_certifications_1788723664483.pdf', 'completed', '2026-09-06T19:41:04.491Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('c4ea9e65-5c25-42f5-ac27-81ba1c34781c', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/resume/c4ea9e65-5c25-42f5-ac27-81ba1c34781c/resume_1788723666207.pdf', 'completed', '2026-09-06T19:41:06.231Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d6b5e1c5-7c81-4779-ac5d-94caee508243', 'sv_ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c/documents/competitive_exam/d6b5e1c5-7c81-4779-ac5d-94caee508243/competitive_exam_1788723667543.pdf', 'completed', '2026-09-06T19:41:07.555Z'::timestamptz, '2026-09-06T19:41:14.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5d4e5f2d-6086-4d02-bf34-b67eccd9a65f', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/student_id/5d4e5f2d-6086-4d02-bf34-b67eccd9a65f/student_id_1788723990915.jpg', 'completed', '2026-09-06T19:46:30.920Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('999b5414-2668-4b7b-a8f4-dedcfc8508fc', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/passport_photo/999b5414-2668-4b7b-a8f4-dedcfc8508fc/passport_photo_1788723982291.jpg', 'completed', '2026-09-06T19:46:22.298Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a20ea852-83ca-462c-8987-223c8c97217a', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/post_graduation_marksheet/a20ea852-83ca-462c-8987-223c8c97217a/post_graduation_marksheet_1788723983191.pdf', 'completed', '2026-09-06T19:46:23.260Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d175b377-cd7f-4444-9a39-2d32f0f89656', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/post_graduation_marksheet/d175b377-cd7f-4444-9a39-2d32f0f89656/post_graduation_marksheet_1788723984633.pdf', 'completed', '2026-09-06T19:46:24.637Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('1ec67c2b-dacb-473f-8df6-e4ce73369bc6', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/post_graduation_marksheet/1ec67c2b-dacb-473f-8df6-e4ce73369bc6/post_graduation_marksheet_1788723984803.pdf', 'completed', '2026-09-06T19:46:24.810Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('8cddd373-0ec8-4ae7-8547-f77db944f565', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/abc_id/8cddd373-0ec8-4ae7-8547-f77db944f565/abc_id_1788723988074.pdf', 'completed', '2026-09-06T19:46:28.085Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a4f6d106-7de1-478f-acbd-9b209e48a8c0', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/academic_certifications/a4f6d106-7de1-478f-acbd-9b209e48a8c0/academic_certifications_1788723988729.pdf', 'completed', '2026-09-06T19:46:28.735Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('8dc3a0ff-0ade-4526-8737-0e93d122ac1b', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/skill_certifications/8dc3a0ff-0ade-4526-8737-0e93d122ac1b/skill_certifications_1788723989332.pdf', 'completed', '2026-09-06T19:46:29.336Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('1e5b4b87-a724-4a29-9637-91447c7db764', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/resume/1e5b4b87-a724-4a29-9637-91447c7db764/resume_1788723989519.pdf', 'completed', '2026-09-06T19:46:29.523Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a74e23fb-cfae-4224-afed-ae7a0003e616', 'sv_93a31505-b421-4f59-8a4d-0643583ac876', '93a31505-b421-4f59-8a4d-0643583ac876', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/93a31505-b421-4f59-8a4d-0643583ac876/documents/competitive_exam/a74e23fb-cfae-4224-afed-ae7a0003e616/competitive_exam_1788723989837.pdf', 'completed', '2026-09-06T19:46:29.848Z'::timestamptz, '2026-09-06T19:46:34.237Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('3b75dfea-9ab0-44d7-9fda-d5cb6cf84ecf', 'sv_fd80a280-5090-4a6e-8aa2-00a3539f576a', 'fd80a280-5090-4a6e-8aa2-00a3539f576a', 'student_id', NULL, 'id.pdf', 'application/pdf', 16, 'student/fd80a280-5090-4a6e-8aa2-00a3539f576a/documents/student_id/3b75dfea-9ab0-44d7-9fda-d5cb6cf84ecf/student_id_1788776614156.pdf', 'completed', '2026-09-07T10:23:34.166Z'::timestamptz, '2026-09-07T10:23:35.571Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('2682644e-f616-44c4-a55d-f4f2fd8e9775', 'sv_fd80a280-5090-4a6e-8aa2-00a3539f576a', 'fd80a280-5090-4a6e-8aa2-00a3539f576a', 'passport_photo', NULL, 'passport.png', 'image/png', 8, 'student/fd80a280-5090-4a6e-8aa2-00a3539f576a/documents/passport_photo/2682644e-f616-44c4-a55d-f4f2fd8e9775/passport_photo_1788776614417.png', 'completed', '2026-09-07T10:23:34.427Z'::timestamptz, '2026-09-07T10:23:35.571Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d2a1f36b-db97-46f6-9ad1-3f8199ce8f22', 'sv_fd80a280-5090-4a6e-8aa2-00a3539f576a', 'fd80a280-5090-4a6e-8aa2-00a3539f576a', 'post_graduation_marksheet', 'post_graduation_marksheet', 'sem1.pdf', 'application/pdf', 13, 'student/fd80a280-5090-4a6e-8aa2-00a3539f576a/documents/post_graduation_marksheet/d2a1f36b-db97-46f6-9ad1-3f8199ce8f22/post_graduation_marksheet_1788776614582.pdf', 'completed', '2026-09-07T10:23:34.587Z'::timestamptz, '2026-09-07T10:23:35.571Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('853fdc7a-65c3-43eb-8789-883c76a3e5da', 'sv_fd80a280-5090-4a6e-8aa2-00a3539f576a', 'fd80a280-5090-4a6e-8aa2-00a3539f576a', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 15, 'student/fd80a280-5090-4a6e-8aa2-00a3539f576a/documents/abc_id/853fdc7a-65c3-43eb-8789-883c76a3e5da/abc_id_1788776614968.pdf', 'completed', '2026-09-07T10:23:34.972Z'::timestamptz, '2026-09-07T10:23:35.571Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('346a1ced-ba65-40d9-b37e-5696b5beb6ae', 'sv_fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'student_id', NULL, 'id.pdf', 'application/pdf', 16, 'student/fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad/documents/student_id/346a1ced-ba65-40d9-b37e-5696b5beb6ae/student_id_1788776665869.pdf', 'completed', '2026-09-07T10:24:25.873Z'::timestamptz, '2026-09-07T10:24:26.219Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('cb34d902-a2b6-4f8e-9567-d72af0b82806', 'sv_fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'passport_photo', NULL, 'passport.png', 'image/png', 8, 'student/fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad/documents/passport_photo/cb34d902-a2b6-4f8e-9567-d72af0b82806/passport_photo_1788776665970.png', 'completed', '2026-09-07T10:24:25.974Z'::timestamptz, '2026-09-07T10:24:26.219Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('044c450c-9f25-4589-8814-9755f220c55f', 'sv_fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'post_graduation_marksheet', 'post_graduation_marksheet', 'sem1.pdf', 'application/pdf', 13, 'student/fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad/documents/post_graduation_marksheet/044c450c-9f25-4589-8814-9755f220c55f/post_graduation_marksheet_1788776666043.pdf', 'completed', '2026-09-07T10:24:26.046Z'::timestamptz, '2026-09-07T10:24:26.219Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('6ff86c2f-688e-4f67-b5f8-f3aae2a19e28', 'sv_fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 15, 'student/fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad/documents/abc_id/6ff86c2f-688e-4f67-b5f8-f3aae2a19e28/abc_id_1788776666120.pdf', 'completed', '2026-09-07T10:24:26.123Z'::timestamptz, '2026-09-07T10:24:26.219Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('079ec7c6-aef7-4227-a9c0-26493f6d984b', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/student_id/079ec7c6-aef7-4227-a9c0-26493f6d984b/student_id_1788776711677.jpg', 'completed', '2026-09-07T10:25:11.681Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b79ca074-52ce-4250-a232-881e17deded2', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/passport_photo/b79ca074-52ce-4250-a232-881e17deded2/passport_photo_1788776709084.jpg', 'completed', '2026-09-07T10:25:09.086Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('7e42cafb-de5b-4398-835e-d0de52279631', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/post_graduation_marksheet/7e42cafb-de5b-4398-835e-d0de52279631/post_graduation_marksheet_1788776709182.pdf', 'completed', '2026-09-07T10:25:09.186Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('71c10040-37bb-4134-8246-680aff13098f', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/post_graduation_marksheet/71c10040-37bb-4134-8246-680aff13098f/post_graduation_marksheet_1788776709291.pdf', 'completed', '2026-09-07T10:25:09.294Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('0e3d3f32-9c4a-4c68-9ec7-b7d8fa1a2684', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/post_graduation_marksheet/0e3d3f32-9c4a-4c68-9ec7-b7d8fa1a2684/post_graduation_marksheet_1788776709402.pdf', 'completed', '2026-09-07T10:25:09.405Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('c48a6fce-47b0-4978-9a9d-b94f06fd8c87', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/abc_id/c48a6fce-47b0-4978-9a9d-b94f06fd8c87/abc_id_1788776710203.pdf', 'completed', '2026-09-07T10:25:10.206Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('dce7ac22-18ee-4fb2-90d5-75732dde4632', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/academic_certifications/dce7ac22-18ee-4fb2-90d5-75732dde4632/academic_certifications_1788776710508.pdf', 'completed', '2026-09-07T10:25:10.512Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('caafb836-dff0-49c5-ad7c-960e84b7e7db', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/skill_certifications/caafb836-dff0-49c5-ad7c-960e84b7e7db/skill_certifications_1788776710894.pdf', 'completed', '2026-09-07T10:25:10.900Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('7fab10db-9660-4fd0-a4eb-47cc13a26c22', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/resume/7fab10db-9660-4fd0-a4eb-47cc13a26c22/resume_1788776710997.pdf', 'completed', '2026-09-07T10:25:11.002Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('e42ea091-04e2-40b3-acfa-2aecafc1dedf', 'sv_73d76d6b-6353-4260-a8be-605ca72c9b12', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/73d76d6b-6353-4260-a8be-605ca72c9b12/documents/competitive_exam/e42ea091-04e2-40b3-acfa-2aecafc1dedf/competitive_exam_1788776711105.pdf', 'completed', '2026-09-07T10:25:11.108Z'::timestamptz, '2026-09-07T10:25:15.139Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('c4b3c8ad-0098-4cc5-b049-ae7f9fdf009c', 'sv_17752966-0044-48e3-b3aa-d1fe9caa76b3', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'student_id', NULL, 'id.pdf', 'application/pdf', 16, 'student/17752966-0044-48e3-b3aa-d1fe9caa76b3/documents/student_id/c4b3c8ad-0098-4cc5-b049-ae7f9fdf009c/student_id_1788777973458.pdf', 'completed', '2026-09-07T10:46:13.461Z'::timestamptz, '2026-09-07T10:46:14.066Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('29bef9cd-d3b8-42fb-9267-56fe6b109a79', 'sv_17752966-0044-48e3-b3aa-d1fe9caa76b3', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'passport_photo', NULL, 'passport.png', 'image/png', 8, 'student/17752966-0044-48e3-b3aa-d1fe9caa76b3/documents/passport_photo/29bef9cd-d3b8-42fb-9267-56fe6b109a79/passport_photo_1788777973623.png', 'completed', '2026-09-07T10:46:13.626Z'::timestamptz, '2026-09-07T10:46:14.066Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('47798c69-4480-454e-ae07-b8ee23b496f1', 'sv_17752966-0044-48e3-b3aa-d1fe9caa76b3', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'post_graduation_marksheet', 'post_graduation_marksheet', 'sem1.pdf', 'application/pdf', 13, 'student/17752966-0044-48e3-b3aa-d1fe9caa76b3/documents/post_graduation_marksheet/47798c69-4480-454e-ae07-b8ee23b496f1/post_graduation_marksheet_1788777973770.pdf', 'completed', '2026-09-07T10:46:13.774Z'::timestamptz, '2026-09-07T10:46:14.066Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('7c2d7dbc-21f0-429d-b2f0-7fca9f97b310', 'sv_17752966-0044-48e3-b3aa-d1fe9caa76b3', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 15, 'student/17752966-0044-48e3-b3aa-d1fe9caa76b3/documents/abc_id/7c2d7dbc-21f0-429d-b2f0-7fca9f97b310/abc_id_1788777973907.pdf', 'completed', '2026-09-07T10:46:13.910Z'::timestamptz, '2026-09-07T10:46:14.066Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('e7ab3031-7a5a-40a5-b140-16154ad48d08', 'sv_e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'student_id', NULL, 'id.pdf', 'application/pdf', 16, 'student/e1a76ef9-8ec1-44c5-b2e5-57813eb23cee/documents/student_id/e7ab3031-7a5a-40a5-b140-16154ad48d08/student_id_1788778075231.pdf', 'completed', '2026-09-07T10:47:55.235Z'::timestamptz, '2026-09-07T10:47:55.730Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('8a728bae-f79d-4622-8a63-4eb928cadd74', 'sv_e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'passport_photo', NULL, 'passport.png', 'image/png', 8, 'student/e1a76ef9-8ec1-44c5-b2e5-57813eb23cee/documents/passport_photo/8a728bae-f79d-4622-8a63-4eb928cadd74/passport_photo_1788778075380.png', 'completed', '2026-09-07T10:47:55.384Z'::timestamptz, '2026-09-07T10:47:55.730Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('52cc1a8e-a9eb-405b-9ef6-4f16e22d214d', 'sv_e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'post_graduation_marksheet', 'post_graduation_marksheet', 'sem1.pdf', 'application/pdf', 13, 'student/e1a76ef9-8ec1-44c5-b2e5-57813eb23cee/documents/post_graduation_marksheet/52cc1a8e-a9eb-405b-9ef6-4f16e22d214d/post_graduation_marksheet_1788778075482.pdf', 'completed', '2026-09-07T10:47:55.485Z'::timestamptz, '2026-09-07T10:47:55.730Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('4efec3dc-a056-4045-9be1-8c6bcf80e7fe', 'sv_e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 15, 'student/e1a76ef9-8ec1-44c5-b2e5-57813eb23cee/documents/abc_id/4efec3dc-a056-4045-9be1-8c6bcf80e7fe/abc_id_1788778075596.pdf', 'completed', '2026-09-07T10:47:55.598Z'::timestamptz, '2026-09-07T10:47:55.730Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('907354fc-ffce-4caa-98a9-1c0224d34101', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/student_id/907354fc-ffce-4caa-98a9-1c0224d34101/student_id_1788778132638.jpg', 'completed', '2026-09-07T10:48:52.642Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('64a39d59-f278-4e44-ba0e-15f6cf041db5', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/passport_photo/64a39d59-f278-4e44-ba0e-15f6cf041db5/passport_photo_1788778129312.jpg', 'completed', '2026-09-07T10:48:49.315Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('10ad357a-c021-425d-bedd-863b341cbd2e', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/post_graduation_marksheet/10ad357a-c021-425d-bedd-863b341cbd2e/post_graduation_marksheet_1788778129432.pdf', 'completed', '2026-09-07T10:48:49.436Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('943f1662-600a-4271-aa1f-ac4c4a84a986', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/post_graduation_marksheet/943f1662-600a-4271-aa1f-ac4c4a84a986/post_graduation_marksheet_1788778129745.pdf', 'completed', '2026-09-07T10:48:49.749Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5f36228e-6bb5-4c6d-983c-53e342fe37d2', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/post_graduation_marksheet/5f36228e-6bb5-4c6d-983c-53e342fe37d2/post_graduation_marksheet_1788778129897.pdf', 'completed', '2026-09-07T10:48:49.901Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('3b47fd72-0039-4d7f-9abd-3ff1242b3f76', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/abc_id/3b47fd72-0039-4d7f-9abd-3ff1242b3f76/abc_id_1788778131094.pdf', 'completed', '2026-09-07T10:48:51.099Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('827e30dc-2e05-433a-91c3-5a212fa80bff', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/academic_certifications/827e30dc-2e05-433a-91c3-5a212fa80bff/academic_certifications_1788778131332.pdf', 'completed', '2026-09-07T10:48:51.335Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('eb165884-f23a-4b6b-b5b9-3966d239b3ae', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/skill_certifications/eb165884-f23a-4b6b-b5b9-3966d239b3ae/skill_certifications_1788778131798.pdf', 'completed', '2026-09-07T10:48:51.802Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d3f14cd7-0237-4119-b75c-d2762ab23dd6', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/resume/d3f14cd7-0237-4119-b75c-d2762ab23dd6/resume_1788778131946.pdf', 'completed', '2026-09-07T10:48:51.950Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('f29ba16c-7c3e-4e1f-a27b-305602eade16', 'sv_b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6/documents/competitive_exam/f29ba16c-7c3e-4e1f-a27b-305602eade16/competitive_exam_1788778132110.pdf', 'completed', '2026-09-07T10:48:52.114Z'::timestamptz, '2026-09-07T10:48:55.653Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('08517996-72fe-41fa-b397-5b1086538390', 'sv_43a69d7a-8521-41eb-ade3-8659f17099e2', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'student_id', NULL, 'id.pdf', 'application/pdf', 16, 'student/43a69d7a-8521-41eb-ade3-8659f17099e2/documents/student_id/08517996-72fe-41fa-b397-5b1086538390/student_id_1788779560484.pdf', 'completed', '2026-09-07T11:12:40.487Z'::timestamptz, '2026-09-07T11:12:41.113Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d2c95243-2c4c-44f8-ba8e-64efb2d13809', 'sv_43a69d7a-8521-41eb-ade3-8659f17099e2', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'passport_photo', NULL, 'passport.png', 'image/png', 8, 'student/43a69d7a-8521-41eb-ade3-8659f17099e2/documents/passport_photo/d2c95243-2c4c-44f8-ba8e-64efb2d13809/passport_photo_1788779560612.png', 'completed', '2026-09-07T11:12:40.614Z'::timestamptz, '2026-09-07T11:12:41.113Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('8a8ee7e0-215b-48ba-98ad-89200810b1a6', 'sv_43a69d7a-8521-41eb-ade3-8659f17099e2', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'post_graduation_marksheet', 'post_graduation_marksheet', 'sem1.pdf', 'application/pdf', 13, 'student/43a69d7a-8521-41eb-ade3-8659f17099e2/documents/post_graduation_marksheet/8a8ee7e0-215b-48ba-98ad-89200810b1a6/post_graduation_marksheet_1788779560772.pdf', 'completed', '2026-09-07T11:12:40.775Z'::timestamptz, '2026-09-07T11:12:41.113Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('52080bf2-f21a-44a4-baf5-92ffd0d92170', 'sv_43a69d7a-8521-41eb-ade3-8659f17099e2', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 15, 'student/43a69d7a-8521-41eb-ade3-8659f17099e2/documents/abc_id/52080bf2-f21a-44a4-baf5-92ffd0d92170/abc_id_1788779560894.pdf', 'completed', '2026-09-07T11:12:40.896Z'::timestamptz, '2026-09-07T11:12:41.113Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d25b163a-b0da-4be7-b358-49915ff57c8e', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'student_id', NULL, 'new_student_id_card.jpg', 'image/jpeg', 512000, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/student_id/d25b163a-b0da-4be7-b358-49915ff57c8e/student_id_1788779644048.jpg', 'completed', '2026-09-07T11:14:04.052Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b9cdb62d-0625-4274-9600-640e4314e11d', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'passport_photo', NULL, 'passport_photo.jpg', 'image/jpeg', 358400, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/passport_photo/b9cdb62d-0625-4274-9600-640e4314e11d/passport_photo_1788779639379.jpg', 'completed', '2026-09-07T11:13:59.387Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('15bdd55b-a434-4c50-90ae-ddf4b1807e88', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_1_marksheet.pdf', 'application/pdf', 819200, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/post_graduation_marksheet/15bdd55b-a434-4c50-90ae-ddf4b1807e88/post_graduation_marksheet_1788779639532.pdf', 'completed', '2026-09-07T11:13:59.538Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('ba408516-0d02-4299-ad5b-d92071a07fbd', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_2_marksheet.pdf', 'application/pdf', 921600, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/post_graduation_marksheet/ba408516-0d02-4299-ad5b-d92071a07fbd/post_graduation_marksheet_1788779639788.pdf', 'completed', '2026-09-07T11:13:59.810Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('f33cbd3c-464c-4c07-b1fc-459620ce263f', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'post_graduation_marksheet', 'post_graduation_marksheet', 'semester_3_marksheet.pdf', 'application/pdf', 768000, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/post_graduation_marksheet/f33cbd3c-464c-4c07-b1fc-459620ce263f/post_graduation_marksheet_1788779640253.pdf', 'completed', '2026-09-07T11:14:00.256Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('b30adf12-8e1e-4e0a-8039-6428bf57bc45', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'abc_id', NULL, 'academic_bank_of_credits.pdf', 'application/pdf', 614400, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/abc_id/b30adf12-8e1e-4e0a-8039-6428bf57bc45/abc_id_1788779641609.pdf', 'completed', '2026-09-07T11:14:01.621Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a9d1f2b2-f727-4ca9-b0f5-91db7561dd9e', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'academic_certifications', 'academic_certifications', 'honor_roll_cert.pdf', 'application/pdf', 1258291, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/academic_certifications/a9d1f2b2-f727-4ca9-b0f5-91db7561dd9e/academic_certifications_1788779642480.pdf', 'completed', '2026-09-07T11:14:02.484Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('4644db99-e89f-4fb3-be99-79465b1cc193', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'skill_certifications', 'skill_certifications', 'aws_solutions_architect.pdf', 'application/pdf', 1572864, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/skill_certifications/4644db99-e89f-4fb3-be99-79465b1cc193/skill_certifications_1788779642759.pdf', 'completed', '2026-09-07T11:14:02.762Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('f98b8461-4b1e-42b3-a38c-eeb352c39475', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'resume', NULL, 'Alex_Student_Resume.pdf', 'application/pdf', 1153433, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/resume/f98b8461-4b1e-42b3-a38c-eeb352c39475/resume_1788779642880.pdf', 'completed', '2026-09-07T11:14:02.884Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5b153fba-fd7c-464f-bc5e-09908dde76c0', 'sv_2e6e232a-c966-4803-b87d-6f41a6be1a7a', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'competitive_exam', 'competitive_exam', 'gate_scorecard.pdf', 'application/pdf', 819200, 'student/2e6e232a-c966-4803-b87d-6f41a6be1a7a/documents/competitive_exam/5b153fba-fd7c-464f-bc5e-09908dde76c0/competitive_exam_1788779643063.pdf', 'completed', '2026-09-07T11:14:03.080Z'::timestamptz, '2026-09-07T11:14:06.264Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788782306568_d1', 'sv_test_student_new_1788782306568', 'test_student_new_1788782306568', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788782306568_d2', 'sv_test_student_new_1788782306568', 'test_student_new_1788782306568', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788782306568_d3', 'sv_test_student_new_1788782306568', 'test_student_new_1788782306568', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788782306568_d4', 'sv_test_student_new_1788782306568', 'test_student_new_1788782306568', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788782306568_d1', 'sv_test_student_adv_1788782306568', 'test_student_adv_1788782306568', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788782306568_d2', 'sv_test_student_adv_1788782306568', 'test_student_adv_1788782306568', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788782306568_d3', 'sv_test_student_adv_1788782306568', 'test_student_adv_1788782306568', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788782306568_d4', 'sv_test_student_adv_1788782306568', 'test_student_adv_1788782306568', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788782306568_d1', 'sv_test_student_learn_1788782306568', 'test_student_learn_1788782306568', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788782306568_d2', 'sv_test_student_learn_1788782306568', 'test_student_learn_1788782306568', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788782306568_d3', 'sv_test_student_learn_1788782306568', 'test_student_learn_1788782306568', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788782306568_d4', 'sv_test_student_learn_1788782306568', 'test_student_learn_1788782306568', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788782306568_d1', 'sv_test_student_b_1788782306568', 'test_student_b_1788782306568', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788782306568_d2', 'sv_test_student_b_1788782306568', 'test_student_b_1788782306568', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788782306568_d3', 'sv_test_student_b_1788782306568', 'test_student_b_1788782306568', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788782306568_d4', 'sv_test_student_b_1788782306568', 'test_student_b_1788782306568', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_14_1788782327573_d1', 'sv_test_student_14_1788782327573', 'test_student_14_1788782327573', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_14_1788782327573_d2', 'sv_test_student_14_1788782327573', 'test_student_14_1788782327573', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_14_1788782327573_d3', 'sv_test_student_14_1788782327573', 'test_student_14_1788782327573', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_14_1788782327573_d4', 'sv_test_student_14_1788782327573', 'test_student_14_1788782327573', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('a92af8ed-5d64-4dbb-a2f5-0abc07066e67', 'sv_fbc5a09c-460f-44d9-afd1-9b409492ea36', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'student_id', NULL, 'id.pdf', 'application/pdf', 16, 'student/fbc5a09c-460f-44d9-afd1-9b409492ea36/documents/student_id/a92af8ed-5d64-4dbb-a2f5-0abc07066e67/student_id_1788782349041.pdf', 'completed', '2026-09-07T11:59:09.049Z'::timestamptz, '2026-09-07T11:59:10.743Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('71f94dbf-259a-4ffa-bb67-47643a1e4ddd', 'sv_fbc5a09c-460f-44d9-afd1-9b409492ea36', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'passport_photo', NULL, 'passport.png', 'image/png', 8, 'student/fbc5a09c-460f-44d9-afd1-9b409492ea36/documents/passport_photo/71f94dbf-259a-4ffa-bb67-47643a1e4ddd/passport_photo_1788782349376.png', 'completed', '2026-09-07T11:59:09.380Z'::timestamptz, '2026-09-07T11:59:10.743Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('d4d22bf2-b77c-4c79-88b7-eb70be1c0a68', 'sv_fbc5a09c-460f-44d9-afd1-9b409492ea36', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'post_graduation_marksheet', 'post_graduation_marksheet', 'sem1.pdf', 'application/pdf', 13, 'student/fbc5a09c-460f-44d9-afd1-9b409492ea36/documents/post_graduation_marksheet/d4d22bf2-b77c-4c79-88b7-eb70be1c0a68/post_graduation_marksheet_1788782349624.pdf', 'completed', '2026-09-07T11:59:09.632Z'::timestamptz, '2026-09-07T11:59:10.743Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('5a123699-5332-4525-a417-b9816b2b62c6', 'sv_fbc5a09c-460f-44d9-afd1-9b409492ea36', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 15, 'student/fbc5a09c-460f-44d9-afd1-9b409492ea36/documents/abc_id/5a123699-5332-4525-a417-b9816b2b62c6/abc_id_1788782350164.pdf', 'completed', '2026-09-07T11:59:10.168Z'::timestamptz, '2026-09-07T11:59:10.743Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788782599801_d1', 'sv_test_student_new_1788782599801', 'test_student_new_1788782599801', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788782599801_d2', 'sv_test_student_new_1788782599801', 'test_student_new_1788782599801', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788782599801_d3', 'sv_test_student_new_1788782599801', 'test_student_new_1788782599801', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788782599801_d4', 'sv_test_student_new_1788782599801', 'test_student_new_1788782599801', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788782599801_d1', 'sv_test_student_adv_1788782599801', 'test_student_adv_1788782599801', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788782599801_d2', 'sv_test_student_adv_1788782599801', 'test_student_adv_1788782599801', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788782599801_d3', 'sv_test_student_adv_1788782599801', 'test_student_adv_1788782599801', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788782599801_d4', 'sv_test_student_adv_1788782599801', 'test_student_adv_1788782599801', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788782599801_d1', 'sv_test_student_learn_1788782599801', 'test_student_learn_1788782599801', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788782599801_d2', 'sv_test_student_learn_1788782599801', 'test_student_learn_1788782599801', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788782599801_d3', 'sv_test_student_learn_1788782599801', 'test_student_learn_1788782599801', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788782599801_d4', 'sv_test_student_learn_1788782599801', 'test_student_learn_1788782599801', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788782599801_d1', 'sv_test_student_b_1788782599801', 'test_student_b_1788782599801', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788782599801_d2', 'sv_test_student_b_1788782599801', 'test_student_b_1788782599801', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788782599801_d3', 'sv_test_student_b_1788782599801', 'test_student_b_1788782599801', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788782599801_d4', 'sv_test_student_b_1788782599801', 'test_student_b_1788782599801', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_14_1788782607685_d1', 'sv_test_student_14_1788782607685', 'test_student_14_1788782607685', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_14_1788782607685_d2', 'sv_test_student_14_1788782607685', 'test_student_14_1788782607685', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_14_1788782607685_d3', 'sv_test_student_14_1788782607685', 'test_student_14_1788782607685', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_14_1788782607685_d4', 'sv_test_student_14_1788782607685', 'test_student_14_1788782607685', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784103103_doc_id_1788784103103', 'sv_stu_34_new_1788784103103', 'stu_34_new_1788784103103', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784103103_doc_marks_1788784103103', 'sv_stu_34_new_1788784103103', 'stu_34_new_1788784103103', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784103103_doc_abc_1788784103103', 'sv_stu_34_new_1788784103103', 'stu_34_new_1788784103103', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784103103_doc_id_1788784103103', 'sv_stu_34_adv_1788784103103', 'stu_34_adv_1788784103103', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784103103_doc_marks_1788784103103', 'sv_stu_34_adv_1788784103103', 'stu_34_adv_1788784103103', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784103103_doc_abc_1788784103103', 'sv_stu_34_adv_1788784103103', 'stu_34_adv_1788784103103', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784103103_doc_id_1788784103103', 'sv_stu_34_lrn_1788784103103', 'stu_34_lrn_1788784103103', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784103103_doc_marks_1788784103103', 'sv_stu_34_lrn_1788784103103', 'stu_34_lrn_1788784103103', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784103103_doc_abc_1788784103103', 'sv_stu_34_lrn_1788784103103', 'stu_34_lrn_1788784103103', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784103103_doc_id_1788784103103', 'sv_stu_34_other_1788784103103', 'stu_34_other_1788784103103', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784103103_doc_marks_1788784103103', 'sv_stu_34_other_1788784103103', 'stu_34_other_1788784103103', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784103103_doc_abc_1788784103103', 'sv_stu_34_other_1788784103103', 'stu_34_other_1788784103103', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784129009_doc_id_1788784129009', 'sv_stu_34_new_1788784129009', 'stu_34_new_1788784129009', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784129009_doc_marks_1788784129009', 'sv_stu_34_new_1788784129009', 'stu_34_new_1788784129009', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784129009_doc_abc_1788784129009', 'sv_stu_34_new_1788784129009', 'stu_34_new_1788784129009', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784129009_doc_id_1788784129009', 'sv_stu_34_adv_1788784129009', 'stu_34_adv_1788784129009', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784129009_doc_marks_1788784129009', 'sv_stu_34_adv_1788784129009', 'stu_34_adv_1788784129009', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784129009_doc_abc_1788784129009', 'sv_stu_34_adv_1788784129009', 'stu_34_adv_1788784129009', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784129009_doc_id_1788784129009', 'sv_stu_34_lrn_1788784129009', 'stu_34_lrn_1788784129009', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784129009_doc_marks_1788784129009', 'sv_stu_34_lrn_1788784129009', 'stu_34_lrn_1788784129009', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784129009_doc_abc_1788784129009', 'sv_stu_34_lrn_1788784129009', 'stu_34_lrn_1788784129009', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784129009_doc_id_1788784129009', 'sv_stu_34_other_1788784129009', 'stu_34_other_1788784129009', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784129009_doc_marks_1788784129009', 'sv_stu_34_other_1788784129009', 'stu_34_other_1788784129009', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784129009_doc_abc_1788784129009', 'sv_stu_34_other_1788784129009', 'stu_34_other_1788784129009', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784159011_doc_id_1788784159011', 'sv_stu_34_new_1788784159011', 'stu_34_new_1788784159011', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784159011_doc_marks_1788784159011', 'sv_stu_34_new_1788784159011', 'stu_34_new_1788784159011', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784159011_doc_abc_1788784159011', 'sv_stu_34_new_1788784159011', 'stu_34_new_1788784159011', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784159011_doc_id_1788784159011', 'sv_stu_34_adv_1788784159011', 'stu_34_adv_1788784159011', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784159011_doc_marks_1788784159011', 'sv_stu_34_adv_1788784159011', 'stu_34_adv_1788784159011', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784159011_doc_abc_1788784159011', 'sv_stu_34_adv_1788784159011', 'stu_34_adv_1788784159011', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784159011_doc_id_1788784159011', 'sv_stu_34_lrn_1788784159011', 'stu_34_lrn_1788784159011', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784159011_doc_marks_1788784159011', 'sv_stu_34_lrn_1788784159011', 'stu_34_lrn_1788784159011', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784159011_doc_abc_1788784159011', 'sv_stu_34_lrn_1788784159011', 'stu_34_lrn_1788784159011', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784159011_doc_id_1788784159011', 'sv_stu_34_other_1788784159011', 'stu_34_other_1788784159011', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784159011_doc_marks_1788784159011', 'sv_stu_34_other_1788784159011', 'stu_34_other_1788784159011', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784159011_doc_abc_1788784159011', 'sv_stu_34_other_1788784159011', 'stu_34_other_1788784159011', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784192714_doc_id_1788784192714', 'sv_stu_34_new_1788784192714', 'stu_34_new_1788784192714', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784192714_doc_marks_1788784192714', 'sv_stu_34_new_1788784192714', 'stu_34_new_1788784192714', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784192714_doc_abc_1788784192714', 'sv_stu_34_new_1788784192714', 'stu_34_new_1788784192714', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784192714_doc_id_1788784192714', 'sv_stu_34_adv_1788784192714', 'stu_34_adv_1788784192714', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784192714_doc_marks_1788784192714', 'sv_stu_34_adv_1788784192714', 'stu_34_adv_1788784192714', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784192714_doc_abc_1788784192714', 'sv_stu_34_adv_1788784192714', 'stu_34_adv_1788784192714', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784192714_doc_id_1788784192714', 'sv_stu_34_lrn_1788784192714', 'stu_34_lrn_1788784192714', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784192714_doc_marks_1788784192714', 'sv_stu_34_lrn_1788784192714', 'stu_34_lrn_1788784192714', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784192714_doc_abc_1788784192714', 'sv_stu_34_lrn_1788784192714', 'stu_34_lrn_1788784192714', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784192714_doc_id_1788784192714', 'sv_stu_34_other_1788784192714', 'stu_34_other_1788784192714', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784192714_doc_marks_1788784192714', 'sv_stu_34_other_1788784192714', 'stu_34_other_1788784192714', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784192714_doc_abc_1788784192714', 'sv_stu_34_other_1788784192714', 'stu_34_other_1788784192714', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784312511_doc_id_1788784312511', 'sv_stu_34_new_1788784312511', 'stu_34_new_1788784312511', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784312511_doc_marks_1788784312511', 'sv_stu_34_new_1788784312511', 'stu_34_new_1788784312511', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784312511_doc_abc_1788784312511', 'sv_stu_34_new_1788784312511', 'stu_34_new_1788784312511', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784312511_doc_id_1788784312511', 'sv_stu_34_adv_1788784312511', 'stu_34_adv_1788784312511', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784312511_doc_marks_1788784312511', 'sv_stu_34_adv_1788784312511', 'stu_34_adv_1788784312511', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784312511_doc_abc_1788784312511', 'sv_stu_34_adv_1788784312511', 'stu_34_adv_1788784312511', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784312511_doc_id_1788784312511', 'sv_stu_34_lrn_1788784312511', 'stu_34_lrn_1788784312511', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784312511_doc_marks_1788784312511', 'sv_stu_34_lrn_1788784312511', 'stu_34_lrn_1788784312511', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784312511_doc_abc_1788784312511', 'sv_stu_34_lrn_1788784312511', 'stu_34_lrn_1788784312511', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784312511_doc_id_1788784312511', 'sv_stu_34_other_1788784312511', 'stu_34_other_1788784312511', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784312511_doc_marks_1788784312511', 'sv_stu_34_other_1788784312511', 'stu_34_other_1788784312511', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784312511_doc_abc_1788784312511', 'sv_stu_34_other_1788784312511', 'stu_34_other_1788784312511', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784335671_doc_id_1788784335671', 'sv_stu_34_new_1788784335671', 'stu_34_new_1788784335671', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784335671_doc_marks_1788784335671', 'sv_stu_34_new_1788784335671', 'stu_34_new_1788784335671', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784335671_doc_abc_1788784335671', 'sv_stu_34_new_1788784335671', 'stu_34_new_1788784335671', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784335671_doc_id_1788784335671', 'sv_stu_34_adv_1788784335671', 'stu_34_adv_1788784335671', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-09T18:19:15.920Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784335671_doc_marks_1788784335671', 'sv_stu_34_adv_1788784335671', 'stu_34_adv_1788784335671', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-09T18:19:15.920Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784335671_doc_abc_1788784335671', 'sv_stu_34_adv_1788784335671', 'stu_34_adv_1788784335671', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-09T18:19:15.920Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784335671_doc_id_1788784335671', 'sv_stu_34_lrn_1788784335671', 'stu_34_lrn_1788784335671', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784335671_doc_marks_1788784335671', 'sv_stu_34_lrn_1788784335671', 'stu_34_lrn_1788784335671', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784335671_doc_abc_1788784335671', 'sv_stu_34_lrn_1788784335671', 'stu_34_lrn_1788784335671', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784335671_doc_id_1788784335671', 'sv_stu_34_other_1788784335671', 'stu_34_other_1788784335671', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784335671_doc_marks_1788784335671', 'sv_stu_34_other_1788784335671', 'stu_34_other_1788784335671', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784335671_doc_abc_1788784335671', 'sv_stu_34_other_1788784335671', 'stu_34_other_1788784335671', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784438121_doc_id_1788784438121', 'sv_stu_34_new_1788784438121', 'stu_34_new_1788784438121', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784438121_doc_marks_1788784438121', 'sv_stu_34_new_1788784438121', 'stu_34_new_1788784438121', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784438121_doc_abc_1788784438121', 'sv_stu_34_new_1788784438121', 'stu_34_new_1788784438121', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784438121_doc_id_1788784438121', 'sv_stu_34_adv_1788784438121', 'stu_34_adv_1788784438121', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-09T18:19:19.492Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784438121_doc_marks_1788784438121', 'sv_stu_34_adv_1788784438121', 'stu_34_adv_1788784438121', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-09T18:19:19.492Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784438121_doc_abc_1788784438121', 'sv_stu_34_adv_1788784438121', 'stu_34_adv_1788784438121', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-09T18:19:19.492Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784438121_doc_id_1788784438121', 'sv_stu_34_lrn_1788784438121', 'stu_34_lrn_1788784438121', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784438121_doc_marks_1788784438121', 'sv_stu_34_lrn_1788784438121', 'stu_34_lrn_1788784438121', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784438121_doc_abc_1788784438121', 'sv_stu_34_lrn_1788784438121', 'stu_34_lrn_1788784438121', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784438121_doc_id_1788784438121', 'sv_stu_34_other_1788784438121', 'stu_34_other_1788784438121', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784438121_doc_marks_1788784438121', 'sv_stu_34_other_1788784438121', 'stu_34_other_1788784438121', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784438121_doc_abc_1788784438121', 'sv_stu_34_other_1788784438121', 'stu_34_other_1788784438121', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784460729_doc_id_1788784460729', 'sv_stu_34_new_1788784460729', 'stu_34_new_1788784460729', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784460729_doc_marks_1788784460729', 'sv_stu_34_new_1788784460729', 'stu_34_new_1788784460729', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784460729_doc_abc_1788784460729', 'sv_stu_34_new_1788784460729', 'stu_34_new_1788784460729', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784460729_doc_id_1788784460729', 'sv_stu_34_adv_1788784460729', 'stu_34_adv_1788784460729', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-09T18:19:18.088Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784460729_doc_marks_1788784460729', 'sv_stu_34_adv_1788784460729', 'stu_34_adv_1788784460729', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-09T18:19:18.088Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784460729_doc_abc_1788784460729', 'sv_stu_34_adv_1788784460729', 'stu_34_adv_1788784460729', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-09T18:19:18.088Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784460729_doc_id_1788784460729', 'sv_stu_34_lrn_1788784460729', 'stu_34_lrn_1788784460729', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784460729_doc_marks_1788784460729', 'sv_stu_34_lrn_1788784460729', 'stu_34_lrn_1788784460729', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784460729_doc_abc_1788784460729', 'sv_stu_34_lrn_1788784460729', 'stu_34_lrn_1788784460729', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784460729_doc_id_1788784460729', 'sv_stu_34_other_1788784460729', 'stu_34_other_1788784460729', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784460729_doc_marks_1788784460729', 'sv_stu_34_other_1788784460729', 'stu_34_other_1788784460729', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784460729_doc_abc_1788784460729', 'sv_stu_34_other_1788784460729', 'stu_34_other_1788784460729', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784485808_doc_id_1788784485808', 'sv_stu_34_new_1788784485808', 'stu_34_new_1788784485808', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:50.983Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784485808_doc_marks_1788784485808', 'sv_stu_34_new_1788784485808', 'stu_34_new_1788784485808', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:50.983Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784485808_doc_abc_1788784485808', 'sv_stu_34_new_1788784485808', 'stu_34_new_1788784485808', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:50.983Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784485808_doc_id_1788784485808', 'sv_stu_34_adv_1788784485808', 'stu_34_adv_1788784485808', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:49.081Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784485808_doc_marks_1788784485808', 'sv_stu_34_adv_1788784485808', 'stu_34_adv_1788784485808', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:49.081Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784485808_doc_abc_1788784485808', 'sv_stu_34_adv_1788784485808', 'stu_34_adv_1788784485808', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:49.081Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784485808_doc_id_1788784485808', 'sv_stu_34_lrn_1788784485808', 'stu_34_lrn_1788784485808', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784485808_doc_marks_1788784485808', 'sv_stu_34_lrn_1788784485808', 'stu_34_lrn_1788784485808', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784485808_doc_abc_1788784485808', 'sv_stu_34_lrn_1788784485808', 'stu_34_lrn_1788784485808', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784485808_doc_id_1788784485808', 'sv_stu_34_other_1788784485808', 'stu_34_other_1788784485808', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784485808_doc_marks_1788784485808', 'sv_stu_34_other_1788784485808', 'stu_34_other_1788784485808', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784485808_doc_abc_1788784485808', 'sv_stu_34_other_1788784485808', 'stu_34_other_1788784485808', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784515470_doc_id_1788784515470', 'sv_stu_34_new_1788784515470', 'stu_34_new_1788784515470', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:19.378Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784515470_doc_marks_1788784515470', 'sv_stu_34_new_1788784515470', 'stu_34_new_1788784515470', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:19.378Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784515470_doc_abc_1788784515470', 'sv_stu_34_new_1788784515470', 'stu_34_new_1788784515470', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:19.378Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784515470_doc_id_1788784515470', 'sv_stu_34_adv_1788784515470', 'stu_34_adv_1788784515470', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:17.806Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784515470_doc_marks_1788784515470', 'sv_stu_34_adv_1788784515470', 'stu_34_adv_1788784515470', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:17.806Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784515470_doc_abc_1788784515470', 'sv_stu_34_adv_1788784515470', 'stu_34_adv_1788784515470', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:17.806Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784515470_doc_id_1788784515470', 'sv_stu_34_lrn_1788784515470', 'stu_34_lrn_1788784515470', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:19.759Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784515470_doc_marks_1788784515470', 'sv_stu_34_lrn_1788784515470', 'stu_34_lrn_1788784515470', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:19.759Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784515470_doc_abc_1788784515470', 'sv_stu_34_lrn_1788784515470', 'stu_34_lrn_1788784515470', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:19.759Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784515470_doc_id_1788784515470', 'sv_stu_34_other_1788784515470', 'stu_34_other_1788784515470', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784515470_doc_marks_1788784515470', 'sv_stu_34_other_1788784515470', 'stu_34_other_1788784515470', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784515470_doc_abc_1788784515470', 'sv_stu_34_other_1788784515470', 'stu_34_other_1788784515470', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784556639_doc_id_1788784556639', 'sv_stu_34_new_1788784556639', 'stu_34_new_1788784556639', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784556639_doc_photo_1788784556639', 'sv_stu_34_new_1788784556639', 'stu_34_new_1788784556639', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784556639_doc_marks_1788784556639', 'sv_stu_34_new_1788784556639', 'stu_34_new_1788784556639', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784556639_doc_abc_1788784556639', 'sv_stu_34_new_1788784556639', 'stu_34_new_1788784556639', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784556639_doc_id_1788784556639', 'sv_stu_34_adv_1788784556639', 'stu_34_adv_1788784556639', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784556639_doc_photo_1788784556639', 'sv_stu_34_adv_1788784556639', 'stu_34_adv_1788784556639', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784556639_doc_marks_1788784556639', 'sv_stu_34_adv_1788784556639', 'stu_34_adv_1788784556639', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784556639_doc_abc_1788784556639', 'sv_stu_34_adv_1788784556639', 'stu_34_adv_1788784556639', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784556639_doc_id_1788784556639', 'sv_stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784556639_doc_photo_1788784556639', 'sv_stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784556639_doc_marks_1788784556639', 'sv_stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784556639_doc_abc_1788784556639', 'sv_stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784556639_doc_id_1788784556639', 'sv_stu_34_other_1788784556639', 'stu_34_other_1788784556639', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784556639_doc_photo_1788784556639', 'sv_stu_34_other_1788784556639', 'stu_34_other_1788784556639', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784556639_doc_marks_1788784556639', 'sv_stu_34_other_1788784556639', 'stu_34_other_1788784556639', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784556639_doc_abc_1788784556639', 'sv_stu_34_other_1788784556639', 'stu_34_other_1788784556639', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784583072_doc_id_1788784583072', 'sv_stu_34_new_1788784583072', 'stu_34_new_1788784583072', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784583072_doc_photo_1788784583072', 'sv_stu_34_new_1788784583072', 'stu_34_new_1788784583072', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784583072_doc_marks_1788784583072', 'sv_stu_34_new_1788784583072', 'stu_34_new_1788784583072', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784583072_doc_abc_1788784583072', 'sv_stu_34_new_1788784583072', 'stu_34_new_1788784583072', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784583072_doc_id_1788784583072', 'sv_stu_34_adv_1788784583072', 'stu_34_adv_1788784583072', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784583072_doc_photo_1788784583072', 'sv_stu_34_adv_1788784583072', 'stu_34_adv_1788784583072', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784583072_doc_marks_1788784583072', 'sv_stu_34_adv_1788784583072', 'stu_34_adv_1788784583072', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784583072_doc_abc_1788784583072', 'sv_stu_34_adv_1788784583072', 'stu_34_adv_1788784583072', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784583072_doc_id_1788784583072', 'sv_stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784583072_doc_photo_1788784583072', 'sv_stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784583072_doc_marks_1788784583072', 'sv_stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784583072_doc_abc_1788784583072', 'sv_stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784583072_doc_id_1788784583072', 'sv_stu_34_other_1788784583072', 'stu_34_other_1788784583072', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784583072_doc_photo_1788784583072', 'sv_stu_34_other_1788784583072', 'stu_34_other_1788784583072', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784583072_doc_marks_1788784583072', 'sv_stu_34_other_1788784583072', 'stu_34_other_1788784583072', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784583072_doc_abc_1788784583072', 'sv_stu_34_other_1788784583072', 'stu_34_other_1788784583072', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784626397_doc_id_1788784626397', 'sv_stu_34_new_1788784626397', 'stu_34_new_1788784626397', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784626397_doc_photo_1788784626397', 'sv_stu_34_new_1788784626397', 'stu_34_new_1788784626397', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784626397_doc_marks_1788784626397', 'sv_stu_34_new_1788784626397', 'stu_34_new_1788784626397', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784626397_doc_abc_1788784626397', 'sv_stu_34_new_1788784626397', 'stu_34_new_1788784626397', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784626397_doc_id_1788784626397', 'sv_stu_34_adv_1788784626397', 'stu_34_adv_1788784626397', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784626397_doc_photo_1788784626397', 'sv_stu_34_adv_1788784626397', 'stu_34_adv_1788784626397', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784626397_doc_marks_1788784626397', 'sv_stu_34_adv_1788784626397', 'stu_34_adv_1788784626397', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784626397_doc_abc_1788784626397', 'sv_stu_34_adv_1788784626397', 'stu_34_adv_1788784626397', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784626397_doc_id_1788784626397', 'sv_stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784626397_doc_photo_1788784626397', 'sv_stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784626397_doc_marks_1788784626397', 'sv_stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784626397_doc_abc_1788784626397', 'sv_stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784626397_doc_id_1788784626397', 'sv_stu_34_other_1788784626397', 'stu_34_other_1788784626397', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784626397_doc_photo_1788784626397', 'sv_stu_34_other_1788784626397', 'stu_34_other_1788784626397', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784626397_doc_marks_1788784626397', 'sv_stu_34_other_1788784626397', 'stu_34_other_1788784626397', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784626397_doc_abc_1788784626397', 'sv_stu_34_other_1788784626397', 'stu_34_other_1788784626397', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('25e06511-6778-49a3-8308-a5aea586ce91', 'sv_bc5536f5-6bb5-4725-a9a5-3107e5cf7747', 'bc5536f5-6bb5-4725-a9a5-3107e5cf7747', 'student_id', NULL, 'blank_image.png', 'image/png', 912, 'student/bc5536f5-6bb5-4725-a9a5-3107e5cf7747/documents/student_id/25e06511-6778-49a3-8308-a5aea586ce91/student_id_1788784785370.png', 'completed', '2026-09-07T12:39:45.379Z'::timestamptz, '2026-09-07T12:39:45.409Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788784801588_d1', 'sv_test_student_new_1788784801588', 'test_student_new_1788784801588', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788784801588_d2', 'sv_test_student_new_1788784801588', 'test_student_new_1788784801588', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788784801588_d3', 'sv_test_student_new_1788784801588', 'test_student_new_1788784801588', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_new_1788784801588_d4', 'sv_test_student_new_1788784801588', 'test_student_new_1788784801588', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788784801588_d1', 'sv_test_student_adv_1788784801588', 'test_student_adv_1788784801588', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788784801588_d2', 'sv_test_student_adv_1788784801588', 'test_student_adv_1788784801588', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788784801588_d3', 'sv_test_student_adv_1788784801588', 'test_student_adv_1788784801588', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_adv_1788784801588_d4', 'sv_test_student_adv_1788784801588', 'test_student_adv_1788784801588', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788784801588_d1', 'sv_test_student_learn_1788784801588', 'test_student_learn_1788784801588', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788784801588_d2', 'sv_test_student_learn_1788784801588', 'test_student_learn_1788784801588', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788784801588_d3', 'sv_test_student_learn_1788784801588', 'test_student_learn_1788784801588', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_learn_1788784801588_d4', 'sv_test_student_learn_1788784801588', 'test_student_learn_1788784801588', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788784801588_d1', 'sv_test_student_b_1788784801588', 'test_student_b_1788784801588', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788784801588_d2', 'sv_test_student_b_1788784801588', 'test_student_b_1788784801588', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k2', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788784801588_d3', 'sv_test_student_b_1788784801588', 'test_student_b_1788784801588', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('test_student_b_1788784801588_d4', 'sv_test_student_b_1788784801588', 'test_student_b_1788784801588', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k4', 'completed', '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784864571_doc_id_1788784864571', 'sv_stu_34_new_1788784864571', 'stu_34_new_1788784864571', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784864571_doc_photo_1788784864571', 'sv_stu_34_new_1788784864571', 'stu_34_new_1788784864571', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784864571_doc_marks_1788784864571', 'sv_stu_34_new_1788784864571', 'stu_34_new_1788784864571', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788784864571_doc_abc_1788784864571', 'sv_stu_34_new_1788784864571', 'stu_34_new_1788784864571', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784864571_doc_id_1788784864571', 'sv_stu_34_adv_1788784864571', 'stu_34_adv_1788784864571', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784864571_doc_photo_1788784864571', 'sv_stu_34_adv_1788784864571', 'stu_34_adv_1788784864571', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784864571_doc_marks_1788784864571', 'sv_stu_34_adv_1788784864571', 'stu_34_adv_1788784864571', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788784864571_doc_abc_1788784864571', 'sv_stu_34_adv_1788784864571', 'stu_34_adv_1788784864571', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784864571_doc_id_1788784864571', 'sv_stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784864571_doc_photo_1788784864571', 'sv_stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784864571_doc_marks_1788784864571', 'sv_stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788784864571_doc_abc_1788784864571', 'sv_stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784864571_doc_id_1788784864571', 'sv_stu_34_other_1788784864571', 'stu_34_other_1788784864571', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784864571_doc_photo_1788784864571', 'sv_stu_34_other_1788784864571', 'stu_34_other_1788784864571', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784864571_doc_marks_1788784864571', 'sv_stu_34_other_1788784864571', 'stu_34_other_1788784864571', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788784864571_doc_abc_1788784864571', 'sv_stu_34_other_1788784864571', 'stu_34_other_1788784864571', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788787784013_doc_id_1788787784013', 'sv_stu_34_new_1788787784013', 'stu_34_new_1788787784013', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788787784013_doc_photo_1788787784013', 'sv_stu_34_new_1788787784013', 'stu_34_new_1788787784013', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788787784013_doc_marks_1788787784013', 'sv_stu_34_new_1788787784013', 'stu_34_new_1788787784013', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788787784013_doc_abc_1788787784013', 'sv_stu_34_new_1788787784013', 'stu_34_new_1788787784013', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788787784013_doc_id_1788787784013', 'sv_stu_34_adv_1788787784013', 'stu_34_adv_1788787784013', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788787784013_doc_photo_1788787784013', 'sv_stu_34_adv_1788787784013', 'stu_34_adv_1788787784013', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788787784013_doc_marks_1788787784013', 'sv_stu_34_adv_1788787784013', 'stu_34_adv_1788787784013', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788787784013_doc_abc_1788787784013', 'sv_stu_34_adv_1788787784013', 'stu_34_adv_1788787784013', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788787784013_doc_id_1788787784013', 'sv_stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788787784013_doc_photo_1788787784013', 'sv_stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788787784013_doc_marks_1788787784013', 'sv_stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788787784013_doc_abc_1788787784013', 'sv_stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788787784013_doc_id_1788787784013', 'sv_stu_34_other_1788787784013', 'stu_34_other_1788787784013', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788787784013_doc_photo_1788787784013', 'sv_stu_34_other_1788787784013', 'stu_34_other_1788787784013', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788787784013_doc_marks_1788787784013', 'sv_stu_34_other_1788787784013', 'stu_34_other_1788787784013', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788787784013_doc_abc_1788787784013', 'sv_stu_34_other_1788787784013', 'stu_34_other_1788787784013', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788787810448_doc_id_1788787810448', 'sv_stu_34_new_1788787810448', 'stu_34_new_1788787810448', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788787810448_doc_photo_1788787810448', 'sv_stu_34_new_1788787810448', 'stu_34_new_1788787810448', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788787810448_doc_marks_1788787810448', 'sv_stu_34_new_1788787810448', 'stu_34_new_1788787810448', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788787810448_doc_abc_1788787810448', 'sv_stu_34_new_1788787810448', 'stu_34_new_1788787810448', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788787810448_doc_id_1788787810448', 'sv_stu_34_adv_1788787810448', 'stu_34_adv_1788787810448', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788787810448_doc_photo_1788787810448', 'sv_stu_34_adv_1788787810448', 'stu_34_adv_1788787810448', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788787810448_doc_marks_1788787810448', 'sv_stu_34_adv_1788787810448', 'stu_34_adv_1788787810448', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788787810448_doc_abc_1788787810448', 'sv_stu_34_adv_1788787810448', 'stu_34_adv_1788787810448', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788787810448_doc_id_1788787810448', 'sv_stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788787810448_doc_photo_1788787810448', 'sv_stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788787810448_doc_marks_1788787810448', 'sv_stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788787810448_doc_abc_1788787810448', 'sv_stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788787810448_doc_id_1788787810448', 'sv_stu_34_other_1788787810448', 'stu_34_other_1788787810448', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788787810448_doc_photo_1788787810448', 'sv_stu_34_other_1788787810448', 'stu_34_other_1788787810448', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788787810448_doc_marks_1788787810448', 'sv_stu_34_other_1788787810448', 'stu_34_other_1788787810448', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788787810448_doc_abc_1788787810448', 'sv_stu_34_other_1788787810448', 'stu_34_other_1788787810448', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788806285059_doc_id_1788806285059', 'sv_stu_34_new_1788806285059', 'stu_34_new_1788806285059', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788806285059_doc_photo_1788806285059', 'sv_stu_34_new_1788806285059', 'stu_34_new_1788806285059', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788806285059_doc_marks_1788806285059', 'sv_stu_34_new_1788806285059', 'stu_34_new_1788806285059', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788806285059_doc_abc_1788806285059', 'sv_stu_34_new_1788806285059', 'stu_34_new_1788806285059', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788806285059_doc_id_1788806285059', 'sv_stu_34_adv_1788806285059', 'stu_34_adv_1788806285059', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788806285059_doc_photo_1788806285059', 'sv_stu_34_adv_1788806285059', 'stu_34_adv_1788806285059', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788806285059_doc_marks_1788806285059', 'sv_stu_34_adv_1788806285059', 'stu_34_adv_1788806285059', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788806285059_doc_abc_1788806285059', 'sv_stu_34_adv_1788806285059', 'stu_34_adv_1788806285059', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788806285059_doc_id_1788806285059', 'sv_stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788806285059_doc_photo_1788806285059', 'sv_stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788806285059_doc_marks_1788806285059', 'sv_stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788806285059_doc_abc_1788806285059', 'sv_stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788806285059_doc_id_1788806285059', 'sv_stu_34_other_1788806285059', 'stu_34_other_1788806285059', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788806285059_doc_photo_1788806285059', 'sv_stu_34_other_1788806285059', 'stu_34_other_1788806285059', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788806285059_doc_marks_1788806285059', 'sv_stu_34_other_1788806285059', 'stu_34_other_1788806285059', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788806285059_doc_abc_1788806285059', 'sv_stu_34_other_1788806285059', 'stu_34_other_1788806285059', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788806594421_doc_id_1788806594421', 'sv_stu_34_new_1788806594421', 'stu_34_new_1788806594421', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788806594421_doc_photo_1788806594421', 'sv_stu_34_new_1788806594421', 'stu_34_new_1788806594421', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788806594421_doc_marks_1788806594421', 'sv_stu_34_new_1788806594421', 'stu_34_new_1788806594421', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788806594421_doc_abc_1788806594421', 'sv_stu_34_new_1788806594421', 'stu_34_new_1788806594421', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788806594421_doc_id_1788806594421', 'sv_stu_34_adv_1788806594421', 'stu_34_adv_1788806594421', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788806594421_doc_photo_1788806594421', 'sv_stu_34_adv_1788806594421', 'stu_34_adv_1788806594421', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788806594421_doc_marks_1788806594421', 'sv_stu_34_adv_1788806594421', 'stu_34_adv_1788806594421', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788806594421_doc_abc_1788806594421', 'sv_stu_34_adv_1788806594421', 'stu_34_adv_1788806594421', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788806594421_doc_id_1788806594421', 'sv_stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788806594421_doc_photo_1788806594421', 'sv_stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788806594421_doc_marks_1788806594421', 'sv_stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788806594421_doc_abc_1788806594421', 'sv_stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788806594421_doc_id_1788806594421', 'sv_stu_34_other_1788806594421', 'stu_34_other_1788806594421', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788806594421_doc_photo_1788806594421', 'sv_stu_34_other_1788806594421', 'stu_34_other_1788806594421', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788806594421_doc_marks_1788806594421', 'sv_stu_34_other_1788806594421', 'stu_34_other_1788806594421', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788806594421_doc_abc_1788806594421', 'sv_stu_34_other_1788806594421', 'stu_34_other_1788806594421', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788808155355_doc_id_1788808155355', 'sv_stu_34_new_1788808155355', 'stu_34_new_1788808155355', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788808155355_doc_photo_1788808155355', 'sv_stu_34_new_1788808155355', 'stu_34_new_1788808155355', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788808155355_doc_marks_1788808155355', 'sv_stu_34_new_1788808155355', 'stu_34_new_1788808155355', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788808155355_doc_abc_1788808155355', 'sv_stu_34_new_1788808155355', 'stu_34_new_1788808155355', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788808155355_doc_id_1788808155355', 'sv_stu_34_adv_1788808155355', 'stu_34_adv_1788808155355', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788808155355_doc_photo_1788808155355', 'sv_stu_34_adv_1788808155355', 'stu_34_adv_1788808155355', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788808155355_doc_marks_1788808155355', 'sv_stu_34_adv_1788808155355', 'stu_34_adv_1788808155355', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788808155355_doc_abc_1788808155355', 'sv_stu_34_adv_1788808155355', 'stu_34_adv_1788808155355', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788808155355_doc_id_1788808155355', 'sv_stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788808155355_doc_photo_1788808155355', 'sv_stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788808155355_doc_marks_1788808155355', 'sv_stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788808155355_doc_abc_1788808155355', 'sv_stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788808155355_doc_id_1788808155355', 'sv_stu_34_other_1788808155355', 'stu_34_other_1788808155355', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788808155355_doc_photo_1788808155355', 'sv_stu_34_other_1788808155355', 'stu_34_other_1788808155355', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788808155355_doc_marks_1788808155355', 'sv_stu_34_other_1788808155355', 'stu_34_other_1788808155355', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788808155355_doc_abc_1788808155355', 'sv_stu_34_other_1788808155355', 'stu_34_other_1788808155355', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788809444883_doc_id_1788809444883', 'sv_stu_34_new_1788809444883', 'stu_34_new_1788809444883', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788809444883_doc_photo_1788809444883', 'sv_stu_34_new_1788809444883', 'stu_34_new_1788809444883', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788809444883_doc_marks_1788809444883', 'sv_stu_34_new_1788809444883', 'stu_34_new_1788809444883', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_new_1788809444883_doc_abc_1788809444883', 'sv_stu_34_new_1788809444883', 'stu_34_new_1788809444883', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788809444883_doc_id_1788809444883', 'sv_stu_34_adv_1788809444883', 'stu_34_adv_1788809444883', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788809444883_doc_photo_1788809444883', 'sv_stu_34_adv_1788809444883', 'stu_34_adv_1788809444883', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788809444883_doc_marks_1788809444883', 'sv_stu_34_adv_1788809444883', 'stu_34_adv_1788809444883', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_adv_1788809444883_doc_abc_1788809444883', 'sv_stu_34_adv_1788809444883', 'stu_34_adv_1788809444883', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788809444883_doc_id_1788809444883', 'sv_stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788809444883_doc_photo_1788809444883', 'sv_stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788809444883_doc_marks_1788809444883', 'sv_stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_lrn_1788809444883_doc_abc_1788809444883', 'sv_stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788809444883_doc_id_1788809444883', 'sv_stu_34_other_1788809444883', 'stu_34_other_1788809444883', 'student_id', NULL, 'id.pdf', 'application/pdf', 1024, 'k1', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788809444883_doc_photo_1788809444883', 'sv_stu_34_other_1788809444883', 'stu_34_other_1788809444883', 'passport_photo', NULL, 'photo.jpg', 'image/jpeg', 1024, 'k4', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788809444883_doc_marks_1788809444883', 'sv_stu_34_other_1788809444883', 'stu_34_other_1788809444883', 'post_graduation_marksheet', NULL, 'marks.pdf', 'application/pdf', 1024, 'k2', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('stu_34_other_1788809444883_doc_abc_1788809444883', 'sv_stu_34_other_1788809444883', 'stu_34_other_1788809444883', 'abc_id', NULL, 'abc.pdf', 'application/pdf', 1024, 'k3', 'completed', '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('0d2ddfbc-adbd-4d2d-aeee-1521489c01e5', 'sv_1ff7662b-94c3-4c76-ac2d-039c6116499b', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 'student_id', NULL, 'id card.png', 'image/png', 672388, 'student/1ff7662b-94c3-4c76-ac2d-039c6116499b/documents/student_id/0d2ddfbc-adbd-4d2d-aeee-1521489c01e5/student_id_1788868133201.png', 'completed', '2026-09-08T11:48:53.366Z'::timestamptz, '2026-09-09T12:25:19.192Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('75ed284c-9497-4bef-b777-268d6e375ecf', 'sv_1ff7662b-94c3-4c76-ac2d-039c6116499b', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 'passport_photo', NULL, 'Passport size photo.jpeg', 'image/jpeg', 115729, 'student/1ff7662b-94c3-4c76-ac2d-039c6116499b/documents/passport_photo/75ed284c-9497-4bef-b777-268d6e375ecf/passport_photo_1788868147691.jpeg', 'completed', '2026-09-08T11:49:07.740Z'::timestamptz, '2026-09-09T12:25:19.192Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('bb3f72cb-0257-4c69-b023-8624fc2bd00c', 'sv_1ff7662b-94c3-4c76-ac2d-039c6116499b', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 'post_graduation_marksheet', 'post_graduation_marksheet', '12.jpeg', 'image/jpeg', 236429, 'student/1ff7662b-94c3-4c76-ac2d-039c6116499b/documents/post_graduation_marksheet/bb3f72cb-0257-4c69-b023-8624fc2bd00c/post_graduation_marksheet_1788868149009.jpeg', 'completed', '2026-09-08T11:49:09.039Z'::timestamptz, '2026-09-09T12:25:19.192Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('807fd2eb-d2c2-46c2-9bcf-a3ead62c1739', 'sv_1ff7662b-94c3-4c76-ac2d-039c6116499b', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 'abc_id', NULL, '10.jpeg', 'image/jpeg', 552282, 'student/1ff7662b-94c3-4c76-ac2d-039c6116499b/documents/abc_id/807fd2eb-d2c2-46c2-9bcf-a3ead62c1739/abc_id_1788868150202.jpeg', 'completed', '2026-09-08T11:49:10.251Z'::timestamptz, '2026-09-09T12:25:19.192Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('bef0d786-7e8c-4662-81b1-9a54e724fb87', 'sv_cadd3584-dcb6-46ec-b943-5a045c349ca3', 'cadd3584-dcb6-46ec-b943-5a045c349ca3', 'passport_photo', NULL, 'aaa.png', 'image/png', 1702337, 'student/cadd3584-dcb6-46ec-b943-5a045c349ca3/documents/passport_photo/bef0d786-7e8c-4662-81b1-9a54e724fb87/passport_photo_1789236192526.png', 'completed', '2026-09-12T18:03:12.593Z'::timestamptz, '2026-09-12T18:03:43.404Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('60b422c6-2fcd-4211-88c8-2039dc04c59b', 'sv_cadd3584-dcb6-46ec-b943-5a045c349ca3', 'cadd3584-dcb6-46ec-b943-5a045c349ca3', 'student_id', NULL, 'abstract-landscape-painting-contemporary-art-zlatko-music.jpg', 'image/jpeg', 1180485, 'student/cadd3584-dcb6-46ec-b943-5a045c349ca3/documents/student_id/60b422c6-2fcd-4211-88c8-2039dc04c59b/student_id_1789236197494.jpg', 'completed', '2026-09-12T18:03:17.686Z'::timestamptz, '2026-09-12T18:03:43.404Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('29cd5605-8aa2-45ac-9386-e77c1ed3c34d', 'sv_cadd3584-dcb6-46ec-b943-5a045c349ca3', 'cadd3584-dcb6-46ec-b943-5a045c349ca3', 'abc_id', NULL, '12.jpeg', 'image/jpeg', 236429, 'student/cadd3584-dcb6-46ec-b943-5a045c349ca3/documents/abc_id/29cd5605-8aa2-45ac-9386-e77c1ed3c34d/abc_id_1789236203690.jpeg', 'completed', '2026-09-12T18:03:23.717Z'::timestamptz, '2026-09-12T18:03:43.404Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES ('845afc54-06fa-4c16-b925-69cd02c331bd', 'sv_cadd3584-dcb6-46ec-b943-5a045c349ca3', 'cadd3584-dcb6-46ec-b943-5a045c349ca3', 'post_graduation_marksheet', 'post_graduation_marksheet', '10.jpeg', 'image/jpeg', 552282, 'student/cadd3584-dcb6-46ec-b943-5a045c349ca3/documents/post_graduation_marksheet/845afc54-06fa-4c16-b925-69cd02c331bd/post_graduation_marksheet_1789236208020.jpeg', 'completed', '2026-09-12T18:03:28.278Z'::timestamptz, '2026-09-12T18:03:43.404Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;