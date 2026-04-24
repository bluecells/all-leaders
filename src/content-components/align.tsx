// src/content-components/Align.tsx
import { wrapper } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import type { ReactNode } from 'react';

export const Align = wrapper({
  label: 'Allineamento testo / contenuto',

  schema: {
    value: fields.select({
      label: 'Allineamento',
      description: "Scegli come allineare il contenuto all'interno del blocco",
      options: [
        { label: 'Sinistra (default)', value: 'left' },
        { label: 'Centrato', value: 'center' },
        { label: 'Destra', value: 'right' },
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
          Allineamento: {align === 'left' ? 'Sinistra' : align === 'center' ? 'Centrato' : 'Destra'}
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
          {children || (
            <em style={{ color: '#999' }}>Qui apparirà il contenuto allineato ({align})</em>
          )}
        </div>
      </div>
    );
  },
});
