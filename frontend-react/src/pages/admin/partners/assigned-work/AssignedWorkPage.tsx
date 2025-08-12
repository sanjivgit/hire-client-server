"use client"

import { useState, useEffect } from "react"
import { Filter, MoreHorizontal, Calendar, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePartnerStatistics, usePartnersWithStats } from "@/hooks/useWorkAssign"
import type { PartnerWithStats } from '@/hooks/useWorkAssign'
import CustomPagination from "@/components/custom-ui/Pagination"

export default function AssignedWorkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchTerm])

  // Reset to first page when debounced search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, statusFilter])

  const { data, isLoading, isError, error, refetch } = usePartnersWithStats(
    currentPage,
    debouncedSearchTerm,
    statusFilter
  )

  const { data: statistics, isLoading: statsLoading } = usePartnerStatistics()

  const partners = data?.partners || []
  const pagination = data?.pagination

  if (isLoading && partners.length === 0) {
    return <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading partner data...</span>
    </div>
  }

  if (isError) {
    return <div className="flex justify-center items-center h-64 text-destructive">
      Error loading data: {error.message}
    </div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assigned Work</h1>
          <p className="text-muted-foreground">Manage partners with assigned work</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
            title="Refresh data"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button asChild>
            <a href="/dashboard/partners/assign-work">Assign New Work</a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? '...' : statistics?.totalCompleted || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? '...' : statistics?.totalPending || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Cancelled Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? '...' : statistics?.totalCancelled || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              // Don't reset page immediately, only when the debounced search triggers
            }}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value)
            setCurrentPage(1) // Reset to first page when filtering
          }}>
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

      <div className="rounded-md border relative">
        {isLoading && partners.length > 0 && (
          <div className="absolute inset-0 bg-background/80 flex justify-center items-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Active Works</TableHead>
              <TableHead>Pending Works</TableHead>
              <TableHead>Cancelled Works</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No partners found.
                </TableCell>
              </TableRow>
            ) : (
              partners.map((partner: PartnerWithStats) => (
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
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                            {partner.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{partner.serviceType}</TableCell>
                  <TableCell>
                    <Badge variant="default">{partner.completedCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{partner.pendingCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">{partner.cancelledCount}</Badge>
                  </TableCell>
                  <TableCell>₹{partner.totalEarnings.toLocaleString()}</TableCell>
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
                          <a href={`/admin/partners/${partner.id}/work-history`}>
                            <Calendar className="mr-2 h-4 w-4" />
                            View Work History
                          </a>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem asChild>
                          <a href={`/admin/partners/${partner.id}/assign-work`}>
                            <Clock className="mr-2 h-4 w-4" />
                            Assign New Work
                          </a>
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pagination && <CustomPagination
          onPageChange={setCurrentPage}
          pagination={{
            page: pagination.currentPage,
            limit: pagination.itemsPerPage,
            total: pagination.totalItems,
            totalPages: pagination.totalPages,
          }}
        />}
      </div>
    </div>
  )
}

