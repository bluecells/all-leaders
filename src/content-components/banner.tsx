// src/content-components/Banner.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import type { ReactNode } from 'react';

export const Banner = block({
  label: 'Banner',

  schema: {
    title: fields.text({
      label: 'Titolo',
      validation: { isRequired: true },
    }),

    subtitle: fields.text({
      label: 'Sottotitolo',
    }),

    background: fields.text({
      label: 'Sfondo',
      defaultValue: 'white',
    }),

    height: fields.text({
      label: 'Altezza',
      defaultValue: '400px',
    }),

    ctaText: fields.text({
      label: 'Testo CTA',
      defaultValue: 'CTA',
    }),
    ctaLink: fields.text({
      label: 'Link CTA',
      defaultValue: '#',
    }),

    fullBleed: fields.checkbox({
      label: 'Piena larghezza',
      defaultValue: false,
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    // Pour le moment on garde une preview très simple comme dans ton code
    // On pourra l'améliorer plus tard si besoin (ex: simuler un vrai banner)

    return (
      <div
        style={{
          padding: '16px',
          background: value.background || '#eee',
          border: '1px dashed #aaa',
          borderRadius: '8px',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          Banner: {value.title || '(manca il titolo)'}
        </div>

        {value.subtitle && <div style={{ marginTop: '8px', opacity: 0.8 }}>{value.subtitle}</div>}

        <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#666' }}>
          Altezza : {value.height || '400px'} • Full bleed : {value.fullBleed ? 'Sì' : 'No'}
        </div>
      </div>
    );
  },
});
