import { c as createComponent } from './astro-component_dd-MAECy.mjs';
import 'piccolore';
import { d as renderTemplate, g as defineScriptVars, e as addAttribute, m as maybeRenderHead } from './server_Dx_l8faJ.mjs';
import 'clsx';
import { g as getCollection, b as getEntry } from './_astro_content_B295nimE.mjs';

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
  const {
    lang = "fr",
    fullBleed = false,
    cardsPerRowMobile = 1,
    cardsPerRowDesktop = 4,
    articlesPerPage = 10
  } = Astro2.props;
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
  return renderTemplate(_a || (_a = __template(["", "<div", '> <div class="flex flex-col justify-between lg:flex-row gap-4"> <aside class="lg:w-50 lg:order-2 space-y-10 lg:sticky lg:top-40 lg:self-start"> <div class="search-box mb-0 text-center"> <h4 class="text-[10px] md:text-left! uppercase tracking-[0.2em] font-bold text-gray-400 mb-2"> ', ' </h4> <input type="text" id="search-input"', ' class="w-full border-b border-gray-300 py-1 focus:border-limolo-green outline-none bg-transparent text-sm transition-colors text-center lg:text-left placeholder:text-center lg:placeholder:text-left"> </div> <div class="categories-box text-center lg:text-left"> <h4 class="text-[10px] md:text-left! uppercase tracking-[0.2em] font-bold text-gray-400 pt-4 mb-4"> ', ' </h4> <div class="flex flex-wrap gap-2 justify-center lg:justify-start"> <button class="filter-cat active category-cloud-item px-3 py-1 rounded-md text-[11px] font-semibold border-2 border-limolo-green text-limolo-green bg-limolo-green/10 transition-all hover:shadow-md" data-category="all"> ', " </button> ", ' </div> </div> <div class="tags-box"> <h4 class="text-[10px] md:text-left! uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">\nTags\n</h4> <div class="flex flex-wrap gap-2"> ', ' </div> </div> </aside> <main class="lg:flex-1 lg:order-1 max-w-full"> <div class="grid gap-4 grid-cols-1 lg:grid-cols-4" id="blog-grid"', "", "", "", "", "> ", ' </div> <div id="no-results" class="hidden text-center py-20 text-gray-400 italic text-xl"> ', " </div> ", ' </main> </div> </div> <!-- Template pour cloner les articles - gardé en DOM pour que Tailwind le voit --> <div id="article-template" style="display: none;"> <div class="article-card group flex flex-col border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"> <div class="relative w-full aspect-16/10 shadow-sm bg-gray-100 overflow-hidden shrink-0"> <div class="absolute top-0 left-0 z-20"> <div class="bg-white/30 backdrop-blur-md backdrop-brightness-170 h-5 leading-none px-4 py-0"> <span class="article-date text-[10px] font-bold uppercase tracking-tighter text-cyan-950"></span> </div> </div> <a href="" class="article-link block w-full h-full"> <img src="" alt="" class="article-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"> </a> </div> <div class="flex flex-col h-full items-center justify-between flex-1"> <div class="w-full"> <button class="filter-cat-link article-category text-[10px] border-b border-b-mist-200 py-1 mb-1 uppercase tracking-[0.2em] font-bold text-center! w-full text-limolo-green hover:text-limolo-accent transition-colors"></button> <div class="flex flex-col items-center justify-center min-h-18"> <a href="" class="block group w-full px-2"> <h3 class="article-title text-[12px] font-base m-0 text-limolo-green leading-tight group-hover:text-limolo-accent transition-colors line-clamp-4"></h3> </a> </div> </div> </div> </div> </div>  <script>(function(){', `
  const searchInput = document.getElementById('search-input');
  const blogGrid = document.getElementById('blog-grid');
  const noResults = document.getElementById('no-results');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const filterCatButtons = document.querySelectorAll('.filter-cat');
  const filterCatLinks = document.querySelectorAll('.filter-cat-link');
  const filterTagButtons = document.querySelectorAll('.filter-tag');

  // Lire les query parameters pour initialiser les filtres
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get('category')?.toLowerCase();

  let activeCategory = categoryFromUrl || 'all';
  let activeTags = [];
  let currentPage = 1;

  // Récupérer les données du grid
  const allArticlesJson = blogGrid?.dataset.articles || '[]';
  const articlesPerPage = parseInt(blogGrid?.dataset.articlesPerPage || '10', 10);
  const allArticles = JSON.parse(allArticlesJson);
  const cardsPerRowMobile = parseInt(blogGrid?.dataset.cardsPerRowMobile || '1', 10);
  const cardsPerRowDesktop = parseInt(blogGrid?.dataset.cardsPerRowDesktop || '4', 10);

  // Si une catégorie est spécifiée dans l'URL, l'appliquer au chargement
  if (categoryFromUrl && categoryFromUrl !== 'all') {
    // Attendre que le DOM soit bien chargé et applique le filtre
    setTimeout(() => {
      // Trouver le bouton correspondant à la catégorie
      const matchingBtn = Array.from(filterCatButtons).find(
        (b) => (b.dataset.category?.toLowerCase() || '') === activeCategory
      );

      if (matchingBtn) {
        // Mettre à jour l'apparence du bouton
        filterCatButtons.forEach((b) => {
          b.classList.remove('active');
          b.classList.add('border-gray-300', 'text-gray-600', 'bg-transparent');
          b.classList.remove('border-limolo-green', 'text-white', 'bg-limolo-green');
        });

        matchingBtn.classList.add('active');
        matchingBtn.classList.add('border-limolo-green', 'text-white', 'bg-limolo-green');
        matchingBtn.classList.remove('border-gray-300', 'text-gray-600', 'bg-transparent');
      }

      // Appliquer le filtre pour afficher les articles correspondants
      filterArticles();
    }, 0);
  }

  function getVisibleArticleCards() {
    return document.querySelectorAll('.article-card');
  }

  function getFilteredArticles() {
    const searchValue = searchInput?.value.toLowerCase() || '';

    return allArticles.filter((article) => {
      const catMatch =
        activeCategory === 'all' || (article.categorySlug?.toLowerCase() || '') === activeCategory;
      const tagMatch =
        activeTags.length === 0 || activeTags.some((tag) => (article.rawTags || []).includes(tag));
      const searchMatch = searchValue === '' || article.title.toLowerCase().includes(searchValue);

      return catMatch && tagMatch && searchMatch;
    });
  }

  function filterArticles() {
    const filteredArticles = getFilteredArticles();
    currentPage = 1;

    // Vider le grid et recharger avec les articles filtrés
    if (blogGrid) {
      blogGrid.innerHTML = '';
    }

    const articlesToDisplay = filteredArticles.slice(0, articlesPerPage);

    if (articlesToDisplay.length === 0) {
      noResults?.classList.remove('hidden');
      blogGrid?.classList.add('hidden');
      if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
      }
      return;
    }

    articlesToDisplay.forEach((article) => {
      const cardFragment = createArticleCard(article);
      if (cardFragment && blogGrid) {
        blogGrid.appendChild(cardFragment);
      }
    });

    setTimeout(() => {
      reattachEventListeners();
      noResults?.classList.add('hidden');
      blogGrid?.classList.remove('hidden');
      updateLoadMoreButton(filteredArticles);
    }, 0);
  }

  function updateLoadMoreButton(filteredArticles) {
    if (loadMoreBtn) {
      const totalCards = getVisibleArticleCards().length;
      const totalFiltered = filteredArticles?.length || allArticles.length;

      // Masquer le bouton si tous les articles filtrés sont chargés en DOM
      if (totalCards >= totalFiltered) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-block';
      }
    }
  }

  function loadMoreArticles() {
    const filteredArticles = getFilteredArticles();
    currentPage++;
    const startIndex = articlesPerPage * (currentPage - 1);
    const endIndex = startIndex + articlesPerPage;
    const articlesToAdd = filteredArticles.slice(startIndex, endIndex);

    if (articlesToAdd.length === 0) {
      updateLoadMoreButton(filteredArticles);
      return;
    }

    articlesToAdd.forEach((article) => {
      const cardFragment = createArticleCard(article);
      if (cardFragment && blogGrid) {
        blogGrid.appendChild(cardFragment);
      }
    });

    // Re-attacher les event listeners pour les nouveaux éléments
    setTimeout(() => {
      reattachEventListeners();
      updateLoadMoreButton(filteredArticles);
    }, 0);
  }

  function createArticleCard(article) {
    const templateDiv = document.getElementById('article-template');
    if (!templateDiv) return null;

    const templateCard = templateDiv.querySelector('.article-card');
    if (!templateCard) return null;

    const clone = templateCard.cloneNode(true);
    if (!clone) return null;

    const cardDiv = clone;
    if (!cardDiv) return null;

    // Remplir les données
    cardDiv.dataset.cat = article.categorySlug;
    cardDiv.dataset.tags = JSON.stringify(article.rawTags);
    cardDiv.dataset.title = article.title.toLowerCase();

    // Date
    const dateStr = new Date(article.pubDate).toLocaleDateString(
      lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'it-IT',
      { day: '2-digit', month: 'short', year: 'numeric' }
    );
    const dateEl = cardDiv.querySelector('.article-date');
    if (dateEl) dateEl.textContent = dateStr;

    // Tous les liens
    const allLinks = cardDiv.querySelectorAll('.article-link');
    allLinks.forEach((link) => {
      link.href = article.permalink;
    });

    // Image
    const imgEl = cardDiv.querySelector('.article-image');
    const imageContainer = imgEl?.parentElement;

    if (imgEl && article.photoSrc) {
      imgEl.src = article.photoSrc;
      imgEl.alt = article.photoAlt;
      imgEl.style.display = 'block';
    } else if (imageContainer) {
      // Remplacer par une div "pas d'image"
      const noImageDiv = document.createElement('div');
      noImageDiv.className =
        'w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs';
      noImageDiv.textContent = "Pas d'image";
      if (imgEl) {
        imgEl.replaceWith(noImageDiv);
      }
    }

    // Catégorie
    const catBtn = cardDiv.querySelector('.article-category');
    if (catBtn && article.displayCategory && article.displayCategory !== 'Uncategorized') {
      catBtn.textContent = article.displayCategory;
      catBtn.dataset.category = article.displayCategory.toLowerCase();
      catBtn.classList.remove('hidden');
    }

    // Titre
    const titleEl = cardDiv.querySelector('.article-title');
    if (titleEl) titleEl.textContent = article.title;

    return cardDiv;
  }

  function reattachEventListeners() {
    const newFilterCatLinks = document.querySelectorAll(
      '.filter-cat-link:not([data-listener-attached])'
    );
    newFilterCatLinks.forEach((link) => {
      link.setAttribute('data-listener-attached', 'true');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkElement = /** @type {HTMLElement} */ (link);
        activeCategory = linkElement.dataset.category?.toLowerCase() || 'all';

        filterCatButtons.forEach((b) => {
          b.classList.remove('active');
          b.classList.add('border-gray-300', 'text-gray-600', 'bg-transparent');
          b.classList.remove('border-limolo-green', 'text-white', 'bg-limolo-green');
        });

        const matchingBtn = Array.from(filterCatButtons).find(
          (b) => (b.dataset.category?.toLowerCase() || 'all') === activeCategory
        );
        if (matchingBtn) {
          matchingBtn.classList.add('active');
          matchingBtn.classList.add('border-limolo-green', 'text-white', 'bg-limolo-green');
          matchingBtn.classList.remove('border-gray-300', 'text-gray-600', 'bg-transparent');
        }

        filterArticles();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  searchInput?.addEventListener('input', filterArticles);

  filterCatButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category?.toLowerCase() || 'all';

      filterCatButtons.forEach((b) => {
        b.classList.remove('active');
        b.classList.add('border-gray-300', 'text-gray-600', 'bg-transparent');
        b.classList.remove('border-limolo-green', 'text-white', 'bg-limolo-green');
      });

      btn.classList.add('active');
      btn.classList.add('border-limolo-green', 'text-white', 'bg-limolo-green');
      btn.classList.remove('border-gray-300', 'text-gray-600', 'bg-transparent');

      filterArticles();
    });
  });

  filterCatLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activeCategory = link.dataset.category?.toLowerCase() || 'all';

      filterCatButtons.forEach((b) => {
        b.classList.remove('active');
        b.classList.add('border-gray-300', 'text-gray-600', 'bg-transparent');
        b.classList.remove('border-limolo-green', 'text-white', 'bg-limolo-green');
      });

      const matchingBtn = Array.from(filterCatButtons).find(
        (b) => (b.dataset.category?.toLowerCase() || 'all') === activeCategory
      );
      if (matchingBtn) {
        matchingBtn.classList.add('active');
        matchingBtn.classList.add('border-limolo-green', 'text-white', 'bg-limolo-green');
        matchingBtn.classList.remove('border-gray-300', 'text-gray-600', 'bg-transparent');
      }

      filterArticles();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  filterTagButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag || '';

      if (activeTags.includes(tag)) {
        activeTags = activeTags.filter((t) => t !== tag);
        btn.classList.remove('border-limolo-green', 'text-limolo-green', 'bg-limolo-green/5');
        btn.classList.add('border-gray-200', 'text-gray-500');
      } else {
        activeTags.push(tag);
        btn.classList.add('border-limolo-green', 'text-limolo-green', 'bg-limolo-green/5');
        btn.classList.remove('border-gray-200', 'text-gray-500');
      }

      filterArticles();
    });
  });

  // Initialiser le bouton "Afficher plus"
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreArticles);
    updateLoadMoreButton(getFilteredArticles());
  }

  // Réattacher les event listeners pour les category links existantes
  reattachEventListeners();
})();<\/script>`])), maybeRenderHead(), addAttribute(`blog-container blog-full-width-breakout py-6 ${fullBleed ? "fullbleed px-[3vw]" : ""}`, "class"), t.search, addAttribute(t.searchPlaceholder, "placeholder"), t.categories, t.allCategories, categoriesForFilter.map((slug) => {
    const cat = categoriesMap.get(slug);
    if (!cat) return null;
    const localizedName = cat.data[`name_${validLang}`] || cat.data.name_it;
    const localizedSlug = cat.data[`slug_${validLang}`] || cat.data.slug_it;
    return renderTemplate`<button class="filter-cat category-cloud-item px-3 py-1 rounded-md text-[11px] font-semibold border-2 border-gray-300 text-gray-600 hover:border-limolo-green hover:text-limolo-green hover:bg-limolo-green/5 transition-all"${addAttribute(localizedSlug, "data-category")}> ${localizedName} </button>`;
  }), tagsForFilter.map((slug) => {
    const tag = tagsMap.get(slug);
    if (!tag) return null;
    const localizedName = tag.data[`name_${validLang}`] || tag.data.name_it;
    const localizedSlug = tag.data[`slug_${validLang}`] || tag.data.slug_it;
    return renderTemplate`<button class="filter-tag px-3 py-1 rounded-md text-[10px] border border-gray-400 text-gray-900 hover:border-limolo-green hover:text-limolo-green transition-all"${addAttribute(localizedSlug, "data-tag")}>
#${localizedName} </button>`;
  }), addAttribute(JSON.stringify(articlesData), "data-articles"), addAttribute(cardsPerRowMobile, "data-cards-per-row-mobile"), addAttribute(cardsPerRowDesktop, "data-cards-per-row-desktop"), addAttribute(articlesPerPage, "data-articles-per-page"), addAttribute(validLang, "data-lang"), articlesData.slice(0, articlesPerPage).map((article) => {
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
    return renderTemplate`<div class="article-card group flex flex-col border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"${addAttribute(categorySlug, "data-cat")}${addAttribute(JSON.stringify(rawTags), "data-tags")}${addAttribute(title.toLowerCase(), "data-title")}>  <div class="relative w-full aspect-16/10 shadow-sm bg-gray-100 overflow-hidden shrink-0"> <div class="absolute top-0 left-0 z-20"> <div class="bg-white/30 backdrop-blur-md backdrop-brightness-170 h-5 leading-none px-4 py-0"> <span class="text-[10px] font-bold uppercase tracking-tighter text-cyan-950"> ${new Date(pubDate).toLocaleDateString(
      validLang === "it" ? "it-IT" : validLang === "fr" ? "fr-FR" : "en-US",
      { day: "2-digit", month: "short", year: "numeric" }
    )} </span> </div> </div> <a${addAttribute(permalink, "href")} class="block w-full h-full"> ${photoSrc ? renderTemplate`<img${addAttribute(photoSrc, "src")}${addAttribute(photoAlt, "alt")} * AJOUT de "brightness-95" pour adoucir très légèrement l'image globale * class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95">` : renderTemplate`<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
Pas d'image
</div>`} </a> </div>  <div class="flex flex-col h-full items-center justify-between flex-1"> <div class="w-full"> ${displayCategory !== "Uncategorized" && renderTemplate`<button class="filter-cat-link text-[10px] border-b border-b-mist-200 py-1 mb-1 uppercase tracking-[0.2em] font-bold text-center! w-full text-limolo-green hover:text-limolo-accent transition-colors"${addAttribute(displayCategory.toLowerCase(), "data-category")}> ${displayCategory} </button>`} <div class="flex flex-col items-center justify-center min-h-18"> <a${addAttribute(permalink, "href")} class="block group w-full px-2"> <h3 class="text-[12px] font-base m-0 text-limolo-green leading-tight group-hover:text-limolo-accent transition-colors line-clamp-4"> ${title} </h3> </a> </div> </div> </div> </div>`;
  }), t.noResults, articlesData.length > articlesPerPage && renderTemplate`<div class="flex justify-center mt-12"> <button id="load-more-btn" class="btn-limolo">
Afficher plus
</button> </div>`, defineScriptVars({ lang: validLang }));
}, "/Users/bluecells/Websites/all-leaders/src/components/Blog.astro", void 0);

export { $$Blog as $ };
