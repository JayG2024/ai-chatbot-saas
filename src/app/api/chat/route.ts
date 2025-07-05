import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { messages, model = 'gpt-3.5-turbo' } = await req.json()

    // Check message limits for free users
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single()

    if (profile?.subscription_status === 'free') {
      // Count messages this month
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString())

      if (count && count >= 100) {
        return new Response('Monthly message limit reached. Please upgrade to Pro.', { 
          status: 429 
        })
      }
    }

    // Select the appropriate model
    let aiModel
    if (model.startsWith('gpt')) {
      aiModel = openai(model)
    } else if (model.startsWith('claude')) {
      aiModel = anthropic(model)
    } else {
      return new Response('Invalid model', { status: 400 })
    }

    // Create conversation if needed
    let conversationId = req.headers.get('x-conversation-id')
    if (!conversationId) {
      const { data: conversation } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: messages[0]?.content.substring(0, 50) || 'New Chat',
          model,
        })
        .select()
        .single()
      
      conversationId = conversation?.id
    }

    // Save user message
    if (conversationId && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          user_id: user.id,
          role: lastMessage.role,
          content: lastMessage.content,
        })
    }

    // Stream the response
    const result = streamText({
      model: aiModel,
      messages,
      async onFinish({ text }) {
        // Save assistant message
        if (conversationId) {
          await supabase
            .from('messages')
            .insert({
              conversation_id: conversationId,
              user_id: user.id,
              role: 'assistant',
              content: text,
            })
        }
      },
    })

    return result.toDataStreamResponse({
      headers: {
        'x-conversation-id': conversationId || '',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}