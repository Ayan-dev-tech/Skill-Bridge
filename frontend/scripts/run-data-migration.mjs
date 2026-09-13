import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'frontend/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const sqlDir = path.resolve('frontend/scripts/migration_sql');
const json = JSON.parse(fs.readFileSync('frontend/data/skill_bridge.json', 'utf8'));

const files = [
  { file: '01_users.sql', entity: 'users', table: 'public.users', sourceCount: json.users.length },
  { file: '02_profiles.sql', entity: 'profiles', table: 'public.profiles', sourceCount: json.profiles.length },
  { file: '03_otps.sql', entity: 'otps', table: 'public.otp_verifications', sourceCount: json.otps.length },
  { file: '04_student_verifications.sql', entity: 'studentVerifications', table: 'public.student_verifications', sourceCount: json.studentVerifications.length },
  { file: '05_verification_documents.sql', entity: 'verificationDocuments', table: 'public.verification_documents', sourceCount: json.studentVerifications.reduce((acc, sv) => acc + (sv.documents ? sv.documents.length : 0), 0) },
  { file: '06_interest_sessions.sql', entity: 'interestSessions', table: 'public.interest_sessions', sourceCount: json.interestSessions.length },
  { file: '07_interest_profiles.sql', entity: 'interestProfiles', table: 'public.interest_profiles', sourceCount: json.interestProfiles.length },
  { file: '08_knowledge_test_sessions.sql', entity: 'knowledgeTestSessions', table: 'public.knowledge_test_sessions', sourceCount: json.knowledgeTestSessions.length },
  { file: '09_knowledge_test_results.sql', entity: 'knowledgeTestResults', table: 'public.knowledge_test_results', sourceCount: json.knowledgeTestResults.length },
  { file: '10_educators.sql', entity: 'educators', table: 'public.educators', sourceCount: json.educators.length },
  { file: '11_education_programs.sql', entity: 'educationPrograms', table: 'public.education_programs', sourceCount: json.educationPrograms.length },
  { file: '12_skill_gap_analyses.sql', entity: 'skillGapAnalyses', table: 'public.skill_gap_analyses', sourceCount: json.skillGapAnalyses.length },
  { file: '13_learning_resources.sql', entity: 'learningResources', table: 'public.learning_resources', sourceCount: json.learningResources.length },
  { file: '14_resume_analyses.sql', entity: 'resumeAnalyses', table: 'public.resume_analyses', sourceCount: json.resumeAnalyses.length },
  { file: '15_hiring_requests.sql', entity: 'hiringRequests', table: 'public.hiring_requests', sourceCount: json.hiringRequests.length },
  { file: '16_campus_requests.sql', entity: 'campusRequests', table: 'public.campus_requests', sourceCount: json.campusRequests.length },
  { file: '17_industry_questions.sql', entity: 'industryQuestions', table: 'public.industry_questions', sourceCount: json.industryQuestions.length },
  { file: '18_industry_hiring_posts.sql', entity: 'industryHiringPosts', table: 'public.industry_hiring_posts', sourceCount: json.industryHiringPosts.length },
  { file: '19_job_applications.sql', entity: 'jobApplications', table: 'public.job_applications', sourceCount: json.jobApplications.length },
  { file: '20_assessment_questions.sql', entity: 'assessmentQuestions', table: 'public.assessment_questions', sourceCount: json.assessmentQuestions.length },
  { file: '21_assessment_configs.sql', entity: 'assessmentConfigs', table: 'public.assessment_configs', sourceCount: json.assessmentConfigs.length },
  { file: '22_assessment_attempts.sql', entity: 'assessmentAttempts', table: 'public.assessment_attempts', sourceCount: json.assessmentAttempts.length },
  { file: '23_ayush_skill_passports.sql', entity: 'ayushSkillPassports', table: 'public.ayush_skill_passports', sourceCount: json.ayushSkillPassports.length }
];

async function run() {
  console.log('Starting Supabase Data Migration in strict dependency order...\n');
  const report = [];
  const allErrors = [];

  for (const item of files) {
    const filePath = path.join(sqlDir, item.file);
    if (!fs.existsSync(filePath)) {
      console.error(`File missing: ${filePath}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const statements = content.split(';\n').map(s => s.trim()).filter(s => s.length > 0).map(s => s + ';');

    let inserted = 0;
    let failed = 0;
    const batchSize = 25;

    for (let i = 0; i < statements.length; i += batchSize) {
      const batch = statements.slice(i, i + batchSize);
      const batchSql = batch.join('\n');

      const { error } = await supabase.rpc('exec_migration_sql', { sql_query: batchSql });
      if (!error) {
        inserted += batch.length;
      } else {
        // Fall back to statement-by-statement
        for (const singleSql of batch) {
          const { error: singleError } = await supabase.rpc('exec_migration_sql', { sql_query: singleSql });
          if (!singleError) {
            inserted++;
          } else {
            failed++;
            allErrors.push({
              entity: item.entity,
              error: singleError.message,
              sqlSnippet: singleSql.substring(0, 100) + '...'
            });
          }
        }
      }
    }

    const unattemptedOrphans = item.sourceCount - statements.length;
    const totalFailed = failed + unattemptedOrphans;

    report.push({
      source: item.entity,
      target: item.table,
      sourceCount: item.sourceCount,
      inserted: inserted,
      updated: 0,
      skipped: 0,
      failed: totalFailed
    });

    console.log(`[${item.entity} -> ${item.table}] source: ${item.sourceCount} | inserted: ${inserted} | failed/orphaned: ${totalFailed}`);
  }

  console.log('\n=== MIGRATION RUN COMPLETE ===');
  console.table(report);

  if (allErrors.length > 0) {
    console.log('\nErrors encountered during execution:', allErrors.length);
    console.log(JSON.stringify(allErrors.slice(0, 5), null, 2));
  } else {
    console.log('\nZero execution errors for all valid records!');
  }

  fs.writeFileSync('frontend/scripts/migration_execution_results.json', JSON.stringify({ report, allErrors }, null, 2));
}

run().catch(console.error);
