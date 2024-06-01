// controllers/bid/create.js
const models = require("../../models");

async function create(req, res) {
  try {
    const { userId } = req.user;
    const { itemId } = req.params;
    const { bidAmount } = req.body;

    if (!userId) {
      return res.status(404).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can create bids",
      });
    }

    const item = await models.items.findByPk(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
        hasError: true,
      });
    }

    if (bidAmount <= item.currentPrice) {
      return res.status(400).json({
        hasError: true,
        message: "Bid amount must be higher than the current price",
      });
    }

    const bid = await models.bids.create({
      itemId,
      userId,
      bidAmount,
    });

    return res.status(200).json({
      hasError: false,
      message: "Bid placed successfully",
      data: bid,
    });
  } catch (error) {
    console.error("Error during creating Bid", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
