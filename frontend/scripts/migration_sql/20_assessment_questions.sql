INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4001', '"Kshnabhangurvada" is the doctrine of which philosopher?', '[{"id":"4001_opt_1","label":"A","text":"Shankaracharya"},{"id":"4001_opt_2","label":"B","text":"Buddha"},{"id":"4001_opt_3","label":"C","text":"Kapila"},{"id":"4001_opt_4","label":"D","text":"Gautama"}]'::jsonb, '4001_opt_2', 'Kshanabhanguravada (theory of momentariness/impermanence) is a cardinal doctrine in Buddhist philosophy propounded by Gautama Buddha.', 'AIAPGET_PG', 'MCQ', 'Padartha Vijnana & Ayurveda Itihasa', 'Darshana & Epistemology', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Easy', 'Knowledge', 'ayurveda', 'kshanabhanguravada-buddha-darshana', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4001', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4002', 'Match List I with List II:
List I: (A) Snigdha, (B) Yukti, (C) Sukha, (D) Gandha
List II: (I) Buddhyadi Guna, (II) Gurvadi Guna, (III) Shabdadi Guna, (IV) Paradi Guna
Choose the correct answer from the options given below:', '[{"id":"4002_opt_1","label":"A","text":"(A)-(II), (B)-(IV), (C)-(III), (D)-(I)"},{"id":"4002_opt_2","label":"B","text":"(A)-(II), (B)-(IV), (C)-(I), (D)-(III)"},{"id":"4002_opt_3","label":"C","text":"(A)-(II), (B)-(I), (C)-(III), (D)-(IV)"},{"id":"4002_opt_4","label":"D","text":"(A)-(III), (B)-(IV), (C)-(II), (D)-(I)"}]'::jsonb, '4002_opt_2', 'According to Padartha Vijnana: Snigdha is among the Gurvadi gunas (20 sharira gunas), Yukti is among the Paradi gunas, Sukha is among the Atma/Buddhyadi gunas, and Gandha is a Vaisheshika/Shabdadi guna.', 'AIAPGET_PG', 'MCQ', 'Padartha Vijnana', 'Guna Vijnana', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'guna-vijnana-classification-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4002', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4003', 'Which combination (Sandhi) is in word ''हृद्यौषधम्'' (Hridyaushadham)?', '[{"id":"4003_opt_1","label":"A","text":"Vriddhi"},{"id":"4003_opt_2","label":"B","text":"Yana"},{"id":"4003_opt_3","label":"C","text":"Ayadi"},{"id":"4003_opt_4","label":"D","text":"Guna"}]'::jsonb, '4003_opt_1', 'In Sanskrit grammar, Hridya + Aushadham = Hridyaushadham (a + au = au), which is an example of Vriddhi Sandhi according to Panini sutra ''Vriddhiradaich''.', 'AIAPGET_PG', 'MCQ', 'Sanskrit & Ayurveda Samhita', 'Sanskrit Vyakaran & Sandhi', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Easy', 'Knowledge', 'ayurveda', 'sanskrit-vyakarana-vriddhi-sandhi', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4003', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4004', 'According to Sushruta consider two statements as given below:
Statement I: Ojasa is a Sara of Shukra.
Statement II: ''Sandhivishlesha'' is the feature of Ojakshaya.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4004_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4004_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4004_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4004_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4004_opt_1', 'According to Sushruta Samhita Sutrasthana 15, Ojas is described as the essence/sarabhaga of all dhatus terminating with Shukra (''Ojaastu tejodhatunam...''). Furthermore, ''Sandhivishlesha'' (looseness of joints) is a classic clinical lakshana of Ojakshaya/Ojasvisramsa.', 'AIAPGET_PG', 'MCQ', 'Kriya Sharira', 'Ojas and Dhatu Sarata', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'ojas-shukra-sara-sandhivishlesha', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4004', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4005', 'According to Sushruta ''धैर्य'' (Dhairya), is the function of which one of the following dhatu?', '[{"id":"4005_opt_1","label":"A","text":"Mamsa"},{"id":"4005_opt_2","label":"B","text":"Asthi"},{"id":"4005_opt_3","label":"C","text":"Majja"},{"id":"4005_opt_4","label":"D","text":"Shukra"}]'::jsonb, '4005_opt_4', 'In Sushruta Samhita Sutrasthana chapter 15, the specific function of Shukra dhatu is defined as ''धैर्यं च्यवनं प्रीतिर्देहबलं हर्षो बीजार्य च'' (dhairya, chyavana, priti, dehabala, harsha, and bijartha).', 'AIAPGET_PG', 'MCQ', 'Kriya Sharira', 'Dhatu Karma', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'dhatu-karma-shukra-dhairya', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4005', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4006', 'Match List I with List II (According to Sushruta types of Vata and its properties/karma):
List I (Vayu): (A) Vyana, (B) Udana, (C) Samana, (D) Apana
List II (Karma): (I) Udvahana, (II) Dharana, (III) Praspandana, (IV) Viveka
Choose the correct answer from the options given below:', '[{"id":"4006_opt_1","label":"A","text":"(A)-(III), (B)-(IV), (C)-(I), (D)-(II)"},{"id":"4006_opt_2","label":"B","text":"(A)-(I), (B)-(II), (C)-(III), (D)-(IV)"},{"id":"4006_opt_3","label":"C","text":"(A)-(I), (B)-(III), (C)-(II), (D)-(IV)"},{"id":"4006_opt_4","label":"D","text":"(A)-(III), (B)-(I), (C)-(IV), (D)-(II)"}]'::jsonb, '4006_opt_4', 'According to Sushruta Samhita: Vyana vata performs Praspandana (pulsation/circulation), Udana performs Udvahana, Samana performs Viveka (sorting/digestion separation), and Apana performs Dharana (retention/downward expulsion).', 'AIAPGET_PG', 'MCQ', 'Kriya Sharira', 'Pancha Vata Karma', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Application', 'ayurveda', 'pancha-vata-karma-sushruta-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4006', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4007', 'How many types of Nidraa has been described by Ashtanga Sangraha?', '[{"id":"4007_opt_1","label":"A","text":"3"},{"id":"4007_opt_2","label":"B","text":"1"},{"id":"4007_opt_3","label":"C","text":"6"},{"id":"4007_opt_4","label":"D","text":"7"}]'::jsonb, '4007_opt_4', 'Acharya Vagbhata in Ashtanga Sangraha Sutrasthana chapter 9 describes 7 varieties of Nidra (sleep): Kalasvabhava, Tamobhava, Kaphaja, Sharirasramajanya, Manasramajanya, Agantuki, and Vyadhyanuvartini.', 'AIAPGET_PG', 'MCQ', 'Swasthavritta & Kriya Sharira', 'Trayopasthambha - Nidra', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'nidra-types-ashtanga-sangraha', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4007', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4008', 'Which Bhava is responsible for ''Indriya Prasada''?', '[{"id":"4008_opt_1","label":"A","text":"Rasaja Bhava"},{"id":"4008_opt_2","label":"B","text":"Satmyaja Bhava"},{"id":"4008_opt_3","label":"C","text":"Satvaja Bhava"},{"id":"4008_opt_4","label":"D","text":"Matrija Bhava"}]'::jsonb, '4008_opt_2', 'According to Charaka Samhita Sharirasthana 3/11, Satmyaja Bhavas include Arogya, Analasatva, Aloluptva, Indriya Prasada, Svara-Varna-Bija Sampat, and Praharsha.', 'AIAPGET_PG', 'MCQ', 'Rachana & Kriya Sharira', 'Garbha Vriddhikar Bhavas', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'garbha-satmyaja-bhava-indriya-prasada', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4008', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4009', 'Which of the following is not a content of femoral sheath?', '[{"id":"4009_opt_1","label":"A","text":"Femoral artery"},{"id":"4009_opt_2","label":"B","text":"Femoral nerve"},{"id":"4009_opt_3","label":"C","text":"Femoral vein"},{"id":"4009_opt_4","label":"D","text":"Femoral canal"}]'::jsonb, '4009_opt_2', 'The femoral sheath encloses the femoral artery (lateral compartment), femoral vein (intermediate compartment), and femoral canal (medial compartment). The femoral nerve lies outside and lateral to the femoral sheath in the femoral triangle.', 'AIAPGET_PG', 'MCQ', 'Rachana Sharira', 'Lower Limb Surgical Anatomy', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Easy', 'Knowledge', 'ayurveda', 'femoral-sheath-contents-anatomy', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4009', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4010', 'Sushruta has mentioned ''Kala'' in this order:
(A) Purishadhara kala
(B) Shleshmodhara kala
(C) Pittadhara kala
(D) Mamsadhara kala
(E) Raktadhara kala
Choose the correct answer from the options given below:', '[{"id":"4010_opt_1","label":"A","text":"(D), (E), (B), (A), (C)"},{"id":"4010_opt_2","label":"B","text":"(C), (D), (E), (B), (A)"},{"id":"4010_opt_3","label":"C","text":"(C), (E), (D), (B), (A)"},{"id":"4010_opt_4","label":"D","text":"(E), (D), (B), (A), (C)"}]'::jsonb, '4010_opt_1', 'Sushruta Samhita Sharirasthana 4 describes 7 Kalas sequentially: 1st Mamsadhara (D), 2nd Raktadhara (E), 3rd Medodhara, 4th Shleshmodhara (B), 5th Purishadhara (A), 6th Pittadhara (C), and 7th Sukradhara. Hence the sequence is (D), (E), (B), (A), (C).', 'AIAPGET_PG', 'MCQ', 'Rachana Sharira', 'Sapta Kala Sharira', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'sapta-kala-sequential-order-sushruta', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4010', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4011', 'Which of the following Marma are ''Kalantar Pranahara''?
(A) Lohitaksha
(B) Bruhati
(C) Ansaphalaka
(D) Katikataruna
(E) Guda
Choose the correct answer from the options given below:', '[{"id":"4011_opt_1","label":"A","text":"(A), (C) and (E) only"},{"id":"4011_opt_2","label":"B","text":"(B), (C) and (E) only"},{"id":"4011_opt_3","label":"C","text":"(A), (D) only"},{"id":"4011_opt_4","label":"D","text":"(B), (D) only"}]'::jsonb, '4011_opt_4', 'According to Sushruta Marma Sharira, Bruhati and Katikataruna are classified as Kalantara Pranahara Marmas (which cause death after a period of time). Lohitaksha is Vaikalyakara, Ansaphalaka is Vaikalyakara, and Guda is Sadyah Pranahara.', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra & Rachana Sharira', 'Marma Vijnana', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Application', 'ayurveda', 'kalantara-pranahara-marma-classification', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4011', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4012', 'According to Ashtanga Hridaya in which of the following disease Sleep is prohibited during night time?', '[{"id":"4012_opt_1","label":"A","text":"Indigestion"},{"id":"4012_opt_2","label":"B","text":"Throat disease"},{"id":"4012_opt_3","label":"C","text":"Diarrhoea"},{"id":"4012_opt_4","label":"D","text":"Abdominal pain"}]'::jsonb, '4012_opt_2', 'Ashtanga Hridaya Sutrasthana 7 forbids sleep during the night in throat diseases (Kantharoga) because lying down and nocturnal kapha accumulation aggravates upper airway obstruction and complications.', 'AIAPGET_PG', 'MCQ', 'Swasthavritta & Shalakya Tantra', 'Nidra Nishedha & Dinacharya', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'ashtanga-hridaya-nidra-kantha-roga', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4012', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4013', 'The Lekhan Anjana is prepared from which of the following type of drugs?', '[{"id":"4013_opt_1","label":"A","text":"Drugs having Bitter taste and hot potency"},{"id":"4013_opt_2","label":"B","text":"Drugs having Sweet taste and cold potency"},{"id":"4013_opt_3","label":"C","text":"Drugs having Astringent, sour and salt taste"},{"id":"4013_opt_4","label":"D","text":"Drugs having Pungent, Bitter and Astringent taste"}]'::jsonb, '4013_opt_4', 'According to Shalakya Tantra and Sushruta Samhita, Lekhana Anjana (scraping/depletive collyrium) is prepared using dravyas predominantly having Katu (pungent), Tikta (bitter), and Kashaya (astringent) rasas along with Ushna veerya.', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra', 'Netra Kriya Kalpa - Anjana', ARRAY['ayush-clinical-principles', 'ayush-formulations']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'lekhana-anjana-rasa-composition', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4013', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4014', 'Given below are two statements as per Charak Samhita:
Statement I: ''Nidrabaladihani'' is mentioned as one of the lakshana of Vamana Atiyoga.
Statement II: ''Nidrabalabhava'' is mentioned as one of the lakshana of Virechana Atiyoga.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4014_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4014_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4014_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4014_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4014_opt_1', 'In Charaka Samhita Siddhisthana chapter 1, excessive evacuation (Atiyoga) of Vamana produces Nidra-bala-hani along with giddiness and dehydration; Virechana Atiyoga similarly leads to depletion of sleep and strength (Nidrabalabhava). Both statements are classically accurate.', 'AIAPGET_PG', 'MCQ', 'Panchakarma', 'Vamana & Virechana Atiyoga Lakshana', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Clinical Knowledge', 'Hard', 'Reasoning', 'ayurveda', 'atiyoga-lakshana-vamana-virechana-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4014', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4015', 'Botanical name of herb ''Nidigdhika'' is —', '[{"id":"4015_opt_1","label":"A","text":"Curcuma longa"},{"id":"4015_opt_2","label":"B","text":"Curcuma augustifolia"},{"id":"4015_opt_3","label":"C","text":"Solanum surattense"},{"id":"4015_opt_4","label":"D","text":"Solanum nigrum"}]'::jsonb, '4015_opt_3', 'Nidigdhika (also known as Kantakari / Vyaghri) is botanically identified as Solanum surattense Burm. f. (syn. Solanum xanthocarpum Schrad. & Wendl.), belonging to the family Solanaceae.', 'AIAPGET_PG', 'MCQ', 'Dravyaguna Vijnana', 'Botanical Nomenclature of Classical Drugs', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Easy', 'Knowledge', 'ayurveda', 'nidigdhika-solanum-surattense-botanical-name', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4015', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4016', 'Match List I with List II:
List I - (Dravya): (A) Tila, (B) Japa, (C) Padmaka, (D) Gokshura
List II - (Family): (I) Malvaceae, (II) Zygophyllaceae, (III) Rosaceae, (IV) Pedaliaceae
Choose the correct answer from the options given below:', '[{"id":"4016_opt_1","label":"A","text":"(A)-(I), (B)-(III), (C)-(IV), (D)-(II)"},{"id":"4016_opt_2","label":"B","text":"(A)-(IV), (B)-(I), (C)-(III), (D)-(II)"},{"id":"4016_opt_3","label":"C","text":"(A)-(II), (B)-(I), (C)-(IV), (D)-(III)"},{"id":"4016_opt_4","label":"D","text":"(A)-(III), (B)-(II), (C)-(I), (D)-(IV)"}]'::jsonb, '4016_opt_2', 'Tila (Sesamum indicum) belongs to Pedaliaceae (IV); Japa (Hibiscus rosa-sinensis) belongs to Malvaceae (I); Padmaka (Prunus cerasoides) belongs to Rosaceae (III); Gokshura (Tribulus terrestris) belongs to Zygophyllaceae (II).', 'AIAPGET_PG', 'MCQ', 'Dravyaguna Vijnana', 'Plant Taxonomy and Botanical Families', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Medium', 'Understanding', 'ayurveda', 'dravyaguna-plant-family-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4016', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4017', '"Rasai Rasou Tulyafalah" (रसै रसौ तुल्यफलः) is described for which of the following Dravyagata Padartha by Ashtanga Sangraha?', '[{"id":"4017_opt_1","label":"A","text":"Karma"},{"id":"4017_opt_2","label":"B","text":"Guna"},{"id":"4017_opt_3","label":"C","text":"Veerya"},{"id":"4017_opt_4","label":"D","text":"Vipaaka"}]'::jsonb, '4017_opt_4', 'In Ashtanga Sangraha Sutrasthana chapter 17, Vipaka is described as yielding effects parallel to the respective tastes: ''रसै रसौ तुल्यफलः'' indicating that Vipaka action aligns with Rasas unless Vikriti Vishama Samaveta.', 'AIAPGET_PG', 'MCQ', 'Dravyaguna Vijnana', 'Rasa-Panchaka Principles', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Knowledge', 'ayurveda', 'rasai-rasou-tulyafalah-vipaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4017', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4018', 'A patient comes to an OPD with complaints of Diarrhoea with indigested food particles and mucus. He has diagnosed with Apakwa Atisaar. Which action is required to treat the condition?', '[{"id":"4018_opt_1","label":"A","text":"Grahi"},{"id":"4018_opt_2","label":"B","text":"Stambhana"},{"id":"4018_opt_3","label":"C","text":"Sandhaneeya"},{"id":"4018_opt_4","label":"D","text":"Pureeshvirajaneeya"}]'::jsonb, '4018_opt_1', 'In Apakwa / Sama Atisara, Stambhana therapy is strictly contraindicated because it traps ama and causes severe complications. The proper therapeutic principle is Pachana followed by Deepana and Grahi measures to digest ama and bind the stool.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Atisara Chikitsa Sutra', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Clinical Knowledge', 'Medium', 'Application', 'ayurveda', 'apakwa-atisara-grahi-pachana-chikitsa', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4018', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4019', 'Which of the following is an example of phase-II Biotransformation reactions?', '[{"id":"4019_opt_1","label":"A","text":"Oxydation"},{"id":"4019_opt_2","label":"B","text":"Methylation"},{"id":"4019_opt_3","label":"C","text":"Reduction"},{"id":"4019_opt_4","label":"D","text":"Hydrolysis"}]'::jsonb, '4019_opt_2', 'Phase I drug biotransformation reactions include oxidation, reduction, and hydrolysis (functionalization reactions). Phase II biotransformation reactions are conjugation reactions including glucuronidation, sulfation, acetylation, and methylation.', 'AIAPGET_PG', 'MCQ', 'Pharmacology & Dravyaguna', 'Pharmacokinetics - Biotransformation', ARRAY['herb-drug-interaction', 'ayush-pharmacovigilance']::text[], 'Herb-Drug Interaction Awareness', 'Easy', 'Knowledge', 'ayurveda', 'phase-two-biotransformation-methylation', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4019', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4020', 'Given below are two statements:
Statement I: Useful part of Nagkesar to treat Raktarsha is Strikeshara (Gynacium).
Statement II: As per Charaka, Nagkeshara is admistered along with Navneeta & Sharkara in Raktarsha.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4020_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4020_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4020_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4020_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4020_opt_4', 'Statement I is incorrect because the officinal/medicinal part of Nagakesara (Mesua ferrea) is Pungkeshara (stamens/androecium), not Strikeshara. Statement II is correct as Charaka explicitly recommends Nagakesara with Navneeta and Sharkara for Raktarsha in Chikitsasthana 14.', 'AIAPGET_PG', 'MCQ', 'Dravyaguna & Kayachikitsa', 'Nagakesara & Raktarsha Chikitsa', ARRAY['ayush-clinical-principles', 'ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Reasoning', 'ayurveda', 'nagakesara-stamen-raktarsha-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4020', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4021', 'Match List I with List II:
List I - (Name of Drug): (A) Amlodipine, (B) Mephenamic acid, (C) Codeine, (D) Monteleukast
List II - (Class of Drug): (I) Antitussive, (II) Leukotrine antagonist, (III) NSAID, (IV) Calcium channel blocker
Choose the correct answer from the options given below:', '[{"id":"4021_opt_1","label":"A","text":"(A)-(IV), (B)-(III), (C)-(I), (D)-(II)"},{"id":"4021_opt_2","label":"B","text":"(A)-(II), (B)-(IV), (C)-(I), (D)-(III)"},{"id":"4021_opt_3","label":"C","text":"(A)-(IV), (B)-(I), (C)-(III), (D)-(II)"},{"id":"4021_opt_4","label":"D","text":"(A)-(I), (B)-(II), (C)-(IV), (D)-(III)"}]'::jsonb, '4021_opt_1', 'Amlodipine is a dihydropyridine Calcium Channel Blocker (IV); Mefenamic acid is an NSAID (III); Codeine is an opioid Antitussive (I); Montelukast is a cysteinyl Leukotriene receptor antagonist (II).', 'AIAPGET_PG', 'MCQ', 'Pharmacology', 'Classification of Modern Pharmacological Agents', ARRAY['herb-drug-interaction', 'ayush-pharmacovigilance']::text[], 'Herb-Drug Interaction Awareness', 'Easy', 'Knowledge', 'ayurveda', 'pharmacology-drug-class-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4021', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4022', 'Match List I with List II:
List I (Dravya): (A) Madhooka, (B) Madhuka, (C) Ashmantaka, (D) Vrukshadani
List II (Mahakashaya): (I) Mootra Virechaneeya, (II) Mootra Sangrahaneeya, (III) Mootra Virajaneeya, (IV) Pureeshavirajaneeya
Choose the correct answer from the options given below:', '[{"id":"4022_opt_1","label":"A","text":"(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"},{"id":"4022_opt_2","label":"B","text":"(A)-(III), (B)-(IV), (C)-(I), (D)-(II)"},{"id":"4022_opt_3","label":"C","text":"(A)-(II), (B)-(I), (C)-(IV), (D)-(III)"},{"id":"4022_opt_4","label":"D","text":"(A)-(III), (B)-(II), (C)-(IV), (D)-(I)"}]'::jsonb, '4022_opt_1', 'In Charaka Samhita Sutrasthana 4: Madhooka (Madhuca indica) is in Pureeshavirajaneeya; Madhuka (Yashtimadhu) is in Mootra Virajaneeya; Ashmantaka is in Mootra Sangrahaneeya; Vrukshadani is in Mootra Virechaneeya.', 'AIAPGET_PG', 'MCQ', 'Dravyaguna Vijnana', 'Charaka Panchashat Mahakashaya', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Understanding', 'ayurveda', 'charaka-mahakashaya-dravya-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4022', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4023', 'Xanthoproteic reaction is noticed in —', '[{"id":"4023_opt_1","label":"A","text":"Sulphuric acid poisoning"},{"id":"4023_opt_2","label":"B","text":"Nitric acid poisoning"},{"id":"4023_opt_3","label":"C","text":"Oxalic acid poisoning"},{"id":"4023_opt_4","label":"D","text":"Carbolic acid poisoning"}]'::jsonb, '4023_opt_2', 'Nitric acid produces a characteristic bright yellow staining of skin and mucous membranes upon contact due to the nitration of aromatic amino acids in tissues, known as the xanthoproteic reaction.', 'AIAPGET_PG', 'MCQ', 'Agada Tantra & Vidhi Vaidyaka', 'Corrosive Acid Poisoning', ARRAY['ayush-pharmacovigilance']::text[], 'Pharmacovigilance', 'Easy', 'Knowledge', 'ayurveda', 'xanthoproteic-reaction-nitric-acid-toxicology', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4023', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4024', 'Which one is not the feature of Kupilu poisoning?', '[{"id":"4024_opt_1","label":"A","text":"Convulsions"},{"id":"4024_opt_2","label":"B","text":"Risus Sardonicus"},{"id":"4024_opt_3","label":"C","text":"Run amok"},{"id":"4024_opt_4","label":"D","text":"Breathing difficulty"}]'::jsonb, '4024_opt_3', 'Kupilu (Strychnos nux-vomica / Strychnine) poisoning causes tonic-clonic convulsions, risus sardonicus, and respiratory arrest. ''Run amok'' is a characteristic psychiatric behavioral phenomenon seen in Cannabis (Bhang/Ganja) toxicity.', 'AIAPGET_PG', 'MCQ', 'Agada Tantra & Toxicology', 'Upavisha Toxicology - Kupilu', ARRAY['ayush-pharmacovigilance']::text[], 'Pharmacovigilance', 'Medium', 'Understanding', 'ayurveda', 'kupilu-strychnine-poisoning-features', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4024', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4025', 'According to Sharangadhara ''Suryavarta Rasa'' is indicated in —', '[{"id":"4025_opt_1","label":"A","text":"Kushtha"},{"id":"4025_opt_2","label":"B","text":"Timira"},{"id":"4025_opt_3","label":"C","text":"Suryavarta"},{"id":"4025_opt_4","label":"D","text":"Swasa"}]'::jsonb, '4025_opt_1', 'In Sharangadhara Samhita Madhyama Khanda 12, despite its name, ''Suryavarta Rasa'' is specifically formulated and indicated in Kushtha roga (dermatological conditions).', 'AIAPGET_PG', 'MCQ', 'Rasa Shastra & Bhaishajya Kalpana', 'Kharaliya Rasayana Formulations', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Knowledge', 'ayurveda', 'suryavarta-rasa-sharangadhara-kushtha', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4025', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4026', 'According to Acharya Sharangadhara, which among the following is a synonym of ''Drona''?', '[{"id":"4026_opt_1","label":"A","text":"Goni"},{"id":"4026_opt_2","label":"B","text":"Shoorpa"},{"id":"4026_opt_3","label":"C","text":"Nalwana"},{"id":"4026_opt_4","label":"D","text":"Droni"}]'::jsonb, '4026_opt_3', 'In Sharangadhara Samhita Prathama Khanda chapter 1 (Mana Paribhasha), synonyms of Drona include Kalasha, Ghata, Unmana, and Nalwana (णल्वण).', 'AIAPGET_PG', 'MCQ', 'Rasa Shastra & Bhaishajya Kalpana', 'Mana Paribhasha (Metrology)', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Medium', 'Knowledge', 'ayurveda', 'mana-paribhasha-drona-synonym-nalwana', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4026', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4027', 'The another name of ''Sudhanidhi Rasa'' is', '[{"id":"4027_opt_1","label":"A","text":"Rasapushpa"},{"id":"4027_opt_2","label":"B","text":"Mugdha Rasa"},{"id":"4027_opt_3","label":"C","text":"Siddha Makardhwaj"},{"id":"4027_opt_4","label":"D","text":"Rasa Karpoora"}]'::jsonb, '4027_opt_2', 'In classical Rasa Shastra literature, Mugdha Rasa (mercurial preparation with Khatika) is also referenced by the synonym Sudhanidhi Rasa.', 'AIAPGET_PG', 'MCQ', 'Rasa Shastra', 'Parada Bandha & Rasa Aushadhi', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Knowledge', 'ayurveda', 'sudhanidhi-rasa-mugdha-rasa-synonym', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4027', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4028', 'In the context of which Basti, Acharya Sharangadhara has mentioned the use of blood of Goat (Aja), Sheep (Bhed) and Deer (Harin)?', '[{"id":"4028_opt_1","label":"A","text":"Siddha Basti"},{"id":"4028_opt_2","label":"B","text":"Pichchhil Basti"},{"id":"4028_opt_3","label":"C","text":"Samshaman Basti"},{"id":"4028_opt_4","label":"D","text":"Yaapana Basti"}]'::jsonb, '4028_opt_2', 'In Sharangadhara Samhita Uttarakhanda 6, Pichchhil Basti formulation incorporates freshly drawn animal blood (Aja, Avi, or Harina Asruk) to restore bleeding integrity and treat ulcerative conditions/Raktatisara.', 'AIAPGET_PG', 'MCQ', 'Panchakarma', 'Basti Kalpana - Pichchhil Basti', ARRAY['ayush-clinical-principles', 'ayush-formulations']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'pichchhil-basti-blood-sharangadhara', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4028', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4029', 'Match List I with List II (As per Drug & Cosmetic Act 1940):
List I: (A) Schedule-E(1), (B) Schedule-T, (C) First Schedule, (D) Second Schedule
List II: (I) G.M.P., (II) List of poisonous substances of Ayurveda, Siddha and Unani drugs, (III) Standards to be complied, (IV) List of Authoritative Books
Choose the correct answer from the options given below:', '[{"id":"4029_opt_1","label":"A","text":"(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"},{"id":"4029_opt_2","label":"B","text":"(A)-(I), (B)-(IV), (C)-(III), (D)-(II)"},{"id":"4029_opt_3","label":"C","text":"(A)-(II), (B)-(I), (C)-(IV), (D)-(III)"},{"id":"4029_opt_4","label":"D","text":"(A)-(III), (B)-(I), (C)-(II), (D)-(IV)"}]'::jsonb, '4029_opt_3', 'Under the Drugs and Cosmetics Act 1940: Schedule E(1) lists poisonous ASU substances (II); Schedule T mandates GMP requirements for ASU drugs (I); First Schedule contains the list of authoritative books (IV); Second Schedule lays down standards to be complied with (III).', 'AIAPGET_PG', 'MCQ', 'Rasa Shastra & Forensic Medicine', 'Drugs and Cosmetics Act Schedules for AYUSH', ARRAY['ayush-regulatory', 'ayush-formulations']::text[], 'Regulatory Awareness', 'Easy', 'Knowledge', 'ayurveda', 'drugs-cosmetics-act-ayush-schedules', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4029', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4030', 'Which of the following are used in the preparation of Bilwa Taila?
(A) Gomutra
(B) Aja Dugdha
(C) Aja Mutra
(D) Go Dugdha
(E) Jala
Choose the correct answer from the options given below:', '[{"id":"4030_opt_1","label":"A","text":"(A), (B), (E) only"},{"id":"4030_opt_2","label":"B","text":"(B), (C), (E) only"},{"id":"4030_opt_3","label":"C","text":"(C), (D), (E) only"},{"id":"4030_opt_4","label":"D","text":"(A), (D), (E) only"}]'::jsonb, '4030_opt_1', 'In Sharangadhara and Bhaishajya Ratnavali, Bilwa Taila (Karnashoolahara) is prepared utilizing Bilwa majja with Gomutra, Aja Dugdha, and Jala along with Taila drava dravyas.', 'AIAPGET_PG', 'MCQ', 'Bhaishajya Kalpana', 'Taila Kalpana - Bilwa Taila', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Understanding', 'ayurveda', 'bilwa-taila-formulation-ingredients', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4030', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4031', '''Shankh Dant Venvaadi Dhaaritam'' - According to Rasa Ratna Samuchchaya, this verse is related to collection (storage) of which of the following Bhasma?', '[{"id":"4031_opt_1","label":"A","text":"Svarna Bhasma"},{"id":"4031_opt_2","label":"B","text":"Vajra Bhasma"},{"id":"4031_opt_3","label":"C","text":"Abhraka Bhasma"},{"id":"4031_opt_4","label":"D","text":"Rasa Bhasma"}]'::jsonb, '4031_opt_2', 'In Rasa Ratna Samuchchaya, Vajra (Diamond) Bhasma storage container is specifically instructed: ''शङ्खदन्तवेण्वादिधारितम्'' to preserve its potency without interaction.', 'AIAPGET_PG', 'MCQ', 'Rasa Shastra', 'Ratna Vijnana - Vajra Bhasma Storage', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Knowledge', 'ayurveda', 'vajra-bhasma-storage-rasa-ratna-samuchchaya', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4031', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4032', 'Which of the following statements related to the preparation and use of ''Anu Taila'' is incorrect?', '[{"id":"4032_opt_1","label":"A","text":"Taila prepared by Avartana process"},{"id":"4032_opt_2","label":"B","text":"It is used for Nasya Karma"},{"id":"4032_opt_3","label":"C","text":"Goat''s Milk (Aja Dugdh) is used"},{"id":"4032_opt_4","label":"D","text":"The oil is cooked 8 times"}]'::jsonb, '4032_opt_4', 'According to Charaka Samhita Sutrasthana 5, Anu Taila is cooked ten times (Dashapaka / 10 Avartana), not 8 times. It uses Aja Dugdha in the 10th boiling and is a prime oil for pratimarsha and marsha nasya.', 'AIAPGET_PG', 'MCQ', 'Bhaishajya Kalpana & Panchakarma', 'Sneha Kalpana - Anu Taila', ARRAY['ayush-formulations', 'ayush-clinical-principles']::text[], 'AYUSH Core Practice', 'Medium', 'Understanding', 'ayurveda', 'anu-taila-preparation-avartana-rounds', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4032', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4033', 'What is the right order of events during Vamana Karma after administration of Vaman Dravya as per Charaka?
(A) Horripilation
(B) Abdominal Distention
(C) Wait for one Muhurta
(D) Sweating
(E) Nausea and Salivation
Choose the correct answer from the options given below:', '[{"id":"4033_opt_1","label":"A","text":"(E), (D), (A), (B), (C)"},{"id":"4033_opt_2","label":"B","text":"(D), (A), (B), (E), (C)"},{"id":"4033_opt_3","label":"C","text":"(C), (D), (A), (B), (E)"},{"id":"4033_opt_4","label":"D","text":"(C), (E), (D), (A), (B)"}]'::jsonb, '4033_opt_3', 'In Charaka Siddhisthana chapter 1, after ingestion of the emetic potion: 1st wait for one muhurta (C); then sveda indicates dosha liquefaction (D); lomaharsha indicates movement (A); kukshi adhman indicates arrival in stomach (B); and finally hrillasa-asyasravana indicates emesis initiation (E).', 'AIAPGET_PG', 'MCQ', 'Panchakarma', 'Vamana Karma Physiological Progression', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Application', 'ayurveda', 'vamana-karma-sequence-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4033', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4034', 'According to Acharya Charaka, which Rasa is ''Sarvarasapratyaneeka''?', '[{"id":"4034_opt_1","label":"A","text":"Amla Rasa"},{"id":"4034_opt_2","label":"B","text":"Madhura Rasa"},{"id":"4034_opt_3","label":"C","text":"Lavana Rasa"},{"id":"4034_opt_4","label":"D","text":"Tikta Rasa"}]'::jsonb, '4034_opt_3', 'In Charaka Samhita Sutrasthana 26/43, Lavana Rasa is characterized as ''सर्वप्रत्यनीकभूतः'' (Sarvapratyaneekabhuta) because it opposes, masks, or modifies all other rasas when added even in small quantities.', 'AIAPGET_PG', 'MCQ', 'Dravyaguna Vijnana', 'Shad Rasa Lakshana & Karma', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'lavana-rasa-sarvarasapratyaneeka-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4034', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4035', 'Feeling of scorpion bite like pain is found in which of the following disease?', '[{"id":"4035_opt_1","label":"A","text":"Vaata Rakta"},{"id":"4035_opt_2","label":"B","text":"Vishuchika"},{"id":"4035_opt_3","label":"C","text":"Aamavaata"},{"id":"4035_opt_4","label":"D","text":"Vilambika"}]'::jsonb, '4035_opt_3', 'In Madhava Nidana (Amavata Nidana 6) and Chakradatta, severe radiating articular pain resembling the sting of a scorpion is described as ''वृश्चिकदंशवद्वेदना'' (Vrishchika damshavat vedana), which is pathognomonic for Amavata (Rheumatoid arthritis).', 'AIAPGET_PG', 'MCQ', 'Roga Nidana & Kayachikitsa', 'Amavata Lakshana', ARRAY['ayush-diagnosis', 'ayush-clinical-principles']::text[], 'Diagnostics', 'Easy', 'Knowledge', 'ayurveda', 'amavata-vrishchika-damsha-vedana', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4035', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4036', 'Which dosha is predominant in Kardama Visarpa?', '[{"id":"4036_opt_1","label":"A","text":"Vata Pitta"},{"id":"4036_opt_2","label":"B","text":"Pitta Kapha"},{"id":"4036_opt_3","label":"C","text":"Kapha Vata"},{"id":"4036_opt_4","label":"D","text":"Tridosha"}]'::jsonb, '4036_opt_2', 'In Charaka Samhita Chikitsasthana 21 (Visarpa Chikitsa), Kardama Visarpa is caused by the combined vitiation of Pitta and Kapha dosha, giving it a muddy, sloughy presentation.', 'AIAPGET_PG', 'MCQ', 'Roga Nidana & Kayachikitsa', 'Visarpa Bheda & Dosha Dominance', ARRAY['ayush-diagnosis', 'ayush-clinical-principles']::text[], 'Diagnostics', 'Medium', 'Understanding', 'ayurveda', 'kardama-visarpa-pitta-kapha-dosha', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4036', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4037', '''अनात्मवन्तः पशुवद्भुञ्जते येऽप्रमाणतः'' is described in the context of which of the following disease?', '[{"id":"4037_opt_1","label":"A","text":"Grahani"},{"id":"4037_opt_2","label":"B","text":"Madhumeha"},{"id":"4037_opt_3","label":"C","text":"Unmada"},{"id":"4037_opt_4","label":"D","text":"Ajirna"}]'::jsonb, '4037_opt_1', 'In Charaka Samhita Chikitsasthana 15/234 (Grahani Dosha Chikitsa), Charaka laments that indiscreet people who lack self-control eat animal-like without consideration of quantity (''अनात्मवन्तः पशुवद्भुञ्जते येऽप्रमाणतः''), thus ruining their Grahani and Agni.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Grahani Dosha Etiology', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Understanding', 'ayurveda', 'grahani-charaka-dietetic-indiscretion', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4037', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4039', 'Which one of the following is not a ''Shleshma Naanaatamaja Vikara''?', '[{"id":"4039_opt_1","label":"A","text":"Hridayoplepa"},{"id":"4039_opt_2","label":"B","text":"Hrinmoha"},{"id":"4039_opt_3","label":"C","text":"Dhamani Pratichaya"},{"id":"4039_opt_4","label":"D","text":"Balaasaka"}]'::jsonb, '4039_opt_2', 'Charaka Samhita Sutrasthana 20 enumerates 20 Shleshma Nanatmaja Vikaras, which includes Trupti, Tandra, Nidradhikya, Hridayopalepa, Gala-ganda, Dhamani-pratichaya, and Balasaka. Hrinmoha is classified under Pitta Nanatmaja Vikaras.', 'AIAPGET_PG', 'MCQ', 'Roga Nidana', 'Nanatmaja Vikara Classification', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'shleshma-nanatmaja-vikara-hrinmoha', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4039', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4040', 'Match List I with List II:
List I - (Dhatu): (A) Shonita Kshaye, (B) Mahmsa Kshaye, (C) Asthi Kshaye, (D) Meda Kshaye
List II - (Lakshana): (I) Dhamani Shaithilyam, (II) Asthishoolam, (III) Sandhi Shoonyataa, (IV) Sira Shaithilyam
Choose the correct answer from the options given below:', '[{"id":"4040_opt_1","label":"A","text":"(A)-(I), (B)-(III), (C)-(IV), (D)-(II)"},{"id":"4040_opt_2","label":"B","text":"(A)-(IV), (B)-(I), (C)-(II), (D)-(III)"},{"id":"4040_opt_3","label":"C","text":"(A)-(IV), (B)-(II), (C)-(I), (D)-(III)"},{"id":"4040_opt_4","label":"D","text":"(A)-(I), (B)-(IV), (C)-(II), (D)-(III)"}]'::jsonb, '4040_opt_2', 'According to Sushruta Samhita Sutrasthana 15: Shonita Kshaya produces Sira Shaithilyam (IV); Mamsa Kshaya causes Dhamani Shaithilyam (I); Asthi Kshaya causes Asthishoolam (II); Meda Kshaya causes Sandhi Shoonyata and Pleeha Vriddhi (III).', 'AIAPGET_PG', 'MCQ', 'Kriya Sharira & Roga Nidana', 'Dhatu Kshaya Lakshana', ARRAY['ayush-diagnosis', 'ayush-clinical-principles']::text[], 'Diagnostics', 'Medium', 'Understanding', 'ayurveda', 'dhatu-kshaya-lakshana-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4040', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4041', 'As described in Ashtodariya Adhyaya of Charaka Samhita, write the diseases in Ascending order according to their number of types:
(A) Yonivyapada
(B) Sanyasa
(C) Visarpa
(D) Gulma
(E) Kilasa
Choose the correct answer from the options given below:', '[{"id":"4041_opt_1","label":"A","text":"(A), (D), (C), (E), (B)"},{"id":"4041_opt_2","label":"B","text":"(B), (E), (D), (C), (A)"},{"id":"4041_opt_3","label":"C","text":"(B), (E), (C), (D), (A)"},{"id":"4041_opt_4","label":"D","text":"(A), (C), (D), (E), (B)"}]'::jsonb, '4041_opt_2', 'In Charaka Sutrasthana 19 (Ashtodariya Adhyaya): Sanyasa = 1 type (B); Kilasa = 3 types (E); Gulma = 5 types (D); Visarpa = 7 types (C); Yonivyapad = 20 types (A). Ascending order is: (B) 1 < (E) 3 < (D) 5 < (C) 7 < (A) 20.', 'AIAPGET_PG', 'MCQ', 'Charaka Samhita', 'Ashtodariya Adhyaya Classification', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Application', 'ayurveda', 'charaka-ashtodariya-disease-types-ascending', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4041', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4042', 'Given below are two statements:
Statement I: Adhoga Raktapitta is yapya because virechana can not be administered here.
Statement II: Urdhavga Raktapitta is Sadhya, because it is treated with virechana.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4042_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4042_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4042_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4042_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4042_opt_1', 'In Charaka Samhita Chikitsasthana 4 (Raktapitta Chikitsa), Pratymarga Harana principle applies: Urdhwaga Raktapitta is easily curable (Sadhya) because purgation (Virechana) is its prime counter-path treatment; Adhoga is Yapya because Vamana has limited feasibility and milder drugs are required.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Raktapitta Pratymarga Chikitsa', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Reasoning', 'ayurveda', 'raktapitta-sadhya-asadhya-pratymarga', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4042', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4043', 'Match List I with List II:
List I - (Condition): (A) Durbalaagni, (B) Samaagni, (C) Mandaagni, (D) Shushka Dehi
List II - (Meal): (I) Matraaheen Bhojana, (II) Ekakaala Bhojana, (III) Dwikaala Bhojana, (IV) Drava Bhojana
Choose the correct answer from the options given below:', '[{"id":"4043_opt_1","label":"A","text":"(A)-(II), (B)-(III), (C)-(I), (D)-(IV)"},{"id":"4043_opt_2","label":"B","text":"(A)-(III), (B)-(IV), (C)-(II), (D)-(I)"},{"id":"4043_opt_3","label":"C","text":"(A)-(I), (B)-(II), (C)-(IV), (D)-(III)"},{"id":"4043_opt_4","label":"D","text":"(A)-(IV), (B)-(I), (C)-(III), (D)-(II)"}]'::jsonb, '4043_opt_1', 'According to classical dietetics (Ahara Vidhi): Durbalagni requires Ekakala bhojana (once a day to conserve agni) (II); Samagni thrives on Dwikala bhojana (twice daily) (III); Mandagni necessitates Matrahina bhojana (sub-maximal meals) (I); and Shushka dehi requires unctuous Drava bhojana (IV).', 'AIAPGET_PG', 'MCQ', 'Swasthavritta & Kayachikitsa', 'Ahara Matra and Agni Pariksha', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'agni-ahara-bhojana-krama-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4043', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4044', 'Which of the following is not contraindicated in spring season according to Ashtanga Hridaya?', '[{"id":"4044_opt_1","label":"A","text":"Madhura Rasa Substances"},{"id":"4044_opt_2","label":"B","text":"Amla Rasa Substances"},{"id":"4044_opt_3","label":"C","text":"Lavana Rasa Substances"},{"id":"4044_opt_4","label":"D","text":"Snigdha guna substances"}]'::jsonb, '4044_opt_3', 'In Vasanta Ritucharya (Ashtanga Hridaya Sutrasthana 3), Guru, Sheeta, Snigdha, Madhura, and Amla ahara are specifically prohibited because they heavily aggravate Kapha in the thawing spring. Lavana, while kapha-promoting in excess, is comparatively less contraindicated than pure Madhura/Snigdha/Amla kapha-aggravating items.', 'AIAPGET_PG', 'MCQ', 'Swasthavritta', 'Ritucharya - Vasanta Ritu', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'vasanta-ritucharya-contraindications', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4044', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4045', 'Which of the following is not caused by suppression of Adhovata Vega according to Ashtanga Hridaya?', '[{"id":"4045_opt_1","label":"A","text":"Drishti Dosha"},{"id":"4045_opt_2","label":"B","text":"Udaavarta"},{"id":"4045_opt_3","label":"C","text":"Hridaya Roga"},{"id":"4045_opt_4","label":"D","text":"Jwara"}]'::jsonb, '4045_opt_1', 'In Ashtanga Hridaya Sutrasthana 4 (Roganutpadaniya Adhyaya), suppression of Adhovata (flatus) causes Udavarta, Klama, Hridroga, and Jwara. ''Drishti Dosha'' (vision impairment) is caused by the suppression of Bashpa (tears) and Nidra vega, not flatus.', 'AIAPGET_PG', 'MCQ', 'Swasthavritta & Roga Nidana', 'Vegadharana Janya Vikara', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'adhovata-vegadharana-drishti-dosha-exclusion', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4045', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4046', 'Write the management sequence of a sudden onset disaster:
(A) Response
(B) Reconstruction
(C) Rehabilitation
(D) Preparedness
(E) Mitigation
Choose the correct answer from the options given below:', '[{"id":"4046_opt_1","label":"A","text":"(C) > (A) > (B) > (D) > (E)"},{"id":"4046_opt_2","label":"B","text":"(C) > (A) > (D) > (B) > (E)"},{"id":"4046_opt_3","label":"C","text":"(E) > (B) > (D) > (A) > (C)"},{"id":"4046_opt_4","label":"D","text":"(A) > (C) > (B) > (E) > (D)"}]'::jsonb, '4046_opt_4', 'In disaster epidemiology and public health management, when a sudden disaster strikes, the immediate post-impact cycle is: (A) Response (immediate rescue/relief) -> (C) Rehabilitation -> (B) Reconstruction -> followed by pre-disaster cycle of (E) Mitigation -> (D) Preparedness.', 'AIAPGET_PG', 'MCQ', 'Swasthavritta & Community Medicine', 'Disaster Management Cycle', ARRAY['ayush-clinical-principles']::text[], 'Healthcare Administration', 'Medium', 'Understanding', 'ayurveda', 'disaster-management-sequence-public-health', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4046', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4047', '''Screening of the diseases'' comes under which of the following type of prevention?', '[{"id":"4047_opt_1","label":"A","text":"Premordial Prevention"},{"id":"4047_opt_2","label":"B","text":"Primary Prevention"},{"id":"4047_opt_3","label":"C","text":"Secondary Prevention"},{"id":"4047_opt_4","label":"D","text":"Tertiary Prevention"}]'::jsonb, '4047_opt_3', 'Secondary prevention aims to detect disease in its early stages before symptoms appear through screening tests and periodic examinations, enabling prompt early intervention and cure.', 'AIAPGET_PG', 'MCQ', 'Swasthavritta & Preventive Medicine', 'Levels of Disease Prevention', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Easy', 'Knowledge', 'ayurveda', 'levels-of-prevention-screening-secondary', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4047', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4048', 'Which of the following is correct supplementary nutrition for children (6-72 months) through Integrated Mother and Child Development Services Scheme (ICDS)?', '[{"id":"4048_opt_1","label":"A","text":"10-12 gm/day protein and 300 K cal/day energy"},{"id":"4048_opt_2","label":"B","text":"12-15 gm/day protein and 500 K cal/day energy"},{"id":"4048_opt_3","label":"C","text":"15-18 gm/day protein and 700 K cal/day energy"},{"id":"4048_opt_4","label":"D","text":"18-20 gm/day protein and 1000 K cal/day energy"}]'::jsonb, '4048_opt_2', 'Under the revised norms of the ICDS (Integrated Child Development Services) scheme in India, normal children aged 6–72 months are entitled to supplementary nutrition providing 500 kcal energy and 12–15 grams of protein daily.', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya & Swasthavritta', 'National Health Programmes & Child Nutrition', ARRAY['ayush-clinical-principles']::text[], 'Healthcare Administration', 'Medium', 'Knowledge', 'ayurveda', 'icds-nutrition-norms-children', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4048', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4049', 'According to Acharya Sushruta, which of the following type of water is indicated for Madhyapaana Samudbhoota Roga?', '[{"id":"4049_opt_1","label":"A","text":"Ushna"},{"id":"4049_opt_2","label":"B","text":"Shrutasheeta"},{"id":"4049_opt_3","label":"C","text":"Sheetala"},{"id":"4049_opt_4","label":"D","text":"Aakhashiya"}]'::jsonb, '4049_opt_2', 'In Sushruta Samhita Sutrasthana 45 (Jala Varga), boiled and subsequently cooled water (Shrutasheeta jala) is indicated in Pitta-Rakta disorders, burning sensation, thirst, and disorders resulting from excessive alcoholic intake (Madhyapaana samudbhoota roga).', 'AIAPGET_PG', 'MCQ', 'Swasthavritta & Dravyaguna', 'Jala Varga Properties', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'shrutasheeta-jala-madhyapaana-sushruta', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4049', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4050', 'Match List I with List II:
List I - (Cause): (A) Iron Dust, (B) Coal Dust, (C) Cotton Dust, (D) Sugar Cane Dust
List II - (Disease): (I) Bagassosis, (II) Siderosis, (III) Anthracosis, (IV) Byssinosis
Choose the correct answer from the options given below:', '[{"id":"4050_opt_1","label":"A","text":"(A)-(III), (B)-(II), (C)-(I), (D)-(IV)"},{"id":"4050_opt_2","label":"B","text":"(A)-(IV), (B)-(I), (C)-(II), (D)-(III)"},{"id":"4050_opt_3","label":"C","text":"(A)-(II), (B)-(IV), (C)-(III), (D)-(I)"},{"id":"4050_opt_4","label":"D","text":"(A)-(II), (B)-(III), (C)-(IV), (D)-(I)"}]'::jsonb, '4050_opt_4', 'Occupational pneumoconiosis etiologies: Iron dust causes Siderosis (II); Coal dust causes Anthracosis (III); Cotton dust causes Byssinosis (IV); Sugarcane bagasse dust causes Bagassosis (I).', 'AIAPGET_PG', 'MCQ', 'Swasthavritta & Occupational Health', 'Occupational Lung Diseases', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Easy', 'Knowledge', 'ayurveda', 'pneumoconiosis-occupational-health-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4050', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4051', 'Which of the following Arista lakshana of pregnant woman is not told by Kashyapa as an indication for instrumental delivery of fetus?', '[{"id":"4051_opt_1","label":"A","text":"Female''s nose assumes shape like crow"},{"id":"4051_opt_2","label":"B","text":"Eyes have drooped"},{"id":"4051_opt_3","label":"C","text":"Emits the smell of Shakunta bird"},{"id":"4051_opt_4","label":"D","text":"Has desire to eat flesh of horse"}]'::jsonb, '4051_opt_4', 'In Kashyapa Samhita Sharirasthana, obstetric arishta signs where surgery/instrumentation is contraindicated include kaka-nasa, eyes drooped, and shakunta-pakshi odor. Craving horse flesh is a normal dauhrida/prakriti feature rather than an arishta lakshana.', 'AIAPGET_PG', 'MCQ', 'Prasuti Tantra & Stri Roga', 'Garbhini Arishta Lakshana - Kashyapa', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Clinical Knowledge', 'Hard', 'Understanding', 'ayurveda', 'garbhini-arishta-lakshana-kashyapa', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4051', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4052', 'Which of the following disease is not manifest in the newborn, due to bearing down efforts made (Pravahana) in the absence of labour pains?', '[{"id":"4052_opt_1","label":"A","text":"Mooka"},{"id":"4052_opt_2","label":"B","text":"Minminatva"},{"id":"4052_opt_3","label":"C","text":"Badhira"},{"id":"4052_opt_4","label":"D","text":"Vyastahanu"}]'::jsonb, '4052_opt_4', 'In Charaka Samhita Sharirasthana 8/38, untimely straining (Apravahana kale pravahana) causes birth defects including deafness (Badhira), muteness (Mooka), and nasal twang/speech impediment (Minmina). Vyastahanu (dislocated mandible) is caused by trauma during delivery.', 'AIAPGET_PG', 'MCQ', 'Prasuti Tantra & Kaumarbhritya', 'Prasava Paricharya & Congenital Disorders', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'akamata-pravahana-congenital-defects', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4052', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4053', 'Which of the following antihypertensive drug is not safe in pregnancy?', '[{"id":"4053_opt_1","label":"A","text":"Methyldopa"},{"id":"4053_opt_2","label":"B","text":"Captopril"},{"id":"4053_opt_3","label":"C","text":"Labetalol"},{"id":"4053_opt_4","label":"D","text":"Nifedipine"}]'::jsonb, '4053_opt_2', 'ACE inhibitors such as Captopril are strictly contraindicated throughout pregnancy because of profound fetotoxicity, renal dysgenesis, oligohydramnios, and neonatal renal failure. Methyldopa, Labetalol, and Nifedipine are standard first-line safe antihypertensives.', 'AIAPGET_PG', 'MCQ', 'Prasuti Tantra & Obstetrics Pharmacology', 'Hypertension in Pregnancy & Teratogenicity', ARRAY['ayush-pharmacovigilance', 'herb-drug-interaction']::text[], 'Pharmacovigilance', 'Easy', 'Knowledge', 'ayurveda', 'captopril-ace-inhibitor-pregnancy-contraindicated', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4053', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4054', 'According to Bhela samhita, which of the following is divided by Vayu to form yamala (twin) Garbha?', '[{"id":"4054_opt_1","label":"A","text":"Shukraartava"},{"id":"4054_opt_2","label":"B","text":"Beeja"},{"id":"4054_opt_3","label":"C","text":"Kalala"},{"id":"4054_opt_4","label":"D","text":"Budabuda"}]'::jsonb, '4054_opt_2', 'According to Bhela Samhita Sharirasthana 2, the Beeja (zygote/gametic material) is cleaved into two halves by the action of Vayu (''वायुना भिद्यते बीजं''), which results in the development of twin pregnancy (Yamala Garbha).', 'AIAPGET_PG', 'MCQ', 'Prasuti Tantra & Sharira Rachana', 'Garbhadhana & Yamala Garbha Utpatti', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Knowledge', 'ayurveda', 'bhela-samhita-yamala-garbha-beeja', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4054', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4055', '"क्लीबबन्ध्यातिवृद्धानामपि वीर्यप्रजाप्रदम्" is said in the context of which of the following formulation?', '[{"id":"4055_opt_1","label":"A","text":"Lashuna ghrita"},{"id":"4055_opt_2","label":"B","text":"Phala ghrita"},{"id":"4055_opt_3","label":"C","text":"Kaamdeva ghrita"},{"id":"4055_opt_4","label":"D","text":"Shataavari ghrita"}]'::jsonb, '4055_opt_1', 'In Ashtanga Hridaya Uttarasthana 34 (and Charaka Chikitsa 5), Lashuna Ghrita is praised for reversing reproductive debility: ''क्लीबबन्ध्यातिवृद्धानामपि वीर्यप्रजाप्रदम्'' bestowing vitality and progeny even in the infertile and elderly.', 'AIAPGET_PG', 'MCQ', 'Prasuti Tantra & Bhaishajya Kalpana', 'Vajikarana & Stri Roga Ghrita Kalpana', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Knowledge', 'ayurveda', 'lashuna-ghrita-viryaprajapradam', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4055', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4056', 'Which of the following is the correct sequence of layers of placental barrier from outward to inward?
(A) Cytotrophoblast
(B) Endothelium of the fetal capillary wall
(C) Syncytiotrophoblast
(D) Stromal tissue
(E) Basement membrane
Choose the correct answer from the options given below:', '[{"id":"4056_opt_1","label":"A","text":"(A), (B), (C), (D), (E)"},{"id":"4056_opt_2","label":"B","text":"(C), (A), (E), (D), (B)"},{"id":"4056_opt_3","label":"C","text":"(B), (D), (E), (A), (C)"},{"id":"4056_opt_4","label":"D","text":"(D), (B), (A), (C), (E)"}]'::jsonb, '4056_opt_2', 'The histological placental membrane from maternal blood space (outward) inward to fetal blood is: (C) Syncytiotrophoblast -> (A) Cytotrophoblast -> (E) Basement membrane -> (D) Stromal tissue -> (B) Endothelium of fetal capillary.', 'AIAPGET_PG', 'MCQ', 'Prasuti Tantra & Embryology', 'Placental Histology and Blood-Placental Barrier', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'placental-barrier-layers-sequence', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4056', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4057', 'Match List I with List II:
List I - (Part of Verse):
(A) Navame tu khalvenam mase madhuroushadha siddhena tailen anuvasayet
(B) Navame tu tat evanuvasana tailatpichum yonao pranayet garbhamargaashyoh snehanarthamiti
(C) Navame tu khalu mase prativihite kadambamaasha tailenaanu
(D) Shastashcha navame masi snigdho maamsarasoudanah
List II - (Name of Samhita):
(I) Astanga Samgraha
(II) Charaka Samhita
(III) Astanga Hridaya
(IV) Bhela Samhita
Choose the correct answer from the options given below:', '[{"id":"4057_opt_1","label":"A","text":"(A)-(I), (B)-(II), (C)-(III), (D)-(IV)"},{"id":"4057_opt_2","label":"B","text":"(A)-(IV), (B)-(I), (C)-(III), (D)-(II)"},{"id":"4057_opt_3","label":"C","text":"(A)-(II), (B)-(I), (C)-(IV), (D)-(III)"},{"id":"4057_opt_4","label":"D","text":"(A)-(III), (B)-(IV), (C)-(II), (D)-(I)"}]'::jsonb, '4057_opt_1', 'Garbhini Masanumashika Paricharya verses: (A) is in Astanga Samgraha (I); (B) ''tailapichum yoni pranayet'' is in Charaka Sharirasthana 8 (II); (C) ''kadambamasha tailena'' is in Astanga Hridaya (III); (D) is described in Bhela Samhita (IV).', 'AIAPGET_PG', 'MCQ', 'Prasuti Tantra', 'Garbhini Masanumashika Paricharya', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Reasoning', 'ayurveda', 'garbhini-ninth-month-care-samhita-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4057', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4058', 'Consider the following facts regarding Mahayoni:
(A) Permanent opening of vaginal introitus.
(B) Female has pain in groin region and all joints.
(C) It occurs due to Ruksha guna of vayu.
(D) Veshawara pinda is used to treat mahayoni.
Choose the correct answer from the options given below:', '[{"id":"4058_opt_1","label":"A","text":"(A), (B) only"},{"id":"4058_opt_2","label":"B","text":"(A), (B), (C) only"},{"id":"4058_opt_3","label":"C","text":"(A), (D) only"},{"id":"4058_opt_4","label":"D","text":"(A), (B), (D) only"}]'::jsonb, '4058_opt_4', 'In Charaka Chikitsasthana 30, Mahayoni (uterine prolapse) presents with an open dilated vulval orifice (''विवृतमुखी''), severe pain in groin and joints, and is treated with warm Veshavara pinda poultice to soothe vitiated Vata. Statement C is incorrect because it is precipitated by abnormal position during coitus and straining, not solely by ruksha guna.', 'AIAPGET_PG', 'MCQ', 'Stri Roga', 'Yonivyapad - Mahayoni', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Clinical Knowledge', 'Hard', 'Application', 'ayurveda', 'mahayoni-yonivyapad-charaka-lakshana', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4058', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4059', 'Given below are two statements:
Statement I: According to Charaka, if the pregnant lady consumes hot pungent dravyas after the stabilization of fetus in 4th month, it may cause bleeding or discharge per vagina.
Statement II: According to Vagbhata, if the pregnant lady suffers from discharge or bleeding per vagina, this can lead to improper growth of fetus or sometimes fetus does not grow but quivers with an extended stay in the uterus.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4059_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4059_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4059_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4059_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4059_opt_1', 'Both statements are authoritative descriptions from Charaka Samhita Sharirasthana 8 and Ashtanga Hridaya Sharirasthana 1, detailing the pathology of Garbhasrava/Garbhapata and Upavishtaka/Nagodara resulting from maternal dietetic indiscretions.', 'AIAPGET_PG', 'MCQ', 'Prasuti Tantra', 'Garbha Vyapad - Upavishtaka and Bleeding', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'garbha-bleeding-pathology-charaka-vagbhata', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4059', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4060', 'According to Kashyapa Samhita the dose of Ghrita for Jatmatra child is', '[{"id":"4060_opt_1","label":"A","text":"Equal to Kolaasthi"},{"id":"4060_opt_2","label":"B","text":"Equal to Kolaardha"},{"id":"4060_opt_3","label":"C","text":"Kolamatram"},{"id":"4060_opt_4","label":"D","text":"Shushka Aamalakmaatram"}]'::jsonb, '4060_opt_1', 'Acharya Kashyapa in Phakka Chikitsa specifies neonatal pediatric dosing: For a Jatamathra (newborn) child, the dose of Ghrita is equal to the seed of a jujube fruit (Kolaasthi sammitam - कोलास्थि सम्मित).', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya', 'Balopacharaniya & Pediatric Posology', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Medium', 'Knowledge', 'ayurveda', 'kashyapa-jatamata-ghrita-dose-kolaasthi', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4060', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4061', 'According to Kashyap Samhita Anupana of ''Swarnaprashana'' is', '[{"id":"4061_opt_1","label":"A","text":"Breast milk"},{"id":"4061_opt_2","label":"B","text":"Madhu"},{"id":"4061_opt_3","label":"C","text":"Sarpi"},{"id":"4061_opt_4","label":"D","text":"Madhu and Sarpi"}]'::jsonb, '4061_opt_4', 'In Kashyapa Samhita Sutrasthana (Lehana Adhyaya), Suvarnaprashana is formulated by rubbing pure gold on a stone with water, administered along with Madhu (honey) and Ghrita/Sarpi (clarified butter) in unequal proportions.', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya', 'Suvarnaprashana & Lehana', ARRAY['ayush-clinical-principles', 'ayush-formulations']::text[], 'AYUSH Core Practice', 'Easy', 'Knowledge', 'ayurveda', 'suvarnaprashana-anupana-madhu-sarpi', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4061', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4062', 'According to Acharya Charaka, which of the following is a Purishaja Krimi?', '[{"id":"4062_opt_1","label":"A","text":"Mahaaguda"},{"id":"4062_opt_2","label":"B","text":"Saugandhika"},{"id":"4062_opt_3","label":"C","text":"Sousurada"},{"id":"4062_opt_4","label":"D","text":"Gandupada"}]'::jsonb, '4062_opt_3', 'In Charaka Samhita Vimanasthana 7 (Krimi Nidana), the five Purishaja Krimis are Kakeruka, Makeruka, Sousurada, Sasoolaka, and Lelihah. Saugandhika and Mahaaguda are Kaphaja, while Gandupada is Purishaja in Sushruta.', 'AIAPGET_PG', 'MCQ', 'Roga Nidana & Kaumarbhritya', 'Krimi Vijnana - Purishaja Krimi', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Knowledge', 'ayurveda', 'purishaja-krimi-sousurada-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4062', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4063', 'Match List I with List II:
List I - (Symptom): (A) Vishaalastabdha Nayanah, (B) Pratatam Roditi Kshaamah, (C) Akasmaadattahasanam, (D) Dehavaivarnyamarati
List II - (Disease): (I) Atisaara, (II) Apasmaara, (III) Ashmari, (IV) Aanaaha
Choose the correct answer from the options given below:', '[{"id":"4063_opt_1","label":"A","text":"(A)-(III), (B)-(IV), (C)-(I), (D)-(II)"},{"id":"4063_opt_2","label":"B","text":"(A)-(II), (B)-(I), (C)-(III), (D)-(IV)"},{"id":"4063_opt_3","label":"C","text":"(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"},{"id":"4063_opt_4","label":"D","text":"(A)-(I), (B)-(II), (C)-(IV), (D)-(III)"}]'::jsonb, '4063_opt_2', 'In Kashyapa Samhita Vedana Adhyaya (Pediatric Symptomatology): Vishalastabdha Nayana indicates Apasmara (II); Pratatam roditi kshama indicates Atisara (I); Akasmadattahasanam indicates Ashmari prodrome (III); Dehavaivarnyamarati indicates Anaha (IV).', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya', 'Kashyapa Vedana Adhyaya - Pediatric Signs', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Understanding', 'ayurveda', 'kashyapa-vedana-adhyaya-symptom-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4063', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4064', 'Which of the following are the ingredients of ''Chaturangika dhoopa'' described in Kashyapa Samhita?', '[{"id":"4064_opt_1","label":"A","text":"Ghrita - Vasa - Majja - Guggulu"},{"id":"4064_opt_2","label":"B","text":"Ghrita - Majja - Vasa - Laksha"},{"id":"4064_opt_3","label":"C","text":"Ghrita - Majja - Laksha - Manahshila"},{"id":"4064_opt_4","label":"D","text":"Ghrita - Vasa - Laksha - Guggulu"}]'::jsonb, '4064_opt_2', 'In Kashyapa Samhita Dhoopa Kalpa Adhyaya, Chaturangika Dhoopa (fumigation formulation for pediatrics/neonates) comprises four ingredients: Ghrita, Majja, Vasa, and Laksha.', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya', 'Dhoopa Kalpana for Children', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Knowledge', 'ayurveda', 'chaturangika-dhoopa-kashyapa-ingredients', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4064', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4065', 'What is the order of progression of lesions in chickenpox?
(A) Macule
(B) Papule
(C) Vesicle
(D) Pustule
(E) Crust
Choose the correct answer from the options given below:', '[{"id":"4065_opt_1","label":"A","text":"(A), (B), (C), (D), (E)"},{"id":"4065_opt_2","label":"B","text":"(B), (C), (D), (E), (A)"},{"id":"4065_opt_3","label":"C","text":"(C), (B), (D), (A), (E)"},{"id":"4065_opt_4","label":"D","text":"(D), (B), (C), (E), (A)"}]'::jsonb, '4065_opt_1', 'Chickenpox (Varicella zoster) rash typically develops pleomorphically in rapid evolutionary stages: Macule -> Papule -> Vesicle (dewdrop on rose petal) -> Pustule -> Crust (scab).', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya & General Medicine', 'Infectious Exanthems - Chickenpox', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Diagnostics', 'Easy', 'Knowledge', 'ayurveda', 'chickenpox-rash-stages-macule-crust', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4065', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4066', 'Match List I with List II:
List I (Syndromes): (A) Patau''s Syndrome, (B) Edward''s Syndrome, (C) Klinefelter''s Syndrome, (D) Turner Syndrome
List II (Chromosomal Pattern): (I) Trisomy 13, (II) Trisomy 18, (III) 47 XXY, (IV) 45 X
Choose the correct answer from the options given below:', '[{"id":"4066_opt_1","label":"A","text":"(A)-(I), (B)-(II), (C)-(III), (D)-(IV)"},{"id":"4066_opt_2","label":"B","text":"(A)-(II), (B)-(I), (C)-(III), (D)-(IV)"},{"id":"4066_opt_3","label":"C","text":"(A)-(IV), (B)-(II), (C)-(III), (D)-(I)"},{"id":"4066_opt_4","label":"D","text":"(A)-(I), (B)-(II), (C)-(IV), (D)-(III)"}]'::jsonb, '4066_opt_1', 'Cytogenetic anomalies: Patau syndrome is Trisomy 13 (I); Edward syndrome is Trisomy 18 (II); Klinefelter syndrome is 47, XXY (III); Turner syndrome is 45, X (IV).', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya & Genetics', 'Chromosomal Aneuploidies', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Easy', 'Knowledge', 'ayurveda', 'chromosomal-aneuploidies-karyotype-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4066', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4067', 'A three months old infant having Social Smile, Neck holding and following objects visually. What developmental milestone most likely to be achieved soon by him?', '[{"id":"4067_opt_1","label":"A","text":"Rolling over"},{"id":"4067_opt_2","label":"B","text":"Mono Syllables"},{"id":"4067_opt_3","label":"C","text":"Grasping Object"},{"id":"4067_opt_4","label":"D","text":"Crawling"}]'::jsonb, '4067_opt_1', 'At 3 months, an infant exhibits steady head control, social smile, and visual tracking. The very next major motor milestone achieved between 4 to 5 months is rolling over (prone to supine).', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya', 'Infant Growth and Development Milestones', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Medium', 'Application', 'ayurveda', 'infant-developmental-milestones-rolling-over', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4067', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4068', 'Given below are two statements:
Statement I: 36 hours after birth, a full term Neonate has a total Bilirubin level of 14 mg/dl. In this case continuous Phototherapy is recommended.
Statement II: Phototherapy is indicated to reduce Bilirubin level and to prevent Kernicterus.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4068_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4068_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4068_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4068_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4068_opt_1', 'According to the AAP neonatal hyperbilirubinemia nomogram, at 36 hours of life in a term newborn, a TSB of 14 mg/dL exceeds the high-risk phototherapy threshold, requiring intensive phototherapy to photoisomerize unconjugated bilirubin and prevent bilirubin encephalopathy (Kernicterus).', 'AIAPGET_PG', 'MCQ', 'Kaumarbhritya & Neonatology', 'Neonatal Jaundice & Phototherapy', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Diagnostics', 'Medium', 'Application', 'ayurveda', 'neonatal-hyperbilirubinemia-phototherapy-kernicterus', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4068', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4069', 'According to Acharya Charaka ''Jugupsaa Chikitsaa'' is done in which of the following disease?', '[{"id":"4069_opt_1","label":"A","text":"Shotha"},{"id":"4069_opt_2","label":"B","text":"Unmaada"},{"id":"4069_opt_3","label":"C","text":"Apasmaara"},{"id":"4069_opt_4","label":"D","text":"Rajayakshmaa"}]'::jsonb, '4069_opt_4', 'In Charaka Samhita Chikitsasthana 8 (Rajayakshma Chikitsa), Jugupsa Chikitsa (administration of nourishing meat soups derived from carnivorous animals without revealing their true repulsive source) is indicated to promote strength and nourishment in wasting disease.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Rajayakshma Chikitsa Sutra', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'jugupsa-chikitsa-rajayakshma-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4069', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4070', 'Given below are two statements:
Statement I: According to Acharya Charaka ''Tikshna Samshodhana'' is done in Paandu Patients.
Statement II: According to Acharya Charaka ''Tikshna Samshodhana'' is done in Kamala Patients.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4070_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4070_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4070_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4070_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4070_opt_2', 'In Charaka Samhita Chikitsasthana 16, Pandu patients have depleted ojas and tissue strength and are given ''Mridu Samshodhana'' (mild purification); Tikshna Samshodhana is strictly contraindicated. In Kamala, purgation must also be gentle (Mridu Tikta Virechana). Both statements asserting Tikshna Samshodhana are incorrect.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Pandu and Kamala Samshodhana', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Reasoning', 'ayurveda', 'pandu-kamala-mridu-samshodhana-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4070', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4071', 'In which of the following disease "Ashtaanga Lavana" is indicated by Charaka?', '[{"id":"4071_opt_1","label":"A","text":"Madaatyaya"},{"id":"4071_opt_2","label":"B","text":"Ajeerna"},{"id":"4071_opt_3","label":"C","text":"Jalodara"},{"id":"4071_opt_4","label":"D","text":"Shotha"}]'::jsonb, '4071_opt_1', 'In Charaka Samhita Chikitsasthana 24/177-179 (Madatyaya Chikitsa), Ashtanga Lavana (composed of Sauwarchala, Saindhava, Maricha, Ajamoda, Jiraka, etc.) is specifically formulated for Srotovishodhana, Deepana, and treating Kaphaja Madatyaya.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Madatyaya Chikitsa', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Medium', 'Knowledge', 'ayurveda', 'ashtanga-lavana-madatyaya-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4071', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4072', 'According to Ashtaang Hridaya types of Langhana are —', '[{"id":"4072_opt_1","label":"A","text":"10"},{"id":"4072_opt_2","label":"B","text":"7"},{"id":"4072_opt_3","label":"C","text":"2"},{"id":"4072_opt_4","label":"D","text":"3"}]'::jsonb, '4072_opt_3', 'Ashtanga Hridaya Sutrasthana 14 classifies Langhana primarily into 2 major divisions: Shodhana (purificatory) and Shamana (palliative). (In contrast, Charaka Sutrasthana 22 enumerates 10 individual Langhana modalities).', 'AIAPGET_PG', 'MCQ', 'Ashtanga Hridaya Sutrasthana', 'Dvividhopakramaniya - Langhana Bheda', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'langhana-two-types-ashtanga-hridaya', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4072', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4073', '"मूत्रशुक्रस्थान् दोषांश्चाप्यपकर्षति" is mentioned for which of the following Rasayana?', '[{"id":"4073_opt_1","label":"A","text":"Brahma Rasayana"},{"id":"4073_opt_2","label":"B","text":"Nagabalaa Rasayana"},{"id":"4073_opt_3","label":"C","text":"Chyawanpraasha Rasayana"},{"id":"4073_opt_4","label":"D","text":"Bhallataka Ksheera Rasayana"}]'::jsonb, '4073_opt_3', 'In Charaka Samhita Chikitsasthana 1/1 (Rasayanadhyaya - Abhayamlakiya Pada), the phalasruti of Chyawanprasha includes clearing morbidity of urinary and reproductive tracts: ''मूत्रशुक्रस्थान् दोषांश्चाप्यपकर्षति''.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa & Dravyaguna', 'Rasayana - Chyawanprasha', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Knowledge', 'ayurveda', 'chyawanprasha-rasayana-charaka-phalasruti', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4073', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4074', 'If there is Kaphanubandha in vataja Gulma then Eranda taila should be given along with which of the following :', '[{"id":"4074_opt_1","label":"A","text":"Vaarunee Manda"},{"id":"4074_opt_2","label":"B","text":"Godugdha"},{"id":"4074_opt_3","label":"C","text":"Utpala Kwatha"},{"id":"4074_opt_4","label":"D","text":"Gomootra"}]'::jsonb, '4074_opt_1', 'In Charaka Chikitsasthana 5/38 (Gulma Chikitsa), when Vataja Gulma has Kaphanubandha, Eranda Taila is administered with Varuni Manda (fermented alcoholic scum) to break the blockage and stimulate agni.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Gulma Chikitsa - Eranda Taila Anupana', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Application', 'ayurveda', 'vataja-gulma-eranda-taila-varuni-manda', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4074', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4075', '"बलिनो बहुदोषस्य स्निग्धस्विन्नस्य शोधनम्। ऊर्ध्वाधो...... कुर्यात् स्नेहं यत्र कर्षनम्॥"
As per Ashtanga Hridaya, this treatment is mentioned in which of the following disease?', '[{"id":"4075_opt_1","label":"A","text":"Rajayakshama"},{"id":"4075_opt_2","label":"B","text":"Jwara"},{"id":"4075_opt_3","label":"C","text":"Hridroga"},{"id":"4075_opt_4","label":"D","text":"Raktapitta"}]'::jsonb, '4075_opt_1', 'In Ashtanga Hridaya Nidana/Chikitsa for Rajayakshma (wasting syndrome), when a patient is robust with high doshic accumulation (''बलिनो बहुदोषस्य''), mild bi-directional shodhana followed by restorative snehana is advocated.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Rajayakshma Chikitsa Sutra', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Reasoning', 'ayurveda', 'balino-bahudoshasya-rajayakshma-vagbhata', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4075', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4076', '"विरेच्यः स्नेहयित्वाऽऽदौ स्नेहयुक्तैर्विरेचनैः" According to Charaka, this line of treatment is indicated in which of the following disease?', '[{"id":"4076_opt_1","label":"A","text":"Vaatavyadhi"},{"id":"4076_opt_2","label":"B","text":"Vaata Shonita"},{"id":"4076_opt_3","label":"C","text":"Pakshaghata"},{"id":"4076_opt_4","label":"D","text":"Aamavata"}]'::jsonb, '4076_opt_2', 'In Charaka Samhita Chikitsasthana 29/81 (Vatarakta Chikitsa), Charaka directs that Vatarakta patients should first be oleated and then gently purged using unctuous purgative formulations: ''विरेच्यः स्नेहयित्वाऽऽदौ स्नेहयुक्तैर्विरेचनैः''.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Vatarakta Chikitsa Sutra', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'vatarakta-virechana-snehayukta-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4076', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4077', 'According to Acharya Charaka, which of the following is not the ingredient of Deepaniya Shoolaghna Yavagu?', '[{"id":"4077_opt_1","label":"A","text":"Chitraka"},{"id":"4077_opt_2","label":"B","text":"Naagara"},{"id":"4077_opt_3","label":"C","text":"Maricha"},{"id":"4077_opt_4","label":"D","text":"Pippali mula"}]'::jsonb, '4077_opt_3', 'In Charaka Sutrasthana 2/19 (Apamarga Tanduliya), the Deepaniya and Shoolaghna Yavagu is prepared with Pippali, Pippalimula, Chavya, Chitraka, and Nagara (Panchakola). Maricha is not an ingredient in this formulation.', 'AIAPGET_PG', 'MCQ', 'Charaka Samhita & Bhaishajya Kalpana', 'Yavagu Kalpana - Deepaniya Shoolaghna', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Medium', 'Knowledge', 'ayurveda', 'deepaniya-shoolaghna-yavagu-panchakola-maricha', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4077', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4078', 'In which of the following chapter of Sushruta Samhita, ''Dhanvantaram Ghrita'' is indicated?', '[{"id":"4078_opt_1","label":"A","text":"Ashmari"},{"id":"4078_opt_2","label":"B","text":"Raktapitta"},{"id":"4078_opt_3","label":"C","text":"Prameha-Pidakaa"},{"id":"4078_opt_4","label":"D","text":"Vaatavyadhi"}]'::jsonb, '4078_opt_3', 'In Sushruta Samhita Chikitsasthana 12 (Prameha-Pidaka Chikitsa), Dhanvantara Ghrita is described as a supreme formulation to heal diabetic carbuncles and deep-seated tissue necrosis.', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra & Kayachikitsa', 'Prameha Pidaka - Dhanvantaram Ghrita', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Medium', 'Knowledge', 'ayurveda', 'dhanvantaram-ghrita-prameha-pidaka-sushruta', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4078', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4079', '"Vrishyagutika" is mentioned in which of the following pada of Vajeekarana Adhyaya of Charaka Samhita?', '[{"id":"4079_opt_1","label":"A","text":"Asikta Ksheerikam"},{"id":"4079_opt_2","label":"B","text":"Samyoga Sharamuliyam"},{"id":"4079_opt_3","label":"C","text":"Pumanjaatabalaadikam"},{"id":"4079_opt_4","label":"D","text":"Mashaparnabhritiyam"}]'::jsonb, '4079_opt_2', 'In Charaka Samhita Chikitsasthana chapter 2 (Vajikarana Adhyaya), the second section is Samyoga Sharamooleeyam Pada (1/2), which describes the formulation of Vrishya Gutika.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Vajikarana Pada Formulations', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Knowledge', 'ayurveda', 'vrishyagutika-samyoga-sharamuliyam-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4079', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4080', 'According to Acharya Charaka "रसायनमिदं श्रेष्ठं सर्वरोगहरं शिवम्" is described for which of the following formulation?', '[{"id":"4080_opt_1","label":"A","text":"Shilajatu Rasayana"},{"id":"4080_opt_2","label":"B","text":"Bhallatak Rasayana"},{"id":"4080_opt_3","label":"C","text":"Yogaraja Rasayana"},{"id":"4080_opt_4","label":"D","text":"Aamalaki Rasayana"}]'::jsonb, '4080_opt_1', 'In Charaka Chikitsasthana 1/3 (Karaprachitiya Rasayana Pada), Shilajatu Rasayana is glorified with: ''रसायनमिदं श्रेष्ठं सर्वरोगहरं शिवम्'' emphasizing that there is no curable disease on earth that cannot be conquered by Shilajatu.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa & Dravyaguna', 'Shilajatu Rasayana Mahatmya', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Medium', 'Knowledge', 'ayurveda', 'shilajatu-rasayana-sarvarogahara-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4080', 2025, TRUE, '2026-09-12T17:03:04.370Z'::timestamptz, '2026-09-12T17:03:04.370Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4081', '''चिन्त्यानर्थांश्च चिन्तयते, अचिन्त्यांश्च चिन्तयते'' : According to Acharya Chakrapani, this symptom is observed in which of the following ''Vibhrama''?', '[{"id":"4081_opt_1","label":"A","text":"Buddhi vibhrama"},{"id":"4081_opt_2","label":"B","text":"Aachaara vibhrama"},{"id":"4081_opt_3","label":"C","text":"Mano vibhrama"},{"id":"4081_opt_4","label":"D","text":"Sheela vibhrama"}]'::jsonb, '4081_opt_3', 'In Chakrapani''s commentary on Charaka Nidanasthana 7 (Unmada Nidana), Mano-vibhrama is defined as excessive and aberrant cognitive deliberation: thinking of inappropriate things and perseverating on unfruitful thoughts (''चिन्त्यानर्थांश्च चिन्तयते, अचिन्त्यांश्च चिन्तयते'').', 'AIAPGET_PG', 'MCQ', 'Manasa Roga & Charaka Nidana', 'Ashta Vibhrama in Unmada', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Understanding', 'ayurveda', 'unmada-mano-vibhrama-chakrapani', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4081', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4082', 'According to Charaka which of the following statements are correct?
(A) Vata Sthananupoorvi Chikitsa is indicated in sama sannipata mutrakrichchhra.
(B) Vata Sthananupoorvi Chikitsa is indicated in sama sannipata Jwara.
(C) Kapha Sthananupoorvi Chikitsa is indicated in sama sannipata mutrakrichchhra.
(D) Kapha Sthananupoorvi Chikitsa is indicated in sama sannipata Jwara.
(E) Pitta Sthananupoorvi Chikitsa is indicated in sama sannipata Jwara.
Choose the correct answer from the options given below:', '[{"id":"4082_opt_1","label":"A","text":"(B) and (C) only"},{"id":"4082_opt_2","label":"B","text":"(A) and (E) only"},{"id":"4082_opt_3","label":"C","text":"(A) and (D) only"},{"id":"4082_opt_4","label":"D","text":"(C) and (D) only"}]'::jsonb, '4082_opt_3', 'In Charaka Samhita Chikitsasthana 26 (Mutrakrichchhra), in equal tridoshic presentation (sama sannipata), treatment follows the site of disease origin: Vatasthana-anupoorvi in Mutrakrichchhra (A). In Sama Sannipata Jwara, because Jwara originates from Amashaya, Kaphasthana-anupoorvi Chikitsa is prescribed (D).', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Sannipata Chikitsa Sutra', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Reasoning', 'ayurveda', 'sthananupoorvi-chikitsa-charaka-sannipata', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4082', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4083', 'Given below are two statements:
Statement I: According to Astanga Hridaya, the Oushadha Sevanakala for Hidhma is during night (Nishi).
Statement II: According to Astanga Hridaya, the Oushadha Sevana kala for vyana vayu vikruti is at the end of morning meals.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4083_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4083_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4083_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4083_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4083_opt_1', 'In Ashtanga Hridaya Sutrasthana 13 (Aushadha Sevana Kala): in Hikka (Hidhma), medicine is administered repeatedly (Muhurmuhuh) and at bedtime / night (Nishi); for Vyana Vayu disorders, medicine is given post-morning meal (Pratar-ashasya ante). Both statements are classically correct.', 'AIAPGET_PG', 'MCQ', 'Bhaishajya Kalpana & Kayachikitsa', 'Dasha Aushadha Sevana Kala', ARRAY['ayush-clinical-principles', 'ayush-formulations']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'aushadha-sevana-kala-ashtanga-hridaya', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4083', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4084', 'According to Charak, which of the following Rasayana are mentioned in Kaphaja Hridroga are:
(A) Shilajatu Rasayana
(B) Nagabalaa Rasayana
(C) Kushmaanda Rasayana
(D) Amalakee Rasayana
(E) Madhuyashti Rasayana
Choose the correct answer from the options given below:', '[{"id":"4084_opt_1","label":"A","text":"(B) and (C) only"},{"id":"4084_opt_2","label":"B","text":"(A) and (D) only"},{"id":"4084_opt_3","label":"C","text":"(D) and (E) only"},{"id":"4084_opt_4","label":"D","text":"(B) and (E) only"}]'::jsonb, '4084_opt_2', 'In Charaka Samhita Chikitsasthana 26/97 (Hridroga Chikitsa), for Kaphaja Hridroga, Shilajatu Rasayana and Amalaki Rasayana are explicitly indicated due to their Lekhana, Medohara, and Rasayana actions without increasing Kapha.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa', 'Hridroga Chikitsa - Rasayana Prayoga', ARRAY['ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Understanding', 'ayurveda', 'kaphaja-hridroga-shilajatu-amalaki-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4084', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4085', 'Which of the following are included in ''Chatushprakara Samshudhhi''?
(A) Shirovirechana
(B) Raktamokshana
(C) Niruh Basti
(D) Anuvaasan Basti
(E) Vamana
Choose the correct answer from the options given below:', '[{"id":"4085_opt_1","label":"A","text":"(C) and (D) only"},{"id":"4085_opt_2","label":"B","text":"(A), (B) and (D) only"},{"id":"4085_opt_3","label":"C","text":"(A), (C) and (E) only"},{"id":"4085_opt_4","label":"D","text":"(B) and (C) only"}]'::jsonb, '4085_opt_3', 'Chatushprakara Shodhana (fourfold classical purification described by Sushruta and Vagbhata in Sodhana Adhyaya) comprises: Vamana (E), Virechana, Niruha Basti (C), and Shirovirechana / Nasya (A).', 'AIAPGET_PG', 'MCQ', 'Panchakarma & Sushruta Sutrasthana', 'Chatushprakara Samshuddhi', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'chatushprakara-samshuddhi-panchakarma', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4085', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4086', 'See the following two statements of Acharya Charaka.
Statement I: Snehapana is contraindicated during Nasya and Basti Karma.
Statement II: In snake bite, ''Uttam matra'' of Sneha is indicated.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4086_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4086_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4086_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4086_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4086_opt_4', 'In Charaka Sutrasthana 13 (Snehadhyaya), Snehapana is an essential preparatory purvakarma before Basti and Nasya, so Statement I is incorrect. For Sarpa Damsha (snake bite), high maximum dose (Uttama Matra) of sneha/ghrita is indicated to neutralize systemic poison spread, so Statement II is correct.', 'AIAPGET_PG', 'MCQ', 'Panchakarma & Agada Tantra', 'Snehapana Matra and Indications', ARRAY['ayush-clinical-principles', 'ayush-pharmacovigilance']::text[], 'Clinical Knowledge', 'Hard', 'Reasoning', 'ayurveda', 'snehapana-contraindication-snakebite-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4086', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4087', 'According to Charaka in which of the following disease Vamana is indicated?', '[{"id":"4087_opt_1","label":"A","text":"Gulma"},{"id":"4087_opt_2","label":"B","text":"Pandu"},{"id":"4087_opt_3","label":"C","text":"Hrida Roga"},{"id":"4087_opt_4","label":"D","text":"Shankhaka"}]'::jsonb, '4087_opt_2', 'In Charaka Chikitsasthana 16/40 (Pandu Chikitsa), Pandu patients are first given unctuous emesis (Tikta Ghrita followed by gentle Vamana) to clear Kaphapitta obstruction from the Hridaya and channels before rasayana administration.', 'AIAPGET_PG', 'MCQ', 'Panchakarma & Kayachikitsa', 'Vamana Indication in Pandu', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'vamana-indicated-pandu-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4087', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4088', 'Given below are two statements:
Statement I: According to Acharya Charaka, Basti Netra should be of 8 Angulas long for 12 years old person.
Statement II: Charaka has described 8 Bastidata doshas.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4088_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4088_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4088_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4088_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4088_opt_1', 'In Charaka Samhita Siddhisthana chapter 3 (Bastipri-vibhagiyo): Basti Netra length for 12 years age is specified as 8 Angula (''अष्टौ द्वादशवर्षस्य''). Additionally, Charaka categorizes 8 procedural errors/faults attributable to the administrator (Bastidata Dosha). Both statements are accurate.', 'AIAPGET_PG', 'MCQ', 'Panchakarma', 'Basti Netra Pramana and Bastidata Dosha', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Understanding', 'ayurveda', 'basti-netra-length-bastidata-dosha-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4088', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4089', 'Match List I with List II:
List I (Schemes of AYUSH): (A) Ayurgyan Scheme, (B) Ayurswasthya Scheme, (C) International Co-operation Scheme, (D) Vrikshayurveda
List II (Goals): (I) Boost AYUSH products / services / education/research/training globally, (II) Capacity building and CME in AYUSH, (III) Conservation, Development and management of medicinal plants, (IV) Intervention of AYUSH in public health and sports medicine
Choose the correct answer from the options given below:', '[{"id":"4089_opt_1","label":"A","text":"(A)-(III), (B)-(IV), (C)-(I), (D)-(II)"},{"id":"4089_opt_2","label":"B","text":"(A)-(II), (B)-(IV), (C)-(I), (D)-(III)"},{"id":"4089_opt_3","label":"C","text":"(A)-(III), (B)-(I), (C)-(IV), (D)-(II)"},{"id":"4089_opt_4","label":"D","text":"(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"}]'::jsonb, '4089_opt_2', 'Ministry of AYUSH Central Sector Schemes: Ayurgyan scheme supports capacity building and CME (II); Ayurswasthya Yojana focuses on public health and sports medicine interventions (IV); International Cooperation Scheme promotes AYUSH globally (I); Vrikshayurveda initiatives cultivate and conserve medicinal plant species (III).', 'AIAPGET_PG', 'MCQ', 'AYUSH Policy & Public Health', 'Ministry of AYUSH Central Sector Schemes', ARRAY['ayush-regulatory', 'ayush-entrepreneurship']::text[], 'Regulatory Awareness', 'Medium', 'Understanding', 'ayurveda', 'ministry-of-ayush-schemes-matching', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4089', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4090', 'According to Charaka Generally in which of the following seasons Nasya is given?
(A) Pravruta
(B) Hemanta
(C) Vasanta
(D) Varsha
(E) Sharad
Choose the correct answer from the options given below:', '[{"id":"4090_opt_1","label":"A","text":"(C) only"},{"id":"4090_opt_2","label":"B","text":"(A), (B) and (C) only"},{"id":"4090_opt_3","label":"C","text":"(B), (D) and (E) only"},{"id":"4090_opt_4","label":"D","text":"(A), (C) and (E) only"}]'::jsonb, '4090_opt_4', 'In Charaka Samhita Siddhisthana 9/89 and Sutrasthana 5, the standard seasonal administrations for prophylactic and therapeutic regular Nasya are Pravrit (early rains), Vasanta (spring), and Sharad (autumn) when atmospheric temperature is moderate (''प्रावृट् शरद्वसन्तेषु'').', 'AIAPGET_PG', 'MCQ', 'Panchakarma', 'Nasya Vidhi - Seasonal Timing', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'nasya-seasons-pravrut-vasanta-sharad-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4090', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4091', 'Statement I: According to Charaka ''Mandavibhransha'' refers to Hrasva matra of Snehapana.
Statement II: According to Charaka Swedan is contraindicated in Madhumeha patient.
In the light of the above statements, choose the correct answer from the options given below:', '[{"id":"4091_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4091_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4091_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4091_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4091_opt_1', 'In Charaka Sutrasthana 13, Hrasva matra of sneha causes minimal metabolic perturbation (''मन्दविभ्रंशा'' - Mandavibhransha) and digests easily. In Charaka Sutrasthana 22 (Swedana Adhyaya), Swedana is strictly contraindicated in Madhumeha and Prameha patients due to Pitta-Meda liquefaction risks.', 'AIAPGET_PG', 'MCQ', 'Panchakarma', 'Snehana Matra and Swedana Nishedha', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Reasoning', 'ayurveda', 'mandavibhransha-hrasva-matra-swedana-madhumeha', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4091', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4092', 'What dose of Niruha Basti should be given to a 14 years old boy?', '[{"id":"4092_opt_1","label":"A","text":"6 Prasruta"},{"id":"4092_opt_2","label":"B","text":"8 Prasruta"},{"id":"4092_opt_3","label":"C","text":"10 Prasruta"},{"id":"4092_opt_4","label":"D","text":"12 Prasruta"}]'::jsonb, '4092_opt_3', 'In Charaka Samhita Siddhisthana chapter 3 (Basti Pramana): starting with 1 Prasruta at 1 year, adding 1 Prasruta per year up to 12 years (12 Prasruta is adult max). For a 14-year-old boy, the prescribed Basti volume corresponds to 10 Prasruta (१० प्रसृत).', 'AIAPGET_PG', 'MCQ', 'Panchakarma', 'Niruha Basti Posology by Age', ARRAY['ayush-formulations', 'ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'niruha-basti-dose-14-years-prasruta', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4092', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4093', 'Which of the following is the drug of choice for Shirovirechana?', '[{"id":"4093_opt_1","label":"A","text":"Kutheraka"},{"id":"4093_opt_2","label":"B","text":"Pratyakpushpa"},{"id":"4093_opt_3","label":"C","text":"Pippali"},{"id":"4093_opt_4","label":"D","text":"Aparajita"}]'::jsonb, '4093_opt_2', 'In Charaka Samhita Sutrasthana 25 (Yajjah Purushiya Adhyaya), Acharya Charaka declares Pratyakpushpa (Apamarga / Achyranthes aspera) as the best among Shirovirechana drugs (''प्रत्यक्पुष्पा शिरोविरेचनानाम्'').', 'AIAPGET_PG', 'MCQ', 'Dravyaguna & Panchakarma', 'Agrya Dravya - Shirovirechana', ARRAY['ayush-clinical-principles', 'ayush-formulations']::text[], 'AYUSH Core Practice', 'Easy', 'Knowledge', 'ayurveda', 'pratyakpushpa-agrya-dravya-shirovirechana', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4093', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4094', 'Which one of the following symptom is seen in Kumbheeka Shukadosha?', '[{"id":"4094_opt_1","label":"A","text":"Jambavasthinibha"},{"id":"4094_opt_2","label":"B","text":"Yakritopama"},{"id":"4094_opt_3","label":"C","text":"Mudgamashopama"},{"id":"4094_opt_4","label":"D","text":"Krishnasphotavrita"}]'::jsonb, '4094_opt_1', 'In Sushruta Samhita Nidanasthana 13 (Shukadosha Nidana), Kumbhika is described with black, seed-like eruptions resembling the stone/seed of a Jamun fruit (''जाम्बवास्थिनिभा कृष्ण'').', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra', 'Kshudra Roga - Shukadosha', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Knowledge', 'ayurveda', 'kumbheeka-shukadosha-jambavasthinibha', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4094', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4095', 'As per Sushruta, the characteristic of Surgical Intervention for Prachchhana Karma is', '[{"id":"4095_opt_1","label":"A","text":"Sankirna"},{"id":"4095_opt_2","label":"B","text":"Avagadha"},{"id":"4095_opt_3","label":"C","text":"Anuttana"},{"id":"4095_opt_4","label":"D","text":"Asukhma"}]'::jsonb, '4095_opt_1', 'In Sushruta Samhita Sutrasthana 13 (Raktamokshana Vidhi), Prachchhana (scarification) must be performed with incisions that are parallel, neither too deep (an-avagadha), fine, and non-overlapping (Asankirna / Sankirna indicates improper incision technique).', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra', 'Raktamokshana - Prachchhana Karma', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Knowledge', 'ayurveda', 'prachchhana-karma-surgical-technique-sushruta', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4095', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4096', '''Shanatulaavat Snayujalvanto'' is a feature seen in which of the following?', '[{"id":"4096_opt_1","label":"A","text":"Indravriddha"},{"id":"4096_opt_2","label":"B","text":"Sharkararbuda"},{"id":"4096_opt_3","label":"C","text":"Andhalaji"},{"id":"4096_opt_4","label":"D","text":"Asadhyavrana"}]'::jsonb, '4096_opt_2', 'In Sushruta Samhita Nidanasthana chapter 11 (Arbuda Nidana), Sharkararbuda is characterized by tendon-like fibrillar projections resembling combed hemp or flax fibres: ''शणतूलवत् स्नायुजालवन्तो''.', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra', 'Arbuda Vijnana - Sharkararbuda', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Knowledge', 'ayurveda', 'shanatulaavat-snayujalvanto-sharkararbuda', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4096', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4097', 'In reference of Ksharkarma in bhrashtaguda, Sushruta has mentioned which of the following?', '[{"id":"4097_opt_1","label":"A","text":"Ksharadi Karma should not be performed in ''Bhrashtaguda''."},{"id":"4097_opt_2","label":"B","text":"Ksharadi Karma should be performed by Darvikurchaka Shalaka in Bhrashtaguda."},{"id":"4097_opt_3","label":"C","text":"Ksharadi Karma should be performed without any yantra in Bhrashtaguda."},{"id":"4097_opt_4","label":"D","text":"Ksharpatan should be performed by Gandupadamukhi Shalaka in Bhrashtaguda."}]'::jsonb, '4097_opt_3', 'In Sushruta Samhita Chikitsasthana 6/18, in prolapse of the rectum (Bhrashtaguda), since the rectal mucosa is already fully exteriorized, application of Kshara is conducted directly without requiring a tubular speculum/yantra (''विना यन्त्रेण'').', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra', 'Kshara Karma Vidhi in Bhrashtaguda', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Application', 'ayurveda', 'kshara-karma-bhrashtaguda-without-yantra', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4097', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4098', 'As per Sushruta, the measurement of hole (chhidra) in Arshayantra is', '[{"id":"4098_opt_1","label":"A","text":"Three angula ayata, Angushthodara Parinaha"},{"id":"4098_opt_2","label":"B","text":"Four angula ayata, Kanishthika Parinaha"},{"id":"4098_opt_3","label":"C","text":"Two angula ayata, Kanishthika Parinaha"},{"id":"4098_opt_4","label":"D","text":"Four angula ayata, Angushthodara Parinaha"}]'::jsonb, '4098_opt_1', 'In Sushruta Samhita Sutrasthana 7 (Yantra Vidhi), the viewing fenestration (chhidra) on the Arsho-yantra (proctoscope) is specifically measured as three Angulas in length and having circumference equal to the belly of the thumb: ''त्र्यङ्गुलमायतम् अङ्गुष्ठोदरपरिणाहम्''.', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra', 'Surgical Instruments - Arshayantra Specifications', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'arshayantra-chhidra-dimension-sushruta', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4098', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4099', 'The feature of discharge from the Mamsagatavrana is', '[{"id":"4099_opt_1","label":"A","text":"Singhanaka pratima"},{"id":"4099_opt_2","label":"B","text":"Shukti Dhautamiva"},{"id":"4099_opt_3","label":"C","text":"Salilaprakashah"},{"id":"4099_opt_4","label":"D","text":"Sarpih prakashah"}]'::jsonb, '4099_opt_4', 'In Sushruta Samhita Sutrasthana 22 (Vrana Srava Vijnana), the exudate from an ulcer involving muscle tissue (Mamsagata Vrana) is thick, slimy, and resembles clarified butter: ''सर्पिःप्रकाशः'' (Sarpih prakashah).', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra', 'Vrana Srava Lakshana by Dhatu Level', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Knowledge', 'ayurveda', 'mamsagata-vrana-discharge-sarpih-prakashah', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4099', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4100', 'Put the following Vranopakramas in order of use in Vranashotha:
(A) Shodhana
(B) Vaikritapaham
(C) Avasechana
(D) Ropana
(E) Upanaha
Choose the correct answer from the options given below:', '[{"id":"4100_opt_1","label":"A","text":"(C), (E), (A), (D), (B)"},{"id":"4100_opt_2","label":"B","text":"(E), (A), (D), (C), (B)"},{"id":"4100_opt_3","label":"C","text":"(A), (D), (C), (E), (B)"},{"id":"4100_opt_4","label":"D","text":"(A), (B), (D), (E), (C)"}]'::jsonb, '4100_opt_1', 'Sushruta Samhita Chikitsasthana 1 describes the celebrated Saptopakrama (seven sequential therapeutic interventions for swelling and ulcer): 1. Apatarpana, 2. Alepa, 3. Parisheka, 4. Abhyanga, 5. Svedana, 6. Vimlapana, 7. Upanaha (E) -> Bhedana/Avasechana (C) -> Shodhana (A) -> Ropana (D) -> Vaikritapaham (B). Among the options, the relative sequence is (C), (E), (A), (D), (B).', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra', 'Shashti Upakrama & Vranashotha Sequence', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'vranashotha-vranopakrama-sequence-sushruta', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4100', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4101', 'Given below are two statements:
Statement I: Vatakundalika is a type of Mutraghata.
Statement II: According to Sushruta, Vatakundalika is a Yapya vrana.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4101_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4101_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4101_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4101_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4101_opt_3', 'Statement I is correct because Vatakundalika is one of the 13 varieties of Mutraghata (obstructive uropathy). Statement II is incorrect because Vatakundalika is a urinary disorder, not a surgical ulcer (Vrana).', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra & Roga Nidana', 'Mutraghata - Vatakundalika', ARRAY['ayush-clinical-principles', 'ayush-diagnosis']::text[], 'Clinical Knowledge', 'Medium', 'Understanding', 'ayurveda', 'vatakundalika-mutraghata-classification', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4101', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4102', 'Carefully read the below mentioned sentences:
(A) Ksharakarma is beneficial in "उत्सन्नमांसान् कठिनान्" Vrana
(B) Sivanakarma is indicated in vrana with blood inside.
(C) Ksharakarma is indicated in urine excreting wound caused by Ashmari.
(D) Yavashuka and Phena are indicated for lekhana in vranas.
(E) Avachurnana is indicated for purification of vrana having odour and meda vitiation.
Choose the correct answer from the options given below:', '[{"id":"4102_opt_1","label":"A","text":"(A), (C), (D) only"},{"id":"4102_opt_2","label":"B","text":"(B), (C), (E) only"},{"id":"4102_opt_3","label":"C","text":"(A), (D), (E) only"},{"id":"4102_opt_4","label":"D","text":"(B), (D), (E) only"}]'::jsonb, '4102_opt_3', 'In Sushruta Sutrasthana 11 & 25: (A) Kshara is indicated in hyper-granulated, hard ulcers; (D) Yavaksheera/Phena are lekhana; (E) Avachurnana is used for deodorizing/debriding medojushta vranas. (B) is wrong because suturing is strictly contraindicated over pooled blood; (C) is wrong because Kshara is contraindicated in urinary fistula/bladder incision.', 'AIAPGET_PG', 'MCQ', 'Shalya Tantra', 'Kshara Karma and Seevana Indications', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Hard', 'Reasoning', 'ayurveda', 'shashti-upakrama-kshara-seevana-rules', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4102', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4103', 'What is the length of ''Brihat Panchmool Kaand'' taken for the preparation of ''Deepika Taila'' in context of ''Karnashoola Chikitsa'' as outlined in Sushruta Samhita?', '[{"id":"4103_opt_1","label":"A","text":"12 Angula"},{"id":"4103_opt_2","label":"B","text":"14 Angula"},{"id":"4103_opt_3","label":"C","text":"16 Angula"},{"id":"4103_opt_4","label":"D","text":"18 Angula"}]'::jsonb, '4103_opt_4', 'In Sushruta Samhita Uttaratantra 21 (Karnagataroga Chikitsa), for the preparation of Deepika Taila used in otalgia, pieces of Brihat Panchamula stem are wrapped in cloth, dipped in oil, and ignited; their classical specified length is 18 Angula (''अष्टादशाङ्गुलं काण्डं'').', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra', 'Karna Roga - Deepika Taila', ARRAY['ayush-clinical-principles', 'ayush-formulations']::text[], 'AYUSH Core Practice', 'Hard', 'Knowledge', 'ayurveda', 'deepika-taila-brihat-panchamula-18-angula', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4103', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4104', 'According to "Astanga Hridaya" association of Doshas in ''Suryavarta Shiroroga'' are', '[{"id":"4104_opt_1","label":"A","text":"Pitta associated with Vata"},{"id":"4104_opt_2","label":"B","text":"Pitta associated with Kapha"},{"id":"4104_opt_3","label":"C","text":"Tridoshaja"},{"id":"4104_opt_4","label":"D","text":"Vata associated with Kapha"}]'::jsonb, '4104_opt_4', 'In Ashtanga Hridaya Uttarasthana 23 (Shiroroga Pratishedha), Suryavarta headache is fundamentally an interaction of Vata associated with Kapha (''वातानुबद्ध कफ''), wherein daytime solar heat liquifies kapha, causing severe diurnal temporal and frontal cephalalgia.', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra', 'Shiroroga - Suryavarta Dosha Sambandha', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Medium', 'Knowledge', 'ayurveda', 'suryavarta-shiroroga-vata-kapha-vagbhata', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4104', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4106', 'According to Aacharya Sushruta which of the following ''Nasa Roga'' is associated with "रात्रौ विशेषेण हि तं विकारं"?', '[{"id":"4106_opt_1","label":"A","text":"Nasa Parisrava"},{"id":"4106_opt_2","label":"B","text":"Deepta"},{"id":"4106_opt_3","label":"C","text":"Pooyarakta"},{"id":"4106_opt_4","label":"D","text":"Apeenasa"}]'::jsonb, '4106_opt_1', 'In Sushruta Samhita Uttaratantra 22 (Nasaroga Vijnana), Nasa Parisrava (allergic rhinorrhea / vasomotor rhinitis) is characterized by copious thin clear nasal drainage occurring particularly at night: ''रात्रौ विशेषेण हि तं विकारं ब्रूयान् नासापरिस्रावमिति''.', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra', 'Nasa Roga - Nasa Parisrava', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Medium', 'Knowledge', 'ayurveda', 'nasa-parisrava-sushruta-ratrau-visheshena', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4106', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4107', 'Given below are two statements:
Statement I: In a 2 years old male patient with prolapsing polypoidal soft mass of left nasal cavity, a diagnosis of ''Anterior Ethmoidal Polyp'' can be safely made without much investigations.
Statement II: In a female patient of 24 years having unilateral, Severe episodic throbbing headache with associated Nausea and vomiting, radiological investigation is always required to commense the treatment.
In the light of the above statements, choose the most appropriate answer from the options given below:', '[{"id":"4107_opt_1","label":"A","text":"Both Statement I and Statement II are correct"},{"id":"4107_opt_2","label":"B","text":"Both Statement I and Statement II are incorrect"},{"id":"4107_opt_3","label":"C","text":"Statement I is correct but Statement II is incorrect"},{"id":"4107_opt_4","label":"D","text":"Statement I is incorrect but Statement II is correct"}]'::jsonb, '4107_opt_2', 'Statement I is dangerously incorrect because a unilateral intranasal mass in a 2-year-old child is an encephalocoele or glioma until proven otherwise and must NEVER be biopsied or assumed a simple polyp without CT/MRI. Statement II is incorrect because classic migraine without red flags is a clinical diagnosis not requiring baseline neuroimaging before starting therapy.', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra & ENT Surgery', 'Differential Diagnosis in Pediatric ENT & Headache', ARRAY['ayush-diagnosis', 'ayush-clinical-principles']::text[], 'Diagnostics', 'Hard', 'Reasoning', 'ayurveda', 'ent-clinical-red-flags-encephalocoele-migraine', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4107', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4108', '"Peenasadhika Vednam" is outlined in textual reference of which of the following Nasaroga according to Astang Hridaya?', '[{"id":"4108_opt_1","label":"A","text":"Kshvathu"},{"id":"4108_opt_2","label":"B","text":"Nasa Deepta"},{"id":"4108_opt_3","label":"C","text":"Apeenasa"},{"id":"4108_opt_4","label":"D","text":"Nasa Pratinaha"}]'::jsonb, '4108_opt_4', 'In Ashtanga Hridaya Uttaratantra 19/9, Nasa Pratinaha (nasal obstruction) is characterized by severe fullness, heaviness, and symptoms exceeding ordinary coryza: ''पीनसाधिकवेदनाम्''.', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra', 'Nasa Roga - Nasa Pratinaha', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Knowledge', 'ayurveda', 'peenasadhika-vedanam-nasa-pratinaha-vagbhata', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4108', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4109', 'According to Ashtanga Hridaya, "मत्सगन्धिश्चैकतः ...... मांसातानः" this feature is related to which one of the following disease?', '[{"id":"4109_opt_1","label":"A","text":"Alasa"},{"id":"4109_opt_2","label":"B","text":"Adhijivhika"},{"id":"4109_opt_3","label":"C","text":"Upajivha"},{"id":"4109_opt_4","label":"D","text":"Vrinda"}]'::jsonb, '4109_opt_1', 'In Ashtanga Hridaya Uttarasthana 21/41 (Mukharoga Vijnana), Alasa (severe sublingual cellulitis/ulceration) is described as an asymmetrical fleshy expansion under the tongue emitting a fishy necrotizing odor: ''मत्सगन्धिश्चैकतः ...... मांसातानः''.', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra', 'Mukha Roga - Jihvagata Roga (Alasa)', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Knowledge', 'ayurveda', 'alasa-mukha-roga-matsyagandhi-ashtanga-hridaya', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4109', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4110', 'What is the "Netra Tarpan Kaal Maryada" suggested by Acharya Sushruta for a healthy individual?', '[{"id":"4110_opt_1","label":"A","text":"500 Vaak matra"},{"id":"4110_opt_2","label":"B","text":"600 Vaak matra"},{"id":"4110_opt_3","label":"C","text":"800 Vaak matra"},{"id":"4110_opt_4","label":"D","text":"1000 Vaak matra"}]'::jsonb, '4110_opt_1', 'In Sushruta Samhita Uttaratantra 18 (Kriya Kalpa), the retention time (Matra Kala) of Medicated Ghrita in Netra Tarpana for a healthy person (Swastha) or Vartmagata roga is 500 Vak matra (वाङ्मात्रा). For Sandhigata it is 300, Shukla 500, Krishna 700, and Drishti 800-1000.', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra', 'Netra Kriya Kalpa - Tarpana Kala Maryada', ARRAY['ayush-clinical-principles']::text[], 'Clinical Knowledge', 'Medium', 'Knowledge', 'ayurveda', 'netra-tarpana-swastha-kala-maryada', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4110', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4111', 'According to Ashtanga Hridaya which of the following clinical feature is suggestive of involvement of first tunial layer in ''Kshtaja Shukra''?', '[{"id":"4111_opt_1","label":"A","text":"Todabaahulyam"},{"id":"4111_opt_2","label":"B","text":"Suchividdhabham"},{"id":"4111_opt_3","label":"C","text":"Pakvajambu Nibham"},{"id":"4111_opt_4","label":"D","text":"Nichitam Vranaih"}]'::jsonb, '4111_opt_2', 'In Ashtanga Hridaya Uttarasthana 10 (Shuklaroga Pratishedha), traumatic corneal ulceration (Kshataja Shukra) confined to the superficial/first patala appears like a needle prick: ''सूचीविद्धाभम्'' (Suchividdhabham) and heals without deformity.', 'AIAPGET_PG', 'MCQ', 'Shalakya Tantra', 'Drishti & Shuklagata Roga - Kshataja Shukra', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Understanding', 'ayurveda', 'kshataja-shukra-suchividdhabham-first-patala', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4111', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4112', 'What is a ''hypothesis'' in research?', '[{"id":"4112_opt_1","label":"A","text":"Statement that needs to be answered."},{"id":"4112_opt_2","label":"B","text":"Statement that can be tested."},{"id":"4112_opt_3","label":"C","text":"A theory that is already accepted."},{"id":"4112_opt_4","label":"D","text":"A conclusion that is based on evidence."}]'::jsonb, '4112_opt_2', 'In scientific research methodology, a hypothesis is a proposed, testable, and falsifiable proposition or tentative explanation formulated to be investigated through empirical experimentation and statistical verification.', 'AIAPGET_PG', 'MCQ', 'Research Methodology & Medical Statistics', 'Formulation of Research Hypothesis', ARRAY['ayush-research-methodology', 'ayush-scientific-validation']::text[], 'Research Methodology', 'Easy', 'Understanding', 'ayurveda', 'research-methodology-hypothesis-definition', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4112', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4113', 'Who could be the chairman of Institutional Ethics Committee as per ICMR guidelines?', '[{"id":"4113_opt_1","label":"A","text":"Head of the Institution"},{"id":"4113_opt_2","label":"B","text":"Person Nominated by Head of Institution from same Institution"},{"id":"4113_opt_3","label":"C","text":"A senior expert from outside the organisation"},{"id":"4113_opt_4","label":"D","text":"A lay person"}]'::jsonb, '4113_opt_3', 'According to ICMR National Ethical Guidelines for Biomedical and Health Research involving Human Participants, the Chairperson of the Institutional Ethics Committee (IEC) must be from outside the institution to maintain independence and prevent conflicts of interest.', 'AIAPGET_PG', 'MCQ', 'Research Methodology & Bioethics', 'Institutional Ethics Committee (IEC) Guidelines', ARRAY['ayush-research-methodology', 'ayush-regulatory']::text[], 'Research Methodology', 'Medium', 'Knowledge', 'ayurveda', 'icmr-ethics-committee-chairperson-outside-expert', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4113', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4114', 'The most powerful research design for establishing causal relationship between exposure and outcome is —', '[{"id":"4114_opt_1","label":"A","text":"Analytical studies"},{"id":"4114_opt_2","label":"B","text":"Experimental studies"},{"id":"4114_opt_3","label":"C","text":"Case studies"},{"id":"4114_opt_4","label":"D","text":"Descriptive studies"}]'::jsonb, '4114_opt_2', 'Experimental study designs (specifically Randomized Controlled Trials - RCTs) provide the highest level of empirical evidence for establishing direct causal relationships between an intervention/exposure and an outcome because randomization controls for both known and unknown confounders.', 'AIAPGET_PG', 'MCQ', 'Research Methodology & Epidemiology', 'Epidemiological Study Designs and Causality', ARRAY['ayush-research-methodology', 'ayush-scientific-validation']::text[], 'Research Methodology', 'Easy', 'Understanding', 'ayurveda', 'epidemiology-causal-relationship-experimental-studies', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4114', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4115', 'Choose the correct option for regression line passing through the origin :', '[{"id":"4115_opt_1","label":"A","text":"The correlation is zero"},{"id":"4115_opt_2","label":"B","text":"Intercept is zero"},{"id":"4115_opt_3","label":"C","text":"Regression coefficient is zero"},{"id":"4115_opt_4","label":"D","text":"Dependent variable Y is zero"}]'::jsonb, '4115_opt_2', 'The equation of a linear regression line is Y = a + bX, where ''a'' represents the Y-intercept. When the line passes through the origin (0, 0), the intercept ''a'' equals zero (Y = bX).', 'AIAPGET_PG', 'MCQ', 'Medical Statistics', 'Linear Regression Analysis', ARRAY['ayush-research-methodology']::text[], 'Biostatistics', 'Easy', 'Understanding', 'ayurveda', 'linear-regression-line-passing-origin-intercept-zero', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4115', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4116', 'Arrange the following steps in process of hypothesis testing :
(A) Select the level of significance
(B) Set up null and alternate hypothesis
(C) Establishing the decision rule
(D) Perform computations
(E) Select test statistics
Choose the correct answer from the options given below:', '[{"id":"4116_opt_1","label":"A","text":"(A), (B), (C), (D), (E)"},{"id":"4116_opt_2","label":"B","text":"(A), (B), (E), (D), (C)"},{"id":"4116_opt_3","label":"C","text":"(B), (A), (C), (D), (E)"},{"id":"4116_opt_4","label":"D","text":"(B), (A), (E), (C), (D)"}]'::jsonb, '4116_opt_4', 'The formal 5-step procedure of statistical hypothesis testing is: Step 1: Set up H0 and H1 (B); Step 2: Select significance level alpha (A); Step 3: Choose appropriate test statistic (E); Step 4: Formulate decision rule / critical region (C); Step 5: Compute test statistic value and conclude (D). Hence (B) -> (A) -> (E) -> (C) -> (D).', 'AIAPGET_PG', 'MCQ', 'Medical Statistics', 'Hypothesis Testing Steps', ARRAY['ayush-research-methodology']::text[], 'Biostatistics', 'Medium', 'Understanding', 'ayurveda', 'hypothesis-testing-sequence-statistics', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4116', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4117', 'Ministry of AYUSH was established on:', '[{"id":"4117_opt_1","label":"A","text":"11th Nov. 2014"},{"id":"4117_opt_2","label":"B","text":"5th Nov. 2014"},{"id":"4117_opt_3","label":"C","text":"21st Nov. 2014"},{"id":"4117_opt_4","label":"D","text":"9th Nov. 2014"}]'::jsonb, '4117_opt_4', 'The Ministry of AYUSH was officially formed as an independent Union Ministry on 9th November 2014 by the Government of India, elevated from the Department of AYUSH.', 'AIAPGET_PG', 'MCQ', 'AYUSH Policy & History', 'Formation of Ministry of AYUSH', ARRAY['ayush-regulatory']::text[], 'Regulatory Awareness', 'Easy', 'Knowledge', 'ayurveda', 'ministry-of-ayush-establishment-date', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4117', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4118', 'Old name of AYUSH and it''s establishment year is —', '[{"id":"4118_opt_1","label":"A","text":"Dept. of AYUSH in 1995"},{"id":"4118_opt_2","label":"B","text":"Indian System of Medicine and Homeopathy in 1995"},{"id":"4118_opt_3","label":"C","text":"Dept. of AYUSH in 1996"},{"id":"4118_opt_4","label":"D","text":"Indian System of Medicine and Homeopathy in 1996"}]'::jsonb, '4118_opt_2', 'In March 1995, the Department of Indian Systems of Medicine and Homoeopathy (ISM&H) was established under the Ministry of Health and Family Welfare. It was subsequently renamed as the Department of AYUSH in November 2003.', 'AIAPGET_PG', 'MCQ', 'AYUSH Policy & History', 'History of AYUSH Governance', ARRAY['ayush-regulatory']::text[], 'Regulatory Awareness', 'Easy', 'Knowledge', 'ayurveda', 'ism-and-h-establishment-1995', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4118', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4119', 'The United Nations General Assembly had declared 21st June as International Yoga Day on —', '[{"id":"4119_opt_1","label":"A","text":"31st Dec. 2014"},{"id":"4119_opt_2","label":"B","text":"11th Dec. 2014"},{"id":"4119_opt_3","label":"C","text":"11th Nov. 2014"},{"id":"4119_opt_4","label":"D","text":"21st Nov. 2014"}]'::jsonb, '4119_opt_2', 'On 11th December 2014, the 193-member United Nations General Assembly (UNGA) approved by consensus resolution 69/131, proclaiming 21st June as International Day of Yoga.', 'AIAPGET_PG', 'MCQ', 'Yoga & International Health Policy', 'International Day of Yoga Proclamation', ARRAY['ayush-regulatory']::text[], 'Regulatory Awareness', 'Easy', 'Knowledge', 'yoga-naturopathy', 'international-yoga-day-unga-proclamation-date', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4119', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4120', 'Give sequence of timeline in establishment of following events in respect of AYUSH by Govt. of India:
(A) Recognition of Sowa-Rigpa under IMCC Act
(B) Ministry of AYUSH
(C) Dept. of ISM & H
(D) WHO-GTMC
(E) Dept. of AYUSH
Choose the correct answer from the options given below:', '[{"id":"4120_opt_1","label":"A","text":"(A), (C), (B), (E), (D)"},{"id":"4120_opt_2","label":"B","text":"(C), (A), (E), (B), (D)"},{"id":"4120_opt_3","label":"C","text":"(A), (C), (E), (B), (D)"},{"id":"4120_opt_4","label":"D","text":"(C), (E), (A), (B), (D)"}]'::jsonb, '4120_opt_4', 'Historical chronological sequence: (C) Department of ISM&H formed in 1995 -> (E) Renamed as Department of AYUSH in November 2003 -> (A) Sowa-Rigpa recognized under IMCC Act amendment in 2010 -> (B) Full Ministry of AYUSH created on 9 Nov 2014 -> (D) WHO Global Centre for Traditional Medicine (WHO-GTMC) established in Jamnagar in 2022. Hence: (C), (E), (A), (B), (D).', 'AIAPGET_PG', 'MCQ', 'AYUSH Policy & History', 'AYUSH Chronology & Milestones', ARRAY['ayush-regulatory']::text[], 'Regulatory Awareness', 'Medium', 'Understanding', 'ayurveda', 'ayush-chronology-milestones-timeline', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4120', 2025, TRUE, '2026-09-12T17:03:04.383Z'::timestamptz, '2026-09-12T17:03:04.383Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_002', 'A microscope has an objective of focal length 2 cm, eyepiece of focal length 4 cm and the tube length of 40 cm. If the distance of distinct vision of eye is 25 cm, the magnification in the microscope is', '[{"id":"neet_002_opt_1","label":"A","text":"100"},{"id":"neet_002_opt_2","label":"B","text":"125"},{"id":"neet_002_opt_3","label":"C","text":"150"},{"id":"neet_002_opt_4","label":"D","text":"250"}]'::jsonb, 'neet_002_opt_2', 'Magnification of compound microscope for normal adjustment is M = (L / fo) * (D / fe) = (40 / 2) * (25 / 4) = 20 * 6.25 = 125.', 'NEET_UG', 'MCQ', 'Physics', 'Ray Optics and Optical Instruments', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Application', 'ayurveda', 'compound-microscope-magnification-optics', 'NEET UG 2024 Official Question Paper (Code 45/S6), Question 2', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_004', 'There are two inclined surfaces of equal length (L) and same angle of inclination 45° with the horizontal. One of them is rough and the other is perfectly smooth. A given body takes 2 times as much time to slide down on rough surface than on the smooth surface. The coefficient of kinetic friction (μk) between the object and the rough surface is close to', '[{"id":"neet_004_opt_1","label":"A","text":"0.25"},{"id":"neet_004_opt_2","label":"B","text":"0.40"},{"id":"neet_004_opt_3","label":"C","text":"0.5"},{"id":"neet_004_opt_4","label":"D","text":"0.75"}]'::jsonb, 'neet_004_opt_4', 'Using t_rough / t_smooth = n = 2: μk = tan(θ) * (1 - 1/n²) = tan(45°) * (1 - 1/4) = 1 * (3/4) = 0.75.', 'NEET_UG', 'MCQ', 'Physics', 'Laws of Motion & Friction', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Application', 'ayurveda', 'inclined-plane-friction-coefficient', 'NEET UG 2024 Official Question Paper (Code 45/S6), Question 4', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_005', 'The kinetic energies of two similar cars A and B are 100 J and 225 J respectively. On applying breaks, car A stops after 1000 m and car B stops after 1500 m. If FA and FB are the forces applied by the breaks on cars A and B, respectively, then the ratio FA / FB is', '[{"id":"neet_005_opt_1","label":"A","text":"3/2"},{"id":"neet_005_opt_2","label":"B","text":"2/3"},{"id":"neet_005_opt_3","label":"C","text":"1/3"},{"id":"neet_005_opt_4","label":"D","text":"1/2"}]'::jsonb, 'neet_005_opt_2', 'By Work-Energy Theorem, KE = F * s, so F = KE / s. FA = 100 / 1000 = 0.1 N; FB = 225 / 1500 = 0.15 N. Thus FA / FB = 0.1 / 0.15 = 2/3.', 'NEET_UG', 'MCQ', 'Physics', 'Work, Energy and Power', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Application', 'ayurveda', 'work-energy-theorem-stopping-force-ratio', 'NEET UG 2024 Official Question Paper (Code 45/S6), Question 5', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_010', 'A ball of mass 0.5 kg is dropped from a height of 40 m. The ball hits the ground and rises to a height of 10 m. The impulse imparted to the ball during its collision with the ground is (Take g = 9.8 m/s²)', '[{"id":"neet_010_opt_1","label":"A","text":"21 NS"},{"id":"neet_010_opt_2","label":"B","text":"7 NS"},{"id":"neet_010_opt_3","label":"C","text":"0"},{"id":"neet_010_opt_4","label":"D","text":"84 NS"}]'::jsonb, 'neet_010_opt_1', 'Velocity before collision v1 = √(2 * 9.8 * 40) = 28 m/s downwards. Velocity after rebound v2 = √(2 * 9.8 * 10) = 14 m/s upwards. Impulse = m * (v2 - (-v1)) = 0.5 * (14 + 28) = 0.5 * 42 = 21 N·s.', 'NEET_UG', 'MCQ', 'Physics', 'Laws of Motion & Impulse', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Application', 'ayurveda', 'impulse-momentum-collision-rebound', 'NEET UG 2024 Official Question Paper (Code 45/S6), Question 10', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_012', 'A 2 amp current is flowing through two different small circular copper coils having radii ratio 1:2. The ratio of their respective magnetic moments will be', '[{"id":"neet_012_opt_1","label":"A","text":"1:4"},{"id":"neet_012_opt_2","label":"B","text":"1:2"},{"id":"neet_012_opt_3","label":"C","text":"2:1"},{"id":"neet_012_opt_4","label":"D","text":"4:1"}]'::jsonb, 'neet_012_opt_1', 'Magnetic dipole moment of a current loop M = I * A = I * π * r². For equal current I, M ∝ r². Thus M1 / M2 = (r1 / r2)² = (1/2)² = 1/4.', 'NEET_UG', 'MCQ', 'Physics', 'Moving Charges and Magnetism', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Application', 'ayurveda', 'magnetic-moment-current-loop-ratio', 'NEET UG 2024 Official Question Paper (Code 45/S6), Question 12', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_013', 'In a certain camera, a combination of four similar thin convex lenses are arranged axially in contact. Then the power of the combination and the total magnification in comparison to the power (p) and magnification (m) for each lens will be, respectively –', '[{"id":"neet_013_opt_1","label":"A","text":"4p and 4m"},{"id":"neet_013_opt_2","label":"B","text":"p⁴ and 4m"},{"id":"neet_013_opt_3","label":"C","text":"4p and m⁴"},{"id":"neet_013_opt_4","label":"D","text":"p⁴ and m⁴"}]'::jsonb, 'neet_013_opt_3', 'For thin lenses in contact: total optical power is additive (P_total = p + p + p + p = 4p), whereas total magnification is multiplicative (M_total = m1 * m2 * m3 * m4 = m⁴).', 'NEET_UG', 'MCQ', 'Physics', 'Ray Optics - Lens Combination', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'lenses-in-contact-power-magnification', 'NEET UG 2024 Official Question Paper (Code 45/S6), Question 13', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_017', 'The Sun rotates around its centre once in 27 days. What will be the period of revolution if the Sun were to expand to twice its present radius without any external influence? Assume the Sun to be a sphere of uniform density.', '[{"id":"neet_017_opt_1","label":"A","text":"100 days"},{"id":"neet_017_opt_2","label":"B","text":"105 days"},{"id":"neet_017_opt_3","label":"C","text":"115 days"},{"id":"neet_017_opt_4","label":"D","text":"108 days"}]'::jsonb, 'neet_017_opt_4', 'By conservation of angular momentum: L = I * ω = (2/5 M R²) * (2π / T) = constant. Therefore T2 / T1 = (R2 / R1)² = (2R / R)² = 4. Hence T2 = 4 * 27 = 108 days.', 'NEET_UG', 'MCQ', 'Physics', 'System of Particles & Rotational Motion', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Application', 'ayurveda', 'conservation-of-angular-momentum-rotational-period', 'NEET UG 2024 Official Question Paper (Code 45/S6), Question 17', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_022', 'Given below are two statements :
Statement I : Atoms are electrically neutral as they contain equal number of positive and negative charges.
Statement II : Atoms of each element are stable and emit their characteristic spectrum.
In the light of the above statements, choose the most appropriate answer from the options given below :', '[{"id":"neet_022_opt_1","label":"A","text":"Statement I is incorrect but Statement II is correct."},{"id":"neet_022_opt_2","label":"B","text":"Both Statement I and Statement II are correct."},{"id":"neet_022_opt_3","label":"C","text":"Both Statement I and Statement II are incorrect."},{"id":"neet_022_opt_4","label":"D","text":"Statement I is correct but Statement II is incorrect."}]'::jsonb, 'neet_022_opt_4', 'Statement I is correct: in any neutral atom, the number of protons equals the number of electrons. Statement II is incorrect because atoms of radioactive elements are naturally unstable and undergo spontaneous radioactive decay.', 'NEET_UG', 'MCQ', 'Physics', 'Atoms and Nuclei', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'atomic-structure-neutrality-stability', 'NEET UG 2024 Official Question Paper (Code S6), Question 22', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_023', 'The quantities which have the same dimensions as those of solid angle are :', '[{"id":"neet_023_opt_1","label":"A","text":"angular speed and stress"},{"id":"neet_023_opt_2","label":"B","text":"strain and angle"},{"id":"neet_023_opt_3","label":"C","text":"stress and angle"},{"id":"neet_023_opt_4","label":"D","text":"strain and arc"}]'::jsonb, 'neet_023_opt_2', 'Solid angle is dimensionless [M⁰L⁰T⁰] (steradian). Similarly, plane angle (radian) and strain (ΔL/L) are both dimensionless physical quantities.', 'NEET_UG', 'MCQ', 'Physics', 'Units and Measurements', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'dimensionless-quantities-strain-angle', 'NEET UG 2024 Official Question Paper (Code S6), Question 23', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_032', 'A body weighs 48 N on the surface of the earth. The gravitational force experienced by the body due to the earth at a height equal to one-third the radius of the earth from its surface is :', '[{"id":"neet_032_opt_1","label":"A","text":"16 N"},{"id":"neet_032_opt_2","label":"B","text":"27 N"},{"id":"neet_032_opt_3","label":"C","text":"32 N"},{"id":"neet_032_opt_4","label":"D","text":"36 N"}]'::jsonb, 'neet_032_opt_2', 'Gravitational acceleration at height h is g'' = g / (1 + h/R)². For h = R/3: g'' = g / (1 + 1/3)² = g / (4/3)² = 9/16 g. Weight W'' = (9/16) * 48 N = 27 N.', 'NEET_UG', 'MCQ', 'Physics', 'Gravitation', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Application', 'ayurveda', 'gravitational-force-variation-with-height', 'NEET UG 2024 Official Question Paper (Code 45), Question 32', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_033', 'A wire of resistance R is cut into 8 equal pieces. From these pieces two equivalent resistances are made by adding four of these together in parallel. Then these two sets are added in series. The net effective resistance of the combination is :', '[{"id":"neet_033_opt_1","label":"A","text":"R / 64"},{"id":"neet_033_opt_2","label":"B","text":"R / 32"},{"id":"neet_033_opt_3","label":"C","text":"R / 16"},{"id":"neet_033_opt_4","label":"D","text":"R / 8"}]'::jsonb, 'neet_033_opt_3', 'Each of the 8 pieces has resistance r = R/8. Connecting 4 pieces in parallel gives an equivalent resistance of (R/8)/4 = R/32. Placing two such groups in series yields R_net = (R/32) + (R/32) = R/16.', 'NEET_UG', 'MCQ', 'Physics', 'Current Electricity - Combination of Resistors', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Application', 'ayurveda', 'resistor-combination-series-parallel', 'NEET UG 2024 Official Question Paper (Code 45), Question 33', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_034', 'De-Broglie wavelength of an electron orbiting in the n = 2 state of hydrogen atom is close to (Given Bohr radius = 0.052 nm)', '[{"id":"neet_034_opt_1","label":"A","text":"0.067 nm"},{"id":"neet_034_opt_2","label":"B","text":"0.67 nm"},{"id":"neet_034_opt_3","label":"C","text":"1.67 nm"},{"id":"neet_034_opt_4","label":"D","text":"2.67 nm"}]'::jsonb, 'neet_034_opt_2', 'According to Bohr''s de Broglie relation, 2πrn = nλ. The radius of n=2 orbit is r2 = r0 * n² = 0.052 nm * 4 = 0.208 nm. Hence λ = (2 * π * r2) / n = (2 * 3.1416 * 0.208 nm) / 2 = 0.653 nm ≈ 0.67 nm.', 'NEET_UG', 'MCQ', 'Physics', 'Dual Nature of Radiation and Matter', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Application', 'ayurveda', 'de-broglie-wavelength-bohr-orbit', 'NEET UG 2024 Official Question Paper (Code 45), Question 34', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_051', 'Given below are two statements:
Statement I : Aniline does not undergo Friedel-Crafts alkylation reaction.
Statement II : Aniline cannot be prepared through Gabriel synthesis.
In the light of the above statements, choose the correct answer from the options given below:', '[{"id":"neet_051_opt_1","label":"A","text":"Statement I is incorrect but Statement II is true."},{"id":"neet_051_opt_2","label":"B","text":"Both Statement I and Statement II are true."},{"id":"neet_051_opt_3","label":"C","text":"Both Statement I and Statement II are false."},{"id":"neet_051_opt_4","label":"D","text":"Statement I is correct but Statement II is false."}]'::jsonb, 'neet_051_opt_2', 'Statement I is true because the basic -NH2 group of aniline reacts with the Lewis acid catalyst AlCl3 forming a complex that deactivates the ring. Statement II is true because aryl halides do not undergo nucleophilic substitution with potassium phthalimide.', 'NEET_UG', 'MCQ', 'Chemistry', 'Amines - Aniline Reactions', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Understanding', 'ayurveda', 'aniline-friedel-crafts-gabriel-phthalimide', 'NEET UG 2024 Official Question Paper (Code S6), Question 51', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_052', 'Match List I with List II :
List I (Compound): (A) NH3, (B) BrF5, (C) XeF4, (D) SF6
List II (Shape/geometry): (I) Trigonal Pyramidal, (II) Square Planar, (III) Octahedral, (IV) Square Pyramidal
Choose the correct answer from the options given below :', '[{"id":"neet_052_opt_1","label":"A","text":"(A)-II, (B)-III, (C)-IV, (D)-I"},{"id":"neet_052_opt_2","label":"B","text":"(A)-I, (B)-IV, (C)-II, (D)-III"},{"id":"neet_052_opt_3","label":"C","text":"(A)-II, (B)-IV, (C)-III, (D)-I"},{"id":"neet_052_opt_4","label":"D","text":"(A)-III, (B)-IV, (C)-I, (D)-II"}]'::jsonb, 'neet_052_opt_2', 'VSEPR geometries: NH3 has 3 bond pairs and 1 lone pair = Trigonal pyramidal (I); BrF5 has 5 bond pairs and 1 lone pair = Square pyramidal (IV); XeF4 has 4 bond pairs and 2 lone pairs = Square planar (II); SF6 has 6 bond pairs = Octahedral (III).', 'NEET_UG', 'MCQ', 'Chemistry', 'Chemical Bonding & Molecular Structure - VSEPR', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'vsepr-molecular-geometry-matching', 'NEET UG 2024 Official Question Paper (Code S6), Question 52', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_053', 'Match List I with List II :
List I (Molecule): (A) ethane, (B) ethene, (C) carbon molecule, C2, (D) ethyne
List II (Number and types of bond/s between two carbon atoms): (I) one σ-bond and two π-bonds, (II) two π-bonds, (III) one σ-bond, (IV) one σ-bond and one π-bond
Choose the correct answer from the options given below :', '[{"id":"neet_053_opt_1","label":"A","text":"(A)-III, (B)-IV, (C)-I, (D)-II"},{"id":"neet_053_opt_2","label":"B","text":"(A)-I, (B)-IV, (C)-II, (D)-III"},{"id":"neet_053_opt_3","label":"C","text":"(A)-IV, (B)-III, (C)-II, (D)-I"},{"id":"neet_053_opt_4","label":"D","text":"(A)-III, (B)-IV, (C)-II, (D)-I"}]'::jsonb, 'neet_053_opt_4', 'Bonding between C atoms: Ethane (H3C-CH3) has one σ-bond (III); Ethene (H2C=CH2) has one σ-bond and one π-bond (IV); C2 according to Molecular Orbital Theory has two π-bonds (II); Ethyne (HC≡CH) has one σ-bond and two π-bonds (I).', 'NEET_UG', 'MCQ', 'Chemistry', 'Chemical Bonding - Molecular Orbital Theory', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Understanding', 'ayurveda', 'sigma-pi-bonding-c2-molecule-mot', 'NEET UG 2024 Official Question Paper (Code S6), Question 53', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_054', 'Dalton''s Atomic theory could not explain which of the following?
(1) Law of conservation of mass
(2) Law of constant proportion
(3) Law of multiple proportion
(4) Law of gaseous volume', '[{"id":"neet_054_opt_1","label":"A","text":"Law of conservation of mass"},{"id":"neet_054_opt_2","label":"B","text":"Law of constant proportion"},{"id":"neet_054_opt_3","label":"C","text":"Law of multiple proportion"},{"id":"neet_054_opt_4","label":"D","text":"Law of gaseous volume"}]'::jsonb, 'neet_054_opt_4', 'Dalton''s atomic theory successfully accounted for the laws of chemical combination by mass (conservation of mass, definite proportions, and multiple proportions), but failed to explain Gay-Lussac''s law of gaseous volumes.', 'NEET_UG', 'MCQ', 'Chemistry', 'Some Basic Concepts of Chemistry - Dalton Atomic Theory', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'daltons-atomic-theory-gay-lussac-gaseous-volume', 'NEET UG 2024 Official Question Paper (Code 45), Question 54', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_055', 'Consider the following compounds : KO2, H2O2 and H2SO4. The oxidation states of the underlined elements in them are, respectively,
(Note: Underlined elements are O in KO2, O in H2O2, and S in H2SO4)', '[{"id":"neet_055_opt_1","label":"A","text":"+1, -1, and +6"},{"id":"neet_055_opt_2","label":"B","text":"-1/2, -1, and +6"},{"id":"neet_055_opt_3","label":"C","text":"-1, -2, and +4"},{"id":"neet_055_opt_4","label":"D","text":"+4, -4, and +6"}]'::jsonb, 'neet_055_opt_2', 'In potassium superoxide (KO2), oxygen is in the superoxide form with oxidation state -1/2. In hydrogen peroxide (H2O2), oxygen is in the peroxide state -1. In sulfuric acid (H2SO4), sulfur has an oxidation state of +6.', 'NEET_UG', 'MCQ', 'Chemistry', 'Redox Reactions - Oxidation States', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'oxidation-states-superoxide-peroxide-sulfate', 'NEET UG 2024 Official Question Paper (Code 45), Question 55', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_056', 'If the half-life (t1/2) for a first order reaction is 1 minute, then the time required for 99.9% completion of the reaction is closest to :', '[{"id":"neet_056_opt_1","label":"A","text":"2 minutes"},{"id":"neet_056_opt_2","label":"B","text":"4 minutes"},{"id":"neet_056_opt_3","label":"C","text":"5 minutes"},{"id":"neet_056_opt_4","label":"D","text":"10 minutes"}]'::jsonb, 'neet_056_opt_4', 'For a first order reaction: t_99.9% = (2.303 / k) * log(100 / 0.1) = (2.303 / (0.693 / t1/2)) * log(1000) = (2.303 * 3 / 0.693) * t1/2 ≈ 10 * t1/2. For t1/2 = 1 min, t_99.9% ≈ 10 minutes.', 'NEET_UG', 'MCQ', 'Chemistry', 'Chemical Kinetics - First Order Reactions', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Application', 'ayurveda', 'first-order-kinetics-half-life-relation', 'NEET UG 2024 Official Question Paper (Code 45), Question 56', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_057', 'Arrange the following elements in increasing order of first ionization enthalpy: Li, Be, B, C, N. Choose the correct answer from the options given below:', '[{"id":"neet_057_opt_1","label":"A","text":"Li < Be < N < B < C"},{"id":"neet_057_opt_2","label":"B","text":"Li < Be < B < C < N"},{"id":"neet_057_opt_3","label":"C","text":"Li < B < Be < C < N"},{"id":"neet_057_opt_4","label":"D","text":"Li < Be < C < B < N"}]'::jsonb, 'neet_057_opt_3', 'First ionization enthalpy generally increases across period 2, with an anomaly between Be (2s² completely filled) and B (2p¹ single electron easy to remove). Hence B < Be, yielding the order: Li < B < Be < C < N.', 'NEET_UG', 'MCQ', 'Chemistry', 'Periodic Classification - Ionization Enthalpy', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Understanding', 'ayurveda', 'ionization-enthalpy-periodicity-beryllium-boron', 'NEET UG 2024 Official Question Paper (Code S6), Question 57', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_058', 'Which one of the following compounds can exist as cis-trans isomers?
(1) Pent-1-ene
(2) 2-Methylhex-2-ene
(3) 1,1-Dimethylcyclopropane
(4) 1,2-Dimethylcyclohexane', '[{"id":"neet_058_opt_1","label":"A","text":"Pent-1-ene"},{"id":"neet_058_opt_2","label":"B","text":"2-Methylhex-2-ene"},{"id":"neet_058_opt_3","label":"C","text":"1,1-Dimethylcyclopropane"},{"id":"neet_058_opt_4","label":"D","text":"1,2-Dimethylcyclohexane"}]'::jsonb, 'neet_058_opt_4', '1,2-Dimethylcyclohexane possesses two stereocenters with restricted ring rotation, giving rise to distinct geometric diastereomers: cis-1,2-dimethylcyclohexane and trans-1,2-dimethylcyclohexane.', 'NEET_UG', 'MCQ', 'Chemistry', 'Organic Chemistry - Geometrical Isomerism', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Understanding', 'ayurveda', 'geometrical-isomerism-cyclohexane-derivatives', 'NEET UG 2024 Official Question Paper (Code 45), Question 58', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_064', 'Fehling''s solution ''A'' is
(1) aqueous sodium citrate
(2) aqueous copper sulphate
(3) alkaline copper sulphate
(4) alkaline solution of sodium potassium tartrate (Rochelle''s salt)', '[{"id":"neet_064_opt_1","label":"A","text":"aqueous sodium citrate"},{"id":"neet_064_opt_2","label":"B","text":"aqueous copper sulphate"},{"id":"neet_064_opt_3","label":"C","text":"alkaline copper sulphate"},{"id":"neet_064_opt_4","label":"D","text":"alkaline solution of sodium potassium tartrate (Rochelle''s salt)"}]'::jsonb, 'neet_064_opt_2', 'Fehling''s reagent comprises two solutions: Fehling''s solution A is an aqueous solution of copper(II) sulfate (CuSO4·5H2O), and Fehling''s solution B is an alkaline solution of sodium potassium tartrate (Rochelle salt) with NaOH.', 'NEET_UG', 'MCQ', 'Chemistry', 'Aldehydes, Ketones and Carboxylic Acids - Qualitative Analysis', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'fehlings-solution-a-copper-sulphate', 'NEET UG 2024 Official Question Paper (Code S6), Question 64', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_071', 'Which one of the following alcohols reacts instantaneously with Lucas reagent?', '[{"id":"neet_071_opt_1","label":"A","text":"(CH3)3C-OH"},{"id":"neet_071_opt_2","label":"B","text":"CH3-CH2-CH2-CH2OH"},{"id":"neet_071_opt_3","label":"C","text":"CH3-CH2-CH(OH)-CH3"},{"id":"neet_071_opt_4","label":"D","text":"(CH3)2CH-CH2OH"}]'::jsonb, 'neet_071_opt_1', 'Lucas reagent (conc. HCl + anhydrous ZnCl2) reacts via an SN1 pathway forming carbocation intermediates. Tertiary alcohols such as 2-methylpropan-2-ol ((CH3)3C-OH) form exceptionally stable tertiary carbocations and react instantaneously producing cloudiness/turbidity.', 'NEET_UG', 'MCQ', 'Chemistry', 'Alcohols, Phenols and Ethers - Lucas Test', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'lucas-reagent-tertiary-alcohol-turbidity', 'NEET UG 2024 Official Question Paper (Code S6), Question 71', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_074', 'On heating, some solid substances change from solid to vapour state without passing through liquid state. The technique used for the purification of such solid substances based on the above principle is known as
(1) Chromatography
(2) Crystallization
(3) Sublimation
(4) Distillation', '[{"id":"neet_074_opt_1","label":"A","text":"Chromatography"},{"id":"neet_074_opt_2","label":"B","text":"Crystallization"},{"id":"neet_074_opt_3","label":"C","text":"Sublimation"},{"id":"neet_074_opt_4","label":"D","text":"Distillation"}]'::jsonb, 'neet_074_opt_3', 'Sublimation is the direct phase transition from solid to gas without melting into liquid. It is utilized to purify volatile solid substances (e.g., camphor, naphthalene, ammonium chloride) from non-volatile impurities.', 'NEET_UG', 'MCQ', 'Chemistry', 'Purification of Organic Compounds - Sublimation', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'sublimation-purification-organic-solids', 'NEET UG 2024 Official Question Paper (Code S6), Question 74', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_077', 'Which one of the following compounds does not decolourize bromine water?', '[{"id":"neet_077_opt_1","label":"A","text":"Cyclohexane"},{"id":"neet_077_opt_2","label":"B","text":"Phenol"},{"id":"neet_077_opt_3","label":"C","text":"Styrene (C6H5-CH=CH2)"},{"id":"neet_077_opt_4","label":"D","text":"Aniline (C6H5-NH2)"}]'::jsonb, 'neet_077_opt_1', 'Cyclohexane is a fully saturated cycloalkane that does not react with aqueous bromine water at room temperature. Phenol and aniline undergo rapid electrophilic aromatic tribromination decolourizing bromine water with white precipitates, and styrene readily undergoes electrophilic addition across its aliphatic double bond.', 'NEET_UG', 'MCQ', 'Chemistry', 'Hydrocarbons & Aromatic Compounds - Bromine Water Test', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Understanding', 'ayurveda', 'bromine-water-test-saturation-alkane', 'NEET UG 2024 Official Question Paper (Code 45), Question 77', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_082', 'Sugar ''X'' has the following properties:
A. is found in honey.
B. is a keto sugar.
C. exists in α and β - anomeric forms.
D. is laevorotatory.
''X'' is :', '[{"id":"neet_082_opt_1","label":"A","text":"D-Glucose"},{"id":"neet_082_opt_2","label":"B","text":"D-Fructose"},{"id":"neet_082_opt_3","label":"C","text":"Maltose"},{"id":"neet_082_opt_4","label":"D","text":"Sucrose"}]'::jsonb, 'neet_082_opt_2', 'D-Fructose (also known as levulose) is an abundant ketohexose found in honey and sweet fruits. It is strongly laevorotatory ([α]D = -92.4°) and mutarotates between α and β furanose/pyranose anomers in solution.', 'NEET_UG', 'MCQ', 'Chemistry', 'Biomolecules - Carbohydrates', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'fructose-ketohexose-laevorotatory-honey', 'NEET UG 2024 Official Question Paper (Code 45), Question 82', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_091', 'The complex II of mitochondrial electron transport chain is also known as
(1) Cytochrome bc1
(2) Succinate dehydrogenase
(3) Cytochrome c oxidase
(4) NADH dehydrogenase', '[{"id":"neet_091_opt_1","label":"A","text":"Cytochrome bc1"},{"id":"neet_091_opt_2","label":"B","text":"Succinate dehydrogenase"},{"id":"neet_091_opt_3","label":"C","text":"Cytochrome c oxidase"},{"id":"neet_091_opt_4","label":"D","text":"NADH dehydrogenase"}]'::jsonb, 'neet_091_opt_2', 'In the mitochondrial inner membrane respiratory chain: Complex I is NADH:ubiquinone oxidoreductase (NADH dehydrogenase); Complex II is Succinate dehydrogenase / succinate-CoQ reductase; Complex III is Cytochrome bc1 complex; Complex IV is Cytochrome c oxidase.', 'NEET_UG', 'MCQ', 'Botany', 'Respiration in Plants - Electron Transport System', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'mitochondrial-electron-transport-chain-complex-ii', 'NEET UG 2024 Official Question Paper (Code 45), Question 91', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_092', 'Polymerase chain reaction (PCR) amplifies DNA following the equation.
(1) N²
(2) 2ⁿ
(3) 2n + 1
(4) 2N²', '[{"id":"neet_092_opt_1","label":"A","text":"N²"},{"id":"neet_092_opt_2","label":"B","text":"2ⁿ"},{"id":"neet_092_opt_3","label":"C","text":"2n + 1"},{"id":"neet_092_opt_4","label":"D","text":"2N²"}]'::jsonb, 'neet_092_opt_2', 'Each cycle of the polymerase chain reaction doubles the number of target DNA molecules geometrically according to exponential amplification: 2ⁿ, where n is the number of thermocycles completed.', 'NEET_UG', 'MCQ', 'Biology / Biotechnology', 'Biotechnology: Principles and Processes - PCR Amplification', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'pcr-exponential-amplification-formula', 'NEET UG 2024 Official Question Paper (Code 45), Question 92', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_095', 'Which one of the following statements refers to Reductionist Biology?
(1) Physico-chemical approach to study and understand living organisms.
(2) Physiological approach to study and understand living organisms.
(3) Chemical approach to study and understand living organisms.
(4) Behavioural approach to study and understand living organisms.', '[{"id":"neet_095_opt_1","label":"A","text":"Physico-chemical approach to study and understand living organisms."},{"id":"neet_095_opt_2","label":"B","text":"Physiological approach to study and understand living organisms."},{"id":"neet_095_opt_3","label":"C","text":"Chemical approach to study and understand living organisms."},{"id":"neet_095_opt_4","label":"D","text":"Behavioural approach to study and understand living organisms."}]'::jsonb, 'neet_095_opt_1', 'As stated in NCERT Biology Unit opening: ''The physico-chemical approach to study and understand living organisms is termed Reductionist Biology''.', 'NEET_UG', 'MCQ', 'Biology', 'Cell Structure and Functions - Epistemology of Biology', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'reductionist-biology-physicochemical-approach', 'NEET UG 2024 Official Question Paper (Code 45), Question 95', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_096', 'Given below are two statements :
Statement I : In the RNA world, RNA is considered the first genetic material evolved to carry out essential life processes. RNA acts as a genetic material and also as a catalyst for some important biochemical reactions in living systems. Being reactive, RNA is unstable.
Statement II : DNA evolved from RNA and is a more stable genetic material. Its double helical strands being complementary, resist changes by evolving repairing mechanism.
In the light of the above statements, choose the most appropriate answer from the options given below :', '[{"id":"neet_096_opt_1","label":"A","text":"Both statement I and statement II are correct"},{"id":"neet_096_opt_2","label":"B","text":"Both statement I and statement II are incorrect"},{"id":"neet_096_opt_3","label":"C","text":"Statement I is correct but statement II is incorrect"},{"id":"neet_096_opt_4","label":"D","text":"Statement I is incorrect but statement II is correct"}]'::jsonb, 'neet_096_opt_1', 'Both statements are correct. In the RNA world hypothesis, RNA was the primordial genetic and catalytic polymer (ribozyme) but reactive and unstable. DNA evolved chemically from RNA by addition of 2''-deoxyribose and thymine, adopting complementary double-strandedness with repair systems.', 'NEET_UG', 'MCQ', 'Biology', 'Molecular Basis of Inheritance - RNA World', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Understanding', 'ayurveda', 'rna-world-hypothesis-dna-evolution', 'NEET UG 2024 Official Question Paper (Code 45), Question 96', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_097', 'Epiphytes that are growing on a mango branch is an example of which of the following?
(1) Commensalism
(2) Mutualism
(3) Predation
(4) Amensalism', '[{"id":"neet_097_opt_1","label":"A","text":"Commensalism"},{"id":"neet_097_opt_2","label":"B","text":"Mutualism"},{"id":"neet_097_opt_3","label":"C","text":"Predation"},{"id":"neet_097_opt_4","label":"D","text":"Amensalism"}]'::jsonb, 'neet_097_opt_1', 'An epiphyte orchid growing on a branch of a mango tree derives physical support without extracting water or nutrients from the host (+/0 interaction), which is a classic example of Commensalism.', 'NEET_UG', 'MCQ', 'Botany / Ecology', 'Organisms and Populations - Population Interactions', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'population-interaction-commensalism-epiphyte', 'NEET UG 2024 Official Question Paper (Code 45), Question 97', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_099', 'Which one of the following is an example of ex-situ conservation?
(1) National Park
(2) Wildlife Sanctuary
(3) Zoos and botanical gardens
(4) Protected areas', '[{"id":"neet_099_opt_1","label":"A","text":"National Park"},{"id":"neet_099_opt_2","label":"B","text":"Wildlife Sanctuary"},{"id":"neet_099_opt_3","label":"C","text":"Zoos and botanical gardens"},{"id":"neet_099_opt_4","label":"D","text":"Protected areas"}]'::jsonb, 'neet_099_opt_3', 'Ex-situ conservation involves the preservation of threatened biological components outside their natural habitats. Zoological parks, botanical gardens, and seed/gene banks are standard examples of ex-situ conservation. National parks and wildlife sanctuaries are in-situ conservation.', 'NEET_UG', 'MCQ', 'Botany / Ecology', 'Biodiversity and Conservation - In-situ vs Ex-situ', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'ex-situ-conservation-zoos-botanical-gardens', 'NEET UG 2024 Official Question Paper (Code 45), Question 99', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_100', 'Given below are two statements :
Statement I : The primary source of energy in an ecosystem is solar energy.
Statement II : The rate of production of organic matter during photosynthesis in an ecosystem is called net primary productivity (NPP).
In the light of the above statements, choose the most appropriate answer from the options given below :', '[{"id":"neet_100_opt_1","label":"A","text":"Both statement I and statement II are correct"},{"id":"neet_100_opt_2","label":"B","text":"Both statement I and statement II are incorrect"},{"id":"neet_100_opt_3","label":"C","text":"Statement I is correct but statement II is incorrect"},{"id":"neet_100_opt_4","label":"D","text":"Statement I is incorrect but statement II is correct"}]'::jsonb, 'neet_100_opt_3', 'Statement I is correct because sunlight is the ultimate energy source for almost all ecosystems. Statement II is incorrect because the total rate of production of organic matter during photosynthesis is Gross Primary Productivity (GPP), whereas Net Primary Productivity (NPP) is GPP minus respiratory losses (NPP = GPP - R).', 'NEET_UG', 'MCQ', 'Botany / Ecology', 'Ecosystem - Primary Productivity', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Medium', 'Understanding', 'ayurveda', 'ecosystem-productivity-gpp-npp', 'NEET UG 2024 Official Question Paper (Code 45), Question 100', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_101', 'The cofactor of the enzyme carboxypeptidase is:
(1) Haem
(2) Zinc
(3) Niacin
(4) Flavin', '[{"id":"neet_101_opt_1","label":"A","text":"Haem"},{"id":"neet_101_opt_2","label":"B","text":"Zinc"},{"id":"neet_101_opt_3","label":"C","text":"Niacin"},{"id":"neet_101_opt_4","label":"D","text":"Flavin"}]'::jsonb, 'neet_101_opt_2', 'Zinc (Zn²⁺) is an essential catalytic metal ion cofactor for the proteolytic enzyme carboxypeptidase as well as carbonic anhydrase.', 'NEET_UG', 'MCQ', 'Botany / Biomolecules', 'Enzyme Cofactors - Metalloenzymes', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'enzyme-cofactor-carboxypeptidase-zinc', 'NEET UG 2024 Official Question Paper (Code S6), Question 101', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_103', 'Spindle fibers attach to kinetochores of chromosomes during
(1) Telophase
(2) Prophase
(3) Metaphase
(4) Anaphase', '[{"id":"neet_103_opt_1","label":"A","text":"Telophase"},{"id":"neet_103_opt_2","label":"B","text":"Prophase"},{"id":"neet_103_opt_3","label":"C","text":"Metaphase"},{"id":"neet_103_opt_4","label":"D","text":"Anaphase"}]'::jsonb, 'neet_103_opt_3', 'During Metaphase of mitosis, spindle fibers attach to the kinetochores of sister chromatids and align all chromosomes at the equatorial metaphase plate.', 'NEET_UG', 'MCQ', 'Botany', 'Cell Cycle and Cell Division - Metaphase', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'cell-division-spindle-fiber-kinetochore-metaphase', 'NEET UG 2024 Official Question Paper (Code S6), Question 103', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_105', 'Streptokinase produced by bacterium Streptococcus is used for
(1) Curd production
(2) Ethanol production
(3) Liver disease treatment
(4) Removing clots from blood vessels', '[{"id":"neet_105_opt_1","label":"A","text":"Curd production"},{"id":"neet_105_opt_2","label":"B","text":"Ethanol production"},{"id":"neet_105_opt_3","label":"C","text":"Liver disease treatment"},{"id":"neet_105_opt_4","label":"D","text":"Removing clots from blood vessels"}]'::jsonb, 'neet_105_opt_4', 'Streptokinase is a thrombolytic ''clot buster'' enzyme harvested from modified Streptococcus bacteria and administered clinically to dissolve intravascular blood clots in acute myocardial infarction.', 'NEET_UG', 'MCQ', 'Botany / Microbes in Human Welfare', 'Microbial Enzymes and Bioactive Molecules', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'streptokinase-clot-buster-thrombolytic', 'NEET UG 2024 Official Question Paper (Code 45), Question 105', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_106', 'Which chromosome in the human genome has the highest number of genes?
(1) Chromosome X
(2) Chromosome Y
(3) Chromosome 1
(4) Chromosome 10', '[{"id":"neet_106_opt_1","label":"A","text":"Chromosome X"},{"id":"neet_106_opt_2","label":"B","text":"Chromosome Y"},{"id":"neet_106_opt_3","label":"C","text":"Chromosome 1"},{"id":"neet_106_opt_4","label":"D","text":"Chromosome 10"}]'::jsonb, 'neet_106_opt_3', 'According to the Human Genome Project, Chromosome 1 is the largest human chromosome and possesses the highest number of annotated genes (2968 genes), while the Y chromosome has the fewest (231 genes).', 'NEET_UG', 'MCQ', 'Zoology / Genetics', 'Human Genome Project - Chromosome Gene Counts', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'human-genome-chromosome-one-highest-genes', 'NEET UG 2024 Official Question Paper (Code 45), Question 106', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_108', 'Which one of the following phytohormones promotes nutrient mobilization which helps in the delay of leaf senescence in plants?
(1) Ethylene
(2) Abscisic acid
(3) Gibberellin
(4) Cytokinin', '[{"id":"neet_108_opt_1","label":"A","text":"Ethylene"},{"id":"neet_108_opt_2","label":"B","text":"Abscisic acid"},{"id":"neet_108_opt_3","label":"C","text":"Gibberellin"},{"id":"neet_108_opt_4","label":"D","text":"Cytokinin"}]'::jsonb, 'neet_108_opt_4', 'Cytokinins help delay plant senescence (Richmond-Lang effect) primarily by mobilizing essential nutrients and amino acids to younger tissues and maintaining chlorophyll synthesis.', 'NEET_UG', 'MCQ', 'Botany', 'Plant Growth Regulators - Cytokinin Function', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'cytokinin-nutrient-mobilization-delay-senescence', 'NEET UG 2024 Official Question Paper (Code 45), Question 108', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_116', 'Which of the following genetically engineered organisms was used by Eli Lilly to prepare human insulin?
(1) Bacterium
(2) Yeast
(3) Virus
(4) Phage', '[{"id":"neet_108_opt_1","label":"A","text":"Bacterium"},{"id":"neet_108_opt_2","label":"B","text":"Yeast"},{"id":"neet_108_opt_3","label":"C","text":"Virus"},{"id":"neet_108_opt_4","label":"D","text":"Phage"}]'::jsonb, 'neet_108_opt_1', 'In 1983, American company Eli Lilly synthesized recombinant human insulin (Humulin) by introducing distinct DNA sequences encoding chains A and B into plasmids of the bacterium Escherichia coli.', 'NEET_UG', 'MCQ', 'Zoology / Biotechnology', 'Biotechnology Applications in Medicine - Humulin', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'recombinant-human-insulin-eli-lilly-bacterium-e-coli', 'NEET UG 2024 Official Question Paper (Code 45), Question 116', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_124', 'In the seeds of cereals, the outer covering of endosperm separates the embryo by a protein-rich layer called :
(1) Coleoptile
(2) Coleorhiza
(3) Integument
(4) Aleurone layer', '[{"id":"neet_124_opt_1","label":"A","text":"Coleoptile"},{"id":"neet_124_opt_2","label":"B","text":"Coleorhiza"},{"id":"neet_124_opt_3","label":"C","text":"Integument"},{"id":"neet_124_opt_4","label":"D","text":"Aleurone layer"}]'::jsonb, 'neet_124_opt_4', 'In monocotyledonous cereal grains (such as maize and wheat), the proteinaceous outermost boundary layer separating the starchy triploid endosperm from the diploid embryo is termed the aleurone layer.', 'NEET_UG', 'MCQ', 'Botany', 'Morphology of Flowering Plants - Seed Structure', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'monocot-seed-aleurone-layer-protein', 'NEET UG 2024 Official Question Paper (Code 45), Question 124', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_128', 'A specialised membranous structure in a prokaryotic cell which helps in cell wall formation, DNA replication and respiration is :
(1) Mesosome
(2) Chromatophores
(3) Cristae
(4) Endoplasmic Reticulum', '[{"id":"neet_128_opt_1","label":"A","text":"Mesosome"},{"id":"neet_128_opt_2","label":"B","text":"Chromatophores"},{"id":"neet_128_opt_3","label":"C","text":"Cristae"},{"id":"neet_128_opt_4","label":"D","text":"Endoplasmic Reticulum"}]'::jsonb, 'neet_128_opt_1', 'Mesosomes are polymorphic invaginations of the plasma membrane in bacteria that contain respiratory enzymes, assist in cellular respiration, cell wall synthesis, and chromosome replication and partitioning.', 'NEET_UG', 'MCQ', 'Botany', 'Cell: The Unit of Life - Prokaryotic Cell Structures', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'prokaryotic-mesosome-function', 'NEET UG 2024 Official Question Paper (Code 45), Question 128', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_130', 'What is the pattern of inheritance for polygenic trait?
(1) Mendelian inheritance pattern
(2) Non-mendelian inheritance pattern
(3) Autosomal dominant pattern
(4) X-linked recessive inheritance pattern', '[{"id":"neet_130_opt_1","label":"A","text":"Mendelian inheritance pattern"},{"id":"neet_130_opt_2","label":"B","text":"Non-mendelian inheritance pattern"},{"id":"neet_130_opt_3","label":"C","text":"Autosomal dominant pattern"},{"id":"neet_130_opt_4","label":"D","text":"X-linked recessive inheritance pattern"}]'::jsonb, 'neet_130_opt_2', 'Polygenic inheritance (controlled by three or more genes showing continuous phenotypic variation like human skin colour or height) deviates from classical Mendelian single-gene discrete ratios, following Non-Mendelian quantitative genetics.', 'NEET_UG', 'MCQ', 'Botany / Genetics', 'Principles of Inheritance and Variation - Polygenic Inheritance', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'polygenic-inheritance-non-mendelian-pattern', 'NEET UG 2024 Official Question Paper (Code 45), Question 130', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_131', 'Which one of the following enzymes contains ''Haem'' as the prosthetic group?
(1) RuBisCO
(2) Carbonic anhydrase
(3) Succinate dehydrogenase
(4) Catalase', '[{"id":"neet_131_opt_1","label":"A","text":"RuBisCO"},{"id":"neet_131_opt_2","label":"B","text":"Carbonic anhydrase"},{"id":"neet_131_opt_3","label":"C","text":"Succinate dehydrogenase"},{"id":"neet_131_opt_4","label":"D","text":"Catalase"}]'::jsonb, 'neet_131_opt_4', 'Catalase and peroxidase enzymes catalyze the breakdown of toxic hydrogen peroxide to water and oxygen and possess an iron-porphyrin ''Haem'' molecule as their tightly bound prosthetic group.', 'NEET_UG', 'MCQ', 'Botany / Biomolecules', 'Enzymes - Prosthetic Groups', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'catalase-enzyme-haem-prosthetic-group', 'NEET UG 2024 Official Question Paper (Code 45), Question 131', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_133', 'Who is known as the Father of Ecology in India?
(1) S. R. Kashyap
(2) Ramdeo Misra
(3) Ram Udar
(4) Birbal Sahni', '[{"id":"neet_133_opt_1","label":"A","text":"S. R. Kashyap"},{"id":"neet_133_opt_2","label":"B","text":"Ramdeo Misra"},{"id":"neet_133_opt_3","label":"C","text":"Ram Udar"},{"id":"neet_133_opt_4","label":"D","text":"Birbal Sahni"}]'::jsonb, 'neet_133_opt_2', 'Professor Ramdeo Misra is revered as the Father of Ecology in India for his pioneering research on tropical forest and grassland ecosystems and establishing ecological studies at Banaras Hindu University (BHU).', 'NEET_UG', 'MCQ', 'Botany / Ecology', 'History of Indian Ecological Research', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'father-of-ecology-india-ramdeo-misra', 'NEET UG 2024 Official Question Paper (Code 45), Question 133', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_136', 'Match List I with List II :
List I (Types of Stamens): (A) Monoadelphous, (B) Diadelphous, (C) Polyadelphous, (D) Epiphyllous
List II (Example): (I) Citrus, (II) Pea, (III) Lily, (IV) China-rose
Choose the correct answer from the options given below:
(1) A-III, B-I, C-IV, D-II
(2) A-IV, B-II, C-I, D-III
(3) A-IV, B-I, C-II, D-III
(4) A-I, B-II, C-IV, D-III', '[{"id":"neet_136_opt_1","label":"A","text":"A-III, B-I, C-IV, D-II"},{"id":"neet_136_opt_2","label":"B","text":"A-IV, B-II, C-I, D-III"},{"id":"neet_136_opt_3","label":"C","text":"A-IV, B-I, C-II, D-III"},{"id":"neet_136_opt_4","label":"D","text":"A-I, B-II, C-IV, D-III"}]'::jsonb, 'neet_136_opt_2', 'Morphological cohesion and adhesion of stamens: Monoadelphous stamens are united in one bundle in China rose (Hibiscus) (IV); Diadelphous stamens in two bundles in Pea (Pisum) (II); Polyadelphous stamens in more than two bundles in Citrus (I); Epiphyllous stamens attached to perianth in Lily (III).', 'NEET_UG', 'MCQ', 'Botany', 'Morphology of Flowering Plants - Androecium Cohesion', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'stamen-cohesion-monadelphous-diadelphous-matching', 'NEET UG 2024 Official Question Paper (Code S6), Question 136', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_137', 'The DNA present in chloroplast is:
(1) Circular, single stranded
(2) Linear, double stranded
(3) Circular, double stranded
(4) Linear, single stranded', '[{"id":"neet_137_opt_1","label":"A","text":"Circular, single stranded"},{"id":"neet_137_opt_2","label":"B","text":"Linear, double stranded"},{"id":"neet_137_opt_3","label":"C","text":"Circular, double stranded"},{"id":"neet_137_opt_4","label":"D","text":"Linear, single stranded"}]'::jsonb, 'neet_137_opt_3', 'Chloroplast DNA (cpDNA), similar to mitochondrial DNA and prokaryotic genomes, consists of closed, circular, double-stranded DNA molecules.', 'NEET_UG', 'MCQ', 'Botany', 'Cell: The Unit of Life - Chloroplast Genome', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'chloroplast-dna-circular-double-stranded', 'NEET UG 2024 Official Question Paper (Code S6), Question 137', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_139', 'All living members of the class Cyclostomata are:
(1) Free living
(2) Endoparasite
(3) Symbiotic
(4) Ectoparasite', '[{"id":"neet_139_opt_1","label":"A","text":"Free living"},{"id":"neet_139_opt_2","label":"B","text":"Endoparasite"},{"id":"neet_139_opt_3","label":"C","text":"Symbiotic"},{"id":"neet_139_opt_4","label":"D","text":"Ectoparasite"}]'::jsonb, 'neet_139_opt_4', 'According to NCERT Animal Kingdom: ''All living members of the class Cyclostomata are ectoparasites on some fishes'' (e.g. Petromyzon / lamprey and Myxine / hagfish).', 'NEET_UG', 'MCQ', 'Zoology', 'Animal Kingdom - Class Cyclostomata', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'cyclostomata-ectoparasites-on-fishes', 'NEET UG 2024 Official Question Paper (Code 45), Question 139', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_140', 'Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).
Assertion (A) : The primary function of the Golgi apparatus is to package the materials made by the endoplasmic reticulum and deliver it to intracellular targets and outside the cell.
Reason (R) : Vesicles containing materials made by the endoplasmic reticulum fuse with the cis face of the Golgi apparatus, and they are modified and released from the trans face of the Golgi apparatus.
In the light of the above statements, choose the correct answer from the options given below :
(1) Both A and R are true and R is the correct explanation of A
(2) Both A and R are true but R is NOT the correct explanation of A
(3) A is true but R is false
(4) A is false but R is true', '[{"id":"neet_140_opt_1","label":"A","text":"Both A and R are true and R is the correct explanation of A"},{"id":"neet_140_opt_2","label":"B","text":"Both A and R are true but R is NOT the correct explanation of A"},{"id":"neet_140_opt_3","label":"C","text":"A is true but R is false"},{"id":"neet_140_opt_4","label":"D","text":"A is false but R is true"}]'::jsonb, 'neet_140_opt_1', 'Both statements are true and Reason accurately explains Assertion. Transport vesicles budding from ER fuse at the convex cis (forming) face of Golgi, traverse cisternae for post-translational modification and sorting, and exit as secretory vesicles from the concave trans (maturing) face.', 'NEET_UG', 'MCQ', 'Botany', 'Cell: The Unit of Life - Endomembrane System (Golgi)', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'golgi-apparatus-vesicle-trafficking-cis-trans', 'NEET UG 2024 Official Question Paper (Code 45), Question 140', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_144', 'Silencing of specific mRNA is possible via RNAi because of –
(1) Complementary dsRNA
(2) Inhibitory ssRNA
(3) Complementary tRNA
(4) Non-complementary ssRNA', '[{"id":"neet_144_opt_1","label":"A","text":"Complementary dsRNA"},{"id":"neet_144_opt_2","label":"B","text":"Inhibitory ssRNA"},{"id":"neet_144_opt_3","label":"C","text":"Complementary tRNA"},{"id":"neet_144_opt_4","label":"D","text":"Non-complementary ssRNA"}]'::jsonb, 'neet_144_opt_1', 'RNA interference (RNAi) operates in all eukaryotic organisms as a cellular defense mechanism. It involves post-transcriptional gene silencing initiated by complementary double-stranded RNA (dsRNA) which binds to and triggers cleavage of target mRNA by the RISC complex.', 'NEET_UG', 'MCQ', 'Biology / Biotechnology', 'Biotechnology and Its Applications - RNA Interference', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'rnai-mrna-silencing-complementary-dsrna', 'NEET UG 2024 Official Question Paper (Code 45), Question 144', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_146', 'Histones are enriched with –
(1) Lysine & Arginine
(2) Leucine & Lysine
(3) Phenylalanine & Leucine
(4) Phenylalanine & Arginine', '[{"id":"neet_146_opt_1","label":"A","text":"Lysine & Arginine"},{"id":"neet_146_opt_2","label":"B","text":"Leucine & Lysine"},{"id":"neet_146_opt_3","label":"C","text":"Phenylalanine & Leucine"},{"id":"neet_146_opt_4","label":"D","text":"Phenylalanine & Arginine"}]'::jsonb, 'neet_146_opt_1', 'Histones are basic nuclear proteins that package DNA into nucleosomes. They are rich in basic amino acid residues with positively charged side chains, specifically Lysine and Arginine, which interact electrostatically with the negatively charged sugar-phosphate backbone of DNA.', 'NEET_UG', 'MCQ', 'Biology', 'Molecular Basis of Inheritance - Nucleosome Packaging', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'histone-proteins-lysine-arginine-basic-charge', 'NEET UG 2024 Official Question Paper (Code 45), Question 146', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_147', 'The first menstruation is called :
(1) Menopause
(2) Menarche
(3) Diapause
(4) Ovulation', '[{"id":"neet_147_opt_1","label":"A","text":"Menopause"},{"id":"neet_147_opt_2","label":"B","text":"Menarche"},{"id":"neet_147_opt_3","label":"C","text":"Diapause"},{"id":"neet_147_opt_4","label":"D","text":"Ovulation"}]'::jsonb, 'neet_147_opt_2', 'The onset of the first menstrual cycle occurring at puberty in human females is termed Menarche. Menopause denotes the permanent cessation of menstrual cycles around age 45–50.', 'NEET_UG', 'MCQ', 'Zoology', 'Human Reproduction - Menstrual Cycle Terminology', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'menarche-first-menstruation-puberty', 'NEET UG 2024 Official Question Paper (Code 45), Question 147', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_149', 'The protein portion of an enzyme is called :
(1) Cofactor
(2) Coenzyme
(3) Apoenzyme
(4) Prosthetic group', '[{"id":"neet_149_opt_1","label":"A","text":"Cofactor"},{"id":"neet_149_opt_2","label":"B","text":"Coenzyme"},{"id":"neet_149_opt_3","label":"C","text":"Apoenzyme"},{"id":"neet_149_opt_4","label":"D","text":"Prosthetic group"}]'::jsonb, 'neet_149_opt_3', 'A conjugated holoenzyme consists of a protein portion termed the Apoenzyme and a non-protein component called a cofactor (coenzyme, prosthetic group, or metal ion).', 'NEET_UG', 'MCQ', 'Botany / Biomolecules', 'Biomolecules - Enzyme Structure', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'apoenzyme-protein-portion-holoenzyme', 'NEET UG 2024 Official Question Paper (Code 45), Question 149', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_151', 'The flippers of the Penguins and Dolphins are the example of the
(1) Divergent evolution
(2) Adaptive radiation
(3) Natural selection
(4) Convergent evolution', '[{"id":"neet_151_opt_1","label":"A","text":"Divergent evolution"},{"id":"neet_151_opt_2","label":"B","text":"Adaptive radiation"},{"id":"neet_151_opt_3","label":"C","text":"Natural selection"},{"id":"neet_151_opt_4","label":"D","text":"Convergent evolution"}]'::jsonb, 'neet_151_opt_4', 'The flippers of penguins (birds) and dolphins (mammals) are analogous structures with different anatomical origins and evolutionary descent that evolved similar hydrodynamics for aquatic locomotion, demonstrating convergent evolution.', 'NEET_UG', 'MCQ', 'Zoology', 'Evolution - Convergent vs Divergent Evolution', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'convergent-evolution-analogous-flippers-penguin-dolphin', 'NEET UG 2024 Official Question Paper (Code S6), Question 151', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_153', 'Which of the following is not a component of Fallopian tube?
(1) Ampulla
(2) Uterine fundus
(3) Isthmus
(4) Infundibulum', '[{"id":"neet_153_opt_1","label":"A","text":"Ampulla"},{"id":"neet_153_opt_2","label":"B","text":"Uterine fundus"},{"id":"neet_153_opt_3","label":"C","text":"Isthmus"},{"id":"neet_153_opt_4","label":"D","text":"Infundibulum"}]'::jsonb, 'neet_153_opt_2', 'The Fallopian tube (oviduct) consists of three principal parts: the funnel-shaped infundibulum with fimbriae, the wider ampulla, and the narrow terminal isthmus. The uterine fundus is the dome-shaped superior portion of the uterus itself, not a component of the oviduct.', 'NEET_UG', 'MCQ', 'Zoology', 'Human Reproduction - Female Reproductive Anatomy', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'fallopian-tube-anatomy-uterine-fundus-exclusion', 'NEET UG 2024 Official Question Paper (Code S6), Question 153', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_155', 'Given below are two statements :
Statement I : The presence or absence of hymen is not a reliable indicator of virginity.
Statement II : The hymen is torn during the first coitus only.
In the light of the above statements, choose the correct answer from the options given below :
(1) Statement I is false but Statement II is true
(2) Both Statement I and Statement II are true
(3) Both Statement I and Statement II are false
(4) Statement I is true but Statement II is false', '[{"id":"neet_155_opt_1","label":"A","text":"Statement I is false but Statement II is true"},{"id":"neet_155_opt_2","label":"B","text":"Both Statement I and Statement II are true"},{"id":"neet_155_opt_3","label":"C","text":"Both Statement I and Statement II are false"},{"id":"neet_155_opt_4","label":"D","text":"Statement I is true but Statement II is false"}]'::jsonb, 'neet_155_opt_4', 'Statement I is true and Statement II is false. The hymen can be stretched or torn by sudden falls, horse-riding, bicycling, insertion of tampons, or vigorous physical exercise; moreover in some women it persists even after coitus. Hence its presence or absence is not a reliable indicator of virginity.', 'NEET_UG', 'MCQ', 'Zoology', 'Human Reproduction - Forensic and Anatomical Facts', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'hymen-anatomy-reliability-virginity', 'NEET UG 2024 Official Question Paper (Code S6), Question 155', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_167', 'Which of the following type of immunity is present at the time of birth and is a non-specific type of defence in the human body?
(1) Acquired Immunity
(2) Innate Immunity
(3) Cell-mediated Immunity
(4) Humoral Immunity', '[{"id":"neet_167_opt_1","label":"A","text":"Acquired Immunity"},{"id":"neet_167_opt_2","label":"B","text":"Innate Immunity"},{"id":"neet_167_opt_3","label":"C","text":"Cell-mediated Immunity"},{"id":"neet_167_opt_4","label":"D","text":"Humoral Immunity"}]'::jsonb, 'neet_167_opt_2', 'Innate immunity is inborn (present at birth) and provides non-specific baseline barriers (physical, physiological, cellular, and cytokine barriers) against foreign pathogen invasion. Acquired/adaptive immunity develops upon antigen exposure.', 'NEET_UG', 'MCQ', 'Zoology', 'Human Health and Disease - Types of Immunity', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'innate-immunity-inborn-nonspecific-defence', 'NEET UG 2024 Official Question Paper (Code 45), Question 167', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_168', 'Which of the following is not a steroid hormone?
(1) Glucagon
(2) Cortisol
(3) Testosterone
(4) Progesterone', '[{"id":"neet_168_opt_1","label":"A","text":"Glucagon"},{"id":"neet_168_opt_2","label":"B","text":"Cortisol"},{"id":"neet_168_opt_3","label":"C","text":"Testosterone"},{"id":"neet_168_opt_4","label":"D","text":"Progesterone"}]'::jsonb, 'neet_168_opt_1', 'Glucagon is a 29-amino-acid peptide hormone secreted by pancreatic alpha cells. Cortisol, testosterone, and progesterone are cholesterol-derived steroid hormones.', 'NEET_UG', 'MCQ', 'Zoology', 'Chemical Coordination and Integration - Hormone Classes', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'peptide-vs-steroid-hormone-glucagon', 'NEET UG 2024 Official Question Paper (Code S6), Question 168', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_174', 'Which factor is important for termination of transcription?
(1) α (alpha)
(2) σ (sigma)
(3) ρ (rho)
(4) γ (gamma)', '[{"id":"neet_174_opt_1","label":"A","text":"α (alpha)"},{"id":"neet_174_opt_2","label":"B","text":"σ (sigma)"},{"id":"neet_174_opt_3","label":"C","text":"ρ (rho)"},{"id":"neet_174_opt_4","label":"D","text":"γ (gamma)"}]'::jsonb, 'neet_174_opt_3', 'In prokaryotic transcription by RNA polymerase, initiation requires the sigma factor (σ), whereas termination of transcription requires the termination factor Rho (ρ).', 'NEET_UG', 'MCQ', 'Biology', 'Molecular Basis of Inheritance - Transcription Factors', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'transcription-termination-rho-factor', 'NEET UG 2024 Official Question Paper (Code 45), Question 174', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_176', 'Twins are born to a family that lives next door to you. The twins are a boy and a girl. Which of the following must be true?
(1) They are monozygotic twins.
(2) They are fraternal twins.
(3) They were conceived through in vitro fertilization.
(4) They have 75% identical genetic content.', '[{"id":"neet_176_opt_1","label":"A","text":"They are monozygotic twins."},{"id":"neet_176_opt_2","label":"B","text":"They are fraternal twins."},{"id":"neet_176_opt_3","label":"C","text":"They were conceived through in vitro fertilization."},{"id":"neet_176_opt_4","label":"D","text":"They have 75% identical genetic content."}]'::jsonb, 'neet_176_opt_2', 'Monozygotic (identical) twins arise from cleavage of a single fertilized ovum and are necessarily of the same sex (both males or both females). Opposite-sex twins (boy and girl) must be dizygotic or fraternal twins arising from two separately fertilized ova.', 'NEET_UG', 'MCQ', 'Zoology', 'Human Reproduction & Genetics - Types of Twins', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'fraternal-dizygotic-twins-opposite-sex', 'NEET UG 2024 Official Question Paper (Code 45), Question 176', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_178', 'Which of the following factors are favourable for the formation of oxyhaemoglobin in alveoli?
(1) Low pCO2 and High temperature
(2) High pO2 and High pCO2
(3) High pO2 and Lesser H+ concentration
(4) Low pCO2 and High H+ concentration', '[{"id":"neet_178_opt_1","label":"A","text":"Low pCO2 and High temperature"},{"id":"neet_178_opt_2","label":"B","text":"High pO2 and High pCO2"},{"id":"neet_178_opt_3","label":"C","text":"High pO2 and Lesser H+ concentration"},{"id":"neet_178_opt_4","label":"D","text":"Low pCO2 and High H+ concentration"}]'::jsonb, 'neet_178_opt_3', 'In pulmonary alveoli, factors favouring the association of oxygen with hemoglobin to form oxyhemoglobin include: high pO2, low pCO2, lesser H+ ion concentration (higher pH), and lower temperature.', 'NEET_UG', 'MCQ', 'Zoology', 'Breathing and Exchange of Gases - Oxyhaemoglobin Dissociation Curve', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Understanding', 'ayurveda', 'oxyhaemoglobin-formation-alveolar-factors', 'NEET UG 2024 Official Question Paper (Code S6), Question 178', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('NEET_UG_2024_179', 'In both sexes of cockroach, a pair of jointed filamentous structures called anal cerci are present on :
(1) 11th segment
(2) 5th segment
(3) 10th segment
(4) 8th and 9th segment', '[{"id":"neet_179_opt_1","label":"A","text":"11th segment"},{"id":"neet_179_opt_2","label":"B","text":"5th segment"},{"id":"neet_179_opt_3","label":"C","text":"10th segment"},{"id":"neet_179_opt_4","label":"D","text":"8th and 9th segment"}]'::jsonb, 'neet_179_opt_3', 'In Periplaneta americana (cockroach), a pair of jointed filamentous sensory structures called anal cerci arise from the 10th abdominal segment in both males and females. (In contrast, unjointed anal styles occur on the 9th sternite of males only).', 'NEET_UG', 'MCQ', 'Zoology', 'Structural Organisation in Animals - Cockroach Morphology', ARRAY['ayush-scientific-validation']::text[], 'Scientific Validation', 'Easy', 'Knowledge', 'ayurveda', 'cockroach-anal-cerci-tenth-segment', 'NEET UG 2024 Official Question Paper (Code S6), Question 179', 2024, TRUE, '2026-09-12T17:03:04.384Z'::timestamptz, '2026-09-12T17:03:04.384Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('AIAPGET_2025_4038', '''नित्यं मन्दज्वरो रूक्षः शूनकस्तेन सीदति'' is related to which of the following type of fever?', '[{"id":"4038_opt_1","label":"A","text":"Vaatabalasaka Jwara"},{"id":"4038_opt_2","label":"B","text":"Sannipataja Jwara"},{"id":"4038_opt_3","label":"C","text":"Pralepaka Jwara"},{"id":"4038_opt_4","label":"D","text":"Vishama Jwara"}]'::jsonb, '4038_opt_1', 'In Charaka Samhita Chikitsasthana 3/110, Vaatabalasaka Jwara (a Kapha-Vata dominant persistent low-grade fever) is defined by the classic line: ''नित्यं मन्दज्वरो रूक्षः शूनकस्तेन सीदति''.', 'AIAPGET_PG', 'MCQ', 'Kayachikitsa & Roga Nidana', 'Jwara Nidana & Bheda', ARRAY['ayush-diagnosis']::text[], 'Diagnostics', 'Hard', 'Knowledge', 'ayurveda', 'vatabalasaka-jwara-lakshana-charaka', 'NSEIT AIAPGET 2025 Ayurveda QP, Client Question ID 4038', 2025, TRUE, '2026-09-12T17:04:41.397Z'::timestamptz, '2026-09-12T17:04:41.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('PRACTICAL_AYUSH_5001', 'A 45-year-old male with chronic osteoarthritis presents to the OPD taking tablet Diclofenac (NSAID) daily. He requests classical Guggulu formulations (Yograj Guggulu) and Shallaki. When evaluating drug interactions, what is the primary clinical safety priority?', '[{"id":"5001_opt_1","label":"A","text":"Advise immediate cessation of NSAID without consulting the treating physician."},{"id":"5001_opt_2","label":"B","text":"Assess for additive gastrointestinal ulceration/bleeding risk and coordinate phased titration with treating physician."},{"id":"5001_opt_3","label":"C","text":"Inform the patient that Ayurvedic medicines never have adverse reactions with synthetic pharmaceuticals."},{"id":"5001_opt_4","label":"D","text":"Prescribe higher dosages of Guggulu to overcome synthetic drug resistance."}]'::jsonb, '5001_opt_2', 'Guggulu and Shallaki possess potent anti-inflammatory properties that can synergize with NSAIDs to elevate gastrointestinal mucosal irritation and bleeding risks. Phased titration and clinical coordination are standard pharmacovigilance practices.', 'PRACTICAL_SCENARIO', 'MCQ', 'Kayachikitsa & Pharmacology', 'Herb-Drug Interaction & Safety', ARRAY['herb-drug-interaction', 'ayush-pharmacovigilance']::text[], 'Herb-Drug Interaction Awareness', 'Medium', 'Application', 'ayurveda', 'herb-drug-nsaid-guggulu-interaction', 'Pharmacovigilance Program for AYUSH Drugs (PvPI) Clinical Safety Manual', 2024, TRUE, '2026-09-12T17:48:48.083Z'::timestamptz, '2026-09-12T17:48:48.128Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('PRACTICAL_AYUSH_5002', 'During a Shirodhara procedure in the Panchakarma theatre, a 32-year-old patient suddenly complains of severe dizziness, cold clammy extremities, and blood pressure drops to 85/55 mmHg. What is the immediate first-line clinical escalation step?', '[{"id":"5002_opt_1","label":"A","text":"Continue the procedure at a higher temperature to stimulate peripheral circulation."},{"id":"5002_opt_2","label":"B","text":"Immediately halt the procedure, wipe the head, position the patient supine with feet elevated, check vitals, and summon emergency resuscitation support."},{"id":"5002_opt_3","label":"C","text":"Administer oral decoction (Kashaya) immediately while keeping the patient seated."},{"id":"5002_opt_4","label":"D","text":"Instruct the patient to perform Bhastrika Pranayama to normalize hemodynamics."}]'::jsonb, '5002_opt_2', 'Sudden hypotension during Shirodhara may represent vasovagal syncope. The immediate clinical response is procedure cessation, Trendelenburg/supine positioning, airway-breathing-circulation stabilization, and emergency escalation.', 'PRACTICAL_SCENARIO', 'MCQ', 'Panchakarma', 'Complication Management & Clinical Escalation', ARRAY['ayush-clinical-principles', 'ayush-pharmacovigilance']::text[], 'Emergency/Triage Awareness', 'Medium', 'Application', 'ayurveda', 'panchakarma-emergency-escalation-shirodhara', 'Standard Clinical Guidelines for Panchakarma, Ministry of AYUSH', 2024, TRUE, '2026-09-12T17:48:48.128Z'::timestamptz, '2026-09-12T17:48:48.128Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('PRACTICAL_AYUSH_5003', 'A patient presents to a clinical research trial reporting yellow discoloration of sclera and severe nausea two weeks after starting an unlabelled proprietary polyherbal formulation. Under AYUSH Pharmacovigilance (PvPI) guidelines, what is the mandatory regulatory action?', '[{"id":"5003_opt_1","label":"A","text":"Discard the unlabelled medication without documentation to avoid legal consequences."},{"id":"5003_opt_2","label":"B","text":"File a Suspected Adverse Drug Reaction (SADR) reporting form to the nearest AYUSH Intermediary Pharmacovigilance Centre and preserve sample for batch analysis."},{"id":"5003_opt_3","label":"C","text":"Reassure the patient that jaundice indicates deep metabolic cleansing (Kostha Shodhana)."},{"id":"5003_opt_4","label":"D","text":"Double the formulation dosage to clear the circulating toxins."}]'::jsonb, '5003_opt_2', 'Suspected hepatic ADRs must be reported via standard SADR format to Intermediary/National Pharmacovigilance Centres under the Ministry of AYUSH PvPI framework with batch traceability.', 'PRACTICAL_SCENARIO', 'MCQ', 'Agadatantra & Pharmacovigilance', 'PvPI Reporting & Causality Assessment', ARRAY['ayush-pharmacovigilance', 'ayush-regulatory']::text[], 'Pharmacovigilance', 'Hard', 'Application', 'ayurveda', 'ayush-pvpi-sadr-reporting', 'Central Council for Research in Ayurvedic Sciences (CCRAS) PvPI Protocol', 2024, TRUE, '2026-09-12T17:48:48.128Z'::timestamptz, '2026-09-12T17:48:48.128Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('PRACTICAL_AYUSH_5004', 'Under the Ayushman Bharat Digital Mission (ABDM) integration in an AYUSH hospital, which identification and consent workflow is legally required before retrieving a patient''s longitudinal electronic health records across health facilities?', '[{"id":"5004_opt_1","label":"A","text":"Verification via 14-digit ABHA (Ayushman Bharat Health Account) ID and OTP/biometric consent artifact via ABDM Gateway."},{"id":"5004_opt_2","label":"B","text":"Verbal consent documented on a plain paper OPD register only."},{"id":"5004_opt_3","label":"C","text":"Unrestricted electronic sharing of all records among healthcare providers without patient authorization."},{"id":"5004_opt_4","label":"D","text":"ABDM does not apply to AYUSH practitioners and institutions."}]'::jsonb, '5004_opt_1', 'Under National Health Authority (NHA) & ABDM guidelines for AYUSH, accessing longitudinal health records requires patient ABHA identification and explicit electronic consent artifact generation.', 'PRACTICAL_SCENARIO', 'MCQ', 'Health Informatics & Governance', 'ABDM Protocols & Electronic Health Records', ARRAY['abdm-digital-health', 'ayush-regulatory']::text[], 'EHR/ABDM Awareness', 'Medium', 'Knowledge', 'ayurveda', 'abdm-ayush-abha-consent-artifact', 'National Health Authority (NHA) ABDM AYUSH Implementation Toolkit', 2024, TRUE, '2026-09-12T17:48:48.128Z'::timestamptz, '2026-09-12T17:48:48.128Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('PRACTICAL_AYUSH_5005', 'An investigator designs a clinical trial comparing an Ayurvedic classical formulation with standard of care in primary hypertension. To conform to Good Clinical Practice (GCP) and ICMR-AYUSH ethical standards, which step is mandatory before recruiting human subjects?', '[{"id":"5005_opt_1","label":"A","text":"Formal approval from an Institutional Ethics Committee (IEC) and prospective registration in CTRI (Clinical Trials Registry - India)."},{"id":"5005_opt_2","label":"B","text":"Publishing preliminary testimonials on social media to build sample enrollment."},{"id":"5005_opt_3","label":"C","text":"Commencing trial recruitment without ethics review if the drug is mentioned in the Ayurvedic Pharmacopoeia."},{"id":"5005_opt_4","label":"D","text":"Conducting testing exclusively on hospital staff members without written informed consent."}]'::jsonb, '5005_opt_1', 'All clinical trials involving human participants in AYUSH systems require prospective clearance from an accredited IEC and mandatory registration on the CTRI portal before first subject enrollment.', 'PRACTICAL_SCENARIO', 'MCQ', 'Research Methodology & Medical Ethics', 'Clinical Trial Governance & CTRI Registration', ARRAY['ayush-research-methodology', 'ayush-scientific-validation']::text[], 'Research Methodology', 'Medium', 'Application', 'ayurveda', 'ctri-iec-ayush-clinical-trial-governance', 'ICMR-AYUSH National Ethical Guidelines for Biomedical Research', 2024, TRUE, '2026-09-12T17:48:48.128Z'::timestamptz, '2026-09-12T17:48:48.128Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;
INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES ('PRACTICAL_AYUSH_5006', 'In an Ayurvedic manufacturing unit (Rasashala), a Quality Assurance executive is inspecting a newly prepared batch of Bhasma. Which classical test specifically demonstrates the complete absence of free unreacted metallic particles (subtle grainlessness)?', '[{"id":"5006_opt_1","label":"A","text":"Rekhapurnatva (enters fine skin furrows when rubbed between thumb and index finger)"},{"id":"5006_opt_2","label":"B","text":"Varitara (floats steadily on undisturbed water surface)"},{"id":"5006_opt_3","label":"C","text":"Apurnabhava (does not revert to metallic state upon heating with Mitra Panchaka)"},{"id":"5006_opt_4","label":"D","text":"Niruttha (does not alloy with silver foil at high temperature)"}]'::jsonb, '5006_opt_1', 'Rekhapurnatva directly measures extreme fineness and micro-particle size (enters fingerprints/furrows), whereas Apurnabhava/Niruttha test irreversible metallic alteration, and Varitara tests lightness.', 'PRACTICAL_SCENARIO', 'MCQ', 'Rasashastra & Bhaishajya Kalpana', 'Bhasma Pariksha & Pharmacopoeial Standards', ARRAY['ayush-formulations', 'ayush-scientific-validation']::text[], 'AYUSH Core Practice', 'Medium', 'Comprehension', 'ayurveda', 'rekhapurnatva-bhasma-pariksha-gmp', 'Ayurvedic Pharmacopoeia of India (API) Part II, Standards for Bhasma', 2024, TRUE, '2026-09-12T17:48:48.128Z'::timestamptz, '2026-09-12T17:48:48.128Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;