import { defineCollection, z } from 'astro:content';

const accompagnementsCollection = defineCollection({
  type: 'data',
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
  accompagnements: accompagnementsCollection,
};
