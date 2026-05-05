import { A as AstroError, I as InvalidComponentArgs, c as createRenderInstruction, g as generateCspDigest, s as spreadAttributes, u as unescapeHTML, r as renderTemplate, a as removeBase, i as isRemotePath, U as UnknownContentCollectionError, b as addAttribute, d as renderComponent, F as Fragment, m as maybeRenderHead, e as renderSlot } from './prerender_CW7qV1FV.mjs';
import 'piccolore';
import 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import * as z from 'zod/v4';
import 'clsx';
import * as devalue from 'devalue';
import { marked } from 'marked';

function validateArgs(args) {
  if (args.length !== 3) return false;
  if (!args[0] || typeof args[0] !== "object") return false;
  return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
  const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
  const fn = (...args) => {
    if (!validateArgs(args)) {
      throw new AstroError({
        ...InvalidComponentArgs,
        message: InvalidComponentArgs.message(name)
      });
    }
    return cb(...args);
  };
  Object.defineProperty(fn, "name", { value: name, writable: false });
  fn.isAstroComponentFactory = true;
  fn.moduleId = moduleId;
  fn.propagation = propagation;
  return fn;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
  return cb;
}
function createComponent(arg1, moduleId, propagation) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId, propagation);
  } else {
    return createComponentWithOptions(arg1);
  }
}

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

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_B_fHPZTn.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
}

// astro-head-inject

const liveCollections = {};

const getCollection = createGetCollection({
	liveCollections,
});

const SITE = {
  NAME: "All Leaders Initiative",
  URL: "https://all-leaders.fr",
  AUTHOR: "All Leaders"
};

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
    address: "67 rue de la Condamine",
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
    address: "67 rue de la Condamine",
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
  return renderTemplate`<!-- Charset & viewport --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- SEO Base --><title>${title}</title><meta name="title"${addAttribute(finalMetaTitle, "content")}><meta name="description"${addAttribute(finalMetaDescription, "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="canonical"${addAttribute(currentUrl, "href")}><!-- Favicon --><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><!-- Open Graph --><meta property="og:type"${addAttribute(ogType, "content")}><meta property="og:url"${addAttribute(currentUrl, "content")}><meta property="og:title"${addAttribute(finalMetaTitle, "content")}><meta property="og:description"${addAttribute(finalMetaDescription, "content")}><meta property="og:image"${addAttribute(absoluteOgImage, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:locale"${addAttribute(ogLocale, "content")}><meta property="og:site_name" content="All Leaders"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"${addAttribute(currentUrl, "content")}><meta name="twitter:title"${addAttribute(finalMetaTitle, "content")}><meta name="twitter:description"${addAttribute(finalMetaDescription, "content")}><meta name="twitter:image"${addAttribute(absoluteOgImage, "content")}><!-- Article specific (for blog posts) -->${ogType === "article" && publishDate && renderTemplate`<meta property="article:published_time"${addAttribute(publishDate.toISOString(), "content")}>`}<!-- Language alternates -->${alternateUrls ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<link rel="alternate" hreflang="fr"${addAttribute(new URL(alternateUrls.fr, siteUrl).toString(), "href")}>${alternateUrls.en && renderTemplate`<link rel="alternate" hreflang="en"${addAttribute(new URL(alternateUrls.en, siteUrl).toString(), "href")}>`}<link rel="alternate" hreflang="x-default"${addAttribute(new URL(alternateUrls.fr, siteUrl).toString(), "href")}>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<link rel="alternate"${addAttribute(lang, "hreflang")}${addAttribute(currentUrl, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(siteUrl, "href")}>` })}`}<!-- Robots --><meta name="robots" content="index, follow"><!-- JSON-LD  -->${jsonType === "faq" && faqQuestions.length > 0 && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "type": "faq", "title": title, "url": `${SITE.URL}${Astro2.url.pathname}`, "questions": faqQuestions.slice(0, 25) })}`}${jsonType === "page" && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "type": "page", "title": title, "description": finalMetaDescription, "url": `${SITE.URL}${Astro2.url.pathname}` })}`}${jsonType === "hotelRoom" && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "type": "hotelRoom", "title": title, "description": finalMetaDescription, "url": `${SITE.URL}${Astro2.url.pathname}`, "image": ogImage, "capacity": roomData?.capacity, "amenities": roomData?.amenities })}`}${jsonType === "blog" && publishDate && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "type": "blog", "title": title, "description": finalMetaDescription, "url": `${SITE.URL}${Astro2.url.pathname}`, "date": publishDate, "image": ogImage, "author": SITE.AUTHOR })}`}${renderComponent($$result, "GoogleTagManager", $$GoogleTagManager, {})}`;
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
  const menuData = lang === "fr" ? menuFR : lang === "en" ? menuEN : menuFR;
  const liensDuMenu = menuData?.links || [];
  const logoUrl = lang === "fr" ? "/" : `/${lang}`;
  return renderTemplate`${maybeRenderHead()}<header class="header-main" data-astro-cid-3ef6ksr2> <div class="header-container" data-astro-cid-3ef6ksr2> <div class="header-content" data-astro-cid-3ef6ksr2> <div class="logo-container" data-astro-cid-3ef6ksr2> <a${addAttribute(logoUrl, "href")} class="logo-link" data-astro-cid-3ef6ksr2> <img class="logo-img" src="/images/logo-all-leaders-initiative.webp" alt="Logo d'All Leaders Initiative" data-astro-cid-3ef6ksr2> </a> </div> <nav class="nav-desktop" data-astro-cid-3ef6ksr2> ${liensDuMenu.map((item) => renderTemplate`<div class="nav-item-wrapper" data-astro-cid-3ef6ksr2> ${item.hasSubmenu && item.submenu && item.submenu.length > 0 ? renderTemplate`<div class="nav-item-with-submenu" data-astro-cid-3ef6ksr2> <button class="nav-link nav-link-with-arrow" data-submenu-trigger data-astro-cid-3ef6ksr2> ${item.label} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="chevron-icon" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" data-astro-cid-3ef6ksr2></path> </svg> </button> <div class="submenu-dropdown" data-astro-cid-3ef6ksr2> ${item.submenu.map((subitem) => renderTemplate`<a${addAttribute(subitem.url, "href")} class="submenu-link" data-astro-cid-3ef6ksr2> ${subitem.label} </a>`)} </div> </div>` : renderTemplate`<a${addAttribute(item.url, "href")}${addAttribute(item.type === "cta" ? "btn-nav" : "nav-link", "class")} data-astro-cid-3ef6ksr2> ${item.label} </a>`} </div>`)} <!-- Language Switcher --> <div class="lang-switcher" data-astro-cid-3ef6ksr2> <a href="/" title="Français" style="font-size:large;"${addAttribute(lang === "fr" ? "lang-link lang-active" : "lang-link", "class")} data-astro-cid-3ef6ksr2>🇫🇷</a> <span class="lang-separator" data-astro-cid-3ef6ksr2>/</span> <a href="/en" style="font-size:large;" title="English"${addAttribute(lang === "en" ? "lang-link lang-active" : "lang-link", "class")} data-astro-cid-3ef6ksr2>🇬🇧</a> </div> </nav> <div class="mobile-menu-button" data-astro-cid-3ef6ksr2> <button id="menu-toggle" class="menu-toggle" aria-label="Toggle menu" data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="menu-icon" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-astro-cid-3ef6ksr2></path> </svg> </button> </div> </div> </div> <div id="mobile-menu" class="mobile-menu-content" data-astro-cid-3ef6ksr2> ${liensDuMenu.map((item) => renderTemplate`<div class="mobile-menu-item" data-astro-cid-3ef6ksr2> ${item.hasSubmenu && item.submenu && item.submenu.length > 0 ? renderTemplate`<div class="mobile-submenu-wrapper" data-astro-cid-3ef6ksr2> <button class="mobile-menu-link mobile-submenu-trigger" data-mobile-submenu data-astro-cid-3ef6ksr2> ${item.label} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mobile-chevron" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" data-astro-cid-3ef6ksr2></path> </svg> </button> <div class="mobile-submenu-items" data-astro-cid-3ef6ksr2> ${item.submenu.map((subitem) => renderTemplate`<a${addAttribute(subitem.url, "href")} class="mobile-submenu-link" data-astro-cid-3ef6ksr2> ${subitem.label} </a>`)} </div> </div>` : renderTemplate`<a${addAttribute(item.url, "href")}${addAttribute(item.type === "cta" ? "mobile-menu-link mobile-menu-cta" : "mobile-menu-link", "class")} data-astro-cid-3ef6ksr2> ${item.label} </a>`} </div>`)} <!-- Language Switcher Mobile --> <div class="mobile-lang-switcher" data-astro-cid-3ef6ksr2> <a href="/" title="Français" style="font-size:large;"${addAttribute(lang === "fr" ? "mobile-lang-link mobile-lang-active" : "mobile-lang-link", "class")} data-astro-cid-3ef6ksr2>🇫🇷</a> <span class="lang-separator" data-astro-cid-3ef6ksr2>/</span> <a href="/en" title="English" style="font-size:large;"${addAttribute(lang === "en" ? "mobile-lang-link mobile-lang-active" : "mobile-lang-link", "class")} data-astro-cid-3ef6ksr2>🇬🇧</a> </div> </div> </header>  ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
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
      privacy: "privacy-policy-fr",
      cookie: "cookies-policy-fr"
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
  return renderTemplate`${maybeRenderHead()}<footer class="footer-main" data-astro-cid-sz7xmlte> <div class="footer-container" data-astro-cid-sz7xmlte> <div class="footer-grid" data-astro-cid-sz7xmlte> <div class="footer-section" data-astro-cid-sz7xmlte> <img src="/images/pages/logo-all-leaders-rond-fonce.svg" style="width: 180px; height: auto;" alt="Pilotine" class="footer-logo" data-astro-cid-sz7xmlte> <h3 class="footer-title" data-astro-cid-sz7xmlte>${t.company}</h3> <p class="footer-address" data-astro-cid-sz7xmlte> ${t.address},<br data-astro-cid-sz7xmlte> ${t.city}<br data-astro-cid-sz7xmlte> </p></div> <div class="footer-section" data-astro-cid-sz7xmlte> <div class="flex flex-row gap-4" data-astro-cid-sz7xmlte> <div class="pilotine" data-astro-cid-sz7xmlte></div> <div style="width: 200px;" data-astro-cid-sz7xmlte> <h4 class="footer-heading pb-4" data-astro-cid-sz7xmlte>${t.explore}</h4> <ol class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="https://bureaudureel.fr" class="footer-link" data-astro-cid-sz7xmlte>${t.bureauDuReel}</a></li> <li data-astro-cid-sz7xmlte><a${addAttribute(navigationLinks.blog, "href")} class="footer-link" data-astro-cid-sz7xmlte>${t.blog}</a></li> <li data-astro-cid-sz7xmlte><a${addAttribute(navigationLinks.faq, "href")} class="footer-link" data-astro-cid-sz7xmlte>${t.faq}</a></li> <li data-astro-cid-sz7xmlte><a${addAttribute(navigationLinks.privacy, "href")} class="footer-link" data-astro-cid-sz7xmlte>${t.privacy}</a></li> <li data-astro-cid-sz7xmlte><a${addAttribute(navigationLinks.cookie, "href")} class="footer-link" data-astro-cid-sz7xmlte>${t.cookie}</a></li> </ol> </div> </div> </div> <div class="footer-section" data-astro-cid-sz7xmlte> <img src="/images/pages/bateau.webp" style="width: 150px; height: auto;" alt="Pilotine" class="footer-logo" data-astro-cid-sz7xmlte> <h4 class="footer-heading" data-astro-cid-sz7xmlte>${t.keepInTouch}</h4> <p class="newsletter-text" data-astro-cid-sz7xmlte> ${t.newsletterText} </p> <a href="https://bureaudureel.kessel.media/" target="_blank" class="btn-limolo" style="display:inline-block; width: auto;" data-astro-cid-sz7xmlte><span style="font-size: 12px; font-weight: normal;" data-astro-cid-sz7xmlte>${t.subscribe}</span><br data-astro-cid-sz7xmlte> <span class="font-bold text-lg" data-astro-cid-sz7xmlte>${t.newsletterTitle}</span> </a> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <div class="footer-social" data-astro-cid-sz7xmlte> <a href="https://www.instagram.com/bureaudureel/" class="social-link" data-astro-cid-sz7xmlte>${t.instagram}</a> <a href="https://www.youtube.com/@bureaudureel" class="social-link" data-astro-cid-sz7xmlte>${t.youtube}</a> <a href="https://www.linkedin.com/company/all-leaders-initiative/" class="social-link" data-astro-cid-sz7xmlte>${t.linkedin}</a> <a href="mailto:contact@all-leaders.fr" class="social-link" data-astro-cid-sz7xmlte>contact@all-leaders.fr</a> <a href="tel:+33603555452" class="social-link" data-astro-cid-sz7xmlte>+33 6 03 55 54 52</a> </div> <div class="footer-copyright" data-astro-cid-sz7xmlte>
© ${currentYear} ${t.copyright} <a href="https://bluecells.eu" target="_blank" data-astro-cid-sz7xmlte>${t.blueCells}</a> </div> </div> </div> </footer>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/Footer.astro", void 0);

const $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const { items = [], category, title } = Astro2.props;
  let breadcrumbItems = [];
  if (items.length > 0) {
    breadcrumbItems = items;
  } else {
    const currentPath = Astro2.url.pathname;
    const pathSegments = currentPath.split("/").filter((segment) => segment);
    const isFAQ = pathSegments.includes("faq");
    const isEventi = pathSegments.includes("eventi");
    const isAccompagnements = pathSegments.includes("accompagnements");
    if (isFAQ && pathSegments.length >= 2) {
      const folderName = "faq";
      const folderLabel = "FAQ";
      const categoryFromPath = pathSegments[1];
      const categoryLabel = category || categoryFromPath.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      const categorySlug = category ? category.toLowerCase().replace(/\s+/g, "-") : categoryFromPath.toLowerCase();
      const titleFromPath = pathSegments[pathSegments.length - 1];
      const titleLabel = title || titleFromPath.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      breadcrumbItems = [
        { label: "Accueil", href: "/" },
        { label: folderLabel, href: `/${folderName}` },
        { label: categoryLabel, href: `/${folderName}/${categorySlug}` },
        { label: titleLabel, href: "" }
        // Pas de href pour la page actuelle
      ];
    } else if (isAccompagnements && pathSegments.length >= 2) {
      const categoryFromPath = pathSegments[1];
      const categoryLabel = category || categoryFromPath.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      const titleFromPath = pathSegments[pathSegments.length - 1];
      const titleLabel = title || titleFromPath.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      breadcrumbItems = [
        { label: "Accueil", href: "/" },
        { label: "Accompagnements", href: "/accompagnements" },
        { label: categoryLabel, href: `/accompagnements#category-${categoryFromPath}` },
        { label: titleLabel, href: "" }
        // Pas de href pour la page actuelle
      ];
    } else if (isEventi && pathSegments.length >= 2) {
      const titleFromPath = pathSegments[pathSegments.length - 1];
      const titleLabel = title || titleFromPath.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      breadcrumbItems = [
        { label: "Accueil", href: "/" },
        { label: "FAQ", href: "/faq" },
        { label: titleLabel, href: "" }
      ];
    } else {
      breadcrumbItems = [
        { label: "Accueil", href: "/" },
        // Pour chaque segment, construire un élément du fil d'Ariane
        ...pathSegments.map((segment, index) => {
          let href = "/" + pathSegments.slice(0, index + 1).join("/");
          if (segment === "expertises" && index === 0) {
            href = "/speakers/conferenciers-expertises";
          } else if (segment === "types-interventions" && index === 0) {
            href = "/speakers/conferenciers-types-interventions";
          }
          const label = segment.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
          return { label, href };
        })
      ];
    }
  }
  return renderTemplate`<!--
  Navigation Breadcrumb accessible avec aria-label
  Structure sémantique <nav> > <ol> > <li>
-->${maybeRenderHead()}<nav aria-label="Fil d'Ariane" class="breadcrumb-nav" data-astro-cid-qaanghzh> <ol class="breadcrumb-list" data-astro-cid-qaanghzh> ${breadcrumbItems.map((item, index) => {
    const isLast = index === breadcrumbItems.length - 1;
    return renderTemplate`<li class="breadcrumb-item" data-astro-cid-qaanghzh>  ${!isLast && item.href ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-qaanghzh": true }, { "default": ($$result2) => renderTemplate` <a${addAttribute(item.href, "href")} class="breadcrumb-link" data-astro-cid-qaanghzh> ${item.label} </a> <span class="breadcrumb-separator" aria-hidden="true" data-astro-cid-qaanghzh>
/
</span> ` })}` : (
      /* Dernier élément : texte non cliquable avec aria-current pour l'accessibilité */
      renderTemplate`<span${addAttribute(isLast ? "page" : void 0, "aria-current")} class="breadcrumb-current" data-astro-cid-qaanghzh> ${item.label} </span>`
    )} </li>`;
  })} </ol> </nav>`;
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
    privacyLink: "/fr/privacy-policy-fr",
    cookieLink: "/fr/cookies-policy-fr"
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
    lang = "it",
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
    isHomepage = false
  } = Astro2.props;
  const finalMetaDescription = metaDescription || description || "";
  const pageLang = lang;
  const finalJsonType = jsonType ?? null;
  let faqQuestions = [];
  if (finalJsonType === "faq") {
    faqQuestions = await getFaqQuestions({
      lang: pageLang
    });
  }
  const finalOgImage = ogImage || void 0;
  return renderTemplate`<html${addAttribute(pageLang, "lang")}> ${renderComponent($$result, "Head", $$Head, { "title": title, "metaTitle": metaTitle ?? title, "metaDescription": finalMetaDescription, "ogImage": finalOgImage, "ogType": ogType, "lang": pageLang, "jsonType": finalJsonType, "faqQuestions": faqQuestions, "publishDate": publishDate, "roomData": roomData, "alternateUrls": alternateUrls })}${renderComponent($$result, "Header", $$Header, { "lang": pageLang })}${maybeRenderHead()}<body> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TF95X7B2" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> <main> ${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "lang": pageLang })} ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "lang": pageLang })} ${renderComponent($$result, "SeoAnalyzer", $$SeoAnalyzer, { "keyword": keyword })} ${renderComponent($$result, "CookieConsent", $$CookieConsent, { "lang": pageLang })} ${isHomepage && renderTemplate`${renderComponent($$result, "NewsletterPopup", $$NewsletterPopup, { "lang": pageLang })}`} ${renderScript($$result, "/Users/bluecells/Websites/all-leaders/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/bluecells/Websites/all-leaders/src/layouts/Layout.astro", void 0);

const $$LayoutAccompagnements = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LayoutAccompagnements;
  const { accompagnement, category } = Astro2.props;
  const { data } = accompagnement;
  const lang = data.lang || "fr";
  const longDescriptionHTML = data.long_description ? await marked(data.long_description) : "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": data.title, "lang": lang, "metaTitle": `${data.title} - All Leaders Initiative`, "metaDescription": data.description, "data-astro-cid-jabcfvfe": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="accompagnement-page" data-astro-cid-jabcfvfe> <div class="flex items-center min-h-[93vh]" data-astro-cid-jabcfvfe> <div class="container mx-auto p-4 max-w-4xl" data-astro-cid-jabcfvfe>  <div class="metadata mb-4 flex items-center gap-4 justify-center flex-wrap" data-astro-cid-jabcfvfe> <span${addAttribute(`type-badge type-badge-${data.type}`, "class")} data-astro-cid-jabcfvfe> ${data.type} </span> ${category && renderTemplate`<span class="category-badge" data-astro-cid-jabcfvfe> ${lang === "fr" ? category.data.name_fr : category.data.name_en} </span>`} </div>  <h1 class="text-4xl md:text-5xl font-serif font-bold mb-8 text-limolo-green text-center" data-astro-cid-jabcfvfe> ${data.title} </h1>  <div class="description text-xl text-gray-700 mb-4 leading-relaxed text-center max-w-2xl mx-auto" data-astro-cid-jabcfvfe> <p data-astro-cid-jabcfvfe>${data.description}</p> </div>  ${data.image && renderTemplate`<div class="accompagnement-hero mb-8" data-astro-cid-jabcfvfe> <img${addAttribute(data.image, "src")}${addAttribute(data.title, "alt")} class="w-full h-auto rounded-lg shadow-lg object-cover" style="max-height: 420px;" data-astro-cid-jabcfvfe> </div>`} </div> </div> <div class="main-container max-w-4xl mx-auto" data-astro-cid-jabcfvfe> ${longDescriptionHTML && renderTemplate`<div class="description-section-wrapper" data-astro-cid-jabcfvfe> <div class="description-section mb-12" data-astro-cid-jabcfvfe>${unescapeHTML(longDescriptionHTML)}</div> </div>`}  ${(data.USP1 || data.USP2 || data.USP3 || data.USP4 || data.USP5) && renderTemplate`<div class="usp-section flex flex-col mx-auto" data-astro-cid-jabcfvfe> <div class="p-4 w-full flex flex-col items-center rounded-lg border border-limolo-green/10" data-astro-cid-jabcfvfe> <h2 class="text-xl font-serif font-semibold mt-4! mb-4 ml-4 text-limolo-green" data-astro-cid-jabcfvfe> ${lang === "fr" ? "Sujets clés" : "Key topics"} </h2> <ul class="usp-list gap-4" data-astro-cid-jabcfvfe> ${data.USP1 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP1}</span> </li>`} ${data.USP2 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP2}</span> </li>`} ${data.USP3 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP3}</span> </li>`} ${data.USP4 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP4}</span> </li>`} ${data.USP5 && renderTemplate`<li class="flex gap-3" data-astro-cid-jabcfvfe> <span class="usp-icon" data-astro-cid-jabcfvfe>✓</span> <span data-astro-cid-jabcfvfe>${data.USP5}</span> </li>`} </ul> </div>  <div class="cta-section mt-8 text-center" data-astro-cid-jabcfvfe> <a href="/contact" class="btn btn-primary btn-lg" data-astro-cid-jabcfvfe> ${lang === "fr" ? "Prendre contact" : "Get in touch"} </a> </div> </div>`} </div> </article> ` })}`;
}, "/Users/bluecells/Websites/all-leaders/src/layouts/LayoutAccompagnements.astro", void 0);

const prerender = true;
const getStaticPaths = (async () => {
  const accompagnements = await getCollection("accompagnements");
  const categories = await getCollection("accompagnements-categories");
  return accompagnements.map((accompagnement) => {
    const category = categories.find(
      (cat) => cat.data.name_fr === accompagnement.data.categorie || cat.data.name_en === accompagnement.data.categorie
    );
    const categorieSlug = category?.data.slug || accompagnement.data.categorie.toLowerCase().replace(/\s+/g, "-");
    const slug = accompagnement.data.lang === "fr" ? accompagnement.data.slug_fr : accompagnement.data.slug_en;
    return {
      params: {
        categorie: categorieSlug,
        slug
      },
      props: {
        accompagnementId: accompagnement.id,
        categoryId: category?.id
      }
    };
  });
});
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { accompagnementId, categoryId } = Astro2.props;
  const accompagnements = await getCollection("accompagnements");
  const categories = await getCollection("accompagnements-categories");
  const accompagnement = accompagnements.find((a) => a.id === accompagnementId);
  const category = categories.find((c) => c.id === categoryId);
  if (!accompagnement) {
    return Astro2.redirect("/accompagnements");
  }
  return renderTemplate`${renderComponent($$result, "LayoutAccompagnements", $$LayoutAccompagnements, { "accompagnement": accompagnement, "category": category })}`;
}, "/Users/bluecells/Websites/all-leaders/src/pages/accompagnements/[categorie]/[slug].astro", void 0);

const $$file = "/Users/bluecells/Websites/all-leaders/src/pages/accompagnements/[categorie]/[slug].astro";
const $$url = "/accompagnements/[categorie]/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
