const sendNotification = require("../notification");

async function someRouteHandler(req, res) {
  const { userId } = req.user;
  const notification = { message: "You have a new notification!" };

  // Send notification
  sendNotification(req.app, userId, notification);

  res.status(200).json({
    hasError: false,
    message: "Notification sent",
  });
}

module.exports = someRouteHandler;
