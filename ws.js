const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const config = require("./config/config.json");
const models = require("./models");

const wss = new WebSocket.Server({ noServer: true });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

wss.on("connection", (ws, request) => {
  const token = request.headers.authorization.split(" ")[1];
  const user = verifyToken(token);

  if (!user) {
    ws.close();
    return;
  }

  ws.on("message", async (message) => {
    const parsedMessage = JSON.parse(message);
    const { event, data } = parsedMessage;

    if (event === "bid") {
      const { itemId, bidAmount } = data;
      const newBid = await models.bids.create({
        itemId,
        userId: user.id,
        bidAmount,
      });

      // Notify all connected clients about the new bid
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              event: "update",
              data: {
                itemId,
                bidAmount,
                userId: user.id,
                username: user.username,
              },
            })
          );
        }
      });

      // Create a notification for the item owner
      const itemOwner = await models.users.findByPk(newBid.itemId);
      if (itemOwner) {
        await models.notifications.create({
          userId: itemOwner.id,
          message: `New bid placed on your item by ${user.username}`,
        });

        // Notify the item owner in real-time if they are connected
        wss.clients.forEach((client) => {
          if (
            client.readyState === WebSocket.OPEN &&
            client.user.id === itemOwner.id
          ) {
            client.send(
              JSON.stringify({
                event: "notify",
                data: {
                  message: `New bid placed on your item by ${user.username}`,
                },
              })
            );
          }
        });
      }
    }
  });
});

module.exports = wss;
