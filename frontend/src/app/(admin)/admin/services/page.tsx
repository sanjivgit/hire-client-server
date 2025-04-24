"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { mockServices, mockServiceTypes, type Service } from "@/lib/types"
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

export default function ServicesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [services, setServices] = useState<Service[]>(mockServices)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentService, setCurrentService] = useState<Service | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        serviceTypeId: "",
        imageFile: null as File | null,
    })

    // Filter services based on search term
    const filteredServices = services.filter(
        (service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.serviceTypeName.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement

        if (name === "imageFile" && files && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0],
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    // Create a new service
    const handleCreateService = () => {
        if (!formData.name.trim() || !formData.serviceTypeId || !formData.imageFile) {
            alert("All fields are mandatory")
            return
        }

        const serviceType = mockServiceTypes.find((type) => type.id === formData.serviceTypeId)

        // Create a URL for the image file (in a real app, you'd upload this to a server)
        const imageUrl = formData.imageFile ? URL.createObjectURL(formData.imageFile) : ""

        const newService: Service = {
            id: `${services.length + 1}`,
            name: formData.name,
            description: "", // Empty as we removed this field
            price: 0, // Zero as we removed this field
            serviceTypeId: formData.serviceTypeId,
            serviceTypeName: serviceType?.name || "Unknown",
            imageUrl: imageUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setServices([...services, newService])
        setFormData({
            name: "",
            serviceTypeId: "",
            imageFile: null,
        })
        setIsCreateDialogOpen(false)
    }

    // Update a service
    const handleUpdateService = () => {
        if (!currentService || !formData.name.trim() || !formData.serviceTypeId) {
            alert("All fields are mandatory")
            return
        }

        const serviceType = mockServiceTypes.find((type) => type.id === formData.serviceTypeId)

        // Create a URL for the image file if a new one was selected
        const imageUrl = formData.imageFile ? URL.createObjectURL(formData.imageFile) : currentService.imageUrl

        const updatedServices = services.map((service) =>
            service.id === currentService.id
                ? {
                    ...service,
                    name: formData.name,
                    serviceTypeId: formData.serviceTypeId,
                    serviceTypeName: serviceType?.name || service.serviceTypeName,
                    imageUrl: imageUrl,
                    updatedAt: new Date().toISOString(),
                }
                : service,
        )

        setServices(updatedServices)
        setFormData({
            name: "",
            serviceTypeId: "",
            imageFile: null,
        })
        setCurrentService(null)
        setIsUpdateDialogOpen(false)
    }

    // Delete a service
    const handleDeleteService = () => {
        if (!currentService) return

        const updatedServices = services.filter((service) => service.id !== currentService.id)

        setServices(updatedServices)
        setCurrentService(null)
        setIsDeleteDialogOpen(false)
    }

    // Open update dialog
    const openUpdateDialog = (service: Service) => {
        setCurrentService(service)
        setFormData({
            name: service.name,
            serviceTypeId: service.serviceTypeId,
            imageFile: null, // We can't set the file directly, user needs to select it again
        })
        setIsUpdateDialogOpen(true)
    }

    // Open delete dialog
    const openDeleteDialog = (service: Service) => {
        setCurrentService(service)
        setIsDeleteDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <h1 className="text-2xl font-bold">Services</h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            type="search"
                            placeholder="Search services..."
                            className="pl-10 w-[250px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Service Type</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell className="font-medium">{service.name}</TableCell>
                                        <TableCell>
                                            {service.imageUrl && (
                                                <img
                                                    src={service.imageUrl || "/placeholder.svg"}
                                                    alt={service.name}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>{service.serviceTypeName}</TableCell>
                                        <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="icon" onClick={() => openUpdateDialog(service)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                                    onClick={() => openDeleteDialog(service)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4">
                                        No services found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create Service Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Create Service</DialogTitle>
                        <DialogDescription>Add a new service to the system.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name *
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="col-span-3"
                                placeholder="E-commerce Website"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="serviceTypeId" className="text-right">
                                Service Type *
                            </Label>
                            <select
                                id="serviceTypeId"
                                name="serviceTypeId"
                                value={formData.serviceTypeId}
                                onChange={handleInputChange}
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            >
                                <option value="">Select a service type</option>
                                {mockServiceTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="imageFile" className="text-right">
                                Image (JPG/PNG) *
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="imageFile"
                                    name="imageFile"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleInputChange}
                                    required
                                />
                                <p className="text-xs text-muted-foreground mt-1">Only JPG or PNG files are allowed</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateService}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Update Service Dialog */}
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Update Service</DialogTitle>
                        <DialogDescription>Edit the service details.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="update-name" className="text-right">
                                Name *
                            </Label>
                            <Input
                                id="update-name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="update-serviceTypeId" className="text-right">
                                Service Type *
                            </Label>
                            <select
                                id="update-serviceTypeId"
                                name="serviceTypeId"
                                value={formData.serviceTypeId}
                                onChange={handleInputChange}
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            >
                                <option value="">Select a service type</option>
                                {mockServiceTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="update-imageFile" className="text-right">
                                Image (JPG/PNG) *
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="update-imageFile"
                                    name="imageFile"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleInputChange}
                                />
                                {currentService?.imageUrl && !formData.imageFile && (
                                    <div className="mt-2">
                                        <p className="text-xs text-muted-foreground mb-1">Current image:</p>
                                        <img
                                            src={currentService.imageUrl || "/placeholder.svg"}
                                            alt={currentService.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                    {currentService?.imageUrl && !formData.imageFile
                                        ? "Leave empty to keep current image"
                                        : "Only JPG or PNG files are allowed"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateService}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Service Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Service</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this service? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteService}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
