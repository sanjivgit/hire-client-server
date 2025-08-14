import type React from "react"
import { X, Calendar, MapPin, Phone, User, Briefcase } from "lucide-react"
import type { Address, ServiceRequest } from "@/hooks/user_types"

interface ServiceRequestModalProps {
    data: ServiceRequest | null
    isOpen: boolean
    onClose: () => void
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ data, isOpen, onClose }) => {
    if (!isOpen || !data) return null

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "accepted":
                return "bg-green-100 text-green-800 border-green-200"
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const formatAddress = (address: Address) => {
        return `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`
    }

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Service Request Details</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Service Information */}
                    <div className="bg-blue-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Service Information</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Service</p>
                                <p className="text-lg text-gray-900">{data.service.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Service Type</p>
                                <p className="text-lg text-gray-900">{data.serviceType.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Status</p>
                                <span
                                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(data.status)}`}
                                >
                                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Request & Accept Descriptions */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Request Description</h4>
                            <p className="text-gray-700">{data.requestDescription}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Accept Description</h4>
                            <p className="text-gray-700">{data.acceptDescription}</p>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-orange-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="w-6 h-6 text-orange-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Customer Information</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Name</p>
                                <p className="text-lg text-gray-900">{data.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Phone</p>
                                <p className="text-lg text-gray-900 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {data.customer.phone}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium text-gray-600">Address</p>
                                <p className="text-gray-900 flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                    {formatAddress(data.customer.address)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Partner Information */}
                    <div className="bg-purple-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="w-6 h-6 text-purple-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Partner Information</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Name</p>
                                <p className="text-lg text-gray-900">{data.partner.user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Phone</p>
                                <p className="text-lg text-gray-900 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {data.partner.user.phone}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium text-gray-600">Address</p>
                                <p className="text-gray-900 flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                    {formatAddress(data.partner.user.address)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-6 h-6 text-gray-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Timeline</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Request Created</span>
                                <span className="text-gray-600">{formatDate(data.requestCreatedAt)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Request Updated</span>
                                <span className="text-gray-600">{formatDate(data.requestUpdatedAt)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Accept Created</span>
                                <span className="text-gray-600">{formatDate(data.acceptCreatedAt)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="font-medium text-gray-700">Accept Updated</span>
                                <span className="text-gray-600">{formatDate(data.acceptUpdatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceRequestModal
