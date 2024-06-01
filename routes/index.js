// routes/index.js

const Controller = require("../controllers");
const Middleware = require("../middleware");
const upload = require("../controllers/item/multerConfig");

module.exports = (app, io) => {
  app.post("/api/register", Controller.user.register);
  app.post("/api/login", Controller.user.login);
  app.get("/api/profile", Middleware, Controller.user.profile);

  app.post(
    "/api/item",
    upload.single("image"),
    Middleware,
    Controller.item.create
  );
  app.post("/api/item", Middleware, Controller.item.create);
  app.get("/api/item", Controller.item.get);
  app.get("/api/item/:itemId", Controller.item.getById);
  app.put(
    "/api/item/:itemId",
    upload.single("image"),
    Middleware,
    Controller.item.update
  );
  app.delete("/api/item/:itemId", Middleware, Controller.item.deleteById);

  app.post("/api/bid/:itemId", Middleware, Controller.bid.create);
  app.get("/api/bid/:itemId", Controller.bid.getBidsByItemId);

  app.get(
    "/api/notifications",
    Middleware,
    Controller.notification.getNotifications
  );

  app.post(
    "/api/notifications-mark-read",
    Middleware,
    Controller.notification.markNotificationsAsRead
  );

  app.post("/api/bid/:itemId", Middleware, Controller.bid.placeBid);

  // WebSocket connection handling
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("bid", async (data) => {
      try {
        await Controller.bid.placeBid(
          data.userId,
          data.itemId,
          data.bidAmount,
          io
        );

        io.emit("update", {
          itemId: data.itemId,
          bidAmount: data.bidAmount,
          userId: data.userId,
        });
      } catch (error) {
        console.error("Error processing bid:", error);
        socket.emit("error", { message: "Internal Server Error" });
      }
    });

    socket.on("notify", async (data) => {
      try {
        await Controller.notification.markNotificationsAsRead(data.userId);

        io.emit("notify", data);
      } catch (error) {
        console.error("Error sending notification:", error);
        socket.emit("error", { message: "Internal Server Error" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
