// src/content-components/Duo.tsx
import { wrapper } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState, type ReactNode } from 'react';

export const Duo = wrapper({
  label: 'Duo Component',
  schema: {
    title: fields.text({ label: 'Titolo', defaultValue: 'Titolo Principale' }),
    image: fields.image({
      label: 'Immagina',
      directory: 'public/images/content',
      publicPath: '/images/content/',
    }),
    imageAlt: fields.text({ label: 'Descrizione SEO Immagine (Alt)' }),
    imagePosition: fields.select({
      label: 'Posizione Immagine',
      options: [
        { label: 'Sinistra', value: 'left' },
        { label: 'Destra', value: 'right' },
      ],
      defaultValue: 'right',
    }),
    ctaText: fields.text({ label: 'Testo del CTA', defaultValue: 'CTA text' }),
    ctaLink: fields.text({ label: 'Link del CTA', defaultValue: '#' }),
    background: fields.text({ label: 'Colore di sfondo', defaultValue: 'transparent' }),
    fullBleed: fields.checkbox({ label: 'Full Bleed?', defaultValue: false }),
    heightMatch: fields.checkbox({ label: 'Height Match?', defaultValue: false }),
    maxHeight: fields.text({ label: 'Altezza massima', defaultValue: '60vh' }),
    noBorderPadding: fields.checkbox({ label: 'No Border Padding?', defaultValue: false }),
    content: fields.child({
      kind: 'block',
      placeholder: 'Contenuto dello slot...',
      formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
      links: 'inherit',
    }),
  },
  ContentView: ({ value, children }: { value: any; children: ReactNode }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
      if (!value?.image?.data) {
        setImageSrc(null);
        return;
      }

      // Création du Blob à partir des bytes bruts
      const blob = new Blob([value.image.data], {
        type: `image/${value.image.extension.replace(/^\./, '')}`, // ex: "webp" → "image/webp"
      });

      // Génération d'une URL temporaire valide dans le navigateur
      const url = URL.createObjectURL(blob);
      setImageSrc(url);

      // Nettoyage pour éviter les fuites mémoire
      return () => {
        URL.revokeObjectURL(url);
      };
    }, [value?.image]);

    console.log('[DUO] imageSrc généré :', imageSrc);

    return (
      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: value.background === 'transparent' ? '#fff' : value.background,
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #eee' }}>
          Duo: {value.title || '(sans titre)'} ({value.imagePosition || 'right'})
          {value.noBorderPadding && <span style={{ color: '#FF6B6B', marginLeft: '8px' }}>• No Border Padding</span>}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: value.imagePosition === 'left' ? 'row' : 'row-reverse',
            gap: '1.5rem',
            alignItems: value.heightMatch ? 'stretch' : 'flex-start',
            maxHeight: value.maxHeight || 'auto',
            overflow: 'hidden',
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={value.imageAlt || 'Image du Duo'}
              style={{
                maxWidth: '50%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
              onError={(e) => {
                console.error('Erreur chargement preview image Duo');
                e.currentTarget.src = '/images/placeholder-error.png';
              }}
            />
          ) : (
            <div
              style={{
                width: '50%',
                minHeight: '200px',
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ccc',
                borderRadius: '4px',
              }}
            >
              <em>Aucune image uploadée</em>
            </div>
          )}

          <div
            style={{
              flex: 1,
              border: '2px dashed #ccc',
              padding: '1rem',
              minHeight: '120px',
              background: '#fafafa',
            }}
          >
            {children ?? <em>Ajoute du contenu ici...</em>}
          </div>
        </div>
      </div>
    );
  },
});
