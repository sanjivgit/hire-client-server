import { generateRes } from "../../utils/generateRes";
const db = require("../../../db/models/index");

interface BecomePartner {
  firstName: string;
  lastName: string;
  userId: string;
  serviceTypeId: number;
  serviceIds: number[];
  aadharImageId: number;
  additionalDocumentId: number;
}

class PartnerDao {
  private partners: any;
  private sequelize: any;
  private partner_services: any;

  constructor() {
    this.partners = db.partners;
    this.sequelize = db.sequelize;
    this.partner_services = db.partner_services;
  }

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

export default PartnerDao;
