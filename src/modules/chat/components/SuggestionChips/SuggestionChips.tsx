import styles from './SuggestionChips.module.css';

export interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className={styles.chips} role="group" aria-label="Preguntas sugeridas">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          className={styles.chip}
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
