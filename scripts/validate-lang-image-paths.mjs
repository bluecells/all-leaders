import fs from 'fs';
import path from 'path';

const mapping = JSON.parse(fs.readFileSync('migration-lang-mapping-fixed.json', 'utf8'));

let validCount = 0;
let invalidCount = 0;
let missingFileCount = 0;

function extractYaml(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yamlContent = match[1];
  const result = {};

  const lines = yamlContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Get image from "image: /path" or in featuredPhoto block
    if (line.match(/^\s*image:\s*\/images/)) {
      const match = line.match(/image:\s*(\/images\/[^\s]+)/);
      if (match) {
        result.imagePath = match[1];
      }
    }
  }

  return result;
}

function validateDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      validateDir(filePath);
    } else if (file.endsWith('.mdoc')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const yaml = extractYaml(content);

      if (!yaml?.imagePath) continue;

      const relativePath = path.relative('.', filePath).replace(/\\/g, '/');
      const mappingEntry = mapping.find(m => m.mdocPath === relativePath);

      if (!mappingEntry) {
        console.log(`⚠️  No mapping for ${relativePath}`);
        continue;
      }

      // Check if actual path matches expected path
      if (yaml.imagePath === mappingEntry.newImagePath) {
        // Check if file exists
        const fullPath = `public${mappingEntry.newImagePath}`;
        if (fs.existsSync(fullPath)) {
          validCount++;
        } else {
          console.log(`❌ Missing file: ${fullPath} (referenced in ${relativePath})`);
          missingFileCount++;
        }
      } else {
        console.log(`❌ Path mismatch in ${relativePath}:`);
        console.log(`   Expected: ${mappingEntry.newImagePath}`);
        console.log(`   Got: ${yaml.imagePath}`);
        invalidCount++;
      }
    }
  }
}

validateDir('src/content/accompagnements');
validateDir('src/content/articles');

console.log(`\n📊 Validation Results:`);
console.log(`   ✅ Valid paths: ${validCount}`);
console.log(`   ❌ Invalid paths: ${invalidCount}`);
console.log(`   ⚠️  Missing files: ${missingFileCount}`);
console.log(`   📝 Total: ${validCount + invalidCount + missingFileCount}`);

if (invalidCount === 0 && missingFileCount === 0) {
  console.log(`\n✅ All image paths are valid and files exist!`);
}
