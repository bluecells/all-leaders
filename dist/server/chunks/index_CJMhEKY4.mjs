import { c as createComponent } from './astro-component_CBbIRNKv.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, e as addAttribute, m as maybeRenderHead } from './server_C9Y93v7l.mjs';
import { $ as $$Layout } from './Layout_BC1iEP4H.mjs';
import { $ as $$AccompagnementsGrid } from './AccompagnementsGrid_CJXcfCzJ.mjs';
import { g as getCollection } from './_astro_content_Dg1SKHpp.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const modalites = await getCollection("modalites-intervention");
  const sortedModalites = modalites.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  const categorie = await getCollection("accompagnements-categories");
  const sortedCategories = categorie.sort((a, b) => {
    const orderA = a.data.order || 999;
    const orderB = b.data.order || 999;
    return orderB - orderA;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Les accompagnements de All Leaders Initiative", "metaTitle": "Nos accompagnements - All Leaders Initiative", "metaDescription": "Développez la performance collective de vos équipes et de leurs leaders ! Coaching, diagnostic LBI et santé mentale : nous transformons vos blocages en leviers d'action.", "lang": "fr", "data-astro-cid-sksl3rjl": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div class="flex flex-col justify-center align-items mx-auto min-h-[83vh]" data-astro-cid-sksl3rjl> <h1 class="mb-8 text-3xl md:text-6xl text-center" data-astro-cid-sksl3rjl>Nos accompagnements</h1> <h2 data-astro-cid-sksl3rjl>Solutions de diagnostic et développement pour vos organisations</h2> <!-- Navigation des catégories d'accompagnements --> <nav class="categories-nav" data-astro-cid-sksl3rjl> <div class="categories-nav-wrapper" data-astro-cid-sksl3rjl> `, ` </div> <div class="arrow-container" data-astro-cid-sksl3rjl> <svg width="100" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" data-astro-cid-sksl3rjl> <path d="M0 50L50 0L100 50Z" fill="#182433" data-astro-cid-sksl3rjl></path> </svg> <div class="arrow-colours" data-astro-cid-sksl3rjl></div> </div> </nav> </div>  <section class="modalites-section" data-astro-cid-sksl3rjl> <h2 class="text-2xl! md:text-4xl font-bold pt-4! px-20!" data-astro-cid-sksl3rjl>4 modalités d'intervention</h2> <div class="modalites-container" data-astro-cid-sksl3rjl> `, " </div> </section>  ", " <script>\n    // 1. BLOCAGE IMMÉDIAT : On empêche le navigateur de sauter sauvagement\n    // avant que les CDN ne soient chargés\n    if (window.location.hash) {\n      window.scrollTo(0, 0);\n    }\n\n    // Charger GSAP depuis CDN\n    Promise.all([\n      new Promise((resolve) => {\n        const script = document.createElement('script');\n        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';\n        script.onload = resolve;\n        document.head.appendChild(script);\n      }),\n      new Promise((resolve) => {\n        const script = document.createElement('script');\n        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';\n        script.onload = resolve;\n        document.head.appendChild(script);\n      }),\n    ]).then(() => {\n      gsap.registerPlugin(ScrollTrigger);\n\n      // On initialise d'abord vos animations pour stabiliser le layout\n      initAnimation();\n\n      // On gère l'ancre immédiatement après\n      handleAnchorScroll();\n    });\n\n    function initAnimation() {\n      const navLinks = document.querySelectorAll('.category-nav-link');\n      const arrowContainer = document.querySelector('.arrow-container');\n\n      if (navLinks.length > 0) {\n        gsap.set([navLinks, arrowContainer], { opacity: 1 });\n\n        const tl = gsap.timeline({\n          scrollTrigger: {\n            trigger: '.categories-nav',\n            start: 'top bottom-=120px',\n            toggleActions: 'play none none none',\n          },\n        });\n\n        tl.from(navLinks, {\n          opacity: 0,\n          duration: 0.5,\n          stagger: {\n            each: 0.4,\n            from: 'end',\n          },\n          ease: 'power1.in',\n        }).from(\n          arrowContainer,\n          {\n            opacity: 0,\n            y: 100,\n            scaleY: 0,\n            transformOrigin: 'bottom center',\n            duration: 2.4,\n            ease: 'power1.out',\n          },\n          '-=1.2'\n        );\n      }\n    }\n\n    // Nouvelle fonction pour gérer le défilement précis vers l'ancre\n    function handleAnchorScroll() {\n      const hash = window.location.hash;\n      if (!hash) return;\n\n      const target = document.querySelector(hash);\n      if (!target) return;\n\n      // On force ScrollTrigger à rafraîchir ses calculs de hauteurs de page\n      ScrollTrigger.refresh();\n\n      // On laisse un micro-délai pour que le layout se stabilise graphiquement\n      setTimeout(() => {\n        // Calcul de la position de l'élément par rapport au haut du document\n        const targetPosition = target.getBoundingClientRect().top + window.scrollY;\n\n        // Ajustement de l'offset (ex: 90px pour compenser un header fixe si vous en avez un)\n        const offset = 90;\n\n        window.scrollTo({\n          top: targetPosition - offset,\n          behavior: 'smooth', // Rendu propre et fluide\n        });\n      }, 50);\n    }\n  <\/script> "])), maybeRenderHead(), sortedCategories.map((cat) => renderTemplate`<a${addAttribute(`#category-${cat.data.slug_fr}`, "href")}${addAttribute(`category-nav-link category-nav-link-${cat.data.order}`, "class")} data-astro-cid-sksl3rjl> ${cat.data.name_fr} </a>`), sortedModalites.map((modalite) => {
    const objectiveMap = {
      investigation: "Poser un diagnostic",
      inspiration: "Sensibiliser",
      action: "Intervenir",
      immersion: "Apprendre par l'expérience"
    };
    const objective = objectiveMap[modalite.data.slug] || "";
    return renderTemplate`<div${addAttribute(modalite.data.slug, "id")}${addAttribute(`modalite-card modalite-${modalite.data.slug}`, "class")} data-astro-cid-sksl3rjl> <div class="modalite-header" data-astro-cid-sksl3rjl> <span${addAttribute(`modalite-dot modalite-dot-${modalite.data.slug}`, "class")} data-astro-cid-sksl3rjl></span> <h3 class="modalite-title" data-astro-cid-sksl3rjl>${modalite.data.name_fr}</h3> </div> <p class="modalite-objective" data-astro-cid-sksl3rjl>${objective}</p> <p class="modalite-description hidden md:block" data-astro-cid-sksl3rjl>${modalite.data.description_fr}</p> </div>`;
  }), renderComponent($$result2, "AccompagnementsGrid", $$AccompagnementsGrid, { "lang": "fr", "fullBleed": true, "data-astro-cid-sksl3rjl": true })) })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/accompagnements/index.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/accompagnements/index.astro";
const $$url = "/accompagnements";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
