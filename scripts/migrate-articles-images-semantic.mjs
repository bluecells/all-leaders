import fs from 'fs';
import path from 'path';

// Load mapping
const mapping = JSON.parse(fs.readFileSync('title-to-slug-mapping.json', 'utf8'));

// Normalize string for comparison (remove quotes, extra spaces, punctuation)
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/['"«»]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Find best match between directory name and article titles
function findMatchingArticle(dirName, candidates) {
  const normalizedDir = normalize(dirName);

  // Try exact match first
  for (const article of candidates) {
    if (normalize(article.title) === normalizedDir) {
      return { article, confidence: 'exact' };
    }
  }

  // Try partial match (directory name contains title or vice versa)
  for (const article of candidates) {
    const normalizedTitle = normalize(article.title);
    if (normalizedDir.includes(normalizedTitle) || normalizedTitle.includes(normalizedDir)) {
      return { article, confidence: 'partial' };
    }
  }

  return null;
}

let movedCount = 0;
let errorCount = 0;
const errors = [];
const matchLog = [];

function migrateImages(lang) {
  const searchDir = `public/images/articles/${lang}/`;

  if (!fs.existsSync(searchDir)) {
    console.log(`⚠️  Lang directory not found: ${searchDir}`);
    return;
  }

  const entries = fs.readdirSync(searchDir);
  const candidates = mapping.filter(m => m.lang === lang && m.imagePath);

  for (const entry of entries) {
    const fullPath = path.join(searchDir, entry);
    const stat = fs.statSync(fullPath);

    // Only process directories with quotes
    if (!stat.isDirectory() || !(entry.includes("'") || entry.includes('"'))) {
      continue;
    }

    // Find matching article
    const match = findMatchingArticle(entry, candidates);

    if (!match) {
      console.log(`❌ No match for directory: "${entry}"`);
      errorCount++;
      errors.push({ dirName: entry, reason: 'No matching article' });
      continue;
    }

    const { article, confidence } = match;

    // Find image in directory
    const imageFiles = fs.readdirSync(fullPath).filter(f => f.startsWith('image.'));

    if (imageFiles.length === 0) {
      console.log(`⚠️  No image in: "${entry}"`);
      continue;
    }

    const imageFile = imageFiles[0];
    const ext = path.extname(imageFile);
    const sourcePath = path.join(fullPath, imageFile);

    // Verify extension matches expected
    if (article.expectedImageExt && article.expectedImageExt !== ext) {
      console.log(`⚠️  Extension mismatch for "${entry}": expected ${article.expectedImageExt}, found ${ext}`);
    }

    // Create target directory
    const targetDir = `public/images/articles/${lang}/${article.seoSlug}/`;
    const targetPath = `${targetDir}image${ext}`;

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Move image
    fs.renameSync(sourcePath, targetPath);
    movedCount++;

    const logEntry = {
      sourceDir: entry,
      targetSlug: article.seoSlug,
      articleTitle: article.title,
      confidence: confidence
    };
    matchLog.push(logEntry);

    console.log(`✅ [${confidence.toUpperCase()}] "${entry}" → ${article.seoSlug}/`);
  }
}

console.log('Starting semantic image migration...\n');
console.log('=== FRANÇAIS ===\n');
migrateImages('fr');
console.log('\n=== ENGLISH ===\n');
migrateImages('en');

console.log(`\n📊 Results:`);
console.log(`✅ Moved: ${movedCount} images`);
console.log(`❌ Errors: ${errorCount} unmatched`);

if (errors.length > 0) {
  console.log(`\n❌ Unmatched directories:`);
  errors.forEach(e => console.log(`   - "${e.dirName}": ${e.reason}`));
}

// Save match log
fs.writeFileSync('migration-match-log.json', JSON.stringify(matchLog, null, 2), 'utf8');
console.log(`\n📄 Match log saved: migration-match-log.json`);
