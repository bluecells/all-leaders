import { c as createComponent } from './astro-component_ChN6-B7k.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute, g as renderSlot } from './server_D9jb-1hQ.mjs';
import { a as getEntry, g as getCollection, r as renderEntry } from './_astro_content_C_ZjLvp6.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_DLSRQxYP.mjs';
import 'clsx';
import { $ as $$ActionBar } from './ActionBar_Js3UicLP.mjs';

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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "metaTitle": metaTitle, "metaDescription": metaDescription || excerpt || "", "ogImage": ogImage || featuredImagePath, "ogType": "article", "publishDate": new Date(publishDate), "lang": lang, "jsonType": "blog", "alternateUrls": alternateUrls }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="bg-[#fdfdfd] min-h-screen pb-10"> <header class="relative pt-12 pb-16 md:pt-20 md:pb-24"> <div class="max-w-4xl mx-auto px-6 text-center"> <div class="inline-block px-4 py-1.5 rounded-full bg-limolo-green/5 border border-limolo-green/10 mb-8"> <span class="text-[10px] uppercase tracking-[0.3em] font-bold text-limolo-green"> ${categoryLabel} </span> </div> <h1 class="text-4xl md:text-7xl font-serif text-limolo-green leading-[1.1] mb-8"> ${cleanText(displayH1)} </h1> <div class="flex items-center justify-center gap-4 text-gray-400"> <span class="h-px w-8 bg-gray-200"></span> <time class="text-[11px] uppercase tracking-widest font-bold"> ${formatDate(publishDate, lang)} </time> <span class="h-px w-8 bg-gray-200"></span> </div> ${excerpt && renderTemplate`<p class="mt-10 text-xl md:text-2xl text-gray-600 font-serif italic leading-relaxed max-w-3xl mx-auto">
"${cleanText(excerpt)}"
</p>`} </div> </header> ${featuredImagePath && renderTemplate`<div class="w-full max-w-7xl mx-auto px-4 mb-16 md:mb-24"> <div class="relative aspect-21/9 rounded-xl overflow-hidden shadow-2xl shadow-limolo-green/10"> <img${addAttribute(featuredImagePath, "src")}${addAttribute(featuredImageAlt || title, "alt")} class="w-full h-full object-cover"> </div> </div>`} <div class="max-w-4xl mx-auto px-6"> <div class="prose prose-stone prose-lg md:prose-xl prose-limolo max-w-none"> ${renderSlot($$result2, $$slots["default"])} </div> </div> ${related && related.length > 0 && renderTemplate`<section class="bg-gray-50 border-t border-gray-100 mt-24 py-24"> <div class="max-w-7xl mx-auto px-6"> <h2 class="text-3xl font-serif text-limolo-green text-center mb-16"> ${getRelatedTitle(lang)} </h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-10"> ${await Promise.all(
    related.map(async (item) => {
      const itemSlug = item.data.seoSlug || item.id.split("/").pop();
      const cleanSlug = itemSlug.replace(/^\/|\/$/g, "");
      const resourcesSegment = lang === "fr" ? "ressources" : "resources";
      const url = lang === "fr" ? `/${resourcesSegment}/${item.data.category}/${cleanSlug}` : `/${lang}/${resourcesSegment}/${item.data.category}/${cleanSlug}`;
      const itemFeaturedImagePath = getFeaturedImagePath(item.data.featuredPhoto);
      const itemFeaturedImageAlt = getFeaturedImageAlt(item.data.featuredPhoto);
      const itemCategoryLabel = await getCachedCategoryLabel(item.data.category, lang);
      return renderTemplate`<a${addAttribute(url, "href")} class="group block"> <div class="aspect-16/10 rounded-2xl overflow-hidden mb-6 shadow-sm"> <img${addAttribute(itemFeaturedImagePath, "src")}${addAttribute(itemFeaturedImageAlt || item.data.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> </div> <div class="text-[10px] uppercase tracking-widest font-bold text-limolo-green mb-3"> ${itemCategoryLabel} </div> <h3 class="text-lg font-serif text-gray-800 leading-snug group-hover:text-limolo-accent transition-colors"> ${cleanText(item.data.title)} </h3> </a>`;
    })
  )} </div> </div> </section>`} </article> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/layouts/LayoutBlog.astro", void 0);

const i18nRoutes = {
  it: { services: "servizi", article: "articoli", faq: "faq" },
  fr: { services: "services", article: "ressources", faq: "faq" },
  en: { services: "services", article: "resources", faq: "faq" }
};
function slugify(text) {
  return text.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
function generateSeoSlug(entry) {
  if (entry.seoSlug && entry.seoSlug.trim() !== "") {
    if (entry.category && !entry.seoSlug.startsWith(entry.category + "/")) {
      return `${entry.category}/${entry.seoSlug}`;
    }
    return entry.seoSlug;
  }
  const sourceText = entry.nameDisplay || entry.title || entry.slug || entry.name || "";
  const slug = slugify(sourceText);
  if (entry.category) {
    return `${entry.category}/${slug}`;
  }
  return slug;
}
function generateUrl(lang, slug, type) {
  const langPrefix = lang === "it" ? "" : `/${lang}`;
  const routes = i18nRoutes[lang];
  switch (type) {
    case "room":
      return `${langPrefix}/${routes.services}/${slug}`;
    case "article":
      return `${langPrefix}/${routes.article}/${slug}`;
    case "faq":
      return `${langPrefix}/${routes.faq}/${slug}`;
    case "page":
    default:
      return `${langPrefix}/${slug}`;
  }
}

const $$CarouselRooms = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CarouselRooms;
  const {
    height = "30vh",
    speed = 4e4,
    background = "transparent",
    spacing = "1rem",
    showName = true,
    showPunchline = true,
    lang = "it",
    excludeId,
    paddingVertical = "4rem"
  } = Astro2.props;
  const allRooms = await getCollection("services");
  const rooms = allRooms.filter((room) => room.data.lang === lang && room.id !== excludeId);
  const limitedRooms = rooms.slice(0, 10);
  const duplicatedRooms = [...limitedRooms, ...limitedRooms];
  const roomsWithUrls = duplicatedRooms.map((room) => ({
    ...room,
    url: generateUrl(
      room.data.lang,
      generateSeoSlug({
        seoSlug: room.data.seoSlug,
        nameDisplay: room.data.nameDisplay
      }),
      "room"
    ),
    featuredPhotoSrc: room.data.featuredPhoto?.image || ""
  }));
  return renderTemplate`${maybeRenderHead()}<section class="carousel-rooms full-bleed"${addAttribute(`background-color: ${background}; --carousel-height: ${height}; --padding-vertical: ${paddingVertical};`, "style")} data-astro-cid-wrjmq7iw> <div class="carousel-track-container" data-astro-cid-wrjmq7iw> <div id="track" class="carousel-track"${addAttribute(`--spacing: ${spacing}; --speed: ${speed}ms;`, "style")} oncontextmenu="return false;" data-astro-cid-wrjmq7iw> ${roomsWithUrls.map((room) => renderTemplate`<a${addAttribute(room.url, "href")} class="carousel-item" draggable="false" data-astro-cid-wrjmq7iw> <img${addAttribute(room.featuredPhotoSrc, "src")}${addAttribute(room.data.nameDisplay, "alt")} loading="lazy" draggable="false" data-astro-cid-wrjmq7iw> <div class="carousel-overlay" data-astro-cid-wrjmq7iw> <div class="text-content" data-astro-cid-wrjmq7iw> ${showName && renderTemplate`<h3 class="room-name" data-astro-cid-wrjmq7iw>${room.data.nameDisplay}</h3>`} ${showPunchline && renderTemplate`<p class="room-punchline" data-astro-cid-wrjmq7iw>${room.data.punchline}</p>`} </div> </div> </a>`)} </div> </div> </section>  ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/CarouselRooms.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/CarouselRooms.astro", void 0);

const $$CarouselDetails = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CarouselDetails;
  const {
    height = "35vh",
    speed = 4e4,
    background = "transparent",
    spacing = "1rem",
    photos = []
  } = Astro2.props;
  const validPhotos = (photos || []).filter(
    (p) => p != null
  ).filter((p) => p.image).map((p) => ({ src: p.image || "", alt: p.alt || "" }));
  const duplicatedPhotos = [...validPhotos, ...validPhotos];
  return renderTemplate`${maybeRenderHead()}<section class="carousel-details"${addAttribute(`background-color: ${background};`, "style")} data-astro-cid-hiqi72au> <div class="carousel-track-container"${addAttribute(`height: ${height};`, "style")} data-astro-cid-hiqi72au> <div id="track-details" class="carousel-track"${addAttribute(`--spacing: ${spacing}; --speed: ${speed}ms;`, "style")} data-astro-cid-hiqi72au> ${duplicatedPhotos.map((photo) => renderTemplate`<div class="carousel-item" data-astro-cid-hiqi72au> <img${addAttribute(photo.src, "src")}${addAttribute(photo.alt, "alt")} loading="lazy" draggable="false" data-astro-cid-hiqi72au> </div>`)} </div> </div> </section>  ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/CarouselDetails.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/CarouselDetails.astro", void 0);

const $$LayoutRooms = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LayoutRooms;
  const { room, alternateUrls } = Astro2.props;
  const { data } = room;
  const { Content } = await renderEntry(room);
  const normalizedPhotos = (data.photos || []).map((photo) => ({
    image: photo?.image || "",
    alt: photo?.alt || ""
  }));
  const choiceLabels = {
    it: "Scopri la camera",
    fr: "Découvrez la chambre",
    en: "Discover the room"
  };
  const areaLabels = {
    it: "Superficie",
    fr: "Superficie",
    en: "Area"
  };
  const bookingLabels = {
    it: "Verifica Prezzo e Disponibilità",
    fr: "Vérifier le prix et la disponibilité",
    en: "Check Price and Availability"
  };
  const regionLabels = {
    it: "sardegna",
    fr: "sardaigne",
    en: "sardinia"
  };
  areaLabels[data.lang];
  const choiceLabel = choiceLabels[data.lang];
  const bookingLabel = bookingLabels[data.lang];
  data.roomId || "";
  const lang = data.lang || "it";
  const region = regionLabels[lang];
  const amenities = [data.amenity1, data.amenity2, data.amenity3].filter(Boolean);
  const roomData = {
    amenities
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": data.title, "lang": data.lang, "seoSlug": data.seoSlug, "metaTitle": data.metaTitle, "metaDescription": data.metaDescription || data.punchline, "ogImage": data.ogImage ? typeof data.ogImage === "string" ? data.ogImage : data.ogImage.image : data.featuredPhoto?.image, "jsonType": data.jsonType || "hotelRoom", "roomData": roomData, "alternateUrls": alternateUrls, "data-astro-cid-ck3hghmc": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-ck3hghmc> <!-- Informations et contenu de la chambre --> <section class="room-info" data-astro-cid-ck3hghmc> <div class="room-container" data-astro-cid-ck3hghmc> <p class="text-gray-500 font-serif text-center -mb-4" data-astro-cid-ck3hghmc>${choiceLabel}</p> <h1 data-astro-cid-ck3hghmc>${data.nameDisplay}</h1> <!-- Specs en colonne --> <div class="room-specs" data-astro-cid-ck3hghmc> ${data.amenity1 && renderTemplate`<div class="spec-item" data-astro-cid-ck3hghmc> <span class="spec-label" data-astro-cid-ck3hghmc>${data.amenity1}</span> </div>`} ${data.amenity2 && renderTemplate`<div class="spec-item" data-astro-cid-ck3hghmc> <span class="spec-label" data-astro-cid-ck3hghmc>${data.amenity2}</span> </div>`} ${data.amenity3 && renderTemplate`<div class="spec-item" data-astro-cid-ck3hghmc> <span class="spec-label" data-astro-cid-ck3hghmc>${data.amenity3}</span> </div>`} </div> <div class="room-cta" data-astro-cid-ck3hghmc> <a${addAttribute(`https://www.bed-and-breakfast.it/${lang}/booking/${region}/limolo-house-56-green-cabras/57031`, "href")} class="btn-prenota" target="_blank" rel="noopener noreferrer" data-astro-cid-ck3hghmc> ${bookingLabel} </a> </div> <!-- Slider avec toutes les photos --> ${renderComponent($$result2, "CarouselDetails", $$CarouselDetails, { "photos": normalizedPhotos, "roomName": data.nameDisplay, "height": "250px", "speed": 3e4, "data-astro-cid-ck3hghmc": true })} <!-- Description de la chambre --> <div class="room-content" data-astro-cid-ck3hghmc> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-ck3hghmc": true })} </div> </div> </section> </main> <h2 data-astro-cid-ck3hghmc> ${data.lang === "it" ? "Le altre camere" : data.lang === "fr" ? "Les autres chambres" : "Other Rooms"} </h2> ${renderComponent($$result2, "CarouselRooms", $$CarouselRooms, { "lang": data.lang, "height": "35vh", "speed": 8e4, "background": "var(--color-bg-body)", "excludeId": room.id, "data-astro-cid-ck3hghmc": true })} ${renderComponent($$result2, "ActionBar", $$ActionBar, { "roomId": data.roomId, "data-astro-cid-ck3hghmc": true })} ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/layouts/LayoutRooms.astro", void 0);

const $$LayoutFaq = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LayoutFaq;
  const { faq, alternateUrls } = Astro2.props;
  const { data } = faq;
  const { Content } = await renderEntry(faq);
  const pageTitle = data.question;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "lang": data.lang, "metaTitle": data.metaTitle, "metaDescription": data.metaDescription, "ogImage": data.ogImage, "jsonType": data.jsonType || "faq", "alternateUrls": alternateUrls, "data-astro-cid-ri2cdo2f": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="faq-page" data-astro-cid-ri2cdo2f> <article class="faq-container" data-astro-cid-ri2cdo2f> <header class="faq-header" data-astro-cid-ri2cdo2f> <span class="faq-category" data-astro-cid-ri2cdo2f>${data.category}</span> <h1 class="faq-question" data-astro-cid-ri2cdo2f>${data.question}</h1> </header> <div class="faq-content" data-astro-cid-ri2cdo2f> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-ri2cdo2f": true })} </div> </article> </main> ` })}`;
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
  const [articles, services, faq, landingPages] = await Promise.all([
    getCollection("articles"),
    getCollection("services"),
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
    const serviceSlug = route.split("/").pop();
    entry = services.find((r) => {
      const cleanSlug = (r.data.seoSlug || r.id.split("/").pop())?.replace(/^\/|\/$/g, "");
      if (r.data.lang !== lang) return false;
      if (route.startsWith("services/")) return cleanSlug === serviceSlug;
      return false;
    });
    type = entry ? "room" : null;
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
      services,
      faq,
      categories: allCategories
    });
  }
  return renderTemplate`${entryType === "article" && renderTemplate`${renderComponent($$result, "LayoutBlog", $$LayoutBlog, { "title": entryData.data.title, "h1Title": entryData.data.h1Title, "category": entryData.data.category, "publishDate": entryData.data.publishDate, "excerpt": entryData.data.excerpt, "lang": entryLang, "ogImage": entryData.data.ogImage, "metaTitle": entryData.data.metaTitle, "metaDescription": entryData.data.metaDescription, "featuredPhoto": entryData.data.featuredPhoto, "alternateUrls": alternateUrls }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "ContentComponent", ContentComponent, {})}` })}`}${entryType === "page" && renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": entryData.data.title, "lang": entryLang, "metaTitle": entryData.data.metaTitle, "metaDescription": entryData.data.metaDescription, "ogImage": entryData.data.ogImage, "jsonType": entryData.data.jsonType, "alternateUrls": alternateUrls, "isHomepage": pathname === "" || pathname.match(/^(fr|en)$/) }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "ContentComponent", ContentComponent, {})}` })}`}${entryType === "landing-page" && renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": entryData.data.title, "lang": entryLang, "metaTitle": entryData.data.metaTitle, "metaDescription": entryData.data.metaDescription, "ogImage": entryData.data.ogImage, "jsonType": entryData.data.jsonType, "alternateUrls": alternateUrls }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "ContentComponent", ContentComponent, {})}` })}`}${entryType === "room" && renderTemplate`${renderComponent($$result, "LayoutRooms", $$LayoutRooms, { "room": entryData, "lang": entryLang, "alternateUrls": alternateUrls })}`}${entryType === "faq" && renderTemplate`${renderComponent($$result, "LayoutFaq", $$LayoutFaq, { "faq": entryData, "lang": entryLang, "alternateUrls": alternateUrls })}`}`;
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
