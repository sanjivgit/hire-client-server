import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"

export function Header() {
    return (
        <header className="px-4 lg:px-6 h-16 flex items-center border-b">
            <a className="flex items-center justify-center" href="/">
                <Wrench className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-xl font-bold">Ridhi Solution</span>
            </a>
            <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                <a className="text-sm font-medium hover:underline underline-offset-4" href="/admin/dashboard">
                    Admin Dashboard
                </a>
                <a className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
                    How It Works
                </a>
                <a className="text-sm font-medium hover:underline underline-offset-4" href="#services">
                    Services
                </a>
                <a className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
                    Contact
                </a>
                <Button variant="outline" size="sm" asChild>
                    <a href="https://play.google.com/store/apps/details?id=com.ridhi.solution">Join as Provider</a>
                </Button>
            </nav>
        </header>
    )
}
