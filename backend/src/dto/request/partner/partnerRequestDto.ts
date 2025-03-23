
interface PartnerBody {
    firstName: string;
    lastName: string;
    serviceTypeId: number;
    serviceIds: number[];
    aadharNumber: string;
    aadharImageId: number;
    additionalDocumentId: number;
}

class PartnerRequestDto {
    public first_name: string;
    public last_name: string;
    public service_type_id: number;
    public service_ids: number[];
    public aadhar_number: string;
    public aadhar_image_id: number;
    public additional_document_id: number;

    constructor(body:PartnerBody) {
        this.first_name = body.firstName;
        this.last_name = body.lastName;
        this.service_type_id = body.serviceTypeId;
        this.service_ids = body.serviceIds;
        this.aadhar_number = body.aadharNumber;
        this.aadhar_image_id = body.aadharImageId;
        this.additional_document_id = body.additionalDocumentId;
    }
}

export default PartnerRequestDto;