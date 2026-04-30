import { S as SITE, g as getCollection } from './_astro_content_C2Y8VGuc.mjs';

const GET = async ({ site }) => {
  const baseUrl = site?.toString() ?? SITE.URL ?? "https://all-leaders.fr";
  const [
    articles,
    accompagnements,
    faqs,
    landingPages,
    categories
    // pour les slugs de catégories localisés
  ] = await Promise.all([
    getCollection("articles"),
    getCollection("accompagnements"),
    getCollection("faq"),
    getCollection("landing-pages"),
    getCollection("category")
  ]);
  const urlEntry = (loc, lastmod, priority = "0.7", changefreq = "weekly") => `
    <url>
      <loc>${new URL(loc.replace(/^\/+/, "/"), baseUrl).href}</loc>
      ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
  const urls = [];
  urls.push(urlEntry("/", /* @__PURE__ */ new Date(), "1.0", "daily"));
  urls.push(urlEntry("/fr/", /* @__PURE__ */ new Date(), "0.9", "daily"));
  urls.push(urlEntry("/en/", /* @__PURE__ */ new Date(), "0.9", "daily"));
  for (const article of articles) {
    const lang = article.data.lang;
    const cat = categories.find((c) => c.id === article.data.category);
    if (!cat) continue;
    const catSlug = cat.data[`slug_${lang}`] || cat.data.slug_fr || "ressources";
    const artSlug = (article.data.seoSlug || article.id.split("/").pop())?.replace(
      /^\/|\/$/g,
      ""
    );
    const resourcesSegment = lang === "fr" ? "ressources" : "resources";
    const path = lang === "fr" ? `/${resourcesSegment}/${catSlug}/${artSlug}` : `/${lang}/${resourcesSegment}/${catSlug}/${artSlug}`;
    urls.push(urlEntry(path, article.data.publishDate, "0.8", "monthly"));
  }
  for (const accompagnement of accompagnements) {
    const lang = accompagnement.data.lang;
    const slug = (accompagnement.data.seoSlug || accompagnement.id.split("/").pop())?.replace(/^\/|\/$/g, "");
    const path = lang === "fr" ? `/accompagnements/${slug}` : `/${lang}/services/${slug}`;
    urls.push(urlEntry(path, /* @__PURE__ */ new Date(), "0.7", "monthly"));
  }
  urls.push(urlEntry("/faq", /* @__PURE__ */ new Date(), "0.8", "weekly"));
  urls.push(urlEntry("/en/faq", /* @__PURE__ */ new Date(), "0.8", "weekly"));
  for (const lp of landingPages) {
    const lang = lp.data.lang;
    const slug = (lp.data.seoSlug || lp.id)?.replace(/^\/|\/$/g, "");
    const path = lang === "it" ? `/${slug}` : `/${lang}/${slug}`;
    urls.push(urlEntry(path, /* @__PURE__ */ new Date(), "0.7", "monthly"));
  }
  for (const faq of faqs) {
    const lang = faq.data.lang;
    const cat = categories.find((c) => c.id === faq.data.category);
    if (!cat) continue;
    const catSlug = cat.data[`slug_${lang}`] || cat.data.slug_it || "generale";
    const faqSlug = (faq.data.seoSlug || faq.id.split("/").pop()?.replace(".mdoc", ""))?.replace(/^\/|\/$/g, "");
    const path = lang === "it" ? `/faq/${catSlug}/${faqSlug}` : `/${lang}/faq/${catSlug}/${faqSlug}`;
    urls.push(urlEntry(path, null, "0.6", "monthly"));
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
  return new Response(xml.trim(), {
    status: 200,
    headers: { "Content-Type": "application/xml" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
