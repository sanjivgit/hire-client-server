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
  private sequelize: any;
  private partner_services: any;

  constructor() {
    this.users = db.users;
    this.partners = db.partners;
    this.sequelize = db.sequelize;
    this.partner_services = db.partner_services;
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
    });

    return generateRes(user);
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

  becomePartner = async (userDetails: any) => {
    const { serviceIds, ...partnerDetails } = userDetails;
    const t = await this.sequelize.transaction();

    try {
      const partner = await this.partners.create(partnerDetails, {
        transaction: t,
        returning: [
          "id",
          "firstName",
          "lastName",
          "userId",
          "aadharNumber",
          "serviceTypeId",
          "aadharImageId",
          "additionalDocumentId",
          "createdAt",
          "updatedAt",
        ],
      });

      await Promise.all(
        serviceIds.map((serviceId: number) =>
          this.partner_services.create(
            { partnerId: partner.id, serviceId: serviceId },
            { transaction: t }
          )
        )
      );

      await t.commit();
      return generateRes(partner);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };
}

export default UserDao;
