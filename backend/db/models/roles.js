"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      roles.belongsTo(models.users, { foreignKey: "userId", as: "user" });
    }
  }
  roles.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Name of the target table
          key: "id", // Target column
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "superAdmin"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "roles",
      timestamps: true,
      underscored: true
    }
  );
  return roles;
};
