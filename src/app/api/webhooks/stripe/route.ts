import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')!
  
  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId = session.metadata?.userId
      
      if (userId) {
        await supabase
          .from('profiles')
          .update({
            subscription_status: session.metadata?.plan || 'pro',
            subscription_id: session.subscription as string,
          })
          .eq('id', userId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('subscription_id', subscription.id)
        .single()

      if (profile) {
        const status = subscription.status === 'active' ? 'pro' : 'free'
        await supabase
          .from('profiles')
          .update({ subscription_status: status })
          .eq('id', profile.id)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('subscription_id', subscription.id)
        .single()

      if (profile) {
        await supabase
          .from('profiles')
          .update({ 
            subscription_status: 'free',
            subscription_id: null,
          })
          .eq('id', profile.id)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}