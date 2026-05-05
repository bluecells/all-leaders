import { c as createComponent } from './astro-component_CKtM7rSL.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server__edj_reH.mjs';
import { $ as $$Layout } from './Layout_D4dKH1zz.mjs';

const $$Edit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "All Leaders - Content Management", "description": "Access the All Leaders content management interface", "lang": "en" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-white"> <div class="container mx-auto px-4 py-16"> <div class="flex justify-between items-center mb-8"> <div> <h1 class="text-4xl font-bold text-gray-900 mb-4">
Welcome to All Leaders
</h1> <p class="text-xl text-gray-600">
Responsible tourism and eco-living
</p> </div> <a href="/keystatic" target="_blank" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
Admin
</a> </div> <div class="grid md:grid-cols-3 gap-8 mb-12"> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-blue-600">Rooms</h2> <p class="text-gray-600">Comfortable and welcoming rooms for your stay</p> </div> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-green-600">Responsible Tourism</h2> <p class="text-gray-600">A sustainable approach to tourism</p> </div> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-purple-600">Eco-living</h2> <p class="text-gray-600">Share experiences with other travelers</p> </div> </div> <div class="bg-gray-50 p-8 rounded-lg"> <h2 class="text-3xl font-bold mb-6 text-gray-900">Multilingual Site</h2> <div class="flex gap-4"> <a href="/" class="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
🇫🇷 Français
</a> <a href="/en/" class="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors">
🇬🇧 English
</a> </div> </div> </div> </main> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/edit.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/edit.astro";
const $$url = "/en/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
