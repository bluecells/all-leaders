import { config, fields, collection, singleton } from '@keystatic/core';
import {
  Banner,
  Carousel,
  Duo,
  Hero,
  WideImage,
  CtaButton,
  Strip,
  NotaBene,
  YouTube,
  Accordion,
  Quadrifoglio,
  PdfViewer,
  Table,
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
      project: 'blue-cells-editors/ali',
    },
  }),

  singletons: {
    menuFR: singleton({
      label: 'Menu 🇫🇷',
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
              { label: 'Sous-menu', itemLabel: (props: any) => props.fields.label.value || 'Sous-menu' }
            ),
          }),
          { label: 'Liens du menu', itemLabel: (props: any) => props.fields.label.value || 'Lien' }
        ),
      },
    }),
    menuEN: singleton({
      label: 'Menu 🇬🇧',
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
              { label: 'Submenu', itemLabel: (props: any) => props.fields.label.value || 'Submenu' }
            ),
          }),
          { label: 'Menu links', itemLabel: (props: any) => props.fields.label.value || 'Link' }
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
            from: fields.text({ label: 'From (ancien chemin)' }),
            to: fields.text({ label: 'To (nouveau chemin)' }),
            status: fields.select({
              label: 'Code de redirection',
              options: [
                { label: '301 (Permanent)', value: '301' },
                { label: '302 (Temporaire)', value: '302' },
              ],
              defaultValue: '301',
            }),
            note: fields.text({ label: 'Note (optionnelle)', validation: { isRequired: false } }),
          }),
          {
            label: 'Redirects',
            itemLabel: (props: any) => `${props.fields.from.value} → ${props.fields.to.value}`,
          }
        ),
      },
    }),
  },
  // Note: Pages sont gérées via fichiers .astro statiques, pas Keystatic
  collections: {
    'landing-pages': collection({
      label: 'Landing Pages',
      slugField: 'title',
      path: 'src/content/landing-pages/**',
      columns: ['lang', 'title', 'seoSlug'],
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Titre', description: 'Titre de la landing page' },
          slug: { label: 'Path physique sur le server', description: 'Différent du slug SEO' },
        }),
        h1Title: fields.text({
          label: 'Titre principal (H1)',
          description: 'Si vide, le titre de la page est utilisé',
        }),
        metaTitle: fields.text({ label: 'Meta Title' }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        content: fields.markdoc({
          label: 'Contenu',
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
            Hero,
            WideImage,
            CtaButton,
            Strip,
            NotaBene,
            YouTube,
            Accordion,
            Quadrifoglio,
            PdfViewer,
            Table,
          },
        }),
        lang: fields.select({
          label: 'Langue',
          options: [
            { label: 'Français', value: 'fr' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'fr',
        }),
        seoSlug: fields.text({ label: 'URL SEO finale' }),
        jsonType: fields.select({
          label: 'Type de JSON-LD',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Article de blog', value: 'blog' },
            { label: 'Faq', value: 'faq' },
            { label: 'Accompagnement', value: 'accompagnements' },
          ],
          defaultValue: 'page',
        }),
        ogImage: fields.image({
          label: 'Image Open Graph',
          directory: 'public/images/content/',
          publicPath: '/images/content/',
          validation: { isRequired: false },
        }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: 'Image mise en avant',
            directory: 'public/images/content/',
            publicPath: '/images/content/',
            validation: { isRequired: false },
          }),
          alt: fields.text({
            label: "Alt Text de l'image",
            validation: { isRequired: false },
          }),
        }),
      },
    }),
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/**',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['title', 'lang', 'category'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Titre de la page',
            description: "Le nom de l'onglet du navigateur",
          },
          slug: {
            label: 'Slug interne',
            description: '(ne pas modifier)',
          },
        }),
        h1Title: fields.text({
          label: 'Titre principal (H1)',
          description: 'Si vide, le titre de la page est utilisé',
        }),
        seoSlug: fields.text({
          label: 'Slug public',
          validation: { isRequired: false },
          description: "Le slug (fin de l'adresse) visible. Doit être SEO-friendly.",
        }),
        metaTitle: fields.text({
          label: 'Meta Title',
          validation: { isRequired: false },
          description: "60 caractères max pour l'affichage optimal dans Google",
        }),
        metaDescription: fields.text({
          label: 'Meta Description',
          multiline: true,
          description: "120-160 caractères recommandé pour l'affichage optimal dans Google",
          validation: { isRequired: false },
        }),
        ogImage: fields.image({
          label: 'Image Open Graph',
          description: "L'image affichée sur Facebook, Whatsapp, X...",
          directory: 'public/images/content/',
          publicPath: '/images/content/',
          validation: { isRequired: false },
        }),
        jsonType: fields.select({
          label: 'Type de JSON-LD',
          description: 'Type de données structurées utilisées par JSON-LD',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Article de blog', value: 'blog' },
            { label: 'Faq', value: 'faq' },
            { label: 'Accompagnement', value: 'accompagnements' },
          ],
          defaultValue: 'blog',
          // @ts-expect-error - width is supported by Keystatic at runtime
          width: '600px',
        }),
        publishDate: fields.date({
          label: 'Date de publication',
          description: "La date à laquelle l'article sera affiché comme publié",
          defaultValue: { kind: 'today' }, // Optionnel : sélectionne la date du jour par défaut
        }),
        featured: fields.checkbox({ label: 'Article en vue', defaultValue: false }),
        featuredPhoto: fields.object({
          image: fields.image({
            label: 'Image mise en avant',
            directory: 'public/images/content/',
            publicPath: '/images/content/',
            validation: { isRequired: false },
          }),
          alt: fields.text({
            label: "Alt Text de l'image",
            validation: { isRequired: false },
          }),
        }),
        // Référence unique à une catégorie (optionnel)
        category: fields.relationship({
          label: 'Catégorie',
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
            itemLabel: (props: any) => props.value || 'Tag sans nom',
          }
        ),
        excerpt: fields.text({ label: 'Résumé', validation: { isRequired: false } }),

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
            Hero,
            WideImage,
            CtaButton,
            Strip,
            NotaBene,
            YouTube,
            Accordion,
            Quadrifoglio,
            PdfViewer,
            Table,
          },
        }),
        lang: fields.select({
          label: 'Langue',
          options: [
            { label: 'Français', value: 'fr' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'fr',
        }),
      },
    }),
    accompagnements: collection({
      label: 'Accompagnements',
      slugField: 'title',
      path: 'src/content/accompagnements/**',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['lang', 'type', 'category'],
      schema: {
        title: fields.slug({
          name: { label: 'Titre' },
          slug: { label: 'Slug interne' },
        }),
        slug: fields.text({
          label: 'Slug SEO public',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Catégorie',
          options: [
            {
              label: "Coaching d'équipes et d'organisations",
              value: "Coaching d'équipes et d'organisations",
            },
            { label: 'Diagnostic de la performance', value: 'Diagnostic de la performance' },
            { label: 'Executive coaching', value: 'Executive coaching' },
            { label: 'Gestion de la conflictualité', value: 'Gestion de la conflictualité' },
            { label: 'Leadership development', value: 'Leadership development' },
            {
              label: 'Santé mentale et performance durable',
              value: 'Santé mentale et performance durable',
            },
          ],
          defaultValue: 'Executive coaching',
          // @ts-expect-error - validation is supported by Keystatic at runtime
          validation: { isRequired: true },
        }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Action', value: 'action' },
            { label: 'Investigation', value: 'investigation' },
            { label: 'Inspiration', value: 'inspiration' },
            { label: 'Immersion', value: 'immersion' },
          ],
          defaultValue: 'action',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        content: fields.markdoc({
          label: 'Corps',
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
            Hero,
            WideImage,
            CtaButton,
            Strip,
            NotaBene,
            YouTube,
            Accordion,
            Quadrifoglio,
            PdfViewer,
            Table,
          },
          // @ts-expect-error - validation is supported by Keystatic at runtime
          validation: { isRequired: false },
        }),
        metaTitle: fields.text({
          label: 'Meta Title',
          validation: { isRequired: false },
        }),
        metaDescription: fields.text({
          label: 'Meta Description',
          multiline: true,
          description: "122-155 caractères recommandé pour l'affichage optimal dans Google",
          validation: { isRequired: false },
        }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/services/',
          publicPath: '/images/services/',
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
        USP1: fields.text({
          label: 'USP 1',
          validation: { isRequired: false },
        }),
        USP2: fields.text({
          label: 'USP 2',
          validation: { isRequired: false },
        }),
        USP3: fields.text({
          label: 'USP 3',
          validation: { isRequired: false },
        }),
        USP4: fields.text({
          label: 'USP 4',
          validation: { isRequired: false },
        }),
        USP5: fields.text({
          label: 'USP 5',
          validation: { isRequired: false },
        }),
      },
    }),
    faq: collection({
      label: 'FAQ',
      path: 'src/content/faq/**',
      format: { contentField: 'answer' },
      columns: ['question', 'category'],
      slugField: 'seoSlug',
      schema: {
        seoSlug: fields.text({
          label: 'Slug SEO',
          validation: { isRequired: true },
        }),
        question: fields.text({ label: 'Question' }),
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
          components: { Duo, YouTube },
        }),
        lang: fields.select({
          label: 'Langue',
          options: [
            { label: 'Français', value: 'fr' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'fr',
        }),
        metaTitle: fields.text({ label: 'Meta Title', validation: { isRequired: false } }),
        metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
        jsonType: fields.select({
          label: 'Type de JSON-LD',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Article de blog', value: 'blog' },
            { label: 'Faq', value: 'faq' },
            { label: 'Accompagnement', value: 'accompagnements' },
          ],
          defaultValue: 'faq',
        }),
        category: fields.relationship({
          label: 'Catégorie',
          collection: 'categories',
          validation: { isRequired: false },
        }),
        order: fields.number({
          label: 'Niveau de priorité (0=min)',
          validation: { isRequired: false },
        }),
      },
    }),

    // ────────────────────────────────────────────────
    // 0. Catégories Services
    'accompagnements-categories': collection({
      label: "🏷️ Catégories d'accompagnements ",
      path: 'src/content/accompagnements-categories/*',
      format: { data: 'yaml' },
      columns: ['name_fr', 'name_en'],
      slugField: 'slug_fr',
      schema: {
        name_fr: fields.text({
          label: 'Nom 🇫🇷',
          validation: { isRequired: true },
        }),
        slug_fr: fields.text({
          label: 'Slug 🇫🇷',
          validation: { isRequired: true },
        }),
        description_fr: fields.text({
          label: 'Description 🇫🇷',
          multiline: true,
          validation: { isRequired: true },
        }),

        name_en: fields.text({
          label: 'Nom 🇬🇧',
          validation: { isRequired: true },
        }),
        slug_en: fields.text({
          label: 'Slug 🇬🇧',
          validation: { isRequired: true },
        }),
        description_en: fields.text({
          label: 'Description 🇬🇧',
          multiline: true,
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          validation: { isRequired: false },
        }),
      },
    }),

    // ────────────────────────────────────────────────
    // 1. Catégories (Articles)
    categories: collection({
      label: '🏷️ Catégories articles & faq',
      path: 'src/content/categories/*',
      format: { data: 'yaml' },
      columns: ['name_fr'],
      slugField: 'cat_id',
      schema: {
        cat_id: fields.text({
          label: 'ID interne',
          validation: { isRequired: true },
        }),

        name_fr: fields.text({
          label: 'Nom affiché 🇫🇷',
          validation: { isRequired: true },
        }),

        slug_fr: fields.text({
          label: 'Slug 🇫🇷',
          validation: { isRequired: true },
        }),
        description_fr: fields.text({ label: 'Description 🇫🇷', multiline: true }),

        name_en: fields.text({
          label: 'Nom affiché 🇬🇧',
          validation: { isRequired: true },
        }),

        slug_en: fields.text({
          label: 'Slug 🇬🇧',
          validation: { isRequired: true },
        }),

        description_en: fields.text({ label: 'Description 🇬🇧', multiline: true }),
      },
    }),

    // ────────────────────────────────────────────────
    // 2. Tags (étiquettes plus fines)
    tags: collection({
      label: '🏷️ Tags ',
      path: 'src/content/tags/*',
      format: { data: 'yaml' },
      columns: ['name_fr'],
      slugField: 'cat_id',
      schema: {
        cat_id: fields.text({
          label: 'ID du tag (nom interne)',
          validation: { isRequired: true },
        }),

        name_fr: fields.text({
          label: 'Nom 🇫🇷',
          validation: { isRequired: true },
        }),

        slug_fr: fields.text({
          label: 'Slug 🇫🇷',
          validation: { isRequired: true },
        }),
        description_fr: fields.text({ label: 'Description 🇫🇷', multiline: true }),

        name_en: fields.text({
          label: 'Name 🇬🇧',
          validation: { isRequired: true },
        }),

        slug_en: fields.text({
          label: 'Slug 🇬🇧',
          validation: { isRequired: true },
        }),

        description_en: fields.text({ label: 'Description 🇬🇧', multiline: true }),
      },
    }),
  },
});
