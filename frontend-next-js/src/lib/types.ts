// Service Type interfaces
export interface ServiceType {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

// Service interfaces
export interface Service {
    id: string
    name: string
    description: string
    price: number
    serviceTypeId: string
    serviceTypeName: string
    imageUrl?: string
    createdAt: string
    updatedAt: string
}

// Mock data for service types
export const mockServiceTypes: ServiceType[] = [
    {
        id: "1",
        name: "Web Development",
        createdAt: "2023-01-15T10:30:00Z",
        updatedAt: "2023-01-15T10:30:00Z",
    },
    {
        id: "2",
        name: "Mobile App Development",
        createdAt: "2023-02-20T14:45:00Z",
        updatedAt: "2023-02-20T14:45:00Z",
    },
    {
        id: "3",
        name: "UI/UX Design",
        createdAt: "2023-03-10T09:15:00Z",
        updatedAt: "2023-03-10T09:15:00Z",
    },
    {
        id: "4",
        name: "Digital Marketing",
        createdAt: "2023-04-05T16:20:00Z",
        updatedAt: "2023-04-05T16:20:00Z",
    },
    {
        id: "5",
        name: "SEO Optimization",
        createdAt: "2023-05-12T11:10:00Z",
        updatedAt: "2023-05-12T11:10:00Z",
    },
]

// Mock data for services
export const mockServices: Service[] = [
    {
        id: "1",
        name: "E-commerce Website",
        description: "Complete e-commerce solution with payment integration",
        price: 2500,
        serviceTypeId: "1",
        serviceTypeName: "Web Development",
        imageUrl: "/placeholder.svg?height=100&width=100",
        createdAt: "2023-01-20T10:30:00Z",
        updatedAt: "2023-01-20T10:30:00Z",
    },
    {
        id: "2",
        name: "Corporate Website",
        description: "Professional website for businesses",
        price: 1500,
        serviceTypeId: "1",
        serviceTypeName: "Web Development",
        imageUrl: "/placeholder.svg?height=100&width=100",
        createdAt: "2023-02-15T14:45:00Z",
        updatedAt: "2023-02-15T14:45:00Z",
    },
    {
        id: "3",
        name: "iOS App Development",
        description: "Native iOS application development",
        price: 3500,
        serviceTypeId: "2",
        serviceTypeName: "Mobile App Development",
        imageUrl: "/placeholder.svg?height=100&width=100",
        createdAt: "2023-03-05T09:15:00Z",
        updatedAt: "2023-03-05T09:15:00Z",
    },
    {
        id: "4",
        name: "Android App Development",
        description: "Native Android application development",
        price: 3200,
        serviceTypeId: "2",
        serviceTypeName: "Mobile App Development",
        imageUrl: "/placeholder.svg?height=100&width=100",
        createdAt: "2023-04-10T16:20:00Z",
        updatedAt: "2023-04-10T16:20:00Z",
    },
    {
        id: "5",
        name: "Brand Identity Design",
        description: "Complete brand identity package",
        price: 1200,
        serviceTypeId: "3",
        serviceTypeName: "UI/UX Design",
        imageUrl: "/placeholder.svg?height=100&width=100",
        createdAt: "2023-05-20T11:10:00Z",
        updatedAt: "2023-05-20T11:10:00Z",
    },
]
