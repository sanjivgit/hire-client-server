"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      -- Step 1: Drop default
      ALTER TABLE "accepted_services" ALTER COLUMN "status" DROP DEFAULT;

      -- Step 2: Cast column to TEXT (temporary)
      ALTER TABLE "accepted_services"
      ALTER COLUMN "status" TYPE TEXT;

      -- Step 3: Rename old enum
      ALTER TYPE "enum_accepted_services_status" RENAME TO "enum_accepted_services_status_old";

      -- Step 4: Create new enum
      CREATE TYPE "enum_accepted_services_status" AS ENUM('accepted', 'in-progress', 'completed', 'cancelled');

      -- Step 5: Update 'pending' to 'accepted'
      UPDATE "accepted_services" SET status = 'accepted' WHERE status = 'pending';

      -- Step 6: Change column to new enum
      ALTER TABLE "accepted_services"
      ALTER COLUMN "status"
      TYPE "enum_accepted_services_status"
      USING status::text::"enum_accepted_services_status";

      -- Step 7: Set new default
      ALTER TABLE "accepted_services" ALTER COLUMN "status" SET DEFAULT 'accepted';

      -- Step 8: Drop old enum
      DROP TYPE "enum_accepted_services_status_old";
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      -- Step 1: Drop default
      ALTER TABLE "accepted_services" ALTER COLUMN "status" DROP DEFAULT;

      -- Step 2: Cast to TEXT
      ALTER TABLE "accepted_services"
      ALTER COLUMN "status" TYPE TEXT;

      -- Step 3: Rename new enum
      ALTER TYPE "enum_accepted_services_status" RENAME TO "enum_accepted_services_status_new";

      -- Step 4: Recreate original enum
      CREATE TYPE "enum_accepted_services_status" AS ENUM('pending', 'in-progress', 'completed', 'cancelled');

      -- Step 5: Revert 'accepted' to 'pending'
      UPDATE "accepted_services" SET status = 'pending' WHERE status = 'accepted';

      -- Step 6: Cast column back to original enum
      ALTER TABLE "accepted_services"
      ALTER COLUMN "status"
      TYPE "enum_accepted_services_status"
      USING status::text::"enum_accepted_services_status";

      -- Step 7: Set default
      ALTER TABLE "accepted_services" ALTER COLUMN "status" SET DEFAULT 'pending';

      -- Step 8: Drop new enum type
      DROP TYPE "enum_accepted_services_status_new";
    `);
  },
};
