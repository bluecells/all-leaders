import { c as createComponent } from './astro-component_CJvBYnlV.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_hrxctkJq.mjs';
import { $ as $$Layout } from './Layout_BdTiism6.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page Not Found - All Leaders", "lang": "en", "metaTitle": "Error 404 - Page Not Found", "metaDescription": "Error 404 - This page does not exist on all-leaders.fr" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center h-[70vh]"> <h1 class="text-6xl font-bold mb-4">Error 404</h1> <p class="text-xl mb-8">The page you are looking for does not exist</p> <a href="/en" class="px-6 py-3 text-white rounded btn-limolo"> Back to home </a> </div> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/404.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/404.astro";
const $$url = "/en/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
