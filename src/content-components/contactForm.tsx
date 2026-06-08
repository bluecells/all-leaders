// src/content-components/ContactForm.tsx
import { wrapper } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import type { ReactNode } from 'react';

export const ContactForm = wrapper({
  label: 'Formulaire de contact (via Formspree)',

  schema: {
    formId: fields.text({
      label: 'ID Formspree',
      description: "Exemple: xeeljwrl (la partie après /f/ dans l'URL Formspree)",
      validation: { isRequired: true },
    }),

    formPosition: fields.select({
      label: 'Position du formulaire',
      options: [
        { label: 'A gauche (contenu à droite)', value: 'left' },
        { label: 'A droite (contenu à gauche)', value: 'right' },
      ],
      defaultValue: 'right',
    }),

    buttonText: fields.text({
      label: 'Texte du bouton',
      defaultValue: 'Envoyer',
    }),
  },

  ContentView: ({ value, children }: { value: any; children: ReactNode }) => {
    const position = value?.formPosition || 'right';
    const btnText = value?.buttonText || 'Envoyer';

    return (
      <div
        style={{
          margin: '2rem 0',
          padding: '24px',
          background: '#f8f9fa',
          border: '1px dashed #aaa',
          borderRadius: '12px',
          minHeight: '500px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            '@media (min-width: 768px)': {
              flexDirection: 'row',
              gap: '3rem',
            } as any,
          }}
        >
          {/* Contenuto Markdown (slot) */}
          <div
            style={{
              flex: 1,
              order: position === 'left' ? 2 : 1,
              padding: '1.5rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ color: '#555', fontStyle: 'italic', marginBottom: '1rem' }}>
              Contenuto Markdown (slot) :
            </div>
            <div
              style={{
                border: '1px solid #ddd',
                padding: '16px',
                borderRadius: '6px',
                minHeight: '180px',
                background: '#fff',
                lineHeight: '1.6',
              }}
            >
              {children || (
                <em style={{ color: '#999' }}>
                  Ici sera affiché le contenu Markdown (texte, titres, listes...)
                </em>
              )}
            </div>
          </div>

          {/* Formulario */}
          <div
            style={{
              flex: 1,
              order: position === 'left' ? 1 : 2,
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '1.5rem',
            }}
          >
            <div style={{ color: '#555', fontStyle: 'italic', marginBottom: '1rem' }}>
              Formulaire de contact (Formspree ID: {value?.formId || '(non défini)'})
            </div>

            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label
                  style={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Nome *
                </label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  style={{
                    padding: '0.875rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                  disabled
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label
                  style={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Votre email"
                  style={{
                    padding: '0.875rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                  disabled
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label
                  style={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Telefono
                </label>
                <input
                  type="tel"
                  placeholder="Votre numéro"
                  style={{
                    padding: '0.875rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                  disabled
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label
                  style={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Objet *
                </label>
                <input
                  type="text"
                  placeholder="De quoi s'agit-il ?"
                  style={{
                    padding: '0.875rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                  disabled
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label
                  style={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Messaggio *
                </label>
                <textarea
                  rows={6}
                  placeholder="Votre message..."
                  style={{
                    padding: '0.875rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    resize: 'vertical',
                    minHeight: '150px',
                  }}
                  disabled
                />
              </div>

              <button
                type="button"
                disabled
                style={{
                  padding: '1rem 2.5rem',
                  background: '#2e7d32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: 'not-allowed',
                  opacity: 0.7,
                  alignSelf: 'flex-start',
                }}
              >
                {btnText}
              </button>

              {/* Message de succès simulé */}
              <div
                style={{
                  padding: '1rem',
                  background: '#e8f5e9',
                  color: '#2d5016',
                  borderLeft: '4px solid #2e7d32',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  marginTop: '1rem',
                }}
              >
                ✓ Message envoyé avec succès! Nous vous répondrons bientôt.
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  },
});
