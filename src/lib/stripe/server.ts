import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export const PRICES = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '100 messages per month',
      'GPT-3.5 Turbo',
      'Basic chat interface',
      'Email support',
    ],
  },
  pro: {
    id: process.env.STRIPE_PRO_PRICE_ID || 'price_pro',
    name: 'Pro',
    price: 29,
    features: [
      'Unlimited messages',
      'All AI models (GPT-4, Claude 3)',
      'Voice input/output',
      'Custom assistants',
      'API access',
      'Priority support',
    ],
  },
  enterprise: {
    id: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise',
    name: 'Enterprise',
    price: 99,
    features: [
      'Everything in Pro',
      'Custom model fine-tuning',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
      'Team management',
    ],
  },
}