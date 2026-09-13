/**
 * Skill-Bridge — AYUSH Industry Role Demands Catalog & Supabase Sync (Step 12)
 *
 * Source: industry_skill_demands in Supabase
 * Provides structured, employer-specific competency requirements across all 5 canonical AYUSH roles.
 */

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { ALL_AYUSH_COMPETENCIES } from "./competencies";
import type { IndustryRoleDemand, IndustryCompetencyRequirement } from "./types";

const compNameMap = new Map(ALL_AYUSH_COMPETENCIES.map((c) => [c.id, { name: c.name, category: c.category }]));

function getCompMeta(id: string) {
  const meta = compNameMap.get(id);
  return {
    competencyName: meta?.name || id,
    category: meta?.category || "Core Competency",
  };
}

/**
 * Standard Catalog of AYUSH Industry Role Demands.
 * Each demand represents verified employer requirements with specific weights, targets, and critical flags.
 */
export const CANONICAL_INDUSTRY_DEMANDS: IndustryRoleDemand[] = [
  {
    id: "demand-aiia-cra",
    industryId: "1f80e367-38a7-43d0-9573-fb3d9215d64a",
    organization: "All India Institute of Ayurveda (AIIA) - Clinical Research Directorate",
    roleId: "ayush-clinical-research",
    roleTitle: "AYUSH Clinical Research Associate",
    ayushSystem: "ayurveda",
    demandStatus: "ACTIVE",
    experienceRequirementYears: 1,
    opportunityId: "job-aiia-cra-01",
    description: "Lead GCP-compliant multicenter trials, clinical safety registries, and protocol auditing across AYUSH clinical studies.",
    location: "New Delhi, India",
    requiredCompetencies: [
      {
        competencyId: "comp-ayush-gcp",
        ...getCompMeta("comp-ayush-gcp"),
        requiredRating: 4.0,
        weight: 0.25,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-trial-design",
        ...getCompMeta("comp-ayush-trial-design"),
        requiredRating: 4.0,
        weight: 0.25,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-pvpi",
        ...getCompMeta("comp-ayush-pvpi"),
        requiredRating: 3.0,
        weight: 0.20,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-herb-drug",
        ...getCompMeta("comp-ayush-herb-drug"),
        requiredRating: 4.0,
        weight: 0.15,
        isCritical: false,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-data-mgmt",
        ...getCompMeta("comp-ayush-data-mgmt"),
        requiredRating: 3.0,
        weight: 0.15,
        isCritical: false,
        importance: "preferred",
      },
    ],
  },
  {
    id: "demand-dabur-qa",
    industryId: "e93a2f49-3cc2-4f48-be9f-63f53dedae96",
    organization: "Dabur AYUSH Healthcare & Research Foundation",
    roleId: "ayush-pharma-quality-regulatory",
    roleTitle: "ASU Quality & Regulatory Associate",
    ayushSystem: "ayurveda",
    demandStatus: "URGENT",
    experienceRequirementYears: 1,
    opportunityId: "job-dabur-qa-02",
    description: "Quality assurance, phytochemical fingerprinting, Schedule T GMP batch inspection, and statutory drug regulatory filings.",
    location: "Ghaziabad / Sahibabad, India",
    requiredCompetencies: [
      {
        competencyId: "comp-ayush-standardization",
        ...getCompMeta("comp-ayush-standardization"),
        requiredRating: 3.0,
        weight: 0.30,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-gmp-schedulet",
        ...getCompMeta("comp-ayush-gmp-schedulet"),
        requiredRating: 3.0,
        weight: 0.30,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-regulatory-filing",
        ...getCompMeta("comp-ayush-regulatory-filing"),
        requiredRating: 4.0,
        weight: 0.25,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-pvpi",
        ...getCompMeta("comp-ayush-pvpi"),
        requiredRating: 3.0,
        weight: 0.15,
        isCritical: false,
        importance: "preferred",
      },
    ],
  },
  {
    id: "demand-patanjali-mo",
    organization: "Patanjali Research Foundation",
    roleId: "ayush-clinical-practice",
    roleTitle: "AYUSH Medical Officer (Clinical Practice)",
    ayushSystem: "ayurveda",
    demandStatus: "ACTIVE",
    experienceRequirementYears: 0,
    opportunityId: "job-patanjali-mo-03",
    description: "Bedside patient examination, classical pulse diagnosis (Nadi Pariksha), Panchakarma therapy administration, and clinical protocolization.",
    location: "Haridwar, Uttarakhand, India",
    requiredCompetencies: [
      {
        competencyId: "comp-ayush-bedside-diagnostics",
        ...getCompMeta("comp-ayush-bedside-diagnostics"),
        requiredRating: 3.0,
        weight: 0.30,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-panchakarma-chikitsa",
        ...getCompMeta("comp-ayush-panchakarma-chikitsa"),
        requiredRating: 3.0,
        weight: 0.30,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-chronic-case-mgmt",
        ...getCompMeta("comp-ayush-chronic-case-mgmt"),
        requiredRating: 4.0,
        weight: 0.25,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-herb-drug",
        ...getCompMeta("comp-ayush-herb-drug"),
        requiredRating: 3.0,
        weight: 0.15,
        isCritical: false,
        importance: "preferred",
      },
    ],
  },
  {
    id: "demand-ccras-ra",
    organization: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
    roleId: "ayush-research-assistant",
    roleTitle: "Junior Clinical Research Fellow",
    ayushSystem: "ayurveda",
    demandStatus: "OPEN",
    experienceRequirementYears: 0,
    opportunityId: "job-ccras-ra-04",
    description: "Support screening of clinical trial participants, electronic Case Report Form (eCRF) logging, and DHARA scientific literature indexing.",
    location: "New Delhi / Regional Centres",
    requiredCompetencies: [
      {
        competencyId: "comp-ayush-gcp",
        ...getCompMeta("comp-ayush-gcp"),
        requiredRating: 2.0,
        weight: 0.35,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-data-mgmt",
        ...getCompMeta("comp-ayush-data-mgmt"),
        requiredRating: 2.0,
        weight: 0.35,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-literature-evidence",
        ...getCompMeta("comp-ayush-literature-evidence"),
        requiredRating: 2.0,
        weight: 0.30,
        isCritical: false,
        importance: "essential",
      },
    ],
  },
  {
    id: "demand-himalaya-wellness",
    organization: "The Himalaya Wellness Company",
    roleId: "ayush-wellness-yoga-therapy",
    roleTitle: "Therapeutic Yoga & Wellness Specialist",
    ayushSystem: "yoga-naturopathy",
    demandStatus: "ACTIVE",
    experienceRequirementYears: 1,
    opportunityId: "job-himalaya-yoga-05",
    description: "Design integrative mind-body wellness programs, therapeutic Yoga chikitsa alignments, and HRV autonomic stabilization protocols.",
    location: "Bengaluru, Karnataka, India",
    requiredCompetencies: [
      {
        competencyId: "comp-ayush-yoga-chikitsa",
        ...getCompMeta("comp-ayush-yoga-chikitsa"),
        requiredRating: 3.0,
        weight: 0.35,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-stress-autonomic-regulation",
        ...getCompMeta("comp-ayush-stress-autonomic-regulation"),
        requiredRating: 3.0,
        weight: 0.35,
        isCritical: true,
        importance: "essential",
      },
      {
        competencyId: "comp-ayush-bedside-diagnostics",
        ...getCompMeta("comp-ayush-bedside-diagnostics"),
        requiredRating: 2.0,
        weight: 0.30,
        isCritical: false,
        importance: "preferred",
      },
    ],
  },
];

/**
 * Fetch all active industry role demands from Supabase industry_role_skill_demands table.
 * Groups child competency requirements by employer and role.
 */
export async function getActiveIndustryRoleDemands(): Promise<IndustryRoleDemand[]> {
  try {
    const supabase = getSupabaseServerClient();

    // 1. Query child role demands with parent employer records from Supabase
    const { data: roleSkillRows, error: roleError } = await supabase
      .from("industry_role_skill_demands")
      .select(`
        id,
        industry_demand_id,
        role_id,
        competency_id,
        required_rating,
        weight,
        is_critical,
        active,
        industry_skill_demands:industry_demand_id (
          id,
          industry_id,
          company_name,
          ayush_systems,
          experience_requirement_years
        )
      `)
      .eq("active", true);

    if (roleError || !roleSkillRows || roleSkillRows.length === 0) {
      console.warn("Fallback to CANONICAL_INDUSTRY_DEMANDS (no Supabase rows returned):", roleError?.message);
      return CANONICAL_INDUSTRY_DEMANDS;
    }

    // 2. Group by industry_demand_id + role_id
    const grouped = new Map<string, IndustryRoleDemand>();

    const ROLE_TITLES: Record<string, string> = {
      "ayush-clinical-research": "AYUSH Clinical Research Associate",
      "ayush-pharma-quality-regulatory": "ASU Quality & Regulatory Associate",
      "ayush-clinical-practice": "AYUSH Medical Officer (Clinical Practice)",
      "ayush-research-assistant": "Junior Clinical Research Fellow",
      "ayush-wellness-yoga-therapy": "Therapeutic Yoga & Wellness Specialist",
    };

    const ROLE_SYSTEMS: Record<string, string> = {
      "ayush-wellness-yoga-therapy": "yoga-naturopathy",
    };

    for (const row of roleSkillRows) {
      const parent = (row as any).industry_skill_demands;
      const key = `${row.industry_demand_id}::${row.role_id}`;
      if (!grouped.has(key)) {
        const roleTitle = ROLE_TITLES[row.role_id] || "AYUSH Healthcare Associate";
        const ayushSystem = (parent?.ayush_systems && parent.ayush_systems[0]) || ROLE_SYSTEMS[row.role_id] || "ayurveda";
        const companyName = parent?.company_name || "AYUSH Industry Partner";
        const isUrgent = row.role_id === "ayush-pharma-quality-regulatory";
        const isOpen = row.role_id === "ayush-research-assistant";

        grouped.set(key, {
          id: row.industry_demand_id,
          industryId: parent?.industry_id,
          organization: companyName,
          roleId: row.role_id,
          roleTitle,
          ayushSystem,
          demandStatus: isUrgent ? "URGENT" : isOpen ? "OPEN" : "ACTIVE",
          experienceRequirementYears: parent?.experience_requirement_years ?? 0,
          requiredCompetencies: [],
        });
      }

      const demandObj = grouped.get(key)!;
      const meta = getCompMeta(row.competency_id);
      demandObj.requiredCompetencies.push({
        competencyId: row.competency_id,
        competencyName: meta.competencyName,
        category: meta.category,
        requiredRating: Number(row.required_rating),
        weight: Number(row.weight),
        isCritical: Boolean(row.is_critical),
        importance: row.is_critical ? "essential" : "preferred",
      });
    }

    return Array.from(grouped.values());
  } catch (err) {
    console.warn("Could not query Supabase industry_role_skill_demands, using canonical fallback:", err);
    return CANONICAL_INDUSTRY_DEMANDS;
  }
}
