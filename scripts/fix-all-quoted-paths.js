import fs from 'fs';

/**
 * Fix ALL image paths that contain quotes (single or double)
 */

function fixAllQuotedPaths() {
  console.log('🔧 Fixing ALL quoted image paths...\n');

  const mapping = JSON.parse(fs.readFileSync('migration-lang-mapping.json', 'utf-8'));
  
  let fixed = 0;

  for (const item of mapping) {
    try {
      let content = fs.readFileSync(item.mdocPath, 'utf-8');
      const original = content;

      // Match ANY quoted path pattern and replace with correct path
      // Pattern: image: /path/with/"quotes"/image.ext OR image: /path/with/'quotes'/image.ext
      content = content.replace(
        /image:\s+\/images\/[^"\n]*["'].*?["']\/image\.[a-z]+/g,
        `image: ${item.newImagePath}`
      );

      if (content !== original) {
        fs.writeFileSync(item.mdocPath, content, 'utf-8');
        console.log(`✓ Fixed: ${item.mdocPath}`);
        fixed++;
      }
    } catch (error) {
      console.error(`✗ Error:`, error.message);
    }
  }

  console.log(`\n✅ Fixed ${fixed} files\n`);
}

fixAllQuotedPaths();
