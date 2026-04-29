/**
 * Traductions i18n des segments d'URL
 */
export const i18nRoutes = {
  it: { services: 'servizi', article: 'articoli', faq: 'faq' },
  fr: { services: 'services', article: 'ressources', faq: 'faq' },
  en: { services: 'services', article: 'resources', faq: 'faq' }
} as const;

/**
 * Convertit une chaîne en slug URL-friendly
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // Normalise les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/[^\w\-]+/g, '') // Supprime les caractères non-alphanumériques
    .replace(/\-\-+/g, '-') // Remplace les tirets multiples par un seul
    .replace(/^-+/, '') // Supprime les tirets en début
    .replace(/-+$/, ''); // Supprime les tirets en fin
}

/**
 * Génère le slug SEO final pour une entrée
 */
export function generateSeoSlug(entry: {
  seoSlug?: string;
  slug?: string;
  name?: string;
  title?: string;
  nameDisplay?: string;
  category?: string;
}): string {
  // Si un seoSlug personnalisé existe et n'est pas vide, on l'utilise
  if (entry.seoSlug && entry.seoSlug.trim() !== '') {
    // Pour les articles, ajouter la catégorie en préfixe si elle n'est pas déjà présente
    if (entry.category && !entry.seoSlug.startsWith(entry.category + '/')) {
      return `${entry.category}/${entry.seoSlug}`;
    }
    return entry.seoSlug;
  }

  // Sinon, générer automatiquement depuis le titre/nom
  const sourceText = entry.nameDisplay || entry.title || entry.slug || entry.name || '';
  const slug = slugify(sourceText);

  // Pour les articles, ajouter la catégorie en préfixe
  if (entry.category) {
    return `${entry.category}/${slug}`;
  }

  return slug;
}

/**
 * Génère l'URL complète avec la langue et traduction i18n
 */
export function generateUrl(
  lang: 'it' | 'fr' | 'en',
  slug: string,
  type: 'page' | 'room' | 'article' | 'faq'
): string {
  const langPrefix = lang === 'it' ? '' : `/${lang}`;
  const routes = i18nRoutes[lang];

  switch (type) {
    case 'room':
      return `${langPrefix}/${routes.services}/${slug}`;
    case 'article':
      return `${langPrefix}/${routes.article}/${slug}`;
    case 'faq':
      return `${langPrefix}/${routes.faq}/${slug}`;
    case 'page':
    default:
      return `${langPrefix}/${slug}`;
  }
}
