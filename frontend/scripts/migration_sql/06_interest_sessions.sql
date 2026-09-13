INSERT INTO public.interest_sessions (id, session_id, student_id, phase, broad_domain, answers, domain_scores, signal_scores, status, updated_at)
VALUES ('session_1788693565899_46b4p', 'session_1788693565899_46b4p', '6eadef1a-74b9-46c9-9df0-75da89fc0d2e', 1, NULL, '[]'::jsonb, '{"ai-ml":0,"cloud":0,"web":0,"security":0,"software":0}'::jsonb, '{"investigation":0,"problemSolving":0,"building":0,"creativity":0,"analysis":0,"experimentation":0,"optimization":0,"systemsThinking":0,"dataOrientation":0,"automation":0,"securityMindset":0}'::jsonb, 'confirmed', '2026-09-06T11:19:25.901Z'::timestamptz)
ON CONFLICT (session_id) DO UPDATE SET
  phase = EXCLUDED.phase,
  answers = EXCLUDED.answers,
  domain_scores = EXCLUDED.domain_scores,
  signal_scores = EXCLUDED.signal_scores,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.interest_sessions (id, session_id, student_id, phase, broad_domain, answers, domain_scores, signal_scores, status, updated_at)
VALUES ('session_1788693769417_kud6t', 'session_1788693769417_kud6t', '650ace9b-e92f-444f-8171-1b374d4b9cb3', 1, NULL, '[]'::jsonb, '{"ai-ml":0,"cloud":0,"web":0,"security":0,"software":0}'::jsonb, '{"investigation":0,"problemSolving":0,"building":0,"creativity":0,"analysis":0,"experimentation":0,"optimization":0,"systemsThinking":0,"dataOrientation":0,"automation":0,"securityMindset":0}'::jsonb, 'confirmed', '2026-09-06T11:22:49.421Z'::timestamptz)
ON CONFLICT (session_id) DO UPDATE SET
  phase = EXCLUDED.phase,
  answers = EXCLUDED.answers,
  domain_scores = EXCLUDED.domain_scores,
  signal_scores = EXCLUDED.signal_scores,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.interest_sessions (id, session_id, student_id, phase, broad_domain, answers, domain_scores, signal_scores, status, updated_at)
VALUES ('session_1788778389343_w9p8q', 'session_1788778389343_w9p8q', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 2, 'security', '[{"questionId":"p1-q1-anomaly","questionText":"You notice that a web application produces an unexpected, distorted response whenever a user enters non-standard characters in an input form. What would you be most excited to do?","selectedOptionId":"p1-q1-opt-d","selectedOptionText":"Automate an automated test suite across distributed servers to stress-test thousands of concurrent inputs.","phase":1,"signalDelta":{"automation":0.8,"systemsThinking":0.7,"optimization":0.5},"domainDelta":{"cloud":0.8,"software":0.5}},{"questionId":"p1-q2-data-records","questionText":"You are handed a raw dataset containing millions of event records from an online platform over the past year. Where does your curiosity take you first?","selectedOptionId":"p1-q2-opt-b","selectedOptionText":"Inspect timestamps and authentication logs to trace any suspicious access patterns or unauthorized privileges.","phase":1,"signalDelta":{"investigation":0.8,"securityMindset":0.8,"analysis":0.7},"domainDelta":{"security":0.85}},{"questionId":"p1-q3-repetitive-task","questionText":"A development team manually spends four hours every Friday packaging and deploying software releases to multiple servers. What is your reaction?","selectedOptionId":"p1-q3-opt-b","selectedOptionText":"Embed automated vulnerability scanners and integrity checks into the pipeline to block insecure releases.","phase":1,"signalDelta":{"securityMindset":0.9,"automation":0.6,"investigation":0.6},"domainDelta":{"security":0.85}},{"questionId":"p1-q4-system-failure","questionText":"A critical service begins freezing during peak hours, yet no crash error logs are generated. What approach do you instinctively reach for?","selectedOptionId":"p1-q4-opt-b","selectedOptionText":"Audit incoming network packets and connection states to verify whether an external entity is exhausting server connections deliberately.","phase":1,"signalDelta":{"investigation":0.9,"securityMindset":0.8,"systemsThinking":0.6},"domainDelta":{"security":0.85}},{"questionId":"p2-sec-q1-focus","questionText":"Within Cybersecurity & Defense, which kind of challenge sounds most captivating to you?","selectedOptionId":"p2-sec-q1-pentest","selectedOptionText":"Acting as an authorized ethical hacker to test enterprise perimeter defenses, chained vulnerabilities, and privilege escalation pathways.","phase":2,"signalDelta":{"securityMindset":0.9,"problemSolving":0.8},"domainDelta":{"security":1}},{"questionId":"p2-sec-q2-scenario","questionText":"You are tasked with securing an organization against unauthorized access. Which activity would you find most satisfying?","selectedOptionId":"p2-sec-q2-pentest","selectedOptionText":"Conducting an offensive black-box assessment against a newly launched service to identify whether sensitive tenant data can be exposed.","phase":2,"signalDelta":{"securityMindset":0.9,"problemSolving":0.8},"domainDelta":{"security":1}},{"questionId":"p2-sec-q3-depth","questionText":"What type of security artifact or project would you be proudest to publish on your engineering portfolio?","selectedOptionId":"p2-sec-q3-pentest","selectedOptionText":"A proof-of-concept offensive security tool demonstrating how chained configuration weaknesses can be uncovered before adversaries find them.","phase":2,"signalDelta":{"securityMindset":0.9,"problemSolving":0.8},"domainDelta":{"security":1}}]'::jsonb, '{"ai-ml":0.15,"cloud":0.3,"web":0.16,"security":1,"software":0.37}'::jsonb, '{"investigation":2.3,"problemSolving":2.4,"building":0,"creativity":0,"analysis":0.7,"experimentation":0,"optimization":0.5,"systemsThinking":1.3,"dataOrientation":0,"automation":1.4,"securityMindset":5.2}'::jsonb, 'confirmed', '2026-09-07T10:55:01.299Z'::timestamptz)
ON CONFLICT (session_id) DO UPDATE SET
  phase = EXCLUDED.phase,
  answers = EXCLUDED.answers,
  domain_scores = EXCLUDED.domain_scores,
  signal_scores = EXCLUDED.signal_scores,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.interest_sessions (id, session_id, student_id, phase, broad_domain, answers, domain_scores, signal_scores, status, updated_at)
VALUES ('session_1789236038015_0ab4f', 'session_1789236038015_0ab4f', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 1, NULL, '[]'::jsonb, '{"ai-ml":0,"cloud":0,"web":0,"security":0,"software":0}'::jsonb, '{"investigation":0,"problemSolving":0,"building":0,"creativity":0,"analysis":0,"experimentation":0,"optimization":0,"systemsThinking":0,"dataOrientation":0,"automation":0,"securityMindset":0}'::jsonb, 'phase1_in_progress', '2026-09-12T18:00:38.017Z'::timestamptz)
ON CONFLICT (session_id) DO UPDATE SET
  phase = EXCLUDED.phase,
  answers = EXCLUDED.answers,
  domain_scores = EXCLUDED.domain_scores,
  signal_scores = EXCLUDED.signal_scores,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;
INSERT INTO public.interest_sessions (id, session_id, student_id, phase, broad_domain, answers, domain_scores, signal_scores, status, updated_at)
VALUES ('session_1789236229462_6hxqe', 'session_1789236229462_6hxqe', 'cadd3584-dcb6-46ec-b943-5a045c349ca3', 1, NULL, '[]'::jsonb, '{"ai-ml":0,"cloud":0,"web":0,"security":0,"software":0}'::jsonb, '{"investigation":0,"problemSolving":0,"building":0,"creativity":0,"analysis":0,"experimentation":0,"optimization":0,"systemsThinking":0,"dataOrientation":0,"automation":0,"securityMindset":0}'::jsonb, 'phase1_in_progress', '2026-09-12T18:03:49.464Z'::timestamptz)
ON CONFLICT (session_id) DO UPDATE SET
  phase = EXCLUDED.phase,
  answers = EXCLUDED.answers,
  domain_scores = EXCLUDED.domain_scores,
  signal_scores = EXCLUDED.signal_scores,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;