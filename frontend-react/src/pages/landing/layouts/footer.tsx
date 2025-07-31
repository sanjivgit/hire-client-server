import { Wrench } from "lucide-react"

export function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Ridhi Solution</span>
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
    )
}
