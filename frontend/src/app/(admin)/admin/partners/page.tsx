"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePartners, useApprovePartner, useRejectPartner } from "@/hooks/usePartners"
import moment from 'moment'
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedPartnerId, setSelectedPartnerId] = useState("")
  const [rejectReason, setRejectReason] = useState("")
  const [page, setPage] = useState(1)

  const { data: partners, isLoading } = usePartners(page, statusFilter, searchTerm)
  const approveMutation = useApprovePartner()
  const rejectMutation = useRejectPartner()

  const handleApprove = async (id: string) => {
    try {
      await approveMutation.mutateAsync(id)
      toast.success("Partner approved successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to approve partner")
    }
  }

  const openRejectDialog = (id: string) => {
    setSelectedPartnerId(id)
    setRejectDialogOpen(true)
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection")
      return
    }

    try {
      await rejectMutation.mutateAsync({ id: selectedPartnerId, reason: rejectReason })
      toast.success("Partner rejected successfully")
      setRejectDialogOpen(false)
      setRejectReason("")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reject partner")
    }
  }

  // const filteredPartners = partners ? partners.filter((partner) => {
  //   const matchesSearch =
  //     partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     (partner.company && partner.company.toLowerCase().includes(searchTerm.toLowerCase()))

  //   const matchesStatus = statusFilter === "all" || partner.status === statusFilter

  //   return matchesSearch && matchesStatus
  // }) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Partners</h1>
        <p className="text-muted-foreground">Manage all your registered partners</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Partners</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : partners?.partners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No partners found.
                </TableCell>
              </TableRow>
            ) : (
              partners?.partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        {partner.profilePic ? (
                          <AvatarImage src={partner.profilePic} alt={partner.name} />
                        ) : (
                          <AvatarFallback>
                            {partner.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-muted-foreground">{partner.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{partner.serviceType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        partner.status === "approved"
                          ? "default"
                          : partner.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{moment(partner.createdAt).format('MMM DD, YYYY')}</TableCell>
                  <TableCell className="text-center">
                    <Link href={`/admin/partners/${partner.id}`}>
                      <Button variant={'outline'}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span> View Details </span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Partner Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this partner application. This information will be shared with the partner.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for rejection</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialogOpen(false)
                setRejectReason("")
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Rejecting...</span>
                </div>
              ) : (
                "Confirm Rejection"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}