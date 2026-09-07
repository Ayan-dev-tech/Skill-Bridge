/**
 * Automated test script to verify Global Header consistency across all 5 Skill Bridge portals:
 * - Student
 * - Campus
 * - Faculty
 * - Industry
 * - Admin
 */

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

async function testPortals() {
  console.log("==================================================");
  console.log("SKILL BRIDGE — GLOBAL HEADER VERIFICATION SUITE");
  console.log("==================================================");

  const portals = [
    { name: "Student", path: "/student/dashboard", badge: "STUDENT" },
    { name: "Campus", path: "/campus", badge: "CAMPUS" },
    { name: "Faculty", path: "/faculty", badge: "FACULTY" },
    { name: "Industry", path: "/industry", badge: "INDUSTRY" },
    { name: "Admin", path: "/admin", badge: "ADMIN" },
  ];

  let allPassed = true;

  for (const portal of portals) {
    const url = `${BASE_URL}${portal.path}`;
    console.log(`\nTesting ${portal.name} Portal Header at ${url}...`);

    try {
      const res = await fetch(url, {
        headers: {
          // Send cookie to pass student auth check if needed
          Cookie: "sb_student_id=test-student-123",
        },
      });

      if (!res.ok && res.status !== 200) {
        console.error(`❌ [${portal.name}] HTTP status: ${res.status}`);
        allPassed = false;
        continue;
      }

      const html = await res.text();

      // 1. Check Brand text
      const hasBrand = html.includes("SKILL BRIDGE");
      if (!hasBrand) {
        console.error(`❌ [${portal.name}] Missing 'SKILL BRIDGE' brand text`);
        allPassed = false;
      } else {
        console.log(`  ✓ Brand 'SKILL BRIDGE' verified`);
      }

      // 2. Check Portal Badge
      const hasBadge = html.includes(portal.badge) || html.includes(portal.name);
      if (!hasBadge) {
        console.error(`❌ [${portal.name}] Missing portal badge '${portal.badge}'`);
        allPassed = false;
      } else {
        console.log(`  ✓ Portal badge '${portal.badge}' verified`);
      }

      // 3. Check standardized Notifications control
      const hasNotifications =
        html.includes("View notifications") || html.includes("Notifications");
      if (!hasNotifications) {
        console.error(`❌ [${portal.name}] Missing notifications control`);
        allPassed = false;
      } else {
        console.log(`  ✓ Standardized notifications control verified`);
      }

      // 4. Check standardized Sign Out control
      const hasSignOut =
        html.includes("Sign out") ||
        html.includes("Sign Out") ||
        html.includes("Log Out");
      if (!hasSignOut) {
        console.error(`❌ [${portal.name}] Missing Sign Out control`);
        allPassed = false;
      } else {
        console.log(`  ✓ Standardized Sign Out control verified`);
      }

      // 5. Check standardized header height class (h-14)
      const hasHeight = html.includes("h-14");
      if (!hasHeight) {
        console.error(`❌ [${portal.name}] Missing standardized h-14 height class`);
        allPassed = false;
      } else {
        console.log(`  ✓ Standardized height (h-14) verified`);
      }
    } catch (err) {
      console.error(`❌ [${portal.name}] Request failed:`, err.message);
      allPassed = false;
    }
  }

  console.log("\n--------------------------------------------------");
  if (allPassed) {
    console.log("✅ ALL 5 PORTAL GLOBAL HEADERS VERIFIED SUCCESSFULLY!");
  } else {
    console.error("❌ ONE OR MORE GLOBAL HEADER CHECKS FAILED.");
    process.exit(1);
  }
}

testPortals();
