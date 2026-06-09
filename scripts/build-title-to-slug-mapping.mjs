import fs from 'fs';
import path from 'path';

// Extract frontmatter
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yaml = match[1];
  const data = {};

  // Extract lang
  const langMatch = yaml.match(/^lang:\s*(\w+)/m);
  if (langMatch) data.lang = langMatch[1];

  // Extract title
  const titleMatch = yaml.match(/^title:\s*['"]?(.+?)['"]?$/m);
  if (titleMatch) data.title = titleMatch[1].trim();

  // Extract seoSlug
  const slugMatch = yaml.match(/^seoSlug:\s*(.+)$/m);
  if (slugMatch) data.seoSlug = slugMatch[1].trim();

  // Extract image path
  const imageMatch = yaml.match(/^\s+image:\s*(.+)$/m);
  if (imageMatch) data.imagePath = imageMatch[1].trim();

  return data;
}

const mapping = [];

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

      if (!data || !data.lang || !data.seoSlug || !data.title) {
        console.warn(`⚠️  Skip ${entry}: incomplete data`);
        continue;
      }

      mapping.push({
        mdocFile: entry,
        lang: data.lang,
        title: data.title,
        seoSlug: data.seoSlug,
        imagePath: data.imagePath || null,
        expectedImageExt: data.imagePath ? path.extname(data.imagePath) : null
      });
    }
  }
}

console.log('Building title-to-slug mapping...\n');
processArticles('src/content/articles');

// Save mapping
fs.writeFileSync('title-to-slug-mapping.json', JSON.stringify(mapping, null, 2), 'utf8');

console.log(`✅ Mapped ${mapping.length} articles`);
console.log(`   - FR: ${mapping.filter(m => m.lang === 'fr').length}`);
console.log(`   - EN: ${mapping.filter(m => m.lang === 'en').length}`);
console.log('\n📄 Output: title-to-slug-mapping.json');
