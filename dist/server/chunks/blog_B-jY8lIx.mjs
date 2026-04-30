import { c as createComponent } from './astro-component_EQTw1nHg.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_CPScTQ3A.mjs';
import { $ as $$Layout } from './Layout_DxFwZnBy.mjs';
import { $ as $$ActionBar } from './ActionBar_OE66k_dy.mjs';
import { $ as $$Blog$1 } from './Blog_YqHjBueX.mjs';

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog - All Leaders", "description": "Discover our articles on responsible tourism, sustainability and authentic Sardinia.", "lang": "en", "data-astro-cid-zkuempfj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-zkuempfj> <h1 class="font-serif text-limolo-green mb-8 text-center" data-astro-cid-zkuempfj>All Leaders Blog</h1> <h2 data-astro-cid-zkuempfj>A different look at vacations in Sardinia</h2> <!-- Blog Component --> ${renderComponent($$result2, "BlogSection", $$Blog$1, { "lang": "en", "fullBleed": true, "data-astro-cid-zkuempfj": true })} </div> ${renderComponent($$result2, "ActionBar", $$ActionBar, { "data-astro-cid-zkuempfj": true })} ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/blog.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/blog.astro";
const $$url = "/en/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
