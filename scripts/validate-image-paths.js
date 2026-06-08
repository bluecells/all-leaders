import fs from 'fs';
import path from 'path';

function findFilesRecursive(dir, pattern) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFilesRecursive(fullPath, pattern));
    } else if (pattern.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function validateImagePaths() {
  console.log('🔍 Validation des chemins d\'images...\n');

  let errors = 0;
  const missingImages = [];

  // Valider les articles
  console.log('📝 Articles...');
  const articles = findFilesRecursive('src/content/articles', /\.mdoc$/);
  for (const article of articles) {
    const content = fs.readFileSync(article, 'utf-8');

    // Extraire les chemins d'images
    const imageRegex = /(?:image|ogImage|featuredPhoto):\s*(\/images\/[^\s\n"']+)/g;
    let match;

    while ((match = imageRegex.exec(content)) !== null) {
      const imagePath = match[1];
      const fullPath = path.join('public', imagePath);

      if (!fs.existsSync(fullPath)) {
        console.error(`  ❌ ${article}`);
        console.error(`     Image manquante: ${imagePath}`);
        missingImages.push({ file: article, path: imagePath });
        errors++;
      }
    }
  }

  // Valider les accompagnements
  console.log('🎯 Accompagnements...');
  const accompagnements = findFilesRecursive('src/content/accompagnements', /\.mdoc$/);
  for (const accomp of accompagnements) {
    const content = fs.readFileSync(accomp, 'utf-8');
    const imageMatch = content.match(/^image:\s*(\/images\/[^\s\n"']+)/m);

    if (imageMatch) {
      const imagePath = imageMatch[1];
      const fullPath = path.join('public', imagePath);

      if (!fs.existsSync(fullPath)) {
        console.error(`  ❌ ${accomp}`);
        console.error(`     Image manquante: ${imagePath}`);
        missingImages.push({ file: accomp, path: imagePath });
        errors++;
      }
    }
  }

  // Valider les FAQ
  console.log('❓ FAQ...');
  const faqs = findFilesRecursive('src/content/faq', /\.mdoc$/);
  for (const faq of faqs) {
    const content = fs.readFileSync(faq, 'utf-8');
    const imageRegex = /!\[.*?\]\((\/images\/[^\s)]+)\)/g;
    let match;

    while ((match = imageRegex.exec(content)) !== null) {
      const imagePath = match[1];
      const fullPath = path.join('public', imagePath);

      if (!fs.existsSync(fullPath)) {
        console.error(`  ❌ ${faq}`);
        console.error(`     Image manquante: ${imagePath}`);
        missingImages.push({ file: faq, path: imagePath });
        errors++;
      }
    }
  }

  console.log('\n📊 Résumé:');
  console.log(`   Articles: ${articles.length} fichiers`);
  console.log(`   Accompagnements: ${accompagnements.length} fichiers`);
  console.log(`   FAQ: ${faqs.length} fichiers`);

  if (errors === 0) {
    console.log('\n✅ Tous les chemins d\'images sont valides!');
    return true;
  } else {
    console.error(`\n❌ ${errors} erreur(s) détectée(s)`);
    if (missingImages.length > 0) {
      console.error('\n📋 Images manquantes:');
      for (const item of missingImages) {
        console.error(`   - ${item.path}`);
      }
    }
    process.exit(1);
  }
}

validateImagePaths();
