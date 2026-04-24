import { c as createComponent } from './astro-component_BQvOssEf.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_DLCPDVwv.mjs';
import { $ as $$Layout } from './Layout_B3Z9WxEI.mjs';
import { $ as $$ActionBar } from './ActionBar_BSyLxf2s.mjs';
import { $ as $$Blog$1 } from './Blog_OguDUr44.mjs';

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog - All Leaders", "metaTitle": "Blog - All Leaders", "metaDescription": "Découvrez nos articles sur le tourisme responsable, la durabilité et la Sardaigne authentique.", "lang": "fr", "data-astro-cid-ijnerlr2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-ijnerlr2> <h1 class="font-serif text-limolo-green mb-8 text-center" data-astro-cid-ijnerlr2>All Leaders Blog</h1> <h2 data-astro-cid-ijnerlr2>Un regard différent sur les vacances en Sardaigne</h2> <!-- Blog Component --> ${renderComponent($$result2, "BlogSection", $$Blog$1, { "lang": "fr", "fullBleed": true, "data-astro-cid-ijnerlr2": true })} </div> ${renderComponent($$result2, "ActionBar", $$ActionBar, { "data-astro-cid-ijnerlr2": true })} ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/blog.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
