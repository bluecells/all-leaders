import { c as createComponent } from './astro-component_BfCeryXO.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, u as unescapeHTML, c as renderComponent } from './server_GXSVGQot.mjs';
import { r as renderScript, $ as $$Layout } from './Layout_CBD6Fc-X.mjs';
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
  }, "style")}> ${items.map((item) => renderTemplate`<article class="grid-item"> ${item.media && !hideIcons && renderTemplate`<div${addAttribute(["grid-item-media", item.isIcon ? "is-icon" : "is-image"], "class:list")}> <img${addAttribute(item.media, "src")}${addAttribute(item.title || "Élément visuel", "alt")} loading="lazy" decoding="async"> </div>`} <div class="grid-item-content"> <h3 class="grid-item-title"${addAttribute(`color: ${finalTextColor} !important; text-align:center;`, "style")}> ${item.title} </h3> <div class="grid-item-description"${addAttribute(`color: ${finalTextColor} !important;`, "style")}>${unescapeHTML(parseMarkdown(item.description || ""))}</div> </div> </article>`)} </div> </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/Grid.astro", void 0);

const $$Carousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Carousel;
  const {
    images,
    height = "30vh",
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

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "All Leaders - Tourisme Responsable", "lang": "fr", "metaTitle": "All Leaders Initiative — Conseil en Leadership et Performance Collective", "metaDescription": "All Leaders Initiative accompagne les équipes managériales, comités de direction et dirigeants pour dépasser les blocages collectifs et développer un leadership basé sur l'intention.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto px-4 py-12" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>All Leaders Initiative <span style="display: block; font-size: 2.25rem;" data-astro-cid-j7pv25f6>Conseil en performance collective pour dirigeants et équipes managériales</span></h1> <p class="hero-quote pb-0! max-w-5xl mx-auto" data-astro-cid-j7pv25f6> <q data-astro-cid-j7pv25f6>&nbsp;Toutes les équipes performantes se ressemblent.<br data-astro-cid-j7pv25f6>
Mais chaque équipe dysfonctionnelle l'est à sa façon.&nbsp;</q> </p><p class="hero-quote text-6xl! not-italic! pt-10!" data-astro-cid-j7pv25f6>&mdash; Et la vôtre&nbsp;?</p>  <div class="max-w-3xl mx-auto text-center" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>
Vous sentez qu'il serait possible de <strong data-astro-cid-j7pv25f6>mieux collaborer</strong>, de retrouver du <strong data-astro-cid-j7pv25f6>sens</strong>,
      de <strong data-astro-cid-j7pv25f6>fluidifier les relations</strong>… mais quelque chose bloque.
      Des habitudes ancrées, des non-dits, un manque de clarté.
<strong data-astro-cid-j7pv25f6>Ces frontières invisibles freinent votre épanouissement et la dynamique collective.</strong> </p> <p class="hero-cta-text" data-astro-cid-j7pv25f6>Il est temps de les <strong data-astro-cid-j7pv25f6>dépasser</strong>.</p> <nav aria-label="Navigation principale" data-astro-cid-j7pv25f6> <a href="#notre-approche" class="btn btn-primary" data-astro-cid-j7pv25f6>Découvrir notre approche</a> <a href="#contact" class="btn btn-secondary" data-astro-cid-j7pv25f6>Prendre contact</a> </nav> </div> </div> <main data-astro-cid-j7pv25f6> <!-- ==========================================
         SECTION 1 — Pourquoi All Leaders Initiative
    =========================================== --> <section id="notre-approche" aria-labelledby="h2-pourquoi" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 id="h2-pourquoi" data-astro-cid-j7pv25f6>
Dépasser les barrières invisibles de votre équipe
</h2> <p data-astro-cid-j7pv25f6>
Nous avons créé All Leaders Initiative pour vous permettre de questionner ce qui ne fonctionne
          plus, oser de nouvelles façons d'agir et vous affranchir de ces barrières invisibles.
          Pour réussir, ensemble.
</p> <div class="values-grid" role="list" data-astro-cid-j7pv25f6> <article role="listitem" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>Nous aimons l'entreprise</strong></h3> <p data-astro-cid-j7pv25f6>
Nous y avons grandi et en avons tiré beaucoup de fierté. Nous savons qu'elle doit offrir
              un cadre qui favorise la responsabilité, la solidarité et l'initiative.
</p> </article> <article role="listitem" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>Nous croyons en l'humain</strong></h3> <p data-astro-cid-j7pv25f6>
Grâce à la sécurité psychologique et à l'affirmation de son intention, chacun peut
              devenir leader et choisir consciemment d'influencer positivement son environnement.
</p> </article> <article role="listitem" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>Nous voyons l'organisation comme un équipage</strong></h3> <p data-astro-cid-j7pv25f6>
Nos parcours de marins, dans la sécurité nucléaire et une grande diversité de cultures
              managériales nous ont appris à voir les organisations comme des équipages&nbsp;: des
              collectifs qui gagnent en cultivant courage, cohésion, alignement et sens.
              C'est dans cet esprit que nous vous accompagnons, avec la discipline des marins
              et l'audace des aventuriers.
</p> <p data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>Cap&nbsp;?</strong></p> </article> </div> </div> </section> <!-- ==========================================
         SECTION 2 — Offre / Continuum
    =========================================== --> <section id="offre" aria-labelledby="h2-offre" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 id="h2-offre" data-astro-cid-j7pv25f6>
Conseil en performance collective&nbsp;: du diagnostic à la transformation
</h2> <h3 data-astro-cid-j7pv25f6>
Nous intervenons sur tout le <strong data-astro-cid-j7pv25f6>continuum de la performance collective</strong> </h3> ${renderComponent($$result2, "Grid", $$Grid, { "textColor": "var(--color-text-primary)", "items": [
    {
      title: "Bien-être mental fondamental à récréer",
      media: "/assets/diagnostic.svg",
      description: "Analyse approfondie de la dynamique d’équipe, identification des blocages et des leviers de performance."
    },
    {
      title: "Amplifier les points forts et réguler les vecteurs de vulnérabilité",
      media: "/assets/roadmap.svg",
      description: "Ateliers collaboratifs pour définir une feuille de route claire et alignée avec les objectifs stratégiques."
    },
    {
      title: "Déployer le leadershio à tout niveau (leadership basé sur l’intention)",
      media: "/assets/transformation.svg",
      description: "Accompagnement personnalisé pour mener à bien les transformations organisationnelles, en soutenant les équipes dans leur évolution."
    }
  ], "data-astro-cid-j7pv25f6": true })} <h3 data-astro-cid-j7pv25f6>Nous avons accompagné de nombreuses équipes managériales, comités de direction et dirigeants exigeants actifs chez&nbsp;</h3> ${renderComponent($$result2, "Carousel", $$Carousel, { "speed": "5000", "images": [
    { image: "/assets/clients/totalenergies.svg", alt: "TotalEnergies" },
    { image: "/assets/clients/edf.svg", alt: "EDF" },
    { image: "/assets/clients/sodexo.svg", alt: "Sodexo" },
    { image: "/assets/clients/airbus.svg", alt: "Airbus" },
    { image: "/assets/clients/orange.svg", alt: "Orange" }
  ], "data-astro-cid-j7pv25f6": true })} <h3 data-astro-cid-j7pv25f6>
Transformer les <strong data-astro-cid-j7pv25f6>intentions en actions</strong> concrètes, pour des équipes agissant avec <strong data-astro-cid-j7pv25f6>sens, clarté et impact</strong>.
</h3> <!-- Placeholder pour les modules/offres détaillées --> <div id="offre-modules" aria-label="Nos modules d'intervention" data-astro-cid-j7pv25f6> <!-- Insérer ici les cards d'offres --> </div> </div> </section> <!-- ==========================================
         SECTION 3 — Partenaires & Écosystème
    =========================================== --> <section id="ecosysteme" aria-labelledby="h2-ecosysteme" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 id="h2-ecosysteme" data-astro-cid-j7pv25f6>
Un écosystème de partenaires experts en leadership et cohésion d'équipe
</h2> <p data-astro-cid-j7pv25f6>Découvrez ceux qui naviguent avec vous et incarnent le leadership que nous développons.</p> <ul class="partners-list" role="list" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/assets/partners/bureau-du-reel.svg" alt="Logo du Bureau du Réel" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Le Bureau du Réel</h3> <p data-astro-cid-j7pv25f6>
All Leaders Initiative est partie prenante du Bureau du Réel, un réseau d'intervenants
                  pour des formats de conférences disruptifs et centrés sur l'expérience vécue.
</p> <a href="https://www.bureaudureel.fr/" aria-label="En savoir plus sur le Bureau du Réel" data-astro-cid-j7pv25f6>En savoir plus</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/assets/partners/da-crew.svg" alt="Logo de Da CREW" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Da CREW — Mission One</h3> <p data-astro-cid-j7pv25f6>
Simulation en réalité virtuelle&nbsp;: application concrète du Leadership basé sur
                  l'intention, faisant collaborer à "haute intensité" un équipage d'hélicoptère et un
                  équipage de sous-marin. Cette mission révèle les failles de communication et de
                  collaboration, et permet d'expérimenter et d'ancrer de nouveaux comportements ajustés.
</p> <a href="https://da-crew.org" aria-label="En savoir plus sur Da CREW Mission One" data-astro-cid-j7pv25f6>En savoir plus</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/assets/partners/your-safety.svg" alt="Logo de YourSafety.training" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>YourSafety.training — Gestion des conflits</h3> <p data-astro-cid-j7pv25f6>
Parce qu'on ne peut parler de relations sans parler de conflits, d'agressivité voire
                  de violence, nous avons intégré à notre expertise la gestion professionnelle des conflits grâce à notre partenariat avec Jérôme Bouteiller.
</p> <a href="https://yoursafety.training" aria-label="En savoir plus sur YourSafety.training" data-astro-cid-j7pv25f6>En savoir plus</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/assets/partners/synergies-et-co.svg" alt="Logo de Synergies & Co" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Synergies &amp; Co — Excellence opérationnelle</h3> <p data-astro-cid-j7pv25f6>
Parce que la performance dépend de l'adoption des bonnes postures, nous nous associons
                  à l'ancien dirigeant et militaire d'élite Olivier Crosetta et son cabinet Synergies &amp; Co
                  pour décliner l'excellence opérationnelle à tous niveaux.
</p> <a href="https://www.synergiesandco.com/" aria-label="En savoir plus sur Synergies et Co" data-astro-cid-j7pv25f6>En savoir plus</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/assets/partners/pragmacie.svg" alt="Logo de Pragmacie" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Pragmacie — Cartographie des talents CliftonStrengths</h3> <p data-astro-cid-j7pv25f6>
Parce qu'on ne peut parler de leadership sans alignement profond avec ses talents
                  naturels, nous avons intégré à notre expertise la cartographie des points forts avec
                  notre partenaire Pragmacie, certifié Gallup CliftonStrengths (ex StrengthsFinder).
</p> <a href="https://www.pragmacie.com/" aria-label="En savoir plus sur Pragmacie" data-astro-cid-j7pv25f6>En savoir plus</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/assets/partners/enablers.svg" alt="Logo d'Enablers" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Enablers — Accompagnement international</h3> <p data-astro-cid-j7pv25f6>
Pour accompagner vos défis organisationnels les plus complexes et à l'international,
                  nous sommes connectés à une communauté internationale et multiculturelle de
                  professionnels chevronnés.
</p> <a href="https://enablersnetwork.com/" aria-label="En savoir plus sur Enablers" data-astro-cid-j7pv25f6>En savoir plus</a> </div> </article> </li> <li data-astro-cid-j7pv25f6> <article class="partner-article" role="listitem" data-astro-cid-j7pv25f6> <img src="/assets/partners/fa3r.svg" alt="Logo de FA3R" class="partner-logo" data-astro-cid-j7pv25f6> <div class="partner-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>FA3R — Expériences outdoor sur mesure</h3> <p data-astro-cid-j7pv25f6>
Parce que nous voulons proposer des expériences « out-door » sur mesure allant plus
                  loin dans les possibilités scénaristiques et l'engagement de vos équipes, en toute
                  sécurité, nous nous associons avec nos « frères d'armes » FA3R.
</p> <a href="https://www.fa3r.fr/" aria-label="En savoir plus sur FA3R" data-astro-cid-j7pv25f6>En savoir plus</a> </div> </article> </li> </ul> </div> </section> <!-- ==========================================
         SECTION 4 — Fondateurs
    =========================================== --> <section id="fondateurs" aria-labelledby="h2-fondateurs" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 id="h2-fondateurs" data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>Deux fondateurs</strong>, une vision commune du <strong data-astro-cid-j7pv25f6>leadership basé sur l'intention</strong> </h2> <p data-astro-cid-j7pv25f6>
Forts de nos différences et de nos complémentarités, nous sommes garants de la qualité
          et de l'engagement des professionnels que nous rassemblons au service de vos objectifs.
</p> <div class="founders-grid" role="list" data-astro-cid-j7pv25f6> <article role="listitem" itemscope itemtype="https://schema.org/Person" data-astro-cid-j7pv25f6> <h3 itemprop="name" data-astro-cid-j7pv25f6>Marie Emmanuelle PY</h3> <p itemprop="jobTitle" data-astro-cid-j7pv25f6>Associée fondatrice</p> <ul class="contact-list" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6> <a href="mailto:me@all-leaders.fr" itemprop="email" aria-label="Envoyer un email à Marie Emmanuelle Py" data-astro-cid-j7pv25f6>
me@all-leaders.fr
</a> </li> <li data-astro-cid-j7pv25f6> <a href="tel:+33603555452" itemprop="telephone" aria-label="Appeler Marie Emmanuelle Py" data-astro-cid-j7pv25f6>
+33 6 03 55 54 52
</a> </li> <li data-astro-cid-j7pv25f6> <a href="#" rel="noopener noreferrer" target="_blank" aria-label="Profil LinkedIn de Marie Emmanuelle Py" data-astro-cid-j7pv25f6>
LinkedIn
</a> </li> <li data-astro-cid-j7pv25f6> <a href="#" rel="noopener noreferrer" target="_blank" aria-label="Profil complet de Marie Emmanuelle Py" data-astro-cid-j7pv25f6>
Profil complet
</a> </li> </ul> </article> <article role="listitem" itemscope itemtype="https://schema.org/Person" data-astro-cid-j7pv25f6> <h3 itemprop="name" data-astro-cid-j7pv25f6>Pierre-Etienne BOST</h3> <p itemprop="jobTitle" data-astro-cid-j7pv25f6>Associé fondateur</p> <ul class="contact-list" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6> <a href="mailto:pe@all-leaders.fr" itemprop="email" aria-label="Envoyer un email à Pierre-Etienne Bost" data-astro-cid-j7pv25f6>
pe@all-leaders.fr
</a> </li> <li data-astro-cid-j7pv25f6> <a href="tel:+33685540511" itemprop="telephone" aria-label="Appeler Pierre-Etienne Bost" data-astro-cid-j7pv25f6>
+33 6 85 54 05 11
</a> </li> <li data-astro-cid-j7pv25f6> <a href="#" rel="noopener noreferrer" target="_blank" aria-label="Profil LinkedIn de Pierre-Etienne Bost" data-astro-cid-j7pv25f6>
LinkedIn
</a> </li> <li data-astro-cid-j7pv25f6> <a href="#" rel="noopener noreferrer" target="_blank" aria-label="Profil complet de Pierre-Etienne Bost" data-astro-cid-j7pv25f6>
Profil complet
</a> </li> </ul> </article> </div> </div> </section> </main> ` })}`;
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
