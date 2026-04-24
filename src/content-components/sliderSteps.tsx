// src/content-components/SliderSteps.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState } from 'react';

export const SliderSteps = block({
  label: 'Slider Steps (Tappe illustrate)',

  schema: {
    id: fields.text({
      label: 'ID unico (optionale)',
      description: 'Solo se più sliders sulla stessa pagina',
      defaultValue: 'steps-1',
    }),

    background: fields.text({
      label: 'Color dello sfondo',
      defaultValue: 'transparent',
    }),

    steps: fields.array(
      fields.object({
        title: fields.text({
          label: 'Titolo (handwriting)',
          validation: { isRequired: true },
        }),

        subtitle: fields.text({
          label: 'Sottotitolo',
        }),

        description: fields.text({
          label: 'Descrizione',
          multiline: true,
        }),

        image: fields.image({
          label: 'Immagina della tappa',
          directory: 'public/images/steps',
          publicPath: '/images/steps/',
          validation: { isRequired: true },
        }),
      }),
      {
        label: 'Tappe dello slider',
        itemLabel: (props, index) => {
          const t = props.fields.title.value;
          return t ? (t.length > 30 ? t.substring(0, 27) + '…' : t) : `Tappe ${index + 1}`;
        },
      }
    ),
  },

  ContentView: ({ value }: { value: any }) => {
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
      if (!value?.steps?.length) {
        setPreviewImages([]);
        return;
      }

      const urls: string[] = [];

      value.steps.forEach((step: any) => {
        if (step?.image?.data) {
          const blob = new Blob([step.image.data], {
            type: `image/${step.image.extension.replace(/^\./, '')}`,
          });
          urls.push(URL.createObjectURL(blob));
        } else {
          urls.push('');
        }
      });

      setPreviewImages(urls);

      return () => urls.forEach((url) => url && URL.revokeObjectURL(url));
    }, [value?.steps]);

    const bgColor = value?.background || 'transparent';

    return (
      <div
        style={{
          margin: '2rem 0',
          padding: '24px',
          background: bgColor === 'transparent' ? '#f8f9fa' : bgColor,
          border: '1px dashed #aaa',
          borderRadius: '12px',
          minHeight: '300px',
        }}
      >
        {value?.steps?.length === 0 ? (
          <div
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#777',
              fontStyle: 'italic',
            }}
          >
            Ajoutez des étapes au slider
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {value.steps.map((step: any, index: number) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '2rem',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '2rem',
                }}
              >
                {/* COLONNE GAUCHE : textes */}
                <div style={{ flex: '1', maxWidth: '45%' }}>
                  <h3
                    style={{
                      fontFamily: 'cursive',
                      fontSize: '2.2rem',
                      color: '#2e7d32',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    {step.title || 'Titre manquant'}
                  </h3>

                  {step.subtitle && (
                    <p
                      style={{
                        fontSize: '1.3rem',
                        color: '#555',
                        margin: '0 0 1rem',
                        fontStyle: 'italic',
                      }}
                    >
                      {step.subtitle}
                    </p>
                  )}

                  <p
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      color: '#444',
                    }}
                  >
                    {step.description || 'Pas de description'}
                  </p>
                </div>

                {/* COLONNE DROITE : image ronde */}
                <div style={{ flex: '1', maxWidth: '45%', textAlign: 'center' }}>
                  {previewImages[index] ? (
                    <div
                      style={{
                        width: '280px',
                        height: '280px',
                        margin: '0 auto',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '6px solid white',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                      }}
                    >
                      <img
                        src={previewImages[index]}
                        alt={step.title || `Étape ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-error.png';
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '280px',
                        height: '280px',
                        margin: '0 auto',
                        borderRadius: '50%',
                        background: '#ddd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        fontSize: '0.9rem',
                      }}
                    >
                      Immagina mancante
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
});
