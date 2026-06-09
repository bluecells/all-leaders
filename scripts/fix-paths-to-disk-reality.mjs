import fs from 'fs';
import path from 'path';

const diskMapping = JSON.parse(fs.readFileSync('disk-image-mapping.json', 'utf8'));

// Create a lookup map: collection -> lang -> slug -> newImagePath
const pathsByCollection = {};
diskMapping.forEach(item => {
  if (!pathsByCollection[item.collection]) {
    pathsByCollection[item.collection] = {};
  }
  if (!pathsByCollection[item.collection][item.lang]) {
    pathsByCollection[item.collection][item.lang] = {};
  }
  pathsByCollection[item.collection][item.lang][item.slug] = item.newImagePath;
});

// Extract YAML
function extractYaml(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { yaml: null, rest: content };

  const yamlContent = match[1];
  const rest = content.slice(match[0].length + 1);

  return { yaml: yamlContent, rest };
}

let fixedCount = 0;
let errorCount = 0;

function processDir(dir, collection) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDir(filePath, collection);
    } else if (file.endsWith('.mdoc')) {
      const relativePath = path.relative('.', filePath).replace(/\\/g, '/');
      const content = fs.readFileSync(filePath, 'utf8');
      const { yaml, rest } = extractYaml(content);

      if (!yaml) continue;

      const yamlLines = yaml.split('\n');

      // Extract lang and slug
      let lang = null;
      let slug = null;
      let hasImage = false;

      for (const line of yamlLines) {
        const langMatch = line.match(/^lang:\s*(fr|en)/);
        if (langMatch) {
          lang = langMatch[1];
        }

        const slugMatch = line.match(/^\s*slug:\s*(.+)$/);
        if (slugMatch) {
          slug = slugMatch[1].trim();
        }

        const seoSlugMatch = line.match(/^\s*seoSlug:\s*(.+)$/);
        if (seoSlugMatch && !slug) {
          slug = seoSlugMatch[1].trim();
        }

        if (line.includes('image:') && line.includes('/images')) {
          hasImage = true;
        }
      }

      if (!lang || !slug || !hasImage) continue;

      // Find correct path
      const correctPath = pathsByCollection[collection]?.[lang]?.[slug];

      if (!correctPath) {
        console.log(`⚠️  No image on disk for ${collection}/${lang}/${slug} (${relativePath})`);
        errorCount++;
        continue;
      }

      // Update image line
      const newYamlLines = yamlLines.map(line => {
        if (line.match(/^\s*image:\s*\/images/)) {
          const indent = line.match(/^\s*/)[0];
          return `${indent}image: ${correctPath}`;
        }
        return line;
      });

      const newContent = `---\n${newYamlLines.join('\n')}\n---${rest}`;
      fs.writeFileSync(filePath, newContent, 'utf8');
      fixedCount++;
      console.log(`✅ Fixed: ${relativePath}`);
    }
  }
}

processDir('src/content/accompagnements', 'services');
processDir('src/content/articles', 'articles');

console.log(`\n✅ Fixed ${fixedCount} files`);
if (errorCount > 0) {
  console.log(`⚠️  Could not fix ${errorCount} files (image not found on disk)`);
}
