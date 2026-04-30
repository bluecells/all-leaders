import { c as createComponent } from './astro-component_BLIHCxi5.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate } from './server_DNeM8zG_.mjs';
import 'clsx';
import { S as SITE } from './_astro_content_oQYTZ2Lj.mjs';

const actionBarTranslations = {
  it: {
    book: "Prenota",
    call: "Chiama",
    whatsapp: "Whatsapp",
    email: "Email",
    map: "Mappa"
  },
  fr: {
    book: "Réserver",
    call: "Appeler",
    whatsapp: "Whatsapp",
    email: "Email",
    map: "Carte"
  },
  en: {
    book: "Book",
    call: "Call",
    whatsapp: "Whatsapp",
    email: "Email",
    map: "Map"
  }
};

const $$ActionBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ActionBar;
  const { lang = "it", propertyId = SITE.PROPERTYID, roomId } = Astro2.props;
  const t = actionBarTranslations[lang] || actionBarTranslations.it;
  const regionLabels = {
    it: "sardegna",
    fr: "sardaigne",
    en: "sardinia"
  };
  const region = regionLabels[lang];
  const contactUrls = {
    it: "https://all-leaders.fr/contattaci",
    fr: "https://all-leaders.fr/nous-contacter"
    // en: 'https://all-leaders.fr/contact-us',
  };
  const emailUrl = contactUrls[lang] || contactUrls.it;
  const actions = [
    {
      label: t.book,
      url: `https://www.bed-and-breakfast.it/${lang}/booking/${region}/limolo-house-56-green-cabras/57031`,
      iconPath: "M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
    },
    {
      label: t.call,
      url: "tel:+393924812458",
      iconPath: "M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
    },
    {
      label: t.whatsapp,
      url: "https://wa.me/393924812458",
      iconPath: "M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"
    },
    {
      label: t.email,
      url: emailUrl,
      iconPath: "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
    },
    {
      label: t.map,
      url: `https://maps.google.com/?q=Limolo+${region}`,
      iconPath: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="sticky-action-bar" data-astro-cid-husf5irm> <div class="action-bar-container" data-astro-cid-husf5irm> ${actions.map((action) => renderTemplate`<a${addAttribute(action.url, "href")} class="action-item"${addAttribute(action.label, "aria-label")} data-astro-cid-husf5irm> <div class="icon-wrapper" data-astro-cid-husf5irm> <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-astro-cid-husf5irm> <path${addAttribute(action.iconPath, "d")} data-astro-cid-husf5irm></path> </svg> </div> <span class="action-label" data-astro-cid-husf5irm>${action.label}</span> </a>`)} </div> </nav>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/ActionBar.astro", void 0);

export { $$ActionBar as $ };
