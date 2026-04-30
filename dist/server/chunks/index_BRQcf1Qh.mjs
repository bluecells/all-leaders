import { c as createComponent } from './astro-component_CG7bSCu1.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_BMzEAiM8.mjs';
import { $ as $$Layout } from './Layout_DSFcXf8P.mjs';
import { $ as $$ActionBar } from './ActionBar_BA8ODDER.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "All Leaders - Responsible Tourism", "lang": "en", "metaTitle": "All Leaders - Responsible Tourism & Eco-Living in Sardinia", "metaDescription": "Discover All Leaders, an eco-responsible bed & breakfast in Cabras, Sardinia. Experience sustainable tourism and authentic local culture." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12"> <h1 class="font-serif text-4xl mb-4 text-center">Welcome to All Leaders</h1> <p class="text-xl text-center mb-8">
Discover responsible tourism and eco-living in Sardinia
</p> <p class="text-center mb-8">
This is a placeholder page. Content coming soon.
</p> <div class="text-center"> <a href="/en/blog" class="inline-block px-6 py-3 text-white rounded bg-brand-primary hover:bg-brand-accent transition">
Explore our blog
</a> </div> </div> ${renderComponent($$result2, "ActionBar", $$ActionBar, {})} ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/index.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
