import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    Slider: {
      render: component('./src/components/UI/Slider.astro'),
      attributes: {
        height: { type: String, default: 'calc(100vh - 7rem)' },
        mobileHeight: { type: String, default: 'calc(100vh - 80px)' },
        speed: { type: Number, default: 3000 },
        images: { type: Array, required: true },
        title: { type: String },
        titleTag: { type: String, default: 'h2', matches: ['h1', 'h2', 'h3', 'p', 'div'] },
        subtitle: { type: String },
        ctaText: { type: String },
        ctaLink: { type: String },
        framePosition: { type: String, default: 'left', matches: ['left', 'right'] },
        verticalGap: { type: String, default: '0' },
      },
    },
    Banner: {
      render: component('./src/components/UI/Banner.astro'),
      attributes: {
        title: { type: String },
        subtitle: { type: String },
        background: { type: String, default: 'white' },
        height: { type: String, default: '400px' },
        ctaText: { type: String },
        ctaLink: { type: String },
        fullBleed: { type: Boolean, default: false },
      },
    },
    Duo: {
      render: component('./src/components/UI/Duo.astro'),
      children: ['paragraph', 'list', 'strong', 'emphasis', 'link', 'inline'],
      attributes: {
        title: { type: String },
        ctaText: { type: String },
        ctaLink: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        imagePosition: { type: String, default: 'right', matches: ['left', 'right'] },
        background: { type: String, default: 'transparent' },
        fullBleed: { type: Boolean, default: false },
        height: { type: String },
        heightMatch: { type: Boolean, default: false },
        maxHeight: { type: String, default: '60vh' },
        noBorderPadding: { type: Boolean, default: false },
      },
    },
    SliderSteps: {
      render: component('./src/components/UI/SliderSteps.astro'),
      attributes: {
        id: { type: String, default: 'slider-1' },
        steps: {
          type: Array,
          required: true,
        },
      },
    },
    CtaButton: {
      render: component('./src/components/UI/CtaButton.astro'),
      attributes: {
        text: { type: String, required: true },
        link: { type: String, required: true },
        align: {
          type: String,
          default: 'center',
          matches: ['left', 'center', 'right'],
        },
        variant: {
          type: String,
          default: 'primary',
          matches: ['primary', 'secondary'],
        },
        target: {
          type: String,
          default: '_self',
          matches: ['_self', '_blank'],
        },
      },
    },
    Carousel: {
      render: component('./src/components/UI/Carousel.astro'),
      attributes: {
        images: { type: Array, required: true },
        height: { type: String, default: '30vh' },
        speed: { type: Number, default: 5000 },
        background: { type: String, default: 'transparent' },
        spacing: { type: String, default: '1rem' },
        title: { type: String },
      },
    },
    CarouselRooms: {
      render: component('./src/components/UI/CarouselRooms.astro'),
      attributes: {
        height: { type: String, default: '40vh' },
        speed: { type: Number, default: 40000 },
        background: { type: String, default: 'transparent' },
        spacing: { type: String, default: '1rem' },
        showName: { type: Boolean, default: true },
        showPunchline: { type: Boolean, default: true },
        lang: {
          type: String,
          default: 'it',
          matches: ['it', 'en', 'fr'],
        },
        excludeId: { type: String }, // Utile pour ne pas afficher la chambre actuelle sur sa propre page
        paddingVertical: { type: String, default: '4rem' },
      },
    },
    Hero: {
      render: component('./src/components/UI/Hero.astro'),
      attributes: {
        title: { type: String, default: 'Titolo Principale' },
        titleTag: { type: String, default: 'h2', matches: ['h1', 'h2', 'h3', 'p', 'div'] },
        subtitle: { type: String, default: 'Titolo Secondario' },
        ctaText: { type: String, default: 'CTA' },
        ctaLink: { type: String, default: '/faq/' },
        secondaryLinkText: { type: String },
        secondaryLinkUrl: { type: String },
        backgroundImage: { type: String, required: true },
        photoCredit: { type: String },
        backgroundPositionX: { type: String, default: 'bottom' },
        backgroundPositionY: { type: String, default: 'top' },
        backgroundPositionXMobile: { type: String },
        backgroundPositionYMobile: { type: String },
        body: { type: String },
        bgColor: { type: String, default: 'bg-indigo-900 dark:bg-indigo-400/10' },
      },
    },
    YouTube: {
      render: component('./src/components/UI/YouTube.astro'),
      attributes: {
        videoId: { type: String, required: true },
        title: { type: String },
        height: { type: String },
        padding: { type: String, default: '0' },
        text: { type: String },
        textPosition: {
          type: String,
          default: 'bottom',
          matches: ['top', 'bottom', 'left', 'right'],
        },
      },
    },
    Quadrifoglio: {
      render: component('./src/components/UI/Quadrifoglio.astro'),
      attributes: {
        images: { type: Array, required: true },
        height: { type: String, default: '400px' },
        padding: { type: String, default: '0' },
        text: { type: String },
        textPosition: {
          type: String,
          default: 'bottom',
          matches: ['top', 'bottom', 'left', 'right'],
        },
      },
    },
    Grid: {
      render: component('./src/components/UI/Grid.astro'),
      children: ['paragraph', 'list', 'strong', 'emphasis', 'link', 'inline'],
      attributes: {
        items: { type: Array },
        height: { type: String },
        textColor: { type: String, default: '' },
        hideIcons: { type: Boolean, default: false },
        fullBleed: { type: Boolean, default: false },
        background: { type: String, default: 'var(--color-brand-darker)' },
        minWidth: { type: String, default: '0' },
        mobileCols: { type: Number },
        tabletCols: { type: Number },
        xlCols: { type: Number },
        isIcon: { type: Boolean },
      },
    },
    Reviews: {
      render: component('./src/components/UI/Reviews.astro'),
      attributes: {
        reviews: { type: Array },
        columns: { type: Number, default: 3 },
        lang: { type: String, default: 'it', matches: ['it', 'en', 'fr'] },
      },
    },
    InstaCarousel: {
      render: component('./src/components/UI/InstaCarousel.astro'),
      attributes: {
        feedId: { type: String, required: true }, // Ton ID Behold
        username: { type: String, default: 'limolohouse' },
      },
    },
    Strip: {
      render: component('./src/components/UI/Strip.astro'),
      attributes: {
        images: {
          type: Array,
          required: true,
          // Note: Markdoc valide les objets dans les tableaux via leur structure
        },
        background: { type: String, default: 'transparent' },
        padding: { type: String, default: '2rem' },
      },
    },
    Align: {
      render: component('./src/components/UI/Align.astro'),
      children: ['paragraph', 'list', 'strong', 'emphasis', 'link', 'inline'],
      attributes: {
        value: {
          type: String,
          default: 'left',
          matches: ['left', 'center', 'right'],
        },
      },
    },
    Table: {
      render: component('./src/components/UI/Table.astro'),
      children: ['paragraph', 'list', 'strong', 'emphasis', 'link', 'inline'],
      attributes: {
        columns: { type: Array, required: true },
        rows: { type: Array },
      },
    },
    WideImage: {
      render: component('./src/components/UI/WideImage.astro'),
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        caption: { type: String },
        height: { type: String, default: '400px' },
        fullBleed: { type: Boolean, default: false },
        fullWidth: { type: Boolean, default: false },
        photoCredit: { type: String },
      },
    },
    Blog: {
      render: component('./src/components/Blog.astro'),
      attributes: {
        lang: { type: String, default: 'it', matches: ['it', 'en', 'fr'] },
        fullBleed: { type: Boolean, default: false },
      },
    },
    Accordion: {
      render: component('./src/components/UI/Accordion.astro'),
      attributes: {
        items: { type: Array, required: true },
        allowMultiple: { type: Boolean, default: true },
      },
    },
    FaqAccordion: {
      render: component('./src/components/UI/FaqAccordion.astro'),
      attributes: {
        lang: { type: String, default: 'it', matches: ['it', 'en', 'fr'] },
        category: { type: String },
        allowMultiple: { type: Boolean, default: true },
      },
    },
    ContactForm: {
      render: component('./src/components/UI/ContactForm.astro'),
      children: ['paragraph', 'heading', 'list', 'strong', 'emphasis', 'link', 'inline'],
      attributes: {
        formId: { type: String, required: true },
        formPosition: {
          type: String,
          default: 'right',
          matches: ['left', 'right'],
        },
        buttonText: { type: String, default: 'Invia messaggio' },
      },
    },
    GoogleMaps: {
      render: component('./src/components/UI/GoogleMaps.astro'),
      attributes: {
        embedUrl: { type: String, required: true },
        title: { type: String },
        height: { type: String, default: '400px' },
      },
    },
    BookingEngine: {
      render: component('./src/components/UI/BookingEngine.astro'),
      attributes: {
        lang: { type: String, default: 'it', matches: ['it', 'fr', 'en'] },
      },
    },
    SliderBooking: {
      render: component('./src/components/UI/SliderBooking.astro'),
      attributes: {
        height: { type: String, default: 'calc(100vh - 7rem)' },
        mobileHeight: { type: String, default: 'calc(100vh - 80px)' },
        speed: { type: Number, default: 3000 },
        images: { type: Array, required: true },
        title: { type: String },
        titleTag: { type: String, default: 'h2', matches: ['h1', 'h2', 'h3', 'p', 'div'] },
        subtitle: { type: String },
        framePosition: { type: String, default: 'left', matches: ['left', 'right'] },
        verticalGap: { type: String, default: '0' },
        lang: { type: String, default: 'it', matches: ['it', 'fr', 'en'] },
      },
    },
    NotaBene: {
      render: component('./src/components/UI/NotaBene.astro'),
      attributes: {
        content: { type: String, required: true },
        title: { type: String },
        type: { type: String, default: 'info', matches: ['info', 'warning', 'important'] },
      },
    },
    Container: {
      render: component('./src/components/UI/Container.astro'),
      children: ['paragraph', 'heading', 'list', 'strong', 'emphasis', 'link', 'inline'],
    },
    Link: {
      render: component('./src/components/UI/Link.astro'),
      children: ['text'],
      attributes: {
        href: { type: String, required: true },
        external: { type: Boolean, default: false },
        underline: { type: Boolean, default: true },
        class: { type: String },
      },
    },
  },
});
