import { c as createComponent } from './astro-component_CYP0RS7o.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_CcjrI37E.mjs';
import { $ as $$Layout } from './Layout_FPQ8SoTK.mjs';
import { $ as $$ActionBar } from './ActionBar_DxXL5PgE.mjs';
import { $ as $$Accompagnements } from './Accompagnements_BEv6ttIW.mjs';

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
