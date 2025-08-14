import { useState, useEffect } from "react"
import { Loader2, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import CustomPagination from "@/components/custom-ui/Pagination"
import { useParams } from "react-router-dom"
import { useGetUserHistory } from "@/hooks/useUsers"
import type { ServiceRequest } from "@/hooks/user_types"
import ServiceRequestModal from "./components/ServiceDetails"

export default function UserHistoryPage() {
    const { userId } = useParams()
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedService, setSelectedService] = useState<ServiceRequest | null>(null)
    const [showServiceDetailsModal, setServiceDetailsModal] = useState(false)

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
    // useEffect(() => {
    //     setCurrentPage(1)
    // }, [debouncedSearchTerm, statusFilter])

    const { data, isLoading, isError, error } = useGetUserHistory(
        Number(userId),
        currentPage,
        debouncedSearchTerm
    )

    const history: any = data?.items || []
    const pagination = data?.pagination

    const handleViewService = (item: ServiceRequest) => {
        setSelectedService(item);
        setServiceDetailsModal(true)
    }

    const handleCloseServiceModal = () => {
        setSelectedService(null);
        setServiceDetailsModal(false)
    }

    if (isLoading && history.length === 0) {
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
                    <h1 className="text-3xl font-bold tracking-tight">Users History</h1>
                    <p className="text-muted-foreground">Manage users history</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        placeholder="Search history..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="rounded-md border relative">
                {isLoading && history.length > 0 && (
                    <div className="absolute inset-0 bg-background/80 flex justify-center items-center z-10">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Service Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No history found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            history.map((service: ServiceRequest) => (
                                <TableRow key={service.id}>
                                    <TableCell>
                                        {service.service.name}
                                    </TableCell>
                                    <TableCell>{service.serviceType.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="default">{service.status?.toUpperCase()}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{service.type === 'request' ? 'REQUEST' : 'PROVIDE'}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant={'outline'} onClick={() => handleViewService(service)}>
                                            <EyeIcon className="h-4 w-4" />
                                            View Work History
                                        </Button>
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

            <ServiceRequestModal
                data={selectedService}
                isOpen={showServiceDetailsModal}
                onClose={handleCloseServiceModal}
            />
        </div>
    )
}

