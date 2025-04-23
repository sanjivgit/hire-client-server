interface ServiceHistoryDetailResponse {
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
        profilePic: string | null;
        status: string;
        createdAt: string;
        serviceType: string;
        totalCompletedTasks: number;
        services: Array<{
            id: number;
            name: string;
            price: number;
        }>;
    };
    userDetails: {
        id: number;
        name: string;
        email: string;
        phone: string;
        profilePic: string | null;
        address: any;
        createdAt: string;
        totalRequests: number;
    };
}

class ServiceHistoryDetailResponseDto {
    public workDetails: {
        id: number;
        status: string;
        amount: number;
        description: string;
        createdAt: string;
        updatedAt: string;
        serviceName: string;
        serviceRequestId: number;
    };
    public partnerDetails: {
        id: number;
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        profilePic: string | null;
        status: string;
        createdAt: string;
        serviceType: string;
        totalCompletedTasks: number;
        services: Array<{
            id: number;
            name: string;
            price: number;
        }>;
    };
    public userDetails: {
        id: number;
        name: string;
        email: string;
        phone: string;
        profilePic: string | null;
        address: any;
        createdAt: string;
        totalRequests: number;
    };

    constructor(data: any) {
        try {
            // Work Details
            this.workDetails = {
                id: parseInt(data.workDetails.id) || 0,
                status: data.workDetails.status || "unknown",
                amount: parseFloat(data.workDetails.amount) || 0,
                description: data.workDetails.description || "",
                createdAt: data.workDetails.createdAt || new Date().toISOString(),
                updatedAt: data.workDetails.updatedAt || new Date().toISOString(),
                serviceName: data.workDetails.serviceName || "Unknown Service",
                serviceRequestId: parseInt(data.workDetails.serviceRequestId) || 0
            };

            // Partner Details
            this.partnerDetails = {
                id: parseInt(data.partnerDetails.id) || 0,
                name: data.partnerDetails.name || "Unknown",
                firstName: data.partnerDetails.firstName || "",
                lastName: data.partnerDetails.lastName || "",
                email: data.partnerDetails.email || "",
                phone: data.partnerDetails.phone || "",
                profilePic: data.partnerDetails.profilePic ? `/uploads/profile-pics/${data.partnerDetails.profilePic}` : null,
                status: data.partnerDetails.status || "unknown",
                createdAt: data.partnerDetails.createdAt || new Date().toISOString(),
                serviceType: data.partnerDetails.serviceType || "Unknown",
                totalCompletedTasks: parseInt(data.partnerDetails.totalCompletedTasks) || 0,
                services: Array.isArray(data.partnerDetails.services) ?
                    data.partnerDetails.services.map((service: any) => ({
                        id: parseInt(service.service_id) || 0,
                        name: service.service_name || "Unknown",
                        price: parseFloat(service.service_price) || 0
                    })) : []
            };

            // User Details
            this.userDetails = {
                id: parseInt(data.userDetails.id) || 0,
                name: data.userDetails.name || "Unknown",
                email: data.userDetails.email || "",
                phone: data.userDetails.phone || "",
                profilePic: data.userDetails.profilePic ? `/uploads/profile-pics/${data.userDetails.profilePic}` : null,
                address: typeof data.userDetails.address === 'string' ?
                    (data.userDetails.address.startsWith('{') ? JSON.parse(data.userDetails.address) : data.userDetails.address) :
                    (data.userDetails.address || {}),
                createdAt: data.userDetails.createdAt || new Date().toISOString(),
                totalRequests: parseInt(data.userDetails.totalRequests) || 0
            };
        } catch (error) {
            console.error("Error creating ServiceHistoryDetailResponseDto:", error, data);
            // Set default values if parsing fails
            this.workDetails = {
                id: 0,
                status: "Error",
                amount: 0,
                description: "Error parsing data",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                serviceName: "Unknown",
                serviceRequestId: 0
            };
            this.partnerDetails = {
                id: 0,
                name: "Error",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                profilePic: null,
                status: "Error",
                createdAt: new Date().toISOString(),
                serviceType: "Unknown",
                totalCompletedTasks: 0,
                services: []
            };
            this.userDetails = {
                id: 0,
                name: "Error",
                email: "",
                phone: "",
                profilePic: null,
                address: {},
                createdAt: new Date().toISOString(),
                totalRequests: 0
            };
        }
    }
}

export default ServiceHistoryDetailResponseDto; 