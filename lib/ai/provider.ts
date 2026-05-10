export type AIModelProvider = 'openai' | 'google' | 'anthropic' | 'local'

export interface AICompletionOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

export interface AIResponse {
  content: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export abstract class AIProvider {
  abstract name: string
  abstract generateCompletion(prompt: string, options?: AICompletionOptions): Promise<AIResponse>
  abstract generateStream(prompt: string, options?: AICompletionOptions): Promise<ReadableStream>
}

// Shell for OpenAI Provider
export class OpenAIProvider extends AIProvider {
  name = 'openai'
  async generateCompletion(prompt: string, options?: AICompletionOptions): Promise<AIResponse> {
    console.log(`[AI:OpenAI] Processing prompt: ${prompt.substring(0, 50)}...`)
    return {
      content: "This is a mock AI response from OpenAI.",
      usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 }
    }
  }
  async generateStream(prompt: string, options?: AICompletionOptions): Promise<ReadableStream> {
    return new ReadableStream({
      start(controller) {
        controller.enqueue("Streaming mock response...")
        controller.close()
      }
    })
  }
}

// Factory to get provider
export const getAIProvider = (provider: AIModelProvider = 'openai'): AIProvider => {
  switch (provider) {
    case 'openai': return new OpenAIProvider()
    default: return new OpenAIProvider()
  }
}
