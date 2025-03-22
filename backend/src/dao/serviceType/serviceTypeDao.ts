const db = require("../../../db/models/index");
import { Op } from "sequelize";

class ServiceTypeDao {
  private serviceTypes: any;
  private sequelize: any;

  constructor() {
    this.serviceTypes = db.service_types;
    this.sequelize = db.sequelize;
  }

  createServiceType = async (data: { name: string }) => {
    try {
      const serviceType = await this.serviceTypes.create(data);
      return serviceType;
    } catch (error) {
      throw error;
    }
  };

  updateServiceType = async (id: number, data: { name: string }) => {
    try {
      const [updatedCount] = await this.serviceTypes.update(data, {
        where: { id },
      });
      if (updatedCount === 0) return null;
      
      return await this.serviceTypes.findByPk(id);
    } catch (error) {
      throw error;
    }
  };

  deleteServiceType = async (id: number) => {
    try {
      const deletedCount = await this.serviceTypes.destroy({
        where: { id },
      });
      return deletedCount > 0;
    } catch (error) {
      throw error;
    }
  };

  getAllServiceTypes = async (search?: string) => {
    try {
      const whereClause = search ? {
        name: {
          [Op.iLike]: `%${search}%`
        }
      } : {};

      const serviceTypes = await this.serviceTypes.findAll({
        where: whereClause,
        order: [['created_at', 'DESC']],
        include: [{
          model: db.services,
          as: 'services',
          attributes: ['id', 'name']
        }]
      });
      return serviceTypes;
    } catch (error) {
      throw error;
    }
  };

  getServiceTypeById = async (id: number) => {
    try {
      return await this.serviceTypes.findByPk(id, {
        include: [{
          model: db.services,
          as: 'services',
          attributes: ['id', 'name']
        }]
      });
    } catch (error) {
      throw error;
    }
  };
}

export default ServiceTypeDao; 