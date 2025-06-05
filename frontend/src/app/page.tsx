import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to admin dashboard or login page
  redirect("/admin/dashboard")
}

