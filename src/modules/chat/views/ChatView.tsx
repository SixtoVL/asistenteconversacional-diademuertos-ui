import { useEffect, useRef, useState } from 'react';
import { useChatSettings } from '../../../context/ChatSettingsContext';
import { ChatHeader } from '../components/ChatHeader/ChatHeader';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { MessageBubble } from '../components/MessageBubble/MessageBubble';
import { Composer } from '../components/Composer/Composer';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { OpcionesMensaje } from '../components/OpcionesMensaje/OpcionesMensaje';
import { Escribiendo } from '../components/Escribiendo/Escribiendo';
import { FuentesRespuesta } from '../components/FuentesRespuesta/FuentesRespuesta';
import type { ChatMessage } from '../types/chat';
import { enviarMensaje } from '../services/chatService';
import styles from './ChatView.module.css';

function nextId(): string {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const AVISO_LLM =
  'El modo con modelo de lenguaje todavía no está conectado (fase 2). ' +
  'Cambia a modo experto para conversar con la base de conocimientos verificada.';

export function ChatView() {
  const settings = useChatSettings();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, isLoading]);

  const handleNewChat = (): void => {
    setMessages([]);
    setDraft('');
    setSidebarOpen(false);
  };

  const handleEnviar = async (texto: string): Promise<void> => {
    const limpio = texto.trim();
    if (limpio.length === 0 || isLoading) {
      return;
    }
    const userMessage: ChatMessage = { id: nextId(), role: 'user', text: limpio };
    const historial = [...messages, userMessage];
    setMessages(historial);
    setDraft('');

    if (settings.mode === 'llm') {
      setMessages([
        ...historial,
        { id: nextId(), role: 'assistant', text: AVISO_LLM },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      const respuesta = await enviarMensaje(historial, {
        mode: settings.mode,
        providerId: settings.providerId,
        modelId: settings.modelId,
      });
      const assistantMessage: ChatMessage =
        respuesta.type === 'texto'
          ? {
              id: nextId(),
              role: 'assistant',
              text: respuesta.texto,
              fuentes: (respuesta.fuentes ?? []).map((f) => f.titulo),
            }
          : respuesta.type === 'pregunta_guiada'
            ? {
                id: nextId(),
                role: 'assistant',
                text: respuesta.texto,
                opciones: respuesta.opciones,
              }
            : respuesta.type === 'resultado_se'
              ? {
                  id: nextId(),
                  role: 'assistant',
                  text: `${respuesta.titulo}\n\n${respuesta.detalle}`,
                  fuentes: (respuesta.fuentes ?? []).map((f) => f.titulo),
                }
              : {
                  id: nextId(),
                  role: 'assistant',
                  text: `Error (${respuesta.codigo}): ${respuesta.mensaje}`,
                };
      setMessages([...historial, assistantMessage]);
    } catch {
      setMessages([
        ...historial,
        {
          id: nextId(),
          role: 'assistant',
          text: 'No se pudo conectar con el servidor. Verifica que el backend esté en marcha e inténtalo de nuevo.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (): void => {
    void handleEnviar(draft);
  };

  const handleElegir = (etiqueta: string): void => {
    void handleEnviar(etiqueta);
  };

  const hasConversation = messages.length > 0;

  return (
    <div className={styles.shell}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />
      <div className={styles.main}>
        <ChatHeader onMenuClick={() => setSidebarOpen(true)} />
        {hasConversation ? (
          <>
            <main className={styles.conversation}>
              <div
                className={styles.messageList}
                role="log"
                aria-label="Conversación"
                aria-live="polite"
              >
                {messages.map((message, index) => {
                  const esUltimo = index === messages.length - 1;
                  if (message.role === 'assistant' && message.opciones) {
                    return (
                      <OpcionesMensaje
                        key={message.id}
                        texto={message.text}
                        opciones={message.opciones}
                        onElegir={handleElegir}
                        deshabilitado={isLoading || !esUltimo}
                      />
                    );
                  }
                  return (
                    <div key={message.id}>
                      <MessageBubble role={message.role} text={message.text} />
                      {message.role === 'assistant' && message.fuentes && (
                        <FuentesRespuesta fuentes={message.fuentes} />
                      )}
                    </div>
                  );
                })}
                {isLoading && <Escribiendo />}
                <div ref={bottomRef} />
              </div>
            </main>
            <div className={styles.inputBar}>
              <div className={styles.inputInner}>
                <Composer
                  value={draft}
                  onChange={setDraft}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
                <p className={styles.disclaimer}>
                  El asistente puede cometer errores. El conocimiento proviene de fuentes
                  culturales verificadas.
                </p>
              </div>
            </div>
          </>
        ) : (
          <main className={styles.emptyMain}>
            <EmptyState onEnviar={handleEnviar} />
          </main>
        )}
      </div>
    </div>
  );
}
