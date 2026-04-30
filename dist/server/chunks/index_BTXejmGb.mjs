import { c as createComponent } from './astro-component_EQTw1nHg.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, u as unescapeHTML, c as renderComponent } from './server_CPScTQ3A.mjs';
import { r as renderScript, $ as $$Layout } from './Layout_DxFwZnBy.mjs';
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
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["grid-wrapper", fullBleed && "grid-fullbleed"], "class:list")}${addAttribute(`background-color: ${background}; --dynamic-text: ${finalTextColor};`, "style")}> <div${addAttribute(["grid-container", className], "class:list")}${addAttribute({
    "--grid-minwidth": minWidth,
    "--grid-gap": gap,
    "--grid-padding": padding,
    "--cols-mobile": mobileCols ?? "auto-fit",
    "--cols-tablet": tabletCols ?? "auto-fit",
    "--cols-xl": xlCols ?? "auto-fit"
  }, "style")}> ${items.map((item) => renderTemplate`<article class="grid-item"> ${item.media && !hideIcons && renderTemplate`<div${addAttribute(["grid-item-media", item.isIcon ? "is-icon" : "is-image"], "class:list")}> <img class="buoy-animate"${addAttribute(item.media, "src")}${addAttribute(item.title || "Élément visuel", "alt")} loading="lazy" decoding="async"> </div>`} <div class="grid-item-content"> <h3 class="grid-item-title"${addAttribute(`color: ${finalTextColor} !important; text-align:center;`, "style")}> ${item.title} </h3> <div class="grid-item-description"${addAttribute(`color: ${finalTextColor} !important;`, "style")}>${unescapeHTML(parseMarkdown(item.description || ""))}</div> </div> </article>`)} </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/Grid.astro?astro&type=script&index=0&lang.ts")}`;
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
    title
  } = Astro2.props;
  const limitedImages = images.slice(0, 10);
  const duplicatedImages = [...limitedImages, ...limitedImages];
  return renderTemplate`${maybeRenderHead()}<section class="carousel full-bleed"${addAttribute(`background-color: ${background};`, "style")} data-astro-cid-th5a4eak> <h3 style="text-align: center;" data-astro-cid-th5a4eak>${unescapeHTML(title)}</h3> <div class="carousel-track-container"${addAttribute(`height: ${height};`, "style")} data-astro-cid-th5a4eak> <div id="generic-track" class="carousel-track"${addAttribute(`--spacing: ${spacing}; --speed: ${speed * limitedImages.length}ms;`, "style")} data-astro-cid-th5a4eak> ${duplicatedImages.map((image) => renderTemplate`<div class="carousel-item" data-astro-cid-th5a4eak> <img${addAttribute(image.image, "src")}${addAttribute(image.alt, "alt")} loading="lazy" draggable="false" data-astro-cid-th5a4eak> </div>`)} </div> </div> </section>  ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/Carousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/Carousel.astro", void 0);

const $$ContinuumGrid = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="continuum-wrapper" role="img" aria-label="Continuum de la performance collective" data-astro-cid-qca56dd4> <div class="continuum-grid" data-astro-cid-qca56dd4> <!-- Ligne 1 --> <div class="grid-cell cell-red ligne-1" data-text="Groupe dysfonctionnel" data-row="1" data-col="1" data-colspan="3" data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div class="grid-cell cell-blue ligne-1" data-text="Collectif hautement performant" data-row="1" data-col="6" data-colspan="3" data-astro-cid-qca56dd4></div> <!-- Ligne 2 --> <div data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-red" data-text="Difficultés à résoudre" data-row="2" data-col="1" data-colspan="2" data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-purple" data-text="Opportunités à développer" data-row="2" data-col="3" data-colspan="2" data-astro-cid-qca56dd4></div> <div class="grid-cell cell-trans-blue" data-text="(Sur)performance à maintenir" data-row="2" data-col="7" data-colspan="3" data-astro-cid-qca56dd4></div> <div data-astro-cid-qca56dd4></div> <!-- Ligne 3 --> <div class="grid-cell red" data-text="Troubles de la santé mentale" data-row="3" data-col="1" data-astro-cid-qca56dd4></div> <div class="grid-cell red" data-text="Épuisement" data-row="3" data-col="2" data-astro-cid-qca56dd4></div> <div class="grid-cell red" data-text="Risques psychosociaux" data-row="3" data-col="3" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Frictions et Tensions" data-row="3" data-col="4" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Conflictualité" data-row="3" data-col="5" data-astro-cid-qca56dd4></div> <div class="grid-cell purple" data-text="Régulation" data-row="3" data-col="6" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Confiance" data-row="3" data-col="7" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Cohésion" data-row="3" data-col="8" data-astro-cid-qca56dd4></div> <div class="grid-cell bleu" data-text="Esprit d'équipage" data-row="3" data-col="9" data-astro-cid-qca56dd4></div> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/ContinuumGrid.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/ContinuumGrid.astro", void 0);

const $$CompassLinks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="compass-container" data-astro-cid-denskwaw> <img class="compass-image" src="/images/pages/boussole.webp" alt="Boussole" data-astro-cid-denskwaw> <div class="compass-perspective-wrapper" data-astro-cid-denskwaw> <div class="compass-rose-bg" id="compassRoseBg" data-astro-cid-denskwaw></div> <div class="compass-orbit" id="compassOrbit" data-astro-cid-denskwaw> <a href="/accompagnements#gestionConflits" class="compass-link" data-index="0" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Gestion de la<br data-astro-cid-denskwaw>conflictualité</span> </a> <a href="/accompagnements#diagPerf" class="compass-link" data-index="1" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Diagnostic de la<br data-astro-cid-denskwaw>performance</span> </a> <a href="/accompagnements#coaching" class="compass-link" data-index="2" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Coaching de<br data-astro-cid-denskwaw>managers</span> </a> <a href="/accompagnements#sante" class="compass-link" data-index="3" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Santé mentale et<br data-astro-cid-denskwaw>performance durable</span> </a> <a href="/accompagnements#leadership" class="compass-link" data-index="4" data-astro-cid-denskwaw> <span data-astro-cid-denskwaw>Développement<br data-astro-cid-denskwaw>Leadership</span> </a> </div> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/UI/CompassLinks.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/CompassLinks.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ${renderComponent($$result, "Layout", $$Layout, { "title": "All Leaders - Tourisme Responsable", "lang": "fr", "metaTitle": "All Leaders Initiative — Conseil en Leadership et Performance Collective", "metaDescription": "All Leaders Initiative accompagne les équipes managériales, comités de direction et dirigeants pour dépasser les blocages collectifs et développer un leadership basé sur l'intention.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12 hero-section" data-astro-cid-j7pv25f6> <!-- Hero Title - Animé après --> <h1 class="hero-title" style="opacity: 0;" data-astro-cid-j7pv25f6>All Leaders Initiative <span style="display: block; font-size: 2.25rem;" data-astro-cid-j7pv25f6>Conseil en performance collective pour dirigeants et équipes managériales</span></h1> <!-- Hero Quote - Centre au début, puis slide vers le bas --> <div class="hero-quote-wrapper" data-astro-cid-j7pv25f6> <p class="hero-quote pb-0! max-w-5xl mx-auto" data-astro-cid-j7pv25f6> <q data-astro-cid-j7pv25f6>&nbsp;Toutes les équipes performantes se ressemblent.<br data-astro-cid-j7pv25f6>
Mais chaque équipe dysfonctionnelle l'est à sa façon.&nbsp;</q> </p> <p class="hero-quote hero-question text-6xl! not-italic! pt-10!" data-astro-cid-j7pv25f6> <span class="question-dash" data-astro-cid-j7pv25f6>&mdash; Et </span><span class="question-word" data-astro-cid-j7pv25f6>la vôtre&nbsp;?</span> </p> </div> </div> <div class="max-w-3xl mx-auto text-center" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>
Vous sentez qu'il serait possible de <strong data-astro-cid-j7pv25f6>mieux collaborer</strong>, de retrouver du <strong data-astro-cid-j7pv25f6>sens</strong>,
      de <strong data-astro-cid-j7pv25f6>fluidifier les relations</strong>… mais quelque chose bloque.
      Des habitudes ancrées, des non-dits, un manque de clarté.
<strong data-astro-cid-j7pv25f6>Ces frontières invisibles freinent votre épanouissement et la dynamique collective.</strong> </p> <p class="hero-cta-text" data-astro-cid-j7pv25f6>Il est temps de les <strong data-astro-cid-j7pv25f6>dépasser</strong>.</p> <nav aria-label="Navigation principale" data-astro-cid-j7pv25f6> <a href="/contact" class="btn btn-secondary" data-astro-cid-j7pv25f6>Prendre contact</a> </nav> </div> <main data-astro-cid-j7pv25f6> <!-- ==========================================
         SECTION 1 — Pourquoi All Leaders Initiative
    =========================================== --> <section id="notre-approche" aria-labelledby="h2-pourquoi" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 id="h2-pourquoi" data-astro-cid-j7pv25f6>
Dépasser les barrières invisibles de votre équipe
</h2> <p class="text-center" data-astro-cid-j7pv25f6>
Nous avons créé All Leaders Initiative pour vous permettre de questionner ce qui ne fonctionne
          plus, oser de nouvelles façons d'agir et vous affranchir de ces barrières invisibles.
          Pour réussir, ensemble.
</p> <div class="values-section" data-astro-cid-j7pv25f6>  <div class="values-image-left hidden md:flex" data-astro-cid-j7pv25f6> <img src="/images/pages/marie-emmanuelle-py-acquarelle.webp" alt="Marie-Emmanuelle Py" class="w-full h-auto object-cover rounded-lg" data-astro-cid-j7pv25f6> </div> <div class="values-grid" role="list" data-astro-cid-j7pv25f6> <article role="listitem" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>Nous aimons l'entreprise</strong></h3> <p class="text-center" data-astro-cid-j7pv25f6>
Nous y avons grandi et en avons tiré beaucoup de fierté. Nous savons qu'elle doit offrir
                un cadre qui favorise la responsabilité, la solidarité et l'initiative.
</p> </article> <article role="listitem" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>Nous croyons en l'humain</strong></h3> <p class="text-center" data-astro-cid-j7pv25f6>
Grâce à la sécurité psychologique et à l'affirmation de son intention, chacun peut
                devenir leader et choisir consciemment d'influencer positivement son environnement.
</p> </article> <article role="listitem" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>Nous voyons l'organisation comme un équipage</strong></h3> <p class="text-center" data-astro-cid-j7pv25f6>
Nos parcours de marins, dans la sécurité nucléaire et une grande diversité de cultures
                managériales nous ont appris à voir les organisations comme des équipages&nbsp;: des
                collectifs qui gagnent en cultivant courage, cohésion, alignement et sens.
                C'est dans cet esprit que nous vous accompagnons, avec la discipline des marins
                et l'audace des aventuriers.
</p> <img class="w-24 h-24 mx-auto mt-4" src="/images/pages/logo-all-leaders-rond-fonce.svg" alt="Logo All Leaders Initiative" data-astro-cid-j7pv25f6> <p class="text-center mt-4 text-5xl! font-serif" data-astro-cid-j7pv25f6>Cap&nbsp;?</p> </article> </div> <div class="values-image-right hidden md:flex" data-astro-cid-j7pv25f6> <img src="/images/pages/pierre-etienne-bost-acquarelle.webp" alt="Pierre-Etienne Bost" class="w-full h-auto object-cover rounded-lg" data-astro-cid-j7pv25f6> </div>  <div class="md:hidden grid grid-cols-2 gap-4 mb-8" data-astro-cid-j7pv25f6> <img src="/images/pages/marie-emmanuelle-py-acquarelle.webp" alt="Marie-Emmanuelle Py" class="w-full h-auto object-cover rounded-lg" data-astro-cid-j7pv25f6> <img src="/images/pages/pierre-etienne-bost-acquarelle.webp" alt="Pierre-Etienne Bost" class="w-full h-auto object-cover rounded-lg" data-astro-cid-j7pv25f6> </div> </div> </div> </section> <!-- ==========================================
         SECTION 2 — Offre / Continuum
    =========================================== --> <section id="offre" aria-labelledby="h2-offre" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 id="h2-offre" data-astro-cid-j7pv25f6>
Conseil en performance collective&nbsp;: du diagnostic à la transformation
</h2> <h3 class="mb-12" data-astro-cid-j7pv25f6>
Nous intervenons sur tout le <strong data-astro-cid-j7pv25f6>continuum de la performance collective</strong> </h3> ${renderComponent($$result2, "ContinuumGrid", $$ContinuumGrid, { "data-astro-cid-j7pv25f6": true })} <p class="text-center mt-12" data-astro-cid-j7pv25f6>
Nous accompagnons les équipes managériales, comités de direction et dirigeants pour dépasser les
          blocages collectifs et développer un leadership basé sur l'intention. Nous intervenons à tous
          les stades du continuum de la performance collective, du diagnostic à la transformation.
${renderComponent($$result2, "Grid", $$Grid, { "textColor": "var(--color-text-primary)", "items": [
    {
      title: "Bien-être mental fondamental à récréer",
      media: "/images/pages/marque-de-danger-isole.webp",
      description: "Analyse approfondie de la dynamique d’équipe, identification des blocages et des leviers de performance."
    },
    {
      title: "Amplifier les points forts et réguler les vecteurs de vulnérabilité",
      media: "/images/pages/balise-speciale.webp",
      description: "Ateliers collaboratifs pour définir une feuille de route claire et alignée avec les objectifs stratégiques."
    },
    {
      title: "Déployer le leadership à tout niveau (leadership basé sur l’intention)",
      media: "/images/pages/bouee-eaux-saines.webp",
      description: "Accompagnement personnalisé pour mener à bien les transformations organisationnelles, en soutenant les équipes dans leur évolution."
    }
  ], "data-astro-cid-j7pv25f6": true })} </p><h3 data-astro-cid-j7pv25f6>Nous avons accompagné de nombreuses équipes managériales, comités de direction et dirigeants exigeants actifs chez&nbsp;</h3> ${renderComponent($$result2, "Carousel", $$Carousel, { "speed": "5000", "images": [
    { image: "/images/pages/homeserve.png", alt: "HomeServe" },
    { image: "/images/pages/edf.png", alt: "EDF" },
    { image: "/images/pages/vinci.png", alt: "Vinci Construction" },
    { image: "/images/pages/opinionway.png", alt: "OpinionWay" },
    { image: "/images/pages/orange.png", alt: "Orange" }
  ], "data-astro-cid-j7pv25f6": true })} <h3 class="text-center! mt-8" data-astro-cid-j7pv25f6>
Transformer les <strong data-astro-cid-j7pv25f6>intentions en actions</strong> concrètes, pour des équipes agissant avec <strong data-astro-cid-j7pv25f6>sens, clarté et impact</strong>.
</h3> ${renderComponent($$result2, "CompassLinks", $$CompassLinks, { "data-astro-cid-j7pv25f6": true })} <!-- Placeholder pour les modules/offres détaillées --> <div id="offre-modules" aria-label="Nos modules d'intervention" data-astro-cid-j7pv25f6> <!-- Insérer ici les cards d'offres --> </div> </div> </section> <!-- ==========================================
         SECTION 3 — Partenaires & Écosystème
    =========================================== --> <section id="ecosysteme" aria-labelledby="h2-ecosysteme" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 id="h2-ecosysteme" class="text-center! mt-8" data-astro-cid-j7pv25f6>
Un écosystème de partenaires experts en leadership et cohésion d'équipe
</h2> <p class="text-center! mt-4" data-astro-cid-j7pv25f6>
Découvrez ceux qui naviguent avec vous et incarnent <strong data-astro-cid-j7pv25f6>le leadership</strong> que nous développons.
</p> <ul class="partners-list" role="list" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-bureau-du-reel.webp" alt="Logo du Bureau du Réel" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Le Bureau du Réel</h3> <p data-astro-cid-j7pv25f6>
All Leaders Initiative est partie prenante du Bureau du Réel, un réseau d'intervenants
                  pour des formats de conférences disruptifs et centrés sur l'expérience vécue.
</p> <a href="https://www.bureaudureel.fr/" aria-label="En savoir plus sur le Bureau du Réel" data-astro-cid-j7pv25f6>Découvrir des conférenciers disruptifs</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-da-crew.webp" alt="Logo de Da CREW" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Da CREW — Mission One</h3> <p data-astro-cid-j7pv25f6>
Simulation en réalité virtuelle&nbsp;: application concrète du Leadership basé sur
                  l'intention, faisant collaborer à « haute intensité » un équipage d'hélicoptère et un
                  équipage de sous-marin. Cette mission révèle les failles de communication et de
                  collaboration, et permet d'expérimenter et d'ancrer de nouveaux comportements ajustés.
</p> <a href="https://da-crew.org" aria-label="En savoir plus sur Da CREW Mission One" data-astro-cid-j7pv25f6>De l'équipe à l'équipage : simulation en VR</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-your-safety-training.webp" alt="Logo de YourSafety.training" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>YourSafety.training — Gestion des conflits</h3> <p data-astro-cid-j7pv25f6>
Parce qu'on ne peut parler de relations sans parler de conflits, d'agressivité voire
                  de violence, nous avons intégré à notre expertise la gestion professionnelle des conflits avec notre partenariat <b data-astro-cid-j7pv25f6>Jérôme Bouteiller</b>.
</p> <a href="https://yoursafety.training" aria-label="En savoir plus sur YourSafety.training" data-astro-cid-j7pv25f6>Restaurer ou préserver la relation en cas de conflit</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-synergie-et-co.png" alt="Logo de Synergies & Co" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Synergies &amp; Co — Excellence opérationnelle</h3> <p data-astro-cid-j7pv25f6>
Parce que la performance dépend de l'adoption des bonnes postures, nous nous associons
                  à l'ancien dirigeant et militaire d'élite <b data-astro-cid-j7pv25f6>Olivier Crosetta</b> et son cabinet Synergies &amp; Co
                  pour décliner l'excellence opérationnelle à tous niveaux.
</p> <a href="https://www.synergiesandco.com/" aria-label="En savoir plus sur Synergies et Co" data-astro-cid-j7pv25f6>Du terrain militaire au board : la performance naît des gens.</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-pragmacie.svg" alt="Logo de Pragmacie" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Pragmacie — Cartographie des talents CliftonStrengths</h3> <p data-astro-cid-j7pv25f6>
Parce qu'on ne peut parler de leadership sans alignement profond avec ses talents
                  naturels, nous avons intégré à notre expertise la cartographie des points forts avec
                  notre partenaire Pragmacie, certifié Gallup CliftonStrengths (ex StrengthsFinder).
</p> <a href="https://www.pragmacie.com/" aria-label="En savoir plus sur Pragmacie" data-astro-cid-j7pv25f6>Gallup CliftonStrengths, sans le PDF</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-enablers-network.webp" alt="Logo d'Enablers" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Enablers — Accompagnement international</h3> <p data-astro-cid-j7pv25f6>
Pour accompagner vos défis organisationnels les plus complexes et à l'international,
                  nous sommes connectés à une communauté internationale et multiculturelle de
                  professionnels chevronnés.
</p> <a href="https://enablersnetwork.com/" aria-label="En savoir plus sur Enablers" data-astro-cid-j7pv25f6>Quand la disruption arrive — et elle arrive — ils sont déjà là.</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/images/pages/logo-fa3r.webp" alt="Logo de FA3R" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>FA3R — Expériences outdoor sur mesure</h3> <p data-astro-cid-j7pv25f6>
Parce que nous voulons proposer des expériences « out-door » sur mesure allant plus
                  loin dans les possibilités scénaristiques et l'engagement de vos équipes, en toute
                  sécurité, nous nous associons avec nos « frères d'armes » FA3R.
</p> <a href="https://www.fa3r.fr/" aria-label="En savoir plus sur FA3R" data-astro-cid-j7pv25f6>Apprendre sous stress, décider sous pression, tenir ensemble.</a> </div> </article> </li> </ul> </div> </section> </main> ` })}`;
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
