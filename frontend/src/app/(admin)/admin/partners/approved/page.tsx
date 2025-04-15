import Link from "next/link"
import { ArrowUpRight, TrendingUp, Clock, AlertTriangle } from "lucide-react"
import { mockUsers } from "@/lib/utils"

export default function DashboardPage() {
  // Count users by status
  const pendingCount = mockUsers.filter((user) => user.status === "pending").length
  const approvedCount = mockUsers.filter((user) => user.status === "approved").length
  const rejectedCount = mockUsers.filter((user) => user.status === "rejected").length

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Pending Partners</h3>
                <p className="text-3xl font-bold">{pendingCount}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <Link
              href="/admin/partners/requests"
              className="text-sm text-primary flex items-center mt-2 hover:underline"
            >
              View all requests
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Approved Partners</h3>
                <p className="text-3xl font-bold">{approvedCount}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Link
              href="/admin/partners/approved"
              className="text-sm text-primary flex items-center mt-2 hover:underline"
            >
              View all partners
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Rejected Partners</h3>
                <p className="text-3xl font-bold">{rejectedCount}</p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <Link
              href="/admin/partners/rejected"
              className="text-sm text-primary flex items-center mt-2 hover:underline"
            >
              View rejected
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent partner requests */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">Recent Partner Requests</h2>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.slice(0, 5).map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.company}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "pending"
                            ? "badge-warning"
                            : user.status === "approved"
                              ? "badge-success"
                              : "badge-error"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link href={`/admin/partners/details/${user.id}`} className="btn btn-xs btn-primary">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-actions justify-end mt-4">
            <Link href="/admin/partners/requests" className="btn btn-primary btn-sm">
              View All Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

