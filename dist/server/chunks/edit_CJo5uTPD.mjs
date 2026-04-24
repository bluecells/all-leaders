import { c as createComponent } from './astro-component_BQvOssEf.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_DLCPDVwv.mjs';
import { $ as $$Layout } from './Layout_B3Z9WxEI.mjs';

const $$Edit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Limolo - Tourisme Responsable et Co-living", "description": "Découvrez nos 6 chambres confortables. Tourisme responsable et co-living dans un environnement authentique.", "lang": "fr" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-white"> <div class="container mx-auto px-4 py-16"> <div class="flex justify-between items-center mb-8"> <div> <h1 class="text-4xl font-bold text-gray-900 mb-4">
Bienvenue à Limolo
</h1> <p class="text-xl text-gray-600">
Tourisme responsable et co-living dans 6 chambres confortables
</p> </div> <a href="/keystatic" target="_blank" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
Admin
</a> </div> <div class="grid md:grid-cols-3 gap-8 mb-12"> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-blue-600">6 Chambres</h2> <p class="text-gray-600">Chambres confortables et accueillantes pour votre séjour</p> </div> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-green-600">Tourisme Responsable</h2> <p class="text-gray-600">Une approche durable du tourisme</p> </div> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-purple-600">Co-living</h2> <p class="text-gray-600">Partagez des expériences avec d'autres voyageurs</p> </div> </div> <div class="bg-gray-50 p-8 rounded-lg"> <h2 class="text-3xl font-bold mb-6 text-gray-900">Site multilingue</h2> <div class="flex gap-4"> <a href="/" class="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
🇮🇹 Italiano
</a> <a href="/fr/" class="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors">
🇫🇷 Français
</a> <a href="/en/" class="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
🇬🇧 English
</a> </div> <p class="mt-6 text-gray-600">
Le site est configuré en trois langues. Cliquez sur le lien « Admin » ci-dessus pour accéder à Keystatic et gérer le contenu.
</p> </div> </div> </main> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/fr/edit.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/fr/edit.astro";
const $$url = "/fr/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
