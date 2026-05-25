import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

// Helper function to generate metaTitle following Google SEO rules (40-60 characters)
const generateArticleMetaTitle = (title: string, lang: 'fr' | 'en'): string => {
  const cleanTitle = title.trim().replace(/\s+/g, ' ');

  // Target range: 40-60 characters (Google typically displays 50-60 characters)
  if (cleanTitle.length >= 40 && cleanTitle.length <= 60) {
    return cleanTitle;
  }

  if (cleanTitle.length < 40) {
    // Title too short: add context prefix
    const prefixes = lang === 'fr'
      ? ['Guide: ', 'Comment: ', 'Découvrez: ', 'Tout savoir sur: ']
      : ['Guide: ', 'How to: ', 'Discover: ', 'Learn about: '];

    for (const prefix of prefixes) {
      const candidate = prefix + cleanTitle;
      if (candidate.length >= 40 && candidate.length <= 60) {
        return candidate;
      }
    }
    // If still too short, use the title as is (imperfect but valid)
    return cleanTitle;
  }

  // Title too long: truncate intelligently
  let truncated = cleanTitle.substring(0, 57); // Leave room for "..."
  // Don't cut mid-word
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 40) {
    truncated = truncated.substring(0, lastSpace);
  }
  return truncated + '...';
};

// Schéma flexible pour les images (string brute ou objet Keystatic)
const imageSchema = z
  .union([
    z.string(),
    z.object({
      image: z.string(),
      alt: z.string().nullish(),
    }),
  ])
  .nullish();

// Note: Pages sont gérées via fichiers .astro, pas via Keystatic

// Collection Landing Pages
const landingPages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/landing-pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    lang: z.enum(['it', 'fr', 'en']),
    seoSlug: z.string().nullish(),
    metaTitle: z.string().nullish(),
    metaDescription: z.string().nullish(),
    ogImage: z.string().nullish(),
    jsonType: z
      .enum(['page', 'blog', 'event', 'faq', 'blogCollection', 'hotelRoom'])
      .default('page')
      .optional(),
    blocks: z.array(z.any()).optional(),
    featuredPhoto: z
      .object({
        image: z.string().nullish(),
        alt: z.string().nullish(),
      })
      .nullish(),
  }),
});

// Collection Articles
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    h1Title: z.string().optional(),
    lang: z.enum(['it', 'fr', 'en']),
    seoSlug: z.string().nullish(),
    metaTitle: z.string().nullish(),
    metaDescription: z.string().nullish(),
    ogImage: z.string().nullish(),
    jsonType: z
      .enum(['page', 'blog', 'event', 'faq', 'blogCollection', 'hotelRoom'])
      .default('blog')
      .optional(),
    publishDate: z.coerce.date(),
    featuredPhoto: z
      .object({
        image: z.string().nullish(),
        alt: z.string().nullish(),
      })
      .nullish(),
    excerpt: z.string().nullish(),
    featured: z.boolean().optional().default(false),
    category: z.string().nullish(),
    tags: z.array(z.string()).nullish().default([]),
  }).transform((data) => {
    // Auto-generate metaTitle if not provided, following Google SEO rules (40-60 chars)
    const title = data.title.trim().replace(/\s+/g, ' ');
    let metaTitle = data.metaTitle;

    if (!metaTitle) {
      if (title.length >= 40 && title.length <= 60) {
        metaTitle = title;
      } else if (title.length < 40) {
        const prefixes = data.lang === 'fr'
          ? ['Guide: ', 'Comment: ', 'Découvrez: ', 'Tout savoir sur: ']
          : ['Guide: ', 'How to: ', 'Discover: ', 'Learn about: '];

        for (const prefix of prefixes) {
          const candidate = prefix + title;
          if (candidate.length >= 40 && candidate.length <= 60) {
            metaTitle = candidate;
            break;
          }
        }
        if (!metaTitle) metaTitle = title;
      } else {
        let truncated = title.substring(0, 57);
        const lastSpace = truncated.lastIndexOf(' ');
        if (lastSpace > 40) {
          truncated = truncated.substring(0, lastSpace);
        }
        metaTitle = truncated + '...';
      }
    }

    return {
      ...data,
      metaTitle,
    };
  }),
});

// Collection FAQ
const faq = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    lang: z.enum(['it', 'fr', 'en']),
    seoSlug: z.string().optional(),
    metaTitle: z.string().nullish(),
    metaDescription: z.string().nullish(),
    ogImage: z.string().nullish(),
    jsonType: z
      .enum(['page', 'blog', 'event', 'faq', 'blogCollection', 'hotelRoom'])
      .default('faq')
      .optional(),
    category: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Collection Accompagnements
// Les accompagnements sont stockés dans /src/content/accompagnements/ en YAML
const accompagnements = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/accompagnements' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    categorie: z.string(),
    type: z.enum([
      'action',
      'investigation',
      'formation',
      'coaching',
      'conseil',
      'mentorat',
      'immersion',
      'inspiration',
    ]),
    description: z.string(),
    long_description: z.string().optional(),
    image: z.string(),
    lang: z.enum(['fr', 'en']),
    metaTitle: z.string().nullish(),
    metaDescription: z.string().nullish(),
    ogImage: z.string().nullish(),
    USP1: z.string().optional(),
    USP2: z.string().optional(),
    USP3: z.string().optional(),
    USP4: z.string().optional(),
    USP5: z.string().optional(),
  }),
});

// Redirects (Single file)
const redirects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content' }),
  schema: z.object({
    redirects: z.array(
      z.object({
        from: z.string(),
        to: z.string(),
        status: z.enum(['301', '302']).default('301'),
        note: z.string().optional(),
      })
    ),
  }),
});

// Collection Catégories
const category = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/categories' }),
  schema: z.object({
    tag_slug: z.string().optional(),
    name_it: z.string(),
    name_fr: z.string(),
    name_en: z.string(),
    slug_it: z.string(),
    slug_fr: z.string(),
    slug_en: z.string(),
    description_it: z.string().optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
  }),
});

// Collection Tags
const tags = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/tags' }),
  schema: z.object({
    tag_slug: z.string().optional(),
    name_it: z.string(),
    name_fr: z.string(),
    name_en: z.string(),
    slug_it: z.string(),
    slug_fr: z.string(),
    slug_en: z.string(),
    description_it: z.string().optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
  }),
});

// Collection Menu
const menu = defineCollection({
  type: 'data',
  schema: z.object({
    links: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
        type: z.enum(['link', 'cta']).default('link'),
        hasSubmenu: z.boolean().default(false),
        submenu: z
          .array(
            z.object({
              label: z.string(),
              url: z.string(),
            })
          )
          .optional()
          .default([]),
      })
    ),
  }),
});

// Collection Catégories Accompagnements
const accompagnementsCategories = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/accompagnements-categories' }),
  schema: z.object({
    name_fr: z.string(),
    name_en: z.string(),
    description_fr: z.string(),
    description_en: z.string(),
    slug_fr: z.string(),
    slug_en: z.string(),
    order: z.number().default(0),
  }),
});

// Collection Modalités d'Intervention
const modalitesIntervention = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/modalites-intervention' }),
  schema: z.object({
    slug: z.string(),
    name_fr: z.string(),
    name_en: z.string(),
    description_fr: z.string(),
    description_en: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  'landing-pages': landingPages,
  articles,
  faq,
  accompagnements,
  menu,
  redirects,
  category,
  tags,
  'accompagnements-categories': accompagnementsCategories,
  'modalites-intervention': modalitesIntervention,
};
