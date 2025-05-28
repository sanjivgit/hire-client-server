import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/apiService';
import { SERVICE_TYPES } from '@/utils/apis';

// Interface for Service Type with services
export interface ServiceTypeWithServices {
    id: number;
    name: string;
    services?: {
        id: number;
        name: string;
    }[];
}

// Interface for Service Type list response
export interface ServiceTypeListResponse {
    data: ServiceTypeWithServices[];
}

// Interface for create/update service type payload
export interface ServiceTypePayload {
    name: string;
}

// Hook to fetch service types list
export function useServiceTypesList() {
    return useQuery({
        queryKey: [SERVICE_TYPES.LIST],
        queryFn: async () => {
            const response = await apiClient.get<ServiceTypeListResponse>(SERVICE_TYPES.LIST);
            return response.data;
        },
    });
}

// Hook to create a new service type
export function useCreateServiceType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ServiceTypePayload) => {
            const response = await apiClient.post(SERVICE_TYPES.CREATE, payload);
            return response.data;
        },
        onSuccess: () => {
            // Invalidate service types list query to refetch
            queryClient.invalidateQueries({ queryKey: [SERVICE_TYPES.LIST] });
        },
    });
}

// Hook to update an existing service type
export function useUpdateServiceType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: ServiceTypePayload }) => {
            const response = await apiClient.put(SERVICE_TYPES.UPDATE(id), payload);
            return response.data;
        },
        onSuccess: () => {
            // Invalidate service types list query to refetch
            queryClient.invalidateQueries({ queryKey: [SERVICE_TYPES.LIST] });
        },
    });
}

// Hook to delete a service type
export function useDeleteServiceType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await apiClient.delete(SERVICE_TYPES.DELETE(id));
            return response.data;
        },
        onSuccess: () => {
            // Invalidate service types list query to refetch
            queryClient.invalidateQueries({ queryKey: [SERVICE_TYPES.LIST] });
        },
    });
} 