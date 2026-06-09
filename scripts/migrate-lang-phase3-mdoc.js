import fs from 'fs';

/**
 * Phase 3: Update .mdoc files with new image paths
 * - Replace image paths in frontmatter
 * - Handle both accompagnements and articles
 */

function updateMdocFiles() {
  console.log('✏️  Updating .mdoc files...\n');

  // Read mapping from Phase 1
  const mapping = JSON.parse(fs.readFileSync('migration-lang-mapping.json', 'utf-8'));

  const results = {
    updated: [],
    failed: [],
    skipped: []
  };

  for (const item of mapping) {
    try {
      let content = fs.readFileSync(item.mdocPath, 'utf-8');
      let modified = false;

      // Create regex to match the old path precisely
      const oldPathEscaped = item.currentImagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      if (item.collection === 'services') {
        // For accompagnements: replace in "image: /path"
        const imageRegex = new RegExp(`(image:\\s*)${oldPathEscaped}`, 'g');
        if (imageRegex.test(content)) {
          content = content.replace(imageRegex, `$1${item.newImagePath}`);
          modified = true;
        }
      } else if (item.collection === 'articles') {
        // For articles: replace in "featuredPhoto:\n  image: /path"
        const featuredPhotoRegex = new RegExp(
          `(featuredPhoto:[\\s\\S]*?\\n\\s+image:\\s*)${oldPathEscaped}`,
          'g'
        );
        if (featuredPhotoRegex.test(content)) {
          content = content.replace(featuredPhotoRegex, `$1${item.newImagePath}`);
          modified = true;
        }

        // Also try direct image field (less common)
        const imageRegex = new RegExp(`(image:\\s*)${oldPathEscaped}`, 'g');
        if (imageRegex.test(content)) {
          content = content.replace(imageRegex, `$1${item.newImagePath}`);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(item.mdocPath, content, 'utf-8');
        console.log(`✓ Updated ${item.mdocPath}`);
        results.updated.push(item);
      } else {
        results.skipped.push(item);
      }
    } catch (error) {
      console.error(`✗ Failed to update ${item.mdocPath}:`, error.message);
      results.failed.push({ ...item, error: error.message });
    }
  }

  // Save results
  fs.writeFileSync(
    'migration-mdoc-results.json',
    JSON.stringify(results, null, 2)
  );

  console.log('\n=== MDOC Update Summary ===');
  console.log(`✓ Updated: ${results.updated.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);
  console.log(`⚠️  Skipped (no match): ${results.skipped.length}`);

  const byCollection = {
    services: results.updated.filter(u => u.collection === 'services').length,
    articles: results.updated.filter(u => u.collection === 'articles').length
  };

  console.log(`\nBy collection:`);
  console.log(`  Services: ${byCollection.services}`);
  console.log(`  Articles: ${byCollection.articles}`);

  console.log('\nResults saved to: migration-mdoc-results.json\n');
}

updateMdocFiles();
