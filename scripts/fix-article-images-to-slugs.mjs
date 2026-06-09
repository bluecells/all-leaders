import fs from 'fs';
import path from 'path';

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yaml = match[1];
  const data = {};

  // Extract lang
  const langMatch = yaml.match(/^lang:\s*(\w+)/m);
  if (langMatch) data.lang = langMatch[1];

  // Extract seoSlug
  const slugMatch = yaml.match(/^seoSlug:\s*(.+)$/m);
  if (slugMatch) data.seoSlug = slugMatch[1].trim();

  // Extract image path
  const imageMatch = yaml.match(/^\s+image:\s*(.+)$/m);
  if (imageMatch) data.imagePath = imageMatch[1].trim();

  return data;
}

const articlesDir = 'src/content/articles';
let movedCount = 0;
let errorCount = 0;
const errors = [];

function processArticles(dir) {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processArticles(fullPath);
    } else if (entry.endsWith('.mdoc')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const data = extractFrontmatter(content);

      if (!data || !data.lang || !data.seoSlug || !data.imagePath) {
        console.log(`⏭️  Skip ${entry}: incomplete data`);
        continue;
      }

      const expectedPath = `/images/articles/${data.lang}/${data.seoSlug}/`;
      const expectedDir = `public${expectedPath}`;
      const ext = path.extname(data.imagePath);
      const expectedFile = `${expectedDir}image${ext}`;

      // Check if image already exists at expected location
      if (fs.existsSync(expectedFile)) {
        console.log(`✅ OK: ${entry} (already in place)`);
        continue;
      }

      // Find image in bad directories (with quotes)
      const searchDir = `public/images/articles/${data.lang}/`;
      if (!fs.existsSync(searchDir)) {
        console.log(`❌ Lang dir not found: ${searchDir}`);
        errorCount++;
        errors.push({ file: entry, reason: 'Lang dir not found' });
        continue;
      }

      const badDirs = fs.readdirSync(searchDir)
        .filter(d => {
          const stat = fs.statSync(path.join(searchDir, d));
          return stat.isDirectory() && (d.includes("'") || d.includes('"'));
        })
        .map(d => path.join(searchDir, d));

      let foundImage = null;
      for (const badDir of badDirs) {
        const potentialImage = path.join(badDir, `image${ext}`);
        if (fs.existsSync(potentialImage)) {
          foundImage = potentialImage;
          break;
        }
      }

      if (!foundImage) {
        console.log(`❌ Not found: ${entry} (${data.seoSlug})`);
        errorCount++;
        errors.push({ file: entry, slug: data.seoSlug, reason: 'Image not found' });
        continue;
      }

      // Create target directory if needed
      if (!fs.existsSync(expectedDir)) {
        fs.mkdirSync(expectedDir, { recursive: true });
      }

      // Move image
      fs.renameSync(foundImage, expectedFile);
      movedCount++;
      console.log(`✅ Moved: ${path.basename(foundImage)} → ${data.lang}/${data.seoSlug}/`);
    }
  }
}

console.log('Starting article image fix...\n');
processArticles(articlesDir);

console.log(`\n📊 Results:`);
console.log(`✅ Moved: ${movedCount} images`);
console.log(`❌ Errors: ${errorCount} images`);

if (errors.length > 0) {
  console.log(`\n❌ Failed files:`);
  errors.forEach(e => console.log(`   - ${e.file}: ${e.reason}`));
}
