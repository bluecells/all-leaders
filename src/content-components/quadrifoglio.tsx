// src/content-components/Quadrifolgio.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState } from 'react';

export const Quadrifoglio = block({
  label: 'Quadrifolgio',
  schema: {
    image1: fields.image({
      label: 'Image 1',
      directory: 'public/images/content',
      publicPath: '/images/content/',
      validation: { isRequired: true },
    }),
    alt1: fields.text({
      label: 'Alt image 1',
      defaultValue: 'Image 1',
    }),
    image2: fields.image({
      label: 'Image 2',
      directory: 'public/images/content',
      publicPath: '/images/content/',
      validation: { isRequired: true },
    }),
    alt2: fields.text({
      label: 'Alt image 2',
      defaultValue: 'Image 2',
    }),
    image3: fields.image({
      label: 'Image 3',
      directory: 'public/images/content',
      publicPath: '/images/content/',
      validation: { isRequired: true },
    }),
    alt3: fields.text({
      label: 'Alt image 3',
      defaultValue: 'Image 3',
    }),
    image4: fields.image({
      label: 'Image 4',
      directory: 'public/images/content',
      publicPath: '/images/content/',
      validation: { isRequired: true },
    }),
    alt4: fields.text({
      label: 'Alt image 4',
      defaultValue: 'Image 4',
    }),
    height: fields.text({
      label: 'Hauteur',
      defaultValue: '400px',
    }),
    text: fields.text({
      label: 'Texte (optionnel)',
      multiline: true,
    }),
    textPosition: fields.select({
      label: 'Position du texte',
      options: [
        { label: 'Haut', value: 'top' },
        { label: 'Bas', value: 'bottom' },
        { label: 'Gauche', value: 'left' },
        { label: 'Droite', value: 'right' },
      ],
      defaultValue: 'bottom',
    }),
  },
  ContentView: ({ value }: { value: any }) => {
    const [imageSrcs, setImageSrcs] = useState<(string | null)[]>([null, null, null, null]);

    useEffect(() => {
      const images = [value?.image1, value?.image2, value?.image3, value?.image4];
      const newSrcs: (string | null)[] = [];

      images.forEach((img, index) => {
        if (img?.data) {
          const blob = new Blob([img.data], {
            type: `image/${img.extension.replace(/^\./, '')}`,
          });
          const url = URL.createObjectURL(blob);
          newSrcs[index] = url;
        } else {
          newSrcs[index] = null;
        }
      });

      setImageSrcs(newSrcs);

      return () => {
        newSrcs.forEach((url) => {
          if (url) URL.revokeObjectURL(url);
        });
      };
    }, [value?.image1, value?.image2, value?.image3, value?.image4]);

    return (
      <div
        style={{
          border: '2px solid #4a6741',
          padding: '1rem',
          borderRadius: '8px',
          background: '#f9fef4',
          margin: '1rem 0',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            color: '#4a6741',
            textAlign: 'center',
          }}
        >
          Quadrifolgio (4 images)
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            marginBottom: value.text ? '1rem' : '0',
          }}
        >
          {imageSrcs.map((src, index) => (
            <div
              key={index}
              style={{
                aspectRatio: '1',
                background: src ? 'transparent' : '#f0f0f0',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span style={{ color: '#999', fontSize: '0.85rem' }}>Image {index + 1}</span>
              )}
            </div>
          ))}
        </div>

        {value.text && (
          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              background: '#fff',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '0.9rem',
            }}
          >
            <strong>Texte ({value.textPosition}):</strong> {value.text}
          </div>
        )}

        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#888' }}>
          Hauteur : {value.height || '400px'}
        </div>
      </div>
    );
  },
});
