// src/content-components/Reviews.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const Reviews = block({
  label: 'Témoignages / Avis (Reviews)',

  schema: {
    reviews: fields.array(
      fields.object({
        text: fields.text({
          label: 'Texte du témoignage',
          multiline: true,
          validation: { isRequired: true },
        }),

        author: fields.text({
          label: 'Auteur / Nom',
          defaultValue: 'Client anonyme',
        }),

        date: fields.text({
          label: 'Date (optionnel)',
          description: 'Ex: 15 juin 2025',
        }),

        iconPosition: fields.select({
          label: "Position de l'icône",
          options: [
            { label: 'En haut', value: 'top' },
            { label: 'À gauche', value: 'left' },
          ],
          defaultValue: 'top',
        }),

        stars: fields.number({
          label: "Nombre d'étoiles (1–5)",
          defaultValue: 5,
          validation: { isRequired: true, min: 1, max: 5 },
        }),
      }),
      {
        label: 'Avis / Témoignages',
        itemLabel: (props) => {
          const t = props.fields.text.value;
          return t ? (t.length > 30 ? t.substring(0, 27) + '…' : t) : `Avis ${props.index + 1}`;
        },
      }
    ),

    columns: fields.number({
      label: 'Nombre de colonnes (desktop)',
      defaultValue: 3,
      validation: { min: 1, max: 4 },
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const columns = value?.columns || 3;
    const bg = '#fff'; // fond blanc pour la preview

    // Avis fictifs légers pour la preview
    const fakeReviews = [
      {
        text: 'Posto meraviglioso, accoglienza familiare e attenzione ai dettagli. Torneremo sicuramente!',
        author: 'Maria R.',
        date: '10 luglio 2025',
        iconPosition: 'top',
        stars: 5,
      },
      {
        text: 'Séjour inoubliable, tout est parfait : calme, nature, déco éco-chic. Merci !',
        author: 'Sophie L.',
        date: '22 juin 2025',
        iconPosition: 'left',
        stars: 5,
      },
      {
        text: 'Amazing place, very sustainable and cozy. Highly recommend!',
        author: 'James T.',
        date: '5 juin 2025',
        iconPosition: 'top',
        stars: 5,
      },
      {
        text: 'Un angolo di paradiso in Sardegna, torneremo presto!',
        author: 'Luca M.',
        date: '18 maggio 2025',
        iconPosition: 'top',
        stars: 5,
      },
    ];

    const displayed = fakeReviews.slice(0, Math.max(3, value?.reviews?.length || 0));

    return (
      <div
        style={{
          margin: '1.5rem 0',
          padding: '1.5rem',
          background: '#f8f9fa',
          border: '1px dashed #aaa',
          borderRadius: '8px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#555' }}>
          Sezione recensioni – {columns} colonne
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '1.5rem',
          }}
        >
          {displayed.map((rev, i) => (
            <div
              key={i}
              style={{
                background: bg,
                padding: '1.2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: rev.iconPosition === 'left' ? 'row' : 'column',
                gap: '1rem',
                alignItems: rev.iconPosition === 'left' ? 'flex-start' : 'center',
                textAlign: rev.iconPosition === 'left' ? 'left' : 'center',
              }}
            >
              {/* Icône placeholder */}
              <div
                style={{
                  width: rev.iconPosition === 'left' ? '60px' : '50px',
                  height: rev.iconPosition === 'left' ? '60px' : '50px',
                  background: '#e0f7fa',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  flexShrink: 0,
                }}
              >
                ★
              </div>

              <div>
                <p
                  style={{
                    fontStyle: 'italic',
                    margin: '0 0 0.8rem',
                    lineHeight: '1.5',
                    color: '#444',
                  }}
                >
                  "{rev.text}"
                </p>

                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <strong>{rev.author}</strong>
                  {rev.date && <span> – {rev.date}</span>}
                </div>

                <div style={{ marginTop: '0.5rem', color: '#f59e0b' }}>
                  {'★'.repeat(rev.stars)}
                  {'☆'.repeat(5 - rev.stars)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infos config */}
        <div
          style={{
            marginTop: '1.2rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#666',
          }}
        >
          Colonnes : {columns} • {displayed.length} avis simulés
        </div>
      </div>
    );
  },
});
