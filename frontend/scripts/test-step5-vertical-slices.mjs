import dotenv from 'dotenv';
dotenv.config({ path: 'frontend/.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const sessionSecret = process.env.SESSION_SECRET || 'skillbridge-default-super-secret-key-change-in-production-min32chars';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in frontend/.env.local");
  process.exit(1);
}

// Server authorized client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    headers: {
      'x-skillbridge-server-secret': sessionSecret,
    },
  },
});

let passCount = 0;
let failCount = 0;

function logResult(sliceName, ok, details) {
  if (ok) {
    passCount++;
    console.log(`[PASS] ${sliceName}: ${details}`);
  } else {
    failCount++;
    console.error(`[FAIL] ${sliceName}: ${details}`);
  }
}

async function runVerticalSliceTests() {
  console.log("=== STEP 5 — RUNTIME DATABASE CUTOVER: VERTICAL SLICE VALIDATION ===\n");

  // Fetch active test subjects
  const { data: studentUser } = await supabase
    .from('users')
    .select('id, email, full_name')
    .eq('role', 'student')
    .limit(1)
    .single();

  const { data: industryUser } = await supabase
    .from('users')
    .select('id, email, full_name')
    .eq('role', 'industry')
    .limit(1)
    .single();

  if (!studentUser || !industryUser) {
    console.error("Missing student or industry test users in Supabase");
    process.exit(1);
  }

  const studentId = studentUser.id;
  const industryId = industryUser.id;
  console.log(`Using Student: ${studentUser.email} (${studentId})`);
  console.log(`Using Industry: ${industryUser.email} (${industryId})\n`);

  // 1. Student profile read
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', studentId)
      .single();
    if (error || !data) throw error || new Error("Profile not found");
    logResult("1. Student Profile Read", true, `Read profile for ${studentId} (role: ${data.role})`);
  } catch (err) {
    logResult("1. Student Profile Read", false, err.message);
  }

  // 2. Student profile update
  try {
    const testNote = `Verified at ${new Date().toISOString()}`;
    const { data: existing } = await supabase
      .from('profiles')
      .select('metadata')
      .eq('user_id', studentId)
      .single();
    const updatedMeta = { ...(existing?.metadata || {}), runtimeCutoverNote: testNote };
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ metadata: updatedMeta, updated_at: new Date().toISOString() })
      .eq('user_id', studentId)
      .select('*')
      .single();
    if (error || !data) throw error || new Error("Profile update failed");
    logResult("2. Student Profile Update", data.metadata.runtimeCutoverNote === testNote, "Successfully persisted metadata update in Supabase");
  } catch (err) {
    logResult("2. Student Profile Update", false, err.message);
  }

  // 3. Student dashboard read
  try {
    const [userRes, profileRes, verifRes, appsRes] = await Promise.all([
      supabase.from('users').select('*').eq('id', studentId).single(),
      supabase.from('profiles').select('*').eq('user_id', studentId).single(),
      supabase.from('student_verifications').select('*').eq('student_id', studentId).maybeSingle(),
      supabase.from('job_applications').select('*').eq('student_id', studentId),
    ]);
    const ok = Boolean(userRes.data && profileRes.data);
    logResult("3. Student Dashboard Read", ok, `User: ${userRes.data?.full_name}, Apps count: ${appsRes.data?.length || 0}`);
  } catch (err) {
    logResult("3. Student Dashboard Read", false, err.message);
  }

  // 4. Student skill passport read/write
  try {
    const testPassportId = `asp_${studentId.slice(0, 8)}`;
    const now = new Date().toISOString();
    const { data: upsertData, error: upsertErr } = await supabase
      .from('ayush_skill_passports')
      .upsert({
        id: testPassportId,
        student_id: studentId,
        ayush_system: 'Ayurveda',
        course: 'BAMS',
        academic_level: 'UG',
        institution: 'National Institute of Ayurveda',
        batch_year: '2022-2027',
        skills: { Dravyaguna: 85, Rasashastra: 78 },
        competencies: ['Herb Identification', 'Formulation Preparation'],
        assessment_results: [],
        skill_gaps: [],
        certifications: ['AYUSH GMP Workshop'],
        created_at: now,
        updated_at: now,
      }, { onConflict: 'student_id' })
      .select('*')
      .single();
    if (upsertErr) throw upsertErr;

    const { data: readData, error: readErr } = await supabase
      .from('ayush_skill_passports')
      .select('*')
      .eq('student_id', studentId)
      .single();
    if (readErr) throw readErr;
    logResult("4. Student Skill Passport Read/Write", readData.skills?.Dravyaguna === 85, `Persisted and verified AYUSH Passport for ${studentId}`);
  } catch (err) {
    logResult("4. Student Skill Passport Read/Write", false, err.message);
  }

  // 5. Student assessment result persistence
  try {
    const { data: validConfig } = await supabase.from('assessment_configs').select('id, ayush_system').limit(1).single();
    const configId = validConfig?.id || 'cfg_bams_ayush_clinical_diagnostic';
    const testAttemptId = `att_test_${Date.now()}`;
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('assessment_attempts')
      .insert({
        id: testAttemptId,
        student_id: studentId,
        config_id: configId,
        exam_type: 'PRACTICAL_SCENARIO',
        ayush_system: validConfig?.ayush_system || 'Ayurveda',
        question_ids: ['q_bams_01', 'q_bams_02'],
        responses: { q_bams_01: 'opt_1' },
        started_at: now,
        ended_at: now,
        status: 'completed',
        score: 1,
        max_score: 2,
        score_percent: 50,
        created_at: now,
        updated_at: now,
      })
      .select('*')
      .single();
    if (error) throw error;
    logResult("5. Student Assessment Result Persistence", data.id === testAttemptId, `Saved assessment attempt ${data.id} in Supabase`);
  } catch (err) {
    logResult("5. Student Assessment Result Persistence", false, err.message);
  }

  // 6. Student skill-gap persistence
  try {
    const { data: validIp } = await supabase.from('interest_profiles').select('id').limit(1).single();
    const { data: validKtr } = await supabase.from('knowledge_test_results').select('id').limit(1).single();
    const testAnalysisId = `sga_test_${Date.now()}`;
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('skill_gap_analyses')
      .insert({
        id: testAnalysisId,
        student_id: studentId,
        interest_profile_id: validIp?.id || null,
        knowledge_test_result_id: validKtr?.id || null,
        domain_id: 'domain_software_engineering',
        domain_name: 'Software Engineering',
        niche_id: 'cloud_native',
        niche_title: 'Cloud Native Developer',
        difficulty: 'intermediate',
        test_score: 8,
        test_max_score: 10,
        test_score_percent: 80,
        knowledge_level: 'Proficient',
        skill_profile_version: '1.0',
        executive_summary: 'Step 5 skill gap cutover test summary',
        skill_gaps: [{ skillName: 'Kubernetes', currentProficiency: 40, targetProficiency: 80, gapScore: 40, priority: 'High' }],
        recommendations: [{ title: 'Master K8s', description: 'Recommended courses' }],
        ai_generated: true,
        is_stale: false,
        created_at: now,
        updated_at: now,
      })
      .select('*')
      .single();
    if (error) throw error;
    logResult("6. Student Skill-Gap Persistence", data.id === testAnalysisId, `Saved skill gap analysis ${data.id} in Supabase`);
  } catch (err) {
    logResult("6. Student Skill-Gap Persistence", false, err.message);
  }

  // 7. Student application persistence
  try {
    const testAppId = `app_test_${Date.now()}`;
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        id: testAppId,
        student_id: studentId,
        job_id: 'job-sec-01',
        company_name: 'CloudArmor Defense Labs',
        role_title: 'SOC Analyst L1',
        status: 'applied',
        screening_status: 'pending',
        interview_status: 'not_scheduled',
        final_status: 'pending',
        timeline: [{ id: 'tl_1', status: 'applied', date: now, timestamp: now, title: 'Applied', description: 'Application submitted.' }],
        applied_at: now,
        updated_at: now,
      })
      .select('*')
      .single();
    if (error) throw error;
    logResult("7. Student Application Persistence", data.id === testAppId, `Saved application ${data.id} in Supabase`);
  } catch (err) {
    logResult("7. Student Application Persistence", false, err.message);
  }

  // 8. Industry hiring post persistence
  try {
    const testPostId = `post_test_${Date.now()}`;
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('industry_hiring_posts')
      .insert({
        id: testPostId,
        industry_id: industryId,
        company_name: 'CloudArmor Defense Labs',
        role_title: 'Lead Security Architect',
        hiring_type: 'Full-time',
        industry_domain: 'Cybersecurity',
        location: 'Bengaluru, India',
        work_mode: 'Hybrid',
        salary_range: '₹25,00,000 - ₹35,00,000 / year',
        deadline: '2026-12-31T00:00:00.000Z',
        description: 'Lead security architecture reviews, threat modeling, and zero trust strategy for enterprise cloud workloads.',
        openings: 2,
        status: 'draft',
        required_skills: ['Cloud Security', 'Kubernetes', 'IAM'],
        interview_config: { mode: 'Virtual', type: 'Architecture & System Design', estimatedRounds: 3 },
        created_at: now,
        updated_at: now,
      })
      .select('*')
      .single();
    if (error) throw error;
    logResult("8. Industry Hiring Post Persistence", data.id === testPostId, `Saved post ${data.id} in Supabase`);
  } catch (err) {
    logResult("8. Industry Hiring Post Persistence", false, err.message);
  }

  // 9. Industry application read/update
  try {
    const { data: apps, error: fetchErr } = await supabase
      .from('job_applications')
      .select('*')
      .limit(1);
    if (fetchErr || !apps || apps.length === 0) throw fetchErr || new Error("No applications found to update");
    const targetApp = apps[0];
    const now = new Date().toISOString();
    const { data: updated, error: updateErr } = await supabase
      .from('job_applications')
      .update({
        screening_status: 'shortlisted',
        screening_notes: 'Step 5 cutover verified screening note',
        updated_at: now,
      })
      .eq('id', targetApp.id)
      .select('*')
      .single();
    if (updateErr) throw updateErr;
    logResult("9. Industry Application Read/Update", updated.screening_status === 'shortlisted', `Updated screening status for ${updated.id}`);
  } catch (err) {
    logResult("9. Industry Application Read/Update", false, err.message);
  }

  // 10. Faculty student/skill-gap reads
  try {
    const [studentsRes, skillGapsRes] = await Promise.all([
      supabase.from('users').select('*').eq('role', 'student'),
      supabase.from('skill_gap_analyses').select('*'),
    ]);
    const ok = Boolean(studentsRes.data && skillGapsRes.data);
    logResult("10. Faculty Student/Skill-Gap Reads", ok, `Found ${studentsRes.data?.length || 0} students and ${skillGapsRes.data?.length || 0} skill gap analyses`);
  } catch (err) {
    logResult("10. Faculty Student/Skill-Gap Reads", false, err.message);
  }

  // 11. Admin overview reads
  try {
    const [usersRes, hiringReqRes, campusReqRes, postsRes, appsRes] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact' }),
      supabase.from('hiring_requests').select('id', { count: 'exact' }),
      supabase.from('campus_requests').select('id', { count: 'exact' }),
      supabase.from('industry_hiring_posts').select('id', { count: 'exact' }),
      supabase.from('job_applications').select('id', { count: 'exact' }),
    ]);
    const ok = Boolean(usersRes.count && hiringReqRes.count && campusReqRes.count);
    logResult("11. Admin Overview Reads", ok, `Live counts: Users=${usersRes.count}, HiringReqs=${hiringReqRes.count}, CampusReqs=${campusReqRes.count}, Posts=${postsRes.count}, Apps=${appsRes.count}`);
  } catch (err) {
    logResult("11. Admin Overview Reads", false, err.message);
  }

  console.log(`\n=== RESULTS: ${passCount} PASSED, ${failCount} FAILED ===\n`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runVerticalSliceTests();
