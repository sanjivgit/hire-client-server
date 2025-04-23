import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/apiService';
import { DASHBOARD } from '@/utils/apis';
import axios from 'axios';

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

interface PartnerList {
    data: {
        partners: {
            id: string;
            name: string;
            email: string;
            phone: string;
            company: string;
            address: string;
            profilePic: string;
            status: 'pending' | 'approved' | 'rejected';
            serviceType: string;
            createdAt: string;
        }[],
        pagination: {
            currentPage: number,
            count: number,
            totalPage: number
        }
    };
}

// Get all partners
export const usePartners = (page: number, status: string, query: string) => {
    return useQuery({
        queryKey: [DASHBOARD.PARTNER_LIST, page, status, query],
        queryFn: async () => {
            const { data } = await apiClient.get<PartnerList>(DASHBOARD.PARTNER_LIST + `${page}&limit=10&status=${status}&search=${query}`);
            return data.data;
        }
    });
};

// Get single partner details
export const usePartnerDetails = (id: string) => {
    return useQuery({
        queryKey: [DASHBOARD.PARTNER_DETAILS, id],
        queryFn: async () => {
            const { data } = await apiClient.get<{ data: PartnerDetails }>(DASHBOARD.PARTNER_DETAILS + `/${id}`);
            return data.data;
        },
        enabled: !!id // Only run the query if an ID is provided
    });
};

// Approve a partner
export const useApprovePartner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await apiClient.put(DASHBOARD.PARTNER_APPROVE(id));
            return { id };
        },
        onSuccess: (data) => {
            // Invalidate relevant queries to refetch data
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_STATISTICS] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.LATEST_PARTNERS] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_DETAILS, data.id] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_LIST] });
        }
    });
};

// Reject a partner
export const useRejectPartner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
            const response = await apiClient.put(DASHBOARD.PARTNER_REJECT(id), { reason });
            return { id };
        },
        onSuccess: (data) => {
            // Invalidate relevant queries to refetch data
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_STATISTICS] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.LATEST_PARTNERS] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_DETAILS, data.id] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_LIST] });
        }
    });
};

// Suspend a partner
export const useSuspendPartner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
            await apiClient.put(DASHBOARD.PARTNER_SUSPEND(id), { reason });
            return { id };
        },
        onSuccess: (data) => {
            // Invalidate relevant queries to refetch data
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_STATISTICS] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.LATEST_PARTNERS] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_DETAILS, data.id] });
            queryClient.invalidateQueries({ queryKey: [DASHBOARD.PARTNER_LIST] });
        }
    });
};

