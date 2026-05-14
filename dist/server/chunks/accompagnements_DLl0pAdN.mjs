import { c as createComponent } from './astro-component_U-GUoWAQ.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, c as renderComponent } from './server_hCFoOP83.mjs';
import { $ as $$Layout } from './Layout_CF99BpAH.mjs';
import 'clsx';
import { g as getCollection } from './_astro_content_Bs8dNC3w.mjs';

const $$AccompagnementsGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AccompagnementsGrid;
  const { lang, category, fullBleed = false } = Astro2.props;
  const [allAccompagnements, allCategories] = await Promise.all([
    getCollection("accompagnements"),
    getCollection("accompagnements-categories")
  ]);
  const categoryMap = /* @__PURE__ */ new Map();
  allCategories.forEach((cat) => {
    const name = lang === "fr" ? cat.data.name_fr : cat.data.name_en;
    categoryMap.set(name, {
      order: cat.data.order ?? 999,
      description: lang === "fr" ? cat.data.description_fr : cat.data.description_en,
      slug: lang === "fr" ? cat.data.slug_fr : cat.data.slug_en
    });
  });
  const filteredAccompagnements = allAccompagnements.filter(
    (item) => item.data.lang === lang && (!category || item.data.categorie === category)
  );
  const sortedCategoryNames = [...new Set(filteredAccompagnements.map((item) => item.data.categorie))].sort((a, b) => {
    const orderA = categoryMap.get(a)?.order ?? 999;
    const orderB = categoryMap.get(b)?.order ?? 999;
    return orderB - orderA;
  });
  const getAccompagnementUrl = (item, catSlug) => {
    const itemSlug = lang === "fr" ? item.data.slug_fr : item.data.slug_en;
    return `/accompagnements/${catSlug}/${itemSlug}`;
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(fullBleed ? "" : "mx-auto max-w-4xl px-4", "class")} data-astro-cid-4neesz6s> ${sortedCategoryNames.length > 0 ? sortedCategoryNames.map((catName) => {
    const catData = categoryMap.get(catName);
    const itemsInCategory = filteredAccompagnements.filter((item) => item.data.categorie === catName);
    return renderTemplate`<section class="category-section mb-16"${addAttribute(`category-${catData?.slug}`, "id")} data-astro-cid-4neesz6s> <!-- COLONNE GAUCHE --> <div class="category-left" data-astro-cid-4neesz6s> <h2 class="font-serif text-limolo-green mb-4" data-astro-cid-4neesz6s>${catName}</h2> <p class="category-description" data-astro-cid-4neesz6s>${catData?.description || ""}</p> <a href="#" class="back-to-top-link" data-astro-cid-4neesz6s> ${lang === "fr" ? "Revenir au début" : "Back to top"} <svg class="back-to-top-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-4neesz6s> <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-4neesz6s></path> </svg> </a> </div> <!-- COLONNE DROITE --> <div class="accompagnements-list" data-astro-cid-4neesz6s> ${itemsInCategory.map((item) => renderTemplate`<article class="accompagnement-card-horizontal" data-astro-cid-4neesz6s> <a${addAttribute(getAccompagnementUrl(item, catData?.slug), "href")} class="card-link" data-astro-cid-4neesz6s> <div class="card-image-mini" data-astro-cid-4neesz6s> <img${addAttribute(item.data.image, "src")}${addAttribute(item.data.title, "alt")} loading="lazy" data-astro-cid-4neesz6s> </div> <div${addAttribute(`card-content-mini card-type-${item.data.type}-trans`, "class")} data-astro-cid-4neesz6s> <h3 class="font-serif text-limolo-green" data-astro-cid-4neesz6s> ${item.data.title} </h3> <span class="card-type-tag" data-astro-cid-4neesz6s> <span${addAttribute(`modalite-dot modalite-dot-${item.data.type}`, "class")} data-astro-cid-4neesz6s></span> <span${addAttribute(`card-type-text card-type-text-${item.data.type}`, "class")} data-astro-cid-4neesz6s> ${item.data.type} </span> </span> </div> </a> </article>`)} </div> </section>`;
  }) : renderTemplate`<p class="text-center text-gray-500" data-astro-cid-4neesz6s> ${lang === "fr" ? "Aucun accompagnement trouvé." : "No results found."} </p>`} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/AccompagnementsGrid.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Accompagnements = createComponent(async ($$result, $$props, $$slots) => {
  const modalites = await getCollection("modalites-intervention");
  const sortedModalites = modalites.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  const categorie = await getCollection("accompagnements-categories");
  const sortedCategories = categorie.sort((a, b) => {
    const orderA = a.data.order || 999;
    const orderB = b.data.order || 999;
    return orderB - orderA;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Accompagnements - All Leaders", "metaTitle": "Nos accompagnements - All Leaders Initiative", "metaDescription": "Découvrez nos accompagnements en diagnostic de performance, formation, coaching et conseil.", "lang": "fr", "data-astro-cid-j4cwuawe": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div class="flex flex-col justify-center align-items mx-auto min-h-[83vh]" data-astro-cid-j4cwuawe> <h1 class="mb-8 text-4xl md:text-6xl text-center" data-astro-cid-j4cwuawe>Nos accompagnements</h1> <h2 data-astro-cid-j4cwuawe>Solutions de diagnostic et développement pour vos organisations</h2> <!-- Navigation des catégories d'accompagnements --> <nav class="categories-nav" data-astro-cid-j4cwuawe> <div class="categories-nav-wrapper" data-astro-cid-j4cwuawe> `, ` </div> <div class="arrow-container" data-astro-cid-j4cwuawe> <svg width="100" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j4cwuawe> <path d="M0 50L50 0L100 50Z" fill="#182433" data-astro-cid-j4cwuawe></path> </svg> <div class="arrow-colours" data-astro-cid-j4cwuawe></div> </div> </nav> </div>  <section class="modalites-section" data-astro-cid-j4cwuawe> <h2 class="text-2xl! md:text-4xl font-bold pt-6! md:pt-10!" data-astro-cid-j4cwuawe>4 modalités d'intervention</h2> <div class="modalites-container" data-astro-cid-j4cwuawe> `, " </div> </section>  ", ` <script>
    // Charger GSAP depuis CDN
    Promise.all([
      new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
      }),
      new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
      }),
    ]).then(() => {
      gsap.registerPlugin(ScrollTrigger);
      initAnimation();
    });

    function initAnimation() {
      const navLinks = document.querySelectorAll('.category-nav-link');
      const arrowContainer = document.querySelector('.arrow-container');

      if (navLinks.length > 0) {
        // On s'assure que tout est visible avant de lancer GSAP
        gsap.set([navLinks, arrowContainer], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.categories-nav',
            start: 'top bottom-=120px',
            toggleActions: 'play none none none',
          },
        });

        // Animation ralentie (3x plus lente)
        tl.from(navLinks, {
          opacity: 0,
          duration: .5, // 0.6s * 3 = 1.8s
          stagger: {
            each: 0.4, // 0.15s * 3 = 0.45s entre chaque lien
            from: 'end', // C'est ici qu'on définit l'ordre "du bas vers le haut"
          },
          ease: 'power1.in',
        }).from(
          arrowContainer,
          {
            opacity: 0,
            y: 100,
            scaleY: 0,
            transformOrigin: 'bottom center',
            duration: 2.4, // 0.8s * 3 = 2.4s
            ease: 'power1.out',
          },
          '-=1.2'
        ); // Commence à mi-chemin de l'animation des liens
      }
    }
  <\/script> `])), maybeRenderHead(), sortedCategories.map((cat) => renderTemplate`<a${addAttribute(`#category-${cat.data.slug_fr}`, "href")}${addAttribute(`category-nav-link category-nav-link-${cat.data.order}`, "class")} data-astro-cid-j4cwuawe> ${cat.data.name_fr} </a>`), sortedModalites.map((modalite) => {
    const objectiveMap = {
      investigation: "Poser un diagnostic",
      inspiration: "Sensibiliser",
      action: "Intervenir",
      immersion: "Apprendre par l'expérience"
    };
    const objective = objectiveMap[modalite.data.slug] || "";
    return renderTemplate`<div${addAttribute(modalite.data.slug, "id")}${addAttribute(`modalite-card modalite-${modalite.data.slug}`, "class")} data-astro-cid-j4cwuawe> <div class="modalite-header" data-astro-cid-j4cwuawe> <span${addAttribute(`modalite-dot modalite-dot-${modalite.data.slug}`, "class")} data-astro-cid-j4cwuawe></span> <h3 class="modalite-title" data-astro-cid-j4cwuawe>${modalite.data.name_fr}</h3> </div> <p class="modalite-objective" data-astro-cid-j4cwuawe>${objective}</p> <p class="modalite-description hidden md:block" data-astro-cid-j4cwuawe>${modalite.data.description_fr}</p> </div>`;
  }), renderComponent($$result2, "AccompagnementsGrid", $$AccompagnementsGrid, { "lang": "fr", "fullBleed": true, "data-astro-cid-j4cwuawe": true })) })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/accompagnements.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/accompagnements.astro";
const $$url = "/accompagnements";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Accompagnements,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
