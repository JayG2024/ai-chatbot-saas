export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: Date
}

export interface Conversation {
  id: string
  title: string
  model: AIModel
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export type AIModel = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3-opus' | 'claude-3-sonnet' | 'claude-3-haiku'

export interface ChatSettings {
  model: AIModel
  temperature: number
  maxTokens: number
  streamResponse: boolean
}