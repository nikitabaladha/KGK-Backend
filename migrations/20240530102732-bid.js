"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bids", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      itemId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      bidAmount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
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

    await queryInterface.addConstraint("bids", {
      type: "unique",
      fields: ["itemId", "userId"],
      name: "unique_item_user_bid",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("bids", "unique_item_user_bid");
    await queryInterface.dropTable("bids");
  },
};
