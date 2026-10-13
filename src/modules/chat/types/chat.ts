export type MessageRole = 'user' | 'assistant';

export interface OpcionChat {
  id: string;
  etiqueta: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  fuentes?: string[];
  opciones?: OpcionChat[];
}
