// routes/index.js

const Controller = require("../controllers");
const Middleware = require("../middleware");

module.exports = (app) => {
  app.post("/api/register", Controller.user.register);
  app.post("/api/login", Controller.user.login);
  app.get("/api/profile", Middleware, Controller.user.profile);

  app.post("/api/item", Middleware, Controller.item.create);
  app.get("/api/item", Controller.item.get);
  app.get("/api/item/:itemId", Controller.item.getById);
  app.put("/api/item/:itemId", Middleware, Controller.item.update);
  app.delete("/api/item/:itemId", Middleware, Controller.item.deleteById);

  app.post("/api/bid/:itemId", Middleware, Controller.bid.create);
  app.get("/api/bid/:itemId", Controller.bid.getBidsByItemId);
};
