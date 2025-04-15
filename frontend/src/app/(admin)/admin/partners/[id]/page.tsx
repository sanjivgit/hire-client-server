"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  Building,
  Clock,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
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

// Sample partner data
const partnerData = {
  id: "2",
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 9876543211",
  location: "Delhi, India",
  status: "pending",
  registeredAt: "2024-01-20",
  businessName: "Sharma Services",
  businessType: "Individual",
  businessAddress: "123 Main Street, Delhi, India",
  serviceAreas: ["Delhi", "Noida", "Gurgaon"],
  documents: [
    { name: "ID Proof", status: "verified", url: "#" },
    { name: "Address Proof", status: "pending", url: "#" },
    { name: "Business License", status: "pending", url: "#" },
  ],
  serviceHistory: [],
  notes: [
    {
      id: "1",
      text: "Called to verify business details",
      createdBy: "Admin User",
      createdAt: "2024-01-22",
    },
  ],
}

export default function PartnerDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [note, setNote] = useState("")

  // In a real app, you would fetch the partner data based on the ID
  const partner = partnerData

  const handleAddNote = () => {
    if (note.trim()) {
      // In a real app, you would call an API to add the note
      console.log("Adding note:", note)
      setNote("")
    }
  }

  const handleApprove = () => {
    // In a real app, you would call an API to approve the partner
    console.log("Approving partner:", partner.id)
  }

  const handleReject = () => {
    if (rejectionReason.trim()) {
      // In a real app, you would call an API to reject the partner
      console.log("Rejecting partner:", partner.id, "Reason:", rejectionReason)
      setShowRejectDialog(false)
      setRejectionReason("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/partners">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Partner Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {partner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{partner.name}</CardTitle>
              <CardDescription>
                <Badge
                  variant={
                    partner.status === "active" ? "default" : partner.status === "pending" ? "outline" : "destructive"
                  }
                  className="mt-1"
                >
                  {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                </Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{partner.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{partner.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{partner.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Registered on {new Date(partner.registeredAt).toLocaleDateString()}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Business Information</h3>
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{partner.businessName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{partner.businessType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{partner.businessAddress}</span>
              </div>
            </div>

            <Separator />

            {partner.status === "pending" && (
              <div className="flex flex-col gap-3">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Partner
                </Button>
                <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject Partner
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject Partner Application</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for rejecting this partner application. This will be visible to the
                        partner.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="reason">Rejection Reason</Label>
                        <Textarea
                          id="reason"
                          placeholder="Enter the reason for rejection..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleReject}>
                        Confirm Rejection
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {partner.status === "rejected" && (
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Partner
              </Button>
            )}

            {partner.status === "active" && (
              <Button variant="destructive" className="w-full" onClick={() => setShowRejectDialog(true)}>
                <XCircle className="mr-2 h-4 w-4" />
                Ban Partner
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                  <CardDescription>Locations where this partner provides services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {partner.serviceAreas.map((area) => (
                      <Badge key={area} variant="secondary">
                        <MapPin className="mr-1 h-3 w-3" />
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service History</CardTitle>
                  <CardDescription>Recent service activities by this partner</CardDescription>
                </CardHeader>
                <CardContent>
                  {partner.serviceHistory.length === 0 ? (
                    <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                      <p className="text-sm text-muted-foreground">No service history available</p>
                    </div>
                  ) : (
                    <div className="space-y-4">{/* Service history items would go here */}</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Documents</CardTitle>
                  <CardDescription>Documents submitted by the partner for verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {partner.documents.map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Status:{" "}
                              <Badge
                                variant={
                                  doc.status === "verified"
                                    ? "default"
                                    : doc.status === "pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                              </Badge>
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Notes</CardTitle>
                  <CardDescription>Internal notes about this partner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {partner.notes.length === 0 ? (
                      <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">No notes available</p>
                      </div>
                    ) : (
                      partner.notes.map((note) => (
                        <div key={note.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{note.createdBy}</p>
                            <p className="text-sm text-muted-foreground">
                              <Clock className="mr-1 inline-block h-3 w-3" />
                              {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="mt-2 text-sm">{note.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-note">Add Note</Label>
                    <Textarea
                      id="new-note"
                      placeholder="Type your note here..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <Button onClick={handleAddNote} className="mt-2">
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}