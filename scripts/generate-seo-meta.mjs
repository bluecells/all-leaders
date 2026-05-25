#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const dryRun = process.argv.includes('--dry-run');

// SEO Configuration
const SEO_CONFIG = {
  metaTitle: { min: 40, max: 60 },
  metaDescription: { min: 122, max: 155 },
  keywords: {
    fr: ['coaching', 'formation', 'leadership', 'management', 'équipe', 'performance', 'entreprise', 'développement', 'accompagnement'],
    en: ['coaching', 'training', 'leadership', 'management', 'team', 'performance', 'business', 'development', 'support']
  },
  cta: {
    fr: ['Découvrez', 'Formez', 'Développez', 'Améliorez', 'Optimisez', 'Renforcez', 'Explorez'],
    en: ['Discover', 'Train', 'Develop', 'Improve', 'Optimize', 'Strengthen', 'Explore']
  }
};

// Utility Functions
async function getFiles(dir, extension) {
  const files = [];
  async function walk(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }
  await walk(dir);
  return files;
}

function respectFrenchTypography(text) {
  if (!text) return text;
  // Espace insécable avant : ; ! ?
  text = text.replace(/ ([:\?!;])/g, '\u00A0$1');
  // Guillemets français « »
  text = text.replace(/"([^"]+)"/g, '« $1 »');
  // Espace insécable dans nombres
  text = text.replace(/(\d) (\d{3})/g, '$1\u00A0$2');
  return text;
}

function truncateToWordBoundary(text, maxLength) {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.7) {
    return truncated.slice(0, lastSpace).trim();
  }
  return truncated.slice(0, maxLength - 3).trim();
}

function validateCharacterLimits(meta, type) {
  const issues = [];
  const titleLen = meta.metaTitle?.length || 0;
  const descLen = meta.metaDescription?.length || 0;

  if (titleLen < SEO_CONFIG.metaTitle.min || titleLen > SEO_CONFIG.metaTitle.max) {
    issues.push(`Title length ${titleLen} not in range ${SEO_CONFIG.metaTitle.min}-${SEO_CONFIG.metaTitle.max}`);
  }
  if (descLen < SEO_CONFIG.metaDescription.min || descLen > SEO_CONFIG.metaDescription.max) {
    issues.push(`Description length ${descLen} not in range ${SEO_CONFIG.metaDescription.min}-${SEO_CONFIG.metaDescription.max}`);
  }
  return issues;
}

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '') // Remove markdown bold
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ') // Replace newlines with space
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

function extractFirstSentences(text, count = 2) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, count).join('').trim();
}

// Accompagnement Meta Generation
function generateAccompagnementMeta(data, lang) {
  const title = data.title || '';
  const description = data.description || '';
  const longDescription = cleanText(data.long_description || '');
  const usp1 = data.USP1 || '';
  const categorie = data.categorie || '';

  // Generate MetaTitle
  let metaTitle = title;

  // Remove filler words for French
  if (lang === 'fr') {
    metaTitle = metaTitle
      .replace(/\s+(sur\s+mesure|et sur étagère|et|\sou\s+)/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  } else {
    metaTitle = metaTitle
      .replace(/\s+(and|or|bespoke|off-the-shelf)/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Ensure reasonable length
  if (metaTitle.length > 60) {
    metaTitle = truncateToWordBoundary(metaTitle, 60);
  }
  if (metaTitle.length < 40 && description) {
    metaTitle = metaTitle + ' ' + (lang === 'fr' ? 'pour' : 'for') + ' managers';
  }

  // Apply French typography
  if (lang === 'fr') {
    metaTitle = respectFrenchTypography(metaTitle);
  }

  // Generate MetaDescription
  let metaDescription = description;

  // Expand if too short
  if (metaDescription.length < 122) {
    const firstSentences = extractFirstSentences(longDescription, 1);
    if (firstSentences && firstSentences.length > 0) {
      metaDescription += '. ' + firstSentences;
    } else if (usp1) {
      metaDescription += '. ' + usp1;
    }
  }

  // Add CTA and benefits
  const ctaList = SEO_CONFIG.cta[lang] || SEO_CONFIG.cta.fr;
  const cta = ctaList[Math.floor(Math.random() * ctaList.length)];

  if (metaDescription.length < 122) {
    metaDescription += `. ${cta} comment ${lang === 'fr' ? 'améliorer' : 'improve'} la performance.`;
  } else if (!metaDescription.includes(cta) && !metaDescription.includes('ROI')) {
    // Try to add benefit hint if space permits
    if (metaDescription.length < 140) {
      metaDescription = metaDescription.replace(/\.$/, '') + '. ROI mesurable.';
    }
  }

  // Truncate intelligently if too long
  if (metaDescription.length > 155) {
    metaDescription = truncateToWordBoundary(metaDescription, 155);
    if (!metaDescription.endsWith('.')) {
      metaDescription += '.';
    }
  }

  // Apply French typography
  if (lang === 'fr') {
    metaDescription = respectFrenchTypography(metaDescription);
  }

  return {
    metaTitle: metaTitle.trim(),
    metaDescription: metaDescription.trim()
  };
}

// FAQ Meta Generation
function generateFaqMeta(question, answer, lang) {
  // Generate MetaTitle
  let metaTitle = question
    .replace(/^(Quelle est |Qu'est-ce |Comment |Pourquoi |Peut-on |Pouvez-vous |What is |How |Why |Can you |Do you )/i, '')
    .replace(/\?$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Expand short titles with context prefixes
  if (metaTitle.length < 40) {
    if (lang === 'fr') {
      if (question.toLowerCase().startsWith('comment')) {
        metaTitle = 'Comment ' + metaTitle;
      } else if (question.toLowerCase().startsWith('pourquoi')) {
        metaTitle = 'Pourquoi ' + metaTitle;
      } else {
        metaTitle = 'Guide : ' + metaTitle;
      }
    } else {
      if (question.toLowerCase().startsWith('how')) {
        metaTitle = 'How to ' + metaTitle;
      } else if (question.toLowerCase().startsWith('why')) {
        metaTitle = 'Why ' + metaTitle;
      } else {
        metaTitle = 'Guide : ' + metaTitle;
      }
    }
  }

  if (metaTitle.length > 60) {
    metaTitle = truncateToWordBoundary(metaTitle, 60);
  }

  // Apply French typography
  if (lang === 'fr') {
    metaTitle = respectFrenchTypography(metaTitle);
  }

  // Generate MetaDescription
  let metaDescription = extractFirstSentences(answer, 2);
  metaDescription = cleanText(metaDescription);

  // Add CTA if space permits
  const ctaList = SEO_CONFIG.cta[lang] || SEO_CONFIG.cta.fr;
  const cta = ctaList[Math.floor(Math.random() * ctaList.length)];

  if (metaDescription.length < 122) {
    metaDescription += `. ${cta} comment.`;
  } else if (metaDescription.length < 150 && !metaDescription.includes(cta)) {
    metaDescription = metaDescription.replace(/\.$/, '') + `. ${cta}.`;
  }

  // Truncate if too long
  if (metaDescription.length > 155) {
    metaDescription = truncateToWordBoundary(metaDescription, 155);
    if (!metaDescription.endsWith('.')) {
      metaDescription += '.';
    }
  }

  // Apply French typography
  if (lang === 'fr') {
    metaDescription = respectFrenchTypography(metaDescription);
  }

  return {
    metaTitle: metaTitle.trim(),
    metaDescription: metaDescription.trim()
  };
}

// File Processing Functions
async function processAccompagnementFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const data = YAML.parse(content);

    // Skip if already has meta
    if (data.metaTitle || data.metaDescription) {
      return { skipped: true };
    }

    const lang = data.lang || 'fr';
    const meta = generateAccompagnementMeta(data, lang);
    const issues = validateCharacterLimits(meta, 'accompagnement');

    const updatedData = { ...data, ...meta };
    const yamlString = YAML.stringify(updatedData, {
      lineWidth: 0,
      defaultStringType: 'QUOTE_DOUBLE',
      defaultKeyType: 'PLAIN'
    });

    if (!dryRun) {
      await fs.writeFile(filePath, yamlString, 'utf-8');
    }

    return {
      success: true,
      file: path.basename(filePath),
      meta,
      issues,
      lang
    };
  } catch (error) {
    return {
      success: false,
      file: path.basename(filePath),
      error: error.message
    };
  }
}

async function processFaqFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Parse MDOC frontmatter
    const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (!match) {
      return {
        success: false,
        file: path.basename(filePath),
        error: 'Invalid MDOC format'
      };
    }

    const [, frontmatterRaw, body] = match;
    const frontmatter = YAML.parse(frontmatterRaw);

    // Skip if already has meta
    if (frontmatter.metaTitle || frontmatter.metaDescription) {
      return { skipped: true };
    }

    const lang = frontmatter.lang || 'fr';
    const meta = generateFaqMeta(frontmatter.question || '', body || '', lang);
    const issues = validateCharacterLimits(meta, 'faq');

    const updatedFrontmatter = {
      ...frontmatter,
      ...meta
    };

    if (!dryRun) {
      const newFrontmatterYAML = YAML.stringify(updatedFrontmatter);
      const newContent = `---\n${newFrontmatterYAML}---\n${body}`;
      await fs.writeFile(filePath, newContent, 'utf-8');
    }

    return {
      success: true,
      file: path.basename(filePath),
      meta,
      issues,
      lang
    };
  } catch (error) {
    return {
      success: false,
      file: path.basename(filePath),
      error: error.message
    };
  }
}

// Main Processing
async function main() {
  console.log(dryRun ? '🔍 DRY RUN MODE - No files will be modified\n' : '🚀 Generating SEO metadata...\n');

  // Process Accompagnements
  console.log('📋 Processing Accompagnements...');
  const accompDir = path.join(PROJECT_ROOT, 'src/content/accompagnements');
  const accompFiles = await getFiles(accompDir, '.yaml');

  const accompResults = [];
  for (const filePath of accompFiles) {
    const result = await processAccompagnementFile(filePath);
    if (result.success) accompResults.push(result);
    if (result.success && !result.skipped) {
      console.log(`  ✓ ${result.file} (${result.lang})`);
      if (result.issues.length > 0) {
        console.log(`    ⚠️  ${result.issues.join(', ')}`);
      }
    }
  }

  // Process FAQ
  console.log('\n📋 Processing FAQ...');
  const faqDir = path.join(PROJECT_ROOT, 'src/content/faq');
  const faqFiles = await getFiles(faqDir, '.mdoc');

  const faqResults = [];
  for (const filePath of faqFiles) {
    const result = await processFaqFile(filePath);
    if (result.success) faqResults.push(result);
    if (result.success && !result.skipped) {
      console.log(`  ✓ ${result.file} (${result.lang})`);
      if (result.issues.length > 0) {
        console.log(`    ⚠️  ${result.issues.join(', ')}`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`Accompagnements processed: ${accompResults.length}/${accompFiles.length}`);
  console.log(`FAQ processed: ${faqResults.length}/${faqFiles.length}`);
  console.log(`Total files updated: ${accompResults.length + faqResults.length}`);

  const totalIssues = [...accompResults, ...faqResults].reduce((acc, r) => acc + (r.issues?.length || 0), 0);
  if (totalIssues > 0) {
    console.log(`⚠️  Total validation issues: ${totalIssues}`);
  }

  if (dryRun) {
    console.log('\n✅ Dry run completed. No files were modified.');
    console.log('Run without --dry-run flag to apply changes.');
  } else {
    console.log('\n✅ Generation completed successfully!');
  }
  console.log('='.repeat(50));
}

main().catch(console.error);
