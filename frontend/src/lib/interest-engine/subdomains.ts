/**
 * Skill Bridge — Sub-Domain Taxonomy & Niche Taxonomy
 * Comprehensive hierarchy for all 5 technical engineering domains.
 */

import { DomainId } from "./types";

export interface SubDomainNiche {
  id: string;
  name: string;
  shortDesc: string;
  nicheTitle: string;
  whyThisFits: string;
  sampleScenarios: string[];
}

export interface DomainTaxonomy {
  domainId: DomainId;
  name: string;
  tagline: string;
  subDomains: SubDomainNiche[];
}

export const DOMAIN_TAXONOMY: Record<DomainId, DomainTaxonomy> = {
  security: {
    domainId: "security",
    name: "Cybersecurity & Defense",
    tagline: "Protecting systems, verifying trust, and adversarial mitigation",
    subDomains: [
      {
        id: "app-sec",
        name: "Application Security & Vulnerability Research",
        shortDesc: "Auditing source code, identifying software vulnerabilities, and hardening APIs.",
        nicheTitle: "Application Security & Vulnerability Research",
        whyThisFits:
          "Your answers demonstrate an inclination for finding obscure code weaknesses, analyzing data validation flaws, and safeguarding user applications before deployment.",
        sampleScenarios: [
          "Discovering an input deserialization flaw allowing remote code execution",
          "Conducting security audits on newly merged microservice pull requests",
        ],
      },
      {
        id: "soc-threat",
        name: "Network Defense & Threat Operations (SOC)",
        shortDesc: "Monitoring live attack telemetry, dissecting intrusion signals, and orchestrating incident response.",
        nicheTitle: "Network Defense & Threat Operations (SOC)",
        whyThisFits:
          "You gravitate toward investigating active anomalies, analyzing behavioral packet traces, and containing adversarial activity across enterprise infrastructure.",
        sampleScenarios: [
          "Tracing unusual egress spikes to an unauthorized outbound tunnel",
          "Reconstructing an attacker's timeline across compromised endpoint logs",
        ],
      },
      {
        id: "pentest-offensive",
        name: "Penetration Testing & Offensive Security",
        shortDesc: "Simulating sophisticated cyber attacks to expose systemic organizational weaknesses.",
        nicheTitle: "Penetration Testing & Red Teaming",
        whyThisFits:
          "You enjoy thinking from an attacker's perspective, chaining together subtle flaws, and bypassing defensive barriers through creative problem-solving.",
        sampleScenarios: [
          "Crafting a multi-stage exploit chain to demonstrate privilege escalation",
          "Evaluating defense postures during an authorized black-box intrusion exercise",
        ],
      },
      {
        id: "cloud-iam",
        name: "Cloud & Identity Governance (IAM)",
        shortDesc: "Architecting zero-trust identity models, least-privilege policies, and cryptographic controls.",
        nicheTitle: "Cloud Security Architecture & Zero-Trust IAM",
        whyThisFits:
          "You prefer systematic boundary design, cryptographic access proofs, and resilient role definitions across cloud platforms.",
        sampleScenarios: [
          "Enforcing least-privilege policies across thousands of microservice roles",
          "Designing automated key rotation and token verification for zero-trust clusters",
        ],
      },
    ],
  },
  "ai-ml": {
    domainId: "ai-ml",
    name: "AI / Machine Learning",
    tagline: "From statistical foundations to intelligent empirical systems",
    subDomains: [
      {
        id: "cv-deeplearning",
        name: "Deep Learning & Computer Vision",
        shortDesc: "Training neural architectures on multi-modal sensory inputs and visual patterns.",
        nicheTitle: "Computer Vision & Deep Learning Engineering",
        whyThisFits:
          "You enjoy empirical experimentation, mathematical representations of images and video, and tuning convolutional or transformer backbones.",
        sampleScenarios: [
          "Optimizing feature extraction layers for real-time edge object detection",
          "Evaluating model precision under adverse sensor noise conditions",
        ],
      },
      {
        id: "nlp-llm",
        name: "Natural Language Processing & LLMs",
        shortDesc: "Semantic understanding, tokenization, language modeling, and retrieval systems.",
        nicheTitle: "Language Models & Applied NLP Systems",
        whyThisFits:
          "You are intrigued by language semantics, contextual retrieval over large corpora, and generative reasoning pipelines.",
        sampleScenarios: [
          "Building semantic chunking and re-ranking pipelines for dense retrieval",
          "Fine-tuning domain-specific language representations on technical text",
        ],
      },
      {
        id: "mlops",
        name: "Machine Learning Operations (MLOps)",
        shortDesc: "Automating model training pipelines, monitoring feature drift, and low-latency inference.",
        nicheTitle: "MLOps & Production ML Infrastructure",
        whyThisFits:
          "You bridge machine learning models with reliable production systems, emphasizing reproducible training runs and low-latency serving.",
        sampleScenarios: [
          "Detecting dataset drift in streaming transaction models",
          "Deploying quantized inference containers with sub-10ms response times",
        ],
      },
      {
        id: "data-eng",
        name: "Data Engineering & Analytics Systems",
        shortDesc: "Designing massive distributed data pipelines, lakehouses, and real-time event streams.",
        nicheTitle: "Large-Scale Data Engineering & Analytics",
        whyThisFits:
          "You enjoy organizing structured datasets, architecting streaming telemetry pipelines, and building robust analytical foundations.",
        sampleScenarios: [
          "Orchestrating petabyte-scale distributed transforms across Apache Kafka and Spark",
          "Designing resilient schema evolutions for analytical event streams",
        ],
      },
    ],
  },
  cloud: {
    domainId: "cloud",
    name: "Cloud & Infrastructure",
    tagline: "Scalability, distributed topology, and reliability engineering",
    subDomains: [
      {
        id: "sre-reliability",
        name: "Site Reliability Engineering (SRE)",
        shortDesc: "Ensuring 99.99% system availability, error budgets, and chaos testing.",
        nicheTitle: "Site Reliability Engineering (SRE)",
        whyThisFits:
          "You thrive on diagnosing distributed bottlenecks, designing failover contingencies, and engineering systems that resist failure.",
        sampleScenarios: [
          "Diagnosing cascading service latency during an unexpected upstream partition",
          "Defining error budgets and automated canary rollbacks for production microservices",
        ],
      },
      {
        id: "devops-cicd",
        name: "DevOps & Infrastructure as Code",
        shortDesc: "Automating multi-cloud deployment pipelines, Terraform scripts, and container orchestration.",
        nicheTitle: "DevOps & Infrastructure Automation",
        whyThisFits:
          "You excel at automating repetitive developer workflows, treating infrastructure as declarative code, and building streamlined delivery pipelines.",
        sampleScenarios: [
          "Authoring modular Terraform configurations for automated environment provisioning",
          "Building multi-stage container builds with vulnerability gating in CI pipelines",
        ],
      },
      {
        id: "cloud-arch",
        name: "Cloud Solutions Architecture",
        shortDesc: "Designing resilient multi-region architectures, load distribution, and cost efficiency.",
        nicheTitle: "Cloud Solutions Architecture",
        whyThisFits:
          "You enjoy high-level topological planning, selecting the right distributed cloud primitives, and architecting cost-effective systems.",
        sampleScenarios: [
          "Architecting active-active multi-region database replication with low latency",
          "Optimizing compute instance fleets to reduce cloud operational expenditure by 40%",
        ],
      },
      {
        id: "serverless-edge",
        name: "Serverless & Edge Compute",
        shortDesc: "Event-driven micro-functions, edge routing, and global caching fabrics.",
        nicheTitle: "Serverless & Distributed Edge Systems",
        whyThisFits:
          "You prefer event-driven architectures that scale on demand to zero, minimizing cold starts and deploying logic nearest to global users.",
        sampleScenarios: [
          "Deploying low-latency edge middleware for geo-distributed user sessions",
          "Decoupling monolithic request paths into event-driven serverless worker queues",
        ],
      },
    ],
  },
  web: {
    domainId: "web",
    name: "Web & Full-Stack Systems",
    tagline: "Interactive user interfaces and high-performance backend services",
    subDomains: [
      {
        id: "frontend-arch",
        name: "Modern Frontend Architecture",
        shortDesc: "Crafting fluid reactive interfaces, state management, and design systems.",
        nicheTitle: "Frontend Architecture & Interactive UX Engineering",
        whyThisFits:
          "You care deeply about the user experience, instantaneous rendering feedback, polished component libraries, and modular state management.",
        sampleScenarios: [
          "Architecting an accessible design token system for dark/light design synchronization",
          "Optimizing client-side DOM rendering and bundle size for instant page loads",
        ],
      },
      {
        id: "backend-api",
        name: "High-Throughput Backend APIs & Microservices",
        shortDesc: "Low-latency REST/gRPC endpoints, connection pools, and caching layers.",
        nicheTitle: "High-Throughput Backend & API Engineering",
        whyThisFits:
          "You find satisfaction in crafting rock-solid API contracts, optimizing database queries, and managing resilient microservice communications.",
        sampleScenarios: [
          "Designing a high-concurrency Redis caching layer to offload heavy SQL lookups",
          "Implementing idempotent payment and webhook endpoints under burst traffic",
        ],
      },
      {
        id: "fullstack-product",
        name: "Full-Stack Product Engineering",
        shortDesc: "Connecting database models, business logic, and UI into cohesive end-user products.",
        nicheTitle: "Full-Stack Product Engineering",
        whyThisFits:
          "You love seeing the entire picture—taking a product feature from database schema and backend API all the way to a delightful user interface.",
        sampleScenarios: [
          "Building an end-to-end collaborative editor with live syncing and persistent storage",
          "Rapidly translating customer problem requirements into clean, working full-stack features",
        ],
      },
      {
        id: "web-perf",
        name: "Web Performance & Core Web Vitals",
        shortDesc: "Optimizing browser rendering pipelines, assets, and network delivery.",
        nicheTitle: "Web Performance & Core Vitals Engineering",
        whyThisFits:
          "You enjoy inspecting profiling flamegraphs, shaving milliseconds off payload sizes, and squeezing maximum efficiency out of browser runtimes.",
        sampleScenarios: [
          "Eliminating layout shifts (CLS) and optimizing largest contentful paint (LCP)",
          "Profiling JavaScript heap allocations to eliminate browser memory leaks",
        ],
      },
    ],
  },
  software: {
    domainId: "software",
    name: "Software & Core Systems",
    tagline: "Algorithms, low-level engineering, and performant logic",
    subDomains: [
      {
        id: "systems-cpp-rust",
        name: "Systems Programming (C++, Rust, Go)",
        shortDesc: "Manual memory safety, high-performance concurrency, and OS interaction.",
        nicheTitle: "Low-Level Systems & Concurrency Engineering",
        whyThisFits:
          "You want to understand precisely how hardware operates: CPU cache lines, multi-threaded mutexes, and zero-cost abstractions.",
        sampleScenarios: [
          "Writing a lock-free ring buffer for ultra-fast inter-process communication",
          "Profiling cache misses in a high-frequency order book matching engine",
        ],
      },
      {
        id: "embedded-iot",
        name: "Embedded Systems & IoT Firmware",
        shortDesc: "Microcontrollers, real-time operating systems (RTOS), and hardware interfaces.",
        nicheTitle: "Embedded Systems & Firmware Engineering",
        whyThisFits:
          "You like bridging software directly with the physical world—communicating over I2C/SPI buses and writing ultra-lean code for constrained microcontrollers.",
        sampleScenarios: [
          "Authoring an interrupt-driven sensor driver with minimal battery draw",
          "Managing memory strictly within a 64KB RAM microcontroller footprint",
        ],
      },
      {
        id: "database-storage",
        name: "Distributed Database Engines & Storage",
        shortDesc: "Write-ahead logging (WAL), B-trees/LSM trees, and consensus protocols.",
        nicheTitle: "Database Internals & Distributed Storage",
        whyThisFits:
          "You are fascinated by the internals of storage engines: disk block serialization, ACID guarantees, and Raft consensus algorithms.",
        sampleScenarios: [
          "Implementing a write-ahead log (WAL) with deterministic crash recovery",
          "Optimizing an LSM-tree compaction strategy to reduce write amplification",
        ],
      },
      {
        id: "algo-sdk",
        name: "Algorithmic Problem Solving & SDKs",
        shortDesc: "Core algorithms, compiler optimization, and developer toolchain SDKs.",
        nicheTitle: "Core Algorithms & Developer SDK Engineering",
        whyThisFits:
          "You thrive on mathematical problem solving, asymptotic graph optimizations, and authoring reusable libraries that other developers rely on.",
        sampleScenarios: [
          "Implementing a sub-linear graph partitioning algorithm for route optimization",
          "Designing an ergonomic type-safe SDK for a complex mathematical solver",
        ],
      },
    ],
  },
};
