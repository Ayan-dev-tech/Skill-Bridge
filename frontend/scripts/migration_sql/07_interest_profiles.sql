INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788778506328_b873h', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'session_1788778389343_w9p8q', 'Cybersecurity & Defense', 'security', 'Application Security & Vulnerability Research', 'Your answers demonstrate an inclination for finding obscure code weaknesses, analyzing data validation flaws, and safeguarding user applications before deployment.', 0.87, '{"ai-ml":0.15,"cloud":0.3,"web":0.16,"security":1,"software":0.37}'::jsonb, '{"investigation":2.3,"problemSolving":2.4,"building":0,"creativity":0,"analysis":0.7,"experimentation":0,"optimization":0.5,"systemsThinking":1.3,"dataOrientation":0,"automation":1.4,"securityMindset":5.2}'::jsonb, 4, 3, '2026-09-07T10:55:06.328Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788693567567_fji6c', '6eadef1a-74b9-46c9-9df0-75da89fc0d2e', 'session_1788693565899_46b4p', 'Cybersecurity & Defense', 'security', 'Application Security & Threat Modeling', 'Demonstrated strong aptitude for vulnerability analysis.', 0.92, '{"ai-ml":0,"cloud":0,"web":0,"security":0,"software":0}'::jsonb, '{"investigation":0,"problemSolving":0,"building":0,"creativity":0,"analysis":0,"experimentation":0,"optimization":0,"systemsThinking":0,"dataOrientation":0,"automation":0,"securityMindset":0}'::jsonb, 5, 3, '2026-09-06T11:19:27.567Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788693769754_smkqd', '650ace9b-e92f-444f-8171-1b374d4b9cb3', 'session_1788693769417_kud6t', 'Cybersecurity & Defense', 'security', 'Application Security & Threat Modeling', 'Demonstrated strong aptitude for vulnerability analysis.', 0.92, '{"ai-ml":0,"cloud":0,"web":0,"security":0,"software":0}'::jsonb, '{"investigation":0,"problemSolving":0,"building":0,"creativity":0,"analysis":0,"experimentation":0,"optimization":0,"systemsThinking":0,"dataOrientation":0,"automation":0,"securityMindset":0}'::jsonb, 5, 3, '2026-09-06T11:22:49.754Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788719392344_wqonx', 'cef1cd12-aca7-42a7-9d42-b108f505bb40', 'session_1788719392344', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-06T18:29:52.344Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788719454353_asy99', '61aa5a2e-1cfc-4ba9-8ce4-03de35b962dd', 'session_1788719454353', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-06T18:30:54.353Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788720562402_0kuv6', '0c1c45bc-281a-440e-8373-2e59cd6b5ddc', 'session_1788720562402', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-06T18:49:22.402Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788721356746_xqg61', '0a0468cf-782f-4a7f-a074-bcb30953034f', 'session_1788721356746', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-06T19:02:36.746Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788723676565_2vjgd', 'ef1f79bc-6c5e-454e-92b5-db4ebb3fea7c', 'session_1788723676565', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-06T19:41:16.565Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788724003852_tvy6h', '93a31505-b421-4f59-8a4d-0643583ac876', 'session_1788724003852', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-06T19:46:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788776666732_ex8yc', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'session_1788776666731', 'Cybersecurity & Defenses', 'security', 'Application Security & Vulnerability Research', 'Passionate about web security, threat modeling, and secure software development.', 0.95, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-07T10:24:26.732Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788776715960_tl2lm', '73d76d6b-6353-4260-a8be-605ca72c9b12', 'session_1788776715960', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-07T10:25:15.960Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788777974422_8zk6n', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'session_1788777974422', 'Cybersecurity & Defenses', 'security', 'Application Security & Vulnerability Research', 'Passionate about web security, threat modeling, and secure software development.', 0.95, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-07T10:46:14.422Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788778075981_jnmbv', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'session_1788778075981', 'Cybersecurity & Defenses', 'security', 'Application Security & Vulnerability Research', 'Passionate about web security, threat modeling, and secure software development.', 0.95, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-07T10:47:55.981Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788778137489_dco6l', 'b1d3f85a-2b48-4dd2-93cc-987dcb1ffbb6', 'session_1788778137489', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-07T10:48:57.489Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788779561523_ntaxp', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'session_1788779561523', 'Cybersecurity & Defenses', 'security', 'Application Security & Vulnerability Research', 'Passionate about web security, threat modeling, and secure software development.', 0.95, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-07T11:12:41.523Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788779647050_h3u1d', '2e6e232a-c966-4803-b87d-6f41a6be1a7a', 'session_1788779647050', 'Full-Stack Development', 'web', 'Web Applications & APIs', 'Strong affinity for user interface systems and scalable backends.', 0.94, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-07T11:14:07.050Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('ip_test_student_adv_1788782306568', 'test_student_adv_1788782306568', 'session_ip_test_student_adv_1788782306568', 'Cybersecurity', 'security', 'Application Security & Vulnerability Assessment', 'High affinity for secure systems design.', 0.92, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('ip_test_student_learn_1788782306568', 'test_student_learn_1788782306568', 'session_ip_test_student_learn_1788782306568', 'Web Development', 'web', 'Full-Stack Web Development', 'Front-to-back engineering enthusiast.', 0.85, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('ip_test_student_14_1788782327573', 'test_student_14_1788782327573', 'session_ip_test_student_14_1788782327573', 'Cloud', 'cloud', 'Cloud Platform', 'e', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788782351559_prese', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'session_1788782351559', 'Cybersecurity & Defenses', 'security', 'Application Security & Vulnerability Research', 'Passionate about web security, threat modeling, and secure software development.', 0.95, '{}'::jsonb, '{}'::jsonb, 5, 3, '2026-09-07T11:59:11.559Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('ip_test_student_adv_1788782599801', 'test_student_adv_1788782599801', 'session_ip_test_student_adv_1788782599801', 'Cybersecurity', 'security', 'Application Security & Vulnerability Assessment', 'High affinity for secure systems design.', 0.92, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('ip_test_student_learn_1788782599801', 'test_student_learn_1788782599801', 'session_ip_test_student_learn_1788782599801', 'Web Development', 'web', 'Full-Stack Web Development', 'Front-to-back engineering enthusiast.', 0.85, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('ip_test_student_14_1788782607685', 'test_student_14_1788782607685', 'session_ip_test_student_14_1788782607685', 'Cloud', 'cloud', 'Cloud Platform', 'e', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784103103', 'stu_34_adv_1788784103103', 'session_int_stu_34_adv_1788784103103', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784103103', 'stu_34_lrn_1788784103103', 'session_int_stu_34_lrn_1788784103103', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784129009', 'stu_34_adv_1788784129009', 'session_int_stu_34_adv_1788784129009', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784129009', 'stu_34_lrn_1788784129009', 'session_int_stu_34_lrn_1788784129009', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784159011', 'stu_34_adv_1788784159011', 'session_int_stu_34_adv_1788784159011', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784159011', 'stu_34_lrn_1788784159011', 'session_int_stu_34_lrn_1788784159011', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784192714', 'stu_34_adv_1788784192714', 'session_int_stu_34_adv_1788784192714', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784192714', 'stu_34_lrn_1788784192714', 'session_int_stu_34_lrn_1788784192714', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784312511', 'stu_34_adv_1788784312511', 'session_int_stu_34_adv_1788784312511', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784312511', 'stu_34_lrn_1788784312511', 'session_int_stu_34_lrn_1788784312511', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784335671', 'stu_34_adv_1788784335671', 'session_int_stu_34_adv_1788784335671', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784335671', 'stu_34_lrn_1788784335671', 'session_int_stu_34_lrn_1788784335671', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784438121', 'stu_34_adv_1788784438121', 'session_int_stu_34_adv_1788784438121', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784438121', 'stu_34_lrn_1788784438121', 'session_int_stu_34_lrn_1788784438121', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784460729', 'stu_34_adv_1788784460729', 'session_int_stu_34_adv_1788784460729', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784460729', 'stu_34_lrn_1788784460729', 'session_int_stu_34_lrn_1788784460729', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784485808', 'stu_34_adv_1788784485808', 'session_int_stu_34_adv_1788784485808', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784485808', 'stu_34_lrn_1788784485808', 'session_int_stu_34_lrn_1788784485808', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784515470', 'stu_34_adv_1788784515470', 'session_int_stu_34_adv_1788784515470', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784515470', 'stu_34_lrn_1788784515470', 'session_int_stu_34_lrn_1788784515470', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784556639', 'stu_34_adv_1788784556639', 'session_int_stu_34_adv_1788784556639', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639', 'session_int_stu_34_lrn_1788784556639', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784583072', 'stu_34_adv_1788784583072', 'session_int_stu_34_adv_1788784583072', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072', 'session_int_stu_34_lrn_1788784583072', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784626397', 'stu_34_adv_1788784626397', 'session_int_stu_34_adv_1788784626397', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397', 'session_int_stu_34_lrn_1788784626397', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('ip_test_student_adv_1788784801588', 'test_student_adv_1788784801588', 'session_ip_test_student_adv_1788784801588', 'Cybersecurity', 'security', 'Application Security & Vulnerability Assessment', 'High affinity for secure systems design.', 0.92, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('ip_test_student_learn_1788784801588', 'test_student_learn_1788784801588', 'session_ip_test_student_learn_1788784801588', 'Web Development', 'web', 'Full-Stack Web Development', 'Front-to-back engineering enthusiast.', 0.85, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788784864571', 'stu_34_adv_1788784864571', 'session_int_stu_34_adv_1788784864571', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571', 'session_int_stu_34_lrn_1788784864571', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788787784013', 'stu_34_adv_1788787784013', 'session_int_stu_34_adv_1788787784013', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013', 'session_int_stu_34_lrn_1788787784013', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788787810448', 'stu_34_adv_1788787810448', 'session_int_stu_34_adv_1788787810448', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448', 'session_int_stu_34_lrn_1788787810448', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788806285059', 'stu_34_adv_1788806285059', 'session_int_stu_34_adv_1788806285059', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059', 'session_int_stu_34_lrn_1788806285059', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788806594421', 'stu_34_adv_1788806594421', 'session_int_stu_34_adv_1788806594421', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421', 'session_int_stu_34_lrn_1788806594421', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788808155355', 'stu_34_adv_1788808155355', 'session_int_stu_34_adv_1788808155355', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355', 'session_int_stu_34_lrn_1788808155355', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_adv_1788809444883', 'stu_34_adv_1788809444883', 'session_int_stu_34_adv_1788809444883', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified high interest in backend and full stack architecture.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('int_stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883', 'session_int_stu_34_lrn_1788809444883', 'Software Engineering & Full Stack', 'software-engineering', 'Full Stack Development & Distributed Systems', 'Verified interest in software engineering.', 0.8, '{}'::jsonb, '{}'::jsonb, 0, 0, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;
INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES ('profile_1788868271624_6jpd8', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 'session_1788868168553_zvs8l', 'Cybersecurity & Defense', 'security', 'Application Security & Vulnerability Research', 'Your answers demonstrate an inclination for finding obscure code weaknesses, analyzing data validation flaws, and safeguarding user applications before deployment.', 0.87, '{"ai-ml":0.19,"cloud":0.18,"web":0.12,"security":1,"software":0.46}'::jsonb, '{"investigation":2.3,"problemSolving":3.2,"building":0.4,"creativity":0,"analysis":0.7,"experimentation":0,"optimization":0.7,"systemsThinking":0.6,"dataOrientation":0,"automation":0.6,"securityMindset":5.2}'::jsonb, 4, 3, '2026-09-08T11:51:11.624Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;