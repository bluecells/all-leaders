#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTICLES_DIR = path.join(__dirname, '../src/content/articles');
const PROBLEMES_FILE = path.join(__dirname, '../problemes.txt');

let problemes = [];

/**
 * Extract videoId from various YouTube URL formats
 */
function extractYouTubeId(url) {
  // youtube.com/watch?v=ID
  let match = url.match(/youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/);
  if (match) return match[1];

  // youtu.be/ID
  match = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (match) return match[1];

  // youtube.com/embed/ID
  match = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
  if (match) return match[1];

  return null;
}

/**
 * Convert content to properly formatted Markdown
 */
function formatMarkdown(content) {
  let lines = content.split('\n');
  let formatted = [];
  let inCodeBlock = false;
  let inList = false;
  let inBlockquote = false;
  let previousWasEmpty = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let nextLine = i + 1 < lines.length ? lines[i + 1] : '';

    // Preserve code blocks
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      formatted.push(line);
      previousWasEmpty = false;
      continue;
    }

    if (inCodeBlock) {
      formatted.push(line);
      previousWasEmpty = false;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      if (!previousWasEmpty) {
        formatted.push('');
        previousWasEmpty = true;
      }
      continue;
    }

    previousWasEmpty = false;

    // Titles
    if (line.match(/^#+\s/)) {
      // Add empty line before title (if previous line wasn't empty)
      if (formatted.length > 0 && formatted[formatted.length - 1].trim() !== '') {
        formatted.push('');
      }
      formatted.push(line.trim());
      // Next line will ensure empty line after
      continue;
    }

    // Lists and blockquotes
    if (line.match(/^\s*[-*]\s/) || line.match(/^\s*>\s/)) {
      formatted.push(line.trim());
      inList = true;
      continue;
    }

    // Regular paragraph
    if (inList && !line.match(/^\s*[-*]\s/) && !line.match(/^\s*>\s/)) {
      inList = false;
      if (formatted[formatted.length - 1].trim() !== '') {
        formatted.push('');
      }
    }

    // HTML elements
    if (line.match(/^</) || line.match(/\{%/)) {
      if (formatted.length > 0 && formatted[formatted.length - 1].trim() !== '') {
        formatted.push('');
      }
      formatted.push(line);
      continue;
    }

    formatted.push(line.trim());
  }

  // Remove trailing empty lines
  while (formatted.length > 0 && formatted[formatted.length - 1].trim() === '') {
    formatted.pop();
  }

  return formatted.join('\n');
}

/**
 * Convert YouTube iframes and URLs to component
 */
function convertYouTubeToComponent(content) {
  let converted = content;

  // Convert iframes
  const iframeRegex = /<iframe[^>]*src=["']([^"']*youtube[^"']*)[^>]*><\/iframe>/gi;
  converted = converted.replace(iframeRegex, (match, src) => {
    const videoId = extractYouTubeId(src);
    if (videoId) {
      return `{% YouTube videoId="${videoId}" /%}`;
    }
    problemes.push(`❌ iframe YouTube non convertible: ${src}`);
    return match;
  });

  return converted;
}

/**
 * Convert PDF components and tags
 */
function convertPDFToComponent(content) {
  let converted = content;

  // Convert {% Pdf %} to {% PdfViewer %} (handle both open and self-closing tags)
  converted = converted.replace(/\{%\s*Pdf\s+([^%]*?)\s*\/?\s*%\}/gi, (match, attrs) => {
    return `{% PdfViewer ${attrs.trim()} /%}`;
  });

  // Convert PDF iframes
  const pdfIframeRegex = /<iframe[^>]*src=["']([^"']*\.pdf[^"']*)[^>]*><\/iframe>/gi;
  converted = converted.replace(pdfIframeRegex, (match, src) => {
    // Extract just the path
    const urlMatch = src.match(/^[^?#]+/);
    const url = urlMatch ? urlMatch[0] : src;
    return `{% PdfViewer url="${url}" height="800px" /%}`;
  });

  // Convert embed tags
  const embedRegex = /<embed[^>]*src=["']([^"']*\.pdf[^"']*)[^>]*\/>/gi;
  converted = converted.replace(embedRegex, (match, src) => {
    const urlMatch = src.match(/^[^?#]+/);
    const url = urlMatch ? urlMatch[0] : src;
    return `{% PdfViewer url="${url}" height="800px" /%}`;
  });

  return converted;
}

/**
 * Process a single article file
 */
function processArticle(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Split frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
      problemes.push(`⚠️  ${path.relative(ARTICLES_DIR, filePath)}: Frontmatter non trouvé`);
      return;
    }

    const frontmatter = frontmatterMatch[1];
    let body = frontmatterMatch[2];

    // Convert media
    body = convertYouTubeToComponent(body);
    body = convertPDFToComponent(body);

    // Format markdown
    body = formatMarkdown(body);

    // Reconstruct file
    const reformatted = `---\n${frontmatter}\n---\n\n${body}\n`;

    // Write back
    fs.writeFileSync(filePath, reformatted, 'utf-8');
    console.log(`✅ ${path.relative(ARTICLES_DIR, filePath)}`);
  } catch (err) {
    problemes.push(`❌ ${path.relative(ARTICLES_DIR, filePath)}: ${err.message}`);
    console.error(`❌ ${path.relative(ARTICLES_DIR, filePath)}:`, err.message);
  }
}

/**
 * Process all articles in a language directory
 */
function processLanguage(lang) {
  const langDir = path.join(ARTICLES_DIR, lang);
  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.mdoc'));

  console.log(`\n📝 Traitement ${files.length} articles ${lang}...`);
  files.forEach(file => {
    processArticle(path.join(langDir, file));
  });
}

/**
 * Main function
 */
function main() {
  console.log('🔧 Reformatage des articles .mdoc');
  console.log('=====================================\n');

  // Get language argument or process all
  const args = process.argv.slice(2);
  const languages = args.length > 0 ? args : ['fr', 'en'];

  languages.forEach(lang => {
    const langDir = path.join(ARTICLES_DIR, lang);
    if (fs.existsSync(langDir)) {
      processLanguage(lang);
    }
  });

  // Write problems file
  if (problemes.length > 0) {
    const problemContent = `# Problèmes de Reformatage des Articles

Généré: ${new Date().toLocaleString('fr-FR')}

## Résumé
- Total problèmes: ${problemes.length}

## Détails

${problemes.map((p, i) => `${i + 1}. ${p}`).join('\n')}
`;
    fs.writeFileSync(PROBLEMES_FILE, problemContent, 'utf-8');
    console.log(`\n⚠️  ${problemes.length} problème(s) détecté(s)`);
    console.log(`📋 Voir: problemes.txt`);
  } else {
    fs.writeFileSync(PROBLEMES_FILE, '# Aucun problème détecté\n', 'utf-8');
    console.log('\n✨ Tous les articles reformatés sans problème!');
  }
}

main();
