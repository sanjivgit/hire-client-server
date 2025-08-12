"use client";

import { useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { useUsers } from "@/hooks/useUsers";
import CustomPagination from "@/components/custom-ui/Pagination";

export default function UserPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setCurrentPage] = useState(1);

    const { data: users, isLoading } = useUsers(page, searchTerm);

    const pagination = users?.pagination;
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground">
                    Manage all your registered users
                </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>
                {/* <div className="flex flex-col gap-2 sm:flex-row">
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
                </div> */}
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>User Type</TableHead>
                            <TableHead>address</TableHead>
                            <TableHead>Registered On</TableHead>
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
                        ) : users?.users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No user found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users?.users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                {user.profilePic ? (
                                                    <AvatarImage src={user.profilePic} alt={user.name} />
                                                ) : (
                                                    <AvatarFallback>
                                                        {user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Badge variant={user.isPartner ? "default" : "outline"}>
                                                {user.isPartner ? "Partner" : "User"}
                                            </Badge>
                                            {user.role && (
                                                <Badge variant={"destructive"}>
                                                    {user.role?.toUpperCase()}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.address.address}</TableCell>
                                    <TableCell>
                                        {moment(user.createdAt).format("MMM DD, YYYY")}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <a href={`/admin/partners/${user.id}`}>
                                            <Button variant={"outline"}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                <span> View Details </span>
                                            </Button>
                                        </a>
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
    );
}
