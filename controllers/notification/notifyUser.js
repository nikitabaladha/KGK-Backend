// controllers/notification/notification.js

const markNotificationsAsRead = require("./markNotificationsAsRead");

async function notifyUser(req, res) {
  try {
    await markNotificationsAsRead(req, res);
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = notifyUser;
