import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

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

// Collection Pages
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/pages' }),
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

// Collection Services
const services = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['it', 'fr', 'en']),
    seoSlug: z.string().optional(),
    metaTitle: z.string().nullish(),
    metaDescription: z.string().nullish(),
    ogImage: z.string().nullish(),
    jsonType: z
      .enum(['page', 'blog', 'event', 'faq', 'blogCollection', 'hotelRoom'])
      .default('hotelRoom')
      .optional(),
    nameDisplay: z.string(),
    punchline: z.string(),
    featuredPhoto: z
      .object({
        image: z.string().nullish(),
        alt: z.string().nullish(),
      })
      .nullish(),
    photos: z
      .array(
        z.object({
          image: imageSchema,
          alt: z.string().nullish(),
        })
      )
      .max(6)
      .optional()
      .default([]),
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
const accompagnementCategories = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/accompagnement-categories' }),
  schema: z.object({
    name_fr: z.string(),
    name_en: z.string(),
    description_fr: z.string(),
    description_en: z.string(),
    slug: z.string(),
  }),
});

// Collection Accompagnements
const accompagnements = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/accompagnements' }),
  schema: z.object({
    title: z.string(),
    categorie: z.string(),
    type: z.enum(['action', 'investigation', 'formation', 'coaching', 'conseil', 'mentorat']),
    description: z.string(),
    image: z.string(),
    lang: z.enum(['fr', 'en']),
  }),
});

export const collections = {
  pages,
  'landing-pages': landingPages,
  articles,
  faq,
  services,
  menu,
  redirects,
  category,
  tags,
  accompagnements,
  'accompagnement-categories': accompagnementCategories,
};
