import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, className, ...props }: InputProps) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const combinedClassName = [styles.input, className ?? ''].filter(Boolean).join(' ');

  if (!label) {
    return <input id={inputId} className={combinedClassName} {...props} />;
  }

  return (
    <label className={styles.wrapper} htmlFor={inputId}>
      <span className={styles.label}>{label}</span>
      <input id={inputId} className={combinedClassName} {...props} />
    </label>
  );
}
