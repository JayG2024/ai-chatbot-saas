"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  ArrowRight, 
  MessageSquare, 
  Clock, 
  Zap, 
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  Sparkles,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"
import { format, subDays, startOfMonth } from "date-fns"

// Mock data for charts
const generateUsageData = () => {
  const data = []
  for (let i = 29; i >= 0; i--) {
    data.push({
      date: format(subDays(new Date(), i), 'MMM dd'),
      messages: Math.floor(Math.random() * 50) + 10,
      tokens: Math.floor(Math.random() * 5000) + 1000,
    })
  }
  return data
}

const modelUsageData = [
  { name: 'GPT-4', value: 45, color: '#8b5cf6' },
  { name: 'GPT-3.5', value: 30, color: '#3b82f6' },
  { name: 'Claude 3', value: 25, color: '#10b981' },
]

const recentActivity = [
  { id: 1, type: 'chat', title: 'Marketing Campaign Ideas', time: '5 minutes ago', model: 'GPT-4' },
  { id: 2, type: 'chat', title: 'Code Review Assistant', time: '1 hour ago', model: 'Claude 3' },
  { id: 3, type: 'chat', title: 'Customer Support Draft', time: '3 hours ago', model: 'GPT-3.5' },
  { id: 4, type: 'chat', title: 'Product Description', time: '5 hours ago', model: 'GPT-4' },
]

export default function DashboardDemoPage() {
  const [usageData, setUsageData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setUsageData(generateUsageData())
      setIsLoading(false)
    }, 500)
  }, [])

  // Mock user data
  const profile = {
    email: "demo@example.com",
    subscription_status: "pro",
    full_name: "Demo User"
  }

  const stats = {
    totalConversations: 42,
    monthlyMessages: 847,
    tokensUsed: 125439,
    avgResponseTime: "1.2s"
  }

  const monthlyLimit = profile.subscription_status === "free" ? 100 : null
  const messagePercentage = monthlyLimit ? (stats.monthlyMessages / monthlyLimit) * 100 : 0

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile.full_name || 'there'}!</h1>
          <p className="text-muted-foreground">Here's an overview of your AI assistant usage</p>
        </div>
        <Link href="/demo">
          <Button size="lg" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            New Chat
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages This Month</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.monthlyMessages}
              {monthlyLimit && (
                <span className="text-sm font-normal text-muted-foreground"> / {monthlyLimit}</span>
              )}
            </div>
            {monthlyLimit && (
              <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                <div 
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min(messagePercentage, 100)}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Used</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.tokensUsed / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">
              Across all models
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">15%</span> faster than average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Usage Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Daily message count over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorMessages)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Usage */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Model Usage</CardTitle>
            <CardDescription>Distribution across AI models</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={modelUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {modelUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Plan Info */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
            <CardDescription>Your latest AI interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="secondary">{activity.model}</Badge>
              </div>
            ))}
            <Link href="/demo">
              <Button variant="outline" className="w-full">View All Conversations</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Your Plan</CardTitle>
            <CardDescription>Current subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold capitalize">{profile.subscription_status} Plan</span>
                </div>
                <Badge>{profile.subscription_status === 'pro' ? 'Active' : 'Limited'}</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Unlimited messages</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Access to all AI models</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>API access</span>
                </div>
              </div>

              <Link href="/signup">
                <Button className="w-full">Get Started Free</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/demo">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Zap className="mr-2 h-4 w-4" />
              API Settings
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Clock className="mr-2 h-4 w-4" />
              Chat History
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Users className="mr-2 h-4 w-4" />
              Team Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}