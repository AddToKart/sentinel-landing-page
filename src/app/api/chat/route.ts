import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { AEGIS_SYSTEM_PROMPT, INITIAL_AEGIS_MESSAGE } from '@/lib/aegis-knowledge';

// NVIDIA exposes an OpenAI-compatible endpoint.
// Keep the base URL at /v1 and use provider/model IDs as the model names.
// Requires NVIDIA_API_KEY in your .env.local file.

const apiKey = process.env.NVIDIA_API_KEY || '';
const baseURL = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';

interface ModelConfig {
  id: string;
  description: string;
}

interface ProviderErrorShape {
  statusCode?: number;
  response?: {
    status?: number;
  };
  data?: {
    error?: {
      code?: number | string;
    };
  };
  message?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const MODELS: ModelConfig[] = [
  {
    id: 'mistralai/mixtral-8x7b-instruct-v0.1',
    description: 'Mixtral 8x7B Instruct',
  },
  {
    id: 'meta/llama-3.1-70b-instruct',
    description: 'Llama 3.1 70B Instruct',
  },
  {
    id: 'meta/llama-3.1-405b-instruct',
    description: 'Llama 3.1 405B Instruct',
  },
];

export const runtime = 'edge';

function getStatus(error: ProviderErrorShape | undefined) {
  return Number(error?.statusCode ?? error?.response?.status ?? error?.data?.error?.code);
}

function getMaxTokens(messages: ChatMessage[]) {
  const lastUserMessage =
    [...messages].reverse().find(message => message.role === 'user')?.content.toLowerCase() ?? '';

  const needsDepth =
    /sentinel|aegis|ecosystem|roadmap|history|about|founder|creator|product|mobile|cloud|teams|cli|studio|edge|nexus|forge|feature|workflow|academic|paraphras|chatbot|research|study|compare|overview|details|explain|list/.test(
      lastUserMessage
    );

  return needsDepth ? 200 : 120;
}

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  const isChatRole = (role: unknown): role is ChatMessage['role'] =>
    role === 'user' || role === 'assistant' || role === 'system';

  const normalized = messages
    .filter((message): message is { role?: unknown; content?: unknown } => typeof message === 'object' && message !== null)
    .map(message => {
      const role = isChatRole(message.role) ? message.role : null;
      const content = typeof message.content === 'string' ? message.content : '';

      if (!role || content.trim().length === 0) {
        return null;
      }

      return { role, content };
    })
    .filter((message): message is ChatMessage => message !== null);

  const withoutInitialGreeting = normalized.filter(
    message =>
      !(message.role === 'assistant' && message.content.trim() === INITIAL_AEGIS_MESSAGE)
  );

  return withoutInitialGreeting.slice(-16);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const normalizedMessages = normalizeMessages(messages);

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'Missing NVIDIA_API_KEY environment variable. Get a free key at https://build.nvidia.com/',
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const provider = createOpenAI({
      baseURL,
      apiKey,
    });

    let lastError: unknown = null;

    for (const config of MODELS) {
      try {
        const result = await streamText({
          model: provider.chat(config.id),
          messages: normalizedMessages,
          system: AEGIS_SYSTEM_PROMPT,
          maxTokens: getMaxTokens(normalizedMessages),
          temperature: 0.2,
          topP: 0.9,
        });

        return result.toDataStreamResponse();
      } catch (error: unknown) {
        lastError = error;
        const status = getStatus(error as ProviderErrorShape);

        // Missing/retired models, rate limits, and transient upstream failures can fall back.
        if (status === 404 || status === 429 || (status >= 500 && status < 600)) {
          console.warn(`Model ${config.description} failed (${status}), trying next...`);
          continue;
        }

        throw error;
      }
    }

    throw lastError;
  } catch (error: unknown) {
    console.error('Aegis Chat Error:', error);

    const normalizedError = error as ProviderErrorShape;
    const status = getStatus(normalizedError);

    if (status === 429) {
      return new Response(
        JSON.stringify({
          error: 'All models are currently rate-limited. Please wait a moment and try again.',
          retryable: true,
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        error: normalizedError.message || 'An error occurred during the conversation with Aegis.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
