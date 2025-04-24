"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { mockServiceTypes, type ServiceType } from "@/lib/types"
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

export default function ServiceTypesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>(mockServiceTypes)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [newServiceTypeName, setNewServiceTypeName] = useState("")
    const [currentServiceType, setCurrentServiceType] = useState<ServiceType | null>(null)

    // Filter service types based on search term
    const filteredServiceTypes = serviceTypes.filter((serviceType) =>
        serviceType.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Create a new service type
    const handleCreateServiceType = () => {
        if (!newServiceTypeName.trim()) return

        const newServiceType: ServiceType = {
            id: `${serviceTypes.length + 1}`,
            name: newServiceTypeName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setServiceTypes([...serviceTypes, newServiceType])
        setNewServiceTypeName("")
        setIsCreateDialogOpen(false)
    }

    // Update a service type
    const handleUpdateServiceType = () => {
        if (!currentServiceType || !newServiceTypeName.trim()) return

        const updatedServiceTypes = serviceTypes.map((serviceType) =>
            serviceType.id === currentServiceType.id
                ? {
                    ...serviceType,
                    name: newServiceTypeName,
                    updatedAt: new Date().toISOString(),
                }
                : serviceType,
        )

        setServiceTypes(updatedServiceTypes)
        setNewServiceTypeName("")
        setCurrentServiceType(null)
        setIsUpdateDialogOpen(false)
    }

    // Delete a service type
    const handleDeleteServiceType = () => {
        if (!currentServiceType) return

        const updatedServiceTypes = serviceTypes.filter((serviceType) => serviceType.id !== currentServiceType.id)

        setServiceTypes(updatedServiceTypes)
        setCurrentServiceType(null)
        setIsDeleteDialogOpen(false)
    }

    // Open update dialog
    const openUpdateDialog = (serviceType: ServiceType) => {
        setCurrentServiceType(serviceType)
        setNewServiceTypeName(serviceType.name)
        setIsUpdateDialogOpen(true)
    }

    // Open delete dialog
    const openDeleteDialog = (serviceType: ServiceType) => {
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
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredServiceTypes.length > 0 ? (
                                filteredServiceTypes.map((serviceType) => (
                                    <TableRow key={serviceType.id}>
                                        <TableCell className="font-medium">{serviceType.name}</TableCell>
                                        <TableCell>{new Date(serviceType.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(serviceType.updatedAt).toLocaleDateString()}</TableCell>
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
                                    <TableCell colSpan={4} className="text-center py-4">
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
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateServiceType}>Create</Button>
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
                        <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateServiceType}>Update</Button>
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
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteServiceType}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
