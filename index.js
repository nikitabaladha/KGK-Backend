const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Hello Nikita");
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const routes = require("./routes")(app, io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
