import { apiClient } from '../../../services/apiClient';
import type { LlmMode } from '../../../context/ChatSettingsContext';
import { chatResponseSchema, construirPeticion } from '../types/chatApi';
import type { ChatMessage } from '../types/chat';
import type { ChatResponse } from '../types/chatApi';

export async function enviarMensaje(
  messages: ChatMessage[],
  settings: { mode: LlmMode; providerId: string; modelId: string },
): Promise<ChatResponse> {
  const body = construirPeticion(messages, settings);
  return apiClient<ChatResponse>('/api/chat', chatResponseSchema, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
