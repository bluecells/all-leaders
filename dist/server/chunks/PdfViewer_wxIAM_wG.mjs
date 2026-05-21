import { c as createComponent } from './astro-component_BSMsVI9A.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate } from './server_9mu4lEgk.mjs';
import 'clsx';

const $$PdfViewer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PdfViewer;
  const { url, height = "600px" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="pdf-container" data-astro-cid-ajzbdd47> <iframe${addAttribute(url, "src")} width="100%"${addAttribute(height, "height")} style="border: none;" title="PDF Viewer" data-astro-cid-ajzbdd47>
    <p>Votre navigateur ne supporte pas l'affichage des PDF. <a href={url}>Cliquez ici pour
    télécharger le fichier.</a> </p>
  </iframe> </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/PdfViewer.astro", void 0);

export { $$PdfViewer as $ };
