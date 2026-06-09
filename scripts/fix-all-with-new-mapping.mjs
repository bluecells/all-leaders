import fs from 'fs';
import path from 'path';

// Read the fixed mapping
const mapping = JSON.parse(fs.readFileSync('migration-lang-mapping-fixed.json', 'utf8'));

// Create map from mdocPath to newImagePath
const pathMap = new Map();
mapping.forEach(item => {
  pathMap.set(item.mdocPath, item.newImagePath);
});

let fixedCount = 0;

// Fix accompanements
const accompDir = 'src/content/accompagnements';
function fixDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixDir(filePath);
    } else if (file.endsWith('.mdoc')) {
      const relativePath = path.relative('.', filePath).replace(/\\/g, '/');
      const newImagePath = pathMap.get(relativePath);
      
      if (!newImagePath) {
        console.log(`⏭️  No mapping for ${relativePath}`);
        continue;
      }
      
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      // Fix image: lines
      const lines = content.split('\n');
      const newLines = lines.map((line, idx) => {
        // For accompagnements: fix "image: /old/path"
        if (line.match(/^\s*image:\s*/)) {
          modified = true;
          const indent = line.match(/^\s*/)[0];
          return `${indent}image: ${newImagePath}`;
        }
        // For articles: fix "image: /old/path" within featuredPhoto block
        if (line.match(/^\s{2}image:\s*/) && idx > 0 && lines[idx - 1].includes('featuredPhoto')) {
          modified = true;
          const indent = line.match(/^\s*/)[0];
          return `${indent}image: ${newImagePath}`;
        }
        return line;
      });
      
      if (modified) {
        fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
        fixedCount++;
        console.log(`✅ Fixed: ${relativePath}`);
      }
    }
  }
}

fixDir(accompDir);
fixDir('src/content/articles');

console.log(`\n✅ Fixed ${fixedCount} files with correct image paths`);
