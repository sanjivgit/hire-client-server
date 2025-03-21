'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ratings.init({
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'partners',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ratings',
  });
  return ratings;
};