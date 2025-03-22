'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      service_requests.belongsTo(models.users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      service_requests.belongsTo(models.services, {
        foreignKey: 'service_id',
        onDelete: 'CASCADE'
      });
    }
  }
  service_requests.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'service_requests',
    timestamps: true,
    underscored: true
  });
  return service_requests;
};