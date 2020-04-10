const express = require("express");

const db = require("./models");
const app = express();
db.sequelize.sync();

app.get("/", (req, res) => {
  res.send("Hello, server!");
});

app.listen(3065, () => {
  console.log("server is running on http://localhost:3065");
});
