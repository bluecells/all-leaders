import { c as createComponent } from './astro-component_EQTw1nHg.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from './server_CPScTQ3A.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_DxFwZnBy.mjs';
import { g as getCollection } from './_astro_content_BH4DgGZB.mjs';

const $$Seo = createComponent(async ($$result, $$props, $$slots) => {
  const [articles, landingPages, services, faq] = await Promise.all([
    getCollection("articles"),
    getCollection("landing-pages"),
    getCollection("services"),
    getCollection("faq")
  ]);
  const getTitle = (data) => {
    if ("title" in data && typeof data.title === "string") return data.title;
    if ("nameDisplay" in data && typeof data.nameDisplay === "string") return data.nameDisplay;
    if ("question" in data && typeof data.question === "string") return data.question;
    return "N/A";
  };
  const getCategory = (data) => {
    if ("category" in data && typeof data.category === "string") return data.category;
    return "";
  };
  const getMetaTitleClass = (text) => {
    if (text.includes("❌")) {
      return { className: "highlight-red", displayText: text };
    }
    const len = text.length;
    if (len > 60) {
      return { className: "highlight-red-bright", displayText: `${text} (${len})` };
    }
    if (len < 40 || len > 60) {
      return { className: "highlight-yellow", displayText: `${text} (${len})` };
    }
    return { className: "highlight-green", displayText: `${text} (${len})` };
  };
  const getMetaDescriptionClass = (text) => {
    if (text.includes("❌")) {
      return { className: "highlight-red", displayText: text };
    }
    const len = text.length;
    if (len > 155) {
      return { className: "highlight-red-bright", displayText: `${text} (${len})` };
    }
    if (len < 122 || len > 155) {
      return { className: "highlight-yellow", displayText: `${text} (${len})` };
    }
    return { className: "highlight-green", displayText: `${text} (${len})` };
  };
  const getSeoStatus = (metaTitle, metaDescription) => {
    if (metaTitle.includes("❌") || metaDescription.includes("❌")) {
      return "incomplete";
    }
    const titleLen = metaTitle.length;
    if (titleLen < 40 || titleLen > 60) {
      return "partial";
    }
    const descLen = metaDescription.length;
    if (descLen < 122 || descLen > 155) {
      return "partial";
    }
    return "complete";
  };
  const allEntries = [
    ...articles.map((e) => ({ ...e, type: "Article" })),
    ...landingPages.map((e) => ({ ...e, type: "Page" })),
    ...services.map((e) => ({ ...e, type: "Room" })),
    ...faq.map((e) => ({ ...e, type: "FAQ" }))
  ].map((entry) => {
    const lang = entry.data.lang || "it";
    const seoSlug = entry.data.seoSlug;
    const metaTitle = entry.data.metaTitle;
    const metaDescription = entry.data.metaDescription;
    const cleanSlug = (seoSlug || entry.id.split("/").pop())?.replace(/^\/|\/$/g, "");
    let finalPath = "";
    if (entry.type === "Article") {
      const category = getCategory(entry.data);
      const resourcesSegment = lang === "fr" ? "ressources" : "resources";
      finalPath = lang === "fr" ? `/${resourcesSegment}/${category}/${cleanSlug}` : `/${lang}/${resourcesSegment}/${category}/${cleanSlug}`;
    } else if (entry.type === "Room") {
      finalPath = lang === "fr" ? `/services/${cleanSlug}` : `/${lang}/services/${cleanSlug}`;
    } else if (entry.type === "Page") {
      finalPath = lang === "fr" ? `/${cleanSlug}` : `/${lang}/${cleanSlug}`;
    } else if (entry.type === "FAQ") {
      finalPath = lang === "fr" ? `/faq/${cleanSlug}` : `/${lang}/faq/${cleanSlug}`;
    }
    finalPath = finalPath.replace(/\/+/g, "/");
    const metaTitleText = metaTitle || "❌ Mancante";
    const metaDescriptionText = metaDescription || "❌ Mancante";
    const metaTitleHighlight = getMetaTitleClass(metaTitleText);
    const metaDescriptionHighlight = getMetaDescriptionClass(metaDescriptionText);
    const seoStatus = getSeoStatus(metaTitleText, metaDescriptionText);
    return {
      lang,
      type: entry.type,
      title: getTitle(entry.data),
      metaTitle: metaTitleText,
      metaTitleClass: metaTitleHighlight.className,
      metaTitleDisplay: metaTitleHighlight.displayText,
      metaDescription: metaDescriptionText,
      metaDescriptionClass: metaDescriptionHighlight.className,
      metaDescriptionDisplay: metaDescriptionHighlight.displayText,
      seoStatus,
      computedRoute: finalPath || "/",
      filePath: entry.id
    };
  });
  allEntries.sort((a, b) => a.lang.localeCompare(b.lang) || a.type.localeCompare(b.type));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Audit SEO - Toutes les pages", "data-astro-cid-jpmhsr4c": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main style="padding: 2rem; font-family: sans-serif;" data-astro-cid-jpmhsr4c> <h1 data-astro-cid-jpmhsr4c>Audit SEO delle collezioni</h1> <!-- FILTRES ÉVOLUÉS (COMPACTS) --> <div id="filters" style="background: #f9f9f9; padding: 0.75rem; border-radius: 6px; margin-bottom: 1.5rem; border: 1px solid #ddd; font-size: 0.85rem;" data-astro-cid-jpmhsr4c> <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;" data-astro-cid-jpmhsr4c> <!-- Filtre Langue --> <select id="filterLang" style="padding: 0.35rem 0.5rem; border: 1px solid #ccc; border-radius: 3px; font-size: 0.85rem;" data-astro-cid-jpmhsr4c> <option value="" data-astro-cid-jpmhsr4c>Lingua</option> <option value="it" data-astro-cid-jpmhsr4c>🇮🇹 IT</option> <option value="fr" data-astro-cid-jpmhsr4c>🇫🇷 FR</option> <option value="en" data-astro-cid-jpmhsr4c>🇬🇧 EN</option> </select> <!-- Filtre Type --> <select id="filterType" style="padding: 0.35rem 0.5rem; border: 1px solid #ccc; border-radius: 3px; font-size: 0.85rem;" data-astro-cid-jpmhsr4c> <option value="" data-astro-cid-jpmhsr4c>Tipo</option> <option value="Article" data-astro-cid-jpmhsr4c>Articolo</option> <option value="Page" data-astro-cid-jpmhsr4c>Page</option> <option value="Room" data-astro-cid-jpmhsr4c>Room</option> <option value="FAQ" data-astro-cid-jpmhsr4c>FAQ</option> </select> <!-- Filtre État SEO --> <select id="filterSeo" style="padding: 0.35rem 0.5rem; border: 1px solid #ccc; border-radius: 3px; font-size: 0.85rem;" data-astro-cid-jpmhsr4c> <option value="" data-astro-cid-jpmhsr4c>Status SEO</option> <option value="complete" data-astro-cid-jpmhsr4c>✅ Complet</option> <option value="partial" data-astro-cid-jpmhsr4c>⚠️ Parziale</option> <option value="incomplete" data-astro-cid-jpmhsr4c>❌ Mancante</option> </select> <!-- Recherche Texte --> <input type="text" id="filterSearch" placeholder="Rechercher..." style="padding: 0.35rem 0.5rem; border: 1px solid #ccc; border-radius: 3px; font-size: 0.85rem; min-width: 150px;" data-astro-cid-jpmhsr4c> <!-- Bouton Réinitialiser --> <button id="resetFilters" style="padding: 0.35rem 0.75rem; color: white; border: none; border-radius: 3px; cursor: pointer; font-weight: bold; font-size: 1.4rem;" data-astro-cid-jpmhsr4c>
🔄
</button> <!-- Compteur --> <span style="margin-left: auto; color: #666; font-size: 0.8rem;" data-astro-cid-jpmhsr4c> <strong id="visibleCount" data-astro-cid-jpmhsr4c>${allEntries.length}</strong> / ${allEntries.length} items
</span> </div> <!-- LEGENDE --> <div class="flex gap-4 mt-2" data-astro-cid-jpmhsr4c> <span class="" data-astro-cid-jpmhsr4c><b data-astro-cid-jpmhsr4c>Codici colore</b></span> <span class="highlight-yellow" data-astro-cid-jpmhsr4c>troppo corto</span> <span class="highlight-green" data-astro-cid-jpmhsr4c>ottimale</span> <span class="highlight-red" data-astro-cid-jpmhsr4c>troppo lungo</span> </div> </div> <!-- TABLE --> <div class="full-bleed text-xs" style="overflow-x: auto;" data-astro-cid-jpmhsr4c> <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;" id="seoTable" data-astro-cid-jpmhsr4c> <thead data-astro-cid-jpmhsr4c> <tr style="background: #f4f4f4;" data-astro-cid-jpmhsr4c> <th style="padding: 6px; min-width:60px; cursor: pointer;" data-sort="lang" data-astro-cid-jpmhsr4c>Ling ▼</th> <th style="padding: 6px; min-width:60px; cursor: pointer;" data-sort="type" data-astro-cid-jpmhsr4c>Tipo ▼</th> <th style="padding: 6px; cursor: pointer;" data-sort="title" data-astro-cid-jpmhsr4c>Titre Page ▼</th> <th style="padding: 6px; cursor: default;" data-astro-cid-jpmhsr4c>Meta Title (40-60 car.)</th> <th style="padding: 6px;" data-astro-cid-jpmhsr4c>Meta Description (122-155 car.)</th> <th style="padding: 6px;" data-astro-cid-jpmhsr4c>URL Finale</th> </tr> </thead> <tbody id="tableBody" data-astro-cid-jpmhsr4c> ${allEntries.map((item) => renderTemplate`<tr class="table-row"${addAttribute(item.lang, "data-lang")}${addAttribute(item.type, "data-type")}${addAttribute(item.seoStatus, "data-seo")}${addAttribute(item.title, "data-title")}${addAttribute(item.computedRoute, "data-url")} data-astro-cid-jpmhsr4c> <td style="padding: 6px;" data-astro-cid-jpmhsr4c> <code data-astro-cid-jpmhsr4c>${item.lang}</code> </td> <td style="padding: 6px;" data-astro-cid-jpmhsr4c>${item.type}</td> <td style="padding: 6px;" data-astro-cid-jpmhsr4c>${item.title}</td> <td style="padding: 6px;" data-astro-cid-jpmhsr4c> <span${addAttribute(item.metaTitleClass, "class")} data-astro-cid-jpmhsr4c>${item.metaTitleDisplay}</span> </td> <td style="padding: 6px; max-width: 500px;" data-astro-cid-jpmhsr4c> <span${addAttribute(item.metaDescriptionClass, "class")} data-astro-cid-jpmhsr4c>${item.metaDescriptionDisplay}</span> </td> <td style="padding: 6px;" data-astro-cid-jpmhsr4c> <a${addAttribute(item.computedRoute, "href")} target="_blank" style="color: #007bff; text-decoration: none; font-size:smaller;" data-astro-cid-jpmhsr4c> <code data-astro-cid-jpmhsr4c>${item.computedRoute}</code> </a> </td> </tr>`)} </tbody> </table> </div> </main> ${renderScript($$result2, "/Users/bluecells/Websites/all-leaders/src/pages/admin/seo.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/admin/seo.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/admin/seo.astro";
const $$url = "/admin/seo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Seo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
