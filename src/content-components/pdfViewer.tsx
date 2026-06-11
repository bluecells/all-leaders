// src/content-components/PdfViewer.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useEffect, useState } from 'react';

export const PdfViewer = block({
  label: 'PDF Viewer',
  schema: {
    pdfMode: fields.select({
      label: 'Source du PDF',
      options: [
        { label: 'URL externe', value: 'url' },
        { label: 'Upload fichier', value: 'upload' },
      ],
      defaultValue: 'url',
    }),

    externalUrl: fields.text({
      label: 'URL du PDF',
      description: 'URL complète (ex: https://domaine.com/doc/fichier.pdf) ou chemin local (ex: /documents/fichier.pdf)',
      validation: { isRequired: false },
    }),

    file: fields.file({
      label: 'Fichier PDF',
      description: 'Téléversez un fichier PDF (max 10MB recommandé)',
      directory: 'public/documents',
      publicPath: '/documents/',
      validation: { isRequired: false },
    }),

    height: fields.text({
      label: 'Hauteur',
      description: 'Hauteur du viewer (ex: 600px, 80vh)',
      defaultValue: '600px',
      validation: { isRequired: false },
    }),

    // Champ legacy pour compatibilité backward
    url: fields.text({
      label: '[OBSOLÈTE] URL du PDF (ancien format)',
      description: 'Ancien champ, utilisez "Source du PDF" ci-dessus',
      validation: { isRequired: false },
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const [pdfPreviewSrc, setPdfPreviewSrc] = useState<string | null>(null);

    // Gestion du preview pour fichier uploadé
    useEffect(() => {
      // Si mode upload avec fichier uploadé
      if (value?.pdfMode === 'upload' && value?.file?.data) {
        const fileData = value.file;
        const blob = new Blob([fileData.data], {
          type: 'application/pdf',
        });

        const url = URL.createObjectURL(blob);
        setPdfPreviewSrc(url);

        return () => URL.revokeObjectURL(url);
      } else {
        setPdfPreviewSrc(null);
      }
    }, [value?.file, value?.pdfMode]);

    // Déterminer la source du PDF pour affichage
    let displaySource = '';
    let sourceType = '';

    if (value?.pdfMode === 'url') {
      displaySource = value.externalUrl || '';
      sourceType = 'URL externe';
    } else if (value?.pdfMode === 'upload') {
      if (value?.file?.filename) {
        displaySource = value.file.filename;
        sourceType = 'Fichier uploadé';
      } else {
        displaySource = 'En attente d\'upload...';
        sourceType = 'Upload';
      }
    } else if (value?.url) {
      // Fallback pour ancien format
      displaySource = value.url;
      sourceType = 'URL (ancien format)';
    }

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
            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Aperçu du PDF</div>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              <strong>Type :</strong>{' '}
              <span
                style={{
                  background: '#fff',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  border: '1px solid #e0e0e0',
                }}
              >
                {sourceType}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Source :</strong>{' '}
              <code
                style={{
                  background: '#fff',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  wordBreak: 'break-all',
                  fontSize: '0.8rem',
                }}
              >
                {displaySource || '/documents/exemple.pdf'}
              </code>
            </div>
          </div>

          {/* Preview iframe pour uploaded PDF */}
          {pdfPreviewSrc && (
            <div
              style={{
                width: '100%',
                maxWidth: '400px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                overflow: 'hidden',
                marginTop: '1rem',
              }}
            >
              <iframe
                src={pdfPreviewSrc}
                style={{
                  width: '100%',
                  height: '200px',
                  border: 'none',
                }}
                title="PDF Preview"
              />
            </div>
          )}
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
