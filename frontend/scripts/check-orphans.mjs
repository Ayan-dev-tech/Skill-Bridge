import fs from 'fs';

const data = JSON.parse(fs.readFileSync('frontend/data/skill_bridge.json', 'utf8'));
const userIds = new Set(data.users.map(u => u.id));

console.log('--- PROFILE ORPHANS ---');
data.profiles.filter(p => !userIds.has(p.userId)).forEach(p => console.log(p));

console.log('--- SV STUDENT ORPHANS (first 5) ---');
data.studentVerifications.filter(sv => !userIds.has(sv.studentId)).slice(0, 5).forEach(sv => console.log(sv.id, sv.studentId, sv.status));

console.log('--- KT RESULT ORPHANS (first 5) ---');
data.knowledgeTestResults.filter(r => !userIds.has(r.studentId)).slice(0, 5).forEach(r => console.log(r.id, r.studentId));

console.log('--- JOB APP ORPHANS ---');
data.jobApplications.filter(a => !userIds.has(a.studentId)).forEach(a => console.log(a.id, a.studentId, a.jobPostId));
