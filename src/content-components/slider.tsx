// src/content-components/Slider.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState, type ReactNode } from 'react';

export const Slider = block({
  label: 'Slider',

  schema: {
    height: fields.text({
      label: 'Altezza',
      defaultValue: 'calc(100vh - 7rem)',
    }),

    mobileHeight: fields.text({
      label: 'Altezza',
      defaultValue: 'calc(100vh - 80px)',
    }),

    speed: fields.number({
      label: 'Speed (ms)',
      defaultValue: 3000,
    }),

    images: fields.array(
      fields.object({
        image: fields.image({
          label: 'Immagina Slider',
          directory: 'public/images/slider',
          publicPath: '/images/slider/',
        }),
        alt: fields.text({
          label: 'Alt Text',
        }),
      }),
      {
        label: 'Immagine Slider',
        itemLabel: (props) => props.fields.alt.value || 'Immagina Image',
      }
    ),

    title: fields.text({
      label: 'Titolo',
    }),

    titleTag: fields.select({
      label: 'Livello di titolo',
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'paragraph', value: 'p' },
        { label: 'DIV', value: 'div' },
      ],
      defaultValue: 'h2',
    }),

    subtitle: fields.text({
      label: 'Sottotitolo',
    }),

    ctaText: fields.text({
      label: 'Testo CTA',
    }),

    ctaLink: fields.text({
      label: 'Link CTA',
    }),

    framePosition: fields.select({
      label: 'Posizione del quadro',
      options: [
        { label: 'Sinistra', value: 'left' },
        { label: 'Destra', value: 'right' },
      ],
      defaultValue: 'left',
    }),

    verticalGap: fields.text({
      label: 'Gap verticale tra elementi (es: 1rem, 20px)',
      defaultValue: '0',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
      if (!value?.images?.length) {
        setPreviewImages([]);
        return;
      }

      const urls: string[] = [];

      value.images.forEach((item: any) => {
        if (item?.image?.data) {
          const blob = new Blob([item.image.data], {
            type: `image/${item.image.extension.replace(/^\./, '')}`,
          });
          const url = URL.createObjectURL(blob);
          urls.push(url);
        }
      });

      setPreviewImages(urls);

      // Cleanup des URLs temporaires
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [value?.images]);

    const imageCount = value?.images?.length || 0;

    return (
      <div
        style={{
          padding: '16px',
          background: '#f8f9fa',
          border: '1px dashed #999',
          borderRadius: '8px',
          minHeight: '300px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Simulation d'un slider avec overlay texte à gauche ou droite */}
        <div
          style={{
            position: 'relative',
            height: value.height || 'calc(100vh - 7rem)',
            maxHeight: '400px',
            background: '#eee',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {previewImages.length > 0 ? (
            <div
              style={{
                display: 'flex',
                height: '100%',
                transition: 'transform 0.5s ease',
                // Simulation simple d'un seul slide visible
              }}
            >
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={value.images[index]?.alt || `Slide ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-error.png';
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ddd',
                color: '#666',
                fontSize: '1.1rem',
              }}
            >
              <em>Ajoutez des images au slider</em>
            </div>
          )}

          {/* Overlay texte / CTA – position selon framePosition */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              [value.framePosition === 'left' ? 'left' : 'right']: '10%',
              transform: 'translateY(-50%)',
              maxWidth: '45%',
              color: 'white',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              padding: '20px',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '8px',
            }}
          >
            {value.title && (
              <h2 style={{ fontSize: '2.2rem', margin: '0 0 12px' }}>{value.title}</h2>
            )}

            {value.subtitle && (
              <p style={{ fontSize: '1.3rem', margin: '0 0 20px' }}>{value.subtitle}</p>
            )}

            {value.ctaText && (
              <div
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  background: '#007bff',
                  color: 'white',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                {value.ctaText} →
              </div>
            )}
          </div>
        </div>

        {/* Infos techniques */}
        <div
          style={{
            marginTop: '12px',
            fontSize: '0.9rem',
            color: '#555',
            textAlign: 'center',
          }}
        >
          {imageCount} immagin{imageCount !== 1 ? 'e' : 'a'} • Speed: {value.speed || 3000} ms
          {value.verticalGap && ` • Gap: ${value.verticalGap}`}
        </div>
      </div>
    );
  },
});
