import { c as createComponent } from './astro-component_Bt1tiS-O.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, c as renderComponent } from './server_CQjrSBkT.mjs';
import { $ as $$Layout } from './Layout_Ew10q8cU.mjs';
import 'clsx';
import { g as getCollection } from './_astro_content_DhSqf0Rj.mjs';

const $$AccompagnementsGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AccompagnementsGrid;
  const { lang, category, fullBleed = false, textColor = "white" } = Astro2.props;
  let accompagnements = await getCollection("accompagnements");
  const allCategories = await getCollection("accompagnements-categories");
  accompagnements = accompagnements.filter((item) => item.data.lang === lang);
  if (category) {
    accompagnements = accompagnements.filter((item) => item.data.categorie === category);
  }
  const categories = Array.from(new Set(accompagnements.map((item) => item.data.categorie)));
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
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(fullBleed ? "" : "mx-auto max-w-6xl px-4", "class")} data-astro-cid-4neesz6s> ${categories.length > 0 ? categories.map((cat) => {
    const categorySlug = getCategorySlug(cat);
    const categoryAccompagnements = accompagnements.filter((item) => item.data.categorie === cat);
    return renderTemplate`<section class="mb-16" data-astro-cid-4neesz6s> <h2 class="font-serif text-limolo-green mb-4" data-astro-cid-4neesz6s>${cat}</h2> <p class="category-description text-center! mx-auto mb-12" data-astro-cid-4neesz6s>${getCategoryDescription(cat)}</p> <div class="accompagnements-grid" data-astro-cid-4neesz6s> ${categoryAccompagnements.map((item) => {
      const itemUrl = buildAccompagnementUrl(item, categorySlug);
      return renderTemplate`<article class="accompagnement-card-container" data-astro-cid-4neesz6s> <a${addAttribute(itemUrl, "href")} class="accompagnement-card-link" data-astro-cid-4neesz6s> <div class="card-image" data-astro-cid-4neesz6s> <div class="card-image-wrapper" data-astro-cid-4neesz6s> <img${addAttribute(item.data.image, "src")}${addAttribute(item.data.title, "alt")} data-astro-cid-4neesz6s> </div> <span${addAttribute(`card-type card-type-${item.data.type}`, "class")} data-astro-cid-4neesz6s>${item.data.type}</span> </div> <div class="card-content" data-astro-cid-4neesz6s> <h3 class="font-serif font-semibold text-limolo-green" data-astro-cid-4neesz6s>${item.data.title}</h3> </div> </a> </article>`;
    })} </div> </section>`;
  }) : renderTemplate`<p class="text-center text-gray-500" data-astro-cid-4neesz6s>Aucun accompagnement trouvé.</p>`} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/AccompagnementsGrid.astro", void 0);

const $$Accompagnements = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Accompagnements - All Leaders", "metaTitle": "Nos accompagnements - All Leaders Initiative", "metaDescription": "Découvrez nos accompagnements en diagnostic de performance, formation, coaching et conseil.", "lang": "fr", "data-astro-cid-j4cwuawe": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-j4cwuawe> <h1 class="font-serif text-limolo-green mb-8 text-center" data-astro-cid-j4cwuawe>Nos accompagnements</h1> <h2 data-astro-cid-j4cwuawe>Solutions de diagnostic et développement pour vos organisations</h2> <!-- AccompagnementsGrid Component avec cards cliquables --> ${renderComponent($$result2, "AccompagnementsGrid", $$AccompagnementsGrid, { "lang": "fr", "fullBleed": true, "data-astro-cid-j4cwuawe": true })} </div> ` })}`;
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
