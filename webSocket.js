const WebSocket = require("ws");

// Create WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Handle WebSocket connections
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "authenticate") {
      // Store userId in the WebSocket connection
      ws.userId = parsedMessage.userId;
    }
  });
});

module.exports = wss;
