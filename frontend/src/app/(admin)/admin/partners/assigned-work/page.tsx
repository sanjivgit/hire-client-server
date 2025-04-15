"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, MoreHorizontal, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data
const partners = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    activeWorks: 3,
    pendingWorks: 1,
    cancelledWorks: 0,
    totalEarnings: 15000,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    activeWorks: 2,
    pendingWorks: 2,
    cancelledWorks: 1,
    totalEarnings: 12000,
    rating: 4.5,
  },
  {
    id: "3",
    name: "Rahul Patel",
    email: "rahul.patel@example.com",
    activeWorks: 4,
    pendingWorks: 0,
    cancelledWorks: 2,
    totalEarnings: 18000,
    rating: 4.2,
  },
  {
    id: "4",
    name: "Ananya Desai",
    email: "ananya.desai@example.com",
    activeWorks: 1,
    pendingWorks: 3,
    cancelledWorks: 0,
    totalEarnings: 8000,
    rating: 4.9,
  },
]

export default function AssignedWorkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && partner.activeWorks > 0) ||
      (statusFilter === "pending" && partner.pendingWorks > 0) ||
      (statusFilter === "cancelled" && partner.cancelledWorks > 0)

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assigned Work</h1>
          <p className="text-muted-foreground">Manage partners with assigned work</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/partners/assign-work">Assign New Work</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Active Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.reduce((sum, partner) => sum + partner.activeWorks, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.reduce((sum, partner) => sum + partner.pendingWorks, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Cancelled Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {partners.reduce((sum, partner) => sum + partner.cancelledWorks, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{partners.reduce((sum, partner) => sum + partner.totalEarnings, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search partners..."
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
              <TableHead>Partner</TableHead>
              <TableHead>Active Works</TableHead>
              <TableHead>Pending Works</TableHead>
              <TableHead>Cancelled Works</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No partners found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {partner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-muted-foreground">{partner.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{partner.activeWorks}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{partner.pendingWorks}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">{partner.cancelledWorks}</Badge>
                  </TableCell>
                  <TableCell>₹{partner.totalEarnings.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {partner.rating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/partners/${partner.id}/work-history`}>
                            <Calendar className="mr-2 h-4 w-4" />
                            View Work History
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/partners/${partner.id}/assign-work`}>
                            <Clock className="mr-2 h-4 w-4" />
                            Assign New Work
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

