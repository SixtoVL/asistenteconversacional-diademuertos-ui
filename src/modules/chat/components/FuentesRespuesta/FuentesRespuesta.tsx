import { useState } from 'react';
import styles from './FuentesRespuesta.module.css';

export interface FuentesRespuestaProps {
  fuentes: string[];
}

export function FuentesRespuesta({ fuentes }: FuentesRespuestaProps) {
  const [visible, setVisible] = useState(false);

  if (fuentes.length === 0) {
    return null;
  }

  return (
    <div className={styles.contenedor}>
      <button
        type="button"
        className={styles.boton}
        onClick={() => setVisible((prev) => !prev)}
        aria-expanded={visible}
      >
        {visible ? 'Ocultar fuentes' : 'Mostrar fuentes'}
      </button>
      {visible && (
        <ul className={styles.lista}>
          {fuentes.map((fuente) => (
            <li key={fuente} className={styles.item}>
              {fuente}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
