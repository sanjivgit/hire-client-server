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

interface BecomePartner {
  firstName: string;
  lastName: string;
  userId: string;
  serviceTypeId: number;
  serviceIds: number[];
  aadharImageId: number;
  additionalDocumentId: number;
}

class UserDao {
  private users: any;
  private partners: any;

  constructor() {
    this.users = db.users;
    this.partners = db.partners;
  }

  getUserByUserId = async (userId: string) => {
    const user = await this.users.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "name",
        "phone",
        "email",
        "address",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: this.partners,
          as: "partner", // Alias for the relation
          attributes: ["id", "serviceTypeId", "aadharNumber"], // Add necessary fields from partners
          required: false, // Ensures it does a LEFT JOIN (doesn't filter out users without partners)
        },
      ],
    });

    // Transform the response to include `isPartner`
    const formattedUser = {
      ...user.get(), // Get raw user object
      isPartner: !!user.partner, // Convert `partner` existence to boolean
    };

    return generateRes(formattedUser);
  };

  updateUserDetails = async (userId: string, details: UpdateUserDetails) => {
    const [updatedCount] = await this.users.update(details, {
      where: { id: userId },
    });

    if (updatedCount === 0) {
      return generateRes(null);
    }

    // Fetch and return updated user details
    const updatedUser = await this.users.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "name",
        "phone",
        "email",
        "address",
        "createdAt",
        "updatedAt",
      ],
    });

    // Parse the address back to object if it exists
    if (updatedUser && updatedUser.address) {
      try {
        updatedUser.address = updatedUser.address;
      } catch (error) {
        console.error("Error parsing address:", error);
      }
    }

    return generateRes(updatedUser);
  };
}

export default UserDao;
