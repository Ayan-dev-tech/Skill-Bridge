INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-sec-appsec-fundamentals', 'edu-owasp', 'OWASP Foundation Educational Resources', 'OWASP Application Security & Secure Coding Foundations', 'Deep dive into input sanitization, mitigation of OWASP Top 10 vulnerabilities, secure session tokens, and cryptographic identity storage.', 'https://owasp.org/www-project-top-ten/', ARRAY['security']::text[], ARRAY['app-sec', 'soc-threat']::text[], ARRAY['auth-identity', 'web-security', 'secure-coding', 'api-security', 'vuln-assessment']::text[], 'beginner', 'Online Self-Paced', '4 Weeks (4–6 hrs/wk)', 'Certificate of Completion', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-sec-openssf-dev', 'edu-openssf', 'Open Source Security Foundation (OpenSSF)', 'Developing Secure Software & Supply Chain Hardening (LFD121)', 'Comprehensive training on secure software design principles, input validation, avoiding buffer overflows and injection, and dependency auditing.', 'https://openssf.org/training/courses/', ARRAY['security', 'software']::text[], ARRAY['app-sec', 'cloud-sec', 'clean-code']::text[], ARRAY['secure-coding', 'auth-identity', 'crypto-foundations', 'code-smell-elimination', 'infra-as-code-sec']::text[], 'intermediate', 'Online Self-Paced', '6 Weeks (5 hrs/wk)', 'OpenSSF Verified Digital Badge', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-sec-soc-defense', 'edu-skillbridge-labs', 'Skill Bridge Open Labs (Sample Provider)', 'SOC Analyst Practical Incident Response & SIEM Analysis Lab', 'Hands-on interactive lab analyzing telemetry logs, configuring detection alert rules, triaging malware alerts, and generating incident reports.', 'https://github.com/skillbridge/soc-incident-lab', ARRAY['security']::text[], ARRAY['soc-threat', 'app-sec']::text[], ARRAY['siem-telemetry', 'incident-response', 'network-forensics', 'threat-intel', 'log-investigation', 'malware-triage']::text[], 'intermediate', 'Hands-on Lab', '3 Weeks (8 hrs/wk)', 'Practical Lab Completion Record', 'sample_provider', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-sec-cloud-zero-trust', 'edu-cncf', 'Cloud Native Computing Foundation (CNCF)', 'Cloud Native Security & Kubernetes Cluster Hardening', 'Master Kubernetes RBAC policies, container image signing, Pod security standards, zero-trust network policies, and runtime threat detection.', 'https://www.cncf.io/training/certification/cks/', ARRAY['security', 'cloud']::text[], ARRAY['cloud-sec', 'k8s-platform', 'cloud-infra']::text[], ARRAY['cloud-iam', 'k8s-hardening', 'cwpp-cspm', 'infra-as-code-sec', 'zero-trust-arch', 'k8s-pod-orchestration']::text[], 'advanced', 'Hands-on Lab', '8 Weeks (6 hrs/wk)', 'CKS Preparation Syllabus Certificate', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-sec-pentest-methodology', 'edu-skillbridge-labs', 'Skill Bridge Open Labs (Sample Provider)', 'Offensive Security & Ethical Penetration Testing Track', 'Step-by-step methodologies for network port scanning, service enumeration, Active Directory privilege escalation, and formal vulnerability disclosure.', 'https://github.com/skillbridge/pentest-foundations', ARRAY['security']::text[], ARRAY['pentest-red', 'app-sec']::text[], ARRAY['port-scanning', 'privilege-escalation', 'wireless-attacks', 'ad-exploitation', 'metasploit-foundations', 'report-generation', 'vuln-assessment']::text[], 'intermediate', 'Hands-on Lab', '5 Weeks (6 hrs/wk)', 'Red Team Lab Challenge Badge', 'sample_provider', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-aiml-applied-foundations', 'edu-deeplearning', 'Open Machine Learning & Deep Learning Initiative', 'Machine Learning Foundations & Supervised Algorithms', 'Mathematical intuition and Python implementation of linear/logistic regression, decision trees, cross-validation metrics, and feature engineering.', 'https://www.deeplearning.ai/courses/machine-learning-specialization/', ARRAY['ai-ml']::text[], ARRAY['applied-ml', 'edge-ai']::text[], ARRAY['supervised-learning', 'feature-engineering', 'model-evaluation', 'data-preprocessing', 'deep-learning-foundations', 'mlops-tracking']::text[], 'beginner', 'Online Self-Paced', '6 Weeks (5 hrs/wk)', 'Specialization Certificate', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-aiml-llm-rag-engineering', 'edu-deeplearning', 'Open Machine Learning & Deep Learning Initiative', 'Generative AI Systems & Vector RAG Architectures', 'Building production LLM applications: vector embeddings, chunking strategies, dense retrieval, prompt chaining, and evaluation harnesses.', 'https://www.deeplearning.ai/short-courses/', ARRAY['ai-ml']::text[], ARRAY['gen-ai-nlp', 'applied-ml']::text[], ARRAY['transformer-arch', 'text-embeddings', 'fine-tuning-peft', 'tokenization-vocab', 'rag-pipelines', 'hallucination-mitigation']::text[], 'intermediate', 'Interactive Cohort', '4 Weeks (6 hrs/wk)', 'Generative AI Practitioner Badge', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-aiml-cv-deep-learning', 'edu-skillbridge-labs', 'Skill Bridge Open Labs (Sample Provider)', 'Computer Vision with PyTorch: From CNNs to Segmentation', 'Practical computer vision pipelines covering convolutional networks, YOLO object detection, transfer learning, and latency optimization.', 'https://github.com/skillbridge/computer-vision-pytorch', ARRAY['ai-ml']::text[], ARRAY['cv-imaging', 'applied-ml', 'edge-ai']::text[], ARRAY['cnn-architectures', 'object-detection', 'image-segmentation', 'image-augmentation', 'transfer-learning-vision', 'inference-acceleration']::text[], 'intermediate', 'Hands-on Lab', '5 Weeks (5 hrs/wk)', 'Vision Lab Completion Certificate', 'sample_provider', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-aiml-edge-inference', 'edu-linux-foundation', 'Linux Foundation Training & Education', 'Edge AI & Low-Power Neural Network Optimization', 'Deploy deep learning models on constrained hardware using ONNX runtimes, post-training INT8 quantization, and hardware acceleration.', 'https://training.linuxfoundation.org/training/ai-edge/', ARRAY['ai-ml']::text[], ARRAY['edge-ai', 'applied-ml']::text[], ARRAY['model-quantization', 'onnx-runtimes', 'tensorrt-optimization', 'edge-tpu-deployment', 'latency-profiling', 'pruning-sparsity']::text[], 'advanced', 'Online Self-Paced', '6 Weeks (4 hrs/wk)', 'Edge Systems Specialist Certificate', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-cloud-k8s-core', 'edu-cncf', 'Cloud Native Computing Foundation (CNCF)', 'Kubernetes Administration & Cloud Native Architecture', 'Core Kubernetes constructs: pods, deployments, statefulsets, cluster networking, Helm chart authoring, and declarative GitOps pipelines.', 'https://www.cncf.io/training/certification/cka/', ARRAY['cloud']::text[], ARRAY['k8s-platform', 'cloud-infra', 'sre-ops']::text[], ARRAY['k8s-pod-orchestration', 'ingress-networking', 'helm-packaging', 'service-mesh', 'container-cgroups', 'gitops-argocd']::text[], 'intermediate', 'Hands-on Lab', '8 Weeks (6 hrs/wk)', 'CKA Aligned Curriculum Certificate', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-cloud-iac-terraform', 'edu-linux-foundation', 'Linux Foundation Training & Education', 'Infrastructure as Code with Terraform & Multi-Cloud CI/CD', 'Modular cloud architecture with Terraform, remote state locking, drift detection, immutable server images, and automated compliance policies.', 'https://training.linuxfoundation.org/training/terraform-infrastructure/', ARRAY['cloud']::text[], ARRAY['cloud-infra', 'hybrid-multi', 'sre-ops']::text[], ARRAY['terraform-state', 'hcl-modularization', 'ansible-automation', 'immutable-infrastructure', 'drift-detection', 'cloudformation-foundations']::text[], 'beginner', 'Online Self-Paced', '4 Weeks (5 hrs/wk)', 'Certificate of Achievement', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-cloud-sre-observability', 'edu-skillbridge-labs', 'Skill Bridge Open Labs (Sample Provider)', 'Site Reliability Engineering (SRE) & Observability Masterclass', 'Prometheus metrics instrumentation, Grafana dashboard creation, distributed trace propagation with OpenTelemetry, and error budget calculation.', 'https://github.com/skillbridge/sre-observability-course', ARRAY['cloud', 'software']::text[], ARRAY['sre-ops', 'api-backend', 'k8s-platform']::text[], ARRAY['distributed-tracing', 'prometheus-alerting', 'grafana-dashboarding', 'chaos-engineering', 'slo-sli-budgeting', 'root-cause-analysis']::text[], 'intermediate', 'Interactive Cohort', '5 Weeks (4 hrs/wk)', 'SRE Foundations Badge', 'sample_provider', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-web-modern-frontend', 'edu-skillbridge-labs', 'Skill Bridge Open Labs (Sample Provider)', 'Modern React Architecture & Component Systems', 'Build production-grade applications using React Server Components, state machines, accessible WAI-ARIA widgets, and responsive tokenized styling.', 'https://github.com/skillbridge/modern-frontend-curriculum', ARRAY['web']::text[], ARRAY['frontend-arch', 'web-perf']::text[], ARRAY['react-server-components', 'state-machines', 'hydration-tuning', 'accessible-ui-wai-aria', 'tailwind-design-tokens', 'nextjs-app-router']::text[], 'intermediate', 'Hands-on Lab', '6 Weeks (5 hrs/wk)', 'Frontend Architecture Certificate', 'sample_provider', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-web-api-backend', 'edu-owasp', 'OWASP Foundation Educational Resources', 'High-Performance REST & GraphQL API Engineering', 'Design resilient backend web APIs: database indexing, connection pooling, Redis distributed caching, rate-limiting, and schema validation.', 'https://owasp.org/www-project-api-security/', ARRAY['web', 'software']::text[], ARRAY['backend-services', 'api-backend', 'distributed-web']::text[], ARRAY['rest-api-design', 'relational-indexing', 'distributed-caching', 'async-queues', 'database-migrations', 'api-rate-limiting', 'api-security']::text[], 'intermediate', 'Online Self-Paced', '5 Weeks (6 hrs/wk)', 'API Systems Specialist Certificate', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-web-perf-core-vitals', 'edu-skillbridge-labs', 'Skill Bridge Open Labs (Sample Provider)', 'Web Performance Engineering & Core Web Vitals Optimization', 'Diagnose and optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), JavaScript bundle splitting, and browser cache strategies.', 'https://github.com/skillbridge/web-performance-lab', ARRAY['web']::text[], ARRAY['web-perf', 'frontend-arch']::text[], ARRAY['interaction-to-next-paint', 'largest-contentful-paint', 'dom-size-reduction', 'tree-shaking-bundling', 'browser-cache-strategies', 'memory-leak-profiling']::text[], 'advanced', 'Online Self-Paced', '3 Weeks (4 hrs/wk)', 'Performance Optimization Lab Badge', 'sample_provider', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-soft-clean-code-refactoring', 'edu-linux-foundation', 'Linux Foundation Training & Education', 'Clean Code Engineering, SOLID Principles & Refactoring Patterns', 'Transform legacy software into maintainable architectures. Eliminate code smells, minimize cyclomatic complexity, and adhere to SOLID principles.', 'https://training.linuxfoundation.org/training/clean-code-practices/', ARRAY['software']::text[], ARRAY['clean-code', 'sys-arch', 'test-eng']::text[], ARRAY['cyclomatic-complexity', 'extract-method-refactoring', 'antipattern-detection', 'dry-solid-adherence', 'legacy-characterization-tests', 'code-smell-elimination']::text[], 'beginner', 'Online Self-Paced', '4 Weeks (4 hrs/wk)', 'Clean Code Practitioner Certificate', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-soft-tdd-test-automation', 'edu-skillbridge-labs', 'Skill Bridge Open Labs (Sample Provider)', 'Test-Driven Development (TDD) & Automated Testing Pipelines', 'Master unit test isolation, mocking strategies, contract testing with Pact, and mutation testing to eliminate subtle software regressions.', 'https://github.com/skillbridge/tdd-test-automation', ARRAY['software', 'web']::text[], ARRAY['test-eng', 'clean-code', 'backend-services']::text[], ARRAY['unit-test-isolation', 'mocking-stubbing', 'test-driven-development', 'mutation-testing', 'contract-testing-pact', 'code-coverage-analysis']::text[], 'intermediate', 'Hands-on Lab', '4 Weeks (6 hrs/wk)', 'Test Engineering Certificate', 'sample_provider', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;
INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES ('prog-soft-distributed-systems', 'edu-linux-foundation', 'Linux Foundation Training & Education', 'Distributed Systems Architecture & Resilient Microservices', 'Domain-Driven Design (DDD), hexagonal architectures, event sourcing, distributed consensus mechanisms, and fault-tolerant communication.', 'https://training.linuxfoundation.org/training/distributed-systems-design/', ARRAY['software', 'cloud']::text[], ARRAY['sys-arch', 'distributed-web', 'cloud-infra']::text[], ARRAY['microservices-boundaries', 'domain-driven-design', 'hexagonal-architecture', 'api-versioning-contracts', 'cqrs-event-sourcing', 'distributed-consensus', 'distributed-tracing']::text[], 'advanced', 'Interactive Cohort', '8 Weeks (6 hrs/wk)', 'Advanced Systems Architect Certificate', 'external_opportunity', TRUE, '2026-01-15T00:00:00.000Z'::timestamptz, '2026-03-01T00:00:00.000Z'::timestamptz)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;