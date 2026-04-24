// src/content-components/MapsEmbed.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const GoogleMaps = block({
  label: 'Mappa integrata',

  schema: {
    embedUrl: fields.text({
      label: 'URL di integrazione (src iframe)',
      description: "Copia-incolla l'URL src dell'iframe da Google Maps, OpenStreetMap, ecc.",
      validation: { isRequired: true },
    }),

    title: fields.text({
      label: 'Titolo sopra la mappa (opzionale)',
      description: 'Es: "Dove siamo", "Localizzazione Limolo House"',
    }),

    height: fields.text({
      label: 'Altezza della mappa',
      description: 'Es: 400px, 500px, 60vh…',
      defaultValue: '400px',
    }),

    class: fields.text({
      label: 'Classe CSS aggiuntiva (opzionale)',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const embedUrl = value?.embedUrl || 'https://www.google.com/maps/embed?...';
    const title = value?.title || '';
    const height = value?.height || '400px';

    return (
      <div
        style={{
          margin: '1.5rem 0',
          padding: '1rem',
          background: '#f8f9fa',
          border: '1px dashed #aaa',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {title && (
          <div
            style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#2e7d32',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            {title}
          </div>
        )}

        {/* Simulazione iframe */}
        <div
          style={{
            width: '100%',
            height,
            background: '#e0e0e0',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '0.9rem',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '80%' }}>
            Mappa integrata (iframe)
            <br />
            <small style={{ opacity: 0.7 }}>URL: {embedUrl.substring(0, 40)}...</small>
          </div>

          {/* Icona placeholder mappa */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '3rem',
              color: '#4285f4',
              opacity: 0.6,
            }}
          >
            🗺️
          </div>
        </div>

        {/* Informazioni di configurazione */}
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.85rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          Altezza: {height} • ID: {value?.formId ? 'non applicabile' : 'embed iframe'}
        </div>
      </div>
    );
  },
});
