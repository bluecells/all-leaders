import fs from 'fs';
import path from 'path';

const mapping = [];

// Find all image.* files in services
const servicesDir = 'public/images/accompagnements';

function walkServices(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file === 'en' || file === 'fr') {
        // Found language directory
        const lang = file;
        const entries = fs.readdirSync(filePath);

        for (const slug of entries) {
          const slugPath = path.join(filePath, slug);
          if (fs.statSync(slugPath).isDirectory()) {
            // Found slug directory
            const imageFiles = fs.readdirSync(slugPath).filter((f) => f.startsWith('image.'));

            if (imageFiles.length > 0) {
              const imageName = imageFiles[0];
              const ext = path.extname(imageName);
              const newImagePath = `/images/accompagnements/${lang}/${slug}/image${ext}`;

              mapping.push({
                collection: 'services',
                lang,
                slug,
                newImagePath,
                imageFile: imageName,
              });
            }
          }
        }
      } else {
        walkServices(filePath);
      }
    }
  }
}

walkServices(servicesDir);

// Find all image.* files in articles
const articlesDir = 'public/images/articles';

function walkArticles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file === 'en' || file === 'fr') {
        // Found language directory
        const lang = file;
        const entries = fs.readdirSync(filePath);

        for (const slug of entries) {
          const slugPath = path.join(filePath, slug);
          if (fs.statSync(slugPath).isDirectory()) {
            // Found slug directory
            const imageFiles = fs.readdirSync(slugPath).filter((f) => f.startsWith('image.'));

            if (imageFiles.length > 0) {
              const imageName = imageFiles[0];
              const ext = path.extname(imageName);
              const newImagePath = `/images/articles/${lang}/${slug}/image${ext}`;

              mapping.push({
                collection: 'articles',
                lang,
                slug,
                newImagePath,
                imageFile: imageName,
              });
            }
          }
        }
      } else {
        walkArticles(filePath);
      }
    }
  }
}

walkArticles(articlesDir);

console.log(`Found ${mapping.length} actual images on disk:`);
console.log(`  - Services: ${mapping.filter((m) => m.collection === 'services').length}`);
console.log(`  - Articles: ${mapping.filter((m) => m.collection === 'articles').length}`);

fs.writeFileSync('disk-image-mapping.json', JSON.stringify(mapping, null, 2), 'utf8');
console.log(`\nSaved to disk-image-mapping.json`);
