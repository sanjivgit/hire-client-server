import { DASHBOARD } from "@/utils/apis";
import apiClient from "@/utils/apiService";
import { useQuery } from "@tanstack/react-query";

export interface WorkHistoryItem {
    id: number;
    serviceName: string;
    status: 'completed' | 'active' | 'pending' | 'cancelled';
    amount: number;
    userAddress: string;
    userName: string;
    userProfilePic: string;
    createdAt: string;
    updatedAt: string;
}


export interface WorkHistoryResponse {
    data: {
        history: WorkHistoryItem[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        }
    }
}

export interface PartnerHistoryStatisticsResponse {
    data: {
        partnerId: number;
        partnerName: string;
        partnerStatus: string;
        email: string;
        profilePic: string;
        serviceType: string;
        totalAmount: number;
        completedCount: number;
        pendingCount: number;
        cancelledCount: number;
    }
}

export function usePartnerWorkHistory(partnerId: string, page = 1, status = 'all', search = '') {
    return useQuery({
        queryKey: [DASHBOARD.PARTNER_WORK_HISTORY('0'), partnerId, page, status, search],
        queryFn: async () => {
            const response = await apiClient.get<WorkHistoryResponse>(
                `${DASHBOARD.PARTNER_WORK_HISTORY(partnerId)}?page=${page}&status=${status}&search=${encodeURIComponent(search)}`
            );
            return response.data;
        },
        enabled: !!partnerId,
    });
}

export function usePartnerHistoryStatistics(partnerId: string) {
    return useQuery({
        queryKey: [DASHBOARD.PARTNER_WORK_STATS('0'), partnerId],
        queryFn: async () => {
            const response = await apiClient.get<PartnerHistoryStatisticsResponse>(
                `${DASHBOARD.PARTNER_WORK_STATS(partnerId)}`
            );
            return response.data;
        },
        enabled: !!partnerId,
    });
}

export interface WorkDetailResponse {
    data: {
        workDetails: {
            id: number;
            status: string;
            amount: number;
            description: string;
            createdAt: string;
            updatedAt: string;
            serviceName: string;
            serviceRequestId: number;
        };
        partnerDetails: {
            id: number;
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            profilePic: string;
            status: string;
            createdAt: string;
            serviceType: string;
            totalCompletedTasks: number;
            services: {
                id: number;
                name: string;
                price: number;
            }[];
        };
        userDetails: {
            id: number;
            name: string;
            email: string;
            phone: string;
            profilePic: string;
            address: {
                address: string;
                city: string;
                state: string;
                pincode: string;
            };
            createdAt: string;
            totalRequests: number;
        };
    };
}

export function useWorkDetails(workId: string) {
    return useQuery({
        queryKey: [DASHBOARD.SERVICE_HISTORY, workId],
        queryFn: async () => {
            const response = await apiClient.get<WorkDetailResponse>(
                `${DASHBOARD.SERVICE_HISTORY}/${workId}`
            );
            return response.data;
        },
        enabled: !!workId,
    });
}