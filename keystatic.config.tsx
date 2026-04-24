import { CarouselRooms } from '@/content-components/carouselRooms';
import { ContactForm } from '@/content-components/contactForm';
import { config, fields, collection, singleton } from '@keystatic/core';
import {
  Banner,
  Carousel,
  Duo,
  Grid,
  Hero,
  Slider,
  WideImage,
  CtaButton,
  SliderSteps,
  FaqAccordion,
  Strip,
  InstaCarousel,
  Reviews,
  NotaBene,
  GoogleMaps,
  YouTube,
  Accordion,
  Align,
  BookingEngine,
  SliderBooking,
} from 'src/content-components/index.ts';
// New imports for content components

const isProd = process.env.NODE_ENV === 'production';

export default config({
  storage: isProd
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  ...(isProd && {
    cloud: {
      project: 'blue-cells-editors/limolo',
    },
  }),

  singletons: {
    menuIT: singleton({
      label: 'Menu IT 🇮🇹',
      path: 'src/content/menu/it',
      format: { data: 'json' },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Etichetta' }),
            url: fields.text({ label: 'URL' }),
            type: fields.select({
              label: 'Tipo',
              options: [
                { label: 'Link normale', value: 'link' },
                { label: 'Pulsante CTA', value: 'cta' },
              ],
              defaultValue: 'link',
            }),
            hasSubmenu: fields.checkbox({ label: 'Ha sottomenu?', defaultValue: false }),
            submenu: fields.array(
              fields.object({
                label: fields.text({ label: 'Etichetta sottomenu' }),
                url: fields.text({ label: 'URL sottomenu' }),
              }),
              { label: 'Sottomenu', itemLabel: (props) => props.fields.label.value || 'Sottomenu' }
            ),
          }),
          { label: 'Link del menu', itemLabel: (props) => props.fields.label.value || 'Link' }
        ),
      },
    }),
    menuFR: singleton({
      label: 'Menu FR 🇫🇷',
      path: 'src/content/menu/fr',
      format: { data: 'json' },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Libellé' }),
            url: fields.text({ label: 'URL' }),
            type: fields.select({
              label: 'Type',
              options: [
                { label: 'Lien normal', value: 'link' },
                { label: 'Bouton CTA', value: 'cta' },
              ],
              defaultValue: 'link',
            }),
            hasSubmenu: fields.checkbox({ label: 'A un sous-menu ?', defaultValue: false }),
            submenu: fields.array(
              fields.object({
                label: fields.text({ label: 'Libellé sous-menu' }),
                url: fields.text({ label: 'URL sous-menu' }),
              }),
              { label: 'Sous-menu', itemLabel: (props) => props.fields.label.value || 'Sous-menu' }
            ),
          }),
          { label: 'Liens du menu', itemLabel: (props) => props.fields.label.value || 'Lien' }
        ),
      },
    }),
    menuEN: singleton({
      label: 'Menu EN 🇬🇧',
      path: 'src/content/menu/en',
      format: { data: 'json' },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.text({ label: 'URL' }),
            type: fields.select({
              label: 'Type',
              options: [
                { label: 'Normal link', value: 'link' },
                { label: 'CTA button', value: 'cta' },
              ],
              defaultValue: 'link',
            }),
            hasSubmenu: fields.checkbox({ label: 'Has submenu?', defaultValue: false }),
            submenu: fields.array(
              fields.object({
                label: fields.text({ label: 'Submenu label' }),
                url: fields.text({ label: 'Submenu URL' }),
              }),
              { label: 'Submenu', itemLabel: (props) => props.fields.label.value || 'Submenu' }
            ),
          }),
          { label: 'Menu links', itemLabel: (props) => props.fields.label.value || 'Link' }
        ),
      },
    }),
    redirects: singleton({
      label: 'Redirects',
      path: 'src/content/redirects',
      format: { data: 'yaml' },
      schema: {
        redirects: fields.array(
          fields.object({
            from: fields.text({ label: 'Da (percorso vecchio)' }),
            to: fields.text({ label: 'A (percorso nuovo)' }),
            status: fields.select({
              label: 'Codice di stato HTTP',
              options: [
                { label: '301 (Permanente)', value: '301' },
                { label: '302 (Temporaneo)', value: '302' },
              ],
              defaultValue: '301',
            }),
            note: fields.text({ label: 'Nota (opzionale)', validation: { isRequired: false } }),
          }),
          {
            label: 'Redirects',
            itemLabel: (props) => `${props.fields.from.value} → ${props.fields.to.value}`,
          }
        ),
      },
    }),
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/**',
      columns: ['lang', 'title', 'seoSlug'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Titolo', description: 'Titolo della pagina' },
          slug: { label: 'Path fisico sul server', description: 'Diverso dello slug SEO' },
        }),
        metaTitle: fields.text({ label: 'Meta Title' }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        content: fields.markdoc({
          label: 'Contenuto',
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            unorderedList: true,
            orderedList: true,
            link: true,
            divider: true,
            image: { directory: 'public/images/content', publicPath: '/images/content/' },
          },
          components: {
            Banner,
            Carousel,
            Duo,
            Grid,
            Hero,
            Slider,
            WideImage,
            CtaButton,
            SliderSteps,
            ContactForm,
            CarouselRooms,
            FaqAccordion,
            Strip,
            InstaCarousel,
            Reviews,
            NotaBene,
            YouTube,
            GoogleMaps,
            Accordion,
            Align,
            BookingEngine,
            SliderBooking,
          },
        }),
        lang: fields.select({
          label: 'Lingua',
          options: [
            { label: 'it', value: 'it' },
            { label: 'fr', value: 'fr' },
            { label: 'en', value: 'en' },
          ],
          defaultValue: 'it',
        }),
        seoSlug: fields.text({ label: 'URL SEO definitiva' }),
        jsonType: fields.select({
          label: 'Tipo di JSON-LD',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Articolo di blog', value: 'blog' },
            { label: 'Faq', value: 'faq' },
            { label: 'Hotel Room', value: 'hotelRoom' },
          ],
          defaultValue: 'page',
        }),
        ogImage: fields.image({
          label: 'Immagina Open Graph',
          directory: 'public/images/content/',
          publicPath: '/images/content/',
          validation: { isRequired: false },
        }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: 'Featured Image',
            directory: 'public/images/content/',
            publicPath: '/images/content/',
            validation: { isRequired: false },
          }),
          alt: fields.text({
            label: 'Alt Text della Featured Image',
            validation: { isRequired: false },
          }),
        }),
      },
    }),
    'landing-pages': collection({
      label: 'Landing Pages',
      slugField: 'title',
      path: 'src/content/landing-pages/**',
      columns: ['lang', 'title', 'seoSlug'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Titolo', description: 'Titolo della landing page' },
          slug: { label: 'Path fisico sul server', description: 'Diverso dello slug SEO' },
        }),
        metaTitle: fields.text({ label: 'Meta Title' }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        content: fields.markdoc({
          label: 'Contenuto',
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            unorderedList: true,
            orderedList: true,
            link: true,
            divider: true,
            image: { directory: 'public/images/content', publicPath: '/images/content/' },
          },
          components: {
            Banner,
            Carousel,
            Duo,
            Grid,
            Hero,
            Slider,
            WideImage,
            CtaButton,
            SliderSteps,
            ContactForm,
            CarouselRooms,
            FaqAccordion,
            Strip,
            InstaCarousel,
            Reviews,
            NotaBene,
            YouTube,
            GoogleMaps,
            Accordion,
            Align,
            BookingEngine,
            SliderBooking,
          },
        }),
        lang: fields.select({
          label: 'Lingua',
          options: [
            { label: 'it', value: 'it' },
            { label: 'fr', value: 'fr' },
            { label: 'en', value: 'en' },
          ],
          defaultValue: 'it',
        }),
        seoSlug: fields.text({ label: 'URL SEO definitiva' }),
        jsonType: fields.select({
          label: 'Tipo di JSON-LD',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Articolo di blog', value: 'blog' },
            { label: 'Faq', value: 'faq' },
            { label: 'Hotel Room', value: 'hotelRoom' },
          ],
          defaultValue: 'page',
        }),
        ogImage: fields.image({
          label: 'Immagina Open Graph',
          directory: 'public/images/content/',
          publicPath: '/images/content/',
          validation: { isRequired: false },
        }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: 'Featured Image',
            directory: 'public/images/content/',
            publicPath: '/images/content/',
            validation: { isRequired: false },
          }),
          alt: fields.text({
            label: 'Alt Text della Featured Image',
            validation: { isRequired: false },
          }),
        }),
      },
    }),
    rooms: collection({
      label: 'Rooms',
      slugField: 'slug',
      path: 'src/content/rooms/**',
      format: { contentField: 'content' },
      columns: ['lang', 'nameDisplay', 'title', 'seoSlug'],
      schema: {
        title: fields.text({ label: 'Titolo della pagina', validation: { isRequired: true } }),
        seoSlug: fields.text({ label: 'Slug SEO', validation: { isRequired: false } }),
        metaTitle: fields.text({ label: 'Meta Title', validation: { isRequired: false } }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        slug: fields.slug({ name: { label: 'Slug tecnico della camera' } }),
        roomId: fields.text({
          label: 'RoomId sul booking engine',
          validation: { isRequired: true },
        }),
        jsonType: fields.select({
          label: 'Tipo di JSON-LD',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Articolo di blog', value: 'blog' },
            { label: 'Faq', value: 'faq' },
            { label: 'Hotel Room', value: 'hotelRoom' },
          ],
          defaultValue: 'hotelRoom',
        }),
        punchline: fields.text({
          label: 'Punchline del carousel',
          validation: { isRequired: false },
        }),
        lang: fields.select({
          label: 'Lingua',
          options: [
            { label: 'it', value: 'it' },
            { label: 'fr', value: 'fr' },
            { label: 'en', value: 'en' },
          ],
          defaultValue: 'it',
        }),
        nameDisplay: fields.text({ label: 'Nome allo schermo', validation: { isRequired: true } }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: 'Featured Image',
            directory: 'public/images/content/',
            publicPath: '/images/content/',
            validation: { isRequired: false },
          }),
          alt: fields.text({
            label: 'Alt Text della Featured Image',
            validation: { isRequired: false },
          }),
        }),
        photos: fields.array(
          fields.object({
            image: fields.image({
              label: 'Image',
              directory: 'public/images/rooms/gallery',
              publicPath: '/images/rooms/gallery/',
              validation: { isRequired: true },
            }),
            alt: fields.text({
              label: 'Texte alternatif (SEO)',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Galerie de photos',
            itemLabel: (props) => props.fields.alt.value || 'Photo sans titre',
            // Keystatic ne gère pas nativement le .max(6) dans l'UI via validation pour les tableaux,
            // mais tu peux l'indiquer dans l'étiquette pour l'utilisateur.
            description: 'Maximum 6 photos pour la galerie.',
          }
        ),
        amenity1: fields.text({ label: 'Amenity 1', validation: { isRequired: false } }),
        amenity2: fields.text({ label: 'Amenity 2', validation: { isRequired: false } }),
        amenity3: fields.text({ label: 'Amenity 3', validation: { isRequired: false } }),

        content: fields.markdoc({
          label: 'Content',
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            link: true,
            divider: true,
            image: { directory: 'public/images/content', publicPath: '/images/content/' },
          },
          components: { Duo },
        }),
      },
    }),
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/**',
      format: { contentField: 'content' },
      columns: ['lang', 'title', 'category'],
      schema: {
        title: fields.slug({
          name: { label: 'Titolo pagina' },
          slug: { label: 'SEO-friendly slug' },
        }),
        h1Title: fields.text({ label: 'Titolo H1 (fallback su Titolo pagina)' }),
        seoSlug: fields.text({ label: 'Slug SEO', validation: { isRequired: false } }),
        metaTitle: fields.text({ label: 'Meta Title', validation: { isRequired: false } }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        ogImage: fields.image({
          label: 'Immagina Open Graph',
          directory: 'public/images/content/',
          publicPath: '/images/content/',
          validation: { isRequired: false },
        }),
        jsonType: fields.select({
          label: 'Tipo di JSON-LD',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Articolo di blog', value: 'blog' },
            { label: 'Faq', value: 'faq' },
            { label: 'Hotel Room', value: 'hotelRoom' },
          ],
          defaultValue: 'blog',
        }),
        publishDate: fields.date({
          label: 'Date de publication',
          description: "La date à laquelle l'article sera affiché comme publié",
          defaultValue: { kind: 'today' }, // Optionnel : sélectionne la date du jour par défaut
        }),
        featured: fields.checkbox({ label: 'Articolo in vista', defaultValue: false }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: 'Featured Image',
            directory: 'public/images/content/',
            publicPath: '/images/content/',
            validation: { isRequired: false },
          }),
          alt: fields.text({
            label: 'Alt Text della Featured Image',
            validation: { isRequired: false },
          }),
        }),
        // Référence unique à une catégorie (optionnel)
        category: fields.relationship({
          label: 'Catégorie principale',
          collection: 'categories',
          validation: { isRequired: false },
        }),

        // Tags (références multiples)
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
          }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Tag sans nom',
          }
        ),
        excerpt: fields.text({ label: 'Riassunto', validation: { isRequired: false } }),

        content: fields.markdoc({
          label: 'Content',
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            link: true,
            divider: true,
            image: { directory: 'public/images/content', publicPath: '/images/content/' },
          },
          components: {
            Banner,
            Carousel,
            Duo,
            Grid,
            Hero,
            Slider,
            WideImage,
            CtaButton,
            SliderSteps,
            ContactForm,
            CarouselRooms,
            FaqAccordion,
            Strip,
            InstaCarousel,
            Reviews,
            NotaBene,
            YouTube,
            GoogleMaps,
            Accordion,
            Align,
            BookingEngine,
            SliderBooking,
          },
        }),
        lang: fields.select({
          label: 'Lang',
          options: [
            { label: 'it', value: 'it' },
            { label: 'fr', value: 'fr' },
            { label: 'en', value: 'en' },
          ],
          defaultValue: 'it',
        }),
      },
    }),
    accompagnements: collection({
      label: 'Accompagnements',
      slugField: 'title',
      path: 'src/content/accompagnements/**',
      columns: ['lang', 'title', 'type', 'categorie'],
      schema: {
        title: fields.slug({
          name: { label: 'Titre' },
          slug: { label: 'Slug technique' },
        }),
        categorie: fields.text({
          label: 'Catégorie',
          validation: { isRequired: true },
        }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Formation', value: 'formation' },
            { label: 'Coaching', value: 'coaching' },
            { label: 'Conseil', value: 'conseil' },
            { label: 'Mentorat', value: 'mentorat' },
          ],
          defaultValue: 'formation',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/accompagnements/',
          publicPath: '/images/accompagnements/',
          validation: { isRequired: true },
        }),
        lang: fields.select({
          label: 'Langue',
          options: [
            { label: 'Français', value: 'fr' },
            { label: 'Anglais', value: 'en' },
          ],
          defaultValue: 'fr',
        }),
      },
    }),
    faq: collection({
      label: 'FAQ',
      path: 'src/content/faq/**',
      format: { contentField: 'answer' },
      slugField: 'tag_slug',
      schema: {
        question: fields.text({ label: 'Domanda' }),
        answer: fields.markdoc({
          label: 'Answer',
          options: {
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            link: true,
            divider: true,
            image: { directory: 'public/images/content', publicPath: '/images/content/' },
          },
          components: { Duo },
        }),
        lang: fields.select({
          label: 'Lingua',
          options: [
            { label: 'IT', value: 'it' },
            { label: 'FR', value: 'fr' },
            { label: 'EN', value: 'en' },
          ],
          defaultValue: 'it',
        }),
        metaTitle: fields.text({ label: 'Meta Title', validation: { isRequired: false } }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        jsonType: fields.select({
          label: 'Tipo di JSON-LD',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Articolo di blog', value: 'blog' },
            { label: 'Faq', value: 'faq' },
            { label: 'Hotel Room', value: 'hotelRoom' },
          ],
          defaultValue: 'faq',
        }),
        category: fields.text({ label: 'Categoria', validation: { isRequired: false } }),
        order: fields.number({
          label: 'Numero di priorità (0=min)',
          validation: { isRequired: false },
        }),
        tag_slug: fields.slug({
          name: { label: 'ID della (nome interno)' },
          slug: { label: 'Slug keystatic' },
        }),
      },
    }),

    // ────────────────────────────────────────────────
    // 1. Catégories
    categories: collection({
      label: 'Catégories 🏷️',
      path: 'src/content/categories/*',
      format: { data: 'yaml' },
      columns: ['name_it', 'name_fr', 'name_en'],
      slugField: 'tag_slug',
      schema: {
        name_it: fields.text({ label: '🇮🇹 Nome (IT)' }),
        slug_it: fields.text({ label: '🇮🇹 Slug (IT)' }),
        description_it: fields.text({ label: '🇮🇹 Descrizione (IT)', multiline: true }),

        name_fr: fields.text({
          label: '🇫🇷 Nom (FR)',
          validation: { isRequired: true },
        }),

        slug_fr: fields.text({
          label: '🇫🇷 Slug (FR)',
          validation: { isRequired: true },
        }),
        description_fr: fields.text({ label: '🇫🇷 Description (FR)', multiline: true }),

        name_en: fields.text({
          label: '🇬🇧 Name (EN)',
          validation: { isRequired: true },
        }),

        slug_en: fields.text({
          label: '🇬🇧 Slug (EN)',
          validation: { isRequired: true },
        }),

        description_en: fields.text({ label: '🇬🇧 Description (EN)', multiline: true }),

        tag_slug: fields.slug({
          name: { label: 'ID del categoria (nome interno)' },
          slug: { label: 'Slug keystatic' },
        }),
      },
    }),

    // ────────────────────────────────────────────────
    // 2. Tags (étiquettes plus fines)
    tags: collection({
      label: 'Tags 🏷️',
      path: 'src/content/tags/*',
      format: { data: 'yaml' },
      columns: ['name_it', 'name_fr', 'name_en'],
      slugField: 'tag_slug',
      schema: {
        name_it: fields.text({ label: '🇮🇹 Nome (IT)' }),
        slug_it: fields.text({ label: '🇮🇹 Slug (IT)' }),
        description_it: fields.text({ label: '🇮🇹 Descrizione (IT)', multiline: true }),

        name_fr: fields.text({
          label: '🇫🇷 Nom (FR)',
          validation: { isRequired: true },
        }),

        slug_fr: fields.text({
          label: '🇫🇷 Slug (FR)',
          validation: { isRequired: true },
        }),
        description_fr: fields.text({ label: '🇫🇷 Description (FR)', multiline: true }),

        name_en: fields.text({
          label: '🇬🇧 Name (EN)',
          validation: { isRequired: true },
        }),

        slug_en: fields.text({
          label: '🇬🇧 Slug (EN)',
          validation: { isRequired: true },
        }),

        description_en: fields.text({ label: '🇬🇧 Description (EN)', multiline: true }),

        tag_slug: fields.slug({
          name: { label: 'ID del tag (nome interno)' },
          slug: { label: 'Slug keystatic' },
        }),
      },
    }),
  },
});
