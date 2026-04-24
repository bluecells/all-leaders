// src/content-components/Strip.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const Strip = block({
  label: "Bandeau d'images (Strip)",

  schema: {
    images: fields.array(
      fields.object({
        image: fields.image({
          label: 'Image',
          directory: 'public/images/strip',
          publicPath: '/images/strip/',
          validation: { isRequired: true },
        }),
        alt: fields.text({
          label: 'Texte alternatif (SEO)',
          description: "Décrit l'image pour l'accessibilité et le référencement",
        }),
      }),
      {
        label: 'Images du bandeau',
        itemLabel: (props) => props.fields.alt.value || 'Image sans titre',
      }
    ),

    background: fields.text({
      label: 'Couleur de fond',
      defaultValue: 'transparent',
    }),

    padding: fields.text({
      label: 'Padding vertical',
      defaultValue: '2rem',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const bg = value?.background || 'transparent';
    const padding = value?.padding || '2rem';
    const imageCount = value?.images?.length || 0;

    // Images fictives pour la preview (placeholders simples)
    const fakeImages = [
      { alt: 'Logo partenaire 1', color: '#e3f2fd' },
      { alt: 'Logo partenaire 2', color: '#e8f5e9' },
      { alt: 'Logo partenaire 3', color: '#fff3e0' },
      { alt: 'Logo partenaire 4', color: '#f3e5f5' },
      { alt: 'Logo partenaire 5', color: '#e0f7fa' },
    ];

    const displayed = fakeImages.slice(0, Math.max(4, imageCount));

    return (
      <div
        style={{
          margin: '1.5rem 0',
          padding: '1rem',
          background: bg === 'transparent' ? '#f8f9fa' : bg,
          border: '1px dashed #aaa',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: `${padding} 1rem`,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.5rem',
            justifyItems: 'center',
          }}
        >
          {displayed.map((img, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                maxWidth: '180px',
                height: '100px',
                background: img.color,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#555',
                fontSize: '0.85rem',
                textAlign: 'center',
                padding: '0.5rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              }}
            >
              {img.alt || 'Image partenaire'}
            </div>
          ))}
        </div>

        {/* Infos config en bas */}
        <div
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            color: '#666',
            fontSize: '0.85rem',
          }}
        >
          {imageCount} image{imageCount !== 1 ? 's' : ''} • Fond : {bg} • Padding : {padding}
        </div>
      </div>
    );
  },
});
