import fs from 'fs';
import path from 'path';

/**
 * Phase 2: Migrate images to new nested directory structure
 * - Create /lang/{slug}/ directories
 * - Copy images (not move) and rename to image.{ext}
 */

function migrateFilesystem() {
  console.log('🚀 Starting filesystem migration...\n');

  // Read mapping from Phase 1
  const mapping = JSON.parse(fs.readFileSync('migration-lang-mapping.json', 'utf-8'));

  const results = {
    success: [],
    failed: [],
    skipped: []
  };

  let processedServices = new Set();
  let processedArticles = new Set();

  for (const item of mapping) {
    try {
      // Skip if source image doesn't exist
      if (!item.imageExists) {
        console.warn(`⚠️  Skipping ${item.currentImagePath} - file not found`);
        results.skipped.push(item);
        continue;
      }

      // Create nested directory structure
      const targetDir = path.dirname(item.newImageFullPath);
      fs.mkdirSync(targetDir, { recursive: true });

      // Copy image (preserve original for safety)
      fs.copyFileSync(item.currentImageFullPath, item.newImageFullPath);

      console.log(`✓ ${item.newImagePath}`);
      results.success.push(item);

      // Track which collections we've processed
      if (item.collection === 'services') {
        processedServices.add(`${item.lang}/${item.slug}`);
      } else {
        processedArticles.add(`${item.lang}/${item.slug}`);
      }

    } catch (error) {
      console.error(`✗ Failed to migrate ${item.currentImagePath}:`, error.message);
      results.failed.push({ ...item, error: error.message });
    }
  }

  // Save results
  fs.writeFileSync(
    'migration-filesystem-results.json',
    JSON.stringify(results, null, 2)
  );

  // Summary
  console.log('\n=== Filesystem Migration Summary ===');
  console.log(`✓ Success: ${results.success.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);
  console.log(`⚠️  Skipped: ${results.skipped.length}`);

  console.log('\nServices processed:');
  console.log(`  FR: ${Array.from(processedServices).filter(s => s.startsWith('fr/')).length}`);
  console.log(`  EN: ${Array.from(processedServices).filter(s => s.startsWith('en/')).length}`);

  console.log('Articles processed:');
  console.log(`  FR: ${Array.from(processedArticles).filter(s => s.startsWith('fr/')).length}`);
  console.log(`  EN: ${Array.from(processedArticles).filter(s => s.startsWith('en/')).length}`);

  console.log('\nResults saved to: migration-filesystem-results.json\n');
}

migrateFilesystem();
