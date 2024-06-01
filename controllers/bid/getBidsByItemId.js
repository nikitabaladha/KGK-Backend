// controllers/getBidsById/getBidsById.js

const models = require("../../models");

async function getBidsByItemId(req, res) {
  try {
    const { itemId } = req.params;

    const item = await models.items.findByPk(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
        hasError: true,
      });
    }

    const bids = await models.bids.findAll({
      where: { itemId },
    });

    return res.status(200).json({
      hasError: false,
      data: bids,
      message: "Bids retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching Bid:", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = getBidsByItemId;
