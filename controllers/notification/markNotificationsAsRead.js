// controllers/notification/markNotificationsAsRead.js
const models = require("../../models");

const markNotificationsAsRead = async (req, res) => {
  try {
    const { userId } = req.user;
    const io = req.io; // Access io from request

    if (!userId) {
      return res.status(403).json({
        hasError: true,
        message: "Forbidden: Only logged-in users can get notifications",
      });
    }

    await models.notifications.update(
      { isRead: true },
      { where: { userId, isRead: false } }
    );

    io.emit("notify", { message: "Notifications marked as read" });

    return res.status(200).json({
      hasError: false,
      message: "Notifications marked as read",
    });
  } catch (error) {
    console.error("Failed to mark notifications as read", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
};

module.exports = markNotificationsAsRead;
