const db = require("../../../db/models/index");
import { Op } from "sequelize";

class AcceptedServiceDao {
  private acceptedServices: any;
  private sequelize: any;
  private partners: any;
  private serviceRequests: any;
  private users: any;
  private services: any;
  private serviceTypes: any;

  constructor() {
    this.acceptedServices = db.accepted_services;
    this.sequelize = db.sequelize;
    this.partners = db.partners;
    this.serviceRequests = db.service_requests;
    this.users = db.users;
    this.services = db.services;
    this.serviceTypes = db.service_types;
  }

  // Create a new accepted service
  createAcceptedService = async (data: {
    partner_id: number;
    service_request_id: number;
    description?: string;
    amount?: number;
  }) => {
    try {
      // Check if the service request already has an accepted service
      const existingAcceptedService = await this.acceptedServices.findOne({
        where: { service_request_id: data.service_request_id }
      });

      if (existingAcceptedService) {
        throw new Error("This service request has already been accepted");
      }

      // Create the accepted service
      const acceptedService = await this.acceptedServices.create({
        ...data,
        status: 'pending' // Default status
      });

      return await this.getAcceptedServiceById(acceptedService.id);
    } catch (error) {
      throw error;
    }
  };

  // Update an accepted service (status, amount, description)
  updateAcceptedService = async (
    id: number,
    partnerId: number,
    data: {
      status?: string;
      amount?: number;
      description?: string;
    }
  ) => {
    try {
      // Check if the accepted service exists and belongs to the partner
      const acceptedService = await this.acceptedServices.findOne({
        where: {
          id,
          partner_id: partnerId
        }
      });

      if (!acceptedService) {
        throw new Error("Accepted service not found or you don't have permission to update it");
      }

      // Update the accepted service
      await acceptedService.update(data);

      return await this.getAcceptedServiceById(id);
    } catch (error) {
      throw error;
    }
  };

  // Get all accepted services for a specific partner
  getAcceptedServicesByPartnerId = async (partnerId: number) => {
    try {
      const acceptedServices = await this.acceptedServices.findAll({
        where: { partner_id: partnerId },
        order: [["created_at", "DESC"]],
        include: [
          {
            model: this.partners,
            as: "partner",
            attributes: ["id"],
            include: [
              {
                model: this.serviceTypes,
                as: "service_type",
                attributes: ["id", "name"]
              },
              {
                model: this.users,
                as: "user",
                attributes: ["id", "name", "phone", "address"]
              }
            ]
          },
          {
            model: this.serviceRequests,
            as: "service_request",
            attributes: ["id", "description", "created_at", "updated_at"],
            include: [
              {
                model: this.users,
                as: "user",
                attributes: ["id", "name", "phone", "address"]
              },
              {
                model: this.services,
                as: "service",
                attributes: ["id", "name"],
                include: [
                  {
                    model: this.serviceTypes,
                    as: "service_type",
                    attributes: ["id", "name"]
                  }
                ]
              }
            ]
          }
        ]
      });
      return acceptedServices;
    } catch (error) {
      throw error;
    }
  };

  // Get all accepted services with filters
  getAllAcceptedServices = async (filters?: {
    start_date?: Date;
    end_date?: Date;
    partner_id?: number;
    user_id?: number;
    status?: string;
  }) => {
    try {
      const whereClause: any = {};
      const serviceRequestWhere: any = {};

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

      // Apply partner filter
      if (filters?.partner_id) {
        whereClause.partner_id = filters.partner_id;
      }

      // Apply status filter
      if (filters?.status) {
        whereClause.status = filters.status;
      }

      // Apply user filter to service_request
      if (filters?.user_id) {
        serviceRequestWhere.user_id = filters.user_id;
      }

      const acceptedServices = await this.acceptedServices.findAll({
        where: whereClause,
        order: [["created_at", "DESC"]],
        include: [
          {
            model: this.partners,
            as: "partner",
            attributes: ["id"],
            include: [
              {
                model: this.serviceTypes,
                as: "service_type",
                attributes: ["id", "name"]
              },
              {
                model: this.users,
                as: "user",
                attributes: ["id", "name", "phone", "address"]
              }
            ]
          },
          {
            model: this.serviceRequests,
            as: "service_request",
            where: Object.keys(serviceRequestWhere).length > 0 ? serviceRequestWhere : undefined,
            attributes: ["id", "description", "created_at", "updated_at"],
            include: [
              {
                model: this.users,
                as: "user",
                attributes: ["id", "name", "phone", "address"]
              },
              {
                model: this.services,
                as: "service",
                attributes: ["id", "name"],
                include: [
                  {
                    model: this.serviceTypes,
                    as: "service_type",
                    attributes: ["id", "name"]
                  }
                ]
              }
            ]
          }
        ]
      });
      return acceptedServices;
    } catch (error) {
      throw error;
    }
  };

  // Get a specific accepted service by ID
  getAcceptedServiceById = async (id: number) => {
    try {
      return await this.acceptedServices.findByPk(id, {
        include: [
          {
            model: this.partners,
            as: "partner",
            attributes: ["id"],
            include: [
              {
                model: this.serviceTypes,
                as: "service_type",
                attributes: ["id", "name"]
              },
              {
                model: this.users,
                as: "user",
                attributes: ["id", "name", "phone", "address"]
              }
            ]
          },
          {
            model: this.serviceRequests,
            as: "service_request",
            attributes: ["id", "description", "created_at", "updated_at"],
            include: [
              {
                model: this.users,
                as: "user",
                attributes: ["id", "name", "phone", "address"]
              },
              {
                model: this.services,
                as: "service",
                attributes: ["id", "name"],
                include: [
                  {
                    model: this.serviceTypes,
                    as: "service_type",
                    attributes: ["id", "name"]
                  }
                ]
              }
            ]
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  };

  // Check if partner has already accepted a service request
  checkPartnerHasAcceptedRequest = async (partnerId: number, serviceRequestId: number) => {
    try {
      const acceptedService = await this.acceptedServices.findOne({
        where: {
          partner_id: partnerId,
          service_request_id: serviceRequestId
        }
      });
      
      return !!acceptedService;
    } catch (error) {
      throw error;
    }
  };
}

export default AcceptedServiceDao; 