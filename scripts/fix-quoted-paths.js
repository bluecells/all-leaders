import fs from 'fs';

/**
 * Fix image paths that contain quotes - use correct slug from mapping
 */

function fixQuotedPaths() {
  console.log('🔧 Fixing quoted image paths...\n');

  const mapping = JSON.parse(fs.readFileSync('migration-lang-mapping.json', 'utf-8'));
  
  let fixed = 0;

  for (const item of mapping) {
    try {
      let content = fs.readFileSync(item.mdocPath, 'utf-8');

      // Look for any image path with quotes
      const quotedRegex = /image:[\s]*\/images\/[^"']*"[^"]*"\/image\.[^"']+/;
      
      if (quotedRegex.test(content)) {
        // Replace ALL quoted paths with the correct path from mapping
        content = content.replace(quotedRegex, `image: ${item.newImagePath}`);
        fs.writeFileSync(item.mdocPath, content, 'utf-8');
        console.log(`✓ Fixed: ${item.newImagePath}`);
        fixed++;
      }
    } catch (error) {
      console.error(`✗ Error:`, error.message);
    }
  }

  console.log(`\n✅ Fixed ${fixed} files\n`);
}

fixQuotedPaths();
