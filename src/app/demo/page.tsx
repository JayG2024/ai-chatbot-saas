"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Loader2, MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Simulated responses for demo
const demoResponses = [
  "Hello! I'm an AI assistant. This is a demo showing how the chat interface works. Ask me anything!",
  "This chat interface supports streaming responses, multiple AI models, and real-time interaction. In the full version, you can choose between GPT-4, Claude 3, and other models.",
  "The platform includes features like conversation history, user authentication, subscription management with Stripe, and much more!",
  "To get started with the full experience, you'll need to sign up for an account. Free users get 100 messages per month, while Pro users get unlimited access.",
]

export default function DemoPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [responseIndex, setResponseIndex] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const response = demoResponses[responseIndex % demoResponses.length]
    setMessages(prev => [...prev, { role: "assistant", content: response }])
    setResponseIndex(prev => prev + 1)
    setIsLoading(false)
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-lg font-semibold flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Demo Chat
          </h1>
        </div>
        <div className="text-sm text-muted-foreground">
          This is a demo - No API keys required
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium">Welcome to the Demo</p>
            <p className="text-sm mt-2">Try sending a message to see how the chat interface works!</p>
            <p className="text-sm mt-1">This is a simulated demo - no real AI responses.</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-muted px-4 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>

      {/* Sign up prompt */}
      <div className="border-t bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Ready for the real experience?</p>
            <p className="text-xs text-muted-foreground">Sign up to access all features and AI models</p>
          </div>
          <Link href="/signup">
            <Button size="sm">Sign Up Free</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}