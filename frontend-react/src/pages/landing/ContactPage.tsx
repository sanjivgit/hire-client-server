// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { ContentLayout } from "./layouts/content-layout"

const contactInfo = [
    {
        icon: Phone,
        title: "Phone Support",
        description: "Call us for immediate assistance",
        value: "+91 9625298413",
        note: "Available 24/7 for emergencies",
    },
    {
        icon: Mail,
        title: "Email Support",
        description: "Send us an email anytime",
        value: "kumar.sumankumar3g@gmail.com",
        note: "We'll respond within 24 hours",
    },
    {
        icon: MapPin,
        title: "Office Address",
        description: "Visit us at our office",
        value: "Gidhour\nChatra, Jharkhand 825408\nIndia",
        note: "",
    },
]

// const businessHours = [
//     { day: "Monday - Friday:", hours: "8:00 AM - 8:00 PM" },
//     { day: "Saturday:", hours: "9:00 AM - 6:00 PM" },
//     { day: "Sunday:", hours: "10:00 AM - 4:00 PM" },
// ]

// const faqs = [
//     {
//         question: "How do I register as a customer?",
//         answer:
//             'Simply click "Register Now" on our homepage and provide your phone number for verification. The process takes less than 2 minutes.',
//     },
//     {
//         question: "How do I become a service provider?",
//         answer:
//             'Click "Join as Service Provider" and complete our verification process. You\'ll need to provide credentials, insurance information, and pass a background check.',
//     },
//     {
//         question: "Are service providers insured?",
//         answer:
//             "Yes, all service providers on our platform are required to maintain appropriate insurance and licenses. We verify this information during the registration process.",
//     },
//     {
//         question: "How do payments work?",
//         answer:
//             "Payment terms are agreed upon between you and the service provider. We offer secure payment processing options for your convenience and protection.",
//     },
// ]

export default function ContactPage() {
    return (
        <ContentLayout title="Contact Us">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions or need support? We're here to help. Reach out to us through any of the channels below.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-1">
                    {/* Contact Form */}
                    {/* <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" placeholder="Enter your first name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" placeholder="Enter your last name" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Enter your email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="What is this regarding?" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[120px]" />
                                </div>
                                <Button type="submit" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card> */}

                    {/* Contact Information */}
                    <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6">
                        {contactInfo.map((info, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <info.icon className="h-5 w-5 text-blue-600" />
                                        {info.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-2">{info.description}</p>
                                    <p className="text-lg font-semibold whitespace-pre-line">{info.value}</p>
                                    {info.note && <p className="text-sm text-gray-500">{info.note}</p>}
                                </CardContent>
                            </Card>
                        ))}

                        {/* <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                    Business Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {businessHours.map((schedule, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{schedule.day}</span>
                                            <span className="font-semibold">{schedule.hours}</span>
                                        </div>
                                    ))}
                                    <p className="text-sm text-gray-500 mt-2">Emergency services available 24/7</p>
                                </div>
                            </CardContent>
                        </Card> */}
                    </div>
                </div>

                {/* FAQ Section */}
                {/* <div className="mt-16">
                    <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {faqs.map((faq, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div> */}
            </div>
        </ContentLayout>
    )
}
