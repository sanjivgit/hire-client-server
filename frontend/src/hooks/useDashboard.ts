import { useQuery } from '@tanstack/react-query';
import apiClient from '@/utils/apiService';
import { DASHBOARD } from '@/utils/apis';

export interface DashboardStats {
    data: {
        totalPartners: number;
        pendingRequests: number;
        approvedPartners: number;
        rejectedPartners: number;
    }
}

export interface Partner {
    data: {
        id: number;
        name: string;
        profilePic: string | null;
        status: string;
        createdAt: string;
    }[];
}

export interface Activity {
    id: string;
    action: string;
    description: string;
    timestamp: string;
    user: {
        name: string;
        role: string;
        avatar?: string;
    };
}

export const useDashboardStatistics = () => {
    return useQuery({
        queryKey: [DASHBOARD.PARTNER_STATISTICS],
        queryFn: async () => {
            const { data } = await apiClient.get<DashboardStats>(DASHBOARD.PARTNER_STATISTICS);

            return data.data;
        }
    });
};

export const useRecentPartners = () => {
    return useQuery({
        queryKey: [DASHBOARD.LATEST_PARTNERS],
        queryFn: async () => {
            const { data } = await apiClient.get<Partner>(DASHBOARD.LATEST_PARTNERS);
            return data.data;
        }
    });
};

export const useRecentActivities = () => {
    return useQuery({
        queryKey: ['dashboard', 'recentActivities'],
        queryFn: async () => {
            const response = await apiClient.get<Activity[]>(DASHBOARD.RECENT_ACTIVITIES);
            return response.data;
        }
    });
}; 