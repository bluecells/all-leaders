import fs from 'fs';
import path from 'path';
import { readdirSync } from 'fs';

const componentsDir = 'src/content-components';
const replacements = [
  { old: "directory: 'public/images/content'", new: "directory: 'public/images/content'" },
  { old: "directory: 'public/images/content/'", new: "directory: 'public/images/content/'" },
  { old: "publicPath: '/images/content'", new: "publicPath: '/images/content/'" },
];

function updateComponentFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let newContent = content;

  // All components that use images should point to /images/content/
  // This is for components used across all collections
  if (content.includes('directory:') || content.includes('publicPath:')) {
    // Replace old public/images/ paths with content
    newContent = newContent.replace(/directory:\s*['"]public\/images\/[^'"]*['"]/g, "directory: 'public/images/content'");
    newContent = newContent.replace(/publicPath:\s*['"]\/images\/[^'"]*['"]/g, "publicPath: '/images/content/'");

    if (newContent !== content) {
      modified = true;
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`✓ ${path.basename(filePath)}`);
      return true;
    }
  }

  return false;
}

function main() {
  console.log('🎨 Mise à jour des composants content-components...\n');

  const files = readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
  let updateCount = 0;

  for (const file of files) {
    const filePath = path.join(componentsDir, file);
    if (updateComponentFile(filePath)) {
      updateCount++;
    }
  }

  console.log(`\n✅ ${updateCount}/${files.length} composants mis à jour`);
  console.log('   Tous les composants pointent maintenant vers /images/content/');
}

main();
