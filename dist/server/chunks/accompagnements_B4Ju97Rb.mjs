import { c as createComponent } from './astro-component_BoDF8ZIq.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, c as renderComponent } from './server_3E62P-_e.mjs';
import { $ as $$Layout } from './Layout_C1zrGFLu.mjs';
import 'clsx';
import { g as getCollection } from './_astro_content_oe3tNoc4.mjs';

const $$AccompagnementsGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AccompagnementsGrid;
  const { lang, category, fullBleed = false } = Astro2.props;
  let accompagnements = await getCollection("accompagnements");
  const allCategories = await getCollection("accompagnements-categories");
  accompagnements = accompagnements.filter((item) => item.data.lang === lang);
  if (category) {
    accompagnements = accompagnements.filter(
      (item) => item.data.categorie === category
    );
  }
  const categoryOrderMap = /* @__PURE__ */ new Map();
  allCategories.forEach((cat) => {
    const catName = lang === "fr" ? cat.data.name_fr : cat.data.name_en;
    categoryOrderMap.set(catName, cat.data.order);
  });
  const uniqueCategories = Array.from(
    new Set(accompagnements.map((item) => item.data.categorie))
  );
  const categories = uniqueCategories.sort((a, b) => {
    const orderA = categoryOrderMap.get(a) ?? 999;
    const orderB = categoryOrderMap.get(b) ?? 999;
    return orderA - orderB;
  });
  function getCategoryDescription(categoryName) {
    const categoryData = allCategories.find(
      (cat) => (lang === "fr" ? cat.data.name_fr : cat.data.name_en) === categoryName
    );
    return lang === "fr" ? categoryData?.data.description_fr || "" : categoryData?.data.description_en || "";
  }
  function getCategorySlug(categoryName) {
    const categoryData = allCategories.find(
      (cat) => (lang === "fr" ? cat.data.name_fr : cat.data.name_en) === categoryName
    );
    return categoryData?.data.slug || categoryName.toLowerCase().replace(/\s+/g, "-");
  }
  function buildAccompagnementUrl(accompagnement, categorySlug) {
    const slug = lang === "fr" ? accompagnement.data.slug_fr : accompagnement.data.slug_en;
    return `/accompagnements/${categorySlug}/${slug}`;
  }
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(fullBleed ? "" : "mx-auto max-w-4xl px-4", "class")} data-astro-cid-4neesz6s> ${categories.length > 0 ? categories.map((category2) => {
    const categorySlug = getCategorySlug(category2);
    const categoryAccompagnements = accompagnements.filter(
      (item) => item.data.categorie === category2
    );
    return renderTemplate`<section class="category-section mb-16"${addAttribute(`category-${categorySlug}`, "id")} data-astro-cid-4neesz6s> <!-- COLONNE GAUCHE --> <div class="category-left" data-astro-cid-4neesz6s> <h2 class="font-serif text-limolo-green mb-4" data-astro-cid-4neesz6s> ${category2} </h2> <p class="category-description" data-astro-cid-4neesz6s> ${getCategoryDescription(category2)} </p> </div> <!-- COLONNE DROITE --> <div class="accompagnements-list" data-astro-cid-4neesz6s> ${categoryAccompagnements.map((item) => {
      const itemUrl = buildAccompagnementUrl(
        item,
        categorySlug
      );
      return renderTemplate`<article class="accompagnement-card-horizontal" data-astro-cid-4neesz6s> <a${addAttribute(itemUrl, "href")} class="card-link" data-astro-cid-4neesz6s> <div class="card-image-mini" data-astro-cid-4neesz6s> <img${addAttribute(item.data.image, "src")}${addAttribute(item.data.title, "alt")} data-astro-cid-4neesz6s> <span${addAttribute(`card-type-tag card-type-${item.data.type}`, "class")} data-astro-cid-4neesz6s> ${item.data.type} </span> </div> <div${addAttribute(`card-content-mini card-type-${item.data.type}-trans`, "class")} data-astro-cid-4neesz6s> <h3 class="font-serif text-limolo-green" data-astro-cid-4neesz6s> ${item.data.title} </h3> </div> </a> </article>`;
    })} </div> </section>`;
  }) : renderTemplate`<p class="text-center text-gray-500" data-astro-cid-4neesz6s>
Aucun accompagnement trouvé.
</p>`} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/AccompagnementsGrid.astro", void 0);

const $$Accompagnements = createComponent(async ($$result, $$props, $$slots) => {
  const modalites = await getCollection("modalites-intervention");
  const sortedModalites = modalites.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  const categorie = await getCollection("accompagnements-categories");
  const sortedCategories = categorie.sort((a, b) => {
    const orderA = a.data.order || 999;
    const orderB = b.data.order || 999;
    return orderB - orderA;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Accompagnements - All Leaders", "metaTitle": "Nos accompagnements - All Leaders Initiative", "metaDescription": "Découvrez nos accompagnements en diagnostic de performance, formation, coaching et conseil.", "lang": "fr", "data-astro-cid-j4cwuawe": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col justify-center align-items mx-auto px-4 min-h-[85vh]" data-astro-cid-j4cwuawe> <h1 class="font-serif text-limolo-green mb-8 text-center" data-astro-cid-j4cwuawe>Nos accompagnements</h1> <h2 data-astro-cid-j4cwuawe>Solutions de diagnostic et développement pour vos organisations</h2> <!-- Navigation des catégories d'accompagnements --> <nav class="categories-nav" data-astro-cid-j4cwuawe> <div class="categories-nav-wrapper" data-astro-cid-j4cwuawe> ${sortedCategories.map((cat) => renderTemplate`<a${addAttribute(`#category-${cat.data.slug}`, "href")}${addAttribute(`category-nav-link category-nav-link-${cat.data.order}`, "class")} data-astro-cid-j4cwuawe> ${cat.data.name_fr} </a>`)} </div> </nav> </div>  ${renderComponent($$result2, "AccompagnementsGrid", $$AccompagnementsGrid, { "lang": "fr", "fullBleed": true, "data-astro-cid-j4cwuawe": true })}  <section class="modalites-section" data-astro-cid-j4cwuawe> <div class="modalites-container" data-astro-cid-j4cwuawe> ${sortedModalites.map((modalite) => {
    const objectiveMap = {
      investigation: "Poser un diagnostic",
      inspiration: "Sensibiliser",
      action: "Intervenir",
      immersion: "Apprendre par l'expérience"
    };
    const objective = objectiveMap[modalite.data.slug] || "";
    return renderTemplate`<div${addAttribute(modalite.data.slug, "id")}${addAttribute(`modalite-card modalite-${modalite.data.slug}`, "class")} data-astro-cid-j4cwuawe> <div class="modalite-header" data-astro-cid-j4cwuawe> <span${addAttribute(`modalite-dot modalite-dot-${modalite.data.slug}`, "class")} data-astro-cid-j4cwuawe></span> <h3 class="modalite-title" data-astro-cid-j4cwuawe>${modalite.data.name_fr}</h3> </div> <p class="modalite-objective" data-astro-cid-j4cwuawe>${objective}</p> <p class="modalite-description" data-astro-cid-j4cwuawe>${modalite.data.description_fr}</p> </div>`;
  })} </div> </section> ` })}`;
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
