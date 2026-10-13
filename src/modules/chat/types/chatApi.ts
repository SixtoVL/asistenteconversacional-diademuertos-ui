import { z } from 'zod';
import type { LlmMode } from '../../../context/ChatSettingsContext';
import type { ChatMessage, MessageRole } from './chat';

export const fuenteRefSchema = z.object({
  titulo: z.string(),
});

export const chatResponseSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('texto'),
    texto: z.string(),
    fuentes: z.array(fuenteRefSchema).optional(),
  }),
  z.object({
    type: z.literal('pregunta_guiada'),
    texto: z.string(),
    opciones: z.array(z.object({ id: z.string(), etiqueta: z.string() })),
  }),
  z.object({
    type: z.literal('resultado_se'),
    titulo: z.string(),
    detalle: z.string(),
    justificacion: z.string(),
  }),
  z.object({
    type: z.literal('error'),
    codigo: z.string(),
    mensaje: z.string(),
  }),
]);

export type ChatResponse = z.infer<typeof chatResponseSchema>;

export interface AjustesPeticion {
  mode: LlmMode;
  providerId: string;
  modelId: string;
}

export interface ChatApiRequest {
  mensajes: Array<{ rol: 'usuario' | 'asistente'; texto: string }>;
  ajustes: { modo: 'experto' | 'llm'; proveedor: string; modelo: string };
}

const MAX_HISTORY = 20;

function mapRolToBackend(role: MessageRole): 'usuario' | 'asistente' {
  return role === 'user' ? 'usuario' : 'asistente';
}

export function construirPeticion(
  messages: ChatMessage[],
  settings: AjustesPeticion,
): ChatApiRequest {
  return {
    mensajes: messages.slice(-MAX_HISTORY).map((message) => ({
      rol: mapRolToBackend(message.role),
      texto: message.text,
    })),
    ajustes: {
      modo: settings.mode,
      proveedor: settings.providerId,
      modelo: settings.modelId,
    },
  };
}
