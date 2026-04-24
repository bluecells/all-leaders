// src/content-components/Grid.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

function getContrastColor(bg: string): string {
  if (!bg || bg === 'transparent' || bg.includes('var(')) {
    return 'var(--color-text-main, #000)';
  }

  const hexMatch = bg.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!hexMatch) return 'var(--color-text-main, #000)';

  const [, r, g, b] = hexMatch;
  const luminance =
    (0.299 * parseInt(r, 16) + 0.587 * parseInt(g, 16) + 0.114 * parseInt(b, 16)) / 255;
  return luminance > 0.55 ? 'var(--color-text-main, #000)' : 'var(--color-bg-body, #fff)';
}

export const Grid = block({
  label: 'Griglia',

  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({ label: 'Titolo' }),
        description: fields.text({
          label: 'Descrizione',
          description: 'Supporta **grassetto**, *italico*, [link](url) e liste con - o *',
          validation: { isRequired: true },
        }),
        media: fields.image({
          label: 'Media (icona o immagine)',
          directory: 'public/images/grid',
          publicPath: '/images/grid/',
        }),
        isIcon: fields.checkbox({
          label: 'Trattare come icona (più piccola e centrata)',
          defaultValue: false,
        }),
      }),
      {
        label: 'Elementi della griglia',
        itemLabel: (props) => props.fields.title.value || 'Elemento senza titolo',
      }
    ),

    hideIcons: fields.checkbox({
      label: 'Nascondere tutte le immagini / icone',
      defaultValue: false,
    }),

    minWidth: fields.text({
      label: 'Larghezza minima di un elemento (mobile first)',
      defaultValue: '',
      description: 'Usato con auto-fit se non si forza il numero di colonne',
    }),

    mobileCols: fields.number({
      label: 'Colonne fisse – Mobile (< 768px)',
      description: 'Lascia vuoto per auto-fit',
      validation: { min: 1, max: 6, isRequired: false },
    }),

    tabletCols: fields.number({
      label: 'Colonne fisse – Tablet / Desktop (≥ 768px)',
      description: 'Lascia vuoto per auto-fit',
      validation: { min: 1, max: 6, isRequired: false },
    }),

    xlCols: fields.number({
      label: 'Colonne fisse – Schermo XL (≥ 1600px)',
      description: 'Lascia vuoto per auto-fit',
      validation: { min: 1, max: 8, isRequired: false },
    }),

    gap: fields.text({
      label: 'Spazio tra gli elementi (gap)',
      defaultValue: '1.5rem',
    }),

    padding: fields.text({
      label: 'Padding interno del contenitore',
      defaultValue: '1.5rem',
    }),

    background: fields.text({
      label: 'Colore di sfondo del blocco',
      defaultValue: 'transparent',
      description: 'Hex, rgb, nome colore o transparent',
    }),

    textColor: fields.text({
      label: 'Colore testo forzato',
      description: 'Se compilato, ignora il calcolo automatico del contrasto',
      defaultValue: '',
    }),

    fullBleed: fields.checkbox({
      label: 'Full Bleed (larghezza piena schermo)',
      defaultValue: false,
    }),

    additionalClass: fields.text({
      label: 'Classe CSS aggiuntiva (sul contenitore griglia)',
      description: 'Opzionale',
    }),
  },

  ContentView: ({ value }) => {
    const {
      items = [],
      hideIcons = false,
      minWidth = '',
      gap = '1.5rem',
      padding = '1.5rem',
      background = 'transparent',
      textColor = '',
      fullBleed = false,
      mobileCols,
      tabletCols,
      xlCols,
    } = value || {};

    const itemCount = items.length;
    const autoTextColor = getContrastColor(background);
    const finalTextColor = textColor || autoTextColor;

    const getCols = () => {
      if (mobileCols) return mobileCols;
      if (tabletCols) return tabletCols;
      if (xlCols) return xlCols;
      return 'auto-fit';
    };

    const previewStyle = {
      backgroundColor: background,
      color: finalTextColor,
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px dashed #aaa',
      backgroundImage:
        background === 'transparent'
          ? 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)'
          : undefined,
      backgroundSize: '20px 20px',
    };

    return (
      <div style={{ padding: '16px' }}>
        <div
          className="grid-preview-wrapper"
          style={{
            ...previewStyle,
            width: fullBleed ? '100vw' : '100%',
            maxWidth: fullBleed ? undefined : '80rem',
            margin: fullBleed ? '0 calc(-50vw + 50%)' : '0 auto',
            position: fullBleed ? 'relative' : 'static',
            left: fullBleed ? '50%' : undefined,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${getCols()}, minmax(${minWidth}, 1fr))`,
              gap,
              padding,
              maxWidth: fullBleed ? undefined : '80rem',
              margin: fullBleed ? '0' : '0 auto',
            }}
          >
            {itemCount === 0 ? (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#777',
                  fontStyle: 'italic',
                }}
              >
                Aggiungi elementi alla griglia…
              </div>
            ) : (
              items.map((item: any, index: number) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {!hideIcons && item.media?.src && (
                    <div
                      style={{
                        width: '100%',
                        height: item.isIcon ? '100px' : '180px',
                        background: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        color: '#666',
                      }}
                    >
                      {item.isIcon ? 'Icona' : 'Immagine'} – {item.media.filename || 'cloud'}
                    </div>
                  )}

                  <div
                    style={{
                      padding: '1.5rem',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        margin: '0 0 0.75rem',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: finalTextColor,
                      }}
                    >
                      {item.title || '(senza titolo)'}
                    </h3>

                    <div
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: finalTextColor,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item.description || '<em>Descrizione mancante</em>',
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.8rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          Griglia – {itemCount} elemento{itemCount !== 1 ? 'i' : ''} • {mobileCols || 'auto-fit'} /{' '}
          {tabletCols || 'auto-fit'} / {xlCols || 'auto-fit'} • sfondo: {background} • testo:{' '}
          {textColor || 'auto'}
        </div>
      </div>
    );
  },
});
