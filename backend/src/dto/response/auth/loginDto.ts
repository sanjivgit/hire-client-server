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

interface User {
  id: number;
  name: string;
  phone: string;
  profilePicId: number;
  fcmToken: string;
  address: {
    address: string;
    pinCode: string;
    state: string;
    city: string;
  };
  role?: string | null;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  partner?: {
    id: number;
    firstName: string;
    lastName: string;
    aadharNumber: string;
    aadharImageId: number;
    additionalDocumentId: number;
    status: string;
    serviceTypeId: number;
    services: any[];
  } | null;
}
interface UserWithToken extends ResponseUser {
  token: string;
}

class LoginDto {
  token: string;
  user: User;


  constructor(response: UserWithToken) {

    this.token = response.token;
    this.user = {
      id: response.id,
      name: response.name,
      profilePicId: response.profile_pic,
      phone: response.phone,
      fcmToken: response.fcm_token,
      address: response.address,
    };

    if (response.role) {
      this.user.role = response.role;
      this.user.isAdmin = response.role === "admin";
      this.user.isSuperAdmin = response.role === "superAdmin";
    }

    if (response.partner?.id) {
      this.user.partner = {
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
