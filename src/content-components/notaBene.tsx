// src/content-components/NotaBene.tsx
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

export const NotaBene = block({
  label: 'Nota Bene',

  schema: {
    title: fields.text({
      label: 'Titre (optionnel)',
      description: 'Ex : "Attention", "Info utiles", "A savoir"',
    }),

    content: fields.text({
      label: 'Contenu du bloc',
      multiline: true,
      validation: { isRequired: true },
      description:
        'Texte du message. Accepte du Markdown simple : **gras**, *italique*, lien [texte](url), ecc.',
    }),

    type: fields.select({
      label: "Type d'alerte",
      options: [
        { label: 'Info (vert)', value: 'info' },
        { label: 'Avis (jaune)', value: 'warning' },
        { label: 'Important (rouge)', value: 'important' },
      ],
      defaultValue: 'info',
    }),

    class: fields.text({
      label: 'Classes CSS supplémentaires (optionnelles)',
    }),
  },

  ContentView: ({ value }: { value: any }) => {
    const title = value?.title || '';
    const content = value?.content || 'Contenuto mancante';
    const type = value?.type || 'info';

    const typeStyles = {
      info: {
        borderColor: '#4a6741', // verde Limolo
        backgroundColor: 'rgba(74, 103, 65, 0.05)',
        textColor: '#4a6741',
      },
      warning: {
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.05)',
        textColor: '#92400e',
      },
      important: {
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.05)',
        textColor: '#7f1d1d',
      },
    };

    const style = typeStyles[type];

    return (
      <div
        style={{
          margin: '1.5rem 0',
          padding: '1.5rem',
          borderLeft: `4px solid ${style.borderColor}`,
          backgroundColor: style.backgroundColor,
          borderRadius: '4px',
          color: style.textColor,
          minHeight: '120px',
          fontSize: '0.95rem',
          lineHeight: '1.6',
        }}
      >
        {title && (
          <h4
            style={{
              fontFamily: 'serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: '0 0 0.75rem',
              color: style.textColor,
            }}
          >
            {title}
          </h4>
        )}

        <div
          style={{
            color: style.textColor,
          }}
          dangerouslySetInnerHTML={{
            __html: content
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/__(.+?)__/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/_(.+?)_/g, '<em>$1</em>')
              .replace(/\\n/g, '<br/>')
              .replace(/\n/g, '<br/>'),
          }}
        />

        {/* Infos config */}
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.85rem',
            color: '#666',
            opacity: 0.8,
            textAlign: 'right',
          }}
        >
          Tipo: {type === 'info' ? 'Info' : type === 'warning' ? 'Avviso' : 'Importante'}
        </div>
      </div>
    );
  },
});
