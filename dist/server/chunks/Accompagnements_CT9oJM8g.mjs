import { c as createComponent } from './astro-component_D7rd0kp0.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate } from './server_D2WlyLFw.mjs';
import 'clsx';
import { g as getCollection } from './_astro_content_DMBpWl0a.mjs';

const $$Accompagnements = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Accompagnements;
  const { lang, category, fullBleed = false } = Astro2.props;
  let accompagnements = await getCollection("accompagnements");
  const allCategories = await getCollection("accompagnement-categories");
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
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(fullBleed ? "" : "mx-auto max-w-6xl px-4", "class")} data-astro-cid-diuoq6fv> ${categories.length > 0 ? categories.map((cat) => renderTemplate`<section class="mb-16" data-astro-cid-diuoq6fv> <h2 class="font-serif text-limolo-green mb-4 text-2xl" data-astro-cid-diuoq6fv>${cat}</h2> <p class="category-description mb-8" data-astro-cid-diuoq6fv>${getCategoryDescription(cat)}</p> <div class="accompagnements-grid" data-astro-cid-diuoq6fv> ${accompagnements.filter((item) => item.data.categorie === cat).map((item) => renderTemplate`<article class="accompagnement-card" data-astro-cid-diuoq6fv> <div class="card-image" data-astro-cid-diuoq6fv> <img${addAttribute(item.data.image, "src")}${addAttribute(item.data.title, "alt")} data-astro-cid-diuoq6fv> <span class="card-type" data-astro-cid-diuoq6fv>${item.data.type}</span> </div> <div class="card-content" data-astro-cid-diuoq6fv> <h3 class="font-serif text-limolo-green" data-astro-cid-diuoq6fv>${item.data.title}</h3> <p class="card-description" data-astro-cid-diuoq6fv>${item.data.description}</p> </div> </article>`)} </div> </section>`) : renderTemplate`<p class="text-center text-gray-500" data-astro-cid-diuoq6fv>Aucun accompagnement trouvé.</p>`} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/Accompagnements.astro", void 0);

export { $$Accompagnements as $ };
