import dotenv from 'dotenv';
dotenv.config({ path: 'frontend/.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  global: { headers: { 'x-skillbridge-server-secret': process.env.SESSION_SECRET } },
});

async function inspect() {
  const { data: users } = await supabase.from('users').select('id, role, email').limit(5);
  console.log('Sample users:', users);

  const { data: att } = await supabase.from('assessment_attempts').select('*').limit(1);
  console.log('Sample assessment_attempts columns:', att && att[0] ? Object.keys(att[0]) : 'empty');

  const { data: jobApps } = await supabase.from('job_applications').select('*').limit(1);
  console.log('Sample job_applications columns:', jobApps && jobApps[0] ? Object.keys(jobApps[0]) : 'empty');

  const { data: posts } = await supabase.from('industry_hiring_posts').select('*').limit(1);
  console.log('Sample industry_hiring_posts columns:', posts && posts[0] ? Object.keys(posts[0]) : 'empty');
}

inspect();
