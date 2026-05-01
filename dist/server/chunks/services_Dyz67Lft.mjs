import { c as createComponent } from './astro-component_CJvBYnlV.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, c as renderComponent } from './server_hrxctkJq.mjs';
import { $ as $$Layout } from './Layout_BdTiism6.mjs';
import { $ as $$ActionBar } from './ActionBar_Civ90G0x.mjs';
import 'clsx';
import { g as getCollection } from './_astro_content_D4H6A79E.mjs';

const $$Accompagnements = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Accompagnements;
  const { lang, category, fullBleed = false } = Astro2.props;
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
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(fullBleed ? "" : "mx-auto max-w-6xl px-4", "class")} data-astro-cid-diuoq6fv> ${categories.length > 0 ? categories.map((cat) => renderTemplate`<section class="mb-16" data-astro-cid-diuoq6fv> <h2 class="font-serif text-limolo-green mb-4" data-astro-cid-diuoq6fv>${cat}</h2> <p class="category-description text-center! mx-auto mb-12" data-astro-cid-diuoq6fv>${getCategoryDescription(cat)}</p> <div class="accompagnements-grid" data-astro-cid-diuoq6fv> ${accompagnements.filter((item) => item.data.categorie === cat).map((item) => renderTemplate`<article class="accompagnement-card" data-astro-cid-diuoq6fv> <div class="card-image" data-astro-cid-diuoq6fv> <div class="card-image-wrapper" data-astro-cid-diuoq6fv> <img${addAttribute(item.data.image, "src")}${addAttribute(item.data.title, "alt")} data-astro-cid-diuoq6fv> </div> <span${addAttribute(`card-type card-type-${item.data.type}`, "class")} data-astro-cid-diuoq6fv>${item.data.type}</span> </div> <div class="card-content" data-astro-cid-diuoq6fv> <h3 class="font-serif font-semibold text-limolo-green" data-astro-cid-diuoq6fv>${item.data.title}</h3> <p class="text-2xl card-description text-center!" data-astro-cid-diuoq6fv>${item.data.description}</p> ${(item.data.USP1 || item.data.USP2 || item.data.USP3 || item.data.USP4 || item.data.USP5) && renderTemplate`<div class="usp-section" data-astro-cid-diuoq6fv> <p class="usp-text" data-astro-cid-diuoq6fv> ${[item.data.USP1, item.data.USP2, item.data.USP3, item.data.USP4, item.data.USP5].filter(Boolean).join(" • ")} </p> </div>`} </div> </article>`)} </div> </section>`) : renderTemplate`<p class="text-center text-gray-500" data-astro-cid-diuoq6fv>Aucun accompagnement trouvé.</p>`} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/Accompagnements.astro", void 0);

const $$Services = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Services - All Leaders", "metaTitle": "Our services - All Leaders Initiative", "metaDescription": "Discover our services in performance diagnostics, training, coaching and consulting.", "lang": "en", "data-astro-cid-pj7llkco": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-pj7llkco> <h1 class="font-serif text-limolo-green mb-8 text-center" data-astro-cid-pj7llkco>Our services</h1> <h2 data-astro-cid-pj7llkco>Diagnostic and development solutions for your organizations</h2> <!-- Accompagnements Component --> ${renderComponent($$result2, "Accompagnements", $$Accompagnements, { "lang": "en", "fullBleed": true, "data-astro-cid-pj7llkco": true })} </div> ${renderComponent($$result2, "ActionBar", $$ActionBar, { "data-astro-cid-pj7llkco": true })} ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/services.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/services.astro";
const $$url = "/en/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
