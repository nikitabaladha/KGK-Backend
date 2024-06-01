// const express = require("express");
// const app = express();

// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

// app.get("/api", (req, res) => {
//   res.send("Hello Nikita");
// });

// const routes = require("./routes")(app);

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// =================================================================

// const express = require("express");
// const app = express();

// const routes = require("./routes");

// // Middleware to parse JSON bodies
// app.use(express.json());

// // A simple route to verify the server is running
// app.get("/api", (req, res) => {
//   res.send("Hello Nikita");
// });

// // Register routes
// routes(app);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     hasError: true,
//     error: "Internal Server Error",
//     message: "Something went wrong!",
//   });
// });

// // Define the port
// const PORT = process.env.PORT || 3001;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// =================================================================

const express = require("express");
const http = require("http");
const WebSocket = require("ws"); // Import WebSocket module
const app = express();

const bodyParser = require("body-parser");
const routes = require("./routes");

app.use(bodyParser.json());

// A simple route to verify the server is running
app.get("/api", (req, res) => {
  res.send("Hello Nikita");
});

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Pass WebSocket instance to route handlers
app.use((req, res, next) => {
  req.wss = wss;
  next();
});

// Register routes
routes(app);

// Define the port
const PORT = process.env.PORT || 3001;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
