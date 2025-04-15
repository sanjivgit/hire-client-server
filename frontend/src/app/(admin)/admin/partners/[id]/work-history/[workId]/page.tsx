"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  User,
  Phone,
  Mail,
  CheckCircle,
  Star,
  Briefcase,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const work = {
  id: "2",
  title: "Office Sanitization",
  status: "active",
  date: "2024-03-05",
  time: "09:00 - 12:00",
  location: "456 Business Park, Delhi",
  earnings: 2500,
  description: "Complete sanitization of office space including desks, meeting rooms, and common areas.",
  specialInstructions: "Use eco-friendly cleaning products. Pay extra attention to high-touch surfaces.",
  safetyMeasures: [
    "Wear protective gear at all times",
    "Use approved disinfectants only",
    "Maintain social distancing when possible",
  ],
}

const partner = {
  id: "1",
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+91 9876543210",
  rating: 4.8,
  totalJobs: 152,
  memberSince: "2023-01-15",
  skills: ["Deep Cleaning", "Sanitization", "Office Cleaning", "Residential Cleaning"],
  certifications: ["Certified Professional Cleaner", "COVID-19 Safety Training"],
}

const user = {
  id: "101",
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 9876543211",
  rating: 4.9,
  totalHires: 23,
  memberSince: "2022-11-01",
}

const partnerFeedback = [
  {
    id: "1",
    userName: "Amit Kumar",
    rating: 5,
    comment: "John did an excellent job sanitizing our office. Very thorough and professional.",
    date: "2024-02-28",
  },
  {
    id: "2",
    userName: "Sneha Patel",
    rating: 4,
    comment: "Good work overall. Arrived on time and completed the job efficiently.",
    date: "2024-02-15",
  },
  {
    id: "3",
    userName: "Rajesh Gupta",
    rating: 5,
    comment: "Exceptional service! John went above and beyond our expectations.",
    date: "2024-01-30",
  },
]

export default function WorkDetailsPage({ params }: { params: { partnerId: string; workId: string } }) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [cancellationReason, setCancellationReason] = useState("")

  const handleCancel = () => {
    if (cancellationReason.trim()) {
      // In a real app, you would call an API to cancel the work
      console.log("Cancelling work:", params.workId, "Reason:", cancellationReason)
      setShowCancelDialog(false)
      setCancellationReason("")
    }
  }

  const handleComplete = () => {
    // In a real app, you would call an API to mark the work as completed
    console.log("Marking work as completed:", params.workId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/partners/${params.partnerId}/work-history`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{work.title}</h1>
          <p className="text-muted-foreground">Work details and management</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Work Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  work.status === "completed"
                    ? "default"
                    : work.status === "active"
                      ? "secondary"
                      : work.status === "pending"
                        ? "outline"
                        : "destructive"
                }
              >
                {work.status.charAt(0).toUpperCase() + work.status.slice(1)}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{work.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{work.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{work.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>₹{work.earnings.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="text-sm text-muted-foreground">{work.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Special Instructions</h3>
              <p className="text-sm text-muted-foreground">{work.specialInstructions}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Safety Measures</h3>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                {work.safetyMeasures.map((measure, index) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">
                  {partner.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">Partner ID: {partner.id}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{partner.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{partner.phone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{partner.rating} / 5</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{partner.totalJobs} jobs completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since {new Date(partner.memberSince).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {partner.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {partner.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{user.rating} / 5</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{user.totalHires} total hires</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since {new Date(user.memberSince).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="metrics">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
              <TabsTrigger value="feedback">User Feedback</TabsTrigger>
            </TabsList>
            <TabsContent value="metrics" className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Partner Performance</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Job Completion Rate</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span>On-Time Arrival Rate</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">User Hiring History</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Positive Feedback Rate</span>
                    <span className="font-medium">97%</span>
                  </div>
                  <Progress value={97} className="h-2" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span>Repeat Hire Rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="feedback" className="space-y-4">
              {partnerFeedback.map((feedback) => (
                <Card key={feedback.id}>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <span>{feedback.userName}</span>
                      <span className="flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${index < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </span>
                    </CardTitle>
                    <CardDescription>{new Date(feedback.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        {work.status === "active" && (
          <>
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">Cancel Work</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Work Assignment</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel this work? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="reason">Cancellation Reason</Label>
                    <Textarea
                      id="reason"
                      placeholder="Enter the reason for cancellation..."
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                    Keep Work
                  </Button>
                  <Button variant="destructive" onClick={handleCancel}>
                    Confirm Cancellation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={handleComplete}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

