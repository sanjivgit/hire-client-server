"use client"

import { useState } from "react"
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
  Briefcase,
  Loader2,
  BookUser
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "@/components/ui/dialog"
import { usePartnerDetails, useApprovePartner, useRejectPartner, useSuspendPartner } from "@/hooks/usePartners"
import moment from "moment"
import { toast } from "sonner"
import { FILES } from "@/utils/apis"
import { useParams } from "react-router-dom"
import apiClient, { apiClientForImage } from "@/utils/apiService"


export default function PartnerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("documents")
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [suspentionReason, setSuspentionReason] = useState("");
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);


  const { data: partner, isLoading, isError } = usePartnerDetails(id ?? "")
  const approveMutation = useApprovePartner()
  const rejectMutation = useRejectPartner()
  const suspendMutation = useSuspendPartner()

  const handleApprove = async () => {
    try {
      if (!id) {
        toast.error("Partner ID is required for approval")
        return
      }

      await approveMutation.mutateAsync(id)
      toast.success("Partner approved successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to approve partner")
    }
  }

  const handleReject = async () => {
    if (!id) {
      toast.error("Partner ID is required for rejection")
      return
    }

    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection")
      return
    }

    try {
      await rejectMutation.mutateAsync({ id, reason: rejectionReason })
      toast.success("Partner rejected successfully")
      setShowRejectDialog(false)
      setRejectionReason("")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reject partner")
    }
  }

  const handleSuspend = async () => {
    if (!id) {
      toast.error("Partner ID is required for suspension")
      return
    }
    if (!suspentionReason.trim()) {
      toast.error("Please provide a reason for suspention")
      return
    }

    try {
      await suspendMutation.mutateAsync({ id, reason: suspentionReason })
      toast.success("Partner suspended successfully")
      setShowSuspendDialog(false)
      setSuspentionReason("")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to suspend partner")
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading partner details...</p>
        </div>
      </div>
    )
  }

  if (isError || !partner) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <XCircle className="h-8 w-8 text-destructive" />
          <p className="text-sm text-muted-foreground">Failed to load partner details</p>
          <Button variant="outline" asChild className="mt-4">
            <a href="/admin/partners">Back to Partners</a>
          </Button>
        </div>
      </div>
    )
  }

  // const handleView = async () => {
  //   const response = await apiClientForImage.get(
  //     `${import.meta.env.VITE_PUBLIC_API_URL + FILES.FILE(partner.aadharImage.toString())}`,
  //     {
  //       responseType: 'blob',
  //     }
  //   );
  //   const url = window.URL.createObjectURL(new Blob([response.data]));
  //   window.open(url, '_blank');
  // };


  const fetchFile = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL + FILES.FILE(partner.aadharImage.toString())}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await response.blob();
    setBlobUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/admin/partners">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </a>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Partner Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Avatar className="h-16 w-16">
              {partner.profilePic ? (
                <AvatarImage src={partner.profilePic} alt={partner.profilePic} />
              ) : (
                <AvatarFallback className="text-xl">
                  {partner.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle>{partner.fullName}</CardTitle>
              <CardDescription>
                <Badge
                  variant={
                    partner.status === "approved" ? "default" : partner.status === "pending" ? "outline" : "destructive"
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
                <BookUser className="h-4 w-4 text-muted-foreground" />
                <span>{partner.aadharNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Registered on {moment(partner.createdAt).format('MMM DD, YYYY')}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Business Information</h3>
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{partner.serviceType.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{partner.services.map((service) => service.name).join(", ") || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{partner.address.address}</span>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              {partner.status !== "approved" && <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
                disabled={approveMutation.isPending}
              >
                {approveMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Approve Partner
              </Button>}
              {["pending", "suspended"].includes(partner.status) ? (<Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Partner
                </Button>
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
                    <Button
                      variant="destructive"
                      onClick={handleReject}
                      disabled={rejectMutation.isPending}
                    >
                      {rejectMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Rejecting...</span>
                        </div>
                      ) : (
                        "Reject Partner"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>) : (<Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setShowSuspendDialog(true)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Suspend Partner
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Suspend Partner Application</DialogTitle>
                    <DialogDescription>
                      Please provide a reason for suspending this partner application. This will be visible to the
                      partner.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="reason">Suspention Reason</Label>
                      <Textarea
                        id="reason"
                        placeholder="Enter the reason for suspention..."
                        value={suspentionReason}
                        onChange={(e) => setSuspentionReason(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleSuspend}
                      disabled={suspendMutation.isPending}
                    >
                      {suspendMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Suspending...</span>
                        </div>
                      ) : (
                        "Suspend Partner"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>)}
            </div>

          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="space-y-4">
                <h3 className="text-lg font-medium">Uploaded Documents</h3>

                {partner.additionalDocument && partner.aadharImage ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Aadhar Card</p>
                          <p className="text-xs text-muted-foreground">pdf</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={fetchFile}>
                          {/* <a href={import.meta.env.VITE_PUBLIC_API_URL + FILES.FILE(partner.aadharImage.toString())} target="_blank" rel="noopener noreferrer"> */}
                          View
                          {/* </a> */}
                        </Button>
                        {blobUrl && (
                          <iframe
                            src={blobUrl}
                            style={{ width: "100%", height: "600px" }}
                            title="Secure File"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Additional Document</p>
                          <p className="text-xs text-muted-foreground">pdf</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href='' target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24 text-sm text-muted-foreground rounded-md border">
                    No documents uploaded.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div >
  )
}