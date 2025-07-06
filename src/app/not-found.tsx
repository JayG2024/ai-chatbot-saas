import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <Link href="/">
        <Button>
          Go back home
        </Button>
      </Link>
    </div>
  )
}