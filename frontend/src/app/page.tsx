'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Use absolute path with domain for Windows compatibility
    window.location.href = '/admin/dashboard/'
  }, [])

  return <div>Redirecting to dashboard...</div>
}

