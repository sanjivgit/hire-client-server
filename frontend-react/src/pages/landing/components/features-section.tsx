import { Shield, Clock, Star } from "lucide-react"

const features = [
    {
        icon: Shield,
        title: "Verified Professionals",
        description: "All service providers are background-checked and verified.",
        color: "text-green-500",
    },
    {
        icon: Clock,
        title: "Quick Response",
        description: "Get connected with providers within minutes of your request.",
        color: "text-blue-500",
    },
    {
        icon: Star,
        title: "Quality Guaranteed",
        description: "Read reviews and ratings from real customers before booking.",
        color: "text-yellow-500",
    },
]

export function FeaturesSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Ridhi Solution?</h2>
                            <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                We make finding reliable service providers safe, easy, and affordable.
                            </p>
                        </div>
                        <ul className="grid gap-6">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <feature.icon className={`h-6 w-6 ${feature.color} mt-1`} />
                                    <div>
                                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className="flex items-center justify-center">
                        <img
                            alt="Happy customer with service provider"
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
