'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class otps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  otps.init({
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    otp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'otps',
    hooks: {
      afterSync: async () => {
        // Set up periodic cleanup every minute
        setInterval(() => {
          // Delete OTPs older than 2 minutes
          otps.destroy({
            where: {
              created_at: {
                [Op.lt]: new Date(Date.now() - 2 * 60 * 1000)
              }
            }
          }).catch(console.error);
        }, 60000);
      },
    },
    timestamps: true,
    underscored: true  // This tells Sequelize to use snake_case for timestamp fields
  });
  return otps;
};