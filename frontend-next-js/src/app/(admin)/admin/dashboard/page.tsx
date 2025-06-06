"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, TrendingUp, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDashboardStatistics, useRecentPartners } from "@/hooks/useDashboard"
import moment from "moment"
import { Badge } from "@/components/ui/badge"

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return "bg-amber-100 text-amber-800";
    case 'approved':
      return "bg-green-100 text-green-800";
    case 'rejected':
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function DashboardPage() {
  const { data: statistics, isLoading: statisticsLoading } = useDashboardStatistics();
  const { data: recentPartners, isLoading: partnersLoading } = useRecentPartners();

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your partner management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statisticsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{statistics?.totalPartners || 0}</div>
                <p className="text-xs text-muted-foreground">From all categories</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statisticsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{statistics?.pendingRequests || 0}</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Approved Partners</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statisticsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{statistics?.activePartners || 0}</div>
                <p className="text-xs text-muted-foreground">Active partners</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Rejected Partners</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statisticsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{statistics?.rejectedPartners || 0}</div>
                <p className="text-xs text-muted-foreground">Not qualified</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Partner Growth</CardTitle>
            <CardDescription>Monthly partner registration trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <TrendingUp className="h-16 w-16 text-muted" />
              <span className="ml-2 text-muted-foreground">Chart placeholder</span>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Partner Registrations</CardTitle>
            <CardDescription>Latest partners who have registered</CardDescription>
          </CardHeader>
          <CardContent>
            {partnersLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted" />
              </div>
            ) : recentPartners && recentPartners.length > 0 ? (
              <div className="space-y-4">
                {recentPartners.map((partner) => (
                  <div key={partner.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      {partner.profilePic ? (
                        <AvatarImage src={partner.profilePic} alt={partner.name} />
                      ) : (
                        <AvatarFallback>{partner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {moment(partner.createdAt).fromNow()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(partner.status)} variant="outline">
                      {getStatusText(partner.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">No recent partner registrations</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}