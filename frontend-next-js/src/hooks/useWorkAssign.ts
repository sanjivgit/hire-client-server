import { DASHBOARD } from "@/utils/apis";
import apiClient from "@/utils/apiService";
import { useQuery } from "@tanstack/react-query";


// Partner with statistics interfaces
export interface PartnerWithStats {
    id: number;
    name: string;
    profilePic?: string;
    status: string;
    serviceType: string;
    pendingCount: number;
    completedCount: number;
    cancelledCount: number;
    totalEarnings: number;
    createdAt: string;
}

export interface PartnerStatsResponse {
    data: {
        partners: PartnerWithStats[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        }
    }
}

// Partner statistics summary interface
export interface PartnerStatistics {
    data: {
        totalPending: number;
        totalCompleted: number;
        totalCancelled: number;
    }
}

// Get partners with statistics
export const usePartnersWithStats = (page: number, search: string = '', status: string = 'all') => {
    return useQuery({
        queryKey: [DASHBOARD.PARTNER_LIST_WITH_STATS, page, search, status],
        queryFn: async () => {
            let url = `${DASHBOARD.PARTNER_LIST_WITH_STATS}${page}`;
            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            if (status !== 'all') {
                url += `&status=${encodeURIComponent(status)}`;
            }

            const { data } = await apiClient.get<PartnerStatsResponse>(url);
            return data.data;
        },
        placeholderData: (prev) => prev,
    });
};

// Get partner statistics summary
export const usePartnerStatistics = () => {
    return useQuery({
        queryKey: [DASHBOARD.ACCEPTED_SERVICES_STATISTICS],
        queryFn: async () => {
            const { data } = await apiClient.get<PartnerStatistics>(DASHBOARD.ACCEPTED_SERVICES_STATISTICS);
            return data.data;
        }
    });
}; 