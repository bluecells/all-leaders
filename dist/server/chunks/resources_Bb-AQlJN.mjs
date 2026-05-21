import { c as createComponent } from './astro-component_BSMsVI9A.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_9mu4lEgk.mjs';
import { $ as $$Layout } from './Layout_BzCycEC5.mjs';
import { $ as $$Blog } from './Blog_DWEqgtDK.mjs';

const $$Resources = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Resources", "metaTitle": "Resources - All Leaders", "metaDescription": "Discover our articles and resources on leadership, psychological safety, and organizational development.", "lang": "en", "data-astro-cid-bkcv3667": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-bkcv3667> <h1 class="text-limolo-green mb-8 text-center" data-astro-cid-bkcv3667>Resources</h1> <h2 data-astro-cid-bkcv3667>
Our articles and resources from <span class="brand-text" data-astro-cid-bkcv3667>
ALL <span class="leaders" data-astro-cid-bkcv3667>LEADERS</span> <span class="thin" data-astro-cid-bkcv3667>INITIATIVE</span> </span> </h2> <!-- Blog Component --> ${renderComponent($$result2, "BlogSection", $$Blog, { "lang": "en", "fullBleed": true, "data-astro-cid-bkcv3667": true })} </div> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/resources.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/resources.astro";
const $$url = "/en/resources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resources,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
