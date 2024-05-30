// controllers/item/create.js

const models = require("../../models");
const validateItemData = require("../../validator/validateItemData");

async function update(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(404).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can update items",
      });
    }

    const { itemId } = req.params;

    const item = await models.items.findByPk(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
        hasError: true,
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

    item.name = name;
    item.description = description;
    item.startingPrice = startingPrice;
    item.currentPrice = currentPrice || startingPrice;
    item.imageUrl = imageUrl;
    item.endTime = endTime;

    await item.save();

    return res.status(200).json({
      hasError: false,
      message: "Item updated successfully",
      data: item,
    });
  } catch (error) {
    console.error("Error during updating Item", error);

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

module.exports = update;
