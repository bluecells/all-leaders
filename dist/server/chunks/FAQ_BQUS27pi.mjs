import { c as createComponent } from './astro-component_CG7bSCu1.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, c as renderComponent, F as Fragment, d as renderTemplate, u as unescapeHTML } from './server_BMzEAiM8.mjs';
import { g as getCollection } from './_astro_content_6YVPKdPz.mjs';

const $$FAQ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FAQ;
  const { lang, fullBleed = false } = Astro2.props;
  const allFaqs = await getCollection("faq");
  const faqs = allFaqs.filter((faq) => faq.data.lang === lang).sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  const faqsByCategory = faqs.reduce(
    (acc, faq) => {
      const category = faq.data.category || "autre";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    },
    {}
  );
  const categories = await getCollection("category");
  const categoryMap = new Map(
    categories.map((cat) => [
      cat.data.slug_fr,
      {
        fr: cat.data.name_fr,
        en: cat.data.name_en
      }
    ])
  );
  const getCategoryName = (slug) => {
    const names = categoryMap.get(slug);
    return names ? lang === "fr" ? names.fr : names.en : slug;
  };
  const categoryOrder = ["dirigeant", "manager", "assistant", "collaborateur"];
  const sortedCategories = Object.keys(faqsByCategory).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(fullBleed ? "w-full" : "max-w-5xl mx-auto", "class")} data-astro-cid-al2ca2vr> ${sortedCategories.map((category) => renderTemplate`<div class="mb-12" data-astro-cid-al2ca2vr> <h2 class="text-2xl font-serif text-limolo-green mb-6 pb-2 border-b-2 border-limolo-green" data-astro-cid-al2ca2vr> ${getCategoryName(category)} </h2> <div class="space-y-4" data-astro-cid-al2ca2vr> ${faqsByCategory[category].map((faq) => renderTemplate`<details class="group border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" data-astro-cid-al2ca2vr> <summary class="flex justify-between items-start font-semibold text-gray-900 group-open:text-limolo-green cursor-pointer list-none" data-astro-cid-al2ca2vr> <span class="flex-1 pr-4" data-astro-cid-al2ca2vr>${faq.data.question}</span> <span class="text-limolo-green flex-shrink-0 transition-transform group-open:rotate-180" data-astro-cid-al2ca2vr>
▼
</span> </summary> <div class="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed prose prose-sm max-w-none" data-astro-cid-al2ca2vr> ${faq.body && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(faq.body)}` })}`} </div> </details>`)} </div> </div>`)} ${sortedCategories.length === 0 && renderTemplate`<div class="text-center py-12 text-gray-500" data-astro-cid-al2ca2vr> ${lang === "fr" ? "Aucune FAQ disponible pour le moment." : "No FAQs available at this time."} </div>`} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/FAQ.astro", void 0);

export { $$FAQ as $ };
