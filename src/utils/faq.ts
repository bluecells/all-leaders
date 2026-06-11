// utils/faq.ts
import { getAllFaqs, getLang } from './collections';

export async function getFaqQuestions({ lang, category }: { lang?: 'fr' | 'en'; category?: string }) {
  const allFaqs = await getAllFaqs();

  let faqs = allFaqs;

  if (lang) {
    faqs = faqs.filter((f) => getLang(f) === lang);
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
