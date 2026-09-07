/**
 * Skill Bridge — Personalized Niche Trends Engine (for Advanced Students)
 * Grounds emerging industry paradigms into actionable, profile-contextualized
 * skill recommendations tailored to the student's confirmed domain & niche.
 */

export interface NicheTrendItem {
  id: string;
  domainId: string;
  nicheId: string;
  trendTitle: string;
  whyItMatters: string;
  recommendedSkill: string;
  relationshipToProfile: string;
  suggestedNextStep: string;
  source: string;
  lastUpdated: string;
}

// Canonical, verified industry shifts by technical domain & niche
const NICHE_TREND_CATALOG: NicheTrendItem[] = [
  // ==========================================================================
  // CYBERSECURITY
  // ==========================================================================
  {
    id: "trend-sec-appsec-1",
    domainId: "security",
    nicheId: "app-sec",
    trendTitle: "AI-Assisted Threat Modeling & SAST Pipeline Automation",
    whyItMatters:
      "Enterprise security engineering teams are transitioning from manual code audits to automated, AI-augmented Static Application Security Testing (SAST) embedded directly into pull request workflows.",
    recommendedSkill: "Automated SAST Rule Authoring & CI/CD Security Gates",
    relationshipToProfile:
      "Builds directly upon your advanced foundation in OWASP Top 10 vulnerabilities, shifting focus from vulnerability identification to automated prevention at deployment scale.",
    suggestedNextStep:
      "Explore Semgrep or CodeQL custom rule authoring and integrate automated security linters into GitHub Actions.",
    source: "OWASP Top 10 & SANS Technical Security Benchmark",
    lastUpdated: "2026-03-01T00:00:00Z",
  },
  {
    id: "trend-sec-appsec-2",
    domainId: "security",
    nicheId: "app-sec",
    trendTitle: "Zero-Trust API Authorization & Cryptographic Token Binding",
    whyItMatters:
      "Standard bearer token patterns are increasingly vulnerable to token theft. High-security microservice architectures now mandate Mutual TLS and cryptographic token binding (DPoP / mTLS).",
    recommendedSkill: "Demonstrating Proof-of-Possession (DPoP) & mTLS Mesh Security",
    relationshipToProfile:
      "Complements your authentication & identity management competence by hardening microservice perimeter interfaces against replay attacks.",
    suggestedNextStep:
      "Implement RFC 9449 OAuth 2.0 DPoP in a sample Node/Python service and test token replay protection.",
    source: "IETF RFC 9449 & Cloud Native Computing Foundation",
    lastUpdated: "2026-02-15T00:00:00Z",
  },

  // ==========================================================================
  // AI / MACHINE LEARNING
  // ==========================================================================
  {
    id: "trend-ai-agentic-1",
    domainId: "ai-ml",
    nicheId: "agentic-systems",
    trendTitle: "Agentic AI Multi-Step Reasoning & Tool Orchestration",
    whyItMatters:
      "Production machine learning is shifting from single-prompt LLM generation to autonomous multi-agent systems with deterministic tool calling, state machines, and sandboxed execution.",
    recommendedSkill: "Autonomous Agent Orchestration & Deterministic Function Calling",
    relationshipToProfile:
      "Advances your machine learning proficiency into production-grade multi-agent architectures, combining data science with systems engineering.",
    suggestedNextStep:
      "Build a multi-agent evaluation harness with human-in-the-loop controls and execution sandboxes.",
    source: "NeurIPS & Open Source Agent Framework Benchmarks",
    lastUpdated: "2026-03-01T00:00:00Z",
  },
  {
    id: "trend-ai-rag-2",
    domainId: "ai-ml",
    nicheId: "data-intelligence",
    trendTitle: "Hybrid Vector Search & RAG Hallucination Observability",
    whyItMatters:
      "Simple cosine similarity in vector databases often misses exact keyword nuances. Production retrieval systems now combine dense vector embeddings with sparse BM25 indexing and continuous reranking.",
    recommendedSkill: "Hybrid Vector-Sparse Indexing & Context-Relevance Reranking",
    relationshipToProfile:
      "Elevates your data engineering foundation to address production hallucination rates and enterprise search latency requirements.",
    suggestedNextStep:
      "Implement a reciprocal rank fusion (RRF) pipeline comparing dense embeddings with sparse lexical search.",
    source: "Association for Computational Linguistics (ACL)",
    lastUpdated: "2026-02-20T00:00:00Z",
  },

  // ==========================================================================
  // CLOUD & DEVOPS
  // ==========================================================================
  {
    id: "trend-cloud-platform-1",
    domainId: "cloud-devops",
    nicheId: "platform-engineering",
    trendTitle: "Internal Developer Platforms (IDPs) & Declarative Infrastructure",
    whyItMatters:
      "Organizations are shifting from ticket-based DevOps to self-service Internal Developer Platforms built on Kubernetes operators and Crossplane, eliminating developer infrastructure bottlenecks.",
    recommendedSkill: "Kubernetes Custom Resource Definitions (CRDs) & Self-Service IDPs",
    relationshipToProfile:
      "Positions your container orchestration knowledge at the forefront of modern infrastructure management by abstracting cloud complexity for engineering teams.",
    suggestedNextStep:
      "Create a custom Kubernetes operator that provisions complete development environments on demand.",
    source: "CNCF Platform Engineering Working Group",
    lastUpdated: "2026-02-10T00:00:00Z",
  },

  // ==========================================================================
  // FULL STACK / WEB ARCHITECTURE
  // ==========================================================================
  {
    id: "trend-web-perf-1",
    domainId: "software-engineering",
    nicheId: "full-stack",
    trendTitle: "Edge Runtime SSR & Fine-Grained Component Resumability",
    whyItMatters:
      "Traditional full-page hydration is being replaced by partial hydration and edge-native server components to achieve sub-second Core Web Vitals across global distributed networks.",
    recommendedSkill: "Edge Computing Architecture & Server-Driven Streaming Renders",
    relationshipToProfile:
      "Expands your existing full-stack architecture foundation to high-throughput, low-latency distributed web applications.",
    suggestedNextStep:
      "Benchmark streaming React Server Components against client-side hydration for content-heavy user interfaces.",
    source: "W3C Web Performance Working Group",
    lastUpdated: "2026-02-28T00:00:00Z",
  },
];

/**
 * Returns personalized niche trends for an advanced student.
 * If student is not advanced, returns null.
 */
export function getPersonalizedNicheTrends(params: {
  isAdvanced: boolean;
  domainId?: string;
  nicheId?: string;
  studentSkills?: string[];
}): NicheTrendItem[] | null {
  if (!params.isAdvanced) {
    return null;
  }

  const { domainId, nicheId } = params;

  // Filter trends matching student's domain or niche
  let matched = NICHE_TREND_CATALOG.filter((trend) => {
    if (nicheId && trend.nicheId === nicheId) return true;
    if (domainId && trend.domainId === domainId) return true;
    return false;
  });

  // If no exact domain match, provide the top cross-disciplinary technical shifts
  if (matched.length === 0) {
    matched = NICHE_TREND_CATALOG.slice(0, 2);
  }

  return matched;
}
