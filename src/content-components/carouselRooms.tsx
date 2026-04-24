// src/content-components/CarouselRooms.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const CarouselRooms = block({
  label: 'Carousel Camere (Rooms)',

  schema: {
    height: fields.text({
      label: 'Altezza (50vh max per formato mobile)',
      defaultValue: '40vh',
    }),

    speed: fields.number({
      label: 'Velocità (ms)',
      defaultValue: 40000,
    }),

    background: fields.text({
      label: 'Sfondo',
      defaultValue: 'transparent',
    }),

    spacing: fields.text({
      label: 'Spaziatura',
      defaultValue: '1rem',
    }),

    showName: fields.checkbox({
      label: 'Mostra nome',
      defaultValue: true,
    }),

    showPunchline: fields.checkbox({
      label: 'Mostra punchline',
      defaultValue: true,
    }),

    lang: fields.select({
      label: 'Lingua',
      options: [
        { label: 'Italiano', value: 'it' },
        { label: 'Francese', value: 'fr' },
        { label: 'Inglese', value: 'en' },
      ],
      defaultValue: 'it',
    }),

    excludeId: fields.text({
      label: 'Escludi camera (ID)',
    }),

    paddingVertical: fields.text({
      label: 'Padding vertical',
      defaultValue: '4rem',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const showName = value?.showName ?? true;
    const showPunch = value?.showPunchline ?? true;
    const lang = value?.lang || 'it';

    // Chambres fictives très simples (couleurs + texte)
    const fakeRooms = [
      { name: 'Camera 1', punchline: 'Eco & Relax', color: '#a8e6cf' },
      { name: 'Camera 2', punchline: 'Vista Sinis', color: '#b3e5fc' },
      { name: 'Camera 3', punchline: 'Sardegna autentica', color: '#ffecb3' },
      { name: 'Camera 4', punchline: 'Romantica', color: '#f8bbd0' },
      { name: 'Camera ...', punchline: 'Ecologica', color: '#f8bbc' },
    ];

    return (
      <div
        style={{
          margin: '1.5rem 0',
          padding: '1rem',
          background: value?.background || '#f8f9fa',
          border: '1px dashed #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '180px',
            background: '#eee',
            borderRadius: '6px',
            overflow: 'hidden',
            display: 'flex',
            gap: value?.spacing || '0.8rem',
            padding: '0.5rem',
          }}
        >
          {fakeRooms.map((room, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: '140px',
                height: '100%',
                borderRadius: '6px',
                overflow: 'hidden',
                background: room.color,
                position: 'relative',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              {/* Simulation image avec couleur */}
              <div style={{ width: '100%', height: '70%', background: room.color }} />

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '0.6rem',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  fontSize: '0.8rem',
                }}
              >
                {showName && <div style={{ fontWeight: 600 }}>{room.name}</div>}
                {showPunch && (
                  <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>{room.punchline}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Infos clés en bas */}
        <div
          style={{
            marginTop: '0.8rem',
            fontSize: '0.85rem',
            color: '#666',
            textAlign: 'center',
          }}
        >
          {lang.toUpperCase()} • Vel: {value?.speed || 40000}ms
        </div>
      </div>
    );
  },
});
