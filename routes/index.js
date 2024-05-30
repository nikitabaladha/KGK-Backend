// // routes/index.js

// const Controller = require("../controllers");
// const Middleware = require("../middleware");

// module.exports = (app) => {
//   app.post("/api/register", Controller.user.register);
//   app.post("/api/login", Controller.user.login);
//   app.get("/api/profile", Middleware, Controller.user.profile);
//   app.post("/api/item", Middleware, upload.single("image"), createItem);
// };
// routes/index.js

const express = require("express");
const Controller = require("../controllers");
const Middleware = require("../middleware");
const upload = require("../middleware/upload"); // Assuming this file handles multer setup

module.exports = (app) => {
  app.post("/api/register", Controller.user.register);
  app.post("/api/login", Controller.user.login);
  app.get("/api/profile", Middleware, Controller.user.profile);
  app.post(
    "/api/item",
    Middleware,
    upload.single("image"),
    Controller.item.create
  );
};
