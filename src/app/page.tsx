import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Zap, Shield, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <MessageSquare className="h-6 w-6" />
              <span className="font-bold">AI ChatBot SaaS</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard-demo" className="transition-colors hover:text-foreground/80">
                Dashboard Demo
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
              <Link href="/docs" className="transition-colors hover:text-foreground/80">
                Docs
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center py-24">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Build Intelligent Conversations with AI
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Create powerful AI chatbots using multiple models including GPT-4, Claude 3, and more. 
                Stream responses, add voice capabilities, and scale effortlessly.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/signup">
                <Button size="lg" className="inline-flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container px-4 md:px-6 py-24">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Stream responses in real-time with our optimized infrastructure
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Multiple AI Models</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose from GPT-4, Claude 3, and other leading AI models
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Enterprise Ready</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Built-in authentication, billing, and security features
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t">
          <div className="container px-4 md:px-6 py-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to build your AI chatbot?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of developers building the future of conversational AI
                </p>
              </div>
              <Link href="/signup">
                <Button size="lg" className="inline-flex items-center">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 AI ChatBot SaaS. All rights reserved.
          </p>
          <nav className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}