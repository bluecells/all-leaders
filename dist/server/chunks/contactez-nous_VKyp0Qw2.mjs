import { c as createComponent } from './astro-component_CKtM7rSL.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server__edj_reH.mjs';
import { $ as $$Layout } from './Layout_D4dKH1zz.mjs';

const $$ContactezNous = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contattaci", "description": "Contatta Limolo per informazioni e prenotazioni. Siamo qui per aiutarti a pianificare la tua vacanza green in Sardegna." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Contactez-nous</h1> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/fr/contactez-nous.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/fr/contactez-nous.astro";
const $$url = "/fr/contactez-nous";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ContactezNous,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
