import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button';
import { ThemeToggle } from '../../../../components/ui/ThemeToggle';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#caracteristicas', label: 'Características' },
  { href: '#como-funciona', label: 'Cómo funciona' },
];

export function Header() {
  const navigate = useNavigate();

  const handleStart = (): void => {
    void navigate('/chat');
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#inicio" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>Día de Muertos</span>
            <span className={styles.brandSubtitle}>Asistente conversacional</span>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
          <Button type="button" onClick={handleStart}>
            Comenzar
          </Button>
        </div>
      </div>
    </header>
  );
}
