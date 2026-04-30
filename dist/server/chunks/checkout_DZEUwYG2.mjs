import { c as createComponent } from './astro-component_BLIHCxi5.mjs';
import 'piccolore';
import { c as renderComponent, d as renderTemplate, m as maybeRenderHead } from './server_DNeM8zG_.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_sU-PIp3w.mjs';

const $$Checkout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Payment - All Leaders", "lang": "en", "metaTitle": "Payment - Booking Engine", "metaDescription": "Online Booking - Redirection to the All Leaders booking engine", "data-astro-cid-saprgz55": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="loader" data-astro-cid-saprgz55> <h1 data-astro-cid-saprgz55>Redirecting to the booking system...</h1> <div class="spinner" data-astro-cid-saprgz55></div> <!-- Correct link with final URL --> <a id="booking-link" href="https://www.bed-and-breakfast.it/en/booking/sardinia/limolo-house-56-green-cabras/57031" data-astro-cid-saprgz55>Go to All Leaders booking engine</a> </div> ` })} ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/pages/en/checkout.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/en/checkout.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/en/checkout.astro";
const $$url = "/en/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
