
interface PartnerResponse {
    id: number; 
    user_id: number;
    first_name: string;
    last_name: string;
    service_type_id: number;
    status: string;
    aadhar_number: string;
    aadhar_image_id: number;
    additional_document_id: number;
    created_at: string;
    updated_at: string;
}   

class PartnerResponseDto {
    public id: number;
    public userId: number;
    public firstName: string;
    public lastName: string;
    public serviceTypeId: number;
    public status: string;
    public aadharNumber: string;
    public aadharImageId: number;
    public additionalDocumentId: number;
    public createdAt: string;
    public updatedAt: string;

    constructor(response:PartnerResponse) {
        this.id = response.id;
        this.userId = response.user_id;
        this.firstName = response.first_name;
        this.lastName = response.last_name;
        this.serviceTypeId = response.service_type_id;
        this.status = response.status;
        this.aadharNumber = response.aadhar_number;
        this.aadharImageId = response.aadhar_image_id;
        this.additionalDocumentId = response.additional_document_id;
        this.createdAt = response.created_at;
        this.updatedAt = response.updated_at;
    }
}   

export default PartnerResponseDto;