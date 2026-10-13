import { MessageBubble } from '../MessageBubble/MessageBubble';
import type { OpcionChat } from '../../types/chat';
import styles from './OpcionesMensaje.module.css';

export interface OpcionesMensajeProps {
  texto: string;
  opciones: OpcionChat[];
  onElegir: (etiqueta: string) => void;
  deshabilitado?: boolean;
}

export function OpcionesMensaje({
  texto,
  opciones,
  onElegir,
  deshabilitado = false,
}: OpcionesMensajeProps) {
  return (
    <div className={styles.bloque}>
      <MessageBubble role="assistant" text={texto} />
      <div className={styles.opciones} role="group" aria-label="Opciones de respuesta">
        {opciones.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className={styles.opcion}
            disabled={deshabilitado}
            onClick={() => onElegir(opcion.etiqueta)}
          >
            {opcion.etiqueta}
          </button>
        ))}
      </div>
    </div>
  );
}
