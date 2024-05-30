const models = require("../../models");

async function deleteById(req, res) {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can delete items",
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

    await item.destroy();

    return res.status(200).json({
      hasError: false,
      message: "Item deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting item:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = deleteById;
