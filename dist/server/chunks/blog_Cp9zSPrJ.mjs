import { c as createComponent } from './astro-component_BQvOssEf.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_DLCPDVwv.mjs';
import { $ as $$Layout } from './Layout_B3Z9WxEI.mjs';
import { $ as $$ActionBar } from './ActionBar_BSyLxf2s.mjs';
import { $ as $$Blog$1 } from './Blog_OguDUr44.mjs';

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Ressources All Leaders Initiative", "description": "Scopri i nostri articoli su turismo responsabile, sostenibilità e la Sardegna autentica.", "lang": "fr", "data-astro-cid-cy3ezwp2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-cy3ezwp2> <h1 class="font-serif text-limolo-green mb-8 text-center" data-astro-cid-cy3ezwp2>Limologiche : le blog de Limòlo</h1> <h2 data-astro-cid-cy3ezwp2>Un autre regard sur les vacances en Sardagne</h2> <!-- Blog Component --> ${renderComponent($$result2, "BlogSection", $$Blog$1, { "lang": "fr", "fullBleed": true, "data-astro-cid-cy3ezwp2": true })} </div> ${renderComponent($$result2, "ActionBar", $$ActionBar, { "data-astro-cid-cy3ezwp2": true })} ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/fr/blog.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/fr/blog.astro";
const $$url = "/fr/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
