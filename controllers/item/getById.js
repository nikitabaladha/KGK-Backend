// controllers/item/getById.js

const models = require("../../models");

async function getById(req, res) {
  try {
    const { itemId } = req.params;

    const item = await models.items.findByPk(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      hasError: false,
      data: item,
      message: "Item retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching item:", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = getById;
