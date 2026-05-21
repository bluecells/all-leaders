import { c as createComponent } from './astro-component_CBbIRNKv.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, d as renderTemplate } from './server_C9Y93v7l.mjs';
import 'clsx';

const $$YouTube = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$YouTube;
  const {
    videoId,
    title = "Video YouTube",
    height,
    padding = "2rem 0",
    text,
    textPosition = "bottom",
    fullbleed = false
  } = Astro2.props;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const containerStyle = height ? `height: ${height}; width: calc(${height} * 16 / 9); max-width: 100%;` : "";
  const isHorizontal = textPosition === "left" || textPosition === "right";
  const flexDirection = isHorizontal ? textPosition === "left" ? "row-reverse" : "row" : textPosition === "top" ? "column-reverse" : "column";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`youtube-wrapper ${fullbleed ? "full-bleed" : "youtube-constrained"}`, "class")}${addAttribute(`padding: ${padding}; ${isHorizontal && text ? "display: flex; flex-direction: " + flexDirection + "; gap: 2rem; align-items: center;" : ""}`, "style")} data-astro-cid-3dd5unsn> ${text && !isHorizontal && textPosition === "top" && renderTemplate`<div class="youtube-text mb-4 text-center" data-astro-cid-3dd5unsn> <p class="text-lg" data-astro-cid-3dd5unsn>${text}</p> </div>`} <div class="youtube-content"${addAttribute(isHorizontal && text ? "flex: 1;" : "", "style")} data-astro-cid-3dd5unsn> <a${addAttribute(youtubeUrl, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(containerStyle || void 0, "style")}${addAttribute(["youtube-preview group relative block overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]", [
    "youtube-preview",
    "group",
    "relative",
    "block",
    "overflow-hidden",
    "rounded-lg",
    "shadow-lg",
    "transition-transform",
    "hover:scale-[1.02]",
    { "mx-auto": height && !text }
    // Centrer si hauteur fixe et pas de texte
  ]], "class:list")} data-astro-cid-3dd5unsn> <img${addAttribute(thumbnailUrl, "src")}${addAttribute(title, "alt")} class="w-full h-full object-cover" data-astro-cid-3dd5unsn> <div class="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40" data-astro-cid-3dd5unsn> <div class="w-20 h-20 flex items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110" data-astro-cid-3dd5unsn> <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-3dd5unsn> <path d="M8 5v14l11-7z" data-astro-cid-3dd5unsn></path> </svg> </div> </div> </a> </div> ${text && isHorizontal && renderTemplate`<div class="youtube-text flex-1" data-astro-cid-3dd5unsn> <p data-astro-cid-3dd5unsn>${text}</p> </div>`} ${text && !isHorizontal && textPosition === "bottom" && renderTemplate`<div class="youtube-text mt-4 text-center" data-astro-cid-3dd5unsn> <p data-astro-cid-3dd5unsn>${text}</p> </div>`} </div>`;
}, "/Users/bluecells/Websites/all-leaders/src/components/UI/YouTube.astro", void 0);

export { $$YouTube as $ };
