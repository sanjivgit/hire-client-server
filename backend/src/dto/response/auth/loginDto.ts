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
  role: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

interface UserWithToken extends User {
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
      role: response.role || null, 
      isAdmin: response.role === "admin",
      isSuperAdmin: response.role === "superAdmin",
    };
  }
}

export default LoginDto;
