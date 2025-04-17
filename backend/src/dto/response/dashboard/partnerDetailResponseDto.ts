interface PartnerDetailResponse {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    address: {
        address: string;
        pincode: string;
        state: string;
        city: string;
    } | null;
    profilePic: string | null;
    serviceType: {
        id: number;
        name: string;
    } | null;
    services: Array<{
        id: number;
        name: string;
    }>;
    aadharNumber: string;
    aadharImage: string | null;
    additionalDocument: string | null;
    status: string;
    statusReason: string | null;
    createdAt: string;
    updatedAt: string;
}

class PartnerDetailResponseDto {
    public id: number;
    public userId: number;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public email: string | null;
    public phone: string | null;
    public address: {
        address: string;
        pincode: string;
        state: string;
        city: string;
    } | null;
    public profilePic: string | null;
    public serviceType: {
        id: number;
        name: string;
    } | null;
    public services: Array<{
        id: number;
        name: string;
    }>;
    public aadharNumber: string;
    public aadharImage: string | null;
    public additionalDocument: string | null;
    public status: string;
    public statusReason: string | null;
    public createdAt: string;
    public updatedAt: string;

    constructor(partner: any) {
        this.id = partner.id;
        this.userId = partner.user_id;
        this.firstName = partner.first_name;
        this.lastName = partner.last_name;
        this.fullName = `${partner.first_name} ${partner.last_name}`;
        this.email = partner.user?.email || null;
        this.phone = partner.user?.phone || null;
        this.address = partner.user?.address || null;
        this.profilePic = partner.user?.profile_pic;
        this.serviceType = partner.service_type
            ? {
                id: partner.service_type.id,
                name: partner.service_type.name
            }
            : null;
        this.services = partner.services
            ? partner.services.map((service: any) => ({
                id: service.id,
                name: service.name
            }))
            : [];
        this.aadharNumber = partner.aadhar_number;
        this.aadharImage = partner.aadhar_image.id;
        this.additionalDocument = partner.additional_document.id;
        this.status = partner.status;
        this.statusReason = partner.reason ? partner.reason.reason : null;
        this.createdAt = partner.created_at;
        this.updatedAt = partner.updated_at;
    }
}

export default PartnerDetailResponseDto; 