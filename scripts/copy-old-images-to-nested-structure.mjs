import fs from 'fs';
import path from 'path';

// Extract YAML to get lang and seoSlug
function getArticleInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yamlContent = match[1];
  let lang = null;
  let seoSlug = null;

  const lines = yamlContent.split('\n');
  for (const line of lines) {
    const langMatch = line.match(/^lang:\s*(fr|en)/);
    if (langMatch) {
      lang = langMatch[1];
    }

    const slugMatch = line.match(/^\s*seoSlug:\s*(.+)$/);
    if (slugMatch) {
      seoSlug = slugMatch[1].trim();
    }
  }

  return { lang, seoSlug };
}

// Find all article .mdoc files
let copiedCount = 0;

function processArticles() {
  const articlesDir = 'src/content/articles';
  const files = fs.readdirSync(articlesDir);

  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // FR or EN directory
      const lang = file; // fr or en
      const entries = fs.readdirSync(filePath);

      for (const mdocFile of entries) {
        if (!mdocFile.endsWith('.mdoc')) continue;

        const mdocPath = path.join(filePath, mdocFile);
        const info = getArticleInfo(mdocPath);

        if (!info || !info.lang || !info.seoSlug) {
          console.log(`⏭️  Could not extract info from ${mdocPath}`);
          continue;
        }

        // Create target directory
        const targetDir = `public/images/articles/${info.lang}/${info.seoSlug}`;
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        // Check if images already exist there
        const existingImages = fs.readdirSync(targetDir).filter(f => f.startsWith('image.'));
        if (existingImages.length > 0) {
          // Already has an image
          continue;
        }

        // Look for any matching image in old flat directory
        // Try different image patterns
        const oldImagesDir = 'public/images/articles';
        const oldImages = fs.readdirSync(oldImagesDir).filter(f => {
          if (f.startsWith('.') || fs.statSync(path.join(oldImagesDir, f)).isDirectory()) {
            return false;
          }
          return true;
        });

        // Find potential match (just take first available for now - user can fix manually if wrong)
        // Better approach: use filename without extension as hint
        const mdocBase = path.basename(mdocFile, '.mdoc');
        const slugBase = info.seoSlug;

        let foundImage = null;
        for (const oldImage of oldImages) {
          const oldBase = path.basename(oldImage, path.extname(oldImage)).toLowerCase();

          // Check if oldBase contains parts of slugBase or mdocBase
          if (oldBase.includes(mdocBase) || oldBase.includes(slugBase)) {
            foundImage = oldImage;
            break;
          }
        }

        if (!foundImage) {
          // Fallback: just check if ANY image isn't used yet
          // For now, skip if no obvious match
          console.log(`⏭️  No matching image for ${info.lang}/${info.seoSlug} (${mdocFile})`);
          continue;
        }

        // Copy the image with generic name
        const sourceImagePath = path.join(oldImagesDir, foundImage);
        const ext = path.extname(foundImage);
        const targetImagePath = path.join(targetDir, `image${ext}`);

        fs.copyFileSync(sourceImagePath, targetImagePath);
        copiedCount++;
        console.log(`✅ Copied: ${foundImage} → ${info.lang}/${info.seoSlug}/image${ext}`);
      }
    }
  }
}

processArticles();

console.log(`\n✅ Copied ${copiedCount} images`);
