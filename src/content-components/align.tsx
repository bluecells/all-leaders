// src/content-components/Align.tsx
import { wrapper } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import type { ReactNode } from 'react';

export const Align = wrapper({
  label: 'Alignement texte/contenu',

  schema: {
    value: fields.select({
      label: 'Alignement',
      description: "Sélectionnez comment aligner le contenu à l'intérieur du bloc",
      options: [
        { label: 'Gauche (default)', value: 'left' },
        { label: 'Centré', value: 'center' },
        { label: 'Droite', value: 'right' },
      ],
      defaultValue: 'left',
    }),
  },

  ContentView: ({ value, children }: { value: any; children: ReactNode }) => {
    const align = value?.value || 'left';

    return (
      <div
        style={{
          margin: '1.5rem 0',
          padding: '1rem',
          background: '#f8f9fa',
          border: '1px dashed #aaa',
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '0.8rem', color: '#555' }}>
          Alignement: {align === 'left' ? 'Gauche' : align === 'center' ? 'Centré' : 'Droite'}
        </div>

        <div
          style={{
            textAlign: align,
            padding: '1rem',
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #ddd',
            minHeight: '80px',
          }}
          className={`align-${align}`}
        >
          {children || <em style={{ color: '#999' }}>Contenu alligné ({align})</em>}
        </div>
      </div>
    );
  },
});
