import { useEffect, useRef, useState } from 'react';
import { ChatHeader } from '../components/ChatHeader/ChatHeader';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { MessageBubble } from '../components/MessageBubble/MessageBubble';
import { Composer } from '../components/Composer/Composer';
import { EmptyState } from '../components/EmptyState/EmptyState';
import type { ChatMessage } from '../types/chat';
import styles from './ChatView.module.css';

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    role: 'assistant',
    text: '¡Hola! Soy tu asistente del Día de Muertos. Puedo contarte sobre la historia, las tradiciones y el significado de las ofrendas. ¿Por dónde empezamos?',
  },
  {
    id: 'm2',
    role: 'user',
    text: '¿Qué significa la flor de cempasúchil en la ofrenda?',
  },
  {
    id: 'm3',
    role: 'assistant',
    text: 'La flor de cempasúchil es uno de los símbolos más representativos de la ofrenda. Su color naranja intenso y su aroma sirven para guiar a las almas en su camino de regreso el 1 y 2 de noviembre. Con sus pétalos se trazan caminos desde la entrada hasta el altar.',
  },
];

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [draft, setDraft] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  const handleNewChat = (): void => {
    setMessages([]);
    setDraft('');
    setSidebarOpen(false);
  };

  const handleSubmit = (): void => {
    // TODO: enviar el mensaje y actualizar la conversación (siguiente incremento).
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
                {messages.map((message) => (
                  <MessageBubble key={message.id} role={message.role} text={message.text} />
                ))}
                <div ref={bottomRef} />
              </div>
            </main>
            <div className={styles.inputBar}>
              <div className={styles.inputInner}>
                <Composer value={draft} onChange={setDraft} onSubmit={handleSubmit} />
                <p className={styles.disclaimer}>
                  El asistente puede cometer errores. El conocimiento proviene de fuentes
                  culturales verificadas.
                </p>
              </div>
            </div>
          </>
        ) : (
          <main className={styles.emptyMain}>
            <EmptyState />
          </main>
        )}
      </div>
    </div>
  );
}
