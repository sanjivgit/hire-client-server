"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Check } from "lucide-react"
import { mockUsers, type User } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RejectedPartnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [rejectedUsers, setRejectedUsers] = useState(mockUsers.filter((user) => user.status === "rejected"))

  const filteredUsers = rejectedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprove = (user: User) => {
    // In a real app, you would call an API to update the user status
    console.log(`Approving previously rejected user: ${user.id}`)
    setRejectedUsers(rejectedUsers.filter((u) => u.id !== user.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Rejected Partners</h1>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search partners..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Rejection Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="font-medium">{user.name}</div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.company}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="flex gap-2">
                          <Link href={`/admin/partners/details/${user.id}`} className="btn btn-xs btn-outline">
                            View
                          </Link>
                          <button onClick={() => handleApprove(user)} className="btn btn-xs btn-success">
                            <Check className="h-3 w-3 mr-1" />
                            Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No rejected partners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

