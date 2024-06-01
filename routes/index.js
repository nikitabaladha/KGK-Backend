// // routes/index.js

// const Controller = require("../controllers");
// const Middleware = require("../middleware");
// const upload = require("../controllers/item/multerConfig");
// const { notifyUser } = require("../controllers/auctionController");

// module.exports = (app, io) => {
//   app.post("/api/register", Controller.user.register);
//   app.post("/api/login", Controller.user.login);
//   app.get("/api/profile", Middleware, Controller.user.profile);

//   app.post("api/forgot-password", Middleware, Controller.user.forgotPassword);
//   app.post("/api/reset-password", Middleware, Controller.user.resetPassword);

//   app.post(
//     "/api/item",
//     upload.single("image"),
//     Middleware,
//     Controller.item.create
//   );
//   app.post("/api/item", Middleware, Controller.item.create);
//   app.get("/api/item", Controller.item.get);
//   app.get("/api/item/:itemId", Controller.item.getById);
//   app.put(
//     "/api/item/:itemId",
//     upload.single("image"),
//     Middleware,
//     Controller.item.update
//   );
//   app.delete("/api/item/:itemId", Middleware, Controller.item.deleteById);

//   app.post("/api/bid/:itemId", Middleware, Controller.bid.create);
//   app.get("/api/bid/:itemId", Controller.bid.getBidsByItemId);

//   app.get(
//     "/api/notifications",
//     Middleware,
//     Controller.notification.getNotifications
//   );

//   app.post(
//     "/api/notifications-mark-read",
//     Middleware,
//     Controller.notification.markNotificationsAsRead
//   );

//   // Define the route and associate it with the route handler
//   app.post("/api/bid/:itemId", Middleware, Controller.bid.placeBid);

//   // WebSocket connection handling
//   io.on("connection", (socket) => {
//     console.log("New client connected");

//     // Bid event handler
//     socket.on("bid", async (data) => {
//       try {
//         // Process the bid...
//         await Controller.bid.placeBid(
//           data.userId,
//           data.itemId,
//           data.bidAmount,
//           io
//         );

//         // Notify all connected clients about the new bid
//         io.emit("update", {
//           itemId: data.itemId,
//           bidAmount: data.bidAmount,
//           userId: data.userId,
//         });
//       } catch (error) {
//         console.error("Error processing bid:", error);
//         socket.emit("error", { message: "Internal Server Error" });
//       }
//     });

//     // Notify event handler
//     socket.on("notify", async (data) => {
//       try {
//         // Process notification logic...
//         await Controller.notification.markNotificationsAsRead(data.userId);

//         // Example: Broadcast the notification to all connected clients
//         io.emit("notify", data);
//       } catch (error) {
//         console.error("Error sending notification:", error);
//         socket.emit("error", { message: "Internal Server Error" });
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });

//   app.post(
//     "/api/mark-notifications-as-read",
//     Middleware,
//     Controller.notification.markNotificationsAsRead
//   );
// };

// routes/index.js
const express = require("express");
const Controller = require("../controllers");
const Middleware = require("../middleware");
const upload = require("../controllers/item/multerConfig");

module.exports = (app, io) => {
  app.post("/api/register", Controller.user.register);
  app.post("/api/login", Controller.user.login);
  app.get("/api/profile", Middleware, Controller.user.profile);

  app.post("/api/forgot-password", Middleware, Controller.user.forgotPassword);
  app.post("/api/reset-password", Middleware, Controller.user.resetPassword);

  app.post(
    "/api/item",
    upload.single("image"),
    Middleware,
    Controller.item.create
  );
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
    "/api/mark-notifications-as-read",
    Middleware,
    Controller.notification.markNotificationsAsRead
  );

  // WebSocket connection handling
  io.on("connection", (socket) => {
    console.log("New client connected");

    // Bid event handler
    socket.on("bid", async (data) => {
      try {
        const req = {
          user: { userId: data.userId },
          params: { itemId: data.itemId },
          body: { bidAmount: data.bidAmount },
          io,
        };
        const res = {
          status: () => ({
            json: () => {},
          }),
        };

        await Controller.bid.create(req, res);

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

    // Notify event handler
    socket.on("notify", async (data) => {
      try {
        const req = {
          user: { userId: data.userId },
          io,
        };
        const res = {
          status: () => ({
            json: () => {},
          }),
        };

        await Controller.notification.markNotificationsAsRead(req, res);

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
