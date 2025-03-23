const db = require("../../../db/models/index");
import { Op } from "sequelize";

class ServiceDao {
  private services: any;
  private sequelize: any;

  constructor() {
    this.services = db.services;
    this.sequelize = db.sequelize;
  }

  createService = async (data: {
    name: string;
    service_type_id: number;
  }) => {
    try {
      const service = await this.services.create(data);
      return await this.getServiceById(service.id);
    } catch (error) {
      throw error;
    }
  };

  updateService = async (
    id: number,
    data: {
      name?: string;
      service_type_id?: number;
    }
  ) => {
    try {
      const [updatedCount] = await this.services.update(data, {
        where: { id },
      });
      if (updatedCount === 0) return null;

      return await this.getServiceById(id);
    } catch (error) {
      throw error;
    }
  };

  deleteService = async (id: number) => {
    try {
      const deletedCount = await this.services.destroy({
        where: { id },
      });
      return deletedCount > 0;
    } catch (error) {
      throw error;
    }
  };

  getAllServices = async (search?: string) => {
    try {
      const whereClause = search
        ? {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          }
        : {};

      const services = await this.services.findAll({
        where: whereClause,
        order: [["created_at", "DESC"]],
        attributes: ['id', 'name', 'created_at', 'updated_at'],
        include: [
          {
            model: db.service_types,
            as: "service_type",
            attributes: ["id", "name"],
          },
        ],
      });
      return services;
    } catch (error) {
      throw error;
    }
  };

  getServicesByTypeId = async (serviceTypeId: number, search?: string) => {
    try {
      const whereClause: any = {
        service_type_id: serviceTypeId,
      };

      if (search) {
        whereClause.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      const services = await this.services.findAll({
        where: whereClause,
        order: [["created_at", "DESC"]],
        attributes: ['id', 'name', 'created_at', 'updated_at'],
        include: [
          {
            model: db.service_types,
            as: "service_type",
            attributes: ["id", "name"],
          },
        ],
      });
      return services;
    } catch (error) {
      throw error;
    }
  };

  getServiceById = async (id: number) => {
    try {
      return await this.services.findByPk(id, {
        attributes: ['id', 'name', 'created_at', 'updated_at'],
        include: [
          {
            model: db.service_types,
            as: "service_type",
            attributes: ["id", "name"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  };
}

export default ServiceDao; 