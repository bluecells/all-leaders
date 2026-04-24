import { c as createComponent } from './astro-component_D7rd0kp0.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate, u as unescapeHTML, g as renderSlot } from './server_D2WlyLFw.mjs';
import 'clsx';

function getImageSrc(image) {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.src || "";
}
function getImageAlt(image, fallback = "") {
  if (!image) return fallback;
  if (typeof image === "string") return fallback;
  return image.alt || fallback;
}

const $$Duo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Duo;
  const {
    title,
    subtitle,
    ctaText,
    ctaLink,
    image,
    imageAlt = "",
    imagePosition = "right",
    background = "transparent",
    fullBleed = false,
    heightMatch = false,
    maxHeight = "60vh",
    noBorderPadding = false
  } = Astro2.props;
  const imageSrc = getImageSrc(image);
  const finalImageAlt = imageAlt || getImageAlt(image, "");
  const isImageLeft = imagePosition === "left";
  const hasImage = imageSrc && imageSrc.trim();
  function getContrastColor(hexColor) {
    if (!hexColor || hexColor === "transparent") return "var(--color-text-main)";
    if (hexColor.includes("var(")) return "#FFFFFF";
    const hex = hexColor.replace("#", "");
    if (hex.length !== 6) return "#FFFFFF";
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "var(--color-text-main)" : "#FFFFFF";
  }
  const textColor = getContrastColor(background);
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`duo ${fullBleed ? "duo-fullbleed" : ""}`, "class")} data-astro-cid-vzwpoxka> <div class="duo-container"${addAttribute(`background-color: ${background};`, "style")} data-astro-cid-vzwpoxka> <div${addAttribute(`duo-grid ${isImageLeft ? "duo-grid-reversed" : ""} ${heightMatch ? "height-match" : ""} ${noBorderPadding ? "no-border-padding" : ""}`, "class")} data-astro-cid-vzwpoxka> <!-- Colonne 1: Image ou Titre centré --> <div${addAttribute(`duo-column-1 ${hasImage ? "duo-image" : "duo-title-column"}`, "class")} data-astro-cid-vzwpoxka> ${hasImage ? renderTemplate`<img${addAttribute(imageSrc, "src")}${addAttribute(finalImageAlt, "alt")} loading="lazy"${addAttribute(`max-height: ${heightMatch ? "none" : maxHeight};`, "style")} data-astro-cid-vzwpoxka>` : renderTemplate`<h2 class="duo-title-large"${addAttribute(`color: ${textColor};`, "style")} data-astro-cid-vzwpoxka>${unescapeHTML(title)}</h2>`} </div> <!-- Colonne 2: Titre (si image) + Texte --> <div class="duo-column-2" data-astro-cid-vzwpoxka> ${hasImage && renderTemplate`<h2 class="duo-title" data-astro-cid-vzwpoxka>${unescapeHTML(title)}</h2>`} <div class="duo-content"${addAttribute(`--dynamic-text: ${textColor};`, "style")} data-astro-cid-vzwpoxka> ${renderSlot($$result, $$slots["default"])} </div> ${ctaText && ctaLink && renderTemplate`<a${addAttribute(ctaLink, "href")} class="duo-cta" data-astro-cid-vzwpoxka> ${ctaText} </a>`} </div> </div> </div> </section>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/Duo.astro", void 0);

export { $$Duo as $ };
