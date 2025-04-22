interface PartnerListWithStatsResponse {
    id: number;
    name: string;
    profilePic: string | null;
    status: string;
    createdAt: string;
    pendingCount: number;
    completedCount: number;
    cancelledCount: number;
    totalEarnings: number;
    serviceType: string;
}

class PartnerListWithStatsResponseDto {
    public id: number;
    public name: string;
    public profilePic: string | null;
    public status: string;
    public createdAt: string;
    public pendingCount: number;
    public completedCount: number;
    public cancelledCount: number;
    public totalEarnings: number;
    public serviceType: string;

    constructor(partner: any) {
        try {
            this.id = parseInt(partner.id);

            // Handle name from different sources
            if (partner.name) {
                this.name = partner.name;
            } else if (partner.first_name && partner.last_name) {
                this.name = `${partner.first_name} ${partner.last_name}`;
            } else {
                this.name = "Unknown";
            }

            // Handle profile pic
            this.profilePic = partner.profile_pic ? `/uploads/profile-pics/${partner.profile_pic}` : null;

            // Handle status
            this.status = partner.status || "Unknown";

            // Handle service type
            this.serviceType = partner.service_type_name || "Unknown";

            // Handle date
            this.createdAt = partner.created_at || new Date().toISOString();

            // Safely parse numeric values with fallbacks
            this.pendingCount = partner.pending_count ? parseInt(partner.pending_count) : 0;
            this.completedCount = partner.completed_count ? parseInt(partner.completed_count) : 0;
            this.cancelledCount = partner.cancelled_count ? parseInt(partner.cancelled_count) : 0;
            this.totalEarnings = partner.total_earnings ? parseFloat(partner.total_earnings) : 0;
        } catch (error) {
            console.error("Error creating PartnerListWithStatsResponseDto:", error, partner);
            // Set default values if parsing fails
            this.id = partner.id || 0;
            this.name = "Error parsing data";
            this.profilePic = null;
            this.status = "unknown";
            this.serviceType = "unknown";
            this.createdAt = new Date().toISOString();
            this.pendingCount = 0;
            this.completedCount = 0;
            this.cancelledCount = 0;
            this.totalEarnings = 0;
        }
    }
}

export default PartnerListWithStatsResponseDto; 