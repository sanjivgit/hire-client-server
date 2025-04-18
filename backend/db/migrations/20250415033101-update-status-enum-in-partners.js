"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      -- Remove default temporarily
      ALTER TABLE "partners" ALTER COLUMN "status" DROP DEFAULT;

      -- Rename old enum
      ALTER TYPE "enum_partners_status" RENAME TO "enum_partners_status_old";

      -- Create new enum
      CREATE TYPE "enum_partners_status" AS ENUM('pending', 'approved', 'suspended', 'rejected');

      -- Change column to new enum
      ALTER TABLE "partners"
      ALTER COLUMN "status"
      TYPE "enum_partners_status"
      USING status::text::"enum_partners_status";

      -- Set new default
      ALTER TABLE "partners" ALTER COLUMN "status" SET DEFAULT 'pending';

      -- Drop old enum
      DROP TYPE "enum_partners_status_old";
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "partners" ALTER COLUMN "status" DROP DEFAULT;

      ALTER TYPE "enum_partners_status" RENAME TO "enum_partners_status_new";

      CREATE TYPE "enum_partners_status" AS ENUM('pending', 'approved', 'suspended', 'active');

      ALTER TABLE "partners"
      ALTER COLUMN "status"
      TYPE "enum_partners_status"
      USING status::text::"enum_partners_status";

      ALTER TABLE "partners" ALTER COLUMN "status" SET DEFAULT 'pending';

      DROP TYPE "enum_partners_status_new";
    `);
  },
};
