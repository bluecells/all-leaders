import { c as createComponent } from './astro-component_D7uSGJcc.mjs';
import 'piccolore';
import { m as maybeRenderHead, f as renderSlot, d as renderTemplate } from './server_eCKIsiba.mjs';
import 'clsx';

const $$Container = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto max-w-7xl px-0 md:px-8"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/Container.astro", void 0);

export { $$Container as $ };
