"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, update any existing 'rejected' values to 'cancelled'
    await queryInterface.sequelize.query(`
      -- Remove default temporarily
      ALTER TABLE "accepted_services" ALTER COLUMN "status" DROP DEFAULT;

      -- Rename old enum
      ALTER TYPE "enum_accepted_services_status" RENAME TO "enum_accepted_services_status_old";

      -- Create new enum
      CREATE TYPE "enum_accepted_services_status" AS ENUM('pending', 'in-progress', 'completed', 'cancelled');

      -- Change column to new enum
      ALTER TABLE "accepted_services"
      ALTER COLUMN "status"
      TYPE "enum_accepted_services_status"
      USING status::text::"enum_accepted_services_status";

      -- Set new default
      ALTER TABLE "accepted_services" ALTER COLUMN "status" SET DEFAULT 'pending';

      -- Drop old enum
      DROP TYPE "enum_accepted_services_status_old";
    `);
  },

  async down(queryInterface, Sequelize) {
    // First, update any existing 'cancelled' values to 'rejected'
    await queryInterface.sequelize.query(`
      ALTER TABLE "accepted_services" ALTER COLUMN "status" DROP DEFAULT;

      ALTER TYPE "enum_accepted_services_status" RENAME TO "enum_accepted_services_status_new";

      CREATE TYPE "enum_accepted_services_status" AS ENUM('pending', 'in-progress', 'completed', 'cancelled');

      ALTER TABLE "accepted_services"
      ALTER COLUMN "status"
      TYPE "enum_accepted_services_status"
      USING status::text::"enum_accepted_services_status";

      ALTER TABLE "accepted_services" ALTER COLUMN "status" SET DEFAULT 'pending';

      DROP TYPE "enum_accepted_services_status_new";
    `);
  },
};
