import { c as createComponent } from './astro-component_BLIHCxi5.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from './server_DNeM8zG_.mjs';
import { g as getCollection } from './_astro_content_oQYTZ2Lj.mjs';
import { $ as $$Layout } from './Layout_sU-PIp3w.mjs';

const $$LayoutAccompagnements = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LayoutAccompagnements;
  const { accompagnement, category } = Astro2.props;
  const { data } = accompagnement;
  const lang = data.lang || "fr";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": data.title, "lang": lang, "metaTitle": `${data.title} - All Leaders Initiative`, "metaDescription": data.description, "data-astro-cid-jabcfvfe": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="accompagnement-page" data-astro-cid-jabcfvfe> <div class="container max-w-4xl mx-auto px-4 py-12" data-astro-cid-jabcfvfe>  ${data.image && renderTemplate`<div class="accompagnement-hero mb-12" data-astro-cid-jabcfvfe> <img${addAttribute(data.image, "src")}${addAttribute(data.title, "alt")} class="w-full h-auto rounded-lg shadow-lg object-cover" style="max-height: 500px;" data-astro-cid-jabcfvfe> </div>`}  <div class="metadata mb-6 flex items-center gap-4 justify-center flex-wrap" data-astro-cid-jabcfvfe> <span${addAttribute(`type-badge type-badge-${data.type}`, "class")} data-astro-cid-jabcfvfe> ${data.type} </span> ${category && renderTemplate`<span class="category-badge" data-astro-cid-jabcfvfe> ${lang === "fr" ? category.data.name_fr : category.data.name_en} </span>`} </div>  <h1 class="text-4xl md:text-5xl font-serif font-bold mb-8 text-limolo-green text-center" data-astro-cid-jabcfvfe> ${data.title} </h1>  <div class="description text-xl text-gray-700 mb-12 leading-relaxed text-center max-w-2xl mx-auto" data-astro-cid-jabcfvfe> <p data-astro-cid-jabcfvfe>${data.description}</p> </div>  ${(data.USP1 || data.USP2 || data.USP3 || data.USP4 || data.USP5) && renderTemplate`<div class="usp-section mb-12 p-8 bg-gradient-to-br from-limolo-green/5 to-transparent rounded-lg border border-limolo-green/10" data-astro-cid-jabcfvfe> <h2 class="text-2xl font-serif font-semibold mb-6 text-limolo-green" data-astro-cid-jabcfvfe> ${lang === "fr" ? "Points clés" : "Key points"} </h2> <ul class="usp-list grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-jabcfvfe> ${data.USP1 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP1}</span> </li>`} ${data.USP2 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP2}</span> </li>`} ${data.USP3 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP3}</span> </li>`} ${data.USP4 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP4}</span> </li>`} ${data.USP5 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP5}</span> </li>`} </ul> </div>`}  <div class="cta-section mt-16 text-center" data-astro-cid-jabcfvfe> <a href="/contact" class="btn btn-primary btn-lg" data-astro-cid-jabcfvfe> ${lang === "fr" ? "Prendre contact" : "Get in touch"} </a> </div>  <div class="back-link mt-12 text-center" data-astro-cid-jabcfvfe> <a href="/accompagnements" class="text-limolo-green hover:underline" data-astro-cid-jabcfvfe>
← ${lang === "fr" ? "Retour aux accompagnements" : "Back to services"} </a> </div> </div> </article> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/layouts/LayoutAccompagnements.astro", void 0);

const getStaticPaths = (async () => {
  const accompagnements = await getCollection("accompagnements");
  const categories = await getCollection("accompagnements-categories");
  return accompagnements.map((accompagnement) => {
    const category = categories.find(
      (cat) => cat.data.name_fr === accompagnement.data.categorie || cat.data.name_en === accompagnement.data.categorie
    );
    const categorieSlug = category?.data.slug || accompagnement.data.categorie.toLowerCase().replace(/\s+/g, "-");
    const slug = accompagnement.id.split("/").pop()?.replace(/\.yaml$/, "") || "";
    return {
      params: {
        categorie: categorieSlug,
        slug
      },
      props: {
        accompagnementId: accompagnement.id,
        categoryId: category?.id
      }
    };
  });
});
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { accompagnementId, categoryId } = Astro2.props;
  const accompagnements = await getCollection("accompagnements");
  const categories = await getCollection("accompagnements-categories");
  const accompagnement = accompagnements.find((a) => a.id === accompagnementId);
  const category = categories.find((c) => c.id === categoryId);
  if (!accompagnement) {
    return Astro2.redirect("/accompagnements");
  }
  return renderTemplate`${renderComponent($$result, "LayoutAccompagnements", $$LayoutAccompagnements, { "accompagnement": accompagnement, "category": category })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/accompagnements/[categorie]/[slug].astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/accompagnements/[categorie]/[slug].astro";
const $$url = "/accompagnements/[categorie]/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
