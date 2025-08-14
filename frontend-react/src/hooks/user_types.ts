export interface ApiResponse {
    data: {
        items: ServiceRequest[];
        pagination: Pagination;
    }
}

export interface ServiceRequest {
    id: number;
    type: string; // e.g., "request"
    service: ServiceInfo;
    serviceType: ServiceInfo;
    requestDescription: string;
    acceptDescription: string;
    status: string; // e.g., "accepted"
    price: number;
    requestCreatedAt: string; // ISO date string
    requestUpdatedAt: string; // ISO date string
    acceptCreatedAt: string; // ISO date string
    acceptUpdatedAt: string; // ISO date string
    customer: Customer;
    partner: Partner;
}

export interface ServiceInfo {
    id: number;
    name: string;
}

export interface Address {
    address: string;
    pincode: string;
    state: string;
    city: string;
}

export interface Customer {
    id: number;
    name: string;
    profilePicId: string | null;
    phone: string;
    email: string | null;
    address: Address;
}

export interface Partner {
    id: number;
    firstName: string;
    lastName: string;
    user: PartnerUser;
}

export interface PartnerUser {
    id: number;
    name: string;
    profilePicId: string | null;
    phone: string;
    email: string | null;
    address: Address;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}
