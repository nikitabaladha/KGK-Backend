const sendNotification = (app, userId, notification) => {
  const wss = app.get("wss");
  const client = [...wss.clients].find((client) => client.userId === userId);

  if (client && client.readyState === WebSocket.OPEN) {
    client.send(
      JSON.stringify({
        event: "notify",
        data: notification,
      })
    );
  }
};

module.exports = sendNotification;
