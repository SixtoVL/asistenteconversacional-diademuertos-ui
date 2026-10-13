// TODO: obtener el catálogo desde el backend cuando exista el contrato API.
// Solo se mostrarán los proveedores/modelos habilitados y la selección se validará en servidor.

export interface LlmModelOption {
  id: string;
  label: string;
}

export interface LlmProviderOption {
  id: string;
  label: string;
  models: LlmModelOption[];
}

export const LLM_PROVIDERS: LlmProviderOption[] = [
  {
    id: 'gemini',
    label: 'Gemini',
    models: [
      { id: 'gemini-2.0-flash', label: '2.0 Flash' },
      { id: 'gemini-1.5-flash', label: '1.5 Flash' },
    ],
  },
  {
    id: 'openai',
    label: 'OpenAI',
    models: [{ id: 'gpt-4o-mini', label: 'GPT-4o mini' }],
  },
  {
    id: 'groq',
    label: 'Groq',
    models: [{ id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' }],
  },
];

export function getProvider(providerId: string): LlmProviderOption {
  return LLM_PROVIDERS.find((provider) => provider.id === providerId) ?? LLM_PROVIDERS[0];
}

export function getDefaultModelId(providerId: string): string {
  return getProvider(providerId).models[0].id;
}
