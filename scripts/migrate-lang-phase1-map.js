import fs from 'fs';
import path from 'path';

/**
 * Phase 1: Extract metadata from all .mdoc files
 * Creates a mapping of content -> current image -> new image structure
 */

function extractYamlValue(content, key) {
  const regex = new RegExp(`^${key}:\\s*(.+?)$`, 'm');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function extractNestedYamlValue(content, parentKey, childKey) {
  // Match: parentKey:\n  childKey: value
  const regex = new RegExp(`^${parentKey}:[\\s\\S]*?\\n\\s+${childKey}:\\s*(.+?)$`, 'm');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function getSlugFromTitle(titleField) {
  if (typeof titleField === 'string') {
    return titleField;
  }
  // If it's quoted, remove quotes
  if (titleField.startsWith("'") || titleField.startsWith('"')) {
    return titleField.slice(1, -1);
  }
  return titleField;
}

function findFilesRecursive(dir, extension) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFilesRecursive(fullPath, extension));
    } else if (entry.name.endsWith(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractMetadata() {
  console.log('🔍 Extracting metadata...\n');

  const mapping = [];
  let errors = [];

  // === ACCOMPAGNEMENTS ===
  console.log('🎯 Processing accompagnements...');
  const accompFiles = findFilesRecursive('src/content/accompagnements', '.mdoc');

  for (const filePath of accompFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) {
        errors.push(`No frontmatter found in ${filePath}`);
        continue;
      }

      const lang = extractYamlValue(frontmatterMatch[1], 'lang');
      const slug = extractYamlValue(frontmatterMatch[1], 'slug');
      let imagePath = extractYamlValue(frontmatterMatch[1], 'image');

      if (!imagePath) {
        errors.push(`No image field in ${filePath}`);
        continue;
      }

      // Remove quotes if present
      if (
        (imagePath.startsWith("'") || imagePath.startsWith('"')) &&
        (imagePath.endsWith("'") || imagePath.endsWith('"'))
      ) {
        imagePath = imagePath.slice(1, -1);
      }

      const ext = path.extname(imagePath);
      const currentFullPath = path.join('public', imagePath);
      const imageExists = fs.existsSync(currentFullPath);

      mapping.push({
        mdocPath: filePath,
        collection: 'services',
        lang,
        slug,
        currentImagePath: imagePath,
        currentImageFullPath: currentFullPath,
        newImagePath: `/images/accompagnements/${lang}/${slug}/image${ext}`,
        newImageFullPath: `public/images/accompagnements/${lang}/${slug}/image${ext}`,
        imageExists,
        extension: ext,
      });
    } catch (err) {
      errors.push(`Error processing ${filePath}: ${err.message}`);
    }
  }

  console.log(
    `   ✓ ${mapping.filter((m) => m.collection === 'services').length} accompagnements processed\n`
  );

  // === ARTICLES ===
  console.log('📝 Processing articles...');
  const articleFiles = findFilesRecursive('src/content/articles', '.mdoc');

  for (const filePath of articleFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) {
        errors.push(`No frontmatter found in ${filePath}`);
        continue;
      }

      const frontmatter = frontmatterMatch[1];
      const lang = extractYamlValue(frontmatter, 'lang');

      // For articles, extract slug from title which can be string or object
      let titleLine = extractYamlValue(frontmatter, 'title');
      let slug;

      // Check if title is an object with slug field
      const titleObjMatch = frontmatter.match(/^title:\n\s+name:\s*(.+?)\n\s+slug:\s*(.+?)$/m);
      if (titleObjMatch) {
        slug = getSlugFromTitle(titleObjMatch[2]);
      } else {
        // title is a simple string
        slug = getSlugFromTitle(titleLine);
      }

      // Extract featured photo image
      let imagePath = extractNestedYamlValue(frontmatter, 'featuredPhoto', 'image');

      if (!imagePath) {
        // Try to find image field directly
        imagePath = extractYamlValue(frontmatter, 'image');
      }

      if (!imagePath) {
        errors.push(`No image field in ${filePath}`);
        continue;
      }

      // Remove quotes
      if (
        (imagePath.startsWith("'") || imagePath.startsWith('"')) &&
        (imagePath.endsWith("'") || imagePath.endsWith('"'))
      ) {
        imagePath = imagePath.slice(1, -1);
      }

      const ext = path.extname(imagePath);
      const currentFullPath = path.join('public', imagePath);
      const imageExists = fs.existsSync(currentFullPath);

      mapping.push({
        mdocPath: filePath,
        collection: 'articles',
        lang,
        slug,
        currentImagePath: imagePath,
        currentImageFullPath: currentFullPath,
        newImagePath: `/images/articles/${lang}/${slug}/image${ext}`,
        newImageFullPath: `public/images/articles/${lang}/${slug}/image${ext}`,
        imageExists,
        extension: ext,
      });
    } catch (err) {
      errors.push(`Error processing ${filePath}: ${err.message}`);
    }
  }

  console.log(
    `   ✓ ${mapping.filter((m) => m.collection === 'articles').length} articles processed\n`
  );

  // Save mapping
  fs.writeFileSync('migration-lang-mapping.json', JSON.stringify(mapping, null, 2));

  // Summary
  const byCollection = {};
  const byLang = {};
  let missingImages = 0;
  let uniqueImages = new Set();

  mapping.forEach((m) => {
    byCollection[m.collection] = (byCollection[m.collection] || 0) + 1;
    byLang[m.lang] = (byLang[m.lang] || 0) + 1;
    if (!m.imageExists) missingImages++;
    uniqueImages.add(m.currentImagePath);
  });

  console.log('=== Summary ===');
  console.log(`Total files: ${mapping.length}`);
  console.log(`By collection:`, byCollection);
  console.log(`By language:`, byLang);
  console.log(`Unique images: ${uniqueImages.size}`);
  console.log(`Missing images: ${missingImages}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} warning(s):`);
    errors.forEach((err) => console.log(`   - ${err}`));
  }

  console.log('\n✅ Mapping saved to: migration-lang-mapping.json');
  console.log('   Review before proceeding to Phase 2\n');

  return { mapping, errors };
}

extractMetadata().catch(console.error);
