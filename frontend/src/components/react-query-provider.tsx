'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface QueryClientProviderWrapperProps {
    children: React.ReactNode;
}

export default function QueryClientProviderWrapper({ children }: QueryClientProviderWrapperProps) {
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}