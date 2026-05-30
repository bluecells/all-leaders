#!/usr/bin/env node

/**
 * Script de migration: YAML → MDOC pour accompagnements
 *
 * Convertit les fichiers .yaml en .mdoc avec:
 * - Extraction du long_description vers le body
 * - Conversion HTML → composants Markdoc
 * - Préservation de tous les autres champs frontmatter
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// Fonction pour convertir HTML en composants Markdoc
function convertHtmlToMarkdoc(html) {
  if (!html) return '';

  let content = html;

  // Convertir les divs avec style inline en composants Banner
  // Pattern: <div style="background: #color; ..." class="...">CONTENT</div>
  content = content.replace(
    /<div\s+style="[^"]*background[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    (match, innerContent) => {
      // Détecter le type de banner basé sur la couleur
      let type = 'info';
      if (match.includes('#e8f5e9') || match.includes('green')) type = 'success';
      if (match.includes('#fff3e0') || match.includes('orange')) type = 'warning';
      if (match.includes('#ffebee') || match.includes('red')) type = 'error';

      // Nettoyer le contenu interne
      const cleanContent = innerContent
        .replace(/<[^>]+>/g, '') // Supprimer les tags HTML internes
        .trim();

      return `{% Banner type="${type}" %}\n${cleanContent}\n{% /Banner %}`;
    }
  );

  // Supprimer les divs génériques restantes
  content = content.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, '$1');

  // Nettoyer les balises HTML simples
  content = content.replace(/<br\s*\/?>/gi, '\n');
  content = content.replace(/<p>([\s\S]*?)<\/p>/gi, '$1\n\n');

  return content.trim();
}

// Fonction pour migrer un fichier
function migrateFile(filePath) {
  console.log(`\nMigration: ${path.basename(filePath)}`);

  try {
    // Lire le fichier YAML
    const yamlContent = fs.readFileSync(filePath, 'utf8');
    const data = yaml.parse(yamlContent);

    // Extraire long_description
    const longDescription = data.long_description || '';
    delete data.long_description;

    // Convertir HTML en Markdoc
    const markdocContent = convertHtmlToMarkdoc(longDescription);

    // Créer le nouveau fichier MDOC
    const mdocPath = filePath.replace('.yaml', '.mdoc');
    const frontmatter = yaml.stringify(data);
    const mdocContent = `---\n${frontmatter}---\n\n${markdocContent}\n`;

    // Écrire le fichier MDOC
    fs.writeFileSync(mdocPath, mdocContent, 'utf8');
    console.log(`✅ Créé: ${path.basename(mdocPath)}`);

    // Supprimer l'ancien YAML
    fs.unlinkSync(filePath);
    console.log(`🗑️  Supprimé: ${path.basename(filePath)}`);

    return true;
  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
    return false;
  }
}

// Fonction principale
function main() {
  const accompagnementsDir = path.join(__dirname, 'src/content/accompagnements');

  // Créer backup
  console.log('📦 Création du backup...');
  const backupDir = path.join(__dirname, 'backup-accompagnements-yaml');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Trouver tous les fichiers YAML
  const frDir = path.join(accompagnementsDir, 'fr');
  const enDir = path.join(accompagnementsDir, 'en');

  const frFiles = fs.readdirSync(frDir)
    .filter(f => f.endsWith('.yaml'))
    .map(f => path.join(frDir, f));

  const enFiles = fs.readdirSync(enDir)
    .filter(f => f.endsWith('.yaml'))
    .map(f => path.join(enDir, f));

  const allFiles = [...frFiles, ...enFiles];

  console.log(`📄 ${allFiles.length} fichiers YAML trouvés`);

  // Backup
  allFiles.forEach(file => {
    const backupPath = path.join(backupDir, path.relative(accompagnementsDir, file));
    const backupFileDir = path.dirname(backupPath);
    if (!fs.existsSync(backupFileDir)) {
      fs.mkdirSync(backupFileDir, { recursive: true });
    }
    fs.copyFileSync(file, backupPath);
  });
  console.log(`✅ Backup créé dans: ${backupDir}`);

  // Migrer tous les fichiers
  console.log('\n🚀 Début de la migration...\n');
  let success = 0;
  let failed = 0;

  allFiles.forEach(file => {
    if (migrateFile(file)) {
      success++;
    } else {
      failed++;
    }
  });

  // Résumé
  console.log('\n' + '='.repeat(50));
  console.log('📊 RÉSUMÉ DE LA MIGRATION');
  console.log('='.repeat(50));
  console.log(`✅ Succès: ${success} fichiers`);
  console.log(`❌ Échecs: ${failed} fichiers`);
  console.log(`📦 Backup: ${backupDir}`);
  console.log('='.repeat(50) + '\n');
}

// Exécuter
main();
