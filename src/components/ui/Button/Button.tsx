import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const combinedClassName = [
    styles.button,
    styles[variant],
    isLoading ? styles.loading : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClassName} disabled={disabled || isLoading} {...props}>
      {isLoading ? <span className={styles.spinner} /> : children}
    </button>
  );
}
