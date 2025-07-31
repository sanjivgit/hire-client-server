const steps = [
    {
        number: "1",
        title: "Register with Phone",
        description: "Sign up quickly with your phone number. We'll verify your account for security.",
    },
    {
        number: "2",
        title: "Choose Service",
        description: "Browse our verified service and select the one that fits your needs.",
    },
    {
        number: "3",
        title: "Get Service",
        description: "Request the service and get connected with a professional in minutes.",
    },
]

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Getting help is simple. Just follow these three easy steps.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <span className="text-2xl font-bold text-blue-600">{step.number}</span>
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
