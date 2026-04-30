import { c as createComponent } from './astro-component_ChN6-B7k.mjs';
import 'piccolore';
import { d as renderTemplate, f as defineScriptVars, e as addAttribute, m as maybeRenderHead } from './server_D9jb-1hQ.mjs';
import 'clsx';
import { g as getCollection, a as getEntry } from './_astro_content_C_ZjLvp6.mjs';

const blogTranslations = {
  it: {
    cta: "Leggere",
    search: "Cerca",
    searchPlaceholder: "Cerca un articolo...",
    categories: "Categorie",
    allCategories: "Tutte",
    noResults: "Nessun articolo trovato.",
    categoryLabels: {
      "green-events": "Eventi Green",
      "eco-stay": "Soggiorno eco",
      sustainability: "Sostenibilità",
      territory: "Territorio"
    }
  },
  fr: {
    cta: "Lire",
    search: "Rechercher",
    searchPlaceholder: "Rechercher un article...",
    categories: "Catégories",
    allCategories: "Toutes",
    noResults: "Aucun article trouvé.",
    categoryLabels: {
      "green-events": "Événements Verts",
      "eco-stay": "Séjour éco",
      sustainability: "Durabilité",
      territory: "Territoire"
    }
  },
  en: {
    cta: "Read",
    search: "Search",
    searchPlaceholder: "Search an article...",
    categories: "Categories",
    allCategories: "All",
    noResults: "No article found.",
    categoryLabels: {
      "green-events": "Green Events",
      "eco-stay": "Eco Stay",
      sustainability: "Sustainability",
      territory: "Territory"
    }
  }
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Blog;
  const { lang = "it", fullBleed = false } = Astro2.props;
  const validLang = lang === "fr" || lang === "en" ? lang : "it";
  const t = blogTranslations[validLang];
  const allArticles = await getCollection("articles", ({ data }) => data.lang === validLang);
  const sortedArticles = allArticles.sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );
  const categorySlugs = new Set(
    sortedArticles.map((article) => article.data.category).filter((cat) => typeof cat === "string" && !!cat)
  );
  const categoriesEntries = await Promise.all(
    Array.from(categorySlugs).map((slug) => getEntry("category", slug))
  );
  const categoriesMap = new Map(
    categoriesEntries.filter(
      (entry) => !!entry
    ).map((entry) => [entry.id || entry.slug, entry])
  );
  const tagSlugs = /* @__PURE__ */ new Set();
  sortedArticles.forEach((article) => {
    const tags = article.data.tags ?? [];
    tags.forEach((tagSlug) => {
      if (typeof tagSlug === "string" && tagSlug) tagSlugs.add(tagSlug);
    });
  });
  const tagsEntries = await Promise.all(Array.from(tagSlugs).map((slug) => getEntry("tags", slug)));
  const tagsMap = new Map(
    tagsEntries.filter(
      (entry) => !!entry
    ).map((entry) => [entry.id || entry.slug, entry])
  );
  const articlesData = sortedArticles.map((article) => {
    const { title, publishDate, seoSlug, featuredPhoto, category } = article.data;
    const tags = article.data.tags ?? [];
    const rawSlug = seoSlug || article.id.split("/").pop() || "article";
    const cleanSlug = rawSlug.replace(/^\/|\/$/g, "");
    let displayCategory = "Uncategorized";
    let categorySlug = "";
    if (category && typeof category === "string") {
      const catEntry = categoriesMap.get(category);
      if (catEntry) {
        displayCategory = catEntry.data[`name_${validLang}`] || catEntry.data.name_it || category;
        categorySlug = catEntry.data[`slug_${validLang}`] || catEntry.data.slug_it || category;
      }
    }
    const resourcesSegment = validLang === "fr" ? "ressources" : "resources";
    const permalink = validLang === "fr" ? `/${resourcesSegment}/${categorySlug || "uncategorized"}/${cleanSlug}` : `/${validLang}/${resourcesSegment}/${categorySlug || "uncategorized"}/${cleanSlug}`;
    const displayTags = tags.map((tagSlug) => {
      if (typeof tagSlug !== "string") return null;
      const tagEntry = tagsMap.get(tagSlug);
      return tagEntry?.data[`name_${validLang}`] || tagEntry?.data.name_it || tagSlug;
    }).filter(Boolean);
    const rawTags = tags.filter((t2) => typeof t2 === "string");
    let photoSrc = null;
    let photoAlt = title;
    if (typeof featuredPhoto === "string" && featuredPhoto) {
      photoSrc = featuredPhoto;
    } else if (featuredPhoto && typeof featuredPhoto === "object" && "image" in featuredPhoto) {
      photoSrc = featuredPhoto.image || null;
      photoAlt = featuredPhoto.alt || title;
    }
    return {
      title,
      permalink,
      displayCategory,
      categorySlug,
      displayTags,
      pubDate: publishDate,
      photoSrc,
      photoAlt,
      rawTags
    };
  });
  const categoriesForFilter = Array.from(categorySlugs);
  const tagsForFilter = Array.from(tagSlugs).sort();
  return renderTemplate(_a || (_a = __template(["", "<div", ' data-astro-cid-b4mpjmb3> <div class="flex flex-col justify-between lg:flex-row gap-4" data-astro-cid-b4mpjmb3> <aside class="lg:w-50 lg:order-2 space-y-10 lg:sticky lg:top-40 lg:self-start" data-astro-cid-b4mpjmb3> <div class="search-box" data-astro-cid-b4mpjmb3> <h4 class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2" data-astro-cid-b4mpjmb3> ', ' </h4> <input type="text" id="search-input"', ' class="w-full border-b border-gray-300 py-1 focus:border-limolo-green outline-none bg-transparent text-sm transition-colors" data-astro-cid-b4mpjmb3> </div> <div class="categories-box" data-astro-cid-b4mpjmb3> <h4 class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4" data-astro-cid-b4mpjmb3> ', ' </h4> <div class="flex flex-col gap-2" data-astro-cid-b4mpjmb3> <button class="filter-cat active text-left text-sm hover:text-limolo-green transition-colors font-bold text-limolo-green" data-category="all" data-astro-cid-b4mpjmb3> ', " </button> ", ' </div> </div> <div class="tags-box" data-astro-cid-b4mpjmb3> <h4 class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4" data-astro-cid-b4mpjmb3>Tags</h4> <div class="flex flex-wrap gap-2" data-astro-cid-b4mpjmb3> ', ' </div> </div> </aside> <main class="lg:flex-1 lg:order-1 max-w-full" data-astro-cid-b4mpjmb3> <div class="grid grid-cols-4 gap-4" id="blog-grid" data-astro-cid-b4mpjmb3> ', ' </div> <div id="no-results" class="hidden text-center py-20 text-gray-400 font-serif italic text-xl" data-astro-cid-b4mpjmb3> ', " </div> </main> </div> </div>  <script>(function(){", "\n  const searchInput = document.getElementById('search-input');\n  const blogGrid = document.getElementById('blog-grid');\n  const noResults = document.getElementById('no-results');\n  const articleCards = document.querySelectorAll('.article-card');\n  const filterCatButtons = document.querySelectorAll('.filter-cat');\n  const filterCatLinks = document.querySelectorAll('.filter-cat-link');\n  const filterTagButtons = document.querySelectorAll('.filter-tag');\n\n  let activeCategory = 'all';\n  let activeTags = [];\n\n  function filterArticles() {\n    let visibleCount = 0;\n\n    articleCards.forEach((card) => {\n      const cardEl = /** @type {HTMLElement} */ (card);\n      const cardCat = cardEl.dataset.cat?.toLowerCase() || '';\n      const cardTitle = cardEl.dataset.title?.toLowerCase() || '';\n      const cardTagsStr = cardEl.dataset.tags || '[]';\n      const cardTags = JSON.parse(cardTagsStr);\n\n      const searchValue = searchInput?.value.toLowerCase() || '';\n\n      const catMatch = activeCategory === 'all' || cardCat === activeCategory;\n      const tagMatch = activeTags.length === 0 || activeTags.some((tag) => cardTags.includes(tag));\n      const searchMatch = searchValue === '' || cardTitle.includes(searchValue);\n\n      if (catMatch && tagMatch && searchMatch) {\n        cardEl.style.display = 'block';\n        visibleCount++;\n      } else {\n        cardEl.style.display = 'none';\n      }\n    });\n\n    if (visibleCount === 0) {\n      noResults?.classList.remove('hidden');\n      blogGrid?.classList.add('hidden');\n    } else {\n      noResults?.classList.add('hidden');\n      blogGrid?.classList.remove('hidden');\n    }\n  }\n\n  searchInput?.addEventListener('input', filterArticles);\n\n  filterCatButtons.forEach((btn) => {\n    btn.addEventListener('click', () => {\n      activeCategory = btn.dataset.category?.toLowerCase() || 'all';\n\n      filterCatButtons.forEach((b) => {\n        b.classList.remove('active', 'font-bold', 'text-limolo-green');\n        b.classList.add('text-gray-500');\n      });\n\n      btn.classList.add('active', 'font-bold', 'text-limolo-green');\n      btn.classList.remove('text-gray-500');\n\n      filterArticles();\n    });\n  });\n\n  filterCatLinks.forEach((link) => {\n    link.addEventListener('click', (e) => {\n      e.preventDefault();\n      activeCategory = link.dataset.category?.toLowerCase() || 'all';\n\n      filterCatButtons.forEach((b) => {\n        b.classList.remove('active', 'font-bold', 'text-limolo-green');\n        b.classList.add('text-gray-500');\n      });\n\n      const matchingBtn = Array.from(filterCatButtons).find(\n        (b) => (b.dataset.category?.toLowerCase() || 'all') === activeCategory\n      );\n      if (matchingBtn) {\n        matchingBtn.classList.add('active', 'font-bold', 'text-limolo-green');\n        matchingBtn.classList.remove('text-gray-500');\n      }\n\n      filterArticles();\n      window.scrollTo({ top: 0, behavior: 'smooth' });\n    });\n  });\n\n  filterTagButtons.forEach((btn) => {\n    btn.addEventListener('click', () => {\n      const tag = btn.dataset.tag || '';\n\n      if (activeTags.includes(tag)) {\n        activeTags = activeTags.filter((t) => t !== tag);\n        btn.classList.remove('border-limolo-green', 'text-limolo-green', 'bg-limolo-green/5');\n        btn.classList.add('border-gray-200', 'text-gray-500');\n      } else {\n        activeTags.push(tag);\n        btn.classList.add('border-limolo-green', 'text-limolo-green', 'bg-limolo-green/5');\n        btn.classList.remove('border-gray-200', 'text-gray-500');\n      }\n\n      filterArticles();\n    });\n  });\n})();<\/script>"])), maybeRenderHead(), addAttribute(`blog-container blog-full-width-breakout py-6 ${fullBleed ? "fullbleed px-[3vw]" : ""}`, "class"), t.search, addAttribute(t.searchPlaceholder, "placeholder"), t.categories, t.allCategories, categoriesForFilter.map((slug) => {
    const cat = categoriesMap.get(slug);
    if (!cat) return null;
    const localizedName = cat.data[`name_${validLang}`] || cat.data.name_it;
    const localizedSlug = cat.data[`slug_${validLang}`] || cat.data.slug_it;
    return renderTemplate`<button class="filter-cat text-left text-sm text-gray-500 hover:text-limolo-green transition-colors"${addAttribute(localizedSlug, "data-category")} data-astro-cid-b4mpjmb3> ${localizedName} </button>`;
  }), tagsForFilter.map((slug) => {
    const tag = tagsMap.get(slug);
    if (!tag) return null;
    const localizedName = tag.data[`name_${validLang}`] || tag.data.name_it;
    const localizedSlug = tag.data[`slug_${validLang}`] || tag.data.slug_it;
    return renderTemplate`<button class="filter-tag px-3 py-1 rounded-full text-[10px] border border-gray-200 text-gray-500 hover:border-limolo-green hover:text-limolo-green transition-all"${addAttribute(localizedSlug, "data-tag")} data-astro-cid-b4mpjmb3>
#${localizedName} </button>`;
  }), articlesData.map((article) => {
    const {
      title,
      permalink,
      displayCategory,
      categorySlug,
      displayTags,
      pubDate,
      photoSrc,
      photoAlt,
      rawTags
    } = article;
    return renderTemplate`<div class="article-card group flex flex-col border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"${addAttribute(categorySlug, "data-cat")}${addAttribute(JSON.stringify(rawTags), "data-tags")}${addAttribute(title.toLowerCase(), "data-title")} data-astro-cid-b4mpjmb3>  <div class="relative w-full aspect-16/10 shadow-sm bg-gray-100 overflow-hidden flex-shrink-0" data-astro-cid-b4mpjmb3> <div class="absolute top-0 left-0 z-20" data-astro-cid-b4mpjmb3> <div class="bg-limolo-brand backdrop-blur-sm px-2 pb-1 rounded-md shadow-sm" data-astro-cid-b4mpjmb3> <span class="text-[10px] font-bold uppercase tracking-tighter text-white" data-astro-cid-b4mpjmb3> ${new Date(pubDate).toLocaleDateString(
      validLang === "it" ? "it-IT" : validLang === "fr" ? "fr-FR" : "en-US",
      { day: "2-digit", month: "short", year: "numeric" }
    )} </span> </div> </div> <a${addAttribute(permalink, "href")} data-astro-cid-b4mpjmb3> ${photoSrc ? renderTemplate`<img${addAttribute(photoSrc, "src")}${addAttribute(photoAlt, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-astro-cid-b4mpjmb3>` : renderTemplate`<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs" data-astro-cid-b4mpjmb3>
Pas d'image
</div>`} </a> </div>  <div class="flex flex-col items-start justify-between flex-1 p-3" data-astro-cid-b4mpjmb3> <div class="w-full" data-astro-cid-b4mpjmb3> ${displayCategory !== "Uncategorized" && renderTemplate`<button class="filter-cat-link text-[10px] mb-1 uppercase tracking-[0.2em] font-bold text-limolo-green hover:text-limolo-accent transition-colors"${addAttribute(displayCategory.toLowerCase(), "data-category")} data-astro-cid-b4mpjmb3> ${displayCategory} </button>`} <a${addAttribute(permalink, "href")} class="block group w-full" data-astro-cid-b4mpjmb3> <h3 class="text-sm m-0 font-serif text-limolo-green leading-tight group-hover:text-limolo-accent transition-colors line-clamp-4" data-astro-cid-b4mpjmb3> ${title} </h3> </a> </div> <a${addAttribute(permalink, "href")} class="inline-flex items-center mt-2 text-[11px] font-bold uppercase tracking-widest text-limolo-earth group-hover:translate-x-2 transition-transform duration-300" data-astro-cid-b4mpjmb3> ${t.cta} <span class="ml-2 text-lg" data-astro-cid-b4mpjmb3>→</span> </a> </div> </div>`;
  }), t.noResults, defineScriptVars({ lang: validLang }));
}, "/Users/bluecells/Websites/all-leaders/src/components/Blog.astro", void 0);

export { $$Blog as $ };
