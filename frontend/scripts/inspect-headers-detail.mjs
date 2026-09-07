const BASE_URL = "http://localhost:3000";

const portals = [
  { name: "Student", path: "/student/dashboard", roleCookie: "sb_student_id=test-123" },
  { name: "Campus", path: "/campus", roleCookie: "" },
  { name: "Faculty", path: "/faculty", roleCookie: "" },
  { name: "Industry", path: "/industry", roleCookie: "" },
  { name: "Admin", path: "/admin", roleCookie: "sb_admin=true" },
];

async function inspect() {
  console.log("==================================================");
  console.log("DEEP INSPECTION OF HEADER DOM ACROSS 5 PORTALS");
  console.log("==================================================");

  for (const portal of portals) {
    console.log(`\n--- Portal: ${portal.name} (${portal.path}) ---`);
    const headers = {};
    if (portal.roleCookie) {
      headers["Cookie"] = portal.roleCookie;
    }

    const res = await fetch(`${BASE_URL}${portal.path}`, { headers });
    const html = await res.text();

    const hasHeader = html.includes('role="banner"');
    const hasHeight = html.includes("h-14");
    const hasBrandText = html.includes("SKILL BRIDGE");
    const hasSLogo = html.includes(">S<") || html.includes(">S</div>");
    const hasNotifBtn = html.includes("View notifications");
    const hasSignOut = html.includes("Sign Out") || html.includes("Sign out");

    console.log(`- HTTP Status: ${res.status}`);
    console.log(`- role="banner" header tag: ${hasHeader ? "✓ YES" : "✗ NO"}`);
    console.log(`- Standardized h-14 height: ${hasHeight ? "✓ YES" : "✗ NO"}`);
    console.log(`- Brand 'SKILL BRIDGE': ${hasBrandText ? "✓ YES" : "✗ NO"}`);
    console.log(`- Brand 'S' mark box: ${hasSLogo ? "✓ YES" : "✗ NO"}`);
    console.log(`- Notifications control: ${hasNotifBtn ? "✓ YES" : "✗ NO"}`);
    console.log(`- Sign Out control: ${hasSignOut ? "✓ YES" : "✗ NO"}`);

    if (!hasHeader || !hasHeight || !hasBrandText || !hasNotifBtn || !hasSignOut) {
      console.error(`❌ Verification failed on ${portal.name}!`);
      process.exit(1);
    }
  }

  console.log("\n==================================================");
  console.log("✅ ALL 5 PORTAL HEADERS STRICTLY COMPLIANT!");
  console.log("==================================================");
}

inspect().catch((err) => {
  console.error("Inspection error:", err);
  process.exit(1);
});
