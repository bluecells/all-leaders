import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const BookingEngine = block({
  label: 'Booking Engine',
  schema: {
    lang: fields.select({
      label: 'Langue',
      options: [
        { label: 'Italiano', value: 'it' },
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
      defaultValue: 'it',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const lang = value?.lang || 'it';

    return (
      <div
        style={{
          margin: '2rem 0',
          padding: '1.5rem',
          background: '#f0f7ff',
          border: '2px dashed #3b82f6',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏨</div>
        <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e40af' }}>
          Booking Engine — bed-and-breakfast.it
        </div>
        <div style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: '#555' }}>
          Langue : <strong>{lang}</strong> · Struttura ID : 57031
        </div>
      </div>
    );
  },
});
