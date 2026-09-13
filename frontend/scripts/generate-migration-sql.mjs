import fs from 'fs';
import path from 'path';

const data = JSON.parse(fs.readFileSync('frontend/data/skill_bridge.json', 'utf8'));
const outDir = path.resolve('frontend/scripts/migration_sql');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function sqlStr(val, defaultVal = null) {
  if (val === null || val === undefined) {
    return defaultVal === null ? 'NULL' : "'" + String(defaultVal).replace(/'/g, "''") + "'";
  }
  return "'" + String(val).replace(/'/g, "''") + "'";
}

function sqlJson(val) {
  if (val === null || val === undefined) return "'{}'::jsonb";
  return "'" + JSON.stringify(val).replace(/'/g, "''") + "'::jsonb";
}

function sqlJsonArr(val) {
  if (val === null || val === undefined) return "'[]'::jsonb";
  return "'" + JSON.stringify(val).replace(/'/g, "''") + "'::jsonb";
}

function sqlTextArr(val) {
  if (!Array.isArray(val) || val.length === 0) return "ARRAY[]::text[]";
  const items = val.map(s => "'" + String(s).replace(/'/g, "''") + "'").join(', ');
  return "ARRAY[" + items + "]::text[]";
}

function sqlNum(val, defaultVal = 0) {
  if (val === null || val === undefined || isNaN(Number(val))) {
    return defaultVal === null ? 'NULL' : String(defaultVal);
  }
  return String(Number(val));
}

function sqlBool(val, defaultVal = false) {
  if (val === null || val === undefined) return defaultVal ? 'TRUE' : 'FALSE';
  return Boolean(val) ? 'TRUE' : 'FALSE';
}

function sqlDate(val, fallback = null) {
  const target = val || fallback;
  if (!target) return 'NULL';
  try {
    const d = new Date(target);
    if (isNaN(d.getTime())) {
      if (fallback) {
        const fbDate = new Date(fallback);
        if (!isNaN(fbDate.getTime())) return "'" + fbDate.toISOString() + "'::timestamptz";
      }
      return 'NULL';
    }
    return "'" + d.toISOString() + "'::timestamptz";
  } catch {
    return 'NULL';
  }
}

// Pre-index users for lookups
const userMap = new Map(data.users.map(u => [u.id, u]));
const emailRoleMap = new Map(data.users.map(u => [u.email, u.role]));

// Tracking sets of valid IDs
const validUserIds = new Set(data.users.map(u => u.id));
const validEducatorIds = new Set();
const validEducationProgramIds = new Set();
const validInterestProfileIds = new Set();
const validKtSessionIds = new Set();
const validKtResultIds = new Set();
const validSkillGapIds = new Set();
const validHiringPostIds = new Set();
const validAssessmentConfigIds = new Set();
const validStudentVerificationIds = new Set();

const migrationStats = [];
const anomalies = [];

// 1. Users (197)
{
  const rows = [];
  data.users.forEach(u => {
    const createdAt = u.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = u.updatedAt || createdAt;
    rows.push(`INSERT INTO public.users (id, email, full_name, role, password_hash, is_admin, is_verified, created_at, updated_at)
VALUES (${sqlStr(u.id)}, ${sqlStr(u.email)}, ${sqlStr(u.fullName || u.email)}, ${sqlStr(u.role)}, ${sqlStr(u.passwordHash || 'disabled')}, ${sqlBool(u.isAdmin)}, ${sqlBool(u.isVerified)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_admin = EXCLUDED.is_admin,
  is_verified = EXCLUDED.is_verified,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '01_users.sql'), rows.join('\n'));
  migrationStats.push({ source: 'users', target: 'public.users', sourceCount: data.users.length, validCount: rows.length, failedCount: 0 });
}

// 2. Profiles (183)
{
  const rows = [];
  let orphans = 0;
  data.profiles.forEach(p => {
    if (!validUserIds.has(p.userId)) {
      orphans++;
      anomalies.push({ entity: 'profiles', id: p.id || p.userId, issue: `Orphaned userId: ${p.userId} not found in users` });
      return;
    }
    const profId = p.id || ('prof_' + p.userId);
    const user = userMap.get(p.userId);
    const role = p.role || (user ? user.role : 'student');
    const meta = { ...(p.metadata || {}) };
    if (p.fullName && !meta.fullName) meta.fullName = p.fullName;
    const createdAt = p.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = p.updatedAt || createdAt;
    rows.push(`INSERT INTO public.profiles (id, user_id, role, metadata, created_at, updated_at)
VALUES (${sqlStr(profId)}, ${sqlStr(p.userId)}, ${sqlStr(role)}, ${sqlJson(meta)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  metadata = EXCLUDED.metadata,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '02_profiles.sql'), rows.join('\n'));
  migrationStats.push({ source: 'profiles', target: 'public.profiles', sourceCount: data.profiles.length, validCount: rows.length, failedCount: orphans });
}

// 3. OTP records (98)
{
  const rows = [];
  let noRoleCount = 0;
  data.otps.forEach(o => {
    const role = o.role || emailRoleMap.get(o.email) || 'student';
    if (!o.role) {
      noRoleCount++;
      anomalies.push({ entity: 'otps', id: o.id, issue: `OTP missing role attribute in JSON; resolved via users table to '${role}'` });
    }
    const createdAt = o.createdAt || '2026-09-01T00:00:00.000Z';
    const expiresAt = o.expiresAt || new Date(Date.now() + 600000).toISOString();
    rows.push(`INSERT INTO public.otp_verifications (id, email, otp_code, role, attempts, verified, expires_at, created_at)
VALUES (${sqlStr(o.id)}, ${sqlStr(o.email)}, ${sqlStr(o.otpCode)}, ${sqlStr(role)}, ${sqlNum(o.attempts, 0)}, ${sqlBool(o.verified)}, ${sqlDate(expiresAt)}, ${sqlDate(createdAt)})
ON CONFLICT (id) DO UPDATE SET
  verified = EXCLUDED.verified,
  attempts = EXCLUDED.attempts;`);
  });
  fs.writeFileSync(path.join(outDir, '03_otps.sql'), rows.join('\n'));
  migrationStats.push({ source: 'otps', target: 'public.otp_verifications', sourceCount: data.otps.length, validCount: rows.length, failedCount: 0 });
}

// 4. Student Verifications (180)
{
  const rows = [];
  let orphans = 0;
  data.studentVerifications.forEach(sv => {
    if (!validUserIds.has(sv.studentId)) {
      orphans++;
      anomalies.push({ entity: 'studentVerifications', id: sv.studentId, issue: `Orphaned studentId: ${sv.studentId} not found in users` });
      return;
    }
    const svId = 'sv_' + sv.studentId;
    validStudentVerificationIds.add(svId);
    const createdAt = sv.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = sv.updatedAt || createdAt;
    const completedAt = sv.completedAt || sv.verifiedAt || null;
    rows.push(`INSERT INTO public.student_verifications (id, student_id, verification_status, professional_profiles, rejection_reason, created_at, updated_at, completed_at)
VALUES (${sqlStr(svId)}, ${sqlStr(sv.studentId)}, ${sqlStr(sv.verificationStatus || 'NOT_STARTED')}, ${sqlJson(sv.professionalProfiles || {})}, ${sqlStr(sv.rejectionReason || null)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)}, ${sqlDate(completedAt)})
ON CONFLICT (student_id) DO UPDATE SET
  verification_status = EXCLUDED.verification_status,
  professional_profiles = EXCLUDED.professional_profiles,
  rejection_reason = EXCLUDED.rejection_reason,
  completed_at = EXCLUDED.completed_at,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '04_student_verifications.sql'), rows.join('\n'));
  migrationStats.push({ source: 'studentVerifications', target: 'public.student_verifications', sourceCount: data.studentVerifications.length, validCount: rows.length, failedCount: orphans });
}

// Pre-calculate doc ID counts to detect duplicate logical records
const docIdCounts = {};
data.studentVerifications.forEach(sv => {
  if (Array.isArray(sv.documents)) {
    sv.documents.forEach(doc => {
      if (doc.id) docIdCounts[doc.id] = (docIdCounts[doc.id] || 0) + 1;
    });
  }
});

// 5. Verification Documents (570)
{
  const rows = [];
  let totalDocs = 0;
  let orphans = 0;
  data.studentVerifications.forEach(sv => {
    const svId = 'sv_' + sv.studentId;
    const isSvValid = validStudentVerificationIds.has(svId);
    if (Array.isArray(sv.documents)) {
      sv.documents.forEach((doc, idx) => {
        totalDocs++;
        if (!isSvValid || !validUserIds.has(sv.studentId)) {
          orphans++;
          anomalies.push({ entity: 'verificationDocuments', id: doc.id || `idx_${idx}`, issue: `Document parent student verification ${sv.studentId} missing in users` });
          return;
        }
        let docId = doc.id;
        if (!docId || docIdCounts[docId] > 1) {
          docId = `${sv.studentId}_${doc.id || idx}`;
          if (doc.id && docIdCounts[doc.id] > 1) {
            anomalies.push({ entity: 'verificationDocuments', id: doc.id, issue: `Duplicate logical record: document id '${doc.id}' shared across students; namespaced to '${docId}'` });
          }
        }
        const fileName = doc.fileName || doc.originalFilename || 'document';
        const fileType = doc.fileType || doc.mimeType || 'application/octet-stream';
        const fileSize = doc.fileSizeBytes || doc.fileSize || 0;
        const storagePath = doc.storagePath || doc.storageKey || '';
        const createdAt = doc.uploadedAt || doc.createdAt || sv.createdAt || '2026-09-01T00:00:00.000Z';
        const updatedAt = doc.updatedAt || sv.updatedAt || createdAt;
        rows.push(`INSERT INTO public.verification_documents (id, verification_id, student_id, document_type, group_id, file_name, file_type, file_size_bytes, storage_path, upload_status, created_at, updated_at)
VALUES (${sqlStr(docId)}, ${sqlStr(svId)}, ${sqlStr(sv.studentId)}, ${sqlStr(doc.documentType || 'other')}, ${sqlStr(doc.groupId || null)}, ${sqlStr(fileName)}, ${sqlStr(fileType)}, ${sqlNum(fileSize, 0)}, ${sqlStr(storagePath)}, ${sqlStr(doc.uploadStatus || 'completed')}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  storage_path = EXCLUDED.storage_path,
  upload_status = EXCLUDED.upload_status,
  updated_at = EXCLUDED.updated_at;`);
      });
    }
  });
  fs.writeFileSync(path.join(outDir, '05_verification_documents.sql'), rows.join('\n'));
  migrationStats.push({ source: 'verificationDocuments (nested)', target: 'public.verification_documents', sourceCount: totalDocs, validCount: rows.length, failedCount: orphans });
}

// 6. Interest Sessions (6)
{
  const rows = [];
  let orphans = 0;
  data.interestSessions.forEach(s => {
    if (!validUserIds.has(s.studentId)) {
      orphans++;
      anomalies.push({ entity: 'interestSessions', id: s.sessionId || s.id, issue: `StudentId ${s.studentId} not found in users` });
      return;
    }
    const sessId = s.id || s.sessionId;
    const updatedAt = s.updatedAt || s.createdAt || new Date().toISOString();
    rows.push(`INSERT INTO public.interest_sessions (id, session_id, student_id, phase, broad_domain, answers, domain_scores, signal_scores, status, updated_at)
VALUES (${sqlStr(sessId)}, ${sqlStr(s.sessionId)}, ${sqlStr(s.studentId)}, ${sqlNum(s.phase, 1)}, ${sqlStr(s.broadDomain || null)}, ${sqlJsonArr(s.answers || [])}, ${sqlJson(s.domainScores || {})}, ${sqlJson(s.signalScores || {})}, ${sqlStr(s.status || 'in_progress')}, ${sqlDate(updatedAt)})
ON CONFLICT (session_id) DO UPDATE SET
  phase = EXCLUDED.phase,
  answers = EXCLUDED.answers,
  domain_scores = EXCLUDED.domain_scores,
  signal_scores = EXCLUDED.signal_scores,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '06_interest_sessions.sql'), rows.join('\n'));
  migrationStats.push({ source: 'interestSessions', target: 'public.interest_sessions', sourceCount: data.interestSessions.length, validCount: rows.length, failedCount: orphans });
}

// 7. Interest Profiles (75)
{
  const rows = [];
  let orphans = 0;
  data.interestProfiles.forEach(p => {
    if (!validUserIds.has(p.studentId)) {
      orphans++;
      anomalies.push({ entity: 'interestProfiles', id: p.id, issue: `StudentId ${p.studentId} not found in users` });
      return;
    }
    validInterestProfileIds.add(p.id);
    const confirmedAt = p.confirmedAt || p.stage2CompletedAt || p.createdAt || '2026-09-01T00:00:00.000Z';
    rows.push(`INSERT INTO public.interest_profiles (id, student_id, session_id, confirmed_main_domain, confirmed_main_domain_id, confirmed_specific_interest, explanation, confidence, candidate_domain_scores, interest_signals, phase1_answer_count, phase2_answer_count, confirmed_at)
VALUES (${sqlStr(p.id)}, ${sqlStr(p.studentId)}, ${sqlStr(p.sessionId || 'session_' + p.id)}, ${sqlStr(p.confirmedMainDomain || p.primaryDomain || 'General')}, ${sqlStr(p.confirmedMainDomainId || 'general')}, ${sqlStr(p.confirmedSpecificInterest || 'General Interest')}, ${sqlStr(p.explanation || 'Interest assessment completed.')}, ${sqlNum(p.confidence, 0.8)}, ${sqlJson(p.candidateDomainScores || p.domainScores || {})}, ${sqlJson(p.interestSignals || {})}, ${sqlNum(p.phase1AnswerCount, 0)}, ${sqlNum(p.phase2AnswerCount, 0)}, ${sqlDate(confirmedAt)})
ON CONFLICT (id) DO UPDATE SET
  confidence = EXCLUDED.confidence,
  candidate_domain_scores = EXCLUDED.candidate_domain_scores;`);
  });
  fs.writeFileSync(path.join(outDir, '07_interest_profiles.sql'), rows.join('\n'));
  migrationStats.push({ source: 'interestProfiles', target: 'public.interest_profiles', sourceCount: data.interestProfiles.length, validCount: rows.length, failedCount: orphans });
}

// 8. Knowledge Test Sessions (44)
{
  const rows = [];
  let orphans = 0;
  data.knowledgeTestSessions.forEach(s => {
    if (!validUserIds.has(s.studentId)) {
      orphans++;
      anomalies.push({ entity: 'knowledgeTestSessions', id: s.sessionId, issue: `StudentId ${s.studentId} not found in users` });
      return;
    }
    validKtSessionIds.add(s.sessionId);
    const startedAt = s.startedAt || '2026-09-01T00:00:00.000Z';
    rows.push(`INSERT INTO public.knowledge_test_sessions (session_id, student_id, domain_id, domain_name, difficulty, questions, current_question_index, answers, time_remaining_seconds, status, started_at, completed_at, expires_at)
VALUES (${sqlStr(s.sessionId)}, ${sqlStr(s.studentId)}, ${sqlStr(s.domainId)}, ${sqlStr(s.domainName)}, ${sqlStr(s.difficulty)}, ${sqlJsonArr(s.questions || [])}, ${sqlNum(s.currentQuestionIndex, 0)}, ${sqlJson(s.answers || {})}, ${sqlNum(s.timeRemainingSeconds, 0)}, ${sqlStr(s.status || 'in_progress')}, ${sqlDate(startedAt)}, ${sqlDate(s.completedAt)}, ${sqlDate(s.expiresAt)})
ON CONFLICT (session_id) DO UPDATE SET
  current_question_index = EXCLUDED.current_question_index,
  answers = EXCLUDED.answers,
  time_remaining_seconds = EXCLUDED.time_remaining_seconds,
  status = EXCLUDED.status,
  completed_at = EXCLUDED.completed_at;`);
  });
  fs.writeFileSync(path.join(outDir, '08_knowledge_test_sessions.sql'), rows.join('\n'));
  migrationStats.push({ source: 'knowledgeTestSessions', target: 'public.knowledge_test_sessions', sourceCount: data.knowledgeTestSessions.length, validCount: rows.length, failedCount: orphans });
}

// 9. Knowledge Test Results (81)
{
  const rows = [];
  let orphans = 0;
  data.knowledgeTestResults.forEach(r => {
    if (!validUserIds.has(r.studentId)) {
      orphans++;
      anomalies.push({ entity: 'knowledgeTestResults', id: r.id, issue: `StudentId ${r.studentId} not found in users` });
      return;
    }
    validKtResultIds.add(r.id);
    const domainName = r.domainName || r.domainTitle || r.domainId || 'General';
    const timeTaken = r.totalTimeMs ? Math.round(r.totalTimeMs / 1000) : (r.timeTakenSeconds || 0);
    const completedAt = r.completedAt || '2026-09-01T00:00:00.000Z';
    const createdAt = r.createdAt || completedAt;
    rows.push(`INSERT INTO public.knowledge_test_results (id, student_id, session_id, domain_id, domain_name, difficulty, knowledge_level, score, max_score, score_percent, time_taken_seconds, strengths, weaknesses, answers, completed_at, created_at)
VALUES (${sqlStr(r.id)}, ${sqlStr(r.studentId)}, ${sqlStr(r.sessionId || 'session_' + r.id)}, ${sqlStr(r.domainId)}, ${sqlStr(domainName)}, ${sqlStr(r.difficulty)}, ${sqlStr(r.knowledgeLevel || 'Unassessed')}, ${sqlNum(r.score, 0)}, ${sqlNum(r.maxScore, 10)}, ${sqlNum(r.scorePercent, 0)}, ${sqlNum(timeTaken, 0)}, ${sqlTextArr(r.strengths || [])}, ${sqlTextArr(r.weaknesses || [])}, ${sqlJsonArr(r.answers || r.questionBreakdown || [])}, ${sqlDate(completedAt)}, ${sqlDate(createdAt)})
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent,
  knowledge_level = EXCLUDED.knowledge_level;`);
  });
  fs.writeFileSync(path.join(outDir, '09_knowledge_test_results.sql'), rows.join('\n'));
  migrationStats.push({ source: 'knowledgeTestResults', target: 'public.knowledge_test_results', sourceCount: data.knowledgeTestResults.length, validCount: rows.length, failedCount: orphans });
}

// 10. Educators (6)
{
  const rows = [];
  data.educators.forEach(e => {
    validEducatorIds.add(e.id);
    const createdAt = e.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = e.updatedAt || createdAt;
    rows.push(`INSERT INTO public.educators (id, name, slug, description, website, logo_url, active, status_label, verified_status, created_at, updated_at)
VALUES (${sqlStr(e.id)}, ${sqlStr(e.name)}, ${sqlStr(e.slug || e.id)}, ${sqlStr(e.description || '')}, ${sqlStr(e.website || 'https://skillbridge.edu')}, ${sqlStr(e.logoUrl || null)}, ${sqlBool(e.active ?? e.isActive, true)}, ${sqlStr(e.statusLabel || 'Sample Learning Provider')}, ${sqlStr(e.verifiedStatus || 'sample_provider')}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  active = EXCLUDED.active;`);
  });
  fs.writeFileSync(path.join(outDir, '10_educators.sql'), rows.join('\n'));
  migrationStats.push({ source: 'educators', target: 'public.educators', sourceCount: data.educators.length, validCount: rows.length, failedCount: 0 });
}

// 11. Education Programs (18)
{
  const rows = [];
  let orphans = 0;
  data.educationPrograms.forEach(p => {
    if (p.educatorId && !validEducatorIds.has(p.educatorId)) {
      orphans++;
      anomalies.push({ entity: 'educationPrograms', id: p.id, issue: `EducatorId ${p.educatorId} not found in educators` });
      return;
    }
    validEducationProgramIds.add(p.id);
    const createdAt = p.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = p.updatedAt || createdAt;
    rows.push(`INSERT INTO public.education_programs (id, educator_id, educator_name, title, description, program_url, domains, niches, skill_ids, difficulty, delivery_type, duration, certification, verified_status, active, created_at, updated_at)
VALUES (${sqlStr(p.id)}, ${sqlStr(p.educatorId || null)}, ${sqlStr(p.educatorName || 'Provider')}, ${sqlStr(p.title)}, ${sqlStr(p.description || '')}, ${sqlStr(p.programUrl || 'https://skillbridge.edu')}, ${sqlTextArr(p.domains || [])}, ${sqlTextArr(p.niches || [])}, ${sqlTextArr(p.skillIds || [])}, ${sqlStr(p.difficulty || 'beginner')}, ${sqlStr(p.deliveryType || 'Online Self-Paced')}, ${sqlStr(p.duration || 'Self-Paced')}, ${sqlStr(p.certification || 'Certificate of Completion')}, ${sqlStr(p.verifiedStatus || 'sample_provider')}, ${sqlBool(p.active, true)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  active = EXCLUDED.active;`);
  });
  fs.writeFileSync(path.join(outDir, '11_education_programs.sql'), rows.join('\n'));
  migrationStats.push({ source: 'educationPrograms', target: 'public.education_programs', sourceCount: data.educationPrograms.length, validCount: rows.length, failedCount: orphans });
}

// 12. Skill Gap Analyses (40)
{
  const rows = [];
  let orphans = 0;
  data.skillGapAnalyses.forEach(s => {
    if (!validUserIds.has(s.studentId)) {
      orphans++;
      anomalies.push({ entity: 'skillGapAnalyses', id: s.id, issue: `StudentId ${s.studentId} not found in users` });
      return;
    }
    const ipId = (s.interestProfileId && validInterestProfileIds.has(s.interestProfileId)) ? s.interestProfileId : null;
    const ktrId = (s.knowledgeTestResultId && validKtResultIds.has(s.knowledgeTestResultId)) ? s.knowledgeTestResultId : null;
    if (s.interestProfileId && !ipId) {
      anomalies.push({ entity: 'skillGapAnalyses', id: s.id, issue: `Non-fatal: interestProfileId ${s.interestProfileId} missing; set to NULL` });
    }
    if (s.knowledgeTestResultId && !ktrId) {
      anomalies.push({ entity: 'skillGapAnalyses', id: s.id, issue: `Non-fatal: knowledgeTestResultId ${s.knowledgeTestResultId} missing; set to NULL` });
    }
    validSkillGapIds.add(s.id);
    const domainName = s.domainName || s.domainTitle || s.domainId || 'General';
    const createdAt = s.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = s.updatedAt || createdAt;
    rows.push(`INSERT INTO public.skill_gap_analyses (id, student_id, domain_id, domain_name, niche_id, niche_title, difficulty, knowledge_level, skill_profile_version, test_score, test_max_score, test_score_percent, skill_gaps, executive_summary, recommendations, ai_generated, is_stale, knowledge_test_result_id, interest_profile_id, created_at, updated_at)
VALUES (${sqlStr(s.id)}, ${sqlStr(s.studentId)}, ${sqlStr(s.domainId)}, ${sqlStr(domainName)}, ${sqlStr(s.nicheId || s.domainId)}, ${sqlStr(s.nicheTitle || domainName)}, ${sqlStr(s.difficulty || 'Medium')}, ${sqlStr(s.knowledgeLevel || 'Unassessed')}, ${sqlStr(s.skillProfileVersion || '1.0')}, ${sqlNum(s.testScore, 0)}, ${sqlNum(s.testMaxScore, 10)}, ${sqlNum(s.testScorePercent, 0)}, ${sqlJsonArr(s.skillGaps || [])}, ${sqlStr(s.executiveSummary || '')}, ${sqlJsonArr(s.recommendations || [])}, ${sqlBool(s.aiGenerated, false)}, ${sqlBool(s.isStale, false)}, ${sqlStr(ktrId)}, ${sqlStr(ipId)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  test_score = EXCLUDED.test_score,
  skill_gaps = EXCLUDED.skill_gaps,
  recommendations = EXCLUDED.recommendations,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '12_skill_gap_analyses.sql'), rows.join('\n'));
  migrationStats.push({ source: 'skillGapAnalyses', target: 'public.skill_gap_analyses', sourceCount: data.skillGapAnalyses.length, validCount: rows.length, failedCount: orphans });
}

// 13. Learning Resources (13)
{
  const rows = [];
  let orphans = 0;
  data.learningResources.forEach(r => {
    if (!validUserIds.has(r.studentId)) {
      orphans++;
      anomalies.push({ entity: 'learningResources', id: r.id, issue: `StudentId ${r.studentId} not found in users` });
      return;
    }
    const analysisId = (r.analysisId && validSkillGapIds.has(r.analysisId)) ? r.analysisId : null;
    if (r.analysisId && !analysisId) {
      anomalies.push({ entity: 'learningResources', id: r.id, issue: `Non-fatal: analysisId ${r.analysisId} missing; set to NULL` });
    }
    const createdAt = r.createdAt || '2026-09-01T00:00:00.000Z';
    const cachedAt = r.cachedAt || createdAt;
    rows.push(`INSERT INTO public.learning_resources (id, student_id, analysis_id, resource_type, resources, cached_at, created_at)
VALUES (${sqlStr(r.id)}, ${sqlStr(r.studentId)}, ${sqlStr(analysisId)}, ${sqlStr(r.resourceType || r.type || 'youtube_video')}, ${sqlJsonArr(r.resources || [])}, ${sqlDate(cachedAt)}, ${sqlDate(createdAt)})
ON CONFLICT (id) DO UPDATE SET
  resources = EXCLUDED.resources,
  cached_at = EXCLUDED.cached_at;`);
  });
  fs.writeFileSync(path.join(outDir, '13_learning_resources.sql'), rows.join('\n'));
  migrationStats.push({ source: 'learningResources', target: 'public.learning_resources', sourceCount: data.learningResources.length, validCount: rows.length, failedCount: orphans });
}

// 14. Resume Analyses (54)
{
  const rows = [];
  let orphans = 0;
  data.resumeAnalyses.forEach(r => {
    if (!validUserIds.has(r.studentId)) {
      orphans++;
      anomalies.push({ entity: 'resumeAnalyses', id: r.id, issue: `StudentId ${r.studentId} not found in users` });
      return;
    }
    const analyzedAt = r.analyzedAt || r.createdAt || '2026-09-01T00:00:00.000Z';
    rows.push(`INSERT INTO public.resume_analyses (id, student_id, resume_file_name, job_title, target_role, overall_score, category_scores, has_job_description, job_match_score, strength_tier, matched_keywords, missing_keywords, detected_sections, missing_sections, issues, recommendations, summary, disclaimer, analyzed_at)
VALUES (${sqlStr(r.id)}, ${sqlStr(r.studentId)}, ${sqlStr(r.resumeFileName || null)}, ${sqlStr(r.jobTitle || null)}, ${sqlStr(r.targetRole || null)}, ${sqlNum(r.overallScore, 0)}, ${sqlJson(r.categoryScores || {})}, ${sqlBool(r.hasJobDescription, false)}, ${sqlNum(r.jobMatchScore, null)}, ${sqlStr(r.strengthTier || 'Needs Improvement')}, ${sqlTextArr(r.matchedKeywords || [])}, ${sqlTextArr(r.missingKeywords || [])}, ${sqlTextArr(r.detectedSections || [])}, ${sqlTextArr(r.missingSections || [])}, ${sqlJsonArr(r.issues || [])}, ${sqlJsonArr(r.recommendations || [])}, ${sqlStr(r.summary || '')}, ${sqlStr(r.disclaimer || null)}, ${sqlDate(analyzedAt)})
ON CONFLICT (id) DO UPDATE SET
  overall_score = EXCLUDED.overall_score,
  category_scores = EXCLUDED.category_scores,
  strength_tier = EXCLUDED.strength_tier;`);
  });
  fs.writeFileSync(path.join(outDir, '14_resume_analyses.sql'), rows.join('\n'));
  migrationStats.push({ source: 'resumeAnalyses', target: 'public.resume_analyses', sourceCount: data.resumeAnalyses.length, validCount: rows.length, failedCount: orphans });
}

// 15. Hiring Requests (3)
{
  const rows = [];
  data.hiringRequests.forEach(h => {
    const updatedAt = h.updatedAt || '2026-09-01T00:00:00.000Z';
    rows.push(`INSERT INTO public.hiring_requests (id, company_name, industry_domain, job_title, positions, applicants, status, is_frozen, freeze_reason, updated_at)
VALUES (${sqlStr(h.id)}, ${sqlStr(h.companyName)}, ${sqlStr(h.industryDomain || 'Technology')}, ${sqlStr(h.jobTitle || 'Engineer')}, ${sqlNum(h.positions, 1)}, ${sqlNum(h.applicants, 0)}, ${sqlStr(h.status || 'pending')}, ${sqlBool(h.isFrozen, false)}, ${sqlStr(h.freezeReason || null)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  is_frozen = EXCLUDED.is_frozen,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '15_hiring_requests.sql'), rows.join('\n'));
  migrationStats.push({ source: 'hiringRequests', target: 'public.hiring_requests', sourceCount: data.hiringRequests.length, validCount: rows.length, failedCount: 0 });
}

// 16. Campus Requests (3)
{
  const rows = [];
  data.campusRequests.forEach(c => {
    const updatedAt = c.updatedAt || '2026-09-01T00:00:00.000Z';
    rows.push(`INSERT INTO public.campus_requests (id, campus_name, code, request_type, students_enrolled, status, is_frozen, freeze_reason, updated_at)
VALUES (${sqlStr(c.id)}, ${sqlStr(c.campusName || 'Campus')}, ${sqlStr(c.code || c.id)}, ${sqlStr(c.requestType || 'Placement')}, ${sqlNum(c.studentsEnrolled, 0)}, ${sqlStr(c.status || 'pending')}, ${sqlBool(c.isFrozen, false)}, ${sqlStr(c.freezeReason || null)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  is_frozen = EXCLUDED.is_frozen,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '16_campus_requests.sql'), rows.join('\n'));
  migrationStats.push({ source: 'campusRequests', target: 'public.campus_requests', sourceCount: data.campusRequests.length, validCount: rows.length, failedCount: 0 });
}

// 17. Industry Questions (4)
{
  const rows = [];
  let orphans = 0;
  data.industryQuestions.forEach(q => {
    if (!validUserIds.has(q.industryId)) {
      orphans++;
      anomalies.push({ entity: 'industryQuestions', id: q.id, issue: `IndustryId ${q.industryId} not found in users` });
      return;
    }
    const createdAt = q.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = q.updatedAt || createdAt;
    rows.push(`INSERT INTO public.industry_questions (id, industry_id, question_text, question_type, options, correct_option_id, difficulty, complexity, domain_id, concept_tag, marks, explanation, created_at, updated_at)
VALUES (${sqlStr(q.id)}, ${sqlStr(q.industryId)}, ${sqlStr(q.questionText)}, ${sqlStr(q.questionType || 'mcq')}, ${sqlJsonArr(q.options || [])}, ${sqlStr(q.correctOptionId)}, ${sqlStr(q.difficulty || 'beginner')}, ${sqlStr(q.complexity || 'application')}, ${sqlStr(q.domainId || 'general')}, ${sqlStr(q.conceptTag || 'general')}, ${sqlNum(q.marks, 2)}, ${sqlStr(q.explanation || null)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '17_industry_questions.sql'), rows.join('\n'));
  migrationStats.push({ source: 'industryQuestions', target: 'public.industry_questions', sourceCount: data.industryQuestions.length, validCount: rows.length, failedCount: orphans });
}

// 18. Industry Hiring Posts (10)
{
  const rows = [];
  let orphans = 0;
  data.industryHiringPosts.forEach(p => {
    if (!validUserIds.has(p.industryId)) {
      orphans++;
      anomalies.push({ entity: 'industryHiringPosts', id: p.id, issue: `IndustryId ${p.industryId} not found in users` });
      return;
    }
    validHiringPostIds.add(p.id);
    const createdAt = p.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = p.updatedAt || createdAt;
    const publishedAt = p.publishedAt || createdAt;
    rows.push(`INSERT INTO public.industry_hiring_posts (id, industry_id, company_name, role_title, hiring_type, industry_domain, location, work_mode, openings, deadline, status, description, responsibilities, required_skills, preferred_skills, required_qualifications, preferred_qualifications, required_document_types, knowledge_test_config, interview_config, created_at, updated_at, published_at)
VALUES (${sqlStr(p.id)}, ${sqlStr(p.industryId)}, ${sqlStr(p.companyName)}, ${sqlStr(p.roleTitle)}, ${sqlStr(p.hiringType || 'Full-time')}, ${sqlStr(p.industryDomain || 'Technology')}, ${sqlStr(p.location || 'Remote')}, ${sqlStr(p.workMode || 'Remote')}, ${sqlNum(p.openings, 1)}, ${sqlDate(p.deadline || '2026-12-31T00:00:00.000Z')}, ${sqlStr(p.status || 'published')}, ${sqlStr(p.description || '')}, ${sqlTextArr(p.responsibilities || [])}, ${sqlTextArr(p.requiredSkills || [])}, ${sqlTextArr(p.preferredSkills || [])}, ${sqlTextArr(p.requiredQualifications || [])}, ${sqlTextArr(p.preferredQualifications || [])}, ${sqlTextArr(p.requiredDocumentTypes || [])}, ${sqlJson(p.knowledgeTest || null)}, ${sqlJson(p.interviewDetails || null)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)}, ${sqlDate(publishedAt)})
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  openings = EXCLUDED.openings,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '18_industry_hiring_posts.sql'), rows.join('\n'));
  migrationStats.push({ source: 'industryHiringPosts', target: 'public.industry_hiring_posts', sourceCount: data.industryHiringPosts.length, validCount: rows.length, failedCount: orphans });
}

// 19. Job Applications (22)
{
  const rows = [];
  let orphans = 0;
  data.jobApplications.forEach(a => {
    if (!validUserIds.has(a.studentId)) {
      orphans++;
      anomalies.push({ entity: 'jobApplications', id: a.id, issue: `StudentId ${a.studentId} not found in users` });
      return;
    }
    const jobId = a.jobId || a.jobPostId || null;
    const appliedAt = a.appliedAt || a.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = a.updatedAt || appliedAt;
    rows.push(`INSERT INTO public.job_applications (id, job_id, student_id, company_name, role_title, position, location, type, employment_type, salary_range, status, screening_status, interview_status, final_status, applied_at, status_updated_at, updated_at, timeline, submitted_document_types, interview_rounds, offer_details, cover_letter, applicant_full_name, applicant_email, applicant_phone, screening_notes, final_decision_date)
VALUES (${sqlStr(a.id)}, ${sqlStr(jobId)}, ${sqlStr(a.studentId)}, ${sqlStr(a.companyName || '')}, ${sqlStr(a.roleTitle || a.position || '')}, ${sqlStr(a.position || a.roleTitle || '')}, ${sqlStr(a.location || '')}, ${sqlStr(a.type || 'Full-time')}, ${sqlStr(a.employmentType || a.type || 'Full-time')}, ${sqlStr(a.salaryRange || null)}, ${sqlStr(a.status || 'applied')}, ${sqlStr(a.screeningStatus || 'pending')}, ${sqlStr(a.interviewStatus || 'none')}, ${sqlStr(a.finalStatus || a.status || 'applied')}, ${sqlDate(appliedAt)}, ${sqlDate(a.statusUpdatedAt || updatedAt)}, ${sqlDate(updatedAt)}, ${sqlJsonArr(a.timeline || [])}, ${sqlTextArr(a.submittedDocumentTypes || [])}, ${sqlJsonArr(a.interviewRounds || [])}, ${sqlJson(a.offerDetails || null)}, ${sqlStr(a.coverLetter || null)}, ${sqlStr(a.applicantFullName || null)}, ${sqlStr(a.applicantEmail || null)}, ${sqlStr(a.applicantPhone || null)}, ${sqlStr(a.screeningNotes || null)}, ${sqlDate(a.finalDecisionDate || null)})
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  screening_status = EXCLUDED.screening_status,
  interview_status = EXCLUDED.interview_status,
  final_status = EXCLUDED.final_status,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '19_job_applications.sql'), rows.join('\n'));
  migrationStats.push({ source: 'jobApplications', target: 'public.job_applications', sourceCount: data.jobApplications.length, validCount: rows.length, failedCount: orphans });
}

// 20. Assessment Questions (185)
{
  const rows = [];
  data.assessmentQuestions.forEach(q => {
    const createdAt = q.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = q.updatedAt || createdAt;
    rows.push(`INSERT INTO public.assessment_questions (id, question_text, options, correct_option_id, explanation, exam_type, question_type, subject, topic, ayush_skill_ids, skill_category, difficulty, cognitive_level, ayush_system, concept_tag, source_ref, reference_year, is_active, created_at, updated_at)
VALUES (${sqlStr(q.id)}, ${sqlStr(q.questionText)}, ${sqlJsonArr(q.options || [])}, ${sqlStr(q.correctOptionId || q.correctOptionIndex)}, ${sqlStr(q.explanation || '')}, ${sqlStr(q.examType || 'AIAPGET_PG')}, ${sqlStr(q.questionType || 'MCQ')}, ${sqlStr(q.subject || q.domain || 'General')}, ${sqlStr(q.topic || 'General')}, ${sqlTextArr(q.ayushSkillIds || [])}, ${sqlStr(q.skillCategory || 'Clinical Knowledge')}, ${sqlStr(q.difficulty || 'Medium')}, ${sqlStr(q.cognitiveLevel || 'Knowledge')}, ${sqlStr(q.ayushSystem || 'ayurveda')}, ${sqlStr(q.conceptTag || null)}, ${sqlStr(q.sourceRef || null)}, ${sqlNum(q.referenceYear, 2025)}, ${sqlBool(q.isActive, true)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  question_text = EXCLUDED.question_text,
  options = EXCLUDED.options,
  correct_option_id = EXCLUDED.correct_option_id;`);
  });
  fs.writeFileSync(path.join(outDir, '20_assessment_questions.sql'), rows.join('\n'));
  migrationStats.push({ source: 'assessmentQuestions', target: 'public.assessment_questions', sourceCount: data.assessmentQuestions.length, validCount: rows.length, failedCount: 0 });
}

// 21. Assessment Configs (3)
{
  const rows = [];
  data.assessmentConfigs.forEach(c => {
    validAssessmentConfigIds.add(c.id);
    const createdAt = c.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = c.updatedAt || createdAt;
    rows.push(`INSERT INTO public.assessment_configs (id, name, description, exam_type, mode, ayush_system, subject_filters, topic_filters, difficulty, question_count, time_limit_minutes, passing_score_percent, is_active, created_at, updated_at)
VALUES (${sqlStr(c.id)}, ${sqlStr(c.name)}, ${sqlStr(c.description || '')}, ${sqlStr(c.examType || 'AIAPGET_PG')}, ${sqlStr(c.mode || 'Practice')}, ${sqlStr(c.ayushSystem || 'ayurveda')}, ${sqlTextArr(c.subjectFilters || [])}, ${sqlTextArr(c.topicFilters || [])}, ${sqlStr(c.difficulty || null)}, ${sqlNum(c.questionCount, 15)}, ${sqlNum(c.timeLimitMinutes, 30)}, ${sqlNum(c.passingScorePercent, 50)}, ${sqlBool(c.isActive, true)}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  question_count = EXCLUDED.question_count;`);
  });
  fs.writeFileSync(path.join(outDir, '21_assessment_configs.sql'), rows.join('\n'));
  migrationStats.push({ source: 'assessmentConfigs', target: 'public.assessment_configs', sourceCount: data.assessmentConfigs.length, validCount: rows.length, failedCount: 0 });
}

// 22. Assessment Attempts (14)
{
  const rows = [];
  let orphans = 0;
  data.assessmentAttempts.forEach(a => {
    if (!validUserIds.has(a.studentId)) {
      orphans++;
      anomalies.push({ entity: 'assessmentAttempts', id: a.id, issue: `StudentId ${a.studentId} not found in users` });
      return;
    }
    if (a.configId && !validAssessmentConfigIds.has(a.configId)) {
      orphans++;
      anomalies.push({ entity: 'assessmentAttempts', id: a.id, issue: `ConfigId ${a.configId} not found in assessmentConfigs` });
      return;
    }
    const startedAt = a.startedAt || '2026-09-01T00:00:00.000Z';
    const createdAt = a.createdAt || startedAt;
    const updatedAt = a.updatedAt || createdAt;
    rows.push(`INSERT INTO public.assessment_attempts (id, student_id, config_id, exam_type, ayush_system, question_ids, responses, started_at, ended_at, status, score, max_score, score_percent, correct_count, incorrect_count, unattempted_count, total_questions, skill_performance, created_at, updated_at)
VALUES (${sqlStr(a.id)}, ${sqlStr(a.studentId)}, ${sqlStr(a.configId)}, ${sqlStr(a.examType || 'AIAPGET_PG')}, ${sqlStr(a.ayushSystem || 'ayurveda')}, ${sqlTextArr(a.questionIds || [])}, ${sqlJson(a.responses || {})}, ${sqlDate(startedAt)}, ${sqlDate(a.endedAt)}, ${sqlStr(a.status || 'completed')}, ${sqlNum(a.score, null)}, ${sqlNum(a.maxScore, null)}, ${sqlNum(a.scorePercent, null)}, ${sqlNum(a.correctCount, null)}, ${sqlNum(a.incorrectCount, null)}, ${sqlNum(a.unattemptedCount, null)}, ${sqlNum(a.totalQuestions, 15)}, ${sqlJson(a.skillPerformance || {})}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  score = EXCLUDED.score,
  score_percent = EXCLUDED.score_percent;`);
  });
  fs.writeFileSync(path.join(outDir, '22_assessment_attempts.sql'), rows.join('\n'));
  migrationStats.push({ source: 'assessmentAttempts', target: 'public.assessment_attempts', sourceCount: data.assessmentAttempts.length, validCount: rows.length, failedCount: orphans });
}

// 23. AYUSH Skill Passports (4)
{
  const rows = [];
  let orphans = 0;
  data.ayushSkillPassports.forEach(a => {
    if (!validUserIds.has(a.studentId)) {
      orphans++;
      anomalies.push({ entity: 'ayushSkillPassports', id: a.studentId, issue: `StudentId ${a.studentId} not found in users` });
      return;
    }
    const passportId = a.id || ('passport_' + a.studentId);
    const createdAt = a.createdAt || '2026-09-01T00:00:00.000Z';
    const updatedAt = a.updatedAt || createdAt;
    rows.push(`INSERT INTO public.ayush_skill_passports (id, student_id, ayush_system, course, academic_level, institution, batch_year, skills, competencies, assessment_results, skill_gaps, certifications, internship_ids, verified_experiences, research_interests, industry_readiness_score, industry_readiness_band, created_at, updated_at)
VALUES (${sqlStr(passportId)}, ${sqlStr(a.studentId)}, ${sqlStr(a.ayushSystem || 'ayurveda')}, ${sqlStr(a.course || 'BAMS')}, ${sqlStr(a.academicLevel || 'UG')}, ${sqlStr(a.institution || '')}, ${sqlStr(a.batchYear || '')}, ${sqlJson(a.skills || {})}, ${sqlJsonArr(a.competencies || [])}, ${sqlJsonArr(a.assessmentResults || [])}, ${sqlJsonArr(a.skillGaps || [])}, ${sqlJsonArr(a.certifications || [])}, ${sqlTextArr(a.internshipIds || [])}, ${sqlJsonArr(a.verifiedExperiences || [])}, ${sqlTextArr(a.researchInterests || [])}, ${sqlNum(a.industryReadinessScore, 0)}, ${sqlStr(a.industryReadinessBand || 'Not Assessed')}, ${sqlDate(createdAt)}, ${sqlDate(updatedAt)})
ON CONFLICT (student_id) DO UPDATE SET
  skills = EXCLUDED.skills,
  competencies = EXCLUDED.competencies,
  assessment_results = EXCLUDED.assessment_results,
  skill_gaps = EXCLUDED.skill_gaps,
  industry_readiness_score = EXCLUDED.industry_readiness_score,
  industry_readiness_band = EXCLUDED.industry_readiness_band,
  updated_at = EXCLUDED.updated_at;`);
  });
  fs.writeFileSync(path.join(outDir, '23_ayush_skill_passports.sql'), rows.join('\n'));
  migrationStats.push({ source: 'ayushSkillPassports', target: 'public.ayush_skill_passports', sourceCount: data.ayushSkillPassports.length, validCount: rows.length, failedCount: orphans });
}

console.log('=== MIGRATION SQL GENERATION COMPLETE ===');
console.table(migrationStats);
console.log('Total anomalies / orphans detected:', anomalies.length);
fs.writeFileSync('frontend/scripts/migration_report.json', JSON.stringify({ stats: migrationStats, anomalies }, null, 2));
