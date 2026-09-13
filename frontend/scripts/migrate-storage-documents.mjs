import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'frontend/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const storageDir = path.resolve('frontend/data/storage/verification-documents');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') return 'application/pdf';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

async function run() {
  console.log('=== STARTING DOCUMENT STORAGE MIGRATION ===\n');

  if (!fs.existsSync(storageDir)) {
    console.error(`Storage directory not found: ${storageDir}`);
    return;
  }

  const localFiles = getAllFiles(storageDir);
  console.log(`Discovered ${localFiles.length} local files in ${storageDir}`);

  // Fetch all storage_path entries from DB via Security Definer RPC
  const { data: dbDocs, error: dbError } = await supabase.rpc('get_migration_doc_paths');

  if (dbError) {
    console.error('Failed to query verification_documents from DB:', dbError);
    return;
  }

  console.log(`Fetched ${dbDocs.length} verification document records from Supabase DB`);

  const dbPathSet = new Set();
  const dbDocMap = new Map();
  dbDocs.forEach(d => {
    if (d.storage_path) {
      const cleanPath = d.storage_path.replace(/\\/g, '/').replace(/^data\/storage\/verification-documents\//, '');
      dbPathSet.add(cleanPath);
      dbDocMap.set(cleanPath, d);
    }
  });

  let uploadedCount = 0;
  let failedUploads = 0;
  const uploadErrors = [];
  const missingMetadata = [];

  for (const fullPath of localFiles) {
    const relPath = path.relative(storageDir, fullPath).replace(/\\/g, '/');

    // Check if corresponding DB metadata exists
    if (!dbPathSet.has(relPath)) {
      missingMetadata.push({
        path: relPath,
        sizeBytes: fs.statSync(fullPath).size
      });
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(fullPath);
      const mimeType = getMimeType(fullPath);

      const { data, error } = await supabase.storage
        .from('verification-documents')
        .upload(relPath, fileBuffer, {
          contentType: mimeType,
          upsert: true
        });

      if (error) {
        failedUploads++;
        uploadErrors.push({ path: relPath, error: error.message });
      } else {
        uploadedCount++;
      }
    } catch (err) {
      failedUploads++;
      uploadErrors.push({ path: relPath, error: err.message });
    }
  }

  const results = {
    bucketName: 'verification-documents',
    localCount: localFiles.length,
    uploadedCount: uploadedCount,
    failedUploads: failedUploads,
    missingMetadataReferences: missingMetadata.length,
    sampleMissingMetadata: missingMetadata.slice(0, 5),
    uploadErrors: uploadErrors
  };

  console.log('\n=== STORAGE MIGRATION RESULTS ===');
  console.log(`Total local files scanned:       ${results.localCount}`);
  console.log(`Uploaded to Supabase Storage:    ${results.uploadedCount}`);
  console.log(`Failed uploads:                  ${results.failedUploads}`);
  console.log(`Missing DB metadata references:  ${results.missingMetadataReferences}`);

  fs.writeFileSync('frontend/scripts/storage_migration_report.json', JSON.stringify(results, null, 2));
}

run().catch(console.error);
