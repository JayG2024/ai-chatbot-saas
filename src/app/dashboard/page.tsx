import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MessageSquare, Clock, Zap } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get user stats
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single()

  const { data: conversations } = await supabase
    .from("conversations")
    .select("id")
    .eq("user_id", user!.id)

  const { data: messages } = await supabase
    .from("messages")
    .select("id")
    .eq("user_id", user!.id)

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count: monthlyMessages } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .gte("created_at", startOfMonth.toISOString())

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Link href="/dashboard/chat">
          <Button>
            Start New Chat
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Total Conversations</h3>
          </div>
          <p className="text-2xl font-bold">{conversations?.length || 0}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Messages This Month</h3>
          </div>
          <p className="text-2xl font-bold">
            {monthlyMessages || 0}
            {profile?.subscription_status === "free" && (
              <span className="text-sm text-muted-foreground"> / 100</span>
            )}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Current Plan</h3>
          </div>
          <p className="text-2xl font-bold capitalize">{profile?.subscription_status || "Free"}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Total Messages</h3>
          </div>
          <p className="text-2xl font-bold">{messages?.length || 0}</p>
        </div>
      </div>

      {/* Upgrade CTA for free users */}
      {profile?.subscription_status === "free" && (
        <div className="rounded-lg bg-primary/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Upgrade to Pro</h3>
              <p className="text-sm text-muted-foreground">
                Get unlimited messages, access to all AI models, and priority support
              </p>
            </div>
            <Link href="/dashboard/billing">
              <Button>Upgrade Now</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Recent Conversations */}
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
          <div className="text-sm text-muted-foreground">
            Your recent conversations will appear here
          </div>
        </div>
      </div>
    </div>
  )
}