// controllers/bid/create.js
const models = require("../../models");

async function create(userId, itemId, bidAmount, io) {
  try {
    const item = await models.items.findByPk(itemId);

    if (!item) {
      throw new Error("Item not found.");
    }

    if (bidAmount <= item.currentPrice) {
      throw new Error("Bid amount must be higher than the current price");
    }

    const bid = await models.bids.create({
      itemId,
      userId,
      bidAmount,
    });

    // Emit WebSocket event to notify all clients about the new bid
    io.emit("update", { itemId, bidAmount, userId });

    return bid;
  } catch (error) {
    console.error("Error during creating Bid", error);
    throw new Error("Internal Server Error");
  }
}

module.exports = create;
