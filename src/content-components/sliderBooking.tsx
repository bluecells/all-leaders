import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState } from 'react';

export const SliderBooking = block({
  label: 'Slider + Booking Engine',

  schema: {
    height: fields.text({
      label: 'Altezza',
      defaultValue: 'calc(100vh - 7rem)',
    }),

    mobileHeight: fields.text({
      label: 'Altezza mobile',
      defaultValue: 'calc(100vh - 80px)',
    }),

    speed: fields.number({
      label: 'Speed (ms)',
      defaultValue: 3000,
    }),

    images: fields.array(
      fields.object({
        image: fields.image({
          label: 'Immagine Slider',
          directory: 'public/images/slider',
          publicPath: '/images/slider/',
        }),
        alt: fields.text({
          label: 'Alt Text',
        }),
      }),
      {
        label: 'Immagini Slider',
        itemLabel: (props) => props.fields.alt.value || 'Immagine',
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
        { label: 'Paragraph', value: 'p' },
        { label: 'DIV', value: 'div' },
      ],
      defaultValue: 'h2',
    }),

    subtitle: fields.text({
      label: 'Sottotitolo',
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

    lang: fields.select({
      label: 'Langue du booking engine',
      options: [
        { label: 'Italiano', value: 'it' },
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
      defaultValue: 'it',
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

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [value?.images]);

    const imageCount = value?.images?.length || 0;
    const lang = value?.lang || 'it';

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
        <div
          style={{
            position: 'relative',
            height: '350px',
            background: '#eee',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {previewImages.length > 0 ? (
            <img
              src={previewImages[0]}
              alt={value.images[0]?.alt || 'Slide 1'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
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

          {/* Overlay frame */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              background: 'rgba(245,241,232,0.92)',
              borderRadius: '6px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            {value.title && (
              <div style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '8px' }}>
                {value.title}
              </div>
            )}
            {value.subtitle && (
              <div style={{ fontSize: '1rem', marginBottom: '16px', color: '#555' }}>
                {value.subtitle}
              </div>
            )}

            {/* Booking engine placeholder */}
            <div
              style={{
                padding: '12px',
                background: '#e8f4ff',
                border: '2px dashed #3b82f6',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: '#1e40af',
                fontWeight: 600,
              }}
            >
              🏨 Booking Engine — {lang.toUpperCase()} · ID 57031
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '12px',
            fontSize: '0.9rem',
            color: '#555',
            textAlign: 'center',
          }}
        >
          {imageCount} immagin{imageCount !== 1 ? 'e' : 'a'} • Speed: {value.speed || 3000} ms •
          Langue: {lang}
        </div>
      </div>
    );
  },
});
