// controllers/item/create.js

const models = require("../../models");
const validateItemData = require("../../validator/validateItemData");

async function create(req, res) {
  try {
    const { name, description, startingPrice, endTime } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const validationErrors = validateItemData(
      name,
      description,
      startingPrice,
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
      currentPrice: startingPrice,
      imageUrl,
      endTime,
    });

    return res.status(200).json({
      hasError: false,
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    console.error("Error during creating Item", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
