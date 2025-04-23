interface PartnerWorkStatsResponse {
    partnerId: number;
    partnerName: string;
    partnerStatus: string;
    email: string;
    profilePic: string | null;
    serviceType: string;
    totalAmount: number;
    completedCount: number;
    pendingCount: number;
    cancelledCount: number;
}

class PartnerWorkStatsResponseDto {
    public partnerId: number;
    public partnerName: string;
    public partnerStatus: string;
    public email: string;
    public profilePic: string | null;
    public serviceType: string;
    public totalAmount: number;
    public completedCount: number;
    public pendingCount: number;
    public cancelledCount: number;

    constructor(stats: any) {
        try {
            this.partnerId = parseInt(stats.partner_id);
            this.partnerName = `${stats.first_name || ''} ${stats.last_name || ''}`.trim() || stats.user_name || "Unknown";
            this.partnerStatus = stats.partner_status || "Unknown";
            this.email = stats.email || "Unknown";
            this.profilePic = stats.profile_pic ? `/uploads/profile-pics/${stats.profile_pic}` : null;
            this.serviceType = stats.service_type_name || "Unknown";
            this.totalAmount = parseFloat(stats.total_amount) || 0;
            this.completedCount = parseInt(stats.completed_count) || 0;
            this.pendingCount = parseInt(stats.pending_count) || 0;
            this.cancelledCount = parseInt(stats.cancelled_count) || 0;
        } catch (error) {
            console.error("Error creating PartnerWorkStatsResponseDto:", error, stats);
            // Set default values if parsing fails
            this.partnerId = 0;
            this.partnerName = "Error parsing data";
            this.partnerStatus = "unknown";
            this.email = "unknown";
            this.profilePic = null;
            this.serviceType = "unknown";
            this.totalAmount = 0;
            this.completedCount = 0;
            this.pendingCount = 0;
            this.cancelledCount = 0;
        }
    }
}

export default PartnerWorkStatsResponseDto; 