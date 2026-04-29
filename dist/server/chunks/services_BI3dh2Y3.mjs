import { c as createComponent } from './astro-component_CYP0RS7o.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_CcjrI37E.mjs';
import { $ as $$Layout } from './Layout_FPQ8SoTK.mjs';
import { $ as $$Accompagnements } from './Accompagnements_BEv6ttIW.mjs';

const $$Services = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Services - All Leaders", "metaTitle": "Nos accompagnements - All Leaders Initiative", "metaDescription": "Découvrez nos accompagnements en diagnostic de performance, formation, coaching et conseil.", "lang": "fr", "data-astro-cid-ucd2ps2b": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-ucd2ps2b> <h1 class="font-serif text-limolo-green mb-8 text-center" data-astro-cid-ucd2ps2b>Nos accompagnements</h1> <h2 data-astro-cid-ucd2ps2b>Solutions de diagnostic et développement pour vos organisations</h2> <!-- Accompagnements Component --> ${renderComponent($$result2, "Accompagnements", $$Accompagnements, { "lang": "fr", "fullBleed": true, "data-astro-cid-ucd2ps2b": true })} </div> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/services.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
