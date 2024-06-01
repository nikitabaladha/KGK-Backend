// controllers/item/create.js

const models = require("../../models");
const validateItemData = require("../../validator/validateItemData");

async function create(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can create items",
      });
    }

    const { name, description, startingPrice, currentPrice, endTime } =
      req.body;

    const imageUrl = req.file ? req.file.path : null;

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

    const newItem = await models.items.create({
      userId,
      name,
      description,
      startingPrice,
      currentPrice: currentPrice || startingPrice,
      imageUrl,
      endTime,
      status: "active",
    });

    return res.status(201).json({
      hasError: false,
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    console.error("Error during creating Item:", error);

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
