// models/item.js

"use strict";

const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const item = sequelize.define(
    "items",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      startingPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      currentPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      endTime: {
        type: DataTypes.DATE,
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
    },
    {
      sequelize,
      modelName: "items",
      tableName: "items",
      hooks: {
        beforeCreate: (item, options) => {
          if (item.currentPrice === undefined || item.currentPrice === null) {
            item.currentPrice = item.startingPrice;
          }
        },
      },
    }
  );

  return item;
};
