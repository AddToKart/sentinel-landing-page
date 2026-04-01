import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

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
  role: string;
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

const INITIAL_ASSISTANT_MESSAGE =
  "System initialized. I am Aegis, Sentinel's autonomous co-pilot. How can I assist with your orchestration today?";

const SYSTEM_PROMPT =
  'You are Aegis, Sentinel\'s AI copilot. Be concise, technical, and direct. Maintain continuity with prior messages, remember the active topic, and avoid repeating yourself. Prefer clean, natural formatting with short paragraphs, lists only when useful, and minimal markdown noise.';

export const runtime = 'edge';

function getStatus(error: ProviderErrorShape | undefined) {
  return Number(error?.statusCode ?? error?.response?.status ?? error?.data?.error?.code);
}

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  const normalized = messages
    .filter((message): message is { role?: unknown; content?: unknown } => typeof message === 'object' && message !== null)
    .map(message => ({
      role: typeof message.role === 'string' ? message.role : '',
      content: typeof message.content === 'string' ? message.content : '',
    }))
    .filter(message => message.role && message.content.trim().length > 0);

  const withoutInitialGreeting = normalized.filter(
    message =>
      !(message.role === 'assistant' && message.content.trim() === INITIAL_ASSISTANT_MESSAGE)
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
          system: SYSTEM_PROMPT,
          maxTokens: 160,
          temperature: 0.2,
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
