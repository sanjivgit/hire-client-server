'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      partners.belongsTo(models.users, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      partners.belongsTo(models.service_types, {
        foreignKey: 'serviceTypeId',
        as: 'serviceType'
      });
      partners.belongsTo(models.files, {
        foreignKey: 'aadharImageId',
        as: 'aadharImage'
      });
      partners.belongsTo(models.files, {
        foreignKey: 'additionalDocumentId',
        as: 'additionalDocumentFile'
      });
      // Many-to-many relationship with services
      // partners.belongsToMany(models.services, {
      //   through: 'partner_services',
      //   foreignKey: 'partnerId',
      //   otherKey: 'serviceId',
      //   as: 'services',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
    }
  }
  partners.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    aadharNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_types',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'suspended', 'active'),
      defaultValue: 'pending',
      allowNull: false
    },
    aadharImageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'files',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    additionalDocumentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'files',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'partners',
  });
  return partners;
};