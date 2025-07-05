import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const fullName = String(formData.get('fullName'))
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/signup?error=${encodeURIComponent(error.message)}`,
      {
        status: 301,
      }
    )
  }

  // Create profile
  if (data.user) {
    await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName,
      })
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Check your email to verify your account`,
    {
      status: 301,
    }
  )
}