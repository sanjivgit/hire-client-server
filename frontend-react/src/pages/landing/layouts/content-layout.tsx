import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Wrench } from "lucide-react"

interface ContentLayoutProps {
    children: React.ReactNode
    title: string
    showBackButton?: boolean
}

export function ContentLayout({ children, title, showBackButton = true }: ContentLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b">
                <a className="flex items-center justify-center" href="/">
                    <Wrench className="h-6 w-6 text-blue-600" />
                    <span className="ml-2 text-xl font-bold">ServiceHub</span>
                </a>
                {showBackButton && (
                    <nav className="ml-auto">
                        <Button variant="ghost" asChild>
                            <a href="/">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </a>
                        </Button>
                    </nav>
                )}
            </header>

            <main className="flex-1 container px-4 md:px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8">{title}</h1>
                    {children}
                </div>
            </main>

            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">ServiceHub</span>
                </div>
                {/* <p className="text-xs text-gray-600 sm:ml-4">© 2024 ServiceHub. All rights reserved.</p> */}
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a className="text-xs hover:underline underline-offset-4" href="/terms-and-conditions">
                        Terms of Service
                    </a>
                    <a className="text-xs hover:underline underline-offset-4" href="/privacy-policy">
                        Privacy Policy
                    </a>
                    <a className="text-xs hover:underline underline-offset-4" href="/contact">
                        Contact
                    </a>
                </nav>
            </footer>
        </div>
    )
}
