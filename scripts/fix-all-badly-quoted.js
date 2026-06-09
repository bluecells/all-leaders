import fs from 'fs';
import path from 'path';

/**
 * Fix malformed paths by directly replacing bad patterns
 */

function fixBadlyQuoted() {
  console.log('🔧 Cleaning malformed image paths...\n');

  const mapping = JSON.parse(fs.readFileSync('migration-lang-mapping.json', 'utf-8'));
  
  let fixed = 0;

  for (const item of mapping) {
    try {
      let content = fs.readFileSync(item.mdocPath, 'utf-8');
      const lines = content.split('\n');
      let modified = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // If line contains "image:" and has quotes or weird characters in path
        if (line.includes('image:') && (line.includes('"') || line.includes("'"))) {
          // Extract the base path structure and replace with correct one
          if (line.includes('/images/')) {
            // Replace the entire image path after "image:" with the correct one
            const beforeImage = line.substring(0, line.indexOf('image:') + 'image:'.length);
            lines[i] = beforeImage + ' ' + item.newImagePath;
            modified = true;
          }
        }
      }

      if (modified) {
        fs.writeFileSync(item.mdocPath, lines.join('\n'), 'utf-8');
        console.log(`✓ Fixed: ${item.mdocPath}`);
        fixed++;
      }
    } catch (error) {
      console.error(`✗ Error:`, error.message);
    }
  }

  console.log(`\n✅ Fixed ${fixed} files\n`);
}

fixBadlyQuoted();
