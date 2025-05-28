"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useServiceTypesList, useCreateServiceType, useUpdateServiceType, useDeleteServiceType, ServiceTypeWithServices } from "@/hooks/useServiceTypes"
import { toast } from "sonner"

export default function ServiceTypesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [newServiceTypeName, setNewServiceTypeName] = useState("")
    const [currentServiceType, setCurrentServiceType] = useState<ServiceTypeWithServices | null>(null)

    // Fetch service types
    const { data: serviceTypesData, isLoading, isError } = useServiceTypesList()

    // API mutations
    const createServiceType = useCreateServiceType()
    const updateServiceType = useUpdateServiceType()
    const deleteServiceType = useDeleteServiceType()

    // Filter service types based on search term
    const filteredServiceTypes = serviceTypesData?.data
        ? serviceTypesData.data.filter((serviceType) =>
            serviceType.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : []

    // Create a new service type
    const handleCreateServiceType = () => {
        if (!newServiceTypeName.trim()) return

        createServiceType.mutate(
            { name: newServiceTypeName },
            {
                onSuccess: () => {
                    toast.success("Service type created successfully")
                    setNewServiceTypeName("")
                    setIsCreateDialogOpen(false)
                },
                onError: (error) => {
                    toast.error("Failed to create service type")
                    console.error("Error creating service type:", error)
                }
            }
        )
    }

    // Update a service type
    const handleUpdateServiceType = () => {
        if (!currentServiceType || !newServiceTypeName.trim()) return

        updateServiceType.mutate(
            {
                id: currentServiceType.id,
                payload: { name: newServiceTypeName }
            },
            {
                onSuccess: () => {
                    toast.success("Service type updated successfully")
                    setNewServiceTypeName("")
                    setCurrentServiceType(null)
                    setIsUpdateDialogOpen(false)
                },
                onError: (error) => {
                    toast.error("Failed to update service type")
                    console.error("Error updating service type:", error)
                }
            }
        )
    }

    // Delete a service type
    const handleDeleteServiceType = () => {
        if (!currentServiceType) return

        deleteServiceType.mutate(
            currentServiceType.id,
            {
                onSuccess: () => {
                    toast.success("Service type deleted successfully")
                    setCurrentServiceType(null)
                    setIsDeleteDialogOpen(false)
                },
                onError: (error) => {
                    toast.error("Failed to delete service type")
                    console.error("Error deleting service type:", error)
                }
            }
        )
    }

    // Open update dialog
    const openUpdateDialog = (serviceType: ServiceTypeWithServices) => {
        setCurrentServiceType(serviceType)
        setNewServiceTypeName(serviceType.name)
        setIsUpdateDialogOpen(true)
    }

    // Open delete dialog
    const openDeleteDialog = (serviceType: ServiceTypeWithServices) => {
        setCurrentServiceType(serviceType)
        setIsDeleteDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <h1 className="text-2xl font-bold">Service Types</h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            type="search"
                            placeholder="Search service types..."
                            className="pl-10 w-[250px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service Type
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Services</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8">
                                        <div className="flex justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : isError ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-4 text-red-500">
                                        Error loading service types. Please try again.
                                    </TableCell>
                                </TableRow>
                            ) : filteredServiceTypes.length > 0 ? (
                                filteredServiceTypes.map((serviceType) => (
                                    <TableRow key={serviceType.id}>
                                        <TableCell className="font-medium">{serviceType.name}</TableCell>
                                        <TableCell>
                                            {serviceType.services && serviceType.services.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {serviceType.services.map(service => (
                                                        <span key={service.id} className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                                                            {service.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground text-sm">No services</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="icon" onClick={() => openUpdateDialog(serviceType)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                                    onClick={() => openDeleteDialog(serviceType)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-4">
                                        No service types found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create Service Type Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Service Type</DialogTitle>
                        <DialogDescription>Add a new service type to the system.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newServiceTypeName}
                                onChange={(e) => setNewServiceTypeName(e.target.value)}
                                className="col-span-3"
                                placeholder="Web Development"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={createServiceType.isPending}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateServiceType} disabled={createServiceType.isPending}>
                            {createServiceType.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Update Service Type Dialog */}
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Service Type</DialogTitle>
                        <DialogDescription>Edit the service type details.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="update-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="update-name"
                                value={newServiceTypeName}
                                onChange={(e) => setNewServiceTypeName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)} disabled={updateServiceType.isPending}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateServiceType} disabled={updateServiceType.isPending}>
                            {updateServiceType.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Service Type Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Service Type</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this service type? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={deleteServiceType.isPending}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteServiceType} disabled={deleteServiceType.isPending}>
                            {deleteServiceType.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
