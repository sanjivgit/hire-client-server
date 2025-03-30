interface UserRequest {
  name?: string;
  profilePicId?: number;
  address?: {
    address: string;
    pincode: string;
    state: string;
    district: string;
  };
}

class UserRequestDto {
  public name?: string;
  public profile_pic?: number;
  public address?: {
    address: string;
    pincode: string;
    state: string;
    district: string;
  };

  constructor(user: UserRequest) {
    this.name = user.name;
    this.profile_pic = user.profilePicId;
    if (user.address) {
      this.address = {
        address: user.address?.address || "",
        pincode: user.address?.pincode || "",
        state: user.address?.state || "",
        district: user.address?.district || "",
      };
    }
  }
}

export default UserRequestDto;
