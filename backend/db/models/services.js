'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      services.belongsTo(models.service_types, {
        foreignKey: 'serviceTypeId',
        as: 'serviceType',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  services.init({
    name: DataTypes.STRING,
    serviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_types',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'services',
  });
  return services;
};