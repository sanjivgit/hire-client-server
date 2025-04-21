interface PartnerListResponse {
    id: number;
    name: string;
    profilePic: string | null;
    status: string;
    createdAt: string;
}

class PartnerListResponseDto {
    public id: number;
    public name: string;
    public profilePic: string | null;
    public status: string;
    public createdAt: string;
    public serviceType: string;
    constructor(partner: any) {
        this.id = partner.id;
        this.name = `${partner.first_name} ${partner.last_name}`;
        this.profilePic = partner.user?.profile_pic ? `/uploads/profile-pics/${partner.user.profile_pic}` : null;
        this.status = partner.status;
        this.serviceType = partner.service_type?.name;
        this.createdAt = partner.created_at;
    }
}

export default PartnerListResponseDto; 