/**
 * Skill-Bridge — Step 13: AYUSH Opportunity Discovery Validation
 *
 * Verifies:
 * A. Discovery returns AYUSH opportunities
 * B. Official sources are prioritized/labeled (OFFICIAL, VERIFIED_SOURCE, WEB_DISCOVERED)
 * C. Normalization works (full schema conformity)
 * D. Duplicate URLs do not create duplicates (canonical URL deduplication)
 * E. Role & Competency mapping works
 * F. Step 12 student match appears when requirements exist
 * G. Existing application flow works
 * H. Unauthorized API access blocked (HTTP 401)
 */

import {
  determineSourceStatus,
  mapOpportunityToAyushRole,
  executeTavilyAyushDiscovery,
  ingestAyushOpportunities,
  getDiscoveredOpportunities,
} from "../src/lib/ayush/opportunity-discovery";
import { getSupabaseServerClient } from "../src/lib/supabase-server";

async function runStep13Validation() {
  console.log("================================================================================");
  console.log("🚀 STARTING STEP 13: AYUSH OPPORTUNITY DISCOVERY VALIDATION");
  console.log("================================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      if (detail) console.log(`   └─ ${detail}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      if (detail) console.error(`   └─ ${detail}`);
      failed++;
    }
  }

  // ---------------------------------------------------------------------------
  // TEST A: Discovery returns AYUSH opportunities
  // ---------------------------------------------------------------------------
  console.log("--- TEST A: Discovery Returns AYUSH Opportunities ---");
  try {
    const discovered = await executeTavilyAyushDiscovery();
    assert(discovered.length >= 5, "Test A1: Discovered multiple AYUSH opportunities", `Count: ${discovered.length}`);
    const hasAyurveda = discovered.some(
      (o) => o.title.toLowerCase().includes("ayush") || o.title.toLowerCase().includes("ayurveda") || o.description.toLowerCase().includes("ayurveda")
    );
    assert(hasAyurveda, "Test A2: Contains Ayurveda/AYUSH specific opportunities", "Verified system tagging");
  } catch (err) {
    assert(false, "Test A Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST B: Official Sources are Prioritized / Labeled
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST B: Official Sources Prioritized & Labeled ---");
  try {
    const s1 = determineSourceStatus("https://main.ayush.gov.in/vacancies/senior-fellow").status;
    const s2 = determineSourceStatus("https://aiia.gov.in/careers/clinical-research-fellow").status;
    const s3 = determineSourceStatus("https://ccras.nic.in/recruitment/jrf-srf").status;
    const s4 = determineSourceStatus("https://svyasa.edu.in/careers/yoga-consultant").status;
    const s5 = determineSourceStatus("https://dabur.com/careers/qc-executive").status;
    const s6 = determineSourceStatus("https://random-job-board.xyz/ayush-job").status;

    assert(s1 === "OFFICIAL", "Test B1: .gov.in labeled OFFICIAL", s1);
    assert(s2 === "OFFICIAL", "Test B2: aiia.gov.in labeled OFFICIAL", s2);
    assert(s3 === "OFFICIAL", "Test B3: .nic.in labeled OFFICIAL", s3);
    assert(s4 === "VERIFIED_SOURCE", "Test B4: svyasa.edu.in labeled VERIFIED_SOURCE", s4);
    assert(s5 === "VERIFIED_SOURCE", "Test B5: Official employer portal labeled VERIFIED_SOURCE", s5);
    assert(s6 === "WEB_DISCOVERED", "Test B6: Generic web domain labeled WEB_DISCOVERED", s6);
  } catch (err) {
    assert(false, "Test B Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST C: Normalization Works
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST C: Normalization Works ---");
  try {
    const opps = await getDiscoveredOpportunities();
    const sample = opps[0];
    assert(Boolean(sample.title && sample.title.length > 0), "Test C1: Title normalized", sample.title);
    assert(Boolean(sample.organization && sample.organization.length > 0), "Test C2: Organization normalized", sample.organization);
    assert(["Job", "Internship", "Fellowship", "Research Project", "Program"].includes(sample.opportunityType), "Test C3: Valid opportunity type", sample.opportunityType);
    assert(Boolean(sample.ayushSystem), "Test C4: Valid AYUSH system", sample.ayushSystem);
    assert(sample.sourceUrl.startsWith("http"), "Test C5: Canonical source URL present", sample.sourceUrl);
    assert(Boolean(sample.sourceDomain), "Test C6: Source domain extracted", sample.sourceDomain);
    assert(sample.active === true, "Test C7: Active flag present", String(sample.active));
    assert(Boolean(sample.discoveredAt), "Test C8: discoveredAt timestamp present", sample.discoveredAt);
  } catch (err) {
    assert(false, "Test C Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST D: Deduplication Prevents Duplicate URLs
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST D: Deduplication Prevents Duplicate URLs ---");
  try {
    // Ingest seed opportunities
    const ingest1 = await ingestAyushOpportunities();
    assert(ingest1.ingestedCount > 0, "Test D1: First ingestion succeeded", `Ingested: ${ingest1.ingestedCount}`);

    // Ingest again — should upsert without increasing total count for existing URLs
    const ingest2 = await ingestAyushOpportunities();
    assert(ingest2.ingestedCount > 0, "Test D2: Repeated ingestion succeeded without duplicates", `Upserted: ${ingest2.ingestedCount}`);

    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data: allOpps, error } = await supabase
        .from("ayush_discovered_opportunities")
        .select("source_url");
      assert(!error, "Test D3: Querying Supabase succeeded", `Error: ${error?.message}`);

      if (allOpps) {
        const urls = allOpps.map((o) => o.source_url);
        const uniqueUrls = new Set(urls);
        assert(urls.length === uniqueUrls.size, "Test D4: Zero duplicate URLs in Supabase table", `Total: ${urls.length}, Unique: ${uniqueUrls.size}`);
      }
    }
  } catch (err) {
    assert(false, "Test D Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST E: Role & Competency Mapping Works
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST E: Role & Competency Mapping Works ---");
  try {
    const map1 = mapOpportunityToAyushRole("Panchakarma Clinical Resident", "Ayurvedic clinical diagnostic and panchakarma protocols.");
    assert(map1.roleId === "ayush-clinical-practice", "Test E1: Mapped to Ayurveda Clinical Practice", map1.roleId || "");
    assert(map1.competencyIds.includes("comp-ayush-panchakarma-chikitsa"), "Test E2: Contains Panchakarma competency", map1.competencyIds.join(", "));

    const map2 = mapOpportunityToAyushRole("Yoga Wellness Instructor", "Therapeutic yoga, asana alignment, and pranayama guidance.");
    assert(map2.roleId === "ayush-wellness-yoga-therapy", "Test E3: Mapped to Yoga Wellness Consultant", map2.roleId || "");
    assert(map2.competencyIds.includes("comp-ayush-yoga-chikitsa"), "Test E4: Contains Yoga protocol competency", map2.competencyIds.join(", "));

    const map3 = mapOpportunityToAyushRole("Clinical Trial Associate", "GCP guidelines, clinical protocol execution, ethics documentation.");
    assert(map3.roleId === "ayush-clinical-research", "Test E5: Mapped to Clinical Research", map3.roleId || "");
    assert(map3.competencyIds.includes("comp-ayush-gcp"), "Test E6: Contains GCP competency", map3.competencyIds.join(", "));

    const map4 = mapOpportunityToAyushRole("Pharma QA Analyst", "Herbal formulation standardization, HPTLC, pharmacopeia compliance.");
    assert(map4.roleId === "ayush-pharma-quality-regulatory", "Test E7: Mapped to Herbal QC & Regulatory", map4.roleId || "");
    assert(map4.competencyIds.includes("comp-ayush-standardization"), "Test E8: Contains Herbal standardization competency", map4.competencyIds.join(", "));
  } catch (err) {
    assert(false, "Test E Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST F: Step 12 Student Match Appears
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST F: Step 12 Student Match Appears When Requirements Exist ---");
  try {
    const oppsWithMatch = await getDiscoveredOpportunities("student-demo-1");
    assert(oppsWithMatch.length > 0, "Test F1: Fetched opportunities for student", `Count: ${oppsWithMatch.length}`);

    const mappedOpp = oppsWithMatch.find((o) => o.roleId && o.studentMatch);
    assert(Boolean(mappedOpp), "Test F2: Found opportunity with Step 12 studentMatch", mappedOpp?.title);

    if (mappedOpp?.studentMatch) {
      assert(typeof mappedOpp.studentMatch.matchScore === "number", "Test F3: Valid matchScore number", `${mappedOpp.studentMatch.matchScore}%`);
      assert(typeof mappedOpp.studentMatch.matchLevel === "string", "Test F4: Valid matchLevel", mappedOpp.studentMatch.matchLevel);
      assert(Array.isArray(mappedOpp.studentMatch.keyMatchedCompetencies), "Test F5: Key matched competencies array present", `Count: ${mappedOpp.studentMatch.keyMatchedCompetencies.length}`);
      assert(Array.isArray(mappedOpp.studentMatch.remainingGaps), "Test F6: Remaining gaps array present", `Count: ${mappedOpp.studentMatch.remainingGaps.length}`);
    }
  } catch (err) {
    assert(false, "Test F Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST G: Existing Application Flow Works
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST G: Existing Application Flow Works ---");
  try {
    const opps = await getDiscoveredOpportunities();
    const firstOpp = opps[0];
    assert(Boolean(firstOpp?.id), "Test G1: Discovered opportunity has stable DB id", firstOpp?.id);

    // Verify readiness lookup integration for discovered opportunity
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data: dbOpp, error } = await supabase
        .from("ayush_discovered_opportunities")
        .select("id, title, organization")
        .eq("id", firstOpp.id)
        .single();
      assert(!error && Boolean(dbOpp), "Test G2: Opportunity queryable by DB id for application tracking", dbOpp?.title);
    }
  } catch (err) {
    assert(false, "Test G Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // TEST H: Unauthorized API Access Blocked (HTTP 401)
  // ---------------------------------------------------------------------------
  console.log("\n--- TEST H: Unauthorized API Access Protection (HTTP 401) ---");
  try {
    // Call the route without any cookies/auth headers
    const { GET, POST } = await import("../src/app/api/student/ayush-opportunities/route");
    const fakeUnauthRequest = new Request("http://localhost:3000/api/student/ayush-opportunities");

    const getRes = await GET(fakeUnauthRequest);
    assert(getRes.status === 401, "Test H1: Unauthenticated GET returns HTTP 401", `Status: ${getRes.status}`);

    const postRes = await POST(fakeUnauthRequest);
    assert(postRes.status === 401, "Test H2: Unauthenticated POST returns HTTP 401", `Status: ${postRes.status}`);
  } catch (err) {
    assert(false, "Test H Failed with exception", String(err));
  }

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log("\n================================================================================");
  console.log(`🏁 STEP 13 VALIDATION COMPLETE: ${passed} PASSED | ${failed} FAILED`);
  console.log("================================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runStep13Validation().catch((err) => {
  console.error("Fatal error during Step 13 validation:", err);
  process.exit(1);
});
