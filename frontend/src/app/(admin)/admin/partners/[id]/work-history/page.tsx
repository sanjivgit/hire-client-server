"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, Calendar, Clock, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data
const partner = {
  id: "1",
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+91 9876543210",
}

const workHistory = [
  {
    id: "1",
    title: "Home Cleaning",
    status: "completed",
    date: "2024-03-01",
    time: "14:00 - 16:00",
    location: "123 Main St, Mumbai",
    earnings: 1500,
  },
  {
    id: "2",
    title: "Office Sanitization",
    status: "active",
    date: "2024-03-05",
    time: "09:00 - 12:00",
    location: "456 Business Park, Delhi",
    earnings: 2500,
  },
  {
    id: "3",
    title: "Garden Maintenance",
    status: "pending",
    date: "2024-03-10",
    time: "10:00 - 13:00",
    location: "789 Green Avenue, Bangalore",
    earnings: 1800,
  },
  {
    id: "4",
    title: "Deep Cleaning",
    status: "cancelled",
    date: "2024-03-15",
    time: "11:00 - 15:00",
    location: "321 Apartment Complex, Chennai",
    earnings: 0,
  },
]

export default function PartnerWorkHistoryPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredWorks = workHistory.filter((work) => {
    const matchesSearch =
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || work.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalEarnings = workHistory.reduce((sum, work) => sum + work.earnings, 0)
  const completedWorks = workHistory.filter((work) => work.status === "completed").length
  const activeWorks = workHistory.filter((work) => work.status === "active").length
  const pendingWorks = workHistory.filter((work) => work.status === "pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/partners/assigned-work">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{partner.name}&apos;s Work History</h1>
          <p className="text-muted-foreground">View and manage assigned work for this partner</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Works</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedWorks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Works</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Works</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingWorks}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search works..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            // prefix={<Search className="h-4 w-4 text-muted-foreground" />}
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
              <SelectItem value="all">All Works</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Work Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No works found.
                </TableCell>
              </TableRow>
            ) : (
              filteredWorks.map((work) => (
                <TableRow key={work.id}>
                  <TableCell>{work.title}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{work.date}</TableCell>
                  <TableCell>{work.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                      {work.location}
                    </div>
                  </TableCell>
                  <TableCell>₹{work.earnings.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/partners/${params.id}/work-history/${work.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
