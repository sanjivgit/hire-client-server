interface PartnerUpdateBody {
    id: number;
    firstName?: string;
    lastName?: string;
    serviceTypeId?: number;
    serviceIds?: number[];
    aadharNumber?: string;
    aadharImageId?: number;
    additionalDocumentId?: number;
}

class PartnerUpdateDto {
    public id: number;
    public first_name?: string;
    public last_name?: string;
    public service_type_id?: number;
    public service_ids?: number[];
    public aadhar_number?: string;
    public aadhar_image_id?: number;
    public additional_document_id?: number;
    public user_id: number;

    constructor(body: PartnerUpdateBody, userId: number) {
        this.id = body.id;
        this.user_id = userId;
        
        if (body.firstName) this.first_name = body.firstName;
        if (body.lastName) this.last_name = body.lastName;
        if (body.serviceTypeId) this.service_type_id = body.serviceTypeId;
        if (body.serviceIds && body.serviceIds.length > 0) this.service_ids = body.serviceIds;
        if (body.aadharNumber) this.aadhar_number = body.aadharNumber;
        if (body.aadharImageId) this.aadhar_image_id = body.aadharImageId;
        if (body.additionalDocumentId) this.additional_document_id = body.additionalDocumentId;
    }
}

export default PartnerUpdateDto; 