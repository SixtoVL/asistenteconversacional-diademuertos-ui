import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>Asistente del Día de Muertos</p>
        <p className={styles.note}>Contenido con fines culturales y educativos.</p>
        <p className={styles.copy}>© 2026 · Hecho con respeto por las tradiciones mexicanas</p>
      </div>
    </footer>
  );
}
