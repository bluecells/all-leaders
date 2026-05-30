// src/content-components/PdfViewer.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const PdfViewer = block({
  label: 'PDF Viewer',
  schema: {
    url: fields.text({
      label: 'URL du PDF',
      validation: { isRequired: true },
      defaultValue: '/documents/exemple.pdf'
    }),
    height: fields.text({
      label: 'Hauteur',
      defaultValue: '600px'
    }),
  },
  ContentView: ({ value }: { value: any }) => {
    return (
      <div
        style={{
          border: '2px solid #e74c3c',
          padding: '1rem',
          borderRadius: '8px',
          background: '#fff5f5',
          margin: '1rem 0',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '0.75rem',
            color: '#e74c3c',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>📄</span>
          PDF Viewer
        </div>

        <div
          style={{
            background: '#f9f9f9',
            border: '1px dashed #ccc',
            borderRadius: '4px',
            padding: '2rem',
            textAlign: 'center',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ fontSize: '3rem' }}>📑</div>
          <div style={{ color: '#666' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              Aperçu du PDF
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              URL : <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '3px' }}>
                {value.url || '/documents/exemple.pdf'}
              </code>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '0.75rem',
            fontSize: '0.85rem',
            color: '#888',
          }}
        >
          Hauteur : {value.height || '600px'}
        </div>
      </div>
    );
  },
});
