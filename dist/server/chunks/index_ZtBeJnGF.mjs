import { c as createComponent } from './astro-component_D7uSGJcc.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_eCKIsiba.mjs';
import { $ as $$Layout } from './Layout_BTbsHFm8.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "All Leaders - Leadership development and coaching", "lang": "en", "metaTitle": "All Leaders - ", "metaDescription": "Discover All Leaders, leadership development and coaching." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12"> <h1 class="text-4xl mb-4 text-center">Welcome to All Leaders</h1> <p class="text-xl text-center mb-8">Intention based Leadership</p> <p class="text-center mb-8">This is a placeholder page. Content coming soon.</p> <div class="text-center"> <a href="/en/blog" class="inline-block px-6 py-3 text-white rounded bg-brand-primary hover:bg-brand-accent transition">
Explore our blog
</a> </div> </div> ` })}`;
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
