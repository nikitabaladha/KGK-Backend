// controllers/item/create.js

const models = require("../../models");
const validateItemData = require("../../validator/validateItemData");

async function create(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(404).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can create items",
      });
    }

    const {
      name,
      description,
      startingPrice,
      currentPrice,
      imageUrl,
      endTime,
    } = req.body;

    const validationErrors = validateItemData(
      name,
      description,
      startingPrice,
      currentPrice,
      imageUrl,
      endTime
    );

    if (validationErrors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: validationErrors.join(", "),
      });
    }

    let newItem = await models.items.create({
      name,
      description,
      startingPrice,
      currentPrice: currentPrice || startingPrice,
      imageUrl,
      endTime,
      status: "active",
    });

    return res.status(200).json({
      hasError: false,
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    console.error("Error during creating Item", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        hasError: true,
        message: "Name must be unique",
      });
    }

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
