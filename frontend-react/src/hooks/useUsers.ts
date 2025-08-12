import { useQuery } from '@tanstack/react-query';
import apiClient from '@/utils/apiService';
import { USERS } from '@/utils/apis';

export interface Partner {
    data: {
        id: string;
        name: string;
        email: string;
        phone: string;
        company: string;
        address: string;
        status: 'pending' | 'approved' | 'rejected';
        joinedDate: string;
        avatar?: string;
        businessType?: string;
        documents?: {
            id: string;
            name: string;
            url: string;
            type: string;
        }
    }[];
}
interface Address {
    address: string;
    pincode: string;
    state: string;
    city: string;
}

interface Service {
    id: number;
    name: string;
}

interface ServiceType {
    id: number;
    name: string;
}

interface PartnerDetails {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string | null;
    phone: string;
    address: Address;
    profilePic: string | null;
    serviceType: ServiceType;
    services: Service[];
    aadharNumber: string;
    aadharImage: number;
    additionalDocument: number;
    status: 'pending' | 'approved' | 'rejected';
    reason: string;
    reasonType: 'Rejection' | 'Other' | string;
    createdAt: string;
}

interface UserList {
    data: {
        users: {
            id: string;
            name: string;
            email: string;
            phone: string;
            isPartner: boolean;
            role: string;
            company: string;
            address: Address;
            profilePic: string;
            status: 'pending' | 'approved' | 'rejected';
            serviceType: string;
            createdAt: string;
        }[],
        pagination: {
            currentPage: number,
            totalItems: number,
            totalPages: number,
            itemsPerPage: number
        }
    };
}

// Get all partners
export const useUsers = (page: number, query: string) => {
    return useQuery({
        queryKey: [USERS.GET_LIST, page, query],
        queryFn: async () => {
            const { data } = await apiClient.get<UserList>(USERS.GET_LIST + `${page}&limit=10&query=${query}`);
            return data.data;
        }
    });
};

// Get single partner details
export const usePartnerDetails = (id: string) => {
    return useQuery({
        queryKey: [USERS.GET_LIST, id],
        queryFn: async () => {
            const { data } = await apiClient.get<{ data: PartnerDetails }>(USERS.GET_LIST + `/${id}`);
            return data.data;
        },
        enabled: !!id // Only run the query if an ID is provided
    });
};
