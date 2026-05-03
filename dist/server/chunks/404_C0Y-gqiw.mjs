import { c as createComponent } from './astro-component_BoDF8ZIq.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_3E62P-_e.mjs';
import { $ as $$Layout } from './Layout_C1zrGFLu.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page non trouvée - All Leaders", "lang": "fr", "metaTitle": "Erreur 404 - Page non trouvée", "metaDescription": "Erreur 404 - Cette page n'existe pas sur all-leaders.fr" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center h-[70vh]"> <h1 class="text-6xl font-bold mb-4">Erreur 404</h1> <p class="text-xl mb-8">La page que vous recherchez n'existe pas</p> <a href="/" class="px-6 py-3 text-white rounded btn-limolo"> Retour à l'accueil </a> </div> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/404.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
