'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class partner_services extends Model {
    static associate(models) {
      partner_services.belongsTo(models.partners, {
        foreignKey: 'partner_id',
        as: 'partner',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      partner_services.belongsTo(models.services, {
        foreignKey: 'service_id',
        as: 'service',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  partner_services.init({
    partner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'partners',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'partner_services',
    timestamps: true,
    underscored: true
  });
  return partner_services;
}; 