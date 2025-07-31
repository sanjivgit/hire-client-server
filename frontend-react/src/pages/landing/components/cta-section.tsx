import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export function CustomerCTASection() {
    return (
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
            <div className="px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Need a Service Provider?</h2>
                        <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Join thousands of satisfied customers. Register now with your phone number and get started.
                        </p>
                    </div>
                    <div className="w-full max-w-sm space-y-2">
                        <Button asChild size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                            <a href="https://play.google.com/store/apps/details?id=com.ridhi.solution"> Register Now - It's Free! </a>
                        </Button>
                        <p className="text-xs text-blue-200">
                            By registering, you agree to our{" "}
                            <a href="/terms-and-conditions" className="underline underline-offset-2">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy-policy" className="underline underline-offset-2">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function ProviderCTASection() {
    const benefits = ["Get more customers", "Flexible working hours", "Build your reputation"]

    return (
        <section id="join-provider" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="w-fit bg-green-100 text-green-800">
                                For Service Providers
                            </Badge>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Grow Your Business with Us</h2>
                            <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Join our platform and connect with customers in your area. Increase your income and build your
                                reputation.
                            </p>
                        </div>
                        <ul className="grid gap-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                        <Button asChild size="lg" className="w-fit bg-green-600 hover:bg-green-700">
                            <a href="https://play.google.com/store/apps/details?id=com.ridhi.solution"> Join as Service Provider </a>
                        </Button>
                    </div>
                    {/* <div className="flex items-center justify-center">
                        <img
                            alt="Service provider using mobile app"
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
