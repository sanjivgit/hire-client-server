interface ResponseUser {
  id: number;
  name: string;
  phone: string;
  profile_pic: number;
  fcm_token: string;
  address: {
    address: string;
    pinCode: string;
    state: string;
    city: string;
  };
  role: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  partner: {
    id: number;
    first_name: string;
    last_name: string;
    aadhar_number: string;
    aadhar_image_id: number;
    additional_document_id: number;
    status: string;
    service_type_id: number;
    services: any[];
  } | null;
}

interface Address {
  address: string;
  pinCode: string;
  state: string;
  city: string;
}

interface Partner {
  id: number;
  firstName: string;
  lastName: string;
  aadharNumber: string;
  aadharImageId: number;
  additionalDocumentId: number;
  status: string;
  serviceTypeId: number;
  services: any[];
}
interface UserWithToken extends ResponseUser {
  token: string;
}

class LoginDto {
  id: number;
  name: string;
  profilePicId: number;
  phone: string;
  address: Address;
  isPartner: boolean;
  role: string | null;
  isAdmin: boolean;
  partner?: Partner;


  constructor(response: UserWithToken) {

    this.id = response.id
    this.name = response.name
    this.profilePicId = response.profile_pic
    this.phone = response.phone
    this.address = response.address
    this.isPartner = !!response.partner?.id
    this.role = response.role
    this.isAdmin = response.role === "admin"
    if (response.partner?.id) {
      this.partner = {
        id: response.partner.id,
        firstName: response.partner.first_name,
        lastName: response.partner.last_name,
        aadharNumber: response.partner.aadhar_number,
        aadharImageId: response.partner.aadhar_image_id,
        additionalDocumentId: response.partner.additional_document_id,
        status: response.partner.status,
        serviceTypeId: response.partner.service_type_id,
        services: response.partner.services,
      };
    }
  }
}

export default LoginDto;
