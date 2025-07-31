import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Home, Wrench } from "lucide-react"

const services = [
    {
        icon: Zap,
        title: "Electrical Services",
        description: "Expert electricians for all your electrical needs",
        features: ["Wiring & Installation", "Repairs & Maintenance", "Emergency Services"],
        color: "text-yellow-500",
    },
    {
        icon: Home,
        title: "House Cleaning",
        description: "Professional maids and cleaning services",
        features: ["Regular Cleaning", "Deep Cleaning", "Move-in/Move-out"],
        color: "text-pink-500",
    },
    {
        icon: Wrench,
        title: "Plumbing",
        description: "Expert plumbers for repairs and installations",
        features: ["Pipe Repairs", "Fixture Installation", "24/7 Emergency"],
        color: "text-blue-500",
    },
]

export function ServicesSection() {
    return (
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
            <div className="px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Popular Services</h2>
                        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            From home repairs to personal care, find the right professional for every need.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    {services.map((service, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="text-center">
                                <service.icon className={`h-12 w-12 mx-auto ${service.color}`} />
                                <CardTitle>{service.title}</CardTitle>
                                <CardDescription>{service.description}</CardDescription>
                            </CardHeader>
                            {/* <CardContent>
                                <ul className="space-y-2 text-sm">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent> */}
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center">
                    <Button variant="outline" size="lg">
                        <a className="flex items-center" href="https://play.google.com/store/apps/details?id=com.ridhi.solution">
                            View All Services <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
