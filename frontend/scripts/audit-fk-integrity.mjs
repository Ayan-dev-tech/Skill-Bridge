import fs from 'fs';

const data = JSON.parse(fs.readFileSync('frontend/data/skill_bridge.json', 'utf8'));

console.log('Total collections:', Object.keys(data).length);

const userIds = new Set(data.users.map(u => u.id));
const educatorIds = new Set(data.educators.map(e => e.id));
const educationProgramIds = new Set(data.educationPrograms.map(p => p.id));
const interestProfileIds = new Set(data.interestProfiles.map(p => p.id));
const ktResultIds = new Set(data.knowledgeTestResults.map(r => r.id));
const skillGapIds = new Set(data.skillGapAnalyses.map(s => s.id));
const configIds = new Set(data.assessmentConfigs.map(c => c.id));
const hiringPostIds = new Set(data.industryHiringPosts.map(p => p.id));

const report = {};

function checkCollection(name, arr, getFks) {
  report[name] = { total: arr.length, valid: 0, orphaned: 0, sampleOrphans: [] };
  arr.forEach((item, idx) => {
    const fks = getFks(item);
    let isOrphan = false;
    for (const [fkName, val, parentSet] of fks) {
      if (val && !parentSet.has(val)) {
        isOrphan = true;
        report[name].sampleOrphans.push({ idx, id: item.id || item.studentId, fkName, val });
        break;
      }
    }
    if (isOrphan) {
      report[name].orphaned++;
    } else {
      report[name].valid++;
    }
  });
}

checkCollection('users', data.users, () => []);
checkCollection('profiles', data.profiles, p => [['userId', p.userId, userIds]]);
checkCollection('otps', data.otps, () => []);
checkCollection('hiringRequests', data.hiringRequests, () => []);
checkCollection('campusRequests', data.campusRequests, () => []);
checkCollection('interestProfiles', data.interestProfiles, p => [['studentId', p.studentId, userIds]]);
checkCollection('interestSessions', data.interestSessions, s => [['studentId', s.studentId, userIds]]);
checkCollection('knowledgeTestSessions', data.knowledgeTestSessions, s => [['studentId', s.studentId, userIds]]);
checkCollection('knowledgeTestResults', data.knowledgeTestResults, r => [['studentId', r.studentId, userIds]]);
checkCollection('studentVerifications', data.studentVerifications, sv => [['studentId', sv.studentId, userIds]]);
checkCollection('skillGapAnalyses', data.skillGapAnalyses, s => [
  ['studentId', s.studentId, userIds],
  ['interestProfileId', s.interestProfileId, interestProfileIds],
  ['knowledgeTestResultId', s.knowledgeTestResultId, ktResultIds]
]);
checkCollection('educators', data.educators, () => []);
checkCollection('educationPrograms', data.educationPrograms, p => [['educatorId', p.educatorId, educatorIds]]);
checkCollection('learningResources', data.learningResources, r => [
  ['studentId', r.studentId, userIds],
  ['analysisId', r.analysisId, skillGapIds]
]);
checkCollection('jobApplications', data.jobApplications, a => [['studentId', a.studentId, userIds]]);
checkCollection('resumeAnalyses', data.resumeAnalyses, r => [['studentId', r.studentId, userIds]]);
checkCollection('industryQuestions', data.industryQuestions, q => [['industryId', q.industryId, userIds]]);
checkCollection('industryHiringPosts', data.industryHiringPosts, p => [['industryId', p.industryId, userIds]]);
checkCollection('assessmentQuestions', data.assessmentQuestions, () => []);
checkCollection('assessmentConfigs', data.assessmentConfigs, () => []);
checkCollection('assessmentAttempts', data.assessmentAttempts, a => [
  ['studentId', a.studentId, userIds],
  ['configId', a.configId, configIds]
]);
checkCollection('ayushSkillPassports', data.ayushSkillPassports, a => [['studentId', a.studentId, userIds]]);

console.log(JSON.stringify(report, null, 2));
