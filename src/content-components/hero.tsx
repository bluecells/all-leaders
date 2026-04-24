// src/content-components/Hero.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState, type ReactNode } from 'react';

export const Hero = block({
  label: 'Hero Component',

  schema: {
    title: fields.text({
      label: 'Title',
      defaultValue: 'Titolo Principale',
    }),

    subtitle: fields.text({
      label: 'Subtitle',
      defaultValue: 'Titolo Secondario',
    }),

    ctaText: fields.text({
      label: 'CTA Text',
      defaultValue: 'CTA',
    }),

    ctaLink: fields.text({
      label: 'CTA Link',
      defaultValue: '/faq-it-limolo/',
    }),

    secondaryLinkText: fields.text({
      label: 'Secondary Link Text',
    }),

    secondaryLinkUrl: fields.text({
      label: 'Secondary Link URL',
    }),

    backgroundImage: fields.image({
      label: 'Background Image',
      directory: 'public/images/hero',
      publicPath: '/images/hero/',
    }),

    photoCredit: fields.text({
      label: 'Photo Credit',
    }),

    backgroundPositionX: fields.text({
      label: 'Background Position X',
      defaultValue: 'bottom',
    }),

    minWidth: fields.text({
      label: 'Min Width',
      defaultValue: '300px',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const [bgSrc, setBgSrc] = useState<string | null>(null);

    useEffect(() => {
      if (!value?.backgroundImage?.data) {
        setBgSrc(null);
        return;
      }

      const blob = new Blob([value.backgroundImage.data], {
        type: `image/${value.backgroundImage.extension.replace(/^\./, '')}`,
      });

      const url = URL.createObjectURL(blob);
      setBgSrc(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }, [value?.backgroundImage]);

    return (
      <div
        style={{
          position: 'relative',
          minHeight: '300px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px dashed #999',
          background: bgSrc
            ? `url(${bgSrc}) ${value.backgroundPositionX || 'center'} center / cover no-repeat`
            : '#f0f4f8',
        }}
      >
        {/* Overlay semi-transparent pour lisibilité texte */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h2 style={{ fontSize: '2rem', margin: '0 0 12px', fontWeight: 'bold' }}>
            {value.title || 'Hero Title'}
          </h2>

          {value.subtitle && (
            <p style={{ fontSize: '1.25rem', margin: '0 0 24px', opacity: 0.9 }}>
              {value.subtitle}
            </p>
          )}

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {value.ctaText && (
              <div
                style={{
                  padding: '12px 24px',
                  background: '#007bff',
                  color: 'white',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                }}
              >
                {value.ctaText} →
              </div>
            )}

            {value.secondaryLinkText && (
              <div
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '6px',
                  border: '1px solid white',
                }}
              >
                {value.secondaryLinkText}
              </div>
            )}
          </div>
        </div>

        {/* Crédit photo en bas à droite */}
        {value.photoCredit && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(0,0,0,0.5)',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            Photo : {value.photoCredit}
          </div>
        )}

        {/* Infos techniques en bas */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          Min width: {value.minWidth || '300px'}
        </div>
      </div>
    );
  },
});
