
interface RegistrationDto {
  name: string;
  phone: string;
  password: string;
}

interface RegistrationBody {
  fullName: string;
  phone: string;
  password: string;
}

class RegistrationDto implements RegistrationDto {
  constructor(body: RegistrationBody) {
    this.name = body.fullName;
    this.phone = body.phone;
    this.password = body.password;
  }
}
export default RegistrationDto;
