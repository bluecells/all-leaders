// src/content-components/FaqAccordion.tsx
import { wrapper } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import type { ReactNode } from 'react';

export const FaqAccordion = wrapper({
  label: 'Elenco FAQ (contenuto non modificabile)',

  schema: {
    category: fields.text({
      label: 'Categoria di FAQ da mostrare',
      description: 'Lasciare vuoto per vedere tutte le FAQ in questa lingua',
    }),

    lang: fields.select({
      label: 'Lingua delle FAQ',
      options: [
        { label: 'Italiano', value: 'it' },
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
      defaultValue: 'it',
    }),

    allowMultiple: fields.checkbox({
      label: 'Per aprire più FAQ alla volta',
      defaultValue: true,
    }),
  },

  ContentView: ({ value, children }: { value: any; children: ReactNode }) => {
    const lang = value?.lang || 'it';
    const category = value?.category || '';
    const allowMultiple = value?.allowMultiple ?? true;

    // FAQ fictives pour la preview (simples et légères)
    const fakeFaqs = [
      {
        question: 'Come posso prenotare una camera?',
        answer: 'Puoi prenotare direttamente dal sito o contattarci via email o WhatsApp.',
      },
      {
        question: 'Quali sono gli orari di check-in e check-out?',
        answer:
          'Check-in dalle 15:00, check-out entro le 11:00. Possiamo essere flessibili su richiesta.',
      },
      {
        question: 'Accettate animali domestici?',
        answer: 'Sì, accettiamo animali di piccola taglia con un supplemento.',
      },
      {
        question: 'Avete parcheggio privato?',
        answer: 'Sì, parcheggio gratuito e riservato per gli ospiti.',
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
          Accordion FAQ – Lingua: {lang.toUpperCase()} {category ? `| Catégorie: ${category}` : ''}
        </div>

        {fakeFaqs.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#777', padding: '2rem' }}>
            Nessuna FAQ in questa lingua
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {fakeFaqs.map((faq, index) => (
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
                  <span>{faq.question}</span>
                  <span style={{ fontSize: '1.2rem', color: '#555' }}>
                    {index === 0 ? '▼' : '▶'}
                  </span>
                </div>

                {/* Contenu (ouvert pour le premier dans la preview) */}
                {index === 0 && (
                  <div
                    style={{
                      padding: '1rem 1.2rem',
                      background: '#fff',
                      borderTop: '1px solid #eee',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      color: '#444',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Infos de config */}
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.85rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          Apertura multiple: {allowMultiple ? 'SÌ' : 'NO'}
        </div>

        {/* Slot enfant si présent */}
        {children && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '6px',
            }}
          >
            <em style={{ color: '#777' }}>Contenuto extra (slot, non FAQ):</em>
            <div style={{ marginTop: '0.5rem' }}>{children}</div>
          </div>
        )}
      </div>
    );
  },
});
