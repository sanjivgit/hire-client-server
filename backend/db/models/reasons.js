"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reasons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reasons.belongsTo(models.partners, {
        foreignKey: "partner_id",
        as: "partner",
      });
    }
  }
  reasons.init(
    {
      partner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "partners",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "reasons",
    }
  );
  return reasons;
};
