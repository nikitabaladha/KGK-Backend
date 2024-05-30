// routes/index.js

const Controller = require("../controllers");

module.exports = (app) => {
  app.post("/api/register", Controller.register);
  app.post("/api/login", Controller.login);
};
