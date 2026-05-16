import { c as createComponent } from './astro-component_dd-MAECy.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, u as unescapeHTML, c as renderComponent } from './server_Dx_l8faJ.mjs';
import { r as renderScript, $ as $$Layout } from './Layout_D4fzmtad.mjs';
import 'clsx';

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
  }, "style")}> ${items.map((item) => renderTemplate`<article class="grid-item"> ${item.media && !hideIcons && renderTemplate`<div${addAttribute(["grid-item-media", item.isIcon ? "is-icon" : "is-image"], "class:list")}> <img class="buoy-animate"${addAttribute(item.media, "src")}${addAttribute(item.title || "Élément visuel", "alt")} loading="eager" decoding="async"> </div>`} <div class="grid-item-content"> <h3 class="grid-item-title"${addAttribute(`color: ${finalTextColor} !important; text-align:center;`, "style")}> ${item.title} </h3> <div class="grid-item-description"${addAttribute(`color: ${finalTextColor} !important;`, "style")}>${unescapeHTML(parseMarkdown(item.description || ""))}</div> </div> </article>`)} </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/Grid.astro?astro&type=script&index=0&lang.ts")}`;
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
    visibleItemsDesktop = 3
  } = Astro2.props;
  const limitedImages = images.slice(0, 10);
  const duplicatedImages = [...limitedImages, ...limitedImages];
  return renderTemplate`${maybeRenderHead()}<section class="carousel full-bleed"${addAttribute(`background-color: ${background};`, "style")} data-astro-cid-th5a4eak> <h3 style="text-align: center;" data-astro-cid-th5a4eak>${unescapeHTML(title)}</h3> <div class="carousel-track-container"${addAttribute(`height: ${height};`, "style")} data-astro-cid-th5a4eak> <div id="generic-track" class="carousel-track"${addAttribute(`--spacing: ${spacing}; --speed: ${speed * limitedImages.length}ms; --visible-mobile: ${visibleItemsMobile}; --visible-desktop: ${visibleItemsDesktop};`, "style")} data-astro-cid-th5a4eak> ${duplicatedImages.map((image) => renderTemplate`<div class="carousel-item" data-astro-cid-th5a4eak> <img${addAttribute(image.image, "src")}${addAttribute(image.alt, "alt")} loading="lazy" draggable="false" data-astro-cid-th5a4eak> </div>`)} </div> </div> </section>  ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/Carousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/Carousel.astro", void 0);

const $$ContinuumGrid = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="continuum-wrapper" role="img" aria-label="Continuum de la performance collective" data-astro-cid-qca56dd4> <div class="continuum-grid" data-astro-cid-qca56dd4> <!-- Ligne 1 --> <div class="grid-cell cell-red ligne-1" data-text="Groupe dysfonctionnel" data-row="1" data-col="1" data-colspan="3" data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div class="grid-cell cell-blue ligne-1" data-text="Collectif hautement performant" data-row="1" data-col="6" data-colspan="3" data-astro-cid-qca56dd4></div> <!-- Ligne 2 --> <div data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-red" data-text="Difficultés à résoudre" data-row="2" data-col="1" data-colspan="2" data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-purple" data-text="Opportunités à développer" data-row="2" data-col="3" data-colspan="2" data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-blue" data-text="(Sur)performance à maintenir" data-row="2" data-col="7" data-colspan="3" data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <!-- Ligne 3 --> <div class="grid-cell red" data-text="Troubles de la santé mentale" data-row="3" data-col="1" data-astro-cid-qca56dd4></div> <div class="grid-cell red" data-text="Épuisement" data-row="3" data-col="2" data-astro-cid-qca56dd4></div> <div class="grid-cell red" data-text="Risques psychosociaux" data-row="3" data-col="3" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Frictions et Tensions" data-row="3" data-col="4" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Conflictualité" data-row="3" data-col="5" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Régulation" data-row="3" data-col="6" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Confiance" data-row="3" data-col="7" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Cohésion" data-row="3" data-col="8" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Esprit d'équipage" data-row="3" data-col="9" data-astro-cid-qca56dd4></div> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/ContinuumGrid.astro?astro&type=script&index=0&lang.ts")}`;
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
  return renderTemplate`${maybeRenderHead()}<div class="compass-main" data-astro-cid-denskwaw> <h3 class="text-center! w-full mx-auto max-w-4xl! md:pb-2 md:pt-0" data-astro-cid-denskwaw>
Transformer les <strong data-astro-cid-denskwaw>intentions en actions</strong> concrètes, pour des équipes agissant avec <strong data-astro-cid-denskwaw>sens, clarté et impact.</strong> </h3> <div class="compass-container" data-astro-cid-denskwaw> <div class="compass-perspective-wrapper" data-astro-cid-denskwaw> <div class="compass-rose-bg" id="compassRoseBg" data-astro-cid-denskwaw></div> <div class="compass-compass-fixed" data-astro-cid-denskwaw></div> <div class="compass-orbit" id="compassOrbit" data-astro-cid-denskwaw> <a href="/accompagnements#category-gestion-de-la-conflictualite" class="compass-link" data-index="0" data-astro-cid-denskwaw><span data-astro-cid-denskwaw>🔗 Gestion de la<br data-astro-cid-denskwaw>conflictualité</span></a> <a href="/accompagnements#category-diagnostic-de-la-performance" class="compass-link" data-index="1" data-astro-cid-denskwaw><span data-astro-cid-denskwaw>🔗 Diagnostic de la<br data-astro-cid-denskwaw>performance</span></a> <a href="/accompagnements#category-executive-coaching" class="compass-link" data-index="2" data-astro-cid-denskwaw><span data-astro-cid-denskwaw>🔗 Executive<br data-astro-cid-denskwaw>coaching</span></a> <a href="/accompagnements#category-sante-mentale-et-performance-durable" class="compass-link" data-index="3" data-astro-cid-denskwaw><span data-astro-cid-denskwaw>🔗 Santé mentale et<br data-astro-cid-denskwaw>performance durable</span></a> <a href="/accompagnements#category-leadership-development" class="compass-link" data-index="4" data-astro-cid-denskwaw><span data-astro-cid-denskwaw>🔗 Leadership<br data-astro-cid-denskwaw>development</span></a> <a href="/accompagnements#category-coaching-equipe" class="compass-link" data-index="5" data-astro-cid-denskwaw><span data-astro-cid-denskwaw>🔗 Coaching<br data-astro-cid-denskwaw>d'équipe</span></a> </div> </div> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/CompassLinks.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/CompassLinks.astro", void 0);

const $$BentoReviews = createComponent(($$result, $$props, $$slots) => {
  const allReviews = [
    {
      id: 1,
      name: "Anne-Flore Roger",
      role: "Directrice Réseaux et Services Mobiles, Orange",
      rating: 5,
      text: "Notre équipe de direction est aujourd’hui plus engagée, cohérente et confiante dans ses orientations. "
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
      text: "Une posture de « sparring partner » stratégique… Une expertise pédagogique de haut niveau… Vision systémique et agilité."
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
  return renderTemplate`${maybeRenderHead()}<section class="bento-reviews-section" data-astro-cid-eflpxagd> <div class="bento-grid" data-astro-cid-eflpxagd> ${allReviews.map((review, index) => {
    let colSpan = "";
    let rowSpan = "";
    if (index === 2) {
      colSpan = "col-span-2";
    }
    if (index === 3) {
      rowSpan = "row-span-2";
    }
    return renderTemplate`<article${addAttribute(`review-card ${colSpan} ${rowSpan}`, "class")}${addAttribute(review.id, "data-review-id")} data-astro-cid-eflpxagd> <h4 class="client-name" data-astro-cid-eflpxagd>${review.name}</h4> <p class="client-role" data-astro-cid-eflpxagd>${review.role}</p> <div class="rating" data-astro-cid-eflpxagd> ${Array.from({ length: review.rating }).map(() => renderTemplate`<svg class="star" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-eflpxagd> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-astro-cid-eflpxagd></path> </svg>`)} </div> <p class="testimonial-text" data-astro-cid-eflpxagd>${review.text}</p> </article>`;
  })} </div> </section> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/BentoReviews.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/BentoReviews.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ${renderComponent($$result, "Layout", $$Layout, { "title": "All Leaders Initiative — Leadership basé sur l'intention pour dirigeants et équipes managériales", "lang": "fr", "metaTitle": "All Leaders Initiative — Conseil en Leadership et Performance Collective", "metaDescription": "All Leaders Initiative accompagne les équipes managériales, comités de direction et dirigeants pour dépasser les blocages collectifs et développer un leadership basé sur l'intention.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto md:py-12 hero-section" data-astro-cid-j7pv25f6> <!-- Hero Title - Animé après --> <div class="hero-title" data-astro-cid-j7pv25f6> <h1 class="mb-0! py-0! text-xl! font-base md:text-3xl! leading-8 md:leading-10" style="opacity: 0;" data-astro-cid-j7pv25f6> <q data-astro-cid-j7pv25f6>&nbsp;Toutes les équipes performantes se ressemblent.<br data-astro-cid-j7pv25f6>
Mais chaque équipe dysfonctionnelle l'est à sa façon.&nbsp;</q> </h1> <h2 class="hero-quote hero-question text-3xl! md:text-4xl! not-italic! mt-6!" data-astro-cid-j7pv25f6> <span class="question-dash" data-astro-cid-j7pv25f6>&mdash; Et </span><span class="question-word" data-astro-cid-j7pv25f6>la vôtre&nbsp;?</span> </h2> </div> </div> <div class="mx-auto hero-section" data-astro-cid-j7pv25f6> <!-- Hero Title - Animé après --> <!-- Hero Quote - Centre au début, puis slide vers le bas --> <div class="hero-quote-wrapper" data-astro-cid-j7pv25f6> <p class="mx-auto" data-astro-cid-j7pv25f6>
Vous sentez qu'il serait possible de <strong data-astro-cid-j7pv25f6>mieux collaborer</strong>, de retrouver du <strong data-astro-cid-j7pv25f6>sens</strong>, de <strong data-astro-cid-j7pv25f6>fluidifier les relations</strong>… mais quelque chose bloque. Des habitudes
        ancrées, des non-dits, un manque de clarté.<br data-astro-cid-j7pv25f6> </p> <p class="mx-auto text-2xl!" data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>Ces frontières invisibles<br data-astro-cid-j7pv25f6> freinent votre épanouissement et<br data-astro-cid-j7pv25f6> la dynamique collective.</strong> </p> <nav aria-label="Navigation principale" data-astro-cid-j7pv25f6> <a href="/contact" class="mt-4 btn btn-secondary" data-astro-cid-j7pv25f6>Il est temps de <strong data-astro-cid-j7pv25f6>les dépasser</strong></a> </nav> </div> <main data-astro-cid-j7pv25f6> <!-- ==========================================
         SECTION 1 — Pourquoi All Leaders Initiative
    =========================================== --> <section id="notre-approche" aria-labelledby="h2-pourquoi" data-astro-cid-j7pv25f6> <div class="container min-h-0 md:py-12" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 id="h2-fondateurs" class="text-center! mt-8" data-astro-cid-j7pv25f6>
Nous avons créé<br data-astro-cid-j7pv25f6><span class="brand-text" data-astro-cid-j7pv25f6>
ALL <span class="leaders" data-astro-cid-j7pv25f6>LE<span class="stylized-a" data-astro-cid-j7pv25f6>A</span>DERS</span> <span class="thin" data-astro-cid-j7pv25f6>INITIATIVE</span> </span> </h2> <p class="text-center" data-astro-cid-j7pv25f6>
Pour vous permettre de questionner ce qui ne fonctionne plus, oser de nouvelles façons
              d'agir et <strong data-astro-cid-j7pv25f6>vous affranchir de ces barrières invisibles.</strong> Pour réussir,
<strong data-astro-cid-j7pv25f6>ensemble</strong>.
</p> </div> </div> <div class="values-section" data-astro-cid-j7pv25f6>  <div id="fondateurs" class="values-image-left hidden order-2 md:order-1 md:flex" data-astro-cid-j7pv25f6> <img src="/images/pages/marie-emmanuelle-py-acquarelle.webp" alt="Marie-Emmanuelle Py" class="w-full h-auto object-cover" data-astro-cid-j7pv25f6> <h3 class="mb-1" itemprop="name" data-astro-cid-j7pv25f6>Marie Emmanuelle PY</h3> <p class="mb-8 uppercase text-slate-400" itemprop="jobTitle" data-astro-cid-j7pv25f6>Associée fondatrice</p> <ul class="contact-list" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6> <a href="mailto:me@all-leaders.fr" itemprop="email" aria-label="Envoyer un email à Marie Emmanuelle Py" data-astro-cid-j7pv25f6>
me@all-leaders.fr
</a> </li> <li data-astro-cid-j7pv25f6> <a href="tel:+33603555452" itemprop="telephone" aria-label="Appeler Marie Emmanuelle Py" data-astro-cid-j7pv25f6>
+33 6 03 55 54 52
</a> </li> <li data-astro-cid-j7pv25f6> <a href="https://www.linkedin.com/in/mepy/" rel="noopener noreferrer" target="_blank" aria-label="Profil LinkedIn de Marie Emmanuelle Py" data-astro-cid-j7pv25f6>
LinkedIn
</a> </li> <li data-astro-cid-j7pv25f6> <a href="/equipe-all-leaders/marie-emmanuelle-py" rel="noopener noreferrer" target="_blank" aria-label="Profil complet de Marie Emmanuelle Py" data-astro-cid-j7pv25f6>
Profil complet
</a> </li> </ul> </div> <div class="values-grid order-1 md:order-2" role="list" data-astro-cid-j7pv25f6> <article role="listitem" data-astro-cid-j7pv25f6> <h3 class="pt-8" data-astro-cid-j7pv25f6>Nous aimons l'entreprise</h3> <p class="text-center text-[.9rem]!" data-astro-cid-j7pv25f6>
Nous y avons grandi et en avons tiré beaucoup de fierté. Nous savons qu'elle doit
                offrir un cadre qui favorise la responsabilité, la solidarité et l'initiative.
</p> </article> <article role="listitem" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Nous croyons en l'humain</h3> <p class="text-center text-[.9rem]!" data-astro-cid-j7pv25f6>
Grâce à la sécurité psychologique et à l'affirmation de son intention, chacun peut
                devenir leader et choisir consciemment d'influencer positivement son environnement.
</p> <p class="text-center text-[.9rem]!" data-astro-cid-j7pv25f6>
Nos parcours de marins, dans la sécurité nucléaire et une grande diversité de
                cultures managériales nous ont appris à voir les organisations comme des
                équipages&nbsp;: des collectifs qui gagnent en cultivant courage, cohésion,
                alignement et sens. C'est dans cet esprit que nous vous accompagnons, avec la
                discipline des marins et l'audace des aventuriers.
</p> <div class="cap-container" data-astro-cid-j7pv25f6> <p class="text-center text-4xl! pb-12 mb-0!" data-astro-cid-j7pv25f6>Cap&nbsp;?</p> <img class="ali-logo-watercolour" src="images/pages/logo-ali-aquarelle.webp" alt="Logo All Leaders Initiative" data-astro-cid-j7pv25f6> </div> </article> </div> <div class="values-image-right order-2 md:order-3 md:flex" data-astro-cid-j7pv25f6> <img src="/images/pages/pierre-etienne-bost-acquarelle.webp" alt="Pierre-Etienne Bost" class="w-full h-auto object-cover" data-astro-cid-j7pv25f6> <h3 class="mb-1" itemprop="name" data-astro-cid-j7pv25f6>Pierre-Etienne BOST</h3> <p class="mb-8 uppercase text-slate-400" itemprop="jobTitle" data-astro-cid-j7pv25f6>Associé fondateur</p> <ul class="contact-list" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6> <a href="mailto:pe@all-leaders.fr" itemprop="email" aria-label="Envoyer un email à Pierre-Etienne Bost" data-astro-cid-j7pv25f6>
pe@all-leaders.fr
</a> </li> <li data-astro-cid-j7pv25f6> <a href="tel:+33685540511" itemprop="telephone" aria-label="Appeler Pierre-Etienne Bost" data-astro-cid-j7pv25f6>
+33 6 85 54 05 11
</a> </li> <li data-astro-cid-j7pv25f6> <a href="https://www.linkedin.com/in/pebost/#" rel="noopener noreferrer" target="_blank" aria-label="Profil LinkedIn de Pierre-Etienne Bost" data-astro-cid-j7pv25f6>
LinkedIn
</a> </li> <li data-astro-cid-j7pv25f6> <a href="/equipe-all-leaders/pierre-etienne-bost" rel="noopener noreferrer" target="_blank" aria-label="Profil complet de Pierre-Etienne Bost" data-astro-cid-j7pv25f6>
Profil complet
</a> </li> </ul> </div> </div> </section> </main> <!-- ==========================================
         SECTION 2 — Offre / Continuum
    =========================================== --> <section id="offre" aria-labelledby="h2-offre" class="py-16" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 class="mb-0 mt-0 texte-gradient" data-astro-cid-j7pv25f6>
Coaching de performance collective&nbsp;: nous intervenons sur tout le <strong data-astro-cid-j7pv25f6>continuum de la performance collective</strong> </h2> <!-- Mobile : version simplifiée --> <div class="mobile-continuum-section md:hidden" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ContinuumGridMobile", $$ContinuumGridMobile, { "data-astro-cid-j7pv25f6": true })} </div> <!-- Desktop : version complète --> <div class="hidden md:block" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ContinuumGrid", $$ContinuumGrid, { "data-astro-cid-j7pv25f6": true })} </div> ${renderComponent($$result2, "Grid", $$Grid, { "textColor": "var(--color-text-primary)", "items": [
    {
      title: "Bien-être mental fondamental à récréer",
      media: "/images/pages/marque-de-danger-isole.webp"
    },
    {
      title: "Amplifier les points forts et réguler les vecteurs de vulnérabilité",
      media: "/images/pages/balise-speciale.webp"
    },
    {
      title: "Déployer le leadership à tout niveau (leadership basé sur l’intention)",
      media: "/images/pages/bouee-eaux-saines.webp"
    }
  ], "data-astro-cid-j7pv25f6": true })} <!--         <p class="text-center mt-4">
          Nous accompagnons les équipes managériales, comités de direction et dirigeants pour
          dépasser les blocages collectifs et développer un leadership basé sur l'intention.
        </p> --> <div class="py-0 md:py-12 flex flex-col items-center gap-4" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>
Nous avons accompagné de nombreuses équipes managériales, comités de direction et
            dirigeants exigeants actifs chez&nbsp;
</h3> ${renderComponent($$result2, "Carousel", $$Carousel, { "speed": 3500, "visibleItemsMobile": 1.5, "visibleItemsDesktop": 5, "images": [
    { image: "/images/pages/homeserve.png", alt: "HomeServe" },
    { image: "/images/pages/edf.png", alt: "EDF" },
    { image: "/images/pages/vinci-constructions.png", alt: "Vinci Constructions" },
    { image: "/images/pages/opinionway.png", alt: "OpinionWay" },
    { image: "/images/pages/orange.png", alt: "Orange" },
    { image: "/images/pages/samsung.png", alt: "Samsung" },
    { image: "/images/pages/oph.png", alt: "OPH Castres" },
    { image: "/images/pages/atelier-martel.png", alt: "Atelier Martel" },
    { image: "/images/pages/tss.png", alt: "TSS" },
    { image: "/images/pages/fiphfp.png", alt: "FipHfp" },
    { image: "/images/pages/cea.png", alt: "CEA" },
    { image: "/images/pages/potel-chabot.png", alt: "Potel&Chabot" },
    { image: "/images/pages/stryker.png", alt: "Stryker" },
    { image: "/images/pages/dedalus.png", alt: "Dedalus" },
    { image: "/images/pages/wano.png", alt: "Wano" }
  ], "data-astro-cid-j7pv25f6": true })} </div> ${renderComponent($$result2, "BentoReviews", $$BentoReviews, { "data-astro-cid-j7pv25f6": true })} </div> </section> ${renderComponent($$result2, "CompassLinks", $$CompassLinks, { "data-astro-cid-j7pv25f6": true })} <!-- ==========================================
         SECTION 3 — Partenaires & Écosystème
    =========================================== --> <section id="ecosysteme" aria-labelledby="h2-ecosysteme" class="py-0 md:py-16" data-astro-cid-j7pv25f6> <div class="container mx-auto" data-astro-cid-j7pv25f6> <h2 id="h2-ecosysteme" class="text-center! mt-8" data-astro-cid-j7pv25f6>
Découvrez ceux qui naviguent avec vous et incarnent <strong data-astro-cid-j7pv25f6>le leadership</strong> que nous
          développons.
</h2> <p class="text-center! mt-4" data-astro-cid-j7pv25f6>
Un écosystème de partenaires experts en leadership et cohésion d'équipe
</p> <ul class="partners-list max-w-4xl mx-auto px-4" role="list" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-bureau-du-reel.webp" alt="Logo du Bureau du Réel" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Le Bureau du Réel</h3> <p data-astro-cid-j7pv25f6> <span class="brand-text" data-astro-cid-j7pv25f6>
ALL <span class="leaders" data-astro-cid-j7pv25f6>LE<span class="stylized-a" data-astro-cid-j7pv25f6>A</span>DERS</span> <span class="thin" data-astro-cid-j7pv25f6>INITIATIVE</span> </span>est partie prenante du Bureau du Réel, un réseau d'intervenants pour des
                  formats de conférences disruptifs et centrés sur l'expérience vécue.
</p> <a href="https://www.bureaudureel.fr/" aria-label="En savoir plus sur le Bureau du Réel" data-astro-cid-j7pv25f6>Découvrir des conférenciers disruptifs</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-da-crew.webp" alt="Logo de Da CREW" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Da CREW — Mission One</h3> <p data-astro-cid-j7pv25f6>
Simulation en réalité virtuelle&nbsp;: application concrète du Leadership basé sur
                  l'intention, faisant collaborer à « haute intensité » un équipage d'hélicoptère et
                  un équipage de sous-marin. Cette mission révèle les failles de communication et de
                  collaboration, et permet d'expérimenter et d'ancrer de nouveaux comportements
                  ajustés.
</p> <a href="https://da-crew.org" aria-label="En savoir plus sur Da CREW Mission One" data-astro-cid-j7pv25f6>De l'équipe à l'équipage : simulation en VR</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-your-safety-training.webp" alt="Logo de YourSafety.training" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>YourSafety.training — Gestion des conflits</h3> <p data-astro-cid-j7pv25f6>
Parce qu'on ne peut parler de relations sans parler de conflits, d'agressivité
                  voire de violence, nous avons intégré à notre expertise la gestion professionnelle
                  des conflits avec notre partenaire <b data-astro-cid-j7pv25f6>Jérôme Bouteiller</b>.
</p> <a href="https://yoursafety.training" aria-label="En savoir plus sur YourSafety.training" data-astro-cid-j7pv25f6>Restaurer ou préserver la relation en cas de conflit</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-synergie-et-co.png" alt="Logo de Synergies & Co" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Synergies &amp; Co — Excellence opérationnelle</h3> <p data-astro-cid-j7pv25f6>
Parce que la performance dépend de l'adoption des bonnes postures, nous nous
                  associons à l'ancien dirigeant et militaire d'élite <b data-astro-cid-j7pv25f6>Olivier Crosetta</b> et son cabinet
                  Synergies &amp; Co pour décliner l'excellence opérationnelle à tous niveaux.
</p> <a href="https://www.synergiesandco.com/" aria-label="En savoir plus sur Synergies et Co" data-astro-cid-j7pv25f6>Du terrain militaire au board : la performance naît des gens.</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-pragmacie.svg" alt="Logo de Pragmacie" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Pragmacie — Cartographie des talents CliftonStrengths</h3> <p data-astro-cid-j7pv25f6>
Parce qu'on ne peut parler de leadership sans alignement profond avec ses talents
                  naturels, nous avons intégré à notre expertise la cartographie des points forts
                  avec notre partenaire Pragmacie, certifié Gallup CliftonStrengths (ex
                  StrengthsFinder).
</p> <a href="https://www.pragmacie.com/" aria-label="En savoir plus sur Pragmacie" data-astro-cid-j7pv25f6>Gallup CliftonStrengths, sans le PDF</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-enablers-network.webp" alt="Logo d'Enablers" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Enablers — Accompagnement international</h3> <p data-astro-cid-j7pv25f6>
Pour accompagner vos défis organisationnels les plus complexes et à
                  l'international, nous sommes connectés à une communauté internationale et
                  multiculturelle de professionnels chevronnés.
</p> <a href="https://enablersnetwork.com/" aria-label="En savoir plus sur Enablers" data-astro-cid-j7pv25f6>Quand la disruption arrive — et elle arrive — ils sont déjà là.</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-fa3r.webp" alt="Logo de FA3R" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>FA3R — Expériences outdoor sur mesure</h3> <p data-astro-cid-j7pv25f6>
Parce que nous voulons proposer des expériences « out-door » sur mesure allant
                  plus loin dans les possibilités scénaristiques et l'engagement de vos équipes, en
                  toute sécurité, nous nous associons avec nos « frères d'armes » FA3R.
</p> <a href="https://www.fa3r.fr/" aria-label="En savoir plus sur FA3R" data-astro-cid-j7pv25f6>Apprendre sous stress, décider sous pression, tenir ensemble.</a> </div> </article> </li> </ul> </div> </section> </div> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/index.astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
