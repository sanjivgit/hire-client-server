"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasOne(models.roles, { foreignKey: "user_id", as: "role" });
      users.hasOne(models.partners, {
        foreignKey: "user_id",
        as: "partner",
      });
    }
  }
  users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_pic: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(2000),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {
          address: "",
          pincode: "",
          state: "",
          city: "",
        },
      },
    },
    {
      sequelize,
      modelName: "users",
      timestamps: true,
      underscored: true
    }
  );
  return users;
};
