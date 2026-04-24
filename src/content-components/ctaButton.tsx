// src/content-components/CtaButton.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import type { ReactNode } from 'react';

export const CtaButton = block({
  label: 'Bouton CTA',

  schema: {
    text: fields.text({
      label: 'Texte du bouton',
      validation: { isRequired: true },
      defaultValue: 'Découvrir',
    }),

    link: fields.text({
      label: 'Lien / URL',
      validation: { isRequired: true },
      defaultValue: '/contact',
    }),

    align: fields.select({
      label: 'Alignement',
      options: [
        { label: 'Gauche', value: 'left' },
        { label: 'Centre', value: 'center' },
        { label: 'Droite', value: 'right' },
      ],
      defaultValue: 'center',
    }),

    variant: fields.select({
      label: 'Style du bouton',
      options: [
        { label: 'Primaire (plein - vert Limolo)', value: 'primary' },
        { label: 'Secondaire (contour - épuré)', value: 'secondary' },
      ],
      defaultValue: 'primary',
    }),

    target: fields.select({
      label: 'Ouverture du lien',
      options: [
        { label: 'Même onglet (_self)', value: '_self' },
        { label: 'Nouvel onglet (_blank)', value: '_blank' },
      ],
      defaultValue: '_self',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const alignmentMap: Record<string, string> = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };

    const alignValue = alignmentMap[value?.align || 'center'];

    const variantStyles = {
      primary: {
        background: '#2e7d32', // var(--color-brand-primary) – adapte à ta couleur réelle
        color: 'white!important',
        border: '1px solid #2e7d32',
        hoverBg: '#388e3c',
      },
      secondary: {
        background: 'transparent',
        color: '#2e7d32',
        border: '1px solid #2e7d32',
        hoverBg: '#2e7d32',
        hoverColor: 'white',
      },
    };

    const style = variantStyles[value?.variant || 'primary'];

    return (
      <div
        style={{
          margin: '2rem 0',
          padding: '16px',
          background: '#f8f9fa',
          border: '1px dashed #aaa',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: alignValue,
        }}
      >
        <a
          href={value?.link || '#'}
          target={value?.target || '_self'}
          rel={value?.target === '_blank' ? 'noopener noreferrer' : undefined}
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textDecoration: 'none',
            borderRadius: '2px',
            background: style.background,
            color: style.color,
            border: style.border,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            width: 'auto',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = style.hoverBg;
            if (style.hoverColor) e.currentTarget.style.color = style.hoverColor;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = style.background;
            if (style.hoverColor) e.currentTarget.style.color = style.color;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {value?.text || 'CTA Manquant'}
        </a>
      </div>
    );
  },
});
