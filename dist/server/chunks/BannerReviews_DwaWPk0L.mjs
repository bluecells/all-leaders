import { c as createComponent } from './astro-component_CBbIRNKv.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, u as unescapeHTML } from './server_C9Y93v7l.mjs';
import 'clsx';
import { r as renderScript } from './Layout_BC1iEP4H.mjs';

const $$Grid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Grid;
  function parseMarkdown(text) {
    if (!text) return "";
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    text = text.replace(/\n/g, "<br/>");
    return text;
  }
  const {
    items = [],
    hideIcons = false,
    minWidth = "0",
    gap = ".5rem",
    padding = ".75rem",
    background = "transparent",
    fullBleed = false,
    class: className = "",
    textColor = "white",
    // ← blanc par défaut partout
    reverse = false,
    // ← inverse l'ordre media/title
    mobileCols = "1",
    tabletCols = "2",
    xlCols = "3"
  } = Astro2.props;
  const finalTextColor = textColor;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["grid-wrapper", "hide-on-mobile", fullBleed && "grid-fullbleed"], "class:list")}${addAttribute(`background-color: ${background}; --dynamic-text: ${finalTextColor};`, "style")}> <div${addAttribute(["grid-container", className], "class:list")}${addAttribute({
    "--grid-minwidth": minWidth,
    "--grid-gap": gap,
    "--grid-padding": padding,
    "--cols-mobile": mobileCols ?? "auto-fit",
    "--cols-tablet": tabletCols ?? "auto-fit",
    "--cols-xl": xlCols ?? "auto-fit"
  }, "style")}> ${items.map((item) => renderTemplate`<article${addAttribute(["grid-item", reverse && "grid-item-reverse"], "class:list")}> ${item.media && !hideIcons && renderTemplate`<div${addAttribute(["grid-item-media", item.isIcon ? "is-icon" : "is-image"], "class:list")}> <img class="buoy-animate"${addAttribute(item.media, "src")}${addAttribute(item.title || "Élément visuel", "alt")} loading="eager" decoding="async"> </div>`} <div class="grid-item-content"> <h3 class="grid-item-title">${unescapeHTML(item.title)}</h3> <div class="grid-item-description"${addAttribute(`color: ${finalTextColor} !important;`, "style")}>${unescapeHTML(parseMarkdown(item.description || ""))}</div> </div> </article>`)} </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/Grid.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/Grid.astro", void 0);

const $$Carousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Carousel;
  const {
    images,
    height = "20vh",
    speed = 1e3,
    // Vitesse de base par image
    background = "transparent",
    spacing = "1rem",
    title,
    visibleItemsMobile = 1,
    visibleItemsDesktop = 5
  } = Astro2.props;
  const limitedImages = images.slice(0, 10);
  const duplicatedImages = [...limitedImages, ...limitedImages];
  return renderTemplate`${maybeRenderHead()}<section class="carousel full-bleed"${addAttribute(`background-color: ${background};`, "style")} data-astro-cid-th5a4eak> <h3 style="text-align: center;" data-astro-cid-th5a4eak>${unescapeHTML(title)}</h3> <div class="carousel-track-container"${addAttribute(`height: ${height};`, "style")} data-astro-cid-th5a4eak> <div id="generic-track" class="carousel-track"${addAttribute(`--spacing: ${spacing}; --speed: ${speed * limitedImages.length}ms; --visible-mobile: ${visibleItemsMobile}; --visible-desktop: ${visibleItemsDesktop};`, "style")} data-astro-cid-th5a4eak> ${duplicatedImages.map((image) => renderTemplate`<div class="carousel-item" data-astro-cid-th5a4eak> <img${addAttribute(image.image, "src")}${addAttribute(image.alt, "alt")} loading="lazy" draggable="false" data-astro-cid-th5a4eak> </div>`)} </div> </div> </section>  ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/Carousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/Carousel.astro", void 0);

const $$ContinuumGrid = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="continuum-wrapper" role="img" aria-label="Continuum de la performance collective" data-astro-cid-qca56dd4> <div class="continuum-grid" data-astro-cid-qca56dd4> <!-- Ligne 1 --> <div class="grid-cell cell-red ligne-1" data-text="Du groupe dysfonctionnel..." data-row="1" data-col="1" data-colspan="3" data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div class="grid-cell cell-blue ligne-1" data-text="... au collectif hautement performant" data-row="1" data-col="6" data-colspan="3" data-astro-cid-qca56dd4></div> <!-- Ligne 2 --> <div data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-red" data-text="Difficultés à résoudre" data-row="2" data-col="1" data-colspan="2" data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-purple" data-text="Opportunités à développer" data-row="2" data-col="3" data-colspan="2" data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-blue" data-text="(Sur)performance à maintenir" data-row="2" data-col="7" data-colspan="3" data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <!-- Ligne 3 --> <div class="grid-cell red" data-text="Troubles de la santé mentale" data-row="3" data-col="1" data-astro-cid-qca56dd4></div> <div class="grid-cell red" data-text="Épuisement" data-row="3" data-col="2" data-astro-cid-qca56dd4></div> <div class="grid-cell red" data-text="Risques psychosociaux" data-row="3" data-col="3" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Frictions et Tensions" data-row="3" data-col="4" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Conflictualité" data-row="3" data-col="5" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Régulation" data-row="3" data-col="6" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Confiance" data-row="3" data-col="7" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Cohésion" data-row="3" data-col="8" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Esprit d'équipage" data-row="3" data-col="9" data-astro-cid-qca56dd4></div> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/ContinuumGrid.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/ContinuumGrid.astro", void 0);

const $$ContinuumGridMobile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="continuum-mobile-outer" data-astro-cid-b5jyzz7c> <div class="continuum-mobile-wrapper" role="img" aria-label="Continuum de la performance collective" data-astro-cid-b5jyzz7c> <div class="continuum-mobile-grid" data-astro-cid-b5jyzz7c> <div class="mobile-zone zone-blue" data-astro-cid-b5jyzz7c> <span data-astro-cid-b5jyzz7c>Collectif hautement performant</span> </div> <div class="mobile-zone zone-3" data-astro-cid-b5jyzz7c> <img class="img-bouees" src="/images/pages/bouee-eaux-saines.webp" alt="" data-astro-cid-b5jyzz7c> <div data-astro-cid-b5jyzz7c> <span data-astro-cid-b5jyzz7c>(Sur)performance à maintenir</span>Déployer le leadership<br data-astro-cid-b5jyzz7c>à tout niveau
</div> </div> <div class="mobile-zone zone-2" data-astro-cid-b5jyzz7c> <img class="img-bouees" src="/images/pages/balise-speciale.webp" alt="" data-astro-cid-b5jyzz7c> <div data-astro-cid-b5jyzz7c> <span data-astro-cid-b5jyzz7c>Opportunités à développer</span>Amplifier les points forts et réguler les
          vulnérabilités
</div> </div> <div class="mobile-zone zone-1" data-astro-cid-b5jyzz7c> <img class="img-bouees" src="/images/pages/marque-de-danger-isole.webp" alt="" data-astro-cid-b5jyzz7c> <div data-astro-cid-b5jyzz7c> <span data-astro-cid-b5jyzz7c>Difficultés à résoudre</span>Bien-être mental<br data-astro-cid-b5jyzz7c>fondamental à récréer
</div> </div> <div class="mobile-zone
            zone-red" data-astro-cid-b5jyzz7c> <span data-astro-cid-b5jyzz7c>Groupe dysfonctionnel</span> </div> </div> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/ContinuumGridMobile.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/ContinuumGridMobile.astro", void 0);

const $$CompassLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CompassLinks;
  return renderTemplate`${maybeRenderHead()}<div class="compass-main" data-astro-cid-denskwaw> <div class="my-6 p-4 shadow-2xl md:shadow-none rounded-md z-50 mx-auto" data-astro-cid-denskwaw> <h3 class="title-compass" data-astro-cid-denskwaw>
Transformer les <strong data-astro-cid-denskwaw>intentions en actions</strong> concrètes, pour des équipes agissant avec
<strong data-astro-cid-denskwaw>sens, clarté et impact.</strong> </h3> </div> <div class="compass-container rounded-lg" data-astro-cid-denskwaw> <div class="compass-left" data-astro-cid-denskwaw></div> <div class="compass-perspective-wrapper" data-astro-cid-denskwaw> <div id="compassRoseBg" data-astro-cid-denskwaw></div> <div class="compass-compass-fixed" data-astro-cid-denskwaw></div> <div class="compass-orbit" id="compassOrbit" data-astro-cid-denskwaw> <a href="/accompagnements#category-gestion-de-la-conflictualite" class="compass-link" data-index="0" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Gestion de<br data-astro-cid-denskwaw>la conflictualité<img src="images/pages/en-savoir-plus.webp" class="image-link" data-astro-cid-denskwaw></span> </a> <a href="/accompagnements#category-diagnostic-de-la-performance" class="compass-link" data-index="1" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Diagnostic de<br data-astro-cid-denskwaw>la performance<img src="images/pages/en-savoir-plus.webp" class="image-link" data-astro-cid-denskwaw></span> </a> <a href="/accompagnements#category-executive-coaching" class="compass-link" data-index="2" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Executive<br data-astro-cid-denskwaw>coaching<img src="images/pages/en-savoir-plus.webp" class="image-link" data-astro-cid-denskwaw></span> </a> <a href="/accompagnements#category-sante-mentale-et-performance-durable" class="compass-link" data-index="3" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Santé mentale et<br data-astro-cid-denskwaw>performance durable<img src="images/pages/en-savoir-plus.webp" class="image-link" data-astro-cid-denskwaw></span> </a> <a href="/accompagnements#category-leadership-development" class="compass-link" data-index="4" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Leadership<br data-astro-cid-denskwaw>development<img src="images/pages/en-savoir-plus.webp" class="image-link" data-astro-cid-denskwaw></span> </a> <a href="/accompagnements#category-coaching-equipes-et-organisations" class="compass-link" data-index="5" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Coaching<br data-astro-cid-denskwaw>d'équipe<img src="images/pages/en-savoir-plus.webp" class="image-link" data-astro-cid-denskwaw></span> </a> </div> </div> <div class="compass-right" data-astro-cid-denskwaw></div> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/CompassLinks.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/CompassLinks.astro", void 0);

const $$BannerReviews = createComponent(($$result, $$props, $$slots) => {
  const allReviews = [
    {
      id: 1,
      name: "Anne-Flore Roger",
      role: "Directrice Réseaux et Services Mobiles, Orange",
      rating: 5,
      text: "Notre équipe de direction est aujourd’hui plus engagée, cohérente et confiante dans ses orientations. "
    },
    {
      id: 2,
      name: "Thibault Lemoigne",
      role: "Directeur de la Relation Clients, HomeServe",
      rating: 5,
      text: "Une démarche de développement pragmatique et adaptée. Un moment de construction collective grâce à la mise en action individuelle de chaque membre dans un principe commun de management : le leadership par l’intention."
    },
    {
      id: 3,
      name: "Christophe Jeanneau",
      role: "DRH de centre nucléaire de production d’électricité, EDF",
      rating: 5,
      text: "Une posture de « sparring partner » stratégique… Une expertise pédagogique de haut niveau… Vision systémique et agilité."
    },
    {
      id: 4,
      name: "Jean-Luc Mitry",
      role: "Directeur du contrôle de gestion de VINCI Construction",
      rating: 5,
      text: "Mission pleinement accomplie à la grande satisfaction des équipes concernées."
    },
    {
      id: 5,
      name: "Martine Neuville",
      role: "Directrice du FIPHFP",
      rating: 5,
      text: "A travers différentes modalités d’accompagnement, j’ai pu mesurer toute l’étendue des compétences à la fois professionnelles et relationnelles de Marie Emmanuelle Py."
    },
    {
      id: 6,
      name: "Acteur de l’industrie nucléaire",
      role: "Chef de service (à l’issue d’un Parcours de développement managérial)",
      rating: 5,
      text: "Ce parcours m’a offert une belle remise en question. Il permet d’objectiver des pratiques, des postures et des réflexions nécessaires à un management plus construit."
    },
    {
      id: 7,
      name: "Acteur de l’industrie nucléaire",
      role: "Chef de service (à l’issue d’un Parcours de développement managérial)",
      rating: 5,
      text: "Les apports de ce parcours sont individuels et collectifs. En pratique le fait de pouvoir s'approprier les concepts managériaux pour les appliquer avec son équipe dynamise les relations"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="banner-reviews-section" data-astro-cid-xz5fuv2a> <div class="banner-container" data-astro-cid-xz5fuv2a> <div class="reviews-track" data-astro-cid-xz5fuv2a> ${allReviews.map((review) => renderTemplate`<div class="review-item"${addAttribute(review.id, "data-review-id")} data-astro-cid-xz5fuv2a> <p class="review-text" data-astro-cid-xz5fuv2a>${review.text}</p> <p class="review-role" data-astro-cid-xz5fuv2a>${review.role}</p> <p class="review-name" data-astro-cid-xz5fuv2a>${review.name}</p> </div>`)} </div> <div class="reviews-dots" data-astro-cid-xz5fuv2a> ${Array.from({ length: Math.ceil(allReviews.length / 3) }).map((_, index) => renderTemplate`<button class="dot"${addAttribute(index, "data-group-index")}${addAttribute(`Groupe ${index + 1}`, "aria-label")} data-astro-cid-xz5fuv2a></button>`)} </div> </div> </section> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/BannerReviews.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/BannerReviews.astro", void 0);

export { $$ContinuumGridMobile as $, $$ContinuumGrid as a, $$Grid as b, $$Carousel as c, $$BannerReviews as d, $$CompassLinks as e };
