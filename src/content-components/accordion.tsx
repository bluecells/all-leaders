// src/content-components/Accordion.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const Accordion = block({
  label: 'Accordéon (FAQ o sezioni espandibili)',

  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({
          label: 'Titolo della sezione',
          validation: { isRequired: true },
        }),

        content: fields.text({
          label: 'Contenuto della sezione',
          multiline: true,
          validation: { isRequired: true },
          description:
            'Testo espandibile. Supporta Markdown semplice: **grassetto**, *corsivo*, link [testo](url), \\n per a capo.',
        }),
      }),
      {
        label: "Voci dell'accordéon",
        itemLabel: (props: any) => {
          const t = props.fields.title.value;
          return t ? (t.length > 30 ? t.substring(0, 27) + '…' : t) : 'Voce';
        },
      }
    ),

    allowMultiple: fields.checkbox({
      label: 'Permettere più sezioni aperte contemporaneamente',
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
              title: 'Come posso prenotare?',
              content:
                'Puoi prenotare direttamente dal sito o contattarci via email o WhatsApp.\n\n**Requisiti:** passaporto o carta d’identità valida.',
            },
            {
              title: 'Orari di check-in e check-out?',
              content:
                'Check-in dalle 15:00\nCheck-out entro le 11:00\nPossiamo essere flessibili su richiesta.',
            },
            {
              title: 'Accettate animali domestici?',
              content: 'Sì, accettiamo animali di piccola taglia con un piccolo supplemento.',
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
