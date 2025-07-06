import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <MessageSquare className="h-8 w-8" />
            <span className="text-2xl font-bold">AI ChatBot SaaS</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              sign in to existing account
            </Link>
          </p>
        </div>

        {params?.error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-sm text-red-800 dark:text-red-200">
              {params.error}
            </p>
          </div>
        )}

        <form className="mt-8 space-y-6" action="/api/auth/signup" method="POST">
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Create a password (min 6 characters)"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm">
              I agree to the{" "}
              <Link href="/terms" className="font-medium text-primary hover:text-primary/80">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-medium text-primary hover:text-primary/80">
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          By signing up, you get 100 free messages per month. No credit card required.
        </div>
      </div>
    </div>
  )
}