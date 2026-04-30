import { c as createComponent } from './astro-component_EQTw1nHg.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_CPScTQ3A.mjs';
import { $ as $$Layout } from './Layout_DxFwZnBy.mjs';
import { $ as $$Blog } from './Blog_YqHjBueX.mjs';

const $$Ressources = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog - All Leaders", "metaTitle": "Blog - All Leaders", "metaDescription": "Découvrez nos articles sur le tourisme responsable, la durabilité et la Sardaigne authentique.", "lang": "fr", "data-astro-cid-jmtcmi6d": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-jmtcmi6d> <h1 class="font-serif text-limolo-green mb-8 text-center" data-astro-cid-jmtcmi6d>Ressources</h1> <h2 data-astro-cid-jmtcmi6d>Nos articles et ressources de All Leaders Initiative</h2> <!-- Blog Component --> ${renderComponent($$result2, "BlogSection", $$Blog, { "lang": "fr", "fullBleed": true, "data-astro-cid-jmtcmi6d": true })} </div> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/ressources.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/ressources.astro";
const $$url = "/ressources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ressources,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
