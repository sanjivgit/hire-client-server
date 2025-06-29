const db = require("../../../db/models/index");
import { add } from "winston";
import { sendPushNotification } from "../../services/sendNotification";
import { Op } from "sequelize";

class ServiceRequestDao {
  private serviceRequests: any;
  private sequelize: any;
  private services: any;
  private users: any;
  private acceptedServices: any;
  private serviceTypes: any;
  private partners: any;

  constructor() {
    this.serviceRequests = db.service_requests;
    this.sequelize = db.sequelize;
    this.services = db.services;
    this.users = db.users;
    this.acceptedServices = db.accepted_services;
    this.serviceTypes = db.service_types;
    this.partners = db.partners;
  }

  checkDuplicateServiceRequest = async (
    userId: number,
    serviceId: number
  ): Promise<any> => {
    try {
      // Calculate date 24 hours ago
      const oneDayAgo = new Date();
      oneDayAgo.setHours(oneDayAgo.getHours() - 24);

      const existingRequest = await this.serviceRequests.findOne({
        where: {
          user_id: userId,
          service_id: serviceId,
          created_at: {
            [Op.gte]: oneDayAgo
          }
        },
        include: [
          {
            model: this.services,
            as: "service",
            attributes: ["id", "name"]
          }
        ]
      });

      return existingRequest;
    } catch (error) {
      console.error("Error checking duplicate service request:", error);
      throw error;
    }
  };

  createServiceRequest = async (
    data: {
      user_id: number;
      service_id: number;
      description?: string;
      fcm_token: string;
    },
    address: { city: string; pincode: string }
  ) => {
    try {
      const serviceRequest = await this.serviceRequests.create(data);

      const query = `
        SELECT ft.token from 
          partners as p
          LEFT JOIN users u on u.id = p.user_id
          LEFT JOIN fcm_tokens ft on ft.user_id = p.user_id
          WHERE p.status = 'approved' AND (
              (u.address->>'pincode' = :userPincode AND :userPincode != '')
              OR 
              (LOWER(u.address->>'city') = LOWER(:userCity) AND :userCity != '')
            ) AND u.id != :RequestingUserId
      `;

      const results = await this.sequelize.query(query, {
        replacements: {
          userPincode: address.pincode,
          userCity: address.city,
          RequestingUserId: data.user_id,
        },
        type: this.sequelize.QueryTypes.SELECT,
      });

      sendPushNotification(
        results,
        "New Service Request",
        data?.description || "",
        {
          user_id: data.user_id,
          screen: "notification",
          serviceRequestId: serviceRequest.id,
        }
      );
      return await this.getServiceRequestById(serviceRequest.id);
    } catch (error) {
      throw error;
    }
  };

  deleteServiceRequest = async (id: number) => {
    try {
      const deletedCount = await this.serviceRequests.destroy({
        where: { id },
      });
      return deletedCount > 0;
    } catch (error) {
      throw error;
    }
  };

  getServiceRequestsByUserId = async (userId: number) => {
    try {
      // Calculate date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const serviceRequests = await this.serviceRequests.findAll({
        where: {
          user_id: userId,
          updated_at: {
            [Op.gte]: sevenDaysAgo, // Only get service requests updated in the last 7 days
          },
        },
        order: [["updated_at", "DESC"]], // Order by updated_at instead of created_at
        attributes: ["id", "description", "created_at", "updated_at"],
        include: [
          {
            model: this.users,
            as: "user",
            attributes: ["id", "name", "phone", "address"],
          },
          {
            model: this.services,
            as: "service",
            attributes: ["id", "name"],
            include: [
              {
                model: this.serviceTypes,
                as: "service_type",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: this.acceptedServices,
            as: "accepted_service",
            include: [
              {
                model: this.partners,
                as: "partner",
                attributes: ["id", "first_name", "last_name"],
                include: [
                  {
                    model: this.users,
                    as: "user",
                    attributes: ["id", "name", "phone", "address"],
                  },
                ],
              },
            ],
            required: false,
          },
        ],
      });
      return serviceRequests;
    } catch (error) {
      throw error;
    }
  };

  getAllServiceRequests = async (filters?: {
    start_date?: Date;
    end_date?: Date;
    service_id?: number;
    status?: string;
  }) => {
    try {
      const whereClause: any = {};

      // Apply date range filter
      if (filters?.start_date || filters?.end_date) {
        whereClause.created_at = {};
        if (filters.start_date) {
          whereClause.created_at[Op.gte] = filters.start_date;
        }
        if (filters.end_date) {
          whereClause.created_at[Op.lte] = filters.end_date;
        }
      }

      // Apply service filter
      if (filters?.service_id) {
        whereClause.service_id = filters.service_id;
      }

      // For status filter, we need to join with accepted_services
      const acceptedServiceWhere: any = {};
      if (filters?.status) {
        acceptedServiceWhere.status = filters.status;
      }

      const serviceRequests = await this.serviceRequests.findAll({
        where: whereClause,
        order: [["created_at", "DESC"]],
        attributes: ["id", "description", "created_at", "updated_at"],
        include: [
          {
            model: this.users,
            as: "user",
            attributes: ["id", "name", "phone", "address"],
          },
          {
            model: this.services,
            as: "service",
            attributes: ["id", "name"],
            include: [
              {
                model: this.serviceTypes,
                as: "service_type",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: this.acceptedServices,
            as: "accepted_service",
            required: filters?.status ? true : false,
            where: filters?.status ? acceptedServiceWhere : {},
          },
        ],
      });
      return serviceRequests;
    } catch (error) {
      throw error;
    }
  };

  getServiceRequestById = async (id: number) => {
    try {
      return await this.serviceRequests.findByPk(id, {
        attributes: ["id", "description", "created_at", "updated_at"],
        include: [
          {
            model: this.users,
            as: "user",
            attributes: ["id", "name", "phone", "address"],
          },
          {
            model: this.services,
            as: "service",
            attributes: ["id", "name"],
            include: [
              {
                model: this.serviceTypes,
                as: "service_type",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: this.acceptedServices,
            as: "accepted_service",
            required: false,
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  };

  cancelServiceRequest = async (
    id: number,
    data: {
      status?: string;
      description?: string;
    }
  ) => {
    try {
      const transaction = await this.sequelize.transaction();

      // Check if the accepted service exists and belongs to the partner
      const acceptedService = await this.acceptedServices.findOne({
        where: {
          service_request_id: id
        },
        transaction
      });

      if (!acceptedService) {
        await transaction.rollback();
        return await this.deleteServiceRequest(id);
      }

      await acceptedService.update(
        { status: data.status },
        { transaction }
      );

      if (data.description) {
        await this.serviceRequests.update(
          { description: data.description },
          {
            where: { id },
            transaction,
          }
        );
      }

      await transaction.commit();


      return { status: 'success' };
    } catch (error) {
      throw error;
    }
  };
}

export default ServiceRequestDao;
