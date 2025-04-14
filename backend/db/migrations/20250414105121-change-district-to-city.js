'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get all users
    const users = await queryInterface.sequelize.query(
      'SELECT id, address FROM users',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Process each user to update 'district' to 'city' in the JSONB/JSON address field
    for (const user of users) {
      if (user.address) {
        let addressObj;
        try {
          // Parse the address if it's stored as a string
          addressObj = typeof user.address === 'string' 
            ? JSON.parse(user.address) 
            : user.address;
            
          // If there's a district field, rename it to city
          if ('district' in addressObj) {
            addressObj.city = addressObj.district;
            delete addressObj.district;
          }
          
          // Update the user record
          await queryInterface.sequelize.query(
            `UPDATE users SET address = :address WHERE id = :id`,
            {
              replacements: { 
                address: JSON.stringify(addressObj),
                id: user.id
              },
              type: Sequelize.QueryTypes.UPDATE
            }
          );
        } catch (error) {
          console.error(`Error updating user ${user.id}:`, error);
        }
      }
    }

    // Now update the default value in the model
    // This depends on how your DB handles default JSON values
    // For PostgreSQL:
    try {
      await queryInterface.sequelize.query(
        `ALTER TABLE users 
         ALTER COLUMN address 
         SET DEFAULT '{"address": "", "pincode": "", "state": "", "city": ""}'::jsonb`
      );
    } catch (error) {
      console.error('Error updating default value:', error);
      // Fallback for databases that don't support the above syntax
      console.log('Note: You may need to manually update the model file to change the default values.');
    }
  },

  async down(queryInterface, Sequelize) {
    // Get all users
    const users = await queryInterface.sequelize.query(
      'SELECT id, address FROM users',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Process each user to revert 'city' back to 'district' in the JSONB/JSON address field
    for (const user of users) {
      if (user.address) {
        let addressObj;
        try {
          // Parse the address if it's stored as a string
          addressObj = typeof user.address === 'string' 
            ? JSON.parse(user.address) 
            : user.address;
            
          // If there's a city field, rename it to district
          if ('city' in addressObj) {
            addressObj.district = addressObj.city;
            delete addressObj.city;
          }
          
          // Update the user record
          await queryInterface.sequelize.query(
            `UPDATE users SET address = :address WHERE id = :id`,
            {
              replacements: { 
                address: JSON.stringify(addressObj),
                id: user.id
              },
              type: Sequelize.QueryTypes.UPDATE
            }
          );
        } catch (error) {
          console.error(`Error reverting user ${user.id}:`, error);
        }
      }
    }

    // Revert the default value in the model
    try {
      await queryInterface.sequelize.query(
        `ALTER TABLE users 
         ALTER COLUMN address 
         SET DEFAULT '{"address": "", "pincode": "", "state": "", "district": ""}'::jsonb`
      );
    } catch (error) {
      console.error('Error reverting default value:', error);
      console.log('Note: You may need to manually update the model file to revert the default values.');
    }
  }
}; 