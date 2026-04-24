import { fields } from '@keystatic/core';

export const Duo = {
  label: 'Duo (Texte + Image)',
  schema: fields.object({
    title: fields.text({ label: 'Titre' }),
    subtitle: fields.text({ 
      label: 'Sous-titre / Description', 
      multiline: true 
    }),
    ctaText: fields.text({ label: 'Texte du bouton (CTA)' }),
    ctaLink: fields.text({ label: 'Lien du bouton' }),
    image: fields.image({
      label: 'Image',
      directory: 'public/images/pages',
      publicPath: '/images/pages/',
      validation: { isRequired: true }
    }),
    imageAlt: fields.text({ label: 'Description de l’image (SEO)' }),
    imagePosition: fields.select({
      label: "Position de l'image",
      options: [
        { label: 'Gauche', value: 'left' },
        { label: 'Droite', value: 'right' },
      ],
      defaultValue: 'right',
    }),
    background: fields.text({ 
      label: 'Couleur de fond (Hex ou nom)', 
      defaultValue: 'transparent' 
    }),
  }),
};

// --- BLOC BANNER ---
export const Banner = {
  label: 'Banner (Eroe / Intestazione)',
  schema: fields.object({
    title: fields.text({ label: 'Titolo (HTML permesso)' }),
    subtitle: fields.text({ label: 'Sottotitolo (HTML permesso)', multiline: true }),
    backgroundImage: fields.image({
      label: 'Immagine di sfondo (Opzionale)',
      directory: 'public/images/pages',
      publicPath: '/images/pages/',
    }),
    background: fields.text({ 
      label: 'Colore di sfondo (usato se non c’è l’immagine)', 
      defaultValue: 'white' 
    }),
    height: fields.select({
      label: 'Altezza del banner',
      options: [
        { label: 'Piccolo (300px)', value: '300px' },
        { label: 'Medio (400px)', value: '400px' },
        { label: 'Grande (600px)', value: '600px' },
        { label: 'Schermo intero (100vh)', value: '100vh' },
      ],
      defaultValue: '400px',
    }),
  }),
};

// --- BLOC CAROUSEL ---
export const Carousel = {
  label: 'Carousel (Logo/Immagini Infinite)',
  schema: fields.object({
    images: fields.array(
      fields.object({
        src: fields.image({
          label: 'Immagine',
          directory: 'public/images/carousel',
          publicPath: '/images/carousel/',
          validation: { isRequired: true }
        }),
        alt: fields.text({ label: 'Descrizione SEO (Alt)', validation: { isRequired: true } }),
      }),
      {
        label: 'Galleria Immagini',
        itemLabel: (props) => props.fields.alt.value || 'Immagine carousel',
      }
    ),
    height: fields.text({ label: 'Altezza (es: 30vh)', defaultValue: '30vh' }),
    speed: fields.number({ label: 'Velocità (ms per immagine)', defaultValue: 5000 }),
    spacing: fields.text({ label: 'Spaziatura (es: 1rem)', defaultValue: '1rem' }),
    background: fields.text({ label: 'Colore di sfondo', defaultValue: 'transparent' }),
  }),
};

export const CarouselRooms = {
  label: 'Carousel Automatique (Camere)',
  schema: fields.object({
    lang: fields.select({
      label: 'Lingua da mostrare',
      options: [
        { label: 'Italiano', value: 'it' },
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' }
      ],
      defaultValue: 'it',
    }),
    height: fields.text({ label: 'Altezza (es: 500px)', defaultValue: '500px' }),
    speed: fields.number({ label: 'Velocità ciclo (ms)', defaultValue: 40000 }),
    spacing: fields.text({ label: 'Spaziatura (es: 1rem)', defaultValue: '1rem' }),
    background: fields.text({ label: 'Colore di sfondo', defaultValue: 'transparent' }),
    showCapacity: fields.checkbox({ label: 'Mostra Capacità', defaultValue: true }),
    showName: fields.checkbox({ label: 'Mostra Nome Camera', defaultValue: true }),
    showPunchline: fields.checkbox({ label: 'Mostra Punchline', defaultValue: true }),
  }),
};

export const Hero = {
  label: 'Hero Section (Moderne)',
  schema: fields.object({
    title: fields.text({ label: 'Titolo Principale', defaultValue: 'Titolo Principale' }),
    subtitle: fields.text({ label: 'Titolo Secondario (Sopra)', defaultValue: 'Sottotitolo' }),
    body: fields.markdoc({ 
      label: 'Corpo del testo',
    }),
    backgroundImage: fields.image({
      label: 'Immagine di Sfondo (Opzionale)',
      directory: 'public/images/hero',
      publicPath: '/images/hero/',
    }),
    photoCredit: fields.text({ label: 'Crediti fotografici' }),
    // Positionnement de l'image
    backgroundPositionX: fields.select({
      label: 'Posizione Orizzontale Immagine',
      options: [
        { label: 'Sinistra', value: 'left' },
        { label: 'Centro', value: 'center' },
        { label: 'Destra', value: 'right' },
      ],
      defaultValue: 'center',
    }),
    backgroundPositionY: fields.select({
      label: 'Posizione Verticale Immagine',
      options: [
        { label: 'Alto', value: 'top' },
        { label: 'Centro', value: 'center' },
        { label: 'Basso', value: 'bottom' },
      ],
      defaultValue: 'center',
    }),
    // CTA Principale
    ctaText: fields.text({ label: 'Testo Pulsante (CTA)', defaultValue: 'Prenota Ora' }),
    ctaLink: fields.text({ label: 'Link Pulsante', defaultValue: '/booking' }),
    // CTA Secondaire
    secondaryLinkText: fields.text({ label: 'Testo Link Secondario' }),
    secondaryLinkUrl: fields.text({ label: 'URL Link Secondario' }),
    // Style alternatif si pas d'image
    bgColor: fields.text({ 
      label: 'Colore di sfondo (Tailwind class)', 
      defaultValue: 'bg-indigo-900' 
    }),
  }),
};

export const Link = {
  label: 'Link / Bottone Isolato',
  schema: fields.object({
    label: fields.text({ label: 'Testo del link', defaultValue: 'Scopri di più' }),
    href: fields.text({ label: 'URL (destinazione)', defaultValue: '/' }),
    external: fields.checkbox({ label: 'Apri in una nuova scheda', defaultValue: false }),
    underline: fields.checkbox({ label: 'Sottolineato', defaultValue: true }),
    center: fields.checkbox({ label: 'Centra il link nella pagina', defaultValue: false }),
  }),
};

export const Slider = {
  label: 'Slider (Fade + Frame Testo)',
  schema: fields.object({
    images: fields.array(
      fields.object({
        src: fields.image({
          label: 'Immagine',
          directory: 'public/images/slider',
          publicPath: '/images/slider/',
          validation: { isRequired: true }
        }),
        alt: fields.text({ label: 'Descrizione SEO (Alt)', validation: { isRequired: true } }),
      }),
      {
        label: 'Galleria Slider',
        itemLabel: (props) => props.fields.alt.value || 'Immagine slide',
      }
    ),
    title: fields.text({ label: 'Titolo nel riquadro' }),
    subtitle: fields.text({ label: 'Sottotitolo', multiline: true }),
    ctaText: fields.text({ label: 'Testo Bottone' }),
    ctaLink: fields.text({ label: 'Link Bottone' }),
    framePosition: fields.select({
      label: 'Posizione del riquadro',
      options: [
        { label: 'Sinistra', value: 'left' },
        { label: 'Destra', value: 'right' },
      ],
      defaultValue: 'left',
    }),
    height: fields.text({ label: 'Altezza (es: 100vh o 600px)', defaultValue: 'calc(100vh - 7rem)' }),
    speed: fields.number({ label: 'Velocità transizione (ms)', defaultValue: 3000 }),
  }),
};

export const RichTextEditor = {
  label: 'Éditeur de Texte Complet',
  schema: fields.object({
    content: fields.markdoc({
      label: 'Contenu',
      // On active les options avancées
      options: {
        image: {
          directory: 'public/images/content',
          publicPath: '/images/content/',
        },
      },
    }),
    // On ajoute des contrôles de style en dehors du Markdoc pour la précision
    style: fields.object({
      alignment: fields.select({
        label: 'Alignement du texte',
        options: [
          { label: 'Gauche', value: 'text-left' },
          { label: 'Centre', value: 'text-center' },
          { label: 'Droite', value: 'text-right' },
          { label: 'Justifié', value: 'text-justify' },
        ],
        defaultValue: 'text-left',
      }),
      maxWidth: fields.select({
        label: 'Largeur max du bloc',
        options: [
          { label: 'Standard (Prose)', value: 'max-w-prose' },
          { label: 'Large', value: 'max-w-5xl' },
          { label: 'Pleine largeur', value: 'max-w-none' },
        ],
        defaultValue: 'max-w-prose',
      }),
      backgroundColor: fields.text({ label: 'Couleur de fond (Hex ou CSS)', defaultValue: 'transparent' }),
    }),
  }),
};