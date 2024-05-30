// const express = require("express");
// const app = express();

// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

// app.get("/api", (req, res) => {
//   res.send("Hello Nikita");
// });

// const routes = require("./routes")(app);

// const PORT = 3001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(bodyParser.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api", (req, res) => {
  res.send("Hello Nikita");
});

// Use the routes
routes(app);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
