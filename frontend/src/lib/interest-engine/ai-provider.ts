/**
 * Skill Bridge — AI Provider & Resilient Adaptive Engine
 * Supports Gemini API (server-side only) with an intelligent, deterministic
 * fallback engine ensuring zero downtime, 100% testability, and no error leaks.
 */

import {
  AdaptiveQuestion,
  AnswerRecord,
  DomainId,
  DomainScores,
  QuestionOption,
  SignalScores,
} from "./types";
import { DOMAIN_TAXONOMY } from "./subdomains";

// ============================================================================
// 1. PHASE 1: CURATED BLIND SITUATIONAL SCENARIOS (DOMAINS FULLY HIDDEN)
// ============================================================================

export const PHASE_1_BLIND_SCENARIOS: AdaptiveQuestion[] = [
  {
    id: "p1-q1-anomaly",
    phase: 1,
    questionNumber: 1,
    totalQuestionsEstimated: 5,
    questionText:
      "You notice that a web application produces an unexpected, distorted response whenever a user enters non-standard characters in an input form. What would you be most excited to do?",
    purpose: "Evaluate defensive curiosity vs. UI restoration vs. backend validation logic",
    options: [
      {
        id: "p1-q1-opt-a",
        label: "A",
        text: "Probe the input with unusual payloads to see if internal application memory or database queries can be triggered.",
        signalWeights: { investigation: 0.8, securityMindset: 0.9, systemsThinking: 0.5 },
        domainRelevance: { security: 0.85, software: 0.4 },
      },
      {
        id: "p1-q1-opt-b",
        label: "B",
        text: "Analyze the server's input-handling logic and optimize the parsing function so it executes cleanly and safely without crashing.",
        signalWeights: { problemSolving: 0.8, optimization: 0.7, building: 0.4 },
        domainRelevance: { software: 0.8, web: 0.5 },
      },
      {
        id: "p1-q1-opt-c",
        label: "C",
        text: "Design a smooth client-side validation experience with instant user feedback to guide people toward valid inputs.",
        signalWeights: { creativity: 0.8, building: 0.7, problemSolving: 0.3 },
        domainRelevance: { web: 0.85 },
      },
      {
        id: "p1-q1-opt-d",
        label: "D",
        text: "Automate an automated test suite across distributed servers to stress-test thousands of concurrent inputs.",
        signalWeights: { automation: 0.8, systemsThinking: 0.7, optimization: 0.5 },
        domainRelevance: { cloud: 0.8, software: 0.5 },
      },
    ],
  },
  {
    id: "p1-q2-data-records",
    phase: 1,
    questionNumber: 2,
    totalQuestionsEstimated: 5,
    questionText:
      "You are handed a raw dataset containing millions of event records from an online platform over the past year. Where does your curiosity take you first?",
    purpose: "Distinguish between statistical modeling, pipeline architecture, and anomaly detection",
    options: [
      {
        id: "p1-q2-opt-a",
        label: "A",
        text: "Train statistical algorithms to uncover hidden behavioral clusters, forecast future trends, and test predictive hypotheses.",
        signalWeights: { dataOrientation: 0.9, experimentation: 0.8, analysis: 0.8 },
        domainRelevance: { "ai-ml": 0.9 },
      },
      {
        id: "p1-q2-opt-b",
        label: "B",
        text: "Inspect timestamps and authentication logs to trace any suspicious access patterns or unauthorized privileges.",
        signalWeights: { investigation: 0.8, securityMindset: 0.8, analysis: 0.7 },
        domainRelevance: { security: 0.85 },
      },
      {
        id: "p1-q2-opt-c",
        label: "C",
        text: "Architect a scalable streaming pipeline to process incoming events in real time without lag across distributed servers.",
        signalWeights: { systemsThinking: 0.9, optimization: 0.8, automation: 0.6 },
        domainRelevance: { cloud: 0.85, software: 0.6 },
      },
      {
        id: "p1-q2-opt-d",
        label: "D",
        text: "Transform the raw numbers into an interactive, visual analytics dashboard that team members can filter and explore.",
        signalWeights: { building: 0.8, creativity: 0.8, analysis: 0.5 },
        domainRelevance: { web: 0.85 },
      },
    ],
  },
  {
    id: "p1-q3-repetitive-task",
    phase: 1,
    questionNumber: 3,
    totalQuestionsEstimated: 5,
    questionText:
      "A development team manually spends four hours every Friday packaging and deploying software releases to multiple servers. What is your reaction?",
    purpose: "Evaluate automation preference vs. core algorithmic execution vs. product experience",
    options: [
      {
        id: "p1-q3-opt-a",
        label: "A",
        text: "Write declarative automation pipelines that build, test, and deploy containers continuously whenever code is pushed.",
        signalWeights: { automation: 0.9, systemsThinking: 0.8, optimization: 0.6 },
        domainRelevance: { cloud: 0.9, software: 0.4 },
      },
      {
        id: "p1-q3-opt-b",
        label: "B",
        text: "Embed automated vulnerability scanners and integrity checks into the pipeline to block insecure releases.",
        signalWeights: { securityMindset: 0.9, automation: 0.6, investigation: 0.6 },
        domainRelevance: { security: 0.85 },
      },
      {
        id: "p1-q3-opt-c",
        label: "C",
        text: "Rewrite the build tool's compiler steps in a high-performance language to cut build execution time from 20 minutes down to seconds.",
        signalWeights: { optimization: 0.9, problemSolving: 0.8, systemsThinking: 0.6 },
        domainRelevance: { software: 0.9 },
      },
      {
        id: "p1-q3-opt-d",
        label: "D",
        text: "Build a self-service management dashboard where developers can monitor deployment progress, view live metrics, and trigger rollbacks with one click.",
        signalWeights: { building: 0.8, creativity: 0.7, systemsThinking: 0.5 },
        domainRelevance: { web: 0.85 },
      },
    ],
  },
  {
    id: "p1-q4-system-failure",
    phase: 1,
    questionNumber: 4,
    totalQuestionsEstimated: 5,
    questionText:
      "A critical service begins freezing during peak hours, yet no crash error logs are generated. What approach do you instinctively reach for?",
    purpose: "Diagnose root-cause investigation vs. memory profiling vs. distributed topology",
    options: [
      {
        id: "p1-q4-opt-a",
        label: "A",
        text: "Inspect low-level memory allocations, thread locks, and CPU cache misses to locate a silent deadlock or race condition.",
        signalWeights: { problemSolving: 0.9, optimization: 0.8, systemsThinking: 0.7 },
        domainRelevance: { software: 0.9 },
      },
      {
        id: "p1-q4-opt-b",
        label: "B",
        text: "Audit incoming network packets and connection states to verify whether an external entity is exhausting server connections deliberately.",
        signalWeights: { investigation: 0.9, securityMindset: 0.8, systemsThinking: 0.6 },
        domainRelevance: { security: 0.85 },
      },
      {
        id: "p1-q4-opt-c",
        label: "C",
        text: "Analyze network traffic topologies and auto-scaling group metrics to automatically route overflow traffic to backup regions.",
        signalWeights: { systemsThinking: 0.9, automation: 0.7, optimization: 0.7 },
        domainRelevance: { cloud: 0.9 },
      },
      {
        id: "p1-q4-opt-d",
        label: "D",
        text: "Run empirical anomaly-detection models on time-series telemetry to detect multivariate indicators predicting freezes.",
        signalWeights: { dataOrientation: 0.8, experimentation: 0.8, analysis: 0.8 },
        domainRelevance: { "ai-ml": 0.85 },
      },
    ],
  },
  {
    id: "p1-q5-greenfield-project",
    phase: 1,
    questionNumber: 5,
    totalQuestionsEstimated: 5,
    questionText:
      "You are starting a brand new project with total technical freedom. What would give you the deepest sense of satisfaction at the end of the first week?",
    purpose: "Final Phase 1 calibration across all 5 engineering archetypes",
    options: [
      {
        id: "p1-q5-opt-a",
        label: "A",
        text: "Uncovering a clever architectural flaw in an existing standard and designing an impervious defense mechanism against it.",
        signalWeights: { securityMindset: 0.9, investigation: 0.8, problemSolving: 0.7 },
        domainRelevance: { security: 0.9 },
      },
      {
        id: "p1-q5-opt-b",
        label: "B",
        text: "Having a beautifully rendered, ultra-fast web application running live on the internet that users can test and interact with.",
        signalWeights: { building: 0.9, creativity: 0.8, optimization: 0.6 },
        domainRelevance: { web: 0.9 },
      },
      {
        id: "p1-q5-opt-c",
        label: "C",
        text: "A fully automated multi-region infrastructure cluster provisioned automatically via code with automated health checks.",
        signalWeights: { systemsThinking: 0.9, automation: 0.9, building: 0.6 },
        domainRelevance: { cloud: 0.9 },
      },
      {
        id: "p1-q5-opt-d",
        label: "D",
        text: "A trained machine learning model demonstrating high predictive accuracy and generalizing effectively to unseen real-world scenarios.",
        signalWeights: { dataOrientation: 0.9, experimentation: 0.9, analysis: 0.8 },
        domainRelevance: { "ai-ml": 0.9 },
      },
      {
        id: "p1-q5-opt-e",
        label: "E",
        text: "A lean, custom-built algorithmic engine running on close-to-metal code, achieving near-zero latency and minimal memory overhead.",
        signalWeights: { problemSolving: 0.9, optimization: 0.9, building: 0.7 },
        domainRelevance: { software: 0.9 },
      },
    ],
  },
  {
    id: "p1-q6-curiosity-probe",
    phase: 1,
    questionNumber: 6,
    totalQuestionsEstimated: 6,
    questionText:
      "When you encounter a complex piece of technology you've never seen before, what is your immediate reflex?",
    purpose: "Distinguish systemic exploration from adversarial testing and interface analysis",
    options: [
      {
        id: "p1-q6-opt-a",
        label: "A",
        text: "Take it apart mentally to see what happens when edge cases, invalid inputs, or out-of-order calls occur.",
        signalWeights: { investigation: 0.8, securityMindset: 0.8, problemSolving: 0.6 },
        domainRelevance: { security: 0.85, software: 0.5 },
      },
      {
        id: "p1-q6-opt-b",
        label: "B",
        text: "Study how its internal data structures and memory boundaries are managed to squeeze out maximum efficiency.",
        signalWeights: { optimization: 0.8, systemsThinking: 0.8, problemSolving: 0.7 },
        domainRelevance: { software: 0.85 },
      },
      {
        id: "p1-q6-opt-c",
        label: "C",
        text: "Analyze how it scales when distributed across multiple machines and how it survives network partitions.",
        signalWeights: { systemsThinking: 0.9, automation: 0.7, building: 0.5 },
        domainRelevance: { cloud: 0.85 },
      },
      {
        id: "p1-q6-opt-d",
        label: "D",
        text: "Experiment with how its underlying algorithms learn patterns and adapt to varying inputs over time.",
        signalWeights: { experimentation: 0.8, dataOrientation: 0.8, analysis: 0.7 },
        domainRelevance: { "ai-ml": 0.85 },
      },
    ],
  },
  {
    id: "p1-q7-project-impact",
    phase: 1,
    questionNumber: 7,
    totalQuestionsEstimated: 7,
    questionText:
      "Imagine an organization relies on your engineering contributions. In which role would you feel most accomplished?",
    purpose: "Tie-breaker and deep confirmation across the 5 domains",
    options: [
      {
        id: "p1-q7-opt-a",
        label: "A",
        text: "The specialist who ensures digital assets and customer privacy are fortified against sophisticated cyber threats.",
        signalWeights: { securityMindset: 0.9, investigation: 0.8, systemsThinking: 0.6 },
        domainRelevance: { security: 0.9 },
      },
      {
        id: "p1-q7-opt-b",
        label: "B",
        text: "The builder who crafts the primary software products and responsive interfaces that delight end users every day.",
        signalWeights: { building: 0.9, creativity: 0.8, optimization: 0.5 },
        domainRelevance: { web: 0.9 },
      },
      {
        id: "p1-q7-opt-c",
        label: "C",
        text: "The architect who ensures global infrastructure stays resilient, auto-scaled, and operational 24/7/365.",
        signalWeights: { systemsThinking: 0.9, automation: 0.8, optimization: 0.7 },
        domainRelevance: { cloud: 0.9 },
      },
      {
        id: "p1-q7-opt-d",
        label: "D",
        text: "The intelligence engineer who extracts high-value predictive insights and automated decision models from complex data.",
        signalWeights: { dataOrientation: 0.9, experimentation: 0.9, analysis: 0.8 },
        domainRelevance: { "ai-ml": 0.9 },
      },
      {
        id: "p1-q7-opt-e",
        label: "E",
        text: "The systems craftsman who optimizes the core computational algorithms, drivers, and runtime engines powering everything.",
        signalWeights: { problemSolving: 0.9, optimization: 0.9, systemsThinking: 0.7 },
        domainRelevance: { software: 0.9 },
      },
    ],
  },
];

// ============================================================================
// 2. PHASE 2: TARGETED SUB-DOMAIN & NICHE SCENARIOS
// ============================================================================

export const PHASE_2_DOMAIN_SCENARIOS: Record<DomainId, AdaptiveQuestion[]> = {
  security: [
    {
      id: "p2-sec-q1-focus",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "security",
      questionText:
        "Within Cybersecurity & Defense, which kind of challenge sounds most captivating to you?",
      purpose: "Differentiate application auditing vs. live network defense vs. red teaming vs. cloud IAM",
      options: [
        {
          id: "p2-sec-q1-app-sec",
          label: "A",
          text: "Auditing application source code to discover logic flaws, injection vectors, and broken authentication routines before software ships.",
          signalWeights: { investigation: 0.8, problemSolving: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "app-sec",
        },
        {
          id: "p2-sec-q1-soc-threat",
          label: "B",
          text: "Investigating active incident alerts, parsing server packet traces, and hunting down unauthorized intrusions across the network.",
          signalWeights: { investigation: 0.9, analysis: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "soc-threat",
        },
        {
          id: "p2-sec-q1-pentest",
          label: "C",
          text: "Acting as an authorized ethical hacker to test enterprise perimeter defenses, chained vulnerabilities, and privilege escalation pathways.",
          signalWeights: { securityMindset: 0.9, problemSolving: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "pentest-offensive",
        },
        {
          id: "p2-sec-q1-cloud-iam",
          label: "D",
          text: "Designing zero-trust access controls, least-privilege identity structures, and cryptographic key management for multi-cloud environments.",
          signalWeights: { systemsThinking: 0.9, automation: 0.7 },
          domainRelevance: { security: 1 },
          subDomainHint: "cloud-iam",
        },
      ],
    },
    {
      id: "p2-sec-q2-scenario",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "security",
      questionText:
        "You are tasked with securing an organization against unauthorized access. Which activity would you find most satisfying?",
      purpose: "Deepen niche determination within cybersecurity",
      options: [
        {
          id: "p2-sec-q2-app-sec",
          label: "A",
          text: "Writing custom static analysis rules to flag insecure API parameters and memory-safety vulnerabilities in developers' pull requests.",
          signalWeights: { building: 0.7, investigation: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "app-sec",
        },
        {
          id: "p2-sec-q2-soc-threat",
          label: "B",
          text: "Building an automated threat-intelligence dashboard that cross-references live SIEM telemetry with known global adversary signatures.",
          signalWeights: { analysis: 0.8, automation: 0.7 },
          domainRelevance: { security: 1 },
          subDomainHint: "soc-threat",
        },
        {
          id: "p2-sec-q2-pentest",
          label: "C",
          text: "Conducting an offensive black-box assessment against a newly launched service to identify whether sensitive tenant data can be exposed.",
          signalWeights: { securityMindset: 0.9, problemSolving: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "pentest-offensive",
        },
        {
          id: "p2-sec-q2-cloud-iam",
          label: "D",
          text: "Establishing automated policy guards that instantly revoke credentials and quarantine instances when anomalous permissions are granted.",
          signalWeights: { systemsThinking: 0.8, automation: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "cloud-iam",
        },
      ],
    },
    {
      id: "p2-sec-q3-depth",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "security",
      questionText:
        "What type of security artifact or project would you be proudest to publish on your engineering portfolio?",
      purpose: "Final confirmation of specific cybersecurity specialization",
      options: [
        {
          id: "p2-sec-q3-app-sec",
          label: "A",
          text: "A vulnerability research disclosure or secure-coding framework demonstrating how to eradicate common API security flaws.",
          signalWeights: { investigation: 0.8, problemSolving: 0.7 },
          domainRelevance: { security: 1 },
          subDomainHint: "app-sec",
        },
        {
          id: "p2-sec-q3-soc-threat",
          label: "B",
          text: "An incident-response forensic case study detailing how a subtle lateral-movement attack was detected, investigated, and thwarted.",
          signalWeights: { analysis: 0.8, investigation: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "soc-threat",
        },
        {
          id: "p2-sec-q3-pentest",
          label: "C",
          text: "A proof-of-concept offensive security tool demonstrating how chained configuration weaknesses can be uncovered before adversaries find them.",
          signalWeights: { securityMindset: 0.9, problemSolving: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "pentest-offensive",
        },
        {
          id: "p2-sec-q3-cloud-iam",
          label: "D",
          text: "A declarative zero-trust reference architecture demonstrating cryptographically verified least-privilege access across distributed cloud nodes.",
          signalWeights: { systemsThinking: 0.9, automation: 0.8 },
          domainRelevance: { security: 1 },
          subDomainHint: "cloud-iam",
        },
      ],
    },
  ],

  "ai-ml": [
    {
      id: "p2-aiml-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "ai-ml",
      questionText:
        "In AI & Machine Learning, which type of data problem captures your interest the most?",
      purpose: "Differentiate computer vision vs NLP vs MLOps vs large-scale data engineering",
      options: [
        {
          id: "p2-aiml-q1-cv",
          label: "A",
          text: "Working with image, video, or multi-modal spatial data to detect objects, segment scenes, and track movements.",
          signalWeights: { experimentation: 0.8, analysis: 0.7 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "cv-deeplearning",
        },
        {
          id: "p2-aiml-q1-nlp",
          label: "B",
          text: "Working with language, contextual semantics, LLM prompting architectures, and retrieval-augmented generation systems.",
          signalWeights: { experimentation: 0.8, problemSolving: 0.7 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "nlp-llm",
        },
        {
          id: "p2-aiml-q1-mlops",
          label: "C",
          text: "Building production serving pipelines, monitoring model latency, preventing data drift, and deploying containerized models.",
          signalWeights: { automation: 0.8, systemsThinking: 0.8 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "mlops",
        },
        {
          id: "p2-aiml-q1-data",
          label: "D",
          text: "Designing high-volume distributed data pipelines, lakehouse schemas, and streaming architectures that feed analytical systems.",
          signalWeights: { dataOrientation: 0.9, optimization: 0.7 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "data-eng",
        },
      ],
    },
    {
      id: "p2-aiml-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "ai-ml",
      questionText:
        "When evaluating a model in a real-world scenario, what is your primary concern?",
      purpose: "Refine AI/ML sub-domain orientation",
      options: [
        {
          id: "p2-aiml-q2-cv",
          label: "A",
          text: "Visual accuracy under changing lighting, camera angles, and high-noise environments.",
          signalWeights: { experimentation: 0.8 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "cv-deeplearning",
        },
        {
          id: "p2-aiml-q2-nlp",
          label: "B",
          text: "Semantic coherence, eliminating factual hallucinations, and retrieving precise textual references.",
          signalWeights: { analysis: 0.8 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "nlp-llm",
        },
        {
          id: "p2-aiml-q2-mlops",
          label: "C",
          text: "Inference response time under heavy concurrent load, automated canary rollouts, and hardware acceleration.",
          signalWeights: { optimization: 0.8, automation: 0.7 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "mlops",
        },
        {
          id: "p2-aiml-q2-data",
          label: "D",
          text: "Clean, consistent data transformation schemas with zero data loss and automated partition management.",
          signalWeights: { dataOrientation: 0.9 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "data-eng",
        },
      ],
    },
    {
      id: "p2-aiml-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "ai-ml",
      questionText: "What capstone project would you be most eager to build?",
      purpose: "Final confirmation of specific AI/ML niche",
      options: [
        {
          id: "p2-aiml-q3-cv",
          label: "A",
          text: "An autonomous real-time visual inspection system that identifies manufacturing defects on a conveyor belt.",
          signalWeights: { experimentation: 0.8 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "cv-deeplearning",
        },
        {
          id: "p2-aiml-q3-nlp",
          label: "B",
          text: "An enterprise research assistant that searches thousands of technical PDFs and synthesizes cited answers with source references.",
          signalWeights: { analysis: 0.8 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "nlp-llm",
        },
        {
          id: "p2-aiml-q3-mlops",
          label: "C",
          text: "A production MLOps orchestrator that automatically re-trains, benchmarks, and redeploys models when drift thresholds exceed 5%.",
          signalWeights: { automation: 0.8 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "mlops",
        },
        {
          id: "p2-aiml-q3-data",
          label: "D",
          text: "A high-throughput distributed event streaming platform aggregating millions of clickstream logs into queryable columnar tables.",
          signalWeights: { dataOrientation: 0.9 },
          domainRelevance: { "ai-ml": 1 },
          subDomainHint: "data-eng",
        },
      ],
    },
  ],

  cloud: [
    {
      id: "p2-cloud-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "cloud",
      questionText:
        "In Cloud & Infrastructure, which architectural responsibility resonates with you the most?",
      purpose: "Differentiate SRE vs DevOps vs Cloud Architecture vs Serverless",
      options: [
        {
          id: "p2-cloud-q1-sre",
          label: "A",
          text: "Monitoring service level objectives (SLOs), debugging cascading distributed latencies, and organizing chaos-engineering resilience tests.",
          signalWeights: { optimization: 0.8, investigation: 0.7 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "sre-reliability",
        },
        {
          id: "p2-cloud-q1-devops",
          label: "B",
          text: "Automating developer delivery pipelines, authoring modular Infrastructure as Code (Terraform), and orchestrating Kubernetes clusters.",
          signalWeights: { automation: 0.9, building: 0.6 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "devops-cicd",
        },
        {
          id: "p2-cloud-q1-arch",
          label: "C",
          text: "Designing global multi-region cloud blueprints, balancing cost against throughput, and selecting optimal cloud vendor primitives.",
          signalWeights: { systemsThinking: 0.9, optimization: 0.7 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "cloud-arch",
        },
        {
          id: "p2-cloud-q1-serverless",
          label: "D",
          text: "Architecting event-driven serverless worker topologies that scale on-demand from zero to millions of micro-tasks across the edge.",
          signalWeights: { systemsThinking: 0.8, automation: 0.7 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "serverless-edge",
        },
      ],
    },
    {
      id: "p2-cloud-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "cloud",
      questionText:
        "When an unexpected outage strikes a major service, what is your primary instinct?",
      purpose: "Refine Cloud sub-domain orientation",
      options: [
        {
          id: "p2-cloud-q2-sre",
          label: "A",
          text: "Dive into distributed tracing graphs, locate the failing downstream dependency, and trigger automated circuit breakers.",
          signalWeights: { investigation: 0.9, systemsThinking: 0.8 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "sre-reliability",
        },
        {
          id: "p2-cloud-q2-devops",
          label: "B",
          text: "Roll back the offending container image via automated git commit hooks and redeploy the previously verified immutable build.",
          signalWeights: { automation: 0.9 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "devops-cicd",
        },
        {
          id: "p2-cloud-q2-arch",
          label: "C",
          text: "Reroute ingress traffic dynamically across secondary cloud availability zones to preserve uptime while analyzing the root cause.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "cloud-arch",
        },
        {
          id: "p2-cloud-q2-serverless",
          label: "D",
          text: "Inspect edge function memory caps and concurrency queue backlogs to ensure worker events are retained in dead-letter queues.",
          signalWeights: { optimization: 0.8 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "serverless-edge",
        },
      ],
    },
    {
      id: "p2-cloud-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "cloud",
      questionText: "What infrastructure system would you enjoy mastering the most?",
      purpose: "Final confirmation of specific Cloud niche",
      options: [
        {
          id: "p2-cloud-q3-sre",
          label: "A",
          text: "An enterprise telemetry stack tracking distributed latency, automated alerts, and error budgets across hundreds of microservices.",
          signalWeights: { optimization: 0.8 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "sre-reliability",
        },
        {
          id: "p2-cloud-q3-devops",
          label: "B",
          text: "A fully declarative Infrastructure as Code setup that spins up an entire staging or production cloud environment in 10 minutes.",
          signalWeights: { automation: 0.9 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "devops-cicd",
        },
        {
          id: "p2-cloud-q3-arch",
          label: "C",
          text: "A hybrid multi-cloud disaster-recovery architecture with automated database synchronization and near-zero RPO/RTO.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "cloud-arch",
        },
        {
          id: "p2-cloud-q3-serverless",
          label: "D",
          text: "A globally distributed serverless API fabric handling billions of requests without managing a single traditional virtual machine.",
          signalWeights: { systemsThinking: 0.8 },
          domainRelevance: { cloud: 1 },
          subDomainHint: "serverless-edge",
        },
      ],
    },
  ],

  web: [
    {
      id: "p2-web-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "web",
      questionText:
        "In Web & Full-Stack Systems, which aspect of building applications excites you the most?",
      purpose: "Differentiate Frontend vs Backend APIs vs Full-Stack Product vs Web Performance",
      options: [
        {
          id: "p2-web-q1-front",
          label: "A",
          text: "Crafting polished, reactive user interfaces with accessible design systems, fluid micro-interactions, and state management.",
          signalWeights: { creativity: 0.9, building: 0.8 },
          domainRelevance: { web: 1 },
          subDomainHint: "frontend-arch",
        },
        {
          id: "p2-web-q1-back",
          label: "B",
          text: "Designing high-throughput server-side REST/gRPC endpoints, connection pools, transactional integrity, and database schemas.",
          signalWeights: { systemsThinking: 0.8, problemSolving: 0.8 },
          domainRelevance: { web: 1 },
          subDomainHint: "backend-api",
        },
        {
          id: "p2-web-q1-full",
          label: "C",
          text: "Building complete product features end-to-end—from database migration and server controllers all the way to user-facing UI.",
          signalWeights: { building: 0.9, problemSolving: 0.7 },
          domainRelevance: { web: 1 },
          subDomainHint: "fullstack-product",
        },
        {
          id: "p2-web-q1-perf",
          label: "D",
          text: "Analyzing browser profiling traces to eliminate main-thread blocking, reduce JavaScript payload sizes, and maximize Core Web Vitals.",
          signalWeights: { optimization: 0.9, investigation: 0.7 },
          domainRelevance: { web: 1 },
          subDomainHint: "web-perf",
        },
      ],
    },
    {
      id: "p2-web-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "web",
      questionText:
        "When a user complains that a web application feels sluggish or clunky, where do you look first?",
      purpose: "Refine Web sub-domain orientation",
      options: [
        {
          id: "p2-web-q2-front",
          label: "A",
          text: "Review client component re-renders, optimistic UI updates, and animation frame consistency.",
          signalWeights: { creativity: 0.8, building: 0.7 },
          domainRelevance: { web: 1 },
          subDomainHint: "frontend-arch",
        },
        {
          id: "p2-web-q2-back",
          label: "B",
          text: "Profile SQL query plans, add missing database indices, and implement an in-memory caching layer.",
          signalWeights: { optimization: 0.8, systemsThinking: 0.7 },
          domainRelevance: { web: 1 },
          subDomainHint: "backend-api",
        },
        {
          id: "p2-web-q2-full",
          label: "C",
          text: "Review the full data lifecycle between client network requests, API serialization, and relational storage.",
          signalWeights: { building: 0.8 },
          domainRelevance: { web: 1 },
          subDomainHint: "fullstack-product",
        },
        {
          id: "p2-web-q2-perf",
          label: "D",
          text: "Audit network waterfall diagrams, code-split JavaScript bundles, and configure aggressive browser caching headers.",
          signalWeights: { optimization: 0.9 },
          domainRelevance: { web: 1 },
          subDomainHint: "web-perf",
        },
      ],
    },
    {
      id: "p2-web-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "web",
      questionText: "Which web application project would you most enjoy showcasing?",
      purpose: "Final confirmation of specific Web niche",
      options: [
        {
          id: "p2-web-q3-front",
          label: "A",
          text: "A modular, accessible UI component system adopted across multiple engineering teams with seamless dark/light theme support.",
          signalWeights: { creativity: 0.9 },
          domainRelevance: { web: 1 },
          subDomainHint: "frontend-arch",
        },
        {
          id: "p2-web-q3-back",
          label: "B",
          text: "A low-latency microservice architecture capable of handling 50,000 requests per second with rock-solid consistency.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { web: 1 },
          subDomainHint: "backend-api",
        },
        {
          id: "p2-web-q3-full",
          label: "C",
          text: "A live collaborative SaaS product with real-time syncing, authentication, billing, and automated notifications.",
          signalWeights: { building: 0.9 },
          domainRelevance: { web: 1 },
          subDomainHint: "fullstack-product",
        },
        {
          id: "p2-web-q3-perf",
          label: "D",
          text: "An ultra-performant web application achieving perfect 100/100 Lighthouse scores and sub-50ms interaction response times.",
          signalWeights: { optimization: 0.9 },
          domainRelevance: { web: 1 },
          subDomainHint: "web-perf",
        },
      ],
    },
  ],

  software: [
    {
      id: "p2-soft-q1",
      phase: 2,
      questionNumber: 1,
      totalQuestionsEstimated: 3,
      broadDomain: "software",
      questionText:
        "In Software & Core Systems, which low-level or computational challenge appeals to you most?",
      purpose: "Differentiate Systems/Rust vs Embedded vs Database Engines vs Algorithmic SDKs",
      options: [
        {
          id: "p2-soft-q1-sys",
          label: "A",
          text: "Writing close-to-the-metal code in C++, Rust, or Go with explicit memory control, thread safety, and minimal runtime overhead.",
          signalWeights: { problemSolving: 0.9, optimization: 0.8 },
          domainRelevance: { software: 1 },
          subDomainHint: "systems-cpp-rust",
        },
        {
          id: "p2-soft-q1-embed",
          label: "B",
          text: "Developing firmware and real-time operating system (RTOS) code for resource-constrained microcontrollers and IoT devices.",
          signalWeights: { systemsThinking: 0.8, building: 0.7 },
          domainRelevance: { software: 1 },
          subDomainHint: "embedded-iot",
        },
        {
          id: "p2-soft-q1-db",
          label: "C",
          text: "Studying storage engine internals: write-ahead logging (WAL), B-Trees, LSM-Trees, and distributed consensus protocols.",
          signalWeights: { systemsThinking: 0.9, optimization: 0.8 },
          domainRelevance: { software: 1 },
          subDomainHint: "database-storage",
        },
        {
          id: "p2-soft-q1-algo",
          label: "D",
          text: "Implementing highly optimized mathematical and graph algorithms packaged inside a clean, developer-friendly SDK.",
          signalWeights: { problemSolving: 0.9, optimization: 0.8 },
          domainRelevance: { software: 1 },
          subDomainHint: "algo-sdk",
        },
      ],
    },
    {
      id: "p2-soft-q2",
      phase: 2,
      questionNumber: 2,
      totalQuestionsEstimated: 3,
      broadDomain: "software",
      questionText:
        "What type of performance bottleneck do you find most intellectually rewarding to eliminate?",
      purpose: "Refine Software sub-domain orientation",
      options: [
        {
          id: "p2-soft-q2-sys",
          label: "A",
          text: "A lock contention issue across multi-threaded workers causing CPU cores to stall on mutex locks.",
          signalWeights: { problemSolving: 0.9 },
          domainRelevance: { software: 1 },
          subDomainHint: "systems-cpp-rust",
        },
        {
          id: "p2-soft-q2-embed",
          label: "B",
          text: "A hardware interrupt latency causing battery drain or dropped sensor readings on an embedded chip.",
          signalWeights: { investigation: 0.8 },
          domainRelevance: { software: 1 },
          subDomainHint: "embedded-iot",
        },
        {
          id: "p2-soft-q2-db",
          label: "C",
          text: "Disk write amplification during intensive database storage compaction cycles.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { software: 1 },
          subDomainHint: "database-storage",
        },
        {
          id: "p2-soft-q2-algo",
          label: "D",
          text: "An O(N^2) search algorithm slowing down large dataset processing that can be refactored to O(N log N).",
          signalWeights: { problemSolving: 0.9 },
          domainRelevance: { software: 1 },
          subDomainHint: "algo-sdk",
        },
      ],
    },
    {
      id: "p2-soft-q3",
      phase: 2,
      questionNumber: 3,
      totalQuestionsEstimated: 3,
      broadDomain: "software",
      questionText: "What kind of core software engineering achievement would you take pride in?",
      purpose: "Final confirmation of specific Software niche",
      options: [
        {
          id: "p2-soft-q3-sys",
          label: "A",
          text: "A high-performance inter-process communication library with zero heap allocations during runtime.",
          signalWeights: { optimization: 0.9 },
          domainRelevance: { software: 1 },
          subDomainHint: "systems-cpp-rust",
        },
        {
          id: "p2-soft-q3-embed",
          label: "B",
          text: "A robust firmware build operating flawlessly on an edge microcontroller for months without rebooting.",
          signalWeights: { building: 0.8 },
          domainRelevance: { software: 1 },
          subDomainHint: "embedded-iot",
        },
        {
          id: "p2-soft-q3-db",
          label: "C",
          text: "A fault-tolerant key-value store with ACID guarantees and raft-based distributed leader election.",
          signalWeights: { systemsThinking: 0.9 },
          domainRelevance: { software: 1 },
          subDomainHint: "database-storage",
        },
        {
          id: "p2-soft-q3-algo",
          label: "D",
          text: "A mathematical optimization SDK widely imported and trusted by other developers for complex calculations.",
          signalWeights: { problemSolving: 0.9 },
          domainRelevance: { software: 1 },
          subDomainHint: "algo-sdk",
        },
      ],
    },
  ],
};

// ============================================================================
// 3. AI PROVIDER IMPLEMENTATION (GEMINI + DETERMINISTIC FALLBACK)
// ============================================================================

export interface GenerateQuestionContext {
  phase: 1 | 2;
  questionCount: number;
  questionHistory: AnswerRecord[];
  signalScores: SignalScores;
  domainScores: DomainScores;
  broadDomain?: DomainId;
}

/**
 * Attempts to generate an adaptive question using Gemini API with strict structured schema.
 * If unavailable, timed out, or invalid, gracefully returns null so fallback activates.
 */
async function queryGeminiForQuestion(
  context: GenerateQuestionContext
): Promise<AdaptiveQuestion | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null; // Graceful fallback
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4-second strict timeout

    const prompt = `You are the adaptive diagnostic engine for Skill Bridge Student Interest Discovery.
Generate the next single adaptive diagnostic question for a student exploring technical disciplines.

CURRENT CONTEXT:
- Phase: ${context.phase === 1 ? "1 (BLIND INTEREST DISCOVERY - DO NOT MENTION ANY TECHNICAL DOMAIN NAMES)" : `2 (SUB-DOMAIN DISCOVERY for ${context.broadDomain})`}
- Question Number: ${context.questionCount + 1}
- Answered Count: ${context.questionHistory.length}
- Current Top Signals: ${JSON.stringify(context.signalScores)}
${context.broadDomain ? `- Targeted Domain: ${context.broadDomain}` : ""}

STRICT RULES:
1. If Phase 1: The question and options MUST NOT mention domain names ("Cybersecurity", "Cloud", "Web", "AI", "Software") or ask what domain the student prefers. Use realistic engineering scenarios, problem situations, and practical choices.
2. Provide exactly 3 or 4 compelling options (A, B, C, D).
3. Return ONLY valid JSON matching this schema:
{
  "id": "gemini-q-${Date.now()}",
  "phase": ${context.phase},
  "questionNumber": ${context.questionCount + 1},
  "totalQuestionsEstimated": ${context.phase === 1 ? 5 : 3},
  "questionText": "The situational question text",
  "purpose": "Internal diagnostic purpose",
  "options": [
    {
      "id": "opt-a",
      "label": "A",
      "text": "Option text",
      "signalWeights": { "investigation": 0.8, "securityMindset": 0.7 },
      "domainRelevance": { "security": 0.8 }
    }
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.3,
        },
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText) as AdaptiveQuestion;
    // Runtime schema validation
    if (
      parsed.questionText &&
      Array.isArray(parsed.options) &&
      parsed.options.length >= 3 &&
      parsed.options.every((o) => o.text && o.label)
    ) {
      return parsed;
    }
    return null;
  } catch {
    // Network failure, timeout, or parsing error -> fallback silently
    return null;
  }
}

/**
 * Primary server-side function to retrieve the next adaptive question.
 * Always returns a validated AdaptiveQuestion object.
 */
export async function getNextAdaptiveQuestion(
  context: GenerateQuestionContext
): Promise<AdaptiveQuestion> {
  // 1. Attempt AI Generation if configured
  const aiGenerated = await queryGeminiForQuestion(context);
  if (aiGenerated) {
    return aiGenerated;
  }

  // 2. Deterministic Adaptive Fallback Engine
  if (context.phase === 1) {
    // Filter out already answered questions
    const answeredIds = new Set(context.questionHistory.map((a) => a.questionId));
    const candidateQuestions = PHASE_1_BLIND_SCENARIOS.filter(
      (q) => !answeredIds.has(q.id)
    );

    if (candidateQuestions.length > 0) {
      // Pick next sequential question matching adaptive index
      const nextQ = candidateQuestions[0];
      return {
        ...nextQ,
        questionNumber: context.questionCount + 1,
        totalQuestionsEstimated: Math.max(5, context.questionCount + 1),
      };
    }

    // If candidate pool exhausted, return calibrated fallback
    const fallback = PHASE_1_BLIND_SCENARIOS[PHASE_1_BLIND_SCENARIOS.length - 1];
    return {
      ...fallback,
      id: `p1-repeat-${context.questionCount + 1}`,
      questionNumber: context.questionCount + 1,
      totalQuestionsEstimated: context.questionCount + 1,
    };
  }

  // Phase 2: Sub-domain discovery for the confirmed broad domain
  const domain = context.broadDomain || "security";
  const domainQuestions = PHASE_2_DOMAIN_SCENARIOS[domain] || PHASE_2_DOMAIN_SCENARIOS.security;
  const answeredPhase2Ids = new Set(
    context.questionHistory.filter((a) => a.phase === 2).map((a) => a.questionId)
  );

  const candidateP2 = domainQuestions.filter((q) => !answeredPhase2Ids.has(q.id));
  if (candidateP2.length > 0) {
    const nextQ = candidateP2[0];
    return {
      ...nextQ,
      questionNumber: context.questionCount + 1,
      totalQuestionsEstimated: 3,
    };
  }

  return {
    ...domainQuestions[domainQuestions.length - 1],
    id: `p2-repeat-${context.questionCount + 1}`,
    questionNumber: context.questionCount + 1,
    totalQuestionsEstimated: 3,
  };
}
