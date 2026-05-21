import { c as createComponent } from './astro-component_BSMsVI9A.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderSlot } from './server_9mu4lEgk.mjs';
import { b as getEntry, r as renderEntry, g as getCollection } from './_astro_content_xUKIXKKi.mjs';
import { $ as $$Layout, a as $$Breadcrumb } from './Layout_BzCycEC5.mjs';

const $$LayoutBlog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LayoutBlog;
  const {
    title,
    h1Title,
    category,
    publishDate,
    featuredPhoto,
    excerpt,
    lang = "it",
    related = [],
    ogImage,
    metaTitle,
    metaDescription,
    alternateUrls
  } = Astro2.props;
  const cleanText = (str) => {
    if (!str) return "";
    try {
      return decodeURIComponent(escape(str));
    } catch (e) {
      return str;
    }
  };
  const formatDate = (date, l) => {
    return new Date(date).toLocaleDateString(l === "it" ? "it-IT" : l === "fr" ? "fr-FR" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };
  const getRelatedTitle = (l) => {
    if (l === "fr") return "Articles similaires";
    if (l === "en") return "Related Articles";
    return "Articoli Correlati";
  };
  const getLearnMoreText = (l) => {
    if (l === "fr") return "Pour en savoir plus...";
    if (l === "en") return "Learn more...";
    return "Scopri di più...";
  };
  const getContactCTA = (l) => {
    if (l === "fr") return "Contactez-nous";
    if (l === "en") return "Contact Us";
    return "Contattaci";
  };
  const getCategoryLabel = async (categoryId, l) => {
    try {
      const categoryEntry = await getEntry("category", categoryId);
      if (categoryEntry) {
        const fieldKey = `name_${l}`;
        const label = categoryEntry.data[fieldKey];
        return label || categoryId;
      }
    } catch (e) {
      console.warn(`Category "${categoryId}" not found`, e);
    }
    return categoryId;
  };
  const getFeaturedImagePath = (photo) => {
    if (!photo) return void 0;
    if (typeof photo === "string") return photo;
    return photo.image;
  };
  const getFeaturedImageAlt = (photo) => {
    if (!photo) return "";
    if (typeof photo === "string") return "";
    return photo.alt || "";
  };
  const displayH1 = h1Title || title;
  const categoryLabel = await getCategoryLabel(category, lang);
  const categoryCache = /* @__PURE__ */ new Map();
  categoryCache.set(category, categoryLabel);
  const getCachedCategoryLabel = async (categoryId, l) => {
    const cacheKey = `${categoryId}-${l}`;
    if (categoryCache.has(cacheKey)) {
      return categoryCache.get(cacheKey);
    }
    const label = await getCategoryLabel(categoryId, l);
    categoryCache.set(cacheKey, label);
    return label;
  };
  const featuredImagePath = getFeaturedImagePath(featuredPhoto);
  const featuredImageAlt = getFeaturedImageAlt(featuredPhoto);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "metaTitle": metaTitle, "metaDescription": metaDescription || excerpt || "", "ogImage": ogImage || featuredImagePath, "ogType": "article", "publishDate": new Date(publishDate), "lang": lang, "jsonType": "blog", "alternateUrls": alternateUrls, "data-astro-cid-m337sa5b": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="bg-[#fdfdfd] min-h-screen pb-10" data-astro-cid-m337sa5b> <div class="min-h-[82vh] md:min-h-[93vh] flex flex-col items-center justify-center" data-astro-cid-m337sa5b> <header class="relative pb-8 md:py-8" data-astro-cid-m337sa5b> <div class="max-w-4xl mx-auto px-6 text-center" data-astro-cid-m337sa5b> <div class="inline-block px-6 pt-0 mt-8 md:mt-0 pb-1 rounded-lg bg-limolo-green/5 border border-limolo-green/10 mb-4" data-astro-cid-m337sa5b> <span class="text-[10px] uppercase tracking-[0.3em] font-bold text-limolo-green" data-astro-cid-m337sa5b> ${categoryLabel} </span> </div> <h1 class="text-3xl md:text-4xl text-limolo-green leading-[1.1] mb-4" data-astro-cid-m337sa5b> ${cleanText(displayH1)} </h1> <div class="flex items-center justify-center gap-4 text-gray-400" data-astro-cid-m337sa5b> <span class="h-px w-8 bg-gray-200" data-astro-cid-m337sa5b></span> <time class="text-[11px] uppercase tracking-widest font-bold" data-astro-cid-m337sa5b> ${formatDate(publishDate, lang)} </time> <span class="h-px w-8 bg-gray-200" data-astro-cid-m337sa5b></span> </div> ${excerpt && renderTemplate`<p class="py-4 text-xl md:text-2xl text-gray-600  italic leading-relaxed max-w-3xl mx-auto" data-astro-cid-m337sa5b>
"${cleanText(excerpt)}"
</p>`} </div> </header> ${featuredImagePath && renderTemplate`<div class="w-full max-w-xl mx-auto px-4 mb-20" data-astro-cid-m337sa5b> <div class="relative aspect-square md:aspect-21/11 rounded-xl overflow-hidden shadow-2xl shadow-limolo-green/10" data-astro-cid-m337sa5b> <img${addAttribute(featuredImagePath, "src")}${addAttribute(featuredImageAlt || title, "alt")} class="w-full h-full object-cover" data-astro-cid-m337sa5b> </div> </div>`} </div> <div class="prose-content max-w-4xl mx-auto" data-astro-cid-m337sa5b> ${renderSlot($$result2, $$slots["default"])} </div> ${related && related.length > 0 && renderTemplate`<section class="bg-gray-50 border-t border-gray-100 mt-24 py-24" data-astro-cid-m337sa5b> <div class="max-w-7xl mx-auto px-6" data-astro-cid-m337sa5b> <h2 class="text-3xl  text-limolo-green text-center mb-16" data-astro-cid-m337sa5b>${getRelatedTitle(lang)}</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-10" data-astro-cid-m337sa5b> ${await Promise.all(
    related.map(async (item) => {
      const itemSlug = item.data.seoSlug || item.id.split("/").pop();
      const cleanSlug = itemSlug.replace(/^\/|\/$/g, "");
      const resourcesSegment = lang === "fr" ? "ressources" : "resources";
      const url = lang === "fr" ? `/${resourcesSegment}/${item.data.category}/${cleanSlug}` : `/${lang}/${resourcesSegment}/${item.data.category}/${cleanSlug}`;
      const itemFeaturedImagePath = getFeaturedImagePath(item.data.featuredPhoto);
      const itemFeaturedImageAlt = getFeaturedImageAlt(item.data.featuredPhoto);
      const itemCategoryLabel = await getCachedCategoryLabel(item.data.category, lang);
      return renderTemplate`<a${addAttribute(url, "href")} class="group block" data-astro-cid-m337sa5b> <div class="aspect-16/10 rounded-2xl overflow-hidden mb-6 shadow-sm" data-astro-cid-m337sa5b> <img${addAttribute(itemFeaturedImagePath, "src")}${addAttribute(itemFeaturedImageAlt || item.data.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-astro-cid-m337sa5b> </div> <div class="text-[10px] uppercase tracking-widest font-bold text-limolo-green mb-3" data-astro-cid-m337sa5b> ${itemCategoryLabel} </div> <h3 class="text-lg  text-gray-800 leading-snug group-hover:text-limolo-accent transition-colors" data-astro-cid-m337sa5b> ${cleanText(item.data.title)} </h3> </a>`;
    })
  )} </div> </div> </section>`} <h3 data-astro-cid-m337sa5b> ${getLearnMoreText(lang)} <br data-astro-cid-m337sa5b><br data-astro-cid-m337sa5b><a class="btn-limolo"${addAttribute(lang === "fr" ? "/contact/" : "/en/contact/", "href")} data-astro-cid-m337sa5b>${getContactCTA(lang)}</a> </h3> </article> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/layouts/LayoutBlog.astro", void 0);

const $$LayoutFaq = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LayoutFaq;
  const { faq, alternateUrls } = Astro2.props;
  const { data } = faq;
  const { Content } = await renderEntry(faq);
  const pageTitle = data.question;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "lang": data.lang, "metaTitle": data.metaTitle, "metaDescription": data.metaDescription, "ogImage": data.ogImage, "jsonType": data.jsonType || "faq", "alternateUrls": alternateUrls, "data-astro-cid-ri2cdo2f": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "lang": data.lang, "category": data.category, "title": data.question, "data-astro-cid-ri2cdo2f": true })} ${maybeRenderHead()}<main class="faq-page" data-astro-cid-ri2cdo2f> <article class="faq-container" data-astro-cid-ri2cdo2f> <header class="faq-header" data-astro-cid-ri2cdo2f> <span class="faq-category" data-astro-cid-ri2cdo2f>${data.category}</span> <h1 class="faq-question" data-astro-cid-ri2cdo2f>${data.question}</h1> </header> <div class="faq-content" data-astro-cid-ri2cdo2f> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-ri2cdo2f": true })} </div> </article> </main> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/layouts/LayoutFaq.astro", void 0);

const ROUTE_PREFIXES = {
  article: {
    fr: "ressources",
    en: "resources"
  },
  faq: {
    fr: "faq",
    en: "faq"
  },
  accompagnements: {
    fr: "accompagnements",
    en: "services"
  }
};
function buildAccompagnementUrl(accompagnement, lang, categorieSlug) {
  const seoSlug = accompagnement.data.seoSlug || accompagnement.id.split("/").pop()?.replace(".yaml", "") || "accompagnement";
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, "");
  const accompagnementPrefix = ROUTE_PREFIXES.accompagnements[lang];
  const categoryPath = categorieSlug ? `/${categorieSlug}` : "";
  if (lang === "fr") {
    return `/${accompagnementPrefix}${categoryPath}/${cleanSlug}`;
  }
  return `/${lang}/${accompagnementPrefix}${categoryPath}/${cleanSlug}`;
}
const buildServiceUrl = buildAccompagnementUrl;
function buildArticleUrl(article, lang, categories) {
  const seoSlug = article.data.seoSlug || article.id.split("/").pop()?.replace(".mdoc", "") || "article";
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, "");
  let categorySlug = "uncategorized";
  if (article.data.category && typeof article.data.category === "string") {
    const catEntry = categories.find((c) => c.id === article.data.category);
    if (catEntry) {
      const slugKey = `slug_${lang}`;
      categorySlug = catEntry.data[slugKey] || catEntry.data.slug_fr || "uncategorized";
    }
  }
  const articlePrefix = ROUTE_PREFIXES.article[lang];
  if (lang === "fr") {
    return `/${articlePrefix}/${categorySlug}/${cleanSlug}`;
  }
  return `/${lang}/${articlePrefix}/${categorySlug}/${cleanSlug}`;
}
function buildFaqUrl(faq, lang, categories) {
  const seoSlug = faq.data.seoSlug || faq.id.split("/").pop()?.replace(".mdoc", "") || "faq";
  const cleanSlug = seoSlug.replace(/^\/|\/$/g, "");
  const faqPrefix = ROUTE_PREFIXES.faq[lang];
  let categorySlug = "generale";
  if (faq.data.category) {
    const catEntry = categories.find((c) => c.id === faq.data.category);
    if (catEntry) {
      const slugKey = `slug_${lang}`;
      categorySlug = catEntry.data[slugKey] || catEntry.data.slug_fr || "generale";
    }
  }
  if (lang === "fr") {
    return `/${faqPrefix}/${categorySlug}/${cleanSlug}`;
  }
  return `/${lang}/${faqPrefix}/${categorySlug}/${cleanSlug}`;
}
function getBaseFilename(entryId) {
  const parts = entryId.split("/");
  if (parts.length > 1 && ["fr", "en"].includes(parts[0])) {
    return parts.slice(1).join("/");
  }
  return entryId;
}
async function findAlternateUrls(entry, entryType, collections) {
  const result = {
    fr: "",
    en: null
  };
  const baseFilename = getBaseFilename(entry.id);
  const collection = entryType === "article" ? collections.articles : entryType === "room" ? collections.services : collections.faq;
  const buildUrl = entryType === "article" ? (e, l) => buildArticleUrl(e, l, collections.categories) : entryType === "room" ? buildServiceUrl : (e, l) => buildFaqUrl(e, l, collections.categories);
  for (const lang of ["fr", "en"]) {
    const matchingEntry = collection.find((e) => {
      const eBaseFilename = getBaseFilename(e.id);
      return e.data.lang === lang && eBaseFilename === baseFilename;
    });
    if (matchingEntry) {
      result[lang] = buildUrl(matchingEntry, lang);
    }
  }
  return result;
}

const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const pathname = Astro2.url.pathname.replace(/^\/|\/$/g, "");
  let ContentComponent = null;
  let entryData = null;
  let entryType = null;
  let entryLang = void 0;
  try {
    const redirectsCollection = await getCollection("redirects");
    if (redirectsCollection && redirectsCollection.length > 0) {
      const redirectsData = redirectsCollection[0].data;
      const cleanPath = Astro2.url.pathname.replace(/^\/|\/$/g, "");
      const redirectMatch = redirectsData.redirects.find((r) => r.from === cleanPath);
      if (redirectMatch) {
        let toPath = redirectMatch.to.trim();
        if (!toPath.startsWith("/") && !toPath.includes("://")) {
          toPath = "/" + toPath;
        }
        let origin = Astro2.url?.origin;
        if (!origin || origin.includes("localhost") || origin === "http://" || origin === "https://") {
          origin = "https://all-leaders.fr";
        }
        const fullRedirectUrl = new URL(toPath, origin).toString();
        const statusCode = Number(redirectMatch.status) || 301;
        return Astro2.redirect(fullRedirectUrl, statusCode);
      }
    }
  } catch (e) {
    console.error("Redirects error:", e);
  }
  if (["favicon.ico", "robots.txt", "sitemap.xml"].includes(pathname)) {
    return new Response(null, { status: 404 });
  }
  const rawPath = Astro2.url.pathname.replace(/^\/|\/$/g, "");
  const segments = rawPath ? rawPath.split("/") : [];
  const lang = (["fr", "en"].includes(segments[0]) ? segments.shift() : "fr") ?? "fr";
  const route = segments.join("/") || "home";
  if (route === "blog" || rawPath === "en/blog") {
    return new Response(null, { status: 404 });
  }
  const [articles, faq, landingPages] = await Promise.all([
    getCollection("articles"),
    getCollection("faq"),
    getCollection("landing-pages")
  ]);
  let entry = null;
  let type = null;
  const resourcesSegment = lang === "fr" ? "ressources" : "resources";
  if (route.startsWith(resourcesSegment + "/")) {
    const parts = route.split("/");
    const categorySlug = parts[1];
    const articleSlug = parts.slice(2).join("/");
    const allCategories = await getCollection("category");
    console.log(`[ARTICLES DEBUG] Looking for: lang=${lang}, categorySlug=${categorySlug}, articleSlug=${articleSlug}`);
    console.log(`[ARTICLES DEBUG] Total articles: ${articles.length}`);
    entry = articles.find((a) => {
      const rawSlug = a.data.seoSlug || a.id.split("/").pop()?.replace(/\.(mdoc|md|mdx)$/, "");
      const cleanSlug = rawSlug?.replace(/^\/|\/$/g, "");
      if (articles.indexOf(a) === 0) {
        console.log(`[ARTICLES DEBUG] First article: id=${a.id}, lang=${a.data.lang}, seoSlug=${a.data.seoSlug}, cleanSlug=${cleanSlug}, category=${a.data.category}`);
      }
      if (a.data.lang !== lang || cleanSlug !== articleSlug) return false;
      const catEntry = allCategories.find((c) => c.id === a.data.category);
      if (!catEntry) {
        console.log(`[ARTICLES DEBUG] Category not found: ${a.data.category}`);
        return false;
      }
      const catSlugLocalized = catEntry.data[`slug_${lang}`] || catEntry.data.slug_fr;
      console.log(`[ARTICLES DEBUG] Category match check: ${catSlugLocalized} === ${categorySlug}`);
      return catSlugLocalized === categorySlug;
    });
    type = entry ? "article" : null;
  }
  if (!entry) {
    entry = landingPages.find((lp) => {
      const cleanSlug = (lp.data.seoSlug || lp.id)?.replace(/^\/|\/$/g, "");
      return lp.data.lang === lang && cleanSlug === route;
    });
    type = entry ? "landing-page" : null;
  }
  if (!entry && route.startsWith("faq/")) {
    const routeParts = route.split("/");
    const categorySlug = routeParts[1];
    const faqSlug = routeParts[2];
    if (categorySlug && faqSlug) {
      const allFaqCategories = await getCollection("category");
      entry = faq.find((f) => {
        const cleanSlug = (f.data.seoSlug || f.id.split("/").pop()?.replace(".mdoc", ""))?.replace(/^\/|\/$/g, "");
        if (f.data.lang !== lang || cleanSlug !== faqSlug) return false;
        const catEntry = allFaqCategories.find((c) => c.id === f.data.category);
        if (!catEntry) return false;
        const catSlugLocalized = catEntry.data[`slug_${lang}`] || catEntry.data.slug_fr;
        return catSlugLocalized === categorySlug;
      });
      type = entry ? "faq" : null;
    }
  }
  if (!entry) {
    if (lang === "en") {
      return Astro2.redirect("/en/404");
    } else {
      return Astro2.redirect("/404");
    }
  } else {
    const rendered = await renderEntry(entry);
    ContentComponent = rendered.Content;
    entryData = entry;
    entryType = type;
    entryLang = lang;
  }
  let alternateUrls = null;
  if (entry && type) {
    const allCategories = await getCollection("category");
    alternateUrls = await findAlternateUrls(entry, type, {
      articles,
      accompagnements,
      faq,
      categories: allCategories
    });
  }
  return renderTemplate`${entryType === "article" && renderTemplate`${renderComponent($$result, "LayoutBlog", $$LayoutBlog, { "title": entryData.data.title, "h1Title": entryData.data.h1Title, "category": entryData.data.category, "publishDate": entryData.data.publishDate, "excerpt": entryData.data.excerpt, "lang": entryLang, "ogImage": entryData.data.ogImage, "metaTitle": entryData.data.metaTitle, "metaDescription": entryData.data.metaDescription, "featuredPhoto": entryData.data.featuredPhoto, "alternateUrls": alternateUrls }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "ContentComponent", ContentComponent, {})}` })}`}${entryType === "page" && renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": entryData.data.title, "lang": entryLang, "metaTitle": entryData.data.metaTitle, "metaDescription": entryData.data.metaDescription, "ogImage": entryData.data.ogImage, "jsonType": entryData.data.jsonType, "alternateUrls": alternateUrls, "isHomepage": pathname === "" || pathname.match(/^(fr|en)$/) }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "ContentComponent", ContentComponent, {})}` })}`}${entryType === "landing-page" && renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": entryData.data.title, "lang": entryLang, "metaTitle": entryData.data.metaTitle, "metaDescription": entryData.data.metaDescription, "ogImage": entryData.data.ogImage, "jsonType": entryData.data.jsonType, "alternateUrls": alternateUrls }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "ContentComponent", ContentComponent, {})}` })}`}${entryType === "faq" && renderTemplate`${renderComponent($$result, "LayoutFaq", $$LayoutFaq, { "faq": entryData, "lang": entryLang, "alternateUrls": alternateUrls })}`}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/[...route].astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/[...route].astro";
const $$url = "/[...route]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
