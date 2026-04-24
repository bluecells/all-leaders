// utils/faq.ts
import { getCollection } from 'astro:content';

export async function getFaqQuestions({ lang, category }: { lang?: string; category?: string }) {
  const allFaqs = await getCollection('faq');

  let faqs = allFaqs;

  if (lang) {
    faqs = faqs.filter((f) => f.data.lang === lang);
  }

  if (category) {
    faqs = faqs.filter((f) => f.data.category === category);
  }

  return faqs.flatMap((faq) => [
    {
      question: faq.data.question,
      answer: faq.body,
    },
  ]);
}
