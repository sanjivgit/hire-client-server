"use client"

import { useState } from "react"
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
  Briefcase,
  Shield,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useWorkDetails } from "@/hooks/usePartnerHistory"
import moment from 'moment'

export default function WorkDetailsPage({ params }: any) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [cancellationReason, setCancellationReason] = useState("")

  const { data, isLoading } = useWorkDetails(params.id);

  const handleCancel = () => {
    if (cancellationReason.trim()) {
      // In a real app, you would call an API to cancel the work
      console.log("Cancelling work:", cancellationReason)
      setShowCancelDialog(false)
      setCancellationReason("")
    }
  }

  const handleComplete = () => {
    // In a real app, you would call an API to mark the work as completed
    // console.log("Marking work as completed:", params.workId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl">Work details not found</p>
      </div>
    );
  }

  const { workDetails, partnerDetails, userDetails } = data.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href={`/admin/partners/${params.id}/work-history`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </a>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{workDetails.serviceName}</h1>
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
                  workDetails.status === "completed"
                    ? "default"
                    : workDetails.status === "active"
                      ? "secondary"
                      : workDetails.status === "pending"
                        ? "outline"
                        : "destructive"
                }
              >
                {workDetails.status.charAt(0).toUpperCase() + workDetails.status.slice(1)}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Created: {moment(workDetails.createdAt).format('MMM DD, YYYY')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Updated: {moment(workDetails.updatedAt).format('MMM DD, YYYY HH:mm')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{userDetails.address.address}, {userDetails.address.city}, {userDetails.address.state} {userDetails.address.pincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>₹{workDetails.amount.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="text-sm text-muted-foreground">{workDetails.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Service Request ID</h3>
              <p className="text-sm text-muted-foreground">{workDetails.serviceRequestId}</p>
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
                <AvatarImage src={partnerDetails.profilePic} alt={partnerDetails.name} />
                <AvatarFallback className="text-xl">
                  {partnerDetails.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{partnerDetails.name}</h3>
                <p className="text-sm text-muted-foreground">Partner ID: {partnerDetails.id}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{partnerDetails.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{partnerDetails.phone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{partnerDetails.totalCompletedTasks} jobs completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since {moment(partnerDetails.createdAt).format('MMM DD, YYYY')}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Service Type</h3>
              <p className="text-sm text-muted-foreground">{partnerDetails.serviceType}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Services</h3>
              <div className="flex flex-wrap gap-2">
                {partnerDetails.services.map((service) => (
                  <Badge key={service.id} variant="outline" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {service.name} - ₹{service.price}
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
                <AvatarImage src={userDetails.profilePic} alt={userDetails.name} />
                <AvatarFallback className="text-xl">
                  {userDetails.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{userDetails.name}</h3>
                <p className="text-sm text-muted-foreground">User ID: {userDetails.id}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userDetails.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userDetails.phone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{userDetails.totalRequests} total requests</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since {moment(userDetails.createdAt).format('MMM DD, YYYY')}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Address</h3>
              <p className="text-sm text-muted-foreground">
                {userDetails.address.address}, {userDetails.address.city}, {userDetails.address.state} {userDetails.address.pincode}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        {workDetails.status === "active" && (
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


