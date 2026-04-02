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

  // Ultra-short responses for pure greetings/acknowledgments only
  const isSimpleQuery =
    /^(hi|hey|hello|thanks|thank you|ok|okay|cool|nice|good|great|awesome|bye|goodbye|yo|sup|what's up|whatsup)\.?!?$/i.test(
      lastUserMessage.trim()
    );

  if (isSimpleQuery) {
    return 80; // Enough for a friendly one-liner
  }

  // Navigation requests need room for the marker AND a real answer
  const isNavigation =
    /(go to|show|open|navigate|take me to|visit|see|check|view)\s+(the\s+)?(docs|documentation|pricing|price|prices|ecosystem|roadmap|about|products|showcase|home|homepage)/i.test(
      lastUserMessage
    ) ||
    /\b(docs|documentation|pricing|ecosystem|roadmap|about|products|showcase|home)\s+(page|section|info|information)/i.test(
      lastUserMessage
    );

  // Navigation + follow-up question combo — needs most room
  if (isNavigation && / and /i.test(lastUserMessage)) {
    return 600; // Navigate AND explain
  }

  if (isNavigation) {
    return 200; // Plenty of room for marker + short confirmation
  }

  // Short responses for basic questions
  const isBasicQuestion =
    /^(what|who|when|where|why|how|is|are|can|do|does|will)\s+.{1,50}$/i.test(lastUserMessage.trim());

  if (isBasicQuestion && lastUserMessage.length < 50) {
    return 250; // Enough for a clear, complete short answer
  }

  // Detailed responses for product/ecosystem queries
  const needsDepth =
    /sentinel|aegis|ecosystem|roadmap|history|about|founder|creator|product|mobile|cloud|teams|cli|studio|edge|nexus|forge|argus|oracle|proteus|aletheia|iatros|janus|feature|workflow|academic|paraphras|chatbot|research|study|compare|overview|details|explain|list|pricing|install|download|how to|tutorial|guide/.test(
      lastUserMessage
    );

  return needsDepth ? 500 : 300;
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

  return withoutInitialGreeting.slice(-6);
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
          temperature: 0.3,
          topP: 0.95,
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
