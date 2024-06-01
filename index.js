const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Hello Nikita");
});

const routes = require("./routes")(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
