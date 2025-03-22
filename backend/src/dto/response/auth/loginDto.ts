interface ResponseUser {
  id: number;
  name: string;
  phone: string;
  address: {
    address: string;
    pinCode: string;
    state: string;
    district: string;
  };
  role: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  partner: {
    id: number;
    service_type_id: number;
    services: any[];
  } | null;
}

interface User {
  id: number;
  name: string;
  phone: string;
  address: {
    address: string;
    pinCode: string;
    state: string;
    district: string;
  };
  role?: string | null;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  partner?: {
    id: number;
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
      phone: response.phone, 
      address: response.address,
    };

    if(response.role) {
      this.user.role = response.role;
      this.user.isAdmin = response.role === "admin";
      this.user.isSuperAdmin = response.role === "superAdmin";
    }

    if(response.partner?.id) {
      this.user.partner = {
        id: response.partner.id,
        serviceTypeId: response.partner.service_type_id,
        services: response.partner.services,
      };
    }
  }
}

export default LoginDto;
