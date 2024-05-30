// models/bid.js

"use strict";

const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const bid = sequelize.define("bids", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "items",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    bidAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  bid.associate = (models) => {
    bid.belongsTo(models.users, { foreignKey: "userId" });
    bid.belongsTo(models.items, { foreignKey: "itemId" });
  };

  return bid;
};
