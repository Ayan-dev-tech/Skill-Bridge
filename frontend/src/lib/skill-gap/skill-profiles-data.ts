/**
 * Skill Bridge — Comprehensive Target Skill Profiles Catalog
 * Extensible matrix connecting technical domains & niches to required industry competencies
 * and mapped Knowledge Test concept tags.
 */

import { TargetSkillProfile } from "./types";

export const TARGET_SKILL_PROFILES: Record<string, TargetSkillProfile> = {
  // ==========================================================================
  // 1. CYBERSECURITY & DEFENSE
  // ==========================================================================
  "app-sec": {
    nicheId: "app-sec",
    nicheTitle: "Application Security & Vulnerability Research",
    domainId: "security",
    domainName: "Cybersecurity & Defense",
    version: "1.0",
    description:
      "Core capabilities required to audit source code, identify input validation weaknesses, and harden production APIs.",
    requiredSkills: [
      {
        skillId: "auth-identity",
        skillName: "Authentication & Identity Management",
        category: "Identity & Access",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Multi-factor verification, cryptographic session tokens, JWT structure validation, and secure cookie storage.",
        relatedConceptTags: [
          "mfa-principles",
          "jwt-structure",
          "session-tokens",
          "oauth2-grant-types",
          "password-hashing",
        ],
      },
      {
        skillId: "web-security",
        skillName: "Web Security & OWASP Top 10",
        category: "Threat Mitigation",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Identifying and mitigating injection vulnerabilities (SQLi, NoSQLi), cross-site scripting (XSS), and CSRF.",
        relatedConceptTags: [
          "sql-injection",
          "stored-xss",
          "csrf-tokens",
          "same-origin-policy",
          "content-security-policy",
        ],
      },
      {
        skillId: "secure-coding",
        skillName: "Secure Coding & Input Sanitization",
        category: "Software Hardening",
        importance: "essential",
        targetLevel: "Proficient",
        description:
          "Defensive programming, parameterized queries, strict schema validation, and memory safety checks.",
        relatedConceptTags: [
          "input-validation",
          "parameterized-queries",
          "buffer-overflow",
          "type-confusion",
          "deserialization-flaws",
        ],
      },
      {
        skillId: "api-security",
        skillName: "API Security & Rate Limiting",
        category: "Architecture",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Enforcing broken object-level authorization (BOLA) defenses, token expiry, and gateway throttling.",
        relatedConceptTags: [
          "bola-mitigation",
          "rate-limiting",
          "cors-configuration",
          "api-gateway-auth",
        ],
      },
      {
        skillId: "vuln-assessment",
        skillName: "Vulnerability Research & Threat Modeling",
        category: "Analysis",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Deconstructing software attack surfaces, CVSS scoring, and root-cause remediation.",
        relatedConceptTags: [
          "threat-modeling",
          "cvss-metrics",
          "static-analysis",
          "dynamic-analysis",
        ],
      },
      {
        skillId: "cryptography-basics",
        skillName: "Applied Cryptography & TLS",
        category: "Cryptographic Controls",
        importance: "recommended",
        targetLevel: "Strong Foundation",
        description:
          "Symmetric vs. asymmetric cipher selection, digital certificates, and transport layer security.",
        relatedConceptTags: [
          "symmetric-vs-asymmetric",
          "tls-handshake",
          "public-key-infrastructure",
          "hashing-algorithms",
        ],
      },
    ],
  },

  "soc-threat": {
    nicheId: "soc-threat",
    nicheTitle: "Network Defense & Threat Operations (SOC)",
    domainId: "security",
    domainName: "Cybersecurity & Defense",
    version: "1.0",
    description:
      "Operational competencies required to monitor intrusion signals, analyze packet captures, and coordinate incident triage.",
    requiredSkills: [
      {
        skillId: "network-traffic",
        skillName: "Network Traffic & Packet Analysis",
        category: "Network Defense",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Deep packet inspection, protocol disassembly (TCP/IP, DNS, TLS), and anomaly egress detection.",
        relatedConceptTags: [
          "tcp-handshake",
          "dns-tunnels",
          "firewall-basics",
          "packet-inspection",
          "pcap-analysis",
        ],
      },
      {
        skillId: "siem-telemetry",
        skillName: "Log Telemetry & SIEM Triage",
        category: "Operations",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Correlating auth logs, syslog streams, and security event indicators across endpoint agents.",
        relatedConceptTags: [
          "siem-correlation",
          "event-log-analysis",
          "syslog-parsing",
          "auditd-telemetry",
        ],
      },
      {
        skillId: "incident-response",
        skillName: "Incident Containment & Response",
        category: "Incident Management",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Executing containment playbooks, forensic isolation, and root-cause incident documentation.",
        relatedConceptTags: [
          "containment-strategies",
          "evidence-preservation",
          "incident-lifecycle",
          "playbook-execution",
        ],
      },
      {
        skillId: "intrusion-detection",
        skillName: "Intrusion Detection & Suricata/Snort Rules",
        category: "Detection Engineering",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Configuring signature-based and anomaly-based IDS/IPS sensors across perimeter ingress.",
        relatedConceptTags: [
          "snort-rules",
          "ids-vs-ips",
          "signature-matching",
          "behavioral-heuristics",
        ],
      },
      {
        skillId: "malware-triage",
        skillName: "Malware Behavioral Triage",
        category: "Threat Analysis",
        importance: "recommended",
        targetLevel: "Developing",
        description:
          "Dynamic sandbox analysis, persistence mechanism identification, and indicator extraction (IoCs).",
        relatedConceptTags: [
          "iocs-extraction",
          "sandbox-analysis",
          "persistence-mechanisms",
          "ransomware-indicators",
        ],
      },
    ],
  },

  "pentest-offensive": {
    nicheId: "pentest-offensive",
    nicheTitle: "Penetration Testing & Red Teaming",
    domainId: "security",
    domainName: "Cybersecurity & Defense",
    version: "1.0",
    description:
      "Offensive tactics, vulnerability chain exploitation, privilege escalation, and black-box security auditing.",
    requiredSkills: [
      {
        skillId: "web-exploitation",
        skillName: "Web Application Penetration Testing",
        category: "Exploitation",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Auditing client/server interfaces, blind SQL injection, server-side template injection (SSTI), and SSRF.",
        relatedConceptTags: [
          "blind-sqli",
          "ssrf-exploitation",
          "xxe-injection",
          "ssti-flaws",
          "jwt-tampering",
        ],
      },
      {
        skillId: "priv-esc",
        skillName: "Privilege Escalation & OS Security",
        category: "Post-Exploitation",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Exploiting misconfigured SUID binaries, kernel vulnerabilities, and Windows token impersonation.",
        relatedConceptTags: [
          "suid-misconfiguration",
          "sudo-privileges",
          "token-impersonation",
          "service-permissions",
        ],
      },
      {
        skillId: "recon-enumeration",
        skillName: "Reconnaissance & Service Enumeration",
        category: "Information Gathering",
        importance: "essential",
        targetLevel: "Proficient",
        description:
          "Active/passive network scanning (Nmap), banner grabbing, sub-domain discovery, and ASN mapping.",
        relatedConceptTags: [
          "port-scanning",
          "nmap-flags",
          "dns-enumeration",
          "subdomain-takeover",
        ],
      },
      {
        skillId: "network-pivoting",
        skillName: "Network Pivoting & Lateral Movement",
        category: "Tactics",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "SSH port forwarding, SOCKS proxy tunneling, and Active Directory Kerberos delegation abuse.",
        relatedConceptTags: [
          "ssh-tunneling",
          "socks-proxies",
          "kerberoasting",
          "pass-the-hash",
        ],
      },
      {
        skillId: "exploit-dev",
        skillName: "Exploit Modification & Scripting",
        category: "Development",
        importance: "recommended",
        targetLevel: "Developing",
        description:
          "Customizing proof-of-concept scripts in Python/Bash to bypass defensive filters.",
        relatedConceptTags: [
          "buffer-overflow",
          "shellcode-execution",
          "waf-evasion",
          "poc-scripting",
        ],
      },
    ],
  },

  "cloud-iam": {
    nicheId: "cloud-iam",
    nicheTitle: "Cloud Security Architecture & Zero-Trust IAM",
    domainId: "security",
    domainName: "Cybersecurity & Defense",
    version: "1.0",
    description:
      "Enterprise cloud posture governance, least-privilege identity access management, and infrastructure zero-trust controls.",
    requiredSkills: [
      {
        skillId: "iam-least-privilege",
        skillName: "IAM Policy Design & Least Privilege",
        category: "Identity Governance",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Constructing restrictive JSON IAM policies, role assumption boundaries, and service principal isolation.",
        relatedConceptTags: [
          "iam-role-assumption",
          "least-privilege",
          "permission-boundaries",
          "service-accounts",
        ],
      },
      {
        skillId: "zero-trust-arch",
        skillName: "Zero-Trust Architecture",
        category: "Cloud Architecture",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Continuous verification, device posture gating, micro-segmentation, and ephemeral credentials.",
        relatedConceptTags: [
          "continuous-verification",
          "micro-segmentation",
          "ephemeral-tokens",
          "mutual-tls",
        ],
      },
      {
        skillId: "cloud-storage-security",
        skillName: "Cloud Storage & Database Encryption",
        category: "Data Security",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Enforcing envelope encryption with KMS, preventing public bucket exposure, and database at-rest encryption.",
        relatedConceptTags: [
          "kms-envelope-encryption",
          "bucket-policies",
          "data-at-rest-encryption",
          "key-rotation",
        ],
      },
      {
        skillId: "cloud-compliance",
        skillName: "Cloud Security Posture & Compliance",
        category: "Governance",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Automated audit compliance (SOC2, ISO27001), drift detection, and cloud trail monitoring.",
        relatedConceptTags: [
          "cloudtrail-auditing",
          "drift-detection",
          "security-benchmarks",
          "compliance-rules",
        ],
      },
    ],
  },

  // ==========================================================================
  // 2. AI / MACHINE LEARNING
  // ==========================================================================
  "cv-deeplearning": {
    nicheId: "cv-deeplearning",
    nicheTitle: "Computer Vision & Deep Learning Engineering",
    domainId: "ai-ml",
    domainName: "AI / Machine Learning",
    version: "1.0",
    description:
      "Designing convolutional and attention backbones for visual recognition, image segmentation, and edge model inference.",
    requiredSkills: [
      {
        skillId: "neural-architectures",
        skillName: "Neural Architecture Design (CNNs & ViTs)",
        category: "Deep Learning",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Building multi-layer convolutional networks, residual skip connections, and vision transformer tokenization.",
        relatedConceptTags: [
          "convolution-kernel",
          "residual-connections",
          "vision-transformer",
          "pooling-layers",
        ],
      },
      {
        skillId: "image-preprocessing",
        skillName: "Image Preprocessing & Augmentation",
        category: "Data Engineering",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Geometric transforms, photometric normalizations, cutout augmentation, and tensor batch pipelines.",
        relatedConceptTags: [
          "image-normalization",
          "affine-transforms",
          "tensor-broadcasting",
          "batch-augmentation",
        ],
      },
      {
        skillId: "model-optimization",
        skillName: "Model Training & Optimization",
        category: "Model Engineering",
        importance: "essential",
        targetLevel: "Proficient",
        description:
          "Adaptive optimizers (AdamW), learning rate schedules, gradient clipping, and regularization (Dropout).",
        relatedConceptTags: [
          "adamw-optimizer",
          "learning-rate-decay",
          "dropout-regularization",
          "gradient-clipping",
        ],
      },
      {
        skillId: "loss-functions",
        skillName: "Loss Functions & Evaluation Metrics",
        category: "Evaluation",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Cross-entropy vs focal loss, IoU calculation, precision-recall curves, and mAP evaluation.",
        relatedConceptTags: [
          "focal-loss",
          "iou-calculation",
          "map-evaluation",
          "confusion-matrix",
        ],
      },
      {
        skillId: "edge-inference",
        skillName: "Edge Model Deployment & Quantization",
        category: "Deployment",
        importance: "recommended",
        targetLevel: "Developing",
        description:
          "ONNX export, INT8 post-training quantization, and low-latency inference runtimes (TensorRT).",
        relatedConceptTags: [
          "int8-quantization",
          "onnx-runtime",
          "tensorrt-optimization",
          "edge-compilation",
        ],
      },
    ],
  },

  "nlp-llm": {
    nicheId: "nlp-llm",
    nicheTitle: "Language Models & Applied NLP Systems",
    domainId: "ai-ml",
    domainName: "AI / Machine Learning",
    version: "1.0",
    description:
      "Core competencies in tokenization, dense semantic embeddings, transformer self-attention, and RAG pipelines.",
    requiredSkills: [
      {
        skillId: "tokenization-embeddings",
        skillName: "Tokenization & Word Embeddings",
        category: "NLP Foundations",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Byte-Pair Encoding (BPE), SentencePiece, dense vector embeddings, and cosine similarity calculations.",
        relatedConceptTags: [
          "bpe-tokenization",
          "vector-embeddings",
          "cosine-similarity",
          "vocab-size-tradeoffs",
        ],
      },
      {
        skillId: "transformer-attention",
        skillName: "Transformer Attention Mechanisms",
        category: "Architecture",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Scaled dot-product attention, multi-head projections, positional encoding, and decoder autoregression.",
        relatedConceptTags: [
          "scaled-dot-product",
          "multi-head-attention",
          "positional-encoding",
          "kv-caching",
        ],
      },
      {
        skillId: "rag-pipelines",
        skillName: "Retrieval-Augmented Generation (RAG)",
        category: "Applied Systems",
        importance: "essential",
        targetLevel: "Proficient",
        description:
          "Semantic chunking, dense vector retrieval, hybrid BM25 search, cross-encoder re-ranking, and hallucination reduction.",
        relatedConceptTags: [
          "semantic-chunking",
          "vector-indexing",
          "hybrid-search",
          "cross-encoder-reranking",
        ],
      },
      {
        skillId: "prompt-finetuning",
        skillName: "Prompt Engineering & LoRA Fine-Tuning",
        category: "Tuning & Adaptation",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Structured output generation, few-shot prompting, parameter-efficient fine-tuning (LoRA), and dataset curation.",
        relatedConceptTags: [
          "structured-json-prompting",
          "lora-adapters",
          "instruction-tuning",
          "system-prompts",
        ],
      },
      {
        skillId: "llm-evaluation",
        skillName: "LLM Evaluation & Guardrails",
        category: "Safety & Reliability",
        importance: "recommended",
        targetLevel: "Developing",
        description:
          "BLEU/ROUGE metrics, LLM-as-a-judge benchmarking, prompt injection defenses, and moderation filters.",
        relatedConceptTags: [
          "prompt-injection-defense",
          "llm-judge-benchmarking",
          "hallucination-detection",
          "safety-guardrails",
        ],
      },
    ],
  },

  "mlops": {
    nicheId: "mlops",
    nicheTitle: "MLOps & Production ML Infrastructure",
    domainId: "ai-ml",
    domainName: "AI / Machine Learning",
    version: "1.0",
    description:
      "Bridging machine learning models with reliable production pipelines, automated retraining, and low-latency inference.",
    requiredSkills: [
      {
        skillId: "model-versioning",
        skillName: "Model Registry & Artifact Versioning",
        category: "ML Governance",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Tracking training hyper-parameters, data lineage, and model artifacts with MLflow or DVC.",
        relatedConceptTags: [
          "mlflow-tracking",
          "data-lineage",
          "model-registry",
          "reproducible-training",
        ],
      },
      {
        skillId: "pipeline-orchestration",
        skillName: "ML Pipeline Orchestration",
        category: "Pipelines",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Authoring DAGs, step caching, and dependency management with Airflow, Kubeflow, or Prefect.",
        relatedConceptTags: [
          "airflow-dags",
          "kubeflow-pipelines",
          "step-caching",
          "distributed-runs",
        ],
      },
      {
        skillId: "model-serving",
        skillName: "Low-Latency Model Serving",
        category: "Infrastructure",
        importance: "essential",
        targetLevel: "Proficient",
        description:
          "Containerized model servers (Triton, TorchServe), dynamic batching, and gRPC streaming inference.",
        relatedConceptTags: [
          "triton-inference",
          "dynamic-batching",
          "grpc-streaming",
          "gpu-concurrency",
        ],
      },
      {
        skillId: "drift-monitoring",
        skillName: "Data Drift & Performance Monitoring",
        category: "Observability",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Statistical distribution checks (KS-test, PSI), prediction latency tracking, and automated retraining triggers.",
        relatedConceptTags: [
          "ks-test-drift",
          "population-stability-index",
          "retraining-triggers",
          "prediction-latency",
        ],
      },
    ],
  },

  "data-eng": {
    nicheId: "data-eng",
    nicheTitle: "Large-Scale Data Engineering & Analytics",
    domainId: "ai-ml",
    domainName: "AI / Machine Learning",
    version: "1.0",
    description:
      "Architecting distributed ETL transformations, lakehouse storage formats, and real-time streaming telemetry.",
    requiredSkills: [
      {
        skillId: "distributed-processing",
        skillName: "Distributed Data Processing (Apache Spark)",
        category: "Big Data",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "RDD vs DataFrame APIs, lazy evaluation, partition shuffles, and broadcast joins.",
        relatedConceptTags: [
          "spark-dataframes",
          "lazy-evaluation",
          "shuffle-partitions",
          "broadcast-joins",
        ],
      },
      {
        skillId: "streaming-pipelines",
        skillName: "Real-Time Streaming (Apache Kafka)",
        category: "Event Streaming",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Partition offsets, consumer groups, exactly-once processing semantics, and schema registries.",
        relatedConceptTags: [
          "kafka-partitions",
          "consumer-groups",
          "exactly-once-semantics",
          "avro-schema-registry",
        ],
      },
      {
        skillId: "lakehouse-architecture",
        skillName: "Data Lakehouse & Storage (Parquet / Iceberg)",
        category: "Storage Architecture",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Columnar storage layouts, predicate pushdown, ACID table transactions, and time-travel querying.",
        relatedConceptTags: [
          "parquet-compression",
          "predicate-pushdown",
          "iceberg-acid-tables",
          "time-travel-queries",
        ],
      },
      {
        skillId: "sql-data-modeling",
        skillName: "Advanced SQL & Dimensional Modeling",
        category: "Data Modeling",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Star/snowflake schemas, window functions, slow changing dimensions (SCD), and query plan execution trees.",
        relatedConceptTags: [
          "window-functions",
          "star-schema-design",
          "scd-type-2",
          "query-plan-profiling",
        ],
      },
    ],
  },

  // ==========================================================================
  // 3. CLOUD & INFRASTRUCTURE
  // ==========================================================================
  "sre-reliability": {
    nicheId: "sre-reliability",
    nicheTitle: "Site Reliability Engineering (SRE)",
    domainId: "cloud",
    domainName: "Cloud & Infrastructure",
    version: "1.0",
    description:
      "Principles of high availability, error budgeting, distributed observability, and resilient failover automation.",
    requiredSkills: [
      {
        skillId: "observability-metrics",
        skillName: "Distributed Observability (Prometheus & OpenTelemetry)",
        category: "Monitoring",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Metric collection, distributed trace propagation, Prometheus PromQL queries, and alerting thresholds.",
        relatedConceptTags: [
          "promql-queries",
          "trace-propagation",
          "opentelemetry-collector",
          "alertmanager-routing",
        ],
      },
      {
        skillId: "slos-error-budgets",
        skillName: "SLIs, SLOs & Error Budgets",
        category: "Reliability Engineering",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Defining user-centric service level objectives, burn rate alerts, and error budget governance.",
        relatedConceptTags: [
          "sli-slo-definition",
          "error-budget-burn",
          "burn-rate-alerts",
          "availability-math",
        ],
      },
      {
        skillId: "incident-postmortems",
        skillName: "Incident Management & Blameless Postmortems",
        category: "Operations",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Conducting blameless root cause analyses, timeline reconstruction, and automated mitigation playbooks.",
        relatedConceptTags: [
          "blameless-postmortems",
          "timeline-reconstruction",
          "action-items-tracking",
          "oncall-escalations",
        ],
      },
      {
        skillId: "chaos-engineering",
        skillName: "Chaos Engineering & Failover Testing",
        category: "Resilience",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Simulating pod terminations, network partitions, degraded dependencies, and circuit breaking validation.",
        relatedConceptTags: [
          "chaos-injection",
          "circuit-breaking",
          "canary-deployments",
          "graceful-degradation",
        ],
      },
    ],
  },

  "devops-cicd": {
    nicheId: "devops-cicd",
    nicheTitle: "DevOps & Infrastructure Automation",
    domainId: "cloud",
    domainName: "Cloud & Infrastructure",
    version: "1.0",
    description:
      "Declarative infrastructure as code, container orchestration, automated build/test pipelines, and GitOps workflows.",
    requiredSkills: [
      {
        skillId: "iac-terraform",
        skillName: "Infrastructure as Code (Terraform)",
        category: "Automation",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "HCL syntax, state file locking, modular resource composition, and drift reconciliation.",
        relatedConceptTags: [
          "terraform-state-locking",
          "hcl-modules",
          "resource-dependencies",
          "drift-reconciliation",
        ],
      },
      {
        skillId: "containers-k8s",
        skillName: "Containerization & Kubernetes Architecture",
        category: "Orchestration",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Pod lifecycles, Ingress controllers, ConfigMaps/Secrets, ReplicaSets, and resource quota limits.",
        relatedConceptTags: [
          "pod-lifecycle",
          "ingress-routing",
          "configmap-secrets",
          "resource-limits-requests",
        ],
      },
      {
        skillId: "cicd-automation",
        skillName: "CI/CD Pipeline Automation (GitHub Actions / GitLab)",
        category: "Continuous Integration",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Multi-stage build pipelines, matrix testing, artifact publishing, and automated deployment approvals.",
        relatedConceptTags: [
          "github-actions-syntax",
          "matrix-builds",
          "artifact-caching",
          "pipeline-security",
        ],
      },
      {
        skillId: "gitops-argo",
        skillName: "GitOps & Declarative Sync (ArgoCD)",
        category: "Deployment Strategy",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Automated Git-to-cluster synchronization, rollout strategies, and declarative configuration governance.",
        relatedConceptTags: [
          "argocd-sync-hooks",
          "git-single-source-of-truth",
          "blue-green-rollouts",
          "helm-charts",
        ],
      },
    ],
  },

  "cloud-arch": {
    nicheId: "cloud-arch",
    nicheTitle: "Cloud Solutions Architecture",
    domainId: "cloud",
    domainName: "Cloud & Infrastructure",
    version: "1.0",
    description:
      "High-level distributed cloud primitives, multi-region database replication, VPC routing, and cost optimization.",
    requiredSkills: [
      {
        skillId: "ha-topology",
        skillName: "High-Availability & Multi-Region Topology",
        category: "Architecture",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Active-active vs active-passive architectures, global load balancing, and DNS failover policies.",
        relatedConceptTags: [
          "active-active-failover",
          "global-load-balancing",
          "rpo-rto-targets",
          "multi-az-resilience",
        ],
      },
      {
        skillId: "cloud-networking",
        skillName: "Cloud VPC Networking & Routing",
        category: "Networking",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Subnet CIDR blocks, VPC peering, NAT gateways, route tables, and Transit Gateways.",
        relatedConceptTags: [
          "vpc-peering",
          "nat-gateway-routing",
          "cidr-subnet-design",
          "transit-gateway",
        ],
      },
      {
        skillId: "cloud-cost-optimization",
        skillName: "Cloud Cost Optimization & FinOps",
        category: "Financial Engineering",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Reserved instances, spot fleet management, storage lifecycle tiers, and resource rightsizing.",
        relatedConceptTags: [
          "spot-instances",
          "lifecycle-policies",
          "compute-rightsizing",
          "finops-tagging",
        ],
      },
    ],
  },

  "serverless-edge": {
    nicheId: "serverless-edge",
    nicheTitle: "Serverless & Distributed Edge Systems",
    domainId: "cloud",
    domainName: "Cloud & Infrastructure",
    version: "1.0",
    description:
      "Event-driven micro-functions, edge computing, global caching fabrics, and asynchronous event streaming.",
    requiredSkills: [
      {
        skillId: "serverless-functions",
        skillName: "Event-Driven Serverless Compute (Lambda/Cloud Functions)",
        category: "Serverless",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Stateless function lifecycles, cold-start mitigation, concurrency limits, and event trigger bindings.",
        relatedConceptTags: [
          "cold-start-mitigation",
          "event-triggers",
          "concurrency-limits",
          "idempotency-handling",
        ],
      },
      {
        skillId: "edge-cdn-routing",
        skillName: "Edge Computing & Global CDN Fabrics",
        category: "Edge Routing",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Edge workers, geo-distributed cache headers, TLS termination, and origin request rewriting.",
        relatedConceptTags: [
          "edge-workers",
          "cache-control-headers",
          "tls-termination",
          "geo-routing",
        ],
      },
      {
        skillId: "event-queues",
        skillName: "Message Queues & Event Streaming",
        category: "Asynchronous Design",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Decoupling workloads with SQS, EventBridge, dead-letter queues (DLQ), and fan-out notifications.",
        relatedConceptTags: [
          "dead-letter-queues",
          "event-bridge-routing",
          "sqs-polling",
          "fifo-queue-dedup",
        ],
      },
    ],
  },

  // ==========================================================================
  // 4. WEB & FULL-STACK SYSTEMS
  // ==========================================================================
  "frontend-arch": {
    nicheId: "frontend-arch",
    nicheTitle: "Frontend Architecture & Interactive UX Engineering",
    domainId: "web",
    domainName: "Web & Full-Stack Systems",
    version: "1.0",
    description:
      "Modern reactive web applications, component lifecycle design, accessible design systems, and client performance.",
    requiredSkills: [
      {
        skillId: "react-state-lifecycle",
        skillName: "React Component Lifecycle & State Management",
        category: "Frontend Architecture",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Hooks mechanics, memoization (useMemo/useCallback), context performance, and reconciliation rules.",
        relatedConceptTags: [
          "react-hooks-rules",
          "usememo-usecallback",
          "virtual-dom-reconciliation",
          "state-immutability",
        ],
      },
      {
        skillId: "typescript-strict",
        skillName: "Strict TypeScript & Type Safety",
        category: "Language Core",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Generics, utility types, discriminating unions, type guards, and compile-time contract enforcement.",
        relatedConceptTags: [
          "discriminating-unions",
          "typescript-generics",
          "type-guards",
          "interface-vs-type",
        ],
      },
      {
        skillId: "design-systems-a11y",
        skillName: "Design Systems & Web Accessibility (WCAG)",
        category: "UI & Accessibility",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "ARIA attributes, keyboard navigation focus traps, color contrast, and tokenized CSS systems.",
        relatedConceptTags: [
          "aria-semantics",
          "focus-management",
          "contrast-ratios",
          "tokenized-styling",
        ],
      },
      {
        skillId: "browser-dom-perf",
        skillName: "DOM Rendering & Client Performance",
        category: "Performance",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Reflows/repaints, virtualized lists, debounced user inputs, and code-splitting lazy bundles.",
        relatedConceptTags: [
          "reflow-repaint-triggers",
          "virtualized-scrolling",
          "debounce-throttle",
          "code-splitting-lazy",
        ],
      },
    ],
  },

  "backend-api": {
    nicheId: "backend-api",
    nicheTitle: "High-Throughput Backend & API Engineering",
    domainId: "web",
    domainName: "Web & Full-Stack Systems",
    version: "1.0",
    description:
      "Low-latency REST and gRPC endpoints, database connection pooling, concurrency, and caching architectures.",
    requiredSkills: [
      {
        skillId: "api-protocol-design",
        skillName: "RESTful & gRPC Protocol Architecture",
        category: "API Design",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "HTTP semantic status codes, idempotent methods, protobuf contracts, and bidirectional streaming.",
        relatedConceptTags: [
          "http-idempotency",
          "status-code-semantics",
          "protobuf-grpc",
          "content-negotiation",
        ],
      },
      {
        skillId: "database-query-optimization",
        skillName: "Database Indexing & Query Optimization",
        category: "Databases",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "B-tree index usage, composite index order, N+1 query elimination, and SQL transaction isolation.",
        relatedConceptTags: [
          "composite-indexing",
          "n-plus-one-mitigation",
          "transaction-isolation-levels",
          "explain-analyze-plans",
        ],
      },
      {
        skillId: "caching-redis",
        skillName: "Distributed Caching (Redis)",
        category: "Architecture",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Cache-aside vs write-through patterns, TTL expiration, cache stampede prevention, and Redis data structures.",
        relatedConceptTags: [
          "cache-aside-pattern",
          "cache-stampede-defense",
          "redis-data-structures",
          "ttl-strategies",
        ],
      },
      {
        skillId: "concurrency-async",
        skillName: "Concurrency & Asynchronous Worker Pools",
        category: "Backend Core",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Event loop execution, thread pools, job queues, and connection pool starvation mitigation.",
        relatedConceptTags: [
          "event-loop-microtasks",
          "connection-pooling",
          "worker-threads",
          "backpressure-handling",
        ],
      },
    ],
  },

  "fullstack-product": {
    nicheId: "fullstack-product",
    nicheTitle: "Full-Stack Product Engineering",
    domainId: "web",
    domainName: "Web & Full-Stack Systems",
    version: "1.0",
    description:
      "Connecting database schemas, business logic, and UI into cohesive, resilient end-user web applications.",
    requiredSkills: [
      {
        skillId: "end-to-end-architecture",
        skillName: "End-to-End System Architecture",
        category: "Full-Stack Design",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Server-side rendering (SSR), client-server data synchronization, and optimistic UI updates.",
        relatedConceptTags: [
          "ssr-vs-csr",
          "optimistic-ui-updates",
          "hydration-lifecycle",
          "api-route-contracts",
        ],
      },
      {
        skillId: "auth-session-security",
        skillName: "Authentication & Session Management",
        category: "Security",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Secure cookie transmission (HttpOnly/SameSite), session invalidation, and role-based access control (RBAC).",
        relatedConceptTags: [
          "httponly-samesite-cookies",
          "session-revocation",
          "rbac-authorization",
          "csrf-protection",
        ],
      },
      {
        skillId: "fullstack-testing",
        skillName: "Full-Stack Testing (Unit, Integration & E2E)",
        category: "Quality Assurance",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Automated test suites with Vitest/Jest and Playwright, mock servers, and regression protection.",
        relatedConceptTags: [
          "e2e-playwright",
          "unit-test-assertions",
          "mock-service-workers",
          "test-coverage-metrics",
        ],
      },
    ],
  },

  "web-perf": {
    nicheId: "web-perf",
    nicheTitle: "Web Performance & Core Vitals Engineering",
    domainId: "web",
    domainName: "Web & Full-Stack Systems",
    version: "1.0",
    description:
      "Optimizing browser rendering pipelines, JavaScript heap profiling, network caching, and Core Web Vitals.",
    requiredSkills: [
      {
        skillId: "core-web-vitals",
        skillName: "Core Web Vitals Optimization (LCP, INP, CLS)",
        category: "Performance Metrics",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Diagnosing slow Largest Contentful Paint, Interaction to Next Paint delays, and Cumulative Layout Shift causes.",
        relatedConceptTags: [
          "lcp-critical-path",
          "inp-main-thread-delays",
          "cls-layout-shifts",
          "fetch-priority",
        ],
      },
      {
        skillId: "bundle-asset-optimization",
        skillName: "Asset Optimization & Tree-Shaking",
        category: "Build & Bundling",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Tree-shaking dead code, modern image compression (WebP/AVIF), font subsetting, and critical CSS inlining.",
        relatedConceptTags: [
          "tree-shaking-bundlers",
          "webp-avif-formats",
          "font-display-swap",
          "critical-css-inlining",
        ],
      },
      {
        skillId: "browser-memory-profiling",
        skillName: "Memory Leak Profiling & DevTools Analysis",
        category: "Runtime Profiling",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Heap snapshot comparison, detached DOM tree detection, and event listener lifecycle cleanup.",
        relatedConceptTags: [
          "detached-dom-nodes",
          "heap-snapshot-allocation",
          "event-listener-leaks",
          "garbage-collection-cycles",
        ],
      },
    ],
  },

  // ==========================================================================
  // 5. SOFTWARE & CORE SYSTEMS
  // ==========================================================================
  "systems-cpp-rust": {
    nicheId: "systems-cpp-rust",
    nicheTitle: "Low-Level Systems & Concurrency Engineering",
    domainId: "software",
    domainName: "Software & Core Systems",
    version: "1.0",
    description:
      "Hardware-level execution, deterministic memory allocation, concurrency primitives, and zero-cost abstractions.",
    requiredSkills: [
      {
        skillId: "memory-management",
        skillName: "Manual Memory Management & Pointer Arithmetic",
        category: "Systems Fundamentals",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Heap vs stack allocations, pointer arithmetic, RAII semantics, and avoiding memory fragmentation.",
        relatedConceptTags: [
          "stack-vs-heap",
          "raii-idiom",
          "pointer-arithmetic",
          "valgrind-memory-leaks",
        ],
      },
      {
        skillId: "concurrency-primitives",
        skillName: "Concurrency Primitives & Lock-Free Design",
        category: "Concurrency",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Mutexes, condition variables, deadlocks, atomic operations, and memory ordering barriers.",
        relatedConceptTags: [
          "mutex-locks",
          "atomic-primitives",
          "deadlock-prevention",
          "memory-order-barriers",
        ],
      },
      {
        skillId: "cpu-cache-optimization",
        skillName: "CPU Cache Optimization & Data Layout",
        category: "Hardware Optimization",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Cache line alignment, false sharing, branch prediction, and struct memory packing.",
        relatedConceptTags: [
          "cache-line-alignment",
          "false-sharing",
          "branch-prediction",
          "struct-padding",
        ],
      },
    ],
  },

  "embedded-iot": {
    nicheId: "embedded-iot",
    nicheTitle: "Embedded Systems & Firmware Engineering",
    domainId: "software",
    domainName: "Software & Core Systems",
    version: "1.0",
    description:
      "Microcontroller architectures, interrupt service routines, serial bus communication, and real-time execution.",
    requiredSkills: [
      {
        skillId: "embedded-peripherals",
        skillName: "Hardware Interfaces & Serial Protocols (I2C/SPI/UART)",
        category: "Protocols",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Master/slave topologies, baud rate clock synchronization, bit-banging, and framing error handling.",
        relatedConceptTags: [
          "i2c-bus-arbitration",
          "spi-clock-modes",
          "uart-framing",
          "gpio-interrupts",
        ],
      },
      {
        skillId: "rtos-scheduling",
        skillName: "Real-Time Operating Systems (RTOS)",
        category: "Operating Systems",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Preemptive priority scheduling, task context switching, priority inversion, and semaphore sync.",
        relatedConceptTags: [
          "priority-inversion",
          "freertos-task-states",
          "context-switching",
          "semaphore-synchronization",
        ],
      },
      {
        skillId: "power-management",
        skillName: "Ultra-Low Power & Sleep State Management",
        category: "Hardware",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Deep sleep modes, watchdogs, brown-out detectors, and peripheral clock gating.",
        relatedConceptTags: [
          "deep-sleep-states",
          "watchdog-timers",
          "clock-gating",
          "brownout-detection",
        ],
      },
    ],
  },

  "database-storage": {
    nicheId: "database-storage",
    nicheTitle: "Database Internals & Distributed Storage",
    domainId: "software",
    domainName: "Software & Core Systems",
    version: "1.0",
    description:
      "Storage engine internals, write-ahead logging (WAL), B-trees vs LSM-trees, and distributed consensus algorithms.",
    requiredSkills: [
      {
        skillId: "storage-structures",
        skillName: "Storage Engine Data Structures (B-Trees & LSM-Trees)",
        category: "Storage Engines",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "B-tree node splits, LSM-tree memtables and SSTables, compaction strategies, and bloom filter lookups.",
        relatedConceptTags: [
          "btree-splits",
          "lsm-memtables-sstables",
          "bloom-filters",
          "compaction-strategies",
        ],
      },
      {
        skillId: "wal-acid-recovery",
        skillName: "Write-Ahead Logging (WAL) & Crash Recovery",
        category: "Durability",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "ARIES recovery protocol, checkpointing, fuzzy checkpoints, and dirty page flushing.",
        relatedConceptTags: [
          "wal-durability",
          "aries-recovery",
          "checkpointing-protocols",
          "dirty-page-flushing",
        ],
      },
      {
        skillId: "distributed-consensus",
        skillName: "Distributed Consensus Protocols (Raft & Paxos)",
        category: "Distributed Systems",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Leader election, log replication, split-brain resolution, and quorum heartbeats.",
        relatedConceptTags: [
          "raft-leader-election",
          "log-replication-consensus",
          "split-brain-prevention",
          "quorum-read-writes",
        ],
      },
    ],
  },

  "algo-sdk": {
    nicheId: "algo-sdk",
    nicheTitle: "Core Algorithms & Developer SDK Engineering",
    domainId: "software",
    domainName: "Software & Core Systems",
    version: "1.0",
    description:
      "Algorithmic problem solving, asymptotic optimization, compiler toolchains, and developer-facing library design.",
    requiredSkills: [
      {
        skillId: "advanced-algorithms",
        skillName: "Graph Algorithms & Asymptotic Complexity",
        category: "Algorithms",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Dijkstra/A* pathfinding, strongly connected components, dynamic programming, and amortized complexity.",
        relatedConceptTags: [
          "dijkstra-shortest-path",
          "dynamic-programming-memo",
          "asymptotic-complexity",
          "tarjan-scc",
        ],
      },
      {
        skillId: "sdk-api-ergonomics",
        skillName: "Developer SDK Design & Ergonomics",
        category: "Software Engineering",
        importance: "essential",
        targetLevel: "Strong Foundation",
        description:
          "Semantic versioning, backward compatibility, builder patterns, ergonomic error types, and documentation.",
        relatedConceptTags: [
          "semantic-versioning",
          "builder-pattern",
          "custom-error-hierarchy",
          "backward-compatibility",
        ],
      },
      {
        skillId: "benchmarking-profiling",
        skillName: "Automated Benchmarking & Profiling",
        category: "Testing",
        importance: "important",
        targetLevel: "Proficient",
        description:
          "Criterion benchmark harnesses, flamegraph call tree analysis, and regression prevention in CI.",
        relatedConceptTags: [
          "benchmark-harnesses",
          "flamegraph-profiling",
          "throughput-vs-latency",
          "regression-benchmarking",
        ],
      },
    ],
  },
};

/**
 * Helper to retrieve target skill profile by niche ID or domain ID fallback
 */
export function getTargetSkillProfile(
  nicheId: string,
  domainId?: string
): TargetSkillProfile {
  if (TARGET_SKILL_PROFILES[nicheId]) {
    return TARGET_SKILL_PROFILES[nicheId];
  }

  // Fallback to first niche in the domain if direct niche match is absent
  const byDomain = Object.values(TARGET_SKILL_PROFILES).find(
    (p) => p.domainId === domainId
  );
  if (byDomain) {
    return byDomain;
  }

  // Default ultimate fallback: Application Security
  return TARGET_SKILL_PROFILES["app-sec"];
}
