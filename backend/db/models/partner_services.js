'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class partner_services extends Model {
    static associate(models) {
      // No need for explicit associations here
    }
  }
  partner_services.init({
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'partners',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    serviceId: {
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
  });
  return partner_services;
}; 