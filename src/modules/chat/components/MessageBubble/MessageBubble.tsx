import type { MessageRole } from '../../types/chat';
import styles from './MessageBubble.module.css';

export interface MessageBubbleProps {
  role: MessageRole;
  text: string;
}

export function MessageBubble({ role, text }: MessageBubbleProps) {
  const isUser = role === 'user';
  const rowClassName = [styles.row, isUser ? styles.userRow : styles.assistantRow].join(' ');
  const bubbleClassName = [styles.bubble, isUser ? styles.userBubble : styles.assistantBubble].join(
    ' ',
  );

  return (
    <div className={rowClassName}>
      {!isUser && <span className={styles.avatar} aria-hidden="true" />}
      <div className={bubbleClassName}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}
