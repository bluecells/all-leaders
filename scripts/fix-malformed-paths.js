import fs from 'fs';

/**
 * Fix paths that contain quotes or other characters that break YAML
 */

function fixMalformedPaths() {
  console.log('🔧 Fixing malformed image paths...\n');

  const mapping = JSON.parse(fs.readFileSync('migration-lang-mapping.json', 'utf-8'));

  // For each mapping entry, find files that still have old malformed path
  for (const item of mapping) {
    try {
      const content = fs.readFileSync(item.mdocPath, 'utf-8');

      // Check if the file has the correct new path
      if (!content.includes(item.newImagePath)) {
        // Try to find any variant with quotes or other characters
        const lines = content.split('\n');
        let fixed = false;

        for (let i = 0; i < lines.length; i++) {
          // Match any image path line that doesn't have the correct path
          if ((lines[i].includes('image:') || lines[i].includes('  image:')) &&
              lines[i].includes('/images/') &&
              !lines[i].includes(item.newImagePath)) {
            // Replace with correct path
            lines[i] = lines[i].replace(/\/images\/[^\s"'\n]+/, item.newImagePath);
            fixed = true;
            console.log(`✓ Fixed: ${item.mdocPath}`);
          }
        }

        if (fixed) {
          fs.writeFileSync(item.mdocPath, lines.join('\n'), 'utf-8');
        }
      }
    } catch (error) {
      console.error(`✗ Error processing ${item.mdocPath}:`, error.message);
    }
  }

  console.log('\n✅ Malformed paths fixed\n');
}

fixMalformedPaths();
