// src/content-components/Table.tsx
import { wrapper } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import type { ReactNode } from 'react';

export const Table = wrapper({
  label: 'Table',
  schema: {
    content: fields.child({
      kind: 'block',
      placeholder: 'Contenu du tableau (utilisez la syntaxe Markdown pour les tableaux)...',
      formatting: { inlineMarks: 'inherit', softBreaks: 'inherit' },
      links: 'inherit',
    }),
  },
  ContentView: ({ value, children }: { value: any; children: ReactNode }) => {
    return (
      <div
        style={{
          border: '2px solid #3498db',
          padding: '1rem',
          borderRadius: '8px',
          background: '#f0f8ff',
          margin: '1rem 0',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '1rem',
            marginBottom: '0.75rem',
            color: '#3498db',
            textAlign: 'center',
          }}
        >
          Tableau responsive
        </div>

        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
            }}
          >
            <thead>
              <tr style={{ background: '#3498db', color: 'white' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #2980b9' }}>
                  En-tête 1
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #2980b9' }}>
                  En-tête 2
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #2980b9' }}>
                  En-tête 3
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#fff' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Donnée 1</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Donnée 2</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Donnée 3</td>
              </tr>
              <tr style={{ background: '#f9f9f9' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Donnée 4</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Donnée 5</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Donnée 6</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: '1rem',
            padding: '0.5rem',
            border: '1px dashed #ddd',
            background: '#fff',
            fontSize: '0.85rem',
            color: '#666',
          }}
        >
          <strong>Contenu:</strong> {children ?? <em>Utilisez la syntaxe Markdown pour créer votre tableau...</em>}
        </div>
      </div>
    );
  },
});
