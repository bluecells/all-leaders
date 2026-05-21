import { c as createComponent } from './astro-component_CBbIRNKv.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate } from './server_C9Y93v7l.mjs';
import 'clsx';
import { g as getCollection } from './_astro_content_Dg1SKHpp.mjs';

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
    if (lang === "fr") {
      return `/accompagnements/${catSlug}/${itemSlug}`;
    } else {
      return `/en/services/${catSlug}/${itemSlug}`;
    }
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(fullBleed ? "" : "mx-auto max-w-4xl px-4", "class")} data-astro-cid-4neesz6s> ${sortedCategoryNames.length > 0 ? sortedCategoryNames.map((catName) => {
    const catData = categoryMap.get(catName);
    const itemsInCategory = filteredAccompagnements.filter((item) => item.data.categorie === catName);
    return renderTemplate`<section class="category-section mb-16"${addAttribute(`category-${catData?.slug}`, "id")} data-astro-cid-4neesz6s> <!-- COLONNE GAUCHE --> <div class="category-left" data-astro-cid-4neesz6s> <h2 class="text-limolo-green mb-4 font-bold" data-astro-cid-4neesz6s>${catName}</h2> <p class="category-description" data-astro-cid-4neesz6s>${catData?.description || ""}</p> <a href="#" class="back-to-top-link" data-astro-cid-4neesz6s> ${lang === "fr" ? "Revenir au début" : "Back to top"} <svg class="back-to-top-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-4neesz6s> <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-4neesz6s></path> </svg> </a> </div> <!-- COLONNE DROITE --> <div class="accompagnements-list" data-astro-cid-4neesz6s> ${itemsInCategory.map((item) => renderTemplate`<article class="accompagnement-card-horizontal" data-astro-cid-4neesz6s> <a${addAttribute(getAccompagnementUrl(item, catData?.slug), "href")} class="card-link" data-astro-cid-4neesz6s> <div class="card-image-mini" data-astro-cid-4neesz6s> <img${addAttribute(item.data.image, "src")}${addAttribute(item.data.title, "alt")} loading="lazy" data-astro-cid-4neesz6s> </div> <div${addAttribute(`card-content-mini card-type-${item.data.type}-trans`, "class")} data-astro-cid-4neesz6s> <h3 class="text-limolo-green" data-astro-cid-4neesz6s> ${item.data.title} </h3> <span class="card-type-tag" data-astro-cid-4neesz6s> <span${addAttribute(`modalite-dot modalite-dot-${item.data.type}`, "class")} data-astro-cid-4neesz6s></span> <span${addAttribute(`card-type-text card-type-text-${item.data.type}`, "class")} data-astro-cid-4neesz6s> ${item.data.type} </span> </span> </div> </a> </article>`)} </div> </section>`;
  }) : renderTemplate`<p class="text-center text-gray-500" data-astro-cid-4neesz6s> ${lang === "fr" ? "Aucun accompagnement trouvé." : "No results found."} </p>`} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/AccompagnementsGrid.astro", void 0);

export { $$AccompagnementsGrid as $ };
