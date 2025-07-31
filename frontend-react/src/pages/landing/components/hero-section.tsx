import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="w-fit">
                                Trusted by 10,000+ customers
                            </Badge>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Find Trusted Service Providers Near You
                            </h1>
                            <p className="max-w-[600px] text-gray-600 md:text-xl">
                                Connect with verified electricians, maids, plumbers, and more. Get quality services at your doorstep
                                with just a phone call.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                                <a href="#get-started">
                                    Find Services <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href="#join-provider">Become a Provider</a>
                            </Button>
                        </div>
                    </div>
                    {/* <div className="flex items-center justify-center">
                        <img
                            alt="Service providers at work"
                            className="aspect-video overflow-hidden rounded-xl object-cover"
                            height="400"
                            src="/placeholder.svg?height=400&width=600"
                            width="600"
                        />
                    </div> */}
                </div>
            </div>
        </section>
    )
}
