// src/content-components/Carousel.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState, type ReactNode } from 'react';

export const Carousel = block({
  label: 'Carousel Component',

  schema: {
    title: fields.text({
      label: 'Titolo',
      defaultValue: 'Titolo del carousel',
    }),
    images: fields.array(
      fields.object({
        image: fields.image({
          label: 'Carousel Image',
          directory: 'public/images/carousel',
          publicPath: '/images/carousel/',
        }),
        alt: fields.text({ label: 'Alt Text' }),
      }),
      {
        label: 'Carousel Images',
        itemLabel: (props) => props.fields.alt.value || 'Carousel Image',
      }
    ),

    height: fields.text({
      label: 'Height',
      defaultValue: '30vh',
    }),

    speed: fields.number({
      label: 'Speed (ms)',
      defaultValue: 5000,
    }),

    background: fields.text({
      label: 'Background',
      defaultValue: 'transparent',
    }),

    spacing: fields.text({
      label: 'Spacing',
      defaultValue: '1rem',
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

      // Cleanup
      return () => {
        urls.forEach(URL.revokeObjectURL);
      };
    }, [value?.images]);

    const imageCount = value?.images?.length || 0;

    return (
      <div
        style={{
          padding: '16px',
          background: value.background || '#f8f9fa',
          border: '1px dashed #999',
          borderRadius: '8px',
          minHeight: '180px',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
          Carousel ({imageCount} image{imageCount !== 1 ? 's' : ''})
        </div>

        {imageCount === 0 ? (
          <div
            style={{
              height: '120px',
              background: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #ccc',
              borderRadius: '6px',
              color: '#777',
            }}
          >
            <em>Ajoutez des images au carousel</em>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: value.spacing || '1rem',
              padding: '8px 0',
              height: value.height || '30vh',
              maxHeight: '300px',
            }}
          >
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={value.images[index]?.alt || `Image ${index + 1}`}
                style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder-error.png';
                }}
              />
            ))}
          </div>
        )}

        <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#555', textAlign: 'center' }}>
          Vitesse : {value.speed || 5000} ms
        </div>
      </div>
    );
  },
});
