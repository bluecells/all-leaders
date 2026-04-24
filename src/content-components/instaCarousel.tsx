// src/content-components/InstaCarousel.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const InstaCarousel = block({
  label: 'Carousel Instagram (Behold Widget)',

  schema: {
    feedId: fields.text({
      label: 'Feed ID Behold',
      description: 'ID du flux fourni par Behold.so (ex: bSJr98Y1FpJkxujvmAK8)',
      defaultValue: 'bSJr98Y1FpJkxujvmAK8',
      validation: { isRequired: true },
    }),

    username: fields.text({
      label: "Nom d'utilisateur Instagram",
      description: 'Ex: limolo.house (sans @)',
      defaultValue: 'limolo.house',
      validation: { isRequired: true },
    }),

    background: fields.text({
      label: 'Couleur de fond',
      defaultValue: 'transparent',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const feedId = value?.feedId || 'xxxxxxxx';
    const username = value?.username || 'utilisateur';
    const bg = value?.background || 'transparent';

    return (
      <div
        style={{
          margin: '1.5rem 0',
          padding: '1.5rem',
          background: bg === 'transparent' ? '#f8f9fa' : bg,
          border: '1px dashed #aaa',
          borderRadius: '8px',
          minHeight: '180px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '1rem', color: '#555', fontStyle: 'italic' }}>
          Carousel Instagram (Behold Widget)
        </div>

        {/* Simulation header */}
        <div
          style={{
            marginBottom: '1.5rem',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#e1306c', // rose Instagram
          }}
        >
          Instagram @{username}
        </div>

        {/* Placeholder du widget */}
        <div
          style={{
            height: '120px',
            background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          Widget Behold – Feed ID: {feedId.substring(0, 8)}...
        </div>

        {/* Infos config */}
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.85rem',
            color: '#666',
          }}
        >
          Fond : {bg} • ID : {feedId}
        </div>
      </div>
    );
  },
});
