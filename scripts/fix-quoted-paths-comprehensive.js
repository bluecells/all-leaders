const fs = require('fs');
const path = require('path');

// Read the mapping
const mappingPath = 'migration-lang-mapping.json';
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Create a map from mdocPath to correct newImagePath
const pathMap = {};
mapping.forEach(item => {
  pathMap[item.mdocPath] = item.newImagePath;
});

// Find all .mdoc files in articles
const articlesDir = 'src/content/articles';
let fixedCount = 0;
let errorCount = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.mdoc')) {
      const relativePath = path.relative('.', filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Find the mapping for this file
      const normalizedPath = relativePath.replace(/\\/g, '/');
      const mappingEntry = mapping.find(m => m.mdocPath.replace(/\\/g, '/') === normalizedPath);
      
      if (!mappingEntry) {
        console.log(`⚠️  No mapping found for ${relativePath}`);
        return;
      }
      
      // Check if file has quoted paths
      if (content.includes(`'`) && content.includes(`image:`)) {
        // Replace any image: line that has quotes
        const lines = content.split('\n');
        let modified = false;
        
        const newLines = lines.map((line, idx) => {
          // Match lines with "image:" that have quotes
          if (line.includes('image:') && line.includes(`'`)) {
            // Don't touch lines like "image: 'something'" that are not paths
            if (line.match(/image:\s*\/.*'/)) {
              modified = true;
              return `  image: ${mappingEntry.newImagePath}`;
            }
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
  });
}

walkDir(articlesDir);

console.log(`\n✅ Fixed ${fixedCount} files with quoted paths`);
