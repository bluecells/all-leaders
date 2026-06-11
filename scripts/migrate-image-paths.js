import fs from 'fs';
import path from 'path';
import { readdirSync, lstatSync } from 'fs';

// Mapping des anciens chemins vers nouveaux
const pathMappings = {
  '/images/content/': '/images/articles/',
  '/images/accompagnements/': '/images/accompagnements/',
};

function getAllMdocFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (lstatSync(filePath).isDirectory()) {
      getAllMdocFiles(filePath, fileList);
    } else if (file.endsWith('.mdoc')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Remplacer les chemins dans le frontmatter et contenu
  for (const [oldPath, newPath] of Object.entries(pathMappings)) {
    if (content.includes(oldPath)) {
      content = content.replaceAll(oldPath, newPath);
      modified = true;
    }
  }

  // Cas spécial: corriger les chemins relatifs (supervision-collective.mdoc)
  const relativeImageRegex = /^image:\s*([a-zA-Z0-9-_]+\.(jpg|jpeg|png|webp|svg))$/gm;
  content = content.replace(relativeImageRegex, (match, filename) => {
    console.log(`  ⚠️  Correction chemin relatif: ${filename}`);
    modified = true;
    // Déterminer le bon préfixe selon le dossier
    if (filePath.includes('accompagnements')) {
      return `image: /images/accompagnements/${filename}`;
    } else if (filePath.includes('articles')) {
      return `image: /images/articles/${filename}`;
    }
    return match;
  });

  // Corriger les espaces parasites dans les images markdown
  content = content.replace(/!\[\]\(\s+\/images/g, '![](/images');

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Migré: ${filePath}`);
    return true;
  }

  return false;
}

function main() {
  console.log("🚀 Migration des chemins d'images...\n");

  // Migrer les articles
  console.log('📝 Articles...');
  const articles = getAllMdocFiles('src/content/articles');
  let articlesCount = 0;
  for (const article of articles) {
    if (migrateFile(article)) articlesCount++;
  }
  console.log(`   → ${articlesCount}/${articles.length} fichiers modifiés\n`);

  // Migrer les accompagnements
  console.log('🎯 Accompagnements...');
  const accompagnements = getAllMdocFiles('src/content/accompagnements');
  let accompagnementsCount = 0;
  for (const accomp of accompagnements) {
    if (migrateFile(accomp)) accompagnementsCount++;
  }
  console.log(`   → ${accompagnementsCount}/${accompagnements.length} fichiers modifiés\n`);

  // Migrer les FAQ si nécessaire
  console.log('❓ FAQ...');
  const faqs = getAllMdocFiles('src/content/faq');
  let faqsCount = 0;
  for (const faq of faqs) {
    if (migrateFile(faq)) faqsCount++;
  }
  console.log(`   → ${faqsCount}/${faqs.length} fichiers modifiés\n`);

  console.log('✅ Migration terminée!');
  console.log(`   Total: ${articlesCount + accompagnementsCount + faqsCount} fichiers mis à jour`);
}

main();
