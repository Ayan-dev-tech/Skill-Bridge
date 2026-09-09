// Test script to verify Campus authorization and access control across roles
async function runTests() {
  const baseUrl = "http://localhost:3000";

  console.log("=== 1. Testing Login API for Campus User ===");
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "placement@dtu.ac.in", password: "campus@123", role: "campus" })
  });
  const loginData = await loginRes.json();
  const campusCookie = loginRes.headers.get("set-cookie") || "";
  console.log("Campus Login Status:", loginRes.status, "User role:", loginData.user?.role, "Cookie set:", !!campusCookie);

  console.log("\n=== 2. Testing /api/campus/reports with NO credentials ===");
  const anonRes = await fetch(`${baseUrl}/api/campus/reports`);
  console.log("Anon Access Status:", anonRes.status, "(Expected 401)");
  const anonJson = await anonRes.json();
  console.log("Anon Response:", anonJson);

  console.log("\n=== 3. Testing /api/campus/reports with real STUDENT account ===");
  const studentId = "8661e4c3-63e3-4b94-a633-fbc69e8c6f6b"; // Real student user from DB
  const studentRes = await fetch(`${baseUrl}/api/campus/reports`, {
    headers: {
      "x-campus-id": studentId,
      "cookie": `sb_student_id=${studentId}`
    }
  });
  console.log("Student Access Status:", studentRes.status, "(Expected 403 Forbidden)");
  const studentJson = await studentRes.json();
  console.log("Student Response:", studentJson);

  console.log("\n=== 4. Testing /api/campus/reports with real INDUSTRY account ===");
  const industryId = "e93a2f49-3cc2-4f48-be9f-63f53dedae96"; // Real industry user from DB
  const industryRes = await fetch(`${baseUrl}/api/campus/reports`, {
    headers: {
      "x-campus-id": industryId,
      "cookie": `sb_industry_id=${industryId}`
    }
  });
  console.log("Industry Access Status:", industryRes.status, "(Expected 403 Forbidden)");
  const indJson = await industryRes.json();
  console.log("Industry Response:", indJson);

  console.log("\n=== 5. Testing /api/campus/reports with real FACULTY account ===");
  const facultyId = "9f777fbc-fc93-49cc-8e9c-cb9aa8953e4f"; // Real faculty user from DB
  const facultyRes = await fetch(`${baseUrl}/api/campus/reports`, {
    headers: {
      "x-campus-id": facultyId,
      "cookie": `sb_faculty_id=${facultyId}`
    }
  });
  console.log("Faculty Access Status:", facultyRes.status, "(Expected 403 Forbidden)");
  const facJson = await facultyRes.json();
  console.log("Faculty Response:", facJson);

  console.log("\n=== 6. Testing /api/campus/reports with CAMPUS account ===");
  const campusRes = await fetch(`${baseUrl}/api/campus/reports`, {
    headers: {
      "x-campus-id": "campus-user-1",
      "cookie": campusCookie || "sb_campus_id=campus-user-1"
    }
  });
  console.log("Campus Access Status:", campusRes.status, "(Expected 200 OK)");
  const campusReportsData = await campusRes.json();
  console.log("Campus Reports Success:", campusReportsData.success, "Metrics summary keys:", Object.keys(campusReportsData.summary || {}));

  console.log("\n=== 7. Testing /api/campus/reports with ADMIN account ===");
  const adminRes = await fetch(`${baseUrl}/api/campus/reports`, {
    headers: {
      "x-campus-id": "admin-system-account-id",
      "cookie": "sb_admin=true"
    }
  });
  console.log("Admin Access Status:", adminRes.status, "(Expected 200 OK)");
  const adminReportsData = await adminRes.json();
  console.log("Admin Reports Success:", adminReportsData.success);

  console.log("\n=== 8. Testing ALL /api/campus/* APIs with STUDENT account ===");
  const endpoints = [
    "/api/campus",
    "/api/campus/students",
    "/api/campus/faculty",
    "/api/campus/industry",
    "/api/campus/applications",
    "/api/campus/reports"
  ];
  for (const ep of endpoints) {
    const res = await fetch(`${baseUrl}${ep}`, {
      headers: {
        "x-campus-id": studentId,
        "cookie": `sb_student_id=${studentId}`
      }
    });
    console.log(`Endpoint ${ep} with Student -> Status: ${res.status}`);
  }

  console.log("\n=== 9. Testing ALL /api/campus/* APIs with CAMPUS account ===");
  for (const ep of endpoints) {
    const res = await fetch(`${baseUrl}${ep}`, {
      headers: {
        "x-campus-id": "campus-user-1"
      }
    });
    console.log(`Endpoint ${ep} with Campus -> Status: ${res.status}`);
  }
}

runTests().catch(console.error);
