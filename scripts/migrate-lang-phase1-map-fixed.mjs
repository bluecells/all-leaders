import fs from 'fs';
import path from 'path';

// Extract YAML front matter
function extractYaml(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const yamlContent = match[1];
  const result = {};
  
  const lines = yamlContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Parse simple key: value pairs
    const simpleMatch = line.match(/^([a-zA-Z]+):\s*(.+)$/);
    if (simpleMatch) {
      const [, key, value] = simpleMatch;
      result[key] = value.replace(/^['"]|['"]$/g, '');
    }
    
    // Parse nested fields like featuredPhoto:
    if (line.match(/^[a-zA-Z]+:\s*$/)) {
      const key = line.slice(0, -1).trim();
      if (key === 'featuredPhoto') {
        // Get next indented lines
        i++;
        while (i < lines.length && lines[i].startsWith('  ')) {
          const nestedLine = lines[i].trim();
          const nestedMatch = nestedLine.match(/^([a-zA-Z]+):\s*(.+)$/);
          if (nestedMatch) {
            const [, nestedKey, nestedValue] = nestedMatch;
            result[`${key}_${nestedKey}`] = nestedValue.replace(/^['"]|['"]$/g, '');
          }
          i++;
        }
        i--;
      }
    }
  }
  
  return result;
}

function processFiles(dir, collection) {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results.push(...processFiles(filePath, collection));
    } else if (file.endsWith('.mdoc')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const yaml = extractYaml(content);
      
      if (!yaml) {
        console.warn(`⚠️  No YAML found in ${filePath}`);
        continue;
      }
      
      const lang = yaml.lang;
      const slug = yaml.seoSlug || path.basename(filePath, '.mdoc');
      const currentImagePath = yaml.featuredPhoto_image || yaml.image;
      
      if (!currentImagePath) {
        console.log(`⏭️  No image in ${filePath}`);
        continue;
      }
      
      // Determine extension
      const ext = path.extname(currentImagePath);
      const collectionDir = collection === 'articles' ? 'articles' : 'services';
      const newImagePath = `/images/${collectionDir}/${lang}/${slug}/image${ext}`;
      const newImageFullPath = `public${newImagePath}`;
      const currentImageFullPath = `public${currentImagePath}`;
      
      // Check if current image exists
      const imageExists = fs.existsSync(currentImageFullPath);
      
      const relativePath = path.relative('.', filePath).replace(/\\/g, '/');
      
      results.push({
        mdocPath: relativePath,
        collection: collectionDir,
        lang,
        slug,
        currentImagePath,
        currentImageFullPath,
        newImagePath,
        newImageFullPath,
        imageExists,
        extension: ext
      });
    }
  }
  
  return results;
}

// Process both accompagnements and articles
const accompagnements = processFiles('src/content/accompagnements', 'services');
const articles = processFiles('src/content/articles', 'articles');

const allResults = [...accompagnements, ...articles];

// Save mapping
fs.writeFileSync('migration-lang-mapping-fixed.json', JSON.stringify(allResults, null, 2), 'utf8');

console.log(`✅ Mapped ${allResults.length} files:`);
console.log(`   - ${accompagnements.length} accompagnements (services)`);
console.log(`   - ${articles.length} articles`);
console.log(`\n📄 Output: migration-lang-mapping-fixed.json`);

// Verify
const missingImages = allResults.filter(r => !r.imageExists);
if (missingImages.length > 0) {
  console.log(`\n⚠️  ${missingImages.length} files missing images:`);
  missingImages.forEach(r => console.log(`   - ${r.mdocPath}`));
}
