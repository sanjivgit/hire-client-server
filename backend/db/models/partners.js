"use strict";
const { Model } = require("sequelize");
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
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      partners.belongsTo(models.service_types, {
        foreignKey: "service_type_id",
        as: "service_type",
      });
      partners.belongsTo(models.files, {
        foreignKey: "aadhar_image_id",
        as: "aadhar_image",
      });
      partners.belongsTo(models.files, {
        foreignKey: "additional_document_id",
        as: "additional_document",
      });
      // Many-to-many relationship with services
      partners.belongsToMany(models.services, {
        through: "partner_services",
        foreignKey: "partner_id", // Use the correct column name
        otherKey: "service_id", // Use the correct column name
        as: "services",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // Association with reasons table
      partners.hasOne(models.reasons, {
        foreignKey: "partner_id",
        as: "reason",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  partners.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      aadhar_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "service_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "suspended", "active"),
        defaultValue: "pending",
        allowNull: false,
      },
      aadhar_image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "files",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      additional_document_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "files",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
    },
    {
      sequelize,
      modelName: "partners",
      timestamps: true,
      underscored: true,
    }
  );
  return partners;
};
