import type { FormEvent } from 'react';
import styles from './Composer.module.css';

export interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  autoFocus?: boolean;
}

export function Composer({ value, onChange, onSubmit, autoFocus = false }: ComposerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.composer} onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Escribe tu mensaje..."
        aria-label="Escribe tu mensaje"
        autoComplete="off"
        maxLength={2000}
        autoFocus={autoFocus}
        className={styles.field}
      />
      <button
        type="submit"
        className={styles.sendButton}
        aria-label="Enviar mensaje"
        title="Enviar"
        disabled={value.trim().length === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}
