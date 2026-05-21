import { c as createComponent } from './astro-component_CBbIRNKv.mjs';
import 'piccolore';
import { w as createRenderInstruction, d as renderTemplate, u as unescapeHTML, e as addAttribute, c as renderComponent, F as Fragment, m as maybeRenderHead, f as renderSlot } from './server_C9Y93v7l.mjs';
import 'clsx';
import { S as SITE, g as getCollection } from './_astro_content_Dg1SKHpp.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$JsonLd = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$JsonLd;
  const props = Astro2.props;
  function generatePageJsonLd(data) {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": data.title,
      "description": data.description,
      "url": data.url,
      "publisher": {
        "@type": "Organization",
        "name": SITE.NAME,
        "url": SITE.URL
      }
    };
  }
  function generateBlogJsonLd(data) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.description,
      "url": data.url,
      "datePublished": data.date.toISOString(),
      "dateModified": data.date.toISOString(),
      ...data.image && { "image": data.image },
      "author": {
        "@type": "Person",
        "name": data.author || SITE.AUTHOR
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE.NAME,
        "url": SITE.URL
      },
      ...data.categorie && {
        "articleSection": data.categorie
      }
    };
  }
  function generateEventJsonLd(data) {
    const jsonLd2 = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": data.title,
      "startDate": data.dateStart.toISOString(),
      "endDate": data.dateEnd.toISOString(),
      "url": data.url,
      "location": {
        "@type": "Place",
        "name": data.location.venue,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": data.location.city,
          ...data.location.postalCode && { "postalCode": data.location.postalCode },
          ...data.location.address && { "streetAddress": data.location.address },
          ...data.location.country && { "addressCountry": data.location.country }
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": SITE.NAME,
        "url": SITE.URL
      }
    };
    if (data.description) {
      jsonLd2.description = data.description;
    }
    if (data.image) {
      jsonLd2.image = data.image;
    }
    if (data.ticketInfo) {
      if (data.ticketInfo.isFree) {
        jsonLd2.offers = {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": data.ticketInfo.currency || "EUR",
          "availability": "https://schema.org/InStock",
          "url": data.url
        };
      } else if (data.ticketInfo.price) {
        jsonLd2.offers = {
          "@type": "Offer",
          "price": data.ticketInfo.price.toString(),
          "priceCurrency": data.ticketInfo.currency || "EUR",
          "availability": "https://schema.org/InStock",
          "url": data.ticketInfo.bookingUrl || data.url
        };
      }
    }
    return jsonLd2;
  }
  function generateFaqJsonLd(data) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": data.title,
      "url": data.url,
      "mainEntity": data.questions.map((q) => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
  }
  function generateBlogCollectionJsonLd(data) {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": data.title,
      "description": data.description,
      "url": data.url,
      "publisher": {
        "@type": "Organization",
        "name": SITE.NAME,
        "url": SITE.URL
      },
      "blogPost": data.posts.map((post) => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "url": post.url,
        "datePublished": post.date.toISOString(),
        ...post.image && { "image": post.image },
        "author": {
          "@type": "Person",
          "name": SITE.AUTHOR
        }
      }))
    };
  }
  function generateHotelRoomJsonLd(data) {
    const jsonLd2 = {
      "@context": "https://schema.org",
      "@type": "HotelRoom",
      "name": data.title,
      "description": data.description,
      "url": data.url,
      "hotelName": SITE.NAME
    };
    if (data.image) {
      jsonLd2.image = data.image;
    }
    if (data.capacity) {
      jsonLd2.occupancy = {
        "@type": "OpeningHoursSpecification",
        "maxOccupancy": data.capacity
      };
    }
    if (data.amenities && data.amenities.length > 0) {
      jsonLd2.amenities = data.amenities;
    }
    return jsonLd2;
  }
  let jsonLd;
  switch (props.type) {
    case "page":
      jsonLd = generatePageJsonLd(props);
      break;
    case "blog":
      jsonLd = generateBlogJsonLd(props);
      break;
    case "event":
      jsonLd = generateEventJsonLd(props);
      break;
    case "faq":
      jsonLd = generateFaqJsonLd(props);
      break;
    case "blogCollection":
      jsonLd = generateBlogCollectionJsonLd(props);
      break;
    case "hotelRoom":
      jsonLd = generateHotelRoomJsonLd(props);
      break;
  }
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(jsonLd)));
}, "/Users/bluecells/Websites/all-leaders/src/components/JsonLd.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$GoogleTagManager = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-TF95X7B2');<\/script> <!-- End Google Tag Manager -->"])));
}, "/Users/bluecells/Websites/all-leaders/src/components/GoogleTagManager.astro", void 0);

const footerTranslations = {
  fr: {
    company: "All Leaders Initiative",
    address: "69 rue La Condamine",
    city: "75017 Paris",
    vat: "TVA : FR41883017717",
    siret: "SIREN : 883017717",
    whatsapp: "WhatsApp",
    explore: "Explorer",
    bureauDuReel: "Le Bureau du Réel",
    blog: "Ressources",
    faq: "FAQ",
    keepInTouch: "Restons en contact",
    newsletterText: "Apprenez à bâtir des équipes épanouies et performantes",
    subscribe: "Inscrivez-vous à la newsletter",
    newsletterTitle: "All Leaders Initiative",
    instagram: "Instagram",
    youtube: "YouTube",
    linkedin: "LinkedIn",
    copyright: "All Leaders Initiative — Made with ❤ by",
    blueCells: "Blue Cells",
    privacy: "Privacy",
    cookie: "Cookies"
  },
  en: {
    company: "All Leaders Initiative",
    address: "69 rue La Condamine",
    city: "75017 Paris",
    vat: "VAT: 01253100950",
    siret: "SIRET: XXXXXXXXXX",
    whatsapp: "WhatsApp",
    explore: "Explore",
    bureauDuReel: "The Bureau du Réel",
    blog: "Resources",
    faq: "FAQ",
    keepInTouch: "Keep in touch",
    newsletterText: "Learn how o build happy teams that perform",
    subscribe: "Subscribe to our newsletter",
    newsletterTitle: "All Leaders Initiative",
    instagram: "Instagram",
    youtube: "YouTube",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    copyright: "All Leaders Initiative — Made with ❤ by",
    blueCells: "Blue Cells",
    privacy: "Privacy",
    cookie: "Cookies"
  }
};

const breadcrumbTranslations = {
  it: {
    home: "Home",
    faq: "FAQ",
    accompagnements: "Services",
    ariaLabel: "Breadcrumb",
    smallWords: /* @__PURE__ */ new Set(["and", "or", "the", "a", "an", "in", "on", "at", "to", "for", "of", "with", "by"])
  },
  fr: {
    home: "Accueil",
    faq: "FAQ",
    accompagnements: "Accompagnements",
    ariaLabel: "Fil d'Ariane",
    smallWords: /* @__PURE__ */ new Set(["de", "la", "le", "et", "ou", "à", "un", "une", "en", "au", "aux", "sur", "sous", "pour", "par", "du", "les"])
  },
  en: {
    home: "Home",
    faq: "FAQ",
    accompagnements: "Services",
    ariaLabel: "Breadcrumb",
    smallWords: /* @__PURE__ */ new Set(["and", "or", "the", "a", "an", "in", "on", "at", "to", "for", "of", "with", "by"])
  }
};

const commonTranslations = {
  it: {
    // Locale codes
    localeCode: "it_IT",
    defaultDescription: "Limolò - Turismo responsabile e co-living in Sardegna",
    home: "Home"
  },
  fr: {
    // Locale codes
    localeCode: "fr_FR",
    defaultDescription: "Limolò - Tourisme responsable et co-living en Sardaigne",
    home: "Accueil"
  },
  en: {
    // Locale codes
    localeCode: "en_GB",
    defaultDescription: "Limolò - Responsible tourism and co-living in Sardinia",
    home: "Home"
  }
};

const $$Head = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Head;
  const {
    title,
    metaTitle,
    metaDescription,
    ogImage,
    ogType = "website",
    publishDate,
    lang = "fr",
    canonicalUrl,
    jsonType = null,
    faqQuestions = [],
    roomData = {},
    alternateUrls
  } = Astro2.props;
  const siteUrl = Astro2.site?.toString() || "https://all-leaders.fr";
  const currentUrl = canonicalUrl || new URL(Astro2.url.pathname, siteUrl).toString();
  const t = commonTranslations[lang] || commonTranslations.fr;
  const defaultDescription = t.defaultDescription;
  const finalMetaTitle = metaTitle || title;
  const finalMetaDescription = metaDescription || defaultDescription;
  const defaultOgImage = "/images/og/all-leaders-default-og.jpg";
  let ogImagePath;
  if (typeof ogImage === "object" && ogImage && "image" in ogImage) {
    ogImagePath = String(ogImage.image);
  } else if (typeof ogImage === "string") {
    ogImagePath = ogImage;
  } else {
    ogImagePath = defaultOgImage;
  }
  const absoluteOgImage = ogImagePath.startsWith("http") || ogImagePath.startsWith("//") ? ogImagePath : new URL(ogImagePath, siteUrl).toString();
  const localeMap = {
    fr: commonTranslations.fr.localeCode,
    en: commonTranslations.en.localeCode
  };
  const ogLocale = localeMap[lang] || commonTranslations.fr.localeCode;
  return renderTemplate`<!-- Charset & viewport --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- SEO Base --><title>${title}</title><meta name="title"${addAttribute(finalMetaTitle, "content")}><meta name="description"${addAttribute(finalMetaDescription, "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="canonical"${addAttribute(currentUrl, "href")}><!-- Favicon --><link rel="icon" type="image/png" sizes="32x32" href="/ALL_LEADERS_INITIATIVE_FAVICON_25px_RED"><link rel="icon" type="image/png" sizes="16x16" href="/ALL_LEADERS_INITIATIVE_FAVICON_25px_RED"><link rel="apple-touch-icon" sizes="180x180" href="/ALL_LEADERS_INITIATIVE_FAVICON_25px_RED"><!-- Open Graph --><meta property="og:type"${addAttribute(ogType, "content")}><meta property="og:url"${addAttribute(currentUrl, "content")}><meta property="og:title"${addAttribute(finalMetaTitle, "content")}><meta property="og:description"${addAttribute(finalMetaDescription, "content")}><meta property="og:image"${addAttribute(absoluteOgImage, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:locale"${addAttribute(ogLocale, "content")}><meta property="og:site_name" content="All Leaders"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"${addAttribute(currentUrl, "content")}><meta name="twitter:title"${addAttribute(finalMetaTitle, "content")}><meta name="twitter:description"${addAttribute(finalMetaDescription, "content")}><meta name="twitter:image"${addAttribute(absoluteOgImage, "content")}><!-- Article specific (for blog posts) -->${ogType === "article" && publishDate && renderTemplate`<meta property="article:published_time"${addAttribute(publishDate.toISOString(), "content")}>`}<!-- Language alternates -->${alternateUrls ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<link rel="alternate" hreflang="fr"${addAttribute(new URL(alternateUrls.fr, siteUrl).toString(), "href")}>${alternateUrls.en && renderTemplate`<link rel="alternate" hreflang="en"${addAttribute(new URL(alternateUrls.en, siteUrl).toString(), "href")}>`}<link rel="alternate" hreflang="x-default"${addAttribute(new URL(alternateUrls.fr, siteUrl).toString(), "href")}>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<link rel="alternate"${addAttribute(lang, "hreflang")}${addAttribute(currentUrl, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(siteUrl, "href")}>` })}`}<!-- Robots --><meta name="robots" content="index, follow"><!-- JSON-LD  -->${jsonType === "faq" && faqQuestions.length > 0 && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "type": "faq", "title": title, "url": `${SITE.URL}${Astro2.url.pathname}`, "questions": faqQuestions.slice(0, 25) })}`}${jsonType === "page" && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "type": "page", "title": title, "description": finalMetaDescription, "url": `${SITE.URL}${Astro2.url.pathname}` })}`}${jsonType === "hotelRoom" && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "type": "hotelRoom", "title": title, "description": finalMetaDescription, "url": `${SITE.URL}${Astro2.url.pathname}`, "image": ogImage, "capacity": roomData?.capacity, "amenities": roomData?.amenities })}`}${jsonType === "blog" && publishDate && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "type": "blog", "title": title, "description": finalMetaDescription, "url": `${SITE.URL}${Astro2.url.pathname}`, "date": publishDate, "image": ogImage, "author": SITE.AUTHOR })}`}${renderComponent($$result, "GoogleTagManager", $$GoogleTagManager, {})}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/Head.astro", void 0);

const links$1 = [{"label":"Nous","url":"/","type":"link","hasSubmenu":false,"submenu":[]},{"label":"Nos accompagnements","url":"/accompagnements","type":"link","hasSubmenu":false,"submenu":[]},{"label":"Contact","url":"/contact","type":"link","hasSubmenu":false,"submenu":[]}];
const menuFR = {
  links: links$1,
};

const links = [{"label":"Our Services","url":"/en/services","type":"link","hasSubmenu":false,"submenu":[]},{"label":"Resources","url":"/en/resources","type":"link","hasSubmenu":false,"submenu":[]},{"label":"FAQ","url":"/en/faq","type":"link","hasSubmenu":false,"submenu":[]},{"label":"Contact","url":"/en/contact","type":"link","hasSubmenu":false,"submenu":[]}];
const menuEN = {
  links,
};

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const { lang = "fr" } = Astro2.props;
  const validLang = lang === "fr" || lang === "en" ? lang : "fr";
  const tFooter = footerTranslations[validLang];
  const localizedSlugs = {
    fr: { blog: "ressources", faq: "faq", privacy: "privacy", cookie: "cookies" },
    en: {
      blog: "resources",
      faq: "faq-en",
      privacy: "privacy-policy-en",
      cookie: "cookies-policy-en"
    }
  };
  const slugs = localizedSlugs[validLang] ?? localizedSlugs.fr;
  const langPrefix = validLang === "fr" ? "" : `/${validLang}`;
  const footerNavLinks = {
    blog: `${langPrefix}/${slugs.blog}`,
    faq: `${langPrefix}/${slugs.faq}`,
    privacy: `${langPrefix}/${slugs.privacy}`,
    cookie: `${langPrefix}/${slugs.cookie}`
  };
  const menuData = lang === "fr" ? menuFR : lang === "en" ? menuEN : menuFR;
  const liensDuMenu = menuData?.links || [];
  const logoUrl = lang === "fr" ? "/" : `/${lang}`;
  return renderTemplate`${maybeRenderHead()}<header class="header-main" data-astro-cid-3ef6ksr2> <div class="header-container" data-astro-cid-3ef6ksr2> <div class="header-content" data-astro-cid-3ef6ksr2> <div class="logo-container" data-astro-cid-3ef6ksr2> <a${addAttribute(logoUrl, "href")} class="logo-link" data-astro-cid-3ef6ksr2> <img class="logo-img" src="/images/logo-all-leaders-initiative.webp" alt="Logo" data-astro-cid-3ef6ksr2> </a> </div> <nav class="nav-desktop" data-astro-cid-3ef6ksr2> ${liensDuMenu.map((item) => renderTemplate`<div class="nav-item-wrapper" data-astro-cid-3ef6ksr2> ${item.hasSubmenu && item.submenu ? renderTemplate`<div class="nav-item-with-submenu" data-astro-cid-3ef6ksr2> <button class="nav-link nav-link-with-arrow" data-submenu-trigger data-astro-cid-3ef6ksr2> ${item.label} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="chevron-icon" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" data-astro-cid-3ef6ksr2></path> </svg> </button> <div class="submenu-dropdown" data-astro-cid-3ef6ksr2> ${item.submenu.map((subitem) => renderTemplate`<a${addAttribute(subitem.url, "href")} class="submenu-link" data-astro-cid-3ef6ksr2> ${subitem.label} </a>`)} </div> </div>` : renderTemplate`<a${addAttribute(item.url, "href")}${addAttribute(item.type === "cta" ? "btn-nav" : "nav-link", "class")} data-astro-cid-3ef6ksr2> ${item.label} </a>`} </div>`)} <div class="lang-switcher" data-astro-cid-3ef6ksr2> <a href="/" style="display: inline-block; padding-right:2px; transform:translateY(2px);"${addAttribute(lang === "fr" ? "lang-link lang-active" : "lang-link ", "class")} data-astro-cid-3ef6ksr2>🇫🇷</a> <span class="lang-separator" data-astro-cid-3ef6ksr2>|</span> <a href="/en" style="display: inline-block; padding-right:2px; transform:translateY(2px);"${addAttribute(lang === "en" ? "lang-link lang-active" : "lang-link", "class")} data-astro-cid-3ef6ksr2>🇬🇧</a> </div> </nav> <div class="mobile-menu-button" data-astro-cid-3ef6ksr2> <button id="menu-toggle" class="menu-toggle" aria-label="Toggle menu" data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="menu-icon" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-astro-cid-3ef6ksr2></path> </svg> </button> </div> </div> </div> <div id="mobile-menu" class="mobile-menu-content" data-astro-cid-3ef6ksr2> <div class="mobile-menu-scroll" data-astro-cid-3ef6ksr2>  ${liensDuMenu.map((item) => renderTemplate`<div class="mobile-menu-item" data-astro-cid-3ef6ksr2> ${item.hasSubmenu && item.submenu ? renderTemplate`<div class="mobile-submenu-wrapper" data-astro-cid-3ef6ksr2> <button class="mobile-menu-link mobile-submenu-trigger" data-mobile-submenu data-astro-cid-3ef6ksr2> ${item.label} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mobile-chevron" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" data-astro-cid-3ef6ksr2></path> </svg> </button> <div class="mobile-submenu-items" data-astro-cid-3ef6ksr2> ${item.submenu.map((subitem) => renderTemplate`<a${addAttribute(subitem.url, "href")} class="mobile-submenu-link" data-astro-cid-3ef6ksr2> ${subitem.label} </a>`)} </div> </div>` : renderTemplate`<a${addAttribute(item.url, "href")}${addAttribute(`mobile-menu-link ${item.type === "cta" ? "mobile-menu-cta" : ""}`, "class")} data-astro-cid-3ef6ksr2> ${item.label} </a>`} </div>`)}  <div class="mobile-footer-separator" data-astro-cid-3ef6ksr2></div> <div class="mobile-menu-item" data-astro-cid-3ef6ksr2> <a href="https://bureaudureel.fr" target="_blank" rel="noopener" class="mobile-menu-link" data-astro-cid-3ef6ksr2>${tFooter.bureauDuReel}</a> </div> <div class="mobile-menu-item" data-astro-cid-3ef6ksr2> <a${addAttribute(footerNavLinks.blog, "href")} class="mobile-menu-link" data-astro-cid-3ef6ksr2>${tFooter.blog}</a> </div> <div class="mobile-menu-item" data-astro-cid-3ef6ksr2> <a${addAttribute(footerNavLinks.faq, "href")} class="mobile-menu-link" data-astro-cid-3ef6ksr2>${tFooter.faq}</a> </div> <div class="mobile-menu-item" data-astro-cid-3ef6ksr2> <a${addAttribute(footerNavLinks.privacy, "href")} class="mobile-menu-link" data-astro-cid-3ef6ksr2>${tFooter.privacy}</a> </div> <div class="mobile-menu-item" data-astro-cid-3ef6ksr2> <a${addAttribute(footerNavLinks.cookie, "href")} class="mobile-menu-link" data-astro-cid-3ef6ksr2>${tFooter.cookie}</a> </div> <div class="mobile-lang-switcher" data-astro-cid-3ef6ksr2> <a href="/" style="display: inline-block; padding-right:2px; transform:translateY(2px);"${addAttribute(lang === "fr" ? "mobile-lang-link mobile-lang-active" : "mobile-lang-link", "class")} data-astro-cid-3ef6ksr2>🇫🇷</a> <span class="lang-separator" data-astro-cid-3ef6ksr2>|</span> <a href="/en" style="display: inline-block; padding-right:2px; transform:translateY(2px);"${addAttribute(lang === "en" ? "mobile-lang-link mobile-lang-active" : "mobile-lang-link", "class")} data-astro-cid-3ef6ksr2>🇬🇧</a> </div> </div> </div> </header>  ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Footer;
  const { lang = "fr" } = Astro2.props;
  const validLang = lang === "fr" || lang === "en" ? lang : "fr";
  const t = footerTranslations[validLang];
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const localizedSlugs = {
    fr: {
      blog: "ressources",
      faq: "faq",
      privacy: "privacy",
      cookie: "cookies"
    },
    en: {
      blog: "resources",
      faq: "faq-en",
      privacy: "privacy-policy-en",
      cookie: "cookies-policy-en"
    }
  };
  const slugs = localizedSlugs[lang] ?? localizedSlugs.fr;
  const langPrefix = lang === "fr" ? "" : `/${lang}`;
  const navigationLinks = {
    blog: `${langPrefix}/${slugs.blog}`,
    faq: `${langPrefix}/${slugs.faq}`,
    privacy: `${langPrefix}/${slugs.privacy}`,
    cookie: `${langPrefix}/${slugs.cookie}`
  };
  return renderTemplate`${maybeRenderHead()}<footer class="footer-main" data-astro-cid-sz7xmlte> <div class="footer-container" data-astro-cid-sz7xmlte> <div class="footer-grid" data-astro-cid-sz7xmlte> <!-- Section 1: Logo & Adresse --> <div class="footer-section" data-astro-cid-sz7xmlte> <img src="/images/pages/logo-all-leaders-rond-fonce.svg" alt="Logo" class="footer-logo-brand" data-astro-cid-sz7xmlte> <div class="footer-title" data-astro-cid-sz7xmlte> <span class="brand-text" data-astro-cid-sz7xmlte>
ALL <span class="leaders" data-astro-cid-sz7xmlte>LE<span class="stylized-a" data-astro-cid-sz7xmlte>A</span>DERS</span> <span class="thin" data-astro-cid-sz7xmlte>INITIATIVE</span> </span> </div> <p class="footer-address" data-astro-cid-sz7xmlte> ${t.address},<br data-astro-cid-sz7xmlte> ${t.city} </p> </div> <!-- Section 2: Explorer & Pilote --> <div class="footer-section" data-astro-cid-sz7xmlte> <div class="footer-explorer" data-astro-cid-sz7xmlte> <div class="pilotine" data-astro-cid-sz7xmlte></div> <div class="menu-explorer" data-astro-cid-sz7xmlte> <ol class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="https://bureaudureel.fr" class="footer-link" data-astro-cid-sz7xmlte>${t.bureauDuReel}</a></li> <li data-astro-cid-sz7xmlte><a${addAttribute(navigationLinks.blog, "href")} class="footer-link" data-astro-cid-sz7xmlte>${t.blog}</a></li> <li data-astro-cid-sz7xmlte><a${addAttribute(navigationLinks.faq, "href")} class="footer-link" data-astro-cid-sz7xmlte>${t.faq}</a></li> <li data-astro-cid-sz7xmlte><a${addAttribute(navigationLinks.privacy, "href")} class="footer-link" data-astro-cid-sz7xmlte>${t.privacy}</a></li> <li data-astro-cid-sz7xmlte><a${addAttribute(navigationLinks.cookie, "href")} class="footer-link" data-astro-cid-sz7xmlte>${t.cookie}</a></li> </ol> </div> </div> </div> <!-- Section 3: Newsletter --> <div class="footer-section" data-astro-cid-sz7xmlte> <img src="/images/pages/bateau.webp" alt="Bateau" class="footer-logo-ship" data-astro-cid-sz7xmlte> <h4 class="footer-heading mb-0!" data-astro-cid-sz7xmlte>${t.keepInTouch}</h4> <a href="https://bureaudureel.kessel.media/" target="_blank" class="btn-limolo" data-astro-cid-sz7xmlte> <span class="btn-subtitle" data-astro-cid-sz7xmlte>${t.subscribe}</span><br data-astro-cid-sz7xmlte> <span class="btn-title" data-astro-cid-sz7xmlte>${t.newsletterTitle}</span> </a> </div> </div> <!-- Bottom: Social & Copyright --> <div class="footer-bottom" data-astro-cid-sz7xmlte> <div class="footer-social" data-astro-cid-sz7xmlte> <a href="https://www.instagram.com/bureaudureel/" class="social-link" data-astro-cid-sz7xmlte>${t.instagram}</a> <a href="https://www.youtube.com/@allleadersinitiative3801" class="social-link" data-astro-cid-sz7xmlte>${t.youtube}</a> <a href="https://www.linkedin.com/company/all-leaders-initiative/" class="social-link" data-astro-cid-sz7xmlte>${t.linkedin}</a> <a href="mailto:contact@all-leaders.fr" class="social-link email-link" data-astro-cid-sz7xmlte>contact@all-leaders.fr</a> </div> <div class="footer-copyright" data-astro-cid-sz7xmlte>
© ${currentYear} ${t.copyright} <a href="https://bluecells.eu" target="_blank" data-astro-cid-sz7xmlte>${t.blueCells}</a> </div> </div> </div> </footer>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/Footer.astro", void 0);

const $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const { items = [], category, title, lang = "fr" } = Astro2.props;
  const t = breadcrumbTranslations[lang];
  const currentPath = Astro2.url.pathname;
  const isHomepage = currentPath === "/" || currentPath === "/en";
  function slugToLabel(slug, language) {
    const smallWords = breadcrumbTranslations[language].smallWords;
    const words = slug.split("-").map((word) => word.toLowerCase());
    if (words.length > 0) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    for (let i = 1; i < words.length; i++) {
      if (!smallWords.has(words[i])) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
    }
    return words.join(" ");
  }
  let breadcrumbItems = [];
  if (items.length > 0) {
    breadcrumbItems = items;
  } else {
    const currentPath2 = Astro2.url.pathname;
    const pathSegments = currentPath2.split("/").filter((segment) => segment);
    const isFAQ = pathSegments.includes("faq");
    const isEventi = pathSegments.includes("eventi");
    const isAccompagnements = pathSegments.includes("accompagnements");
    const isServices = pathSegments.includes("services");
    const isRessources = pathSegments.includes("ressources") || pathSegments.includes("resources");
    if (isRessources && pathSegments.length >= 3) {
      const resourcesLabel = lang === "en" ? "Resources" : "Ressources";
      const categoryFromPath = pathSegments[lang === "en" ? 2 : 1];
      const categoryLabel = category || slugToLabel(categoryFromPath, lang);
      const titleFromPath = pathSegments[pathSegments.length - 1];
      const titleLabel = title || slugToLabel(titleFromPath, lang);
      const resourcesBaseUrl = lang === "en" ? "/en/resources" : "/ressources";
      const resourcesLinkWithFilter = `${resourcesBaseUrl}?category=${categoryFromPath}`;
      breadcrumbItems = [
        { label: t.home, href: lang === "en" ? "" : "/" },
        { label: resourcesLabel, href: resourcesBaseUrl },
        { label: categoryLabel, href: resourcesLinkWithFilter },
        { label: titleLabel, href: "" }
        // Pas de href pour la page actuelle
      ];
    } else if (isServices && pathSegments.length === 2 && pathSegments[0] === "en") {
      breadcrumbItems = [
        { label: t.home, href: "" },
        { label: t.accompagnements, href: "" }
        // Pas de href car on est sur la page actuelle
      ];
    } else if (isAccompagnements && pathSegments.length === 1) {
      breadcrumbItems = [
        { label: t.home, href: "/" },
        { label: t.accompagnements, href: "" }
        // Pas de href car on est sur la page actuelle
      ];
    } else if (isFAQ && pathSegments.length >= 2) {
      const folderLabel = t.faq;
      const categoryFromPath = pathSegments[lang === "en" ? 2 : 1];
      const categoryLabel = category || slugToLabel(categoryFromPath, lang);
      const categorySlug = category ? category.toLowerCase().replace(/\s+/g, "-") : categoryFromPath.toLowerCase();
      const titleFromPath = pathSegments[pathSegments.length - 1];
      const titleLabel = title || slugToLabel(titleFromPath, lang);
      const faqBaseUrl = lang === "en" ? "/en/faq" : "/faq";
      breadcrumbItems = [
        { label: t.home, href: lang === "en" ? "" : "/" },
        { label: folderLabel, href: faqBaseUrl },
        { label: categoryLabel, href: `${faqBaseUrl}/${categorySlug}` },
        { label: titleLabel, href: "" }
        // Pas de href pour la page actuelle
      ];
    } else if (isServices && pathSegments.length === 4 && pathSegments[0] === "en") {
      const categoryFromPath = pathSegments[2];
      const categoryLabel = category || slugToLabel(categoryFromPath, lang);
      const titleFromPath = pathSegments[pathSegments.length - 1];
      const titleLabel = title || slugToLabel(titleFromPath, lang);
      breadcrumbItems = [
        { label: t.home, href: "" },
        { label: t.accompagnements, href: "/en/services" },
        { label: categoryLabel, href: `/en/services#category-${categoryFromPath}` },
        { label: titleLabel, href: "" }
        // Pas de href pour la page actuelle
      ];
    } else if (isAccompagnements && pathSegments.length === 3) {
      const categoryFromPath = pathSegments[1];
      const categoryLabel = category || slugToLabel(categoryFromPath, lang);
      const titleFromPath = pathSegments[pathSegments.length - 1];
      const titleLabel = title || slugToLabel(titleFromPath, lang);
      breadcrumbItems = [
        { label: t.home, href: "/" },
        { label: t.accompagnements, href: "/accompagnements" },
        { label: categoryLabel, href: `/accompagnements#category-${categoryFromPath}` },
        { label: titleLabel, href: "" }
        // Pas de href pour la page actuelle
      ];
    } else if (isEventi && pathSegments.length >= 2) {
      const titleFromPath = pathSegments[pathSegments.length - 1];
      const titleLabel = title || slugToLabel(titleFromPath, lang);
      breadcrumbItems = [
        { label: t.home, href: lang === "en" ? "" : "/" },
        { label: "Eventi", href: "/eventi" },
        { label: titleLabel, href: "" }
      ];
    } else {
      const filteredSegments = lang === "en" && pathSegments[0] === "en" ? pathSegments.slice(1) : pathSegments;
      breadcrumbItems = [
        { label: t.home, href: lang === "en" ? "" : "/" },
        // Pour chaque segment, construire un élément du fil d'Ariane
        ...filteredSegments.map((segment, index) => {
          const isLast = index === filteredSegments.length - 1;
          const baseSegments = lang === "en" ? ["en", ...filteredSegments.slice(0, index + 1)] : filteredSegments.slice(0, index + 1);
          let href = "/" + baseSegments.join("/");
          if (segment === "expertises" && index === 0) {
            href = "/speakers/conferenciers-expertises";
          } else if (segment === "types-interventions" && index === 0) {
            href = "/speakers/conferenciers-types-interventions";
          } else if (segment === "equipe-all-leaders" && index === 0) {
            href = "/#fondateurs";
          }
          let label;
          if (isLast && title) {
            label = title;
          } else {
            label = slugToLabel(segment, lang);
          }
          if (isLast) {
            href = "";
          }
          return { label, href };
        })
      ];
    }
  }
  return renderTemplate`<!--
  Navigation Breadcrumb accessible avec aria-label
  Structure sémantique <nav> > <ol> > <li>
  N'affiche pas le breadcrumb sur la page d'accueil
-->${!isHomepage && renderTemplate`${maybeRenderHead()}<nav${addAttribute(t.ariaLabel, "aria-label")} class="breadcrumb-nav" data-astro-cid-qaanghzh><ol class="breadcrumb-list" data-astro-cid-qaanghzh>${breadcrumbItems.map((item, index) => {
    const isLast = index === breadcrumbItems.length - 1;
    return renderTemplate`<li class="breadcrumb-item" data-astro-cid-qaanghzh>${item.href ? renderTemplate`<a${addAttribute(item.href, "href")} class="breadcrumb-link" data-astro-cid-qaanghzh>${item.label}</a>` : (
      /* Texte non cliquable avec aria-current si c'est le dernier élément */
      renderTemplate`<span${addAttribute(isLast ? "page" : void 0, "aria-current")} class="breadcrumb-current" data-astro-cid-qaanghzh>${item.label}</span>`
    )}${!isLast && renderTemplate`<span class="breadcrumb-separator" aria-hidden="true" data-astro-cid-qaanghzh>
/
</span>`}</li>`;
  })}</ol></nav>`}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/Breadcrumb.astro", void 0);

const $$SeoAnalyzer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SeoAnalyzer;
  const { keyword } = Astro2.props;
  {
    return null;
  }
}, "/Users/bluecells/Websites/all-leaders/src/components/SeoAnalyzer/SeoAnalyzer.astro", void 0);

const newsletterPopupTranslations = {
  it: {
    title: "Newsletter 56 Green",
    subtitle: "Scopri la Sardegna che ti piace. Una Sardegna alternativa e sostenibile!",
    buttonText: "Iscriviti",
    closeText: "Chiudi"
  },
  fr: {
    title: "Newsletter 56 Green",
    subtitle: "Découvrez votre Sardaigne idéale. Une île alternative et durable !",
    buttonText: "S'inscrire",
    closeText: "Fermer"
  },
  en: {
    title: "Newsletter 56 Green",
    subtitle: "Subscribe to our newsletter to receive the latest news and exclusive offers.",
    buttonText: "Subscribe",
    closeText: "Close"
  }
};

const $$NewsletterPopup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NewsletterPopup;
  const { lang } = Astro2.props;
  const t = newsletterPopupTranslations[lang] || newsletterPopupTranslations.it;
  return renderTemplate`${maybeRenderHead()}<div id="newsletter-popup" class="newsletter-popup hidden" data-astro-cid-7ixr6fiy> <div class="newsletter-content" data-astro-cid-7ixr6fiy> <button id="close-newsletter" class="close-btn"${addAttribute(t.closeText, "aria-label")} data-astro-cid-7ixr6fiy>×</button> <img src="/Logo-Limolo-Eco-House-a-Cabras-in-Sardegna.webp" style="padding: 12px 0; max-width:120px;" data-astro-cid-7ixr6fiy> <h3 data-astro-cid-7ixr6fiy>${t.title}</h3> <p data-astro-cid-7ixr6fiy>${t.subtitle}</p> <a href="https://limolohouse56green.substack.com/subscribe" target="_blank" class="subscribe-btn" data-astro-cid-7ixr6fiy> ${t.buttonText} </a> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/NewsletterPopup.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/NewsletterPopup.astro", void 0);

const cookieConsentTranslations = {
  it: {
    title: "I cookie su all-leaders.fr",
    description: "Utilizziamo i cookie per migliorare la tua esperienza, analizzare il traffico e personalizzare i contenuti.",
    acceptAll: "Accetta tutto",
    rejectAll: "Rifiuta tutto",
    settings: "Impostazioni",
    save: "Salva preferenze",
    essential: "Cookie essenziali",
    essentialDesc: "Necessari per il funzionamento del sito",
    analytics: "Analytics",
    analyticsDesc: "Analisi anonima del traffico",
    marketing: "Marketing",
    marketingDesc: "Pubblicità personalizzata",
    privacyLink: "/privacy-policy",
    cookieLink: "/cookies-policy"
  },
  fr: {
    title: "Les cookies sur all-leaders.fr",
    description: "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.",
    acceptAll: "Accepter tout",
    rejectAll: "Refuser tout",
    settings: "Paramètres",
    save: "Enregistrer les préférences",
    essential: "Cookies essentiels",
    essentialDesc: "Nécessaires au fonctionnement du site",
    analytics: "Analytics",
    analyticsDesc: "Analyse anonyme du trafic",
    marketing: "Marketing",
    marketingDesc: "Publicité personnalisée",
    privacyLink: "/privacy",
    cookieLink: "/cookies"
  },
  en: {
    title: "Cookies on all-leaders.fr",
    description: "We use cookies to improve your experience, analyze traffic, and personalize content.",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    settings: "Settings",
    save: "Save preferences",
    essential: "Essential cookies",
    essentialDesc: "Required for site functionality",
    analytics: "Analytics",
    analyticsDesc: "Anonymous traffic analysis",
    marketing: "Marketing",
    marketingDesc: "Personalized advertising",
    privacyLink: "/en/privacy-policy",
    cookieLink: "/en/cookies-policy"
  }
};

const $$CookieConsent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CookieConsent;
  const { lang } = Astro2.props;
  const t = cookieConsentTranslations[lang] || cookieConsentTranslations.it;
  return renderTemplate`${maybeRenderHead()}<div id="cookie-consent-banner" class="cookie-banner hidden" data-astro-cid-garwan2p> <div class="cookie-container" data-astro-cid-garwan2p> <div class="cookie-content" data-astro-cid-garwan2p> <h2 data-astro-cid-garwan2p>${t.title}</h2> <p data-astro-cid-garwan2p>${t.description}</p> <a${addAttribute(t.privacyLink, "href")} target="_blank" rel="noopener noreferrer" class="cookie-link" data-astro-cid-garwan2p> ${lang === "it" ? "Privacy Policy" : lang === "fr" ? "Politique de confidentialité" : "Privacy Policy"} </a> <span class="divider" data-astro-cid-garwan2p>•</span> <a${addAttribute(t.cookieLink, "href")} target="_blank" rel="noopener noreferrer" class="cookie-link" data-astro-cid-garwan2p> ${lang === "it" ? "Cookie Policy" : lang === "fr" ? "Politique relative aux cookies" : "Cookie Policy"} </a> </div> <div id="cookie-settings" class="cookie-settings hidden" data-astro-cid-garwan2p> <div class="cookie-option" data-astro-cid-garwan2p> <label data-astro-cid-garwan2p> <input type="checkbox" id="essential-toggle" checked disabled class="cookie-checkbox" data-astro-cid-garwan2p> <span class="option-label" data-astro-cid-garwan2p> <strong data-astro-cid-garwan2p>${t.essential}</strong> <p data-astro-cid-garwan2p>${t.essentialDesc}</p> </span> </label> </div> <div class="cookie-option" data-astro-cid-garwan2p> <label data-astro-cid-garwan2p> <input type="checkbox" id="analytics-toggle" class="cookie-checkbox" data-astro-cid-garwan2p> <span class="option-label" data-astro-cid-garwan2p> <strong data-astro-cid-garwan2p>${t.analytics}</strong> <p data-astro-cid-garwan2p>${t.analyticsDesc}</p> </span> </label> </div> <div class="cookie-option" data-astro-cid-garwan2p> <label data-astro-cid-garwan2p> <input type="checkbox" id="marketing-toggle" class="cookie-checkbox" data-astro-cid-garwan2p> <span class="option-label" data-astro-cid-garwan2p> <strong data-astro-cid-garwan2p>${t.marketing}</strong> <p data-astro-cid-garwan2p>${t.marketingDesc}</p> </span> </label> </div> </div> <div class="cookie-actions" data-astro-cid-garwan2p> <button id="reject-all-btn" class="btn btn-secondary" data-astro-cid-garwan2p>${t.rejectAll}</button> <button id="settings-btn" class="btn btn-secondary" data-astro-cid-garwan2p>${t.settings}</button> <button id="save-prefs-btn" class="btn btn-primary hidden" data-astro-cid-garwan2p>${t.save}</button> <button id="accept-all-btn" class="btn btn-primary" data-astro-cid-garwan2p>${t.acceptAll}</button> </div> </div> </div> ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/CookieConsent.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bluecells/Websites/all-leaders/src/components/CookieConsent.astro", void 0);

async function getFaqQuestions({ lang, category }) {
  const allFaqs = await getCollection("faq");
  let faqs = allFaqs;
  if (lang) {
    faqs = faqs.filter((f) => f.data.lang === lang);
  }
  if (category) {
    faqs = faqs.filter((f) => f.data.category === category);
  }
  return faqs.flatMap((faq) => [
    {
      question: faq.data.question,
      answer: faq.body
    }
  ]);
}

const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    lang = "fr",
    seoSlug,
    metaTitle,
    metaDescription,
    description,
    ogImage,
    ogType = "website",
    jsonType,
    keyword,
    publishDate,
    roomData,
    alternateUrls,
    isHomepage = false,
    breadcrumbCategory
  } = Astro2.props;
  const finalMetaDescription = metaDescription || description || "";
  const finalMetaTitle = metaTitle ?? title;
  const pageLang = lang;
  const finalJsonType = jsonType ?? null;
  let faqQuestions = [];
  if (finalJsonType === "faq") {
    faqQuestions = await getFaqQuestions({
      lang: pageLang
    });
  }
  const finalOgImage = ogImage || void 0;
  return renderTemplate`<html${addAttribute(pageLang, "lang")}> ${renderComponent($$result, "Head", $$Head, { "title": title, "metaTitle": finalMetaTitle, "metaDescription": finalMetaDescription, "ogImage": finalOgImage, "ogType": ogType, "lang": pageLang, "jsonType": finalJsonType, "faqQuestions": faqQuestions, "publishDate": publishDate, "roomData": roomData, "alternateUrls": alternateUrls })}${renderComponent($$result, "Header", $$Header, { "lang": pageLang })}${maybeRenderHead()}<body> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TF95X7B2" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> <main> ${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "lang": pageLang, "title": title, "category": breadcrumbCategory })} ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "lang": pageLang })} ${renderComponent($$result, "SeoAnalyzer", $$SeoAnalyzer, { "keyword": keyword })} ${renderComponent($$result, "CookieConsent", $$CookieConsent, { "lang": pageLang })} ${isHomepage && renderTemplate`${renderComponent($$result, "NewsletterPopup", $$NewsletterPopup, { "lang": pageLang })}`} ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/bluecells/Websites/all-leaders/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$Breadcrumb as a, renderScript as r };
