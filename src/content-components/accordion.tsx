// src/content-components/Accordion.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const Accordion = block({
  label: 'Accordéon',

  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({
          label: 'Titre de la section',
          validation: { isRequired: true },
        }),

        content: fields.text({
          label: 'Contenu de la section',
          multiline: true,
          validation: { isRequired: true },
          description:
            'Texte expansible. Accepte Markdown simple : **gras**, *italique*, link [texte](url), \\n pour retour à la ligne.',
        }),
      }),
      {
        label: "Titres de l'accordéon",
        itemLabel: (props: any) => {
          const t = props.fields.title.value;
          return t ? (t.length > 30 ? t.substring(0, 27) + '…' : t) : 'Voce';
        },
      }
    ),

    allowMultiple: fields.checkbox({
      label: "Permet d'ouvrir plusieurs sections simultanément",
      defaultValue: true,
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const items = value?.items || [];
    const allowMultiple = value?.allowMultiple ?? true;

    // 3 voci fittizie per la preview
    const fakeItems =
      items.length > 0
        ? items.slice(0, 3)
        : [
            {
              title: 'Quel accompagnement choisir ?',
              content: 'Celui qui va le mieux',
            },
            {
              title: 'Combien de temps ?',
              content: "Ca dépend, s'il y a du vent.",
            },
            {
              title: 'Est-ce une thérapie ?',
              content: 'Pas toujours.',
            },
          ];

    return (
      <div
        style={{
          margin: '2rem 0',
          padding: '1.5rem',
          background: '#f8f9fa',
          border: '1px dashed #aaa',
          borderRadius: '8px',
          minHeight: '300px',
        }}
      >
        <div style={{ color: '#555', fontStyle: 'italic', marginBottom: '1rem' }}>
          Accordéon – {allowMultiple ? 'Più sezioni aperte ok' : 'Solo una aperta'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {fakeItems.map((item: any, index: number) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '6px',
                overflow: 'hidden',
                background: 'white',
              }}
            >
              {/* Trigger */}
              <div
                style={{
                  padding: '1rem 1.2rem',
                  background: index === 0 ? '#e8f5e9' : '#f9fafb',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{item.title}</span>
                <span style={{ fontSize: '1.2rem', color: '#555' }}>{index === 0 ? '▼' : '▶'}</span>
              </div>

              {/* Contenuto (aperto solo il primo nella preview) */}
              {index === 0 && (
                <div
                  style={{
                    padding: '1rem 1.2rem',
                    background: '#fff',
                    borderTop: '1px solid #eee',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: '#444',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: item.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/__(.+?)__/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/_(.+?)_/g, '<em>$1</em>')
                      .replace(/\\n/g, '<br/>')
                      .replace(/\n/g, '<br/>'),
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Info config */}
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.85rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          Voci: {fakeItems.length} • Multiplo: {allowMultiple ? 'Sì' : 'No'}
        </div>
      </div>
    );
  },
});
