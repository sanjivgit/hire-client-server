import { generateRes } from "../../utils/generateRes";
const db = require("../../../db/models/index");

interface AddressDetails {
  address: string;
  pinCode: string;
  state: string;
  district: string;
}

interface UpdateUserDetails {
  name?: string;
  address?: AddressDetails;
}

class UserDao {
  private users: any;

  constructor() {
    this.users = db.users;
  }

  getUserByUserId = async (userId: string) => {
    const user = await this.users.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'phone', 'email', 'address', 'createdAt', 'updatedAt']
    });

    return generateRes(user);
  };

  updateUserDetails = async (userId: string, details: UpdateUserDetails) => {

    const [updatedCount] = await this.users.update(
      details,
      { where: { id: userId } }
    );

    if (updatedCount === 0) {
      return generateRes(null);
    }

    // Fetch and return updated user details
    const updatedUser = await this.users.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'phone', 'email', 'address', 'createdAt', 'updatedAt']
    });

    // Parse the address back to object if it exists
    if (updatedUser && updatedUser.address) {
      try {
        updatedUser.address = updatedUser.address;
      } catch (error) {
        console.error('Error parsing address:', error);
      }
    }

    return generateRes(updatedUser);
  };
}

export default UserDao;
