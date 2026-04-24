/**
 * Extrait le chemin d'une image (string ou objet Keystatic)
 * Permet une compatibilité entre:
 * - String brute: "/path/to/image.webp"
 * - Objet Keystatic: { src: "/path/to/image.webp", alt: "..." }
 */
export function getImageSrc(image: string | { src: string; alt?: string } | null | undefined): string {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return image.src || '';
}

/**
 * Extrait l'alt d'une image (string ou objet Keystatic)
 */
export function getImageAlt(image: string | { src: string; alt?: string } | null | undefined, fallback = ''): string {
  if (!image) return fallback;
  if (typeof image === 'string') return fallback;
  return image.alt || fallback;
}
