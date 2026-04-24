import { c as createComponent } from './astro-component_BQvOssEf.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_DLCPDVwv.mjs';
import { a as getEntry, r as renderEntry } from './_astro_content_BlBih-pA.mjs';
import { $ as $$Layout } from './Layout_B3Z9WxEI.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const page = await getEntry("pages", "fr/chambres");
  if (!page) {
    return Astro2.redirect("/404");
  }
  const { Content } = await renderEntry(page);
  const { title, metaTitle, metaDescription } = page.data;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": metaTitle || title, "description": metaDescription || "" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="container mx-auto px-4 py-12 max-w-4xl prose prose-lg"> ${renderComponent($$result2, "Content", Content, {})} </article> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/fr/chambres/index.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/fr/chambres/index.astro";
const $$url = "/fr/chambres";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
