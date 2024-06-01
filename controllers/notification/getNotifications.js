// controllers/notification/getNotification.js

const models = require("../../models");

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can get notifications",
      });
    }

    const notifications = await models.notifications.findAll({
      where: { userId },
    });

    if (!notifications) {
      return res.status(404).json({
        message: "Notification not found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Notification retrieved successfully",
      data: notifications,
    });
  } catch (error) {
    console.error("Failed to get notifications", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
};

module.exports = getNotifications;
