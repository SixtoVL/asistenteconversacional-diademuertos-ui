import { useState } from 'react';
import { Composer } from '../Composer/Composer';
import { SuggestionChips } from '../SuggestionChips/SuggestionChips';
import styles from './EmptyState.module.css';

const SUGGESTIONS = [
  '¿Qué significa la flor de cempasúchil?',
  '¿Cómo preparo una ofrenda tradicional?',
  '¿Cuál es el origen del Día de Muertos?',
  '¿Qué elementos no pueden faltar en la ofrenda?',
];

export function EmptyState() {
  const [draft, setDraft] = useState('');

  const handleSubmit = (): void => {
    // TODO: enviar el mensaje e iniciar la conversación (siguiente incremento).
  };

  return (
    <div className={styles.empty}>
      <h1 className={styles.greeting}>¿En qué te puedo ayudar?</h1>
      <p className={styles.sub}>
        Pregúntame sobre la historia, las tradiciones y las ofrendas del Día de Muertos.
      </p>
      <div className={styles.composerWrap}>
        <Composer value={draft} onChange={setDraft} onSubmit={handleSubmit} autoFocus />
      </div>
      <SuggestionChips suggestions={SUGGESTIONS} onSelect={setDraft} />
    </div>
  );
}
