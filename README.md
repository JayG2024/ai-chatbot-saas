# AI ChatBot SaaS

A production-ready AI chatbot platform built with Next.js, Vercel AI SDK, Supabase, and Stripe.

## Features

- 🤖 Multiple AI models (GPT-4, Claude 3, etc.)
- 💬 Real-time streaming responses
- 🔐 Authentication with Supabase
- 💳 Subscription billing with Stripe
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Deployed on Vercel

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **AI**: Vercel AI SDK with OpenAI and Anthropic
- **Database & Auth**: Supabase
- **Payments**: Stripe
- **Real-time**: Pusher
- **Deployment**: Vercel

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-chatbot-saas
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the schema SQL in `supabase/schema.sql` in your Supabase SQL editor
3. Copy your project URL and keys

### 4. Set up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create products and prices for your subscription tiers
3. Set up a webhook endpoint for `/api/webhooks/stripe`
4. Copy your API keys and webhook secret

### 5. Set up Pusher (optional for real-time)

1. Create a Pusher account at [pusher.com](https://pusher.com)
2. Create a new app
3. Copy your credentials

### 6. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your keys:

```bash
cp .env.local.example .env.local
```

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── chat/         # AI chat endpoint
│   │   ├── stripe/       # Stripe endpoints
│   │   └── webhooks/     # Webhook handlers
│   ├── dashboard/        # Protected dashboard pages
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── auth/             # Auth components
│   ├── chat/             # Chat components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utility libraries
│   ├── supabase/         # Supabase clients
│   ├── stripe/           # Stripe configuration
│   └── pusher/           # Pusher configuration
└── types/                 # TypeScript types
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Post-deployment

1. Update your Stripe webhook URL to your production domain
2. Update your Supabase auth settings with your production URL
3. Configure your custom domain (optional)

## Subscription Tiers

- **Free**: 100 messages/month, GPT-3.5 only
- **Pro** ($29/month): Unlimited messages, all AI models, voice support
- **Enterprise** ($99/month): Everything in Pro + custom features

## Contributing

Pull requests are welcome! Please read our contributing guidelines first.

## License

MIT