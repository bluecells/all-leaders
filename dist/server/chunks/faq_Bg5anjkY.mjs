import { c as createComponent } from './astro-component_CJvBYnlV.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_hrxctkJq.mjs';
import { $ as $$Layout } from './Layout_BdTiism6.mjs';
import { $ as $$FAQ } from './FAQ_D__kcZb-.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "FAQ - All Leaders", "metaTitle": "Frequently Asked Questions - All Leaders Initiative", "metaDescription": "Frequently asked questions about leadership, team management and workplace well-being.", "lang": "en", "data-astro-cid-3vicoclc": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-3vicoclc> <h1 class="font-serif text-limolo-green mb-2 text-center" data-astro-cid-3vicoclc>Frequently Asked Questions</h1> <p class="text-center text-gray-600 mb-12" data-astro-cid-3vicoclc>Find answers to the most frequently asked questions, organized by profile</p> <!-- FAQ Component --> ${renderComponent($$result2, "FAQ", $$FAQ, { "lang": "en", "fullBleed": true, "data-astro-cid-3vicoclc": true })} </div> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/faq.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/faq.astro";
const $$url = "/en/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
