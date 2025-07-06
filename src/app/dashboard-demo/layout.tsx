import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, Settings, CreditCard, Home, ArrowLeft } from "lucide-react"

export default function DashboardDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50/40 dark:bg-gray-900/40">
        <div className="flex h-full flex-col">
          <div className="p-4">
            <Link href="/dashboard-demo" className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6" />
              <span className="font-bold">AI ChatBot</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            <Link href="/dashboard-demo">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard-demo/chat">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>
            <Link href="/dashboard-demo/billing">
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
            </Link>
            <Link href="/dashboard-demo/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>

          <div className="border-t p-4 space-y-4">
            <div className="rounded-lg bg-orange-50 dark:bg-orange-900/20 p-3">
              <p className="text-xs font-medium text-orange-800 dark:text-orange-200">Demo Mode</p>
              <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                This is a preview. Sign up to access all features.
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">demo@example.com</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pro Plan (Demo)</p>
            </div>
            
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}