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
        foreignKey: 'service_type_id',
        as: 'services',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      service_types.hasMany(models.partners, {
        foreignKey: 'service_type_id',
        as: 'partners',
      });
    }
  }
  service_types.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'service_types',
    timestamps: true,
    underscored: true
  });
  return service_types;
};