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
        foreignKey: 'service_type_id',
        as: 'service_type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      services.hasMany(models.partners, {
        foreignKey: 'service_id',
        as: 'partners',
      });
    }
  }
  services.init({
    name: DataTypes.STRING,
    service_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_types',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    icon_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'icons',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'services',
    timestamps: true,
    underscored: true
  });
  return services;
};