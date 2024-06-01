// controllers/bid/placeBid.js

const create = require("./create");
const placeBid = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId } = req.params;
    const { bidAmount } = req.body;

    await create(userId, itemId, bidAmount, req.io);

    res.status(200).json({ message: "Bid placed successfully" });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = placeBid;
