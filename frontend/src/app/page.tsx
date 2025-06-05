import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to admin dashboard or login page
  // redirect("/admin/dashboard")
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Admin Dashboard</h1>
    </div>
  )
}

