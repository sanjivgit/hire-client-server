interface PartnerHistoryResponse {
    id: number;
    serviceName: string;
    status: string;
    amount: number;
    userAddress: string;
    userName: string;
    userProfilePic: string | null;
    createdAt: string;
    updatedAt: string;
}

class PartnerHistoryResponseDto {
    public id: number;
    public serviceName: string;
    public status: string;
    public amount: number;
    public userAddress: string;
    public userName: string;
    public userProfilePic: string | null;
    public createdAt: string;
    public updatedAt: string;

    constructor(history: any) {
        try {
            this.id = parseInt(history.id);
            this.serviceName = history.service_name || "Unknown";
            this.status = history.status || "Unknown";
            this.amount = parseFloat(history.amount) || 0;
            this.userAddress = typeof history.address === 'string' ? history.address :
                (typeof history.address === 'object' && history.address ?
                    JSON.stringify(history.address) : "Unknown");
            this.userName = history.user_name || "Unknown";
            this.userProfilePic = history.user_profile_pic ? `/uploads/profile-pics/${history.user_profile_pic}` : null;
            this.createdAt = history.created_at || new Date().toISOString();
            this.updatedAt = history.updated_at || new Date().toISOString();
        } catch (error) {
            console.error("Error creating PartnerHistoryResponseDto:", error, history);
            // Set default values if parsing fails
            this.id = 0;
            this.serviceName = "Error parsing data";
            this.status = "unknown";
            this.amount = 0;
            this.userAddress = "Unknown";
            this.userName = "Unknown";
            this.userProfilePic = null;
            this.createdAt = new Date().toISOString();
            this.updatedAt = new Date().toISOString();
        }
    }
}

export default PartnerHistoryResponseDto; 