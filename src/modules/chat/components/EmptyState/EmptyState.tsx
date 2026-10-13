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

export interface EmptyStateProps {
  onEnviar: (texto: string) => void;
}

export function EmptyState({ onEnviar }: EmptyStateProps) {
  const [draft, setDraft] = useState('');

  const handleSubmit = (): void => {
    const limpio = draft.trim();
    if (limpio.length === 0) {
      return;
    }
    onEnviar(limpio);
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
