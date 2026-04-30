// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/consts'; // Assure-toi que SITE.url = 'https://all-leaders.fr'

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() ?? SITE.URL ?? 'https://all-leaders.fr';

  const [
    articles,
    accompagnements,
    faqs,
    landingPages,
    categories, // pour les slugs de catégories localisés
  ] = await Promise.all([
    getCollection('articles'),
    getCollection('accompagnements'),
    getCollection('faq'),
    getCollection('landing-pages'),
    getCollection('category'),
  ]);

  const urlEntry = (
    loc: string,
    lastmod?: Date | string | null,
    priority: string = '0.7',
    changefreq: string = 'weekly'
  ) => `
    <url>
      <loc>${new URL(loc.replace(/^\/+/, '/'), baseUrl).href}</loc>
      ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;

  const urls: string[] = [];

  // Homepage + racines langues
  urls.push(urlEntry('/', new Date(), '1.0', 'daily'));
  urls.push(urlEntry('/fr/', new Date(), '0.9', 'daily'));
  urls.push(urlEntry('/en/', new Date(), '0.9', 'daily'));

  // Articles (avec catégorie slug localisée)
  for (const article of articles) {
    const lang = article.data.lang as 'it' | 'fr' | 'en';
    const cat = categories.find((c) => c.id === article.data.category);
    if (!cat) continue;

    const catSlug = cat.data[`slug_${lang}`] || cat.data.slug_fr || 'ressources';
    const artSlug = (article.data.seoSlug || article.id.split('/').pop())?.replace(
      /^\/|\/$/g,
      ''
    );

    // Détermine le segment ressources selon la langue
    const resourcesSegment = lang === 'fr' ? 'ressources' : 'resources';
    const path =
      lang === 'fr'
        ? `/${resourcesSegment}/${catSlug}/${artSlug}`
        : `/${lang}/${resourcesSegment}/${catSlug}/${artSlug}`;

    urls.push(urlEntry(path, article.data.publishDate, '0.8', 'monthly'));
  }

  // Accompagnements
  for (const accompagnement of accompagnements) {
    const lang = accompagnement.data.lang as 'fr' | 'en';
    const slug = (accompagnement.data.seoSlug || accompagnement.id.split('/').pop())?.replace(/^\/|\/$/g, '');
    const path = lang === 'fr' ? `/accompagnements/${slug}` : `/${lang}/services/${slug}`;
    urls.push(urlEntry(path, new Date(), '0.7', 'monthly'));
  }

  // Pages - Gérées via fichiers .astro statiques
  urls.push(urlEntry('/faq', new Date(), '0.8', 'weekly'));
  urls.push(urlEntry('/en/faq', new Date(), '0.8', 'weekly'));

  // Landing pages (même logique que pages)
  for (const lp of landingPages) {
    const lang = lp.data.lang as 'it' | 'fr' | 'en';
    const slug = (lp.data.seoSlug || lp.id)?.replace(/^\/|\/$/g, '');
    const path = lang === 'it' ? `/${slug}` : `/${lang}/${slug}`;
    urls.push(urlEntry(path, new Date(), '0.7', 'monthly'));
  }

  // FAQ (avec catégorie slug localisée)
  for (const faq of faqs) {
    const lang = faq.data.lang as 'it' | 'fr' | 'en';
    const cat = categories.find((c) => c.id === faq.data.category);
    if (!cat) continue;

    const catSlug = cat.data[`slug_${lang}`] || cat.data.slug_it || 'generale';
    const faqSlug = (faq.data.seoSlug || faq.id.split('/').pop()?.replace('.mdoc', ''))?.replace(/^\/|\/$/g, '');

    const path = lang === 'it' ? `/faq/${catSlug}/${faqSlug}` : `/${lang}/faq/${catSlug}/${faqSlug}`;
    urls.push(urlEntry(path, null, '0.6', 'monthly'));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
};
