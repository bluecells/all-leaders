// src/content-components/WideImage.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export const WideImage = block({
  label: 'Wide Image / Full Image',

  schema: {
    src: fields.image({
      label: 'Image',
      directory: 'public/images/content',
      publicPath: '/images/content/',
      validation: { isRequired: true },
    }),

    alt: fields.text({
      label: 'Texte alternatif (SEO / accessibilité)',
      validation: { isRequired: true },
    }),

    height: fields.text({
      label: 'Hauteur fixe',
      description: 'Exemple : 400px, 60vh, auto… Laissez vide pour hauteur naturelle',
      defaultValue: '400px',
    }),

    fullBleed: fields.checkbox({
      label: 'Full Bleed (débordement total largeur)',
      defaultValue: false,
    }),

    fullWidth: fields.checkbox({
      label: 'Full Width (étiré à 100% de la zone contenu)',
      defaultValue: false,
    }),

    photoCredit: fields.text({
      label: 'Crédit photo / légende',
      multiline: false,
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
      if (!value?.src?.data) {
        setImageSrc(null);
        return;
      }

      const blob = new Blob([value.src.data], {
        type: `image/${value.src.extension.replace(/^\./, '')}`,
      });

      const url = URL.createObjectURL(blob);
      setImageSrc(url);

      return () => URL.revokeObjectURL(url);
    }, [value?.src]);

    return (
      <div
        style={{
          margin: '16px 0',
          border: '1px dashed #999',
          borderRadius: '6px',
          overflow: 'hidden',
          background: '#f8f9fa',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: value.height || 'auto',
            minHeight: '200px',
            background: imageSrc ? `url(${imageSrc}) center/cover no-repeat` : '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!imageSrc && (
            <div style={{ color: '#777', fontStyle: 'italic' }}>
              Image Wide – en attente d'upload
            </div>
          )}

          {value.photoCredit && (
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '12px',
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
              }}
            >
              {value.photoCredit}
            </div>
          )}
        </div>

        <div
          style={{
            padding: '8px 12px',
            fontSize: '0.9rem',
            color: '#555',
            background: '#fff',
            borderTop: '1px solid #eee',
          }}
        >
          <strong>WideImage</strong> — Alt: {value.alt || '(manquant)'}
          <br />
          Height: {value.height || 'auto'} • FullBleed: {value.fullBleed ? 'Oui' : 'Non'} •
          FullWidth: {value.fullWidth ? 'Oui' : 'Non'}
        </div>
      </div>
    );
  },
});
