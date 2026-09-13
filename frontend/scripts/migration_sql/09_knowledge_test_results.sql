INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788694012330_mayu8', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'ktest_1788693923815_pkr1g', 'software', 'Software & Core Systems', 'beginner', 'Proficient', 28, 40, 70, 71, ARRAY['Array Linear Search Complexity', 'Stack Vs Queue Ordering', 'Os Kernel Responsibilities', 'Oop Encapsulation Principle', 'Unit Testing Fundamentals', 'Database Btree Indexes', 'Git Branching Workflow']::text[], ARRAY['Recursion Stack Overflow', 'Sorting Algorithm Stability', 'Stack Vs Heap Memory']::text[], '[{"questionNumber":1,"questionText":"What is the time complexity of searching for an element in an unsorted array of size N?","selectedOption":"O(N) linear time, because in the worst case every element must be inspected sequentially from start to end","correctOption":"O(N) linear time, because in the worst case every element must be inspected sequentially from start to end","isCorrect":true,"conceptTag":"Array Linear Search Complexity","complexity":"fundamental","explanation":"In an unsorted array, there is no ordering to guide searches. Finding a specific element requires checking each position sequentially, leading to O(N) worst-case time complexity."},{"questionNumber":2,"questionText":"What distinguishes a Stack from a Queue in fundamental computer science data structures?","selectedOption":"A Stack follows Last-In-First-Out (LIFO) order, while a Queue follows First-In-First-Out (FIFO) order","correctOption":"A Stack follows Last-In-First-Out (LIFO) order, while a Queue follows First-In-First-Out (FIFO) order","isCorrect":true,"conceptTag":"Stack Vs Queue Ordering","complexity":"fundamental","explanation":"A Stack inserts and removes items from the same end (LIFO - like a stack of plates). A Queue inserts items at the back and removes them from the front (FIFO - like a line of people waiting)."},{"questionNumber":3,"questionText":"What is the primary function of an operating system kernel?","selectedOption":"To manage core hardware resources including CPU scheduling, memory allocation, and device I/O","correctOption":"To manage core hardware resources including CPU scheduling, memory allocation, and device I/O","isCorrect":true,"conceptTag":"Os Kernel Responsibilities","complexity":"fundamental","explanation":"The kernel is the core of the operating system that has complete control over everything in the system, managing hardware resources (CPU, RAM, block storage, peripherals) and mediating software access via system calls."},{"questionNumber":4,"questionText":"In object-oriented programming, what does the concept of Encapsulation achieve?","selectedOption":"Bundling data and methods within an object while hiding internal implementation details from external access","correctOption":"Bundling data and methods within an object while hiding internal implementation details from external access","isCorrect":true,"conceptTag":"Oop Encapsulation Principle","complexity":"fundamental","explanation":"Encapsulation binds data and the methods that manipulate that data into a cohesive unit (class) while restricting direct external access to internal state, exposing only controlled public interfaces."},{"questionNumber":5,"questionText":"What is the primary operational purpose of unit testing in software development?","selectedOption":"To test individual isolated functions or modules in isolation to ensure they produce expected outputs","correctOption":"To test individual isolated functions or modules in isolation to ensure they produce expected outputs","isCorrect":true,"conceptTag":"Unit Testing Fundamentals","complexity":"fundamental","explanation":"Unit testing verifies that small, isolated pieces of code (functions, methods) work correctly given defined inputs, catching regressions early in development before integration."},{"questionNumber":6,"questionText":"A program enters an infinite recursion loop without a valid base case. What runtime error occurs?","selectedOption":"A Segmentation Fault, caused by physical memory chips overheating due to excessive mathematical calculations","correctOption":"A Stack Overflow error, because recursive function call frames exhaust the allocated thread call stack memory","isCorrect":false,"conceptTag":"Recursion Stack Overflow","complexity":"application","explanation":"Each recursive call pushes a new stack frame (return address, arguments, local variables) onto the execution stack. Without a terminating base case, the stack exceeds its allocated memory limit, triggering a stack overflow."},{"questionNumber":7,"questionText":"Why do relational databases create B-Tree indexes on frequently queried table columns?","selectedOption":"To allow the query optimizer to locate rows in logarithmic time O(log N) rather than scanning the full table","correctOption":"To allow the query optimizer to locate rows in logarithmic time O(log N) rather than scanning the full table","isCorrect":true,"conceptTag":"Database Btree Indexes","complexity":"application","explanation":"B-Tree indexes maintain sorted balanced trees of keys and row pointers, allowing search, range queries, and ordering in O(log N) disk reads, avoiding expensive O(N) full table scans."},{"questionNumber":8,"questionText":"In version control with Git, what is the effect of running `git checkout -b feature/login`?","selectedOption":"It creates a new branch named ''feature/login'' and immediately switches your working directory to it","correctOption":"It creates a new branch named ''feature/login'' and immediately switches your working directory to it","isCorrect":true,"conceptTag":"Git Branching Workflow","complexity":"application","explanation":"The `-b` flag tells Git to create a new branch with the specified name and immediately switch the HEAD pointer and working tree to point to this new branch."},{"questionNumber":9,"questionText":"A sorting algorithm must guarantee stable sorting of records with identical keys. Which algorithm is naturally stable?","selectedOption":"Quick Sort with in-place Lomuto partitioning, which swaps distant elements across pivot values","correctOption":"Merge Sort, which preserves the relative original input order of elements with equal key values","isCorrect":false,"conceptTag":"Sorting Algorithm Stability","complexity":"challenging","explanation":"A sorting algorithm is stable if it preserves the original relative order of records with equal keys. Merge Sort divides and merges subarrays while carefully prioritizing elements from the left subarray when keys match, preserving stability."},{"questionNumber":10,"questionText":"What is the primary memory management difference between Stack memory and Heap memory in compiled languages (e.g. C/Rust)?","selectedOption":"Stack memory stores global shared databases, while Heap memory stores local CPU instruction registers","correctOption":"Stack allocations are fast and automatically freed on function return, while Heap allocations are dynamic and persistent","isCorrect":false,"conceptTag":"Stack Vs Heap Memory","complexity":"challenging","explanation":"Stack memory is managed automatically by the CPU call stack; variables are pushed on function call and popped on return (very fast). Heap memory is allocated dynamically at runtime (malloc/new) and persists until explicitly freed or garbage-collected."}]'::jsonb, '2026-09-06T11:26:52.330Z'::timestamptz, '2026-09-06T11:26:52.330Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788776669859_gl85r', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'ktest_1788776668042_wsj3l', 'security', 'Cybersecurity & Defenses', 'intermediate', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T10:24:29.859Z'::timestamptz, '2026-09-07T10:24:29.859Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788776672776_agi17', 'fe7487f7-e9d8-4ba1-bd29-fcdff5e4fdad', 'ktest_1788776671576_ooe5n', 'security', 'Cybersecurity & Defenses', 'advanced', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T10:24:32.776Z'::timestamptz, '2026-09-07T10:24:32.776Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788777976314_fiwbh', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'ktest_1788777975070_4uxpx', 'security', 'Cybersecurity & Defenses', 'intermediate', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T10:46:16.314Z'::timestamptz, '2026-09-07T10:46:16.314Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788777980907_rdevx', '17752966-0044-48e3-b3aa-d1fe9caa76b3', 'ktest_1788777980241_0l9rh', 'security', 'Cybersecurity & Defenses', 'advanced', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T10:46:20.907Z'::timestamptz, '2026-09-07T10:46:20.907Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788778077699_y7ejl', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'ktest_1788778076554_7m5u5', 'security', 'Cybersecurity & Defenses', 'intermediate', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T10:47:57.699Z'::timestamptz, '2026-09-07T10:47:57.699Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788778084107_s1x5t', 'e1a76ef9-8ec1-44c5-b2e5-57813eb23cee', 'ktest_1788778082783_juxrp', 'security', 'Cybersecurity & Defenses', 'advanced', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T10:48:04.107Z'::timestamptz, '2026-09-07T10:48:04.107Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788778665165_fymo7', '47fc1671-0e5d-4f66-af79-ca34f5e10ec5', 'ktest_1788778518632_94fmx', 'security', 'Cybersecurity & Defense', 'beginner', 'Proficient', 28, 40, 70, 125, ARRAY['Firewall Basics', 'Encryption Fundamentals', 'Social Engineering Phishing', 'Cia Triad', 'Phishing Mitigation', 'Password Storage Safety', 'Default Credentials Risk']::text[], ARRAY['Mfa Principles', 'TLS Transport Security', 'Wireless Network Hardening']::text[], '[{"questionNumber":1,"questionText":"What is the primary role of a network firewall in an IT infrastructure?","selectedOption":"To inspect and control incoming and outgoing network traffic based on predefined security rules","correctOption":"To inspect and control incoming and outgoing network traffic based on predefined security rules","isCorrect":true,"conceptTag":"Firewall Basics","complexity":"fundamental","explanation":"A firewall monitors and filters network traffic based on configured security policies, establishing a security boundary between trusted internal networks and untrusted external networks."},{"questionNumber":2,"questionText":"Which of the following best describes Multi-Factor Authentication (MFA)?","selectedOption":"Authenticating client requests through sequential cryptographic handshakes across border gateway proxies","correctOption":"Verifying identity using credentials from two or more distinct categories such as passwords and security keys","isCorrect":false,"conceptTag":"Mfa Principles","complexity":"fundamental","explanation":"MFA requires two or more distinct categories of credentials: something you know (password), something you have (security key or authenticator app), or something you are (biometrics)."},{"questionNumber":3,"questionText":"What distinguishes symmetric encryption from asymmetric encryption?","selectedOption":"Symmetric uses a single shared key for encryption and decryption, while asymmetric uses a public-private key pair","correctOption":"Symmetric uses a single shared key for encryption and decryption, while asymmetric uses a public-private key pair","isCorrect":true,"conceptTag":"Encryption Fundamentals","complexity":"fundamental","explanation":"Symmetric encryption (such as AES) uses the same secret key for encryption and decryption. Asymmetric encryption (such as RSA or ECC) uses mathematically linked public and private key pairs."},{"questionNumber":4,"questionText":"Which social engineering attack tricks victims into revealing credentials through deceptive communications?","selectedOption":"A phishing attack delivering fraudulent messages designed to deceive recipients into disclosing credentials","correctOption":"A phishing attack delivering fraudulent messages designed to deceive recipients into disclosing credentials","isCorrect":true,"conceptTag":"Social Engineering Phishing","complexity":"fundamental","explanation":"Phishing uses deceptive emails, messages, or websites masquerading as trustworthy entities to trick individuals into disclosing sensitive information such as login credentials."},{"questionNumber":5,"questionText":"What does the ''A'' represent in the CIA triad of information security?","selectedOption":"Availability, ensuring authorized users have timely and reliable access to critical systems and data","correctOption":"Availability, ensuring authorized users have timely and reliable access to critical systems and data","isCorrect":true,"conceptTag":"Cia Triad","complexity":"fundamental","explanation":"The CIA triad consists of Confidentiality (preventing unauthorized disclosure), Integrity (preventing unauthorized modification), and Availability (ensuring accessible, reliable service)."},{"questionNumber":6,"questionText":"An employee receives an urgent message appearing to come from an executive. What is the best immediate response?","selectedOption":"Verify the authenticity of the request through an independent, pre-established communication channel","correctOption":"Verify the authenticity of the request through an independent, pre-established communication channel","isCorrect":true,"conceptTag":"Phishing Mitigation","complexity":"application","explanation":"Executive impersonation exploits urgency and authority. The standard defense is out-of-band verification using a trusted, independent communication channel such as an internal phone directory."},{"questionNumber":7,"questionText":"Why should web applications never store user passwords in plaintext inside databases?","selectedOption":"Plaintext passwords expose all user credentials immediately if the database storage layer is compromised","correctOption":"Plaintext passwords expose all user credentials immediately if the database storage layer is compromised","isCorrect":true,"conceptTag":"Password Storage Safety","complexity":"application","explanation":"Plaintext storage guarantees full account compromise if database dumps or backups are leaked. Passwords must be hashed using salted, adaptive algorithms like bcrypt or Argon2."},{"questionNumber":8,"questionText":"What does the padlock icon and HTTPS in a web browser''s address bar signify?","selectedOption":"The web host''s physical data center possesses verified enterprise compliance security certifications","correctOption":"Traffic between the browser and web server is encrypted and protected against eavesdropping via TLS","isCorrect":false,"conceptTag":"TLS Transport Security","complexity":"application","explanation":"HTTPS confirms transport-layer encryption via TLS, ensuring data confidentiality and integrity between client and server. It does not verify the security of the backend application itself."},{"questionNumber":9,"questionText":"Which method provides the most effective protection for an enterprise wireless network?","selectedOption":"Restricting network access by configuring static MAC address filtering on wireless access controllers","correctOption":"Deploying WPA3 Enterprise with 802.1X certificate-based individual authentication per connecting device","isCorrect":false,"conceptTag":"Wireless Network Hardening","complexity":"challenging","explanation":"WPA3 Enterprise with 802.1X provides individual credentials and mutual certificate authentication, preventing credential sharing and rogue access point spoofing."},{"questionNumber":10,"questionText":"What risk arises from leaving default administrative credentials on newly installed network switches?","selectedOption":"Automated scanning tools exploit known vendor credentials to gain unauthorized administrative access","correctOption":"Automated scanning tools exploit known vendor credentials to gain unauthorized administrative access","isCorrect":true,"conceptTag":"Default Credentials Risk","complexity":"challenging","explanation":"Factory default credentials are systematically cataloged in publicly available threat databases and targeted by automated scanners within minutes of network exposure."}]'::jsonb, '2026-09-07T10:57:45.165Z'::timestamptz, '2026-09-07T10:57:45.165Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788779563078_55pup', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'ktest_1788779562182_koh0v', 'security', 'Cybersecurity & Defenses', 'intermediate', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T11:12:43.078Z'::timestamptz, '2026-09-07T11:12:43.078Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788779572517_wdju2', '43a69d7a-8521-41eb-ade3-8659f17099e2', 'ktest_1788779571912_7ojm2', 'security', 'Cybersecurity & Defenses', 'advanced', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T11:12:52.517Z'::timestamptz, '2026-09-07T11:12:52.517Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('ktr_test_student_adv_1788782306568', 'test_student_adv_1788782306568', 'sess_test_student_adv_1788782306568', 'security', 'Cybersecurity', 'advanced', 'Advanced', 36, 40, 90, 0, ARRAY['OWASP Top 10', 'Threat Modeling', 'Authentication Architecture']::text[], ARRAY['Automated SAST Rule Authoring']::text[], '[]'::jsonb, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('ktr_test_student_learn_1788782306568', 'test_student_learn_1788782306568', 'sess_test_student_learn_1788782306568', 'web', 'Web Development', 'beginner', 'Foundational', 24, 40, 60, 0, ARRAY['HTML/CSS', 'Basic JavaScript']::text[], ARRAY['Microservices', 'CI/CD']::text[], '[]'::jsonb, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('ktr_test_student_14_1788782327573', 'test_student_14_1788782327573', 's_test_student_14_1788782327573', 'cloud', 'Cloud', 'advanced', 'Foundational', 20, 40, 88, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T11:58:26.569Z'::timestamptz, '2026-09-07T11:58:26.569Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788782355376_b8j5q', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'ktest_1788782352879_0sw6o', 'security', 'Cybersecurity & Defenses', 'intermediate', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T11:59:15.376Z'::timestamptz, '2026-09-07T11:59:15.376Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788782360924_j5mqh', 'fbc5a09c-460f-44d9-afd1-9b409492ea36', 'ktest_1788782359935_tto6l', 'security', 'Cybersecurity & Defenses', 'advanced', 'Needs Foundation', 0, 40, 0, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T11:59:20.924Z'::timestamptz, '2026-09-07T11:59:20.924Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('ktr_test_student_adv_1788782599801', 'test_student_adv_1788782599801', 'sess_test_student_adv_1788782599801', 'security', 'Cybersecurity', 'advanced', 'Advanced', 36, 40, 90, 0, ARRAY['OWASP Top 10', 'Threat Modeling', 'Authentication Architecture']::text[], ARRAY['Automated SAST Rule Authoring']::text[], '[]'::jsonb, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('ktr_test_student_learn_1788782599801', 'test_student_learn_1788782599801', 'sess_test_student_learn_1788782599801', 'web', 'Web Development', 'beginner', 'Foundational', 24, 40, 60, 0, ARRAY['HTML/CSS', 'Basic JavaScript']::text[], ARRAY['Microservices', 'CI/CD']::text[], '[]'::jsonb, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('ktr_test_student_14_1788782607685', 'test_student_14_1788782607685', 's_test_student_14_1788782607685', 'cloud', 'Cloud', 'advanced', 'Foundational', 20, 40, 88, 0, ARRAY[]::text[], ARRAY[]::text[], '[]'::jsonb, '2026-09-07T12:03:19.801Z'::timestamptz, '2026-09-07T12:03:19.801Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784103103', 'stu_34_adv_1788784103103', 'session_know_stu_34_adv_1788784103103', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784103103', 'stu_34_lrn_1788784103103', 'session_know_stu_34_lrn_1788784103103', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:28:23.103Z'::timestamptz, '2026-09-07T12:28:23.103Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784129009', 'stu_34_adv_1788784129009', 'session_know_stu_34_adv_1788784129009', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784129009', 'stu_34_lrn_1788784129009', 'session_know_stu_34_lrn_1788784129009', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:28:49.009Z'::timestamptz, '2026-09-07T12:28:49.009Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784159011', 'stu_34_adv_1788784159011', 'session_know_stu_34_adv_1788784159011', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784159011', 'stu_34_lrn_1788784159011', 'session_know_stu_34_lrn_1788784159011', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:29:19.011Z'::timestamptz, '2026-09-07T12:29:19.011Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784192714', 'stu_34_adv_1788784192714', 'session_know_stu_34_adv_1788784192714', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784192714', 'stu_34_lrn_1788784192714', 'session_know_stu_34_lrn_1788784192714', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:29:52.714Z'::timestamptz, '2026-09-07T12:29:52.714Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784312511', 'stu_34_adv_1788784312511', 'session_know_stu_34_adv_1788784312511', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784312511', 'stu_34_lrn_1788784312511', 'session_know_stu_34_lrn_1788784312511', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:31:52.511Z'::timestamptz, '2026-09-07T12:31:52.511Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784335671', 'stu_34_adv_1788784335671', 'session_know_stu_34_adv_1788784335671', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784335671', 'stu_34_lrn_1788784335671', 'session_know_stu_34_lrn_1788784335671', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:32:15.671Z'::timestamptz, '2026-09-07T12:32:15.671Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784438121', 'stu_34_adv_1788784438121', 'session_know_stu_34_adv_1788784438121', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784438121', 'stu_34_lrn_1788784438121', 'session_know_stu_34_lrn_1788784438121', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:33:58.121Z'::timestamptz, '2026-09-07T12:33:58.121Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784460729', 'stu_34_adv_1788784460729', 'session_know_stu_34_adv_1788784460729', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784460729', 'stu_34_lrn_1788784460729', 'session_know_stu_34_lrn_1788784460729', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:34:20.729Z'::timestamptz, '2026-09-07T12:34:20.729Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784485808', 'stu_34_adv_1788784485808', 'session_know_stu_34_adv_1788784485808', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784485808', 'stu_34_lrn_1788784485808', 'session_know_stu_34_lrn_1788784485808', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:34:45.808Z'::timestamptz, '2026-09-07T12:34:45.808Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784515470', 'stu_34_adv_1788784515470', 'session_know_stu_34_adv_1788784515470', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784515470', 'stu_34_lrn_1788784515470', 'session_know_stu_34_lrn_1788784515470', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:35:15.470Z'::timestamptz, '2026-09-07T12:35:15.470Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784556639', 'stu_34_adv_1788784556639', 'session_know_stu_34_adv_1788784556639', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784556639', 'stu_34_lrn_1788784556639', 'session_know_stu_34_lrn_1788784556639', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:35:56.639Z'::timestamptz, '2026-09-07T12:35:56.639Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784583072', 'stu_34_adv_1788784583072', 'session_know_stu_34_adv_1788784583072', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784583072', 'stu_34_lrn_1788784583072', 'session_know_stu_34_lrn_1788784583072', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:36:23.072Z'::timestamptz, '2026-09-07T12:36:23.072Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784626397', 'stu_34_adv_1788784626397', 'session_know_stu_34_adv_1788784626397', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784626397', 'stu_34_lrn_1788784626397', 'session_know_stu_34_lrn_1788784626397', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:37:06.397Z'::timestamptz, '2026-09-07T12:37:06.397Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('ktr_test_student_adv_1788784801588', 'test_student_adv_1788784801588', 'sess_test_student_adv_1788784801588', 'security', 'Cybersecurity', 'advanced', 'Advanced', 36, 40, 90, 0, ARRAY['OWASP Top 10', 'Threat Modeling', 'Authentication Architecture']::text[], ARRAY['Automated SAST Rule Authoring']::text[], '[]'::jsonb, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('ktr_test_student_learn_1788784801588', 'test_student_learn_1788784801588', 'sess_test_student_learn_1788784801588', 'web', 'Web Development', 'beginner', 'Foundational', 24, 40, 60, 0, ARRAY['HTML/CSS', 'Basic JavaScript']::text[], ARRAY['Microservices', 'CI/CD']::text[], '[]'::jsonb, '2026-09-07T12:40:01.588Z'::timestamptz, '2026-09-07T12:40:01.588Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788784864571', 'stu_34_adv_1788784864571', 'session_know_stu_34_adv_1788784864571', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788784864571', 'stu_34_lrn_1788784864571', 'session_know_stu_34_lrn_1788784864571', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T12:41:04.572Z'::timestamptz, '2026-09-07T12:41:04.572Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788787784013', 'stu_34_adv_1788787784013', 'session_know_stu_34_adv_1788787784013', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788787784013', 'stu_34_lrn_1788787784013', 'session_know_stu_34_lrn_1788787784013', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T13:29:44.013Z'::timestamptz, '2026-09-07T13:29:44.013Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788787810448', 'stu_34_adv_1788787810448', 'session_know_stu_34_adv_1788787810448', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788787810448', 'stu_34_lrn_1788787810448', 'session_know_stu_34_lrn_1788787810448', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T13:30:10.448Z'::timestamptz, '2026-09-07T13:30:10.448Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788806285059', 'stu_34_adv_1788806285059', 'session_know_stu_34_adv_1788806285059', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788806285059', 'stu_34_lrn_1788806285059', 'session_know_stu_34_lrn_1788806285059', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T18:38:05.062Z'::timestamptz, '2026-09-07T18:38:05.062Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788806594421', 'stu_34_adv_1788806594421', 'session_know_stu_34_adv_1788806594421', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788806594421', 'stu_34_lrn_1788806594421', 'session_know_stu_34_lrn_1788806594421', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T18:43:14.421Z'::timestamptz, '2026-09-07T18:43:14.421Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788808155355', 'stu_34_adv_1788808155355', 'session_know_stu_34_adv_1788808155355', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788808155355', 'stu_34_lrn_1788808155355', 'session_know_stu_34_lrn_1788808155355', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T19:09:15.355Z'::timestamptz, '2026-09-07T19:09:15.355Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_adv_1788809444883', 'stu_34_adv_1788809444883', 'session_know_stu_34_adv_1788809444883', 'software-engineering', 'software-engineering', 'Advanced', 'Advanced', 9, 10, 90, 0, ARRAY['Python', 'SQL', 'React', 'TypeScript', 'REST APIs']::text[], ARRAY['Docker', 'Kubernetes']::text[], '[]'::jsonb, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('know_stu_34_lrn_1788809444883', 'stu_34_lrn_1788809444883', 'session_know_stu_34_lrn_1788809444883', 'software-engineering', 'software-engineering', 'Intermediate', 'Intermediate', 6, 10, 60, 0, ARRAY['JavaScript', 'HTML', 'CSS']::text[], ARRAY['Docker', 'AWS', 'SQL']::text[], '[]'::jsonb, '2026-09-07T19:30:44.883Z'::timestamptz, '2026-09-07T19:30:44.883Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;
INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES ('result_1788868517698_utl6p', '1ff7662b-94c3-4c76-ac2d-039c6116499b', 'ktest_1788868286638_bultf', 'security', 'Cybersecurity & Defense', 'advanced', 'Expert', 36, 40, 90, 163, ARRAY['Spectre Microarchitectural Flaw', 'Rop Dep Bypass', 'Kaslr Bypass Infoleak', 'Container Escape Privilege', 'Blind Time Based Sqli', 'Saml Xml Signature Wrapping', 'Krack Wpa2 Handshake', 'Post Quantum Lattice Crypto', 'Ebpf Telemetry Evasion']::text[], ARRAY['Imdsv2 Ssrf Mitigation']::text[], '[{"questionNumber":1,"questionText":"What underlying microarchitectural processor mechanism enables Spectre speculative execution side-channel attacks?","selectedOption":"Branch predictors executing instructions speculatively past bounds checks and leaving cache timing traces","correctOption":"Branch predictors executing instructions speculatively past bounds checks and leaving cache timing traces","isCorrect":true,"conceptTag":"Spectre Microarchitectural Flaw","complexity":"fundamental","explanation":"Spectre exploits speculative execution where CPUs predict branch targets and execute code before bounds checks complete. When squashed, cache state changes persist and leak data via timing attacks."},{"questionNumber":2,"questionText":"In modern binary exploitation, what is the primary purpose of Return-Oriented Programming (ROP)?","selectedOption":"To defeat Data Execution Prevention (W^X / DEP) by chaining existing executable instruction sequences ending in ret","correctOption":"To defeat Data Execution Prevention (W^X / DEP) by chaining existing executable instruction sequences ending in ret","isCorrect":true,"conceptTag":"Rop Dep Bypass","complexity":"application","explanation":"When memory regions are marked non-executable (DEP/NX), ROP circumvents this by reusing existing snippets of executable binary code (''gadgets'') ending in return instructions to build arbitrary logic."},{"questionNumber":3,"questionText":"How is Kernel Address Space Layout Randomization (KASLR) typically defeated during exploit development?","selectedOption":"By using an information leak vulnerability that reveals a kernel pointer to calculate the randomized base offset","correctOption":"By using an information leak vulnerability that reveals a kernel pointer to calculate the randomized base offset","isCorrect":true,"conceptTag":"Kaslr Bypass Infoleak","complexity":"application","explanation":"KASLR randomizes the base memory location of kernel code. Attackers leverage an information disclosure bug that leaks a known kernel function pointer to calculate the base slide offset."},{"questionNumber":4,"questionText":"In Kubernetes, which container configuration enables an attacker to perform a host node breakout?","selectedOption":"Running in privileged mode with hostPID and hostNetwork enabled or the host filesystem mounted read-write","correctOption":"Running in privileged mode with hostPID and hostNetwork enabled or the host filesystem mounted read-write","isCorrect":true,"conceptTag":"Container Escape Privilege","complexity":"application","explanation":"Privileged containers disable Linux cgroup and namespace isolation. Access to host devices or the root filesystem allows escape via chroot, device access, or cgroup release agent manipulation."},{"questionNumber":5,"questionText":"What condition permits an attacker to perform a Blind Time-Based SQL Injection attack against an API?","selectedOption":"The endpoint returns identical responses regardless of query results, but evaluates injected delay functions","correctOption":"The endpoint returns identical responses regardless of query results, but evaluates injected delay functions","isCorrect":true,"conceptTag":"Blind Time Based Sqli","complexity":"challenging","explanation":"When an application leaks no data or differential error messages, an attacker injects conditional time-delay commands (like pg_sleep or WAITFOR DELAY) to infer data bit-by-bit from response times."},{"questionNumber":6,"questionText":"In SAML 2.0 implementations, what design flaw enables XML Signature Wrapping (XSW) attacks?","selectedOption":"A mismatch between the XML node validated by the signature verifier and the node consumed by business logic","correctOption":"A mismatch between the XML node validated by the signature verifier and the node consumed by business logic","isCorrect":true,"conceptTag":"Saml Xml Signature Wrapping","complexity":"challenging","explanation":"XSW exploits architectural discrepancies where signature verification validates an intact assertion, while business logic retrieves user claims from an unsigned, wrapped element elsewhere in the DOM."},{"questionNumber":7,"questionText":"What cryptographic flaw made WPA2''s 4-way handshake vulnerable to Key Reinstallation Attacks (KRACK)?","selectedOption":"The client reinstalling an in-use pairwise key upon receiving retransmitted Message 3, resetting the packet counter","correctOption":"The client reinstalling an in-use pairwise key upon receiving retransmitted Message 3, resetting the packet counter","isCorrect":true,"conceptTag":"Krack Wpa2 Handshake","complexity":"challenging","explanation":"KRACK exploits Message 3 retransmission. When re-received, vulnerable clients reinstall the already active PTK and reset its transmit replay counter (nonce), enabling keystream reuse attacks."},{"questionNumber":8,"questionText":"Why is ML-KEM (Kyber) categorized as lattice-based post-quantum cryptography?","selectedOption":"Its security relies on high-dimensional lattice vector problems that cannot be solved efficiently by Shor''s algorithm","correctOption":"Its security relies on high-dimensional lattice vector problems that cannot be solved efficiently by Shor''s algorithm","isCorrect":true,"conceptTag":"Post Quantum Lattice Crypto","complexity":"challenging","explanation":"ML-KEM security reduces to the Module Learning with Errors (M-LWE) problem over high-dimensional lattices, which resists both classical algorithms and quantum attacks based on Shor''s algorithm."},{"questionNumber":9,"questionText":"In eBPF security observability tooling, how can a root-privileged adversary attempt to blind kernel telemetry?","selectedOption":"By detaching kernel tracepoints via bpf syscalls or flooding the ring buffer to induce massive unlogged event drops","correctOption":"By detaching kernel tracepoints via bpf syscalls or flooding the ring buffer to induce massive unlogged event drops","isCorrect":true,"conceptTag":"Ebpf Telemetry Evasion","complexity":"challenging","explanation":"An adversary with root or CAP_BPF can interact directly with the bpf() syscall to detach attached probes, corrupt BPF maps, or generate high-volume synthetic events to overflow ring buffers."},{"questionNumber":10,"questionText":"Which defense mechanism specifically protects cloud instance metadata endpoints (169.254.169.254) against SSRF?","selectedOption":"Configuring public DNS records to map internal private IP subnets to corporate reverse proxy load balancers","correctOption":"Enforcing IMDSv2 requiring session-oriented PUT requests with signed token headers alongside strict egress filtering","isCorrect":false,"conceptTag":"Imdsv2 Ssrf Mitigation","complexity":"challenging","explanation":"IMDSv2 requires clients to first execute a PUT request to generate a session token (which standard SSRF vectors cannot easily forge) before querying metadata, and sets token hop limits to block proxies."}]'::jsonb, '2026-09-08T11:55:17.699Z'::timestamptz, '2026-09-08T11:55:17.699Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;