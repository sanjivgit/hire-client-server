'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Files can be referenced by users through profilePic
      files.hasOne(models.users, {
        foreignKey: 'profilePic',
        as: 'userProfile'
      });

      files.hasOne(models.partners, {
        foreignKey: 'aadharImageId',
        as: 'aadharImage'
      });

      files.hasOne(models.partners, {
        foreignKey: 'additionalDocumentId',
        as: 'additionalDocument'
      });
    }
  }
  files.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'files',
    timestamps: true
  });
  return files;
};