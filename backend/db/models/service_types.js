'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      service_types.hasMany(models.services, {
        foreignKey: 'serviceTypeId',
        as: 'services',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  service_types.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'service_types',
  });
  return service_types;
};