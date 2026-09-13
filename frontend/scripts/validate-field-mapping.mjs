import fs from 'fs';

const tables = JSON.parse(fs.readFileSync('frontend/scripts/supabase-tables.json', 'utf8'));
const tableMap = new Map(tables.map(t => [t.table_name, new Map(t.cols.map(c => [c.column, c]))]));

const json = JSON.parse(fs.readFileSync('frontend/data/skill_bridge.json', 'utf8'));

// Helper to convert camelCase to snake_case
function toSnake(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

console.log('Checking all collections against DB columns...');

function checkMapping(collectionName, tableName, customMap = {}) {
  const items = json[collectionName] || [];
  const dbCols = tableMap.get(tableName);
  if (!dbCols) {
    console.error(`Table ${tableName} not found in DB!`);
    return;
  }
  const unmappedKeys = new Set();
  items.forEach(item => {
    Object.keys(item).forEach(k => {
      const targetCol = customMap[k] !== undefined ? customMap[k] : toSnake(k);
      if (targetCol && !dbCols.has(targetCol)) {
        unmappedKeys.add(k);
      }
    });
  });
  console.log(`[${collectionName} -> ${tableName}] Items: ${items.length}, Unmapped keys:`, Array.from(unmappedKeys));
}

checkMapping('users', 'users');
checkMapping('profiles', 'profiles');
checkMapping('otps', 'otp_verifications');
checkMapping('studentVerifications', 'student_verifications', { documents: null, faceCapture: null });
checkMapping('interestSessions', 'interest_sessions');
checkMapping('interestProfiles', 'interest_profiles');
checkMapping('knowledgeTestSessions', 'knowledge_test_sessions');
checkMapping('knowledgeTestResults', 'knowledge_test_results');
checkMapping('educators', 'educators');
checkMapping('educationPrograms', 'education_programs');
checkMapping('skillGapAnalyses', 'skill_gap_analyses');
checkMapping('learningResources', 'learning_resources');
checkMapping('resumeAnalyses', 'resume_analyses');
checkMapping('hiringRequests', 'hiring_requests');
checkMapping('campusRequests', 'campus_requests');
checkMapping('industryQuestions', 'industry_questions');
checkMapping('industryHiringPosts', 'industry_hiring_posts');
checkMapping('jobApplications', 'job_applications');
checkMapping('assessmentQuestions', 'assessment_questions');
checkMapping('assessmentConfigs', 'assessment_configs', { ayushSkillFilters: null });
checkMapping('assessmentAttempts', 'assessment_attempts');
checkMapping('ayushSkillPassports', 'ayush_skill_passports');
