import styles from './Escribiendo.module.css';

export function Escribiendo() {
  return (
    <div className={styles.fila} role="status" aria-label="El asistente está escribiendo">
      <span className={styles.avatar} aria-hidden="true" />
      <div className={styles.burbuja} aria-hidden="true">
        <span className={styles.punto} />
        <span className={styles.punto} />
        <span className={styles.punto} />
      </div>
    </div>
  );
}
