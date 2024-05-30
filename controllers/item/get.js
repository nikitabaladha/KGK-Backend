const models = require("../../models");

async function get(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    const offset = (page - 1) * pageSize;

    const items = await models.items.findAll({
      limit: pageSize,
      offset: offset,
    });

    if (!items || items.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No items found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error) {
    console.error("Error during retrieving items:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = get;
