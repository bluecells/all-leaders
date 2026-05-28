/**
 * Centralized JSON-LD type definitions
 * Used by Head.astro, Layout.astro, and JsonLd.astro
 */

export type JsonLdType =
  | 'page'
  | 'blog'
  | 'faq'
  | 'service'
  | 'blogCollection'
  | 'hotelRoom'
  | null;
