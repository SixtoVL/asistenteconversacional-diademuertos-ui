import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../../../components/ui/ThemeToggle';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const RECENT_CHATS = [
  { id: 'r1', title: 'Significado del cempasúchil' },
  { id: 'r2', title: 'Ofrenda para niños' },
  { id: 'r3', title: 'Historia del Día de Muertos' },
];

export function Sidebar({ open, onClose, onNewChat }: SidebarProps) {
  const asideClassName = [styles.sidebar, open ? styles.open : ''].filter(Boolean).join(' ');

  const handleRecentClick = (): void => {
    // TODO: cargar la conversación seleccionada cuando exista historial real.
  };

  return (
    <>
      <button
        type="button"
        className={[styles.overlay, open ? styles.overlayVisible : ''].filter(Boolean).join(' ')}
        onClick={onClose}
        aria-label="Cerrar menú"
        tabIndex={open ? 0 : -1}
      />
      <aside className={asideClassName} aria-label="Historial de chats">
        <div className={styles.top}>
          <button type="button" className={styles.newChat} onClick={onNewChat}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo chat
          </button>
          <button type="button" className={styles.search} title="Buscar chats (próximamente)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Buscar chats
          </button>
        </div>
        <p className={styles.sectionLabel}>Recientes</p>
        <ul className={styles.recentList}>
          {RECENT_CHATS.map((chat) => (
            <li key={chat.id}>
              <button type="button" className={styles.recentItem} onClick={handleRecentClick}>
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className={styles.recentTitle}>{chat.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.bottom}>
          <ThemeToggle />
          <Link to="/" className={styles.homeLink}>
            Volver al inicio
          </Link>
        </div>
      </aside>
    </>
  );
}
