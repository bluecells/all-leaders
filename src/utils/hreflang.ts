import type { CollectionEntry } from 'astro:content';

/**
 * Interface pour les URLs alternatives dans les 2 langues du site
 */
export interface AlternateUrls {
  fr: string;
  en: string | null;
}

/**
 * Mapping des préfixes de routes par type de contenu et par langue
 */
const ROUTE_PREFIXES = {
  article: {
    fr: 'ressources',
    en: 'resources',
  },
  faq: {
    fr: 'faq',
    en: 'faq',
  },
  accompagnements: {
    fr: 'accompagnements',
    en: 'services',
  },
} as const;

/**
 * Construit l'URL d'une page dans une langue donnée
 */
export function buildPageUrl(
  page: CollectionEntry<'pages'>,
  lang: 'fr' | 'en'
): string {
  const seoSlug = page.data.seoSlug || page.id.split('/').pop()?.replace('.mdoc', '') || 'page';
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, '');

  // FR n'a pas de préfixe de langue (langue par défaut)
  if (lang === 'fr') {
    return `/${cleanSlug}`;
  }

  // EN a le préfixe /en/
  return `/${lang}/${cleanSlug}`;
}

/**
 * Construit l'URL d'un accompagnement dans une langue donnée
 */
export function buildAccompagnementUrl(
  accompagnement: CollectionEntry<'accompagnements'>,
  lang: 'fr' | 'en',
  categorieSlug?: string
): string {
  const seoSlug = accompagnement.data.seoSlug || accompagnement.id.split('/').pop()?.replace('.yaml', '') || 'accompagnement';
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, '');
  const accompagnementPrefix = ROUTE_PREFIXES.accompagnements[lang];

  // Si une catégorie est fournie, l'utiliser dans l'URL
  const categoryPath = categorieSlug ? `/${categorieSlug}` : '';

  // FR: /accompagnements/{categorie}/slug (pas de préfixe langue)
  if (lang === 'fr') {
    return `/${accompagnementPrefix}${categoryPath}/${cleanSlug}`;
  }

  // EN: /en/services/{categorie}/slug
  return `/${lang}/${accompagnementPrefix}${categoryPath}/${cleanSlug}`;
}

// Backward compatibility alias
export const buildServiceUrl = buildAccompagnementUrl;

/**
 * Construit l'URL d'un article dans une langue donnée
 * Les articles ont une structure: /ressources/{categorySlug}/{articleSlug} (FR) ou /en/resources/{categorySlug}/{articleSlug} (EN)
 */
export function buildArticleUrl(
  article: CollectionEntry<'articles'>,
  lang: 'fr' | 'en',
  categories: CollectionEntry<'category'>[]
): string {
  const seoSlug =
    article.data.seoSlug || article.id.split('/').pop()?.replace('.mdoc', '') || 'article';
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, '');

  // Trouver la catégorie de l'article
  let categorySlug = 'uncategorized';
  if (article.data.category && typeof article.data.category === 'string') {
    const catEntry = categories.find((c) => c.id === article.data.category);
    if (catEntry) {
      // Utiliser le slug localisé de la catégorie avec fallback vers français
      const slugKey = `slug_${lang}` as 'slug_fr' | 'slug_en';
      categorySlug = catEntry.data[slugKey] || catEntry.data.slug_fr || 'uncategorized';
    }
  }

  const articlePrefix = ROUTE_PREFIXES.article[lang];

  // FR: /ressources/{categorySlug}/{articleSlug} (pas de préfixe)
  if (lang === 'fr') {
    return `/${articlePrefix}/${categorySlug}/${cleanSlug}`;
  }

  // EN: /en/resources/{categorySlug}/{articleSlug}
  return `/${lang}/${articlePrefix}/${categorySlug}/${cleanSlug}`;
}

/**
 * Construit l'URL d'une FAQ dans une langue donnée
 * Les FAQs ont une structure: /faq/{categorySlug}/{faqSlug}
 */
export function buildFaqUrl(
  faq: CollectionEntry<'faq'>,
  lang: 'fr' | 'en',
  categories: CollectionEntry<'category'>[]
): string {
  const seoSlug = faq.data.seoSlug || faq.id.split('/').pop()?.replace('.mdoc', '') || 'faq';
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, '');
  const faqPrefix = ROUTE_PREFIXES.faq[lang];

  // Trouver le slug localisé de la catégorie
  let categorySlug = 'generale';
  if (faq.data.category) {
    const catEntry = categories.find((c) => c.id === faq.data.category);
    if (catEntry) {
      const slugKey = `slug_${lang}` as 'slug_fr' | 'slug_en';
      categorySlug = catEntry.data[slugKey] || catEntry.data.slug_fr || 'generale';
    }
  }

  // FR: /faq/{categorySlug}/{slug} (pas de préfixe)
  if (lang === 'fr') {
    return `/${faqPrefix}/${categorySlug}/${cleanSlug}`;
  }

  // EN: /en/faq/{categorySlug}/{slug}
  return `/${lang}/${faqPrefix}/${categorySlug}/${cleanSlug}`;
}

/**
 * Extrait le nom de fichier de base (sans le préfixe de langue fr/en)
 * Exemple: "fr/services.yaml" → "services.yaml"
 */
function getBaseFilename(entryId: string): string {
  const parts = entryId.split('/');
  if (parts.length > 1 && ['fr', 'en'].includes(parts[0])) {
    return parts.slice(1).join('/');
  }
  return entryId;
}

/**
 * Trouve les URLs alternatives pour une entrée donnée dans les 2 langues
 *
 * Cette fonction cherche les traductions équivalentes d'une page/article/room/faq
 * en utilisant le matching par nom de fichier.
 *
 * @param entry L'entrée courante (page, article, room ou faq)
 * @param entryType Le type d'entrée ('page', 'article', 'room', 'faq')
 * @param collections Toutes les collections nécessaires
 * @returns Les URLs alternatives pour FR, EN (null si pas de traduction)
 */
export async function findAlternateUrls(
  entry: CollectionEntry<'articles' | 'services' | 'faq'>,
  entryType: 'article' | 'room' | 'faq',
  collections: {
    articles: CollectionEntry<'articles'>[];
    services: CollectionEntry<'services'>[];
    faq: CollectionEntry<'faq'>[];
    categories: CollectionEntry<'category'>[];
  }
): Promise<AlternateUrls> {
  const result: AlternateUrls = {
    fr: '',
    en: null,
  };

  // Extraire le nom de fichier de base pour matcher les traductions
  const baseFilename = getBaseFilename(entry.id);

  // Sélectionner la collection appropriée selon le type
  const collection =
    entryType === 'article'
      ? collections.articles
      : entryType === 'room'
        ? collections.services
        : collections.faq;

  // Sélectionner la fonction de construction d'URL appropriée
  const buildUrl =
    entryType === 'article'
      ? (e: any, l: 'fr' | 'en') => buildArticleUrl(e, l, collections.categories)
      : entryType === 'room'
        ? buildServiceUrl
        : (e: any, l: 'fr' | 'en') => buildFaqUrl(e, l, collections.categories);

  // Pour chaque langue, chercher l'entrée correspondante
  for (const lang of ['fr', 'en'] as const) {
    // Chercher une entrée avec le même nom de fichier dans cette langue
    const matchingEntry = collection.find((e) => {
      const eBaseFilename = getBaseFilename(e.id);
      return e.data.lang === lang && eBaseFilename === baseFilename;
    });

    if (matchingEntry) {
      // @ts-ignore - Nous savons que le type est correct
      result[lang] = buildUrl(matchingEntry, lang);
    }
  }

  return result;
}
