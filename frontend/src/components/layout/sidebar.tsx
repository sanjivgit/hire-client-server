"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, UserCheck, UserX, Settings, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "All Partners",
      href: "/admin/partners",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Assigned Works",
      href: "/admin/partners/assigned-work",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <aside
      className={`bg-background fixed inset-y-0 z-50 flex flex-col border-r transition-all duration-300 ease-in-out ${isSidebarOpen ? "left-0 w-64" : "-left-64 w-64 lg:left-0 lg:w-16"
        }`}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">P</span>
          </div>
          <span className={`font-bold transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
            PartnerAdmin
          </span>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-muted ${pathname === item.href ? "bg-muted font-medium" : ""
                  }`}
              >
                {item.icon}
                <span className={`transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => {
            /* Implement logout */
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/auth/login');
          }}
        >
          <LogOut className="h-5 w-5" />
          <span className={`transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>Logout</span>
        </Button>
      </div>
    </aside>
  )
}

