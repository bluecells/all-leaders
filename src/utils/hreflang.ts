import type { CollectionEntry } from 'astro:content';
import { getLang } from './collections';

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
  accompagnement: CollectionEntry<'accompagnementsFR' | 'accompagnementsEN'>,
  lang: 'fr' | 'en',
  categorieSlug?: string | null
): string {
  const cleanSlug = accompagnement.data.slug;
  const accompagnementPrefix = ROUTE_PREFIXES.accompagnements[lang];

  // Si une catégorie est fournie et non-vide, l'utiliser dans l'URL
  const categoryPath = categorieSlug && categorieSlug.trim() ? `/${categorieSlug}` : '';

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
  article: CollectionEntry<'articlesFR' | 'articlesEN'>,
  lang: 'fr' | 'en',
  categories: CollectionEntry<'category'>[]
): string {
  const seoSlug =
    article.data.seoSlug || article.id.split('/').pop()?.replace('.mdoc', '') || 'article';
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, '');

  // Trouver la catégorie de l'article
  let categorySlug = 'uncategorized';
  if (article.data.category && typeof article.data.category === 'string') {
    const catEntry = categories.find((c) => c.data.cat_id === article.data.category);
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
 * Les FAQs ont une structure simplifiée: /faq/{faqSlug}
 */
export function buildFaqUrl(
  faq: CollectionEntry<'faq'>,
  lang: 'fr' | 'en',
  categories: CollectionEntry<'category'>[]
): string {
  const seoSlug = faq.data.seoSlug || faq.id.split('/').pop()?.replace('.mdoc', '') || 'faq';
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, '');
  const faqPrefix = ROUTE_PREFIXES.faq[lang];

  // FR: /faq/{slug} (pas de préfixe)
  if (lang === 'fr') {
    return `/${faqPrefix}/${cleanSlug}`;
  }

  // EN: /en/faq/{slug}
  return `/${lang}/${faqPrefix}/${cleanSlug}`;
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
 * Cette fonction cherche les traductions équivalentes d'une page/article/accompagnement/faq
 * en utilisant le matching par nom de fichier.
 *
 * @param entry L'entrée courante (article, accompagnement ou faq)
 * @param entryType Le type d'entrée ('article', 'accompagnement', 'faq')
 * @param collections Toutes les collections nécessaires
 * @returns Les URLs alternatives pour FR, EN (null si pas de traduction)
 */
export async function findAlternateUrls(
  entry: CollectionEntry<'articlesFR' | 'articlesEN' | 'accompagnementsFR' | 'accompagnementsEN' | 'faqFR' | 'faqEN'>,
  entryType: 'article' | 'accompagnement' | 'faq',
  collections: {
    articles: CollectionEntry<'articlesFR' | 'articlesEN'>[];
    accompagnements: CollectionEntry<'accompagnementsFR' | 'accompagnementsEN'>[];
    faq: CollectionEntry<'faqFR' | 'faqEN'>[];
    categories?: CollectionEntry<'category'>[];
    accompagnementsCategories?: CollectionEntry<'accompagnements-categories'>[];
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
      : entryType === 'accompagnement'
        ? collections.accompagnements
        : collections.faq;

  // Sélectionner la fonction de construction d'URL appropriée
  const buildUrl =
    entryType === 'article'
      ? (e: any, l: 'fr' | 'en') => buildArticleUrl(e, l, collections.categories!)
      : entryType === 'accompagnement'
        ? (e: any, l: 'fr' | 'en', catSlug?: string) => buildAccompagnementUrl(e, l, catSlug)
        : (e: any, l: 'fr' | 'en') => buildFaqUrl(e, l, collections.categories!);

  // Pour chaque langue, chercher l'entrée correspondante
  for (const lang of ['fr', 'en'] as const) {
    let matchingEntry;

    // Pour les accompagnements, matcher par image (identifiant commun entre FR/EN)
    if (entryType === 'accompagnement') {
      matchingEntry = collection.find((e) => {
        return getLang(e) === lang && e.data.image === entry.data.image;
      });
    } else {
      // Pour articles et FAQ, matcher par nom de fichier
      matchingEntry = collection.find((e) => {
        const eBaseFilename = getBaseFilename(e.id);
        return getLang(e) === lang && eBaseFilename === baseFilename;
      });
    }

    if (matchingEntry) {
      // Pour les accompagnements, besoin de trouver le slug de catégorie
      if (entryType === 'accompagnement') {
        // Always match against name_fr since all accompagnements store their category in French
        const catEntry = collections.accompagnementsCategories?.find((c) =>
          c.data.name_fr === matchingEntry.data.category
        );
        const catSlug = lang === 'fr' ? catEntry?.data.slug_fr : catEntry?.data.slug_en;

        // @ts-ignore - Nous savons que le type est correct
        result[lang] = buildUrl(matchingEntry, lang, catSlug);
      } else {
        // Pour les articles et FAQ, utiliser la collection category
        const catEntry = collections.category?.find((c) =>
          lang === 'fr' ? c.data.name_fr === matchingEntry.data.category : c.data.name_en === matchingEntry.data.category
        );
        // @ts-ignore - Nous savons que le type est correct
        result[lang] = buildUrl(matchingEntry, lang);
      }
    }
  }

  return result;
}
