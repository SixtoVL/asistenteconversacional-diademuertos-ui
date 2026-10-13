/* eslint-disable react-refresh/only-export-components -- El contexto y el hook conviven con el provider a propósito en este módulo. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LLM_PROVIDERS, getDefaultModelId, getProvider } from '../config/llmCatalog';

export type LlmMode = 'experto' | 'llm';

interface ChatSettings {
  mode: LlmMode;
  providerId: string;
  modelId: string;
}

interface ChatSettingsContextValue extends ChatSettings {
  setMode: (mode: LlmMode) => void;
  setProvider: (providerId: string) => void;
  setModel: (modelId: string) => void;
}

const ChatSettingsContext = createContext<ChatSettingsContextValue | undefined>(undefined);

const STORAGE_KEY = 'dm-chat-settings';
const DEFAULT_PROVIDER_ID = LLM_PROVIDERS[0].id;

const DEFAULTS: ChatSettings = {
  mode: 'experto',
  providerId: DEFAULT_PROVIDER_ID,
  modelId: getDefaultModelId(DEFAULT_PROVIDER_ID),
};

function sanitize(raw: unknown): ChatSettings {
  if (typeof raw !== 'object' || raw === null) {
    return DEFAULTS;
  }
  const candidate = raw as Partial<ChatSettings>;
  const rawProviderId = typeof candidate.providerId === 'string' ? candidate.providerId : '';
  const providerId = LLM_PROVIDERS.some((provider) => provider.id === rawProviderId)
    ? rawProviderId
    : DEFAULT_PROVIDER_ID;
  const provider = getProvider(providerId);
  const rawModelId = typeof candidate.modelId === 'string' ? candidate.modelId : '';
  const modelId = provider.models.some((model) => model.id === rawModelId)
    ? rawModelId
    : provider.models[0].id;
  const mode: LlmMode = candidate.mode === 'llm' ? 'llm' : 'experto';
  return { mode, providerId, modelId };
}

function loadInitialSettings(): ChatSettings {
  if (typeof window === 'undefined') {
    return DEFAULTS;
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULTS;
    }
    return sanitize(JSON.parse(stored));
  } catch {
    return DEFAULTS;
  }
}

export function ChatSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ChatSettings>(loadInitialSettings);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Almacenamiento no disponible; se continúa sin persistencia.
    }
  }, [settings]);

  const setMode = useCallback((mode: LlmMode) => {
    setSettings((prev) => ({ ...prev, mode }));
  }, []);

  const setProvider = useCallback((providerId: string) => {
    setSettings((prev) => ({ ...prev, providerId, modelId: getDefaultModelId(providerId) }));
  }, []);

  const setModel = useCallback((modelId: string) => {
    setSettings((prev) => ({ ...prev, modelId }));
  }, []);

  const value = useMemo<ChatSettingsContextValue>(
    () => ({
      mode: settings.mode,
      providerId: settings.providerId,
      modelId: settings.modelId,
      setMode,
      setProvider,
      setModel,
    }),
    [settings, setMode, setProvider, setModel],
  );

  return <ChatSettingsContext.Provider value={value}>{children}</ChatSettingsContext.Provider>;
}

export function useChatSettings(): ChatSettingsContextValue {
  const context = useContext(ChatSettingsContext);
  if (!context) {
    throw new Error('useChatSettings debe usarse dentro de <ChatSettingsProvider>');
  }
  return context;
}
