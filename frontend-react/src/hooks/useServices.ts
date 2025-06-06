import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/apiService';
import { SERVICES, FILES_UPLOAD } from '@/utils/apis';

// Interface for Service with service type
export interface ServiceWithType {
    id: number;
    name: string;
    iconId: number;
    serviceType: {
        id: number;
        name: string;
    };
}

// Interface for Service list response
export interface ServiceListResponse {
    data: ServiceWithType[];
}

// Interface for create/update service payload
export interface ServicePayload {
    name: string;
    serviceTypeId: number;
    iconId: number;
}

// Interface for file upload response
export interface FileUploadResponse {
    data: {
        id: number;
        filePath: string;
    };
}

// Hook to fetch services list
export function useServicesList() {
    return useQuery({
        queryKey: [SERVICES.LIST],
        queryFn: async () => {
            const response = await apiClient.get<ServiceListResponse>(SERVICES.LIST);
            return response.data;
        },
    });
}

// Hook to create a new service
export function useCreateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ServicePayload) => {
            const response = await apiClient.post(SERVICES.CREATE, payload);
            return response.data;
        },
        onSuccess: () => {
            // Invalidate services list query to refetch
            queryClient.invalidateQueries({ queryKey: [SERVICES.LIST] });
        },
    });
}

// Hook to update an existing service
export function useUpdateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: ServicePayload }) => {
            const response = await apiClient.put(SERVICES.UPDATE(id), payload);
            return response.data;
        },
        onSuccess: () => {
            // Invalidate services list query to refetch
            queryClient.invalidateQueries({ queryKey: [SERVICES.LIST] });
        },
    });
}

// Hook to delete a service
export function useDeleteService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await apiClient.delete(SERVICES.DELETE(id));
            return response.data;
        },
        onSuccess: () => {
            // Invalidate services list query to refetch
            queryClient.invalidateQueries({ queryKey: [SERVICES.LIST] });
        },
    });
}

// Hook to upload a file
export function useFileUpload() {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await apiClient.post<FileUploadResponse>(FILES_UPLOAD.UPLOAD + '?fileFor=icon', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        },
    });
} 