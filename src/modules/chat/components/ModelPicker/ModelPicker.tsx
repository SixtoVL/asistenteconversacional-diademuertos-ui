import { useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';
import { LLM_PROVIDERS, getProvider } from '../../../../config/llmCatalog';
import { useChatSettings } from '../../../../context/ChatSettingsContext';
import { Switch } from '../../../../components/ui/Switch';
import styles from './ModelPicker.module.css';

export function ModelPicker() {
  const { mode, providerId, modelId, setMode, setProvider, setModel } = useChatSettings();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);
  useOnClickOutside(rootRef, close, open);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, close]);

  const isLlm = mode === 'llm';
  const provider = getProvider(providerId);
  const modelLabel =
    provider.models.find((model) => model.id === modelId)?.label ?? provider.models[0].label;
  const pillLabel = isLlm ? `${provider.label} · ${modelLabel}` : 'Sistema experto';
  const pillShortLabel = isLlm ? provider.label : 'Experto';

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.pill}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className={styles.pillFull}>{pillLabel}</span>
        <span className={styles.pillShort}>{pillShortLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className={styles.popover} role="dialog" aria-label="Configuración del asistente">
          <Switch
            label="Usar LLM"
            checked={isLlm}
            onChange={(checked) => setMode(checked ? 'llm' : 'experto')}
          />
          <p className={styles.hint}>
            {isLlm
              ? 'El LLM interpreta y redacta; las reglas las decide el sistema experto.'
              : 'Solo sistema experto: sin costo y sin conexión externa.'}
          </p>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Proveedor</span>
            <select
              value={providerId}
              onChange={(event) => setProvider(event.target.value)}
              disabled={!isLlm}
              className={styles.select}
            >
              {LLM_PROVIDERS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Modelo</span>
            <select
              value={modelId}
              onChange={(event) => setModel(event.target.value)}
              disabled={!isLlm}
              className={styles.select}
            >
              {provider.models.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
