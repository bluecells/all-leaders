import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define base schema for content
const baseArticleSchema = z.object({
  title: z.string(),
  h1Title: z.string().optional(),
  seoSlug: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
  jsonType: z.string().optional(),
  publishDate: z.date().optional(),
  featured: z.boolean().default(false),
  featuredPhoto: z.object({
    image: z.string().optional(),
    alt: z.string().optional(),
  }).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  excerpt: z.string().optional(),
});

const baseAccompagnementSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  type: z.enum(['action', 'investigation', 'inspiration', 'immersion']).default('action'),
  description: z.string(),
  image: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

const baseFaqSchema = z.object({
  seoSlug: z.string(),
  question: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  jsonType: z.string().optional(),
  category: z.string().optional(),
  order: z.number().optional(),
});

// Define collections with glob loader for Astro 6
const articlesFR = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/articlesFR' }),
  schema: baseArticleSchema,
});

const articlesEN = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/articlesEN' }),
  schema: baseArticleSchema,
});

const accompagnementsFR = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/accompagnementsFR' }),
  schema: baseAccompagnementSchema,
});

const accompagnementsEN = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/accompagnementsEN' }),
  schema: baseAccompagnementSchema,
});

const faqFR = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/faqFR' }),
  schema: baseFaqSchema,
});

const faqEN = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/faqEN' }),
  schema: baseFaqSchema,
});

const accompagnementsCategories = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/accompagnements-categories' }),
  schema: z.object({
    slug_fr: z.string(),
    slug_en: z.string(),
    name_fr: z.string(),
    name_en: z.string(),
    order: z.number().optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/categories' }),
  schema: z.object({
    cat_id: z.string(),
    slug_fr: z.string(),
    slug_en: z.string(),
    name_fr: z.string(),
    name_en: z.string(),
    order: z.number().optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
  }),
});

export const collections = {
  articlesFR,
  articlesEN,
  accompagnementsFR,
  accompagnementsEN,
  faqFR,
  faqEN,
  'accompagnements-categories': accompagnementsCategories,
  categories,
};
