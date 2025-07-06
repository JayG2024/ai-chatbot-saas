import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, Settings, CreditCard, LogOut, Home } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if Supabase is configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  if (!isSupabaseConfigured) {
    // Redirect to demo dashboard if Supabase not configured
    redirect("/dashboard-demo")
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50/40 dark:bg-gray-900/40">
        <div className="flex h-full flex-col">
          <div className="p-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6" />
              <span className="font-bold">AI ChatBot</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/chat">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>
            <Link href="/dashboard/billing">
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>

          <div className="border-t p-4">
            <div className="mb-4 space-y-1">
              <p className="text-sm font-medium">{profile?.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {profile?.subscription_status === "free" ? "Free Plan" : 
                 profile?.subscription_status === "pro" ? "Pro Plan" : "Enterprise Plan"}
              </p>
            </div>
            <form action="/api/auth/logout" method="POST">
              <Button type="submit" variant="ghost" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}