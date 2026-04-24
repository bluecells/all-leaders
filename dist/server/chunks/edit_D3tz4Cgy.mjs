import { c as createComponent } from './astro-component_D7rd0kp0.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_D2WlyLFw.mjs';
import { $ as $$Layout } from './Layout_Ded80aF0.mjs';

const $$Edit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "All Leaders - Conseil en Performance Collective", "description": "All Leaders Initiative accompagne les équipes managériales et dirigeants vers le leadership basé sur l'intention.", "lang": "fr" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-white"> <div class="container mx-auto px-4 py-16"> <div class="flex justify-between items-center mb-8"> <div> <h1 class="text-4xl font-bold text-gray-900 mb-4">
Bienvenue à All Leaders
</h1> <p class="text-xl text-gray-600">
Conseil en performance collective pour dirigeants et équipes
</p> </div> <a href="/keystatic" target="_blank" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
Admin
</a> </div> <div class="grid md:grid-cols-3 gap-8 mb-12"> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-blue-600">Diagnostic</h2> <p class="text-gray-600">Analyse approfondie de votre dynamique d'équipe</p> </div> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-green-600">Feuille de Route</h2> <p class="text-gray-600">Définition d'une stratégie alignée et partagée</p> </div> <div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"> <h2 class="text-2xl font-semibold mb-4 text-purple-600">Transformation</h2> <p class="text-gray-600">Accompagnement vers un leadership partagé</p> </div> </div> <div class="bg-gray-50 p-8 rounded-lg"> <h2 class="text-3xl font-bold mb-6 text-gray-900">Site multilingue</h2> <div class="flex gap-4"> <a href="/" class="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors">
🇫🇷 Français
</a> <a href="/en" class="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
🇬🇧 English
</a> </div> <p class="mt-6 text-gray-600">
Le site est configuré en deux langues. Cliquez sur le lien « Admin » ci-dessus pour accéder à Keystatic et gérer les contenus.
</p> </div> </div> </main> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/edit.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/edit.astro";
const $$url = "/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
