// routes/index.js

const Controller = require("../controllers");
const Middleware = require("../middleware");

module.exports = (app) => {
  app.post("/api/register", Controller.user.register);
  app.post("/api/login", Controller.user.login);
  app.get("/api/profile", Middleware, Controller.user.profile);
};
