// migarations/item.js
"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("items", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      startingPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      currentPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("active", "ended"),
        allowNull: false,
        defaultValue: "active",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.sequelize.query(`
UPDATE "items"
SET "currentPrice" = "startingPrice"
WHERE "currentPrice" = 0;
`);

    await queryInterface.sequelize.query(`
ALTER TABLE "items"
ALTER COLUMN "currentPrice" SET DEFAULT '0';
`);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("items");
  },
};
