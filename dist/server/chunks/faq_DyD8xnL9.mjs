import { c as createComponent } from './astro-component_D9RisZeo.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_OFJBMwYC.mjs';
import { $ as $$Layout } from './Layout_CZO6y2_2.mjs';
import { $ as $$FAQ } from './FAQ_Bw4j0yLt.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "FAQ - All Leaders", "metaTitle": "Foire aux Questions - All Leaders Initiative", "metaDescription": "Questions fréquemment posées sur le leadership, la gestion d'équipe et le bien-être au travail.", "lang": "fr", "data-astro-cid-6kmwghhu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-6kmwghhu> <h1 class="font-serif text-limolo-green mb-2 text-center" data-astro-cid-6kmwghhu>Foire aux Questions</h1> <p class="text-center text-gray-600 mb-12" data-astro-cid-6kmwghhu>Retrouvez les réponses aux questions les plus fréquemment posées, organisées par profil</p> <!-- FAQ Component --> ${renderComponent($$result2, "FAQ", $$FAQ, { "lang": "fr", "fullBleed": true, "data-astro-cid-6kmwghhu": true })} </div> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/faq.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
