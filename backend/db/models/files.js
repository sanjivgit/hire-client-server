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
        foreignKey: 'profile_pic',
        as: 'userProfile'
      });

      files.hasOne(models.partners, {
        foreignKey: 'aadhar_image_id',
        as: 'aadhar_image'
      });

      files.hasOne(models.partners, {
        foreignKey: 'additional_document_id',
        as: 'additional_document'
      });
    }
  }
  files.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'files',
    timestamps: true,
    underscored: true
  });
  return files;
};