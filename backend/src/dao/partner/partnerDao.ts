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

interface UpdatePartner {
  id: number;
  user_id: number;
  first_name?: string;
  last_name?: string;
  service_type_id?: number;
  service_ids?: number[];
  aadhar_number?: string;
  aadhar_image_id?: number;
  additional_document_id?: number;
  status?: string;
}

class PartnerDao {
  private partners: any;
  private sequelize: any;
  private partner_services: any;
  private services: any;
  private serviceTypes: any;
  private users: any;
  private files: any;

  constructor() {
    this.partners = db.partners;
    this.sequelize = db.sequelize;
    this.partner_services = db.partner_services;
    this.services = db.services;
    this.serviceTypes = db.service_types;
    this.users = db.users;
    this.files = db.files;
  }

  becomePartner = async (userDetails: any) => {
    const { service_ids, ...partnerDetails } = userDetails;
    const t = await this.sequelize.transaction();

    try {
      const partner = await this.partners.create(partnerDetails, {
        transaction: t,
        returning: [
          "id",
          "first_name",
          "last_name",
          "user_id",
          "aadhar_number",
          "service_type_id",
          "aadhar_image_id",
          "additional_document_id",
          "created_at",
          "updated_at",
        ],
      });

      await Promise.all(
        service_ids.map((serviceId: number) =>
          this.partner_services.create(
            { partner_id: partner.id, service_id: serviceId },
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

  updatePartner = async (updateDetails: UpdatePartner) => {
    const { id, service_ids, ...partnerDetails } = updateDetails;
    const t = await this.sequelize.transaction();

    try {
      // Check if partner exists
      const partner = await this.partners.findByPk(id, {
        attributes: ["id", "user_id", "status", "created_at", "updated_at"],
      });
      if (!partner) {
        throw new Error("Partner not found");
      }

      // Check if the user_id matches with the partner's user_id
      if (partner.user_id !== updateDetails.user_id) {
        throw new Error(
          "You are not authorized to update this partner profile"
        );
      }

      // Set status to pending whenever an update is made
      partnerDetails.status = "pending";

      // Update partner details
      await partner.update(partnerDetails, { transaction: t });

      // If service_ids are provided, update partner services
      if (service_ids && service_ids.length > 0) {
        // Delete existing partner services
        await this.partner_services.destroy({
          where: { partner_id: id },
          transaction: t,
        });

        // Create new partner services
        await Promise.all(
          service_ids.map((serviceId: number) =>
            this.partner_services.create(
              { partner_id: id, service_id: serviceId },
              { transaction: t }
            )
          )
        );
      }

      // Fetch the updated partner with all associations
      const updatedPartner = await this.partners.findByPk(id, {
        attributes: ["id", "first_name", "last_name", "aadhar_number", "service_type_id", "aadhar_image_id", "additional_document_id", "status", "created_at", "updated_at"],
        include: [
          {
            model: this.users,
            as: "user",
            attributes: ["id", "name", "phone", "email", "address"],
          }
        ],
        transaction: t,
      });

      await t.commit();
      return updatedPartner;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  getPartnerById = async (id: number) => {
    try {
      return await this.partners.findByPk(id, {
        include: [
          {
            model: this.partner_services,
            as: "partner_services",
            include: [
              {
                model: this.services,
                as: "service",
              },
            ],
          },
          {
            model: this.serviceTypes,
            as: "service_type",
          },
          {
            model: this.users,
            as: "user",
            attributes: ["id", "name", "phone", "email", "address"],
          },
          {
            model: this.files,
            as: "aadhar_image",
          },
          {
            model: this.files,
            as: "additional_document",
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  };
}

export default PartnerDao;
