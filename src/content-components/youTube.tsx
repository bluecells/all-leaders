// src/content-components/YouTubeEmbed.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const YouTube = block({
  label: 'Video YouTube (con preview)',

  schema: {
    videoId: fields.text({
      label: 'ID del video YouTube',
      description: "La parte dopo ?v= nell'URL (es: dQw4w9WgXcQ)",
      validation: { isRequired: true },
    }),

    title: fields.text({
      label: 'Titolo del video (opzionale)',
      description: 'Mostrato come testo alternativo e tooltip',
      defaultValue: 'Video YouTube',
    }),

    height: fields.text({
      label: 'Altezza del video',
      description: 'Es: 400px, 500px, 60vh… Lascia vuoto per proporzione 16:9 automatica',
      defaultValue: '400px',
    }),

    padding: fields.text({
      label: 'Padding verticale del contenitore',
      defaultValue: '2rem 0',
    }),

    text: fields.text({
      label: 'Testo descrittivo accanto al video (opzionale)',
      multiline: true,
      description: 'Testo che appare a sinistra/destra o sopra/sotto il video',
    }),

    textPosition: fields.select({
      label: 'Posizione del testo',
      options: [
        { label: 'Sopra', value: 'top' },
        { label: 'Sotto', value: 'bottom' },
        { label: 'A sinistra', value: 'left' },
        { label: 'A destra', value: 'right' },
      ],
      defaultValue: 'bottom',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const videoId = value?.videoId || 'dQw4w9WgXcQ'; // placeholder famoso
    const title = value?.title || 'Video YouTube';
    const height = value?.height || '400px';
    const padding = value?.padding || '2rem 0';
    const text = value?.text || '';
    const textPos = value?.textPosition || 'bottom';

    const isHorizontal = textPos === 'left' || textPos === 'right';
    const flexDir =
      textPos === 'left'
        ? 'row-reverse'
        : textPos === 'right'
          ? 'row'
          : textPos === 'top'
            ? 'column-reverse'
            : 'column';

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
      <div
        style={{
          margin: '2rem 0',
          padding,
          background: '#f8f9fa',
          border: '1px dashed #aaa',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: flexDir,
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Testo descrittivo (se presente) */}
          {text && (
            <div
              style={{
                flex: 1,
                maxWidth: isHorizontal ? '40%' : '100%',
                textAlign: 'center',
                fontSize: '1rem',
                lineHeight: '1.5',
                color: '#444',
              }}
            >
              {text}
            </div>
          )}

          {/* Preview video */}
          <div
            style={{
              flex: 1,
              maxWidth: isHorizontal ? '55%' : '100%',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <div
              style={{
                width: '100%',
                height,
                background: '#000',
                position: 'relative',
              }}
            >
              {/* Thumbnail */}
              <img
                src={thumbnailUrl}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.85,
                }}
              />

              {/* Overlay play button */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.4)',
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    background: '#ff0000',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(255,0,0,0.5)',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Titolo sotto o sopra */}
            <div
              style={{
                padding: '0.8rem',
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#333',
              }}
            >
              {title}
            </div>
          </div>
        </div>

        {/* Infos config */}
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.85rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          Video ID: {videoId} • Posizione testo: {textPos} • Altezza: {height}
        </div>
      </div>
    );
  },
});
