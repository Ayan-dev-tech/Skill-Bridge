import fs from 'fs';
import path from 'path';

const storageDir = path.resolve('frontend/data/storage/verification-documents');
const json = JSON.parse(fs.readFileSync('frontend/data/skill_bridge.json', 'utf8'));

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

const localFiles = getAllFiles(storageDir);
console.log('Total local storage files found:', localFiles.length);

// Extract relative paths with forward slashes
const localRelPaths = localFiles.map(f => path.relative(storageDir, f).replace(/\\/g, '/'));
console.log('Sample local paths (first 5):', localRelPaths.slice(0, 5));

// Check against documents in JSON
let docsWithMatchingPath = 0;
let docsTotal = 0;
const allDocs = [];

json.studentVerifications.forEach(sv => {
  if (Array.isArray(sv.documents)) {
    sv.documents.forEach(d => {
      docsTotal++;
      allDocs.push({ ...d, svStudentId: sv.studentId });
    });
  }
});

const localPathSet = new Set(localRelPaths);

allDocs.forEach(d => {
  // Check if storagePath or storageKey matches
  if (d.storagePath && localPathSet.has(d.storagePath)) {
    docsWithMatchingPath++;
  } else if (d.storagePath) {
    // maybe storagePath has prefix or relative
    const norm = d.storagePath.replace(/^.*verification-documents\//, '');
    if (localPathSet.has(norm)) {
      docsWithMatchingPath++;
    }
  }
});

console.log(`Docs with direct storagePath match: ${docsWithMatchingPath} / ${docsTotal}`);

// Check which local files have matching doc metadata in JSON
let localFilesWithMeta = 0;
const localMissingMeta = [];

localRelPaths.forEach(rel => {
  const match = allDocs.find(d => {
    return d.storagePath === rel || 
           (d.storagePath && d.storagePath.endsWith(rel)) ||
           (rel.includes(d.id || '___') && rel.includes(d.fileName || '___'));
  });
  if (match) {
    localFilesWithMeta++;
  } else {
    localMissingMeta.push(rel);
  }
});

console.log(`Local files matching doc metadata: ${localFilesWithMeta} / ${localFiles.length}`);
console.log(`Local files missing doc metadata: ${localMissingMeta.length}`);
if (localMissingMeta.length > 0) {
  console.log('Sample missing meta (first 5):', localMissingMeta.slice(0, 5));
}
