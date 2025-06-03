"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Pencil, Trash2, Search, Loader2, FileImage } from "lucide-react"
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
import { toast } from "sonner"
import { useServiceTypesList } from "@/hooks/useServiceTypes"
import { useServicesList, useCreateService, useUpdateService, useDeleteService, useFileUpload, ServiceWithType } from "@/hooks/useServices"
import { FILES } from "@/utils/apis"
import { baseUrl } from "@/utils/config"

export default function ServicesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentService, setCurrentService] = useState<ServiceWithType | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        serviceTypeId: 0,
        iconId: 0,
        iconFile: null as File | null,
    })

    // API fetch hooks
    const { data: serviceTypesData, isLoading: isLoadingServiceTypes } = useServiceTypesList()
    const { data: servicesData, isLoading: isLoadingServices, isError } = useServicesList()

    // API mutation hooks
    const createService = useCreateService()
    const updateService = useUpdateService()
    const deleteService = useDeleteService()
    const fileUpload = useFileUpload()

    // Filter services based on search term
    const filteredServices = servicesData?.data
        ? servicesData.data.filter(
            (service) =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.serviceType.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : []

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement

        if (name === "iconFile" && files && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0],
            })
        } else if (name === "serviceTypeId") {
            setFormData({
                ...formData,
                [name]: parseInt(value, 10),
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    // Upload file and get icon ID
    const uploadIcon = async (file: File) => {
        setIsUploading(true)
        try {
            const response = await fileUpload.mutateAsync(file)
            setIsUploading(false)
            return response.data.id
        } catch (error) {
            console.error("Error uploading file:", error)
            toast.error("Failed to upload icon")
            setIsUploading(false)
            throw error
        }
    }

    // Create a new service
    const handleCreateService = async () => {
        if (!formData.name.trim() || !formData.serviceTypeId || !formData.iconFile) {
            toast.error("All fields are required")
            return
        }

        try {
            // Upload the icon first and get the icon ID
            const iconId = await uploadIcon(formData.iconFile)

            // Then create the service with the icon ID
            createService.mutate(
                {
                    name: formData.name,
                    serviceTypeId: formData.serviceTypeId,
                    iconId
                },
                {
                    onSuccess: () => {
                        toast.success("Service created successfully")
                        setFormData({
                            name: "",
                            serviceTypeId: 0,
                            iconId: 0,
                            iconFile: null,
                        })
                        setIsCreateDialogOpen(false)
                    },
                    onError: (error) => {
                        toast.error("Failed to create service")
                        console.error("Error creating service:", error)
                    }
                }
            )
        } catch (error) {
            console.log("error >>>", error)
            // Error already handled in uploadIcon
        }
    }

    // Update a service
    const handleUpdateService = async () => {
        if (!currentService || !formData.name.trim() || !formData.serviceTypeId) {
            toast.error("Name and service type are required")
            return
        }

        try {
            // If a new icon was selected, upload it and get the new icon ID
            let iconId = formData.iconId || currentService.iconId

            if (formData.iconFile) {
                iconId = await uploadIcon(formData.iconFile)
            }

            // Then update the service with the icon ID
            updateService.mutate(
                {
                    id: currentService.id,
                    payload: {
                        name: formData.name,
                        serviceTypeId: formData.serviceTypeId,
                        iconId
                    }
                },
                {
                    onSuccess: () => {
                        toast.success("Service updated successfully")
                        setFormData({
                            name: "",
                            serviceTypeId: 0,
                            iconId: 0,
                            iconFile: null,
                        })
                        setCurrentService(null)
                        setIsUpdateDialogOpen(false)
                    },
                    onError: (error) => {
                        toast.error("Failed to update service")
                        console.error("Error updating service:", error)
                    }
                }
            )
        } catch (error) {
            console.log("error >>>", error)
            // Error already handled in uploadIcon
        }
    }

    // Delete a service
    const handleDeleteService = () => {
        if (!currentService) return

        deleteService.mutate(
            currentService.id,
            {
                onSuccess: () => {
                    toast.success("Service deleted successfully")
                    setCurrentService(null)
                    setIsDeleteDialogOpen(false)
                },
                onError: (error) => {
                    toast.error("Failed to delete service")
                    console.error("Error deleting service:", error)
                }
            }
        )
    }

    // Open update dialog
    const openUpdateDialog = (service: ServiceWithType) => {
        setCurrentService(service)
        setFormData({
            name: service.name,
            serviceTypeId: service.serviceType.id,
            iconId: service.iconId,
            iconFile: null,
        })
        setIsUpdateDialogOpen(true)
    }

    // Open delete dialog
    const openDeleteDialog = (service: ServiceWithType) => {
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
                                <TableHead>Icon</TableHead>
                                <TableHead>Service Type</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoadingServices ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">
                                        <div className="flex justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : isError ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4 text-red-500">
                                        Error loading services. Please try again.
                                    </TableCell>
                                </TableRow>
                            ) : filteredServices.length > 0 ? (
                                filteredServices.map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell className="font-medium">{service.name}</TableCell>
                                        <TableCell>
                                            {service.iconId ? (
                                                <img
                                                    src={`${baseUrl}${FILES.FILE_WITHOUT_TOKEN(service.iconId.toString())}`}
                                                    alt={service.name}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                                    <FileImage className="h-6 w-6 text-gray-400" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>{service.serviceType.name}</TableCell>
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
                                    <TableCell colSpan={4} className="text-center py-4">
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
                                placeholder="Frontend Development"
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
                                value={formData.serviceTypeId || ""}
                                onChange={handleInputChange}
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            >
                                <option value="">Select a service type</option>
                                {serviceTypesData?.data && serviceTypesData.data.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {isLoadingServiceTypes && (
                                <div className="col-span-3 flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Loading service types...
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="iconFile" className="text-right">
                                Icon (JPG/PNG) *
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="iconFile"
                                    name="iconFile"
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
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={createService.isPending || isUploading}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateService}
                            disabled={createService.isPending || isUploading}
                        >
                            {(createService.isPending || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create
                        </Button>
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
                                value={formData.serviceTypeId || ""}
                                onChange={handleInputChange}
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            >
                                <option value="">Select a service type</option>
                                {serviceTypesData?.data && serviceTypesData.data.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {isLoadingServiceTypes && (
                                <div className="col-span-3 flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Loading service types...
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="update-iconFile" className="text-right">
                                Icon (JPG/PNG)
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="update-iconFile"
                                    name="iconFile"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleInputChange}
                                />
                                {currentService?.iconId && !formData.iconFile && (
                                    <div className="mt-2">
                                        <p className="text-xs text-muted-foreground mb-1">Current icon:</p>
                                        <img
                                            src={`${baseUrl}${FILES.FILE_WITHOUT_TOKEN(currentService.iconId.toString())}`}
                                            alt={currentService.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                    {currentService?.iconId && !formData.iconFile
                                        ? "Leave empty to keep current icon"
                                        : "Only JPG or PNG files are allowed"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)} disabled={updateService.isPending || isUploading}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdateService}
                            disabled={updateService.isPending || isUploading}
                        >
                            {(updateService.isPending || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update
                        </Button>
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
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={deleteService.isPending}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteService} disabled={deleteService.isPending}>
                            {deleteService.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
