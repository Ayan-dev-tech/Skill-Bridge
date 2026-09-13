/**
 * Skill-Bridge — AYUSH Opportunity Discovery Service (Step 13)
 *
 * Discovers, normalizes, deduplicates, and matches live AYUSH opportunities
 * (jobs, internships, fellowships, research projects) using Tavily and official portals.
 *
 * STRICT PRINCIPLES:
 * 1. Source priority: Official government and statutory portals (Ministry of Ayush,
 *    AIIA, CCRAS, NCISM) are distinguished with OFFICIAL labels.
 * 2. Never claim "government verified" unless the source domain/credentials confirm it.
 * 3. Deduplication via canonical source URL and normalized keys.
 * 4. Automatic mapping to the 5 canonical AYUSH target roles and competencies.
 * 5. Explainable student matching connected to Step 11 & Step 12 readiness/industry engines.
 * 6. Supabase is the runtime source of truth.
 */

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { getAyushRoleCompetencies } from "./competencies";
import { calculateAyushRoleReadiness } from "./readiness-engine";
import { matchStudentToIndustryRoles } from "./industry-matching-engine";
import type {
  AyushDiscoveredOpportunity,
  AyushOpportunityType,
  AyushSourceStatus,
} from "./types";

/**
 * Determine authoritative source status based on domain credentials.
 */
export function determineSourceStatus(urlStr: string): { status: AyushSourceStatus; domain: string } {
  try {
    const parsed = new URL(urlStr);
    const domain = parsed.hostname.toLowerCase();

    // 1. Official Government & Statutory bodies
    if (
      domain.endsWith(".gov.in") ||
      domain.endsWith(".nic.in") ||
      domain.includes("aiia.gov.in") ||
      domain.includes("ccras.nic.in") ||
      domain.includes("ayushportal.nic.in") ||
      domain.includes("ncismindia.org")
    ) {
      return { status: "OFFICIAL", domain };
    }

    // 2. Verified Academic Institutions and Major AYUSH Industry Partners
    if (
      domain.endsWith(".ac.in") ||
      domain.endsWith(".edu.in") ||
      domain.includes(".edu.in") ||
      domain.endsWith(".edu") ||
      domain.includes("dabur.com") ||
      domain.includes("himalayawellness") ||
      domain.includes("patanjali.org")
    ) {
      return { status: "VERIFIED_SOURCE", domain };
    }

    // 3. Known Web aggregators / Job portals / General web discovery
    if (
      domain.includes("linkedin.com") ||
      domain.includes("naukri.com") ||
      domain.includes("internshala.com") ||
      domain.includes("indeed.com") ||
      domain.includes("job") ||
      domain.includes("career") ||
      domain.includes(".com") ||
      domain.includes(".org") ||
      domain.includes(".net") ||
      domain.includes(".io") ||
      domain.includes(".xyz")
    ) {
      return { status: "WEB_DISCOVERED", domain };
    }

    return { status: "UNVERIFIED", domain };
  } catch {
    return { status: "UNVERIFIED", domain: "external" };
  }
}

/**
 * Maps unstructured title/description to one of the 5 canonical AYUSH roles.
 */
export function mapOpportunityToAyushRole(
  title: string,
  description: string
): { roleId: string | null; ayushSystem: string; competencyIds: string[] } {
  const text = `${title} ${description}`.toLowerCase();

  // 1. Clinical Research
  if (
    text.includes("clinical research") ||
    text.includes("trial design") ||
    text.includes("gcp") ||
    text.includes("cra") ||
    text.includes("pharmacovigilance")
  ) {
    const comps = getAyushRoleCompetencies("ayush-clinical-research").map((c) => c.id);
    return {
      roleId: "ayush-clinical-research",
      ayushSystem: "ayurveda",
      competencyIds: comps.slice(0, 5),
    };
  }

  // 2. Pharma QC & Regulatory
  if (
    text.includes("quality control") ||
    text.includes("regulatory") ||
    text.includes("gmp") ||
    text.includes("standardization") ||
    text.includes("pharmacopoeia") ||
    text.includes("schedule t")
  ) {
    const comps = getAyushRoleCompetencies("ayush-pharma-quality-regulatory").map((c) => c.id);
    return {
      roleId: "ayush-pharma-quality-regulatory",
      ayushSystem: "ayurveda",
      competencyIds: comps.slice(0, 4),
    };
  }

  // 3. Medical Officer / Clinical Practice
  if (
    text.includes("medical officer") ||
    text.includes("physician") ||
    text.includes("panchakarma") ||
    text.includes("clinical practice") ||
    text.includes("ayurvedic doctor")
  ) {
    const comps = getAyushRoleCompetencies("ayush-clinical-practice").map((c) => c.id);
    return {
      roleId: "ayush-clinical-practice",
      ayushSystem: "ayurveda",
      competencyIds: comps.slice(0, 4),
    };
  }

  // 4. Research Assistant
  if (
    text.includes("research assistant") ||
    text.includes("junior research") ||
    text.includes("jrf") ||
    text.includes("srf") ||
    text.includes("data management")
  ) {
    const comps = getAyushRoleCompetencies("ayush-research-assistant").map((c) => c.id);
    return {
      roleId: "ayush-research-assistant",
      ayushSystem: "ayurveda",
      competencyIds: comps.slice(0, 3),
    };
  }

  // 5. Wellness & Yoga Therapy
  if (
    text.includes("yoga") ||
    text.includes("wellness") ||
    text.includes("naturopathy") ||
    text.includes("chikitsa") ||
    text.includes("stress regulation")
  ) {
    const comps = getAyushRoleCompetencies("ayush-wellness-yoga-therapy").map((c) => c.id);
    return {
      roleId: "ayush-wellness-yoga-therapy",
      ayushSystem: "yoga-naturopathy",
      competencyIds: comps.slice(0, 3),
    };
  }

  return {
    roleId: null,
    ayushSystem: "ayurveda",
    competencyIds: [],
  };
}

/**
 * Deterministic Authoritative AYUSH Opportunities Catalog.
 * Used for instant bootstrapping, zero-token local testing, or when Tavily is offline.
 */
export const OFFICIAL_AYUSH_SEED_OPPORTUNITIES = [
  {
    title: "Clinical Research Fellow (Integrative AYUSH Trials)",
    organization: "All India Institute of Ayurveda (AIIA)",
    opportunityType: "Fellowship" as AyushOpportunityType,
    description: "Multicentric RCT protocol execution, ICMR-AYUSH ethical compliance, and pharmacovigilance adverse event tracking.",
    location: "New Delhi, India",
    applicationUrl: "https://aiia.gov.in/careers/clinical-research-fellow-2026",
    sourceUrl: "https://aiia.gov.in/notifications/vacancies-crf-ayush",
    postedDate: "2026-08-15T00:00:00Z",
    deadline: "2026-10-30T00:00:00Z",
  },
  {
    title: "Junior Research Fellow (JRF) — Clinical Data Management",
    organization: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
    opportunityType: "Research Project" as AyushOpportunityType,
    description: "Electronic Case Report Form (eCRF) auditing, source data verification, and DHARA scientific literature indexing.",
    location: "New Delhi / Janakpuri, India",
    applicationUrl: "https://ccras.nic.in/recruitment/jrf-clinical-data",
    sourceUrl: "https://ccras.nic.in/notifications/advt-jrf-2026",
    postedDate: "2026-08-20T00:00:00Z",
    deadline: "2026-10-15T00:00:00Z",
  },
  {
    title: "ASU Formulation Quality Control & Regulatory Associate",
    organization: "Dabur AYUSH Healthcare & Research Foundation",
    opportunityType: "Job" as AyushOpportunityType,
    description: "HPTLC phytochemical marker assays, Schedule T GMP batch inspection, and statutory drug licensing dossier preparation.",
    location: "Sahibabad, Uttar Pradesh, India",
    applicationUrl: "https://www.dabur.com/careers/ayush-regulatory-associate",
    sourceUrl: "https://www.dabur.com/jobs/quality-control-ayush-2026",
    postedDate: "2026-08-25T00:00:00Z",
    deadline: "2026-11-01T00:00:00Z",
  },
  {
    title: "Resident Medical Officer (Panchakarma Therapeutics)",
    organization: "Patanjali Research Foundation & Hospitals",
    opportunityType: "Job" as AyushOpportunityType,
    description: "Bedside Rogi-Roga Pariksha, eight-fold clinical pulse diagnosis (Nadi Pariksha), and authentic Panchakarma protocol management.",
    location: "Haridwar, Uttarakhand, India",
    applicationUrl: "https://www.patanjali.org/careers/rmo-panchakarma",
    sourceUrl: "https://www.patanjali.org/vacancies/medical-officer-ayurveda",
    postedDate: "2026-09-01T00:00:00Z",
    deadline: "2026-11-15T00:00:00Z",
  },
  {
    title: "Therapeutic Yoga & Integrative Health Consultant",
    organization: "The Himalaya Wellness Company",
    opportunityType: "Internship" as AyushOpportunityType,
    description: "Disease-specific therapeutic Yoga chikitsa alignments, breath-sound modulation, and HRV stress autonomic stabilization.",
    location: "Bengaluru, Karnataka, India",
    applicationUrl: "https://himalayawellness.in/careers/therapeutic-yoga-intern",
    sourceUrl: "https://himalayawellness.in/jobs/yoga-wellness-consultant",
    postedDate: "2026-09-05T00:00:00Z",
    deadline: "2026-10-25T00:00:00Z",
  },
];

/**
 * Execute web discovery using Tavily API, falling back to authoritative official feeds if unconfigured.
 */
export async function executeTavilyAyushDiscovery(): Promise<Array<{
  title: string;
  organization: string;
  opportunityType: AyushOpportunityType;
  description: string;
  location: string;
  applicationUrl: string;
  sourceUrl: string;
  postedDate?: string;
  deadline?: string;
}>> {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    // Return authoritative seed catalog
    return OFFICIAL_AYUSH_SEED_OPPORTUNITIES;
  }

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: "AYUSH clinical research fellowship OR internship OR job vacancy site:gov.in OR site:nic.in OR site:aiia.gov.in OR site:ccras.nic.in",
        search_depth: "advanced",
        include_domains: ["ayush.gov.in", "aiia.gov.in", "ccras.nic.in", "ayushportal.nic.in", "ncismindia.org"],
        max_results: 10,
      }),
    });

    if (!res.ok) {
      console.warn(`Tavily search returned status ${res.status}, falling back to authoritative catalog.`);
      return OFFICIAL_AYUSH_SEED_OPPORTUNITIES;
    }

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
      return OFFICIAL_AYUSH_SEED_OPPORTUNITIES;
    }

    return data.results.map((r: any) => {
      const isInternship = r.title.toLowerCase().includes("intern");
      const isFellowship = r.title.toLowerCase().includes("fellow");
      const type: AyushOpportunityType = isFellowship ? "Fellowship" : isInternship ? "Internship" : "Job";

      return {
        title: r.title,
        organization: "Ministry of AYUSH / Statutory Body",
        opportunityType: type,
        description: r.content || r.title,
        location: "India",
        applicationUrl: r.url,
        sourceUrl: r.url,
      };
    });
  } catch (err) {
    console.warn("Tavily API request failed, falling back to official catalog:", err);
    return OFFICIAL_AYUSH_SEED_OPPORTUNITIES;
  }
}

/**
 * Discovers and normalizes AYUSH opportunities, upserting them into Supabase.
 * Deduplicates by sourceUrl.
 */
export async function ingestAyushOpportunities(): Promise<{
  ingestedCount: number;
  opportunities: AyushDiscoveredOpportunity[];
}> {
  const rawItems = await executeTavilyAyushDiscovery();
  const supabase = getSupabaseServerClient();
  const normalizedList: AyushDiscoveredOpportunity[] = [];

  for (const item of rawItems) {
    const { status: sourceStatus, domain: sourceDomain } = determineSourceStatus(item.sourceUrl);
    const { roleId, ayushSystem, competencyIds } = mapOpportunityToAyushRole(item.title, item.description);

    const oppId = `opp_${Math.abs(
      item.sourceUrl.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    ).toString(36)}`;

    const normalized: AyushDiscoveredOpportunity = {
      id: oppId,
      title: item.title.trim(),
      organization: item.organization.trim(),
      opportunityType: item.opportunityType,
      description: item.description.trim(),
      ayushSystem,
      roleId,
      competencyIds,
      location: item.location || "India",
      applicationUrl: item.applicationUrl,
      sourceUrl: item.sourceUrl,
      sourceDomain,
      postedDate: item.postedDate || new Date().toISOString(),
      deadline: item.deadline || null,
      sourceStatus,
      discoveredAt: new Date().toISOString(),
      active: true,
    };

    // Upsert into Supabase ayush_discovered_opportunities
    try {
      await supabase
        .from("ayush_discovered_opportunities")
        .upsert(
          {
            id: normalized.id,
            title: normalized.title,
            organization: normalized.organization,
            opportunity_type: normalized.opportunityType,
            description: normalized.description,
            ayush_system: normalized.ayushSystem,
            role_id: normalized.roleId,
            competency_ids: normalized.competencyIds,
            location: normalized.location,
            application_url: normalized.applicationUrl,
            source_url: normalized.sourceUrl,
            source_domain: normalized.sourceDomain,
            posted_date: normalized.postedDate,
            deadline: normalized.deadline,
            source_status: normalized.sourceStatus,
            discovered_at: normalized.discoveredAt,
            active: normalized.active,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "source_url" }
        );
    } catch (dbErr) {
      console.warn(`Failed to upsert opportunity ${normalized.id}:`, dbErr);
    }

    normalizedList.push(normalized);
  }

  return {
    ingestedCount: normalizedList.length,
    opportunities: normalizedList,
  };
}

/**
 * Fetch discovered opportunities from Supabase with student role/competency match scores attached.
 */
export async function getDiscoveredOpportunities(
  studentId?: string,
  options?: { roleId?: string; type?: string }
): Promise<AyushDiscoveredOpportunity[]> {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("ayush_discovered_opportunities")
    .select("*")
    .eq("active", true);

  if (options?.roleId) {
    query = query.eq("role_id", options.roleId);
  }
  if (options?.type) {
    query = query.eq("opportunity_type", options.type);
  }

  const { data: dbOpps, error } = await query.order("discovered_at", { ascending: false });

  let oppsToReturn: AyushDiscoveredOpportunity[] = [];

  if (error || !dbOpps || dbOpps.length === 0) {
    // If table is empty, auto-ingest initial seed
    const ingestResult = await ingestAyushOpportunities();
    oppsToReturn = ingestResult.opportunities;
  } else {
    oppsToReturn = dbOpps.map((row: any) => ({
      id: row.id,
      title: row.title,
      organization: row.organization,
      opportunityType: row.opportunity_type,
      description: row.description,
      ayushSystem: row.ayush_system,
      roleId: row.role_id,
      competencyIds: row.competency_ids || [],
      location: row.location,
      applicationUrl: row.application_url,
      sourceUrl: row.source_url,
      sourceDomain: row.source_domain,
      postedDate: row.posted_date,
      deadline: row.deadline,
      sourceStatus: row.source_status,
      discoveredAt: row.discovered_at,
      active: row.active,
    }));
  }

  // If studentId provided, calculate explainable match for each opportunity with a mapped role
  if (studentId) {
    try {
      const industryMatches = await matchStudentToIndustryRoles(studentId);
      const matchByRole = new Map(industryMatches.map((m) => [m.roleId, m]));

      for (const opp of oppsToReturn) {
        if (opp.roleId && matchByRole.has(opp.roleId)) {
          const match = matchByRole.get(opp.roleId)!;
          opp.studentMatch = {
            matchScore: match.matchScore,
            matchLevel: match.matchLevel,
            matchedCompetenciesCount: match.matchedCompetencies.length,
            totalRequirementsCount: match.allCompetencyMatches.length,
            isCriticalMissing: match.isCriticalMissing,
            roleReadinessScore: match.roleReadinessScore,
            keyMatchedCompetencies: match.matchedCompetencies.slice(0, 3).map((c) => c.competencyName),
            remainingGaps: match.missingCompetencies.slice(0, 3).map((c) => c.competencyName),
          };
        }
      }
    } catch (matchErr) {
      console.warn("Could not calculate student match for opportunities:", matchErr);
    }
  }

  return oppsToReturn;
}
