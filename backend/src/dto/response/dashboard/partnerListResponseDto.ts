interface PartnerListResponse {
    id: number;
    name: string;
    profilePic: string | null;
    email: string | null;
    address: {
        address: string;
        pincode: string;
        state: string;
        city: string;
    } | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}

class PartnerListResponseDto {
    public id: number;
    public name: string;
    public profilePic: string | null;
    public email: string | null;
    public address: {
        address: string;
        pincode: string;
        state: string;
        city: string;
    } | null;
    public status: string;
    public createdAt: string;
    public updatedAt: string;

    constructor(partner: any) {
        this.id = partner.id;
        this.name = `${partner.first_name} ${partner.last_name}`;
        this.profilePic = partner.user?.profile_pic ? `/uploads/profile-pics/${partner.user.profile_pic}` : null;
        this.email = partner.user?.email || null;
        this.address = partner.user?.address || null;
        this.status = partner.status;
        this.createdAt = partner.created_at;
        this.updatedAt = partner.updated_at;
    }
}

export default PartnerListResponseDto; 