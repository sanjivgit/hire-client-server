const stats = [
    { value: "10,000+", label: "Happy Customers", color: "text-blue-600" },
    { value: "2,500+", label: "Service Providers", color: "text-green-600" },
    { value: "50+", label: "Service Categories", color: "text-purple-600" },
    { value: "4.8★", label: "Average Rating", color: "text-orange-600" },
]

export function StatsSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-2">
                            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
