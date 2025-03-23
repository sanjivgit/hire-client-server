'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accepted_services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accepted_services.belongsTo(models.service_requests, {
        foreignKey: 'service_request_id',
        as: 'service_request',
        onDelete: 'CASCADE'
      });
      
      accepted_services.belongsTo(models.partners, {
        foreignKey: 'partner_id',
        as: 'partner',
        onDelete: 'CASCADE'
      });
    }
  }
  accepted_services.init({
    partner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'partners',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    service_request_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'service_requests',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'accepted_services',
    timestamps: true,
    underscored: true 
  });
  return accepted_services;
};